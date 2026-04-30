import Logo from '@/components/ui/Logo'
import styles from './Footer.module.css'

const DESKTOP_COLS = [
  { t: 'विभाग', items: ['महाराष्ट्र', 'पुणे', 'मुंबई', 'राजकारण', 'गुन्हेगारी', 'क्रीडा', 'व्यवसाय', 'मनोरंजन'] },
  { t: 'कंपनी', items: ['आमच्याबद्दल', 'संपर्क', 'संपादकीय धोरण', 'फॅक्ट चेक', 'दुरुस्ती धोरण', 'करिअर्स'] },
  { t: 'धोरणे', items: ['गोपनीयता', 'अटी व शर्ती', 'कुकी धोरण', 'DPDP अनुपालन', 'जाहिरात द्या'] },
  { t: 'Follow', items: ['Twitter', 'Facebook', 'WhatsApp Channel', 'YouTube', 'Instagram'] },
]

const MOBILE_COLS = [
  { t: 'विभाग', items: ['महाराष्ट्र', 'पुणे', 'राजकारण', 'क्रीडा'] },
  { t: 'कंपनी', items: ['आमच्याबद्दल', 'संपादकीय धोरण', 'फॅक्ट चेक'] },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Desktop footer */}
      <div className={styles.desktopFooter}>
        <div className={styles.desktopGrid}>
          <div>
            <Logo big inverted />
            <p className="mr" style={{ fontSize: 13, lineHeight: 1.7, opacity: 0.7, marginTop: 12 }}>
              मराठीतून विश्वासार्ह बातम्या · संपादकीय निष्ठा आणि वाचनीय अनुभव.
            </p>
          </div>
          {DESKTOP_COLS.map((col) => (
            <div key={col.t}>
              <div
                className="mr"
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: 14,
                  opacity: 0.85,
                }}
              >
                {col.t}
              </div>
              <ul className={styles.footerList}>
                {col.items.map((item) => (
                  <li key={item} className="mr" style={{ fontSize: 13, opacity: 0.7, cursor: 'pointer' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.copyright}>
          <span>© 2026 Prajavarta Media Pvt. Ltd. RNI: MAHMAR/2024/12345</span>
          <span>v1.0</span>
        </div>
      </div>

      {/* Mobile footer */}
      <div className={styles.mobileFooter}>
        <Logo big inverted />
        <p className="mr" style={{ fontSize: 12, lineHeight: 1.7, opacity: 0.7, marginTop: 10 }}>
          मराठीतून विश्वासार्ह बातम्या.
        </p>
        <div className={styles.mobileGrid}>
          {MOBILE_COLS.map((col) => (
            <div key={col.t}>
              <div
                className="mr"
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                  opacity: 0.85,
                }}
              >
                {col.t}
              </div>
              <ul className={styles.footerList}>
                {col.items.map((item) => (
                  <li key={item} className="mr" style={{ fontSize: 12, opacity: 0.7 }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.mobileCopyright}>
          © 2026 Prajavarta · RNI: MAHMAR/2024/12345
        </div>
      </div>
    </footer>
  )
}
