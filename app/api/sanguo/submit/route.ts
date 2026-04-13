import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const supabase = createClient()
    const body = await req.json()
    const { result_code, match_score, dim_scores } = body

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
