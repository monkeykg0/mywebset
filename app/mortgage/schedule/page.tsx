'use client'

import { useState, useMemo } from 'react'
import BackButton from '../components/BackButton'
import MortgageInput from '../components/MortgageInput'
import CityRateSelector from '../components/CityRateSelector'
import MortgageNav from '../components/MortgageNav'
import { calcEqualPaymentSchedule, calcEqualPrincipalSchedule, lprToRate, fmt, CURRENT_LPR } from '../lib'

type RepayType = 'equal-payment' | 'equal-principal'
const YEARS = [10, 15, 20, 25, 30]

export default function SchedulePage() {
  const [amount, setAmount] = useState('200')
  const [years, setYears] = useState(30)
  const [lpr, setLpr] = useState(String(CURRENT_LPR))
  const [bp, setBp] = useState('-45')
  const [selectedCity, setSelectedCity] = useState('北京')
  const [houseType, setHouseType] = useState<'first' | 'second'>('first')
  const [repayType, setRepayType] = useState<RepayType>('equal-payment')
  const [showAll, setShowAll] = useState(false)

  const principal = (parseFloat(amount) || 0) * 10000
  const months = years * 12
  const rate = lprToRate(parseFloat(lpr) || CURRENT_LPR, parseInt(bp) || 0)

  const schedule = useMemo(() => {
    if (!principal) return []
    return repayType === 'equal-payment'
      ? calcEqualPaymentSchedule(principal, rate, months)
      : calcEqualPrincipalSchedule(principal, rate, months)
  }, [principal, rate, months, repayType])

  const displayed = showAll ? schedule : schedule.slice(0, 12)
  const totalInterest = schedule.reduce((s, m) => s + m.interest, 0)
  const totalPayment = schedule.reduce((s, m) => s + m.payment, 0)

  return (
    <main className="min-h-screen bg-[#f7f4ef] px-5 pt-12 pb-10 max-w-md mx-auto">
      <BackButton />
      <MortgageNav />

      <div className="mb-6">
        <p className="text-xs text-[#a0987a] tracking-widest mb-1">SCHEDULE</p>
        <h2 className="text-3xl font-bold text-[#2e2e22]">还款计划表</h2>
      </div>

      <MortgageInput label="贷款金额" unit="万元" value={amount} onChange={setAmount} placeholder="200" />

      <div className="mb-4">
        <label className="block text-xs text-[#8a8a72] mb-2 tracking-wide">贷款年限</label>
        <div className="flex gap-2">
          {YEARS.map((y) => (
            <button key={y} onClick={() => setYears(y)}
              className={`flex-1 py-2 rounded-2xl text-xs font-medium transition-all ${
                years === y ? 'bg-[#8fbc8f] text-white' : 'bg-white border border-[#ede9df] text-[#8a8a72]'
              }`}
            >{y}年</button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {(['equal-payment', 'equal-principal'] as RepayType[]).map((rt) => (
          <button key={rt} onClick={() => setRepayType(rt)}
            className={`flex-1 py-2 rounded-2xl text-xs font-medium transition-all ${
              repayType === rt ? 'bg-[#3a3a2e] text-white' : 'bg-white border border-[#ede9df] text-[#8a8a72]'
            }`}
          >
            {rt === 'equal-payment' ? '等额本息' : '等额本金'}
          </button>
        ))}
      </div>

      <CityRateSelector
        lpr={lpr}
        setLpr={setLpr}
        bp={bp}
        setBp={setBp}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        houseType={houseType}
        setHouseType={setHouseType}
      />

      {schedule.length > 0 && (
        <>
          <div className="bg-[#f0ede6] rounded-3xl p-4 mb-4 grid grid-cols-4 gap-2 text-center">
            <div>
              <p className="text-[10px] text-[#b0ab9a] mb-1">总还款</p>
              <p className="text-xs font-semibold text-[#2e2e22]">¥{(totalPayment / 10000).toFixed(2)}万</p>
            </div>
            <div>
              <p className="text-[10px] text-[#b0ab9a] mb-1">总利息</p>
              <p className="text-xs font-semibold text-[#2e2e22]">¥{(totalInterest / 10000).toFixed(2)}万</p>
            </div>
            <div>
              <p className="text-[10px] text-[#b0ab9a] mb-1">实际利率</p>
              <p className="text-xs font-semibold text-[#8fbc8f]">{rate.toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-[10px] text-[#b0ab9a] mb-1">期数</p>
              <p className="text-xs font-semibold text-[#2e2e22]">{months}期</p>
            </div>
          </div>

          <div className="grid grid-cols-4 text-[10px] text-[#b0ab9a] px-2 mb-2">
            <span>期数</span>
            <span className="text-right">月供</span>
            <span className="text-right">本金</span>
            <span className="text-right">利息</span>
          </div>

          <div className="space-y-1.5">
            {displayed.map((m) => (
              <div key={m.month}
                className="bg-white border border-[#ede9df] rounded-2xl px-4 py-2.5 grid grid-cols-4 text-xs"
              >
                <span className="text-[#8a8a72]">{m.month}</span>
                <span className="text-right text-[#2e2e22] font-medium">{fmt(m.payment)}</span>
                <span className="text-right text-[#5a8a5a]">{fmt(m.principal)}</span>
                <span className="text-right text-[#a07060]">{fmt(m.interest)}</span>
              </div>
            ))}
          </div>

          {schedule.length > 12 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full mt-4 py-3 rounded-2xl border border-[#ede9df] bg-white text-xs text-[#8a8a72] transition-all hover:border-[#8fbc8f] hover:text-[#5a8a5a]"
            >
              {showAll ? '收起' : `展开全部 ${schedule.length} 期`}
            </button>
          )}
        </>
      )}
    </main>
  )
}
