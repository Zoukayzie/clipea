# Clipea - Créez des clips viraux avec l'IA

Une application Next.js pour créer automatiquement des clips viraux à partir de vidéos longues en utilisant l'IA.

## 🚀 Fonctionnalités

- **Upload de vidéos** et liens YouTube
- **Transcription automatique** avec Whisper
- **Analyse IA** pour détecter les moments clés
- **Génération de titres** accrocheurs avec GPT-4
- **Découpage intelligent** en clips de 30-90 secondes
- **Format vertical** optimisé pour TikTok/Reels
- **Sous-titres dynamiques**
- **Export facile** avec branding personnalisé

## 🛠️ Technologies

- **Frontend**: Next.js 14, React 18, TypeScript
- **UI**: Tailwind CSS, Radix UI, Lucide Icons
- **IA**: OpenAI Whisper, GPT-4
- **Vidéo**: FFmpeg
- **Déploiement**: Vercel

## 📦 Installation

```bash
# Cloner le repository
git clone <votre-repo-url>
cd clipea

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

## 🌐 Déploiement sur Vercel

### Méthode 1 : Déploiement automatique (Recommandé)

1. **Poussez votre code sur GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connectez-vous à Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez-vous avec votre compte GitHub
   - Cliquez sur "New Project"

3. **Importez votre repository**
   - Sélectionnez votre repository GitHub
   - Vercel détectera automatiquement Next.js
   - Cliquez sur "Deploy"

### Méthode 2 : Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter à Vercel
vercel login

# Déployer
vercel

# Pour la production
vercel --prod
```

## 🔧 Configuration des variables d'environnement

Créez un fichier `.env.local` avec :

```env
# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Services optionnels
ASSEMBLY_AI_KEY=your_assembly_ai_key
CLOUDINARY_URL=your_cloudinary_url

# Base URL (pour Vercel)
NEXT_PUBLIC_BASE_URL=https://clipea.vercel.app
```

## 📁 Structure du projet

```
├── app/
│   ├── api/                 # API Routes
│   │   ├── transcribe/      # Transcription audio
│   │   ├── analyze-content/ # Analyse IA
│   │   ├── generate-clip/   # Génération de clips
│   │   └── process-video/   # Traitement vidéo
│   ├── globals.css          # Styles globaux
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Page d'accueil
├── components/
│   ├── ui/                  # Composants UI
│   └── video-processor.tsx  # Processeur vidéo
├── lib/
│   ├── utils.ts             # Utilitaires
│   └── video-utils.ts       # Utilitaires vidéo
└── public/                  # Assets statiques
```

## 🎯 Utilisation

1. **Upload d'une vidéo** ou collez un lien YouTube
2. **Attendez l'analyse** automatique par l'IA
3. **Prévisualisez les clips** générés
4. **Personnalisez** les titres et sous-titres
5. **Exportez** en format vertical avec sous-titres

## 🔮 Roadmap

- [ ] Intégration Whisper API réelle
- [ ] Analyse GPT-4 pour détection des moments clés
- [ ] Découpage vidéo avec FFmpeg
- [ ] Sous-titres dynamiques
- [ ] Interface drag & drop
- [ ] Barre de progression en temps réel
- [ ] Export multiple formats
- [ ] Stockage cloud des vidéos

## 📄 Licence

MIT License - voir le fichier LICENSE pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 🆘 Support

- **Documentation**: Consultez ce README
- **Issues**: Ouvrez un ticket GitHub
- **Email**: support@clipmaster.ai

---

**ClipMaster AI** - Transformez vos vidéos en contenu viral ! 🚀
