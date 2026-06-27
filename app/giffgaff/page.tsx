'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sections, META } from './data'
import type { Section, Step } from './data'

// ── 品牌主题 ─────────────────────────────────────────────
// giffgaff 标志性活力绿 + 深炭黑，editorial 手册风
const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

.gg-root {
  --gg-green: #00d68f;
  --gg-green-deep: #00a06b;
  --gg-ink: #0c0f0e;
  --gg-paper: #f6f7f4;
  --gg-card: #ffffff;
  --gg-muted: #6b7470;
  font-family: 'Noto Sans SC', system-ui, sans-serif;
  background: var(--gg-paper);
  color: var(--gg-ink);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}
.gg-display { font-family: 'Sora', sans-serif; }

/* hero 背景网格 + 光斑 */
.gg-hero {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(120% 120% at 85% -10%, rgba(0,214,143,0.35) 0%, transparent 45%),
    radial-gradient(90% 90% at 0% 110%, rgba(0,214,143,0.18) 0%, transparent 50%),
    var(--gg-ink);
}
.gg-hero::before {
  content: '';
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(circle at 50% 35%, #000 0%, transparent 75%);
}
.gg-grain {
  position: absolute; inset: 0; pointer-events: none; opacity: .5;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
}

/* 章节锚点偏移，避免被固定头遮挡 */
.gg-anchor { scroll-margin-top: 90px; }

/* 链接药丸 */
.gg-link {
  display: inline-flex; align-items: center; gap: .4rem;
  font-weight: 600; font-size: .92rem;
  color: var(--gg-green-deep);
  border-bottom: 2px solid rgba(0,214,143,.35);
  transition: all .18s ease;
  word-break: break-all;
}
.gg-link:hover { color: #fff; background: var(--gg-green-deep); border-color: var(--gg-green-deep); padding: 0 .35rem; border-radius: 4px; }

/* 步骤连接竖线 */
.gg-thread { background: linear-gradient(var(--gg-green), rgba(0,214,143,.15)); }

/* 截图卡 */
.gg-shot {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(12,15,14,.08);
  box-shadow: 0 18px 40px -22px rgba(12,15,14,.45);
  background: #fff;
  cursor: zoom-in;
  transition: transform .25s ease, box-shadow .25s ease;
}
.gg-shot:hover { transform: translateY(-4px); box-shadow: 0 28px 60px -24px rgba(0,160,107,.55); }

/* 目录滚动条隐藏 */
.gg-toc::-webkit-scrollbar { width: 0; }

/* 进度条 */
.gg-progress {
  position: fixed; top: 0; left: 0; height: 3px;
  background: linear-gradient(90deg, var(--gg-green), #7CFFC4);
  z-index: 60;
}

@media (max-width: 1023px) {
  .gg-anchor { scroll-margin-top: 72px; }
}
`

// ── 滚动渐入封装 ─────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

// ── 图片灯箱 ─────────────────────────────────────────────
function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', h)
      document.body.style.overflow = ''
    }
  }, [onClose])
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-10"
      style={{ background: 'rgba(8,10,9,.82)', backdropFilter: 'blur(6px)' }}
    >
      <motion.img
        initial={{ scale: 0.92, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        src={src} alt="预览"
        className="max-h-full max-w-full rounded-2xl shadow-2xl"
        style={{ cursor: 'zoom-out' }}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        onClick={onClose}
        className="absolute top-5 right-5 grid h-11 w-11 place-items-center rounded-full text-white text-2xl"
        style={{ background: 'rgba(255,255,255,.12)' }}
        aria-label="关闭"
      >
        ×
      </button>
    </motion.div>
  )
}

// ── 单个步骤 ─────────────────────────────────────────────
function StepItem({ step, last, onZoom }: { step: Step; last: boolean; onZoom: (s: string) => void }) {
  return (
    <div className="relative flex gap-4 sm:gap-5">
      {/* 时间线圆点 + 竖线 */}
      <div className="flex flex-col items-center">
        <div className="mt-1 grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full" style={{ background: 'var(--gg-green)', boxShadow: '0 0 0 4px rgba(0,214,143,.18)' }} />
        {!last && <div className="gg-thread mt-1 w-[2px] flex-1 rounded-full" />}
      </div>

      <div className="pb-9 min-w-0 flex-1">
        {step.label && (
          <span className="gg-display inline-block mb-1.5 text-[13px] font-bold tracking-wide" style={{ color: 'var(--gg-green-deep)' }}>
            {step.label}
          </span>
        )}
        <p className="text-[15.5px] leading-relaxed text-[#1c211f]">{step.text}</p>

        {step.link && (
          <a href={step.link.url} target="_blank" rel="noreferrer" className="gg-link mt-2">
            {step.link.text || step.link.url}
            <span aria-hidden>↗</span>
          </a>
        )}

        {step.note && (
          <div className="mt-3 flex gap-2 rounded-xl px-3.5 py-2.5 text-[13.5px] leading-relaxed" style={{ background: 'rgba(255,193,7,.1)', border: '1px solid rgba(255,193,7,.35)', color: '#8a6400' }}>
            <span aria-hidden className="shrink-0">💡</span>
            <span>{step.note}</span>
          </div>
        )}

        {step.images && step.images.length > 0 && (
          <div className={`mt-4 grid gap-3.5 ${step.images.length > 1 ? 'sm:grid-cols-2' : ''}`} style={{ maxWidth: step.images.length > 1 ? '100%' : '300px' }}>
            {step.images.map((src) => (
              <button key={src} className="gg-shot block" onClick={() => onZoom(src)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="操作截图" loading="lazy" className="block w-full" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── 章节块 ───────────────────────────────────────────────
function SectionBlock({ s, onZoom }: { s: Section; onZoom: (src: string) => void }) {
  return (
    <section id={s.id} className="gg-anchor mb-16 sm:mb-24">
      <Reveal>
        <div className="flex items-baseline gap-4">
          <span className="gg-display text-[2.6rem] sm:text-[3.4rem] font-extrabold leading-none" style={{ color: 'rgba(0,214,143,.22)' }}>
            {s.num}
          </span>
          <div>
            <h2 className="gg-display flex items-center gap-2.5 text-2xl sm:text-[2rem] font-bold leading-tight">
              <span aria-hidden className="text-2xl">{s.icon}</span>
              {s.title}
            </h2>
          </div>
        </div>
        {s.intro && <p className="mt-3 text-[15px] leading-relaxed" style={{ color: 'var(--gg-muted)' }}>{s.intro}</p>}
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-6 rounded-[26px] p-5 sm:p-8" style={{ background: 'var(--gg-card)', border: '1px solid rgba(12,15,14,.06)', boxShadow: '0 22px 50px -34px rgba(12,15,14,.4)' }}>
          {s.lead && (
            <p className="mb-6 rounded-2xl px-4 py-3.5 text-[14.5px] leading-relaxed" style={{ background: 'rgba(0,214,143,.08)', color: '#0c5a40' }}>
              {s.lead}
            </p>
          )}

          {s.points && s.points.length > 0 && (
            <ul className="mb-2 space-y-3">
              {s.points.map((p, i) => (
                <li key={i} className="flex gap-3 text-[15.5px] leading-relaxed text-[#1c211f]">
                  <span className="gg-display mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-[12px] font-bold text-white" style={{ background: 'var(--gg-green-deep)' }}>
                    {i + 1}
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          )}

          {s.steps && s.steps.length > 0 && (
            <div className={s.points ? 'mt-7 pt-6' : ''} style={s.points ? { borderTop: '1px dashed rgba(12,15,14,.12)' } : undefined}>
              {s.points && (
                <p className="gg-display mb-5 text-sm font-bold" style={{ color: 'var(--gg-muted)' }}>
                  可执行以下任一操作
                </p>
              )}
              {s.steps.map((step, i) => (
                <StepItem key={i} step={step} last={i === s.steps!.length - 1} onZoom={onZoom} />
              ))}
            </div>
          )}

          {s.warning && (
            <div className="mt-2 flex gap-3 rounded-2xl px-4 py-3.5 text-[14px] leading-relaxed" style={{ background: 'rgba(255,77,79,.07)', border: '1px solid rgba(255,77,79,.25)', color: '#a8331f' }}>
              <span aria-hidden className="shrink-0 text-lg">⚠️</span>
              <span>{s.warning}</span>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  )
}

// ── 主页面 ───────────────────────────────────────────────
export default function GiffgaffGuidePage() {
  const [active, setActive] = useState(sections[0].id)
  const [zoom, setZoom] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [tocOpen, setTocOpen] = useState(false)

  // 进度条 + 当前章节高亮
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1)
      setProgress(Math.min(1, Math.max(0, p)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (vis[0]) setActive((vis[0].target as HTMLElement).id)
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.25, 0.5] }
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const goto = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTocOpen(false)
  }, [])

  return (
    <div className="gg-root">
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div className="gg-progress" style={{ width: `${progress * 100}%` }} />

      {/* ── HERO ── */}
      <header className="gg-hero">
        <div className="gg-grain" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold" style={{ background: 'rgba(0,214,143,.14)', color: '#7CFFC4', border: '1px solid rgba(0,214,143,.3)' }}>
              <span className="h-2 w-2 rounded-full" style={{ background: 'var(--gg-green)', boxShadow: '0 0 10px var(--gg-green)' }} />
              英国 SIM 卡 · 图文教程
            </div>
            <h1 className="gg-display mt-6 text-[2.7rem] sm:text-[4.2rem] font-extrabold leading-[1.04] text-white">
              <span style={{ color: 'var(--gg-green)' }}>giff</span>gaff
              <br />
              完全使用手册
            </h1>
            <p className="mt-5 max-w-xl text-[15.5px] sm:text-[17px] leading-relaxed" style={{ color: 'rgba(255,255,255,.7)' }}>
              {META.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <button onClick={() => goto(sections[0].id)} className="gg-display rounded-full px-6 py-3 text-sm font-bold text-[#06120d] transition-transform hover:scale-[1.03]" style={{ background: 'var(--gg-green)' }}>
              从激活开始 →
            </button>
            <a href="https://www.giffgaff.com" target="_blank" rel="noreferrer" className="gg-display rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10" style={{ border: '1px solid rgba(255,255,255,.25)' }}>
              访问官网
            </a>
          </motion.div>

          {/* 数据小标 */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-12 flex flex-wrap gap-x-9 gap-y-4">
            {[
              { k: '16', v: '完整章节' },
              { k: '180', v: '天保号周期' },
              { k: '+44', v: '英国号码区号' },
            ].map((x) => (
              <div key={x.v}>
                <div className="gg-display text-2xl sm:text-3xl font-extrabold text-white">{x.k}</div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,.55)' }}>{x.v}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* ── 正文：目录 + 内容 ── */}
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="lg:flex lg:gap-12">
          {/* 桌面目录 */}
          <aside className="hidden lg:block w-60 shrink-0">
            <nav className="gg-toc sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto py-10 pr-2">
              <p className="gg-display mb-4 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--gg-muted)' }}>
                目录
              </p>
              <ul className="space-y-0.5">
                {sections.map((s) => {
                  const on = active === s.id
                  return (
                    <li key={s.id}>
                      <button
                        onClick={() => goto(s.id)}
                        className="group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-[13.5px] transition-colors"
                        style={{ background: on ? 'rgba(0,214,143,.12)' : 'transparent', color: on ? '#0c5a40' : '#5a635f', fontWeight: on ? 700 : 400 }}
                      >
                        <span className="gg-display text-[11px] tabular-nums" style={{ color: on ? 'var(--gg-green-deep)' : '#aeb5b1' }}>{s.num}</span>
                        <span className="truncate">{s.title}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </aside>

          {/* 内容 */}
          <main className="min-w-0 flex-1 py-12 sm:py-16">
            {sections.map((s) => (
              <SectionBlock key={s.id} s={s} onZoom={setZoom} />
            ))}

            <footer className="mt-8 rounded-[26px] px-6 py-8 text-center" style={{ background: 'var(--gg-ink)', color: 'rgba(255,255,255,.65)' }}>
              <p className="gg-display text-lg font-bold text-white">祝使用顺利 🎉</p>
              <p className="mt-2 text-sm">本教程内容整理自 giffgaff 官方说明，操作步骤可能随官方更新而变化，请以官网为准。</p>
            </footer>
          </main>
        </div>
      </div>

      {/* 移动端目录浮动按钮 */}
      <button
        onClick={() => setTocOpen(true)}
        className="gg-display fixed bottom-6 right-5 z-50 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-[#06120d] shadow-xl lg:hidden"
        style={{ background: 'var(--gg-green)' }}
      >
        ☰ 目录
      </button>

      <AnimatePresence>
        {tocOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] lg:hidden" onClick={() => setTocOpen(false)} style={{ background: 'rgba(8,10,9,.55)', backdropFilter: 'blur(4px)' }}>
            <motion.nav
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-0 left-0 right-0 max-h-[75vh] overflow-y-auto rounded-t-3xl bg-white p-6"
            >
              <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-gray-300" />
              <p className="gg-display mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--gg-muted)' }}>目录</p>
              <ul className="grid grid-cols-2 gap-1.5">
                {sections.map((s) => (
                  <li key={s.id}>
                    <button onClick={() => goto(s.id)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-[13.5px]" style={{ background: active === s.id ? 'rgba(0,214,143,.12)' : '#f2f4f1', color: active === s.id ? '#0c5a40' : '#3a423e', fontWeight: active === s.id ? 700 : 400 }}>
                      <span className="gg-display text-[11px]" style={{ color: 'var(--gg-green-deep)' }}>{s.num}</span>
                      <span className="truncate">{s.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {zoom && <Lightbox src={zoom} onClose={() => setZoom(null)} />}
      </AnimatePresence>
    </div>
  )
}
