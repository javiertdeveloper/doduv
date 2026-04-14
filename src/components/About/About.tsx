'use client'

import { useEffect, useRef } from 'react'
import styles from './About.module.css'

const blocks = [
  {
    heading: 'A la medida',
    text: 'Cada proyecto es único porque cada negocio lo es. No usamos plantillas — diseñamos y construimos desde cero.',
  },
  {
    heading: 'Contigo en cada paso',
    text: 'El cliente es parte del proceso. Creamos junto a ti para que el resultado sea exactamente lo que tu negocio necesita.',
  },
  {
    heading: 'Sin fronteras',
    text: 'Nuestro trabajo no tiene límites. Para doduv ninguna idea es imposible — si la puedes imaginar, la podemos construir.',
  },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const blocksRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger)

        if (titleRef.current) {
          gsap.fromTo(
            titleRef.current,
            { y: 40 },
            {
              y: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: titleRef.current,
                start: 'top 80%',
                once: true,
              },
            }
          )
        }

        blocksRef.current.forEach((block, i) => {
          if (!block) return
          gsap.fromTo(
            block,
            { y: 30 },
            {
              y: 0,
              duration: 0.8,
              delay: i * 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: block,
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
    <section ref={sectionRef} className={styles.section} id="nosotros">
      <div className={styles.layout}>
        <div ref={titleRef} className={styles.left}>
          <p className={styles.eyebrow}>El estudio</p>
          <h2 className={styles.title}>Nosotros</h2>
        </div>

        <div className={styles.right}>
          {blocks.map((block, i) => (
            <div
              key={block.heading}
              ref={(el) => { blocksRef.current[i] = el }}
              className={styles.block}
            >
              <h3 className={styles.blockHeading}>{block.heading}</h3>
              <p className={styles.blockText}>{block.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
