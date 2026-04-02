'use client'

import { useEffect, useRef } from 'react'
import { services } from '@/data/content'
import styles from './Services.module.css'

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger)

        // Header reveal
        if (headerRef.current) {
          gsap.fromTo(
            headerRef.current.children,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: headerRef.current,
                start: 'top 80%',
                once: true,
              },
            }
          )
        }

        // Cards staggered reveal
        cardsRef.current.forEach((card, i) => {
          if (!card) return
          gsap.fromTo(
            card,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              delay: i * 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                once: true,
              },
            }
          )
        })
      }
    )
  }, [])

  return (
    <section ref={sectionRef} className={styles.section} id="servicios">
      <div ref={headerRef} className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Servicios</p>
          <h2 className={styles.title}>
            Lo que <span className={styles.titleAccent}>hacemos</span>
          </h2>
        </div>
        <div className={styles.headerLine} />
      </div>

      <div className={styles.grid}>
        {services.map((service, i) => (
          <div
            key={service.id}
            ref={(el) => { cardsRef.current[i] = el }}
            className={`${styles.card} ${service.isPrimary ? styles.cardPrimary : ''}`}
          >
            <span className={styles.cardNumber} aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className={styles.cardTitle}>{service.title}</h3>
            <p className={styles.cardDesc}>{service.description}</p>
            {service.isPrimary && (
              <span className={styles.cardTag}>Servicio principal</span>
            )}
          </div>
        ))}
      </div>

      <div className={styles.bottomStrip}>
        <div className={styles.stripLine} />
        <span className={styles.stripText}>Cada proyecto es único</span>
        <div className={styles.stripLine} />
      </div>
    </section>
  )
}
