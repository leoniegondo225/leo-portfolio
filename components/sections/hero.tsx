"use client"

// Section Hero - Sans framer-motion, animations CSS pures + typewriter
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"
import { ArrowDown, Mail, Github, Sparkles, Code2, Brain } from "lucide-react"
import Image from "next/image"

// Titres typewriter — "AI Augmented" en premier comme demandé
const TITRES_FR = [
  "AI Augmented Full Stack Developer",
  "Développeuse Mobile",
  "Créatrice d'expériences web IA",
]
const TITRES_EN = [
  "AI Augmented Full Stack Developer",
  "Mobile Developer",
  "AI-Powered Web Creator",
]

export function Hero() {
  const { t, language } = useLanguage()
  const [titreIndex, setTitreIndex] = useState(0)
  const [texteAffiche, setTexteAffiche] = useState("")
  const [enEcriture, setEnEcriture] = useState(true)
  const [monte, setMonte] = useState(false)

  // Déclenche les animations d'entrée après montage
  useEffect(() => {
    const timer = setTimeout(() => setMonte(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Animation typewriter : écrit et efface les titres
  useEffect(() => {
    const titres = language === "fr" ? TITRES_FR : TITRES_EN
    const titreCourant = titres[titreIndex]
    if (enEcriture) {
      if (texteAffiche.length < titreCourant.length) {
        const t = setTimeout(() => setTexteAffiche(titreCourant.slice(0, texteAffiche.length + 1)), 65)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setEnEcriture(false), 2000)
        return () => clearTimeout(t)
      }
    } else {
      if (texteAffiche.length > 0) {
        const t = setTimeout(() => setTexteAffiche(texteAffiche.slice(0, -1)), 35)
        return () => clearTimeout(t)
      } else {
        setTitreIndex((prev) => (prev + 1) % titres.length)
        setEnEcriture(true)
      }
    }
  }, [texteAffiche, enEcriture, titreIndex, language])

  // Réinitialise au changement de langue
  useEffect(() => {
    console.log("🌍 Langue changée, réinitialisation typewriter")
    setTexteAffiche("")
    setEnEcriture(true)
    setTitreIndex(0)
  }, [language])

  // Classes CSS pour l'animation d'entrée (remplace framer-motion)
  const classeEntree = (delaiMs: number) =>
    `transition-all duration-700 ${monte ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`

  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Fonds animés CSS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-80 h-80 bg-primary/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute inset-0 dot-grid opacity-30" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* TEXTE */}
          <div className="space-y-8 order-2 lg:order-1 text-center lg:text-left">

            {/* Badge disponibilité — avec icône IA */}
            <div className={`${classeEntree(0)} inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest border border-primary/20 uppercase`} style={{ transitionDelay: "0ms" }}>
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <Brain className="w-3.5 h-3.5" />
              <span>{language === "fr" ? "AI Augmented Developer • Disponible" : "AI Augmented Developer • Available"}</span>
            </div>

            {/* Nom */}
            <div className={classeEntree(100)} style={{ transitionDelay: "150ms" }}>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                {t.hero.greeting}
              </p>
              <h1 className="font-black text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tighter">
                <span className="text-foreground">LEONIE</span>
                <br />
                <span className="text-gradient">GONDO</span>
              </h1>
            </div>

            {/* Typewriter */}
            <div className={`${classeEntree(200)} h-10 flex items-center justify-center lg:justify-start`} style={{ transitionDelay: "300ms" }}>
              <h2 className="text-xl sm:text-2xl font-bold text-muted-foreground">
                {texteAffiche}
                <span className="inline-block w-0.5 h-6 bg-primary ml-1 align-middle animate-bounce-slow" />
              </h2>
            </div>

            {/* Description */}
            <p className={classeEntree(300)} style={{ transitionDelay: "450ms" }}>
              <span className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed block">
                {t.hero.description}
              </span>
            </p>

            {/* Boutons */}
            <div className={`${classeEntree(400)} flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4`} style={{ transitionDelay: "600ms" }}>
              <Button size="lg" className="w-full sm:w-auto rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:-translate-y-1 transition-all duration-300 h-14 px-8 font-semibold" asChild>
                <a href="#contact"><Mail className="w-5 h-5 mr-2" />{t.hero.contactBtn}</a>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-xl border-border hover:border-primary/40 hover:bg-primary/5 hover:-translate-y-1 transition-all duration-300 h-14 px-8 font-semibold" asChild>
                <a href="https://github.com/leoniegondo225" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 mr-2" />{t.hero.projectsBtn}
                </a>
              </Button>
            </div>

            {/* Scroll */}
            <div className={`${classeEntree(500)} flex items-center justify-center lg:justify-start gap-3 text-muted-foreground/50 text-xs font-medium uppercase tracking-widest pt-4`} style={{ transitionDelay: "900ms" }}>
              <div className="w-6 h-px bg-border" />
              <span>{t.hero.scrollText}</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce-slow" />
            </div>
          </div>

          {/* IMAGE */}
          <div className={`${classeEntree(0)} flex justify-center lg:justify-end order-1 lg:order-2`} style={{ transitionDelay: "200ms" }}>
            <div className="relative group">
              <div className="absolute -inset-6 bg-gradient-to-br from-primary/25 to-purple-500/25 rounded-[3rem] blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 animate-float" />
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px]">
                <div className="absolute inset-0 rounded-[2.5rem] border-2 border-primary/20 animate-rotate-slow" />
                <div className="relative w-full h-full glass-card rounded-[2.5rem] border-2 border-primary/15 overflow-hidden animate-float">
                  <Image src="/7.jpg" alt="Léonie Gondo" fill className="object-cover group-hover:scale-105 transition-transform duration-700" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
                </div>
                {/* Badge Full Stack / AI */}
                <div className="absolute -bottom-5 -right-5 glass px-4 py-3 rounded-2xl shadow-2xl border border-white/15 animate-float" style={{ animationDelay: "1s" }}>
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-tighter">AI Augmented</p>
                      <p className="text-sm font-black text-foreground">Full Stack</p>
                    </div>
                  </div>
                </div>
                {/* Badge IA */}
                <div className="absolute -top-5 -left-5 glass px-4 py-3 rounded-2xl shadow-2xl border border-white/15 animate-float" style={{ animationDelay: "2.5s" }}>
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-purple-500" />
                    <div>
                      <p className="text-[10px] font-bold text-purple-500 uppercase tracking-tighter">AI Tools</p>
                      <p className="text-sm font-black text-foreground">Expert</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
