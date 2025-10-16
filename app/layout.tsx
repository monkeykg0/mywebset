import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '陈胜燕医师 - 中医内科专家',
  description: '陈胜燕，河南中医药大学硕士研究生，中医内科心血管方向专家，擅长中医及中西医结合治疗',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}