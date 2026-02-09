"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n/language-context"

interface FormData {
  firstName: string
  lastName: string
  email: string
  message: string
  consent: boolean
  honeypot: string // Anti-spam field
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  message?: string
  consent?: string
}



export function Contact() {
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    consent: false,
    honeypot: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const { toast } = useToast()

  const contactInfo = [
  {
    icon: MapPin,
    title: "Localisation",
    details: ["Côte d'Ivoire", "Abidjan, Riviera"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["leoniegondo@gmail.com"],
  },
  {
    icon: Phone,
    title: "Téléphone",
    details: ["+225 05 56 51 25 99", "+225 07 47 67 90 89"],
  },
]

 const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = t.contact.form.errors.firstNameRequired
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = t.contact.form.errors.lastNameRequired
    }
    if (!formData.email.trim()) {
      newErrors.email = t.contact.form.errors.emailRequired
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.contact.form.errors.emailInvalid
    }
    if (!formData.message.trim()) {
      newErrors.message = t.contact.form.errors.messageRequired
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t.contact.form.errors.messageMinLength
    }
    if (!formData.consent) {
      newErrors.consent = t.contact.form.errors.consentRequired
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Protection anti-spam - si le champ honeypot est rempli, c'est un bot
    if (formData.honeypot) {
      return
    }

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          message: "",
          consent: false,
          honeypot: "",
        })
        toast({
          title: "Message envoyé !",
          description: "Merci pour votre message. Je vous répondrai dans les plus brefs délais.",
        })
      } else {
        throw new Error("Erreur lors de l'envoi")
      }
    } catch (error) {
      setSubmitStatus("error")
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Effacer l'erreur du champ modifié
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">Contact</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Vous avez un projet en tête ? N'hésitez pas à me contacter pour discuter de vos besoins et voir comment
              nous pouvons collaborer ensemble.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info & Image */}
            <div className="space-y-8">
              <div className="relative">
                <div className="w-full h-64 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/bureau.webp"
                    alt="Espace de travail de Leonie"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <info.icon className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">{info.title}</h4>
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-muted-foreground">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field - hidden from users */}
                  <input
                    type="text"
                    name="website"
                    value={formData.honeypot}
                    onChange={(e) => handleInputChange("honeypot", e.target.value)}
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className={errors.firstName ? "border-destructive" : ""}
                        placeholder="Votre prénom"
                      />
                      {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className={errors.lastName ? "border-destructive" : ""}
                        placeholder="Votre nom"
                      />
                      {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={errors.email ? "border-destructive" : ""}
                      placeholder="votre.email@exemple.com"
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className={`min-h-32 ${errors.message ? "border-destructive" : ""}`}
                      placeholder="Décrivez votre projet ou vos besoins..."
                    />
                    {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => handleInputChange("consent", checked as boolean)}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
                        J'accepte que mes données personnelles soient utilisées pour me recontacter concernant ma
                        demande. *
                      </Label>
                      {errors.consent && <p className="text-sm text-destructive">{errors.consent}</p>}
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : submitStatus === "success" ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Message envoyé !
                      </>
                    ) : submitStatus === "error" ? (
                      <>
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Réessayer
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Envoyer le message
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    * Champs obligatoires. Vos données sont traitées de manière confidentielle.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
