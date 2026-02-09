"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code2, Globe, ShoppingCart, Database, Zap, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

const services = [
  {
    icon: Code2,
    title: "Développement Web Frontend",
    description:
      "Créer des expériences web esthétiques et fonctionnelles est mon point fort. En utilisant les dernières technologies et les meilleures pratiques, je conçois et crée des sites web qui captivent et engagent les utilisateurs.",
    features: [
      "Sites web responsives et modernes",
      "Applications React performantes",
      "Interfaces utilisateur intuitives",
      "Optimisation des performances",
    ],
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Globe,
    title: "Développement Web Fullstack",
    description:
      "Création de sites web dynamiques et responsives adaptés à tous les supports. Maîtrise des technologies front-end et back-end pour des solutions complètes.",
    features: [
      "Architecture complète frontend/backend",
      "APIs RESTful sécurisées",
      "Intégration de bases de données",
      "Déploiement et maintenance",
    ],
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce & Solutions Numériques",
    description:
      "Conception et déploiement de plateformes de commerce en ligne intégrant des fonctionnalités complètes avec des systèmes de paiement sécurisés.",
    features: [
      "Plateformes e-commerce complètes",
      "Systèmes de paiement intégrés",
      "Gestion des stocks et commandes",
      "Optimisation des conversions",
    ],
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: Database,
    title: "Gestion de Bases de Données",
    description:
      "Mise en place et gestion de bases de données NoSQL et relationnelles. Maîtrise des opérations CRUD et optimisation des performances.",
    features: [
      "Conception de schémas optimisés",
      "MongoDB et bases relationnelles",
      "Optimisation des requêtes",
      "Sauvegardes et sécurité",
    ],
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    icon: Zap,
    title: "Programmation & Automatisation",
    description:
      "Développement de scripts et d'applications pour automatiser des tâches. Utilisation d'APIs RESTful pour connecter des services externes.",
    features: [
      "Scripts d'automatisation",
      "Intégration d'APIs tierces",
      "Solutions sur mesure",
      "Optimisation des processus",
    ],
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
]

export function Services() {
  const { t, language } = useLanguage()
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">Mes Services</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Je propose une gamme complète de services de développement Full-Stack et mobile, de la conception à la mise en
              production, en passant par la maintenance et l'optimisation.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-12 h-12 rounded-lg ${service.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className={`w-6 h-6 ${service.color}`} />
                  </div>
                  <CardTitle className="font-heading text-xl text-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-accent/5 to-secondary/5">
              <CardContent className="p-8">
                <h3 className="font-heading font-semibold text-2xl text-foreground mb-4">
                  Prêt à démarrer votre projet ?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Discutons de vos besoins et créons ensemble une solution sur mesure qui répond parfaitement à vos
                  objectifs.
                </p>
                <Button size="lg" asChild>
                  <a href="#contact">
                    Démarrer un projet
                    <ArrowRight className="w-4 h-4 ml-2" />
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
