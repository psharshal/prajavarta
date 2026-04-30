import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BreakingStrip from '@/components/layout/BreakingStrip'
import Ad from '@/components/ui/Ad'
import Newsletter from '@/components/ui/Newsletter'
import CategoryUnderline from '@/components/ui/CategoryUnderline'
import CategoryChip from '@/components/ui/CategoryChip'
import HeroCard from '@/components/cards/HeroCard'
import StandardCard from '@/components/cards/StandardCard'
import CompactListItem from '@/components/cards/CompactListItem'
import TrendingModule from '@/components/modules/TrendingModule'
import { catColor } from '@/lib/catColors'
import layout from '@/styles/layout.module.css'

const CATEGORIES = [
  { name: 'महाराष्ट्र', count: '२,४८०', latest: 'कांदा भाव घसरण, शेतकऱ्यांचे आंदोलन' },
  { name: 'पुणे', count: '१,२४०', latest: 'मेट्रो टप्पा ३ चे काम सुरू' },
  { name: 'राजकारण', count: '१,९६०', latest: 'विधानसभेत सत्तासंघर्ष जोरात' },
  { name: 'गुन्हेगारी', count: '८४२', latest: 'ललित पाटीलला मुंबई पोलिसांनी अटक' },
  { name: 'क्रीडा', count: '७२०', latest: 'रोहित शर्मा कसोटीतून निवृत्त' },
  { name: 'व्यवसाय', count: '६१०', latest: 'सेन्सेक्सने ८०,००० टप्पा ओलांडला' },
  { name: 'मनोरंजन', count: '४९०', latest: 'रितेश देशमुखचा नवा चित्रपट जाहीर' },
  { name: 'देश', count: '९८०', latest: 'संसदेत मोसमी अधिवेशनाला सुरुवात' },
  { name: 'जग', count: '५५०', latest: 'युरोपमध्ये नवीन शांतता करारावर स्वाक्षऱ्या' },
]

const TRENDING = [
  { c: 'राजकारण', h: 'अजित पवार गटाची महत्त्वाची बैठक, मंत्रिपदाच्या मुद्द्यावर चर्चा' },
  { c: 'क्रीडा', h: 'रोहित शर्मा कसोटी संघातून निवृत्त; मुंबईकरांचा भावूक निरोप' },
  { c: 'व्यवसाय', h: 'रिलायन्सच्या तिमाही नफ्यात १८% वाढ, शेअर बाजार उसळला' },
  { c: 'महाराष्ट्र', h: 'मराठवाड्यात अवकाळी पावसाचा कहर, १२ जिल्ह्यांत पीकहानी' },
  { c: 'मनोरंजन', h: 'रितेश देशमुखचा राजा शिवछत्रपती चित्रपट दिवाळीला प्रदर्शित' },
]

const LATEST_ALL = [
  { c: 'महाराष्ट्र', h: 'राज्यात कांद्याच्या भावात मोठी घसरण, शेतकऱ्यांचे आंदोलन सुरू' },
  { c: 'राजकारण', h: 'विधानसभेत सत्तासंघर्ष: सरकार स्थापनेच्या हालचालींना वेग' },
  { c: 'पुणे', h: 'पुण्यात मेट्रोच्या तिसऱ्या टप्प्याचे काम सुरू, २०२८ लक्ष्य' },
  { c: 'क्रीडा', h: 'मुंबई इंडियन्सच्या नव्या प्रशिक्षकपदी धोनीच्या नावाची चर्चा' },
  { c: 'व्यवसाय', h: 'सेन्सेक्सने ऐतिहासिक ८०,००० चा टप्पा ओलांडला' },
  { c: 'गुन्हेगारी', h: 'ठाण्यात सायबर फसवणुकीची ४.२ कोटींची तक्रार दाखल' },
]

