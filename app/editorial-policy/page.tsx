import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BreakingStrip from '@/components/layout/BreakingStrip'
import layout from '@/styles/layout.module.css'

const PRINCIPLES = [
  {
    num: '०१',
    title: 'अचूकता (Accuracy)',
    body: 'प्रत्येक बातमी किमान दोन स्वतंत्र स्रोतांकडून पडताळणी केल्यानंतरच प्रकाशित केली जाते. अनुमान आणि तथ्य यांच्यात स्पष्ट फरक केला जातो.',
  },
  {
    num: '०२',
    title: 'निष्पक्षता (Impartiality)',
    body: 'आम्ही कोणत्याही राजकीय पक्ष, धर्म, जात किंवा व्यावसायिक हितसंबंधांशी बांधील नाही. प्रत्येक विषयावरील सर्व बाजू मांडण्याचा प्रयत्न केला जातो.',
  },
  {
    num: '०३',
    title: 'स्वातंत्र्य (Independence)',
    body: 'संपादकीय निर्णय संपूर्णपणे स्वतंत्र आहेत. जाहिरातदार, गुंतवणूकदार किंवा सरकार यांचा संपादकीय सामग्रीवर कोणताही प्रभाव नाही.',
  },
  {
    num: '०४',
    title: 'पारदर्शकता (Transparency)',
    body: 'आमचे आर्थिक हितसंबंध, मालकी आणि जाहिरातदारांची माहिती सार्वजनिक केली जाते. स्पॉन्सर केलेली सामग्री स्पष्टपणे ओळखली जाते.',
  },
  {
    num: '०५',
    title: 'जबाबदारी (Accountability)',
    body: 'चुका झाल्यास आम्ही त्या मान्य करतो, त्वरित दुरुस्ती प्रकाशित करतो आणि वाचकांना सूचित करतो. आमच्याबद्दल तक्रारी करण्याची प्रक्रिया उपलब्ध आहे.',
  },
  {
    num: '०६',
    title: 'मानवी प्रतिष्ठा (Human Dignity)',
    body: 'कोणत्याही व्यक्तीच्या जाती, धर्म, लिंग, वय किंवा अपंगत्वाच्या आधारावर भेदभाव करणारी सामग्री प्रकाशित केली जात नाही.',
  },
]

const PROCESS = [
  { step: '०१', label: 'वार्तांकन', desc: 'पत्रकार स्रोतांशी थेट संपर्क साधतात आणि प्राथमिक माहिती गोळा करतात.' },
  { step: '०२', label: 'पडताळणी', desc: 'किमान दोन स्वतंत्र स्रोतांकडून तथ्यांची पुष्टी केली जाते.' },
  { step: '०३', label: 'संपादन', desc: 'उपसंपादक भाषा, तथ्य आणि संदर्भ तपासतात.' },
  { step: '०४', label: 'प्रकाशन', desc: 'वरिष्ठ संपादकाच्या मान्यतेनंतरच महत्त्वाच्या बातम्या प्रकाशित होतात.' },
  { step: '०५', label: 'देखरेख', desc: 'प्रकाशनानंतरही बातम्यांवर लक्ष ठेवले जाते; आवश्यक असल्यास अद्यतन केले जाते.' },
]

