// 5.5 Author Page — reuses category layout with author profile header
function AuthorPage() {
  const cat = "राजकारण";
  return (
    <div style={{ width: 1440, background: "#fff", fontFamily: "var(--font-en)" }}>
      <DesktopHeader/>
      <BreakingStrip/>

      <div style={{display:"flex",justifyContent:"center",padding:"24px 32px", background:"var(--surface-secondary)"}}>
        <Ad id="DC1" name="Desktop Author Top Billboard" size="970×250" w={970} h={250}/>
      </div>

      <div style={{maxWidth:1440, margin:"0 auto", padding:"32px"}}>
        {/* Author profile block (replaces category header) */}
        <div style={{display:"grid", gridTemplateColumns:"200px 1fr", gap:32, paddingBottom:32, marginBottom:32, borderBottom:"3px solid var(--brand-primary)"}}>
          <div className="imgph" style={{width:200, height:200, borderRadius:"50%", aspectRatio:"1/1", overflow:"hidden", justifyContent:"center"}}>
            <span style={{fontSize:64, fontWeight:700, color:"var(--brand-primary)", fontFamily:"var(--font-mr)"}}>सुदे</span>
          </div>
          <div>
            <div className="mr" style={{fontSize:12, fontWeight:700, letterSpacing:"0.1em", color:"var(--text-tertiary)", textTransform:"uppercase", marginBottom:10}}>AUTHOR · संपादक</div>
            <h1 className="mr" style={{margin:"0 0 8px", fontSize:44, fontWeight:800, lineHeight:1.1, letterSpacing:"-0.02em"}}>सुनील देशमुख</h1>
            <div className="mr" style={{fontSize:18, fontWeight:600, color:"var(--brand-primary)", marginBottom:14}}>राजकीय संपादक · पुणे राजकारण विशेष</div>

            <p className="mr" style={{margin:"0 0 16px", fontSize:16, lineHeight:1.7, color:"var(--text-secondary)", maxWidth:780}}>
              १८ वर्षांचा राजकीय पत्रकारिता अनुभव. महाराष्ट्राच्या राजकीय पटलावरील घडामोडींचे विश्लेषण आणि सखोल अहवाल. यापूर्वी लोकमत, सकाळ आणि महाराष्ट्र टाइम्ससाठी काम केले आहे. राज्यशास्त्रात पुणे विद्यापीठातून पदव्युत्तर पदवी आणि TISS मुंबईतून पत्रकारितेचा डिप्लोमा.
            </p>

            {/* Credentials grid */}
            <div style={{display:"grid", gridTemplateColumns:"repeat(4, auto)", gap:32, marginBottom:18, paddingTop:14, borderTop:"1px solid var(--border-default)"}}>
              {[
                {l:"अनुभव", v:"१८ वर्षे"},
                {l:"लेख प्रकाशित", v:"२,४६८"},
                {l:"मुख्य विषय", v:"राजकारण, धोरण"},
                {l:"शहर", v:"पुणे · मुंबई"},
              ].map(s => (
                <div key={s.l}>
                  <div className="mr" style={{fontSize:11, color:"var(--text-tertiary)", fontWeight:600, letterSpacing:"0.05em", textTransform:"uppercase", marginBottom:4}}>{s.l}</div>
                  <div className="mr" style={{fontSize:16, fontWeight:700, color:"var(--text-primary)"}}>{s.v}</div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div style={{display:"flex", gap:10, alignItems:"center"}}>
              {[
                {i: <Tw/>, l: "@sunildeshmukh"},
                {i: <Link/>, l: "LinkedIn"},
                {i: "@", l: "sunil@prajavarta.com"},
              ].map((s, i) => (
                <a key={i} style={{display:"flex", alignItems:"center", gap:8, padding:"8px 14px", border:"1px solid var(--border-default)", color:"var(--text-secondary)", textDecoration:"none", fontSize:13, fontWeight:500}}>{s.i} {s.l}</a>
              ))}
              <button className="mr" style={{padding:"8px 14px", background:"var(--brand-primary)", color:"#fff", border:"none", fontSize:13, fontWeight:600, cursor:"pointer"}}>+ Follow author</button>
            </div>

            {/* Categories author covers */}
            <div style={{marginTop:18, display:"flex", gap:8, flexWrap:"wrap"}}>
              <div className="mr" style={{fontSize:12, fontWeight:600, color:"var(--text-tertiary)", marginRight:4, alignSelf:"center"}}>विशेष विषय:</div>
              {["राजकारण","महाराष्ट्र","पुणे","धोरण","निवडणूक"].map(c => (
                <CatChip key={c} name={c} size="sm"/>
              ))}
            </div>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(12, 1fr)", gap:32}}>
          <div style={{gridColumn:"span 8", display:"flex", flexDirection:"column", gap:32}}>
            <div>
              <ZoneTag style={{marginBottom:10}}>LATEST BY THIS AUTHOR · 10 STORIES</ZoneTag>
              <CatUnderline name={cat} label="सुनील देशमुख यांच्या ताज्या बातम्या"/>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:24}}>
                {[
                  "विधानसभेत सत्तासंघर्ष: सरकार स्थापनेच्या हालचालींना वेग",
                  "मंत्रिमंडळ विस्ताराचे संभाव्य चेहरे: संपूर्ण यादी",
                  "उपमुख्यमंत्रीपदाची शर्यत: तीन नावांची चर्चा",
                  "महायुतीच्या जागावाटपात अंतिम गठित कोणाला?",
                  "विरोधी पक्षनेतेपदासाठी ठाकरे-काँग्रेसमधील रस्सीखेच",
                  "लोकसभेत अध्यक्षपदासाठी इंडिया आघाडीची रणनीती",
                  "एनसीपी प्रदेशाध्यक्षपदी सुनील तटकरे यांची नियुक्ती",
                  "भाजप प्रदेशाध्यक्षपदी फडणवीसांची फेरनियुक्ती",
                  "मनसेच्या अधिवेशनात राज ठाकरे यांचे आक्रमक भाषण",
                  "पुण्यातील आमदारांना मंत्रिमंडळात स्थान मिळणार का?",
                ].map((h, i) => <StandardCard key={i} layout="col" category={cat} headline={h}/>)}
              </div>
              <button className="mr" style={{marginTop:24, padding:"12px 28px", background:"#fff", border:"1px solid var(--brand-primary)", color:"var(--brand-primary)", fontWeight:600, fontSize:14, cursor:"pointer"}}>आणखी लेख दाखवा →</button>
            </div>

            <div style={{display:"flex",justifyContent:"center"}}>
              <Ad id="DC3" name="Desktop Author Between Modules" size="728×90" w={728} h={90}/>
            </div>

            <div>
              <ZoneTag style={{marginBottom:10}}>MOST READ BY AUTHOR</ZoneTag>
              <div style={{background:"var(--surface-secondary)", padding:24}}>
                <TrendingModule label="सर्वाधिक वाचलेले" items={[
                  { c:"राजकारण", h:"फडणवीस-शिंदे यांच्यातील समझोत्याचा आत-कथा" },
                  { c:"राजकारण", h:"महाराष्ट्र विधानसभा निवडणूक: पूर्ण विश्लेषण" },
                  { c:"राजकारण", h:"मराठा आरक्षणाचा राजकीय परिणाम" },
                  { c:"राजकारण", h:"शिवसेनेची फूट: एक कालक्रम" },
                  { c:"राजकारण", h:"पुण्यातील राजकीय समीकरणे २०२६" },
                ]}/>
              </div>
            </div>

            {/* E-E-A-T panel */}
            <div style={{padding:24, border:"1px solid var(--border-default)", display:"grid", gridTemplateColumns:"auto 1fr", gap:20, alignItems:"start"}}>
              <div style={{width:48, height:48, borderRadius:8, background:"var(--brand-primary-light)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24}}>✓</div>
              <div>
                <div className="mr" style={{fontSize:16, fontWeight:700, marginBottom:6}}>संपादकीय निष्ठा आणि विश्वासार्हता</div>
                <p className="mr" style={{margin:"0 0 12px", fontSize:14, lineHeight:1.7, color:"var(--text-secondary)"}}>
                  सुनील देशमुख प्रजावार्ताच्या संपादकीय धोरणांचे काटेकोर पालन करतात. त्यांचे सर्व लेख तथ्य पडताळणी प्रक्रियेतून जातात आणि संपादकीय मंडळाच्या मान्यतेनंतरच प्रकाशित होतात.
                </p>
                <div style={{display:"flex", gap:14, fontSize:13, fontWeight:600, color:"var(--brand-primary)"}}>
                  <span>संपादकीय धोरण →</span>
                  <span>तथ्य पडताळणी प्रक्रिया →</span>
                  <span>दुरुस्ती धोरण →</span>
                </div>
              </div>
            </div>
          </div>

          <aside style={{gridColumn:"span 4", display:"flex", flexDirection:"column", gap:24}}>
            <ZoneTag>SIDEBAR · 4-COL</ZoneTag>

            <div style={{position:"relative"}}>
              <Ad id="DC2" name="Author Sidebar" size="300×600" w={300} h={600} sticky/>
              <div style={{fontSize:10, color:"var(--text-tertiary)", fontFamily:"ui-monospace, monospace", marginTop:6}}>↑ sticky on scroll</div>
            </div>

            <div style={{padding:20, border:"1px solid var(--border-default)"}}>
              <div className="mr" style={{fontSize:13, fontWeight:700, color:"var(--text-tertiary)", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:14}}>लेखकाची आकडेवारी</div>
              <div style={{display:"flex", flexDirection:"column", gap:14}}>
                {[
                  {l:"एकूण लेख", v:"२,४६८"},
                  {l:"या वर्षी", v:"१४२"},
                  {l:"या महिन्यात", v:"२८"},
                  {l:"फॉलोअर्स", v:"३४.६ K"},
                  {l:"सरासरी वाचन वेळ", v:"५:४२ मि."},
                ].map(s => (
                  <div key={s.l} style={{display:"flex", justifyContent:"space-between", paddingBottom:10, borderBottom:"1px solid var(--border-default)"}}>
                    <span className="mr" style={{fontSize:13, color:"var(--text-secondary)"}}>{s.l}</span>
                    <span className="mr" style={{fontSize:14, fontWeight:700}}>{s.v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{padding:20, border:"1px solid var(--border-default)"}}>
              <CatUnderline name="Politics" label="संबंधित संपादक"/>
              <div style={{display:"flex", flexDirection:"column", gap:14}}>
                {[
                  {n:"मीना पाटील", r:"महाराष्ट्र संपादक", a:"मीप"},
                  {n:"राहुल जोशी", r:"पुणे रिपोर्टर", a:"राजो"},
                  {n:"प्रिया कुलकर्णी", r:"मंत्रालय बातमीदार", a:"प्रकु"},
                ].map((p, i) => (
                  <div key={i} style={{display:"flex", alignItems:"center", gap:12, paddingBottom:12, borderBottom:"1px solid var(--border-default)"}}>
                    <div style={{width:40, height:40, borderRadius:"50%", background:"var(--brand-primary-light)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, color:"var(--brand-primary)", fontSize:13, fontFamily:"var(--font-mr)"}}>{p.a}</div>
                    <div style={{flex:1}}>
                      <div className="mr" style={{fontSize:14, fontWeight:600}}>{p.n}</div>
                      <div className="mr" style={{fontSize:11, color:"var(--text-tertiary)"}}>{p.r}</div>
                    </div>
                    <button style={{fontSize:11, padding:"4px 10px", border:"1px solid var(--brand-primary)", color:"var(--brand-primary)", background:"#fff", fontWeight:600, cursor:"pointer"}}>Follow</button>
                  </div>
                ))}
              </div>
            </div>

            <Newsletter/>
          </aside>
        </div>
      </div>

      <Footer/>
    </div>
  );
}

window.AuthorPage = AuthorPage;
