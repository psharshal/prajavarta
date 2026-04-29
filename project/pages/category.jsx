// 5.3 Category & 5.4 Tag pages
function MobileCategory({ tag = false }) {
  const cat = tag ? "महाराष्ट्र" : "महाराष्ट्र";
  const intro = tag
    ? "#मराठा आरक्षण विषयाशी संबंधित सर्व बातम्या, विश्लेषण आणि अद्यतने एकाच ठिकाणी. राज्यातील सामाजिक आणि राजकीय वर्तुळातील सर्वात चर्चित विषय."
    : "महाराष्ट्रातून थेट: राजकारण, समाज, अर्थकारण, संस्कृती आणि शहर-ग्रामीण घडामोडी. राज्याच्या प्रत्येक कोपऱ्यातील विश्वासार्ह बातम्या आणि सखोल विश्लेषण.";

  return (
    <div style={{ width: 375, background: "#fff", fontFamily: "var(--font-en)" }}>
      <MobileHeader/>
      <BreakingStrip/>

      {/* Category Header */}
      <div style={{padding:"20px 16px 16px", borderBottom:`3px solid ${catColor(cat)}`}}>
        {tag && <div className="mr" style={{fontSize:11, fontWeight:700, letterSpacing:"0.08em", color:"var(--text-tertiary)", textTransform:"uppercase", marginBottom:8}}>TAG · विषय</div>}
        <h1 className="mr" style={{margin:"0 0 10px", fontSize:32, fontWeight:800, lineHeight:1.2, color:"var(--text-primary)"}}>
          {tag ? "#मराठा आरक्षण" : cat}
        </h1>
        <p className="mr" style={{margin:0, fontSize:14, lineHeight:1.6, color:"var(--text-secondary)"}}>{intro}</p>
        <div style={{display:"flex", gap:8, marginTop:14, fontSize:11, color:"var(--text-tertiary)"}}>
          <span className="mr">{tag ? "१४८ बातम्या" : "२,४८० बातम्या"}</span>
          <span>·</span>
          <span className="mr">अद्यतनित: २९ एप्रिल</span>
        </div>
      </div>

      {/* Hero */}
      <div style={{padding: "16px 0 0"}}>
        <ZoneTag style={{padding:"0 16px 8px"}}>CATEGORY HERO</ZoneTag>
        <HeroCard mobile category={cat} headline={tag ? "मराठा आरक्षणावर सर्वोच्च न्यायालयाची सुनावणी पुढे ढकलली" : "राज्यात कांद्याच्या भावात मोठी घसरण, शेतकऱ्यांचे आंदोलन सुरू"}/>
      </div>

      {/* Latest feed */}
      <section style={{padding:"24px 16px 0"}}>
        <CatUnderline name={cat} label="ताज्या बातम्या"/>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          {[
            "नागपूर हिवाळी अधिवेशनाची तारीख निश्चित, १६ डिसेंबरपासून सुरुवात",
            "औरंगाबाद नामांतर वाद पुन्हा चर्चेत, सुप्रीम कोर्टात सुनावणी",
            "नाशिकमध्ये द्राक्ष निर्यातीत २०% घट",
            "विधान परिषदेच्या निवडणुकीचे वेळापत्रक जाहीर",
            "मराठवाड्यात अवकाळी पावसाचा कहर, पीकहानी",
          ].map((h, i) => <StandardCard key={i} category={cat} headline={h}/>)}
        </div>
      </section>

      {/* Ad C1 */}
      <div style={{padding:"20px 16px"}}>
        <Ad id="C1" name="Mobile Category Below Hero" size="300×250" h={250}/>
      </div>

      {/* Trending in category */}
      <div style={{padding:"0 16px"}}>
        <TrendingModule label={`${cat}-मधील ट्रेंडिंग`} items={[
          { c: cat, h: "मनोज जरांगे पाटील आज औरंगाबादेत उपोषणाला बसणार" },
          { c: cat, h: "मुंबईत मेट्रो लाईन ३ चे काम पूर्णत्वाच्या मार्गावर" },
          { c: cat, h: "कोकण किनारपट्टीवर पर्यटनाला उत्तेजन देण्यासाठी नवी योजना" },
          { c: cat, h: "विदर्भातील शेतकऱ्यांसाठी १,२०० कोटींचे पॅकेज जाहीर" },
          { c: cat, h: "मराठी भाषा विद्यापीठाच्या स्थापनेला राज्य मंत्रिमंडळाची मान्यता" },
        ]}/>
      </div>

      {/* Most read */}
      <section style={{padding:"24px 16px 0"}}>
        <CatUnderline name={cat} label="सर्वाधिक वाचलेले"/>
        <ul style={{listStyle:"none",margin:0,padding:0,display:"flex",flexDirection:"column",gap:0}}>
          {[
            "मराठा आरक्षणावर सर्वोच्च न्यायालयाची सुनावणी",
            "शिवसेनेच्या अधिवेशनात ठाकरेंचे आक्रमक भाषण",
            "महावितरणच्या वीजबिलात ८% वाढीचा प्रस्ताव",
            "MPSC परीक्षेचे नवीन वेळापत्रक",
            "गणेशोत्सव परवानगी प्रक्रिया जलद करण्याचे आदेश",
          ].map((h, i) => (
            <li key={i} className="mr" style={{fontSize:14, lineHeight:1.5, color:"var(--text-primary)", padding:"14px 0", borderBottom:"1px solid var(--border-default)", fontWeight:500}}>{h}</li>
          ))}
        </ul>
      </section>

      {/* Ad C2 */}
      <div style={{padding:"24px 16px"}}>
        <Ad id="C2" name="Mobile Category Between Grids" size="300×250 / Native" h={250}/>
      </div>

      {/* Subcategories — only on category, not tag */}
      {!tag && (
        <section style={{padding:"0 16px 24px"}}>
          <CatUnderline name={cat} label="उप-विभाग"/>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
            {["मुंबई","पुणे","नागपूर","औरंगाबाद","कोल्हापूर","नाशिक"].map(s => (
              <a key={s} className="mr" style={{padding:"14px 12px", border:"1px solid var(--border-default)", fontSize:13, fontWeight:600, color:"var(--text-primary)", textDecoration:"none"}}>{s} →</a>
            ))}
          </div>
        </section>
      )}

      {/* Evergreen */}
      {!tag && (
        <section style={{padding:"0 16px 24px"}}>
          <CatUnderline name={cat} label="विशेष वाचा"/>
          <div style={{display:"flex", flexDirection:"column", gap:14}}>
            {[
              "महाराष्ट्राच्या स्थापनेची पूर्ण कथा: १९६० ते आजपर्यंत",
              "संयुक्त महाराष्ट्र चळवळ — एका लढ्याची शोधयात्रा",
              "मराठी अस्मितेची नवी ओळख: संस्कृती, साहित्य, चित्रपट",
              "महाराष्ट्रातील १० ऐतिहासिक स्थळे जी प्रत्येकाने पाहावी",
            ].map((h, i) => <StandardCard key={i} category={cat} headline={h}/>)}
          </div>
        </section>
      )}

      {/* Topic cluster / related tags */}
      <section style={{padding:"0 16px 24px"}}>
        <div className="mr" style={{fontSize:13, fontWeight:700, color:"var(--text-tertiary)", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:12}}>संबंधित विषय</div>
        <div style={{display:"flex", flexWrap:"wrap", gap:8}}>
          {["#मराठा आरक्षण","#जरांगे पाटील","#विधानसभा","#मंत्रिमंडळ","#फडणवीस","#शिंदे","#शेतकरी","#कांदा","#पाऊस","#मुंबई"].map(t => (
            <span key={t} className="mr" style={{padding:"6px 12px", background:"var(--brand-primary-light)", color:"var(--brand-primary)", fontSize:12, fontWeight:600, borderRadius:20}}>{t}</span>
          ))}
        </div>
      </section>

      {/* Ad C3 */}
      <div style={{padding:"0 16px 24px"}}>
        <Ad id="C3" name="Mobile Category Before Footer" size="Multiplex / Native" h={300}/>
      </div>

      <MobileFooter/>
    </div>
  );
}

