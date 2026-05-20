'use client'

import { useState, useMemo } from 'react'
import BackButton from '../components/BackButton'
import MortgageInput from '../components/MortgageInput'
import MortgageNav from '../components/MortgageNav'
import { calcEqualPayment, lprToRate, fmt, CURRENT_LPR, CITY_PRESETS, FUND_RATE_FIRST } from '../lib'

const YEARS = [10, 15, 20, 25, 30]

interface LoanRow {
  label: string
  color: string
  lpr: string
  bp: string
}

export default function ComparePage() {
  const [amount, setAmount] = useState('200')
  const [years, setYears] = useState(30)
  const [rows, setRows] = useState<LoanRow[]>([
    { label: '商业贷（首套）', color: '#8fbc8f', lpr: String(CURRENT_LPR), bp: '-45' },
    { label: '公积金贷款', color: '#6aaa6a', lpr: String(FUND_RATE_FIRST), bp: '0' },
    { label: '组合贷参考', color: '#b8d4b8', lpr: String(CURRENT_LPR), bp: '-45' },
  ])
  const [selectedCity, setSelectedCity] = useState('北京')
  const [cityExpanded, setCityExpanded] = useState(false)

  const principal = (parseFloat(amount) || 0) * 10000
  const months = years * 12

  // 选城市后批量更新商业贷和组合贷商贷部分的 bp 和 LPR
  function applyCity(city: string) {
    setSelectedCity(city)
    setCityExpanded(false)
    if (city === '自定义') return
    const preset = CITY_PRESETS.find(c => c.city === city)
    if (!preset) return
    setRows(prev => prev.map((r, i) => {
      if (i === 0) return { ...r, lpr: String(CURRENT_LPR), bp: String(preset.firstBp) }
      if (i === 2) return { ...r, lpr: String(CURRENT_LPR), bp: String(preset.firstBp) }
      return r
    }))
  }

  function updateRow(i: number, field: keyof LoanRow, val: string) {
    setRows(prev => prev.map((r, idx) => idx === i ? { ...r, [field]: val } : r))
  }

  const results = useMemo(() =>
    rows.map(r => ({
      ...r,
      rate: lprToRate(parseFloat(r.lpr) || 0, parseInt(r.bp) || 0),
      result: principal ? calcEqualPayment(
        principal,
        lprToRate(parseFloat(r.lpr) || 0, parseInt(r.bp) || 0),
        months
      ) : null,
    })),
    [rows, principal, months]
  )

  const best = results.reduce<typeof results[0] | null>((b, r) => {
    if (!r.result) return b
    if (!b?.result) return r
    return r.result.totalInterest < b.result.totalInterest ? r : b
  }, null)

  return (
    <main className="min-h-screen bg-[#f7f4ef] px-5 pt-12 pb-10 max-w-md mx-auto">
      <BackButton />
      <MortgageNav />

      <div className="mb-6">
        <p className="text-xs text-[#a0987a] tracking-widest mb-1">COMPARE</p>
        <h2 className="text-3xl font-bold text-[#2e2e22]">贷款对比</h2>
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

      {/* 城市快选（影响第一行商业贷bp） */}
      <div className="relative mb-4">
        <label className="block text-xs text-[#8a8a72] mb-2 tracking-wide">城市（自动填入商业贷基点）</label>
        <button
          onClick={() => setCityExpanded(!cityExpanded)}
          className="w-full bg-white border border-[#ede9df] rounded-2xl px-4 py-2.5 flex items-center justify-between text-sm text-[#3a3a2e]"
        >
          <span>{selectedCity}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={`text-[#8a8a72] transition-transform ${cityExpanded ? 'rotate-180' : ''}`}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {cityExpanded && (
          <div className="absolute z-10 top-full mt-1 w-full bg-white border border-[#ede9df] rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-3 max-h-48 overflow-y-auto p-2 gap-1">
              {CITY_PRESETS.map(c => (
                <button key={c.city} onClick={() => applyCity(c.city)}
                  className={`py-2 rounded-xl text-xs transition-all ${
                    selectedCity === c.city ? 'bg-[#8fbc8f] text-white' : 'text-[#5a5a48] hover:bg-[#f5f3ee]'
                  }`}
                >{c.city}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 各行利率配置 */}
      <div className="space-y-2 mb-5">
        {rows.map((r, i) => {
          const rate = lprToRate(parseFloat(r.lpr) || 0, parseInt(r.bp) || 0)
          return (
            <div key={i} className="bg-white border border-[#ede9df] rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
                <span className="text-xs text-[#5a5a48] flex-1">{r.label}</span>
                <span className="text-xs font-semibold text-[#8fbc8f]">{rate.toFixed(2)}%</span>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-1 bg-[#f5f3ee] rounded-xl px-3 py-1.5">
                  <span className="text-[10px] text-[#b0ab9a]">LPR</span>
                  <input type="number" value={r.lpr}
                    onChange={e => updateRow(i, 'lpr', e.target.value)}
                    className="flex-1 bg-transparent text-xs text-center text-[#3a3a2e] outline-none"
                    step="0.05"
                  />
                  <span className="text-[10px] text-[#b0ab9a]">%</span>
                </div>
                <div className="flex-1 flex items-center gap-1 bg-[#f5f3ee] rounded-xl px-3 py-1.5">
                  <span className="text-[10px] text-[#b0ab9a]">bp</span>
                  <input type="number" value={r.bp}
                    onChange={e => updateRow(i, 'bp', e.target.value)}
                    className="flex-1 bg-transparent text-xs text-center text-[#3a3a2e] outline-none"
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 对比结果 */}
      {principal > 0 && (
        <>
          <p className="text-xs text-[#a0987a] tracking-widest mb-3">对比结果</p>
          <div className="space-y-3">
            {results.map((r, i) => (
              <div key={i}
                className={`bg-white border rounded-2xl px-4 py-4 transition-all ${
                  best?.label === r.label ? 'border-[#8fbc8f] shadow-sm' : 'border-[#ede9df]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: r.color }} />
                    <span className="text-sm font-medium text-[#2e2e22]">{r.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#8fbc8f]">{r.rate.toFixed(2)}%</span>
                    {best?.label === r.label && (
                      <span className="text-[10px] bg-[#e8f5e8] text-[#5a8a5a] px-2 py-0.5 rounded-full">最优</span>
                    )}
                  </div>
                </div>
                {r.result ? (
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-[10px] text-[#b0ab9a] mb-0.5">月供</p>
                      <p className="text-sm font-semibold text-[#2e2e22]">¥{fmt(r.result.monthly)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#b0ab9a] mb-0.5">总利息</p>
                      <p className="text-sm font-semibold text-[#2e2e22]">¥{fmt(r.result.totalInterest)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#b0ab9a] mb-0.5">总还款</p>
                      <p className="text-sm font-semibold text-[#2e2e22]">¥{fmt(r.result.total)}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-[#b0ab9a]">请输入贷款金额</p>
                )}
              </div>
            ))}
          </div>

          {best?.result && (
            <div className="mt-4 bg-[#e8f5e8] rounded-3xl px-5 py-4">
              <p className="text-xs text-[#5a8a5a] mb-1">选择{best.label}</p>
              <p className="text-sm text-[#3a6a3a]">
                比最高利率方案节省{' '}
                <span className="font-bold">
                  ¥{fmt(Math.max(...results.map(r => r.result?.totalInterest ?? 0)) - best.result.totalInterest)}
                </span>
              </p>
            </div>
          )}
        </>
      )}
    </main>
  )
}
