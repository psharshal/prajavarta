import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BreakingStrip from '@/components/layout/BreakingStrip'
import layout from '@/styles/layout.module.css'

const TEAM = [
  { name: 'अनिल कुलकर्णी', role: 'मुख्य संपादक', since: '२०२१', abbr: 'अकु' },
  { name: 'सुनील देशमुख', role: 'राजकीय संपादक', since: '२०२१', abbr: 'सुदे' },
  { name: 'मीना पाटील', role: 'महाराष्ट्र संपादक', since: '२०२२', abbr: 'मीप' },
  { name: 'राहुल जोशी', role: 'पुणे रिपोर्टर', since: '२०२३', abbr: 'राजो' },
  { name: 'प्रिया कुलकर्णी', role: 'मंत्रालय बातमीदार', since: '२०२३', abbr: 'प्रकु' },
  { name: 'संतोष मोरे', role: 'क्रीडा संपादक', since: '२०२२', abbr: 'समो' },
]

const VALUES = [
  { title: 'सत्यता', desc: 'प्रत्येक बातमी प्रकाशित करण्यापूर्वी किमान दोन स्वतंत्र स्रोतांकडून पडताळणी केली जाते.' },
  { title: 'निष्पक्षता', desc: 'कोणत्याही राजकीय पक्ष, विचारधारा किंवा व्यावसायिक हितसंबंधांशी बांधील नाही.' },
  { title: 'पारदर्शकता', desc: 'चुका झाल्यास तातडीने दुरुस्ती केली जाते आणि वाचकांना सूचित केले जाते.' },
  { title: 'जबाबदारी', desc: 'प्रत्येक लेखाखाली लेखकाचे नाव आणि संपर्क माहिती दिली जाते.' },
]

export default function AboutPage() {
  return (
    <div className={layout.page}>
      <Header />
      <BreakingStrip />

      <div className={layout.container} style={{ maxWidth: 960 }}>
        {/* Hero */}
        <div style={{ borderBottom: '4px solid var(--brand-primary)', paddingBottom: 32, marginBottom: 48 }}>
          <div className="mr" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 12 }}>
            कंपनी · COMPANY
          </div>
          <h1 className="mr" style={{ margin: '0 0 16px', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            आमच्याबद्दल
          </h1>
          <p className="mr" style={{ margin: 0, fontSize: 'clamp(15px, 1.5vw, 18px)', lineHeight: 1.8, color: 'var(--text-secondary)', maxWidth: 740 }}>
            प्रजावार्ता हे महाराष्ट्रातील विश्वासार्ह मराठी डिजिटल वृत्तपत्र आहे. आम्ही २०२१ पासून महाराष्ट्राच्या कानाकोपऱ्यातील बातम्या मराठी वाचकांपर्यंत पोहोचवत आहोत.
          </p>
        </div>

        {/* Mission */}
        <div style={{ marginBottom: 56 }}>
          <h2 className="mr" style={{ fontSize: 24, fontWeight: 800, marginBottom: 16, color: 'var(--brand-primary)' }}>आमचे ध्येय</h2>
          <p className="mr" style={{ fontSize: 16, lineHeight: 1.9, color: 'var(--text-secondary)', marginBottom: 16 }}>
            महाराष्ट्रातील प्रत्येक नागरिकाला त्यांच्या भाषेत — मराठीत — अचूक, वेगवान आणि सखोल बातम्या मिळाव्यात हे आमचे प्राथमिक उद्दिष्ट आहे. राजकारण, समाज, अर्थकारण, क्रीडा, मनोरंजन — सर्व विषयांवर आम्ही सर्वसामान्य मराठी माणसाच्या दृष्टीकोनातून वार्तांकन करतो.
          </p>
          <p className="mr" style={{ fontSize: 16, lineHeight: 1.9, color: 'var(--text-secondary)' }}>
            आम्ही विश्वास ठेवतो की जनतेला माहितीचा अधिकार आहे, आणि पत्रकारिता हे केवळ व्यवसाय नव्हे तर एक सामाजिक जबाबदारी आहे. प्रत्येक बातमीमागे असलेल्या माणसाच्या कथेला आम्ही न्याय देण्याचा प्रयत्न करतो.
          </p>
        </div>

        {/* Values */}
        <div style={{ marginBottom: 56 }}>
          <h2 className="mr" style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, color: 'var(--brand-primary)' }}>आमची मूल्ये</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {VALUES.map((v) => (
              <div key={v.title} style={{ padding: 24, border: '1px solid var(--border-default)', borderTop: '3px solid var(--brand-primary)' }}>
                <div className="mr" style={{ fontSize: 18, fontWeight: 800, marginBottom: 10, color: 'var(--text-primary)' }}>{v.title}</div>
                <p className="mr" style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div style={{ marginBottom: 56 }}>
          <h2 className="mr" style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, color: 'var(--brand-primary)' }}>संपादकीय संघ</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {TEAM.map((m) => (
              <div key={m.name} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 16, border: '1px solid var(--border-default)' }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--brand-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--brand-primary)', fontSize: 14, flexShrink: 0, fontFamily: 'var(--font-mr)' }}>
                  {m.abbr}
                </div>
                <div>
                  <div className="mr" style={{ fontSize: 15, fontWeight: 700 }}>{m.name}</div>
                  <div className="mr" style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>{m.role}</div>
                  <div className="mr" style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{m.since} पासून</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{ background: 'var(--surface-secondary)', padding: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 24, marginBottom: 56 }}>
          {[
            { v: '२०२१', l: 'स्थापना वर्ष' },
            { v: '९,८७२+', l: 'लेख प्रकाशित' },
            { v: '२१८', l: 'संपादक / पत्रकार' },
            { v: '२.४ लाख', l: 'मासिक वाचक' },
            { v: '९', l: 'विभाग' },
            { v: '२४×७', l: 'अद्यतन' },
          ].map((s) => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div className="mr" style={{ fontSize: 28, fontWeight: 900, color: 'var(--brand-primary)', lineHeight: 1 }}>{s.v}</div>
              <div className="mr" style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 6, fontWeight: 600 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div style={{ textAlign: 'center', paddingBottom: 40 }}>
          <p className="mr" style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 20 }}>
            आमच्याशी बोलायचे आहे? आम्ही नेहमी उपलब्ध आहोत.
          </p>
          <a href="/contact" style={{ display: 'inline-block', padding: '14px 32px', background: 'var(--brand-primary)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none', borderRadius: 4 }}>
            <span className="mr">संपर्क करा →</span>
          </a>
        </div>
      </div>

      <Footer />
    </div>
  )
}
