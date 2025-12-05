#!/bin/bash

# Script de déploiement pour PythonAnywhere
# Usage: ./deploy.sh

echo "🚀 Début du déploiement..."

# Étape 1: Build React
echo "📦 Build de l'application React..."
cd frontend/hair-egonomie
npm install
npm run build

# Vérifier que le build a réussi
if [ ! -d "dist" ]; then
    echo "❌ Erreur: Le build React a échoué"
    exit 1
fi

echo "✅ Build React terminé"

# Étape 2: Copier les fichiers dans backend/static
echo "📁 Copie des fichiers statiques..."
cd ../../backend
rm -rf static/*
cp -r ../frontend/hair-egonomie/dist/* static/

# Étape 3: Copier le template HTML
echo "📄 Configuration du template..."
mkdir -p templates
cp static/index.html templates/index.html 2>/dev/null || echo "Note: index.html sera généré par Django"

echo "✅ Déploiement local terminé!"
echo ""
echo "📋 Prochaines étapes:"
echo "1. Upload le projet sur PythonAnywhere (via Git ou Files)"
echo "2. Dans PythonAnywhere Bash:"
echo "   cd ~/hair-gonomie/backend"
echo "   pip3.10 install --user -r requirements.txt"
echo "   python3.10 manage.py migrate"
echo "   python3.10 manage.py collectstatic --noinput"
echo "3. Configurer la Web App dans l'onglet Web"
echo "4. Redémarrer l'application"
echo ""
echo "📖 Voir DEPLOY_PYTHONANYWHERE.md pour les détails complets"

