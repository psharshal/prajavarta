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

// City keyword dictionary (Marathi name variants)
const CITY_KEYWORDS: Record<string, string[]> = {
  'pune': ['पुणे', 'पुण्यात', 'पुण्याच्या', 'पुण्याहून', 'पुण्याला', 'पुणेकर'],
  'mumbai': ['मुंबई', 'मुंबईत', 'मुंबईच्या', 'मुंबईहून', 'मुंबईला', 'मुंबईकर'],
  'nagpur': ['नागपूर', 'नागपुरात', 'नागपुरच्या'],
  'aurangabad': ['औरंगाबाद', 'छत्रपती संभाजीनगर', 'औरंगाबादेत'],
  'nashik': ['नाशिक', 'नाशिकमध्ये', 'नाशिकच्या'],
  'kolhapur': ['कोल्हापूर', 'कोल्हापुरात'],
  'solapur': ['सोलापूर', 'सोलापुरात'],
  'thane': ['ठाणे', 'ठाण्यात', 'ठाण्याच्या'],
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
