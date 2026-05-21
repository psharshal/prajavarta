import Logo from '@/components/ui/Logo'
import { HamburgerIcon, SearchIcon } from '@/components/ui/Icons'
import styles from './Header.module.css'
import prisma from '@/lib/prisma'

type NavArticle = {
  slug: string
  title: string | null
  featuredImage: string | null
  newsScore: { finalScore: number } | null
  category: { name: string; slug: string } | null
}

const NAV_CATS = [
  { label: 'महाराष्ट्र', href: '/category/maharashtra', catSlug: 'maharashtra' },
  { label: 'पुणे',       href: '/city/Pune',             catSlug: '__city_pune__' },
  { label: 'राजकारण',    href: '/category/politics',     catSlug: 'politics' },
  { label: 'गुन्हेगारी', href: '/category/crime',        catSlug: 'crime' },
  { label: 'मनोरंजन',    href: '/category/entertainment', catSlug: 'entertainment' },
  { label: 'क्रीडा',     href: '/category/sports',       catSlug: 'sports' },
  { label: 'व्यवसाय',    href: '/category/business',     catSlug: 'business' },
  { label: 'देश',        href: '/category/desh',         catSlug: 'desh' },
  { label: 'जग',         href: '/category/jag',          catSlug: 'jag' },
]

const COMPANY_LINKS = [
  { label: 'आमच्याबद्दल',   href: '/about' },
  { label: 'आमचे लेखक',     href: '/author/sunil-deshmukh' },
  { label: 'संपर्क करा',    href: '/contact' },
  { label: '—', href: '#', divider: true },
  { label: 'संपादकीय धोरण', href: '/editorial-policy' },
  { label: 'गोपनीयता धोरण', href: '/privacy-policy' },
  { label: 'अटी व शर्ती',   href: '/terms' },
  { label: 'कुकी धोरण',     href: '/cookie-policy' },
  { label: '—', href: '#', divider: true },
  { label: 'जाहिरात द्या',  href: '/advertise' },
]

async function getNavData() {
  const BASE = { status: 'PUBLISHED' as const, isActive: true }

  const [cats, puneDistrict, allNewsTop] = await Promise.all([
    prisma.category.findMany({ where: { isActive: true }, select: { id: true, slug: true } }),
    prisma.district.findFirst({ where: { nameEnglish: 'Pune' } }),
    prisma.news.findMany({
      where: BASE,
      orderBy: { newsScore: { finalScore: 'desc' } },
      take: 6,
      select: { slug: true, title: true, featuredImage: true, newsScore: true, category: { select: { name: true, slug: true } } },
    }),
  ])

  const catMap = Object.fromEntries(cats.map(c => [c.slug, c.id]))

  const navArticles = await Promise.all(
    NAV_CATS.map(async (nav) => {
      if (nav.catSlug === '__city_pune__') {
        if (!puneDistrict) return { ...nav, articles: [] as NavArticle[] }
        const articles = await prisma.news.findMany({
          where: { ...BASE, districtId: puneDistrict.id },
          orderBy: { newsScore: { finalScore: 'desc' } },
          take: 5,
          select: { slug: true, title: true, featuredImage: true, newsScore: true, category: { select: { name: true, slug: true } } },
        })
        return { ...nav, articles }
      }
      const catId = catMap[nav.catSlug]
      if (!catId) return { ...nav, articles: [] as NavArticle[] }
      const articles = await prisma.news.findMany({
        where: { ...BASE, categoryId: catId },
        orderBy: { newsScore: { finalScore: 'desc' } },
        take: 5,
        select: { slug: true, title: true, featuredImage: true, newsScore: true, category: { select: { name: true, slug: true } } },
      })
      return { ...nav, articles }
    })
  )

  return { navArticles, allNewsTop }
}

