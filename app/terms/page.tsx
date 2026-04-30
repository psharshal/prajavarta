import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BreakingStrip from '@/components/layout/BreakingStrip'
import layout from '@/styles/layout.module.css'

const SECTIONS = [
  {
    title: '१. स्वीकृती',
    content: 'या वेबसाइटला भेट देऊन किंवा वापरून, तुम्ही या अटी आणि शर्तींना सहमत होता. जर तुम्ही या अटींशी सहमत नसाल, तर कृपया या वेबसाइटचा वापर करू नका.',
  },
  {
    title: '२. बौद्धिक संपदा',
    content: 'या वेबसाइटवरील सर्व सामग्री — लेख, फोटो, व्हिडिओ, लोगो, ग्राफिक्स — हे प्रजावार्ता मीडिया प्रा. लि. किंवा त्याच्या सामग्री प्रदात्यांच्या मालकीचे आहे आणि कॉपीराइट कायद्यांद्वारे संरक्षित आहे. पूर्व लेखी परवानगीशिवाय कोणतीही सामग्री पुनर्मुद्रित, वितरित किंवा व्यावसायिक उद्देशांसाठी वापरणे प्रतिबंधित आहे.',
  },
  {
    title: '३. परवानगीयोग्य वापर',
    content: `तुम्ही खालील गोष्टी करू शकता:
• वैयक्तिक, गैर-व्यावसायिक उद्देशांसाठी लेख वाचणे
• सोशल मीडियावर लेखांचे दुवे शेअर करणे
• शैक्षणिक उद्देशांसाठी थोड्या भागाचा उद्धृत वापर (स्रोत नमूद करणे आवश्यक)

तुम्ही खालील गोष्टी करू शकत नाही:
• परवानगीशिवाय सामग्री कॉपी करणे किंवा पुनर्प्रकाशित करणे
• बॉट्स किंवा स्क्रेपर्सद्वारे डेटा काढणे
• या वेबसाइटच्या सुरक्षा प्रणालीमध्ये हस्तक्षेप करणे`,
  },
  {
    title: '४. वापरकर्ता सामग्री',
    content: 'जेव्हा तुम्ही टिप्पण्या, पत्रे किंवा इतर सामग्री सादर करता, तेव्हा तुम्ही प्रजावार्ताला ती सामग्री वापरण्याचा, सुधारण्याचा आणि प्रकाशित करण्याचा अधिकार देता. द्वेषपूर्ण, बदनामीकारक किंवा बेकायदेशीर सामग्री प्रतिबंधित आहे.',
  },
  {
    title: '५. जबाबदारी मर्यादा',
    content: 'प्रजावार्ता बातम्यांची अचूकता राखण्याचा प्रयत्न करते, परंतु कोणत्याही माहितीच्या अचूकतेसाठी, पूर्णतेसाठी किंवा उपयुक्ततेसाठी हमी देत नाही. वेबसाइटच्या वापरामुळे झालेल्या कोणत्याही नुकसानासाठी आम्ही जबाबदार नाही.',
  },
  {
    title: '६. तृतीय पक्ष दुवे',
    content: 'आमच्या वेबसाइटवर तृतीय पक्षाच्या वेबसाइट्सचे दुवे असू शकतात. या वेबसाइट्सच्या सामग्री किंवा गोपनीयता धोरणांसाठी आम्ही जबाबदार नाही.',
  },
  {
    title: '७. जाहिरात',
    content: 'या वेबसाइटवर Google AdSense आणि इतर जाहिरात नेटवर्कच्या जाहिराती दिसू शकतात. जाहिरातींच्या सामग्रीसाठी आम्ही जबाबदार नाही.',
  },
  {
    title: '८. लागू कायदा',
    content: 'या अटी आणि शर्ती भारतीय कायद्यानुसार शासित आहेत. कोणतेही विवाद पुणे न्यायालयाच्या अधिकारक्षेत्रात येतील.',
  },
  {
    title: '९. अटींमधील बदल',
    content: 'आम्ही या अटी कधीही बदलण्याचा अधिकार राखतो. बदलांबद्दल आम्ही या पानावर सूचना देऊ. वेबसाइटचा सतत वापर म्हणजे नवीन अटींची स्वीकृती मानली जाते.',
  },
]

export default function TermsPage() {
  return (
    <div className={layout.page}>
      <Header />
      <BreakingStrip />

      <div className={layout.container} style={{ maxWidth: 800 }}>
        <div style={{ borderBottom: '4px solid var(--brand-primary)', paddingBottom: 24, marginBottom: 40 }}>
          <div className="mr" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 12 }}>
            धोरण · POLICY
          </div>
          <h1 className="mr" style={{ margin: '0 0 12px', fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800, lineHeight: 1.1 }}>
            अटी व शर्ती
          </h1>
          <div style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>
            <span className="mr">अखेरचे अद्यतन: १ एप्रिल २०२६</span>
          </div>
        </div>

        <p className="mr" style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 40, padding: '18px 22px', background: 'var(--surface-secondary)', borderLeft: '3px solid var(--brand-primary)' }}>
          prajavarta.com ला भेट देण्यापूर्वी हे दस्तावेज काळजीपूर्वक वाचा. या सेवेचा वापर केल्याने तुम्ही खालील अटी स्वीकारता.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {SECTIONS.map((s) => (
            <div key={s.title} style={{ paddingBottom: 32, borderBottom: '1px solid var(--border-default)' }}>
              <h2 className="mr" style={{ fontSize: 18, fontWeight: 800, marginBottom: 12, color: 'var(--text-primary)' }}>{s.title}</h2>
              <p className="mr" style={{ margin: 0, fontSize: 15, lineHeight: 1.9, color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>{s.content}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, marginBottom: 48, padding: 20, border: '1px solid var(--border-default)' }}>
          <p className="mr" style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)' }}>
            प्रश्नांसाठी: <strong>legal@prajavarta.com</strong><br />
            Prajavarta Media Pvt. Ltd. | CIN: U22212MH2021PTC345678
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
