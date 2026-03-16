"use client"

// ============================================
// FOOTER - Pied de page du portfolio
// Bilingue FR/EN, liens sociaux, design pro
// ============================================

import { Github, Instagram, Facebook, ExternalLink, Mail, Phone, MapPin, Heart } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

// Liens vers les réseaux sociaux
const RESEAUX_SOCIAUX = [
  { nom: "GitHub", href: "https://github.com/leoniegondo225", icone: Github },
  { nom: "Instagram", href: "https://www.instagram.com/elo.oni", icone: Instagram },
  { nom: "Facebook", href: "https://www.facebook.com/elo.oni.7", icone: Facebook },
  { nom: "TikTok", href: "https://www.tiktok.com/@onistar3", icone: ExternalLink },
]

// Textes bilingues pour le footer
const TEXTES = {
  fr: {
    description: "Développeuse Full-Stack & Mobile passionnée, je crée des applications modernes, performantes et intuitives.",
    navigation: "Navigation",
    liens: [
      { label: "À propos", ancre: "#apropos" },
      { label: "Compétences", ancre: "#competences" },
      { label: "Services", ancre: "#services" },
      { label: "Projets", ancre: "#projets" },
      { label: "Contact", ancre: "#contact" },
    ],
    contact: "Contact",
    localisation: "Côte d'Ivoire, Abidjan",
    droits: "Tous droits réservés.",
    fabrique: "Fait avec",
    par: "par Léonie Gondo",
  },
  en: {
    description: "Passionate Full-Stack & Mobile Developer, I create modern, high-performance and intuitive applications.",
    navigation: "Navigation",
    liens: [
      { label: "About", ancre: "#apropos" },
      { label: "Skills", ancre: "#competences" },
      { label: "Services", ancre: "#services" },
      { label: "Projects", ancre: "#projets" },
      { label: "Contact", ancre: "#contact" },
    ],
    contact: "Contact",
    localisation: "Ivory Coast, Abidjan",
    droits: "All rights reserved.",
    fabrique: "Made with",
    par: "by Léonie Gondo",
  },
}

export function Footer() {
  const { language } = useLanguage()
  const textes = TEXTES[language]

  console.log("✅ Footer rendu, langue :", language)

  return (
    <footer className="relative bg-foreground text-background overflow-hidden">
      {/* Décoration en arrière-plan */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-violet-500/8 rounded-full blur-[60px] pointer-events-none" />

      {/* Ligne décorative en haut */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* COLONNE 1 — Marque et description */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-black text-xl">L</span>
              </div>
              <span className="font-black text-2xl tracking-tight">
                Leonie<span className="text-primary ml-1">Gondo</span>
              </span>
            </div>

            {/* Description */}
            <p className="text-background/70 leading-relaxed max-w-sm text-sm">
              {textes.description}
            </p>

            {/* Réseaux sociaux */}
            <div className="flex items-center gap-3">
              {RESEAUX_SOCIAUX.map((reseau) => (
                <a
                  key={reseau.nom}
                  href={reseau.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-9 h-9 rounded-xl
                    bg-background/10 hover:bg-primary/20
                    border border-background/10 hover:border-primary/40
                    flex items-center justify-center
                    text-background/70 hover:text-primary
                    hover:-translate-y-1 hover:scale-110
                    transition-all duration-300
                  "
                  aria-label={reseau.nom}
                >
                  <reseau.icone className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* COLONNE 2 — Navigation */}
          <div className="space-y-5">
            <h4 className="font-bold text-sm uppercase tracking-widest text-background/50">
              {textes.navigation}
            </h4>
            <ul className="space-y-3">
              {textes.liens.map((lien) => (
                <li key={lien.ancre}>
                  <a
                    href={lien.ancre}
                    className="text-background/70 hover:text-primary text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                    {lien.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLONNE 3 — Contact */}
          <div className="space-y-5">
            <h4 className="font-bold text-sm uppercase tracking-widest text-background/50">
              {textes.contact}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-background/70">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>{textes.localisation}</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-background/70">
                <Mail className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <a href="mailto:leoniegondo@gmail.com" className="hover:text-primary transition-colors">
                  leoniegondo@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-background/70">
                <Phone className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>+225 05 56 51 25 99</span>
              </li>
            </ul>
          </div>
        </div>

        {/* LIGNE DU BAS — Copyright */}
        <div className="mt-14 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-background/50 text-xs">
            © {new Date().getFullYear()} Leonie Gondo. {textes.droits}
          </p>
          
        </div>
      </div>
    </footer>
  )
}
