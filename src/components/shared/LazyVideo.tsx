'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  src: string
  className?: string
  loop?: boolean
  rootMargin?: string
  onEnded?: (e: React.SyntheticEvent<HTMLVideoElement>) => void
} & Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'src' | 'onEnded'>

/**
 * Video that only loads its source when it scrolls into the viewport,
 * and pauses when it scrolls out — saves bandwidth and avoids CPU/GPU
 * cost from offscreen video decoding.
 */
export default function LazyVideo({
  src,
  className,
  loop = true,
  rootMargin = '300px',
  onEnded,
  ...rest
}: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const [activated, setActivated] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActivated(true)
            el.play().catch(() => {})
          } else if (activated) {
            el.pause()
          }
        }
      },
      { rootMargin, threshold: 0 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [activated, rootMargin])

  return (
    <video
      ref={ref}
      className={className}
      src={activated ? src : undefined}
      data-src={src}
      autoPlay
      muted
      loop={loop}
      playsInline
      preload="none"
      onEnded={onEnded}
      {...rest}
    />
  )
}
