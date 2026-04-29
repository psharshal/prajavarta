// 5.1.2 Desktop Homepage — 1440px
function DesktopHomepage() {
  return (
    <div style={{ width: 1440, background: "var(--surface-primary)", fontFamily: "var(--font-en)" }}>
      <DesktopHeader/>
      <BreakingStrip/>

      {/* DH1 - top billboard */}
      <div style={{display:"flex",justifyContent:"center",padding:"24px 32px", background:"var(--surface-secondary)"}}>
        <Ad id="DH1" name="Desktop Homepage Top Billboard" size="970×250" w={970} h={250}/>
      </div>

      {/* Main grid 8+4 */}
      <div style={{maxWidth:1440, margin:"0 auto", padding:"32px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(12, 1fr)", gap:24}}>

          {/* Left 8 cols */}
          <div style={{gridColumn:"span 8", display:"flex",flexDirection:"column", gap:32}}>
            <div>
              <ZoneTag style={{marginBottom:10}}>HERO STORY · 8-COL</ZoneTag>
              <HeroCard category="महाराष्ट्र" headline="विधानसभेत सत्तासंघर्ष: सरकार स्थापनेच्या हालचालींना वेग, दिल्लीत रात्री बैठक" subtitle="राज्यपाल भेट उद्या सकाळी; नवीन मंत्रिमंडळाची संभाव्य रचना समोर"/>
            </div>

            <div>
              <ZoneTag style={{marginBottom:10}}>SECONDARY STORIES · 2 COLS</ZoneTag>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr", gap:24}}>
                <StandardCard layout="col" category="राजकारण" headline="मुख्यमंत्र्यांच्या शपथविधीसाठी वानखेडेवर भव्य कार्यक्रम होणार" badge="LIVE"/>
                <StandardCard layout="col" category="पुणे" headline="पुणे महानगरपालिकेच्या अर्थसंकल्पात पाणीपुरवठा योजनेला प्राधान्य"/>
              </div>
            </div>

            <div>
              <ZoneTag style={{marginBottom:10}}>TRENDING MODULE</ZoneTag>
              <div style={{background:"var(--surface-secondary)", padding:24}}>
                <TrendingModule items={[
                  { c: "राजकारण", h: "अजित पवार गटाची आज महत्त्वाची बैठक, मंत्रिपदाच्या मुद्द्यावर चर्चा" },
                  { c: "क्रीडा", h: "रोहित शर्मा कसोटी संघातून निवृत्त; मुंबईकरांचा भावूक निरोप" },
                  { c: "व्यवसाय", h: "रिलायन्सच्या तिमाही नफ्यात १८% वाढ, शेअर बाजार उसळला" },
                  { c: "मनोरंजन", h: "रितेश देशमुखचा 'राजा शिवछत्रपती' चित्रपट दिवाळीला प्रदर्शित" },
                  { c: "महाराष्ट्र", h: "मराठवाड्यात अवकाळी पावसाचा कहर, १२ जिल्ह्यांत पीकहानी" },
                ]}/>
              </div>
            </div>

            {/* DH3 */}
            <div style={{display:"flex",justifyContent:"center"}}>
              <Ad id="DH3" name="Desktop Between Categories" size="728×90" w={728} h={90}/>
            </div>

            <DCategoryBlock cat="महाराष्ट्र"/>
            <DCategoryBlock cat="पुणे"/>
            <DCategoryBlock cat="राजकारण"/>
            <DCategoryBlock cat="गुन्हेगारी"/>
            <DCategoryBlock cat="क्रीडा"/>
            <DCategoryBlock cat="व्यवसाय"/>

            <div>
              <ZoneTag style={{marginBottom:10}}>RECOMMENDED · 3-COL × 2 ROW</ZoneTag>
              <CatUnderline name="Maharashtra" label="तुमच्यासाठी निवडक"/>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:24}}>
                {[
                  { c: "मनोरंजन", h: "मराठी रंगभूमीचा ७५ वा वर्धापनदिन: 'नटसम्राट' पुनःप्रदर्शन" },
                  { c: "व्यवसाय", h: "टाटा मोटर्सच्या इलेक्ट्रिक एसयूव्हीचे अनावरण, बुकिंग सुरू" },
                  { c: "महाराष्ट्र", h: "कोकणात पावसाने सरासरी ओलांडली, शेतकऱ्यांना दिलासा" },
                  { c: "पुणे", h: "पुणे विद्यापीठात नवीन AI संशोधन केंद्र सुरू होणार" },
                  { c: "राजकारण", h: "मनसेच्या अधिवेशनात राज ठाकरे यांचे आक्रमक भाषण" },
                  { c: "क्रीडा", h: "महाराष्ट्र केसरी कुस्ती स्पर्धेला कोल्हापुरात सुरुवात" },
                ].map((s, i) => <StandardCard key={i} layout="col" category={s.c} headline={s.h}/>)}
              </div>
            </div>
          </div>

          {/* Right 4 cols sidebar */}
          <aside style={{gridColumn:"span 4", display:"flex",flexDirection:"column",gap:24}}>
            <ZoneTag>SIDEBAR · 4-COL</ZoneTag>

            <div style={{position:"relative"}}>
              <Ad id="DH2" name="Desktop Sidebar Top" size="300×600" w={300} h={600} sticky/>
              <div style={{fontSize:10, color:"var(--text-tertiary)", fontFamily:"ui-monospace, monospace", marginTop:6}}>↑ sticks at viewport top while scrolling</div>
            </div>

            <div style={{padding:20, border:"1px solid var(--border-default)"}}>
              <CatUnderline name="Maharashtra" label="मिनी ट्रेंडिंग"/>
              <ol style={{listStyle:"none",margin:0,padding:0}}>
                {[
                  "मनोज जरांगे पाटील आज औरंगाबादेत उपोषणाला बसणार",
                  "गणेशोत्सव २०२६ साठी मंडळांची तयारी सुरू, परवानग्या जलद",
                  "नवीन MPSC परीक्षा वेळापत्रक जाहीर, मे महिन्यात मुख्य परीक्षा",
                  "शिवसेना (UBT) विजय सत्रात ठाकरेंचे आक्रमक भाषण",
                  "महावितरणच्या वीजबिलात ८% वाढीचा प्रस्ताव",
                ].map((h, i) => <CompactListItem key={i} n={i+1} headline={h}/>)}
              </ol>
            </div>

            <Newsletter/>

            <div style={{padding:20, border:"1px solid var(--border-default)"}}>
              <CatUnderline name="Pune" label="पुण्यातील अद्यतन"/>
              <ul style={{listStyle:"none",margin:0,padding:0,display:"flex",flexDirection:"column",gap:12}}>
                {[
                  "हिंजवडीत वाहतूककोंडी कमी करण्यासाठी नवा फ्लायओव्हर मंजूर",
                  "पुणे विमानतळावर तीन नवीन आंतरराष्ट्रीय उड्डाणे सुरू",
                  "कात्रज-कोंढवा रस्त्याचे काम मार्चपर्यंत पूर्ण",
                ].map((h, i) => (
                  <li key={i} className="mr" style={{fontSize:14, lineHeight:1.4, color:"var(--text-primary)", borderBottom:"1px solid var(--border-default)", paddingBottom:12}}>{h}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* DH4 */}
      <div style={{maxWidth:1440, margin:"0 auto", padding:"24px 32px"}}>
        <Ad id="DH4" name="Desktop Before Footer" size="Responsive Native" h={140}/>
      </div>

      <Footer/>
    </div>
  );
}

