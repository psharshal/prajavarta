'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAdmin } from '../admin-context'

type User = {
  id: number
  email: string
  name: string | null
  nameEnglish: string | null
  role: string
  isActive: boolean
  designation: string | null
  createdAt: string
  lastLogin: string | null
}

const ROLES = ['USER', 'REPORTER', 'AD_MANAGER', 'MODERATOR', 'SUPER_ADMIN']

const inputStyle = {
  width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 6,
  fontSize: 14, outline: 'none', boxSizing: 'border-box' as const,
}

const ROLE_COLORS: Record<string, { bg: string; color: string }> = {
  SUPER_ADMIN: { bg: '#fdf4ff', color: '#7e22ce' },
  MODERATOR:   { bg: '#eff6ff', color: '#1d4ed8' },
  AD_MANAGER:  { bg: '#fff7ed', color: '#c2410c' },
  REPORTER:    { bg: '#f0fdf4', color: '#15803d' },
  USER:        { bg: '#f8fafc', color: '#475569' },
}

const emptyForm = {
  id: 0, email: '', password: '', name: '', nameEnglish: '',
  role: 'USER', designation: '', isActive: true,
}

export default function AdminUsersPage() {
  const { user: currentUser } = useAdmin()
  const [users, setUsers] = useState<User[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [page, setPage] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page), limit: '20', search, role: roleFilter })
    const res = await fetch(`/api/admin/users?${params}`)
    const data = await res.json()
    if (data.success) { setUsers(data.data); setTotal(data.pagination.total) }
    setLoading(false)
  }, [page, search, roleFilter])

  useEffect(() => { load() }, [load])

  const set = (key: string, value: any) => setForm(f => ({ ...f, [key]: value }))

  const startCreate = () => {
    setForm(emptyForm)
    setEditing(false)
    setShowForm(true)
    setError('')
    setSuccess('')
  }

  const startEdit = (u: User) => {
    setForm({ id: u.id, email: u.email, password: '', name: u.name ?? '', nameEnglish: u.nameEnglish ?? '', role: u.role, designation: u.designation ?? '', isActive: u.isActive })
    setEditing(true)
    setShowForm(true)
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const payload: any = { ...form }
      if (!payload.password) delete payload.password
      const res = await fetch('/api/admin/users', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Error'); return }
      setSuccess(editing ? 'Updated' : 'User created')
      setShowForm(false)
      load()
    } catch {
      setError('Network error')
    }
  }

  const handleDelete = async (id: number, email: string) => {
    if (!confirm(`Delete user "${email}"?`)) return
    const res = await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' })
    const data = await res.json()
    if (!res.ok) { setError(data.error ?? 'Delete failed'); return }
    load()
  }

  const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN'

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        {isSuperAdmin && (
          <button onClick={startCreate} style={{
            padding: '10px 18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8,
            cursor: 'pointer', fontWeight: 600, fontSize: 14, flexShrink: 0,
          }}>
            + New User
          </button>
        )}
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
          placeholder="Search by name or email..."
          style={{ flex: 1, padding: '9px 14px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14, outline: 'none', minWidth: 200 }}
        />
        <select
          value={roleFilter}
          onChange={e => { setRoleFilter(e.target.value); setPage(1) }}
          style={{ padding: '9px 14px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14, outline: 'none', background: '#fff' }}
        >
          <option value="">All Roles</option>
          {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      {error && <div style={{ background: '#fef2f2', color: '#dc2626', padding: '10px 14px', borderRadius: 6, marginBottom: 16, fontSize: 13 }}>{error}</div>}
      {success && <div style={{ background: '#f0fdf4', color: '#16a34a', padding: '10px 14px', borderRadius: 6, marginBottom: 16, fontSize: 13 }}>{success}</div>}

      {/* Form modal */}
      {showForm && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20,
        }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 28, width: '100%', maxWidth: 480 }}>
            <h2 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 700, color: '#1e293b' }}>
              {editing ? 'Edit User' : 'New User'}
            </h2>
            {error && <div style={{ background: '#fef2f2', color: '#dc2626', padding: '10px 14px', borderRadius: 6, marginBottom: 16, fontSize: 13 }}>{error}</div>}
            <form onSubmit={handleSubmit}>
              {!editing && (
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 4 }}>Email *</label>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)} required style={inputStyle} />
                </div>
              )}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 4 }}>
                  {editing ? 'New Password (leave blank to keep)' : 'Password *'}
                </label>
                <input type="password" value={form.password} onChange={e => set('password', e.target.value)} required={!editing} style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 4 }}>Marathi Name</label>
                  <input value={form.name} onChange={e => set('name', e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 4 }}>English Name</label>
                  <input value={form.nameEnglish} onChange={e => set('nameEnglish', e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 4 }}>Role</label>
                <select value={form.role} onChange={e => set('role', e.target.value)} style={inputStyle}>
                  {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 4 }}>Designation</label>
                <input value={form.designation} onChange={e => set('designation', e.target.value)} style={inputStyle} placeholder="Senior Reporter, Editor..." />
              </div>
              {editing && (
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, cursor: 'pointer', fontSize: 14, color: '#374151' }}>
                  <input type="checkbox" checked={form.isActive} onChange={e => set('isActive', e.target.checked)} style={{ width: 16, height: 16 }} />
                  Account Active
                </label>
              )}
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="submit" style={{
                  flex: 1, padding: '10px', background: '#2563eb', color: '#fff',
                  border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 14,
                }}>
                  {editing ? 'Update' : 'Create User'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} style={{
                  padding: '10px 16px', background: '#f1f5f9', color: '#475569',
                  border: '1px solid #e2e8f0', borderRadius: 8, cursor: 'pointer', fontSize: 14,
                }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#64748b' }}>
          {total} users
        </div>
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>Loading...</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, color: '#64748b', fontWeight: 600 }}>User</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, color: '#64748b', fontWeight: 600 }}>Role</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, color: '#64748b', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, color: '#64748b', fontWeight: 600 }}>Joined</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, color: '#64748b', fontWeight: 600 }}>Last Login</th>
                {isSuperAdmin && <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, color: '#64748b', fontWeight: 600 }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => {
                const rc = ROLE_COLORS[u.role] ?? { bg: '#f8fafc', color: '#475569' }
                return (
                  <tr key={u.id} style={{ borderBottom: i < users.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <td style={{ padding: '10px 16px' }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: '#1e293b' }}>{u.name ?? u.email}</div>
                      <div style={{ fontSize: 12, color: '#94a3b8' }}>{u.email}</div>
                      {u.designation && <div style={{ fontSize: 12, color: '#64748b' }}>{u.designation}</div>}
                    </td>
                    <td style={{ padding: '10px 16px' }}>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 999, background: rc.bg, color: rc.color }}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ padding: '10px 16px' }}>
                      <span style={{
                        fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 999,
                        background: u.isActive ? '#dcfce7' : '#fef2f2',
                        color: u.isActive ? '#166534' : '#dc2626',
                      }}>
                        {u.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={{ padding: '10px 16px', fontSize: 12, color: '#94a3b8', whiteSpace: 'nowrap' }}>
                      {new Date(u.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td style={{ padding: '10px 16px', fontSize: 12, color: '#94a3b8', whiteSpace: 'nowrap' }}>
                      {u.lastLogin ? new Date(u.lastLogin).toLocaleDateString('en-IN') : 'Never'}
                    </td>
                    {isSuperAdmin && (
                      <td style={{ padding: '10px 16px' }}>
                        <div style={{ display: 'flex', gap: 10 }}>
                          <button onClick={() => startEdit(u)} style={{ fontSize: 13, color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, padding: 0 }}>
                            Edit
                          </button>
                          {u.id !== currentUser?.id && (
                            <button onClick={() => handleDelete(u.id, u.email)} style={{ fontSize: 13, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, padding: 0 }}>
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {total > 20 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
          {Array.from({ length: Math.ceil(total / 20) }, (_, i) => i + 1).slice(0, 10).map(p => (
            <button key={p} onClick={() => setPage(p)} style={{
              padding: '8px 14px', borderRadius: 8, border: '1px solid #e2e8f0',
              background: p === page ? '#2563eb' : '#fff', color: p === page ? '#fff' : '#475569',
              cursor: 'pointer', fontSize: 14,
            }}>
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
