'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './AsciiHands.module.css'

// Dark → light character ramp
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
  const wrapRef = useRef<HTMLDivElement>(null)
  const [ascii, setAscii] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    const img = new Image()
    img.src = '/images/hands.png'

    img.onload = () => {
      // Character cell: 5px wide monospace at 5px font = ~3px wide, 5px tall
      const cellW = 3
      const cellH = 5

      // Columns = full viewport width
      const cols = Math.floor(window.innerWidth / cellW)

      // Rows preserve the original 2000x457 aspect ratio, adjusted for cell shape
      const imgAspect = img.width / img.height   // ~4.376
      const cellAspect = cellW / cellH            // 0.6
      const rows = Math.round(cols / (imgAspect * cellAspect))

      // Sample the image at that resolution
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

  useEffect(() => {
    if (!ready || !wrapRef.current) return
    import('gsap').then(({ gsap }) => {
      gsap.fromTo(wrapRef.current, { opacity: 0 }, { opacity: 1, duration: 2, delay: 0.4, ease: 'power2.out' })
    })
  }, [ready])

  return (
    <div ref={wrapRef} className={styles.container}>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {ascii && <pre className={styles.ascii} aria-hidden="true">{ascii}</pre>}
    </div>
  )
}
