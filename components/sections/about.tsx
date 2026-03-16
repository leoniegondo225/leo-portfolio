"use client"

// SECTION ABOUT - Sans framer-motion, animations CSS avec IntersectionObserver
import { useRef, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Heart, Target, Lightbulb, Award, Coffee } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n/language-context"

const ICONES_VALEURS: Record<string, React.ComponentType<{ className?: string }>> = {
  adaptability: Lightbulb, passion: Heart, rigor: Award,
}
const EMOJIS_INTERETS = ["🤖", "🧠", "🎵", "⚡"]

// Composant wrapper qui anime son contenu au scroll
function AnimerAuScroll({ children, className = "", delai = 0 }: { children: React.ReactNode, className?: string, delai?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setVisible(true), delai); obs.unobserve(el) }
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delai])
  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  )
}

export function About() {
  const { t } = useLanguage()
  console.log("✅ Composant About rendu")

  return (
    <section id="apropos" className="relative py-32 bg-background overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[120px] -ml-48 -mb-48 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* EN-TÊTE */}
          <AnimerAuScroll className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/8 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <User className="w-3 h-3" /><span>{t.nav.about}</span>
            </div>
            <h2 className="font-black text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 tracking-tight">
              {t.about.title.split(" ")[0]}{" "}<span className="text-gradient">{t.about.title.split(" ").slice(1).join(" ")}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t.about.subtitle}</p>
          </AnimerAuScroll>

          {/* PHOTO + TEXTE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-20">
            <AnimerAuScroll delai={100} className="relative group">
              <div className="absolute -inset-6 bg-gradient-to-br from-primary/15 via-violet-500/10 to-pink-500/15 rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
              <div className="relative glass-card rounded-[2rem] p-3 animate-float">
                <div className="relative rounded-[1.5rem] overflow-hidden aspect-[4/5]">
                  <Image src="/6.jpg" alt="Léonie Gondo" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
                </div>
              </div>
              <div className="absolute -right-6 top-12 glass rounded-2xl px-4 py-3 shadow-xl border border-white/15 flex items-center gap-2 animate-float" style={{ animationDelay: "1s" }}>
                <Coffee className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none">{t.nav.about === "À propos" ? "Passionnée" : "Passionate"}</p>
                  <p className="text-xs font-bold text-foreground">Full Stack Dev</p>
                </div>
              </div>
            </AnimerAuScroll>

            <AnimerAuScroll delai={200} className="space-y-8">
              <div>
                <h3 className="font-black text-3xl sm:text-4xl text-foreground leading-tight mb-2">{t.about.heading}</h3>
                <h3 className="font-black text-3xl sm:text-4xl text-gradient leading-tight">{t.about.headingAccent}</h3>
              </div>
              <div className="space-y-5">
                <p className="text-muted-foreground leading-relaxed pl-4 border-l-2 border-primary/30">{t.about.paragraph1}</p>
                <p className="text-muted-foreground leading-relaxed">{t.about.paragraph2}</p>
                <p className="text-foreground/80 leading-relaxed font-medium">{t.about.paragraph3}</p>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-widest text-primary/80">{t.about.interestsTitle}</h4>
                <div className="flex flex-wrap gap-2.5">
                  {t.about.interests.map((interet, index) => (
                    <Badge key={interet} variant="secondary" className="px-4 py-2 rounded-xl bg-secondary/60 hover:bg-primary/10 hover:text-primary border-none transition-all duration-300 text-sm font-semibold hover:-translate-y-1 cursor-default">
                      <span className="mr-1">{EMOJIS_INTERETS[index] || "✨"}</span>{interet}
                    </Badge>
                  ))}
                </div>
              </div>
            </AnimerAuScroll>
          </div>

          {/* CARTES DE VALEURS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {Object.entries(t.about.values).map(([cle, valeur], index) => {
              const Icone = ICONES_VALEURS[cle] || User
              return (
                <AnimerAuScroll key={cle} delai={index * 100}>
                  <Card className="h-full border border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg hover:-translate-y-2 transition-all duration-400 group">
                    <CardContent className="p-7 space-y-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                        <Icone className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{valeur.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{valeur.description}</p>
                    </CardContent>
                  </Card>
                </AnimerAuScroll>
              )
            })}
          </div>

          {/* BANNIÈRE OBJECTIF */}
          <AnimerAuScroll delai={150}>
            <div className="relative group">
              <div className="absolute -inset-px bg-gradient-to-r from-primary/40 via-violet-500/40 to-primary/40 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Card className="relative border border-primary/15 bg-gradient-to-br from-primary/5 to-violet-500/5 backdrop-blur-sm rounded-3xl overflow-hidden">
                <CardContent className="p-8 sm:p-12">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/30 flex-shrink-0 animate-bounce-soft">
                      <Target className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="space-y-2 text-center md:text-left">
                      <h4 className="font-black text-xl uppercase tracking-tight text-foreground">{t.about.objectiveTitle}</h4>
                      <p className="text-muted-foreground leading-relaxed italic">"{t.about.objective}"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </AnimerAuScroll>

        </div>
      </div>
    </section>
  )
}
