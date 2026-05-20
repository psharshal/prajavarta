import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BreakingStrip from '@/components/layout/BreakingStrip'
import Ad from '@/components/ui/Ad'
import Newsletter from '@/components/ui/Newsletter'
import CategoryChip from '@/components/ui/CategoryChip'
import CategoryUnderline from '@/components/ui/CategoryUnderline'
import StandardCard from '@/components/cards/StandardCard'
import TrendingModule from '@/components/modules/TrendingModule'
import { XIcon } from '@/components/ui/Icons'
import layout from '@/styles/layout.module.css'
import prisma from '@/lib/prisma'
import { timeAgo } from '@/lib/helper'

export default async function AuthorPage({ params }: { params: { slug: string } }) {
  const BASE_WHERE = { status: 'PUBLISHED' as const, isActive: true }
  const decoded = decodeURIComponent(params.slug)
  const numericId = parseInt(decoded)

  const author = await prisma.user.findFirst({
    where: {
      OR: [
        ...(isNaN(numericId) ? [] : [{ id: numericId }]),
        { nameEnglish: { equals: decoded } },
      ],
      role: { in: ['REPORTER', 'MODERATOR', 'SUPER_ADMIN'] },
    },
  })

  if (!author) return notFound()

  const [articles, trendingNews, mostReadByAuthor] = await Promise.all([
    prisma.news.findMany({
      where: { ...BASE_WHERE, authorId: author.id },
      orderBy: { publishedDate: 'desc' },
      take: 12,
      include: { category: true },
    }),
    prisma.news.findMany({
      where: BASE_WHERE,
      orderBy: { newsScore: { viewsLast2Hrs: 'desc' } },
      take: 5,
      include: { category: true },
    }),
    prisma.news.findMany({
      where: { ...BASE_WHERE, authorId: author.id },
      orderBy: { viewCount: 'desc' },
      take: 5,
      include: { category: true },
    }),
  ])

  const TRENDING_ITEMS = trendingNews.map(n => ({
    c: n.category?.name ?? '',
    h: n.title ?? '',
    href: `/news/${n.slug}`,
  }))

  const initials = (author.name ?? author.nameEnglish ?? 'A').slice(0, 2).toUpperCase()

  return (
    <>
      <Header />
      <BreakingStrip />

      <div className={layout.container}>
        {/* Author header */}
        <div style={{
          background: '#1a1a2e', borderRadius: 12, padding: '32px 28px',
          margin: '24px 0', display: 'flex', gap: 24, alignItems: 'flex-start',
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%', background: '#e63946',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, fontWeight: 700, color: '#fff', flexShrink: 0, overflow: 'hidden',
          }}>
            {author.image
              ? <img src={author.image} alt={author.name ?? ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : initials}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ color: '#fff', margin: '0 0 4px', fontSize: 22, fontWeight: 700 }}>
              {author.name ?? author.nameEnglish}
            </h1>
            {author.designation && (
              <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 8 }}>{author.designation}</div>
            )}
            {author.bio && (
              <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6, margin: '8px 0 12px' }}>{author.bio}</p>
            )}
            {author.twitter && (
              <a href={`https://twitter.com/${author.twitter}`} target="_blank" rel="noreferrer" style={{ color: '#94a3b8' }}>
                <XIcon size={16} />
              </a>
            )}
          </div>
          <div style={{ textAlign: 'right', color: '#64748b', fontSize: 13 }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#e2e8f0' }}>{articles.length}+</div>
            <div>लेख</div>
          </div>
        </div>

        <div className={layout.gridSidebarRight}>
          <main>
            <CategoryUnderline label={`${author.name ?? author.nameEnglish} यांचे लेख`} />

            {articles.length === 0 ? (
              <p style={{ color: '#64748b', padding: '20px 0' }}>कोणतेही लेख उपलब्ध नाहीत.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {articles.map(a => (
                  <StandardCard
                    key={a.id}
                    category={a.category?.name ?? ''}
                    headline={a.title ?? ''}
                    href={`/news/${a.slug}`}
                    imageSrc={a.featuredImage ?? undefined}
                    meta={timeAgo(a.publishedDate ?? a.createdAt)}
                  />
                ))}
              </div>
            )}
          </main>

          <aside>
            <Ad slot="sidebar-top" />

            {mostReadByAuthor.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <CategoryUnderline label="सर्वाधिक वाचलेले" />
                {mostReadByAuthor.map((a, i) => (
                  <a key={a.id} href={`/news/${a.slug}`} style={{
                    display: 'flex', gap: 10, padding: '10px 0',
                    borderBottom: '1px solid #f1f5f9', textDecoration: 'none',
                  }}>
                    <span style={{ color: '#e63946', fontWeight: 700, fontSize: 16, minWidth: 24 }}>{i + 1}</span>
                    <div>
                      {a.category && <CategoryChip label={a.category.name} />}
                      <div style={{ fontSize: 14, color: '#1e293b', marginTop: 4 }}>{a.title}</div>
                    </div>
                  </a>
                ))}
              </div>
            )}

            <TrendingModule items={TRENDING_ITEMS} />
            <Ad slot="sidebar-bottom" />
          </aside>
        </div>
      </div>

      <Newsletter />
      <Footer />
    </>
  )
}
