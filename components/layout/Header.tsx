import Logo from '@/components/ui/Logo'
import { HamburgerIcon, SearchIcon } from '@/components/ui/Icons'
import styles from './Header.module.css'

const NAV_ITEMS = ['मुख्यपृष्ठ', 'महाराष्ट्र', 'पुणे', 'राजकारण', 'गुन्हेगारी', 'मनोरंजन', 'क्रीडा', 'व्यवसाय', 'देश', 'जग']

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
