import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyToken, ADMIN_AUTH_COOKIE_NAME } from '@/lib/auth'

async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get(ADMIN_AUTH_COOKIE_NAME)?.value
  if (!token) return null
  const decoded = await verifyToken(token)
  if (!decoded) return null
  if (!['SUPER_ADMIN', 'MODERATOR', 'REPORTER', 'AD_MANAGER'].includes(decoded.role)) return null
  return decoded
}

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const [
      totalNews,
      totalUsers,
      totalCategories,
      totalDistricts,
      pendingReview,
      breakingNews,
      todayNews,
      topStories,
      heroArticle,
    ] = await Promise.all([
      prisma.news.count({ where: { status: 'PUBLISHED' } }),
      prisma.user.count(),
      prisma.category.count({ where: { isActive: true } }),
      prisma.district.count(),
      prisma.news.count({ where: { status: 'PENDING_REVIEW' } }),
      prisma.news.count({ where: { isBreakingNews: true, isActive: true } }),
      prisma.news.count({
        where: {
          status: 'PUBLISHED',
          publishedDate: { gte: todayStart },
        },
      }),
      prisma.news.findMany({
        where: {
          status: 'PUBLISHED',
          publishedDate: { gte: sevenDaysAgo },
        },
        orderBy: { viewCount: 'desc' },
        take: 5,
        select: {
          id: true,
          title: true,
          slug: true,
          viewCount: true,
          publishedDate: true,
          category: { select: { id: true, name: true, nameEnglish: true, slug: true } },
        },
      }),
      prisma.news.findFirst({
        where: { pinToHomepage: true },
        select: { id: true, title: true, slug: true, featuredImage: true, publishedDate: true, pinExpiresAt: true, category: { select: { name: true } }, newsScore: { select: { finalScore: true } } },
      }),
    ])

    const heroSelect = { id: true, title: true, slug: true, featuredImage: true, publishedDate: true, pinExpiresAt: true, category: { select: { name: true } }, newsScore: { select: { finalScore: true } } }

    // If nothing pinned, show highest-scoring published article
    const hero = heroArticle ?? await prisma.news.findFirst({
      where: { isActive: true, status: 'PUBLISHED' },
      orderBy: { newsScore: { finalScore: 'desc' } },
      select: heroSelect,
    })

    return NextResponse.json({
      success: true,
      data: {
        totalNews,
        totalUsers,
        totalCategories,
        totalDistricts,
        pendingReview,
        breakingNews,
        todayNews,
        topStories,
        heroArticle: hero,
        heroIsPinned: !!heroArticle,
      },
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
