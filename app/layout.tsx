// ============================================
// LAYOUT PRINCIPAL - Configuration de l'app
// ThemeProvider pour dark/light mode
// Polices Google Fonts + métadonnées SEO
// ============================================

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

// Police Inter - moderne et lisible
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "Leonie Gondo — Développeuse Full Stack & Mobile",
    template: "%s | Leonie Gondo",
  },
  description:
    "Portfolio professionnel de Léonie Gondo, développeuse Full Stack et Mobile. Spécialisée React, Next.js, Node.js, React Native. Basée à Abidjan, Côte d'Ivoire.",
  keywords: [
    "développeuse web", "développeuse mobile", "Full Stack", "React", "Next.js",
    "React Native", "Node.js", "JavaScript", "TypeScript", "portfolio",
    "Côte d'Ivoire", "Abidjan", "Léonie Gondo",
  ],
  authors: [{ name: "Leonie Gondo" }],
  creator: "Leonie Gondo",
  metadataBase: new URL("https://leonie-gondo.vercel.app"),
  icons: {
    icon: "/7.jpg",
    shortcut: "/7.jpg",
    apple: "/7.jpg",
  },
  openGraph: {
    title: "Leonie Gondo — Développeuse Full Stack & Mobile",
    description: "Portfolio professionnel de Léonie Gondo, développeuse Full Stack et Mobile.",
    siteName: "Leonie Gondo Portfolio",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/7.jpg", width: 800, height: 800, alt: "Léonie Gondo" }],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // suppressHydrationWarning évite l'erreur de classe "dark" côté serveur
    <html lang="fr" className={inter.variable} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {/* Couleur de la barre de navigation mobile */}
        <meta name="theme-color" content="#7c3aed" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#a78bfa" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="antialiased font-sans">
        {/*
          ThemeProvider gère le mode dark/light
          - attribute="class" : ajoute la classe "dark" sur <html>
          - defaultTheme="system" : suit les préférences système
          - enableSystem : permet la détection automatique
        */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
