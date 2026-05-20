'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Stats = {
  totalNews: number
  totalUsers: number
  totalCategories: number
  totalDistricts: number
  pendingReview: number
  breakingNews: number
  todayNews: number
  topStories: Array<{ id: number; title: string; slug: string; viewCount: number; publishedDate: string | null }>
}

function StatCard({ label, value, color, href }: { label: string; value: number; color: string; href?: string }) {
  const content = (
    <div style={{
      background: '#fff', borderRadius: 10, padding: '20px 24px', borderLeft: `4px solid ${color}`,
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    }}>
      <div style={{ fontSize: 28, fontWeight: 700, color: '#1e293b' }}>{value.toLocaleString()}</div>
      <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>{label}</div>
    </div>
  )
  return href ? (
    <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>{content}</Link>
  ) : content
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then(r => r.json())
      .then(d => {
        if (d.success) setStats(d.data)
        else setError(d.error ?? 'Failed to load')
      })
      .catch(() => setError('Network error'))
  }, [])

  if (error) return <div style={{ color: '#ef4444', padding: 20 }}>{error}</div>
  if (!stats) return <div style={{ color: '#64748b', padding: 20 }}>Loading dashboard...</div>

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
        <StatCard label="Published Articles" value={stats.totalNews} color="#3b82f6" href="/admin/news" />
        <StatCard label="Pending Review" value={stats.pendingReview} color="#f59e0b" href="/admin/news?status=PENDING_REVIEW" />
        <StatCard label="Today's Articles" value={stats.todayNews} color="#10b981" href="/admin/news" />
        <StatCard label="Breaking News" value={stats.breakingNews} color="#ef4444" href="/admin/news?status=PUBLISHED" />
        <StatCard label="Total Users" value={stats.totalUsers} color="#8b5cf6" href="/admin/users" />
        <StatCard label="Categories" value={stats.totalCategories} color="#06b6d4" href="/admin/categories" />
        <StatCard label="Districts" value={stats.totalDistricts} color="#84cc16" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Quick Actions */}
        <div style={{ background: '#fff', borderRadius: 10, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: '#1e293b' }}>Quick Actions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link href="/admin/news/create" style={{
              display: 'block', padding: '12px 16px', background: '#2563eb', color: '#fff',
              borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 14, textAlign: 'center',
            }}>
              + Write New Article
            </Link>
            <Link href="/admin/news?status=PENDING_REVIEW" style={{
              display: 'block', padding: '12px 16px', background: '#fef3c7', color: '#92400e',
              borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 14, textAlign: 'center',
            }}>
              Review Pending ({stats.pendingReview})
            </Link>
            <Link href="/admin/categories" style={{
              display: 'block', padding: '12px 16px', background: '#f0fdf4', color: '#166534',
              borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 14, textAlign: 'center',
            }}>
              Manage Categories
            </Link>
          </div>
        </div>

        {/* Top Stories */}
        <div style={{ background: '#fff', borderRadius: 10, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: '#1e293b' }}>Top Stories (7 days)</h2>
          <div>
            {(stats.topStories ?? []).map((story, i) => (
              <div key={story.id} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0',
                borderBottom: i < stats.topStories.length - 1 ? '1px solid #f1f5f9' : 'none',
              }}>
                <span style={{
                  flexShrink: 0, width: 24, height: 24, background: '#f1f5f9', borderRadius: 6,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, color: '#64748b',
                }}>
                  {i + 1}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Link href={`/admin/news/${story.id}/edit`} style={{
                    fontSize: 13, color: '#1e293b', textDecoration: 'none', display: 'block',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {story.title}
                  </Link>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>
                    {story.viewCount?.toLocaleString() ?? 0} views
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
