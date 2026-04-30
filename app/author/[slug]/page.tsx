import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BreakingStrip from '@/components/layout/BreakingStrip'
import Ad from '@/components/ui/Ad'
import Newsletter from '@/components/ui/Newsletter'
import CategoryChip from '@/components/ui/CategoryChip'
import CategoryUnderline from '@/components/ui/CategoryUnderline'
import StandardCard from '@/components/cards/StandardCard'
import TrendingModule from '@/components/modules/TrendingModule'
import { XIcon, LinkIcon } from '@/components/ui/Icons'
import layout from '@/styles/layout.module.css'

const CAT = 'राजकारण'

const AUTHOR_ARTICLES = [
  'विधानसभेत सत्तासंघर्ष: सरकार स्थापनेच्या हालचालींना वेग',
  'मंत्रिमंडळ विस्ताराचे संभाव्य चेहरे: संपूर्ण यादी',
  'उपमुख्यमंत्रीपदाची शर्यत: तीन नावांची चर्चा',
  'महायुतीच्या जागावाटपात अंतिम गठित कोणाला?',
  'विरोधी पक्षनेतेपदासाठी ठाकरे-काँग्रेसमधील रस्सीखेच',
  'लोकसभेत अध्यक्षपदासाठी इंडिया आघाडीची रणनीती',
  'एनसीपी प्रदेशाध्यक्षपदी सुनील तटकरे यांची नियुक्ती',
  'भाजप प्रदेशाध्यक्षपदी फडणवीसांची फेरनियुक्ती',
  'मनसेच्या अधिवेशनात राज ठाकरे यांचे आक्रमक भाषण',
  'पुण्यातील आमदारांना मंत्रिमंडळात स्थान मिळणार का?',
]

const MOST_READ_BY_AUTHOR = [
  { c: CAT, h: 'फडणवीस-शिंदे यांच्यातील समझोत्याचा आत-कथा' },
  { c: CAT, h: 'महाराष्ट्र विधानसभा निवडणूक: पूर्ण विश्लेषण' },
  { c: CAT, h: 'मराठा आरक्षणाचा राजकीय परिणाम' },
  { c: CAT, h: 'शिवसेनेची फूट: एक कालक्रम' },
  { c: CAT, h: 'पुण्यातील राजकीय समीकरणे २०२६' },
]

const AUTHOR_STATS = [
  { l: 'एकूण लेख', v: '२,४६८' },
  { l: 'या वर्षी', v: '१४२' },
  { l: 'या महिन्यात', v: '२८' },
  { l: 'फॉलोअर्स', v: '३४.६ K' },
  { l: 'सरासरी वाचन वेळ', v: '५:४२ मि.' },
]

const RELATED_EDITORS = [
  { n: 'मीना पाटील', r: 'महाराष्ट्र संपादक', a: 'मीप' },
  { n: 'राहुल जोशी', r: 'पुणे रिपोर्टर', a: 'राजो' },
  { n: 'प्रिया कुलकर्णी', r: 'मंत्रालय बातमीदार', a: 'प्रकु' },
]

const AUTHOR_CATS = ['राजकारण', 'महाराष्ट्र', 'पुणे']

