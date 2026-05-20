import Link from 'next/link'

const tools = [
  {
    href: '/mortgage/monthly',
    icon: '🏠',
    title: '月供',
    sub: 'MONTHLY',
    desc: '等额本息 · 等额本金',
  },
  {
    href: '/mortgage/prepay',
    icon: '💸',
    title: '提前还',
    sub: 'PREPAY',
    desc: '缩短年限 · 减少月供',
  },
  {
    href: '/mortgage/compare',
    icon: '⚖️',
    title: '对比',
    sub: 'COMPARE',
    desc: '商贷 · 公积金 · 组合',
  },
  {
    href: '/mortgage/downpayment',
    icon: '🪙',
    title: '首付',
    sub: 'DOWN PAYMENT',
    desc: '最低首付 · 资金规划',
  },
  {
    href: '/mortgage/schedule',
    icon: '📋',
    title: '还款表',
    sub: 'SCHEDULE',
    desc: '逐月还款明细',
  },
  {
    href: '/mortgage/savings',
    icon: '📉',
    title: '存量减息',
    sub: 'SAVINGS',
    desc: '存量房降息 · 省钱计算',
  },
]

export default function MortgagePage() {
  return (
    <main className="min-h-screen bg-[#f7f4ef] px-5 pt-14 pb-10 max-w-md mx-auto">
      <div className="mb-8">
        <p className="text-xs text-[#a0987a] tracking-widest mb-2">一笔账 · SLOW MATH</p>
        <h1 className="text-4xl font-bold text-[#2e2e22] leading-tight mb-1">慢慢来。</h1>
        <p className="text-sm text-[#9a9278]">一次只看一个数字。</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {tools.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="rounded-3xl p-5 flex flex-col justify-between min-h-[140px] bg-white border border-[#ede9df] text-[#3a3a2e] transition-all hover:scale-[1.02] hover:-translate-y-0.5 hover:border-[#8fbc8f] hover:shadow-[0_4px_16px_rgba(143,188,143,0.12)] active:scale-95 group"
          >
            <span className="text-2xl transition-transform group-hover:scale-110 duration-200">{t.icon}</span>
            <div>
              <p className="text-xl font-semibold leading-none mb-1 text-[#2e2e22] transition-colors group-hover:text-[#5a8a5a]">
                {t.title}
              </p>
              <p className="text-[10px] tracking-widest mb-1 text-[#a0987a]">
                {t.sub}
              </p>
              <p className="text-[11px] text-[#b0ab9a]">{t.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div>
        <p className="text-xs text-[#a0987a] tracking-widest mb-3">参考利率 · RATE</p>
        <div className="bg-white border border-[#ede9df] rounded-2xl px-4 py-3 flex justify-between items-center">
          <div>
            <p className="text-sm text-[#3a3a2e] font-medium">LPR 5年以上</p>
            <p className="text-xs text-[#b0ab9a]">商业贷款基准利率（2026最新）</p>
          </div>
          <p className="text-lg font-semibold text-[#8fbc8f]">3.50%</p>
        </div>
        <div className="bg-white border border-[#ede9df] rounded-2xl px-4 py-3 flex justify-between items-center mt-2">
          <div>
            <p className="text-sm text-[#3a3a2e] font-medium">公积金贷款（首套 / 二套）</p>
            <p className="text-xs text-[#b0ab9a]">5年以上期限</p>
          </div>
          <p className="text-lg font-semibold text-[#8fbc8f]">2.85% / 3.325%</p>
        </div>
      </div>
    </main>
  )
}
