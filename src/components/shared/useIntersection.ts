import { useEffect, useRef, useState } from 'react'

/**
 * Tracks whether `ref` has ever entered the viewport (within `rootMargin`).
 * Once activated, stays activated — useful for one-shot lazy loads where
 * we don't want to tear down media when scrolling past.
 */
export function useInView<T extends Element>(rootMargin = '300px'): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            io.disconnect()
            return
          }
        }
      },
      { rootMargin, threshold: 0 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])

  return [ref, inView]
}
