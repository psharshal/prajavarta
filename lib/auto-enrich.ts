/**
 * auto-enrich.ts
 *
 * DB-aware enrichment layer: resolves auto-detected category, district, and
 * tags from news text when the caller has not provided those fields.
 *
 * Algorithm (no third-party services):
 *  - Category  → keyword frequency scoring via extractCategories(); top slugs
 *                are resolved in ONE batched DB query, then ranked by original
 *                confidence order.
 *  - District  → keyword matching via extractCities(); all detected city names
 *                are looked up in ONE batched DB query, then ranked by
 *                confidence order.
 *  - Tags      → frequency-ranked keyword extraction via extractTags();
 *                returned as a comma-separated string.
 *
 * Using batched queries (2 total) instead of sequential per-item queries
 * avoids holding DB connections longer than necessary.
 */

import prisma from '@/lib/prisma'
import { tagArticle, extractTags } from '@/lib/tagger'

export interface AutoEnrichResult {
  /** Resolved DB primary key, or null if nothing matched */
  categoryId: number | null
  /** Resolved DB primary key, or null if no city mention found */
  districtId: number | null
  /** Comma-separated keywords, or null if no meaningful tokens extracted */
  tags: string | null
}

/**
 * Analyse the supplied text fields and return auto-detected enrichment values.
 * All fields are independently optional — pass empty strings for fields the
 * caller doesn't have yet.
 *
 * Executes exactly 2 DB queries regardless of how many categories / cities
 * are detected, keeping connection hold-time minimal.
 */
export async function autoEnrichNews(
  title: string,
  summary: string,
  description: string,
): Promise<AutoEnrichResult> {
  const safeTitle   = title       ?? ''
  const safeSummary = summary     ?? ''
  const safeBody    = description ?? ''

  // Run keyword tagger (pure CPU — no DB)
  const tagging = tagArticle(safeTitle, `${safeSummary} ${safeBody}`)

  // ------------------------------------------------------------------
  // 1 & 2: Fire both DB lookups in parallel — single round-trip each
  // ------------------------------------------------------------------
  const categorySlugs = tagging.categories.map(c => c.categorySlug)
  const cityNames     = tagging.cities.map(c => c.name)

  const [categoryRows, districtRows] = await Promise.all([
    categorySlugs.length > 0
      ? prisma.category.findMany({
          where: { slug: { in: categorySlugs }, isActive: true },
          select: { id: true, slug: true },
        })
      : Promise.resolve([]),

    cityNames.length > 0
      ? prisma.district.findMany({
          where: { nameEnglish: { in: cityNames }, isActive: true },
          select: { id: true, nameEnglish: true },
        })
      : Promise.resolve([]),
  ])

  // ------------------------------------------------------------------
  // Pick the highest-confidence match by preserving tagger rank order
  // ------------------------------------------------------------------

  // Category: walk tagger results in confidence order, pick first DB hit
  let categoryId: number | null = null
  for (const result of tagging.categories) {
    const row = categoryRows.find(r => r.slug === result.categorySlug)
    if (row) { categoryId = row.id; break }
  }

  // District: walk tagger city results in confidence order, pick first DB hit
  // nameEnglish is stored as e.g. "Pune"; MariaDB default collation is
  // case-insensitive, so "pune" === "Pune" in the query above.
  let districtId: number | null = null
  for (const city of tagging.cities) {
    const row = districtRows.find(
      r => r.nameEnglish?.toLowerCase() === city.name.toLowerCase(),
    )
    if (row) { districtId = row.id; break }
  }

  // ------------------------------------------------------------------
  // 3. Tags: pure-text extraction (no DB needed)
  // ------------------------------------------------------------------
  const tagList = extractTags(safeTitle, safeSummary, safeBody)
  const tags = tagList.length > 0 ? tagList.join(', ') : null

  return { categoryId, districtId, tags }
}
