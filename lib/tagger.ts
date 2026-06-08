// Keyword auto-tagger — Layer 1 of the content intelligence pipeline.
// Scans headline + first 3 paragraphs, returns category slugs and location IDs with confidence.
// If confidence is low, the caller falls back to the AI tagger (Claude API).

export interface TaggerResult {
  categorySlug: string
  confidence: number  // 0–1
}

export interface LocationResult {
  name: string
  confidence: number
}

// ---------------------------------------------------------------------------
// Stop-word lists for tag extraction
// ---------------------------------------------------------------------------

const MARATHI_STOP_WORDS = new Set([
  'आणि', 'की', 'पण', 'तर', 'म्हणून', 'कारण', 'जेव्हा', 'तेव्हा',
  'आहे', 'होते', 'झाले', 'केले', 'सांगितले', 'म्हणाले', 'आले',
  'या', 'त्या', 'हे', 'ते', 'एक', 'एका', 'तो', 'ती', 'ज्या',
  'असे', 'असा', 'अशा', 'त्यांनी', 'त्यांचे', 'त्यांना', 'त्यांच्या',
  'आपले', 'आपली', 'त्याच्या', 'त्याने', 'तिने', 'त्याला', 'तिला',
  'मात्र', 'नाही', 'होत', 'करण्यात', 'करण्याचे', 'करण्यासाठी',
  'सुरू', 'झाली', 'असून', 'येथे', 'आता', 'तसेच', 'तेथे',
  'दरम्यान', 'वेळी', 'नंतर', 'आधी', 'पुढे', 'नव्हते',
  'काही', 'सर्व', 'जास्त', 'कमी', 'मोठे', 'लहान',
  'झाला', 'झाल्या', 'होऊन', 'करून', 'घेऊन', 'देऊन',
  'असलेल्या', 'केलेल्या', 'झालेल्या', 'येणार', 'जाणार',
  'आहेत', 'नाहीत', 'होती', 'होतो', 'होते', 'व्हायला',
  'असताना', 'झालेले', 'करत', 'घेत', 'देत', 'येत', 'जात',
  'त्यामुळे', 'परंतु', 'तथापि', 'शिवाय', 'अजून', 'अद्याप',
])

const ENGLISH_STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'has', 'have',
  'had', 'be', 'been', 'being', 'do', 'does', 'did', 'will', 'would',
  'could', 'should', 'may', 'might', 'shall', 'can', 'that', 'this',
  'these', 'those', 'it', 'its', 'as', 'up', 'out', 'if', 'he', 'she',
  'they', 'we', 'his', 'her', 'their', 'our', 'not', 'also', 'than',
  'then', 'so', 'just', 'more', 'about', 'after', 'before', 'when',
  'while', 'which', 'who', 'what', 'how', 'where', 'there', 'here',
  'said', 'says', 'new', 'get', 'got', 'now', 'one', 'two', 'over',
  'into', 'onto', 'upon', 'been', 'has', 'have', 'had', 'no', 'yes',
])

// Category keyword dictionary (Marathi variants)
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'rajkaran': [
    'निवडणूक', 'आमदार', 'खासदार', 'मंत्री', 'सरकार', 'पक्ष', 'भाजप', 'काँग्रेस',
    'शिवसेना', 'राष्ट्रवादी', 'मुख्यमंत्री', 'राज्यपाल', 'लोकसभा', 'विधानसभा',
    'अधिवेशन', 'मतदान', 'विरोधी पक्ष', 'युती', 'आघाडी', 'अर्थसंकल्प',
    'शपथविधी', 'मंत्रिमंडळ', 'राजकीय', 'नेते',
  ],
  'gurhegeari': [
    'अटक', 'गुन्हा', 'पोलीस', 'FIR', 'तक्रार', 'दरोडा', 'खून', 'हत्या',
    'फसवणूक', 'सायबर', 'तस्कर', 'अंमली', 'गुन्हेगार', 'चोरी', 'बलात्कार',
    'गुन्हेगारी', 'न्यायालय', 'कोर्ट', 'शिक्षा', 'जामीन', 'कैदी',
  ],
  'krida': [
    'सामना', 'विजय', 'संघ', 'क्रिकेट', 'खेळाडू', 'कर्णधार', 'षटकार',
    'विश्वचषक', 'IPL', 'कबड्डी', 'हॉकी', 'फुटबॉल', 'बॅडमिंटन', 'टेनिस',
    'ऑलिम्पिक', 'स्पर्धा', 'पदक', 'गोल', 'रणजी', 'BCCI',
  ],
  'vyavsay': [
    'शेअर', 'बाजार', 'नफा', 'कंपनी', 'अर्थव्यवस्था', 'गुंतवणूक', 'बँक',
    'RBI', 'GST', 'ITR', 'स्टार्टअप', 'उद्योग', 'निर्यात', 'आयात',
    'महागाई', 'रुपया', 'व्याज', 'कर्ज', 'बजेट', 'Sensex', 'Nifty',
  ],
  'manoranjan': [
    'चित्रपट', 'मराठी', 'बॉलीवूड', 'हिंदी', 'अभिनेता', 'अभिनेत्री',
    'दिग्दर्शक', 'रिलीज', 'गाणे', 'मालिका', 'टीव्ही', 'OTT', 'Netflix',
    'रंगभूमी', 'नाटक', 'पुरस्कार', 'सिनेमा', 'मनोरंजन',
  ],
  'desh': [
    'दिल्ली', 'मोदी', 'केंद्र सरकार', 'संसद', 'राष्ट्रीय', 'देश',
    'भारत', 'प्रधानमंत्री', 'गृहमंत्री', 'सर्वोच्च न्यायालय',
    'राज्यसभा', 'लोकसभा', 'राष्ट्रपती',
  ],
  'jag': [
    'अमेरिका', 'चीन', 'पाकिस्तान', 'रशिया', 'युक्रेन', 'युरोप',
    'आंतरराष्ट्रीय', 'जगभर', 'विदेश', 'परदेश', 'संयुक्त राष्ट्र', 'NATO',
    'जग', 'ग्लोबल',
  ],
}