function DCategoryBlock({ cat }) {
  const data = {
    "महाराष्ट्र": {
      hero: "राज्यात कांद्याच्या भावात मोठी घसरण, शेतकऱ्यांचे आंदोलन सुरू",
      stories: [
        "नागपूर हिवाळी अधिवेशनाची तारीख निश्चित, १६ डिसेंबरपासून सुरुवात",
        "औरंगाबाद नामांतराचा वाद पुन्हा चर्चेत, सुप्रीम कोर्टात सुनावणी",
        "नाशिकमध्ये द्राक्ष निर्यातीत २०% घट, युरोपीय निर्बंधांचा परिणाम",
      ],
    },
    "पुणे": {
      hero: "पुण्यात मेट्रोच्या तिसऱ्या टप्प्याचे काम सुरू, २०२८ पर्यंत पूर्णत्वाचे लक्ष्य",
      stories: [
        "हिंजवडी आयटी हब विस्ताराला राज्य सरकारची मंजुरी",
        "पीएमपीच्या ३०० नवीन ई-बस ताफ्यात येणार",
        "कोरेगाव पार्क परिसरात रस्ते दुरुस्ती पूर्ण",
      ],
    },
    "राजकारण": {
      hero: "विरोधी पक्षनेतेपदावरून ठाकरे आणि काँग्रेसमध्ये रस्सीखेच",
      stories: [
        "लोकसभेत अध्यक्षपदासाठी इंडिया आघाडीची रणनीती ठरली",
        "एनसीपी शरद पवार गटाच्या प्रदेशाध्यक्षपदी सुनील तटकरे",
        "भाजप प्रदेशाध्यक्षपदी फडणवीसांची फेरनियुक्ती निश्चित",
      ],
    },
    "गुन्हेगारी": {
      hero: "कुख्यात तस्कर ललित पाटीलला मुंबई पोलिसांनी अटक केली",
      stories: [
        "ठाण्यात सायबर फसवणुकीची ४.२ कोटींची तक्रार दाखल",
        "नाशिकमध्ये अंमली पदार्थ तस्करीचा भांडाफोड, ५ अटक",
        "मुंबईत खंडणी प्रकरणी निवृत्त अधिकाऱ्यावर गुन्हा",
      ],
    },
    "क्रीडा": {
      hero: "मुंबई इंडियन्सच्या नव्या प्रशिक्षकपदी महेंद्रसिंग धोनीच्या नावाची चर्चा",
      stories: [
        "विश्वचषक हॉकी स्पर्धेसाठी भारतीय संघाची घोषणा",
        "पीव्ही सिंधू ऑस्ट्रेलियन ओपनच्या उपांत्य फेरीत दाखल",
        "रणजी ट्रॉफीत मुंबईचा सलग दुसरा विजय",
      ],
    },
    "व्यवसाय": {
      hero: "सेन्सेक्सने ऐतिहासिक ८०,००० चा टप्पा ओलांडला, बाजारात तेजी",
      stories: [
        "रिलायन्सच्या तिमाही नफ्यात १८% वाढ",
        "GST संकलनात फेब्रुवारीत १२% वाढ",
        "Infosys ने ३,५०० नव्या भरतीची घोषणा केली",
      ],
    },
  };
  const d = data[cat];
  return (
    <section>
      <CatUnderline name={cat}/>
      <div style={{display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:24}}>
        <FeaturedCard category={cat} headline={d.hero}/>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {d.stories.map((s, i) => <StandardCard key={i} category={cat} headline={s} layout="row"/>)}
        </div>
      </div>
    </section>
  );
}

window.DesktopHomepage = DesktopHomepage;
