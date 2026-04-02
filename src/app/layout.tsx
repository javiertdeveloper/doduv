import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Doduv — Lo digital, bien hecho.',
  description: 'Estudio de tecnología en Nuevo León.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es"><body>{children}</body></html>
}
