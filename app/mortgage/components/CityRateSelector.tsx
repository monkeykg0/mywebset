'use client'

import { useState } from 'react'
import { CITY_PRESETS, CURRENT_LPR, lprToRate, bpLabel } from '../lib'

interface Props {
  lpr: string
  setLpr: (v: string) => void
  bp: string
  setBp: (v: string) => void
  selectedCity?: string
  setSelectedCity?: (v: string) => void
  houseType?: 'first' | 'second'
  setHouseType?: (v: 'first' | 'second') => void
}

export default function CityRateSelector({
  lpr,
  setLpr,
  bp,
  setBp,
  selectedCity,
  setSelectedCity,
  houseType,
  setHouseType,
}: Props) {
  const [localCity, setLocalCity] = useState('北京')
  const [localHouseType, setLocalHouseType] = useState<'first' | 'second'>('first')
  const [expanded, setExpanded] = useState(false)

  const currentCity = selectedCity !== undefined ? selectedCity : localCity
  const currentHouseType = houseType !== undefined ? houseType : localHouseType

  const activeSetCity = setSelectedCity || setLocalCity
  const activeSetHouseType = setHouseType || setLocalHouseType

  const lprVal = parseFloat(lpr) || CURRENT_LPR
  const bpVal = parseInt(bp) || 0
  const actualRate = lprToRate(lprVal, bpVal)

  function selectCity(city: string) {
    activeSetCity(city)
    if (city === '自定义') {
      setExpanded(false)
      return
    }
    const preset = CITY_PRESETS.find(c => c.city === city)
    if (preset) setBp(String(currentHouseType === 'first' ? preset.firstBp : preset.secondBp))
    setExpanded(false)
  }

  function selectType(type: 'first' | 'second') {
    activeSetHouseType(type)
    if (currentCity === '自定义') return
    const preset = CITY_PRESETS.find(c => c.city === currentCity)
    if (preset) setBp(String(type === 'first' ? preset.firstBp : preset.secondBp))
  }

  return (
    <div className="mb-5">
      {/* LPR 行 */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs text-[#8a8a72] tracking-wide">LPR（5年期以上）</p>
          <p className="text-[10px] text-[#b0ab9a] mt-0.5">数据截至 2026年5月，可手动修改</p>
        </div>
        <div className="flex items-center gap-1 bg-[#f5f3ee] rounded-xl px-3 py-1.5 border border-[#e8e4da] transition-all duration-200 focus-within:border-[#8fbc8f] focus-within:bg-white focus-within:shadow-[0_0_12px_rgba(143,188,143,0.15)] cursor-text">
          <span className="text-[10px] text-[#b0ab9a]">✏️</span>
          <input
            type="number"
            value={lpr}
            onChange={e => setLpr(e.target.value)}
            className="w-16 bg-transparent text-sm font-semibold text-[#3a3a2e] text-right outline-none"
            step="0.05"
          />
          <span className="text-xs text-[#8a8a72]">%</span>
        </div>
      </div>

      {/* 首套/二套 */}
      <div className="flex gap-2 mb-3">
        {(['first', 'second'] as const).map(t => (
          <button
            key={t}
            onClick={() => selectType(t)}
            className={`flex-1 py-2 rounded-2xl text-xs font-medium transition-all ${
              currentHouseType === t ? 'bg-[#8fbc8f] text-white' : 'bg-white border border-[#ede9df] text-[#8a8a72]'
            }`}
          >
            {t === 'first' ? '首套' : '二套'}
          </button>
        ))}
      </div>

      {/* 城市下拉 */}
      <div className="relative mb-3">
        <label className="block text-xs text-[#8a8a72] mb-1.5 tracking-wide">贷款城市</label>
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full bg-white border border-[#ede9df] rounded-2xl px-4 py-2.5 flex items-center justify-between text-sm text-[#3a3a2e] transition-all hover:border-[#8fbc8f]"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-sm">📍</span>
            <span className="font-medium">{currentCity}</span>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={`text-[#8a8a72] transition-transform ${expanded ? 'rotate-180' : ''}`}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {expanded && (
          <div className="absolute z-10 top-full mt-1 w-full bg-white border border-[#ede9df] rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-3 max-h-52 overflow-y-auto p-2 gap-1">
              {CITY_PRESETS.map(c => (
                <button
                  key={c.city}
                  onClick={() => selectCity(c.city)}
                  className={`py-2 rounded-xl text-xs transition-all ${
                    currentCity === c.city ? 'bg-[#8fbc8f] text-white' : 'text-[#5a5a48] hover:bg-[#f5f3ee]'
                  }`}
                >
                  {c.city}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 基点 + 实际利率 */}
      <div className="flex items-center gap-3 bg-[#f5f3ee] rounded-2xl px-4 py-3 border border-[#e8e4da]">
        <div className="flex-1">
          <p className="text-[10px] text-[#8a8a72] mb-1">基点调整（bp）</p>
          <input
            type="number"
            value={bp}
            onChange={e => { setBp(e.target.value); activeSetCity('自定义') }}
            className="bg-transparent text-sm text-[#3a3a2e] outline-none w-full"
            placeholder="0"
          />
        </div>
        <div className="text-right shrink-0">
          <p className="text-[10px] text-[#8a8a72] mb-1">实际年利率</p>
          <p className="text-lg font-semibold text-[#8fbc8f]">{actualRate.toFixed(2)}%</p>
          <p className="text-[10px] text-[#b0ab9a]">{bpLabel(bpVal)}</p>
        </div>
      </div>
    </div>
  )
}
