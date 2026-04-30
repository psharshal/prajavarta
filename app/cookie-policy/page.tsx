import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BreakingStrip from '@/components/layout/BreakingStrip'
import layout from '@/styles/layout.module.css'

const COOKIE_TYPES = [
  {
    type: 'आवश्यक कुकीज',
    always: true,
    desc: 'वेबसाइट योग्यरित्या कार्य करण्यासाठी आवश्यक. या अक्षम करता येत नाहीत.',
    examples: ['session_id', 'csrf_token', 'cookieconsent'],
    purpose: 'लॉगिन स्थिती, सुरक्षा, फॉर्म सबमिशन',
    duration: 'सत्र संपेपर्यंत',
  },
  {
    type: 'विश्लेषण कुकीज',
    always: false,
    desc: 'वाचक वेबसाइट कसे वापरतात हे समजून घेण्यासाठी — आम्ही सामग्री सुधारण्यासाठी वापरतो.',
    examples: ['_ga', '_gid', '_gat'],
    purpose: 'पृष्ठ दृश्ये, वाचन वेळ, लोकप्रिय लेख',
    duration: '२ वर्षे',
  },
  {
    type: 'जाहिरात कुकीज',
    always: false,
    desc: 'तुमच्या आवडीनुसार संबंधित जाहिराती दाखवण्यासाठी वापरल्या जातात.',
    examples: ['_gcl_au', 'IDE', 'test_cookie'],
    purpose: 'जाहिरात लक्ष्यीकरण, फ्रिक्वेन्सी कॅपिंग',
    duration: '१३ महिने',
  },
  {
    type: 'कार्यात्मक कुकीज',
    always: false,
    desc: 'भाषा प्राधान्य, डार्क मोड, शेवटच्या वाचलेल्या बातम्या यासारख्या सेटिंग्ज लक्षात ठेवतात.',
    examples: ['lang_pref', 'theme', 'read_history'],
    purpose: 'वापरकर्ता प्राधान्ये आणि सेटिंग्ज',
    duration: '१ वर्ष',
  },
]

export default function CookiePolicyPage() {
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
            कुकी धोरण
          </h1>
          <div style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>
            <span className="mr">अखेरचे अद्यतन: १ एप्रिल २०२६</span>
          </div>
        </div>

        <p className="mr" style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 40, padding: '18px 22px', background: 'var(--surface-secondary)', borderLeft: '3px solid var(--brand-primary)' }}>
          कुकीज म्हणजे तुमच्या डिव्हाइसवर साठवल्या जाणाऱ्या लहान मजकूर फाइल्स. या वेबसाइट सुरळीत चालवण्यास, तुमचे अनुभव सुधारण्यास आणि संबंधित जाहिराती दाखवण्यास मदत करतात.
        </p>

        {/* Cookie types */}
        <div style={{ marginBottom: 48 }}>
          <h2 className="mr" style={{ fontSize: 22, fontWeight: 800, marginBottom: 24, color: 'var(--brand-primary)' }}>आम्ही कोणत्या कुकीज वापरतो</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {COOKIE_TYPES.map((c) => (
              <div key={c.type} style={{ border: '1px solid var(--border-default)', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', background: 'var(--surface-secondary)', borderBottom: '1px solid var(--border-default)' }}>
                  <div className="mr" style={{ fontSize: 15, fontWeight: 800 }}>{c.type}</div>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12, background: c.always ? '#E8F5E9' : '#FFF3E0', color: c.always ? '#2E7D32' : '#E65100' }}>
                    {c.always ? 'नेहमी सक्रिय' : 'नियंत्रणयोग्य'}
                  </span>
                </div>
                <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
                  <div>
                    <div className="mr" style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 6 }}>उद्देश</div>
                    <p className="mr" style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{c.purpose}</p>
                  </div>
                  <div>
                    <div className="mr" style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 6 }}>कालावधी</div>
                    <p className="mr" style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>{c.duration}</p>
                  </div>
                  <div>
                    <div className="mr" style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 6 }}>उदाहरणे</div>
                    <p style={{ margin: 0, fontSize: 12, fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{c.examples.join(', ')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Browser control */}
        <div style={{ marginBottom: 48 }}>
          <h2 className="mr" style={{ fontSize: 20, fontWeight: 800, marginBottom: 16, color: 'var(--brand-primary)' }}>कुकीज कशा नियंत्रित कराव्यात</h2>
          <p className="mr" style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>
            बहुतेक ब्राउझर तुम्हाला कुकीज अवरोधित किंवा हटवण्याची परवानगी देतात:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {['Chrome', 'Firefox', 'Safari', 'Edge'].map((b) => (
              <div key={b} style={{ padding: 14, border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, background: 'var(--brand-primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                  {b === 'Chrome' ? '●' : b === 'Firefox' ? '◐' : b === 'Safari' ? '◎' : '▣'}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{b}</div>
                  <div className="mr" style={{ fontSize: 11, color: 'var(--brand-primary)', cursor: 'pointer' }}>सेटिंग्ज पहा →</div>
                </div>
              </div>
            ))}
          </div>
          <p className="mr" style={{ marginTop: 16, fontSize: 13, color: 'var(--text-tertiary)', lineHeight: 1.7 }}>
            नोंद: कुकीज अक्षम केल्यास काही वेबसाइट वैशिष्ट्ये योग्यरित्या कार्य करणार नाहीत.
          </p>
        </div>

        <div style={{ padding: 20, border: '1px solid var(--border-default)', marginBottom: 48 }}>
          <p className="mr" style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)' }}>
            प्रश्नांसाठी: <strong>privacy@prajavarta.com</strong>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
