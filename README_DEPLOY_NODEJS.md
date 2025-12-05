# Guide de Déploiement - Hair-gonomie (Node.js Backend)

## 🎯 Migration de Django vers Node.js

Le backend a été migré de Django (Python) vers Node.js avec Express.

## 📋 Prérequis

- **Node.js** version 18+ et npm
- Git (optionnel)

## 🚀 Déploiement Local

### Option 1 : Script automatique

```bash
chmod +x deploy-nodejs.sh
./deploy-nodejs.sh
```

### Option 2 : Déploiement manuel

#### 1. Build du Frontend
```bash
cd frontend/hair-egonomie
npm install
npm run build
```

#### 2. Copier le Frontend vers le Backend
```bash
cd ../..
rm -rf backend/static/*
cp -r frontend/hair-egonomie/dist/* backend/static/
```

#### 3. Installer les dépendances Backend
```bash
cd backend
npm install
```

#### 4. Configurer l'environnement
```bash
cp .env.example .env
# Éditez .env si nécessaire
```

#### 5. Démarrer le serveur

**Mode développement :**
```bash
npm run dev
```

**Mode production :**
```bash
npm start
```

## 🌐 Déploiement sur un serveur

### Hébergement recommandé pour Node.js

1. **Railway.app** (gratuit pour commencer)
2. **Render.com** (gratuit avec limitations)
3. **Vercel** (gratuit, excellent pour Node.js)
4. **Heroku** (payant)
5. **DigitalOcean App Platform**

### Configuration pour le déploiement

#### Railway.app / Render.com

1. Créez un compte
2. Connectez votre repository Git
3. Configurez les variables d'environnement :
   - `PORT` : fourni automatiquement
   - `NODE_ENV` : production

4. Build Command : 
   ```bash
   cd frontend/hair-egonomie && npm install && npm run build && cd ../.. && cp -r frontend/hair-egonomie/dist/* backend/static/ && cd backend && npm install
   ```

5. Start Command :
   ```bash
   cd backend && npm start
   ```

#### Vercel

1. Installez Vercel CLI :
   ```bash
   npm i -g vercel
   ```

2. Déployez :
   ```bash
   cd backend
   vercel
   ```

## 🔧 Structure des fichiers

```
backend/
├── server.js           # Serveur Express principal
├── routes/
│   └── api.js         # Routes API
├── static/            # Frontend React (généré)
├── package.json       # Dépendances Node.js
├── .env              # Configuration environnement
└── README.md         # Documentation
```

## 📡 Endpoints API

- `GET /api/questions` - Liste des questions
- `GET /api/health` - État de santé de l'API
- `GET /*` - Servir le frontend React

## ⚙️ Variables d'environnement

```env
PORT=8000
NODE_ENV=development
```

## 🐛 Dépannage

### Le serveur ne démarre pas
```bash
# Vérifiez Node.js
node --version  # Doit être >= 18

# Réinstallez les dépendances
rm -rf node_modules package-lock.json
npm install
```

### Erreur CORS
Le CORS est activé par défaut. Si nécessaire, modifiez dans `server.js` :
```javascript
app.use(cors({
  origin: 'https://votre-domaine.com'
}));
```

### Port déjà utilisé
```bash
# Changez le port dans .env
PORT=3000
```

## 🔄 Mise à jour du frontend

```bash
cd frontend/hair-egonomie
npm run build
cd ../..
cp -r frontend/hair-egonomie/dist/* backend/static/
```

## 📊 Monitoring

En production, ajoutez des outils comme :
- PM2 pour la gestion de processus
- Winston pour les logs
- New Relic ou DataDog pour le monitoring

### Exemple avec PM2
```bash
npm install -g pm2
pm2 start server.js --name "hair-gonomie"
pm2 save
pm2 startup
```

## 🆘 Support

Pour toute question, consultez :
- Documentation Express.js : https://expressjs.com/
- Documentation Node.js : https://nodejs.org/docs/
