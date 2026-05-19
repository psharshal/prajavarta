// Marathi ↔ English slug translation
const EN_TO_MR: Record<string, string> = {
  home: 'मुख्यपृष्ठ',
  maharashtra: 'महाराष्ट्र',
  pune: 'पुणे',
  mumbai: 'मुंबई',
  nagpur: 'नागपूर',
  politics: 'राजकारण',
  crime: 'गुन्हेगारी',
  entertainment: 'मनोरंजन',
  sports: 'क्रीडा',
  business: 'व्यवसाय',
  nation: 'देश',
  world: 'जग',
}

const MR_TO_EN: Record<string, string> = {
  मुख्यपृष्ठ: 'home',
  महाराष्ट्र: 'maharashtra',
  पुणे: 'pune',
  मुंबई: 'mumbai',
  नागपूर: 'nagpur',
  राजकारण: 'politics',
  गुन्हेगारी: 'crime',
  मनोरंजन: 'entertainment',
  क्रीडा: 'sports',
  व्यवसाय: 'business',
  देश: 'nation',
  जग: 'world',
}

export function slugToMarathi(word: string): string {
  if (!word) return ''
  return EN_TO_MR[word.toLowerCase()] ?? word
}

export function slugToEnglish(word: string): string {
  if (!word) return ''
  return MR_TO_EN[word] ?? word
}

// Marathi time-ago
export function timeAgo(timestamp: string | Date | null | undefined): string {
  if (!timestamp) return ''
  const now = new Date()
  const past = new Date(timestamp)
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  if (seconds < 60) return `${seconds} सेकंदांपूर्वी`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} मिनिटांपूर्वी`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} तासांपूर्वी`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days} दिवसांपूर्वी`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} महिन्यांपूर्वी`
  return `${Math.floor(months / 12)} वर्षांपूर्वी`
}

// Marathi date formatting
const MARATHI_MONTHS = [
  'जानेवारी','फेब्रुवारी','मार्च','एप्रिल','मे','जून',
  'जुलै','ऑगस्ट','सप्टेंबर','ऑक्टोबर','नोव्हेंबर','डिसेंबर',
]
const MARATHI_DIGITS = ['०','१','२','३','४','५','६','७','८','९']

export function toMarathiNumber(value: number | string): string {
  return String(value).replace(/\d/g, d => MARATHI_DIGITS[Number(d)])
}

export function formatMarathiDate(timestamp: string | Date | null | undefined): string {
  if (!timestamp) return ''
  const d = new Date(timestamp)
  return `${toMarathiNumber(d.getDate())} ${MARATHI_MONTHS[d.getMonth()]}`
}

export function formatMarathiDateFull(timestamp: string | Date | null | undefined): string {
  if (!timestamp) return ''
  const d = new Date(timestamp)
  return `${toMarathiNumber(d.getDate())} ${MARATHI_MONTHS[d.getMonth()]}, ${toMarathiNumber(d.getFullYear())}`
}

// Category name helpers
export function getCategoryNames(
  categoryIds: string | number[] | null | undefined,
  categories: { id: number; name: string }[]
): string | string[] {
  if (!categoryIds || !categories.length) return []
  const ids = Array.isArray(categoryIds)
    ? categoryIds.map(String)
    : String(categoryIds).split(',').map(s => s.trim()).filter(Boolean)
  const names = ids
    .map(id => categories.find(c => String(c.id) === id)?.name ?? null)
    .filter(Boolean) as string[]
  return ids.length === 1 ? names[0] ?? '' : names
}

export function getCategoryNamesEnglish(
  categoryIds: string | number[] | null | undefined,
  categories: { id: number; nameEnglish?: string | null }[]
): string | string[] {
  if (!categoryIds || !categories.length) return []
  const ids = Array.isArray(categoryIds)
    ? categoryIds.map(String)
    : String(categoryIds).split(',').map(s => s.trim()).filter(Boolean)
  const names = ids
    .map(id => categories.find(c => String(c.id) === id)?.nameEnglish?.toLowerCase() ?? null)
    .filter(Boolean) as string[]
  return ids.length === 1 ? names[0] ?? '' : names
}

// Slug generation (for Marathi titles — strips non-word chars)
export function generateSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
}
