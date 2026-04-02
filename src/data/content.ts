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
  { id: 'web', title: 'Sitios web que convierten', description: 'Diseño editorial + performance + SEO.', isPrimary: true },
  { id: 'apps', title: 'Apps que tu equipo usa', description: 'Diseño centrado en el usuario.', isPrimary: false },
  { id: 'ia', title: 'Automatiza lo repetitivo', description: 'Chatbots, automatización, análisis de datos.', isPrimary: false },
]

export const processSteps = [
  { number: '01', title: 'Descubrimiento', description: 'Entendemos tu negocio antes de tocar código.' },
  { number: '02', title: 'Diseño', description: 'Cada pixel tiene un propósito.' },
  { number: '03', title: 'Desarrollo', description: 'Código limpio, rápido, que escala.' },
  { number: '04', title: 'Lanzamiento', description: 'Acompañamos después del lanzamiento.' },
]

export const projects = [
  { id: 'sushi', title: 'Restaurante Omakase', category: 'Sitio Web', aspect: 'landscape' },
  { id: 'arquitectura', title: 'Estudio de Arquitectura', category: 'Sitio Web', aspect: 'landscape' },
  { id: 'seguros', title: 'Agentes de Seguros', category: 'Sitio Web', aspect: 'landscape' },
  { id: 'kiosko', title: 'Kiosko Aeropuerto', category: 'Aplicación', aspect: 'portrait' },
  { id: 'marketing-ia', title: 'Marketing con IA', category: 'Inteligencia Artificial', aspect: 'landscape' },
]

export const metrics = [
  { value: 12, suffix: '+', label: 'Proyectos entregados' },
  { value: 1.4, suffix: 's', label: 'Vel. promedio de carga' },
  { value: 100, suffix: '%', label: 'Satisfacción del cliente' },
]
