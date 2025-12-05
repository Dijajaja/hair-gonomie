# 💈 Hair-gonomie

Ceci est un projet de la nuit de l'info !

## 🎯 Stack Technique

### Frontend
- **React** + Vite
- **Tailwind CSS**
- **Framer Motion** (animations)
- **shadcn/ui** (composants UI)

### Backend ✨ **NOUVEAU : Node.js !**
- **Node.js** + Express
- **ES Modules** (import/export moderne)
- **Helmet** (sécurité)
- **CORS** (cross-origin)
- **Morgan** (logging)

> ⚠️ **Migration effectuée** : Le backend Django (Python) a été remplacé par Node.js/Express

## 🚀 Installation rapide

### Prérequis
- Node.js 18+
- npm

### Option 1 : Script automatique (recommandé)
```bash
./deploy-nodejs.sh
```

### Option 2 : Installation manuelle

#### Frontend
```bash
cd frontend/hair-egonomie
npm install
npm install framer-motion
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input
npm run build
```

#### Backend
```bash
cd backend
npm install
npm start
```

## 🎮 Démarrage

### Mode développement
```bash
# Backend (Terminal 1)
cd backend
npm run dev

# Frontend (Terminal 2) - si vous développez
cd frontend/hair-egonomie
npm run dev
```

### Mode production
```bash
cd backend
npm start
# L'application complète sera disponible sur http://localhost:8000
```

## 📚 Documentation

- [📖 Migration vers Node.js](MIGRATION_NODEJS.md) - **NOUVEAU !**
- [🚀 Guide de déploiement Node.js](README_DEPLOY_NODEJS.md)
- [🐳 Déploiement Docker](DOCKER_GUIDE.md)
- [⚙️ PM2 Production](PM2_GUIDE.md)
- [🧹 Nettoyage Django](CLEANUP_DJANGO.md)
- [📋 Backend Documentation](backend/README.md)

## 🌐 Endpoints API

- `GET /api/questions` - Liste des questions
- `GET /api/health` - État de santé de l'API
- `GET /*` - Application React

## 🏗️ Structure du projet

```
hair-gonomie/
├── frontend/
│   └── hair-egonomie/    # Application React
│       ├── src/
│       └── dist/         # Build de production
├── backend/              # Backend Node.js ✨
│   ├── server.js        # Serveur Express
│   ├── routes/          # Routes API
│   │   └── api.js
│   ├── static/          # Frontend compilé
│   └── package.json
├── deploy-nodejs.sh     # Script de déploiement
└── README.md
```

## 🚢 Options de déploiement

1. **Local** : `npm start`
2. **PM2** : `pm2 start ecosystem.config.json`
3. **Docker** : `docker-compose up -d`
4. **Cloud** :
   - Vercel (recommandé)
   - Railway
   - Render
   - Google Cloud Run

## 🔧 Configuration

Fichier `.env` dans le dossier `backend/` :
```env
PORT=8000
NODE_ENV=development
```

## 🎨 Développement Frontend

```bash
cd frontend/hair-egonomie
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run preview  # Preview du build
```

## 🧪 Tests

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend/hair-egonomie
npm test
```

## 📦 Build de production

```bash
# Build complet (frontend + copie vers backend)
./deploy-nodejs.sh
```

## 🆘 Support & Contributions

Pour toute question ou contribution, n'hésitez pas à ouvrir une issue !

---

Made with ❤️ during Nuit de l'Info
