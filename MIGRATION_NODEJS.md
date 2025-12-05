# Hair-gonomie - Backend Node.js

## ✅ Migration Terminée !

Le backend a été **migré avec succès de Django (Python) vers Node.js avec Express**.

## 🎯 Ce qui a été fait

### ✨ Nouveau Backend Node.js
- ✅ Serveur Express.js moderne
- ✅ API REST identique à Django
- ✅ Middleware de sécurité (Helmet, CORS)
- ✅ Logging avec Morgan
- ✅ Support des variables d'environnement
- ✅ Structure modulaire avec routes séparées

### 📁 Fichiers créés
```
backend/
├── server.js              # Serveur principal Express
├── routes/
│   └── api.js            # Routes API (remplace Django views)
├── package.json          # Dépendances Node.js
├── .env                  # Configuration
├── .env.example          # Template configuration
├── .gitignore           # Fichiers à ignorer
└── README.md            # Documentation
```

### 🌐 Endpoints API (identiques à Django)
- `GET /api/questions` - Liste des questions
- `GET /api/health` - Check santé API (nouveau)
- `GET /*` - Servir le frontend React

## 🚀 Démarrage rapide

### 1. Démarrer le serveur
```bash
cd backend
npm start
```

### 2. Mode développement (avec auto-reload)
```bash
cd backend
npm run dev
```

Le serveur démarrera sur **http://localhost:8000**

### 3. Tester l'API
```bash
# Test santé
curl http://localhost:8000/api/health

# Test questions
curl http://localhost:8000/api/questions
```

## 📦 Déploiement complet

Utilisez le script automatique :
```bash
./deploy-nodejs.sh
```

Ou suivez le guide : [README_DEPLOY_NODEJS.md](README_DEPLOY_NODEJS.md)

## 🧹 Nettoyer les anciens fichiers Django

Une fois que vous avez vérifié que tout fonctionne :
```bash
cd backend
rm -f manage.py wsgi.py requirements.txt db.sqlite3
rm -rf api/ core/ templates/ **/__pycache__
```

Voir [CLEANUP_DJANGO.md](CLEANUP_DJANGO.md) pour plus de détails.

## 🎨 Avantages de Node.js

- ⚡ **Performance** : Plus rapide pour les I/O
- 🔄 **JavaScript partout** : Frontend et Backend
- 📦 **NPM ecosystem** : Énorme bibliothèque de packages
- 🚀 **Déploiement facile** : Vercel, Railway, Render
- 💡 **Moderne** : Async/await natif, ES modules

## 🛠️ Technologies utilisées

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web minimaliste
- **Helmet** - Sécurité HTTP headers
- **CORS** - Cross-Origin Resource Sharing
- **Morgan** - HTTP request logger
- **Dotenv** - Variables d'environnement

## 📚 Documentation

- [README Backend](backend/README.md)
- [Guide de déploiement Node.js](README_DEPLOY_NODEJS.md)
- [Nettoyage Django](CLEANUP_DJANGO.md)

## 🔄 Comparaison Django vs Node.js

| Fonctionnalité | Django | Node.js |
|----------------|--------|---------|
| Langage | Python | JavaScript |
| Framework | Django REST | Express.js |
| Routes | urls.py | routes/api.js |
| Views | views.py | Routes handlers |
| Middleware | settings.py | server.js |
| Config | settings.py | .env + server.js |

## 🎯 Prochaines étapes suggérées

1. ✅ Tester toutes les fonctionnalités
2. ✅ Supprimer les fichiers Django
3. 📊 Ajouter une base de données (MongoDB, PostgreSQL)
4. 🔐 Ajouter l'authentification JWT
5. 📝 Ajouter plus d'endpoints API
6. 🚀 Déployer en production
7. 📊 Ajouter du monitoring

Bon développement ! 🎉
