import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pro Slim Moveis Planejados | Ponta Grossa - PR',
  description:
    'Moveis planejados sob medida em Ponta Grossa - PR. Cozinhas, dormitorios, closets, home office e comercial. Projeto 3D gratuito, ate 12x sem juros. Mais de 500 projetos entregues.',
  keywords:
    'moveis planejados ponta grossa, moveis sob medida ponta grossa, cozinha planejada ponta grossa, armario planejado ponta grossa, closet planejado, home office planejado, moveis planejados pr, pro slim moveis',
  openGraph: {
    title: 'Pro Slim Moveis Planejados | Ponta Grossa - PR',
    description:
      'Moveis planejados sob medida com projeto 3D gratuito. Cozinhas, dormitorios, closets e muito mais. Atendemos toda Ponta Grossa e regiao.',
    locale: 'pt_BR',
    type: 'website',
    siteName: 'Pro Slim Moveis Planejados',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  other: {
    'geo.region': 'BR-PR',
    'geo.placename': 'Ponta Grossa',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Pro Slim Moveis Planejados',
              description:
                'Moveis planejados sob medida em Ponta Grossa - PR. Cozinhas, dormitorios, closets, home office e projetos comerciais.',
              url: 'https://proslimmoveis.com.br',
              telephone: '+55SEUNUMERO',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Ponta Grossa',
                addressRegion: 'PR',
                addressCountry: 'BR',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: -25.0945,
                longitude: -50.1633,
              },
              areaServed: [
                { '@type': 'City', name: 'Ponta Grossa' },
                { '@type': 'City', name: 'Castro' },
                { '@type': 'City', name: 'Carambei' },
                { '@type': 'City', name: 'Palmeira' },
              ],
              priceRange: '$$',
              openingHours: 'Mo-Fr 08:00-18:00, Sa 08:00-12:00',
              sameAs: [
                'https://www.instagram.com/pro_slim_moveis/',
                'https://www.facebook.com/profile.php?id=100058505515523',
              ],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '127',
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
