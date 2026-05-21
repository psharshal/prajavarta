'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res  = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Invalid email or password'); return }
      window.location.href = data.isStaff ? '/admin' : '/'
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif', padding: '20px',
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>

        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <h1 style={{ margin: 0, fontSize: 36, fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.5px' }}>
              प्रजावार्ता
            </h1>
            <p style={{ margin: '6px 0 0', color: '#64748b', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Marathi News
            </p>
          </a>
        </div>

        {/* Card */}
        <div style={{
          background: '#1e293b', borderRadius: 16, padding: '36px 32px',
          boxShadow: '0 32px 64px rgba(0,0,0,0.6)',
        }}>
          <h2 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 700, color: '#f8fafc' }}>
            साइन इन करा
          </h2>
          <p style={{ margin: '0 0 28px', color: '#64748b', fontSize: 14 }}>
            Sign in to your account
          </p>

          {error && (
            <div style={{
              background: '#450a0a', border: '1px solid #7f1d1d', color: '#fca5a5',
              borderRadius: 8, padding: '11px 14px', marginBottom: 20, fontSize: 14,
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, fontWeight: 500, marginBottom: 7 }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                style={{
                  width: '100%', padding: '11px 14px', background: '#0f172a',
                  border: '1px solid #334155', borderRadius: 8, color: '#f8fafc',
                  fontSize: 15, boxSizing: 'border-box', outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, fontWeight: 500, marginBottom: 7 }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '11px 14px', background: '#0f172a',
                  border: '1px solid #334155', borderRadius: 8, color: '#f8fafc',
                  fontSize: 15, boxSizing: 'border-box', outline: 'none',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '13px',
                background: loading ? '#1e3a5f' : '#2563eb',
                color: '#fff', border: 'none', borderRadius: 8,
                fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.15s',
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
            <div style={{ flex: 1, height: 1, background: '#334155' }} />
            <span style={{ color: '#475569', fontSize: 12 }}>or</span>
            <div style={{ flex: 1, height: 1, background: '#334155' }} />
          </div>

          {/* Sign up link */}
          <p style={{ margin: 0, textAlign: 'center', color: '#64748b', fontSize: 14 }}>
            खाते नाही?{' '}
            <a href="/register" style={{ color: '#3b82f6', fontWeight: 600, textDecoration: 'none' }}>
              नोंदणी करा
            </a>
          </p>
        </div>

        {/* Staff note */}
        <div style={{
          marginTop: 16, textAlign: 'center', padding: '14px 20px',
          background: 'rgba(255,255,255,0.04)', borderRadius: 10, border: '1px solid #1e293b',
        }}>
          <p style={{ margin: 0, color: '#475569', fontSize: 13 }}>
            Prajavarta Staff / CMS access?{' '}
            <a href="/admin/login" style={{ color: '#94a3b8', fontWeight: 600, textDecoration: 'none' }}>
              Staff Login →
            </a>
          </p>
        </div>

        {/* Back to site */}
        <p style={{ textAlign: 'center', marginTop: 20, margin: '20px 0 0' }}>
          <a href="/" style={{ color: '#475569', fontSize: 13, textDecoration: 'none' }}>
            ← मुख्यपृष्ठावर परत जा
          </a>
        </p>
      </div>
    </div>
  )
}
