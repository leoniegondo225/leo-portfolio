"use client"

// ============================================
// SECTION CONTACT - Formulaire de contact
// Bilingue FR/EN, validation, design pro
// ============================================

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n/language-context"

// Types pour le formulaire
interface DonneesFormulaire {
  prenom: string
  nom: string
  email: string
  message: string
  consentement: boolean
  honeypot: string // Champ caché anti-spam
}

interface ErreursFormulaire {
  prenom?: string
  nom?: string
  email?: string
  message?: string
  consentement?: string
}

// Composant animation au scroll sans framer-motion
function AnimerAuScroll({ children, className = "", delai = 0 }: { children: React.ReactNode, className?: string, delai?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), delai); obs.unobserve(el) } }, { threshold: 0.08 })
    obs.observe(el); return () => obs.disconnect()
  }, [delai])
  return <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>{children}</div>
}

// Composant pour les messages d'erreur (remplace motion.p)
function ErreurChamp({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-xs text-destructive font-semibold mt-1 animate-fade-in-up">{message}</p>
}

export function Contact() {
  const { t, language } = useLanguage()
  const { toast } = useToast()

  // État des données du formulaire
  const [donnees, setDonnees] = useState<DonneesFormulaire>({
    prenom: "", nom: "", email: "", message: "", consentement: false, honeypot: "",
  })
  const [erreurs, setErreurs] = useState<ErreursFormulaire>({})
  const [enEnvoi, setEnEnvoi] = useState(false)
  const [statut, setStatut] = useState<"repos" | "succes" | "erreur">("repos")

  console.log("✅ Composant Contact rendu, langue :", language)

  // Informations de contact avec textes bilingues
  const infosContact = [
    {
      icone: MapPin,
      titre: t.contact.location,
      details: [language === "fr" ? "Côte d'Ivoire, Abidjan Riviera" : "Ivory Coast, Abidjan Riviera"],
      couleur: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icone: Mail,
      titre: t.contact.email,
      details: ["leoniegondo@gmail.com"],
      couleur: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      icone: Phone,
      titre: t.contact.phone,
      details: ["+225 05 56 51 25 99", "+225 07 47 67 90 89"],
      couleur: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ]

  // Valider les champs du formulaire
  const validerFormulaire = (): boolean => {
    const nouvellesErreurs: ErreursFormulaire = {}
    if (!donnees.prenom.trim()) nouvellesErreurs.prenom = t.contact.form.errors.firstNameRequired
    if (!donnees.nom.trim()) nouvellesErreurs.nom = t.contact.form.errors.lastNameRequired
    if (!donnees.email.trim()) {
      nouvellesErreurs.email = t.contact.form.errors.emailRequired
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donnees.email)) {
      nouvellesErreurs.email = t.contact.form.errors.emailInvalid
    }
    if (!donnees.message.trim()) {
      nouvellesErreurs.message = t.contact.form.errors.messageRequired
    } else if (donnees.message.trim().length < 10) {
      nouvellesErreurs.message = t.contact.form.errors.messageMinLength
    }
    if (!donnees.consentement) nouvellesErreurs.consentement = t.contact.form.errors.consentRequired
    setErreurs(nouvellesErreurs)
    console.log("📋 Validation formulaire :", Object.keys(nouvellesErreurs).length === 0 ? "✅ OK" : "❌ Erreurs", nouvellesErreurs)
    return Object.keys(nouvellesErreurs).length === 0
  }

  // Envoyer le formulaire via l'API
  const envoyerFormulaire = async (e: React.FormEvent) => {
    e.preventDefault()
    if (donnees.honeypot) { console.log("🚫 Spam détecté via honeypot"); return }
    if (!validerFormulaire()) return
    setEnEnvoi(true)
    setStatut("repos")
    console.log("📩 Envoi du message en cours...")
    try {
      const reponse = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: donnees.prenom, lastName: donnees.nom, email: donnees.email, message: donnees.message }),
      })
      if (reponse.ok) {
        setStatut("succes")
        setDonnees({ prenom: "", nom: "", email: "", message: "", consentement: false, honeypot: "" })
        console.log("✅ Message envoyé avec succès !")
        toast({ title: t.contact.form.success, description: language === "fr" ? "Je vous répondrai très bientôt." : "I will reply very soon." })
      } else { throw new Error("Erreur serveur") }
    } catch (erreur) {
      setStatut("erreur")
      console.log("❌ Erreur lors de l'envoi :", erreur)
      toast({ title: "Erreur", description: language === "fr" ? "Erreur lors de l'envoi. Réessayez." : "Send error. Please try again.", variant: "destructive" })
    } finally {
      setEnEnvoi(false)
    }
  }

  // Mettre à jour un champ du formulaire et effacer son erreur
  const mettreAJourChamp = (champ: keyof DonneesFormulaire, valeur: string | boolean) => {
    setDonnees((prev) => ({ ...prev, [champ]: valeur }))
    if (erreurs[champ as keyof ErreursFormulaire]) {
      setErreurs((prev) => ({ ...prev, [champ]: undefined }))
    }
  }

  return (
    <section id="contact" className="relative py-32 bg-muted/20 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* EN-TÊTE */}
          <AnimerAuScroll className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/8 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <MessageSquare className="w-3 h-3" /><span>Contact</span>
            </div>
            <h2 className="font-black text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 tracking-tight">
              {t.contact.title.split(" ")[0]}{" "}
              <span className="text-gradient">{t.contact.title.split(" ").slice(1).join(" ")}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">{t.contact.subtitle}</p>
          </AnimerAuScroll>

          {/* GRILLE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">

            {/* COLONNE GAUCHE */}
            <AnimerAuScroll className="space-y-8">
              {/* Photo bureau */}
              <div className="relative group">
                <div className="absolute -inset-3 bg-gradient-to-br from-primary/10 to-violet-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative glass-card rounded-2xl p-2.5">
                  <div className="relative rounded-xl overflow-hidden aspect-video">
                    <Image src="/bureau.webp" alt="Espace de travail" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                  </div>
                </div>
              </div>
              {/* Cartes contact */}
              <div className="space-y-4">
                {infosContact.map((info, index) => (
                  <div key={index} className="group hover:-translate-y-1 transition-transform duration-300">
                    <Card className="border border-border/40 bg-card/60 backdrop-blur-sm hover:border-primary/25 hover:shadow-md transition-all duration-300">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl ${info.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                            <info.icone className={`w-5 h-5 ${info.couleur}`} />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-foreground mb-1">{info.titre}</h4>
                            {info.details.map((detail, dIndex) => (
                              <p key={dIndex} className="text-muted-foreground text-sm">{detail}</p>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </AnimerAuScroll>

            {/* COLONNE DROITE — Formulaire */}
            <AnimerAuScroll delai={150}>
              <Card className="border border-border/40 bg-card/80 backdrop-blur-sm shadow-2xl">
                <CardContent className="p-8 sm:p-10">
                  <form onSubmit={envoyerFormulaire} className="space-y-6" noValidate>

                    {/* Anti-spam caché */}
                    <input type="text" name="website" value={donnees.honeypot} onChange={(e) => mettreAJourChamp("honeypot", e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                    {/* Prénom + Nom */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="prenom" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t.contact.form.firstName} *</Label>
                        <Input id="prenom" value={donnees.prenom} onChange={(e) => mettreAJourChamp("prenom", e.target.value)} placeholder="Jan"
                          className={`h-12 rounded-xl border-border/50 bg-background/50 focus:border-primary/50 transition-colors ${erreurs.prenom ? "border-destructive ring-1 ring-destructive/30" : ""}`} />
                        <ErreurChamp message={erreurs.prenom} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nom" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t.contact.form.lastName} *</Label>
                        <Input id="nom" value={donnees.nom} onChange={(e) => mettreAJourChamp("nom", e.target.value)} placeholder="Dou"
                          className={`h-12 rounded-xl border-border/50 bg-background/50 focus:border-primary/50 transition-colors ${erreurs.nom ? "border-destructive ring-1 ring-destructive/30" : ""}`} />
                        <ErreurChamp message={erreurs.nom} />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t.contact.form.email} *</Label>
                      <Input id="email" type="email" value={donnees.email} onChange={(e) => mettreAJourChamp("email", e.target.value)} placeholder="jane@example.com"
                        className={`h-12 rounded-xl border-border/50 bg-background/50 focus:border-primary/50 transition-colors ${erreurs.email ? "border-destructive ring-1 ring-destructive/30" : ""}`} />
                      <ErreurChamp message={erreurs.email} />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t.contact.form.message} *</Label>
                      <Textarea id="message" value={donnees.message} onChange={(e) => mettreAJourChamp("message", e.target.value)} placeholder={t.contact.form.messagePlaceholder}
                        className={`min-h-36 rounded-xl border-border/50 bg-background/50 focus:border-primary/50 transition-colors resize-none ${erreurs.message ? "border-destructive ring-1 ring-destructive/30" : ""}`} />
                      <ErreurChamp message={erreurs.message} />
                    </div>

                    {/* Consentement RGPD */}
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/20 border border-border/30">
                      <Checkbox id="consentement" checked={donnees.consentement} onCheckedChange={(val) => mettreAJourChamp("consentement", val as boolean)} className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                      <div>
                        <Label htmlFor="consentement" className="text-sm text-muted-foreground leading-snug cursor-pointer">{t.contact.form.consent}</Label>
                        <ErreurChamp message={erreurs.consentement} />
                      </div>
                    </div>

                    {/* Bouton envoi */}
                    <Button type="submit" size="lg" disabled={enEnvoi}
                      className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300 group"
                    >
                      {enEnvoi ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          {t.contact.form.submitting}
                        </span>
                      ) : statut === "succes" ? (
                        <span className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          {t.contact.form.success}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          {t.contact.form.submit}
                        </span>
                      )}
                    </Button>

                    {/* Note confidentialité */}
                    <p className="text-xs text-muted-foreground/50 text-center italic">{t.contact.form.requiredNote}</p>

                  </form>
                </CardContent>
              </Card>
            </AnimerAuScroll>
          </div>
        </div>
      </div>
    </section>
  )
}