const BY_CATEGORY = [
  {
    cat: 'महाराष्ट्र',
    stories: [
      'नागपूर हिवाळी अधिवेशनाची तारीख निश्चित, १६ डिसेंबरपासून सुरुवात',
      'औरंगाबाद नामांतर वाद पुन्हा चर्चेत, सुप्रीम कोर्टात सुनावणी',
      'नाशिकमध्ये द्राक्ष निर्यातीत २०% घट, युरोपीय निर्बंधांचा परिणाम',
      'मराठवाड्यात अवकाळी पावसाचा कहर, १२ जिल्ह्यांत पीकहानी',
    ],
  },
  {
    cat: 'राजकारण',
    stories: [
      'विरोधी पक्षनेतेपदावरून ठाकरे आणि काँग्रेसमध्ये रस्सीखेच',
      'लोकसभेत अध्यक्षपदासाठी इंडिया आघाडीची रणनीती ठरली',
      'एनसीपी शरद पवार गटाच्या प्रदेशाध्यक्षपदी सुनील तटकरे',
      'भाजप प्रदेशाध्यक्षपदी फडणवीसांची फेरनियुक्ती निश्चित',
    ],
  },
  {
    cat: 'पुणे',
    stories: [
      'हिंजवडी आयटी हब विस्ताराला राज्य सरकारची मंजुरी',
      'पीएमपीच्या ३०० नवीन ई-बस ताफ्यात येणार, सप्टेंबरपर्यंत सेवा',
      'कोरेगाव पार्क परिसरात रस्ते दुरुस्तीचे काम पूर्ण',
      'पुणे विमानतळावर तीन नवीन आंतरराष्ट्रीय उड्डाणे सुरू',
    ],
  },
  {
    cat: 'क्रीडा',
    stories: [
      'विश्वचषक हॉकी स्पर्धेसाठी भारतीय संघाची घोषणा',
      'पीव्ही सिंधू ऑस्ट्रेलियन ओपनच्या उपांत्य फेरीत दाखल',
      'रणजी ट्रॉफीत मुंबईचा सलग दुसरा विजय',
      'महाराष्ट्र केसरी कुस्ती स्पर्धेला कोल्हापुरात सुरुवात',
    ],
  },
  {
    cat: 'व्यवसाय',
    stories: [
      'रिलायन्सच्या तिमाही नफ्यात १८% वाढ',
      'GST संकलनात फेब्रुवारीत १२% वाढ',
      'Infosys ने ३,५०० नव्या भरतीची घोषणा केली',
      'टाटा मोटर्सच्या इलेक्ट्रिक एसयूव्हीचे अनावरण',
    ],
  },
]

const MOST_READ = [
  { c: 'राजकारण', h: 'मराठा आरक्षणावर सर्वोच्च न्यायालयाची सुनावणी' },
  { c: 'महाराष्ट्र', h: 'शिवसेनेच्या अधिवेशनात ठाकरेंचे आक्रमक भाषण' },
  { c: 'व्यवसाय', h: 'महावितरणच्या वीजबिलात ८% वाढीचा प्रस्ताव' },
  { c: 'पुणे', h: 'MPSC परीक्षेचे नवीन वेळापत्रक जाहीर' },
  { c: 'क्रीडा', h: 'रोहित शर्मा कसोटीतून निवृत्त' },
]

const ALL_TAGS = [
  '#मराठा आरक्षण', '#जरांगे पाटील', '#विधानसभा', '#मंत्रिमंडळ', '#फडणवीस', '#शिंदे',
  '#शेतकरी', '#कांदा', '#पाऊस', '#मुंबई', '#पुणे', '#नागपूर', '#हिवाळी अधिवेशन',
  '#सुप्रीम कोर्ट', '#OBC आरक्षण', '#IPL', '#शेअर बाजार', '#मेट्रो', '#MPSC', '#सायबर गुन्हे',
]

const RECENTLY_UPDATED = [
  { t: '३ मि.', h: 'जरांगे पाटीलांचे आज सकाळचे निवेदन' },
  { t: '१८ मि.', h: 'विधान परिषद निवडणूक वेळापत्रक जाहीर' },
  { t: '३५ मि.', h: 'मुंबईत पावसाचा रेड अलर्ट' },
  { t: '१ तास', h: 'नागपूरमध्ये जिल्हाधिकारी बदल' },
]

