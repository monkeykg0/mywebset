'use client'

import { useState, useMemo } from 'react'
import BackButton from '../components/BackButton'
import MortgageInput from '../components/MortgageInput'
import ResultCard from '../components/ResultCard'
import CityRateSelector from '../components/CityRateSelector'
import MortgageNav from '../components/MortgageNav'
import { calcEqualPayment, lprToRate, fmt, CURRENT_LPR, CITY_PRESETS } from '../lib'

const RATIOS = [
  { label: '首套 20%', value: 0.2 },
  { label: '首套 30%', value: 0.3 },
  { label: '二套 40%', value: 0.4 },
  { label: '二套 60%', value: 0.6 },
]
const YEARS = [10, 15, 20, 25, 30]

export default function DownPaymentPage() {
  const [totalPrice, setTotalPrice] = useState('300')
  const [selectedCity, setSelectedCity] = useState('北京')
  const [houseType, setHouseType] = useState<'first' | 'second'>('first')
  const [ratio, setRatio] = useState(0.15) // 北京首套默认15%
  const [years, setYears] = useState(30)
  const [lpr, setLpr] = useState(String(CURRENT_LPR))
  const [bp, setBp] = useState('-45')

  // 获取当前城市的最低首付款比例
  const currentPreset = CITY_PRESETS.find(c => c.city === selectedCity)
  const minRatio = currentPreset
    ? (houseType === 'first' ? currentPreset.firstDownRatio : currentPreset.secondDownRatio)
    : 0.15

  const effectiveRatio = Math.max(ratio, minRatio)
  const total = (parseFloat(totalPrice) || 0) * 10000
  const downpayment = total * effectiveRatio
  const loan = total - downpayment
  const months = years * 12
  const rate = lprToRate(parseFloat(lpr) || CURRENT_LPR, parseInt(bp) || 0)

  const result = useMemo(() => {
    if (!loan) return null
    return calcEqualPayment(loan, rate, months)
  }, [loan, rate, months])

  // 双向绑定回调，确保修改城市/套数时联动首付比例
  const handleCityChange = (city: string) => {
    setSelectedCity(city)
    if (city === '自定义') return
    const preset = CITY_PRESETS.find(c => c.city === city)
    if (preset) {
      const targetRatio = houseType === 'first' ? preset.firstDownRatio : preset.secondDownRatio
      setRatio(targetRatio)
    }
  }

  const handleHouseTypeChange = (type: 'first' | 'second') => {
    setHouseType(type)
    if (selectedCity === '自定义') return
    const preset = CITY_PRESETS.find(c => c.city === selectedCity)
    if (preset) {
      const targetRatio = type === 'first' ? preset.firstDownRatio : preset.secondDownRatio
      setRatio(targetRatio)
    }
  }

  // 动态生成快速选择比例按钮（从最低比例开始，并进行去重排序）
  const quickRatios = Array.from(new Set([minRatio, 0.20, 0.30, 0.40, 0.60]))
    .filter(r => r >= minRatio)
    .sort((a, b) => a - b)

  return (
    <main className="min-h-screen bg-[#f7f4ef] px-5 pt-12 pb-10 max-w-md mx-auto">
      <BackButton />
      <MortgageNav />

      <div className="mb-6">
        <p className="text-xs text-[#a0987a] tracking-widest mb-1">DOWN PAYMENT</p>
        <h2 className="text-3xl font-bold text-[#2e2e22]">首付计算</h2>
      </div>

      <MortgageInput label="房屋总价" unit="万元" value={totalPrice} onChange={setTotalPrice} placeholder="300" />

      {/* 首付比例联动选择区 */}
      <div className="mb-5 bg-white border border-[#ede9df] rounded-2xl p-4">
        <div className="flex justify-between items-center mb-3">
          <label className="text-xs text-[#8a8a72] tracking-wide">首付款比例</label>
          <span className="text-xs font-semibold text-[#8fbc8f]">{(effectiveRatio * 100).toFixed(0)}%</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {quickRatios.map((r) => {
            const isMin = Math.abs(r - minRatio) < 0.001
            const label = isMin
              ? `最低 ${r * 100}%`
              : `${r * 100}%`
            return (
              <button
                key={r}
                onClick={() => setRatio(r)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  Math.abs(effectiveRatio - r) < 0.001
                    ? 'bg-[#8fbc8f] text-white'
                    : 'bg-[#f5f3ee] text-[#8a8a72]'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={minRatio * 100}
            max="90"
            step="5"
            value={effectiveRatio * 100}
            onChange={(e) => setRatio(parseFloat(e.target.value) / 100)}
            className="flex-1 accent-[#8fbc8f] h-1.5 bg-[#ede9df] rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-[10px] text-[#b0ab9a] min-w-[32px] text-right">滑动微调</span>
        </div>
      </div>

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

      <CityRateSelector
        lpr={lpr}
        setLpr={setLpr}
        bp={bp}
        setBp={setBp}
        selectedCity={selectedCity}
        setSelectedCity={handleCityChange}
        houseType={houseType}
        setHouseType={handleHouseTypeChange}
      />

      {total > 0 && (
        <div className="mt-2">
          <p className="text-xs text-[#a0987a] tracking-widest mb-2">计算结果</p>
          <ResultCard
            items={[
              { label: '需准备首付', value: `¥ ${fmt(downpayment)}`, highlight: true },
              { label: '贷款金额', value: `¥ ${fmt(loan)}` },
              { label: '首付比例', value: `${(effectiveRatio * 100).toFixed(0)}%` },
              ...(result
                ? [
                    { label: '预估月供（等额）', value: `¥ ${fmt(result.monthly)}` },
                    { label: '实际利率', value: `${rate.toFixed(2)}%` },
                    { label: '总还款', value: `¥ ${fmt(result.total)}` },
                    { label: '总利息', value: `¥ ${fmt(result.totalInterest)}` },
                  ]
                : []),
            ]}
          />
        </div>
      )}
    </main>
  )
}
