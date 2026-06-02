import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyToken, ADMIN_AUTH_COOKIE_NAME } from '@/lib/auth'
import { tagArticle } from '@/lib/tagger'
import { computeScore, freshnessScore } from '@/lib/scoring'

type EditorialLabel = 'NORMAL' | 'FEATURED' | 'HERO_CANDIDATE' | 'MAIN_HERO' | 'BREAKING'
type ArticleStatus = 'DRAFT' | 'PENDING_REVIEW' | 'APPROVED' | 'PUBLISHED' | 'REJECTED'

async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get(ADMIN_AUTH_COOKIE_NAME)?.value
  if (!token) return null
  const decoded = await verifyToken(token)
  if (!decoded) return null
  if (!['SUPER_ADMIN', 'MODERATOR', 'REPORTER', 'AD_MANAGER'].includes(decoded.role)) return null
  return decoded
}

async function buildUniqueSlug(title: string, excludeId?: number): Promise<string> {
  const base = (title ?? '')
    .toLowerCase().trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '') || `news-${Date.now()}`

  let slug = base
  let i = 1
  while (true) {
    const existing = await prisma.news.findFirst({
      where: { slug, ...(excludeId ? { id: { not: excludeId } } : {}) },
      select: { id: true },
    })
    if (!existing) return slug
    slug = `${base}-${i++}`
  }
}

function toInt(v: any): number | null {
  const n = parseInt(String(v ?? ''), 10)
  return isNaN(n) ? null : n
}

