import { put, del } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'proslim2026'

function unauthorized() {
  return NextResponse.json({ error: 'Nao autorizado' }, { status: 401 })
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('x-admin-password')
  if (authHeader !== ADMIN_PASSWORD) return unauthorized()

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const category = formData.get('category') as string || 'geral'

  if (!file) {
    return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 })
  }

  const maxSize = 10 * 1024 * 1024 // 10MB
  if (file.size > maxSize) {
    return NextResponse.json({ error: 'Arquivo muito grande. Maximo 10MB.' }, { status: 400 })
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Tipo de arquivo invalido. Use JPG, PNG ou WebP.' }, { status: 400 })
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'Storage nao configurado. Adicione BLOB_READ_WRITE_TOKEN no Vercel.' }, { status: 503 })
  }

  const timestamp = Date.now()
  const ext = file.name.split('.').pop() || 'jpg'
  const pathname = `portfolio/${category}/${timestamp}.${ext}`

  const blob = await put(pathname, file, {
    access: 'public',
    addRandomSuffix: false,
  })

  return NextResponse.json({
    url: blob.url,
    pathname: blob.pathname,
    category,
  })
}

export async function DELETE(req: NextRequest) {
  const authHeader = req.headers.get('x-admin-password')
  if (authHeader !== ADMIN_PASSWORD) return unauthorized()

  const { url } = await req.json()
  if (!url) {
    return NextResponse.json({ error: 'URL obrigatoria' }, { status: 400 })
  }

  await del(url)
  return NextResponse.json({ deleted: true })
}
