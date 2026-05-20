import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '极简房贷计算器 - 精致实用的房贷测算与规划工具',
  description: '一款极致简约、精致美观的房贷计算器。支持最新LPR月供计算、提前还贷省钱对比、多方案组合贷款对比、首付比例查询、逐月还款计划表及存量房贷下调降息省钱测算，助力轻松决策。',
}

import { MouseTrail } from '@/components/ui/mouse-trail'
import { ScrollProgress } from '@/components/ui/scroll-progress'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <ScrollProgress />
        <MouseTrail />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}