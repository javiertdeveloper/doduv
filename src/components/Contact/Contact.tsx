'use client'

import { useEffect, useRef } from 'react'
import { siteConfig } from '@/data/content'
import styles from './Contact.module.css'

export default function Contact() {
  const phraseRef = useRef<HTMLParagraphElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger)

        if (phraseRef.current) {
          gsap.fromTo(
            phraseRef.current,
            { y: 20 },
            {
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: phraseRef.current,
                start: 'top 85%',
                once: true,
              },
            }
          )
        }

        if (revealRef.current) {
          gsap.fromTo(
            revealRef.current,
            { y: 30 },
            {
              y: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: revealRef.current,
                start: 'top 80%',
                once: true,
              },
            }
          )
        }
      }
    )
  }, [])

  return (
    <section className={styles.section} id="contacto">
      <p ref={phraseRef} className={styles.phrase}>
        Cualquier idea es posible.
      </p>

      <div ref={revealRef} className={styles.contact}>
        <p className={styles.question}>¿Llegaste hasta acá?</p>
        <p className={styles.cta}>Hablemos.</p>
        <a href={`mailto:${siteConfig.email}`} className={styles.email}>
          {siteConfig.email}
        </a>
      </div>

      <div className={styles.brand}>DODUV</div>

      <footer className={styles.footer}>
        <span className={styles.footerText}>México</span>
        <div className={styles.footerLinks}>
          <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Instagram</a>
          <a href="https://facebook.com/doduv" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Facebook</a>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>WhatsApp</a>
        </div>
        <span className={styles.footerText}>© {new Date().getFullYear()} doduv</span>
      </footer>
    </section>
  )
}
