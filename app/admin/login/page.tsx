'use client'

import { useState } from 'react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Invalid email or password'); return }
      window.location.href = '/admin'
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#0f172a', display: 'flex',
      alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{
        background: '#1e293b', borderRadius: 12, padding: '40px 36px',
        width: '100%', maxWidth: 400, boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: '#f8fafc' }}>प्रजावार्ता</h1>
          <p style={{ margin: '8px 0 0', color: '#64748b', fontSize: 14 }}>Admin Panel</p>
        </div>

        {error && (
          <div style={{
            background: '#450a0a', border: '1px solid #7f1d1d', color: '#fca5a5',
            borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 14,
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%', padding: '10px 14px', background: '#0f172a', border: '1px solid #334155',
                borderRadius: 8, color: '#f8fafc', fontSize: 15, boxSizing: 'border-box',
                outline: 'none',
              }}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: '100%', padding: '10px 14px', background: '#0f172a', border: '1px solid #334155',
                borderRadius: 8, color: '#f8fafc', fontSize: 15, boxSizing: 'border-box',
                outline: 'none',
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '12px', background: loading ? '#1e3a5f' : '#2563eb',
              color: '#fff', border: 'none', borderRadius: 8, fontSize: 15,
              fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.15s',
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
