import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '唐亚凯 - 前端开发工程师',
  description: '唐亚凯，全栈开发者，精通 Vue, React, Flutter 等现代前端技术栈。',
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