'use client'

import { useState, useMemo } from 'react'
import BackButton from '../components/BackButton'
import MortgageInput from '../components/MortgageInput'
import ResultCard from '../components/ResultCard'
import MortgageNav from '../components/MortgageNav'
import { calcEqualPayment, fmt, CURRENT_LPR } from '../lib'

export default function SavingsPage() {
  const [remainingPrincipal, setRemainingPrincipal] = useState('100')
  const [oldRate, setOldRate] = useState('4.20')
  const [remainYears, setRemainYears] = useState('20')
  const [newRate, setNewRate] = useState(String((CURRENT_LPR - 0.3).toFixed(2))) // 默认 3.20%

  const P = (parseFloat(remainingPrincipal) || 0) * 10000
  const y = parseInt(remainYears) || 0
  const months = y * 12
  const rOld = parseFloat(oldRate) || 0
  const rNew = parseFloat(newRate) || 0

  const results = useMemo(() => {
    if (P <= 0 || months <= 0) return null

    const oldResult = calcEqualPayment(P, rOld, months)
    const newResult = calcEqualPayment(P, rNew, months)

    if (!oldResult || !newResult) return null

    const monthlySave = Math.max(0, oldResult.monthly - newResult.monthly)
    const totalSave = monthlySave * months

    return {
      old: oldResult,
      new: newResult,
      monthlySave,
      totalSave,
    }
  }, [P, rOld, rNew, months])

  return (
    <main className="min-h-screen bg-[#f7f4ef] px-5 pt-12 pb-10 max-w-md mx-auto">
      <BackButton />
      <MortgageNav />

      <div className="mb-6">
        <p className="text-xs text-[#a0987a] tracking-widest mb-1">SAVINGS</p>
        <h2 className="text-3xl font-bold text-[#2e2e22]">存量减息计算</h2>
      </div>

      <MortgageInput
        label="剩余贷款本金"
        unit="万元"
        value={remainingPrincipal}
        onChange={setRemainingPrincipal}
        placeholder="100"
      />

      <MortgageInput
        label="降息前实际利率"
        unit="%"
        value={oldRate}
        onChange={setOldRate}
        placeholder="4.20"
      />

      <MortgageInput
        label="剩余还款年限"
        unit="年"
        value={remainYears}
        onChange={setRemainYears}
        placeholder="20"
      />

      {/* 调整后利率输入框，带有一些友好的政策提示 */}
      <div className="mb-5 bg-white border border-[#ede9df] rounded-2xl p-4">
        <div className="flex justify-between items-center mb-2">
          <div>
            <label className="text-xs text-[#8a8a72] tracking-wide block">调整后新利率</label>
            <p className="text-[10px] text-[#b0ab9a] mt-0.5">普遍下调目标为 LPR - 30bp (3.20%)</p>
          </div>
          <div className="flex items-center gap-1 bg-[#f5f3ee] rounded-xl px-3 py-1.5 border border-[#e8e4da] transition-all duration-200 focus-within:border-[#8fbc8f] focus-within:bg-white focus-within:shadow-[0_0_12px_rgba(143,188,143,0.15)] cursor-text">
            <span className="text-[10px] text-[#b0ab9a]">✏️</span>
            <input
              type="number"
              value={newRate}
              onChange={e => setNewRate(e.target.value)}
              className="w-16 bg-transparent text-sm font-semibold text-[#3a3a2e] text-right outline-none"
              step="0.05"
            />
            <span className="text-xs text-[#8a8a72]">%</span>
          </div>
        </div>
      </div>

      {results && (
        <div className="mt-4">
          <p className="text-xs text-[#a0987a] tracking-widest mb-3">降息省钱结果</p>

          {/* 核心省钱展示卡片 */}
          <div className="bg-white border border-[#ede9df] rounded-3xl p-5 mb-4 shadow-[0_4px_20px_rgba(143,188,143,0.06)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#8fbc8f] opacity-[0.05] rounded-full translate-x-8 -translate-y-8" />
            <p className="text-xs text-[#8a8a72] mb-1">每月少还月供</p>
            <p className="text-3xl font-bold text-[#8fbc8f] mb-3">¥ {fmt(results.monthlySave)}</p>
            <div className="border-t border-[#ede9df] pt-3 flex justify-between items-center">
              <span className="text-xs text-[#8a8a72]">累计节省利息总额</span>
              <span className="text-sm font-bold text-[#2e2e22]">¥ {fmt(results.totalSave)}</span>
            </div>
          </div>

          {/* 并排对比视图 */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* 调整前 */}
            <div className="bg-[#f0ede6] rounded-2xl p-4 border border-[#ede9df]">
              <p className="text-[10px] text-[#8a8a72] uppercase tracking-wider mb-1">调整前 ({oldRate}%)</p>
              <p className="text-xs text-[#8a8a72] mb-0.5">月供金额</p>
              <p className="text-base font-semibold text-[#5a5a48] mb-2">¥ {fmt(results.old.monthly)}</p>
              <p className="text-[10px] text-[#8a8a72] mb-0.5">总还款</p>
              <p className="text-xs text-[#5a5a48]">¥ {fmt(results.old.total)}</p>
            </div>

            {/* 调整后 */}
            <div className="bg-[#e9efe9] rounded-2xl p-4 border border-[#d8ecd8]">
              <p className="text-[10px] text-[#6aaa6a] uppercase tracking-wider mb-1">调整后 ({newRate}%)</p>
              <p className="text-xs text-[#6aaa6a] mb-0.5">新月供金额</p>
              <p className="text-base font-semibold text-[#3b7b3b] mb-2">¥ {fmt(results.new.monthly)}</p>
              <p className="text-[10px] text-[#6aaa6a] mb-0.5">新总还款</p>
              <p className="text-xs text-[#3b7b3b]">¥ {fmt(results.new.total)}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
