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

const LATEST = [
  'नागपूर हिवाळी अधिवेशनाची तारीख निश्चित, १६ डिसेंबरपासून सुरुवात',
  'औरंगाबाद नामांतर वाद पुन्हा चर्चेत, सुप्रीम कोर्टात सुनावणी',
  'नाशिकमध्ये द्राक्ष निर्यातीत २०% घट, युरोपीय निर्बंधांचा परिणाम',
  'विधान परिषदेच्या निवडणुकीचे वेळापत्रक जाहीर',
  'मराठवाड्यात अवकाळी पावसाचा कहर, १२ जिल्ह्यांत पीकहानी',
  'कोकणात पावसाने सरासरी ओलांडली, शेतकऱ्यांना दिलासा',
]

const TRENDING_CAT = [
  { c: CAT, h: 'मनोज जरांगे पाटील आज औरंगाबादेत उपोषणाला बसणार' },
  { c: CAT, h: 'मुंबईत मेट्रो लाईन ३ चे काम पूर्णत्वाच्या मार्गावर' },
  { c: CAT, h: 'कोकण किनारपट्टीवर पर्यटनाला उत्तेजन देण्यासाठी नवी योजना' },
  { c: CAT, h: 'विदर्भातील शेतकऱ्यांसाठी १,२०० कोटींचे पॅकेज जाहीर' },
  { c: CAT, h: 'मराठी भाषा विद्यापीठाच्या स्थापनेला राज्य मंत्रिमंडळाची मान्यता' },
]

const MOST_READ = [
  'मराठा आरक्षणावर सर्वोच्च न्यायालयाची सुनावणी',
  'शिवसेनेच्या अधिवेशनात ठाकरेंचे आक्रमक भाषण',
  'महावितरणच्या वीजबिलात ८% वाढीचा प्रस्ताव',
  'MPSC परीक्षेचे नवीन वेळापत्रक जाहीर',
  'गणेशोत्सव परवानगी प्रक्रिया जलद',
]

const SUBCITIES = [
  { city: 'मुंबई', h: 'मेट्रो लाईन ३ चे काम अंतिम टप्प्यात' },
  { city: 'पुणे', h: 'हिंजवडीत आयटी विस्तार योजना मंजूर' },
  { city: 'नागपूर', h: 'हिवाळी अधिवेशनाची तयारी सुरू' },
]

const EVERGREEN = [
  'महाराष्ट्राच्या स्थापनेची पूर्ण कथा: १९६० ते आजपर्यंत',
  'संयुक्त महाराष्ट्र चळवळ — एका लढ्याची शोधयात्रा',
  'मराठी अस्मितेची नवी ओळख: संस्कृती, साहित्य, चित्रपट',
  'महाराष्ट्रातील १० ऐतिहासिक स्थळे जी प्रत्येकाने पाहावी',
]

const RELATED_TAGS = ['#मराठा आरक्षण', '#जरांगे पाटील', '#विधानसभा', '#मंत्रिमंडळ', '#फडणवीस', '#शिंदे', '#शेतकरी', '#कांदा', '#पाऊस', '#मुंबई', '#पुणे', '#नागपूर', '#हिवाळी अधिवेशन', '#सुप्रीम कोर्ट']

const RECENTLY_UPDATED = [
  { t: '६ मि.', h: 'विधान परिषद निवडणूक वेळापत्रक' },
  { t: '१४ मि.', h: 'मुंबईत पावसाचा रेड अलर्ट' },
  { t: '३२ मि.', h: 'नागपूरमध्ये जिल्हाधिकारी बदल' },
  { t: '१ तास', h: 'सोलापूर बँक घोटाळा प्रकरणी अटक' },
]