// City / district keyword dictionary (Marathi name variants → English DB key)
const CITY_KEYWORDS: Record<string, string[]> = {
  // Tier-1 metros
  'pune':        ['पुणे', 'पुण्यात', 'पुण्याच्या', 'पुण्याहून', 'पुण्याला', 'पुणेकर'],
  'mumbai':      ['मुंबई', 'मुंबईत', 'मुंबईच्या', 'मुंबईहून', 'मुंबईला', 'मुंबईकर'],
  'nagpur':      ['नागपूर', 'नागपुरात', 'नागपुरच्या', 'नागपुरला'],
  'thane':       ['ठाणे', 'ठाण्यात', 'ठाण्याच्या', 'ठाण्याला'],
  // Tier-2 cities / districts
  'nashik':      ['नाशिक', 'नाशिकमध्ये', 'नाशिकच्या', 'नाशिकला'],
  'kolhapur':    ['कोल्हापूर', 'कोल्हापुरात', 'कोल्हापुरच्या'],
  'solapur':     ['सोलापूर', 'सोलापुरात', 'सोलापुरच्या'],
  'aurangabad':  ['औरंगाबाद', 'छत्रपती संभाजीनगर', 'औरंगाबादेत', 'संभाजीनगरात'],
  'amravati':    ['अमरावती', 'अमरावतीत', 'अमरावतीच्या'],
  'nanded':      ['नांदेड', 'नांदेडमध्ये', 'नांदेडच्या'],
  'akola':       ['अकोला', 'अकोल्यात', 'अकोल्याच्या'],
  'latur':       ['लातूर', 'लातूरमध्ये', 'लातूरच्या'],
  'osmanabad':   ['उस्मानाबाद', 'धाराशिव', 'धाराशिवमध्ये'],
  'jalgaon':     ['जळगाव', 'जळगावमध्ये', 'जळगावच्या'],
  'ahmednagar':  ['अहमदनगर', 'नगरमध्ये', 'नगरच्या', 'अहमदनगरमध्ये'],
  'sangli':      ['सांगली', 'सांगलीत', 'सांगलीच्या'],
  'satara':      ['सातारा', 'सातारामध्ये', 'साताऱ्यात'],
  'raigad':      ['रायगड', 'रायगडमध्ये', 'अलिबाग'],
  'ratnagiri':   ['रत्नागिरी', 'रत्नागिरीत', 'रत्नागिरीच्या'],
  'sindhudurg':  ['सिंधुदुर्ग', 'सिंधुदुर्गमध्ये'],
  'dhule':       ['धुळे', 'धुळ्यात', 'धुळ्याच्या'],
  'nandurbar':   ['नंदुरबार', 'नंदुरबारमध्ये'],
  'wardha':      ['वर्धा', 'वर्ध्यात', 'वर्ध्याच्या'],
  'yavatmal':    ['यवतमाळ', 'यवतमाळमध्ये'],
  'buldhana':    ['बुलढाणा', 'बुलडाणामध्ये'],
  'washim':      ['वाशीम', 'वाशिममध्ये'],
  'hingoli':     ['हिंगोली', 'हिंगोलीमध्ये'],
  'parbhani':    ['परभणी', 'परभणीमध्ये'],
  'beed':        ['बीड', 'बीडमध्ये', 'बीडच्या'],
  'jalna':       ['जालना', 'जालन्यात'],
  'gondia':      ['गोंदिया', 'गोंदियामध्ये'],
  'bhandara':    ['भंडारा', 'भंडाऱ्यात'],
  'chandrapur':  ['चंद्रपूर', 'चंद्रपुरात'],
  'gadchiroli':  ['गडचिरोली', 'गडचिरोलीमध्ये'],
  'palghar':     ['पालघर', 'पालघरमध्ये'],
  'mumbai suburban': ['मुंबई उपनगर', 'उपनगरात'],
}

