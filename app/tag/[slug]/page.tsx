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

const CAT = 'महाराष्ट्र'
const TAG = '#मराठा आरक्षण'

const LATEST = [
  'मराठा आरक्षणावर सर्वोच्च न्यायालयाची सुनावणी पुढे ढकलली',
  'जरांगे पाटील यांचा उपोषण मागे घेण्याचा निर्णय',
  'मराठा आरक्षणासाठी विधेयक मांडण्याची शक्यता',
  'OBC नेत्यांचा मराठा आरक्षणाला विरोध कायम',
  'मराठा आरक्षण: सर्वपक्षीय बैठकीत तोडगा काढण्याचा प्रयत्न',
]

const TRENDING_TAG = [
  { c: CAT, h: 'मनोज जरांगे पाटील आज औरंगाबादेत उपोषणाला बसणार' },
  { c: CAT, h: 'सरकारने जरांगे पाटील यांच्याशी चर्चेसाठी समिती नेमली' },
  { c: CAT, h: 'मराठा आरक्षणावर मुख्यमंत्र्यांचे आज निवेदन' },
  { c: CAT, h: 'आरक्षण आंदोलनाचे पर्यटनावर परिणाम' },
  { c: CAT, h: 'OBC आयोगाच्या अहवालाला विरोध सुरूच' },
]

const MOST_READ = [
  'मराठा आरक्षणाचा इतिहास: १९९० ते आजपर्यंत',
  'मराठा समाजाची लोकसंख्या किती? आकडेवारी काय सांगते',
  'OBC आरक्षणाचा मराठा आरक्षणाशी काय संबंध',
  'जरांगे पाटील कोण आहेत? संपूर्ण ओळख',
  'सर्वोच्च न्यायालयाने मराठा आरक्षण रद्द का केले?',
]

const RECENTLY_UPDATED = [
  { t: '२ मि.', h: 'जरांगे पाटीलांचे आज सकाळचे निवेदन' },
  { t: '४५ मि.', h: 'छत्रपती संभाजीनगरात शांतता' },
  { t: '२ तास', h: 'सरकारची उद्या समिती बैठक' },
  { t: '५ तास', h: 'मराठा संघटनांची एकत्रित बैठक पुढे ढकलली' },
]

const RELATED_TAGS = ['#जरांगे पाटील', '#OBC आरक्षण', '#सर्वोच्च न्यायालय', '#विधानसभा', '#मंत्रिमंडळ', '#महाराष्ट्र', '#समाजकारण']

export default function TagPage() {
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
        <div style={{ borderBottom: `4px solid ${catColor(CAT)}`, paddingBottom: 24, marginBottom: 32 }}>
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
            <span className="mr">१४८ बातम्या</span>
            <span>·</span>
            <span className="mr">अद्यतनित: २९ एप्रिल</span>
          </div>
        </div>

        <div className={layout.mainGrid}>

          {/* ── Main content ── */}
          <main className={layout.mainContent}>

            {/* Hero */}
            <HeroCard
              category={CAT}
              headline="मराठा आरक्षणावर सर्वोच्च न्यायालयाची सुनावणी पुढे ढकलली"
            />

            {/* Latest */}
            <div>
              <CategoryUnderline name={CAT} label="ताज्या बातम्या" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {LATEST.map((h, i) => (
                  <StandardCard key={i} category={CAT} headline={h} />
                ))}
              </div>
            </div>

            {/* Mobile ad */}
            <div className={layout.mobileOnly}>
              <Ad id="C1" name="Mobile Tag Below Hero" size="300×250" height={250} fluid />
            </div>

            {/* Desktop leaderboard */}
            <div className={layout.desktopOnly} style={{ display: 'flex', justifyContent: 'center' }}>
              <Ad id="DC3" name="Desktop Tag Between Modules" size="728×90" width={728} height={90} />
            </div>

            {/* Trending */}
            <div style={{ background: 'var(--surface-secondary)', padding: 24 }}>
              <TrendingModule label={`${TAG}-मधील ट्रेंडिंग`} items={TRENDING_TAG} />
            </div>

            {/* Most read (mobile) */}
            <div className={layout.mobileOnly}>
              <CategoryUnderline name={CAT} label="सर्वाधिक वाचलेले" />
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {MOST_READ.map((h, i) => (
                  <li key={i} className="mr" style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--text-primary)', padding: '14px 0', borderBottom: '1px solid var(--border-default)', fontWeight: 500 }}>{h}</li>
                ))}
              </ul>
            </div>

            {/* Related tags */}
            <div>
              <div className="mr" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>
                संबंधित विषय
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {RELATED_TAGS.map((t) => (
                  <span key={t} className="mr" style={{ padding: '8px 14px', background: 'var(--brand-primary-light)', color: 'var(--brand-primary)', fontSize: 13, fontWeight: 600, borderRadius: 24, cursor: 'pointer' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Mobile ad C3 */}
            <div className={layout.mobileOnly}>
              <Ad id="C3" name="Mobile Tag Before Footer" size="Multiplex / Native" height={300} fluid />
            </div>
          </main>

          {/* ── Sidebar ── */}
          <aside className={layout.sidebar}>
            <div style={{ position: 'sticky', top: 72 }}>
              <Ad id="DC2" name="Desktop Tag Sidebar" size="300×600" width={300} height={600} sticky />
              <p style={{ fontSize: 10, color: 'var(--text-tertiary)', fontFamily: 'ui-monospace, monospace', marginTop: 6 }}>
                ↑ sticky on scroll
              </p>
            </div>

            <div style={{ padding: 20, border: '1px solid var(--border-default)' }}>
              <CategoryUnderline name={CAT} label="सर्वाधिक वाचलेले" />
              <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {MOST_READ.map((h, i) => (
                  <CompactListItem key={i} n={i + 1} headline={h} />
                ))}
              </ol>
            </div>

            <div style={{ padding: 20, border: '1px solid var(--border-default)' }}>
              <CategoryUnderline name={CAT} label="नुकतेच अद्यतनित" />
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {RECENTLY_UPDATED.map((s, i) => (
                  <li key={i} style={{ borderBottom: '1px solid var(--border-default)', paddingBottom: 14 }}>
                    <div style={{ fontSize: 11, color: 'var(--color-live)', fontWeight: 700, marginBottom: 4, letterSpacing: '0.04em' }}>{s.t} पूर्वी</div>
                    <p className="mr" style={{ margin: 0, fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>{s.h}</p>
                  </li>
                ))}
              </ul>
            </div>

            <Newsletter />
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  )
}
