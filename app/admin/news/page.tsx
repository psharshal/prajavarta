'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

type Article = {
  id: number
  title: string
  slug: string
  status: string
  editorialLabel: string
  isBreakingNews: boolean
  publishedDate: string | null
  createdAt: string
  category: { name: string } | null
  author: { id: number; name: string } | null
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  DRAFT:          { bg: '#f1f5f9', color: '#475569' },
  PENDING_REVIEW: { bg: '#fef3c7', color: '#92400e' },
  APPROVED:       { bg: '#dcfce7', color: '#166534' },
  PUBLISHED:      { bg: '#dbeafe', color: '#1e40af' },
  REJECTED:       { bg: '#fee2e2', color: '#991b1b' },
}

const STATUSES = ['', 'DRAFT', 'PENDING_REVIEW', 'APPROVED', 'PUBLISHED', 'REJECTED']

export default function AdminNewsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [articles, setArticles] = useState<Article[]>([])
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(1)
  const [loading, setLoading] = useState(true)

  const page   = parseInt(searchParams.get('page') ?? '1')
  const search = searchParams.get('search') ?? ''
  const status = searchParams.get('status') ?? ''

  const [searchInput, setSearchInput] = useState(search)

  const load = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page), limit: '15', search, status })
    const res = await fetch(`/api/admin/news?${params}`)
    const data = await res.json()
    if (data.success) {
      setArticles(data.data)
      setTotal(data.pagination.total)
      setPages(data.pagination.pages)
    }
    setLoading(false)
  }, [page, search, status])

  useEffect(() => { load() }, [load])

  const navigate = (params: Record<string, string>) => {
    const sp = new URLSearchParams({ page: '1', search, status, ...params })
    router.push(`/admin/news?${sp}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigate({ search: searchInput, page: '1' })
  }

  const deleteArticle = async (id: number) => {
    if (!confirm('Delete this article permanently?')) return
    await fetch(`/api/admin/news?id=${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <Link href="/admin/news/create" style={{
          padding: '10px 18px', background: '#2563eb', color: '#fff', borderRadius: 8,
          textDecoration: 'none', fontWeight: 600, fontSize: 14, flexShrink: 0,
        }}>
          + New Article
        </Link>

        <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8, flex: 1 }}>
          <input
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Search articles..."
            style={{
              flex: 1, padding: '9px 14px', border: '1px solid #e2e8f0', borderRadius: 8,
              fontSize: 14, outline: 'none', minWidth: 200,
            }}
          />
          <button type="submit" style={{
            padding: '9px 16px', background: '#f1f5f9', border: '1px solid #e2e8f0',
            borderRadius: 8, cursor: 'pointer', fontSize: 14,
          }}>
            Search
          </button>
        </form>

        <select
          value={status}
          onChange={e => navigate({ status: e.target.value, page: '1' })}
          style={{
            padding: '9px 14px', border: '1px solid #e2e8f0', borderRadius: 8,
            fontSize: 14, outline: 'none', background: '#fff',
          }}
        >
          <option value="">All Statuses</option>
          {STATUSES.slice(1).map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
        </select>
      </div>

      {/* Stats bar */}
      <div style={{ color: '#64748b', fontSize: 13, marginBottom: 12 }}>
        {total} articles found {status && `with status: ${status}`}
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>Loading...</div>
        ) : articles.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>No articles found</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#64748b', fontWeight: 600 }}>Title</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#64748b', fontWeight: 600 }}>Category</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#64748b', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#64748b', fontWeight: 600 }}>Date</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#64748b', fontWeight: 600 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a, i) => {
                const sc = STATUS_COLORS[a.status] ?? { bg: '#f1f5f9', color: '#475569' }
                return (
                  <tr key={a.id} style={{ borderBottom: i < articles.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <td style={{ padding: '12px 16px', maxWidth: 300 }}>
                      <div style={{ fontSize: 14, color: '#1e293b', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {a.isBreakingNews && <span style={{ fontSize: 11, background: '#fef2f2', color: '#ef4444', padding: '1px 6px', borderRadius: 4, marginRight: 6 }}>BREAKING</span>}
                        {a.title}
                      </div>
                      {a.author && <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>by {a.author.name}</div>}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: '#475569' }}>
                      {a.category?.name ?? '-'}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 999,
                        background: sc.bg, color: sc.color,
                      }}>
                        {a.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 12, color: '#94a3b8', whiteSpace: 'nowrap' }}>
                      {a.publishedDate ? new Date(a.publishedDate).toLocaleDateString('en-IN') : new Date(a.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <Link href={`/admin/news/${a.id}/edit`} style={{
                          fontSize: 13, color: '#2563eb', textDecoration: 'none', fontWeight: 500,
                        }}>
                          Edit
                        </Link>
                        <a href={`/news/${a.slug}`} target="_blank" style={{
                          fontSize: 13, color: '#16a34a', textDecoration: 'none', fontWeight: 500,
                        }}>
                          View
                        </a>
                        <button onClick={() => deleteArticle(a.id)} style={{
                          fontSize: 13, color: '#ef4444', background: 'none', border: 'none',
                          cursor: 'pointer', fontWeight: 500, padding: 0,
                        }}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
          {Array.from({ length: Math.min(pages, 10) }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => navigate({ page: String(p) })}
              style={{
                padding: '8px 14px', borderRadius: 8, border: '1px solid #e2e8f0',
                background: p === page ? '#2563eb' : '#fff', color: p === page ? '#fff' : '#475569',
                cursor: 'pointer', fontSize: 14,
              }}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
