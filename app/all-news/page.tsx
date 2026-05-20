import { Suspense } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BreakingStrip from '@/components/layout/BreakingStrip'
import Ad from '@/components/ui/Ad'
import Newsletter from '@/components/ui/Newsletter'
import CategoryUnderline from '@/components/ui/CategoryUnderline'
import StandardCard from '@/components/cards/StandardCard'
import TrendingModule from '@/components/modules/TrendingModule'
import layout from '@/styles/layout.module.css'
import prisma from '@/lib/prisma'
import { timeAgo } from '@/lib/helper'

export default async function AllNewsPage({
  searchParams,
}: {
  searchParams: { page?: string; category?: string }
}) {
  const BASE_WHERE = { status: 'PUBLISHED' as const, isActive: true }
  const page = Math.max(1, parseInt(searchParams.page ?? '1'))
  const categorySlug = searchParams.category ?? ''
  const LIMIT = 18
  const skip = (page - 1) * LIMIT

  // Find category filter if provided
  let categoryFilter: any = {}
  let activeCategory: { id: number; name: string } | null = null
  if (categorySlug) {
    const cat = await prisma.category.findFirst({ where: { slug: categorySlug } })
    if (cat) {
      activeCategory = cat
      categoryFilter = {
        OR: [
          { categoryId: cat.id },
          { newsCategories: { some: { categoryId: cat.id } } },
        ],
      }
    }
  }

  const where = { ...BASE_WHERE, ...categoryFilter }

  const [total, articles, categories, trendingNews] = await Promise.all([
    prisma.news.count({ where }),
    prisma.news.findMany({
      where,
      orderBy: { publishedDate: 'desc' },
      skip,
      take: LIMIT,
      include: { category: true },
    }),
    prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      take: 15,
    }),
    prisma.news.findMany({
      where: BASE_WHERE,
      orderBy: { newsScore: { viewsLast2Hrs: 'desc' } },
      take: 5,
      include: { category: true },
    }),
  ])

  const TRENDING_ITEMS = trendingNews.map(n => ({
    c: n.category?.name ?? '',
    h: n.title ?? '',
    href: `/news/${n.slug}`,
  }))

  const totalPages = Math.ceil(total / LIMIT)

  return (
    <>
      <Header />
      <BreakingStrip />

      <div className={layout.container}>
        {/* Category filter chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '20px 0 8px' }}>
          <a href="/all-news" style={{
            padding: '6px 14px', borderRadius: 999, fontSize: 13, fontWeight: 600,
            background: !categorySlug ? '#e63946' : '#f1f5f9',
            color: !categorySlug ? '#fff' : '#475569',
            textDecoration: 'none',
          }}>
            सर्व
          </a>
          {categories.map(cat => (
            <a key={cat.id} href={`/all-news?category=${cat.slug}`} style={{
              padding: '6px 14px', borderRadius: 999, fontSize: 13, fontWeight: 600,
              background: categorySlug === cat.slug ? '#e63946' : '#f1f5f9',
              color: categorySlug === cat.slug ? '#fff' : '#475569',
              textDecoration: 'none',
            }}>
              {cat.name}
            </a>
          ))}
        </div>

        <div className={layout.gridSidebarRight}>
          <main>
            <CategoryUnderline label={activeCategory ? `${activeCategory.name} - सर्व बातम्या` : 'सर्व ताज्या बातम्या'} />

            <div style={{ color: '#64748b', fontSize: 13, marginBottom: 16 }}>
              {total.toLocaleString()} बातम्या
            </div>

            {articles.length === 0 ? (
              <p style={{ color: '#64748b' }}>कोणत्याही बातम्या सापडल्या नाहीत.</p>
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, margin: '32px 0' }}>
                {page > 1 && (
                  <a href={`/all-news?page=${page - 1}${categorySlug ? `&category=${categorySlug}` : ''}`} style={{
                    padding: '8px 18px', borderRadius: 8, border: '1px solid #e2e8f0',
                    background: '#fff', color: '#475569', textDecoration: 'none', fontSize: 14,
                  }}>
                    मागे
                  </a>
                )}
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  const p = Math.max(1, Math.min(page - 3, totalPages - 6)) + i
                  return (
                    <a key={p} href={`/all-news?page=${p}${categorySlug ? `&category=${categorySlug}` : ''}`} style={{
                      padding: '8px 14px', borderRadius: 8, border: '1px solid #e2e8f0',
                      background: p === page ? '#e63946' : '#fff',
                      color: p === page ? '#fff' : '#475569',
                      textDecoration: 'none', fontSize: 14,
                    }}>
                      {p}
                    </a>
                  )
                })}
                {page < totalPages && (
                  <a href={`/all-news?page=${page + 1}${categorySlug ? `&category=${categorySlug}` : ''}`} style={{
                    padding: '8px 18px', borderRadius: 8, border: '1px solid #e2e8f0',
                    background: '#fff', color: '#475569', textDecoration: 'none', fontSize: 14,
                  }}>
                    पुढे
                  </a>
                )}
              </div>
            )}
          </main>

          <aside>
            <Ad slot="sidebar-top" />
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
