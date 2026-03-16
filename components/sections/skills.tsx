"use client"

// ============================================
// SECTION SKILLS - Compétences techniques
// Barres de progression animées, catégories,
// nuage de technologies — design ultra pro
// ============================================

import { useRef, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Smartphone, Server, GitBranch, Brain, Sparkles } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

// Composant d'animation au scroll (remplace framer-motion)
function AnimerAuScroll({ children, className = "", delai = 0 }: { children: React.ReactNode, className?: string, delai?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), delai); obs.unobserve(el) } }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" })
    obs.observe(el); return () => obs.disconnect()
  }, [delai])
  return <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>{children}</div>
}

// Barre de progression animée au scroll
function BarreProgression({ niveau, gradient }: { niveau: number, gradient: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [largeur, setLargeur] = useState(0)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setLargeur(niveau), 300); obs.unobserve(el) } }, { threshold: 0.5 })
    obs.observe(el); return () => obs.disconnect()
  }, [niveau])
  return (
    <div ref={ref} className="relative h-2 w-full bg-secondary/40 rounded-full overflow-hidden">
      <div className={`absolute top-0 left-0 h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${largeur}%` }} />
      <div className={`absolute top-0 left-0 h-1/2 bg-white/20 rounded-full transition-all duration-1000 ease-out`} style={{ width: `${largeur}%` }} />
    </div>
  )
}

// Données des catégories de compétences avec niveaux
const CATEGORIES_SKILLS = [
  {
    cleCategorie: "frontend" as const,
    icone: Code,
    couleur: "text-blue-500",
    bgCouleur: "bg-blue-500/10",
    barreGradient: "from-blue-500 to-cyan-500",
    competences: [
      { nom: "JavaScript / TypeScript", niveau: 90 },
      { nom: "React & Next.js", niveau: 85 },
      { nom: "HTML5 & CSS3", niveau: 95 },
      { nom: "Tailwind CSS", niveau: 82 },
    ],
  },
  {
    // Catégorie IA — nouvelle catégorie AI Augmented
    cleCategorie: "ia" as const,
    icone: Brain,
    couleur: "text-violet-500",
    bgCouleur: "bg-violet-500/10",
    barreGradient: "from-violet-500 to-purple-400",
    competences: [
      { nom: "Claude AI & Anthropic API", niveau: 90 },
      { nom: "Cursor (AI Code Editor)", niveau: 88 },
      { nom: "GitHub Copilot", niveau: 85 },
      { nom: "Prompt Engineering", niveau: 85 },
    ],
  },
  {
    cleCategorie: "mobile" as const,
    icone: Smartphone,
    couleur: "text-emerald-500",
    bgCouleur: "bg-emerald-500/10",
    barreGradient: "from-emerald-500 to-green-400",
    competences: [
      { nom: "React Native", niveau: 55 },
      { nom: "Android Studio", niveau: 80 },
    ],
  },
  {
    cleCategorie: "backend" as const,
    icone: Server,
    couleur: "text-purple-500",
    bgCouleur: "bg-purple-500/10",
    barreGradient: "from-purple-500 to-violet-500",
    competences: [
      { nom: "Node.js & Express", niveau: 85 },
      { nom: "MongoDB", niveau: 80 },
      { nom: "Firebase", niveau: 85 },
      { nom: "SQL / PostgreSQL", niveau: 75 },
    ],
  },
  {
    cleCategorie: "tools" as const,
    icone: GitBranch,
    couleur: "text-orange-500",
    bgCouleur: "bg-orange-500/10",
    barreGradient: "from-orange-500 to-amber-400",
    competences: [
      { nom: "Git & GitHub", niveau: 90 },
      { nom: "VS Code", niveau: 95 },
    ],
  },
]

// Liste des technologies maîtrisées (pour le nuage de badges)
// Technologies IA ajoutées en premier comme demandé
const TECHNOLOGIES = [
  // IA & Outils
  "Claude AI", "Cursor", "GitHub Copilot", "Prompt Engineering",
  "Anthropic API", "OpenAI API", "LangChain",
  // Frontend
  "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS",
  // Backend & DB
  "Node.js", "MongoDB", "Firebase", "SQL", "REST APIs",
  // Mobile & Outils
  "React Native", "Android Studio", "Git", "GitHub",
]

// Variantes supprimées - on utilise AnimerAuScroll à la place

export function Skills() {
  const { t } = useLanguage()
  console.log("✅ Composant Skills rendu")

  return (
    <section id="competences" className="relative py-32 overflow-hidden bg-muted/20">
      {/* Décoration d'arrière-plan */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/4 rounded-full blur-[200px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* EN-TÊTE DE SECTION */}
          <AnimerAuScroll className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/8 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3 h-3" />
              <span>Expertise</span>
            </div>
            <h2 className="font-black text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 tracking-tight">
              {t.skills.title.split(" ")[0]}{" "}
              <span className="text-gradient">{t.skills.title.split(" ").slice(1).join(" ")}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t.skills.subtitle}
            </p>
          </AnimerAuScroll>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
            {CATEGORIES_SKILLS.map((categorie, index) => {
              const titreCategorie = t.skills.categories[categorie.cleCategorie as keyof typeof t.skills.categories]
              const Icone = categorie.icone
              return (
                <AnimerAuScroll key={index} delai={index * 100}>
                  <Card className="h-full border border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/20 hover:shadow-lg hover:shadow-primary/8 transition-all duration-400">
                    <CardContent className="p-8">
                      {/* En-tête de la catégorie */}
                      <div className="flex items-center gap-4 mb-8">
                        <div className={`w-12 h-12 rounded-2xl ${categorie.bgCouleur} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <Icone className={`w-6 h-6 ${categorie.couleur}`} />
                        </div>
                        <h3 className="font-bold text-xl text-foreground">{titreCategorie}</h3>
                      </div>

                      {/* Liste des compétences avec barres animées */}
                      <div className="space-y-7">
                        {categorie.competences.map((skill, skillIndex) => (
                          <div key={skillIndex} className="space-y-2.5">
                            {/* Nom + Pourcentage */}
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-foreground text-sm">{skill.nom}</span>
                              <span className={`text-xs font-black px-2.5 py-1 rounded-lg ${categorie.bgCouleur} ${categorie.couleur}`}>
                                {skill.niveau}%
                              </span>
                            </div>
                            <BarreProgression niveau={skill.niveau} gradient={categorie.barreGradient} />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AnimerAuScroll>
              )
            })}
          </div>

          <AnimerAuScroll className="text-center">
            <h3 className="font-bold text-xs uppercase tracking-[0.25em] text-muted-foreground/50 mb-8">
              {t.skills.technologiesTitle}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {TECHNOLOGIES.map((tech, index) => (
                <div key={index} className="hover:-translate-y-1 hover:scale-105 transition-all duration-300">
                  <Badge variant="outline" className="text-sm py-2.5 px-5 rounded-2xl border-border/60 bg-card/60 hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all duration-300 font-semibold cursor-default">
                    {tech}
                  </Badge>
                </div>
              ))}
            </div>
          </AnimerAuScroll>

        </div>
      </div>
    </section>
  )
}
