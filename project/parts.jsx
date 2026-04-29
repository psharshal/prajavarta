/* Shared building blocks for Prajavarta page templates.
   Devanagari text uses real Marathi sample copy where possible; placeholders are clearly labelled.
*/

const CAT_COLORS = {
  Maharashtra: "var(--cat-maharashtra)",
  "महाराष्ट्र": "var(--cat-maharashtra)",
  Pune: "var(--cat-pune)",
  "पुणे": "var(--cat-pune)",
  Politics: "var(--cat-politics)",
  "राजकारण": "var(--cat-politics)",
  Crime: "var(--cat-crime)",
  "गुन्हेगारी": "var(--cat-crime)",
  Entertainment: "var(--cat-entertainment)",
  "मनोरंजन": "var(--cat-entertainment)",
  Sports: "var(--cat-sports)",
  "क्रीडा": "var(--cat-sports)",
  Business: "var(--cat-business)",
  "व्यवसाय": "var(--cat-business)",
  National: "var(--cat-national)",
  "देश": "var(--cat-national)",
};

function catColor(name) {
  return CAT_COLORS[name] || "var(--brand-primary)";
}

// ─── Ad placeholder ───────────────────────────────────────────
function Ad({ id, name, size, w, h, sticky, fluid, style }) {
  const baseStyle = {
    position: "relative",
    width: fluid ? "100%" : (w ? w + "px" : "100%"),
    height: h ? h + "px" : "auto",
    minHeight: h ? h + "px" : 60,
    ...style,
  };
  return (
    <div className="ad" style={baseStyle}>
      {sticky && <span className="ad__sticky">STICKY</span>}
      <div className="ad__label">जाहिरात · Advertisement</div>
      <div className="ad__id">{id}</div>
      <div className="ad__size">{size}</div>
      {name && <div style={{fontSize:10, color:"var(--text-tertiary)", marginTop:2}}>{name}</div>}
    </div>
  );
}

// ─── Image placeholder ─────────────────────────────────────────
function ImgPh({ ratio = "16/9", label = "hero image · 1200px+", style, height }) {
  return (
    <div
      className="imgph"
      style={{ aspectRatio: height ? undefined : ratio, height, width: "100%", ...style }}
    >
      {label}
    </div>
  );
}

// ─── Sticky header ─────────────────────────────────────────────
function MobileHeader() {
  return (
    <header style={{
      height: 56, background: "var(--brand-primary)", color: "#fff",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 16px", position: "sticky", top: 0, zIndex: 10,
    }}>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <Hamburger />
        <Logo />
      </div>
      <div style={{display:"flex",alignItems:"center",gap:14}}>
        <Search size={20}/>
        <div style={{width:1,height:20,background:"rgba(255,255,255,0.25)"}}/>
        <div style={{fontSize:12, fontWeight:600, opacity:0.85}}>ENG</div>
      </div>
    </header>
  );
}

function DesktopHeader() {
  const nav = ["मुख्यपृष्ठ","महाराष्ट्र","पुणे","राजकारण","गुन्हेगारी","मनोरंजन","क्रीडा","व्यवसाय","देश","जग"];
  return (
    <header style={{ background: "var(--brand-primary)", color: "#fff", position: "sticky", top: 0, zIndex: 10 }}>
      <div style={{
        height: 56, display: "flex", alignItems: "center",
        padding: "0 32px", maxWidth: 1440, margin: "0 auto", gap: 32,
      }}>
        <Logo big />
        <nav className="mr" style={{display:"flex",gap:22,fontSize:14,fontWeight:500,flex:1, overflow:"hidden"}}>
          {nav.map(n => <a key={n} style={{color:"#fff",textDecoration:"none",whiteSpace:"nowrap"}}>{n}</a>)}
        </nav>
        <div style={{display:"flex",alignItems:"center",gap:18,fontSize:13}}>
          <Search size={18}/>
          <span>ENG | मराठी</span>
          <button style={{
            background: "var(--brand-accent)", color: "#1A1A1A", border:"none",
            padding:"8px 14px", borderRadius:4, fontWeight:700, fontSize:13, cursor:"pointer",
          }}>Sign in</button>
        </div>
      </div>
    </header>
  );
}

function Logo({ big }) {
  return (
    <div style={{display:"flex",alignItems:"baseline",gap:0}}>
      <span className="mr" style={{fontWeight:800, fontSize:big?22:18, letterSpacing:"-0.01em"}}>प्रजावार्ता</span>
      <span style={{fontSize:9, marginLeft:6, opacity:0.7, letterSpacing:"0.15em", fontWeight:600}}>.COM</span>
    </div>
  );
}