export async function GET(req: NextRequest) {
  if (!await requireAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = req.nextUrl
  const id = toInt(searchParams.get('id'))

  if (id) {
    const news = await prisma.news.findUnique({
      where: { id },
      include: { category: true, district: true, subdivision: true, tehsil: true, galleryImages: true, newsCategories: { include: { category: true } } },
    })
    if (!news) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: news })
  }

  const page    = parseInt(searchParams.get('page') ?? '1')
  const limit   = parseInt(searchParams.get('limit') ?? '12')
  const search  = searchParams.get('search') ?? ''
  const status  = searchParams.get('status') as ArticleStatus | null
  const skip    = (page - 1) * limit

  const where: any = {
    ...(search && { title: { contains: search } }),
    ...(status  && { status }),
  }

  const heroSelect = {
    id: true, title: true, slug: true, pinExpiresAt: true, pinToHomepage: true,
    category: { select: { name: true } },
    newsScore: { select: { finalScore: true } },
  }

  const [total, data, adminPinned] = await Promise.all([
    prisma.news.count({ where }),
    prisma.news.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: {
        category: true,
        author: { select: { id: true, name: true } },
        newsScore: { select: { finalScore: true } },
      },
    }),
    prisma.news.findFirst({
      where: { pinToHomepage: true },
      select: heroSelect,
    }),
  ])

  // If no admin pin, show the highest-scoring published article as the current hero
  const hero = adminPinned ?? await prisma.news.findFirst({
    where: { isActive: true, status: 'PUBLISHED' },
    orderBy: { newsScore: { finalScore: 'desc' } },
    select: heroSelect,
  })

  return NextResponse.json({
    success: true,
    data,
    pinned: hero,
    pinnedByAdmin: !!adminPinned,
    pagination: { total, page, limit, pages: Math.ceil(total / limit) },
  })
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const slug = await buildUniqueSlug(body.title ?? '')

    const news = await prisma.news.create({
      data: {
        slug,
        newsType:          body.newsType ?? 'Image',
        ownerType:         body.ownerType ?? 'ADMIN',
        title:             body.title?.trim(),
        summary:           body.summary?.trim() ?? null,
        description:       body.description?.trim() ?? null,
        language:          body.language ?? 'Marathi',
        featuredImage:     body.featuredImage ?? null,
        tags:              body.tags ?? null,
        videoId:           body.videoId ?? null,
        videoUrl:          body.videoUrl ?? null,
        isBreakingNews:    body.editorialLabel === 'BREAKING',
        isTrendingNews:    body.isTrendingNews ?? false,
        isMiniTrendingNews: body.isMiniTrendingNews ?? false,
        editorialLabel:    (body.editorialLabel as EditorialLabel) ?? 'NORMAL',
        pinToHomepage:     body.pinToHomepage ?? false,
        pinExpiresAt:      body.pinToHomepage ? new Date(Date.now() + 24 * 60 * 60 * 1000) : null,
        boostScore:        toInt(body.boostScore) ?? 0,
        expireBoostAt:     body.expireBoostAt ? new Date(body.expireBoostAt) : null,
        status:            (body.status as ArticleStatus) ?? 'DRAFT',
        isActive:          body.isActive !== false,
        publishedDate:     body.publishedDate ? new Date(body.publishedDate) : null,
        sendNotification:  body.sendNotification ?? false,
        categoryId:        toInt(body.categoryId),
        districtId:        toInt(body.districtId),
        subdivisionId:     toInt(body.subdivisionId),
        tehsilId:          toInt(body.tehsilId),
        locationId:        toInt(body.locationId),
        authorId:          toInt(body.authorId),
        userId:            admin.userId,
      },
    })

    // Auto-tag with keyword tagger
    const tagging = tagArticle(body.title ?? '', body.description ?? '')
    const categoryIds: number[] = Array.isArray(body.categoryIds) ? body.categoryIds.map(Number).filter(Boolean) : []

    // Merge editor-selected categories with auto-detected ones
    for (const result of tagging.categories) {
      const cat = await prisma.category.findFirst({ where: { slug: result.categorySlug } })
      if (cat && !categoryIds.includes(cat.id)) {
        await prisma.newsCategory.create({
          data: { newsId: news.id, categoryId: cat.id, relevanceScore: result.confidence * 100, confidenceScore: result.confidence, isAutoTagged: true },
        }).catch(() => {})
      }
    }

    // Editor-selected categories at full confidence
    for (const catId of categoryIds) {
      await prisma.newsCategory.upsert({
        where: { newsId_categoryId: { newsId: news.id, categoryId: catId } },
        create: { newsId: news.id, categoryId: catId, relevanceScore: 100, confidenceScore: 1, isAutoTagged: false },
        update: { relevanceScore: 100, isAutoTagged: false },
      }).catch(() => {})
    }

    return NextResponse.json({ success: true, data: news }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const admin = await requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const id = toInt(body.id)
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

    const slug = body.title ? await buildUniqueSlug(body.title, id) : undefined

    const PIN_DURATION_MS = 24 * 60 * 60 * 1000

    // When pinning as hero, unpin all other articles and clear their expiry
    if (body.pinToHomepage === true) {
      await prisma.news.updateMany({
        where: { pinToHomepage: true, id: { not: id } },
        data:  { pinToHomepage: false, pinExpiresAt: null },
      })
    }

    const updated = await prisma.news.update({
      where: { id },
      data: {
        ...(slug && { slug }),
        title:             body.title?.trim(),
        summary:           body.summary?.trim() ?? null,
        description:       body.description?.trim() ?? null,
        featuredImage:     body.featuredImage ?? null,
        tags:              body.tags ?? null,
        isBreakingNews:    body.editorialLabel === 'BREAKING',
        isTrendingNews:    body.isTrendingNews ?? false,
        isMiniTrendingNews: body.isMiniTrendingNews ?? false,
        editorialLabel:    (body.editorialLabel as EditorialLabel) ?? undefined,
        pinToHomepage:     body.pinToHomepage ?? undefined,
        pinExpiresAt:      body.pinToHomepage === true
                             ? new Date(Date.now() + PIN_DURATION_MS)
                             : body.pinToHomepage === false
                               ? null
                               : undefined,
        boostScore:        toInt(body.boostScore) ?? undefined,
        expireBoostAt:     body.expireBoostAt ? new Date(body.expireBoostAt) : undefined,
        status:            (body.status as ArticleStatus) ?? undefined,
        isActive:          body.isActive ?? undefined,
        publishedDate:     body.publishedDate ? new Date(body.publishedDate) : undefined,
        categoryId:        toInt(body.categoryId) ?? undefined,
        districtId:        toInt(body.districtId) ?? undefined,
        authorId:          toInt(body.authorId) ?? undefined,
      },
    })

    // Immediately recompute score for any article (not just PUBLISHED) so
    // boost/editorial changes are reflected instantly without waiting for cron
    const full = await prisma.news.findUnique({
      where: { id },
      include: { newsScore: true, newsCategories: true },
    })
    if (full) {
      const score = computeScore({
        publishedDate:  full.publishedDate,
        viewCount:      full.viewCount,
        viewsLast2Hrs:  full.newsScore?.viewsLast2Hrs ?? 0,
        editorialLabel: full.editorialLabel,
        isBreakingNews: full.isBreakingNews,
        boostScore:     full.boostScore,
        expireBoostAt:  full.expireBoostAt,
        topicRelevance: full.newsCategories[0]?.relevanceScore ?? 50,
        locationScore:  50,
        ctrScore:       full.newsScore?.ctrScore ?? 0,
      }, 'homepage')
      await prisma.newsScore.upsert({
        where:  { newsId: id },
        create: { newsId: id, finalScore: score, freshnessScore: freshnessScore(full.publishedDate), velocityScore: (full.newsScore?.viewsLast2Hrs ?? 0) * 0.4, viewsLast2Hrs: full.newsScore?.viewsLast2Hrs ?? 0, ctrScore: full.newsScore?.ctrScore ?? 0, editorialScore: full.newsScore?.editorialScore ?? 0, breakingBoost: full.isBreakingNews ? 100 : 0, manualBoost: full.boostScore },
        update: { finalScore: score, freshnessScore: freshnessScore(full.publishedDate), velocityScore: (full.newsScore?.viewsLast2Hrs ?? 0) * 0.4, breakingBoost: full.isBreakingNews ? 100 : 0, manualBoost: full.boostScore },
      })
    }

    return NextResponse.json({ success: true, data: updated })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const admin =  await requireAdmin(req)
  if (!admin || admin.role !== 'SUPER_ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const id = toInt(req.nextUrl.searchParams.get('id'))
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  await prisma.news.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
