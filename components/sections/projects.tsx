"use client"

// ============================================
// SECTION PROJECTS - Projets réalisés
// Carousel pour les projets phares + grille
// Design pro, bilingue FR/EN, animations
// ============================================

import { useRef, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Eye, Sparkles, Layers } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n/language-context"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

// Composant d'animation au scroll sans framer-motion
function AnimerAuScroll({ children, className = "", delai = 0 }: { children: React.ReactNode, className?: string, delai?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), delai); obs.unobserve(el) } }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" })
    obs.observe(el); return () => obs.disconnect()
  }, [delai])
  return <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-[0.98]"} ${className}`}>{children}</div>
}

// Données bilingues des projets
const PROJETS = [
  {
    id: 1,
    titleFr: "Site pour Restaurant Africain",
    titleEn: "African Restaurant Website",
    descFr: "Site web moderne pour un restaurant africain avec menu interactif, système de réservation et présentation des spécialités culinaires.",
    descEn: "Modern website for an African restaurant with interactive menu, reservation system and presentation of culinary specialties.",
    image: "/pro1.png",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive"],
    category: "Web Dev",
    liveUrl: "#",
    githubUrl: "#",
    enVedette: true,
  },
  {
    id: 2,
    titleFr: "Plateforme Atelier",
    titleEn: "Workshop Platform",
    descFr: "Application web pour la gestion d'ateliers créatifs avec inscription en ligne, planning des sessions et suivi des participants.",
    descEn: "Web application for managing creative workshops with online registration, session planning and participant tracking.",
    image: "/pro7.png",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    category: "Full Stack",
    liveUrl: "#",
    githubUrl: "#",
    enVedette: false,
  },
  {
    id: 3,
    titleFr: "Site Événementiel",
    titleEn: "Event Website",
    descFr: "Plateforme complète pour la gestion d'événements avec billetterie en ligne et tableau de bord administrateur.",
    descEn: "Complete platform for event management with online ticketing and admin dashboard.",
    image: "/event.PNG",
    technologies: ["React", "Firebase", "Tailwind CSS", "Auth"],
    category: "Web App",
    liveUrl: "https://frontend-login-rho.vercel.app/",
    githubUrl: "#",
    enVedette: true,
  },
  {
    id: 4,
    titleFr: "Site de Voyage",
    titleEn: "Travel Website",
    descFr: "Site web responsive pour une agence de voyage avec galerie de destinations et guides touristiques interactifs.",
    descEn: "Responsive website for a travel agency with destination gallery and interactive travel guides.",
    image: "/pro4.png",
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    category: "Web Dev",
    liveUrl: "https://leoniegondo225.github.io/Newpagerestovoage/voyage.html",
    githubUrl: "#",
    enVedette: false,
  },
  {
    id: 5,
    titleFr: "Site Restaurant Moderne",
    titleEn: "Modern Restaurant Site",
    descFr: "Site élégant pour restaurant avec menu numérique et intégration des réseaux sociaux.",
    descEn: "Elegant restaurant site with digital menu and social media integration.",
    image: "/pro5.png",
    technologies: ["React", "Tailwind CSS", "API"],
    category: "Web Dev",
    liveUrl: "https://leoniegondo225.github.io/Newpagerestovoage/",
    githubUrl: "#",
    enVedette: false,
  },
  {
    id: 6,
    titleFr: "Audite Assurance",
    titleEn: "Insurance Audit",
    descFr: "Application de gestion d'assurance pour auditeurs professionnels.",
    descEn: "Insurance management application for professional auditors.",
    image: "/crystal.png",
    technologies: ["Next.js", "Node.js", "Tailwind CSS"],
    category: "Full Stack",
    liveUrl: "https://crystal03.vercel.app/",
    githubUrl: "#",
    enVedette: true,
  },
  {
    id: 7,
    titleFr: "Institut Nappylocks",
    titleEn: "Nappylocks Institute",
    descFr: "Application de boutique en ligne et de gestion des salons de coiffure.",
    descEn: "Online shop and hair salon management application.",
    image: "/nappy.png",
    technologies: ["Next.js", "Node.js", "Tailwind CSS"],
    category: "Full Stack",
    liveUrl: "https://www.institutnappylocks.com/",
    githubUrl: "#",
    enVedette: true,
  },
  {
    id: 8,
    titleFr: "Elyva-tech",
    titleEn: "Elyva-tech",
    descFr: "Site web pour une société de services techniques.",
    descEn: "Website for a technical services company.",
    image: "/elyva.png",
    technologies: ["Next.js", "Node.js", "Tailwind CSS"],
    category: "Full Stack",
    liveUrl: "https://www.elyva-tech.com/",
    githubUrl: "#",
    enVedette: true,
  },
]

