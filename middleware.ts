import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // 需要登录才能访问的路由，在这里添加
  const protectedRoutes = ['/dashboard', '/profile', '/upload']
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  // 非保护路由不需要鉴权，也避免在中间件里触发 Supabase 请求导致 504
  if (!isProtectedRoute) return NextResponse.next({ request })

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 刷新过期的 session，必须调用；同时给一个超时兜底，避免中间件卡死
  let user: unknown = null
  try {
    const timeoutMs = 2500
    const timeout = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('supabase auth.getUser timeout')), timeoutMs)
    })

    const result = await Promise.race([
      supabase.auth.getUser(),
      timeout,
    ])

    user = (result as any)?.data?.user ?? null
  } catch {
    user = null
  }

  if (isProtectedRoute && !user) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/login'
    redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    // 排除静态文件和 Next.js 内部路由
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
