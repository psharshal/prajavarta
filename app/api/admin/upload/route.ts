import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, ADMIN_AUTH_COOKIE_NAME } from '@/lib/auth'

const ALLOWED_FOLDERS = ['categories', 'news', 'authors', 'settings', 'main-advertisement-banner']
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB

async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get(ADMIN_AUTH_COOKIE_NAME)?.value
  if (!token) return null
  const decoded = await verifyToken(token)
  if (!decoded) return null
  if (!['SUPER_ADMIN', 'MODERATOR'].includes(decoded.role)) return null
  return decoded
}

function extFromMime(mime: string): string {
  const map: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png':  'png',
    'image/webp': 'webp',
    'image/gif':  'gif',
  }
  return map[mime] ?? 'jpg'
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await req.formData()
    const file     = formData.get('file') as File | null
    const folder   = (formData.get('folder') as string | null) ?? 'news'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!ALLOWED_FOLDERS.includes(folder)) {
      return NextResponse.json(
        { error: `Invalid folder. Allowed: ${ALLOWED_FOLDERS.join(', ')}` },
        { status: 400 },
      )
    }

    if (!ALLOWED_MIME.includes(file.type)) {
      return NextResponse.json(
        { error: 'Only jpg, png, webp, gif are allowed' },
        { status: 400 },
      )
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: 'File exceeds 5 MB limit' }, { status: 400 })
    }

    // Own-server path: write to public/uploads/
    const { mkdir, writeFile } = await import('fs/promises')
    const path = await import('path')

    const ext       = extFromMime(file.type)
    const rand      = Math.random().toString(36).slice(2, 8)
    const filename  = `${Date.now()}-${rand}.${ext}`
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'admin', folder)

    await mkdir(uploadDir, { recursive: true })
    await writeFile(path.join(uploadDir, filename), Buffer.from(await file.arrayBuffer()))

    return NextResponse.json({ success: true, url: `/uploads/admin/${folder}/${filename}` })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