// Variantes supprimées - utilise AnimerAuScroll à la place

export function Projects() {
  const { t, language } = useLanguage()
  console.log("✅ Composant Projects rendu, langue :", language)

  // Séparer les projets en vedette et les autres
  const projetsEnVedette = PROJETS.filter((p) => p.enVedette)
  const autresProjets = PROJETS.filter((p) => !p.enVedette)

  return (
    <section id="projets" className="relative py-32 bg-background overflow-hidden">
      {/* Décoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/4 rounded-full blur-[150px] -mr-96 -mt-96 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* EN-TÊTE */}
          <AnimerAuScroll className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/8 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Layers className="w-3 h-3" />
              <span>Portfolio</span>
            </div>
            <h2 className="font-black text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 tracking-tight">
              {t.projects.title.split(" ")[0]}{" "}
              <span className="text-gradient">{t.projects.title.split(" ").slice(1).join(" ")}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t.projects.subtitle}
            </p>
          </AnimerAuScroll>

          {/* CAROUSEL */}
          <AnimerAuScroll className="mb-28">
            {/* Titre de section */}
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px bg-border flex-grow" />
              <h3 className="font-black text-xs uppercase tracking-[0.3em] text-primary/70">{t.projects.featuredTitle}</h3>
              <div className="h-px bg-border flex-grow" />
            </div>

            <Carousel
              plugins={[Autoplay({ delay: 5500, stopOnInteraction: true })]}
              opts={{ align: "center", loop: true }}
              className="w-full"
            >
              <CarouselContent className="-ml-4 md:-ml-8">
                {projetsEnVedette.map((projet) => {
                  // Choisir titre et description selon la langue
                  const titre = language === "fr" ? projet.titleFr : projet.titleEn
                  const description = language === "fr" ? projet.descFr : projet.descEn
                  return (
                    <CarouselItem key={projet.id} className="pl-4 md:pl-8 basis-full md:basis-[80%] lg:basis-[70%]">
                      <Card className="border border-border/40 bg-card/80 backdrop-blur-sm overflow-hidden group shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                        <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
                          {/* Image */}
                          <div className="lg:col-span-7 relative h-[280px] sm:h-[360px] lg:h-[420px] overflow-hidden">
                            <Image src={projet.image || "/placeholder.svg"} alt={titre} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent lg:bg-gradient-to-r" />
                            <div className="absolute top-5 left-5">
                              <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm px-3 py-1 rounded-xl border-none text-xs font-bold">
                                {projet.category}
                              </Badge>
                            </div>
                          </div>
                          {/* Contenu */}
                          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-center">
                            <h4 className="font-black text-2xl sm:text-3xl text-foreground mb-4 leading-tight">{titre}</h4>
                            <p className="text-muted-foreground leading-relaxed mb-7 line-clamp-3 text-sm">{description}</p>
                            <div className="flex flex-wrap gap-2 mb-8">
                              {projet.technologies.map((tech, i) => (
                                <Badge key={i} variant="secondary" className="text-xs px-3 py-1 border-none bg-secondary/50">{tech}</Badge>
                              ))}
                            </div>
                            <div className="flex gap-3 flex-wrap">
                              <Button size="sm" className="rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 group/btn" asChild>
                                <a href={projet.liveUrl} target="_blank" rel="noopener noreferrer">
                                  <Eye className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                                  {t.projects.viewBtn}
                                </a>
                              </Button>
                              <Button variant="outline" size="sm" className="rounded-xl border-border/60 hover:border-primary/40" asChild>
                                <a href={projet.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <Github className="w-4 h-4 mr-2" />
                                  {t.projects.codeBtn}
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
              <div className="flex items-center justify-center gap-4 mt-10">
                <CarouselPrevious className="static translate-y-0 h-12 w-12 rounded-2xl border-border/60 hover:border-primary/40 hover:bg-primary/5 shadow-lg" />
                <CarouselNext className="static translate-y-0 h-12 w-12 rounded-2xl border-border/60 hover:border-primary/40 hover:bg-primary/5 shadow-lg" />
              </div>
            </Carousel>
          </AnimerAuScroll>

          {/* GRILLE - Autres projets */}
          <div>
            <div className="flex items-center gap-4 mb-12">
              <h3 className="font-black text-xs uppercase tracking-[0.3em] text-muted-foreground/50 whitespace-nowrap">{t.projects.otherTitle}</h3>
              <div className="h-px bg-border flex-grow" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {autresProjets.map((projet, idx) => {
                const titre = language === "fr" ? projet.titleFr : projet.titleEn
                const description = language === "fr" ? projet.descFr : projet.descEn
                return (
                  <AnimerAuScroll key={projet.id} delai={idx * 80}>
                    <Card className="h-full flex flex-col border border-border/40 bg-card/60 backdrop-blur-sm hover:border-primary/25 hover:shadow-lg hover:shadow-primary/8 hover:-translate-y-1 transition-all duration-400">
                      {/* Image */}
                      <div className="relative h-52 overflow-hidden">
                        <Image src={projet.image || "/placeholder.svg"} alt={titre} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-background/85 backdrop-blur-sm text-foreground border-none px-3 py-1 rounded-lg text-xs font-semibold">
                            {projet.category}
                          </Badge>
                        </div>
                      </div>
                      {/* Contenu */}
                      <CardContent className="p-6 flex flex-col flex-grow space-y-4">
                        <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{titre}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 flex-grow">{description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {projet.technologies.slice(0, 3).map((tech, i) => (
                            <Badge key={i} variant="secondary" className="text-[10px] px-2 py-0.5 border-none bg-secondary/40">{tech}</Badge>
                          ))}
                        </div>
                        <div className="flex gap-2 pt-1">
                          <Button size="sm" className="flex-1 rounded-xl bg-primary hover:bg-primary/90 text-xs h-9 shadow-md shadow-primary/15" asChild>
                            <a href={projet.liveUrl} target="_blank" rel="noopener noreferrer">
                              <Eye className="w-3.5 h-3.5 mr-1.5" />{t.projects.viewBtn}
                            </a>
                          </Button>
                          <Button size="sm" variant="outline" className="rounded-xl border-border/60 hover:border-primary/40 h-9 px-3" asChild>
                            <a href={projet.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="w-3.5 h-3.5" />
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimerAuScroll>
                )
              })}
            </div>
          </div>

          {/* BANDEAU CTA */}
          <AnimerAuScroll delai={100} className="mt-24">
            <div className="relative group">
              {/* Bordure lumineuse */}
              <div className="absolute -inset-px bg-gradient-to-r from-primary/40 via-violet-500/40 to-primary/40 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Card className="relative border border-primary/15 bg-gradient-to-br from-primary/5 to-violet-500/5 rounded-3xl overflow-hidden">
                <CardContent className="p-12 sm:p-16 text-center space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Collaboration</span>
                  </div>
                  <h3 className="font-black text-3xl sm:text-4xl lg:text-5xl text-foreground tracking-tight max-w-3xl mx-auto">
                    {t.projects.ctaTitle}
                  </h3>
                  <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                    {t.projects.ctaDescription}
                  </p>
                  <Button
                    size="lg"
                    className="h-14 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-2xl shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300 group/btn"
                    asChild
                  >
                    <a href="#contact">
                      {t.projects.ctaButton}
                      <ExternalLink className="w-4 h-4 ml-2.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
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
