import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyToken, AUTHOR_AUTH_COOKIE_NAME } from '@/lib/auth'
import { tagArticle } from '@/lib/tagger'
import { autoEnrichNews } from '@/lib/auto-enrich'

async function requireAuthor(req: NextRequest) {
  const token = req.cookies.get(AUTHOR_AUTH_COOKIE_NAME)?.value
  if (!token) return null
  const decoded = await verifyToken(token)
  if (!decoded) return null
  if (decoded.role !== 'REPORTER') return null
  return decoded
}

function toInt(v: any): number | null {
  const n = parseInt(String(v ?? ''), 10)
  return isNaN(n) ? null : n
}

async function buildUniqueSlug(title: string, excludeId?: number): Promise<string> {
  const base = (title ?? '')
    .toLowerCase()
    .trim()
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

export async function GET(req: NextRequest) {
  const author = await requireAuthor(req)
  if (!author) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { searchParams } = req.nextUrl
    const page   = parseInt(searchParams.get('page') ?? '1')
    const limit  = parseInt(searchParams.get('limit') ?? '12')
    const status = searchParams.get('status')
    const skip   = (page - 1) * limit

    const where: any = {
      authorId: author.userId,
      ...(status && { status: status as any }),
    }

    const [total, data] = await Promise.all([
      prisma.news.count({ where }),
      prisma.news.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          category: { select: { id: true, name: true, nameEnglish: true, slug: true } },
        },
      }),
    ])

    return NextResponse.json({
      success: true,
      data,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const author = await requireAuthor(req)
  if (!author) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const slug = await buildUniqueSlug(body.title ?? '')

    // Auto-enrich fields not provided in the payload
    let finalCategoryId = toInt(body.categoryId)
    let finalDistrictId = toInt(body.districtId)
    let finalTags: string | null = body.tags ?? null

    if (!finalCategoryId || !finalDistrictId || !finalTags) {
      const enriched = await autoEnrichNews(
        body.title       ?? '',
        body.summary     ?? '',
        body.description ?? '',
      )
      if (!finalCategoryId) finalCategoryId = enriched.categoryId
      if (!finalDistrictId) finalDistrictId = enriched.districtId
      if (!finalTags) finalTags       = enriched.tags
    }

    const news = await prisma.news.create({
      data: {
        slug,
        newsType:      body.newsType ?? 'Image',
        ownerType:     'REPORTER',
        title:         body.title?.trim(),
        summary:       body.summary?.trim() ?? null,
        description:   body.description?.trim() ?? null,
        language:      body.language ?? 'Marathi',
        featuredImage: body.featuredImage ?? null,
        tags:          finalTags,
        videoId:       body.videoId ?? null,
        videoUrl:      body.videoUrl ?? null,
        // Reporters submit for review — they cannot publish directly
        status:        'PENDING_REVIEW',
        isActive:      false,
        categoryId:    finalCategoryId,
        districtId:    finalDistrictId,
        authorId:      author.userId,
        userId:        author.userId,
      },
    })

    // Auto-tag using keyword tagger
    const tagging = tagArticle(body.title ?? '', body.description ?? '')
    const categoryIds: number[] = Array.isArray(body.categoryIds)
      ? body.categoryIds.map(Number).filter(Boolean)
      : []

    // Auto-detected categories
    for (const result of tagging.categories) {
      const cat = await prisma.category.findFirst({ where: { slug: result.categorySlug } })
      if (cat && !categoryIds.includes(cat.id)) {
        await prisma.newsCategory.create({
          data: {
            newsId: news.id,
            categoryId: cat.id,
            relevanceScore: result.confidence * 100,
            confidenceScore: result.confidence,
            isAutoTagged: true,
          },
        }).catch(() => {})
      }
    }

    // Editor-selected categories
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
  const author = await requireAuthor(req)
  if (!author) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const id = toInt(body.id)
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

    // Verify ownership
    const existing = await prisma.news.findFirst({
      where: { id, authorId: author.userId },
      select: { id: true, status: true },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    // Only allow editing DRAFT or REJECTED articles
    if (!['DRAFT', 'REJECTED'].includes(existing.status)) {
      return NextResponse.json(
        { error: 'Only DRAFT or REJECTED articles can be edited' },
        { status: 403 },
      )
    }

    const slug = body.title ? await buildUniqueSlug(body.title, id) : undefined

    // Auto-enrich fields absent from the payload, using merged text context
    const needsEnrich = !body.categoryId || !body.districtId || !body.tags;  

    let enrichedCategoryId: number | null = null
    let enrichedDistrictId: number | null = null
    let enrichedTags:        string | null = null

    if (needsEnrich) {
      const currentNews = await prisma.news.findUnique({
        where:  { id },
        select: { title: true, summary: true, description: true },
      })

      const titleForEnrich       = body.title       ?? currentNews?.title       ?? ''
      const summaryForEnrich     = body.summary     ?? currentNews?.summary     ?? ''
      const descriptionForEnrich = body.description ?? currentNews?.description ?? ''

      const enriched = await autoEnrichNews(titleForEnrich, summaryForEnrich, descriptionForEnrich)
      enrichedCategoryId = enriched.categoryId
      enrichedDistrictId = enriched.districtId
      enrichedTags       = enriched.tags
    }

    const finalCategoryId =
      body.categoryId ? (toInt(body.categoryId) ?? undefined) : (enrichedCategoryId ?? undefined)
    const finalDistrictId =
      body.districtId ? (toInt(body.districtId) ?? undefined) : (enrichedDistrictId ?? undefined)
    const finalTags =
      body.tags ? (body.tags ?? null) : (enrichedTags ?? null)

    const updated = await prisma.news.update({
      where: { id },
      data: {
        ...(slug              && { slug }),
        ...(body.title        !== undefined && { title: body.title?.trim() }),
        ...(body.summary      !== undefined && { summary: body.summary?.trim() }),
        ...(body.description  !== undefined && { description: body.description?.trim() }),
        ...(body.featuredImage !== undefined && { featuredImage: body.featuredImage }),
        tags:       finalTags,
        categoryId: finalCategoryId ?? undefined,
        districtId: finalDistrictId ?? undefined,
        // Re-submit for review after edit
        status: 'PENDING_REVIEW',
      },
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
