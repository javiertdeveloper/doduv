'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './Nav.module.css'

const links = [
  { label: 'Trabajo', href: '#trabajo' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = navRef.current
    if (!el) return

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger)

        // Entrance animation for links
        gsap.fromTo(
          el.querySelectorAll('a'),
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 1.2, ease: 'power3.out' }
        )

        // Scroll-triggered nav transformation
        ScrollTrigger.create({
          start: 'top -100vh',
          onEnter: () => {
            el.classList.add(styles.scrolled)
            gsap.fromTo(
              logoRef.current,
              { opacity: 0, y: -10 },
              { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
            )
          },
          onLeaveBack: () => {
            el.classList.remove(styles.scrolled)
            gsap.to(logoRef.current, {
              opacity: 0, y: -10, duration: 0.3, ease: 'power2.in',
            })
          },
        })
      }
    )
  }, [])

  return (
    <nav ref={navRef} className={styles.nav}>
      <div ref={logoRef} className={styles.logo}>
        <Image
          src="/images/logo-negro.svg"
          alt="doduv"
          width={80}
          height={24}
          priority
        />
      </div>
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