export default function CategoryPage() {
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
        <div style={{ borderBottom: `4px solid ${catColor(CAT)}`, paddingBottom: 24, marginBottom: 32 }}>
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
          <p
            className="mr"
            style={{ margin: 0, fontSize: 'clamp(14px, 1.2vw, 17px)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 780 }}
          >
            महाराष्ट्रातून थेट: राजकारण, समाज, अर्थकारण, संस्कृती आणि शहर-ग्रामीण घडामोडी. राज्याच्या प्रत्येक कोपऱ्यातील विश्वासार्ह बातम्या.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 14, fontSize: 13, color: 'var(--text-tertiary)' }}>
            <span className="mr">२,४८० बातम्या</span>
            <span>·</span>
            <span className="mr">अद्यतनित: २९ एप्रिल २०२६</span>
            <span className={layout.desktopOnly}>·</span>
            <span className={`mr ${layout.desktopOnly}`}>२१८ संपादक</span>
          </div>
        </div>

        <div className={layout.mainGrid}>

          {/* ── Main content ── */}
          <main className={layout.mainContent}>

            {/* Hero */}
            <HeroCard
              category={CAT}
              headline="राज्यात कांद्याच्या भावात मोठी घसरण, शेतकऱ्यांचे आंदोलन सुरू"
            />

            {/* Latest feed */}
            <div>
              <CategoryUnderline name={CAT} label="ताज्या बातम्या" />
              <div className={layout.latestGrid}>
                {LATEST.map((h, i) => (
                  <StandardCard key={i} category={CAT} headline={h} layout="col" />
                ))}
              </div>
            </div>

            {/* Mobile ad C1 */}
            <div className={layout.mobileOnly}>
              <Ad id="C1" name="Mobile Category Below Hero" size="300×250" height={250} fluid />
            </div>

            {/* Desktop leaderboard */}
            <div className={layout.desktopOnly} style={{ display: 'flex', justifyContent: 'center' }}>
              <Ad id="DC3" name="Desktop Category Between Modules" size="728×90" width={728} height={90} />
            </div>

            {/* Trending in category */}
            <div style={{ background: 'var(--surface-secondary)', padding: 24 }}>
              <TrendingModule label={`${CAT}-मधील ट्रेंडिंग`} items={TRENDING_CAT} />
            </div>

            {/* Mobile most-read */}
            <div className={layout.mobileOnly}>
              <CategoryUnderline name={CAT} label="सर्वाधिक वाचलेले" />
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {MOST_READ.map((h, i) => (
                  <li key={i} className="mr" style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--text-primary)', padding: '14px 0', borderBottom: '1px solid var(--border-default)', fontWeight: 500 }}>{h}</li>
                ))}
              </ul>
            </div>

            {/* Mobile ad C2 */}
            <div className={layout.mobileOnly}>
              <Ad id="C2" name="Mobile Category Between Grids" size="300×250 / Native" height={250} fluid />
            </div>

            {/* Subcategory modules — desktop only */}
            <div className={layout.desktopOnly}>
              <CategoryUnderline name={CAT} label="शहरांनुसार बातम्या" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
                {SUBCITIES.map((s) => (
                  <div key={s.city}>
                    <div className="mr" style={{ fontSize: 13, fontWeight: 700, color: catColor(CAT), marginBottom: 10, letterSpacing: '0.04em' }}>{s.city}</div>
                    <StandardCard layout="col" category={CAT} headline={s.h} />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile subcategories */}
            <div className={layout.mobileOnly}>
              <CategoryUnderline name={CAT} label="उप-विभाग" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {['मुंबई', 'पुणे', 'नागपूर', 'औरंगाबाद', 'कोल्हापूर', 'नाशिक'].map((city) => (
                  <a key={city} className="mr" style={{ padding: '14px 12px', border: '1px solid var(--border-default)', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', display: 'block', cursor: 'pointer' }}>
                    {city} →
                  </a>
                ))}
              </div>
            </div>

            {/* Evergreen */}
            <div>
              <CategoryUnderline name={CAT} label="विशेष वाचा" />
              <div className={layout.latestGrid}>
                {EVERGREEN.map((h, i) => (
                  <StandardCard key={i} layout="col" category={CAT} headline={h} />
                ))}
              </div>
            </div>

            {/* Related tags */}
            <div>
              <div className="mr" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>
                संबंधित विषय · TOPIC CLUSTER
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {RELATED_TAGS.map((t) => (
                  <span key={t} className="mr" style={{ padding: '8px 14px', background: 'var(--brand-primary-light)', color: 'var(--brand-primary)', fontSize: 14, fontWeight: 600, borderRadius: 24, cursor: 'pointer' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Mobile ad C3 */}
            <div className={layout.mobileOnly}>
              <Ad id="C3" name="Mobile Category Before Footer" size="Multiplex / Native" height={300} fluid />
            </div>
          </main>

          {/* ── Sidebar ── */}
          <aside className={layout.sidebar}>
            <div style={{ position: 'sticky', top: 72 }}>
              <Ad id="DC2" name="Desktop Category Sidebar" size="300×600" width={300} height={600} sticky />
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
