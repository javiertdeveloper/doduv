'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './AsciiHands.module.css'

const DARK = ['@', '#', '&', '%']
const MID = ['{', '}', '<', '>', '=']
const LIGHT = ['.', ':', '·']

function charForBrightness(b: number): string {
  if (b > 240) return ' '
  if (b > 180) return LIGHT[Math.floor(Math.random() * LIGHT.length)]
  if (b > 90) return MID[Math.floor(Math.random() * MID.length)]
  return DARK[Math.floor(Math.random() * DARK.length)]
}

export default function AsciiHands() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const [ascii, setAscii] = useState('')
  const [ready, setReady] = useState(false)
  const mousePos = useRef({ x: 0, y: 0 })
  const animFrame = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    const img = new Image()
    img.src = '/images/hands.png'

    img.onload = () => {
      const cellW = 3
      const cellH = 5

      const cols = Math.floor(window.innerWidth / cellW)
      const imgAspect = img.width / img.height
      const cellAspect = cellW / cellH
      const rows = Math.round(cols / (imgAspect * cellAspect))

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

      setAscii(lines.join('\n'))
      requestAnimationFrame(() => setTimeout(() => setReady(true), 60))
    }
  }, [])

  // Slide-in animation
  useEffect(() => {
    if (!ready || !leftRef.current || !rightRef.current) return
    import('gsap').then(({ gsap }) => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(leftRef.current, { x: '-55vw', opacity: 0 }, { x: '0', opacity: 1, duration: 1.2 }, 0)
      tl.fromTo(rightRef.current, { x: '55vw', opacity: 0 }, { x: '0', opacity: 1, duration: 1.2 }, 0.05)
    })
  }, [ready])

  // Mouse parallax
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = {
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    }
  }, [])

  useEffect(() => {
    if (!ready || window.innerWidth < 768) return
    window.addEventListener('mousemove', handleMouseMove)

    let currentX = 0
    let currentY = 0

    const tick = () => {
      const targetX = mousePos.current.x * 6
      const targetY = mousePos.current.y * 4
      currentX += (targetX - currentX) * 0.06
      currentY += (targetY - currentY) * 0.06

      if (containerRef.current) {
        containerRef.current.style.transform = `translateY(-50%) translate(${currentX}px, ${currentY}px)`
      }
      animFrame.current = requestAnimationFrame(tick)
    }
    animFrame.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animFrame.current)
    }
  }, [ready, handleMouseMove])

  return (
    <div ref={containerRef} className={styles.container}>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {ascii && (
        <>
          <pre className={`${styles.ascii} ${styles.sizer}`} aria-hidden="true">{ascii}</pre>
          <div ref={leftRef} className={styles.halfLeft}>
            <pre className={styles.ascii} aria-hidden="true">{ascii}</pre>
          </div>
          <div ref={rightRef} className={styles.halfRight}>
            <pre className={styles.ascii} aria-hidden="true">{ascii}</pre>
          </div>
        </>
      )}
    </div>
  )
}
