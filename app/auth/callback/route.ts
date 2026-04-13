import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// OAuth 登录回调（GitHub 等第三方登录后跳转到这里）
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const redirectTo = searchParams.get('redirectTo') || '/'

  if (code) {
    const supabase = createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(`${origin}${redirectTo}`)
}
