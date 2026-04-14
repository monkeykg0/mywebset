'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import Script from 'next/script'
import { characters, questions, calculateResult } from './data'
import type { SanguoChar, DimKey } from './data'

// 把答案序列（每题选项索引）转换成维度得分 map
function scoreMap(answers: number[]): Partial<Record<DimKey, number>> {
  const acc: Partial<Record<DimKey, number>> = {}
  answers.forEach((optIdx, qIdx) => {
    const q = questions[qIdx]
    if (!q) return
    const opt = q.options[optIdx]
    if (!opt) return
    for (const [dim, delta] of Object.entries(opt.scores) as [DimKey, number][]) {
      acc[dim] = (acc[dim] ?? 0) + delta
    }
  })
  return acc
}
import { SanguoPixelChar } from './pixel-characters'

// ─── 派系颜色映射 ────────────────────────────────────────
const FACTION_COLORS: Record<string, { label: string; neon: string; glow: string }> = {
  wei:  { label: '魏', neon: '#00B4FF', glow: '0 0 20px #00B4FF80' },
  shu:  { label: '蜀', neon: '#00FF87', glow: '0 0 20px #00FF8780' },
  wu:   { label: '吴', neon: '#FF6B35', glow: '0 0 20px #FF6B3580' },
  han:  { label: '汉', neon: '#FFD700', glow: '0 0 20px #FFD70080' },
  qun:  { label: '群', neon: '#FF1493', glow: '0 0 20px #FF149380' },
}

const RARITY_LABELS: Record<string, { label: string; color: string }> = {
  legendary: { label: '传说', color: '#FFD700' },
  epic:      { label: '史诗', color: '#9B59B6' },
  rare:      { label: '精锐', color: '#3498DB' },
  common:    { label: '普通', color: '#95A5A6' },
}

