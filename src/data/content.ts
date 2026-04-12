export const siteConfig = {
  name: 'Doduv',
  tagline: 'Lo digital, bien hecho.',
  email: 'contacto@doduv.com',
  location: 'Nuevo León, México',
  social: { instagram: 'https://instagram.com/doduv', linkedin: 'https://linkedin.com/company/doduv' },
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
  samples: [
    { label: 'Producto', ascii: '{ }' },
    { label: 'Campaña', ascii: '< />' },
    { label: 'Social', ascii: '# @' },
    { label: 'Branding', ascii: '& %' },
  ],
}

export const projects = [
  { id: 'kuro-sushi', title: 'Kuro Sushi', category: 'Sitio Web', aspect: 'landscape', video: '/videos/Kurosushivideo.mp4' },
  { id: 'arquitectura', title: 'Estudio de Arquitectura', category: 'Sitio Web', aspect: 'landscape' },
  { id: 'seguros', title: 'Agentes de Seguros', category: 'Sitio Web', aspect: 'landscape' },
  { id: 'kiosko', title: 'Kiosko Aeropuerto', category: 'Aplicación', aspect: 'portrait', video: '/videos/Aerokisko.mp4' },
]

export const metrics = [
  { value: 12, suffix: '+', label: 'Proyectos entregados' },
  { value: 1.4, suffix: 's', label: 'Vel. promedio de carga' },
  { value: 100, suffix: '%', label: 'Satisfacción del cliente' },
]
