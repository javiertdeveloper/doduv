'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { services } from '@/data/content'
import styles from './Services.module.css'

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger)

        if (headerRef.current) {
          gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: { trigger: headerRef.current, start: 'top 80%', once: true },
            }
          )
        }

        cardsRef.current.forEach((card, i) => {
          if (!card) return
          gsap.fromTo(
            card,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: i * 0.1,
              ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 85%', once: true },
            }
          )
        })
      }
    )
  }, [])

  return (
    <section ref={sectionRef} className={styles.section} id="servicios">
      <div className={styles.texture} />

      {/* Desktop: dimetrodon black silhouette */}
      <div className={styles.dimetrodon} aria-hidden="true">
        <Image
          src="/hero/dimetrodon.png"
          alt=""
          width={1200}
          height={680}
          loading="lazy"
        />
      </div>

      {/* Mobile: dino PNG silhouette */}
      <div className={styles.dino} aria-hidden="true">
        <Image
          src="/hero/dino.png"
          alt=""
          width={800}
          height={600}
          loading="lazy"
        />
      </div>

      <div ref={headerRef} className={styles.heroTitle}>
        <p className={styles.eyebrow}>Lo que hacemos</p>
        <h2 className={styles.title}>Servicios</h2>
      </div>

      <div className={styles.content}>
        <div className={styles.list}>
          {services.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => {
                cardsRef.current[i] = el
              }}
              className={styles.card}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardNumber}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.cardTitle}>{service.title}</h3>
              </div>
              <p className={styles.cardDesc}>{service.description}</p>
              <div className={styles.includes}>
                {service.includes.map((item) => (
                  <span key={item} className={styles.includeTag}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
