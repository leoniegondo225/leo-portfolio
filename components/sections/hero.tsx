"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"
import { ArrowDown, Mail, Github } from "lucide-react"
import Image from "next/image"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section
      id="accueil"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contenu texte */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground font-medium">
                {t.hero.greeting}
              </p>
              <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground">
                {t.hero.name}
              </h1>
              <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-primary">
                {t.hero.title}
              </h2>
            </div>

            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <a href="#contact">
                  <Mail className="w-5 h-5 mr-2" />
                  {t.hero.contactBtn}
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a
                  href="https://github.com/leoniegondo225"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-5 h-5 mr-2" />
                  {t.hero.projectsBtn}
                </a>
              </Button>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <ArrowDown className="w-5 h-5 animate-bounce" />
              <span>{t.hero.scrollText}</span>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-end animate-fade-in">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl">
                <Image
                  src="/7.jpg"
                  alt="Leonie Gondo"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              {/* Éléments décoratifs */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