// Area keyword dictionary (sub-city locations → area tags)
const AREA_KEYWORDS: Record<string, string[]> = {
  'hinjawadi': ['हिंजवडी', 'हिंजवडीत'],
  'baner': ['बाणेर', 'बाणेरमध्ये'],
  'wakad': ['वाकड', 'वाकडमध्ये'],
  'kothrud': ['कोथरूड', 'कोथरूडमध्ये'],
  'hadapsar': ['हडपसर', 'हडपसरमध्ये'],
  'dadar': ['दादर', 'दादरला'],
  'bandra': ['वांद्रे', 'बांद्रा'],
  'andheri': ['अंधेरी', 'अंधेरीत'],
  'dharavi': ['धारावी'],
}

function countMatches(text: string, keywords: string[]): number {
  return keywords.reduce((count, kw) => count + (text.includes(kw) ? 1 : 0), 0)
}

export function extractCategories(text: string): TaggerResult[] {
  const results: TaggerResult[] = []

  for (const [slug, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    const matches = countMatches(text, keywords)
    if (matches === 0) continue

    // Confidence scales with number of distinct keyword hits, caps at 1
    const confidence = Math.min(1, matches / 3)
    results.push({ categorySlug: slug, confidence })
  }

  return results.sort((a, b) => b.confidence - a.confidence)
}

export function extractCities(text: string): LocationResult[] {
  const results: LocationResult[] = []

  for (const [name, variants] of Object.entries(CITY_KEYWORDS)) {
    const matches = countMatches(text, variants)
    if (matches === 0) continue
    results.push({ name, confidence: Math.min(1, matches / 2) })
  }

  return results.sort((a, b) => b.confidence - a.confidence)
}

export function extractAreas(text: string): LocationResult[] {
  const results: LocationResult[] = []

  for (const [name, variants] of Object.entries(AREA_KEYWORDS)) {
    if (countMatches(text, variants) > 0) {
      results.push({ name, confidence: 0.9 })
    }
  }

  return results
}

// ---------------------------------------------------------------------------
// Tag extraction — pure text algorithm, no third-party dependency
// ---------------------------------------------------------------------------

/**
 * Extract meaningful keywords from news content to use as comma-separated tags.
 * Title gets 3× weight; HTML is stripped from body.
 * Returns up to `maxTags` unique terms sorted by frequency.
 */
export function extractTags(title: string, summary: string, bodyHtml: string, maxTags = 8): string[] {
  const bodyText = bodyHtml.replace(/<[^>]+>/g, ' ')
  const fullText = `${title} ${title} ${title} ${summary} ${bodyText}`.slice(0, 6000)

  const freq = new Map<string, number>()

  // Split on whitespace and common punctuation / Devanagari sentence markers
  const tokens = fullText.split(/[\s,।॥.!?;:"'()\[\]{}/\\|]+/)

  for (const raw of tokens) {
    const word = raw.replace(/^[-–—]+|[-–—]+$/g, '').trim()
    if (!word || word.length < 3) continue

    // Determine script: Devanagari vs Latin
    const devanagariChars = (word.match(/[\u0900-\u097F]/g) ?? []).length
    const isDevanagari = devanagariChars > word.length * 0.5

    if (isDevanagari) {
      if (word.length < 4) continue
      if (MARATHI_STOP_WORDS.has(word)) continue
      freq.set(word, (freq.get(word) ?? 0) + 1)
    } else {
      const lower = word.toLowerCase()
      if (ENGLISH_STOP_WORDS.has(lower)) continue
      if (word.length < 3) continue

      // Prefer proper nouns (starts uppercase) or ALL-CAPS abbreviations (e.g. BJP, IPC)
      const key = /^[A-Z]/.test(word) ? word : lower
      freq.set(key, (freq.get(key) ?? 0) + 1)
    }
  }

  // Sort by frequency desc, then alphabetically for stability
  const sorted = Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([word]) => word)

  // Deduplicate case-insensitively (keep the highest-ranked casing variant)
  const seen = new Set<string>()
  const tags: string[] = []
  for (const word of sorted) {
    const key = word.toLowerCase()
    if (!seen.has(key)) {
      seen.add(key)
      tags.push(word)
    }
    if (tags.length >= maxTags) break
  }

  return tags
}

// ---------------------------------------------------------------------------
// Composite tagger
// ---------------------------------------------------------------------------

// Composite: tag an article, return all signals
export interface TaggingResult {
  categories: TaggerResult[]
  cities:     LocationResult[]
  areas:      LocationResult[]
  lowConfidence: boolean  // true if best category confidence < 0.4 → trigger AI tagger
}

export function tagArticle(title: string, bodyHtml: string): TaggingResult {
  // Strip HTML tags for plain text analysis
  const bodyText = bodyHtml.replace(/<[^>]+>/g, ' ')
  // Weight title 3× by repeating it
  const text = `${title} ${title} ${title} ${bodyText}`.slice(0, 5000)

  const categories = extractCategories(text)
  const cities = extractCities(text)
  const areas = extractAreas(text)

  const bestConfidence = categories[0]?.confidence ?? 0

  return {
    categories,
    cities,
    areas,
    lowConfidence: bestConfidence < 0.4,
  }
}
