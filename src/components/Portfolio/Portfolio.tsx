'use client'

import { useEffect, useRef } from 'react'
import { featuredProject, projects } from '@/data/content'
import styles from './Portfolio.module.css'

const ASCII_MARKS = ['{ }', '< />', '#_', '0 1']
const CARD_CLASSES = ['card1', 'card2', 'card3', 'card4'] as const

export default function Portfolio() {
  const headerRef = useRef<HTMLDivElement>(null)
  const typedRef = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger)

        // Typing animation
        const word = 'trabajo'
        const typedEl = typedRef.current
        const cursorEl = cursorRef.current
        if (typedEl && cursorEl) {
          typedEl.textContent = ''
          cursorEl.style.opacity = '0'

          ScrollTrigger.create({
            trigger: headerRef.current,
            start: 'top 80%',
            once: true,
            onEnter: () => {
              gsap.to(cursorEl, { opacity: 1, duration: 0.1 })
              word.split('').forEach((letter, i) => {
                gsap.delayedCall(0.6 + i * 0.12, () => {
                  typedEl.textContent += letter
                })
              })
              gsap.delayedCall(0.6 + word.length * 0.12 + 0.5, () => {
                gsap.to(cursorEl, {
                  opacity: 0,
                  duration: 0.4,
                  delay: 1.2,
                  ease: 'power2.out',
                })
              })
            },
          })
        }

        // Featured card reveal
        if (featuredRef.current) {
          gsap.fromTo(
            featuredRef.current,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: featuredRef.current,
                start: 'top 85%',
                once: true,
              },
            }
          )
        }

        // Grid cards reveal
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
        <h2 className={styles.title}>
          <span className={styles.titleLabel}>Nuestro</span>{' '}
          <span ref={typedRef} className={styles.typed}></span>
          <span ref={cursorRef} className={styles.cursor} aria-hidden="true">|</span>
        </h2>
      </div>

      {/* Featured project — full width showcase */}
      <div ref={featuredRef} className={styles.featured}>
        <div className={styles.featuredInner}>
          <div className={styles.featuredInfo}>
            <span className={styles.featuredCategory}>{featuredProject.category}</span>
            <h3 className={styles.featuredTitle}>{featuredProject.title}</h3>
            <p className={styles.featuredDesc}>{featuredProject.description}</p>
          </div>
          <div className={styles.samplesGrid}>
            {featuredProject.samples.map((sample) => (
              <div key={sample.label} className={styles.sample}>
                <div className={styles.sampleImage}>
                  <span className={styles.sampleAscii} aria-hidden="true">{sample.ascii}</span>
                </div>
                <span className={styles.sampleLabel}>{sample.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Other projects — compact grid */}
      <div className={styles.grid}>
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => { cardsRef.current[i] = el }}
            className={`${styles.card} ${styles[CARD_CLASSES[i]]}`}
          >
            <div className={`${styles.imageWrap} ${project.aspect === 'portrait' ? styles.imagePortrait : styles.imageLandscape}`}>
              {'video' in project && project.video ? (
                <video
                  className={styles.videoEl}
                  src={project.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : (
                <div className={styles.placeholder}>
                  <span className={styles.asciiMark} aria-hidden="true">
                    {ASCII_MARKS[i]}
                  </span>
                </div>
              )}
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
