import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BreakingStrip from '@/components/layout/BreakingStrip'
import layout from '@/styles/layout.module.css'

const SECTIONS = [
  {
    title: '१. आम्ही कोणती माहिती गोळा करतो',
    content: `आम्ही खालील प्रकारची माहिती गोळा करतो:

**वैयक्तिक माहिती:** जेव्हा तुम्ही न्यूजलेटरसाठी नोंदणी करता, टिप्पणी करता किंवा खाते तयार करता तेव्हा तुमचे नाव, ईमेल पत्ता आणि फोन नंबर.

**वापर माहिती:** तुम्ही कोणते लेख वाचता, किती वेळ घालवता, कोणत्या डिव्हाइसवरून भेट देता याची माहिती.

**तांत्रिक माहिती:** IP पत्ता, ब्राउझर प्रकार, कुकीज आणि लॉग फाइल्स.`,
  },
  {
    title: '२. माहितीचा वापर कसा केला जातो',
    content: `गोळा केलेल्या माहितीचा वापर खालील उद्देशांसाठी केला जातो:

• तुम्हाला वैयक्तिकृत बातम्या आणि सामग्री प्रदान करणे
• न्यूजलेटर आणि ब्रेकिंग न्यूज अलर्ट पाठवणे
• वेबसाइटचे कार्यप्रदर्शन सुधारणे
• जाहिरात लक्ष्यीकरण (केवळ एकत्रित स्तरावर)
• कायदेशीर आणि नियामक आवश्यकतांचे पालन करणे`,
  },
  {
    title: '३. माहिती सामायिकरण',
    content: `आम्ही तुमची वैयक्तिक माहिती तृतीय पक्षांना विकत नाही. तथापि, खालील परिस्थितींमध्ये माहिती सामायिक केली जाऊ शकते:

• **सेवा प्रदाते:** Google Analytics, Comscore सारख्या विश्वासार्ह तांत्रिक भागीदारांसह
• **कायदेशीर आवश्यकता:** न्यायालयाच्या आदेशानुसार किंवा सरकारी विनंतीनुसार
• **व्यवसाय हस्तांतरण:** कंपनी विलीनीकरण किंवा अधिग्रहणाच्या वेळी`,
  },
  {
    title: '४. कुकीज आणि ट्रॅकिंग',
    content: `आमची वेबसाइट कुकीज वापरते. तुम्ही ब्राउझर सेटिंग्जमधून कुकीज नियंत्रित करू शकता. अधिक माहितीसाठी आमचे कुकी धोरण पहा.

Google AdSense जाहिराती दाखवण्यासाठी वापरकर्त्याच्या पूर्वीच्या भेटींवर आधारित कुकीज वापरू शकते.`,
  },
  {
    title: '५. डेटा सुरक्षा',
    content: `तुमच्या माहितीचे संरक्षण करण्यासाठी आम्ही SSL एन्क्रिप्शन, सुरक्षित सर्व्हर आणि नियमित सुरक्षा ऑडिट वापरतो. तथापि, इंटरनेटवर कोणतीही माहिती १००% सुरक्षित नसते हे कृपया लक्षात ठेवा.`,
  },
  {
    title: '६. तुमचे अधिकार (DPDP अधिनियम २०२३)',
    content: `डिजिटल वैयक्तिक डेटा संरक्षण अधिनियम २०२३ अंतर्गत तुम्हाला खालील अधिकार आहेत:

• तुमची माहिती पाहण्याचा अधिकार
• तुमची माहिती दुरुस्त करण्याचा अधिकार
• तुमची माहिती हटवण्याचा अधिकार (विसरण्याचा अधिकार)
• माहिती प्रक्रियेस नकार देण्याचा अधिकार

या अधिकारांचा वापर करण्यासाठी privacy@prajavarta.com वर संपर्क करा.`,
  },
  {
    title: '७. धोरणातील बदल',
    content: `आम्ही हे धोरण वेळोवेळी अद्यतनित करू शकतो. महत्त्वपूर्ण बदलांबद्दल आम्ही ईमेलद्वारे किंवा वेबसाइटवर सूचना देऊ. या पानावरील "अखेरचे अद्यतन" तारीख तपासा.`,
  },
]

export default function PrivacyPolicyPage() {
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
            गोपनीयता धोरण
          </h1>
          <div style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>
            <span className="mr">अखेरचे अद्यतन: १ एप्रिल २०२६</span>
            <span style={{ margin: '0 8px' }}>·</span>
            <span className="mr">DPDP अधिनियम २०२३ अनुरूप</span>
          </div>
        </div>

        <p className="mr" style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 40, padding: 20, background: 'var(--surface-secondary)', borderLeft: '3px solid var(--brand-primary)' }}>
          प्रजावार्ता मीडिया प्रा. लि. (&ldquo;आम्ही&rdquo;, &ldquo;आमचे&rdquo;) तुमच्या गोपनीयतेला अत्यंत महत्त्व देते. हे धोरण स्पष्ट करते की आम्ही तुमची वैयक्तिक माहिती कशी गोळा करतो, वापरतो आणि संरक्षित करतो.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="mr" style={{ fontSize: 18, fontWeight: 800, marginBottom: 14, color: 'var(--text-primary)' }}>{s.title}</h2>
              <div className="mr" style={{ fontSize: 15, lineHeight: 1.9, color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>{s.content}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, padding: 20, border: '1px solid var(--border-default)', borderTop: '3px solid var(--brand-primary)' }}>
          <div className="mr" style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>प्रश्न आहेत?</div>
          <p className="mr" style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)' }}>
            गोपनीयता धोरणाबद्दल प्रश्नांसाठी: <strong>privacy@prajavarta.com</strong><br />
            Prajavarta Media Pvt. Ltd., ४०२ प्रेस कॉम्प्लेक्स, FC रोड, पुणे ४११ ००५
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
