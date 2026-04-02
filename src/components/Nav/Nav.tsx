'use client'

import { useEffect, useRef } from 'react'
import styles from './Nav.module.css'

const links = [
  { label: 'Trabajo', href: '#trabajo' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = navRef.current
    if (!el) return

    import('gsap').then(({ gsap }) => {
      gsap.fromTo(
        el.querySelectorAll('a'),
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 1.2, ease: 'power3.out' }
      )
    })
  }, [])

  return (
    <nav ref={navRef} className={styles.nav}>
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className={styles.link}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