function DesktopCategory({ tag = false }) {
  const cat = "महाराष्ट्र";
  return (
    <div style={{ width: 1440, background: "#fff", fontFamily: "var(--font-en)" }}>
      <DesktopHeader/>
      <BreakingStrip/>

      <div style={{display:"flex",justifyContent:"center",padding:"24px 32px", background:"var(--surface-secondary)"}}>
        <Ad id="DC1" name="Desktop Category Top Billboard" size="970×250" w={970} h={250}/>
      </div>

      <div style={{maxWidth:1440, margin:"0 auto", padding:"32px"}}>
        {/* Category header full width */}
        <div style={{borderBottom:`4px solid ${catColor(cat)}`, paddingBottom:24, marginBottom:32}}>
          {tag && <div className="mr" style={{fontSize:12, fontWeight:700, letterSpacing:"0.08em", color:"var(--text-tertiary)", textTransform:"uppercase", marginBottom:10}}>TAG · विषय</div>}
          <h1 className="mr" style={{margin:"0 0 12px", fontSize:48, fontWeight:800, lineHeight:1.1, letterSpacing:"-0.02em"}}>
            {tag ? "#मराठा आरक्षण" : cat}
          </h1>
          <p className="mr" style={{margin:0, fontSize:17, lineHeight:1.6, color:"var(--text-secondary)", maxWidth:780}}>
            {tag
              ? "#मराठा आरक्षण विषयाशी संबंधित सर्व बातम्या, विश्लेषण आणि अद्यतने एकाच ठिकाणी. राज्यातील सामाजिक आणि राजकीय वर्तुळातील सर्वात चर्चित विषय."
              : "महाराष्ट्रातून थेट: राजकारण, समाज, अर्थकारण, संस्कृती आणि शहर-ग्रामीण घडामोडी. राज्याच्या प्रत्येक कोपऱ्यातील विश्वासार्ह बातम्या."}
          </p>
          <div style={{display:"flex", gap:14, marginTop:14, fontSize:13, color:"var(--text-tertiary)"}}>
            <span className="mr">{tag ? "१४८ बातम्या" : "२,४८० बातम्या"}</span>
            <span>·</span>
            <span className="mr">अद्यतनित: २९ एप्रिल २०२६</span>
            <span>·</span>
            <span className="mr">२१८ संपादक</span>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(12, 1fr)", gap:32}}>

          {/* Left 8 */}
          <div style={{gridColumn:"span 8", display:"flex", flexDirection:"column", gap:32}}>
            <div>
              <ZoneTag style={{marginBottom:10}}>CATEGORY HERO · 8-COL</ZoneTag>
              <HeroCard category={cat} headline={tag ? "मराठा आरक्षणावर सर्वोच्च न्यायालयाची सुनावणी पुढे ढकलली" : "राज्यात कांद्याच्या भावात मोठी घसरण, शेतकऱ्यांचे आंदोलन सुरू"}/>
            </div>

            <div>
              <ZoneTag style={{marginBottom:10}}>LATEST FEED · 2-COL × 3 ROW</ZoneTag>
              <CatUnderline name={cat} label="ताज्या बातम्या"/>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:24}}>
                {[
                  "नागपूर हिवाळी अधिवेशनाची तारीख निश्चित, १६ डिसेंबरपासून सुरुवात",
                  "औरंगाबाद नामांतर वाद पुन्हा चर्चेत, सुप्रीम कोर्टात सुनावणी",
                  "नाशिकमध्ये द्राक्ष निर्यातीत २०% घट, युरोपीय निर्बंधांचा परिणाम",
                  "विधान परिषदेच्या निवडणुकीचे वेळापत्रक जाहीर",
                  "मराठवाड्यात अवकाळी पावसाचा कहर, १२ जिल्ह्यांत पीकहानी",
                  "कोकणात पावसाने सरासरी ओलांडली, शेतकऱ्यांना दिलासा",
                ].map((h, i) => <StandardCard key={i} layout="col" category={cat} headline={h}/>)}
              </div>
            </div>

            <div style={{display:"flex",justifyContent:"center"}}>
              <Ad id="DC3" name="Desktop Category Between Modules" size="728×90" w={728} h={90}/>
            </div>

            <div>
              <ZoneTag style={{marginBottom:10}}>TRENDING IN CATEGORY</ZoneTag>
              <div style={{background:"var(--surface-secondary)", padding:24}}>
                <TrendingModule label={`${cat}-मधील ट्रेंडिंग`} items={[
                  { c: cat, h: "मनोज जरांगे पाटील आज औरंगाबादेत उपोषणाला बसणार" },
                  { c: cat, h: "मुंबईत मेट्रो लाईन ३ चे काम पूर्णत्वाच्या मार्गावर" },
                  { c: cat, h: "कोकण किनारपट्टीवर पर्यटनाला उत्तेजन देण्यासाठी नवी योजना" },
                  { c: cat, h: "विदर्भातील शेतकऱ्यांसाठी १,२०० कोटींचे पॅकेज जाहीर" },
                  { c: cat, h: "मराठी भाषा विद्यापीठाच्या स्थापनेला राज्य मंत्रिमंडळाची मान्यता" },
                ]}/>
              </div>
            </div>

            {!tag && (
              <div>
                <ZoneTag style={{marginBottom:10}}>SUBCATEGORY MODULES</ZoneTag>
                <CatUnderline name={cat} label="शहरांनुसार बातम्या"/>
                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:24}}>
                  {[
                    {city:"मुंबई", h:"मेट्रो लाईन ३ चे काम अंतिम टप्प्यात"},
                    {city:"पुणे", h:"हिंजवडीत आयटी विस्तार योजना मंजूर"},
                    {city:"नागपूर", h:"हिवाळी अधिवेशनाची तयारी सुरू"},
                  ].map(s => (
                    <div key={s.city}>
                      <div className="mr" style={{fontSize:13, fontWeight:700, color:catColor(cat), marginBottom:10, letterSpacing:"0.04em"}}>{s.city}</div>
                      <StandardCard layout="col" category={cat} headline={s.h}/>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!tag && (
              <div>
                <ZoneTag style={{marginBottom:10}}>EVERGREEN STORIES</ZoneTag>
                <CatUnderline name={cat} label="विशेष वाचा"/>
                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:24}}>
                  {[
                    "महाराष्ट्राच्या स्थापनेची पूर्ण कथा: १९६० ते आजपर्यंत",
                    "संयुक्त महाराष्ट्र चळवळ — एका लढ्याची शोधयात्रा",
                    "मराठी अस्मितेची नवी ओळख: संस्कृती, साहित्य, चित्रपट",
                    "महाराष्ट्रातील १० ऐतिहासिक स्थळे जी प्रत्येकाने पाहावी",
                  ].map((h, i) => <StandardCard key={i} layout="col" category={cat} headline={h}/>)}
                </div>
              </div>
            )}

            <div>
              <div className="mr" style={{fontSize:14, fontWeight:700, color:"var(--text-tertiary)", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:14}}>संबंधित विषय · TOPIC CLUSTER</div>
              <div style={{display:"flex", flexWrap:"wrap", gap:10}}>
                {["#मराठा आरक्षण","#जरांगे पाटील","#विधानसभा","#मंत्रिमंडळ","#फडणवीस","#शिंदे","#शेतकरी","#कांदा","#पाऊस","#मुंबई","#पुणे","#नागपूर","#हिवाळी अधिवेशन","#सुप्रीम कोर्ट"].map(t => (
                  <span key={t} className="mr" style={{padding:"8px 14px", background:"var(--brand-primary-light)", color:"var(--brand-primary)", fontSize:14, fontWeight:600, borderRadius:24}}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right 4 */}
          <aside style={{gridColumn:"span 4", display:"flex", flexDirection:"column", gap:24}}>
            <ZoneTag>SIDEBAR · 4-COL</ZoneTag>

            <div style={{position:"relative"}}>
              <Ad id="DC2" name="Desktop Category Sidebar" size="300×600" w={300} h={600} sticky/>
              <div style={{fontSize:10, color:"var(--text-tertiary)", fontFamily:"ui-monospace, monospace", marginTop:6}}>↑ sticky on scroll</div>
            </div>

            <div style={{padding:20, border:"1px solid var(--border-default)"}}>
              <CatUnderline name={cat} label="सर्वाधिक वाचलेले"/>
              <ol style={{listStyle:"none",margin:0,padding:0}}>
                {[
                  "मराठा आरक्षणावर सर्वोच्च न्यायालयाची सुनावणी",
                  "शिवसेनेच्या अधिवेशनात ठाकरेंचे आक्रमक भाषण",
                  "महावितरणच्या वीजबिलात ८% वाढीचा प्रस्ताव",
                  "MPSC परीक्षेचे नवीन वेळापत्रक जाहीर",
                  "गणेशोत्सव परवानगी प्रक्रिया जलद",
                ].map((h, i) => <CompactListItem key={i} n={i+1} headline={h}/>)}
              </ol>
            </div>

            <div style={{padding:20, border:"1px solid var(--border-default)"}}>
              <CatUnderline name={cat} label="नुकतेच अद्यतनित"/>
              <ul style={{listStyle:"none",margin:0,padding:0,display:"flex",flexDirection:"column",gap:14}}>
                {[
                  {t:"६ मि.", h:"विधान परिषद निवडणूक वेळापत्रक"},
                  {t:"१४ मि.", h:"मुंबईत पावसाचा रेड अलर्ट"},
                  {t:"३२ मि.", h:"नागपूरमध्ये जिल्हाधिकारी बदल"},
                  {t:"१ तास", h:"सोलापूर बँक घोटाळा प्रकरणी अटक"},
                ].map((s, i) => (
                  <li key={i} style={{borderBottom:"1px solid var(--border-default)", paddingBottom:14}}>
                    <div style={{fontSize:11, color:"var(--color-live)", fontWeight:700, marginBottom:4, letterSpacing:"0.04em"}}>{s.t} पूर्वी</div>
                    <p className="mr" style={{margin:0, fontSize:14, fontWeight:600, lineHeight:1.4}}>{s.h}</p>
                  </li>
                ))}
              </ul>
            </div>

            <Newsletter/>
          </aside>
        </div>
      </div>

      <Footer/>
    </div>
  );
}

window.MobileCategory = MobileCategory;
window.DesktopCategory = DesktopCategory;
