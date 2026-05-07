import { Info } from 'lucide-react'
import * as React from 'react'

export type CalloutType = 'info' | 'warning' | 'success' | 'danger' | 'warn'

const typeClasses: Record<CalloutType, string> = {
  info: 'bg-blue-50/80 border-blue-200/80 text-blue-900',
  warning: 'bg-amber-50/80 border-amber-200/80 text-amber-900',
  warn: 'bg-amber-50/80 border-amber-200/80 text-amber-900',
  success: 'bg-emerald-50/80 border-emerald-200/80 text-emerald-900',
  danger: 'bg-rose-50/80 border-rose-200/80 text-rose-900',
}

export default function Callout({
  type = 'info',
  title,
  children,
}: {
  type?: CalloutType
  title?: string
  children: React.ReactNode
}) {
  return (
    <div className={`rounded-xl border p-4 ${typeClasses[type]}`}>
      <div className="flex gap-3 items-start">
        <div className="mt-0.5">
          <Info className="w-5 h-5" />
        </div>
        <div>
          {title ? <div className="font-semibold mb-1">{title}</div> : null}
          <div className="leading-relaxed text-sm sm:text-[15px]">{children}</div>
        </div>
      </div>
    </div>
  )
}
