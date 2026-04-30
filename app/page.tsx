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
import CategorySection from '@/components/modules/CategorySection'
import layout from '@/styles/layout.module.css'

const TRENDING_ITEMS = [
  { c: 'राजकारण', h: 'अजित पवार गटाची आज महत्त्वाची बैठक, मंत्रिपदाच्या मुद्द्यावर चर्चा' },
  { c: 'क्रीडा', h: 'रोहित शर्मा कसोटी संघातून निवृत्त; मुंबईकरांचा भावूक निरोप' },
  { c: 'व्यवसाय', h: 'रिलायन्सच्या तिमाही नफ्यात १८% वाढ, शेअर बाजार उसळला' },
  { c: 'मनोरंजन', h: 'रितेश देशमुखचा \'राजा शिवछत्रपती\' चित्रपट दिवाळीला प्रदर्शित' },
  { c: 'महाराष्ट्र', h: 'मराठवाड्यात अवकाळी पावसाचा कहर, १२ जिल्ह्यांत पीकहानी' },
]

const CATEGORY_SECTIONS = [
  {
    cat: 'महाराष्ट्र',
    hero: 'राज्यात कांद्याच्या भावात मोठी घसरण, शेतकऱ्यांचे आंदोलन सुरू',
    stories: [
      'नागपूर हिवाळी अधिवेशनाची तारीख निश्चित, १६ डिसेंबरपासून सुरुवात',
      'औरंगाबाद नामांतराचा वाद पुन्हा चर्चेत, सुप्रीम कोर्टात सुनावणी',
      'नाशिकमध्ये द्राक्ष निर्यातीत २०% घट, युरोपीय निर्बंधांचा परिणाम',
    ],
  },
  {
    cat: 'पुणे',
    hero: 'पुण्यात मेट्रोच्या तिसऱ्या टप्प्याचे काम सुरू, २०२८ पर्यंत पूर्णत्वाचे लक्ष्य',
    stories: [
      'हिंजवडी आयटी हब विस्ताराला राज्य सरकारची मंजुरी',
      'पीएमपीच्या ३०० नवीन ई-बस ताफ्यात येणार, सप्टेंबरपर्यंत सेवा',
      'कोरेगाव पार्क परिसरात रस्ते दुरुस्तीचे काम पूर्ण',
    ],
  },
  {
    cat: 'राजकारण',
    hero: 'विरोधी पक्षनेतेपदावरून ठाकरे आणि काँग्रेसमध्ये रस्सीखेच, चर्चा गुप्त',
    stories: [
      'लोकसभेत अध्यक्षपदासाठी इंडिया आघाडीची रणनीती ठरली',
      'एनसीपी शरद पवार गटाच्या प्रदेशाध्यक्षपदी सुनील तटकरे',
      'भाजप प्रदेशाध्यक्षपदी फडणवीसांची फेरनियुक्ती निश्चित',
    ],
  },
  {
    cat: 'गुन्हेगारी',
    hero: 'कुख्यात तस्कर ललित पाटीलला मुंबई पोलिसांनी अटक केली',
    stories: [
      'ठाण्यात सायबर फसवणुकीची ४.२ कोटींची तक्रार दाखल',
      'नाशिकमध्ये अंमली पदार्थ तस्करीचा भांडाफोड, ५ अटक',
      'मुंबईत खंडणी प्रकरणी निवृत्त पोलीस अधिकाऱ्यावर गुन्हा',
    ],
  },
  {
    cat: 'क्रीडा',
    hero: 'मुंबई इंडियन्सच्या नव्या प्रशिक्षकपदी महेंद्रसिंग धोनीच्या नावाची चर्चा',
    stories: [
      'विश्वचषक हॉकी स्पर्धेसाठी भारतीय संघाची घोषणा',
      'पीव्ही सिंधू ऑस्ट्रेलियन ओपनच्या उपांत्य फेरीत दाखल',
      'रणजी ट्रॉफीत मुंबईचा सलग दुसरा विजय',
    ],
  },
  {
    cat: 'व्यवसाय',
    hero: 'सेन्सेक्सने ऐतिहासिक ८०,००० चा टप्पा ओलांडला, बाजारात तेजी',
    stories: [
      'रिलायन्सच्या तिमाही नफ्यात १८% वाढ',
      'GST संकलनात फेब्रुवारीत १२% वाढ',
      'Infosys ने ३,५०० नव्या भरतीची घोषणा केली',
    ],
  },
]

const RECOMMENDED = [
  { c: 'मनोरंजन', h: 'मराठी रंगभूमीचा ७५ वा वर्धापनदिन: \'नटसम्राट\' चे भव्य पुनःप्रदर्शन' },
  { c: 'व्यवसाय', h: 'टाटा मोटर्सच्या इलेक्ट्रिक एसयूव्हीचे अनावरण, बुकिंग सुरू' },
  { c: 'महाराष्ट्र', h: 'कोकणात पावसाने सरासरी ओलांडली, शेतकऱ्यांना दिलासा' },
  { c: 'पुणे', h: 'पुणे विद्यापीठात नवीन AI संशोधन केंद्र सुरू होणार' },
  { c: 'राजकारण', h: 'मनसेच्या अधिवेशनात राज ठाकरे यांचे आक्रमक भाषण' },
  { c: 'क्रीडा', h: 'महाराष्ट्र केसरी कुस्ती स्पर्धेला कोल्हापुरात सुरुवात' },
]

