import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// 用于服务端组件、API Route、middleware
export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // 在服务端组件中调用 setAll 会报错，可忽略
            // middleware 会负责刷新 session
          }
        },
      },
    }
  )
}
