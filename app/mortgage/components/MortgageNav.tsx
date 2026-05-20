'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/mortgage/monthly', label: '月供' },
  { href: '/mortgage/prepay', label: '提前还' },
  { href: '/mortgage/compare', label: '对比' },
  { href: '/mortgage/downpayment', label: '首付' },
  { href: '/mortgage/schedule', label: '还款表' },
  { href: '/mortgage/savings', label: '存量减息' },
]

export default function MortgageNav() {
  const pathname = usePathname()

  return (
    <div className="mb-6 -mx-5 px-5 overflow-x-auto no-scrollbar scroll-smooth">
      {/* 注入隐藏滚动条的样式，确保在 Chrome/Safari/Firefox/IE 下均不显示滚动条 */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}} />
      <div className="flex gap-1.5 pb-1 min-w-max">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all active:scale-95 ${
                isActive
                  ? 'bg-[#8fbc8f] text-white shadow-sm'
                  : 'bg-white border border-[#ede9df] text-[#8a8a72] hover:border-[#8fbc8f] hover:text-[#5a8a5a]'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
