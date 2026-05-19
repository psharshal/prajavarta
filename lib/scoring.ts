import { EditorialLabel } from '@prisma/client'

// Weights per feed context
export type FeedContext = 'homepage' | 'category' | 'city' | 'tag' | 'author'

const WEIGHTS: Record<FeedContext, Record<string, number>> = {
  homepage: { freshness: 0.30, location: 0.20, topic: 0.15, velocity: 0.15, editorial: 0.10, ctr: 0.10 },
  category: { freshness: 0.25, location: 0.10, topic: 0.35, velocity: 0.15, editorial: 0.10, ctr: 0.05 },
  city:     { freshness: 0.25, location: 0.35, topic: 0.20, velocity: 0.10, editorial: 0.05, ctr: 0.05 },
  tag:      { freshness: 0.30, location: 0.10, topic: 0.35, velocity: 0.15, editorial: 0.05, ctr: 0.05 },
  author:   { freshness: 0.40, location: 0.10, topic: 0.20, velocity: 0.20, editorial: 0.05, ctr: 0.05 },
}

// Editorial label → score contribution (0–100)
const EDITORIAL_SCORES: Record<EditorialLabel, number> = {
  NORMAL:         0,
  FEATURED:      30,
  HERO_CANDIDATE: 60,
  MAIN_HERO:    100,
  BREAKING:     100,
}

interface ScoreInputs {
  publishedDate:   Date | null
  viewCount:       number
  viewsLast2Hrs:   number
  editorialLabel:  EditorialLabel
  isBreakingNews:  boolean
  pinToHomepage:   boolean
  boostScore:      number
  expireBoostAt:   Date | null
  // From NewsCategory join
  topicRelevance:  number  // 0–100, relevance_score for this category
  locationScore:   number  // 0–100, geo segment boost applied by caller
  ctrScore:        number  // 0–100
}

export function computeScore(inputs: ScoreInputs, context: FeedContext = 'homepage'): number {
  const w = WEIGHTS[context]

  // Freshness: 100 at publish, halves every 6 hours
  const ageHours = inputs.publishedDate
    ? (Date.now() - new Date(inputs.publishedDate).getTime()) / 3_600_000
    : 999
  const freshness = Math.max(0, 100 * Math.pow(0.5, ageHours / 6))

  // Velocity: pageviews in last 2 hrs, normalised to 0–100 (cap at 250 views)
  const velocity = Math.min(100, (inputs.viewsLast2Hrs / 250) * 100)

  // Editorial score from label
  const editorial = EDITORIAL_SCORES[inputs.editorialLabel] ?? 0

  // Base weighted score
  const base =
    freshness              * w.freshness  +
    inputs.locationScore   * w.location   +
    inputs.topicRelevance  * w.topic      +
    velocity               * w.velocity   +
    editorial              * w.editorial  +
    inputs.ctrScore        * w.ctr

  // Hard overrides
  let score = base
  if (inputs.isBreakingNews || inputs.editorialLabel === 'BREAKING') score += 100
  if (inputs.pinToHomepage) score += 200

  // Manual boost (time-limited)
  const boostActive =
    inputs.boostScore > 0 &&
    (!inputs.expireBoostAt || new Date(inputs.expireBoostAt) > new Date())
  if (boostActive) score += inputs.boostScore

  return Math.round(score * 100) / 100
}

// Freshness score only (used standalone in cron)
export function freshnessScore(publishedDate: Date | null): number {
  if (!publishedDate) return 0
  const ageHours = (Date.now() - new Date(publishedDate).getTime()) / 3_600_000
  return Math.max(0, Math.round(100 * Math.pow(0.5, ageHours / 6) * 100) / 100)
}