export default function EditorialPolicyPage() {
  return (
    <div className={layout.page}>
      <Header />
      <BreakingStrip />

      <div className={layout.container} style={{ maxWidth: 860 }}>
        <div style={{ borderBottom: '4px solid var(--brand-primary)', paddingBottom: 24, marginBottom: 40 }}>
          <div className="mr" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 12 }}>
            धोरण · POLICY
          </div>
          <h1 className="mr" style={{ margin: '0 0 12px', fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800, lineHeight: 1.1 }}>
            संपादकीय धोरण
          </h1>
          <div style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>
            <span className="mr">अखेरचे अद्यतन: १ जानेवारी २०२६</span>
          </div>
        </div>

        <p className="mr" style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 48, padding: '20px 24px', background: 'var(--surface-secondary)', borderLeft: '3px solid var(--brand-primary)' }}>
          प्रजावार्ता उच्च दर्जाच्या पत्रकारितेसाठी वचनबद्ध आहे. आमचे संपादकीय धोरण आम्हाला वाचकांचा विश्वास टिकवून ठेवण्यास आणि मराठी पत्रकारितेची गुणवत्ता उंचावण्यास मदत करते.
        </p>

        {/* Principles */}
        <div style={{ marginBottom: 56 }}>
          <h2 className="mr" style={{ fontSize: 22, fontWeight: 800, marginBottom: 28, color: 'var(--brand-primary)' }}>मूलभूत तत्त्वे</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {PRINCIPLES.map((p) => (
              <div key={p.num} style={{ padding: 24, border: '1px solid var(--border-default)' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--brand-primary)', opacity: 0.25, fontFamily: 'var(--font-en)', lineHeight: 1, marginBottom: 8 }}>{p.num}</div>
                <div className="mr" style={{ fontSize: 16, fontWeight: 800, marginBottom: 10 }}>{p.title}</div>
                <p className="mr" style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div style={{ marginBottom: 56 }}>
          <h2 className="mr" style={{ fontSize: 22, fontWeight: 800, marginBottom: 28, color: 'var(--brand-primary)' }}>संपादकीय प्रक्रिया</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {PROCESS.map((p, i) => (
              <div key={p.step} style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 20, padding: '20px 0', borderBottom: i < PROCESS.length - 1 ? '1px solid var(--border-default)' : 'none', alignItems: 'start' }}>
                <div style={{ width: 48, height: 48, background: 'var(--brand-primary)', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, fontFamily: 'var(--font-en)', flexShrink: 0 }}>{p.step}</div>
                <div>
                  <div className="mr" style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{p.label}</div>
                  <p className="mr" style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Corrections policy */}
        <div style={{ padding: 28, background: 'var(--surface-secondary)', marginBottom: 48 }}>
          <h2 className="mr" style={{ fontSize: 20, fontWeight: 800, marginBottom: 16, color: 'var(--brand-primary)' }}>दुरुस्ती धोरण</h2>
          <p className="mr" style={{ margin: '0 0 12px', fontSize: 15, lineHeight: 1.8, color: 'var(--text-secondary)' }}>
            चुका मानवी स्वभाव आहेत. आम्ही जेव्हा चूक करतो तेव्हा आम्ही ते स्पष्टपणे मान्य करतो. दुरुस्ती केल्यावर मूळ लेखात &ldquo;दुरुस्ती&rdquo; टॅग लावला जातो आणि बदलाचा तपशील नमूद केला जातो.
          </p>
          <p className="mr" style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: 'var(--text-secondary)' }}>
            चुकीची माहिती आढळल्यास <strong>factcheck@prajavarta.com</strong> वर कळवा. आम्ही २४ तासांत उत्तर देऊ.
          </p>
        </div>

        {/* AI Policy */}
        <div style={{ padding: 24, border: '1px solid var(--border-default)', borderTop: '3px solid #6A1B9A', marginBottom: 48 }}>
          <div className="mr" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6A1B9A', marginBottom: 10 }}>AI धोरण</div>
          <h3 className="mr" style={{ fontSize: 18, fontWeight: 800, marginBottom: 12 }}>कृत्रिम बुद्धिमत्तेचा वापर</h3>
          <p className="mr" style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: 'var(--text-secondary)' }}>
            प्रजावार्ता AI साधनांचा वापर केवळ सहाय्यक म्हणून करते — जसे की व्याकरण तपासणी, लेआउट सूचना आणि डेटा विश्लेषण. AI द्वारे तयार केलेली कोणतीही बातमी मानवी संपादकाने पुनरावलोकन केल्याशिवाय प्रकाशित होत नाही. AI-अवलंबित सामग्री स्पष्टपणे ओळखली जाते.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
