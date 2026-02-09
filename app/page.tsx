import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Skills } from "@/components/sections/skills"
import { Services } from "@/components/sections/services"
import { Projects } from "@/components/sections/projects"
import { Contact } from "@/components/sections/contact"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/lib/i18n/language-context"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <LanguageProvider>
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Services />
      <Projects />
      <Contact />
      <Footer />
      <Toaster />
    </main>
    </LanguageProvider>
  )
}
