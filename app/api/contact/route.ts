import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  message: string
}

// Validation des données côté serveur
function validateContactData(data: any): data is ContactFormData {
  return (
    typeof data.firstName === "string" &&
    data.firstName.trim().length > 0 &&
    typeof data.lastName === "string" &&
    data.lastName.trim().length > 0 &&
    typeof data.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) &&
    typeof data.message === "string" &&
    data.message.trim().length >= 10
  )
}

export async function POST(request: NextRequest) {
  try {
    // ✅ Vérification explicite de la clé
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY manquante")
      return NextResponse.json(
        { error: "Configuration serveur manquante" },
        { status: 500 }
      )
    }

    // ✅ Resend est créé ICI (runtime, pas build)
    const resend = new Resend(process.env.RESEND_API_KEY)

    const data = await request.json()

    // Validation des données
    if (!validateContactData(data)) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 })
    }

    // Protection anti-spam basique
    const userAgent = request.headers.get("user-agent") || ""
    if (userAgent.includes("bot") || userAgent.includes("crawler")) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
    }

    // Envoi de l'email via Resend
    const { data: emailData, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>", // OK pour tests
      to: "leoniegondo@gmail.com",
      replyTo: data.email,
      subject: `📩 Nouveau message de ${data.firstName} ${data.lastName}`,
      html: `
        <h2>Nouveau message via le formulaire de contact</h2>
        <p><strong>Nom :</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email :</strong> ${data.email}</p>
        <p><strong>Message :</strong></p>
        <p>${data.message.replace(/\n/g, "<br/>")}</p>
        <hr/>
        <small>Message envoyé depuis ton site web</small>
      `,
    })

    if (error) {
      console.error("Erreur Resend:", error)
      return NextResponse.json(
        { error: "Erreur lors de l'envoi d'email" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: "Message reçu avec succès", id: emailData?.id },
      { status: 200 }
    )
  } catch (error) {
    console.error("Erreur API contact:", error)
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 }
    )
  }
}
