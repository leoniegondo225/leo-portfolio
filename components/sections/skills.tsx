"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Code, Smartphone, Server, GitBranch } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

const skillCategories = [
  {
    title: "Frontend",
    icon: Code,
    color: "text-blue-600",
    skills: [
      { name: "JavaScript", level: 90, description: "Interactivité et fonctionnalités dynamiques" },
      { name: "React & Next", level: 85, description: "Interfaces utilisateur modernes et réactives" },
      { name: "HTML & CSS", level: 95, description: "Structure et mise en forme professionnelle" },
      { name: "Tailwind CSS", level: 80, description: "Design system et composants réutilisables" },
    ],
  },
  {
    title: "Mobile",
    icon: Smartphone,
    color: "text-green-600",
    skills: [
      { name: "React Native", level: 30, description: "Applications mobiles cross-platform" },
      { name: "Android Studio", level: 80, description: "Développement natif Android" },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    color: "text-purple-600",
    skills: [
      { name: "Node.js", level: 85, description: "Serveurs et APIs performants" },
      { name: "MongoDB", level: 80, description: "Base de données NoSQL flexible" },
      { name: "Firebase", level: 85, description: "Backend-as-a-Service complet" },
    ],
  },
  {
    title: "Outils",
    icon: GitBranch,
    color: "text-orange-600",
    skills: [
      { name: "Git & GitHub", level: 90, description: "Contrôle de version et collaboration" },
      { name: "VS Code", level: 95, description: "Environnement de développement" },
    ],
  },
]

const technologies = [
  "JavaScript",
  "TypeScript",
  "React & Next",
  "React Native",
  "Node.js",
  "MongoDB",
  "Firebase",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Git",
  "GitHub",
  "Android Studio",
  "REST APIs",
  "Responsive Design",
]

export function Skills() {
  const { t } = useLanguage()
  return (
    <section id="competences" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">Mes Compétences</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Toujours en quête d'innovation, je veille à adopter les meilleures pratiques et à explorer de nouvelles
              technologies pour offrir des solutions performantes et évolutives.
            </p>
          </div>

          {/* Skills Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {skillCategories.map((category, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center`}>
                      <category.icon className={`w-5 h-5 ${category.color}`} />
                    </div>
                    <h3 className="font-heading font-semibold text-xl text-foreground">{category.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-foreground">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                        <p className="text-sm text-muted-foreground">{skill.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Technologies Cloud */}
          <div className="text-center">
            <h3 className="font-heading font-semibold text-2xl text-foreground mb-8">Technologies Maîtrisées</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {technologies.map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-sm py-2 px-4 hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
