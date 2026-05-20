'use client'

interface Item {
  label: string
  value: string
  highlight?: boolean
}

interface Props {
  items: Item[]
}

export default function ResultCard({ items }: Props) {
  return (
    <div className="bg-[#f0ede6] rounded-3xl p-5 mt-2">
      {items.map((item, i) => (
        <div key={i} className={`flex justify-between items-center ${i < items.length - 1 ? 'mb-4' : ''}`}>
          <span className="text-xs text-[#8a8a72]">{item.label}</span>
          <span className={item.highlight ? 'text-xl font-semibold text-[#3a3a2e]' : 'text-sm text-[#5a5a48]'}>
            {item.value}
          </span>
        </div>
      ))}
    </div>
  )
}
