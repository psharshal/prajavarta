import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BreakingStrip from '@/components/layout/BreakingStrip'
import Ad from '@/components/ui/Ad'
import Newsletter from '@/components/ui/Newsletter'
import CategoryUnderline from '@/components/ui/CategoryUnderline'
import HeroCard from '@/components/cards/HeroCard'
import StandardCard from '@/components/cards/StandardCard'
import CompactListItem from '@/components/cards/CompactListItem'
import TrendingModule from '@/components/modules/TrendingModule'
import { catColor } from '@/lib/catColors'
import layout from '@/styles/layout.module.css'
import prisma from '@/lib/prisma'
import { timeAgo } from '@/lib/helper'

export default async function CityPage({ params }: { params: { slug: string } }) {
  const BASE_WHERE = { status: 'PUBLISHED' as const, isActive: true }

  const decodedSlug = decodeURIComponent(params.slug)

  const district = await prisma.district.findFirst({
    where: {
      OR: [
        { nameEnglish: decodedSlug },
        { name: decodedSlug },
      ],
    },
  })

  if (!district) return notFound()

  const DISTRICT_WHERE = { ...BASE_WHERE, districtId: district.id }

  // Hero: top news from this district by finalScore
  const heroNews = await prisma.news.findFirst({
    where: DISTRICT_WHERE,
    orderBy: { newsScore: { finalScore: 'desc' } },
    include: { category: true },
  })

  // Latest: next 6 news from this district
  const latestNews = await prisma.news.findMany({
    where: {
      ...DISTRICT_WHERE,
      id: { not: heroNews?.id ?? 0 },
    },
    orderBy: { publishedDate: 'desc' },
    include: { category: true },
    take: 6,
  })

  // Trending: top 5 from this district by viewsLast2Hrs
  const trendingNews = await prisma.news.findMany({
    where: DISTRICT_WHERE,
    orderBy: { newsScore: { viewsLast2Hrs: 'desc' } },
    include: { category: true },
    take: 5,
  })

  const TRENDING = trendingNews.map((n) => ({
    c: n.category?.name ?? '',
    h: n.title ?? '',
    href: '/news/' + n.slug,
  }))

  // MostRead: top 5 from this district by viewCount
  const mostReadNews = await prisma.news.findMany({
    where: DISTRICT_WHERE,
    orderBy: { viewCount: 'desc' },
    take: 5,
  })

  // ByTopic: get 6 categories, for each get 3 news from this district in that category
  const activeCategories = await prisma.category.findMany({
    where: { isActive: true, slug: { not: 'home-page' } },
    orderBy: { sortOrder: 'asc' },
    take: 6,
  })

  const byTopicRaw = await Promise.all(
    activeCategories.map(async (cat) => {
      const catNews = await prisma.news.findMany({
        where: { ...DISTRICT_WHERE, categoryId: cat.id },
        orderBy: { newsScore: { finalScore: 'desc' } },
        take: 3,
      })
      return { cat, news: catNews }
    })
  )

  const BY_TOPIC = byTopicRaw.filter((t) => t.news.length > 0)

  // RecentlyUpdated sidebar
  const recentlyUpdated = await prisma.news.findMany({
    where: DISTRICT_WHERE,
    orderBy: { updatedAt: 'desc' },
    take: 4,
  })

  const color = catColor(district.name)

  return (
    <div className={layout.page}>
      <Header />
      <BreakingStrip />

      {/* Desktop billboard */}
      <div className={layout.billboard}>
        <Ad id="DC1" name="Desktop City Top Billboard" size="970×250" width={970} height={250} />
      </div>

      <div className={layout.container}>
        {/* City header — full width */}
        <div style={{ borderBottom: `4px solid ${color}`, paddingBottom: 24, marginBottom: 32 }}>
          {/* Breadcrumb */}
          <div className="mr" style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 12 }}>
            <a href="/" style={{ color: 'inherit' }}>मुख्यपृष्ठ</a>
            <span style={{ margin: '0 6px' }}>›</span>
            <span>{district.name}</span>
          </div>
          <h1
            className="mr"
            style={{
              margin: '0 0 12px',
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {district.name} — Prajavarta
          </h1>
          <p
            className="mr"
            style={{ margin: 0, fontSize: 'clamp(14px, 1.2vw, 17px)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 780 }}
          >
            {district.name} जिल्ह्यातील सर्व बातम्या, घडामोडी आणि अद्यतने एकाच ठिकाणी. स्थानिक राजकारण, समाज, विकास आणि नागरी प्रश्न.
          </p>
        </div>

        <div className={layout.mainGrid}>

          {/* ── Main content ── */}
          <main className={layout.mainContent}>

            {/* Hero */}
            {heroNews && (
              <HeroCard
                category={heroNews.category?.name ?? ''}
                headline={heroNews.title ?? ''}
                subtitle={heroNews.summary ?? undefined}
                href={'/news/' + heroNews.slug}
                imageSrc={heroNews.featuredImage ?? undefined}
              />
            )}

            {/* Latest feed */}
            <div>
              <CategoryUnderline name={district.name} label="ताज्या बातम्या" />
              <div className={layout.latestGrid}>
                {latestNews.map((n, i) => (
                  <StandardCard
                    key={i}
                    category={n.category?.name ?? ''}
                    headline={n.title ?? ''}
                    layout="col"
                    href={'/news/' + n.slug}
                    imageSrc={n.featuredImage ?? undefined}
                  />
                ))}
              </div>
            </div>

            {/* Mobile ad C1 */}
            <div className={layout.mobileOnly}>
              <Ad id="C1" name="Mobile City Below Hero" size="300×250" height={250} fluid />
            </div>

            {/* Desktop leaderboard */}
            <div className={layout.desktopOnly} style={{ textAlign: 'center' }}>
              <Ad id="DC3" name="Desktop City Between Modules" size="728×90" width={728} height={90} style={{ display: 'inline-block' }} />
            </div>

            {/* Trending in city */}
            <div style={{ background: 'var(--surface-secondary)', padding: 24 }}>
              <TrendingModule label={`${district.name}-मधील ट्रेंडिंग`} items={TRENDING} />
            </div>

            {/* Mobile most-read */}
            <div className={layout.mobileOnly}>
              <CategoryUnderline name={district.name} label="सर्वाधिक वाचलेले" />
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {mostReadNews.map((n, i) => (
                  <li key={i} className="mr" style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--text-primary)', padding: '14px 0', borderBottom: '1px solid var(--border-default)', fontWeight: 500 }}>
                    <a href={'/news/' + n.slug} style={{ color: 'inherit', textDecoration: 'none' }}>{n.title}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile ad C2 */}
            <div className={layout.mobileOnly}>
              <Ad id="C2" name="Mobile City Between Grids" size="300×250 / Native" height={250} fluid />
            </div>

            {/* By Topic modules */}
            {BY_TOPIC.map(({ cat, news }) => (
              <div key={cat.id}>
                <CategoryUnderline name={cat.name} label={cat.name} />
                <div className={layout.latestGrid}>
                  {news.map((n, i) => (
                    <StandardCard
                      key={i}
                      category={cat.name}
                      headline={n.title ?? ''}
                      layout="col"
                      href={'/news/' + n.slug}
                      imageSrc={n.featuredImage ?? undefined}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Mobile ad C3 */}
            <div className={layout.mobileOnly}>
              <Ad id="C3" name="Mobile City Before Footer" size="Multiplex / Native" height={300} fluid />
            </div>
          </main>

          {/* ── Sidebar ── */}
          <aside className={layout.sidebar}>
            <Ad id="DC2a" name="Desktop City Sidebar Fold 1" size="300×250" width={300} height={250} />

            {/* Most Read */}
            <div style={{ padding: 20, border: '1px solid var(--border-default)' }}>
              <CategoryUnderline name={district.name} label="सर्वाधिक वाचलेले" />
              <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {mostReadNews.map((n, i) => (
                  <CompactListItem key={i} n={i + 1} headline={n.title ?? ''} href={'/news/' + n.slug} />
                ))}
              </ol>
            </div>

            {/* Recently Updated */}
            <div style={{ padding: 20, border: '1px solid var(--border-default)' }}>
              <CategoryUnderline name={district.name} label="नुकतेच अद्यतनित" />
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {recentlyUpdated.map((n, i) => (
                  <li key={i} style={{ borderBottom: '1px solid var(--border-default)', paddingBottom: 14 }}>
                    <div style={{ fontSize: 11, color: 'var(--color-live)', fontWeight: 700, marginBottom: 4, letterSpacing: '0.04em' }}>{timeAgo(n.updatedAt)} पूर्वी</div>
                    <a href={'/news/' + n.slug} style={{ textDecoration: 'none' }}>
                      <p className="mr" style={{ margin: 0, fontSize: 14, fontWeight: 600, lineHeight: 1.4, color: 'var(--text-primary)' }}>{n.title}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <Ad id="DC2b" name="Desktop City Sidebar Fold 2" size="300×600" width={300} height={600} />

            <Newsletter />

            {/* Ad slot 3 */}
            <Ad id="DC2c" name="Desktop City Sidebar Fold 3" size="300×250" width={300} height={250} />
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  )
}
