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
import CategorySection from '@/components/modules/CategorySection'
import layout from '@/styles/layout.module.css'
import prisma from '@/lib/prisma'

export default async function HomePage() {
  const BASE_WHERE = { status: 'PUBLISHED' as const, isActive: true }

  // Hero: top pinned/scored article
  const heroNews = await prisma.news.findFirst({
    where: BASE_WHERE,
    orderBy: [
      { pinToHomepage: 'desc' },
      { newsScore: { finalScore: 'desc' } },
    ],
    include: { category: true },
  })

  // Secondary: next 2 from different categories than hero
  const secondaryNews = await prisma.news.findMany({
    where: {
      ...BASE_WHERE,
      id: { not: heroNews?.id ?? 0 },
      categoryId: { not: heroNews?.categoryId ?? undefined },
    },
    orderBy: { newsScore: { finalScore: 'desc' } },
    include: { category: true },
    take: 2,
  })

  // Trending: top 5 by views last 2 hrs
  const trendingNews = await prisma.news.findMany({
    where: BASE_WHERE,
    orderBy: { newsScore: { viewsLast2Hrs: 'desc' } },
    include: { category: true },
    take: 5,
  })

  const TRENDING_ITEMS = trendingNews.map((n) => ({
    c: n.category?.name ?? '',
    h: n.title ?? '',
    href: '/news/' + n.slug,
  }))

  // Mini trending
  const miniTrendingNews = await prisma.news.findMany({
    where: { ...BASE_WHERE, isMiniTrendingNews: true },
    orderBy: { publishedDate: 'desc' },
    take: 5,
  })
  const MINI_TRENDING = miniTrendingNews.map((n) => n.title ?? '')

  // Category sections: 6 active categories (not home-page)
  const activeCategories = await prisma.category.findMany({
    where: { isActive: true, slug: { not: 'home-page' } },
    orderBy: { sortOrder: 'asc' },
    take: 6,
  })

  const categorySectionsRaw = await Promise.all(
    activeCategories.map(async (cat) => {
      const catNews = await prisma.news.findMany({
        where: { ...BASE_WHERE, categoryId: cat.id },
        orderBy: { newsScore: { finalScore: 'desc' } },
        take: 4,
      })
      return { cat, news: catNews }
    })
  )

  const CATEGORY_SECTIONS = categorySectionsRaw.map(({ cat, news }) => ({
    cat: cat.name,
    hero: {
      title: news[0]?.title ?? '',
      slug: news[0]?.slug ?? '',
      featuredImage: news[0]?.featuredImage ?? undefined,
    },
    stories: news.slice(1).map((n) => ({ title: n.title ?? '', slug: n.slug ?? '' })),
  }))

  // Collect all used IDs to exclude from recommended
  const usedIds = new Set<number>([
    ...(heroNews ? [heroNews.id] : []),
    ...secondaryNews.map((n) => n.id),
    ...trendingNews.map((n) => n.id),
    ...categorySectionsRaw.flatMap(({ news }) => news.map((n) => n.id)),
  ])

  // Recommended: next 6 not already used
  const recommendedNews = await prisma.news.findMany({
    where: { ...BASE_WHERE, id: { notIn: Array.from(usedIds) } },
    orderBy: { newsScore: { finalScore: 'desc' } },
    include: { category: true },
    take: 6,
  })

  const RECOMMENDED = recommendedNews.map((n) => ({
    c: n.category?.name ?? '',
    h: n.title ?? '',
    href: '/news/' + n.slug,
  }))

  // Pune sidebar updates
  const puneUpdatesNews = await prisma.news.findMany({
    where: {
      ...BASE_WHERE,
      district: { name: { contains: 'पुणे' } },
    },
    orderBy: { publishedDate: 'desc' },
    take: 3,
  })
  const PUNE_UPDATES = puneUpdatesNews.map((n) => n.title ?? '')

  return (
    <div className={layout.page}>
      <Header />
      <BreakingStrip />

      {/* Desktop billboard */}
      <div className={layout.billboard}>
        <Ad id="DH1" name="Desktop Homepage Top Billboard" size="970×250" width={970} height={250} />
      </div>

      <div className={layout.container}>
        <div className={layout.mainGrid}>

          {/* ── Main content column ── */}
          <main className={layout.mainContent}>

            {/* Hero story */}
            <HeroCard
              category={heroNews?.category?.name ?? ''}
              headline={heroNews?.title ?? ''}
              subtitle={heroNews?.summary ?? undefined}
              href={'/news/' + heroNews?.slug}
              imageSrc={heroNews?.featuredImage ?? undefined}
            />

            {/* Secondary stories */}
            <div>
              <div className={layout.secondaryGrid}>
                {secondaryNews[0] && (
                  <StandardCard
                    category={secondaryNews[0].category?.name ?? ''}
                    headline={secondaryNews[0].title ?? ''}
                    layout="col"
                    href={'/news/' + secondaryNews[0].slug}
                    imageSrc={secondaryNews[0].featuredImage ?? undefined}
                  />
                )}
                {secondaryNews[1] && (
                  <StandardCard
                    category={secondaryNews[1].category?.name ?? ''}
                    headline={secondaryNews[1].title ?? ''}
                    layout="col"
                    href={'/news/' + secondaryNews[1].slug}
                    imageSrc={secondaryNews[1].featuredImage ?? undefined}
                  />
                )}
              </div>
              {/* Mobile-only third card */}
              <div className={layout.mobileOnly} style={{ marginTop: 16 }}>
                {secondaryNews[2] ? (
                  <StandardCard
                    category={secondaryNews[2].category?.name ?? ''}
                    headline={secondaryNews[2].title ?? ''}
                    href={'/news/' + secondaryNews[2].slug}
                  />
                ) : null}
              </div>
            </div>

            {/* Mobile ad H1 */}
            <div className={layout.mobileOnly}>
              <Ad id="H1" name="Mobile Homepage Below-Header" size="300×250" height={250} fluid />
            </div>

            {/* Trending */}
            <div style={{ background: 'var(--surface-secondary)', padding: 24 }}>
              <TrendingModule items={TRENDING_ITEMS} />
            </div>

            {/* Desktop leaderboard between sections */}
            <div className={layout.desktopOnly} style={{ textAlign: 'center' }}>
              <Ad id="DH3" name="Desktop Between Categories" size="728×90" width={728} height={90} style={{ display: 'inline-block' }} />
            </div>

            {/* Mobile ad H2 */}
            <div className={layout.mobileOnly}>
              <Ad id="H2" name="Mobile Homepage After Hero Block" size="300×250" height={250} fluid />
            </div>

            {/* Category sections */}
            {CATEGORY_SECTIONS.map((sec) => (
              <CategorySection key={sec.cat} cat={sec.cat} hero={sec.hero} stories={sec.stories} />
            ))}

            {/* Mobile ad H3 */}
            <div className={layout.mobileOnly}>
              <Ad id="H3" name="Mobile Homepage After Categories" size="300×250 / Native" height={250} fluid />
            </div>

            {/* Mobile mini trending — visible only on mobile (sidebar hides it on desktop) */}
            <div className={layout.mobileOnly} style={{ background: 'var(--surface-secondary)', padding: '16px 20px', borderTop: '3px solid var(--brand-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-live)', display: 'inline-block' }} />
                <span className="mr" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--color-live)', textTransform: 'uppercase' }}>
                  ट्रेंडिंग आता
                </span>
              </div>
              <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {MINI_TRENDING.map((h, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderBottom: i < MINI_TRENDING.length - 1 ? '1px solid var(--border-default)' : 'none' }}>
                    <span style={{ fontSize: 20, fontWeight: 900, color: 'var(--brand-primary)', fontFamily: 'var(--font-en)', lineHeight: 1.1, minWidth: 28, flexShrink: 0 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="mr" style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.5, color: 'var(--text-primary)' }}>{h}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Recommended */}
            <div>
              <CategoryUnderline name="Maharashtra" label="तुमच्यासाठी निवडक" />
              <div className={layout.recommendedGrid}>
                {RECOMMENDED.map((s, i) => (
                  <StandardCard key={i} category={s.c} headline={s.h} layout="col" href={s.href} />
                ))}
              </div>
            </div>

            {/* Mobile ad H4 */}
            <div className={layout.mobileOnly}>
              <Ad id="H4" name="Mobile Homepage Above Footer" size="Multiplex / Native" height={320} fluid />
            </div>
          </main>

          {/* ── Sidebar (desktop only) ── */}
          <aside className={layout.sidebar}>
            {/* Fold 1: 300×250 */}
            <Ad id="DH2a" name="Desktop Sidebar Fold 1" size="300×250" width={300} height={250} />

            <div style={{ padding: 20, border: '1px solid var(--border-default)' }}>
              <CategoryUnderline name="Maharashtra" label="मिनी ट्रेंडिंग" />
              <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {MINI_TRENDING.map((h, i) => (
                  <CompactListItem key={i} n={i + 1} headline={h} />
                ))}
              </ol>
            </div>

            {/* Fold 2: 300×600 */}
            <Ad id="DH2b" name="Desktop Sidebar Fold 2" size="300×600" width={300} height={600} />

            <Newsletter />

            <div style={{ padding: 20, border: '1px solid var(--border-default)' }}>
              <CategoryUnderline name="Pune" label="पुण्यातील अद्यतन" />
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {PUNE_UPDATES.map((h, i) => (
                  <li key={i} className="mr" style={{ fontSize: 14, lineHeight: 1.4, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-default)', paddingBottom: 12 }}>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Fold 3: 300×250 */}
            <Ad id="DH2c" name="Desktop Sidebar Fold 3" size="300×250" width={300} height={250} />
          </aside>

        </div>
      </div>

      {/* Before-footer ad */}
      <div className={layout.container} style={{ paddingTop: 0 }}>
        <Ad id="DH4" name="Desktop Before Footer" size="Responsive Native" height={140} fluid />
      </div>

      <Footer />
    </div>
  )
}
