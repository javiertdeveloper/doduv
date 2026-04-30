import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'

const SITE_TITLE = 'Diseñamos soluciones. Desarrollamos resultados.'
const SITE_DESCRIPTION =
  'Doduv — estudio de tecnología en Nuevo León. Diseño y desarrollo de sitios web, software a medida e inteligencia artificial.'
const SITE_URL = 'https://doduv.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: 'doduv',
  authors: [{ name: 'doduv' }],
  keywords: ['doduv', 'desarrollo web', 'software', 'inteligencia artificial', 'Nuevo León', 'Monterrey', 'estudio de tecnología'],
  icons: {
    icon: '/images/o-symbol.svg',
    shortcut: '/images/o-symbol.svg',
    apple: '/images/o-symbol.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: SITE_URL,
    siteName: 'doduv',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#3B2517',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preload" as="image" href="/images/hands.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body>{children}</body>
    </html>
  )
}
