'use client'

import { useState, useMemo } from 'react'
import BackButton from '../components/BackButton'
import MortgageInput from '../components/MortgageInput'
import ResultCard from '../components/ResultCard'
import CityRateSelector from '../components/CityRateSelector'
import MortgageNav from '../components/MortgageNav'
import { calcEqualPayment, calcEqualPrincipalSchedule, lprToRate, fmt, CURRENT_LPR, FUND_RATE_FIRST, FUND_RATE_SECOND } from '../lib'

type RepayType = 'equal-payment' | 'equal-principal'
type LoanType = 'commercial' | 'fund' | 'combo'

const YEARS = [10, 15, 20, 25, 30]

export default function MonthlyPage() {
  const [amount, setAmount] = useState('200')
  const [years, setYears] = useState(30)
  const [lpr, setLpr] = useState(String(CURRENT_LPR))
  const [bp, setBp] = useState('-45')
  const [selectedCity, setSelectedCity] = useState('北京')
  const [houseType, setHouseType] = useState<'first' | 'second'>('first')
  const [repayType, setRepayType] = useState<RepayType>('equal-payment')
  const [loanType, setLoanType] = useState<LoanType>('commercial')
  const [fundAmount, setFundAmount] = useState('60')

  const principal = (parseFloat(amount) || 0) * 10000
  const fundPrincipal = (parseFloat(fundAmount) || 0) * 10000
  const months = years * 12
  // 商贷利率由LPR+bp计算；公积金根据首二套选择获取
  const commRate = lprToRate(parseFloat(lpr) || CURRENT_LPR, parseInt(bp) || 0)
  const fundRate = houseType === 'first' ? FUND_RATE_FIRST : FUND_RATE_SECOND

  const result = useMemo(() => {
    if (!principal) return null

    if (loanType === 'combo') {
      const commPrincipal = principal - fundPrincipal
      const comm = calcEqualPayment(commPrincipal, commRate, months)
      const fund = calcEqualPayment(fundPrincipal, fundRate, months)
      return {
        type: 'combo' as const,
        monthly: comm.monthly + fund.monthly,
        total: comm.total + fund.total,
        totalInterest: comm.totalInterest + fund.totalInterest,
      }
    }

    if (loanType === 'fund') {
      const res = calcEqualPayment(principal, fundRate, months)
      return { type: 'fund' as const, ...res }
    }

    if (repayType === 'equal-payment') {
      const res = calcEqualPayment(principal, commRate, months)
      return { type: 'equal-payment' as const, ...res }
    }

    const schedule = calcEqualPrincipalSchedule(principal, commRate, months)
    const total = schedule.reduce((s, m) => s + m.payment, 0)
    return {
      type: 'equal-principal' as const,
      firstMonth: schedule[0].payment,
      lastMonth: schedule[schedule.length - 1].payment,
      total,
      totalInterest: total - principal,
    }
  }, [principal, fundPrincipal, months, commRate, repayType, loanType])

  return (
    <main className="min-h-screen bg-[#f7f4ef] px-5 pt-12 pb-10 max-w-md mx-auto">
      <BackButton />
      <MortgageNav />

      <div className="mb-6">
        <p className="text-xs text-[#a0987a] tracking-widest mb-1">MONTHLY PAYMENT</p>
        <h2 className="text-3xl font-bold text-[#2e2e22]">月供计算</h2>
      </div>

      {/* 贷款类型 */}
      <div className="flex gap-2 mb-5">
        {(['commercial', 'fund', 'combo'] as LoanType[]).map((lt) => (
          <button
            key={lt}
            onClick={() => setLoanType(lt)}
            className={`flex-1 py-2 rounded-2xl text-xs font-medium transition-all ${
              loanType === lt ? 'bg-[#8fbc8f] text-white' : 'bg-white border border-[#ede9df] text-[#8a8a72]'
            }`}
          >
            {lt === 'commercial' ? '商业贷' : lt === 'fund' ? '公积金' : '组合贷'}
          </button>
        ))}
      </div>

      {/* 还款方式（商贷才有） */}
      {loanType === 'commercial' && (
        <div className="flex gap-2 mb-5">
          {(['equal-payment', 'equal-principal'] as RepayType[]).map((rt) => (
            <button
              key={rt}
              onClick={() => setRepayType(rt)}
              className={`flex-1 py-2 rounded-2xl text-xs font-medium transition-all ${
                repayType === rt ? 'bg-[#3a3a2e] text-white' : 'bg-white border border-[#ede9df] text-[#8a8a72]'
              }`}
            >
              {rt === 'equal-payment' ? '等额本息' : '等额本金'}
            </button>
          ))}
        </div>
      )}

      <MortgageInput label="贷款金额" unit="万元" value={amount} onChange={setAmount} placeholder="200" />

      {loanType === 'combo' && (
        <MortgageInput
          label="其中公积金"
          unit="万元"
          value={fundAmount}
          onChange={setFundAmount}
          placeholder="60"
          hint={`公积金固定利率 ${fundRate}%，商业贷款 = 总额 − 公积金`}
        />
      )}

      <div className="mb-4">
        <label className="block text-xs text-[#8a8a72] mb-2 tracking-wide">贷款年限</label>
        <div className="flex gap-2">
          {YEARS.map((y) => (
            <button
              key={y}
              onClick={() => setYears(y)}
              className={`flex-1 py-2 rounded-2xl text-xs font-medium transition-all ${
                years === y ? 'bg-[#8fbc8f] text-white' : 'bg-white border border-[#ede9df] text-[#8a8a72]'
              }`}
            >
              {y}年
            </button>
          ))}
        </div>
      </div>

      {/* 公积金不需要LPR选择器，但也需要能选择首套/二套以联动公积金利率 */}
      {loanType !== 'fund' ? (
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
      ) : (
        <div className="mb-5 bg-white border border-[#ede9df] rounded-2xl p-4">
          <div className="flex justify-between items-center mb-3">
            <p className="text-xs text-[#8a8a72]">公积金利率（全国统一）</p>
            <p className="text-base font-semibold text-[#8fbc8f]">{fundRate}%</p>
          </div>
          <div className="flex gap-2">
            {(['first', 'second'] as const).map(t => (
              <button
                key={t}
                onClick={() => setHouseType(t)}
                className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
                  houseType === t ? 'bg-[#8fbc8f] text-white' : 'bg-[#f5f3ee] text-[#8a8a72]'
                }`}
              >
                {t === 'first' ? '首套房 (2.85%)' : '二套房 (3.325%)'}
              </button>
            ))}
          </div>
        </div>
      )}

      {result && (
        <div className="mt-2">
          <p className="text-xs text-[#a0987a] tracking-widest mb-2">计算结果</p>
          <ResultCard
            items={[
              result.type === 'equal-principal'
                ? { label: '首月还款', value: `¥ ${fmt(result.firstMonth)}`, highlight: true }
                : { label: '每月还款', value: `¥ ${fmt(result.monthly!)}`, highlight: true },
              ...(result.type === 'equal-principal'
                ? [{ label: '末月还款', value: `¥ ${fmt(result.lastMonth)}` }]
                : []),
              { label: '还款总额', value: `¥ ${fmt(result.total)}` },
              { label: '支付利息', value: `¥ ${fmt(result.totalInterest)}` },
              { label: '实际利率', value: loanType === 'fund' ? `${fundRate}%` : `${commRate.toFixed(2)}%` },
              { label: '贷款年限', value: `${years} 年 / ${months} 期` },
            ]}
          />
        </div>
      )}
    </main>
  )
}
