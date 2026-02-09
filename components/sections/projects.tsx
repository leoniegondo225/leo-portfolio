
"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Eye } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n/language-context"

const projects = [
  {
    id: 1,
    title: "Site pour Restaurant Africain",
    description:
      "Site web moderne pour un restaurant africain avec menu interactif, système de réservation et présentation des spécialités culinaires.",
    image: "/pro1.png",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    category: "Web Development",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Plateforme Atelier",
    description:
      "Application web pour la gestion d'ateliers créatifs avec inscription en ligne, planning des sessions et suivi des participants.",
    image: "/pro7.png",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    category: "Full Stack",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 3,
    title: "Site Événementiel",
    description:
      "Plateforme complète pour la gestion d'événements avec billetterie en ligne, gestion des participants et tableau de bord administrateur.",
    image: "/event.PNG",
    technologies: ["React", "Firebase", "Tailwind CSS", "Authentication"],
    category: "Web Application",
    liveUrl: "https://frontend-login-rho.vercel.app/",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 4,
    title: "Site de Voyage",
    description:
      "Site web responsive pour une agence de voyage avec galerie de destinations, système de réservation et guides touristiques interactifs.",
    image: "/pro4.png",
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    category: "Web Development",
    liveUrl: "https://leoniegondo225.github.io/Newpagerestovoage/voyage.html",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Site Restaurant Moderne",
    description:
      "Site web élégant pour restaurant avec menu numérique, système de commande en ligne et intégration des réseaux sociaux.",
    image: "/pro5.png",
    technologies: ["React", "Tailwind CSS", "API Integration"],
    category: "Web Development",
    liveUrl: "https://leoniegondo225.github.io/Newpagerestovoage/",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 6,
    title: "Restaurant Premium",
    description:
      "Application web haut de gamme pour restaurant avec réservations en temps réel, menu interactif et système de fidélité client.",
    image: "/pro4.png",
    technologies: ["React", "Node.js", "Tailwind CSS", "Real-time"],
    category: "Full Stack",
    liveUrl: "https://leoniegondo225.github.io/ateliertailwind",
    githubUrl: "#",
    featured: true,
  },
  // {
  //   id:7,
  //   title:"Audite Assurance",
  //   description: "Apllication",
  //   image:"/crystal.png",
  //   technologies: ["React", "Node.js", "Tailwind CSS", "Real-time"],
  //   category: "Full Stack",
  //   liveUrl: "https://crystal03.vercel.app/",
  //   githubUrl: "#",
  //   featured: true,
  // },
]

const categories = ["Tous", "Web Development", "Full Stack", "Web Application"]

export function Projects() {
  const { t, language } = useLanguage()
  return (
    <section id="projets" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">Mes Créations</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Découvrez une sélection de mes projets récents, alliant créativité, performance technique et expérience
              utilisateur optimale.
            </p>
          </div>

          {/* Featured Projects */}
          <div className="mb-16">
            <h3 className="font-heading font-semibold text-2xl text-foreground mb-8 text-center">Projets Phares</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects
                .filter((project) => project.featured)
                .map((project) => (
                  <Card
                    key={project.id}
                    className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        <Button size="sm" variant="secondary" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <Eye className="w-4 h-4 mr-2" />
                            Voir
                          </a>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="text-xs">
                          {project.category}
                        </Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" asChild>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                      <h4 className="font-heading font-semibold text-xl text-foreground mb-3">{project.title}</h4>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* All Projects */}
          <div>
            <h3 className="font-heading font-semibold text-2xl text-foreground mb-8 text-center">Autres Projets</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter((project) => !project.featured)
                .map((project) => (
                  <Card
                    key={project.id}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="text-xs bg-background/90">
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-heading font-semibold text-lg text-foreground mb-2">{project.title}</h4>
                      <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <Eye className="w-3 h-3 mr-1" />
                            Voir
                          </a>
                        </Button>
                        <Button size="sm" variant="ghost" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-3 h-3" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-accent/5 to-secondary/5">
              <CardContent className="p-8">
                <h3 className="font-heading font-semibold text-2xl text-foreground mb-4">
                  Vous avez un projet en tête ?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Collaborons ensemble pour donner vie à vos idées et créer des solutions innovantes qui dépassent vos
                  attentes.
                </p>
                <Button size="lg" asChild>
                  <a href="#contact">
                    Discutons de votre projet
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
