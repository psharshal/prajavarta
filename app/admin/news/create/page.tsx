'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type Category = { id: number; name: string; nameEnglish: string | null }
type District = { id: number; name: string; nameEnglish: string | null }

const inputStyle = {
  width: '100%', padding: '9px 14px', border: '1px solid #e2e8f0', borderRadius: 8,
  fontSize: 14, outline: 'none', boxSizing: 'border-box' as const,
}
const labelStyle = { display: 'block' as const, fontSize: 13, color: '#374151', marginBottom: 6, fontWeight: 500 }
const fieldStyle = { marginBottom: 20 }

export default function CreateNewsPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [districts, setDistricts] = useState<District[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    title: '', summary: '', description: '', language: 'Marathi',
    newsType: 'Image', featuredImage: '', tags: '',
    status: 'DRAFT', editorialLabel: 'NORMAL',
    categoryId: '', districtId: '', authorId: '',
    isBreakingNews: false, isTrendingNews: false, isMiniTrendingNews: false,
    pinToHomepage: false, boostScore: '0', publishedDate: '',
    videoUrl: '', videoId: '',
  })

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/categories?limit=100').then(r => r.json()),
      fetch('/api/admin/districts?limit=100').then(r => r.json()),
    ]).then(([cats, dists]) => {
      if (cats.success) setCategories(cats.data)
      if (dists.success) setDistricts(dists.data)
    })
  }, [])

  const set = (key: string, value: any) => setForm(f => ({ ...f, [key]: value }))

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const fd = new FormData()
    fd.append('file', file)
    fd.append('folder', 'news')
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const data = await res.json()
    if (data.success) set('featuredImage', data.url)
    else setError(data.error ?? 'Upload failed')
  }

  const handleSubmit = async (status?: string) => {
    setError('')
    setSaving(true)
    try {
      const payload = {
        ...form,
        status: status ?? form.status,
        categoryId: form.categoryId ? parseInt(form.categoryId) : null,
        districtId: form.districtId ? parseInt(form.districtId) : null,
        authorId: form.authorId ? parseInt(form.authorId) : null,
        boostScore: parseInt(form.boostScore) || 0,
        publishedDate: form.publishedDate || null,
      }
      const res = await fetch('/api/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Save failed'); return }
      router.push(`/admin/news/${data.data.id}/edit`)
    } catch {
      setError('Network error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#1e293b' }}>New Article</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => handleSubmit('DRAFT')} disabled={saving} style={{
            padding: '9px 18px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 8,
            cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#475569',
          }}>
            Save Draft
          </button>
          <button onClick={() => handleSubmit('PENDING_REVIEW')} disabled={saving} style={{
            padding: '9px 18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8,
            cursor: 'pointer', fontSize: 14, fontWeight: 600,
          }}>
            {saving ? 'Saving...' : 'Submit for Review'}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 14 }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
        {/* Main column */}
        <div style={{ background: '#fff', borderRadius: 10, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Title (Marathi / English)</label>
            <input value={form.title} onChange={e => set('title', e.target.value)} style={inputStyle} placeholder="Article headline..." />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Summary</label>
            <textarea value={form.summary} onChange={e => set('summary', e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Short summary..." />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Content (HTML)</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={16} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace', fontSize: 13 }} placeholder="<p>Article body...</p>" />
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Status & Publishing */}
          <div style={{ background: '#fff', borderRadius: 10, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#1e293b' }}>Publishing</h3>
            <div style={fieldStyle}>
              <label style={labelStyle}>Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)} style={inputStyle}>
                <option value="DRAFT">Draft</option>
                <option value="PENDING_REVIEW">Pending Review</option>
                <option value="APPROVED">Approved</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Editorial Label</label>
              <select value={form.editorialLabel} onChange={e => set('editorialLabel', e.target.value)} style={inputStyle}>
                <option value="NORMAL">Normal</option>
                <option value="FEATURED">Featured</option>
                <option value="HERO_CANDIDATE">Hero Candidate</option>
                <option value="MAIN_HERO">Main Hero</option>
                <option value="BREAKING">Breaking</option>
              </select>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Language</label>
              <select value={form.language} onChange={e => set('language', e.target.value)} style={inputStyle}>
                <option value="Marathi">Marathi</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
              </select>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Publish Date</label>
              <input type="datetime-local" value={form.publishedDate} onChange={e => set('publishedDate', e.target.value)} style={inputStyle} />
            </div>
          </div>

          {/* Classification */}
          <div style={{ background: '#fff', borderRadius: 10, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#1e293b' }}>Classification</h3>
            <div style={fieldStyle}>
              <label style={labelStyle}>Category</label>
              <select value={form.categoryId} onChange={e => set('categoryId', e.target.value)} style={inputStyle}>
                <option value="">Select category...</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>District</label>
              <select value={form.districtId} onChange={e => set('districtId', e.target.value)} style={inputStyle}>
                <option value="">Select district...</option>
                {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Tags (comma-separated)</label>
              <input value={form.tags} onChange={e => set('tags', e.target.value)} style={inputStyle} placeholder="tag1, tag2, tag3" />
            </div>
          </div>

          {/* Featured Image */}
          <div style={{ background: '#fff', borderRadius: 10, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#1e293b' }}>Featured Image</h3>
            {form.featuredImage && (
              <img src={form.featuredImage} alt="" style={{ width: '100%', borderRadius: 6, marginBottom: 12, aspectRatio: '16/9', objectFit: 'cover' }} />
            )}
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ fontSize: 13, marginBottom: 10, display: 'block' }} />
            <input value={form.featuredImage} onChange={e => set('featuredImage', e.target.value)} style={inputStyle} placeholder="or paste image URL..." />
          </div>

          {/* Flags */}
          <div style={{ background: '#fff', borderRadius: 10, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#1e293b' }}>Flags</h3>
            {[
              ['pinToHomepage', 'Pin to Homepage'],
              ['isTrendingNews', 'Trending News'],
              ['isMiniTrendingNews', 'Mini Trending'],
            ].map(([key, label]) => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, cursor: 'pointer', fontSize: 14, color: '#374151' }}>
                <input
                  type="checkbox"
                  checked={!!(form as any)[key]}
                  onChange={e => set(key, e.target.checked)}
                  style={{ width: 16, height: 16 }}
                />
                {label}
              </label>
            ))}
            <div style={{ marginTop: 8 }}>
              <label style={labelStyle}>Boost Score</label>
              <input type="number" value={form.boostScore} onChange={e => set('boostScore', e.target.value)} style={inputStyle} min={0} max={500} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
