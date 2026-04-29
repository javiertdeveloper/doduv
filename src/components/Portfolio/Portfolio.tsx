'use client'

import { useEffect, useRef, useState } from 'react'
import { featuredProject, projects } from '@/data/content'
import styles from './Portfolio.module.css'

const ASCII_MARKS = ['{ }', '< />', '#_', '0 1']
const CARD_CLASSES = ['card1', 'card2', 'card3', 'card4'] as const

/** Double-buffered video cycle — both videos stay mounted, z-index swap avoids gap on transition. */
function VideoCycle({ sources }: { sources: string[] }) {
  const [front, setFront] = useState(0)
  const videosRef = useRef<(HTMLVideoElement | null)[]>([])

  const handleEnded = () => {
    const next = (front + 1) % sources.length
    const nextVid = videosRef.current[next]
    if (nextVid) {
      nextVid.currentTime = 0
      nextVid.play().catch(() => {})
    }
    setFront(next)
  }

  return (
    <>
      {sources.map((src, i) => (
        <video
          key={src}
          ref={(el) => { videosRef.current[i] = el }}
          className={`${styles.mediaEl} ${i === front ? styles.videoFront : styles.videoBack}`}
          src={src}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={i === front ? handleEnded : undefined}
        />
      ))}
    </>
  )
}

/** Crossfades between images on a timed interval. */
function ImageCycle({ sources }: { sources: string[] }) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % sources.length)
    }, 4500)
    return () => clearInterval(id)
  }, [sources.length])
  return (
    <div className={styles.imageStack}>
      {sources.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`${styles.stackImage} ${i === index ? styles.stackActive : ''}`}
        />
      ))}
    </div>
  )
}

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
            {featuredProject.media.map((item) => (
              <div
                key={item.id}
                className={`${styles.sample} ${styles[`sample_${item.id}`]} ${item.aspect === 'portrait' ? styles.samplePortrait : styles.sampleLandscape}`}
              >
                <div className={styles.sampleImage}>
                  {item.type === 'video-cycle' ? (
                    <VideoCycle sources={item.sources} />
                  ) : item.type === 'image-cycle' ? (
                    <ImageCycle sources={item.sources} />
                  ) : (
                    <video
                      className={styles.mediaEl}
                      src={item.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  )}
                </div>
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
              ) : 'images' in project && project.images ? (
                <ImageCycle sources={project.images} />
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
            </div>
          </div>
        ))}

        {/* Mini-CTA — fills empty col 1 row 3, beside Kiosko portrait */}
        <a
          className={styles.cta}
          href="#contacto"
          onClick={(e) => {
            e.preventDefault()
            const el = document.querySelector('#contacto')
            if (el) el.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <p className={styles.ctaEyebrow}>¿Quieres ver más?</p>
          <h3 className={styles.ctaText}>
            <span>Hablemos.</span>
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </h3>
          <svg
            className={styles.ctaUnderline}
            viewBox="0 0 200 8"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M2,5 Q40,1 80,4 T160,3 T198,5"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </a>
      </div>
    </section>
  )
}