const MINI_TRENDING = [
  'मनोज जरांगे पाटील आज औरंगाबादेत उपोषणाला बसणार',
  'गणेशोत्सव २०२६ साठी मंडळांची तयारी सुरू, परवानग्या जलद',
  'नवीन MPSC परीक्षा वेळापत्रक जाहीर, मे महिन्यात मुख्य परीक्षा',
  'शिवसेना (UBT) विजय सत्रात ठाकरेंचे आक्रमक भाषण',
  'महावितरणच्या वीजबिलात ८% वाढीचा प्रस्ताव',
]

const PUNE_UPDATES = [
  'हिंजवडीत वाहतूककोंडी कमी करण्यासाठी नवा फ्लायओव्हर मंजूर',
  'पुणे विमानतळावर तीन नवीन आंतरराष्ट्रीय उड्डाणे सुरू',
  'कात्रज-कोंढवा रस्त्याचे काम मार्चपर्यंत पूर्ण',
]

export default function HomePage() {
  return (
    <div className={layout.page}>
      <Header />
      <BreakingStrip />

      {/* Desktop billboard */}
      <div className={layout.billboard}>
        <Ad id="DH1" name="Desktop Homepage Top Billboard" size="970×250" width={970} height={250} />
      </div>

      <div className={layout.container}>
        <div className={layout.mainGrid}>

          {/* ── Main content column ── */}
          <main className={layout.mainContent}>

            {/* Hero story */}
            <HeroCard
              category="महाराष्ट्र"
              headline="विधानसभेत सत्तासंघर्ष: सरकार स्थापनेच्या हालचालींना वेग, दिल्लीत रात्री बैठक"
              subtitle="राज्यपाल भेट उद्या सकाळी; नवीन मंत्रिमंडळाची संभाव्य रचना समोर"
            />

            {/* Secondary stories */}
            <div>
              <div className={layout.secondaryGrid}>
                <StandardCard category="राजकारण" headline="मुख्यमंत्र्यांच्या शपथविधीसाठी मुंबईत वानखेडेवर कार्यक्रम होणार" badge="LIVE" layout="col" />
                <StandardCard category="पुणे" headline="पुणे महानगरपालिकेच्या अर्थसंकल्पात पाणीपुरवठा योजनेला प्राधान्य" layout="col" />
              </div>
              {/* Mobile-only third card */}
              <div className={layout.mobileOnly} style={{ marginTop: 16 }}>
                <StandardCard category="गुन्हेगारी" headline="कोथरूडमध्ये बँक दरोडा प्रकरणी तीन संशयित ताब्यात" />
              </div>
            </div>

            {/* Mobile ad H1 */}
            <div className={layout.mobileOnly}>
              <Ad id="H1" name="Mobile Homepage Below-Header" size="300×250" height={250} fluid />
            </div>

            {/* Trending */}
            <div style={{ background: 'var(--surface-secondary)', padding: 24 }}>
              <TrendingModule items={TRENDING_ITEMS} />
            </div>

            {/* Desktop leaderboard between sections */}
            <div className={layout.desktopOnly} style={{ display: 'flex', justifyContent: 'center' }}>
              <Ad id="DH3" name="Desktop Between Categories" size="728×90" width={728} height={90} />
            </div>

            {/* Mobile ad H2 */}
            <div className={layout.mobileOnly}>
              <Ad id="H2" name="Mobile Homepage After Hero Block" size="300×250" height={250} fluid />
            </div>

            {/* Category sections */}
            {CATEGORY_SECTIONS.map((sec) => (
              <CategorySection key={sec.cat} cat={sec.cat} hero={sec.hero} stories={sec.stories} />
            ))}

            {/* Mobile ad H3 */}
            <div className={layout.mobileOnly}>
              <Ad id="H3" name="Mobile Homepage After Categories" size="300×250 / Native" height={250} fluid />
            </div>

            {/* Recommended */}
            <div>
              <CategoryUnderline name="Maharashtra" label="तुमच्यासाठी निवडक" />
              <div className={layout.recommendedGrid}>
                {RECOMMENDED.map((s, i) => (
                  <StandardCard key={i} category={s.c} headline={s.h} layout="col" />
                ))}
              </div>
            </div>

            {/* Mobile ad H4 */}
            <div className={layout.mobileOnly}>
              <Ad id="H4" name="Mobile Homepage Above Footer" size="Multiplex / Native" height={320} fluid />
            </div>
          </main>

          {/* ── Sidebar (desktop only) ── */}
          <aside className={layout.sidebar}>
            <div style={{ position: 'sticky', top: 72 }}>
              <Ad id="DH2" name="Desktop Sidebar Top" size="300×600" width={300} height={600} sticky />
              <p style={{ fontSize: 10, color: 'var(--text-tertiary)', fontFamily: 'ui-monospace, monospace', marginTop: 6 }}>
                ↑ sticks at viewport top while scrolling
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

            <Newsletter />

            <div style={{ padding: 20, border: '1px solid var(--border-default)' }}>
              <CategoryUnderline name="Pune" label="पुण्यातील अद्यतन" />
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {PUNE_UPDATES.map((h, i) => (
                  <li key={i} className="mr" style={{ fontSize: 14, lineHeight: 1.4, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-default)', paddingBottom: 12 }}>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

        </div>
      </div>

      {/* Before-footer ad */}
      <div className={layout.container} style={{ paddingTop: 0 }}>
        <Ad id="DH4" name="Desktop Before Footer" size="Responsive Native" height={140} fluid />
      </div>

      <Footer />
    </div>
  )
}