function Hamburger(){return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>}
function Search({size=20}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>}
function Play({size=24}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><polygon points="6,4 20,12 6,20"/></svg>}
function GalleryIcon({size=14}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="14" rx="1"/><path d="M3 13l4-4 5 5 3-3 6 6"/></svg>}
function Clock({size=12}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>}
function Whatsapp({size=14}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2zm5.4 14.2c-.2.6-1.2 1.2-1.7 1.2-.5 0-1 .2-3.4-.7-2.9-1-4.7-3.9-4.9-4.1-.1-.2-1.1-1.4-1.1-2.7 0-1.3.7-1.9.9-2.2.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.5.7 1.7.7 1.8.1.1.1.3 0 .4 0 .2-.1.3-.2.4l-.4.4c-.1.1-.2.3-.1.5.1.2.5 1 1.2 1.6.8.7 1.5 1 1.8 1.1.2.1.4.1.5-.1.1-.1.6-.7.7-.9.1-.2.3-.2.5-.1.2.1 1.3.6 1.5.7.2.1.4.2.4.3.1.1.1.6-.1 1.2z"/></svg>}
function Fb({size=14}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V5h-3c-1.7 0-3 1.3-3 3v2H8v4h3v8h4v-8h3l1-4h-4V8c0-.6.4-1 1-1z"/></svg>}
function Tw({size=14}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18 3h3l-7 8 8 10h-6l-5-6-5 6H3l7-9L3 3h6l4 5 5-5z"/></svg>}
function Link({size=14}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>}

// ─── Breaking news strip ───────────────────────────────────────
function BreakingStrip() {
  return (
    <div style={{
      height:40, background:"var(--color-breaking)", color:"#fff",
      display:"flex", alignItems:"center", padding:"0 16px", overflow:"hidden", gap:12,
    }}>
      <span style={{
        fontSize:11, fontWeight:800, letterSpacing:"0.08em", padding:"3px 8px",
        background:"rgba(255,255,255,0.2)", borderRadius:3, flexShrink:0,
      }}>BREAKING</span>
      <span className="mr" style={{fontSize:13, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>
        विधानसभा निवडणूक निकाल जाहीर · सरकार स्थापनेच्या हालचालींना वेग · मुंबईत जोरदार पाऊस ·
      </span>
    </div>
  );
}

// ─── Category chip ─────────────────────────────────────────────
function CatChip({ name, size = "md" }) {
  const color = catColor(name);
  const padding = size === "sm" ? "3px 8px" : "5px 10px";
  const fontSize = size === "sm" ? 10 : 11;
  return (
    <span className="mr" style={{
      display:"inline-block", padding, fontSize, fontWeight:700,
      letterSpacing:"0.04em", color: "#fff", background: color,
      borderRadius: 2, textTransform: "uppercase",
    }}>{name}</span>
  );
}

function CatUnderline({ name, label }) {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`3px solid ${catColor(name)}`,paddingBottom:8,marginBottom:16}}>
      <h3 className="mr" style={{margin:0,fontSize:18,fontWeight:700, color:"var(--text-primary)"}}>{label || name}</h3>
      <a className="mr" style={{fontSize:12, color: catColor(name), fontWeight:600, textDecoration:"none"}}>सर्व पहा →</a>
    </div>
  );
}

// ─── Cards ─────────────────────────────────────────────────────
function HeroCard({ category, headline, subtitle, mobile }) {
  return (
    <article style={{ background: "#fff" }}>
      <ImgPh ratio="16/9" label="hero image · 1200×675" />
      <div style={{padding: mobile ? "12px 16px 16px" : "16px 0 0"}}>
        <CatChip name={category}/>
        <h2 className="mr" style={{
          margin:"10px 0 8px", fontSize: mobile ? 26 : 38, lineHeight: 1.25, fontWeight: 800,
          letterSpacing:"-0.01em", color:"var(--text-primary)",
        }}>{headline}</h2>
        {subtitle && (
          <p className="mr" style={{margin:0,fontSize: mobile ? 15 : 17, color:"var(--text-secondary)", lineHeight:1.55}}>{subtitle}</p>
        )}
        <Meta author="संपादकीय टीम" minutes={4}/>
      </div>
    </article>
  );
}

function FeaturedCard({ category, headline, kicker, badge }) {
  return (
    <article>
      <div style={{position:"relative"}}>
        <ImgPh ratio="16/9" label="featured · 800×450" />
        {badge && <Badge type={badge} />}
      </div>
      <div style={{paddingTop:10}}>
        <CatChip name={category} size="sm"/>
        <h3 className="mr" style={{
          margin:"8px 0 6px", fontSize:18, lineHeight:1.35, fontWeight:700,
          color:"var(--text-primary)",
        }}>{headline}</h3>
        {kicker && <p className="mr" style={{margin:0,fontSize:13,color:"var(--text-tertiary)"}}>{kicker}</p>}
        <Meta minutes={3}/>
      </div>
    </article>
  );
}

function StandardCard({ category, headline, layout = "row", badge }) {
  if (layout === "row") {
    return (
      <article style={{display:"grid",gridTemplateColumns:"112px 1fr",gap:12, alignItems:"start"}}>
        <div style={{position:"relative"}}>
          <ImgPh ratio="1/1" label="240×240" />
          {badge && <Badge type={badge} small />}
        </div>
        <div>
          <CatChip name={category} size="sm"/>
          <h4 className="mr" style={{margin:"6px 0 4px",fontSize:15,lineHeight:1.4,fontWeight:600,color:"var(--text-primary)"}}>{headline}</h4>
          <Meta minutes={2} compact/>
        </div>
      </article>
    );
  }
  // column layout
  return (
    <article>
      <div style={{position:"relative"}}>
        <ImgPh ratio="16/9" label="600×338" />
        {badge && <Badge type={badge} />}
      </div>
      <div style={{paddingTop:8}}>
        <CatChip name={category} size="sm"/>
        <h4 className="mr" style={{margin:"6px 0 4px",fontSize:16,lineHeight:1.4,fontWeight:600,color:"var(--text-primary)"}}>{headline}</h4>
        <Meta minutes={3} compact/>
      </div>
    </article>
  );
}

function CompactListItem({ headline, n, category }) {
  return (
    <li style={{display:"grid",gridTemplateColumns:"32px 1fr",gap:12,padding:"12px 0",borderBottom:"1px solid var(--border-default)"}}>
      <span style={{fontSize:24,fontWeight:800,color:"var(--brand-primary)",lineHeight:1, fontFamily:"var(--font-en)"}}>{String(n).padStart(2,"0")}</span>
      <div>
        {category && <span className="mr" style={{fontSize:11,fontWeight:700,color:catColor(category),textTransform:"uppercase",letterSpacing:"0.05em"}}>{category}</span>}
        <p className="mr" style={{margin:"4px 0 0",fontSize:14,lineHeight:1.4,fontWeight:600,color:"var(--text-primary)"}}>{headline}</p>
      </div>
    </li>
  );
}

function Badge({ type, small }) {
  const styles = {
    LIVE: { bg: "var(--color-live)", color: "#fff", icon: true, label: "LIVE" },
    VIDEO: { bg: "rgba(0,0,0,0.7)", color: "#fff", icon: false, label: "▶ Video" },
    PHOTOS: { bg: "rgba(0,0,0,0.7)", color: "#fff", icon: false, label: "◫ 12 photos" },
    SPONSORED: { bg: "var(--color-sponsored)", color: "#fff", icon: false, label: "Sponsored" },
  }[type] || { bg: "#000", color: "#fff", label: type };
  return (
    <span style={{
      position:"absolute", top:8, left:8, padding: small?"3px 6px":"4px 8px",
      background: styles.bg, color: styles.color, fontSize: small?9:10,
      fontWeight:800, letterSpacing:"0.06em", borderRadius:3,
      display:"flex", alignItems:"center", gap:4,
    }}>
      {styles.icon && <span style={{width:6,height:6,borderRadius:"50%",background:"#fff",display:"inline-block",animation:"none"}}/>}
      {styles.label}
    </span>
  );
}

function Meta({ author, minutes, compact }) {
  return (
    <div style={{
      display:"flex", alignItems:"center", gap:8, marginTop: compact?6:10,
      fontSize: 11, color:"var(--text-tertiary)",
    }}>
      {author && <span className="mr">{author}</span>}
      {author && <span>·</span>}
      <span style={{display:"inline-flex",alignItems:"center",gap:4}}><Clock/> {minutes} मिनिटे</span>
      <span>·</span>
      <span className="mr">२९ एप्रिल</span>
    </div>
  );
}

// ─── Trending module ───────────────────────────────────────────
function TrendingModule({ items, label = "ट्रेंडिंग" }) {
  return (
    <section>
      <CatUnderline name="Maharashtra" label={label}/>
      <ol style={{listStyle:"none",margin:0,padding:0}}>
        {items.map((it, i) => (
          <CompactListItem key={i} n={i+1} headline={it.h} category={it.c}/>
        ))}
      </ol>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────
function Footer() {
  const cols = [
    { t: "विभाग", items: ["महाराष्ट्र","पुणे","मुंबई","राजकारण","गुन्हेगारी","क्रीडा","व्यवसाय","मनोरंजन"] },
    { t: "कंपनी", items: ["आमच्याबद्दल","संपर्क","संपादकीय धोरण","फॅक्ट चेक","दुरुस्ती धोरण","करिअर्स"] },
    { t: "धोरणे", items: ["गोपनीयता","अटी व शर्ती","कुकी धोरण","DPDP अनुपालन","जाहिरात द्या"] },
    { t: "Follow", items: ["Twitter","Facebook","WhatsApp Channel","YouTube","Instagram"] },
  ];
  return (
    <footer style={{ background: "#0F1F2E", color:"#fff", marginTop: 48 }}>
      <div style={{maxWidth:1280, margin:"0 auto", padding: "48px 32px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1.4fr 1fr 1fr 1fr 1fr", gap:32, marginBottom:32}}>
          <div>
            <Logo big/>
            <p className="mr" style={{fontSize:13, lineHeight:1.7, opacity:0.7, marginTop:12}}>
              मराठीतून विश्वासार्ह बातम्या · संपादकीय निष्ठा आणि वाचनीय अनुभव.
            </p>
          </div>
          {cols.map(c => (
            <div key={c.t}>
              <div className="mr" style={{fontSize:12, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:14, opacity:0.85}}>{c.t}</div>
              <ul style={{listStyle:"none",margin:0,padding:0,display:"flex",flexDirection:"column",gap:8}}>
                {c.items.map(i => <li key={i} className="mr" style={{fontSize:13, opacity:0.7}}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:20, display:"flex", justifyContent:"space-between", fontSize:12, opacity:0.6}}>
          <span>© 2026 Prajavarta Media Pvt. Ltd. RNI: MAHMAR/2024/12345</span>
          <span>v1.0</span>
        </div>
      </div>
    </footer>
  );
}

function MobileFooter() {
  return (
    <footer style={{ background: "#0F1F2E", color:"#fff" }}>
      <div style={{padding: 20}}>
        <Logo big/>
        <p className="mr" style={{fontSize:12, lineHeight:1.7, opacity:0.7, marginTop:10}}>
          मराठीतून विश्वासार्ह बातम्या.
        </p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginTop:20}}>
          {[
            {t:"विभाग", items:["महाराष्ट्र","पुणे","राजकारण","क्रीडा"]},
            {t:"कंपनी", items:["आमच्याबद्दल","संपादकीय धोरण","फॅक्ट चेक"]},
          ].map(c => (
            <div key={c.t}>
              <div className="mr" style={{fontSize:11,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:8,opacity:0.85}}>{c.t}</div>
              <ul style={{listStyle:"none",margin:0,padding:0,display:"flex",flexDirection:"column",gap:6}}>
                {c.items.map(i => <li key={i} className="mr" style={{fontSize:12,opacity:0.7}}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:14, marginTop:20, fontSize:10, opacity:0.5}}>
          © 2026 Prajavarta · RNI: MAHMAR/2024/12345
        </div>
      </div>
    </footer>
  );
}

// ─── Newsletter ────────────────────────────────────────────────
function Newsletter() {
  return (
    <div style={{ background: "var(--brand-primary-light)", padding: 20, borderLeft: "3px solid var(--brand-primary)" }}>
      <div className="mr" style={{fontSize:14,fontWeight:700,color:"var(--brand-primary)",marginBottom:6}}>दैनिक न्यूजलेटर</div>
      <p className="mr" style={{margin:"0 0 12px", fontSize:13, color:"var(--text-secondary)", lineHeight:1.5}}>
        दिवसाच्या मुख्य बातम्या थेट आपल्या इनबॉक्समध्ये.
      </p>
      <div style={{display:"flex",gap:6}}>
        <input placeholder="email@example.com" style={{flex:1,padding:"8px 10px",border:"1px solid var(--border-default)",borderRadius:3,fontSize:13, background:"#fff"}}/>
        <button style={{background:"var(--brand-primary)",color:"#fff",border:"none",padding:"8px 14px",borderRadius:3,fontSize:13,fontWeight:600,cursor:"pointer"}}>Subscribe</button>
      </div>
    </div>
  );
}

// ─── Section divider tags ─────────────────────────────────────
function ZoneTag({ children, color = "var(--brand-primary)", style }) {
  return (
    <div style={{
      fontSize: 9, fontWeight: 700, letterSpacing: "0.12em",
      color, textTransform: "uppercase",
      fontFamily: "ui-monospace, monospace",
      padding: "4px 0",
      ...style,
    }}>{children}</div>
  );
}

Object.assign(window, {
  Ad, ImgPh, MobileHeader, DesktopHeader, BreakingStrip, CatChip, CatUnderline,
  HeroCard, FeaturedCard, StandardCard, CompactListItem, Badge, Meta,
  TrendingModule, Footer, MobileFooter, Newsletter, ZoneTag, Logo,
  Whatsapp, Fb, Tw, Link, Clock, Search, Play, GalleryIcon,
  catColor, CAT_COLORS,
});
