import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { computeScore, freshnessScore } from '@/lib/scoring'
import { EditorialLabel } from '@prisma/client'

// Called by cron every 15 minutes.
// Vercel: add to vercel.json crons. Own server: call via node-cron or system cron.
// Protect with CRON_SECRET env var.
export async function GET(req: NextRequest) {
  const secret = req.headers.get('x-cron-secret') ?? req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Score articles published in the last 7 days
    const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const articles = await prisma.news.findMany({
      where: { isActive: true, status: 'PUBLISHED', publishedDate: { gte: cutoff } },
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
          pinToHomepage:  article.pinToHomepage,
          boostScore:     article.boostScore,
          expireBoostAt:  article.expireBoostAt,
          topicRelevance: article.newsCategories[0]?.relevanceScore ?? 50,
          locationScore:  50, // neutral for cron; geo boosts applied per-request
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
