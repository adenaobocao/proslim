import { list } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'proslim2026'

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('x-admin-password')
  if (authHeader !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Nao autorizado' }, { status: 401 })
  }

  // Se o Blob nao esta configurado, retorna lista vazia (login funciona)
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ images: [] })
  }

  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category') || ''

  const prefix = category ? `portfolio/${category}/` : 'portfolio/'

  try {
    const { blobs } = await list({ prefix })

    const images = blobs.map((blob) => {
      const parts = blob.pathname.split('/')
      return {
        url: blob.url,
        pathname: blob.pathname,
        category: parts[1] || 'geral',
        uploadedAt: blob.uploadedAt,
        size: blob.size,
      }
    })

    return NextResponse.json({ images })
  } catch {
    return NextResponse.json({ images: [] })
  }
}
