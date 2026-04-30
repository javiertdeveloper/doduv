import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Diseñamos soluciones. Desarrollamos resultados.',
  description: 'Estudio de tecnología en Nuevo León.',
  icons: {
    icon: '/images/o-symbol.svg',
    shortcut: '/images/o-symbol.svg',
    apple: '/images/o-symbol.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es"><body>{children}</body></html>
}
