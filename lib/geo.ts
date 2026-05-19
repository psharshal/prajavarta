// Geo-personalization using MaxMind GeoLite2.
// On own server: reads GeoLite2-City.mmdb from local filesystem.
// Falls back gracefully if the DB file is not yet downloaded.

import { NextRequest } from 'next/server'

export type GeoSegment = 'A' | 'B' | 'C' | 'D' | 'E'

export interface GeoResult {
  segment:  GeoSegment
  country:  string | null
  state:    string | null
  city:     string | null
}

// Score boosts per segment (added on top of base final_score)
export const GEO_BOOSTS: Record<GeoSegment, Record<string, number>> = {
  A: { area: 60, city: 35, maharashtra: 10 },
  B: { city: 35, maharashtra: 10 },
  C: { maharashtra: 10 },
  D: { desh: 40, maharashtra: 5 },
  E: { jag: 30, desh: 20, maharashtra: 10 },
}

// Segment category order for homepage (first category shown first)
export const SEGMENT_CATEGORY_ORDER: Record<GeoSegment, string[]> = {
  A: ['maharashtra', 'pune', 'rajkaran', 'gurhegeari', 'krida', 'vyavsay'],
  B: ['maharashtra', 'pune', 'rajkaran', 'gurhegeari', 'krida', 'vyavsay'],
  C: ['maharashtra', 'rajkaran', 'gurhegeari', 'krida', 'vyavsay', 'manoranjan'],
  D: ['desh', 'maharashtra', 'rajkaran', 'vyavsay', 'krida', 'manoranjan'],
  E: ['jag', 'desh', 'maharashtra', 'manoranjan', 'krida', 'vyavsay'],
}

export const GEO_COOKIE = 'pv_geo'

// Attempt GeoLite2 lookup — gracefully no-ops if mmdb not installed yet
let Reader: any = null

async function getReader() {
  if (Reader) return Reader
  try {
    const { open } = await import('mmdb-lib' as any)
    const { readFile } = await import('fs/promises')
    const dbPath = process.env.GEOLITE2_PATH ?? '/opt/GeoLite2-City.mmdb'
    const buf = await readFile(dbPath)
    Reader = open(buf)
    return Reader
  } catch {
    return null
  }
}

export async function detectGeo(ip: string): Promise<GeoResult> {
  try {
    const reader = await getReader()
    if (!reader) return defaultGeo()

    const result = reader.get(ip)
    if (!result) return defaultGeo()

    const country = result.country?.iso_code ?? null
    const state   = result.subdivisions?.[0]?.names?.en?.toLowerCase() ?? null
    const city    = result.city?.names?.en?.toLowerCase() ?? null

    const segment = classifySegment(country, state, city)
    return { segment, country, state, city }
  } catch {
    return defaultGeo()
  }
}

function defaultGeo(): GeoResult {
  return { segment: 'C', country: 'IN', state: 'maharashtra', city: null }
}

function classifySegment(
  country: string | null,
  state: string | null,
  city: string | null
): GeoSegment {
  if (country !== 'IN') return 'E'

  const isMH = state?.includes('maharashtra') ?? false
  if (!isMH) return 'D'

  if (city) return 'B'  // city known → B (area upgrade happens via browser geo)
  return 'C'
}

// Parse stored cookie value
export function parseGeoCookie(value: string | undefined): GeoResult {
  if (!value) return defaultGeo()
  try {
    return JSON.parse(decodeURIComponent(value)) as GeoResult
  } catch {
    return defaultGeo()
  }
}

// Get geo from request: cookie first, then live lookup
export async function geoFromRequest(req: NextRequest): Promise<GeoResult> {
  const cookie = req.cookies.get(GEO_COOKIE)?.value
  if (cookie) return parseGeoCookie(cookie)

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    '127.0.0.1'

  return detectGeo(ip)
}
