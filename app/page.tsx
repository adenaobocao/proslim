'use client'

import { useEffect, useRef, useState } from 'react'

/* ─── SVG Icons ─── */
const StarIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
)

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.612l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
)

const WHATSAPP_NUMBER = '55SEUNUMERO'
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`
const INSTAGRAM_LINK = 'https://www.instagram.com/pro_slim_moveis/'
const FACEBOOK_LINK = 'https://www.facebook.com/profile.php?id=100058505515523'

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    reveals.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* ─── NAVIGATION ─── */}
      <nav ref={navRef} className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="container nav-inner">
          <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            <div>
              <span className="logo-text">
                <span className="logo-pro">Pro </span>
                <span className="logo-slim">Slim</span>
              </span>
              <span className="logo-subtitle">Moveis Planejados</span>
            </div>
          </a>
          <ul className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks">
            <li><a href="#sobre" onClick={(e) => { e.preventDefault(); scrollTo('sobre') }}>Sobre</a></li>
            <li><a href="#ambientes" onClick={(e) => { e.preventDefault(); scrollTo('ambientes') }}>Ambientes</a></li>
            <li><a href="#projetos" onClick={(e) => { e.preventDefault(); scrollTo('projetos') }}>Projetos</a></li>
            <li><a href="#processo" onClick={(e) => { e.preventDefault(); scrollTo('processo') }}>Processo</a></li>
            <li><a href={WHATSAPP_LINK} className="nav-cta" target="_blank" rel="noopener noreferrer">Solicitar Orcamento</a></li>
          </ul>
          <button
            className={`nav-toggle${menuOpen ? ' active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="hero" id="hero">
        <div className="hero-grid" />
        <div className="hero-accent hero-accent-1" />
        <div className="hero-accent hero-accent-2" />
        <div className="hero-accent hero-accent-3" />
        <div className="container hero-content">
          <div className="hero-eyebrow">Ponta Grossa - PR</div>
          <h1>Ambientes que <em>transformam</em> a forma de viver</h1>
          <p className="hero-desc">
            Cada centimetro do seu espaco pensado para voce. Moveis sob medida que unem inteligencia, aproveitamento total e acabamento impecavel — do projeto 3D a instalacao.
          </p>
          <div className="hero-actions">
            <a href={WHATSAPP_LINK} className="btn-primary" target="_blank" rel="noopener noreferrer">
              Fale Conosco
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#projetos" className="btn-ghost" onClick={(e) => { e.preventDefault(); scrollTo('projetos') }}>
              Ver Projetos
            </a>
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section className="about" id="sobre">
        <div className="container about-grid">
          <div className="about-text reveal">
            <span className="section-label">Sobre Nos</span>
            <h2 className="section-title">Cada detalhe importa quando o espaco e seu</h2>
            <p className="section-desc">
              A Pro Slim nasceu da paixao por transformar espacos em Ponta Grossa e regiao.
              Cada projeto e desenvolvido sob medida, unindo funcionalidade, materiais de primeira linha
              e uma execucao que preza pelo detalhe — porque acreditamos que moveis planejados
              devem se encaixar perfeitamente na sua rotina e no seu estilo de vida.
            </p>
            <div className="stats-row">
              <div className="stat">
                <div className="stat-number">500+</div>
                <div className="stat-label">Projetos Entregues</div>
              </div>
              <div className="stat">
                <div className="stat-number">10+</div>
                <div className="stat-label">Anos de Experiencia</div>
              </div>
              <div className="stat">
                <div className="stat-number">98%</div>
                <div className="stat-label">Satisfacao</div>
              </div>
            </div>
          </div>
          <div className="about-image reveal">
            <div className="image-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
              <span>Foto da equipe ou showroom</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--gray-400)' }}>Adicione via Dashboard</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── AMBIENTES ─── */}
      <section className="services" id="ambientes">
        <div className="container">
          <div className="services-header reveal">
            <span className="section-label">Ambientes</span>
            <h2 className="section-title">Cada espaco, uma experiencia unica</h2>
            <p className="section-desc">Projetamos e fabricamos moveis para todos os ambientes da sua casa ou empresa, com personalizacao completa.</p>
          </div>
          <div className="services-grid">
            {[
              { num: '01', name: 'Cozinhas', desc: 'Cozinhas planejadas que combinam funcionalidade, ergonomia e design impecavel.', bg: '' },
              { num: '02', name: 'Dormitorios', desc: 'Quartos que equilibram conforto, organizacao e sofisticacao em cada detalhe.', bg: 'linear-gradient(135deg, var(--navy-600), var(--navy-700))' },
              { num: '03', name: 'Living & Salas', desc: 'Estantes, paineis e moveis de apoio que criam ambientes acolhedores e elegantes.', bg: 'linear-gradient(135deg, var(--navy-800), var(--navy-900))' },
              { num: '04', name: 'Banheiros', desc: 'Gabinetes e organizadores sob medida, otimizando cada centimetro do espaco.', bg: 'linear-gradient(135deg, #1a2d4a, var(--navy-700))' },
              { num: '05', name: 'Home Office', desc: 'Ambientes de trabalho que inspiram produtividade com design e ergonomia.', bg: 'linear-gradient(135deg, var(--navy-700), #1a2d4a)' },
              { num: '06', name: 'Comercial', desc: 'Projetos corporativos que traduzem a identidade da sua marca em mobiliario.', bg: 'linear-gradient(135deg, #16243d, var(--navy-800))' },
            ].map((s) => (
              <div className="service-card reveal" key={s.num}>
                <div className="service-card-bg" style={s.bg ? { background: s.bg } : undefined} />
                <div className="service-card-overlay" />
                <div className="service-card-content">
                  <div className="service-card-number">{s.num}</div>
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO ─── */}
      <section className="portfolio" id="projetos">
        <div className="container">
          <div className="portfolio-header reveal">
            <div>
              <span className="section-label">Portfolio</span>
              <h2 className="section-title" style={{ color: 'var(--white)' }}>Projetos recentes</h2>
              <p className="section-desc">Uma selecao dos nossos trabalhos mais recentes. Cada projeto reflete a identidade e as necessidades unicas do cliente.</p>
            </div>
          </div>
          <div className="portfolio-grid">
            {[
              'Cozinha Integrada',
              'Closet Master Suite',
              'Living Apartamento',
              'Home Office Executivo',
              'Banheiro Suite Master',
            ].map((label, i) => (
              <div className="portfolio-item reveal" key={i}>
                <div
                  className="image-placeholder"
                  style={{
                    background: `linear-gradient(135deg, ${
                      ['var(--navy-800), var(--navy-700)', 'var(--navy-700), var(--navy-600)', '#1a2d4a, var(--navy-700)', 'var(--navy-800), #1a2d4a', 'var(--navy-700), var(--navy-800)'][i]
                    })`,
                    color: 'var(--navy-400)',
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                  <span>{label}</span>
                </div>
                <div className="portfolio-item-overlay">
                  <span className="portfolio-item-label">Ver Projeto</span>
                </div>
              </div>
            ))}
          </div>
          {/* Instagram CTA */}
          <div className="portfolio-instagram reveal">
            <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer">
              <InstagramIcon />
              Veja mais projetos no Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="process" id="processo">
        <div className="container">
          <div className="process-header reveal">
            <span className="section-label">Como Funciona</span>
            <h2 className="section-title">Do sonho a realidade em 4 passos</h2>
            <p className="section-desc">Um processo transparente e colaborativo para garantir que o resultado final supere suas expectativas.</p>
          </div>
          <div className="process-steps">
            {[
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, step: '01', title: 'Consulta', desc: 'Entendemos suas necessidades, estilo de vida e expectativas para o projeto.' },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>, step: '02', title: 'Projeto 3D', desc: 'Criamos um projeto tridimensional detalhado para voce visualizar cada angulo.' },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>, step: '03', title: 'Fabricacao', desc: 'Producao com maquinario de ponta e acabamentos de alta qualidade.' },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>, step: '04', title: 'Instalacao', desc: 'Equipe especializada para montagem e instalacao impecavel no seu espaco.' },
            ].map((s) => (
              <div className="process-step reveal" key={s.step}>
                <div className="step-icon">{s.icon}</div>
                <div className="step-number">PASSO {s.step}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DIFFERENTIALS ─── */}
      <section className="differentials" id="diferenciais">
        <div className="container diff-grid">
          <div className="reveal">
            <span className="section-label">Diferenciais</span>
            <h2 className="section-title">Por que escolher a Pro Slim?</h2>
            <p className="section-desc">Combinamos experiencia de mais de uma decada com tecnologia de ponta para entregar projetos que superam expectativas em Ponta Grossa e regiao.</p>
          </div>
          <div className="diff-list reveal">
            {[
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: 'Garantia Estendida', desc: 'Todos os nossos projetos contam com garantia que cobre materiais e instalacao.' },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>, title: 'Projeto 3D Gratuito', desc: 'Visualize seu ambiente completo em modelagem tridimensional antes da fabricacao.' },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>, title: 'Ate 12x Sem Juros', desc: 'Parcele seu projeto em ate 12x sem juros ou obtenha desconto especial a vista.' },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>, title: 'Materiais Premium', desc: 'Utilizamos apenas materiais de primeira linha com certificacao de qualidade.' },
            ].map((d, i) => (
              <div className="diff-item" key={i}>
                <div className="diff-icon">{d.icon}</div>
                <div>
                  <h3>{d.title}</h3>
                  <p>{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="testimonials">
        <div className="container">
          <div className="testimonials-header reveal">
            <span className="section-label">Depoimentos</span>
            <h2 className="section-title">O que nossos clientes dizem</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { text: '"A equipe da Pro Slim superou todas as expectativas. Minha cozinha ficou exatamente como eu sonhava, com cada detalhe pensado."', name: 'Mariana F.', role: 'Cozinha Planejada', initials: 'MF' },
              { text: '"Profissionalismo do inicio ao fim. O projeto 3D foi fundamental para visualizar o resultado. Recomendo de olhos fechados."', name: 'Ricardo S.', role: 'Dormitorio + Closet', initials: 'RS' },
              { text: '"Fizemos o escritorio inteiro com a Pro Slim. Qualidade impecavel e o prazo foi cumprido a risca. Nosso espaco ficou incrivel."', name: 'Ana Lucia T.', role: 'Projeto Corporativo', initials: 'AL' },
            ].map((t, i) => (
              <div className="testimonial-card reveal" key={i}>
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, j) => <StarIcon key={j} />)}
                </div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initials}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="cta" id="contato">
        <div className="container cta-content reveal">
          <span className="section-label" style={{ color: 'var(--copper-300)' }}>Pronto para comecar?</span>
          <h2>Transforme seu espaco com um projeto <em style={{ fontFamily: "'Playfair Display', serif", color: 'var(--copper-300)' }}>sob medida</em></h2>
          <p>Entre em contato e agende uma visita tecnica gratuita. Nossa equipe vai ate voce em Ponta Grossa e regiao para entender suas necessidades e criar o projeto perfeito.</p>
          <div className="cta-actions">
            <a href={WHATSAPP_LINK} className="btn-primary" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.612l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.313 0-4.46-.736-6.213-1.988l-.435-.321-2.638.884.884-2.638-.321-.435A9.955 9.955 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
              Solicitar Orcamento
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div>
                <span className="logo-text">
                  <span className="logo-pro">Pro </span>
                  <span className="logo-slim">Slim</span>
                </span>
              </div>
              <p>Transformando espacos com moveis sob medida, acabamento premium e atendimento personalizado em Ponta Grossa e regiao.</p>
              <div className="footer-location">
                <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Ponta Grossa - PR
              </div>
            </div>
            <div className="footer-col">
              <h4>Navegacao</h4>
              <ul>
                <li><a href="#sobre" onClick={(e) => { e.preventDefault(); scrollTo('sobre') }}>Sobre</a></li>
                <li><a href="#ambientes" onClick={(e) => { e.preventDefault(); scrollTo('ambientes') }}>Ambientes</a></li>
                <li><a href="#projetos" onClick={(e) => { e.preventDefault(); scrollTo('projetos') }}>Projetos</a></li>
                <li><a href="#processo" onClick={(e) => { e.preventDefault(); scrollTo('processo') }}>Processo</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Ambientes</h4>
              <ul>
                <li><a href="#ambientes" onClick={(e) => { e.preventDefault(); scrollTo('ambientes') }}>Cozinhas</a></li>
                <li><a href="#ambientes" onClick={(e) => { e.preventDefault(); scrollTo('ambientes') }}>Dormitorios</a></li>
                <li><a href="#ambientes" onClick={(e) => { e.preventDefault(); scrollTo('ambientes') }}>Living & Salas</a></li>
                <li><a href="#ambientes" onClick={(e) => { e.preventDefault(); scrollTo('ambientes') }}>Home Office</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contato</h4>
              <ul>
                <li><a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
                <li><a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href={FACEBOOK_LINK} target="_blank" rel="noopener noreferrer">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2026 Pro Slim Moveis Planejados. Todos os direitos reservados.</span>
            <div className="footer-social">
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href={FACEBOOK_LINK} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FacebookIcon />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── WHATSAPP FLOAT ─── */}
      <a href={WHATSAPP_LINK} className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <WhatsAppIcon />
      </a>
    </>
  )
}
