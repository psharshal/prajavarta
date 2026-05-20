import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BreakingStrip from '@/components/layout/BreakingStrip'
import Ad from '@/components/ui/Ad'
import Newsletter from '@/components/ui/Newsletter'
import CategoryChip from '@/components/ui/CategoryChip'
import CategoryUnderline from '@/components/ui/CategoryUnderline'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import CompactListItem from '@/components/cards/CompactListItem'
import StandardCard from '@/components/cards/StandardCard'
import TrendingModule from '@/components/modules/TrendingModule'
import { WhatsAppIcon, FacebookIcon, XIcon, LinkIcon } from '@/components/ui/Icons'
import layout from '@/styles/layout.module.css'
import prisma from '@/lib/prisma'
import { formatMarathiDate, timeAgo } from '@/lib/helper'

const SHARE_BUTTONS = [
  { icon: <WhatsAppIcon size={14} />, color: '#25D366', label: 'WhatsApp' },
  { icon: <FacebookIcon size={14} />, color: '#1877F2', label: 'Facebook' },
  { icon: <XIcon size={14} />, color: '#000', label: 'X' },
  { icon: <LinkIcon size={14} />, color: '#6B6B6B', label: 'Copy' },
]

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const BASE_WHERE = { status: 'PUBLISHED' as const, isActive: true }

  const article = await prisma.news.findUnique({
    where: { slug: params.slug },
    include: {
      author: true,
      category: true,
      district: true,
      newsCategories: { include: { category: true } },
      galleryImages: true,
      newsScore: true,
    },
  })

  if (!article) return notFound()

  // Fire-and-forget view count + score velocity increment
  prisma.news.update({
    where: { id: article.id },
    data: { viewCount: { increment: 1 } },
  }).catch(() => {})
  if (article.newsScore) {
    prisma.newsScore.update({
      where: { newsId: article.id },
      data: { viewsLast2Hrs: { increment: 1 } },
    }).catch(() => {})
  }

  // ── Related P1: same category + district (geo-precision) ──────────────
  const relatedP1 = await prisma.news.findMany({
    where: {
      ...BASE_WHERE,
      id: { not: article.id },
      categoryId: article.categoryId ?? undefined,
      ...(article.districtId != null ? { districtId: article.districtId } : {}),
    },
    orderBy: { newsScore: { finalScore: 'desc' } },
    include: { category: true },
    take: 3,
  })

  // ── Related P2: same category, different/no district ─────────────────
  const p1Ids = relatedP1.map((n) => n.id)
  const relatedP2 = await prisma.news.findMany({
    where: {
      ...BASE_WHERE,
      id: { notIn: [article.id, ...p1Ids] },
      categoryId: article.categoryId ?? undefined,
      ...(article.districtId != null ? { NOT: { districtId: article.districtId } } : {}),
    },
    orderBy: { newsScore: { finalScore: 'desc' } },
    include: { category: true },
    take: 2,
  })

  // ── Related P3: cross-category trending fill (up to 6 total) ─────────
  const p2Ids = relatedP2.map((n) => n.id)
  const haveRelated = relatedP1.length + relatedP2.length
  const relatedP3 = haveRelated < 6 ? await prisma.news.findMany({
    where: { ...BASE_WHERE, id: { notIn: [article.id, ...p1Ids, ...p2Ids] } },
    orderBy: { newsScore: { viewsLast2Hrs: 'desc' } },
    include: { category: true },
    take: 6 - haveRelated,
  }) : []

  const RELATED = [...relatedP1, ...relatedP2, ...relatedP3]
  const usedIds = [article.id, ...RELATED.map((n) => n.id)]

  // ── Trending sidebar — excludes article + all related ─────────────────
  const trendingNews = await prisma.news.findMany({
    where: { ...BASE_WHERE, id: { notIn: usedIds } },
    orderBy: { newsScore: { viewsLast2Hrs: 'desc' } },
    include: { category: true },
    take: 5,
  })

  const TRENDING = trendingNews.map((n) => ({
    c: n.category?.name ?? '',
    h: n.title ?? '',
    href: '/news/' + n.slug,
  }))

  // ── Most read — excludes article + related + trending ──────────────────
  const trendingIds = trendingNews.map((n) => n.id)
  const mostReadNews = await prisma.news.findMany({
    where: { ...BASE_WHERE, id: { notIn: [...usedIds, ...trendingIds] } },
    orderBy: { viewCount: 'desc' },
    take: 4,
  })

  const MOST_READ = mostReadNews.map((n) => ({ title: n.title ?? '', href: '/news/' + n.slug }))

  // Tags
  const TAGS = article.tags
    ? article.tags.split(',').map((t) => t.trim()).filter(Boolean).map((t) => '#' + t)
    : []

  // Author initials
  const authorInitials = article.author?.name
    ? article.author.name.slice(0, 2).toUpperCase()
    : 'प्र'

  const publishedStr = formatMarathiDate(article.publishedDate)
  const updatedStr = timeAgo(article.updatedAt)

  return (
    <div className={layout.page}>
      <Header />
      <BreakingStrip />

      {/* Desktop billboard */}
      <div className={layout.billboard}>
        <Ad id="DA1" name="Desktop Article Top Billboard" size="970×250" width={970} height={250} />
      </div>

      <div className={layout.container}>
        <div className={layout.mainGrid}>

          {/* ── Article column ── */}
          <article className={layout.mainContent}>

            {/* ─ Above the fold ─ */}
            <div>
              {/* Breadcrumb */}
              <div className="mr" style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 12 }}>
                <a href="/" style={{ color: 'inherit' }}>मुख्यपृष्ठ</a>
                <span style={{ margin: '0 6px' }}>›</span>
                {article.category && (
                  <>
                    <a href={`/category/${article.category.slug}`} style={{ color: 'inherit' }}>{article.category.name}</a>
                    <span style={{ margin: '0 6px' }}>›</span>
                  </>
                )}
                <a href="/news" style={{ color: 'inherit' }}>{article.title ?? ''}</a>
              </div>

              <CategoryChip name={article.category?.name ?? ''} />

              <h1
                className="mr"
                style={{
                  margin: '12px 0',
                  lineHeight: 1.25,
                  fontWeight: 800,
                  letterSpacing: '-0.01em',
                  color: 'var(--text-primary)',
                  fontSize: 'clamp(26px, 4vw, 38px)',
                }}
              >
                {article.title ?? ''}
              </h1>

              {article.summary && (
                <p
                  className="mr"
                  style={{
                    margin: '0 0 16px',
                    fontSize: 'clamp(16px, 2vw, 20px)',
                    lineHeight: 1.45,
                    color: 'var(--text-secondary)',
                    fontWeight: 500,
                  }}
                >
                  {article.summary}
                </p>
              )}

              {/* Author byline */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderTop: '1px solid var(--border-default)', borderBottom: '1px solid var(--border-default)' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--brand-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--brand-primary)', fontSize: 16, flexShrink: 0 }}>
                  {article.author?.image
                    ? <img src={article.author.image} alt={article.author.name ?? ''} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }} />
                    : authorInitials}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="mr" style={{ fontSize: 14, fontWeight: 600 }}>
                    {article.author?.name ?? 'संपादकीय टीम'}
                    {article.author?.designation && (
                      <span style={{ color: 'var(--text-tertiary)', fontWeight: 400 }}> · {article.author.designation}</span>
                    )}
                  </div>
                  <div className="mr" style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>
                    प्रकाशित: {publishedStr} · अद्यतनित: {updatedStr}
                  </div>
                </div>
                {/* Save button — desktop only */}
                <button className={layout.desktopOnly} style={{ padding: '8px 14px', background: '#fff', border: '1px solid var(--border-strong)', fontSize: 12, fontWeight: 600, cursor: 'pointer', borderRadius: 3 }}>
                  Save
                </button>
              </div>

              {/* Mobile share buttons */}
              <div className={layout.mobileOnly} style={{ marginTop: 16 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  {SHARE_BUTTONS.map((b, i) => (
                    <button key={i} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '9px 6px', background: '#fff', border: `1px solid ${b.color}`, color: b.color, fontSize: 10, fontWeight: 600, borderRadius: 3, cursor: 'pointer' }}>
                      {b.icon}
                      <span>{b.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Hero image — full column width */}
            <div>
              <ImagePlaceholder ratio="16/9" label="article hero · 1200×675" src={article.featuredImage ?? undefined} />
            </div>

            {/* Mobile ad A1 */}
            <div className={layout.mobileOnly}>
              <Ad id="A1" name="Mobile Article Below Hero Image" size="300×250" height={250} fluid />
            </div>

            {/* ─ Article body ─ */}
            <div style={{ maxWidth: 680 }}>
              <div
                className="mr"
                style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', lineHeight: 1.7, color: 'var(--text-primary)' }}
                dangerouslySetInnerHTML={{ __html: article.description ?? '' }}
              />

              {/* Mobile ad A2 */}
              <div className={layout.mobileOnly} style={{ margin: '24px 0' }}>
                <Ad id="A2" name="Mobile Article After P2" size="300×250" height={250} fluid />
              </div>

              {/* Desktop ad DA3 */}
              <div className={layout.desktopOnly} style={{ margin: '32px 0', textAlign: 'center' }}>
                <Ad id="DA3" name="Desktop Article After P3" size="300×250" width={300} height={250} style={{ display: 'inline-block' }} />
              </div>

              {/* Mobile ad A3 */}
              <div className={layout.mobileOnly} style={{ margin: '24px 0' }}>
                <Ad id="A3" name="Mobile Article After P7-8" size="300×250 / Native" height={250} fluid />
              </div>

              {/* Desktop ad DA4 */}
              <div className={layout.desktopOnly} style={{ margin: '32px 0', textAlign: 'center' }}>
                <Ad id="DA4" name="Desktop Article After P9" size="300×250" width={300} height={250} style={{ display: 'inline-block' }} />
              </div>

              {/* Tags */}
              {TAGS.length > 0 && (
                <div style={{ margin: '32px 0 24px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {TAGS.map((t) => (
                    <a
                      key={t}
                      href={`/tag/${encodeURIComponent(t.replace('#', ''))}`}
                      className="mr"
                      style={{ padding: '6px 14px', border: '1px solid var(--border-default)', borderRadius: 20, fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer', textDecoration: 'none' }}
                    >
                      {t}
                    </a>
                  ))}
                </div>
              )}

              {/* Author bio */}
              {article.author && (
                <div style={{ padding: 24, background: 'var(--surface-secondary)', display: 'flex', gap: 20, marginBottom: 32 }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--brand-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--brand-primary)', fontSize: 22, flexShrink: 0 }}>
                    {article.author.image
                      ? <img src={article.author.image} alt={article.author.name ?? ''} style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover' }} />
                      : authorInitials}
                  </div>
                  <div>
                    <div className="mr" style={{ fontSize: 17, fontWeight: 700 }}>{article.author.name ?? ''}</div>
                    {article.author.designation && (
                      <div className="mr" style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 8 }}>{article.author.designation}</div>
                    )}
                    {article.author.bio && (
                      <p className="mr" style={{ margin: '0 0 12px', fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                        {article.author.bio}
                      </p>
                    )}
                    <div style={{ display: 'flex', gap: 14, fontSize: 13, color: 'var(--brand-primary)', fontWeight: 600 }}>
                      {article.author.twitter && <span style={{ cursor: 'pointer' }}>Twitter</span>}
                      {article.author.linkedin && <span style={{ cursor: 'pointer' }}>LinkedIn</span>}
                      <span style={{ cursor: 'pointer' }}>All articles →</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile ad A4 */}
            <div className={layout.mobileOnly}>
              <Ad id="A4" name="Mobile Article Before Related" size="Multiplex / Native" height={320} fluid />
            </div>

            {/* Desktop ad DA5 */}
            <div className={layout.desktopOnly}>
              <Ad id="DA5" name="Desktop Article Before Recommendations" size="Responsive Native" height={140} fluid />
            </div>

            {/* Related stories */}
            <div>
              <CategoryUnderline name="Maharashtra" label="संबंधित बातम्या" />
              <div className={layout.relatedGrid}>
                {RELATED.map((s, i) => (
                  <StandardCard
                    key={i}
                    category={s.category?.name ?? ''}
                    headline={s.title ?? ''}
                    layout="col"
                    href={'/news/' + s.slug}
                    imageSrc={s.featuredImage ?? undefined}
                  />
                ))}
              </div>
            </div>

            <TrendingModule items={TRENDING} />
          </article>

          {/* ── Sidebar ── */}
          <aside className={layout.sidebar}>
            {/* Desktop share rail */}
            <div style={{ padding: 16, border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Share</div>
              {SHARE_BUTTONS.map((b, k) => (
                <button key={k} style={{ width: 36, height: 36, border: '1px solid var(--border-default)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)', borderRadius: 3 }}>
                  {b.icon}
                </button>
              ))}
            </div>

            {/* Fold 1 */}
            <Ad id="DA2a" name="Desktop Article Sidebar Fold 1" size="300×250" width={300} height={250} />

            <div style={{ padding: 20, border: '1px solid var(--border-default)' }}>
              <CategoryUnderline name="Maharashtra" label="मिनी ट्रेंडिंग" />
              <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {TRENDING.map((item, i) => (
                  <CompactListItem key={i} n={i + 1} headline={item.h} href={item.href} />
                ))}
              </ol>
            </div>

            {/* Fold 2 */}
            <Ad id="DA2b" name="Desktop Article Sidebar Fold 2" size="300×600" width={300} height={600} />

            <div style={{ padding: 20, border: '1px solid var(--border-default)' }}>
              <CategoryUnderline name="Politics" label="सर्वाधिक वाचलेले" />
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {MOST_READ.map((item, i) => (
                  <li key={i} style={{ borderBottom: '1px solid var(--border-default)', paddingBottom: 14 }}>
                    <a href={item.href} style={{ textDecoration: 'none' }}>
                      <span className="mr" style={{ fontSize: 14, lineHeight: 1.45, color: 'var(--text-primary)', fontWeight: 500 }}>{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Score Breakdown (Architecture Demo) ── */}
            {article.newsScore && (
              <div style={{ padding: 20, border: '2px solid #e63946', background: '#fff9f9' }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', color: '#e63946', textTransform: 'uppercase', marginBottom: 12 }}>
                  NewsScore — Architecture
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { label: 'Final Score', val: article.newsScore.finalScore.toFixed(1), color: '#e63946', bold: true },
                    { label: 'Freshness', val: article.newsScore.freshnessScore.toFixed(1), color: '#0ea5e9' },
                    { label: 'Velocity (2hr views)', val: `${article.newsScore.viewsLast2Hrs} → ${article.newsScore.velocityScore.toFixed(1)}`, color: '#10b981' },
                    { label: 'Editorial Label', val: article.editorialLabel, color: '#8b5cf6' },
                    { label: 'Breaking Boost', val: article.isBreakingNews ? '+100' : '0', color: '#f97316' },
                    { label: 'Pinned', val: article.pinToHomepage ? '+200' : '0', color: '#f59e0b' },
                    { label: 'View Count', val: article.viewCount.toString(), color: '#64748b' },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
                      <span style={{ color: '#64748b' }}>{row.label}</span>
                      <span style={{ fontWeight: row.bold ? 800 : 600, color: row.color, fontFamily: 'monospace' }}>{row.val}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 12, fontSize: 11, color: '#94a3b8', lineHeight: 1.5 }}>
                  Score = 0.3×freshness + 0.15×velocity + 0.1×editorial + breaking + pin
                </div>
              </div>
            )}

            <Newsletter />

            {/* Fold 3 */}
            <Ad id="DA2c" name="Desktop Article Sidebar Fold 3" size="300×250" width={300} height={250} />
          </aside>
        </div>
      </div>

      {/* Mobile sticky anchor ad */}
      <div className={layout.mobileOnly} style={{ position: 'sticky', bottom: 0, padding: 8, background: '#fff', borderTop: '1px solid var(--border-default)', boxShadow: '0 -2px 8px rgba(0,0,0,0.05)' }}>
        <Ad id="A5" name="Mobile Article Bottom Anchor" size="320×50" width={320} height={50} sticky style={{ margin: '0 auto' }} />
      </div>

      <Footer />
    </div>
  )
}
