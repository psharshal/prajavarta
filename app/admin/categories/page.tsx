'use client'

import { useState, useEffect, useCallback } from 'react'

type Category = {
  id: number
  name: string
  nameEnglish: string | null
  slug: string
  sortOrder: number
  isActive: boolean
  parent: { id: number; name: string } | null
}

const inputStyle = {
  width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 6,
  fontSize: 14, outline: 'none', boxSizing: 'border-box' as const,
}

const emptyForm = { id: 0, name: '', nameEnglish: '', sortOrder: '0', parentId: '', isActive: true }

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(emptyForm)
  const [editing, setEditing] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/categories?limit=200')
    const data = await res.json()
    if (data.success) setCategories(data.data)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const set = (key: string, value: any) => setForm(f => ({ ...f, [key]: value }))

  const startEdit = (cat: Category) => {
    setForm({
      id: cat.id,
      name: cat.name,
      nameEnglish: cat.nameEnglish ?? '',
      sortOrder: String(cat.sortOrder),
      parentId: cat.parent ? String(cat.parent.id) : '',
      isActive: cat.isActive,
    })
    setEditing(true)
    setError('')
    setSuccess('')
  }

  const resetForm = () => {
    setForm(emptyForm)
    setEditing(false)
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      const payload = {
        ...form,
        sortOrder: parseInt(form.sortOrder) || 0,
        parentId: form.parentId ? parseInt(form.parentId) : null,
      }
      const res = await fetch('/api/admin/categories', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Error'); return }
      setSuccess(editing ? 'Updated' : 'Created')
      resetForm()
      load()
    } catch {
      setError('Network error')
    }
  }

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Delete category "${name}"? Articles in this category will lose their association.`)) return
    const res = await fetch(`/api/admin/categories?id=${id}`, { method: 'DELETE' })
    const data = await res.json()
    if (!res.ok) { setError(data.error ?? 'Delete failed'); return }
    load()
  }

  const topLevel = categories.filter(c => !c.parent)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 24 }}>
      {/* Form */}
      <div>
        <div style={{ background: '#fff', borderRadius: 10, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 600, color: '#1e293b' }}>
            {editing ? 'Edit Category' : 'New Category'}
          </h2>

          {error && <div style={{ background: '#fef2f2', color: '#dc2626', padding: '10px 14px', borderRadius: 6, marginBottom: 16, fontSize: 13 }}>{error}</div>}
          {success && <div style={{ background: '#f0fdf4', color: '#16a34a', padding: '10px 14px', borderRadius: 6, marginBottom: 16, fontSize: 13 }}>{success}</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 4 }}>Marathi Name *</label>
              <input value={form.name} onChange={e => set('name', e.target.value)} required style={inputStyle} placeholder="राजकीय" />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 4 }}>English Name</label>
              <input value={form.nameEnglish} onChange={e => set('nameEnglish', e.target.value)} style={inputStyle} placeholder="politics" />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 4 }}>Parent Category</label>
              <select value={form.parentId} onChange={e => set('parentId', e.target.value)} style={inputStyle}>
                <option value="">None (top-level)</option>
                {topLevel.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 4 }}>Sort Order</label>
              <input type="number" value={form.sortOrder} onChange={e => set('sortOrder', e.target.value)} style={inputStyle} min={0} />
            </div>
            {editing && (
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, cursor: 'pointer', fontSize: 14, color: '#374151' }}>
                <input type="checkbox" checked={form.isActive} onChange={e => set('isActive', e.target.checked)} style={{ width: 16, height: 16 }} />
                Active
              </label>
            )}
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" style={{
                flex: 1, padding: '10px', background: '#2563eb', color: '#fff',
                border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 14,
              }}>
                {editing ? 'Update' : 'Create'}
              </button>
              {editing && (
                <button type="button" onClick={resetForm} style={{
                  padding: '10px 16px', background: '#f1f5f9', color: '#475569',
                  border: '1px solid #e2e8f0', borderRadius: 8, cursor: 'pointer', fontSize: 14,
                }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* List */}
      <div>
        <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#1e293b' }}>Categories ({categories.length})</h2>
          </div>
          {loading ? (
            <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>Loading...</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, color: '#64748b', fontWeight: 600 }}>Name</th>
                  <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, color: '#64748b', fontWeight: 600 }}>Slug</th>
                  <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, color: '#64748b', fontWeight: 600 }}>Parent</th>
                  <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, color: '#64748b', fontWeight: 600 }}>Order</th>
                  <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, color: '#64748b', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, color: '#64748b', fontWeight: 600 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, i) => (
                  <tr key={cat.id} style={{ borderBottom: i < categories.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <td style={{ padding: '10px 16px' }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: '#1e293b' }}>{cat.name}</div>
                      {cat.nameEnglish && <div style={{ fontSize: 12, color: '#94a3b8' }}>{cat.nameEnglish}</div>}
                    </td>
                    <td style={{ padding: '10px 16px', fontSize: 13, color: '#64748b', fontFamily: 'monospace' }}>{cat.slug}</td>
                    <td style={{ padding: '10px 16px', fontSize: 13, color: '#64748b' }}>{cat.parent?.name ?? '-'}</td>
                    <td style={{ padding: '10px 16px', fontSize: 13, color: '#64748b', textAlign: 'center' }}>{cat.sortOrder}</td>
                    <td style={{ padding: '10px 16px' }}>
                      <span style={{
                        fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 999,
                        background: cat.isActive ? '#dcfce7' : '#f1f5f9',
                        color: cat.isActive ? '#166534' : '#64748b',
                      }}>
                        {cat.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={{ padding: '10px 16px' }}>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={() => startEdit(cat)} style={{ fontSize: 13, color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, padding: 0 }}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(cat.id, cat.name)} style={{ fontSize: 13, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, padding: 0 }}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
