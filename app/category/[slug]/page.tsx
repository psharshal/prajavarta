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

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const BASE_WHERE = { status: 'PUBLISHED' as const, isActive: true }

  const decodedSlug = decodeURIComponent(params.slug)

  const category = await prisma.category.findFirst({
    where: {
      OR: [
        { slug: decodedSlug },
        { nameEnglish: decodedSlug },
      ],
    },
  })

  if (!category) return notFound()

  const CAT_WHERE = { ...BASE_WHERE, categoryId: category.id }

  // Hero: top news in this category by finalScore
  const heroNews = await prisma.news.findFirst({
    where: CAT_WHERE,
    orderBy: { newsScore: { finalScore: 'desc' } },
    include: { category: true },
  })

  // Latest: next 6 in this category
  const latestNews = await prisma.news.findMany({
    where: {
      ...CAT_WHERE,
      id: { not: heroNews?.id ?? 0 },
    },
    orderBy: { publishedDate: 'desc' },
    include: { category: true },
    take: 6,
  })

  // Trending in category
  const trendingNews = await prisma.news.findMany({
    where: CAT_WHERE,
    orderBy: { newsScore: { viewsLast2Hrs: 'desc' } },
    include: { category: true },
    take: 5,
  })

  const TRENDING_CAT = trendingNews.map((n) => ({
    c: n.category?.name ?? '',
    h: n.title ?? '',
    href: '/news/' + n.slug,
  }))

  // MostRead
  const mostReadNews = await prisma.news.findMany({
    where: CAT_WHERE,
    orderBy: { viewCount: 'desc' },
    take: 5,
  })

  // Evergreen: lower-scored but older articles (ordered by publishedDate asc as proxy)
  const evergreenNews = await prisma.news.findMany({
    where: CAT_WHERE,
    orderBy: { publishedDate: 'asc' },
    include: { category: true },
    take: 4,
  })

  // Subcities: Pune, Mumbai, Nagpur — 1 news each in this category
  const subCityNames = ['पुणे', 'मुंबई', 'नागपूर']
  const subCityNewsRaw = await Promise.all(
    subCityNames.map(async (cityName) => {
      const district = await prisma.district.findFirst({ where: { name: { contains: cityName } } })
      if (!district) return { city: cityName, news: null }
      const news = await prisma.news.findFirst({
        where: { ...CAT_WHERE, districtId: district.id },
        orderBy: { newsScore: { finalScore: 'desc' } },
      })
      return { city: cityName, news }
    })
  )

  const SUBCITIES = subCityNewsRaw.filter((s) => s.news !== null) as { city: string; news: NonNullable<typeof subCityNewsRaw[0]['news']> }[]

  // RelatedTags: parse all news tags in this category, collect unique non-empty tags
  const taggedNews = await prisma.news.findMany({
    where: { ...CAT_WHERE, tags: { not: null } },
    select: { tags: true },
    take: 100,
  })

  const allTags = new Set<string>()
  for (const n of taggedNews) {
    if (n.tags) {
      n.tags.split(',').map((t) => t.trim()).filter(Boolean).forEach((t) => allTags.add('#' + t))
    }
  }
  const RELATED_TAGS = Array.from(allTags).slice(0, 14)

  // RecentlyUpdated sidebar
  const recentlyUpdated = await prisma.news.findMany({
    where: CAT_WHERE,
    orderBy: { updatedAt: 'desc' },
    take: 4,
  })

  const RECENTLY_UPDATED = recentlyUpdated.map((n) => ({
    t: timeAgo(n.updatedAt),
    h: n.title ?? '',
    href: '/news/' + n.slug,
  }))

  const CAT = category.name
  const color = catColor(CAT)

  return (
    <div className={layout.page}>
      <Header />
      <BreakingStrip />

      {/* Desktop billboard */}
      <div className={layout.billboard}>
        <Ad id="DC1" name="Desktop Category Top Billboard" size="970×250" width={970} height={250} />
      </div>

      <div className={layout.container}>
        {/* Category header — full width */}
        <div style={{ borderBottom: `4px solid ${color}`, paddingBottom: 24, marginBottom: 32 }}>
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
            {CAT}
          </h1>
          {category.description && (
            <p
              className="mr"
              style={{ margin: 0, fontSize: 'clamp(14px, 1.2vw, 17px)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 780 }}
            >
              {category.description}
            </p>
          )}
        </div>

        <div className={layout.mainGrid}>

          {/* ── Main content ── */}
          <main className={layout.mainContent}>

            {/* Hero */}
            {heroNews && (
              <HeroCard
                category={CAT}
                headline={heroNews.title ?? ''}
                subtitle={heroNews.summary ?? undefined}
                href={'/news/' + heroNews.slug}
                imageSrc={heroNews.featuredImage ?? undefined}
              />
            )}

            {/* Latest feed */}
            <div>
              <CategoryUnderline name={CAT} label="ताज्या बातम्या" />
              <div className={layout.latestGrid}>
                {latestNews.map((n, i) => (
                  <StandardCard
                    key={i}
                    category={CAT}
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
              <Ad id="C1" name="Mobile Category Below Hero" size="300×250" height={250} fluid />
            </div>

            {/* Desktop leaderboard */}
            <div className={layout.desktopOnly} style={{ textAlign: 'center' }}>
              <Ad id="DC3" name="Desktop Category Between Modules" size="728×90" width={728} height={90} style={{ display: 'inline-block' }} />
            </div>

            {/* Trending in category */}
            <div style={{ background: 'var(--surface-secondary)', padding: 24 }}>
              <TrendingModule label={`${CAT}-मधील ट्रेंडिंग`} items={TRENDING_CAT} />
            </div>

            {/* Mobile most-read */}
            <div className={layout.mobileOnly}>
              <CategoryUnderline name={CAT} label="सर्वाधिक वाचलेले" />
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
              <Ad id="C2" name="Mobile Category Between Grids" size="300×250 / Native" height={250} fluid />
            </div>

            {/* Subcategory modules — desktop only */}
            {SUBCITIES.length > 0 && (
              <div className={layout.desktopOnly}>
                <CategoryUnderline name={CAT} label="शहरांनुसार बातम्या" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
                  {SUBCITIES.map((s) => (
                    <div key={s.city}>
                      <div className="mr" style={{ fontSize: 13, fontWeight: 700, color: catColor(CAT), marginBottom: 10, letterSpacing: '0.04em' }}>{s.city}</div>
                      <StandardCard
                        layout="col"
                        category={CAT}
                        headline={s.news.title ?? ''}
                        href={'/news/' + s.news.slug}
                        imageSrc={s.news.featuredImage ?? undefined}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mobile subcategories */}
            <div className={layout.mobileOnly}>
              <CategoryUnderline name={CAT} label="उप-विभाग" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {['मुंबई', 'पुणे', 'नागपूर', 'औरंगाबाद', 'कोल्हापूर', 'नाशिक'].map((city) => (
                  <a key={city} href={`/city/${encodeURIComponent(city)}`} className="mr" style={{ padding: '14px 12px', border: '1px solid var(--border-default)', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', display: 'block', cursor: 'pointer', textDecoration: 'none' }}>
                    {city} →
                  </a>
                ))}
              </div>
            </div>

            {/* Evergreen */}
            <div>
              <CategoryUnderline name={CAT} label="विशेष वाचा" />
              <div className={layout.latestGrid}>
                {evergreenNews.map((n, i) => (
                  <StandardCard
                    key={i}
                    layout="col"
                    category={CAT}
                    headline={n.title ?? ''}
                    href={'/news/' + n.slug}
                    imageSrc={n.featuredImage ?? undefined}
                  />
                ))}
              </div>
            </div>

            {/* Related tags */}
            {RELATED_TAGS.length > 0 && (
              <div>
                <div className="mr" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>
                  संबंधित विषय · TOPIC CLUSTER
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {RELATED_TAGS.map((t) => (
                    <a
                      key={t}
                      href={`/tag/${encodeURIComponent(t.replace('#', ''))}`}
                      className="mr"
                      style={{ padding: '8px 14px', background: 'var(--brand-primary-light)', color: 'var(--brand-primary)', fontSize: 14, fontWeight: 600, borderRadius: 24, cursor: 'pointer', textDecoration: 'none' }}
                    >
                      {t}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Mobile ad C3 */}
            <div className={layout.mobileOnly}>
              <Ad id="C3" name="Mobile Category Before Footer" size="Multiplex / Native" height={300} fluid />
            </div>
          </main>

          {/* ── Sidebar ── */}
          <aside className={layout.sidebar}>
            <Ad id="DC2a" name="Desktop Category Sidebar Fold 1" size="300×250" width={300} height={250} />

            <div style={{ padding: 20, border: '1px solid var(--border-default)' }}>
              <CategoryUnderline name={CAT} label="सर्वाधिक वाचलेले" />
              <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {mostReadNews.map((n, i) => (
                  <CompactListItem key={i} n={i + 1} headline={n.title ?? ''} href={'/news/' + n.slug} />
                ))}
              </ol>
            </div>

            <div style={{ padding: 20, border: '1px solid var(--border-default)' }}>
              <CategoryUnderline name={CAT} label="नुकतेच अद्यतनित" />
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {RECENTLY_UPDATED.map((s, i) => (
                  <li key={i} style={{ borderBottom: '1px solid var(--border-default)', paddingBottom: 14 }}>
                    <div style={{ fontSize: 11, color: 'var(--color-live)', fontWeight: 700, marginBottom: 4, letterSpacing: '0.04em' }}>{s.t} पूर्वी</div>
                    <a href={s.href} style={{ textDecoration: 'none' }}>
                      <p className="mr" style={{ margin: 0, fontSize: 14, fontWeight: 600, lineHeight: 1.4, color: 'var(--text-primary)' }}>{s.h}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <Ad id="DC2b" name="Desktop Category Sidebar Fold 2" size="300×600" width={300} height={600} />

            <Newsletter />

            <Ad id="DC2c" name="Desktop Category Sidebar Fold 3" size="300×250" width={300} height={250} />
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  )
}
