import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BreakingStrip from '@/components/layout/BreakingStrip'
import layout from '@/styles/layout.module.css'

const AD_FORMATS = [
  {
    name: 'Desktop Billboard',
    size: '970×250',
    placement: 'प्रत्येक पानाच्या वरती',
    cpm: '₹१२०–₹१८०',
    best: 'ब्रँड अवेअरनेस',
  },
  {
    name: 'Sidebar Rectangle',
    size: '300×250',
    placement: 'उजव्या बाजूचा sidebar',
    cpm: '₹८०–₹१२०',
    best: 'लीड जनरेशन',
  },
  {
    name: 'Half Page',
    size: '300×600',
    placement: 'sidebar मध्यभागी',
    cpm: '₹१५०–₹२००',
    best: 'उत्पादन प्रदर्शन',
  },
  {
    name: 'Leaderboard',
    size: '728×90',
    placement: 'सामग्रीमध्ये',
    cpm: '₹७०–₹१००',
    best: 'ट्रॅफिक आकर्षण',
  },
  {
    name: 'Mobile Banner',
    size: '320×50 / 300×250',
    placement: 'मोबाईल सामग्रीमध्ये',
    cpm: '₹५०–₹९०',
    best: 'मोबाईल वापरकर्ते',
  },
  {
    name: 'Native / Sponsored',
    size: 'लेखस्वरूप',
    placement: 'बातम्यांच्या फीडमध्ये',
    cpm: 'सानुकूल',
    best: 'उच्च एंगेजमेंट',
  },
]

const AUDIENCE = [
  { label: 'मासिक वाचक', value: '२.४ लाख+' },
  { label: 'दैनिक सक्रिय वापरकर्ते', value: '३८,०००+' },
  { label: 'मोबाईल वापर', value: '७२%' },
  { label: 'सरासरी सत्र वेळ', value: '४ मि. ३८ से.' },
  { label: 'पृष्ठ दृश्ये / महिना', value: '९.२ लाख+' },
  { label: 'न्यूजलेटर सदस्य', value: '१२,५००+' },
]

const AUDIENCE_DEMO = [
  { label: 'वय: २५–४४', pct: '५८%' },
  { label: 'पुरुष वाचक', pct: '५४%' },
  { label: 'महाराष्ट्र', pct: '८३%' },
  { label: 'शहरी वाचक', pct: '६७%' },
  { label: 'उच्चशिक्षित', pct: '७१%' },
  { label: 'उत्पन्न ₹५ लाख+', pct: '४९%' },
]

const PACKAGES = [
  {
    name: 'स्टार्टर',
    price: '₹१५,०००',
    period: 'प्रति महिना',
    color: '#1565C0',
    features: [
      'Sidebar 300×250 (२ fold)',
      '५०,००० इंप्रेशन',
      'मूलभूत analytics अहवाल',
      'एक विभाग लक्ष्य',
    ],
  },
  {
    name: 'ग्रोथ',
    price: '₹४५,०००',
    period: 'प्रति महिना',
    color: '#C62828',
    highlight: true,
    features: [
      'Billboard + Sidebar पूर्ण package',
      '२,००,००० इंप्रेशन',
      'साप्ताहिक analytics अहवाल',
      'सर्व विभाग लक्ष्य',
      '१ Sponsored article',
      'Dedicated account manager',
    ],
  },
  {
    name: 'एंटरप्राइझ',
    price: 'सानुकूल',
    period: '',
    color: '#2E7D32',
    features: [
      'सर्व ad formats',
      'अमर्यादित इंप्रेशन',
      'रिअल-टाइम dashboard',
      'Geo + demographic targeting',
      '४ Sponsored articles',
      'Homepage takeover उपलब्ध',
      'Dedicated creative support',
    ],
  },
]

