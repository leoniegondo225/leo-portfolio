"use client"

// Section Services - Affiche les services proposés par Léonie
// Entièrement traduit FR/EN via le système i18n
import { useRef, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code2, Globe, ShoppingCart, Database, Zap, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

// Composant animation au scroll sans framer-motion
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

// Données des services avec traductions FR et EN
const servicesData = [
  {
    icon: Code2,
    colorClass: "text-blue-500",
    bgClass: "bg-blue-500/10",
    borderClass: "group-hover:border-blue-500/30",
    fr: {
      title: "Développement Web Frontend",
      description: "Interfaces modernes, réactives et esthétiques avec les meilleures technologies frontend. Sites qui captivent et engagent les utilisateurs.",
      features: ["Sites web responsives", "Applications React/Next.js", "Interfaces intuitives", "Optimisation des performances"],
    },
    en: {
      title: "Frontend Web Development",
      description: "Modern, responsive and aesthetic interfaces with the best frontend technologies. Websites that captivate and engage users.",
      features: ["Responsive websites", "React/Next.js applications", "Intuitive interfaces", "Performance optimization"],
    },
  },
  {
    icon: Globe,
    colorClass: "text-emerald-500",
    bgClass: "bg-emerald-500/10",
    borderClass: "group-hover:border-emerald-500/30",
    fr: {
      title: "Développement Web Fullstack",
      description: "Solutions complètes frontend + backend. De la conception à la mise en production, avec des APIs sécurisées et des bases de données optimisées.",
      features: ["Architecture frontend/backend", "APIs RESTful sécurisées", "Intégration bases de données", "Déploiement & maintenance"],
    },
    en: {
      title: "Fullstack Web Development",
      description: "Complete frontend + backend solutions. From design to production, with secure APIs and optimized databases.",
      features: ["Frontend/backend architecture", "Secure RESTful APIs", "Database integration", "Deployment & maintenance"],
    },
  },
  {
    icon: ShoppingCart,
    colorClass: "text-violet-500",
    bgClass: "bg-violet-500/10",
    borderClass: "group-hover:border-violet-500/30",
    fr: {
      title: "E-commerce & Solutions Numériques",
      description: "Plateformes de commerce en ligne complètes avec paiements sécurisés, gestion des stocks et optimisation des conversions.",
      features: ["Boutiques en ligne complètes", "Paiements sécurisés intégrés", "Gestion stocks & commandes", "Optimisation des conversions"],
    },
    en: {
      title: "E-commerce & Digital Solutions",
      description: "Complete online commerce platforms with secure payments, inventory management and conversion optimization.",
      features: ["Complete online stores", "Integrated secure payments", "Inventory & order management", "Conversion optimization"],
    },
  },
  {
    icon: Database,
    colorClass: "text-orange-500",
    bgClass: "bg-orange-500/10",
    borderClass: "group-hover:border-orange-500/30",
    fr: {
      title: "Gestion de Bases de Données",
      description: "Conception et optimisation de bases de données NoSQL et relationnelles. Structures performantes adaptées à vos besoins.",
      features: ["Schémas optimisés", "MongoDB & SQL", "Optimisation des requêtes", "Sauvegardes & sécurité"],
    },
    en: {
      title: "Database Management",
      description: "Design and optimization of NoSQL and relational databases. High-performance structures tailored to your needs.",
      features: ["Optimized schemas", "MongoDB & SQL", "Query optimization", "Backups & security"],
    },
  },
  {
    icon: Zap,
    colorClass: "text-yellow-500",
    bgClass: "bg-yellow-500/10",
    borderClass: "group-hover:border-yellow-500/30",
    fr: {
      title: "Automatisation & Intégration",
      description: "Scripts d'automatisation et intégration d'APIs tierces pour connecter vos services et optimiser vos processus métier.",
      features: ["Scripts d'automatisation", "Intégration APIs tierces", "Solutions sur mesure", "Optimisation des processus"],
    },
    en: {
      title: "Automation & Integration",
      description: "Automation scripts and third-party API integration to connect your services and optimize your business processes.",
      features: ["Automation scripts", "Third-party API integration", "Custom solutions", "Process optimization"],
    },
  },
]

// Variantes supprimées - utilise AnimerAuScroll à la place

export function Services() {
  const { t, language } = useLanguage()
  console.log("🔧 Section Services rendue en :", language)

  return (
    <section id="services" className="relative py-32 bg-background overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* En-tête de section */}
          <AnimerAuScroll className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-5 border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === "fr" ? "Ce que je fais" : "What I do"}</span>
            </div>
            <h2 className="font-black text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 tracking-tight">
              {language === "fr" ? "Mes " : "My "}
              <span className="text-gradient">Services</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t.services.subtitle}
            </p>
          </AnimerAuScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {servicesData.map((service, index) => {
              const contenu = language === "fr" ? service.fr : service.en
              return (
                <AnimerAuScroll key={index} delai={index * 80}>
                  <Card className={`
                    h-full border border-border/40 bg-card/50
                    hover:shadow-2xl hover:-translate-y-2
                    transition-all duration-400
                    ${service.borderClass}
                    backdrop-blur-sm
                  `}>
                    <CardContent className="p-7">
                      {/* Icône du service */}
                      <div className={`
                        w-13 h-13 rounded-2xl ${service.bgClass}
                        flex items-center justify-center mb-5
                        group-hover:scale-110 group-hover:rotate-6
                        transition-transform duration-500
                      `}>
                        <service.icon className={`w-6 h-6 ${service.colorClass}`} />
                      </div>

                      {/* Titre */}
                      <h3 className="font-black text-xl text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                        {contenu.title}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                        {contenu.description}
                      </p>

                      {/* Liste des fonctionnalités */}
                      <ul className="space-y-2">
                        {contenu.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className={`w-4 h-4 ${service.colorClass} flex-shrink-0`} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </AnimerAuScroll>
              )
            })}
          </div>

          <AnimerAuScroll delai={100}>
            <div className="relative p-px rounded-3xl overflow-hidden">
              {/* Bordure dégradée animée */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-primary animate-gradient opacity-30 rounded-3xl" />
              <Card className="relative glass border-none rounded-3xl bg-background/60">
                <CardContent className="p-10 sm:p-14 text-center">
                  <h3 className="font-black text-3xl sm:text-4xl text-foreground mb-4">
                    {t.services.ctaTitle}
                  </h3>
                  <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg">
                    {t.services.ctaDescription}
                  </p>
                  <Button
                    size="lg"
                    className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-10 font-bold shadow-xl shadow-primary/25 hover:-translate-y-1 transition-all duration-300 group"
                    asChild
                  >
                    <a href="#contact">
                      {t.services.ctaButton}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </AnimerAuScroll>

        </div>
      </div>
    </section>
  )
}
