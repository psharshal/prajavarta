import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { computeScore, freshnessScore } from '@/lib/scoring'

type EditorialLabel = 'NORMAL' | 'FEATURED' | 'HERO_CANDIDATE' | 'MAIN_HERO' | 'BREAKING'

// Called by cron every 15 minutes.
// Called every 15 minutes via system cron or node-cron hitting GET /api/cron/score?secret=YOUR_SECRET
// Your system cron entry on the dedicated server would look like: */15 * * * * curl -s "https://yourdomain.com/api/cron/score?secret=YOUR_CRON_SECRET"
// Protect with CRON_SECRET env var.
export async function GET(req: NextRequest) {
  // Accepts: x-cron-secret header (own server), Authorization Bearer (Vercel cron), or ?secret= param
  const bearerToken = req.headers.get('authorization')?.replace('Bearer ', '')
  const secret = req.headers.get('x-cron-secret') ?? bearerToken ?? req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const now = new Date()

    // Auto-unpin hero articles whose pin has expired
    await prisma.news.updateMany({
      where: { pinToHomepage: true, pinExpiresAt: { not: null, lt: now } },
      data:  { pinToHomepage: false, pinExpiresAt: null },
    })

    // Score: recent articles + unscored + any with active manual boost
    const cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const articles = await prisma.news.findMany({
      where: {
        isActive: true,
        status: 'PUBLISHED',
        OR: [
          { publishedDate: { gte: cutoff } },          // published in last 7 days
          { newsScore: { is: null } },                  // never scored yet
          { boostScore: { gt: 0 } },                    // admin set a manual boost
        ],
      },
      include: { newsScore: true, newsCategories: { include: { category: true } } },
    })

    let updated = 0

    for (const article of articles) {
      const viewsLast2Hrs = article.newsScore?.viewsLast2Hrs ?? 0

      const finalScore = computeScore(
        {
          publishedDate:  article.publishedDate,
          viewCount:      article.viewCount,
          viewsLast2Hrs,
          editorialLabel: article.editorialLabel as EditorialLabel,
          isBreakingNews: article.isBreakingNews,
          boostScore:     article.boostScore,
          expireBoostAt:  article.expireBoostAt,
          topicRelevance: article.newsCategories[0]?.relevanceScore ?? 50,
          locationScore:  50,
          ctrScore:       article.newsScore?.ctrScore ?? 0,
        },
        'homepage'
      )

      const fresh = freshnessScore(article.publishedDate)

      await prisma.newsScore.upsert({
        where: { newsId: article.id },
        create: {
          newsId:        article.id,
          finalScore,
          freshnessScore: fresh,
          velocityScore:  viewsLast2Hrs * 0.4,
          viewsLast2Hrs,
          ctrScore:       article.newsScore?.ctrScore ?? 0,
          editorialScore: article.newsScore?.editorialScore ?? 0,
          breakingBoost:  article.isBreakingNews ? 100 : 0,
          manualBoost:    article.boostScore,
        },
        update: {
          finalScore,
          freshnessScore: fresh,
          velocityScore:  viewsLast2Hrs * 0.4,
          viewsLast2Hrs,
          breakingBoost:  article.isBreakingNews ? 100 : 0,
          manualBoost:    article.boostScore,
        },
      })

      updated++
    }

    return NextResponse.json({ success: true, updated, total: articles.length })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
