'use client'

import { Fragment, useEffect, useRef } from 'react'
import { metrics } from '@/data/content'
import styles from './Metrics.module.css'

export default function Metrics() {
  const sectionRef = useRef<HTMLElement>(null)
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger)

        metrics.forEach((metric, i) => {
          const el = valueRefs.current[i]
          if (!el) return

          const isDecimal = metric.value % 1 !== 0
          const obj = { val: 0 }

          gsap.to(obj, {
            val: metric.value,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
            onUpdate: () => {
              el.textContent = isDecimal
                ? obj.val.toFixed(1)
                : Math.round(obj.val).toString()
            },
          })
        })
      }
    )
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.grid}>
        {metrics.map((metric, i) => (
          <Fragment key={metric.label}>
            {i > 0 && <div className={styles.separator} />}
            <div className={styles.metric}>
              <p className={styles.value}>
                <span ref={(el) => { valueRefs.current[i] = el }}>0</span>
                <span className={styles.suffix}>{metric.suffix}</span>
              </p>
              <p className={styles.label}>{metric.label}</p>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  )
}
