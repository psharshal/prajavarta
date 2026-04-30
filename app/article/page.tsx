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

const TAGS = ['#विधानसभा', '#सरकार', '#मंत्रिमंडळ', '#फडणवीस', '#शिंदे', '#राजकारण', '#महायुती']

const RELATED = [
  { c: 'राजकारण', h: 'शपथविधीसाठी वानखेडेची तयारी सुरू, ५०,००० निमंत्रितांची व्यवस्था' },
  { c: 'राजकारण', h: 'मुख्यमंत्रीपदावरून शिवसेना-भाजपमध्ये बंद दाराआड चर्चा' },
  { c: 'महाराष्ट्र', h: 'विधानसभा सत्ताबदलाचा अर्थव्यवस्थेवर काय परिणाम होईल?' },
  { c: 'राजकारण', h: 'विरोधी पक्षनेतेपदासाठी ठाकरे-काँग्रेसमधील रस्सीखेच कायम' },
  { c: 'पुणे', h: 'पुण्यातील आमदारांना मंत्रिमंडळात स्थान मिळणार का?' },
  { c: 'राजकारण', h: 'मंत्रिमंडळ विस्ताराचे संभाव्य चेहरे: संपूर्ण यादी' },
]

const TRENDING = [
  { c: 'क्रीडा', h: 'रोहित शर्मा कसोटी संघातून निवृत्त' },
  { c: 'व्यवसाय', h: 'रिलायन्सच्या तिमाही नफ्यात १८% वाढ' },
  { c: 'मनोरंजन', h: 'रितेश देशमुखचा \'राजा शिवछत्रपती\' दिवाळीला' },
  { c: 'महाराष्ट्र', h: 'मराठवाड्यात अवकाळी पावसाचा कहर' },
  { c: 'पुणे', h: 'पुणे मेट्रोच्या तिसऱ्या टप्प्याचे काम सुरू' },
]

const MINI_TRENDING = [
  'मनोज जरांगे पाटील आज औरंगाबादेत उपोषणाला बसणार',
  'गणेशोत्सव २०२६ साठी मंडळांची तयारी सुरू',
  'नवीन MPSC परीक्षा वेळापत्रक जाहीर',
  'महावितरणच्या वीजबिलात ८% वाढीचा प्रस्ताव',
  'ठाकरे गटाच्या अधिवेशनाची तारीख निश्चित',
]

const MOST_READ = [
  'मंत्रिमंडळ विस्ताराचे संभाव्य चेहरे: संपूर्ण यादी',
  'महायुतीच्या जागावाटपात अंतिम गठित कोणाला?',
  'उपमुख्यमंत्रीपदाची शर्यत: ३ नावांची चर्चा',
  'मराठा आरक्षणावर सर्वोच्च न्यायालयाची सुनावणी',
]

const SHARE_BUTTONS = [
  { icon: <WhatsAppIcon size={14} />, color: '#25D366', label: 'WhatsApp' },
  { icon: <FacebookIcon size={14} />, color: '#1877F2', label: 'Facebook' },
  { icon: <XIcon size={14} />, color: '#000', label: 'X' },
  { icon: <LinkIcon size={14} />, color: '#6B6B6B', label: 'Copy' },
]

