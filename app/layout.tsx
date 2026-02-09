import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from "@/lib/i18n/language-context"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: {
    default: "Leonie Gondo - Développeuse Web & Mobile",
    template: "%s | Leonie Gondo",
  },
  description:
    "Portfolio professionnel de Leonie Gondo, développeuse web et mobile passionnée par la création d'applications modernes et performantes. Spécialisée en React, React Native, Node.js et technologies web modernes.",
  keywords: [
    "développeuse web",
    "développeuse mobile",
    "React",
    "React Native",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "portfolio",
    "Côte d'Ivoire",
    "Abidjan",
    "développement frontend",
    "développement backend",
    "applications mobiles",
    "sites web responsives",
  ],
  authors: [{ name: "Leonie Gondo", url: "https://leonie-gondo.vercel.app" }],
  creator: "Leonie Gondo",
  publisher: "Leonie Gondo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://leonie-gondo.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Leonie Gondo - Développeuse Web & Mobile",
    description:
      "Portfolio professionnel de Leonie Gondo, développeuse web et mobile passionnée par la création d'applications modernes et performantes.",
    url: "https://leonie-gondo.vercel.app",
    siteName: "Leonie Gondo Portfolio",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Leonie Gondo - Développeuse Web & Mobile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leonie Gondo - Développeuse Web & Mobile",
    description:
      "Portfolio professionnel de Leonie Gondo, développeuse web et mobile passionnée par la création d'applications modernes et performantes.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="color-scheme" content="light" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="antialiased">
        <LanguageProvider>
        {children}
        <Toaster />
        </LanguageProvider>
      </body>
    </html>
  )
}
