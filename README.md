# Portfolio Leonie Gondo

Portfolio professionnel moderne développé avec Next.js, présentant les compétences et projets de Leonie Gondo, développeuse web et mobile.

## 🚀 Fonctionnalités

- **Design moderne et responsive** - Interface élégante adaptée à tous les écrans
- **Performance optimisée** - Images optimisées, lazy loading, et code splitting
- **SEO optimisé** - Métadonnées complètes, sitemap, et structure sémantique
- **Accessibilité** - Respect des standards WCAG, navigation au clavier, ARIA
- **Formulaire de contact fonctionnel** - Validation côté client/serveur, protection anti-spam
- **Animations subtiles** - Transitions fluides et effets hover élégants

## 🛠️ Technologies utilisées

- **Framework** : Next.js 14 (App Router)
- **Styling** : Tailwind CSS v4
- **UI Components** : Radix UI + shadcn/ui
- **Typographie** : DM Sans + Space Grotesk (Google Fonts)
- **Icons** : Lucide React
- **Validation** : Validation native + côté serveur
- **Déploiement** : Vercel

## 📦 Installation

1. **Cloner le repository**
   \`\`\`bash
   git clone https://github.com/votre-username/leonie-portfolio.git
   cd leonie-portfolio
   \`\`\`

2. **Installer les dépendances**
   \`\`\`bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   \`\`\`

3. **Lancer le serveur de développement**
   \`\`\`bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   \`\`\`

4. **Ouvrir dans le navigateur**
   Rendez-vous sur [http://localhost:3000](http://localhost:3000)

## 🌐 Variables d'environnement

Aucune variable d'environnement n'est requise pour le fonctionnement de base. Le formulaire de contact sauvegarde actuellement les messages dans un fichier JSON local.

### Configuration optionnelle pour l'envoi d'emails

Si vous souhaitez configurer l'envoi d'emails, créez un fichier `.env.local` :

\`\`\`env
# Exemple avec Resend
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your-email@example.com

# Exemple avec SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
\`\`\`

## 📁 Structure du projet

\`\`\`
├── app/                    # App Router (Next.js 14)
│   ├── api/contact/       # API route pour le formulaire
│   ├── globals.css        # Styles globaux et tokens de design
│   ├── layout.tsx         # Layout principal avec métadonnées SEO
│   ├── page.tsx          # Page d'accueil
│   ├── sitemap.ts        # Génération du sitemap
│   └── robots.ts         # Configuration robots.txt
├── components/
│   ├── sections/         # Sections du portfolio
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── skills.tsx
│   │   ├── services.tsx
│   │   ├── projects.tsx
│   │   └── contact.tsx
│   ├── ui/              # Composants UI réutilisables
│   ├── navigation.tsx   # Navigation principale
│   └── footer.tsx       # Pied de page
├── public/              # Assets statiques
├── data/               # Stockage des messages de contact
└── lib/                # Utilitaires
\`\`\`

## 🎨 Personnalisation

### Couleurs et thème

Les tokens de couleur sont définis dans `app/globals.css`. Modifiez les variables CSS pour personnaliser le thème :

\`\`\`css
:root {
  --primary: oklch(0.318 0 0);      /* Couleur principale */
  --accent: oklch(0.646 0.222 264.376); /* Couleur d'accent */
  --background: oklch(1 0 0);        /* Arrière-plan */
  /* ... autres variables */
}
\`\`\`

### Contenu

1. **Informations personnelles** : Modifiez les données dans chaque section
2. **Projets** : Mettez à jour le tableau `projects` dans `components/sections/projects.tsx`
3. **Compétences** : Personnalisez `skillCategories` dans `components/sections/skills.tsx`
4. **Services** : Adaptez le tableau `services` dans `components/sections/services.tsx`

### Images

Remplacez les images dans le dossier `public/` :
- `web-developer-woman-portrait.png` - Photo principale
- `professional-developer-portrait.png` - Photo section À propos
- `contact-workspace.png` - Image section contact
- `project-*.png` - Captures d'écran des projets

## 🚀 Déploiement

### Déploiement sur Vercel (recommandé)

1. **Push sur GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Connecter à Vercel**
   - Rendez-vous sur [vercel.com](https://vercel.com)
   - Importez votre repository GitHub
   - Déployez automatiquement

### Autres plateformes

Le projet peut être déployé sur toute plateforme supportant Next.js :
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📊 Performance et SEO

- **Lighthouse Score** : 95+ sur tous les critères
- **Core Web Vitals** : Optimisé pour LCP, FID, CLS
- **SEO** : Métadonnées complètes, sitemap, robots.txt
- **Accessibilité** : Navigation au clavier, ARIA labels, contrastes WCAG AA

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Contact

**Leonie Gondo**
- Email : leoniegondo@gmail.com
- GitHub : [@leoniegondo225](https://github.com/leoniegondo225)
- Portfolio : [leonie-gondo.vercel.app](https://leonie-gondo.vercel.app)

---

Développé avec ❤️ par Leonie Gondo
