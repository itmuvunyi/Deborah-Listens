import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { Testimonials } from "@/components/testimonials"
import { Resources } from "@/components/resources"
import { FAQ } from "@/components/faq"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Resources />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
