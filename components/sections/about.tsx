"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Heart, Target, Music } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n/language-context"

export function About() {
  const { t } = useLanguage()

  return (
    <section id="apropos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
              {t.about.title}
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.about.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Profile Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/6.jpg"
                    alt="Leonie Gondo - Portrait professionnel"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-xl"></div>
              </div>
            </div>

            {/* About Content */}
            <div className="space-y-6">
              <div>
                <h3 className="font-heading font-semibold text-2xl text-foreground mb-4">
                  {t.about.heading} <span className="text-accent">{t.about.headingAccent}</span>
                </h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>{t.about.paragraph1}</p>
                  <p>{t.about.paragraph2}</p>
                  <p>{t.about.paragraph3}</p>
                </div>
              </div>

              {/* Interests */}
              <div>
                <h4 className="font-semibold text-lg text-foreground mb-3">{t.about.interestsTitle}</h4>
                <div className="flex flex-wrap gap-2">
                  {t.about.interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="text-sm">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Values Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {Object.entries(t.about.values).map(([key, value], index) => {
              const Icon = key === "adaptability" ? User : key === "passion" ? Heart : Target
              return (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h4 className="font-semibold text-lg text-foreground mb-2">{value.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Objective */}
          <Card className="border-l-4 border-l-accent bg-card/50">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Target className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-foreground mb-3">{t.about.objectiveTitle}</h4>
                  <p className="text-muted-foreground leading-relaxed">{t.about.objective}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Note */}
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
              <Music className="w-5 h-5" />
              <span className="text-sm">{t.about.personalNote}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