export default function AdvertisePage() {
  return (
    <div className={layout.page}>
      <Header />
      <BreakingStrip />

      <div className={layout.container} style={{ maxWidth: 1100 }}>
        {/* Page header */}
        <div style={{ borderBottom: '4px solid var(--brand-primary)', paddingBottom: 28, marginBottom: 48 }}>
          <div className="mr" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 12 }}>
            जाहिरात · ADVERTISING
          </div>
          <h1 className="mr" style={{ margin: '0 0 14px', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            जाहिरात द्या — Advertise With Us
          </h1>
          <p className="mr" style={{ margin: 0, fontSize: 'clamp(14px, 1.3vw, 17px)', lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: 780 }}>
            महाराष्ट्रातील २.४ लाख+ मराठी वाचकांपर्यंत पोहोचा. प्रजावार्तावर जाहिरात देऊन तुमचा ब्रँड, उत्पादन किंवा सेवा थेट लक्ष्य प्रेक्षकांपर्यंत पोहोचवा.
          </p>
        </div>

        {/* Audience stats */}
        <div style={{ marginBottom: 56 }}>
          <h2 className="mr" style={{ fontSize: 22, fontWeight: 800, marginBottom: 24, color: 'var(--brand-primary)' }}>आमचे वाचक</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16, marginBottom: 28 }}>
            {AUDIENCE.map((a) => (
              <div key={a.label} style={{ padding: '20px 16px', border: '1px solid var(--border-default)', textAlign: 'center', borderTop: '3px solid var(--brand-primary)' }}>
                <div className="mr" style={{ fontSize: 26, fontWeight: 900, color: 'var(--brand-primary)', lineHeight: 1, marginBottom: 8 }}>{a.value}</div>
                <div className="mr" style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 600 }}>{a.label}</div>
              </div>
            ))}
          </div>

          <div style={{ padding: 24, background: 'var(--surface-secondary)' }}>
            <div className="mr" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>
              वाचक प्रोफाइल
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
              {AUDIENCE_DEMO.map((d) => (
                <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#fff', border: '1px solid var(--border-default)' }}>
                  <span className="mr" style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{d.label}</span>
                  <span className="mr" style={{ fontSize: 15, fontWeight: 800, color: 'var(--brand-primary)' }}>{d.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ad formats */}
        <div style={{ marginBottom: 56 }}>
          <h2 className="mr" style={{ fontSize: 22, fontWeight: 800, marginBottom: 24, color: 'var(--brand-primary)' }}>जाहिरात स्वरूप</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: 'var(--brand-primary)', color: '#fff' }}>
                  {['स्वरूप', 'आकार', 'स्थान', 'CPM (अंदाजे)', 'सर्वोत्तम उद्देश'].map((h) => (
                    <th key={h} className="mr" style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {AD_FORMATS.map((f, i) => (
                  <tr key={f.name} style={{ background: i % 2 === 0 ? '#fff' : 'var(--surface-secondary)' }}>
                    <td className="mr" style={{ padding: '12px 16px', fontWeight: 700 }}>{f.name}</td>
                    <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: 13 }}>{f.size}</td>
                    <td className="mr" style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{f.placement}</td>
                    <td className="mr" style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--brand-primary)' }}>{f.cpm}</td>
                    <td className="mr" style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{f.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Packages */}
        <div style={{ marginBottom: 56 }}>
          <h2 className="mr" style={{ fontSize: 22, fontWeight: 800, marginBottom: 24, color: 'var(--brand-primary)' }}>जाहिरात पॅकेज</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {PACKAGES.map((p) => (
              <div
                key={p.name}
                style={{
                  border: `2px solid ${p.highlight ? p.color : 'var(--border-default)'}`,
                  borderTop: `4px solid ${p.color}`,
                  padding: 28,
                  position: 'relative',
                  background: p.highlight ? '#FFF8F7' : '#fff',
                }}
              >
                {p.highlight && (
                  <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: p.color, color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 12, whiteSpace: 'nowrap', fontFamily: 'var(--font-mr)' }}>
                    सर्वात लोकप्रिय
                  </div>
                )}
                <div className="mr" style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>{p.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 20 }}>
                  <span className="mr" style={{ fontSize: 32, fontWeight: 900, color: p.color, lineHeight: 1 }}>{p.price}</span>
                  {p.period && <span className="mr" style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>{p.period}</span>}
                </div>
                <ul style={{ listStyle: 'none', margin: '0 0 24px', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {p.features.map((f) => (
                    <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ color: p.color, fontWeight: 900, fontSize: 16, lineHeight: 1.2, flexShrink: 0 }}>✓</span>
                      <span className="mr" style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  style={{ width: '100%', padding: '12px', background: p.highlight ? p.color : '#fff', color: p.highlight ? '#fff' : p.color, border: `2px solid ${p.color}`, fontWeight: 700, fontSize: 14, cursor: 'pointer', borderRadius: 4, fontFamily: 'var(--font-mr)' }}
                >
                  {p.price === 'सानुकूल' ? 'चर्चा करा →' : 'सुरुवात करा →'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 56 }}>
          <div style={{ padding: 32, background: 'var(--brand-primary)', color: '#fff' }}>
            <div className="mr" style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>जाहिरात चौकशी करा</div>
            <p className="mr" style={{ margin: '0 0 20px', fontSize: 14, lineHeight: 1.7, opacity: 0.85 }}>
              आमचा sales team तुम्हाला सर्वोत्तम package निवडण्यास मदत करेल.
            </p>
            <div style={{ fontSize: 14, marginBottom: 8 }}>advertising@prajavarta.com</div>
            <div style={{ fontSize: 14 }}>+91 20 2553 1234 (ext. 2)</div>
          </div>
          <div style={{ padding: 32, border: '1px solid var(--border-default)' }}>
            <div className="mr" style={{ fontSize: 20, fontWeight: 800, marginBottom: 20 }}>त्वरित संपर्क</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['नाव', 'ईमेल', 'कंपनी', 'बजेट (अंदाजे)'].map((f) => (
                <input
                  key={f}
                  placeholder={f}
                  style={{ padding: '10px 12px', border: '1px solid var(--border-default)', fontSize: 14, fontFamily: 'var(--font-mr)', borderRadius: 3, outline: 'none' }}
                />
              ))}
              <button style={{ padding: '12px', background: 'var(--brand-primary)', color: '#fff', border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer', borderRadius: 4, fontFamily: 'var(--font-mr)' }}>
                पाठवा →
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
