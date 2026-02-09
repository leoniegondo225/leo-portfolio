"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"
import { Languages } from "lucide-react"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button variant="outline" size="sm" onClick={() => setLanguage(language === "fr" ? "en" : "fr")} className="gap-2">
      <Languages className="w-4 h-4" />
      {language.toUpperCase()}
      <span className="font-medium">{language === "fr" ? "EN" : "FR"}</span>
    </Button>
  )
}
