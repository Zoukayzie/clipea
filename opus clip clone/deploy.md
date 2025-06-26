# 🚀 Guide de Déploiement Vercel

## Méthode 1 : Déploiement via GitHub (Recommandé)

### Étape 1 : Préparer le repository GitHub

1. **Créez un repository GitHub**
   - Allez sur [github.com](https://github.com)
   - Cliquez sur "New repository"
   - Nommez-le `opus-clip-clone` ou `clipmaster-ai`
   - Choisissez "Public" ou "Private"

2. **Initialisez Git et poussez le code**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: ClipMaster AI"
   git branch -M main
   git remote add origin https://github.com/votre-username/votre-repo.git
   git push -u origin main
   ```

### Étape 2 : Déployer sur Vercel

1. **Allez sur Vercel**
   - Visitez [vercel.com](https://vercel.com)
   - Connectez-vous avec votre compte GitHub

2. **Importez le projet**
   - Cliquez sur "New Project"
   - Sélectionnez votre repository GitHub
   - Vercel détectera automatiquement Next.js

3. **Configurez le projet**
   - **Framework Preset**: Next.js (détecté automatiquement)
   - **Root Directory**: `./` (par défaut)
   - **Build Command**: `npm run build` (par défaut)
   - **Output Directory**: `.next` (par défaut)
   - **Install Command**: `npm install` (par défaut)

4. **Variables d'environnement** (optionnel pour commencer)
   - Cliquez sur "Environment Variables"
   - Ajoutez `OPENAI_API_KEY` si vous en avez une
   - Vous pourrez les ajouter plus tard

5. **Déployez**
   - Cliquez sur "Deploy"
   - Attendez 2-3 minutes pour le build

### Étape 3 : Configuration post-déploiement

1. **Vérifiez l'application**
   - Vercel vous donnera une URL (ex: `https://votre-app.vercel.app`)
   - Testez l'application

2. **Ajoutez un domaine personnalisé** (optionnel)
   - Dans les paramètres Vercel
   - Ajoutez votre domaine

## Méthode 2 : Déploiement via Vercel CLI

### Prérequis
- Node.js installé
- Compte Vercel

### Installation et déploiement

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter à Vercel
vercel login

# Déployer
vercel

# Pour la production
vercel --prod
```

## 🔧 Configuration des variables d'environnement

### Dans Vercel Dashboard

1. Allez dans votre projet Vercel
2. Cliquez sur "Settings" → "Environment Variables"
3. Ajoutez ces variables :

```env
# Obligatoire pour l'IA
OPENAI_API_KEY=sk-your-openai-key-here

# Optionnel
ASSEMBLY_AI_KEY=your-assembly-ai-key
CLOUDINARY_URL=your-cloudinary-url
NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
```

### Redéploiement après modification

Après avoir ajouté des variables d'environnement, redéployez :
- Via Dashboard : Cliquez sur "Redeploy"
- Via CLI : `vercel --prod`

## 🐛 Résolution des problèmes

### Erreur de build

1. **Vérifiez les logs** dans Vercel Dashboard
2. **Testez localement** : `npm run build`
3. **Vérifiez les dépendances** dans `package.json`

### Erreur 500 sur les API routes

1. **Vérifiez les variables d'environnement**
2. **Regardez les logs** dans Vercel Dashboard
3. **Testez les API** localement

### Problèmes de performance

1. **Optimisez les images** avec `next/image`
2. **Utilisez le caching** Vercel
3. **Optimisez les bundles** avec `next-bundle-analyzer`

## 📊 Monitoring

### Vercel Analytics
- Activez Vercel Analytics dans les paramètres
- Surveillez les performances

### Logs
- Accédez aux logs dans Vercel Dashboard
- Surveillez les erreurs en temps réel

## 🔄 Mises à jour

### Déploiement automatique
- Chaque push sur `main` déclenche un nouveau déploiement
- Les branches créent des previews automatiques

### Déploiement manuel
```bash
git add .
git commit -m "Update: nouvelle fonctionnalité"
git push origin main
# Vercel déploie automatiquement
```

## 🎯 Prochaines étapes

1. **Testez l'application** déployée
2. **Configurez les APIs** (OpenAI, etc.)
3. **Ajoutez un domaine** personnalisé
4. **Configurez les analytics**
5. **Mettez en place le monitoring**

## 📞 Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **GitHub Issues**: Pour les problèmes spécifiques au projet 