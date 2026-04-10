import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'SBTI 人格测试'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #FFFBF0 0%, #FFF5E0 50%, #FFECD2 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 背景装饰圆 */}
        <div style={{
          position: 'absolute', top: -150, right: -100,
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,53,0.25) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: -120, left: -80,
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(233,30,140,0.15) 0%, transparent 70%)',
        }} />

        {/* 主内容 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, zIndex: 1 }}>
          {/* SBTI 大字 */}
          <div style={{
            fontSize: 160, fontWeight: 900, lineHeight: 0.9,
            letterSpacing: '-4px',
            background: 'linear-gradient(135deg, #FF6B35, #FF2D78, #7C3AED)',
            backgroundClip: 'text',
            color: 'transparent',
          }}>
            SBTI
          </div>

          <div style={{ fontSize: 36, color: '#FF6B35', letterSpacing: '12px', marginTop: 8, marginBottom: 40 }}>
            人 格 测 试
          </div>

          {/* 三个 badge */}
          <div style={{ display: 'flex', gap: 20 }}>
            {[
              ['31 道题目', '#FF6B35'],
              ['27 种人格', '#E91E8C'],
              ['15 个维度', '#7C3AED'],
            ].map(([t, c]) => (
              <div key={t} style={{
                padding: '12px 28px', borderRadius: 40,
                background: c + '20', color: c,
                fontSize: 22, fontWeight: 700,
                border: `2px solid ${c}40`,
              }}>
                {t}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40, fontSize: 22, color: '#999', letterSpacing: 2 }}>
            看见那个你不太敢承认的自己
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
