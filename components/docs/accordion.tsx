'use client'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

export function Accordions({ children }: { children: ReactNode }) {
  return (
    <AccordionPrimitive.Root type="multiple" className="space-y-3">
      {children}
    </AccordionPrimitive.Root>
  )
}

export function Accordion({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <AccordionPrimitive.Item
      value={title}
      className="rounded-xl border border-gray-200 bg-white/70 overflow-hidden"
    >
      <AccordionPrimitive.Header>
        <AccordionPrimitive.Trigger className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white transition-colors">
          <span className="font-medium text-gray-900">{title}</span>
          <ChevronRight className="w-5 h-5 text-gray-400 transition-transform duration-200 data-[state=open]:rotate-90" />
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content className="px-5 pb-4 text-gray-700 leading-relaxed">
        <div className="pt-1 text-sm sm:text-[15px]">{children}</div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  )
}
