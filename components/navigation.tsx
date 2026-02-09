"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Download } from "lucide-react"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/lib/i18n/language-context"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { t } = useLanguage() // Texte dynamique selon la langue

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#accueil" className="font-heading font-bold text-xl text-foreground">
              LEONIE <span className="text-accent">GONDO</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {Object.entries(t.nav).map(([key, label]) => (
              <a
                key={key}
                href={`#${key}`}
                className="text-foreground hover:text-accent transition-colors duration-200 font-medium"
              >
                {label}
              </a>
            ))}
            <LanguageToggle />
          </div>

          {/* CV Download */}
          <div className="hidden md:block">
            <Button variant="outline" size="sm" asChild>
              <a href="/Cv Léonie Gondo.pdf" download>
                <Download className="w-4 h-4 mr-2" />
                Télécharger CV
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageToggle />
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-2">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-sm rounded-lg">
              {Object.entries(t.nav).map(([key, label]) => (
                <a
                  key={key}
                  href={`#${key}`}
                  className="block px-3 py-2 text-foreground hover:text-accent transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </a>
              ))}
              <div className="px-3 py-2">
                <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                  <a href="/Cv-Leonie.pdf" download>
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger CV
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
