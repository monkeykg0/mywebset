'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import './login.css'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/sbti'

  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState<'github' | 'google' | null>(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else { router.push(redirectTo); router.refresh() }
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
      else setMessage('验证邮件已发送，请查收邮箱。')
    }
    setLoading(false)
  }

  async function handleOAuth(provider: 'github' | 'google') {
    setOauthLoading(provider)
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${location.origin}/auth/callback?redirectTo=${redirectTo}` },
    })
  }

  return (
    <div className="login-root">
      {/* ── 左侧 editorial ── */}
      <div className="editorial">
        <div className="editorial-noise" />
        <div className="editorial-grid" />

        <div className="logo-mark">
          <div className="logo-glyph">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="logo-text">Tang Yakai</span>
        </div>

        <div className="editorial-hero">
          <div className="editorial-kicker">Portfolio</div>
          <h2 className="editorial-title">
            Build<br />
            <em>things</em><br />
            that last.
          </h2>
          <p className="editorial-desc">
            全栈开发者，精通 React、Vue、Flutter。
            用代码创造有温度的数字产品。
          </p>
        </div>

        <div className="editorial-footer">
          <div className="editorial-stat">
            <div className="editorial-stat-num">5+</div>
            <div className="editorial-stat-label">Years Exp.</div>
          </div>
          <div className="editorial-divider" />
          <div className="editorial-stat">
            <div className="editorial-stat-num">30+</div>
            <div className="editorial-stat-label">Projects</div>
          </div>
          <div className="editorial-divider" />
          <div className="editorial-stat">
            <div className="editorial-stat-num">∞</div>
            <div className="editorial-stat-label">Curiosity</div>
          </div>
        </div>
      </div>

      {/* ── 右侧 form ── */}
      <div className="form-panel">
        <div className="form-header">
          <div className="form-eyebrow">
            {mode === 'login' ? 'Welcome back' : 'Get started'}
          </div>
          <h1 className="form-title">
            {mode === 'login' ? '登录你的账号' : '创建新账号'}
          </h1>
        </div>

        {/* OAuth */}
        <div className="oauth-row">
          <button
            className="oauth-btn"
            onClick={() => handleOAuth('google')}
            disabled={oauthLoading !== null}
          >
            {oauthLoading === 'google' ? (
              <div className="spinner dark" />
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            )}
            Google
          </button>

          <button
            className="oauth-btn"
            onClick={() => handleOAuth('github')}
            disabled={oauthLoading !== null}
          >
            {oauthLoading === 'github' ? (
              <div className="spinner dark" />
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="#0D1F1A">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            )}
            GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="divider">
          <div className="divider-line" />
          <span className="divider-text">或</span>
          <div className="divider-line" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="field-group">
            <div className="field">
              <label className="field-label">邮箱地址</label>
              <div className="field-wrap">
                <input
                  type="email"
                  className="field-input"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="field">
              <label className="field-label">密码</label>
              <div className="field-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="field-input has-toggle"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  placeholder="至少 6 位"
                />
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? '隐藏密码' : '显示密码'}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="feedback error">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}>
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}
          {message && (
            <div className="feedback success">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}>
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              {message}
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <><div className="spinner" /><span>处理中...</span></>
            ) : (
              <span>{mode === 'login' ? '登 录' : '创建账号'}</span>
            )}
          </button>
        </form>

        <div className="switch-mode">
          {mode === 'login' ? '还没有账号？' : '已有账号？'}
          <button
            className="switch-btn"
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); setMessage('') }}
          >
            {mode === 'login' ? '立即注册' : '去登录'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100dvh', background: '#F5F0E8' }} />}>
      <LoginForm />
    </Suspense>
  )
}
