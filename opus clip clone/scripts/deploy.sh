#!/bin/bash

# Script de déploiement automatique pour Clipea
# Utilisation: ./scripts/deploy.sh

echo "🚀 Déploiement Clipea sur Vercel"
echo "====================================="

# Vérifier si Git est initialisé
if [ ! -d ".git" ]; then
    echo "❌ Git n'est pas initialisé. Initialisation..."
    git init
    git add .
    git commit -m "Initial commit: Clipea"
    echo "✅ Git initialisé"
else
    echo "✅ Git déjà initialisé"
fi

# Vérifier si un remote existe
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  Aucun remote GitHub configuré"
    echo "📝 Veuillez créer un repository GitHub et ajouter le remote:"
    echo "   git remote add origin https://github.com/votre-username/clipea.git"
    echo "   git push -u origin main"
    exit 1
fi

REMOTE_URL=$(git remote get-url origin)
echo "✅ Remote GitHub configuré: $REMOTE_URL"

# Vérifier si Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI non installé"
    echo "📦 Installation de Vercel CLI..."
    npm install -g vercel
    echo "✅ Vercel CLI installé"
else
    VERCEL_VERSION=$(vercel --version)
    echo "✅ Vercel CLI installé: $VERCEL_VERSION"
fi

# Vérifier si l'utilisateur est connecté à Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Connexion à Vercel requise"
    echo "📝 Exécutez: vercel login"
    exit 1
else
    VERCEL_USER=$(vercel whoami)
    echo "✅ Connecté à Vercel: $VERCEL_USER"
fi

# Commit et push des changements
echo "📤 Push des changements vers GitHub..."
git add .
git commit -m "Update: préparation déploiement Vercel"
git push origin main
echo "✅ Changements poussés"

# Déploiement sur Vercel
echo "🚀 Déploiement sur Vercel..."
echo "📝 Vercel va vous poser quelques questions:"
echo "   - Set up and deploy: Yes"
echo "   - Which scope: Sélectionnez votre compte"
echo "   - Link to existing project: No"
echo "   - Project name: clipea (ou votre choix)"
echo "   - Directory: ./ (par défaut)"
echo "   - Override settings: No"

vercel --prod

echo "🎉 Déploiement terminé!"
echo "📱 Votre application est maintenant en ligne!"
echo "🔗 URL: https://clipea.vercel.app"
echo "📊 Dashboard: https://vercel.com/dashboard" 