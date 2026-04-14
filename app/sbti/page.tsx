'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import {
  questions, calculateResult, personalities,
  DIM_META, DIM_EXPLAIN,
} from './data'
import type { DimKey, DimLevel, CalcResult } from './data'
import { PixelCharacter, PIXEL_CHARS } from './pixel-characters'

// ─── localStorage 键 ────────────────────────────────────
const LS_KEY = 'sbti_progress_v1'

interface SavedProgress {
  phase: 'test'
  qIndex: number
  rawScores: Partial<Record<DimKey, number>>
  drinkTriggered: boolean
  drunkUnlocked: boolean
}

function saveProgress(p: SavedProgress) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(p)) } catch {}
}

function loadProgress(): SavedProgress | null {
  try {
    const s = localStorage.getItem(LS_KEY)
    if (!s) return null
    return JSON.parse(s) as SavedProgress
  } catch { return null }
}

function clearProgress() {
  try { localStorage.removeItem(LS_KEY) } catch {}
}

// ─── 主页面（答题） ────────────────────────────────────
export default function SBTIPage() {
  const [phase, setPhase] = useState<'intro' | 'test' | 'result'>('intro')
  const [qIndex, setQIndex] = useState(0)
  const [rawScores, setRawScores] = useState<Partial<Record<DimKey, number>>>({})
  const [drinkTriggered, setDrinkTriggered] = useState(false)
  const [drunkUnlocked, setDrunkUnlocked] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)
  const [animOut, setAnimOut] = useState(false)
  const [result, setResult] = useState<CalcResult | null>(null)
  const [resumeBanner, setResumeBanner] = useState(false)

  // 读取 localStorage 恢复进度
  useEffect(() => {
    const saved = loadProgress()
    if (saved) setResumeBanner(true)
  }, [])

  function resumeProgress() {
    const saved = loadProgress()
    if (!saved) return
    setQIndex(saved.qIndex)
    setRawScores(saved.rawScores)
    setDrinkTriggered(saved.drinkTriggered)
    setDrunkUnlocked(saved.drunkUnlocked)
    setResumeBanner(false)
    setPhase('test')
  }

  function discardProgress() {
    clearProgress()
    setResumeBanner(false)
  }

  const visibleQs = questions.filter(q => !q.isHidden || drinkTriggered)
  const current = visibleQs[qIndex]
  const total = visibleQs.length
  const progress = Math.round((qIndex / total) * 100)

  function handleOption(idx: number) {
    if (selected !== null || animOut) return
    setSelected(idx)

    const opt = current.options[idx]
    const next: Partial<Record<DimKey, number>> = { ...rawScores }
    for (const [dim, val] of Object.entries(opt.scores)) {
      const k = dim as DimKey
      next[k] = (next[k] ?? 0) + (val as number)
    }

    let newDrunk = drunkUnlocked
    let newDrink = drinkTriggered
    if (opt.drinkTrigger) newDrink = true
    if (opt.drunkUnlock) newDrunk = true

    setRawScores(next)
    if (newDrink !== drinkTriggered) setDrinkTriggered(newDrink)
    if (newDrunk !== drunkUnlocked) setDrunkUnlocked(newDrunk)

    setTimeout(() => {
      setAnimOut(true)
      setTimeout(() => {
        const nextQs = questions.filter(q => !q.isHidden || newDrink)
        const nextIdx = qIndex + 1
        if (nextIdx >= nextQs.length) {
          clearProgress()
          const r = calculateResult(next, newDrunk)
          setResult(r)
          // 上报测试结果（fire-and-forget，不阻塞 UI）
          fetch('/api/sbti/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              result_code: r.primary.code,
              match_rate: r.matchRate,
              dim_levels: r.dimLevels,
              dim_raw: r.dimRaw,
            }),
          }).catch(() => {})
          setPhase('result')
        } else {
          // 保存进度
          saveProgress({ phase: 'test', qIndex: nextIdx, rawScores: next, drinkTriggered: newDrink, drunkUnlocked: newDrunk })
          setQIndex(nextIdx)
        }
        setSelected(null)
        setAnimOut(false)
      }, 300)
    }, 550)
  }

  function restart() {
    clearProgress()
    setPhase('intro'); setQIndex(0); setRawScores({})
    setDrinkTriggered(false); setDrunkUnlocked(false)
    setSelected(null); setAnimOut(false); setResult(null)
  }

  if (phase === 'intro') return (
    <IntroScreen
      onStart={() => setPhase('test')}
      resumeBanner={resumeBanner}
      onResume={resumeProgress}
      onDiscard={discardProgress}
    />
  )
  if (phase === 'result' && result) return <ResultScreen result={result} onRestart={restart} />

  const groupColors: Record<string, string> = {
    '自我模型': '#FF6B35', '情感模型': '#E91E8C',
    '态度模型': '#7C3AED', '行动驱力模型': '#0EA5E9',
    '社交模型': '#10B981', '特殊': '#F59E0B',
  }
  const gc = groupColors[current.group] ?? '#FF6B35'

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#FFFBF0 0%,#FFF5E0 50%,#FFECD2 100%)', fontFamily:"'Noto Sans SC',sans-serif", position:'relative', overflow:'hidden' }}>
      <SunnyBg />

      {/* 进度条 */}
      <div style={{ position:'fixed', top:0, left:0, right:0, height:5, background:'rgba(0,0,0,0.06)', zIndex:100 }}>
        <div style={{ height:'100%', background:`linear-gradient(90deg,${gc},#FFD23F)`, width:`${progress}%`, transition:'width 0.4s ease', borderRadius:'0 4px 4px 0' }} />
      </div>

      {/* 题号 */}
      <div style={{ position:'fixed', top:12, right:16, zIndex:100, background:gc, color:'#fff', borderRadius:20, padding:'4px 14px', fontWeight:700, fontSize:13, boxShadow:`0 4px 12px ${gc}50` }}>
        {qIndex + 1} / {total}
      </div>

      <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'80px 16px 40px' }}>
        <div style={{ width:'100%', maxWidth:600, opacity:animOut?0:1, transform:animOut?'translateY(-16px)':'translateY(0)', transition:'opacity 0.3s ease,transform 0.3s ease' }}>

          <div style={{ marginBottom:16 }}>
            <span style={{ display:'inline-block', padding:'5px 16px', background:gc, color:'#fff', borderRadius:20, fontSize:12, fontWeight:700, letterSpacing:'0.05em', boxShadow:`0 4px 12px ${gc}40` }}>
              {current.group}
            </span>
          </div>

          {/* 题目卡片 */}
          <div style={{ background:'#fff', borderRadius:20, padding:'24px 24px', boxShadow:'0 8px 40px rgba(0,0,0,0.08)', marginBottom:16, border:`2px solid ${gc}20`, position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:0, right:0, width:70, height:70, background:`linear-gradient(225deg,${gc}18,transparent)`, borderRadius:'0 20px 0 70px' }} />
            <div style={{ fontSize:'clamp(16px,3.5vw,22px)', fontWeight:700, color:'#1a1a2e', lineHeight:1.65, position:'relative' }}>
              {current.text}
            </div>
          </div>

          {/* 选项 */}
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {current.options.map((opt, idx) => {
              const isSelected = selected === idx
              return (
                <button key={idx} onClick={() => handleOption(idx)} disabled={selected !== null} style={{
                  background: isSelected ? gc : '#fff',
                  border: `2px solid ${isSelected ? gc : 'rgba(0,0,0,0.08)'}`,
                  borderRadius:14, padding:'14px 18px', textAlign:'left',
                  color: isSelected ? '#fff' : '#2d2d2d',
                  fontFamily:"'Noto Sans SC',sans-serif", fontSize:'clamp(13px,2.5vw,15px)', lineHeight:1.6,
                  cursor: selected !== null ? 'default' : 'pointer',
                  width:'100%', display:'flex', alignItems:'center', gap:12,
                  transition:'all 0.2s ease',
                  boxShadow: isSelected ? `0 6px 20px ${gc}40` : '0 2px 8px rgba(0,0,0,0.05)',
                  transform: isSelected ? 'translateX(6px)' : 'translateX(0)',
                  WebkitTapHighlightColor: 'transparent',
                }}>
                  <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:30, height:30, borderRadius:'50%', background: isSelected?'rgba(255,255,255,0.25)':`${gc}15`, color: isSelected?'#fff':gc, fontSize:11, fontWeight:800, flexShrink:0 }}>
                    {isSelected ? '✓' : ['A','B','C'][idx]}
                  </span>
                  <span>{opt.text}</span>
                </button>
              )
            })}
          </div>

          {/* 进度点 */}
          <div style={{ display:'flex', justifyContent:'center', gap:3, marginTop:24, flexWrap:'wrap', maxWidth:'100%' }}>
            {Array.from({ length: Math.min(total,31) }, (_,i) => (
              <div key={i} style={{ width:i===qIndex?16:5, height:5, borderRadius:3, background:i<qIndex?gc:i===qIndex?gc:'rgba(0,0,0,0.12)', transition:'all 0.3s ease' }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── 介绍页 ────────────────────────────────────────────
function IntroScreen({ onStart, resumeBanner, onResume, onDiscard }: {
  onStart: () => void
  resumeBanner: boolean
  onResume: () => void
  onDiscard: () => void
}) {
  const [hover, setHover] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [stats, setStats] = useState<{ total: number; top5: { code: string; pct: number }[] } | null>(null)

  useEffect(() => { setTimeout(() => setMounted(true), 50) }, [])

  useEffect(() => {
    fetch('/api/sbti/stats?t=' + Date.now(), { cache: 'no-store' })
      .then(r => r.json())
      .then(data => setStats(data))
      .catch(() => {})
  }, [])

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#FFFBF0 0%,#FFF5E0 50%,#FFECD2 100%)', fontFamily:"'Noto Sans SC',sans-serif", display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 16px', position:'relative', overflow:'hidden' }}>
      <SunnyBg />

      {/* 恢复进度 banner */}
      {resumeBanner && (
        <div style={{
          position:'fixed', top:16, left:'50%', transform:'translateX(-50%)',
          zIndex:200, background:'#1a1a2e', color:'#fff', borderRadius:16,
          padding:'14px 20px', boxShadow:'0 8px 32px rgba(0,0,0,0.2)',
          display:'flex', alignItems:'center', gap:12, fontSize:13,
          maxWidth:'calc(100vw - 32px)', width:'max-content',
        }}>
          <span>⚡</span>
          <span>发现上次未完成的测试</span>
          <button onClick={onResume} style={{ background:'#FF6B35', color:'#fff', border:'none', borderRadius:8, padding:'5px 14px', fontSize:12, fontWeight:700, cursor:'pointer' }}>继续</button>
          <button onClick={onDiscard} style={{ background:'rgba(255,255,255,0.1)', color:'#ccc', border:'none', borderRadius:8, padding:'5px 10px', fontSize:12, cursor:'pointer' }}>重新开始</button>
        </div>
      )}

      <div style={{ position:'relative', zIndex:1, textAlign:'center', maxWidth:640, width:'100%',
        opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}>
        {/* Logo */}
        <div style={{ marginBottom:8, position:'relative', display:'inline-block',
          opacity: mounted ? 1 : 0, transform: mounted ? 'scale(1)' : 'scale(0.9)',
          transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
        }}>
          <div style={{ position:'absolute', top:-20, right:-30, fontSize:36, animation:'wobble 3s ease-in-out infinite' }}>✨</div>
          <div style={{ position:'absolute', bottom:-10, left:-24, fontSize:28, animation:'wobble2 4s ease-in-out infinite' }}>🌟</div>
          <div style={{ fontFamily:"'Fredoka One',cursive,'Noto Sans SC',sans-serif", fontSize:'clamp(64px,18vw,130px)', fontWeight:700, lineHeight:0.95, letterSpacing:'-0.02em', background:'linear-gradient(135deg,#FF6B35 0%,#FF2D78 40%,#7C3AED 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            SBTI
          </div>
        </div>

        <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:'clamp(14px,3vw,22px)', color:'#FF6B35', letterSpacing:'0.2em', marginBottom:24,
          opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.2s',
        }}>
          人 格 测 试
        </div>

        <div style={{ background:'#fff', borderRadius:20, padding:'20px 24px', marginBottom:24, boxShadow:'0 8px 32px rgba(255,107,53,0.12)', border:'2px solid rgba(255,107,53,0.1)', position:'relative',
          opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s',
        }}>
          <div style={{ position:'absolute', top:-12, left:20, background:'#FF6B35', color:'#fff', padding:'2px 12px', borderRadius:10, fontSize:11, fontWeight:700 }}>
            ⚡ 2026 最火测试
          </div>
          <p style={{ margin:0, color:'#555', fontSize:'clamp(13px,2vw,15px)', lineHeight:2 }}>
            不是玄学，不是算命。<br />
            <strong style={{ color:'#FF6B35' }}>31道题</strong> · <strong style={{ color:'#E91E8C' }}>15个维度</strong> · <strong style={{ color:'#7C3AED' }}>27种人格</strong><br />
            看见那个你不太敢承认的自己。
          </p>
        </div>

        <div style={{ display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center', marginBottom:32,
          opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.4s',
        }}>
          {[['官方曼哈顿算法','#FF6B35'],['隐藏结局 DRUNK','#F59E0B'],['HHHH 传说人格','#7C3AED'],['仅供娱乐','#10B981']].map(([t,c]) => (
            <span key={t} style={{ padding:'5px 14px', borderRadius:20, fontSize:11, fontWeight:700, background:`${c}18`, color:c, border:`1.5px solid ${c}30` }}>{t}</span>
          ))}
        </div>

        {/* 实时参与人数 */}
        {stats && stats.total > 0 && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            marginBottom: 20, fontSize: 13, color: '#888',
            opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.45s',
          }}>
            <span style={{ display:'inline-flex', gap:2 }}>
              {[...Array(Math.min(5, stats.total))].map((_,i) => (
                <span key={i} style={{ width:20, height:20, borderRadius:'50%', background:`hsl(${i*40+10},85%,60%)`, border:'2px solid #fff', marginLeft: i>0 ? -6 : 0, display:'inline-block' }} />
              ))}
            </span>
            <span>
              已有 <strong style={{ color:'#FF6B35', fontVariantNumeric:'tabular-nums' }}>
                {stats.total.toLocaleString()}
              </strong> 人完成测试
            </span>
          </div>
        )}

        <div style={{
          opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s',
        }}>
          <button onClick={onStart} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
            padding:'16px 56px',
            background: hover ? 'linear-gradient(135deg,#FF2D78,#FF6B35)' : 'linear-gradient(135deg,#FF6B35,#FF9F1C)',
            color:'#fff', border:'none', borderRadius:50,
            fontSize:'clamp(15px,3vw,18px)', fontFamily:"'Fredoka One',cursive,'Noto Sans SC',sans-serif",
            fontWeight:700, letterSpacing:'0.08em', cursor:'pointer',
            boxShadow: hover ? '0 12px 40px rgba(255,45,120,0.4)' : '0 8px 28px rgba(255,107,53,0.35)',
            transform: hover ? 'translateY(-3px) scale(1.03)' : 'translateY(0) scale(1)',
            transition:'all 0.25s ease',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
          }}>
            {hover ? '⚡ 开始测试！' : '开始测试'}
          </button>
        </div>

        <div style={{ display:'flex', gap:0, justifyContent:'center', marginTop:36, flexWrap:'wrap',
          opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.6s',
        }}>
          {[['31','道题目','#FF6B35'],['27','种人格','#E91E8C'],['15','维度','#7C3AED'],['1','隐藏结局','#F59E0B']].map(([n,l,c],i) => (
            <div key={l} style={{ textAlign:'center', padding:'0 16px', borderRight:i<3?'2px solid rgba(0,0,0,0.08)':'none' }}>
              <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:'clamp(28px,7vw,40px)', fontWeight:700, color:c, lineHeight:1 }}>{n}</div>
              <div style={{ fontSize:11, color:'#999', marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>

        <p style={{ marginTop:32, fontSize:11, color:'#bbb', lineHeight:2 }}>
          本测试仅供娱乐，别拿它当诊断、面试、相亲、分手、招魂、算命或人生判决书。
        </p>
      </div>
    </div>
  )
}

// ─── 结果页 ────────────────────────────────────────────
function ResultScreen({ result, onRestart }: { result: CalcResult; onRestart: () => void }) {
  const { primary, secondary, matchRate, dimLevels } = result
  const [step, setStep] = useState(0)
  const [copied, setCopied] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stats, setStats] = useState<{ total: number; top5: { code: string; pct: number }[]; dist: Record<string, number> } | null>(null)

  // 分步入场：0=hidden, 1=主卡片, 2=次要+按钮, 3=维度, 4=图鉴
  useEffect(() => {
    const timings = [150, 500, 900, 1300]
    const timers = timings.map((t, i) => setTimeout(() => setStep(i + 1), t))
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    fetch('/api/sbti/stats')
      .then(r => r.json())
      .then(data => setStats(data))
      .catch(() => {})
  }, [])

  // 计算精准命中维度数
  const DIM_KEYS = ['S1','S2','S3','E1','E2','E3','A1','A2','A3','Ac1','Ac2','Ac3','So1','So2','So3'] as DimKey[]
  function parsePatternLevels(pattern: string): DimLevel[] {
    return pattern.split('-').flatMap(seg => seg.split('').map(c => c as DimLevel))
  }
  const patternLevels = primary.pattern ? parsePatternLevels(primary.pattern) : []
  const exactHits = patternLevels.reduce((count, lvl, i) => {
    return count + (dimLevels[DIM_KEYS[i]] === lvl ? 1 : 0)
  }, 0)

  // 生成分享卡片
  const generateShareCard = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // 9:16 竖屏，适合手机分享
    const W = 1080, H = 1920
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext('2d')!

    const CJK = `"PingFang SC","Hiragino Sans GB","Microsoft YaHei","Noto Sans SC",sans-serif`

    // ── 背景：暖色阳光渐变 ──
    const bg = ctx.createLinearGradient(0, 0, W, H)
    bg.addColorStop(0,   '#FFFBF0')
    bg.addColorStop(0.5, '#FFF3DC')
    bg.addColorStop(1,   '#FFE8C2')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, W, H)

    // 右上装饰光晕（主色调）
    const glow1 = ctx.createRadialGradient(W, 0, 0, W, 0, 600)
    glow1.addColorStop(0, primary.color + '40')
    glow1.addColorStop(1, 'transparent')
    ctx.fillStyle = glow1
    ctx.fillRect(0, 0, W, H)

    // 左下装饰光晕
    const glow2 = ctx.createRadialGradient(0, H, 0, 0, H, 500)
    glow2.addColorStop(0, primary.color + '22')
    glow2.addColorStop(1, 'transparent')
    ctx.fillStyle = glow2
    ctx.fillRect(0, 0, W, H)

    // ── 顶部色条 ──
    ctx.fillStyle = primary.color
    ctx.fillRect(0, 0, W, 16)

    // ── 卡片主体（白色圆角面板）──
    const CARD_X = 64, CARD_Y = 80, CARD_W = W - 128, CARD_H = H - 220
    roundRect(ctx, CARD_X, CARD_Y, CARD_W, CARD_H, 40)
    ctx.fillStyle = 'rgba(255,255,255,0.88)'
    ctx.fill()

    // ── 像素角色 ──
    const charData = PIXEL_CHARS[primary.code]
    const PX = 22
    // 角色从卡片顶部内边距 100px 开始
    const CHAR_TOP = CARD_Y + 100
    const textCX = W / 2
    ctx.textAlign = 'center'

    if (charData) {
      const grid = charData.grid
      const cols = grid[0]?.length ?? 10
      const rows = grid.length
      const charW = cols * PX
      const charH = rows * PX
      const charX = Math.floor((W - charW) / 2)

      // 角色底部柔和阴影
      const shadow = ctx.createRadialGradient(
        W / 2, CHAR_TOP + charH + 10, 0,
        W / 2, CHAR_TOP + charH + 10, charW * 0.6
      )
      shadow.addColorStop(0, primary.color + '28')
      shadow.addColorStop(1, 'transparent')
      ctx.fillStyle = shadow
      ctx.fillRect(0, 0, W, H)

      grid.forEach((row, gy) => {
        row.split('').forEach((cell, gx) => {
          if (cell === '0') return
          if (cell === '1')      ctx.fillStyle = primary.color
          else if (cell === '2') ctx.fillStyle = charData.accent
          else if (cell === '3') ctx.fillStyle = '#ffffff'
          else if (cell === '4') ctx.fillStyle = '#2a2a3e'
          ctx.fillRect(charX + gx * PX, CHAR_TOP + gy * PX, PX - 2, PX - 2)
        })
      })
    }

    // ── 所有文字坐标：基于角色底部向下累加，间距充足 ──
    // canvas Y = baseline，所以 topY + fontSize ≈ baseline
    const charH_total = (charData ? charData.grid.length : 18) * PX
    const charBottom = CHAR_TOP + charH_total

    // 人格代号  fontSize=114  topMargin=72  bottomMargin=40
    const CODE_SIZE = 114
    const CODE_Y = charBottom + 72 + CODE_SIZE  // baseline = top + fontSize
    ctx.fillStyle = primary.color
    ctx.font = `bold ${CODE_SIZE}px "Arial", ${CJK}`
    ctx.fillText(primary.code, textCX, CODE_Y)

    // 稀有度 badge  topMargin=40  badgeH=60
    const BADGE_H = 60
    const BADGE_TOP = CODE_Y + 40
    const rarityText = primary.rarity === 'legendary' ? '★ 传说人格'
      : primary.rarity === 'rare' ? '◆ 稀有人格' : '普通人格'
    const rarityColor = primary.rarity === 'legendary' ? '#D97706'
      : primary.rarity === 'rare' ? '#7C3AED' : '#6B7280'
    ctx.font = `bold 30px ${CJK}`
    const badgeW = ctx.measureText(rarityText).width + 56
    roundRect(ctx, textCX - badgeW / 2, BADGE_TOP, badgeW, BADGE_H, 18)
    ctx.fillStyle = rarityColor + '22'
    ctx.fill()
    ctx.fillStyle = rarityColor
    ctx.fillText(rarityText, textCX, BADGE_TOP + 40)  // badge内文字垂直居中

    // 名称 + emoji  fontSize=76  topMargin=56
    const NAME_SIZE = 76
    const NAME_Y = BADGE_TOP + BADGE_H + 56 + NAME_SIZE
    ctx.fillStyle = '#1a1a2e'
    ctx.font = `bold ${NAME_SIZE}px ${CJK}`
    ctx.fillText(`${primary.emoji} ${primary.name}`, textCX, NAME_Y)

    // tagline  fontSize=36  topMargin=40
    const TAG_SIZE = 36
    const TAG_Y = NAME_Y + 40 + TAG_SIZE
    ctx.fillStyle = '#888899'
    ctx.font = `${TAG_SIZE}px ${CJK}`
    const tag = primary.tagline.length > 20
      ? primary.tagline.slice(0, 20) + '…'
      : primary.tagline
    ctx.fillText(`"${tag}"`, textCX, TAG_Y)

    // 分隔线  topMargin=64  bottomMargin=64
    const LINE_Y = TAG_Y + 64
    ctx.strokeStyle = primary.color + '35'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(CARD_X + 120, LINE_Y)
    ctx.lineTo(CARD_X + CARD_W - 120, LINE_Y)
    ctx.stroke()

    // 匹配度数字  fontSize=148  topMargin=64
    const RATE_SIZE = 148
    const RATE_Y = LINE_Y + 64 + RATE_SIZE
    ctx.fillStyle = primary.color
    ctx.font = `bold ${RATE_SIZE}px "Arial", ${CJK}`
    ctx.fillText(`${matchRate}%`, textCX, RATE_Y)

    // 匹配度标签  fontSize=36  topMargin=20
    const RATE_LABEL_SIZE = 36
    const RATE_LABEL_Y = RATE_Y + 20 + RATE_LABEL_SIZE
    ctx.fillStyle = '#aaaacc'
    ctx.font = `${RATE_LABEL_SIZE}px ${CJK}`
    ctx.fillText('匹配度', textCX, RATE_LABEL_Y)

    // 精准命中  fontSize=40  topMargin=44
    const HIT_SIZE = 40
    const HIT_Y = RATE_LABEL_Y + 44 + HIT_SIZE
    ctx.fillStyle = '#44445a'
    ctx.font = `bold ${HIT_SIZE}px ${CJK}`
    ctx.fillText(`精准命中 ${exactHits} / 15 维`, textCX, HIT_Y)

    // 底部水印（固定贴底）
    ctx.fillStyle = primary.color + '60'
    ctx.font = `bold 34px "Arial", ${CJK}`
    ctx.fillText('SBTI · 人格测试', textCX, H - 90)

    // 下载
    const a = document.createElement('a')
    a.download = `sbti-${primary.code}.png`
    a.href = canvas.toDataURL('image/png')
    a.click()
  }, [primary, matchRate, exactHits])

  // 生成像素头像（512×512 方形，适合当头像）
  const generateAvatar = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const SIZE = 512
    canvas.width = SIZE
    canvas.height = SIZE
    const ctx = canvas.getContext('2d')!

    // 背景：用人格主色调渐变
    const bg = ctx.createLinearGradient(0, 0, SIZE, SIZE)
    bg.addColorStop(0, primary.color + 'CC')
    bg.addColorStop(1, primary.color + '55')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, SIZE, SIZE)

    // 内圆底色
    const innerBg = ctx.createRadialGradient(SIZE / 2, SIZE / 2, 0, SIZE / 2, SIZE / 2, SIZE * 0.48)
    innerBg.addColorStop(0, 'rgba(255,255,255,0.22)')
    innerBg.addColorStop(1, 'rgba(255,255,255,0.04)')
    ctx.fillStyle = innerBg
    ctx.fillRect(0, 0, SIZE, SIZE)

    // 绘制像素角色（居中，大像素块）
    const charData = PIXEL_CHARS[primary.code]
    if (charData) {
      const grid = charData.grid
      const cols = grid[0]?.length ?? 10
      const rows = grid.length
      // 像素块大小：让角色占画布约 70%
      const PX = Math.floor((SIZE * 0.70) / Math.max(cols, rows))
      const charW = cols * PX
      const charH = rows * PX
      const offX = Math.floor((SIZE - charW) / 2)
      const offY = Math.floor((SIZE - charH) / 2)

      // 底部阴影
      const shadow = ctx.createRadialGradient(
        SIZE / 2, offY + charH + 8, 0,
        SIZE / 2, offY + charH + 8, charW * 0.55
      )
      shadow.addColorStop(0, 'rgba(0,0,0,0.25)')
      shadow.addColorStop(1, 'transparent')
      ctx.fillStyle = shadow
      ctx.fillRect(0, 0, SIZE, SIZE)

      grid.forEach((row, gy) => {
        row.split('').forEach((cell, gx) => {
          if (cell === '0') return
          if (cell === '1')      ctx.fillStyle = '#ffffff'
          else if (cell === '2') ctx.fillStyle = charData.accent
          else if (cell === '3') ctx.fillStyle = primary.color
          else if (cell === '4') ctx.fillStyle = '#1a1a2e'
          // 像素块之间留 1px 间隙
          ctx.fillRect(offX + gx * PX, offY + gy * PX, PX - 1, PX - 1)
        })
      })
    }

    // 右下角水印
    const CJK = `"PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif`
    ctx.font = `bold ${Math.floor(SIZE * 0.045)}px ${CJK}`
    ctx.fillStyle = 'rgba(255,255,255,0.55)'
    ctx.textAlign = 'right'
    ctx.fillText('SBTI', SIZE - 18, SIZE - 16)

    const a = document.createElement('a')
    a.download = `sbti-avatar-${primary.code}.png`
    a.href = canvas.toDataURL('image/png')
    a.click()
  }, [primary])

  function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number | number[]) {
    const [tl, tr, br, bl] = Array.isArray(r) ? r : [r, r, r, r]
    ctx.beginPath()
    ctx.moveTo(x + tl, y)
    ctx.lineTo(x + w - tr, y)
    ctx.quadraticCurveTo(x + w, y, x + w, y + tr)
    ctx.lineTo(x + w, y + h - br)
    ctx.quadraticCurveTo(x + w, y + h, x + w - br, y + h)
    ctx.lineTo(x + bl, y + h)
    ctx.quadraticCurveTo(x, y + h, x, y + h - bl)
    ctx.lineTo(x, y + tl)
    ctx.quadraticCurveTo(x, y, x + tl, y)
    ctx.closePath()
  }

  function handleCopy() {
    navigator.clipboard.writeText(`我的 SBTI 人格是：${primary.name}（${primary.code}）${primary.emoji}\n"${primary.tagline}"\n匹配度 ${matchRate}% · 精准命中 ${exactHits}/15 维\n测一测你的：https://sbti.fancc.de5.net`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const groups = [
    { label:'自我模型', dims:['S1','S2','S3'] as DimKey[], color:'#FF6B35' },
    { label:'情感模型', dims:['E1','E2','E3'] as DimKey[], color:'#E91E8C' },
    { label:'态度模型', dims:['A1','A2','A3'] as DimKey[], color:'#7C3AED' },
    { label:'行动驱力', dims:['Ac1','Ac2','Ac3'] as DimKey[], color:'#0EA5E9' },
    { label:'社交模型', dims:['So1','So2','So3'] as DimKey[], color:'#10B981' },
  ]

  const rarityLabel = primary.rarity === 'legendary'
    ? { text:'🌟 传说人格', bg:'#F59E0B', color:'#fff' }
    : primary.rarity === 'rare'
    ? { text:'✦ 稀有人格', bg:'#7C3AED', color:'#fff' }
    : { text:'普通人格', bg:'rgba(0,0,0,0.06)', color:'#888' }

  const fadeIn = (visible: boolean, delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
  })

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#FFFBF0 0%,#FFF5E0 50%,#FFECD2 100%)', fontFamily:"'Noto Sans SC',sans-serif", padding:'40px 16px 48px', position:'relative', overflow:'hidden' }}>
      <SunnyBg />
      {/* 隐藏 canvas for share card */}
      <canvas ref={canvasRef} style={{ display:'none' }} />

      <div style={{ maxWidth:680, margin:'0 auto', position:'relative', zIndex:1 }}>

        {/* ── 主人格卡片 ── */}
        <div style={{ ...fadeIn(step >= 1), background:'#fff', borderRadius:24, boxShadow:`0 16px 60px ${primary.color}25`, border:`2px solid ${primary.color}18`, marginBottom:14, position:'relative', overflow:'hidden' }}>
          {/* 顶部渐变色条 */}
          <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:`linear-gradient(90deg,${primary.color},#FFD23F)` }} />

          {/* 稀有度 badge 行 */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 20px 0' }}>
            <span style={{ padding:'4px 12px', borderRadius:20, fontSize:10, fontWeight:700, letterSpacing:'0.08em', background:rarityLabel.bg, color:rarityLabel.color }}>
              {rarityLabel.text} · {primary.rarityRate}
            </span>
            {primary.pattern && (
              <span style={{ fontSize:10, background:`${primary.color}12`, color:primary.color, padding:'4px 10px', borderRadius:20, fontWeight:700 }}>
                命中 {exactHits}/15 维
              </span>
            )}
          </div>

          {/* 主体：左列（像素角色+匹配度）+ 右列（代号+名称+引言+描述）*/}
          <div style={{ display:'flex', gap:0, padding:'16px 20px 20px' }}>

            {/* 左列 */}
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8, flexShrink:0, width:130 }}>
              {/* 像素角色卡 */}
              <div style={{ background:`${primary.color}0d`, borderRadius:16, padding:'12px 12px 6px', border:`2px solid ${primary.color}18`, position:'relative', width:'100%', display:'flex', justifyContent:'center' }}>
                <div style={{ position:'absolute', bottom:6, left:'50%', transform:'translateX(-50%)', width:52, height:5, borderRadius:'50%', background:`${primary.color}20`, filter:'blur(4px)' }} />
                <PixelCharacter code={primary.code} color={primary.color} size={18} animate />
              </div>
              {/* 匹配度数字 */}
              <div style={{ textAlign:'center', background:`${primary.color}08`, borderRadius:12, padding:'8px 0', width:'100%' }}>
                <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:28, color:primary.color, lineHeight:1, fontWeight:700 }}>{matchRate}%</div>
                <div style={{ fontSize:10, color:'#bbb', marginTop:2, letterSpacing:'0.05em' }}>匹配度</div>
              </div>
            </div>

            {/* 分割线 */}
            <div style={{ width:1, background:`${primary.color}15`, margin:'0 16px', flexShrink:0, borderRadius:1 }} />

            {/* 右列 */}
            <div style={{ flex:1, minWidth:0, display:'flex', flexDirection:'column', gap:8 }}>
              {/* 代号 + emoji名 */}
              <div>
                <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:'clamp(38px,10vw,68px)', fontWeight:700, lineHeight:0.85, color:primary.color, letterSpacing:'-0.01em', wordBreak:'break-all' }}>
                  {primary.code}
                </div>
                <div style={{ fontSize:13, color:'#999', marginTop:5, fontWeight:400, display:'flex', alignItems:'center', gap:5 }}>
                  <span style={{ fontSize:16 }}>{primary.emoji}</span>
                  <span>{primary.name}</span>
                </div>
              </div>

              {/* 引言气泡 */}
              <div style={{ background:`${primary.color}0f`, border:`1.5px solid ${primary.color}25`, borderRadius:12, padding:'9px 12px', position:'relative' }}>
                <div style={{ position:'absolute', left:14, top:-6, width:10, height:10, background:`${primary.color}0f`, border:`1.5px solid ${primary.color}25`, borderRight:'none', borderBottom:'none', transform:'rotate(45deg)' }} />
                <p style={{ fontSize:13, color:'#1a1a2e', fontWeight:600, lineHeight:1.6, margin:0 }}>
                  "{primary.tagline}"
                </p>
              </div>

              {/* 描述 */}
              <p style={{ color:'#777', fontSize:12, lineHeight:1.85, margin:0 }}>
                {primary.description}
              </p>
            </div>
          </div>
        </div>

        {/* 次要人格 + 按钮 */}
        <div style={{ ...fadeIn(step >= 2) }}>
          {secondary && (
            <div style={{ background:'#fff', borderRadius:14, padding:'12px 18px', marginBottom:12, border:'2px solid rgba(0,0,0,0.06)', display:'flex', alignItems:'center', gap:10, boxShadow:'0 4px 16px rgba(0,0,0,0.05)', flexWrap:'wrap' }}>
              <span style={{ fontSize:20 }}>{secondary.emoji}</span>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:10, color:'#ccc', letterSpacing:'0.1em', marginBottom:1 }}>SECONDARY PERSONA</div>
                <div style={{ color:secondary.color, fontWeight:700, fontFamily:"'Fredoka One',cursive", fontSize:14 }}>
                  {secondary.code} · {secondary.name}
                </div>
              </div>
              <div style={{ fontSize:11, color:'#bbb', flexShrink:0 }}>你的另一面</div>
            </div>
          )}

          {/* 操作按钮 */}
          <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:16 }}>
            <div style={{ display:'flex', gap:10 }}>
              <button onClick={generateShareCard} style={{ flex:1, padding:'16px 20px', background:`linear-gradient(135deg,${primary.color},#FFD23F)`, border:'none', color:'#fff', borderRadius:50, fontFamily:"'Fredoka One',cursive", fontSize:15, fontWeight:700, cursor:'pointer', boxShadow:`0 6px 24px ${primary.color}50`, WebkitTapHighlightColor:'transparent', letterSpacing:'0.03em' }}>
                🖼 下载卡片
              </button>
              <button onClick={generateAvatar} style={{ flex:1, padding:'16px 20px', background:`linear-gradient(135deg,#1a1a2e,${primary.color})`, border:'none', color:'#fff', borderRadius:50, fontFamily:"'Fredoka One',cursive", fontSize:15, fontWeight:700, cursor:'pointer', boxShadow:`0 6px 24px ${primary.color}40`, WebkitTapHighlightColor:'transparent', letterSpacing:'0.03em' }}>
                👾 下载头像
              </button>
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <button onClick={onRestart} style={{ flex:1, padding:'13px 20px', background:'#fff', border:`2px solid ${primary.color}40`, color:primary.color, borderRadius:50, fontFamily:"'Fredoka One',cursive", fontSize:14, fontWeight:700, cursor:'pointer', boxShadow:'0 4px 12px rgba(0,0,0,0.06)', WebkitTapHighlightColor:'transparent' }}>
                🔄 重新测试
              </button>
              <button onClick={handleCopy} style={{ flex:1, padding:'13px 20px', background:'#fff', border:`2px solid ${primary.color}40`, color:primary.color, borderRadius:50, fontFamily:"'Fredoka One',cursive", fontSize:14, fontWeight:700, cursor:'pointer', boxShadow:'0 4px 12px rgba(0,0,0,0.06)', WebkitTapHighlightColor:'transparent' }}>
                {copied ? '✓ 已复制' : '📋 复制结果'}
              </button>
            </div>
          </div>
        </div>

        {/* 全体数据对比 */}
        {stats && stats.total > 0 && (
          <div style={{ ...fadeIn(step >= 3), background:'#fff', borderRadius:20, padding:'22px 20px', marginBottom:16, boxShadow:'0 4px 24px rgba(0,0,0,0.06)', border:'2px solid rgba(0,0,0,0.04)' }}>
            <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:16, color:'#1a1a2e', marginBottom:4 }}>
              🌍 全体数据
            </div>
            <div style={{ fontSize:12, color:'#aaa', marginBottom:16 }}>
              基于 <strong style={{ color:'#FF6B35', fontVariantNumeric:'tabular-nums' }}>{stats.total.toLocaleString()}</strong> 人的真实测试结果
            </div>

            {/* 你的人格占比 */}
            {(() => {
              const myCount = stats.dist?.[primary.code] ?? 0
              const myPct = stats.total > 0 ? Math.round((myCount / stats.total) * 100) : 0
              return (
                <div style={{ background:`${primary.color}10`, borderRadius:14, padding:'14px 16px', marginBottom:14, border:`1.5px solid ${primary.color}25` }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                    <span style={{ fontSize:13, fontWeight:700, color:primary.color }}>{primary.code} 在所有人中</span>
                    <span style={{ fontFamily:"'Fredoka One',cursive", fontSize:22, color:primary.color }}>{myPct}%</span>
                  </div>
                  <div style={{ height:8, background:'rgba(0,0,0,0.06)', borderRadius:99, overflow:'hidden' }}>
                    <div style={{ height:'100%', width:`${myPct}%`, background:`linear-gradient(90deg,${primary.color},${primary.color}99)`, borderRadius:99, transition:'width 1s ease' }} />
                  </div>
                  <div style={{ fontSize:11, color:'#aaa', marginTop:6 }}>
                    {myPct <= 5 ? '🦄 非常稀有的人格类型！' : myPct <= 15 ? '✨ 相对少见' : myPct <= 30 ? '👥 中等常见' : '🌊 最常见类型之一'}
                  </div>
                </div>
              )
            })()}

            {/* Top5 人格排行 */}
            <div style={{ fontSize:11, fontWeight:700, color:'#999', letterSpacing:'0.1em', marginBottom:10 }}>TOP 5 最多人格</div>
            {stats.top5.map((item, i) => (
              <div key={item.code} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
                <span style={{ fontSize:11, fontWeight:700, color:item.code === primary.code ? primary.color : '#ccc', width:20, textAlign:'center' }}>
                  {i + 1}
                </span>
                <span style={{ fontSize:13, fontWeight:700, color: item.code === primary.code ? primary.color : '#333', width:44 }}>
                  {item.code}
                </span>
                <div style={{ flex:1, height:6, background:'rgba(0,0,0,0.06)', borderRadius:99, overflow:'hidden' }}>
                  <div style={{
                    height:'100%', borderRadius:99, transition:'width 1s ease',
                    width:`${item.pct}%`,
                    background: item.code === primary.code
                      ? `linear-gradient(90deg,${primary.color},${primary.color}88)`
                      : 'linear-gradient(90deg,#CBD5E1,#94A3B8)',
                  }} />
                </div>
                <span style={{ fontSize:12, color:'#aaa', width:32, textAlign:'right', fontVariantNumeric:'tabular-nums' }}>{item.pct}%</span>
              </div>
            ))}
          </div>
        )}

        {/* 15维度分析 */}
        <div style={{ ...fadeIn(step >= 3), background:'#fff', borderRadius:20, padding:'22px 20px', marginBottom:16, boxShadow:'0 4px 24px rgba(0,0,0,0.06)', border:'2px solid rgba(0,0,0,0.04)' }}>
          <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:16, color:'#1a1a2e', marginBottom:20 }}>📊 15维度分析</div>
          {groups.map(g => (
            <div key={g.label} style={{ marginBottom:18 }}>
              <div style={{ fontSize:10, fontWeight:700, color:g.color, letterSpacing:'0.1em', marginBottom:8, display:'flex', alignItems:'center', gap:5 }}>
                <span style={{ display:'inline-block', width:7, height:7, borderRadius:'50%', background:g.color }} />
                {g.label}
              </div>
              {g.dims.map(dim => {
                const level: DimLevel = dimLevels[dim] ?? 'M'
                const explain = DIM_EXPLAIN[dim][level]
                const barW = level === 'H' ? 88 : level === 'M' ? 55 : 22
                return (
                  <div key={dim} style={{ display:'flex', alignItems:'flex-start', gap:8, marginBottom:8 }}>
                    <div style={{ flexShrink:0, width:100 }}>
                      <div style={{ fontSize:10, color:'#888', marginBottom:4 }}>{DIM_META[dim].name}</div>
                      <div style={{ height:4, background:'rgba(0,0,0,0.06)', borderRadius:3, overflow:'hidden' }}>
                        <div style={{ height:'100%', width:step>=3?`${barW}%`:'0%', background:g.color, borderRadius:3, transition:'width 1.2s ease' }} />
                      </div>
                    </div>
                    <span style={{ fontSize:10, fontWeight:800, color:g.color, width:16, flexShrink:0, marginTop:1, background:`${g.color}15`, borderRadius:4, textAlign:'center' as const, padding:'1px 0' }}>{level}</span>
                    <span style={{ fontSize:11, color:'#777', lineHeight:1.65, flex:1 }}>{explain}</span>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* 27种人格图鉴 */}
        <div style={{ ...fadeIn(step >= 4), background:'#fff', borderRadius:20, padding:'20px 16px', boxShadow:'0 4px 24px rgba(0,0,0,0.06)', border:'2px solid rgba(0,0,0,0.04)', marginBottom:28 }}>
          <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:15, color:'#1a1a2e', marginBottom:14 }}>🎴 27种人格图鉴</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(76px,1fr))', gap:6 }}>
            {personalities.map(p => {
              const isMe = p.code === primary.code
              return (
                <div key={p.code} style={{ padding:'8px 4px', borderRadius:10, textAlign:'center', background:isMe?`${primary.color}15`:'rgba(0,0,0,0.02)', border:`2px solid ${isMe?primary.color+'50':'rgba(0,0,0,0.04)'}`, boxShadow:isMe?`0 4px 16px ${primary.color}25`:'none', transition:'all 0.2s' }}>
                  <div style={{ display:'flex', justifyContent:'center', marginBottom:3, opacity:isMe?1:0.3 }}>
                    <PixelCharacter code={p.code} color={p.color} size={7} animate={isMe} />
                  </div>
                  <div style={{ fontSize:8, fontWeight:700, color:isMe?p.color:'#bbb', fontFamily:"'Fredoka One',cursive", letterSpacing:'0.02em' }}>{p.code}</div>
                  <div style={{ fontSize:7, color:'#ddd', marginTop:1 }}>{p.rarityRate}</div>
                </div>
              )
            })}
          </div>
        </div>

        <p style={{ fontSize:11, color:'#ccc', textAlign:'center', lineHeight:2 }}>
          本测试仅供娱乐，别拿它当诊断、面试、相亲、分手、招魂、算命或人生判决书。<br />
          算法参考 <a href="https://github.com/serenakeyitan/sbti-wiki" target="_blank" rel="noopener noreferrer" style={{ color:'#FF6B35', textDecoration:'none' }}>serenakeyitan/sbti-wiki</a>
        </p>
      </div>
    </div>
  )
}

// ─── 阳光背景 ──────────────────────────────────────────
function SunnyBg() {
  return (
    <div style={{ position:'fixed', inset:0, pointerEvents:'none', overflow:'hidden', zIndex:0 }}>
      <div style={{ position:'absolute', top:-120, right:-80, width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(255,180,50,0.18) 0%,transparent 70%)' }} />
      <div style={{ position:'absolute', bottom:-100, left:-60, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(255,107,53,0.12) 0%,transparent 70%)' }} />
      <div style={{ position:'absolute', top:'40%', left:'50%', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(233,30,140,0.06) 0%,transparent 70%)', transform:'translate(-50%,-50%)' }} />
    </div>
  )
}
