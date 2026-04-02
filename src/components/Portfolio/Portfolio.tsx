'use client'

import { useEffect, useRef } from 'react'
import { projects } from '@/data/content'
import styles from './Portfolio.module.css'

const ASCII_MARKS = ['{ }', '< />', '#_', '0 1', '& %']
const CARD_CLASSES = ['card1', 'card2', 'card3', 'card4', 'card5'] as const

export default function Portfolio() {
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger)

        if (headerRef.current) {
          gsap.fromTo(
            headerRef.current.children,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: headerRef.current,
                start: 'top 80%',
                once: true,
              },
            }
          )
        }

        cardsRef.current.forEach((card) => {
          if (!card) return
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
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
    <section className={styles.section} id="trabajo">
      <div ref={headerRef} className={styles.header}>
        <p className={styles.eyebrow}>Portafolio</p>
        <h2 className={styles.title}>Lo que construimos</h2>
      </div>

      <div className={styles.grid}>
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => { cardsRef.current[i] = el }}
            className={`${styles.card} ${styles[CARD_CLASSES[i]]}`}
          >
            <div className={`${styles.imageWrap} ${project.aspect === 'portrait' ? styles.imagePortrait : styles.imageLandscape}`}>
              <div className={styles.placeholder}>
                <span className={styles.asciiMark} aria-hidden="true">
                  {ASCII_MARKS[i]}
                </span>
              </div>
            </div>
            <p className={styles.number}>{String(i + 1).padStart(2, '0')}</p>
            <div className={styles.info}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <span className={styles.category}>{project.category}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
