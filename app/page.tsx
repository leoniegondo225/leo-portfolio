// ============================================
// PAGE PRINCIPALE - Assemblage de toutes les sections
// LanguageProvider enveloppe tout pour les traductions FR/EN
// ============================================

import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Skills } from "@/components/sections/skills"
import { Services } from "@/components/sections/services"
import { Projects } from "@/components/sections/projects"
import { Contact } from "@/components/sections/contact"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/lib/i18n/language-context"

export default function Home() {
  console.log("✅ Page principale chargée")

  return (
    // LanguageProvider donne accès aux traductions à tous les composants enfants
    <LanguageProvider>
      <main className="min-h-screen">
        {/* Barre de navigation fixe en haut */}
        <Navigation />

        {/* Sections dans l'ordre de la page */}
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Contact />

        {/* Pied de page */}
        <Footer />
      </main>
    </LanguageProvider>
  )
}
