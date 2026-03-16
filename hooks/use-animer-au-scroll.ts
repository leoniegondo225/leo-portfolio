"use client"

// ============================================
// HOOK useAnimerAuScroll
// Remplace framer-motion pour les animations au scroll
// Utilise IntersectionObserver (natif, sans dépendance)
// ============================================

import { useEffect, useRef, useState } from "react"

/**
 * Ce hook rend un élément visible avec une animation CSS
 * quand l'utilisateur fait défiler jusqu'à lui.
 *
 * Utilisation :
 *   const { ref, estVisible } = useAnimerAuScroll()
 *   <div ref={ref} className={estVisible ? "animate-fade-in-up opacity-100" : "opacity-0"}>
 */
export function useAnimerAuScroll(delai = 0) {
  // Référence sur l'élément DOM à observer
  const ref = useRef<HTMLDivElement>(null)

  // État : est-ce que l'élément est visible à l'écran ?
  const [estVisible, setEstVisible] = useState(false)

  useEffect(() => {
    // Récupère l'élément DOM
    const element = ref.current
    if (!element) return

    // Crée un observateur qui surveille quand l'élément entre dans la vue
    const observateur = new IntersectionObserver(
      (entrees) => {
        entrees.forEach((entree) => {
          if (entree.isIntersecting) {
            // L'élément est visible → on déclenche l'animation après le délai
            setTimeout(() => {
              setEstVisible(true)
              console.log("👁️ Élément visible, animation déclenchée")
            }, delai)
            // On arrête d'observer (animation jouée une seule fois)
            observateur.unobserve(element)
          }
        })
      },
      {
        // L'élément doit être visible à 10% pour déclencher l'animation
        threshold: 0.1,
        // Marge : déclenche un peu avant que l'élément soit visible
        rootMargin: "0px 0px -50px 0px",
      }
    )

    // Commence à observer l'élément
    observateur.observe(element)

    // Nettoyage quand le composant se démonte
    return () => observateur.disconnect()
  }, [delai])

  return { ref, estVisible }
}
