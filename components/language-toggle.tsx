"use client"

// Composant pour basculer entre les langues (FR / EN)
// Affiche le drapeau et le nom de la langue actuelle
import { useLanguage } from "@/lib/i18n/language-context"
import { motion } from "framer-motion"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  // Bascule entre français et anglais
  const toggleLanguage = () => {
    const nouvelleLang = language === "fr" ? "en" : "fr"
    console.log("🌍 Changement de langue :", nouvelleLang.toUpperCase())
    setLanguage(nouvelleLang)
  }

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="
        relative flex items-center gap-1.5 px-3 py-1.5
        rounded-xl border border-border/60
        bg-secondary/40 hover:bg-primary/10
        text-sm font-bold text-muted-foreground hover:text-primary
        transition-all duration-200 cursor-pointer
        group overflow-hidden
      "
      aria-label="Changer la langue"
    >
      {/* Effet de survol lumineux */}
      <span className="
        absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
      " />

      {/* Drapeau SVG */}
      <div className="relative w-5 h-3.5 overflow-hidden rounded-sm shadow-sm z-10">
        <img
          src={language === "fr" ? "https://flagcdn.com/w40/fr.png" : "https://flagcdn.com/w40/gb.png"}
          alt={language === "fr" ? "Français" : "English"}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Texte de la langue cible */}
      <span className="relative z-10 font-bold text-xs">
        {language === "fr" ? "EN" : "FR"}
      </span>
    </motion.button>
  )
}
