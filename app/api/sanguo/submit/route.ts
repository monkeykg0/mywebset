import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const supabase = createClient()
    const { result_code, match_score, dim_scores, captchaToken } = body

    // 1. Cloudflare Turnstile 校验
    if (!captchaToken) {
      return NextResponse.json({ success: false, error: '缺少真人验证凭证' }, { status: 400 })
    }

    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY!,
        response: captchaToken,
      }),
    })

    const verifyData = await verifyRes.json()
    if (!verifyData.success) {
      return NextResponse.json({ success: false, error: '真人验证未通过', details: verifyData['error-codes'] }, { status: 403 })
    }

    // 2. 验证通过后写入数据库
    const { error } = await supabase.from('sanguo_results').insert([
      {
        result_code,
        match_score,
        dim_scores,
      },
    ])

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
