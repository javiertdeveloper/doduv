'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { services } from '@/data/content'
import styles from './Services.module.css'

const DARK = ['@', '#', '&', '%']
const MID = ['{', '}', '<', '>', '=']
const LIGHT = ['.', ':', '·']

function charForBrightness(b: number): string {
  if (b < 40) return ' '
  if (b < 100) return LIGHT[Math.floor(Math.random() * LIGHT.length)]
  if (b < 180) return MID[Math.floor(Math.random() * MID.length)]
  return DARK[Math.floor(Math.random() * DARK.length)]
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimetrodonAscii, setDimetrodonAscii] = useState('')
  const generated = useRef(false)

  // Generate dimetrodon ASCII
  useEffect(() => {
    if (generated.current) return
    generated.current = true

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    const img = new window.Image()
    img.src = '/images/dimetrodon.png'
    img.onload = () => {
      const cellW = 3
      const cellH = 3
      const cols = Math.floor(img.width / cellW)
      const rows = Math.floor(img.height / cellH)

      canvas.width = cols
      canvas.height = rows
      ctx.drawImage(img, 0, 0, cols, rows)
      const { data } = ctx.getImageData(0, 0, cols, rows)

      const lines: string[] = []
      for (let y = 0; y < rows; y++) {
        let line = ''
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4
          const a = data[i + 3]
          if (a < 30) { line += ' '; continue }
          const brightness = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
          line += charForBrightness(brightness)
        }
        lines.push(line)
      }
      setDimetrodonAscii(lines.join('\n'))
    }
  }, [])

  // GSAP animations
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
              scrollTrigger: {
                trigger: headerRef.current,
                start: 'top 80%',
                once: true,
              },
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
      <div className={styles.texture} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Desktop: dimetrodon black silhouette */}
      <div className={styles.dimetrodon} aria-hidden="true">
        <Image
          src="/images/dimetrodon.png"
          alt=""
          width={1200}
          height={680}
          priority={false}
        />
      </div>

      {/* Mobile: PNG dino silhouette (unchanged) */}
      <div className={styles.dino} aria-hidden="true">
        <Image
          src="/images/dino.png"
          alt=""
          width={800}
          height={600}
          priority={false}
        />
      </div>

      <div className={styles.content}>
        <div ref={headerRef} className={styles.header}>
          <p className={styles.eyebrow}>Servicios</p>
          <h2 className={styles.title}>
            Lo que <span className={styles.titleAccent}>hacemos</span>
          </h2>
        </div>

        <div className={styles.list}>
          {services.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => { cardsRef.current[i] = el }}
              className={styles.card}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardNumber}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.cardTitle}>{service.title}</h3>
              </div>
              <p className={styles.cardDesc}>{service.description}</p>
              <div className={styles.includes}>
                {service.includes.map((item) => (
                  <span key={item} className={styles.includeTag}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
