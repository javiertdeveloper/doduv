export const siteConfig = {
  name: 'Doduv',
  tagline: 'Lo digital, bien hecho.',
  email: 'doduv@gmail.com',
  location: 'México',
  social: {
    instagram: 'https://instagram.com/doduv',
    facebook: 'https://facebook.com/doduv',
    whatsapp: 'https://wa.me/528211061030',
  },
  availableSlots: 3,
  availableMonth: 'abril',
}

export const services = [
  {
    id: 'web',
    title: 'Sitios web que convierten',
    description: 'Diseño editorial, performance brutal, SEO que posiciona.',
    includes: ['Landing pages', 'E-commerce', 'Sitios corporativos', 'Rediseños'],
  },
  {
    id: 'apps',
    title: 'Apps que tu equipo usa',
    description: 'Software a medida que resuelve, no que complica.',
    includes: ['Apps internas', 'Dashboards', 'Sistemas de gestión', 'Kioscos'],
  },
  {
    id: 'ia',
    title: 'Inteligencia Artificial',
    description: 'Automatiza lo que te quita tiempo. Potencia lo que te da dinero.',
    includes: ['Chatbots', 'Agentes IA', 'Generación de contenido', 'Análisis de datos'],
  },
]

export const processSteps = [
  { number: '01', title: 'Descubrimiento', description: 'Entendemos tu negocio antes de tocar código.' },
  { number: '02', title: 'Diseño', description: 'Cada pixel tiene un propósito.' },
  { number: '03', title: 'Desarrollo', description: 'Código limpio, rápido, que escala.' },
  { number: '04', title: 'Lanzamiento', description: 'Acompañamos después del lanzamiento.' },
]

export const featuredProject = {
  id: 'marketing-ia',
  title: 'Marketing con IA',
  category: 'Inteligencia Artificial',
  description: 'Imágenes de producto, posts para redes y material visual — generado con inteligencia artificial.',
  media: [
    { id: 'gloria', type: 'video-cycle' as const, aspect: 'landscape' as const, sources: ['/projects/gloria-1.mp4', '/projects/gloria-2.mp4'] },
    { id: 'conercial', type: 'video' as const, aspect: 'landscape' as const, src: '/projects/comercial.mp4' },
    { id: 'fotos', type: 'image-cycle' as const, aspect: 'landscape' as const, sources: ['/projects/fotododuv-1.png', '/projects/fotododuv-2.png', '/projects/doduvropa.png'] },
    { id: 'reel', type: 'video' as const, aspect: 'portrait' as const, src: '/projects/reel-1.mp4' },
  ],
}

export const projects = [
  { id: 'kuro-sushi', title: 'Kuro Sushi', category: 'Sitio Web', aspect: 'landscape' as const, video: '/projects/kuro-sushi.mp4' },
  { id: 'arquitectura', title: 'Estudio de Arquitectura', category: 'Sitio Web', aspect: 'landscape' as const, video: '/projects/arquitectura.mp4' },
  { id: 'seguros', title: 'Agentes de Seguros', category: 'Sitio Web', aspect: 'landscape' as const, images: ['/projects/rocan-1.png', '/projects/rocan-2.png', '/projects/rocan-3.png'] },
  { id: 'kiosko', title: 'Kiosko', category: 'Aplicación', aspect: 'portrait' as const, video: '/projects/kiosko.mp4' },
]

export const metrics = [
  { value: 12, suffix: '+', label: 'Proyectos entregados' },
  { value: 1.4, suffix: 's', label: 'Vel. promedio de carga' },
  { value: 100, suffix: '%', label: 'Satisfacción del cliente' },
]
