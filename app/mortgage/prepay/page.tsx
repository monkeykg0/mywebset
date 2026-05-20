'use client'

import { useState, useMemo } from 'react'
import BackButton from '../components/BackButton'
import MortgageInput from '../components/MortgageInput'
import ResultCard from '../components/ResultCard'
import CityRateSelector from '../components/CityRateSelector'
import MortgageNav from '../components/MortgageNav'
import { calcEqualPayment, calcPrepay, lprToRate, fmt, CURRENT_LPR } from '../lib'

type PrepayType = 'reduce-payment' | 'reduce-term'

export default function PrepayPage() {
  const [remaining, setRemaining] = useState('150')
  const [lpr, setLpr] = useState(String(CURRENT_LPR))
  const [bp, setBp] = useState('-45')
  const [selectedCity, setSelectedCity] = useState('北京')
  const [houseType, setHouseType] = useState<'first' | 'second'>('first')
  const [remainYears, setRemainYears] = useState('25')
  const [prepayAmount, setPrepayAmount] = useState('20')
  const [prepayType, setPrepayType] = useState<PrepayType>('reduce-payment')

  const remainingPrincipal = (parseFloat(remaining) || 0) * 10000
  const prepay = (parseFloat(prepayAmount) || 0) * 10000
  const remainMonths = (parseFloat(remainYears) || 0) * 12
  const rate = lprToRate(parseFloat(lpr) || CURRENT_LPR, parseInt(bp) || 0)

  const before = useMemo(() => {
    if (!remainingPrincipal || !remainMonths) return null
    return calcEqualPayment(remainingPrincipal, rate, remainMonths)
  }, [remainingPrincipal, rate, remainMonths])

  const after = useMemo(() => {
    if (!remainingPrincipal || !remainMonths || !prepay || prepay >= remainingPrincipal) return null
    return calcPrepay(remainingPrincipal, rate, remainMonths, prepay, prepayType)
  }, [remainingPrincipal, rate, remainMonths, prepay, prepayType])

  const savedInterest = before && after ? before.totalInterest - after.totalInterest : 0

  return (
    <main className="min-h-screen bg-[#f7f4ef] px-5 pt-12 pb-10 max-w-md mx-auto">
      <BackButton />
      <MortgageNav />

      <div className="mb-6">
        <p className="text-xs text-[#a0987a] tracking-widest mb-1">PREPAY</p>
        <h2 className="text-3xl font-bold text-[#2e2e22]">提前还贷</h2>
      </div>

      <MortgageInput label="当前剩余本金" unit="万元" value={remaining} onChange={setRemaining} placeholder="150" />
      <MortgageInput label="剩余还款年限" unit="年" value={remainYears} onChange={setRemainYears} placeholder="25" />

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

      <MortgageInput label="提前还款金额" unit="万元" value={prepayAmount} onChange={setPrepayAmount} placeholder="20" />

      <div className="mb-5">
        <label className="block text-xs text-[#8a8a72] mb-2 tracking-wide">还款后方式</label>
        <div className="flex gap-2">
          {(['reduce-payment', 'reduce-term'] as PrepayType[]).map((pt) => (
            <button
              key={pt}
              onClick={() => setPrepayType(pt)}
              className={`flex-1 py-2.5 rounded-2xl text-xs font-medium transition-all ${
                prepayType === pt ? 'bg-[#8fbc8f] text-white' : 'bg-white border border-[#ede9df] text-[#8a8a72]'
              }`}
            >
              {pt === 'reduce-payment' ? '减少月供' : '缩短年限'}
            </button>
          ))}
        </div>
      </div>

      {before && after && (
        <>
          <p className="text-xs text-[#a0987a] tracking-widest mb-2">还款前</p>
          <ResultCard
            items={[
              { label: '当前月供', value: `¥ ${fmt(before.monthly)}`, highlight: true },
              { label: '实际利率', value: `${rate.toFixed(2)}%` },
              { label: '剩余利息', value: `¥ ${fmt(before.totalInterest)}` },
            ]}
          />

          <p className="text-xs text-[#a0987a] tracking-widest mt-4 mb-2">提前还后</p>
          <ResultCard
            items={[
              prepayType === 'reduce-payment'
                ? { label: '新月供', value: `¥ ${fmt(after.monthly)}`, highlight: true }
                : { label: '月供保持', value: `¥ ${fmt(before.monthly)}`, highlight: true },
              prepayType === 'reduce-term'
                ? { label: '新年限', value: `${Math.floor(after.months / 12)} 年 ${after.months % 12} 月` }
                : { label: '年限不变', value: `${remainYears} 年` },
              { label: '剩余利息', value: `¥ ${fmt(after.totalInterest)}` },
            ]}
          />

          {savedInterest > 0 && (
            <div className="mt-4 bg-[#e8f5e8] rounded-3xl px-5 py-4 flex justify-between items-center">
              <p className="text-sm text-[#5a8a5a]">节省利息</p>
              <p className="text-xl font-bold text-[#3a6a3a]">¥ {fmt(savedInterest)}</p>
            </div>
          )}
        </>
      )}
    </main>
  )
}
