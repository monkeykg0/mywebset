import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic' // 完全禁用缓存，每次都查库

export async function GET() {
  const supabase = createClient()

  // 并发查询：总人数 + 各人格分布
  const [countRes, distRes] = await Promise.all([
    supabase.from('sbti_results').select('*', { count: 'exact', head: true }),
    supabase
      .from('sbti_results')
      .select('result_code')
      .order('result_code'),
  ])

  const total = countRes.count ?? 0

  // 统计各人格出现次数
  const dist: Record<string, number> = {}
  for (const row of distRes.data ?? []) {
    dist[row.result_code] = (dist[row.result_code] ?? 0) + 1
  }

  // 排名前5人格
  const top5 = Object.entries(dist)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([code, count]) => ({ code, count, pct: Math.round((count / total) * 100) }))

  return NextResponse.json({ total, dist, top5 }, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
