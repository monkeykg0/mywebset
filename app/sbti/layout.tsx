import type { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SBTI 人格测试 — 看见那个你不太敢承认的自己',
  description: '31道题 · 15个维度 · 27种人格 · 官方曼哈顿距离算法。不是玄学，不是算命，是2026最火人格测试。',
  openGraph: {
    title: 'SBTI 人格测试',
    description: '31道题 · 15个维度 · 27种人格，看见那个你不太敢承认的自己。',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SBTI 人格测试',
    description: '31道题 · 15个维度 · 27种人格，看见那个你不太敢承认的自己。',
  },
}

export default function SbtiLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Noto+Sans+SC:wght@300;400;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes wobble {
          0%,100% { transform: rotate(15deg) scale(1); }
          50% { transform: rotate(20deg) scale(1.1); }
        }
        @keyframes wobble2 {
          0%,100% { transform: rotate(-12deg) scale(1); }
          50% { transform: rotate(-18deg) scale(1.1); }
        }
        @keyframes pixel-bounce {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes bar-grow {
          from { width: 0%; }
        }
      `}</style>
      {children}
    </>
  )
}
