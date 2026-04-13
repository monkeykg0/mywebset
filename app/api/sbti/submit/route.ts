import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createClient()

  // 获取当前登录用户（未登录则为 null，不报错）
  const { data: { user } } = await supabase.auth.getUser()

  const body = await request.json()
  const { result_code, match_rate, dim_levels, dim_raw } = body

  if (!result_code) {
    return NextResponse.json({ error: '缺少 result_code' }, { status: 400 })
  }

  // 获取 IP
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'
  const user_agent = request.headers.get('user-agent') ?? ''

  const { error } = await supabase.from('sbti_results').insert({
    result_code,
    match_rate,
    dim_levels,
    dim_raw,
    user_id: user?.id ?? null,
    user_email: user?.email ?? null,
    ip,
    user_agent,
  })

  if (error) {
    console.error('sbti submit error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
