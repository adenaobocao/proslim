'use client'

import { useState, useEffect, useRef } from 'react'

interface ImageItem {
  url: string
  pathname: string
  category: string
  uploadedAt: string
  size: number
}

const CATEGORIES = [
  { value: 'cozinhas', label: 'Cozinhas' },
  { value: 'dormitorios', label: 'Dormitorios' },
  { value: 'living', label: 'Living & Salas' },
  { value: 'banheiros', label: 'Banheiros' },
  { value: 'homeoffice', label: 'Home Office' },
  { value: 'comercial', label: 'Comercial' },
  { value: 'geral', label: 'Geral' },
]

export default function Dashboard() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [storedPassword, setStoredPassword] = useState('')
  const [images, setImages] = useState<ImageItem[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('geral')
  const [filterCategory, setFilterCategory] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const showMessage = (text: string, type: 'success' | 'error' = 'success') => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => setMessage(''), 4000)
  }

  const login = async () => {
    if (!password) return
    try {
      const res = await fetch('/api/images', {
        headers: { 'x-admin-password': password },
      })
      if (res.ok) {
        setAuthenticated(true)
        setStoredPassword(password)
        const data = await res.json()
        setImages(data.images)
      } else {
        showMessage('Senha incorreta', 'error')
      }
    } catch {
      showMessage('Erro de conexao', 'error')
    }
  }

  const loadImages = async () => {
    setLoading(true)
    try {
      const url = filterCategory
        ? `/api/images?category=${filterCategory}`
        : '/api/images'
      const res = await fetch(url, {
        headers: { 'x-admin-password': storedPassword },
      })
      if (res.ok) {
        const data = await res.json()
        setImages(data.images)
      }
    } catch {
      showMessage('Erro ao carregar imagens', 'error')
    }
    setLoading(false)
  }

  useEffect(() => {
    if (authenticated) loadImages()
  }, [authenticated, filterCategory])

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setUploading(true)

    let successCount = 0
    let errorCount = 0

    for (const file of Array.from(files)) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('category', selectedCategory)

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'x-admin-password': storedPassword },
          body: formData,
        })
        if (res.ok) {
          successCount++
        } else {
          const data = await res.json()
          showMessage(data.error || 'Erro no upload', 'error')
          errorCount++
        }
      } catch {
        errorCount++
      }
    }

    if (successCount > 0) {
      showMessage(`${successCount} foto(s) enviada(s) com sucesso!`)
    }
    if (errorCount > 0 && successCount > 0) {
      showMessage(`${successCount} ok, ${errorCount} erro(s)`, 'error')
    }

    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
    loadImages()
  }

  const handleDelete = async (url: string) => {
    if (!confirm('Tem certeza que deseja excluir esta foto?')) return

    try {
      const res = await fetch('/api/upload', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': storedPassword,
        },
        body: JSON.stringify({ url }),
      })
      if (res.ok) {
        showMessage('Foto excluida')
        loadImages()
      } else {
        showMessage('Erro ao excluir', 'error')
      }
    } catch {
      showMessage('Erro de conexao', 'error')
    }
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  /* ─── LOGIN SCREEN ─── */
  if (!authenticated) {
    return (
      <div style={styles.loginWrapper}>
        <div style={styles.loginCard}>
          <div style={styles.loginLogo}>
            <span style={styles.loginLogoText}>
              <span style={{ color: '#0B1426' }}>Pro </span>
              <span style={{ color: '#D47832' }}>Slim</span>
            </span>
            <span style={styles.loginSubtitle}>Painel Administrativo</span>
          </div>
          <div style={styles.inputGroup}>
            <input
              type="password"
              placeholder="Senha de acesso"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && login()}
              style={styles.input}
              autoFocus
            />
          </div>
          <button onClick={login} style={styles.loginBtn}>
            Entrar
          </button>
          {message && (
            <p style={{ ...styles.message, color: messageType === 'error' ? '#e53e3e' : '#38a169' }}>
              {message}
            </p>
          )}
        </div>
      </div>
    )
  }

  /* ─── DASHBOARD ─── */
  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div>
            <span style={styles.headerLogo}>
              <span style={{ color: '#fff' }}>Pro </span>
              <span style={{ color: '#E8A360' }}>Slim</span>
            </span>
            <span style={styles.headerSub}>Dashboard</span>
          </div>
          <button onClick={() => { setAuthenticated(false); setStoredPassword('') }} style={styles.logoutBtn}>
            Sair
          </button>
        </div>
      </header>

      <main style={styles.main}>
        {/* Message */}
        {message && (
          <div style={{
            ...styles.toast,
            background: messageType === 'error' ? '#FED7D7' : '#C6F6D5',
            color: messageType === 'error' ? '#9B2C2C' : '#22543D',
          }}>
            {message}
          </div>
        )}

        {/* Upload Section */}
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Enviar Fotos</h2>
          <p style={styles.cardDesc}>Selecione as fotos da galeria do celular e escolha a categoria.</p>

          <div style={styles.uploadRow}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={styles.select}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div
            style={styles.uploadArea}
            onClick={() => fileInputRef.current?.click()}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D47832" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p style={{ marginTop: 12, fontSize: '0.9rem', color: '#757575' }}>
              {uploading ? 'Enviando...' : 'Toque para selecionar fotos'}
            </p>
            <p style={{ fontSize: '0.75rem', color: '#BDBDBD', marginTop: 4 }}>
              JPG, PNG ou WebP - max 10MB cada
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            style={{ display: 'none' }}
            onChange={(e) => handleUpload(e.target.files)}
          />
        </section>

        {/* Gallery Section */}
        <section style={styles.card}>
          <div style={styles.galleryHeader}>
            <h2 style={styles.cardTitle}>Galeria</h2>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{ ...styles.select, maxWidth: 180 }}
            >
              <option value="">Todas</option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <p style={styles.emptyText}>Carregando...</p>
          ) : images.length === 0 ? (
            <div style={styles.emptyState}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#BDBDBD" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <p style={styles.emptyText}>Nenhuma foto ainda</p>
              <p style={{ fontSize: '0.8rem', color: '#BDBDBD' }}>Envie fotos usando o formulario acima</p>
            </div>
          ) : (
            <div style={styles.grid}>
              {images.map((img) => (
                <div key={img.pathname} style={styles.imageCard}>
                  <div style={styles.imageWrapper}>
                    <img
                      src={img.url}
                      alt={img.category}
                      style={styles.image}
                      loading="lazy"
                    />
                  </div>
                  <div style={styles.imageMeta}>
                    <span style={styles.categoryBadge}>{img.category}</span>
                    <span style={styles.imageSize}>{formatSize(img.size)}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(img.url)}
                    style={styles.deleteBtn}
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

/* ─── Inline Styles (mobile-first) ─── */
const styles: Record<string, React.CSSProperties> = {
  /* Login */
  loginWrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0B1426',
    padding: 20,
  },
  loginCard: {
    background: '#fff',
    borderRadius: 12,
    padding: '40px 28px',
    width: '100%',
    maxWidth: 380,
    textAlign: 'center',
  },
  loginLogo: {
    marginBottom: 32,
  },
  loginLogoText: {
    fontFamily: "'Great Vibes', cursive",
    fontSize: '2.4rem',
    display: 'block',
  },
  loginSubtitle: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.7rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    color: '#757575',
    display: 'block',
    marginTop: 4,
  },
  inputGroup: { marginBottom: 16 },
  input: {
    width: '100%',
    padding: '14px 16px',
    border: '1px solid #E0E0E0',
    borderRadius: 6,
    fontSize: '0.95rem',
    fontFamily: "'Inter', sans-serif",
    outline: 'none',
    textAlign: 'center',
  },
  loginBtn: {
    width: '100%',
    padding: '14px',
    background: '#D47832',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    fontSize: '0.9rem',
    fontWeight: 600,
    fontFamily: "'Inter', sans-serif",
    cursor: 'pointer',
  },
  message: {
    marginTop: 12,
    fontSize: '0.85rem',
  },

  /* Dashboard */
  wrapper: {
    minHeight: '100vh',
    background: '#F5F5F5',
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    background: '#0B1426',
    padding: '16px 0',
    position: 'sticky' as const,
    top: 0,
    zIndex: 100,
  },
  headerInner: {
    maxWidth: 960,
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLogo: {
    fontFamily: "'Great Vibes', cursive",
    fontSize: '1.6rem',
  },
  headerSub: {
    fontSize: '0.65rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    color: '#8899B0',
    marginLeft: 12,
  },
  logoutBtn: {
    background: 'none',
    border: '1px solid rgba(255,255,255,0.15)',
    color: '#C8D6E8',
    padding: '8px 16px',
    borderRadius: 4,
    fontSize: '0.8rem',
    cursor: 'pointer',
    fontFamily: "'Inter', sans-serif",
  },
  main: {
    maxWidth: 960,
    margin: '0 auto',
    padding: '24px 20px',
  },
  toast: {
    padding: '12px 16px',
    borderRadius: 6,
    marginBottom: 20,
    fontSize: '0.88rem',
    fontWeight: 500,
  },

  /* Cards */
  card: {
    background: '#fff',
    borderRadius: 10,
    padding: '24px 20px',
    marginBottom: 20,
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },
  cardTitle: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#0B1426',
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: '0.85rem',
    color: '#757575',
    marginBottom: 20,
  },

  /* Upload */
  uploadRow: {
    marginBottom: 16,
  },
  select: {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid #E0E0E0',
    borderRadius: 6,
    fontSize: '0.9rem',
    fontFamily: "'Inter', sans-serif",
    background: '#fff',
    color: '#424242',
    outline: 'none',
    WebkitAppearance: 'none' as const,
  },
  uploadArea: {
    border: '2px dashed #E0E0E0',
    borderRadius: 10,
    padding: '40px 20px',
    textAlign: 'center' as const,
    cursor: 'pointer',
    transition: 'border-color 0.3s',
  },

  /* Gallery */
  galleryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    gap: 16,
    flexWrap: 'wrap' as const,
  },
  emptyState: {
    textAlign: 'center' as const,
    padding: '48px 20px',
  },
  emptyText: {
    color: '#9E9E9E',
    fontSize: '0.9rem',
    marginTop: 12,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: 14,
  },
  imageCard: {
    borderRadius: 8,
    overflow: 'hidden',
    border: '1px solid #EEEEEE',
    background: '#FAFAFA',
  },
  imageWrapper: {
    aspectRatio: '1',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    display: 'block',
  },
  imageMeta: {
    padding: '8px 10px 4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    color: '#D47832',
    background: '#FDF3E8',
    padding: '2px 8px',
    borderRadius: 4,
  },
  imageSize: {
    fontSize: '0.7rem',
    color: '#BDBDBD',
  },
  deleteBtn: {
    width: '100%',
    padding: '8px',
    border: 'none',
    borderTop: '1px solid #EEEEEE',
    background: 'none',
    color: '#e53e3e',
    fontSize: '0.78rem',
    fontFamily: "'Inter', sans-serif",
    cursor: 'pointer',
    fontWeight: 500,
  },
}
