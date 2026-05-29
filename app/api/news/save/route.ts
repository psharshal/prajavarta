import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyToken, AUTH_COOKIE_NAME } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(AUTH_COOKIE_NAME)?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const decoded = await verifyToken(token)
    if (!decoded) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const { newsId, action } = await req.json()
    if (!newsId || !['save', 'unsave'].includes(action)) {
      return NextResponse.json({ error: 'newsId and valid action required' }, { status: 400 })
    }

    const userId = decoded.userId
    const id = Number(newsId)

    if (action === 'save') {
      await prisma.savedArticle.upsert({
        where: { userId_newsId: { userId, newsId: id } },
        create: { userId, newsId: id },
        update: {},
      })
      return NextResponse.json({ success: true, saved: true })
    } else {
      await prisma.savedArticle.deleteMany({ where: { userId, newsId: id } })
      return NextResponse.json({ success: true, saved: false })
    }
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
