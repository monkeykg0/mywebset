import type { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'giffgaff 完全使用手册 — 英国 SIM 卡激活·充值·保号·eSIM 图文教程',
  description:
    '一份保姆级的英国 giffgaff SIM 卡中文图文教程：从激活、首充、保号到 eSIM 互转、Wi-Fi Calling。适用于旅游漫游、海外账号注册（Codex、Claude Code、Gmail 等）与长期保号接码。',
  openGraph: {
    title: 'giffgaff 完全使用手册',
    description:
      '英国 giffgaff SIM 卡激活·充值·保号·eSIM 图文教程，适用旅游、海外账号注册与保号接码。',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'giffgaff 完全使用手册',
    description:
      '英国 giffgaff SIM 卡激活·充值·保号·eSIM 图文教程，适用旅游、海外账号注册与保号接码。',
  },
}

export default function GiffgaffLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