export default async function Header() {
  const { navArticles, allNewsTop } = await getNavData()

  return (
    <>
      {/* ── Mobile header ── */}
      <header className={styles.mobileHeader}>
        <div className={styles.mobileLeft}>
          <button className={styles.iconBtn} aria-label="Menu">
            <HamburgerIcon size={20} />
          </button>
          <Logo inverted />
        </div>
        <div className={styles.mobileRight}>
          <button className={styles.iconBtn} aria-label="Search">
            <SearchIcon size={20} />
          </button>
          <a href="/login" className={styles.signinBtnMobile}>Sign In</a>
        </div>
      </header>

      {/* ── Desktop header ── */}
      <header className={styles.desktopHeader}>
        <div className={styles.desktopInner}>
          <div className={styles.logoWrap}>
            <Logo big inverted />
          </div>

          <nav className={`mr ${styles.desktopNav}`}>

            {/* मुख्यपृष्ठ — no dropdown */}
            <a className={styles.navLink} href="/">मुख्यपृष्ठ</a>

            {/* Per-category mega dropdowns */}
            {navArticles.map((nav) => (
              <div key={nav.href} className={styles.dropdownWrapper}>
                <a href={nav.href} className={styles.navLinkDropdown}>{nav.label}</a>

                {nav.articles.length > 0 && (
                  <div className={`${styles.dropdown} ${styles.catMegaDropdown}`}>
                    <div className={styles.catMegaInner}>
                      <div className={styles.catMegaHeader}>
                        <span className={styles.catMegaTitle}>{nav.label} — ताज्या बातम्या</span>
                        <a href={nav.href} className={styles.catMegaViewAll}>सर्व पहा →</a>
                      </div>
                      <div className={styles.catMegaCards}>
                        {nav.articles.map((art) => (
                          <a key={art.slug} href={`/news/${art.slug}`} className={styles.megaNavCard}>
                            {art.featuredImage
                              ? <img src={art.featuredImage} alt="" className={styles.megaNavImg} />
                              : <div className={styles.megaNavImgPh} />
                            }
                            <div className={styles.megaNavCat}>{art.category?.name ?? nav.label}</div>
                            <p className={styles.megaNavHeadline}>{art.title}</p>
                            {art.newsScore && (
                              <span className={styles.megaNavScore}>Score: {art.newsScore.finalScore.toFixed(0)}</span>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* सर्व बातम्या — cross-category mega */}
            <div className={styles.dropdownWrapper}>
              <a href="/all-news" className={styles.navLinkDropdown}>सर्व बातम्या</a>
              <div className={`${styles.dropdown} ${styles.megaDropdown}`}>
                <div className={styles.megaGrid}>
                  {allNewsTop.map((art) => (
                    <a key={art.slug} href={`/news/${art.slug}`} className={styles.megaItem}>
                      {art.featuredImage
                        ? <img src={art.featuredImage} alt="" className={styles.megaThumb} />
                        : <div className={styles.megaThumbPh} />
                      }
                      <div>
                        <div className={styles.megaCat} style={{ color: 'var(--brand-primary)' }}>
                          {art.category?.name ?? ''}
                        </div>
                        <p className={styles.megaHeadline}>{art.title}</p>
                      </div>
                    </a>
                  ))}
                </div>
                <a href="/all-news" className={styles.megaViewAll}>सर्व बातम्या पहा →</a>
              </div>
            </div>

            {/* Company dropdown */}
            <div className={styles.dropdownWrapper}>
              <span className={styles.navLinkDropdown}>Company</span>
              <div className={`${styles.dropdown} ${styles.companyDropdown}`}>
                {COMPANY_LINKS.map((l, i) =>
                  l.divider ? (
                    <div key={i} className={styles.companyDivider} />
                  ) : (
                    <a key={l.href} href={l.href} className={styles.companyLink}>
                      {l.label}
                    </a>
                  )
                )}
              </div>
            </div>
          </nav>

          <div className={styles.desktopActions}>
            <button className={styles.iconBtn} aria-label="Search">
              <SearchIcon size={18} />
            </button>
            <a href="/login" className={styles.signinBtn}>Sign In</a>
          </div>
        </div>
      </header>
    </>
  )
}
