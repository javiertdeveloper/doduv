import Hero from '@/components/Hero/Hero'
import Portfolio from '@/components/Portfolio/Portfolio'
import Services from '@/components/Services/Services'
import About from '@/components/About/About'
import Contact from '@/components/Contact/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <Portfolio />
      <Services />
      <About />
      <Contact />
    </main>
  )
}
