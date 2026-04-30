'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { siteConfig } from '@/data/content'
import styles from './Nav.module.css'

const links = [
  { number: '01', label: 'Trabajo', href: '#trabajo' },
  { number: '02', label: 'Servicios', href: '#servicios' },
  { number: '03', label: 'Nosotros', href: '#nosotros' },
  { number: '04', label: 'Contacto', href: '#contacto' },
]

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<(HTMLLIElement | null)[]>([])
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const pendingScrollRef = useRef<string | null>(null)

  // Scroll-triggered logo reveal
  useEffect(() => {
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger)

        ScrollTrigger.create({
          start: 'top -100vh',
          onEnter: () => logoRef.current?.classList.add(styles.visible),
          onLeaveBack: () => logoRef.current?.classList.remove(styles.visible),
        })
      }
    )
  }, [])

  // Open animation
  useEffect(() => {
    if (!open || closing) return
    if (!overlayRef.current) return

    import('gsap').then(({ gsap }) => {
      gsap.fromTo(
        overlayRef.current,
        { y: '-100%' },
        { y: '0%', duration: 0.6, ease: 'power3.inOut' }
      )
      gsap.fromTo(
        linksRef.current.filter(Boolean),
        { y: 60 },
        { y: 0, duration: 0.8, stagger: 0.08, delay: 0.3, ease: 'power3.out' }
      )
    })
  }, [open, closing])

  // Close animation — runs when `closing` flips true
  useEffect(() => {
    if (!closing || !overlayRef.current) return

    import('gsap').then(({ gsap }) => {
      const tl = gsap.timeline({
        onComplete: () => {
          setOpen(false)
          setClosing(false)
          // if user clicked a link, scroll after unmount
          if (pendingScrollRef.current) {
            const target = pendingScrollRef.current
            pendingScrollRef.current = null
            requestAnimationFrame(() => {
              const el = document.querySelector(target)
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            })
          }
        },
      })

      const validLinks = linksRef.current.filter(Boolean)
      tl.to(validLinks.reverse(), {
        y: -50,
        duration: 0.35,
        stagger: 0.05,
        ease: 'power2.in',
      })
      tl.to(
        overlayRef.current,
        {
          y: '-100%',
          duration: 0.55,
          ease: 'power3.inOut',
        },
        '-=0.15'
      )
    })
  }, [closing])

  const closeOverlay = () => {
    if (!closing) setClosing(true)
  }

  // ESC key closes overlay
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeOverlay()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const handleLinkClick = (href: string) => {
    pendingScrollRef.current = href
    closeOverlay()
  }

  return (
    <>
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

        <button
          ref={triggerRef}
          className={styles.trigger}
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
        >
          <span className={styles.triggerLabel}>Índice</span>
          <span className={styles.triggerIcon}>
            <span />
            <span />
          </span>
        </button>
      </nav>

      {/* Fullscreen overlay */}
      {open && (
        <div ref={overlayRef} className={styles.overlay}>
          <div className={styles.overlayHeader}>
            <span className={styles.overlayLabel}>Menú</span>
            <button
              className={styles.closeBtn}
              onClick={closeOverlay}
              aria-label="Cerrar menú"
            >
              <span className={styles.closeIcon}>
                <span />
                <span />
              </span>
              <span>Cerrar</span>
            </button>
          </div>

          <ul className={styles.overlayList}>
            {links.map((link, i) => (
              <li
                key={link.href}
                ref={(el) => { linksRef.current[i] = el }}
                className={styles.overlayItem}
              >
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick(link.href)
                  }}
                  className={styles.overlayLink}
                >
                  <span className={styles.overlayNumber}>{link.number}</span>
                  <span className={styles.overlayText}>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.overlayFooter}>
            <span>doduv — {siteConfig.location}</span>
            <span>{siteConfig.email}</span>
          </div>
        </div>
      )}
    </>
  )
}
