import Logo from '@/components/ui/Logo'
import { HamburgerIcon, SearchIcon } from '@/components/ui/Icons'
import styles from './Header.module.css'

const NAV_ITEMS = ['मुख्यपृष्ठ', 'महाराष्ट्र', 'पुणे', 'राजकारण', 'गुन्हेगारी', 'मनोरंजन', 'क्रीडा', 'व्यवसाय', 'देश', 'जग']

const MEGA_NEWS = [
  { c: 'महाराष्ट्र', h: 'राज्यात कांद्याच्या भावात मोठी घसरण, शेतकऱ्यांचे आंदोलन', color: '#c0392b' },
  { c: 'राजकारण', h: 'विधानसभेत सत्तासंघर्ष: हालचालींना वेग', color: '#8B0000' },
  { c: 'क्रीडा', h: 'रोहित शर्मा कसोटी संघातून निवृत्त', color: '#1565C0' },
  { c: 'व्यवसाय', h: 'सेन्सेक्सने ८०,००० चा ऐतिहासिक टप्पा ओलांडला', color: '#1B5E20' },
  { c: 'पुणे', h: 'पुण्यात मेट्रोच्या तिसऱ्या टप्प्याचे काम सुरू', color: '#E65100' },
  { c: 'मनोरंजन', h: 'रितेश देशमुखचा नवा चित्रपट दिवाळीला प्रदर्शित', color: '#6A1B9A' },
]

const COMPANY_LINKS = [
  { label: 'आमच्याबद्दल', href: '/about' },
  { label: 'आमचे लेखक', href: '/author/sunil-deshmukh' },
  { label: 'संपर्क करा', href: '/contact' },
  { label: '—', href: '#', divider: true },
  { label: 'संपादकीय धोरण', href: '/editorial-policy' },
  { label: 'गोपनीयता धोरण', href: '/privacy-policy' },
  { label: 'अटी व शर्ती', href: '/terms' },
  { label: 'कुकी धोरण', href: '/cookie-policy' },
  { label: '—', href: '#', divider: true },
  { label: 'जाहिरात द्या', href: '/advertise' },
]

export default function Header() {
  return (
    <>
      {/* Mobile header */}
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
          <div className={styles.divider} />
          <span className={styles.langToggle}>ENG</span>
        </div>
      </header>

      {/* Desktop header */}
      <header className={styles.desktopHeader}>
        <div className={styles.desktopInner}>
          <Logo big inverted />
          <nav className={`mr ${styles.desktopNav}`}>
            {NAV_ITEMS.map((item) => (
              <a key={item} className={styles.navLink} href="#">
                {item}
              </a>
            ))}

            {/* All News mega dropdown */}
            <div className={styles.dropdownWrapper}>
              <a href="/all-news" className={styles.navLinkDropdown}>सर्व बातम्या</a>
              <div className={`${styles.dropdown} ${styles.megaDropdown}`}>
                <div className={styles.megaGrid}>
                  {MEGA_NEWS.map((item, i) => (
                    <a key={i} href="/all-news" className={styles.megaItem}>
                      <div className={`imgph ${styles.megaThumb}`} />
                      <div>
                        <div className={styles.megaCat} style={{ color: item.color }}>{item.c}</div>
                        <p className={styles.megaHeadline}>{item.h}</p>
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
            <span className={styles.langToggleDesktop}>ENG | मराठी</span>
            <button className={styles.signinBtn}>Sign in</button>
          </div>
        </div>
      </header>
    </>
  )
}
