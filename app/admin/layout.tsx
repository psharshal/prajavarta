'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

type AdminUser = { id: number; name: string | null; email: string; role: string }
type AdminContextType = { user: AdminUser | null; logout: () => void }

const AdminContext = createContext<AdminContextType>({ user: null, logout: () => {} })
export const useAdmin = () => useContext(AdminContext)

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/news', label: 'News', icon: '📰' },
  { href: '/admin/categories', label: 'Categories', icon: '🗂️' },
  { href: '/admin/users', label: 'Users', icon: '👥' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (isLoginPage) { setLoading(false); return }
    fetch('/api/admin/auth/me')
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d?.success) setUser(d.user)
        else router.push('/admin/login')
      })
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false))
  }, [isLoginPage])

  const logout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    setUser(null)
    router.push('/admin/login')
  }

  if (!isLoginPage && loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0f172a', color: '#e2e8f0', fontSize: 18 }}>
        Loading...
      </div>
    )
  }

  if (isLoginPage) {
    return <AdminContext.Provider value={{ user, logout }}>{children}</AdminContext.Provider>
  }

  return (
    <AdminContext.Provider value={{ user, logout }}>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9', fontFamily: 'system-ui, sans-serif' }}>
        {/* Sidebar */}
        <aside style={{
          width: sidebarOpen ? 240 : 64, transition: 'width 0.2s', background: '#0f172a',
          color: '#e2e8f0', display: 'flex', flexDirection: 'column', flexShrink: 0, zIndex: 10,
        }}>
          <div style={{ padding: '16px 12px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #1e293b' }}>
            {sidebarOpen && <span style={{ fontWeight: 700, fontSize: 18, color: '#f8fafc', overflow: 'hidden', whiteSpace: 'nowrap' }}>Prajavarta</span>}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 18, padding: 4 }}
            >
              {sidebarOpen ? '◀' : '▶'}
            </button>
          </div>
          <nav style={{ flex: 1, padding: '12px 8px' }}>
            {NAV.map(item => {
              const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
              return (
                <Link key={item.href} href={item.href} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, marginBottom: 4,
                  background: active ? '#1e3a5f' : 'transparent', color: active ? '#93c5fd' : '#94a3b8',
                  textDecoration: 'none', fontSize: 14, fontWeight: active ? 600 : 400,
                  transition: 'background 0.15s', whiteSpace: 'nowrap', overflow: 'hidden',
                }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              )
            })}
          </nav>
          {user && (
            <div style={{ padding: '12px', borderTop: '1px solid #1e293b' }}>
              {sidebarOpen && (
                <div style={{ marginBottom: 8, fontSize: 12, color: '#64748b' }}>
                  <div style={{ color: '#e2e8f0', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name ?? user.email}</div>
                  <div style={{ color: '#64748b' }}>{user.role}</div>
                </div>
              )}
              <button onClick={logout} style={{
                width: '100%', padding: '8px 12px', background: '#7f1d1d', color: '#fca5a5',
                border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13,
              }}>
                {sidebarOpen ? 'Logout' : '↩'}
              </button>
            </div>
          )}
        </aside>

        {/* Main content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <header style={{
            background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '12px 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <h1 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#1e293b' }}>
              {NAV.find(n => n.href === pathname || (n.href !== '/admin' && pathname.startsWith(n.href)))?.label ?? 'Admin'}
            </h1>
            <a href="/" target="_blank" style={{ fontSize: 13, color: '#3b82f6', textDecoration: 'none' }}>
              View Site →
            </a>
          </header>
          <main style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
            {children}
          </main>
        </div>
      </div>
    </AdminContext.Provider>
  )
}
