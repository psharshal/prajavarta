// 5.2.1 Mobile Article Page — 375px
function MobileArticle() {
  return (
    <div style={{ width: 375, background: "#fff", fontFamily: "var(--font-en)" }}>
      <MobileHeader/>
      <BreakingStrip/>

      {/* ZONE 1: Above the fold */}
      <div style={{padding:"16px"}}>
        <ZoneTag>ZONE 1 · ABOVE THE FOLD</ZoneTag>

        {/* Breadcrumb */}
        <div className="mr" style={{fontSize:12, color:"var(--text-tertiary)", margin:"12px 0"}}>
          मुख्यपृष्ठ <span style={{margin:"0 6px"}}>›</span> महाराष्ट्र <span style={{margin:"0 6px"}}>›</span> राजकारण
        </div>

        <CatChip name="राजकारण"/>

        <h1 className="mr" style={{
          margin: "12px 0 12px", fontSize: 28, lineHeight: 1.3, fontWeight: 800,
          letterSpacing: "-0.01em", color: "var(--text-primary)",
        }}>विधानसभेत सत्तासंघर्ष: सरकार स्थापनेच्या हालचालींना वेग, दिल्लीत रात्री बैठक</h1>

        <p className="mr" style={{margin:"0 0 16px", fontSize:18, lineHeight:1.45, color:"var(--text-secondary)", fontWeight:500}}>
          राज्यपाल भेट उद्या सकाळी; नवीन मंत्रिमंडळाची संभाव्य रचना समोर, फडणवीस आणि शिंदेंमध्ये सहमती जवळपास अंतिम
        </p>

        {/* Author byline */}
        <div style={{display:"flex",alignItems:"center",gap:12, padding:"12px 0", borderTop:"1px solid var(--border-default)", borderBottom:"1px solid var(--border-default)"}}>
          <div style={{width:40,height:40,borderRadius:"50%",background:"var(--brand-primary-light)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700, color:"var(--brand-primary)", fontSize:14}}>SD</div>
          <div style={{flex:1}}>
            <div className="mr" style={{fontSize:13, fontWeight:600}}>सुनील देशमुख</div>
            <div className="mr" style={{fontSize:11, color:"var(--text-tertiary)"}}>राजकीय संपादक · २९ एप्रिल २०२६, ०७:४५ · ६ मिनिटे वाचन</div>
          </div>
        </div>

        {/* Social share */}
        <div style={{display:"flex",gap:8, marginTop:16, marginBottom:16}}>
          {[
            {i: <Whatsapp/>, c: "#25D366", l: "WhatsApp"},
            {i: <Fb/>, c: "#1877F2", l: "Facebook"},
            {i: <Tw/>, c: "#000", l: "X"},
            {i: <Link/>, c: "#6B6B6B", l: "Copy"},
          ].map((b, i) => (
            <button key={i} style={{
              flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:6,
              padding:"10px 8px", background:"#fff", border:`1px solid ${b.c}`, color: b.c,
              fontSize: 11, fontWeight:600, borderRadius:3,
            }}>{b.i} <span style={{fontSize:10}}>{b.l}</span></button>
          ))}
        </div>

        {/* Hero image */}
        <ImgPh ratio="16/9" label="article hero · 1200×675"/>
        <p className="mr" style={{margin:"8px 0 0", fontSize:12, color:"var(--text-tertiary)", lineHeight:1.5}}>
          फोटो: मंत्रालयाबाहेर पत्रकारांशी संवाद साधताना मुख्यमंत्री · PTI
        </p>

        {/* Ad A1 */}
        <div style={{margin:"24px 0"}}>
          <Ad id="A1" name="Mobile Article Below Hero Image" size="300×250" h={250}/>
        </div>
      </div>

      {/* ZONE 2: Body */}
      <div style={{padding:"0 16px"}}>
        <ZoneTag>ZONE 2 · ARTICLE BODY</ZoneTag>

        <p className="mr" style={{fontSize:17, lineHeight:1.7, color:"var(--text-primary)", marginTop:16}}>
          मुंबई: राज्यातील सत्तासंघर्षाला नवे वळण मिळाले असून, सरकार स्थापनेच्या हालचालींना वेग आला आहे. सोमवारी रात्री दिल्लीत झालेल्या उच्चस्तरीय बैठकीनंतर नवीन मंत्रिमंडळाची रचना जवळपास अंतिम झाल्याचे सांगण्यात येत आहे.
        </p>
        <p className="mr" style={{fontSize:17, lineHeight:1.7, color:"var(--text-primary)", marginTop:16}}>
          राज्यपाल भेटीची तारीख उद्या सकाळी निश्चित झाली असून, मुख्यमंत्रीपदाच्या उमेदवारीवरून शिवसेना आणि भाजपमध्ये काल रात्री उशिरापर्यंत चर्चा सुरू होती.
        </p>

        {/* Ad A2 */}
        <div style={{margin:"24px 0"}}>
          <Ad id="A2" name="Mobile Article After P2" size="300×250" h={250}/>
        </div>

        {/* Key Takeaways */}
        <div style={{borderLeft:"3px solid var(--brand-accent)", padding:"16px 16px 16px 16px", background:"var(--surface-secondary)", margin:"8px 0 24px"}}>
          <div className="mr" style={{fontSize:13, fontWeight:700, color:"var(--brand-primary)", marginBottom:10, letterSpacing:"0.02em"}}>मुख्य मुद्दे</div>
          <ol className="mr" style={{margin:0, paddingLeft:20, fontSize:14, lineHeight:1.7, color:"var(--text-primary)"}}>
            <li>दिल्लीत रात्री ११ वाजेपर्यंत बैठक, मंत्रिमंडळाची रचना अंतिम</li>
            <li>राज्यपाल भेट उद्या सकाळी १० वाजता निश्चित</li>
            <li>उपमुख्यमंत्रीपदी दोन नावे, अंतिम घोषणा शपथविधी दिवशी</li>
          </ol>
        </div>

        <p className="mr" style={{fontSize:17, lineHeight:1.7, color:"var(--text-primary)"}}>
          सूत्रांच्या माहितीनुसार, बैठकीला केंद्रीय गृहमंत्री, पक्षाध्यक्ष आणि राज्यातील वरिष्ठ नेते उपस्थित होते. मंत्रालयांचे वाटप आणि उपमुख्यमंत्रीपदावरून बराच वेळ चर्चा रंगली.
        </p>
        <p className="mr" style={{fontSize:17, lineHeight:1.7, color:"var(--text-primary)", marginTop:16}}>
          महायुतीच्या प्रवक्त्यांनी दिलेल्या माहितीनुसार, शपथविधी सोहळा वानखेडे स्टेडियमवर होणार असून, पंतप्रधान आणि अनेक केंद्रीय मंत्र्यांच्या उपस्थितीची शक्यता आहे.
        </p>

        {/* Inline image */}
        <figure style={{margin:"20px -16px"}}>
          <ImgPh ratio="16/9" label="inline image · full bleed · 1200px+"/>
          <figcaption className="mr" style={{padding:"8px 16px 0", fontSize:12, color:"var(--text-tertiary)"}}>नागपूर येथील पक्षीय बैठकीचे संग्रहित छायाचित्र · ANI</figcaption>
        </figure>

        <p className="mr" style={{fontSize:17, lineHeight:1.7, color:"var(--text-primary)", marginTop:16}}>
          विरोधी पक्षांनी या निर्णयप्रक्रियेवर टीका केली असून, "लोकशाही प्रक्रिया दिल्लीतून चालवली जाते" असा आरोप शिवसेना (UBT) आणि काँग्रेसने केला आहे.
        </p>

        {/* Inline Related */}
        <div style={{margin:"20px 0", padding:"12px", border:"1px solid var(--border-default)", borderLeft:"3px solid var(--brand-primary)"}}>
          <div style={{fontSize:10, fontWeight:700, color:"var(--brand-primary)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6}}>संबंधित बातमी</div>
          <p className="mr" style={{margin:0, fontSize:15, fontWeight:600, lineHeight:1.4, color:"var(--text-primary)"}}>
            शपथविधीसाठी वानखेडेची तयारी सुरू, ५०,००० निमंत्रितांची व्यवस्था →
          </p>
        </div>

        <p className="mr" style={{fontSize:17, lineHeight:1.7, color:"var(--text-primary)"}}>
          दरम्यान, विधानभवनाच्या सुरक्षा व्यवस्थेत वाढ करण्यात आली असून, मंत्रालय परिसरात पोलिस बंदोबस्त लावण्यात आला आहे.
        </p>
        <p className="mr" style={{fontSize:17, lineHeight:1.7, color:"var(--text-primary)", marginTop:16}}>
          राज्यपाल कार्यालयाने अद्याप अधिकृत निवेदन दिले नसले तरी, उद्या सकाळी १० वाजता भेटीसाठी वेळ मिळाल्याचे विश्वसनीय सूत्रांकडून समजते.
        </p>

        {/* Ad A3 */}
        <div style={{margin:"24px 0"}}>
          <Ad id="A3" name="Mobile Article After P7-8 (600w+)" size="300×250 / Native" h={250}/>
        </div>

        <p className="mr" style={{fontSize:17, lineHeight:1.7, color:"var(--text-primary)"}}>
          आर्थिक आणि गृह खात्यांच्या वाटपावर सर्वाधिक चर्चा रंगली. महिला व बाल विकास, शिक्षण आणि कृषी ही खाती मित्रपक्षांकडे जाण्याची शक्यता आहे.
        </p>
      </div>

      {/* ZONE 3 */}
      <div style={{padding:"24px 16px 0"}}>
        <ZoneTag>ZONE 3 · BELOW BODY</ZoneTag>

        {/* Tags */}
        <div style={{margin:"16px 0", display:"flex", gap:8, overflowX:"auto"}} className="no-scrollbar">
          {["#विधानसभा","#सरकार","#मंत्रिमंडळ","#फडणवीस","#शिंदे","#राजकारण","#महायुती"].map(t => (
            <span key={t} className="mr" style={{flexShrink:0, padding:"6px 12px", border:"1px solid var(--border-default)", borderRadius:20, fontSize:12, color:"var(--text-secondary)"}}>{t}</span>
          ))}
        </div>

        {/* Author bio */}
        <div style={{padding:16, background:"var(--surface-secondary)", display:"flex",gap:12, marginBottom:24}}>
          <div style={{width:56,height:56,borderRadius:"50%",background:"var(--brand-primary-light)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:"var(--brand-primary)",fontSize:18,flexShrink:0}}>SD</div>
          <div>
            <div className="mr" style={{fontSize:14, fontWeight:700}}>सुनील देशमुख · राजकीय संपादक</div>
            <p className="mr" style={{margin:"6px 0 8px", fontSize:13, lineHeight:1.6, color:"var(--text-secondary)"}}>
              १८ वर्षांचा राजकीय पत्रकारिता अनुभव. महाराष्ट्राच्या राजकीय पटलावरील घडामोडींचे विश्लेषण.
            </p>
            <div style={{display:"flex",gap:10, fontSize:12, color:"var(--brand-primary)"}}>
              <span>Twitter</span><span>·</span><span>Email</span>
            </div>
          </div>
        </div>

        {/* Ad A4 */}
        <div style={{marginBottom:24}}>
          <Ad id="A4" name="Mobile Article Before Related" size="Multiplex / Native" h={320}/>
        </div>

        {/* Related */}
        <CatUnderline name="Maharashtra" label="संबंधित बातम्या"/>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {[
            {c:"राजकारण", h:"शपथविधीसाठी वानखेडेची तयारी सुरू, ५०,००० निमंत्रितांची व्यवस्था"},
            {c:"राजकारण", h:"मुख्यमंत्रीपदावरून शिवसेना-भाजपमध्ये बंद दाराआड चर्चा"},
            {c:"महाराष्ट्र", h:"विधानसभा सत्ताबदलाचा अर्थव्यवस्थेवर काय परिणाम होईल?"},
            {c:"राजकारण", h:"विरोधी पक्षनेतेपदासाठी ठाकरे-काँग्रेसमधील रस्सीखेच कायम"},
            {c:"पुणे", h:"पुण्यातील आमदारांना मंत्रिमंडळात स्थान मिळणार का?"},
            {c:"राजकारण", h:"मंत्रिमंडळ विस्ताराचे संभाव्य चेहरे: संपूर्ण यादी"},
          ].map((s, i) => <StandardCard key={i} category={s.c} headline={s.h}/>)}
        </div>

        <div style={{marginTop:32}}>
          <TrendingModule items={[
            { c:"क्रीडा", h:"रोहित शर्मा कसोटी संघातून निवृत्त" },
            { c:"व्यवसाय", h:"रिलायन्सच्या तिमाही नफ्यात १८% वाढ" },
            { c:"मनोरंजन", h:"रितेश देशमुखचा 'राजा शिवछत्रपती' दिवाळीला" },
            { c:"महाराष्ट्र", h:"मराठवाड्यात अवकाळी पावसाचा कहर" },
            { c:"पुणे", h:"पुणे मेट्रोच्या तिसऱ्या टप्प्याचे काम सुरू" },
          ]}/>
        </div>
      </div>

      <MobileFooter/>

      {/* A5 sticky anchor */}
      <div style={{position:"sticky", bottom:0, padding:8, background:"#fff", borderTop:"1px solid var(--border-default)", boxShadow:"0 -2px 8px rgba(0,0,0,0.05)"}}>
        <Ad id="A5" name="Mobile Article Bottom Anchor" size="320×50" w={320} h={50} sticky style={{margin:"0 auto"}}/>
      </div>
    </div>
  );
}

window.MobileArticle = MobileArticle;
