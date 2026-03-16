"use client"

// Navigation principale - sans framer-motion, animations CSS pures
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Download, Moon, Sun } from "lucide-react"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/lib/i18n/language-context"
import { useTheme } from "next-themes"

export function Navigation() {
  const [menuOuvert, setMenuOuvert] = useState(false)
  const [aScrolle, setAScrolle] = useState(false)
  const [sectionActive, setSectionActive] = useState("accueil")
  const [estMonte, setEstMonte] = useState(false)
  const { t, language } = useLanguage()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setEstMonte(true)
    console.log("✅ Navigation montée")

    const gererScroll = () => {
      setAScrolle(window.scrollY > 30)
      // Détection de la section active
      const sections = ["accueil", "apropos", "competences", "services", "projets", "contact"]
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) { setSectionActive(id); break }
        }
      }
    }
    window.addEventListener("scroll", gererScroll, { passive: true })
    return () => window.removeEventListener("scroll", gererScroll)
  }, [])

  const basculerTheme = () => {
    const nouveau = theme === "dark" ? "light" : "dark"
    console.log("🎨 Thème changé :", nouveau)
    setTheme(nouveau)
  }

  if (!estMonte) return null

  // Liens de navigation
  const liensNav = [
    { cle: "home", label: t.nav.home, href: "#accueil", ancre: "accueil" },
    { cle: "about", label: t.nav.about, href: "#apropos", ancre: "apropos" },
    { cle: "skills", label: t.nav.skills, href: "#competences", ancre: "competences" },
    { cle: "services", label: t.nav.services, href: "#services", ancre: "services" },
    { cle: "projects", label: t.nav.projects, href: "#projets", ancre: "projets" },
    { cle: "contact", label: t.nav.contact, href: "#contact", ancre: "contact" },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${aScrolle ? "py-2" : "py-5"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className={`flex items-center justify-between px-5 py-2.5 rounded-2xl transition-all duration-500 ${aScrolle
            ? "bg-background/85 backdrop-blur-xl border border-border/60 shadow-xl shadow-black/10 dark:shadow-black/40 dark:bg-background/90"
            : "bg-background/40 backdrop-blur-md border border-border/20"
          }`}>

          {/* LOGO */}
          <a href="#accueil" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">L</div>
            <span className="font-black text-xl tracking-tight hidden sm:block">
              LEONIE<span className="text-primary ml-1">.</span>
            </span>
          </a>

          {/* LIENS DESKTOP */}
          <div className="hidden md:flex items-center gap-1">
            {liensNav.map((lien) => (
              <a key={lien.cle} href={lien.href}
                className={`relative px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200
                  ${sectionActive === lien.ancre
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
              >
                {lien.label}
                {/* Trait sous le lien actif */}
                {sectionActive === lien.ancre && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full block" />
                )}
              </a>
            ))}
          </div>

          {/* ACTIONS DESKTOP */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageToggle />
            {/* Bouton thème */}
            <button onClick={basculerTheme} aria-label="Changer le thème"
              className="w-9 h-9 rounded-xl bg-secondary/40 hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-200 border border-border/60"
            >
              {theme === "dark"
                ? <Sun className="h-4 w-4 transition-transform duration-300 rotate-0 hover:rotate-12" />
                : <Moon className="h-4 w-4 transition-transform duration-300" />
              }
            </button>
            {/* Bouton CV */}
            <Button size="sm" className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-md h-9 px-4 font-semibold hover:-translate-y-0.5 transition-all duration-200" asChild>
              <a href="/Cv Léonie Gondo.pdf" download>
                <Download className="w-3.5 h-3.5 mr-1.5" />CV
              </a>
            </Button>
          </div>

          {/* BOUTONS MOBILE */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={basculerTheme} className="w-9 h-9 rounded-xl bg-secondary/40 flex items-center justify-center text-muted-foreground border border-border/60">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button onClick={() => setMenuOuvert(!menuOuvert)} className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              {menuOuvert ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* MENU MOBILE - Affiché/caché avec CSS transition */}
        <div className={`md:hidden mt-3 transition-all duration-300 overflow-hidden ${menuOuvert ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="glass rounded-2xl shadow-2xl p-4 space-y-1 bg-background/90 backdrop-blur-xl border border-border/60">
            {liensNav.map((lien) => (
              <a key={lien.cle} href={lien.href}
                className={`flex items-center px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200
                  ${sectionActive === lien.ancre ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-primary/5"}`}
                onClick={() => setMenuOuvert(false)}
              >
                {lien.label}
              </a>
            ))}
            <div className="pt-3 border-t border-border/40 flex items-center justify-between px-2">
              <LanguageToggle />
              <Button size="sm" className="rounded-xl bg-primary text-primary-foreground h-9 px-4 font-semibold" asChild>
                <a href="/Cv Léonie Gondo.pdf" download>
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  {language === "fr" ? "Télécharger CV" : "Download CV"}
                </a>
              </Button>
            </div>
          </div>
        </div>

      </div>
    </nav>
  )
}
