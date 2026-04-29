// 5.2.2 Desktop Article Page — 1440px
function DesktopArticle() {
  return (
    <div style={{ width: 1440, background: "#fff", fontFamily: "var(--font-en)" }}>
      <DesktopHeader/>
      <BreakingStrip/>

      {/* DA1 */}
      <div style={{display:"flex",justifyContent:"center",padding:"24px 32px", background:"var(--surface-secondary)"}}>
        <Ad id="DA1" name="Desktop Article Top Billboard" size="970×250" w={970} h={250}/>
      </div>

      {/* Main 8+4 */}
      <div style={{maxWidth:1440, margin:"0 auto", padding:"40px 32px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(12, 1fr)", gap:32}}>

          {/* Left: 8 cols, content capped 680px */}
          <article style={{gridColumn:"span 8"}}>
            <ZoneTag style={{marginBottom:16}}>ARTICLE COLUMN · 8-COL · TEXT CAPPED 680PX</ZoneTag>

            <div style={{maxWidth:680}}>
              <div className="mr" style={{fontSize:13, color:"var(--text-tertiary)", marginBottom:16}}>
                मुख्यपृष्ठ <span style={{margin:"0 6px"}}>›</span> महाराष्ट्र <span style={{margin:"0 6px"}}>›</span> राजकारण
              </div>

              <CatChip name="राजकारण"/>

              <h1 className="mr" style={{
                margin:"16px 0 16px", fontSize: 38, lineHeight: 1.2, fontWeight: 800,
                letterSpacing: "-0.015em", color: "var(--text-primary)",
              }}>विधानसभेत सत्तासंघर्ष: सरकार स्थापनेच्या हालचालींना वेग, दिल्लीत रात्री बैठक</h1>

              <p className="mr" style={{margin:"0 0 24px", fontSize:20, lineHeight:1.45, color:"var(--text-secondary)", fontWeight:500}}>
                राज्यपाल भेट उद्या सकाळी; नवीन मंत्रिमंडळाची संभाव्य रचना समोर, फडणवीस आणि शिंदेंमध्ये सहमती जवळपास अंतिम
              </p>

              <div style={{display:"flex",alignItems:"center",gap:14, padding:"16px 0", borderTop:"1px solid var(--border-default)", borderBottom:"1px solid var(--border-default)", marginBottom:24}}>
                <div style={{width:56,height:56,borderRadius:"50%",background:"var(--brand-primary-light)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:"var(--brand-primary)",fontSize:18}}>SD</div>
                <div style={{flex:1}}>
                  <div className="mr" style={{fontSize:15, fontWeight:600}}>सुनील देशमुख <span style={{color:"var(--text-tertiary)",fontWeight:400}}>· राजकीय संपादक</span></div>
                  <div className="mr" style={{fontSize:13, color:"var(--text-tertiary)", marginTop:2}}>प्रकाशित: २९ एप्रिल २०२६, ०७:४५ · अद्यतनित: ०९:१५ · ६ मिनिटे वाचन</div>
                </div>
                <button style={{padding:"8px 14px", background:"#fff", border:"1px solid var(--border-strong)", fontSize:12, fontWeight:600, cursor:"pointer"}}>Save</button>
              </div>
            </div>

            {/* Hero image - full 8-col */}
            <ImgPh ratio="16/9" label="article hero · full 8-col · 1200px+"/>
            <p className="mr" style={{margin:"10px 0 24px", fontSize:13, color:"var(--text-tertiary)"}}>फोटो: मंत्रालयाबाहेर पत्रकारांशी संवाद साधताना मुख्यमंत्री · PTI</p>

            <div style={{maxWidth:680}}>
              <p className="mr" style={{fontSize:18, lineHeight:1.7, color:"var(--text-primary)", marginTop:0}}>
                मुंबई: राज्यातील सत्तासंघर्षाला नवे वळण मिळाले असून, सरकार स्थापनेच्या हालचालींना वेग आला आहे. सोमवारी रात्री दिल्लीत झालेल्या उच्चस्तरीय बैठकीनंतर नवीन मंत्रिमंडळाची रचना जवळपास अंतिम झाल्याचे सांगण्यात येत आहे.
              </p>
              <p className="mr" style={{fontSize:18, lineHeight:1.7, color:"var(--text-primary)", marginTop:16}}>
                राज्यपाल भेटीची तारीख उद्या सकाळी निश्चित झाली असून, मुख्यमंत्रीपदाच्या उमेदवारीवरून शिवसेना आणि भाजपमध्ये काल रात्री उशिरापर्यंत चर्चा सुरू होती.
              </p>
              <p className="mr" style={{fontSize:18, lineHeight:1.7, color:"var(--text-primary)", marginTop:16}}>
                सूत्रांच्या माहितीनुसार, बैठकीला केंद्रीय गृहमंत्री, पक्षाध्यक्ष आणि राज्यातील वरिष्ठ नेते उपस्थित होते. मंत्रालयांचे वाटप आणि उपमुख्यमंत्रीपदावरून बराच वेळ चर्चा रंगली.
              </p>

              {/* DA3 — after paragraph 3 */}
              <div style={{margin:"32px 0", display:"flex", justifyContent:"center"}}>
                <Ad id="DA3" name="Desktop Article After P3" size="300×250" w={300} h={250}/>
              </div>

              <p className="mr" style={{fontSize:18, lineHeight:1.7, color:"var(--text-primary)"}}>
                महायुतीच्या प्रवक्त्यांनी दिलेल्या माहितीनुसार, शपथविधी सोहळा वानखेडे स्टेडियमवर होणार असून, पंतप्रधान आणि अनेक केंद्रीय मंत्र्यांच्या उपस्थितीची शक्यता आहे.
              </p>

              {/* Pull quote */}
              <blockquote style={{margin:"24px 0", padding:"0 0 0 24px", borderLeft:"4px solid var(--brand-accent)"}}>
                <p className="mr" style={{margin:0, fontSize:24, lineHeight:1.4, fontWeight:600, color:"var(--text-primary)", fontStyle:"normal"}}>
                  "लोकशाही प्रक्रिया दिल्लीतून चालवली जात आहे — महाराष्ट्राचा निर्णय मुंबईत व्हायला हवा."
                </p>
                <cite className="mr" style={{display:"block", marginTop:8, fontSize:13, color:"var(--text-tertiary)", fontStyle:"normal"}}>— उद्धव ठाकरे, शिवसेना (UBT)</cite>
              </blockquote>

              <p className="mr" style={{fontSize:18, lineHeight:1.7, color:"var(--text-primary)"}}>
                विरोधी पक्षांनी या निर्णयप्रक्रियेवर टीका केली असून, "लोकशाही प्रक्रिया दिल्लीतून चालवली जाते" असा आरोप शिवसेना (UBT) आणि काँग्रेसने केला आहे.
              </p>
              <p className="mr" style={{fontSize:18, lineHeight:1.7, color:"var(--text-primary)", marginTop:16}}>
                दरम्यान, विधानभवनाच्या सुरक्षा व्यवस्थेत वाढ करण्यात आली असून, मंत्रालय परिसरात पोलिस बंदोबस्त लावण्यात आला आहे.
              </p>
              <p className="mr" style={{fontSize:18, lineHeight:1.7, color:"var(--text-primary)", marginTop:16}}>
                राज्यपाल कार्यालयाने अद्याप अधिकृत निवेदन दिले नसले तरी, उद्या सकाळी १० वाजता भेटीसाठी वेळ मिळाल्याचे विश्वसनीय सूत्रांकडून समजते.
              </p>

              {/* DA4 — after paragraph 9 */}
              <div style={{margin:"32px 0", display:"flex", justifyContent:"center"}}>
                <Ad id="DA4" name="Desktop Article After P9" size="300×250" w={300} h={250}/>
              </div>

              <p className="mr" style={{fontSize:18, lineHeight:1.7, color:"var(--text-primary)"}}>
                आर्थिक आणि गृह खात्यांच्या वाटपावर सर्वाधिक चर्चा रंगली. महिला व बाल विकास, शिक्षण आणि कृषी ही खाती मित्रपक्षांकडे जाण्याची शक्यता आहे.
              </p>

              {/* Tags */}
              <div style={{margin:"32px 0 24px", display:"flex", gap:8, flexWrap:"wrap"}}>
                {["#विधानसभा","#सरकार","#मंत्रिमंडळ","#फडणवीस","#शिंदे","#राजकारण","#महायुती"].map(t => (
                  <span key={t} className="mr" style={{padding:"6px 14px", border:"1px solid var(--border-default)", borderRadius:20, fontSize:13, color:"var(--text-secondary)"}}>{t}</span>
                ))}
              </div>

              {/* Author bio expanded */}
              <div style={{padding:24, background:"var(--surface-secondary)", display:"flex",gap:20, marginBottom:32}}>
                <div style={{width:80,height:80,borderRadius:"50%",background:"var(--brand-primary-light)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:"var(--brand-primary)",fontSize:24,flexShrink:0}}>SD</div>
                <div>
                  <div className="mr" style={{fontSize:18, fontWeight:700}}>सुनील देशमुख</div>
                  <div className="mr" style={{fontSize:13, color:"var(--text-tertiary)", marginBottom:8}}>राजकीय संपादक · १८ वर्षांचा अनुभव</div>
                  <p className="mr" style={{margin:"0 0 12px", fontSize:14, lineHeight:1.7, color:"var(--text-secondary)"}}>
                    महाराष्ट्राच्या राजकीय पटलावरील घडामोडींचे विश्लेषण. लोकमत, सकाळ आणि महाराष्ट्र टाइम्ससाठी काम केले आहे. राज्यशास्त्रात पुणे विद्यापीठातून पदव्युत्तर पदवी.
                  </p>
                  <div style={{display:"flex",gap:14, fontSize:13, color:"var(--brand-primary)", fontWeight:600}}>
                    <span>Twitter</span><span>LinkedIn</span><span>Email</span><span>All articles →</span>
                  </div>
                </div>
              </div>
            </div>

            {/* DA5 */}
            <div style={{marginBottom:32}}>
              <Ad id="DA5" name="Desktop Article Before Recommendations" size="Responsive Native" h={140}/>
            </div>

            {/* Related stories 3-col */}
            <CatUnderline name="Maharashtra" label="संबंधित बातम्या"/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:24, marginBottom:40}}>
              {[
                {c:"राजकारण", h:"शपथविधीसाठी वानखेडेची तयारी सुरू, ५०,००० निमंत्रितांची व्यवस्था"},
                {c:"राजकारण", h:"मुख्यमंत्रीपदावरून शिवसेना-भाजपमध्ये बंद दाराआड चर्चा"},
                {c:"महाराष्ट्र", h:"विधानसभा सत्ताबदलाचा अर्थव्यवस्थेवर काय परिणाम होईल?"},
                {c:"राजकारण", h:"विरोधी पक्षनेतेपदासाठी ठाकरे-काँग्रेसमधील रस्सीखेच"},
                {c:"पुणे", h:"पुण्यातील आमदारांना मंत्रिमंडळात स्थान मिळणार का?"},
                {c:"राजकारण", h:"मंत्रिमंडळ विस्ताराचे संभाव्य चेहरे: संपूर्ण यादी"},
              ].map((s, i) => <StandardCard key={i} layout="col" category={s.c} headline={s.h}/>)}
            </div>

            <TrendingModule items={[
              { c:"क्रीडा", h:"रोहित शर्मा कसोटी संघातून निवृत्त" },
              { c:"व्यवसाय", h:"रिलायन्सच्या तिमाही नफ्यात १८% वाढ" },
              { c:"मनोरंजन", h:"रितेश देशमुखचा 'राजा शिवछत्रपती' दिवाळीला" },
              { c:"महाराष्ट्र", h:"मराठवाड्यात अवकाळी पावसाचा कहर" },
              { c:"पुणे", h:"पुणे मेट्रोच्या तिसऱ्या टप्प्याचे काम सुरू" },
            ]}/>
          </article>

          {/* Right sidebar 4-col */}
          <aside style={{gridColumn:"span 4", display:"flex",flexDirection:"column",gap:24}}>
            <ZoneTag>SIDEBAR · 4-COL</ZoneTag>

            {/* Sticky social rail */}
            <div style={{padding:16, border:"1px solid var(--border-default)", display:"flex", alignItems:"center", gap:14}}>
              <div style={{fontSize:11, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:"var(--text-tertiary)"}}>Share</div>
              {[<Whatsapp size={18}/>,<Fb size={18}/>,<Tw size={18}/>,<Link size={18}/>].map((i, k) => (
                <button key={k} style={{width:36, height:36, border:"1px solid var(--border-default)", background:"#fff", display:"flex",alignItems:"center",justifyContent:"center", cursor:"pointer", color:"var(--text-secondary)"}}>{i}</button>
              ))}
            </div>

            <div style={{position:"relative"}}>
              <Ad id="DA2" name="Desktop Article Sidebar" size="300×600" w={300} h={600} sticky/>
              <div style={{fontSize:10, color:"var(--text-tertiary)", fontFamily:"ui-monospace, monospace", marginTop:6}}>↑ sticks at viewport top during scroll</div>
            </div>

            <div style={{padding:20, border:"1px solid var(--border-default)"}}>
              <CatUnderline name="Maharashtra" label="मिनी ट्रेंडिंग"/>
              <ol style={{listStyle:"none",margin:0,padding:0}}>
                {[
                  "मनोज जरांगे पाटील आज औरंगाबादेत उपोषणाला बसणार",
                  "गणेशोत्सव २०२६ साठी मंडळांची तयारी सुरू",
                  "नवीन MPSC परीक्षा वेळापत्रक जाहीर",
                  "महावितरणच्या वीजबिलात ८% वाढीचा प्रस्ताव",
                  "ठाकरे गटाच्या अधिवेशनाची तारीख निश्चित",
                ].map((h, i) => <CompactListItem key={i} n={i+1} headline={h}/>)}
              </ol>
            </div>

            <div style={{padding:20, border:"1px solid var(--border-default)"}}>
              <CatUnderline name="Politics" label="सर्वाधिक वाचलेले"/>
              <ul style={{listStyle:"none",margin:0,padding:0,display:"flex",flexDirection:"column",gap:14}}>
                {[
                  "मंत्रिमंडळ विस्ताराचे संभाव्य चेहरे: संपूर्ण यादी",
                  "महायुतीच्या जागावाटपात अंतिम गठित कोणाला?",
                  "उपमुख्यमंत्रीपदाची शर्यत: ३ नावांची चर्चा",
                  "मराठा आरक्षणावर सर्वोच्च न्यायालयाची सुनावणी",
                ].map((h, i) => (
                  <li key={i} className="mr" style={{fontSize:14, lineHeight:1.45, color:"var(--text-primary)", borderBottom:"1px solid var(--border-default)", paddingBottom:14, fontWeight:500}}>{h}</li>
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

window.DesktopArticle = DesktopArticle;
