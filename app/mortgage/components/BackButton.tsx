'use client'
import Link from 'next/link'

export default function BackButton() {
  return (
    <Link href="/mortgage" className="inline-flex items-center gap-1 text-xs text-[#8a8a72] mb-6 hover:text-[#5a5a48] transition-colors">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 12H5M12 5l-7 7 7 7" />
      </svg>
      返回
    </Link>
  )
}
