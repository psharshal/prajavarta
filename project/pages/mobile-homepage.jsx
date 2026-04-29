// 5.1.1 Mobile Homepage — 375px wide
function MobileHomepage() {
  const W = 375;
  return (
    <div style={{ width: W, background: "var(--surface-primary)", fontFamily: "var(--font-en)" }}>
      <MobileHeader/>
      <BreakingStrip/>

      {/* 3. Hero Story */}
      <div style={{padding: "16px 0 0"}}>
        <ZoneTag style={{padding:"0 16px 8px"}}>① HERO STORY</ZoneTag>
        <HeroCard mobile category="महाराष्ट्र" headline="विधानसभेत सत्तासंघर्ष: सरकार स्थापनेच्या हालचालींना वेग, दिल्लीत रात्री बैठक" subtitle="राज्यपाल भेट उद्या सकाळी; नवीन मंत्रिमंडळाची संभाव्य रचना समोर"/>
      </div>

      {/* 4. Secondary Stories */}
      <div style={{padding: "20px 16px 0"}}>
        <ZoneTag>② SECONDARY STORIES</ZoneTag>
        <div style={{display:"flex",flexDirection:"column",gap:16,marginTop:8}}>
          <StandardCard category="राजकारण" headline="मुख्यमंत्र्यांच्या शपथविधीसाठी मुंबईत वानखेडेवर कार्यक्रम होणार" badge="LIVE"/>
          <StandardCard category="पुणे" headline="पुणे महानगरपालिकेच्या अर्थसंकल्पात पाणीपुरवठा योजनेला प्राधान्य"/>
          <StandardCard category="गुन्हेगारी" headline="कोथरूडमध्ये बँक दरोडा प्रकरणी तीन संशयित ताब्यात"/>
        </div>
      </div>

      {/* 5. Ad H1 */}
      <div style={{padding: "20px 16px"}}>
        <Ad id="H1" name="Mobile Homepage Below-Header" size="300×250" h={250}/>
      </div>

      {/* 6. Trending */}
      <div style={{padding: "0 16px"}}>
        <TrendingModule items={[
          { c: "राजकारण", h: "अजित पवार गटाची आज महत्त्वाची बैठक, मंत्रिपदाच्या मुद्द्यावर चर्चा" },
          { c: "क्रीडा", h: "रोहित शर्मा कसोटी संघातून निवृत्त; मुंबईकरांचा भावूक निरोप" },
          { c: "व्यवसाय", h: "रिलायन्सच्या तिमाही नफ्यात १८% वाढ, शेअर बाजार उसळला" },
          { c: "मनोरंजन", h: "रितेश देशमुखचा 'राजा शिवछत्रपती' चित्रपट दिवाळीला प्रदर्शित" },
          { c: "महाराष्ट्र", h: "मराठवाड्यात अवकाळी पावसाचा कहर, १२ जिल्ह्यांत पीकहानी" },
        ]}/>
      </div>

      {/* 7. Category Block 1 — Maharashtra */}
      <CategoryBlock cat="महाराष्ट्र" hero="राज्यात कांद्याच्या भावात मोठी घसरण, शेतकऱ्यांचे आंदोलन सुरू" stories={[
        "नागपूर हिवाळी अधिवेशनाची तारीख निश्चित, १६ डिसेंबरपासून सुरुवात",
        "औरंगाबाद नामांतराचा वाद पुन्हा चर्चेत, सुप्रीम कोर्टात सुनावणी",
        "नाशिकमध्ये द्राक्ष निर्यातीत २०% घट, युरोपीय निर्बंधांचा परिणाम",
      ]}/>

      {/* 8. Ad H2 */}
      <div style={{padding: "0 16px 20px"}}>
        <Ad id="H2" name="Mobile Homepage After Hero Block" size="300×250" h={250}/>
      </div>

      {/* 9. Pune */}
      <CategoryBlock cat="पुणे" hero="पुण्यात मेट्रोच्या तिसऱ्या टप्प्याचे काम सुरू, २०२८ पर्यंत पूर्णत्वाचे लक्ष्य" stories={[
        "हिंजवडी आयटी हब विस्ताराला राज्य सरकारची मंजुरी",
        "पीएमपीच्या ३०० नवीन ई-बस ताफ्यात येणार, सप्टेंबरपर्यंत सेवा",
        "कोरेगाव पार्क परिसरात रस्ते दुरुस्तीचे काम पूर्ण",
      ]}/>

      {/* 10. Politics */}
      <CategoryBlock cat="राजकारण" hero="विरोधी पक्षनेतेपदावरून ठाकरे आणि काँग्रेसमध्ये रस्सीखेच, चर्चा गुप्त" stories={[
        "लोकसभेत अध्यक्षपदासाठी इंडिया आघाडीची रणनीती ठरली",
        "एनसीपी शरद पवार गटाच्या प्रदेशाध्यक्षपदी सुनील तटकरे",
        "भाजप प्रदेशाध्यक्षपदी फडणवीसांची फेरनियुक्ती निश्चित",
      ]}/>

      {/* 11. Ad H3 */}
      <div style={{padding: "0 16px 20px"}}>
        <Ad id="H3" name="Mobile Homepage After Categories" size="300×250 / Native" h={250}/>
      </div>

      {/* 12. More categories */}
      <CategoryBlock cat="गुन्हेगारी" hero="कुख्यात तस्कर ललित पाटीलला मुंबई पोलिसांनी अटक केली" stories={[
        "ठाण्यात सायबर फसवणुकीची ४.२ कोटींची तक्रार दाखल",
        "नाशिकमध्ये अंमली पदार्थ तस्करीचा भांडाफोड, ५ अटक",
        "मुंबईत खंडणी प्रकरणी निवृत्त पोलीस अधिकाऱ्यावर गुन्हा",
      ]}/>

      <CategoryBlock cat="क्रीडा" hero="मुंबई इंडियन्सच्या नव्या प्रशिक्षकपदी महेंद्रसिंग धोनीच्या नावाची चर्चा" stories={[
        "विश्वचषक हॉकी स्पर्धेसाठी भारतीय संघाची घोषणा",
        "पीव्ही सिंधू ऑस्ट्रेलियन ओपनच्या उपांत्य फेरीत दाखल",
        "रणजी ट्रॉफीत मुंबईचा सलग दुसरा विजय",
      ]}/>

      {/* 13. Recommended */}
      <div style={{padding: "0 16px 24px"}}>
        <CatUnderline name="Maharashtra" label="तुमच्यासाठी निवडक"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:16}}>
          {[
            { c: "मनोरंजन", h: "मराठी रंगभूमीचा ७५ वा वर्धापनदिन: 'नटसम्राट' चे भव्य पुनःप्रदर्शन" },
            { c: "व्यवसाय", h: "टाटा मोटर्सच्या इलेक्ट्रिक एसयूव्हीचे अनावरण, बुकिंग सुरू" },
            { c: "महाराष्ट्र", h: "कोकणात पावसाने सरासरी ओलांडली, शेतकऱ्यांना दिलासा" },
            { c: "पुणे", h: "पुणे विद्यापीठात नवीन AI संशोधन केंद्र सुरू होणार" },
            { c: "राजकारण", h: "मनसेच्या अधिवेशनात राज ठाकरे यांचे आक्रमक भाषण" },
            { c: "क्रीडा", h: "महाराष्ट्र केसरी कुस्ती स्पर्धेला कोल्हापुरात सुरुवात" },
          ].map((s, i) => (
            <StandardCard key={i} category={s.c} headline={s.h}/>
          ))}
        </div>
      </div>

      {/* 14. Ad H4 */}
      <div style={{padding: "0 16px 20px"}}>
        <Ad id="H4" name="Mobile Homepage Above Footer" size="Multiplex / Native" h={320}/>
      </div>

      <MobileFooter/>
    </div>
  );
}

function CategoryBlock({ cat, hero, stories }) {
  return (
    <section style={{padding: "8px 16px 24px"}}>
      <CatUnderline name={cat}/>
      <FeaturedCard category={cat} headline={hero}/>
      <div style={{display:"flex",flexDirection:"column",gap:14, marginTop:16, paddingTop:16, borderTop:"1px solid var(--border-default)"}}>
        {stories.map((s, i) => (
          <StandardCard key={i} category={cat} headline={s}/>
        ))}
      </div>
    </section>
  );
}

window.MobileHomepage = MobileHomepage;
