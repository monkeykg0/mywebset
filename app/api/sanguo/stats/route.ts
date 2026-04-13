import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export const revalidate = 60 

export async function GET() {
  const supabase = createClient()

  const [countRes, distRes] = await Promise.all([
    supabase.from('sanguo_results').select('*', { count: 'exact', head: true }),
    supabase
      .from('sanguo_results')
      .select('result_code')
      .order('result_code'),
  ])

  const total = countRes.count ?? 0

  const dist: Record<string, number> = {}
  for (const row of distRes.data ?? []) {
    dist[row.result_code] = (dist[row.result_code] ?? 0) + 1
  }

  const top5 = Object.entries(dist)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([code, count]) => ({ code, count, pct: Math.round((count / total) * 100) }))

  return NextResponse.json({ total, dist, top5 })
}
