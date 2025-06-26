# Script de déploiement automatique pour Clipea
# Utilisation: .\scripts\deploy.ps1

Write-Host "🚀 Déploiement Clipea sur Vercel" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

# Vérifier si Git est initialisé
if (-not (Test-Path ".git")) {
    Write-Host "❌ Git n'est pas initialisé. Initialisation..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit: Clipea"
    Write-Host "✅ Git initialisé" -ForegroundColor Green
} else {
    Write-Host "✅ Git déjà initialisé" -ForegroundColor Green
}

# Vérifier si un remote existe
$remoteUrl = git remote get-url origin 2>$null
if (-not $remoteUrl) {
    Write-Host "⚠️  Aucun remote GitHub configuré" -ForegroundColor Yellow
    Write-Host "📝 Veuillez créer un repository GitHub et ajouter le remote:" -ForegroundColor Cyan
    Write-Host "   git remote add origin https://github.com/votre-username/clipea.git" -ForegroundColor Gray
    Write-Host "   git push -u origin main" -ForegroundColor Gray
    exit 1
}

Write-Host "✅ Remote GitHub configuré: $remoteUrl" -ForegroundColor Green

# Vérifier si Vercel CLI est installé
try {
    $vercelVersion = vercel --version 2>$null
    if ($vercelVersion) {
        Write-Host "✅ Vercel CLI installé: $vercelVersion" -ForegroundColor Green
    } else {
        throw "Vercel CLI non trouvé"
    }
} catch {
    Write-Host "❌ Vercel CLI non installé" -ForegroundColor Red
    Write-Host "📦 Installation de Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
    Write-Host "✅ Vercel CLI installé" -ForegroundColor Green
}

# Vérifier si l'utilisateur est connecté à Vercel
try {
    $vercelUser = vercel whoami 2>$null
    if ($vercelUser) {
        Write-Host "✅ Connecté à Vercel: $vercelUser" -ForegroundColor Green
    } else {
        throw "Non connecté"
    }
} catch {
    Write-Host "🔐 Connexion à Vercel requise" -ForegroundColor Yellow
    Write-Host "📝 Exécutez: vercel login" -ForegroundColor Cyan
    exit 1
}

# Commit et push des changements
Write-Host "📤 Push des changements vers GitHub..." -ForegroundColor Yellow
git add .
git commit -m "Update: préparation déploiement Vercel"
git push origin main
Write-Host "✅ Changements poussés" -ForegroundColor Green

# Déploiement sur Vercel
Write-Host "🚀 Déploiement sur Vercel..." -ForegroundColor Yellow
Write-Host "📝 Vercel va vous poser quelques questions:" -ForegroundColor Cyan
Write-Host "   - Set up and deploy: Yes" -ForegroundColor Gray
Write-Host "   - Which scope: Sélectionnez votre compte" -ForegroundColor Gray
Write-Host "   - Link to existing project: No" -ForegroundColor Gray
Write-Host "   - Project name: clipea (ou votre choix)" -ForegroundColor Gray
Write-Host "   - Directory: ./ (par défaut)" -ForegroundColor Gray
Write-Host "   - Override settings: No" -ForegroundColor Gray

vercel --prod

Write-Host "🎉 Déploiement terminé!" -ForegroundColor Green
Write-Host "📱 Votre application est maintenant en ligne!" -ForegroundColor Cyan
Write-Host "🔗 URL: https://clipea.vercel.app" -ForegroundColor Cyan
Write-Host "📊 Dashboard: https://vercel.com/dashboard" -ForegroundColor Cyan 