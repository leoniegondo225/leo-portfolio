"use client"
import { useLanguage } from "@/lib/i18n/language-context"
import { Github, Instagram, Facebook, ExternalLink } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/leoniegondo225",
    icon: Github,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/elo.oni?igsh=cHczdHE0cnY2MW0y",
    icon: Instagram,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/elo.oni.7?mibextid=ZbWKwL",
    icon: Facebook,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@onistar3?_t=ZN-8tdg9gcvST8&_r=1",
    icon: ExternalLink,
  },
]

const quickLinks = [
  { name: "À propos", href: "#apropos" },
  { name: "Compétences", href: "#competences" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
]

export function Footer() {
  const { t, language } = useLanguage()
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-heading font-bold text-2xl mb-4">
              LEONIE <span className="text-accent">GONDO</span>
            </h3>
            <p className="text-primary-foreground/80 mb-4 max-w-md">
              Développeuse Full-Stack et mobile passionnée par la création d'applications modernes, performantes et intuitives.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/80 hover:text-accent transition-colors duration-200"
                >
                  <link.icon className="w-5 h-5" />
                  <span className="sr-only">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Navigation</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <div className="space-y-2 text-primary-foreground/80">
              <p>Côte d'Ivoire, Abidjan</p>
              <p>leoniegondo@gmail.com</p>
              <p>+225 05 56 51 25 99</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/80">© 2024 Leonie Gondo. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
