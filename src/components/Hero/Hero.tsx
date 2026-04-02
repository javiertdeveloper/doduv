'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Nav from '@/components/Nav/Nav'
import AsciiHands from './AsciiHands'
import styles from './Hero.module.css'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const dLeftRef = useRef<HTMLSpanElement>(null)
  const symbolRef = useRef<HTMLDivElement>(null)
  const dRightRef = useRef<HTMLSpanElement>(null)
  const rightBlockRef = useRef<HTMLDivElement>(null)
  const bottomLeftRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Phase 1: Letters emerge
      tl.fromTo(
        dLeftRef.current,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1.6 },
        0
      )
      tl.fromTo(
        dRightRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 1.6 },
        0.15
      )
      // Phase 1.5: Symbol reveals after hands start sliding in
      tl.fromTo(
        symbolRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1.6, ease: 'power2.out' },
        0.9
      )

      // Phase 2: Texts fade in after hands are visible
      tl.fromTo(
        rightBlockRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1.2 },
        1.6
      )
      tl.fromTo(
        bottomLeftRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2 },
        1.8
      )

      // Idle: ø floating animation — starts after entrance completes
      gsap.to(symbolRef.current, {
        y: -8,
        duration: 4.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 3,
      })
    })
  }, [])

  return (
    <section ref={heroRef} className={styles.hero}>
      <div className={styles.texture} />

      {/* Engraved logo letters */}
      <span ref={dLeftRef} className={`${styles.glyph} ${styles.glyphLeft}`} aria-hidden="true">
        d
      </span>

      <div ref={symbolRef} className={styles.symbol} aria-hidden="true">
        <Image
          src="/images/o-symbol.png"
          alt=""
          width={400}
          height={400}
          priority
        />
      </div>

      <span ref={dRightRef} className={`${styles.glyph} ${styles.glyphRight}`} aria-hidden="true">
        d
      </span>

      {/* Right vertical block */}
      <div ref={rightBlockRef} className={styles.rightBlock}>
        <span className={styles.verticalBrand}>doduv&reg;</span>
      </div>

      {/* Bottom left block */}
      <div ref={bottomLeftRef} className={styles.bottomLeft}>
        <p className={styles.tagline}>Construimos lo que tu negocio necesita.</p>
        <p className={styles.services}>WEB &middot; SOFTWARE &middot; INTELIGENCIA ARTIFICIAL</p>
      </div>

      {/* ASCII hands — the centerpiece */}
      <AsciiHands />

      {/* Nav */}
      <Nav />
    </section>
  )
}
