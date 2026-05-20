'use client'

interface Props {
  label: string
  unit?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  hint?: string
}

export default function MortgageInput({ label, unit, value, onChange, placeholder, hint }: Props) {
  return (
    <div className="mb-4">
      <label className="block text-xs text-[#8a8a72] mb-1 tracking-wide">{label}</label>
      <div className="flex items-center bg-[#f5f3ee] rounded-2xl px-4 py-3 border border-[#e8e4da] focus-within:border-[#8fbc8f] transition-colors">
        <input
          type="number"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder ?? '0'}
          className="flex-1 bg-transparent text-[#3a3a2e] text-base outline-none placeholder:text-[#c5c0b0]"
        />
        {unit && <span className="text-xs text-[#8a8a72] ml-2 shrink-0">{unit}</span>}
      </div>
      {hint && <p className="text-xs text-[#b0ab9a] mt-1 px-1">{hint}</p>}
    </div>
  )
}
