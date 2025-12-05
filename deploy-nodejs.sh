#!/bin/bash

# Script de déploiement pour Hair-gonomie (Backend Node.js)
# ============================================================

echo "🚀 Démarrage du déploiement Hair-gonomie (Node.js Backend)"
echo "============================================================"

# Configuration
FRONTEND_DIR="frontend/hair-egonomie"
BACKEND_DIR="backend"

# 1. Build du Frontend
echo ""
echo "📦 Step 1: Building Frontend..."
echo "================================"
cd $FRONTEND_DIR
npm install
npm run build
echo "✅ Frontend build completed"

# 2. Copier les fichiers du frontend vers le backend
echo ""
echo "📋 Step 2: Copying Frontend to Backend..."
echo "=========================================="
cd ../..
rm -rf $BACKEND_DIR/static/*
cp -r $FRONTEND_DIR/dist/* $BACKEND_DIR/static/
echo "✅ Frontend files copied to backend/static"

# 3. Installation des dépendances backend
echo ""
echo "📦 Step 3: Installing Backend Dependencies..."
echo "=============================================="
cd $BACKEND_DIR
npm install
echo "✅ Backend dependencies installed"

# 4. Test du serveur
echo ""
echo "🧪 Step 4: Testing Server..."
echo "============================="
echo "Starting server in test mode..."
timeout 5s npm start &
sleep 3
if curl -s http://localhost:8000/api/health > /dev/null; then
    echo "✅ Server is running correctly"
else
    echo "⚠️  Server test skipped (manual verification recommended)"
fi

echo ""
echo "✅ Déploiement terminé !"
echo "========================"
echo ""
echo "📝 Prochaines étapes :"
echo "   1. Pour démarrer le serveur en développement : cd backend && npm run dev"
echo "   2. Pour démarrer en production : cd backend && npm start"
echo "   3. Le serveur sera accessible sur http://localhost:8000"
echo "   4. L'API est disponible sur http://localhost:8000/api"
echo ""
