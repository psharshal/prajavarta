import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BreakingStrip from '@/components/layout/BreakingStrip'
import layout from '@/styles/layout.module.css'

const OFFICES = [
  {
    city: 'पुणे (मुख्यालय)',
    addr: '४०२, प्रेस कॉम्प्लेक्स, FC रोड, शिवाजीनगर, पुणे ४११ ००५',
    phone: '+91 20 2553 1234',
    email: 'pune@prajavarta.com',
  },
  {
    city: 'मुंबई',
    addr: '२०१, मीडिया हाऊस, लोअर परेल, मुंबई ४०० ०१३',
    phone: '+91 22 6600 5678',
    email: 'mumbai@prajavarta.com',
  },
  {
    city: 'नागपूर',
    addr: '१०१, प्रेस भवन, सीताबर्डी, नागपूर ४४० ०१२',
    phone: '+91 712 256 7890',
    email: 'nagpur@prajavarta.com',
  },
]

const CONTACTS = [
  { dept: 'बातम्या व संपादकीय', email: 'newsdesk@prajavarta.com', desc: 'बातम्यांच्या टिप्स, प्रेस रिलीज, संपादकीय प्रश्न' },
  { dept: 'जाहिरात', email: 'advertising@prajavarta.com', desc: 'जाहिरात दर, मीडिया किट, कस्टम कॅम्पेन' },
  { dept: 'तांत्रिक सहाय्य', email: 'support@prajavarta.com', desc: 'वेबसाइट समस्या, खाते व्यवस्थापन' },
  { dept: 'कायदेशीर', email: 'legal@prajavarta.com', desc: 'DMCA, गोपनीयता विनंत्या, कायदेशीर नोटिसा' },
  { dept: 'फॅक्ट चेक', email: 'factcheck@prajavarta.com', desc: 'चुकीची माहिती नोंदवा, दुरुस्तीच्या विनंत्या' },
  { dept: 'HR / करिअर', email: 'careers@prajavarta.com', desc: 'नोकरीच्या संधी, इंटर्नशिप' },
]

export default function ContactPage() {
  return (
    <div className={layout.page}>
      <Header />
      <BreakingStrip />

      <div className={layout.container} style={{ maxWidth: 960 }}>
        {/* Header */}
        <div style={{ borderBottom: '4px solid var(--brand-primary)', paddingBottom: 32, marginBottom: 48 }}>
          <div className="mr" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 12 }}>
            कंपनी · COMPANY
          </div>
          <h1 className="mr" style={{ margin: '0 0 12px', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            संपर्क करा
          </h1>
          <p className="mr" style={{ margin: 0, fontSize: 'clamp(14px, 1.3vw, 17px)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
            आमच्याशी बातम्या, जाहिरात, तांत्रिक समस्या किंवा कोणत्याही विषयावर संपर्क साधा. आम्ही २४ तासांत उत्तर देतो.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, marginBottom: 56 }}>
          {/* Contact form */}
          <div>
            <h2 className="mr" style={{ fontSize: 20, fontWeight: 800, marginBottom: 24, color: 'var(--brand-primary)' }}>संदेश पाठवा</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: 'पूर्ण नाव', type: 'text', placeholder: 'तुमचे नाव' },
                { label: 'ईमेल पत्ता', type: 'email', placeholder: 'email@example.com' },
                { label: 'फोन नंबर (ऐच्छिक)', type: 'tel', placeholder: '+91 98765 43210' },
              ].map((f) => (
                <div key={f.label}>
                  <label className="mr" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--text-primary)' }}>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-default)', fontSize: 14, fontFamily: 'inherit', borderRadius: 3, outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              ))}
              <div>
                <label className="mr" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--text-primary)' }}>विषय</label>
                <select style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-default)', fontSize: 14, fontFamily: 'inherit', borderRadius: 3, outline: 'none', background: '#fff' }}>
                  <option className="mr">बातम्यांची टीप द्या</option>
                  <option className="mr">जाहिरातीबद्दल चौकशी</option>
                  <option className="mr">चुकीची माहिती नोंदवा</option>
                  <option className="mr">तांत्रिक समस्या</option>
                  <option className="mr">इतर</option>
                </select>
              </div>
              <div>
                <label className="mr" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--text-primary)' }}>संदेश</label>
                <textarea
                  placeholder="तुमचा संदेश येथे लिहा..."
                  rows={5}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-default)', fontSize: 14, fontFamily: 'inherit', borderRadius: 3, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                />
              </div>
              <button
                style={{ padding: '13px 28px', background: 'var(--brand-primary)', color: '#fff', border: 'none', fontWeight: 700, fontSize: 15, cursor: 'pointer', borderRadius: 4, fontFamily: 'var(--font-mr)' }}
              >
                संदेश पाठवा →
              </button>
            </div>
          </div>

          {/* Department contacts */}
          <div>
            <h2 className="mr" style={{ fontSize: 20, fontWeight: 800, marginBottom: 24, color: 'var(--brand-primary)' }}>विभागानुसार संपर्क</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {CONTACTS.map((c) => (
                <div key={c.dept} style={{ padding: 16, border: '1px solid var(--border-default)', borderLeft: '3px solid var(--brand-primary)' }}>
                  <div className="mr" style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{c.dept}</div>
                  <div style={{ fontSize: 13, color: 'var(--brand-primary)', marginBottom: 4 }}>{c.email}</div>
                  <div className="mr" style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Offices */}
        <div style={{ marginBottom: 48 }}>
          <h2 className="mr" style={{ fontSize: 20, fontWeight: 800, marginBottom: 24, color: 'var(--brand-primary)' }}>आमची कार्यालये</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {OFFICES.map((o) => (
              <div key={o.city} style={{ padding: 20, border: '1px solid var(--border-default)' }}>
                <div className="mr" style={{ fontSize: 15, fontWeight: 800, color: 'var(--brand-primary)', marginBottom: 10 }}>{o.city}</div>
                <div className="mr" style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: 8 }}>{o.addr}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>{o.phone}</div>
                <div style={{ fontSize: 13, color: 'var(--brand-primary)' }}>{o.email}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