export default function ArticlePage() {
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
                <a href="/category/maharashtra" style={{ color: 'inherit' }}>महाराष्ट्र</a>
                <span style={{ margin: '0 6px' }}>›</span>
                राजकारण
              </div>

              <CategoryChip name="राजकारण" />

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
                विधानसभेत सत्तासंघर्ष: सरकार स्थापनेच्या हालचालींना वेग, दिल्लीत रात्री बैठक
              </h1>

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
                राज्यपाल भेट उद्या सकाळी; नवीन मंत्रिमंडळाची संभाव्य रचना समोर, फडणवीस आणि शिंदेंमध्ये सहमती जवळपास अंतिम
              </p>

              {/* Author byline */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderTop: '1px solid var(--border-default)', borderBottom: '1px solid var(--border-default)' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--brand-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--brand-primary)', fontSize: 16, flexShrink: 0 }}>
                  SD
                </div>
                <div style={{ flex: 1 }}>
                  <div className="mr" style={{ fontSize: 14, fontWeight: 600 }}>
                    सुनील देशमुख
                    <span style={{ color: 'var(--text-tertiary)', fontWeight: 400 }}> · राजकीय संपादक</span>
                  </div>
                  <div className="mr" style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>
                    प्रकाशित: २९ एप्रिल २०२६, ०७:४५ · अद्यतनित: ०९:१५ · ६ मिनिटे वाचन
                  </div>
                </div>
                {/* Save button — desktop only */}
                <button className={layout.desktopOnly} style={{ padding: '8px 14px', background: '#fff', border: '1px solid var(--border-strong)', fontSize: 12, fontWeight: 600, cursor: 'pointer', borderRadius: 3 }}>
                  Save
                </button>
              </div>

              {/* Mobile share buttons */}
              <div className={layout.mobileOnly} style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                {SHARE_BUTTONS.map((b, i) => (
                  <button key={i} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '9px 6px', background: '#fff', border: `1px solid ${b.color}`, color: b.color, fontSize: 10, fontWeight: 600, borderRadius: 3, cursor: 'pointer' }}>
                    {b.icon}
                    <span>{b.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hero image — full column width */}
            <div>
              <ImagePlaceholder ratio="16/9" label="article hero · 1200×675" />
              <p className="mr" style={{ margin: '8px 0 0', fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
                फोटो: मंत्रालयाबाहेर पत्रकारांशी संवाद साधताना मुख्यमंत्री · PTI
              </p>
            </div>

            {/* Mobile ad A1 */}
            <div className={layout.mobileOnly}>
              <Ad id="A1" name="Mobile Article Below Hero Image" size="300×250" height={250} fluid />
            </div>

            {/* ─ Article body ─ */}
            <div style={{ maxWidth: 680 }}>
              <p className="mr" style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', lineHeight: 1.7, color: 'var(--text-primary)', marginTop: 0 }}>
                मुंबई: राज्यातील सत्तासंघर्षाला नवे वळण मिळाले असून, सरकार स्थापनेच्या हालचालींना वेग आला आहे. सोमवारी रात्री दिल्लीत झालेल्या उच्चस्तरीय बैठकीनंतर नवीन मंत्रिमंडळाची रचना जवळपास अंतिम झाल्याचे सांगण्यात येत आहे.
              </p>
              <p className="mr" style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', lineHeight: 1.7, color: 'var(--text-primary)', marginTop: 16 }}>
                राज्यपाल भेटीची तारीख उद्या सकाळी निश्चित झाली असून, मुख्यमंत्रीपदाच्या उमेदवारीवरून शिवसेना आणि भाजपमध्ये काल रात्री उशिरापर्यंत चर्चा सुरू होती.
              </p>

              {/* Mobile ad A2 */}
              <div className={layout.mobileOnly} style={{ margin: '24px 0' }}>
                <Ad id="A2" name="Mobile Article After P2" size="300×250" height={250} fluid />
              </div>

              {/* Desktop ad DA3 */}
              <div className={layout.desktopOnly} style={{ margin: '32px 0', display: 'flex', justifyContent: 'center' }}>
                <Ad id="DA3" name="Desktop Article After P3" size="300×250" width={300} height={250} />
              </div>

              {/* Key takeaways */}
              <div style={{ borderLeft: '3px solid var(--brand-accent)', padding: '16px', background: 'var(--surface-secondary)', margin: '8px 0 24px' }}>
                <div className="mr" style={{ fontSize: 13, fontWeight: 700, color: 'var(--brand-primary)', marginBottom: 10, letterSpacing: '0.02em' }}>मुख्य मुद्दे</div>
                <ol className="mr" style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.7, color: 'var(--text-primary)' }}>
                  <li>दिल्लीत रात्री ११ वाजेपर्यंत बैठक, मंत्रिमंडळाची रचना अंतिम</li>
                  <li>राज्यपाल भेट उद्या सकाळी १० वाजता निश्चित</li>
                  <li>उपमुख्यमंत्रीपदी दोन नावे, अंतिम घोषणा शपथविधी दिवशी</li>
                </ol>
              </div>

              <p className="mr" style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', lineHeight: 1.7, color: 'var(--text-primary)' }}>
                सूत्रांच्या माहितीनुसार, बैठकीला केंद्रीय गृहमंत्री, पक्षाध्यक्ष आणि राज्यातील वरिष्ठ नेते उपस्थित होते. मंत्रालयांचे वाटप आणि उपमुख्यमंत्रीपदावरून बराच वेळ चर्चा रंगली.
              </p>
              <p className="mr" style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', lineHeight: 1.7, color: 'var(--text-primary)', marginTop: 16 }}>
                महायुतीच्या प्रवक्त्यांनी दिलेल्या माहितीनुसार, शपथविधी सोहळा वानखेडे स्टेडियमवर होणार असून, पंतप्रधान आणि अनेक केंद्रीय मंत्र्यांच्या उपस्थितीची शक्यता आहे.
              </p>

              {/* Pull quote */}
              <blockquote style={{ margin: '24px 0', padding: '0 0 0 24px', borderLeft: '4px solid var(--brand-accent)' }}>
                <p className="mr" style={{ margin: 0, fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: 1.4, fontWeight: 600, color: 'var(--text-primary)', fontStyle: 'normal' }}>
                  &ldquo;लोकशाही प्रक्रिया दिल्लीतून चालवली जात आहे — महाराष्ट्राचा निर्णय मुंबईत व्हायला हवा.&rdquo;
                </p>
                <cite className="mr" style={{ display: 'block', marginTop: 8, fontSize: 13, color: 'var(--text-tertiary)', fontStyle: 'normal' }}>
                  — उद्धव ठाकरे, शिवसेना (UBT)
                </cite>
              </blockquote>

              {/* Inline related */}
              <div style={{ margin: '20px 0', padding: 12, border: '1px solid var(--border-default)', borderLeft: '3px solid var(--brand-primary)' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--brand-primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>संबंधित बातमी</div>
                <p className="mr" style={{ margin: 0, fontSize: 15, fontWeight: 600, lineHeight: 1.4, color: 'var(--text-primary)', cursor: 'pointer' }}>
                  शपथविधीसाठी वानखेडेची तयारी सुरू, ५०,००० निमंत्रितांची व्यवस्था →
                </p>
              </div>

              <p className="mr" style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', lineHeight: 1.7, color: 'var(--text-primary)' }}>
                विरोधी पक्षांनी या निर्णयप्रक्रियेवर टीका केली असून, &ldquo;लोकशाही प्रक्रिया दिल्लीतून चालवली जाते&rdquo; असा आरोप शिवसेना (UBT) आणि काँग्रेसने केला आहे.
              </p>
              <p className="mr" style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', lineHeight: 1.7, color: 'var(--text-primary)', marginTop: 16 }}>
                दरम्यान, विधानभवनाच्या सुरक्षा व्यवस्थेत वाढ करण्यात आली असून, मंत्रालय परिसरात पोलिस बंदोबस्त लावण्यात आला आहे.
              </p>
              <p className="mr" style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', lineHeight: 1.7, color: 'var(--text-primary)', marginTop: 16 }}>
                राज्यपाल कार्यालयाने अद्याप अधिकृत निवेदन दिले नसले तरी, उद्या सकाळी १० वाजता भेटीसाठी वेळ मिळाल्याचे विश्वसनीय सूत्रांकडून समजते.
              </p>

              {/* Mobile ad A3 */}
              <div className={layout.mobileOnly} style={{ margin: '24px 0' }}>
                <Ad id="A3" name="Mobile Article After P7-8" size="300×250 / Native" height={250} fluid />
              </div>

              {/* Desktop ad DA4 */}
              <div className={layout.desktopOnly} style={{ margin: '32px 0', display: 'flex', justifyContent: 'center' }}>
                <Ad id="DA4" name="Desktop Article After P9" size="300×250" width={300} height={250} />
              </div>

              <p className="mr" style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', lineHeight: 1.7, color: 'var(--text-primary)' }}>
                आर्थिक आणि गृह खात्यांच्या वाटपावर सर्वाधिक चर्चा रंगली. महिला व बाल विकास, शिक्षण आणि कृषी ही खाती मित्रपक्षांकडे जाण्याची शक्यता आहे.
              </p>

              {/* Tags */}
              <div style={{ margin: '32px 0 24px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {TAGS.map((t) => (
                  <span key={t} className="mr" style={{ padding: '6px 14px', border: '1px solid var(--border-default)', borderRadius: 20, fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Author bio */}
              <div style={{ padding: 24, background: 'var(--surface-secondary)', display: 'flex', gap: 20, marginBottom: 32 }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--brand-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--brand-primary)', fontSize: 22, flexShrink: 0 }}>
                  SD
                </div>
                <div>
                  <div className="mr" style={{ fontSize: 17, fontWeight: 700 }}>सुनील देशमुख</div>
                  <div className="mr" style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 8 }}>राजकीय संपादक · १८ वर्षांचा अनुभव</div>
                  <p className="mr" style={{ margin: '0 0 12px', fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                    महाराष्ट्राच्या राजकीय पटलावरील घडामोडींचे विश्लेषण. लोकमत, सकाळ आणि महाराष्ट्र टाइम्ससाठी काम केले आहे. राज्यशास्त्रात पुणे विद्यापीठातून पदव्युत्तर पदवी.
                  </p>
                  <div style={{ display: 'flex', gap: 14, fontSize: 13, color: 'var(--brand-primary)', fontWeight: 600 }}>
                    <span style={{ cursor: 'pointer' }}>Twitter</span>
                    <span style={{ cursor: 'pointer' }}>LinkedIn</span>
                    <span style={{ cursor: 'pointer' }}>Email</span>
                    <span style={{ cursor: 'pointer' }}>All articles →</span>
                  </div>
                </div>
              </div>
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
                  <StandardCard key={i} category={s.c} headline={s.h} layout="col" />
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

            <div style={{ position: 'sticky', top: 72 }}>
              <Ad id="DA2" name="Desktop Article Sidebar" size="300×600" width={300} height={600} sticky />
              <p style={{ fontSize: 10, color: 'var(--text-tertiary)', fontFamily: 'ui-monospace, monospace', marginTop: 6 }}>
                ↑ sticks at viewport top during scroll
              </p>
            </div>

            <div style={{ padding: 20, border: '1px solid var(--border-default)' }}>
              <CategoryUnderline name="Maharashtra" label="मिनी ट्रेंडिंग" />
              <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {MINI_TRENDING.map((h, i) => (
                  <CompactListItem key={i} n={i + 1} headline={h} />
                ))}
              </ol>
            </div>

            <div style={{ padding: 20, border: '1px solid var(--border-default)' }}>
              <CategoryUnderline name="Politics" label="सर्वाधिक वाचलेले" />
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {MOST_READ.map((h, i) => (
                  <li key={i} className="mr" style={{ fontSize: 14, lineHeight: 1.45, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-default)', paddingBottom: 14, fontWeight: 500 }}>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <Newsletter />
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