// ─── 静态样式注入 ────────────────────────────────────────
const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@300;400;700&display=swap');

  :root {
    --bg: #050810;
    --surface: #0d1526;
    --border: #1a2a4a;
    --neon-blue: #00B4FF;
    --neon-green: #00FF87;
    --neon-pink: #FF1493;
    --neon-gold: #FFD700;
    --neon-orange: #FF6B35;
    --text: #c8d8f0;
    --muted: #4a6080;
  }

  .sg-root {
    min-height: 100vh;
    background: var(--bg);
    color: var(--text);
    font-family: 'Rajdhani', 'Noto Serif SC', sans-serif;
    overflow-x: hidden;
    position: relative;
  }

  .sg-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 40% at 20% 10%, #001a3a44 0%, transparent 60%),
      radial-gradient(ellipse 50% 30% at 80% 80%, #1a001a33 0%, transparent 60%),
      repeating-linear-gradient(0deg, transparent, transparent 49px, #0d1526 49px, #0d1526 50px),
      repeating-linear-gradient(90deg, transparent, transparent 49px, #0d1526 49px, #0d1526 50px);
    pointer-events: none;
    z-index: 0;
  }

  .sg-content {
    position: relative;
    z-index: 1;
    max-width: 900px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* ── 扫描线 ── */
  .sg-scanlines {
    position: fixed;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,180,255,0.015) 2px,
      rgba(0,180,255,0.015) 4px
    );
    pointer-events: none;
    z-index: 999;
  }

  /* ── 霓虹边框 ── */
  .neon-box {
    border: 1px solid var(--border);
    background: var(--surface);
    position: relative;
  }
  .neon-box::before, .neon-box::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    border-color: var(--neon-blue);
    border-style: solid;
  }
  .neon-box::before {
    top: -1px; left: -1px;
    border-width: 2px 0 0 2px;
  }
  .neon-box::after {
    bottom: -1px; right: -1px;
    border-width: 0 2px 2px 0;
  }

  /* ── 按钮 ── */
  .sg-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 28px;
    background: transparent;
    border: 1px solid var(--neon-blue);
    color: var(--neon-blue);
    font-family: 'Rajdhani', sans-serif;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
  }
  .sg-btn:hover {
    background: rgba(0,180,255,0.12);
    box-shadow: 0 0 24px rgba(0,180,255,0.4);
    text-shadow: 0 0 8px var(--neon-blue);
  }
  .sg-btn.primary {
    background: rgba(0,180,255,0.1);
  }
  .sg-btn.gold {
    border-color: var(--neon-gold);
    color: var(--neon-gold);
  }
  .sg-btn.gold:hover {
    background: rgba(255,215,0,0.12);
    box-shadow: 0 0 24px rgba(255,215,0,0.4);
  }
  .sg-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* ── 进度条 ── */
  .sg-progress-bar {
    height: 3px;
    background: var(--border);
    position: relative;
    overflow: hidden;
  }
  .sg-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--neon-blue), var(--neon-green));
    transition: width 0.5s cubic-bezier(.4,0,.2,1);
    box-shadow: 0 0 8px var(--neon-blue);
  }

  /* ── 选项卡片 ── */
  .sg-option {
    display: block;
    width: 100%;
    padding: 16px 20px;
    background: rgba(13,21,38,0.8);
    border: 1px solid var(--border);
    color: var(--text);
    font-family: 'Noto Serif SC', serif;
    font-size: 14px;
    line-height: 1.6;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s;
    margin-bottom: 10px;
    position: relative;
    overflow: hidden;
  }
  .sg-option::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: var(--neon-blue);
    transform: scaleY(0);
    transition: transform 0.2s;
  }
  .sg-option:hover::before, .sg-option.selected::before {
    transform: scaleY(1);
  }
  .sg-option:hover, .sg-option.selected {
    border-color: var(--neon-blue);
    background: rgba(0,180,255,0.08);
    color: #fff;
  }
  .sg-option.selected {
    box-shadow: inset 0 0 20px rgba(0,180,255,0.1);
  }

  /* ── 人物卡 ── */
  .sg-char-card {
    background: var(--surface);
    border: 1px solid var(--border);
    position: relative;
    overflow: hidden;
  }
  .sg-char-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%);
    pointer-events: none;
  }

  /* ── 发光文字 ── */
  .neon-text-blue { color: var(--neon-blue); text-shadow: 0 0 10px var(--neon-blue); }
  .neon-text-green { color: var(--neon-green); text-shadow: 0 0 10px var(--neon-green); }
  .neon-text-gold { color: var(--neon-gold); text-shadow: 0 0 10px var(--neon-gold); }
  .neon-text-pink { color: var(--neon-pink); text-shadow: 0 0 10px var(--neon-pink); }

  /* ── 维度条 ── */
  .dim-bar {
    height: 6px;
    background: var(--border);
    border-radius: 3px;
    overflow: hidden;
  }
  .dim-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 1s cubic-bezier(.4,0,.2,1);
    box-shadow: 0 0 6px currentColor;
  }

  /* ── 动画 ── */
  @keyframes flicker {
    0%, 95%, 100% { opacity: 1; }
    96% { opacity: 0.8; }
    97% { opacity: 1; }
    98% { opacity: 0.9; }
  }
  @keyframes slide-in-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes glow-pulse {
    0%, 100% { text-shadow: 0 0 10px currentColor; }
    50% { text-shadow: 0 0 20px currentColor, 0 0 30px currentColor; }
  }
  @keyframes scan-h {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  @keyframes draw-in {
    from { clip-path: inset(0 100% 0 0); }
    to { clip-path: inset(0 0% 0 0); }
  }

  .sg-animate-in {
    animation: slide-in-up 0.4s ease both;
  }
  .sg-flicker { animation: flicker 8s infinite; }
  .sg-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }

  /* ── 打字机效果 ── */
  .typewriter {
    overflow: hidden;
    white-space: nowrap;
    animation: draw-in 1.2s steps(40) both;
  }

  /* ── 稀有度徽章 ── */
  .rarity-badge {
    display: inline-flex;
    align-items: center;
    padding: 2px 10px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
  }

  /* ── 极性指示器 ── */
  .pole-chip {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 2px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
  }

  @media (max-width: 600px) {
    .sg-option { font-size: 13px; padding: 14px 16px; }
    .sg-btn { padding: 10px 20px; font-size: 13px; }
  }