export default function AuthorPage() {
  return (
    <div className={layout.page}>
      <Header />
      <BreakingStrip />

      {/* Desktop billboard */}
      <div className={layout.billboard}>
        <Ad id="DC1" name="Desktop Author Top Billboard" size="970×250" width={970} height={250} />
      </div>

      <div className={layout.container}>
        {/* Author profile block */}
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 32, paddingBottom: 32, marginBottom: 32, borderBottom: '3px solid var(--brand-primary)', alignItems: 'start' }}>
          {/* Avatar */}
          <div
            className="imgph"
            style={{ width: 'clamp(80px, 15vw, 160px)', height: 'clamp(80px, 15vw, 160px)', borderRadius: '50%', flexShrink: 0 }}
          >
            <span style={{ fontSize: 'clamp(28px, 5vw, 56px)', fontWeight: 700, color: 'var(--brand-primary)' }} className="mr">सुदे</span>
          </div>

          {/* Profile info */}
          <div>
            <div className="mr" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 8 }}>
              AUTHOR · संपादक
            </div>
            <h1
              className="mr"
              style={{ margin: '0 0 6px', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}
            >
              सुनील देशमुख
            </h1>
            <div className="mr" style={{ fontSize: 'clamp(14px, 1.5vw, 18px)', fontWeight: 600, color: 'var(--brand-primary)', marginBottom: 14 }}>
              राजकीय संपादक · पुणे राजकारण विशेष
            </div>

            <p
              className="mr"
              style={{ margin: '0 0 16px', fontSize: 'clamp(13px, 1.2vw, 16px)', lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: 780 }}
            >
              १८ वर्षांचा राजकीय पत्रकारिता अनुभव. महाराष्ट्राच्या राजकीय पटलावरील घडामोडींचे विश्लेषण आणि सखोल अहवाल. यापूर्वी लोकमत, सकाळ आणि महाराष्ट्र टाइम्ससाठी काम केले आहे. राज्यशास्त्रात पुणे विद्यापीठातून पदव्युत्तर पदवी आणि TISS मुंबईतून पत्रकारितेचा डिप्लोमा.
            </p>

            {/* Credentials grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, auto))', gap: '16px 32px', marginBottom: 18, paddingTop: 14, borderTop: '1px solid var(--border-default)' }}>
              {[
                { l: 'अनुभव', v: '१८ वर्षे' },
                { l: 'लेख प्रकाशित', v: '२,४६८' },
                { l: 'मुख्य विषय', v: 'राजकारण, धोरण' },
                { l: 'शहर', v: 'पुणे · मुंबई' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="mr" style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>{s.l}</div>
                  <div className="mr" style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{s.v}</div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
              {[
                { icon: <XIcon size={14} />, label: '@sunildeshmukh' },
                { icon: <LinkIcon size={14} />, label: 'LinkedIn' },
                { icon: '@', label: 'sunil@prajavarta.com' },
              ].map((s, i) => (
                <a key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', border: '1px solid var(--border-default)', color: 'var(--text-secondary)', fontSize: 13, fontWeight: 500, cursor: 'pointer', borderRadius: 3 }}>
                  {s.icon} {s.label}
                </a>
              ))}
              <button className="mr" style={{ padding: '8px 14px', background: 'var(--brand-primary)', color: '#fff', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', borderRadius: 3 }}>
                + Follow author
              </button>
            </div>

            {/* Covered categories */}
            <div style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
              <div className="mr" style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', marginRight: 4 }}>विशेष विषय:</div>
              {AUTHOR_CATS.map((c) => (
                <CategoryChip key={c} name={c} size="sm" />
              ))}
            </div>
          </div>
        </div>

        {/* 8+4 grid */}
        <div className={layout.mainGrid}>

          {/* ── Main content ── */}
          <div className={layout.mainContent}>

            {/* Latest articles */}
            <div>
              <CategoryUnderline name={CAT} label="सुनील देशमुख यांच्या ताज्या बातम्या" />
              <div className={layout.authorGrid}>
                {AUTHOR_ARTICLES.map((h, i) => (
                  <StandardCard key={i} layout="col" category={CAT} headline={h} />
                ))}
              </div>
              <button className="mr" style={{ marginTop: 24, padding: '12px 28px', background: '#fff', border: '1px solid var(--brand-primary)', color: 'var(--brand-primary)', fontWeight: 600, fontSize: 14, cursor: 'pointer', borderRadius: 3 }}>
                आणखी लेख दाखवा →
              </button>
            </div>

            {/* Desktop leaderboard */}
            <div className={layout.desktopOnly} style={{ textAlign: 'center' }}>
              <Ad id="DC3" name="Desktop Author Between Modules" size="728×90" width={728} height={90} style={{ display: 'inline-block' }} />
            </div>

            {/* Most read by author */}
            <div style={{ background: 'var(--surface-secondary)', padding: 24 }}>
              <TrendingModule label="सर्वाधिक वाचलेले" items={MOST_READ_BY_AUTHOR} />
            </div>

            {/* E-E-A-T panel */}
            <div style={{ padding: 24, border: '1px solid var(--border-default)', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 20, alignItems: 'start' }}>
              <div style={{ width: 48, height: 48, borderRadius: 8, background: 'var(--brand-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>✓</div>
              <div>
                <div className="mr" style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>संपादकीय निष्ठा आणि विश्वासार्हता</div>
                <p className="mr" style={{ margin: '0 0 12px', fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                  सुनील देशमुख प्रजावार्ताच्या संपादकीय धोरणांचे काटेकोर पालन करतात. त्यांचे सर्व लेख तथ्य पडताळणी प्रक्रियेतून जातात आणि संपादकीय मंडळाच्या मान्यतेनंतरच प्रकाशित होतात.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, fontSize: 13, fontWeight: 600, color: 'var(--brand-primary)' }}>
                  <span style={{ cursor: 'pointer' }}>संपादकीय धोरण →</span>
                  <span style={{ cursor: 'pointer' }}>तथ्य पडताळणी प्रक्रिया →</span>
                  <span style={{ cursor: 'pointer' }}>दुरुस्ती धोरण →</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <aside className={layout.sidebar}>
            <Ad id="DC2a" name="Author Sidebar Fold 1" size="300×250" width={300} height={250} />

            {/* Author stats */}
            <div style={{ padding: 20, border: '1px solid var(--border-default)' }}>
              <div className="mr" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>
                लेखकाची आकडेवारी
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {AUTHOR_STATS.map((s) => (
                  <div key={s.l} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10, borderBottom: '1px solid var(--border-default)' }}>
                    <span className="mr" style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{s.l}</span>
                    <span className="mr" style={{ fontSize: 14, fontWeight: 700 }}>{s.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related editors */}
            <div style={{ padding: 20, border: '1px solid var(--border-default)' }}>
              <CategoryUnderline name="Politics" label="संबंधित संपादक" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {RELATED_EDITORS.map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 12, borderBottom: '1px solid var(--border-default)' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--brand-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--brand-primary)', fontSize: 13, fontFamily: 'var(--font-mr)', flexShrink: 0 }}>
                      {p.a}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="mr" style={{ fontSize: 14, fontWeight: 600 }}>{p.n}</div>
                      <div className="mr" style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{p.r}</div>
                    </div>
                    <button style={{ fontSize: 11, padding: '4px 10px', border: '1px solid var(--brand-primary)', color: 'var(--brand-primary)', background: '#fff', fontWeight: 600, cursor: 'pointer', borderRadius: 3 }}>
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <Ad id="DC2b" name="Author Sidebar Fold 2" size="300×600" width={300} height={600} />

            <Newsletter />

            <Ad id="DC2c" name="Author Sidebar Fold 3" size="300×250" width={300} height={250} />
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  )
}
