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

export default async function TagPage({ params }: { params: { slug: string } }) {
  const BASE_WHERE = { status: 'PUBLISHED' as const, isActive: true }

  const tagSlug = decodeURIComponent(params.slug)

  // Get all news with this tag
  const taggedNews = await prisma.news.findMany({
    where: {
      ...BASE_WHERE,
      tags: { contains: tagSlug },
    },
    orderBy: { newsScore: { finalScore: 'desc' } },
    include: { category: true },
    take: 50,
  })

  if (taggedNews.length === 0) return notFound()

  // Hero: top scoring
  const heroNews = taggedNews[0]

  // Latest: next 5
  const LATEST = taggedNews.slice(1, 6)

  // Trending: top 5 by viewsLast2Hrs from this tag
  const trendingTagNews = await prisma.news.findMany({
    where: {
      ...BASE_WHERE,
      tags: { contains: tagSlug },
    },
    orderBy: { newsScore: { viewsLast2Hrs: 'desc' } },
    include: { category: true },
    take: 5,
  })

  const TRENDING_TAG = trendingTagNews.map((n) => ({
    c: n.category?.name ?? '',
    h: n.title ?? '',
    href: '/news/' + n.slug,
  }))

  // MostRead: top 5 by viewCount from this tag
  const mostReadNews = await prisma.news.findMany({
    where: {
      ...BASE_WHERE,
      tags: { contains: tagSlug },
    },
    orderBy: { viewCount: 'desc' },
    take: 5,
  })

  // Recently updated from this tag
  const recentlyUpdated = await prisma.news.findMany({
    where: {
      ...BASE_WHERE,
      tags: { contains: tagSlug },
    },
    orderBy: { updatedAt: 'desc' },
    take: 4,
  })

  const RECENTLY_UPDATED = recentlyUpdated.map((n) => ({
    t: timeAgo(n.updatedAt),
    h: n.title ?? '',
    href: '/news/' + n.slug,
  }))

  // Related tags: parse all tags from results and dedupe
  const relatedTagSet = new Set<string>()
  for (const n of taggedNews) {
    if (n.tags) {
      n.tags.split(',').map((t) => t.trim()).filter(Boolean).forEach((t) => {
        if (t.toLowerCase() !== tagSlug.toLowerCase()) relatedTagSet.add('#' + t)
      })
    }
  }
  const RELATED_TAGS = Array.from(relatedTagSet).slice(0, 7)

  const TAG = '#' + tagSlug
  // Use first article's category for color
  const catName = heroNews.category?.name ?? 'Maharashtra'
  const color = catColor(catName)

  return (
    <div className={layout.page}>
      <Header />
      <BreakingStrip />

      {/* Desktop billboard */}
      <div className={layout.billboard}>
        <Ad id="DC1" name="Desktop Tag Page Top Billboard" size="970×250" width={970} height={250} />
      </div>

      <div className={layout.container}>
        {/* Tag header */}
        <div style={{ borderBottom: `4px solid ${color}`, paddingBottom: 24, marginBottom: 32 }}>
          <div className="mr" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 8 }}>
            TAG · विषय
          </div>
          <h1
            className="mr"
            style={{
              margin: '0 0 12px',
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {TAG}
          </h1>
          <p
            className="mr"
            style={{ margin: 0, fontSize: 'clamp(13px, 1.2vw, 16px)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 780 }}
          >
            {TAG} विषयाशी संबंधित सर्व बातम्या, विश्लेषण आणि अद्यतने एकाच ठिकाणी. राज्यातील सामाजिक आणि राजकीय वर्तुळातील सर्वात चर्चित विषय.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 14, fontSize: 13, color: 'var(--text-tertiary)' }}>
            <span className="mr">{taggedNews.length} बातम्या</span>
            <span>·</span>
            <span className="mr">अद्यतनित: {timeAgo(recentlyUpdated[0]?.updatedAt)}</span>
          </div>
        </div>

        <div className={layout.mainGrid}>

          {/* ── Main content ── */}
          <main className={layout.mainContent}>

            {/* Hero */}
            <HeroCard
              category={heroNews.category?.name ?? ''}
              headline={heroNews.title ?? ''}
              subtitle={heroNews.summary ?? undefined}
              href={'/news/' + heroNews.slug}
              imageSrc={heroNews.featuredImage ?? undefined}
            />

            {/* Latest */}
            <div>
              <CategoryUnderline name={catName} label="ताज्या बातम्या" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {LATEST.map((n, i) => (
                  <StandardCard
                    key={i}
                    category={n.category?.name ?? ''}
                    headline={n.title ?? ''}
                    href={'/news/' + n.slug}
                    imageSrc={n.featuredImage ?? undefined}
                  />
                ))}
              </div>
            </div>

            {/* Mobile ad */}
            <div className={layout.mobileOnly}>
              <Ad id="C1" name="Mobile Tag Below Hero" size="300×250" height={250} fluid />
            </div>

            {/* Desktop leaderboard */}
            <div className={layout.desktopOnly} style={{ textAlign: 'center' }}>
              <Ad id="DC3" name="Desktop Tag Between Modules" size="728×90" width={728} height={90} style={{ display: 'inline-block' }} />
            </div>

            {/* Trending */}
            <div style={{ background: 'var(--surface-secondary)', padding: 24 }}>
              <TrendingModule label={`${TAG}-मधील ट्रेंडिंग`} items={TRENDING_TAG} />
            </div>

            {/* Most read (mobile) */}
            <div className={layout.mobileOnly}>
              <CategoryUnderline name={catName} label="सर्वाधिक वाचलेले" />
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {mostReadNews.map((n, i) => (
                  <li key={i} className="mr" style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--text-primary)', padding: '14px 0', borderBottom: '1px solid var(--border-default)', fontWeight: 500 }}>
                    <a href={'/news/' + n.slug} style={{ color: 'inherit', textDecoration: 'none' }}>{n.title}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related tags */}
            {RELATED_TAGS.length > 0 && (
              <div>
                <div className="mr" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>
                  संबंधित विषय
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {RELATED_TAGS.map((t) => (
                    <a
                      key={t}
                      href={`/tag/${encodeURIComponent(t.replace('#', ''))}`}
                      className="mr"
                      style={{ padding: '8px 14px', background: 'var(--brand-primary-light)', color: 'var(--brand-primary)', fontSize: 13, fontWeight: 600, borderRadius: 24, cursor: 'pointer', textDecoration: 'none' }}
                    >
                      {t}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Mobile ad C3 */}
            <div className={layout.mobileOnly}>
              <Ad id="C3" name="Mobile Tag Before Footer" size="Multiplex / Native" height={300} fluid />
            </div>
          </main>

          {/* ── Sidebar ── */}
          <aside className={layout.sidebar}>
            <Ad id="DC2a" name="Desktop Tag Sidebar Fold 1" size="300×250" width={300} height={250} />

            <div style={{ padding: 20, border: '1px solid var(--border-default)' }}>
              <CategoryUnderline name={catName} label="सर्वाधिक वाचलेले" />
              <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {mostReadNews.map((n, i) => (
                  <CompactListItem key={i} n={i + 1} headline={n.title ?? ''} href={'/news/' + n.slug} />
                ))}
              </ol>
            </div>

            <div style={{ padding: 20, border: '1px solid var(--border-default)' }}>
              <CategoryUnderline name={catName} label="नुकतेच अद्यतनित" />
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

            <Ad id="DC2b" name="Desktop Tag Sidebar Fold 2" size="300×600" width={300} height={600} />

            <Newsletter />

            <Ad id="DC2c" name="Desktop Tag Sidebar Fold 3" size="300×250" width={300} height={250} />
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  )
}