`

// ─── 维度配置 ────────────────────────────────────────────
const DIM_CONFIG = [
  { key: 'STR', poles: ['武力', '智谋'], colors: ['#FF4444', '#00B4FF'], icon: '⚔' },
  { key: 'LED', poles: ['独断', '纳谏'], colors: ['#FF8C00', '#8B00FF'], icon: '👑' },
  { key: 'EMO', poles: ['热血', '冷静'], colors: ['#FF1493', '#00CED1'], icon: '🔥' },
  { key: 'LOY', poles: ['忠义', '实用'], colors: ['#00FF87', '#FFD700'], icon: '⚖' },
  { key: 'SOC', poles: ['张扬', '内敛'], colors: ['#FF6B35', '#9370DB'], icon: '🎭' },
  { key: 'AMB', poles: ['称霸', '辅佐'], colors: ['#FFD700', '#3CB371'], icon: '🏔' },
]

// ─── 主组件 ──────────────────────────────────────────────
type Screen = 'intro' | 'test' | 'result'

export default function SanguoPage() {
  const [screen, setScreen] = useState<Screen>('intro')
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [result, setResult] = useState<ReturnType<typeof calculateResult> | null>(null)
  const [charObj, setCharObj] = useState<SanguoChar | null>(null)
  const [animKey, setAnimKey] = useState(0)
  const [revealDims, setRevealDims] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [isVerified, setIsVerified] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // 1. 设置页面标题
  useEffect(() => {
    document.title = '三国人格测试 · 赛博英雄图谱 - CYBER KINGDOMS'
  }, [])

  const total = questions.length

  // 选择选项
  const handleSelect = useCallback((idx: number) => {
    setSelected(idx)
  }, [])

  // 下一题
  const handleNext = useCallback(() => {
    if (selected === null) return
    const newAnswers = [...answers, selected]
    setAnswers(newAnswers)
    setSelected(null)
    setAnimKey(k => k + 1)

    if (current + 1 < total) {
      setCurrent(c => c + 1)
    } else {
      // 计算结果
      const res = calculateResult(scoreMap(newAnswers))
      setResult(res)
      setCharObj(res.character)

      // ── 上报数据 ─────────────────────────────────────
      fetch('/api/sanguo/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          result_code: res.character.code,
          match_score: res.matchScore,
          dim_scores: res.dimScores,
          captchaToken: captchaToken, 
        }),
      }).catch(() => {})

      setScreen('result')
      setTimeout(() => setRevealDims(true), 800)
    }
  }, [selected, answers, current, total, captchaToken])

  // 重置
  const handleRestart = useCallback(() => {
    setScreen('intro')
    setCurrent(0)
    setAnswers([])
    setSelected(null)
    setResult(null)
    setCharObj(null)
    setRevealDims(false)
    setAnimKey(k => k + 1)
  }, [])

  // 开始测试
  const handleStart = useCallback(() => {
    setScreen('test')
    setAnimKey(k => k + 1)
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div className="sg-root" ref={containerRef}>
        <div className="sg-scanlines" />
        <Script 
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" 
          strategy="afterInteractive" 
        />
        <div className="sg-content">
          {!isVerified ? (
            <VerificationGuard 
              onVerify={(token) => {
                setCaptchaToken(token)
                setTimeout(() => setIsVerified(true), 1000)
              }} 
            />
          ) : (
            <div className="sg-animate-in">
              {screen === 'intro' && <IntroScreen onStart={handleStart} />}
              {screen === 'test' && (
                <TestScreen
                  key={animKey}
                  question={questions[current]}
                  current={current}
                  total={total}
                  selected={selected}
                  onSelect={handleSelect}
                  onNext={handleNext}
                />
              )}
              {screen === 'result' && result && charObj && (
                <ResultScreen
                  result={result}
                  char={charObj}
                  revealDims={revealDims}
                  onRestart={handleRestart}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// ─── 验证卫兵 ──────────────────────────────────────────
function VerificationGuard({ onVerify }: { onVerify: (t: string) => void }) {
  const widgetRef = useRef<HTMLDivElement>(null)
  const rendered = useRef(false)

  useEffect(() => {
    const renderWidget = () => {
      if (typeof window !== 'undefined' && (window as any).turnstile && widgetRef.current && !rendered.current) {
        widgetRef.current.innerHTML = '' 
        ;(window as any).turnstile.render(widgetRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
          theme: 'dark',
          callback: (token: string) => onVerify(token),
        })
        rendered.current = true
      } else if (!rendered.current) {
        setTimeout(renderWidget, 500)
      }
    }
    renderWidget()
  }, [onVerify])

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ marginBottom: 32, animation: 'sg-flicker 3s infinite' }}>
        <h2 style={{ fontFamily: "'Ma Shan Zheng', serif", fontSize: 32, color: '#fff', marginBottom: 12, letterSpacing: 4 }}>
          身份鉴别
        </h2>
        <p style={{ color: '#4a6080', fontSize: 13, letterSpacing: 1, opacity: 0.8 }}>
          正在通过赛博网关，请证明你不是 AI 仿生人
        </p>
      </div>
      <div ref={widgetRef} style={{ minHeight: 65 }} />
      <div style={{ marginTop: 60, borderTop: '1px solid #1a2a4a', paddingTop: 20, width: 200, opacity: 0.3 }}>
        <div style={{ fontSize: 9, color: '#4a6080', letterSpacing: 2 }}>SECURITY LEVEL: NANOBANANA</div>
      </div>
    </div>
  )
}

// ─── 介绍页 ──────────────────────────────────────────────
function IntroScreen({ onStart }: { onStart: () => void }) {
  const [stats, setStats] = useState<{ total: number } | null>(null)

  useEffect(() => {
    fetch('/api/sanguo/stats')
      .then(r => r.json())
      .then(data => setStats(data))
      .catch(() => {})
  }, [])
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 60, paddingBottom: 60 }}>
      {/* 顶部标志 */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          padding: '6px 20px',
          border: '1px solid #1a2a4a',
          marginBottom: 24,
          fontSize: 12,
          letterSpacing: 4,
          color: '#4a6080',
        }}>
          <span>三国</span>
          <span style={{ color: '#00B4FF' }}>◆</span>
          <span>CYBER KINGDOMS</span>
          <span style={{ color: '#00B4FF' }}>◆</span>
          <span>人格测试</span>
        </div>

        <h1 className="sg-flicker" style={{
          fontSize: 'clamp(36px, 8vw, 72px)',
          fontFamily: "'Ma Shan Zheng', serif",
          fontWeight: 400,
          color: '#fff',
          lineHeight: 1.1,
          marginBottom: 8,
          textShadow: '0 0 40px rgba(0,180,255,0.5)',
        }}>
          三国人格
        </h1>
        <h2 style={{
          fontSize: 'clamp(14px, 3vw, 22px)',
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 300,
          letterSpacing: 8,
          color: '#00B4FF',
          textShadow: '0 0 15px rgba(0,180,255,0.6)',
          margin: 0,
        }}>
          CYBER WARLORD PROFILING
        </h2>
      </div>

      {/* 中央卡片 */}
      <div className="neon-box" style={{ padding: '40px 40px', marginBottom: 40, maxWidth: 600, margin: '0 auto 40px' }}>
        <p style={{
          fontFamily: "'Noto Serif SC', serif",
          fontSize: 15,
          lineHeight: 2,
          color: '#c8d8f0',
          textAlign: 'center',
          margin: 0,
        }}>
          乱世之中，英雄辈出。<br />
          你的决策方式、性格特质、价值取向——<br />
          在三国这个精英浓度最高的时代，<br />
          你最像哪个人物？
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 24,
          marginTop: 28,
          flexWrap: 'wrap',
        }}>
          {Object.entries(FACTION_COLORS).map(([key, val]) => (
            <div key={key} style={{ textAlign: 'center' }}>
              <div style={{
                width: 32,
                height: 32,
                border: `1px solid ${val.neon}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 4px',
                fontSize: 16,
                color: val.neon,
                boxShadow: val.glow,
                fontFamily: "'Ma Shan Zheng', serif",
              }}>{val.label}</div>
              <div style={{ fontSize: 10, color: '#4a6080', letterSpacing: 1 }}>{key.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 测试信息 */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 40,
        marginBottom: 40,
        flexWrap: 'wrap',
      }}>
        {[
          { label: '测试题目', value: '25' },
          { label: '人物总数', value: '90+' },
          { label: '维度分析', value: '6' },
        ].map(item => (
          <div key={item.label} style={{ textAlign: 'center' }}>
            <div className="neon-text-blue" style={{ fontSize: 32, fontWeight: 700, fontFamily: "'Rajdhani', sans-serif" }}>{item.value}</div>
            <div style={{ fontSize: 11, color: '#4a6080', letterSpacing: 2, marginTop: 2 }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* 实时参与人数 */}
      {stats && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          marginBottom: 32, fontSize: 13, color: '#4a6080',
          animation: 'slide-in-up 0.6s ease both',
        }}>
          <span style={{ display: 'inline-flex', gap: -6 }}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{
                width: 20, height: 20, borderRadius: '50%',
                background: `hsl(${i * 60 + 180}, 70%, 50%)`,
                border: '2px solid #050810',
                marginLeft: i > 0 ? -8 : 0,
              }} />
            ))}
          </span>
          <span>
            已有 <strong className="neon-text-blue" style={{ fontSize: 16 }}>{stats.total.toLocaleString()}</strong> 位主公建立档案
          </span>
        </div>
      )}

      {/* 开始按钮 */}
      <div style={{ textAlign: 'center' }}>
        <button className="sg-btn primary gold" onClick={onStart} style={{ fontSize: 16, padding: '16px 48px' }}>
          开始测试
          <span style={{ fontSize: 18 }}>▶</span>
        </button>
      </div>

      {/* 人物预览 */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 16,
        marginTop: 48,
        flexWrap: 'wrap',
        opacity: 0.6,
      }}>
        {['CAOCAO', 'ZHUGELIANG', 'SUNQUAN', 'LVBU', 'ZHOUYU'].map(code => {
          const ch = characters.find(c => c.code === code)
          if (!ch) return null
          return (
            <div key={code} style={{ textAlign: 'center' }}>
              <SanguoPixelChar code={code} color={ch.color} size={4} />
              <div style={{ fontSize: 10, color: '#4a6080', marginTop: 4 }}>{ch.name}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── 测试页 ──────────────────────────────────────────────
function TestScreen({
  question, current, total, selected, onSelect, onNext
}: {
  question: typeof questions[0]
  current: number
  total: number
  selected: number | null
  onSelect: (i: number) => void
  onNext: () => void
}) {
  const progress = ((current) / total) * 100

  return (
    <div className="sg-animate-in" style={{ paddingTop: 48, paddingBottom: 48 }}>
      {/* 顶部 Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 11, color: '#4a6080', letterSpacing: 3 }}>
            QUESTION {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <span style={{
            fontSize: 11,
            color: '#00B4FF',
            letterSpacing: 2,
            padding: '2px 10px',
            border: '1px solid #1a2a4a',
          }}>
            {question.group}
          </span>
        </div>
        <div className="sg-progress-bar">
          <div className="sg-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} style={{
              flex: 1,
              height: 2,
              background: i < current ? '#00B4FF' : i === current ? 'rgba(0,180,255,0.4)' : 'transparent',
              margin: '0 1px',
            }} />
          ))}
        </div>
      </div>

      {/* 题目 */}
      <div className="neon-box" style={{ padding: '28px 28px', marginBottom: 28 }}>
        <p style={{
          fontFamily: "'Noto Serif SC', serif",
          fontSize: 'clamp(16px, 2.5vw, 20px)',
          lineHeight: 1.8,
          color: '#fff',
          margin: 0,
        }}>
          {question.text}
        </p>
      </div>

      {/* 选项 */}
      <div style={{ marginBottom: 32 }}>
        {question.options.map((opt, i) => (
          <button
            key={i}
            className={`sg-option ${selected === i ? 'selected' : ''}`}
            onClick={() => onSelect(i)}
          >
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 22,
              height: 22,
              border: `1px solid ${selected === i ? '#00B4FF' : '#1a2a4a'}`,
              marginRight: 12,
              fontSize: 11,
              color: selected === i ? '#00B4FF' : '#4a6080',
              flexShrink: 0,
              fontFamily: "'Rajdhani', sans-serif",
              letterSpacing: 0,
            }}>
              {String.fromCharCode(65 + i)}
            </span>
            {opt.text}
          </button>
        ))}
      </div>

      {/* 下一步 */}
      <div style={{ textAlign: 'right' }}>
        <button
          className="sg-btn primary"
          onClick={onNext}
          disabled={selected === null}
        >
          {current + 1 < total ? '下一题' : '查看结果'}
          <span>→</span>
        </button>
      </div>
    </div>
  )
}

// ─── 结果页 ──────────────────────────────────────────────
function ResultScreen({
  result, char, revealDims, onRestart
}: {
  result: ReturnType<typeof calculateResult>
  char: SanguoChar
  revealDims: boolean
  onRestart: () => void
}) {
  const [stats, setStats] = useState<{ total: number; top5: { code: string; pct: number }[] } | null>(null)

  useEffect(() => {
    fetch('/api/sanguo/stats')
      .then(r => r.json())
      .then(data => setStats(data))
      .catch(() => {})
  }, [])

  const factionInfo = FACTION_COLORS[char.faction]
  const rarityInfo = RARITY_LABELS[char.rarity]

  const dimScores = result.dimScores

  return (
    <div className="sg-animate-in" style={{ paddingTop: 48, paddingBottom: 80 }}>
      {/* 标题 */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: '#4a6080', marginBottom: 12 }}>
          PROFILE IDENTIFIED
        </div>
        <div style={{
          fontSize: 'clamp(12px, 2vw, 14px)',
          letterSpacing: 6,
          color: factionInfo.neon,
          textShadow: factionInfo.glow,
          marginBottom: 4,
        }}>
          {factionInfo.label}国·{char.faction.toUpperCase()}
        </div>
      </div>

      {/* 主角色卡 */}
      <div className="sg-char-card" style={{
        padding: '36px 32px',
        marginBottom: 32,
        borderColor: char.color,
        boxShadow: `0 0 40px ${char.color}30, inset 0 0 60px ${char.color}08`,
      }}>
        {/* 顶部信息 */}
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* 像素人物 */}
          <div style={{
            flexShrink: 0,
            padding: 16,
            border: `1px solid ${char.color}40`,
            background: `${char.color}10`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <SanguoPixelChar code={char.code} color={char.color} size={6} />
          </div>

          {/* 文字信息 */}
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10, flexWrap: 'wrap' }}>
              <span
                className="rarity-badge"
                style={{ background: `${rarityInfo.color}22`, color: rarityInfo.color, borderColor: rarityInfo.color }}
              >
                {rarityInfo.label}
              </span>
              <span style={{
                fontSize: 11,
                color: factionInfo.neon,
                border: `1px solid ${factionInfo.neon}44`,
                padding: '2px 8px',
                letterSpacing: 1,
              }}>
                {factionInfo.label}国
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(32px, 6vw, 52px)',
              fontFamily: "'Ma Shan Zheng', serif",
              fontWeight: 400,
              color: '#fff',
              margin: '0 0 4px',
              textShadow: `0 0 20px ${char.color}`,
              lineHeight: 1,
            }}>
              {char.name}
            </h2>
            <div style={{
              fontSize: 14,
              color: char.color,
              fontFamily: "'Noto Serif SC', serif",
              marginBottom: 16,
              textShadow: `0 0 8px ${char.color}`,
            }}>
              {char.title}
            </div>

            {/* 契合度 */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 16px',
              background: `${char.color}15`,
              border: `1px solid ${char.color}40`,
            }}>
              <span style={{ fontSize: 11, color: '#4a6080', letterSpacing: 2 }}>MATCH</span>
              <span style={{
                fontSize: 28,
                fontWeight: 700,
                color: char.color,
                fontFamily: "'Rajdhani', sans-serif",
                textShadow: `0 0 10px ${char.color}`,
              }}>
                {result.matchScore}%
              </span>
            </div>
          </div>
        </div>

        {/* 名言 */}
        <div style={{
          margin: '24px 0',
          padding: '16px 20px',
          borderLeft: `3px solid ${char.color}`,
          background: `${char.color}08`,
        }}>
          <p style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 14,
            color: '#c8d8f0',
            margin: 0,
            fontStyle: 'italic',
            letterSpacing: 1,
          }}>
            「{char.tagline}」
          </p>
        </div>

        {/* 描述 */}
        <p style={{
          fontFamily: "'Noto Serif SC', serif",
          fontSize: 14,
          lineHeight: 2,
          color: '#8a9ab8',
          margin: 0,
        }}>
          {char.description}
        </p>
      </div>

      {/* 六维分析 */}
      <div className="neon-box" style={{ padding: '28px 28px', marginBottom: 28 }}>
        <div style={{
          fontSize: 11,
          letterSpacing: 4,
          color: '#4a6080',
          marginBottom: 20,
        }}>
          PERSONALITY ANALYSIS · 六维人格分析
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          {DIM_CONFIG.map((dim, i) => {
            const raw = dimScores[dim.key as keyof typeof dimScores] ?? 0
            // 将原始分数归一化到 0-100，0=极左极, 100=极右极
            const normalized = Math.max(0, Math.min(100, 50 + raw * 5))
            const leftPct = normalized <= 50 ? (50 - normalized) * 2 : 0
            const rightPct = normalized > 50 ? (normalized - 50) * 2 : 0
            const isLeft = normalized <= 50
            const dominant = isLeft ? dim.poles[0] : dim.poles[1]
            const dominantColor = isLeft ? dim.colors[0] : dim.colors[1]

            return (
              <div key={dim.key} style={{ animationDelay: `${i * 100}ms` }}
                className={revealDims ? 'sg-animate-in' : ''}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: '#4a6080', fontFamily: "'Rajdhani', sans-serif", letterSpacing: 1 }}>{dim.key}</span>
                    <span
                      className="pole-chip"
                      style={{ background: `${dominantColor}22`, color: dominantColor, fontSize: 11 }}
                    >
                      {dominant}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: '#4a6080' }}>{dim.poles[0]}</span>
                    <span style={{ fontSize: 11, color: '#1a2a4a', margin: '0 4px' }}>←→</span>
                    <span style={{ fontSize: 11, color: '#4a6080' }}>{dim.poles[1]}</span>
                  </div>
                </div>

                {/* 双向进度条 */}
                <div style={{ display: 'flex', gap: 2, height: 8 }}>
                  {/* 左侧 */}
                  <div style={{ flex: 1, background: '#0d1526', borderRadius: '3px 0 0 3px', overflow: 'hidden', display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{
                      height: '100%',
                      width: revealDims ? `${leftPct}%` : '0%',
                      background: dim.colors[0],
                      borderRadius: '3px 0 0 3px',
                      transition: `width 1s cubic-bezier(.4,0,.2,1) ${i * 100}ms`,
                      boxShadow: `0 0 6px ${dim.colors[0]}`,
                    }} />
                  </div>
                  {/* 中线 */}
                  <div style={{ width: 2, background: '#1a2a4a', flexShrink: 0 }} />
                  {/* 右侧 */}
                  <div style={{ flex: 1, background: '#0d1526', borderRadius: '0 3px 3px 0', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: revealDims ? `${rightPct}%` : '0%',
                      background: dim.colors[1],
                      borderRadius: '0 3px 3px 0',
                      transition: `width 1s cubic-bezier(.4,0,.2,1) ${i * 100}ms`,
                      boxShadow: `0 0 6px ${dim.colors[1]}`,
                    }} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 相似人物：同派系中匹配度次高的 2 位 */}
      {(() => {
        const similar = characters
          .filter(c => c.code !== char.code && c.faction === char.faction)
          .slice(0, 2)
        if (similar.length === 0) return null
        return (
          <div className="neon-box" style={{ padding: '24px 28px', marginBottom: 32 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, color: '#4a6080', marginBottom: 16 }}>
              SIMILAR PROFILES · 相近人格
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {similar.map(ch2 => (
                <div key={ch2.code} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 14px',
                  border: `1px solid ${ch2.color}30`,
                  background: `${ch2.color}08`,
                  flex: '1 1 140px',
                }}>
                  <SanguoPixelChar code={ch2.code} color={ch2.color} size={3} />
                  <div>
                    <div style={{ fontSize: 14, color: '#fff', fontFamily: "'Noto Serif SC', serif" }}>{ch2.name}</div>
                    <div style={{ fontSize: 11, color: ch2.color }}>{ch2.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })()}

      {/* 全体数据统计 */}
      {stats && (
        <div className="neon-box" style={{ padding: '24px 28px', marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: '#4a6080', marginBottom: 16 }}>
            POPULARITY ANALYTICS · 全体数据对比
          </div>
          <p style={{ fontSize: 12, color: '#8a9ab8', marginBottom: 20 }}>
            基于已有 <strong className="neon-text-blue">{stats.total}</strong> 份英雄档案得出：
          </p>
          <div style={{ display: 'grid', gap: 12 }}>
            {stats.top5.map((item, idx) => {
              const ch = characters.find(c => c.code === item.code)
              if (!ch) return null
              return (
                <div key={item.code} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 30, fontSize: 12, color: '#4a6080', fontWeight: 600 }}>#{idx + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 13, color: '#fff' }}>{ch.name}</span>
                      <span style={{ fontSize: 11, color: ch.color }}>{item.pct}%</span>
                    </div>
                    <div style={{ height: 4, background: '#0d1526', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${item.pct}%`,
                        background: ch.color,
                        boxShadow: `0 0 6px ${ch.color}`,
                        transition: 'width 1s ease 0.5s',
                      }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* 底部按钮 */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="sg-btn" onClick={onRestart}>
          重新测试
        </button>
        <button className="sg-btn gold" onClick={() => {
          const text = `我在三国人格测试中匹配到了 ${char.name}（${char.title}），契合度 ${result.matchScore}%！${char.tagline}`
          if (navigator.share) {
            navigator.share({ title: '三国人格测试', text })
          } else {
            navigator.clipboard?.writeText(text)
          }
        }}>
          分享结果
        </button>
      </div>
    </div>
  )
}
