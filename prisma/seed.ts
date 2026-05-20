import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Super admin
  const passwordHash = await bcrypt.hash('Admin@123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@prajavarta.com' },
    update: {},
    create: {
      email: 'admin@prajavarta.com',
      passwordHash,
      name: 'सुपर अॅडमिन',
      nameEnglish: 'Super Admin',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  })
  console.log('Super admin:', admin.email)

  // Top-level categories
  const categoryData = [
    { name: 'महाराष्ट्र',  nameEnglish: 'maharashtra',  slug: 'maharashtra',  sortOrder: 1 },
    { name: 'देश',         nameEnglish: 'desh',          slug: 'desh',         sortOrder: 2 },
    { name: 'जग',          nameEnglish: 'jag',           slug: 'jag',          sortOrder: 3 },
    { name: 'राजकीय',      nameEnglish: 'politics',      slug: 'politics',     sortOrder: 4 },
    { name: 'क्रीडा',      nameEnglish: 'sports',        slug: 'sports',       sortOrder: 5 },
    { name: 'मनोरंजन',     nameEnglish: 'entertainment', slug: 'entertainment',sortOrder: 6 },
    { name: 'व्यापार',     nameEnglish: 'business',      slug: 'business',     sortOrder: 7 },
    { name: 'शिक्षण',      nameEnglish: 'education',     slug: 'education',    sortOrder: 8 },
    { name: 'आरोग्य',      nameEnglish: 'health',        slug: 'health',       sortOrder: 9 },
    { name: 'तंत्रज्ञान',  nameEnglish: 'technology',    slug: 'technology',   sortOrder: 10 },
    { name: 'गुन्हेगारी',  nameEnglish: 'crime',         slug: 'crime',        sortOrder: 11 },
    { name: 'हवामान',      nameEnglish: 'weather',       slug: 'weather',      sortOrder: 12 },
  ]

  for (const cat of categoryData) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: { ...cat, isActive: true },
    })
  }
  console.log('Categories seeded:', categoryData.length)

  // Maharashtra districts
  const districts = [
    { name: 'पुणे',        nameEnglish: 'Pune' },
    { name: 'मुंबई',       nameEnglish: 'Mumbai' },
    { name: 'नागपूर',      nameEnglish: 'Nagpur' },
    { name: 'नाशिक',       nameEnglish: 'Nashik' },
    { name: 'औरंगाबाद',   nameEnglish: 'Aurangabad' },
    { name: 'सोलापूर',    nameEnglish: 'Solapur' },
    { name: 'कोल्हापूर',  nameEnglish: 'Kolhapur' },
    { name: 'सांगली',     nameEnglish: 'Sangli' },
    { name: 'सातारा',     nameEnglish: 'Satara' },
    { name: 'रत्नागिरी',  nameEnglish: 'Ratnagiri' },
    { name: 'अमरावती',    nameEnglish: 'Amravati' },
    { name: 'अकोला',      nameEnglish: 'Akola' },
    { name: 'वर्धा',       nameEnglish: 'Wardha' },
    { name: 'यवतमाळ',     nameEnglish: 'Yavatmal' },
    { name: 'बुलडाणा',    nameEnglish: 'Buldhana' },
    { name: 'वाशीम',      nameEnglish: 'Washim' },
    { name: 'चंद्रपूर',   nameEnglish: 'Chandrapur' },
    { name: 'गडचिरोली',  nameEnglish: 'Gadchiroli' },
    { name: 'भंडारा',     nameEnglish: 'Bhandara' },
    { name: 'गोंदिया',    nameEnglish: 'Gondia' },
    { name: 'जळगाव',     nameEnglish: 'Jalgaon' },
    { name: 'धुळे',       nameEnglish: 'Dhule' },
    { name: 'नंदुरबार',   nameEnglish: 'Nandurbar' },
    { name: 'अहमदनगर',   nameEnglish: 'Ahmednagar' },
    { name: 'पालघर',     nameEnglish: 'Palghar' },
    { name: 'रायगड',     nameEnglish: 'Raigad' },
    { name: 'सिंधुदुर्ग', nameEnglish: 'Sindhudurg' },
    { name: 'ठाणे',      nameEnglish: 'Thane' },
    { name: 'लातूर',     nameEnglish: 'Latur' },
    { name: 'नांदेड',    nameEnglish: 'Nanded' },
    { name: 'उस्मानाबाद',nameEnglish: 'Osmanabad' },
    { name: 'परभणी',     nameEnglish: 'Parbhani' },
    { name: 'हिंगोली',   nameEnglish: 'Hingoli' },
    { name: 'बीड',       nameEnglish: 'Beed' },
    { name: 'जालना',     nameEnglish: 'Jalna' },
  ]

  for (const d of districts) {
    const existing = await prisma.district.findFirst({ where: { nameEnglish: d.nameEnglish } })
    if (!existing) {
      await prisma.district.create({ data: d })
    }
  }
  console.log('Districts seeded:', districts.length)

  // Default site settings
  await prisma.setting.upsert({
    where: { id: 1 },
    update: {},
    create: {
      appName:    'प्रजावार्ता',
      email:      'contact@prajavarta.com',
      website:    'https://prajavarta.com',
      contact:    '+91 00000 00000',
      author:     'Prajavarta Team',
    },
  })
  console.log('Settings seeded')

  // ── Sample News Articles ──────────────────────────────────────────────────
  const allCats = await prisma.category.findMany({ where: { isActive: true } })
  const catMap: Record<string, number> = {}
  allCats.forEach(c => { catMap[c.slug] = c.id })

  const now = new Date()
  const hoursAgo = (h: number) => new Date(now.getTime() - h * 60 * 60 * 1000)

  const articles = [
    // ── महाराष्ट्र ──
    {
      slug: 'maharashtra-rain-alert-2026',
      title: 'महाराष्ट्रात पुढील ४८ तासांत मुसळधार पाऊस; IMD चा रेड अलर्ट',
      summary: 'भारतीय हवामान विभागाने राज्यातील सात जिल्ह्यांसाठी रेड अलर्ट जारी केला आहे. नागरिकांनी घरातच राहण्याचे आवाहन करण्यात आले आहे.',
      description: 'पुणे: भारतीय हवामान विभागाने (IMD) महाराष्ट्रातील सात जिल्ह्यांसाठी पुढील ४८ तासांत अतिवृष्टीचा रेड अलर्ट जारी केला आहे. पुणे, नाशिक, कोल्हापूर, सातारा, रायगड, रत्नागिरी आणि सिंधुदुर्ग या जिल्ह्यांमध्ये मुसळधार ते अतिमुसळधार पाऊस होण्याची शक्यता वर्तवण्यात आली आहे. जिल्हाधिकारी कार्यालयांनी आपत्कालीन यंत्रणा सज्ज ठेवली असून नागरिकांनी अनावश्यक प्रवास टाळण्याचे निर्देश देण्यात आले आहेत.',
      catSlug: 'maharashtra', finalScore: 98, trending: true, miniTrending: true,
      publishedAt: hoursAgo(1),
    },
    {
      slug: 'pune-metro-phase3-announcement',
      title: 'पुणे मेट्रो फेज ३ ची घोषणा: हिंजवडी ते शिवाजीनगर थेट कनेक्टिव्हिटी',
      summary: 'राज्य सरकारने पुणे मेट्रो फेज ३ ला मंजुरी दिली. हिंजवडी आयटी पार्क ते शिवाजीनगर स्थानकापर्यंत ११.२ किमीचे नवे मार्ग तयार होणार.',
      description: 'पुणे: राज्य मंत्रिमंडळाने पुणे मेट्रो फेज ३ प्रकल्पाला मंजुरी दिली आहे. या प्रकल्पांतर्गत हिंजवडी आयटी पार्क ते शिवाजीनगर दरम्यान ११.२ किलोमीटरचा मार्ग बांधण्यात येणार आहे. या मार्गावर एकूण ९ स्थानके असतील. प्रकल्पाचा अंदाजित खर्च ₹४,२०० कोटी असून २०२९ पर्यंत पूर्ण करण्याचे उद्दिष्ट आहे.',
      catSlug: 'maharashtra', finalScore: 92, trending: true, miniTrending: false,
      publishedAt: hoursAgo(3),
    },
    {
      slug: 'nagpur-orange-festival-2026',
      title: 'नागपूर संत्रा महोत्सव २०२६: यंदा रेकॉर्ड ३५ लाख संत्र्यांची विक्री',
      summary: 'विदर्भातील प्रसिद्ध नागपूर संत्रा महोत्सवाला उत्स्फूर्त प्रतिसाद. तीन दिवसांत ३५ लाखांहून अधिक संत्र्यांची विक्री झाली.',
      description: 'नागपूर: दरवर्षी होणाऱ्या नागपूर संत्रा महोत्सवाला यंदा विक्रमी प्रतिसाद मिळाला. तीन दिवसांच्या या महोत्सवात एकूण ३५ लाखांहून अधिक संत्र्यांची विक्री झाली, जी गेल्या वर्षीच्या तुलनेत ४०% अधिक आहे. राज्यभरातून ५०,००० हून अधिक नागरिकांनी या महोत्सवाला भेट दिली.',
      catSlug: 'maharashtra', finalScore: 78, trending: false, miniTrending: false,
      publishedAt: hoursAgo(6),
    },
    {
      slug: 'mumbai-coastal-road-inauguration',
      title: 'मुंबई कोस्टल रोड: दक्षिण मुंबई ते वर्सोवा मार्ग अखेर खुला',
      summary: 'बहुप्रतीक्षित मुंबई कोस्टल रोडचा दुसरा टप्पा वाहतुकीसाठी खुला झाला. प्रवास वेळ ७० मिनिटांनी कमी होणार.',
      description: 'मुंबई: बहुप्रतीक्षित मुंबई कोस्टल रोडचा दुसरा टप्पा शनिवारी मुख्यमंत्र्यांच्या हस्ते वाहतुकीसाठी खुला करण्यात आला. दक्षिण मुंबई ते वर्सोवा हे अंतर आता अवघ्या ३५ मिनिटांत कापता येणार आहे. या रस्त्यामुळे प्रतिदिन सुमारे दीड लाख वाहने वाहतूक कोंडीतून मुक्त होतील, असा अंदाज आहे.',
      catSlug: 'maharashtra', finalScore: 88, trending: false, miniTrending: true,
      publishedAt: hoursAgo(8),
    },
    {
      slug: 'kolhapur-flood-relief-2026',
      title: 'कोल्हापुरातील पूरग्रस्तांना राज्य सरकारकडून ₹५०० कोटींचे पॅकेज',
      summary: 'कोल्हापूर जिल्ह्यातील पूरग्रस्त शेतकरी व नागरिकांसाठी राज्य सरकारने विशेष आर्थिक मदत जाहीर केली.',
      description: 'कोल्हापूर: राज्य सरकारने कोल्हापूर जिल्ह्यातील पूरग्रस्त शेतकरी आणि नागरिकांसाठी ₹५०० कोटींचे विशेष मदत पॅकेज जाहीर केले आहे. यात शेतकऱ्यांना प्रति एकर ₹१५,०००, घरे बाधित झालेल्यांना ₹५०,०००, आणि व्यापाऱ्यांना ₹२ लाखांपर्यंत मदत देण्यात येणार आहे.',
      catSlug: 'maharashtra', finalScore: 82, trending: false, miniTrending: false,
      publishedAt: hoursAgo(12),
    },

    // ── देश ──
    {
      slug: 'india-gdp-growth-q4-2026',
      title: 'भारताचा GDP वाढीचा दर ७.८%: Q4 २०२५-२६ मध्ये विक्रमी कामगिरी',
      summary: 'केंद्रीय सांख्यिकी मंत्रालयाने जाहीर केलेल्या आकडेवारीनुसार भारताचा GDP वाढीचा दर ७.८% नोंदला गेला.',
      description: 'नवी दिल्ली: केंद्रीय सांख्यिकी आणि कार्यक्रम अंमलबजावणी मंत्रालयाने Q4 २०२५-२६ साठी GDP वाढीचा दर ७.८% असल्याचे जाहीर केले आहे. हे आकडेवारी जगातील प्रमुख अर्थव्यवस्थांमध्ये भारताची सर्वाधिक वाढ दर्शवते. सेवा क्षेत्र, उत्पादन आणि कृषी या तिन्ही क्षेत्रांनी सकारात्मक योगदान दिले.',
      catSlug: 'desh', finalScore: 94, trending: true, miniTrending: false,
      publishedAt: hoursAgo(2),
    },
    {
      slug: 'india-solar-energy-milestone',
      title: 'भारताने सौरऊर्जेत १०० GW चा टप्पा पार केला; जगात तिसऱ्या स्थानावर',
      summary: 'नवीन आणि नवीकरणीय ऊर्जा मंत्रालयाने भारताने सौरऊर्जा उत्पादनात १०० GW चा ऐतिहासिक टप्पा गाठल्याचे जाहीर केले.',
      description: 'नवी दिल्ली: भारताने सौरऊर्जा उत्पादनात १०० गिगावॅटचा ऐतिहासिक टप्पा पार करत जगात तिसरे स्थान प्राप्त केले आहे. पंतप्रधानांनी या उपलब्धीचे स्वागत करताना सांगितले की, भारत २०३० पर्यंत ५०० GW नवीकरणीय ऊर्जेचे उद्दिष्ट गाठेल.',
      catSlug: 'desh', finalScore: 86, trending: false, miniTrending: true,
      publishedAt: hoursAgo(5),
    },
    {
      slug: 'india-rail-bullet-train-update',
      title: 'मुंबई-अहमदाबाद बुलेट ट्रेन: ४२% काम पूर्ण; २०२८ मध्ये पहिली चाचणी',
      summary: 'नॅशनल हाय स्पीड रेल कॉर्पोरेशनने मुंबई-अहमदाबाद बुलेट ट्रेन प्रकल्पाच्या प्रगतीचा अहवाल सादर केला.',
      description: 'मुंबई: नॅशनल हाय स्पीड रेल कॉर्पोरेशन लिमिटेडने (NHSRCL) मुंबई-अहमदाबाद हाय स्पीड रेल प्रकल्पाचे ४२% काम पूर्ण झाल्याचे जाहीर केले. २०२८ च्या सुरुवातीला पहिल्या चाचणी धावची योजना असून २०३० पर्यंत संपूर्ण मार्ग कार्यान्वित होणे अपेक्षित आहे.',
      catSlug: 'desh', finalScore: 79, trending: false, miniTrending: false,
      publishedAt: hoursAgo(10),
    },

    // ── जग ──
    {
      slug: 'world-climate-summit-2026',
      title: 'जागतिक हवामान परिषद: भारतासह ९० देशांनी कार्बन उत्सर्जन कपातीच्या करारावर स्वाक्षरी',
      summary: 'जिनिव्हामध्ये झालेल्या जागतिक हवामान परिषदेत ९० हून अधिक देशांनी २०३५ पर्यंत कार्बन उत्सर्जन ५०% कमी करण्याच्या करारावर सह्या केल्या.',
      description: 'जिनिव्हा: संयुक्त राष्ट्रांच्या नेतृत्वाखाली झालेल्या जागतिक हवामान परिषदेत भारतासह ९३ देशांनी ऐतिहासिक कार्बन कपात करारावर स्वाक्षरी केली. या करारानुसार सर्व सदस्य देशांनी २०३५ पर्यंत कार्बन उत्सर्जन ५०% कमी करण्याचे तसेच २०५० पर्यंत नेट-झिरो उद्दिष्ट साध्य करण्याचे मान्य केले आहे.',
      catSlug: 'jag', finalScore: 88, trending: true, miniTrending: false,
      publishedAt: hoursAgo(4),
    },
    {
      slug: 'india-us-trade-deal-2026',
      title: 'भारत-अमेरिका व्यापार करार: द्विपक्षीय व्यापार $५०० अब्जांपर्यंत नेण्याचे लक्ष्य',
      summary: 'पंतप्रधानांच्या अमेरिका दौऱ्यात दोन्ही देशांनी महत्त्वपूर्ण व्यापार करारावर स्वाक्षरी केली.',
      description: 'वॉशिंग्टन डीसी: पंतप्रधानांच्या अमेरिका भेटीदरम्यान दोन्ही देशांनी द्विपक्षीय व्यापार ५०० अब्ज डॉलरपर्यंत नेण्याचे उद्दिष्ट ठेवणाऱ्या महत्त्वपूर्ण करारावर स्वाक्षरी केली. तंत्रज्ञान, संरक्षण, कृषी आणि औषध निर्मिती या क्षेत्रांमध्ये सहकार्य वाढवण्यावर विशेष भर देण्यात आला.',
      catSlug: 'jag', finalScore: 83, trending: false, miniTrending: false,
      publishedAt: hoursAgo(7),
    },

    // ── राजकीय ──
    {
      slug: 'maharashtra-cabinet-expansion-2026',
      title: 'महाराष्ट्र मंत्रिमंडळ विस्तार: नव्या मंत्र्यांच्या नावांना अखेर मंजुरी',
      summary: 'राज्यपालांनी आठ नव्या मंत्र्यांना शपथ दिली. गृह, महसूल आणि आरोग्य खात्यांमध्ये महत्त्वाचे बदल.',
      description: 'मुंबई: राज्यपाल भगत सिंह कोश्यारी यांच्या हस्ते राजभवनात आठ नव्या मंत्र्यांना शपथ देण्यात आली. मंत्रिमंडळ विस्तारात गृह, महसूल, आरोग्य आणि सार्वजनिक बांधकाम खात्यांमध्ये महत्त्वाचे बदल झाले आहेत. नव्या मंत्र्यांनी आपापल्या खात्यांचा कार्यभार स्वीकारला असून त्यांनी जनतेसाठी काम करण्याची ग्वाही दिली.',
      catSlug: 'politics', finalScore: 90, trending: true, miniTrending: true,
      publishedAt: hoursAgo(2),
    },
    {
      slug: 'lok-sabha-special-session-monsoon-2026',
      title: 'संसदेचे विशेष अधिवेशन: तीन महत्त्वाची विधेयके मंजूर',
      summary: 'लोकसभेच्या विशेष अधिवेशनात डिजिटल नागरिकता, कृषी सुधारणा आणि पायाभूत सुविधा या तीन महत्त्वाच्या विधेयकांना मंजुरी देण्यात आली.',
      description: 'नवी दिल्ली: संसदेच्या विशेष अधिवेशनात आज लोकसभेने तीन महत्त्वाच्या विधेयकांना मंजुरी दिली. डिजिटल नागरिकता विधेयक, कृषी क्षेत्र सुधारणा विधेयक आणि पायाभूत सुविधा विकास विधेयक हे तीन विधेयक विरोधी पक्षांच्या आक्षेपांदरम्यान मंजूर करण्यात आले.',
      catSlug: 'politics', finalScore: 85, trending: false, miniTrending: false,
      publishedAt: hoursAgo(5),
    },
    {
      slug: 'opposition-rally-mumbai-2026',
      title: 'मुंबईत विरोधी पक्षांची महारॅली: लाखो कार्यकर्ते एकत्र',
      summary: 'महाराष्ट्रातील प्रमुख विरोधी पक्षांनी मुंबईत संयुक्त महारॅली आयोजित केली. सरकारच्या धोरणांविरुद्ध आवाज उठवण्यात आला.',
      description: 'मुंबई: महाराष्ट्रातील प्रमुख विरोधी पक्षांनी मुंबईच्या आझाद मैदानात संयुक्त महारॅली आयोजित केली. या रॅलीत लाखो कार्यकर्त्यांनी सहभाग घेतला. राज्य सरकारच्या आर्थिक धोरणे, शेतकरी प्रश्न आणि महागाई या मुद्द्यांवर सरकारवर जोरदार टीका करण्यात आली.',
      catSlug: 'politics', finalScore: 76, trending: false, miniTrending: false,
      publishedAt: hoursAgo(9),
    },

    // ── क्रीडा ──
    {
      slug: 'india-cricket-test-win-england-2026',
      title: 'भारताने इंग्लंडविरुद्ध कसोटी मालिका ३-१ने जिंकली; विराट कोहलीचे विक्रमी शतक',
      summary: 'भारतीय क्रिकेट संघाने इंग्लंडविरुद्ध कसोटी मालिका ३-१ ने जिंकली. विराट कोहलीने ११व्या कसोटी शतकाची नोंद केली.',
      description: 'लंडन: भारतीय क्रिकेट संघाने इंग्लंडविरुद्ध ५ कसोटी सामन्यांची मालिका ३-१ने जिंकत ऐतिहासिक विजय नोंदवला. ओव्हल कसोटीत विराट कोहलीने लॉर्डस्वर विक्रमी ११वे शतक झळकावले. रोहित शर्माने मालिकेत एकूण ५४५ धावा करत "मॅन ऑफ द सिरीज" पुरस्कार पटकावला.',
      catSlug: 'sports', finalScore: 96, trending: true, miniTrending: true,
      publishedAt: hoursAgo(1),
    },
    {
      slug: 'mumbai-indians-ipl-2026-champion',
      title: 'मुंबई इंडियन्स IPL २०२६ चॅम्पियन: फायनलमध्ये CSK ला ८ विकेटने पराभूत',
      summary: 'अहमदाबादच्या नरेंद्र मोदी स्टेडियमवर झालेल्या थरारक फायनलमध्ये मुंबई इंडियन्सने चेन्नई सुपर किंग्सला ८ विकेटने नमवले.',
      description: 'अहमदाबाद: IPL २०२६ च्या अंतिम सामन्यात मुंबई इंडियन्सने चेन्नई सुपर किंग्सला ८ विकेटने पराभूत करत सहावा विश्वचषक जिंकला. जसप्रीत बुमराहने ३ विकेट घेत सामन्याची दिशा बदलली, तर रोहित शर्माने नाबाद ७८ धावा करत संघाला विजयापर्यंत नेले.',
      catSlug: 'sports', finalScore: 93, trending: true, miniTrending: false,
      publishedAt: hoursAgo(3),
    },
    {
      slug: 'pune-marathon-2026-results',
      title: 'पुणे आंतरराष्ट्रीय मॅरेथॉन २०२६: ४०,००० धावपटूंचा उत्साह; इथिओपियन खेळाडूने विक्रम मोडला',
      summary: 'पुण्यात आयोजित आंतरराष्ट्रीय मॅरेथॉनमध्ये ४०,००० हून अधिक धावपटूंनी सहभाग घेतला. इथिओपियाच्या धावपटूने नवा रेकॉर्ड प्रस्थापित केला.',
      description: 'पुणे: पुणे आंतरराष्ट्रीय मॅरेथॉनच्या इतिहासात यंदाच्या वर्षी सर्वाधिक सहभागी नोंदला गेला. ४०,५०० हून अधिक धावपटूंनी सहभाग घेतला. पुरुष गटात इथिओपियाच्या अब्दी अब्दीरहमानने २ तास ४ मिनिटे ३२ सेकंदात अंतर पूर्ण करत नवा रेकॉर्ड प्रस्थापित केला.',
      catSlug: 'sports', finalScore: 72, trending: false, miniTrending: false,
      publishedAt: hoursAgo(14),
    },

    // ── मनोरंजन ──
    {
      slug: 'marathi-film-pahili-chai-box-office',
      title: '"पहिली चाय" मराठी चित्रपटाने बॉक्स ऑफिसवर ₹२५ कोटींचा टप्पा पार केला',
      summary: 'अंकुश चौधरी आणि सोनाली कुलकर्णी अभिनीत "पहिली चाय" या मराठी चित्रपटाने प्रदर्शनाच्या दुसऱ्या आठवड्यात ₹२५ कोटींचा टप्पा पार केला.',
      description: 'मुंबई: "पहिली चाय" या मराठी चित्रपटाने बॉक्स ऑफिसवर विक्रमी कामगिरी केली आहे. अंकुश चौधरी, सोनाली कुलकर्णी आणि भाऊ कदम यांच्या प्रमुख भूमिका असलेल्या या चित्रपटाने प्रदर्शनाच्या १४व्या दिवशी ₹२५ कोटींचा टप्पा पार केला. दिग्दर्शक प्रवीण तरडे यांनी सांगितले की हा मराठी चित्रपट सृष्टीसाठी ऐतिहासिक क्षण आहे.',
      catSlug: 'entertainment', finalScore: 80, trending: false, miniTrending: false,
      publishedAt: hoursAgo(6),
    },
    {
      slug: 'zee-marathi-awards-2026',
      title: 'झी मराठी पुरस्कार सोहळा २०२६: "रंग माझा वेगळा" ने सर्वोत्कृष्ट मालिकेचा मान',
      summary: 'झी मराठी गौरव पुरस्कार सोहळ्यात यंदा "रंग माझा वेगळा" मालिकेने सर्वाधिक पुरस्कार पटकावले.',
      description: 'मुंबई: झी मराठी गौरव पुरस्कार सोहळ्यात "रंग माझा वेगळा" मालिकेने सर्वोत्कृष्ट मालिका, सर्वोत्कृष्ट अभिनेत्री आणि सर्वोत्कृष्ट दिग्दर्शक असे तीन प्रमुख पुरस्कार पटकावले. सर्वोत्कृष्ट अभिनेत्याचा पुरस्कार सिद्धार्थ चांदेकर यांना मिळाला.',
      catSlug: 'entertainment', finalScore: 68, trending: false, miniTrending: false,
      publishedAt: hoursAgo(18),
    },

    // ── व्यापार ──
    {
      slug: 'reliance-jio-5g-expansion-maharashtra',
      title: 'रिलायन्स जिओने महाराष्ट्रातील ४०० शहरांमध्ये ५G सेवा सुरू केली',
      summary: 'रिलायन्स जिओने महाराष्ट्रात ५G विस्ताराचा नवा टप्पा जाहीर केला. ₹८,५०० कोटींच्या गुंतवणुकीसह ४०० नव्या शहरांमध्ये ५G नेटवर्क',
      description: 'मुंबई: रिलायन्स जिओने महाराष्ट्रातील ४०० नव्या शहरे आणि गावांमध्ये ५G सेवा सुरू केल्याची घोषणा केली. ₹८,५०० कोटींच्या गुंतवणुकीसह राबवण्यात येणाऱ्या या विस्तार योजनेमुळे राज्यातील एकूण ५G कव्हरेज ८५% पर्यंत पोहोचेल.',
      catSlug: 'business', finalScore: 77, trending: false, miniTrending: false,
      publishedAt: hoursAgo(8),
    },
    {
      slug: 'sensex-record-high-2026',
      title: 'सेन्सेक्सने ९०,०००चा ऐतिहासिक टप्पा पार केला; निफ्टीही विक्रमी उच्चांकावर',
      summary: 'भारतीय शेअर बाजाराने नवा इतिहास रचला. सेन्सेक्स ९०,०००च्या वर गेला तर निफ्टी २७,५००च्या उच्चांकावर पोहोचला.',
      description: 'मुंबई: बॉम्बे स्टॉक एक्सचेंजवरील सेन्सेक्सने आज ऐतिहासिक ९०,००० चा टप्पा पार केला. मजबूत GDP आकडेवारी, परदेशी गुंतवणुकीचा ओघ आणि कंपन्यांचे चांगले तिमाही निकाल यामुळे बाजारात तेजी आली. निफ्टी-५० निर्देशांकही २७,५०० च्या विक्रमी उच्चांकावर पोहोचला.',
      catSlug: 'business', finalScore: 85, trending: true, miniTrending: false,
      publishedAt: hoursAgo(4),
    },

    // ── शिक्षण ──
    {
      slug: 'jee-results-2026-maharashtra-toppers',
      title: 'JEE Advanced २०२६: महाराष्ट्रातील विद्यार्थ्यांनी मारली बाजी; पुण्याचा आयुष राष्ट्रीय स्तरावर दुसरा',
      summary: 'JEE Advanced २०२६ चे निकाल जाहीर. महाराष्ट्रातील ४,५०० हून अधिक विद्यार्थी उत्तीर्ण. पुण्याच्या आयुष शर्माने दुसरे राष्ट्रीय स्थान पटकावले.',
      description: 'पुणे: JEE Advanced २०२६ चे निकाल जाहीर झाले असून महाराष्ट्रातील ४,५२३ विद्यार्थी उत्तीर्ण झाले आहेत. पुण्याच्या आयुष शर्माने ३५२ गुण मिळवून राष्ट्रीय स्तरावर दुसरे स्थान पटकावले. मुंबई, पुणे, नागपूर आणि नाशिकमधील विद्यार्थ्यांनी देशभरातील शीर्ष १०० स्थानांमध्ये आपले नाव नोंदवले.',
      catSlug: 'education', finalScore: 74, trending: false, miniTrending: false,
      publishedAt: hoursAgo(11),
    },

    // ── आरोग्य ──
    {
      slug: 'pune-aiims-new-department-2026',
      title: 'पुणे AIIMS मध्ये कर्करोग उपचार केंद्र सुरू; महाराष्ट्रातील रुग्णांना दिलासा',
      summary: 'पुण्यातील AIIMS मध्ये अत्याधुनिक कर्करोग उपचार आणि संशोधन केंद्र सुरू झाले. कमी खर्चात उच्च दर्जाचे उपचार मिळणार.',
      description: 'पुणे: अखिल भारतीय आयुर्विज्ञान संस्था (AIIMS) पुणे येथे अत्याधुनिक कर्करोग उपचार आणि संशोधन केंद्र सुरू झाले. रोबोटिक शस्त्रक्रिया, प्रोटॉन थेरेपी आणि इम्युनोथेरपी सुविधा असलेल्या या केंद्रामुळे महाराष्ट्रातील कर्करोग रुग्णांना मुंबई किंवा दिल्लीला जाण्याची गरज राहणार नाही.',
      catSlug: 'health', finalScore: 71, trending: false, miniTrending: false,
      publishedAt: hoursAgo(16),
    },

    // ── तंत्रज्ञान ──
    {
      slug: 'tata-semiconductor-plant-pune-2026',
      title: 'टाटा सेमिकंडक्टर प्लांट पुण्यात: ₹९१,००० कोटींची गुंतवणूक; ५०,००० रोजगार',
      summary: 'टाटा इलेक्ट्रॉनिक्सने पुण्याजवळ भारतातील पहिला अत्याधुनिक सेमिकंडक्टर फॅब प्लांट उभारण्याची घोषणा केली.',
      description: 'पुणे: टाटा इलेक्ट्रॉनिक्सने पुण्याजवळील तळेगाव येथे भारतातील पहिला अत्याधुनिक सेमिकंडक्टर फॅब्रिकेशन प्लांट उभारण्याची घोषणा केली. ₹९१,००० कोटींच्या या प्रकल्पात सुरुवातीला ५०,०००, तर पूर्ण क्षमतेने उत्पादन सुरू झाल्यावर १,२०,००० रोजगार निर्माण होतील.',
      catSlug: 'technology', finalScore: 89, trending: true, miniTrending: false,
      publishedAt: hoursAgo(5),
    },

    // ── गुन्हेगारी ──
    {
      slug: 'mumbai-cyber-fraud-bust-2026',
      title: 'मुंबई सायबर पोलिसांनी ₹४५० कोटींचा ऑनलाइन फसवणूक रॅकेट उद्ध्वस्त केला',
      summary: 'मुंबई सायबर पोलिसांनी ऑनलाइन गुंतवणूक फसवणुकीचे एक मोठे रॅकेट उद्ध्वस्त करत २३ आरोपींना अटक केली.',
      description: 'मुंबई: मुंबई पोलिसांच्या सायबर गुन्हे शाखेने ₹४५० कोटींहून अधिक रकमेच्या ऑनलाइन गुंतवणूक फसवणुकीचे एक मोठे रॅकेट उद्ध्वस्त केले. या प्रकरणात ५ राज्यांमधून एकाच वेळी छापे टाकून २३ आरोपींना अटक करण्यात आली. या रॅकेटने नकली शेअर ट्रेडिंग अॅपद्वारे देशभरातील १२,००० पेक्षा अधिक नागरिकांची फसवणूक केली होती.',
      catSlug: 'crime', finalScore: 81, trending: false, miniTrending: false,
      publishedAt: hoursAgo(7),
    },

    // ── हवामान ──
    {
      slug: 'monsoon-arrival-maharashtra-2026',
      title: 'मान्सूनचे महाराष्ट्रात वेळेआधी आगमन; पुण्यात ७ जूनला मान्सूनचा शुभारंभ',
      summary: 'हवामान विभागाच्या अंदाजानुसार यंदा मान्सून महाराष्ट्रात ५-७ दिवस आधी दाखल होणार. खरीप पिकांसाठी शुभ संकेत.',
      description: 'पुणे: हवामान विभागाने जाहीर केले की यंदा नैऋत्य मान्सून महाराष्ट्रात नेहमीपेक्षा ५-७ दिवस आधी दाखल होण्याची शक्यता आहे. पुण्यात ७ जूनपर्यंत मान्सूनचे आगमन अपेक्षित आहे. वेळेआधी मान्सून आल्याने खरीप हंगामातील भात, सोयाबीन आणि कापूस पिकांसाठी हे शुभ संकेत आहेत.',
      catSlug: 'weather', finalScore: 73, trending: false, miniTrending: false,
      publishedAt: hoursAgo(13),
    },
  ]

  let seededCount = 0
  for (const article of articles) {
    const catId = catMap[article.catSlug]
    if (!catId) continue

    const news = await prisma.news.upsert({
      where: { slug: article.slug },
      update: {},
      create: {
        title: article.title,
        slug: article.slug,
        summary: article.summary,
        description: article.description,
        status: 'PUBLISHED',
        isActive: true,
        publishedDate: article.publishedAt,
        categoryId: catId,
        userId: admin.id,
        isTrendingNews: article.trending,
        isMiniTrendingNews: article.miniTrending,
        isBreakingNews: article.slug === 'maharashtra-rain-alert-2026',
        pinToHomepage: article.slug === 'india-cricket-test-win-england-2026',
        ownerType: 'ADMIN',
      },
    })

    await prisma.newsScore.upsert({
      where: { newsId: news.id },
      update: {},
      create: {
        newsId: news.id,
        finalScore: article.finalScore,
        freshnessScore: Math.max(0, 100 - (now.getTime() - article.publishedAt.getTime()) / 3600000 * 3),
        velocityScore: article.trending ? 45 : 15,
        viewsLast2Hrs: article.trending ? Math.floor(article.finalScore * 3) : Math.floor(article.finalScore * 0.5),
      },
    })

    seededCount++
  }
  console.log('Sample articles seeded:', seededCount)

  console.log('\nDone! Admin login:')
  console.log('  Email:    admin@prajavarta.com')
  console.log('  Password: Admin@123')
  console.log('\nChange the password immediately after first login.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