export default function AllNewsPage() {
  return (
    <div className={layout.page}>
      <Header />
      <BreakingStrip />

      <div className={layout.billboard}>
        <Ad id="AN1" name="All News Top Billboard" size="970×250" width={970} height={250} />
      </div>

      <div className={layout.container}>
        {/* Page header */}
        <div style={{ borderBottom: '4px solid var(--brand-primary)', paddingBottom: 24, marginBottom: 32 }}>
          <div className="mr" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 8 }}>
            सर्व विभाग · ALL CATEGORIES
          </div>
          <h1 className="mr" style={{ margin: '0 0 10px', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            सर्व बातम्या
          </h1>
          <p className="mr" style={{ margin: 0, fontSize: 'clamp(13px, 1.2vw, 16px)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 780 }}>
            महाराष्ट्रातील सर्व विभागांच्या ताज्या बातम्या एकाच ठिकाणी. राजकारण, क्रीडा, व्यवसाय, मनोरंजन आणि बरेच काही.
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 13, color: 'var(--text-tertiary)' }}>
            <span className="mr">९ विभाग</span>
            <span>·</span>
            <span className="mr">९,८७२+ बातम्या</span>
            <span>·</span>
            <span className="mr">अद्यतनित: ३० एप्रिल २०२६</span>
          </div>
        </div>

        {/* Category tiles — full width above main grid */}
        <div style={{ marginBottom: 40 }}>
          <div className="mr" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>
            विभागानुसार ब्राउझ करा
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
            {CATEGORIES.map((cat) => (
              <a
                key={cat.name}
                href={`/category/${cat.name}`}
                style={{
                  display: 'block',
                  padding: '16px 14px',
                  border: `2px solid ${catColor(cat.name)}`,
                  borderTop: `4px solid ${catColor(cat.name)}`,
                  textDecoration: 'none',
                  background: '#fff',
                  transition: 'box-shadow 0.15s',
                }}
              >
                <div className="mr" style={{ fontSize: 16, fontWeight: 800, color: catColor(cat.name), marginBottom: 4 }}>{cat.name}</div>
                <div className="mr" style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 8 }}>{cat.count} बातम्या</div>
                <p className="mr" style={{ margin: 0, fontSize: 11, lineHeight: 1.4, color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {cat.latest}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Main grid */}
        <div className={layout.mainGrid}>

          {/* ── Main content ── */}
          <main className={layout.mainContent}>

            {/* Hero */}
            <HeroCard
              category="महाराष्ट्र"
              headline="राज्यात कांद्याच्या भावात मोठी घसरण, शेतकऱ्यांचे आंदोलन सुरू"
              subtitle="नाशिक, पुणे आणि सोलापूर जिल्ह्यांतील हजारो शेतकरी रस्त्यावर; सरकारकडे हस्तक्षेपाची मागणी"
            />

            {/* Latest across all */}
            <div>
              <CategoryUnderline name="Maharashtra" label="ताज्या बातम्या — सर्व विभाग" />
              <div className={layout.latestGrid}>
                {LATEST_ALL.map((s, i) => (
                  <StandardCard key={i} category={s.c} headline={s.h} layout="col" />
                ))}
              </div>
            </div>

            {/* Mobile ad */}
            <div className={layout.mobileOnly}>
              <Ad id="AN-M1" name="Mobile All News After Latest" size="300×250" height={250} fluid />
            </div>

            {/* Desktop leaderboard */}
            <div className={layout.desktopOnly} style={{ textAlign: 'center' }}>
              <Ad id="AN-D3" name="Desktop All News Between Modules" size="728×90" width={728} height={90} style={{ display: 'inline-block' }} />
            </div>

            {/* Trending */}
            <div style={{ background: 'var(--surface-secondary)', padding: 24 }}>
              <TrendingModule label="आत्ता ट्रेंडिंग" items={TRENDING} />
            </div>

            {/* By Category sections */}
            {BY_CATEGORY.map((sec) => (
              <div key={sec.cat}>
                <CategoryUnderline name={sec.cat} label={`${sec.cat} — ताज्या बातम्या`} />
                <div className={layout.latestGrid}>
                  {sec.stories.map((h, i) => (
                    <StandardCard key={i} layout="col" category={sec.cat} headline={h} />
                  ))}
                </div>
                <a
                  href={`/category/${sec.cat}`}
                  style={{ display: 'inline-block', marginTop: 16, fontSize: 13, fontWeight: 700, color: catColor(sec.cat), textDecoration: 'none' }}
                >
                  {sec.cat} च्या सर्व बातम्या →
                </a>
              </div>
            ))}

            {/* Mobile ad */}
            <div className={layout.mobileOnly}>
              <Ad id="AN-M2" name="Mobile All News After Categories" size="300×250 / Native" height={300} fluid />
            </div>

            {/* Tags cloud */}
            <div>
              <div className="mr" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>
                लोकप्रिय विषय · TRENDING TOPICS
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {ALL_TAGS.map((t) => (
                  <a
                    key={t}
                    href={`/tag/${t.replace('#', '')}`}
                    style={{ padding: '8px 14px', background: 'var(--brand-primary-light)', color: 'var(--brand-primary)', fontSize: 13, fontWeight: 600, borderRadius: 24, textDecoration: 'none', display: 'inline-block' }}
                  >
                    <span className="mr">{t}</span>
                  </a>
                ))}
              </div>
            </div>
          </main>

          {/* ── Sidebar ── */}
          <aside className={layout.sidebar}>
            <Ad id="AN-D2a" name="All News Sidebar Fold 1" size="300×250" width={300} height={250} />

            {/* Most read */}
            <div style={{ padding: 20, border: '1px solid var(--border-default)' }}>
              <CategoryUnderline name="Maharashtra" label="सर्वाधिक वाचलेले" />
              <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {MOST_READ.map((s, i) => (
                  <CompactListItem key={i} n={i + 1} headline={s.h} />
                ))}
              </ol>
            </div>

            {/* Recently updated */}
            <div style={{ padding: 20, border: '1px solid var(--border-default)' }}>
              <CategoryUnderline name="Maharashtra" label="नुकतेच अद्यतनित" />
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {RECENTLY_UPDATED.map((s, i) => (
                  <li key={i} style={{ borderBottom: '1px solid var(--border-default)', paddingBottom: 14 }}>
                    <div style={{ fontSize: 11, color: 'var(--color-live)', fontWeight: 700, marginBottom: 4, letterSpacing: '0.04em' }}>{s.t} पूर्वी</div>
                    <p className="mr" style={{ margin: 0, fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>{s.h}</p>
                  </li>
                ))}
              </ul>
            </div>

            <Ad id="AN-D2b" name="All News Sidebar Fold 2" size="300×600" width={300} height={600} />

            <Newsletter />

            <Ad id="AN-D2c" name="All News Sidebar Fold 3" size="300×250" width={300} height={250} />
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  )
}
