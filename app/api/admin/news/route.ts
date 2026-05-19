import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyToken, ADMIN_AUTH_COOKIE_NAME } from '@/lib/auth'
import { tagArticle } from '@/lib/tagger'
import { EditorialLabel, ArticleStatus } from '@prisma/client'

function requireAdmin(req: NextRequest) {
  const token = req.cookies.get(ADMIN_AUTH_COOKIE_NAME)?.value
  if (!token) return null
  const decoded = verifyToken(token)
  if (!decoded) return null
  if (!['SUPER_ADMIN', 'MODERATOR'].includes(decoded.role)) return null
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
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

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

  const [total, data] = await Promise.all([
    prisma.news.count({ where }),
    prisma.news.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: { category: true, author: { select: { id: true, name: true } } },
    }),
  ])

  return NextResponse.json({ success: true, data, pagination: { total, page, limit, pages: Math.ceil(total / limit) } })
}

export async function POST(req: NextRequest) {
  const admin = requireAdmin(req)
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
  const admin = requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const id = toInt(body.id)
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

    const slug = body.title ? await buildUniqueSlug(body.title, id) : undefined

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

    return NextResponse.json({ success: true, data: updated })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const admin = requireAdmin(req)
  if (!admin || admin.role !== 'SUPER_ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const id = toInt(req.nextUrl.searchParams.get('id'))
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  await prisma.news.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
