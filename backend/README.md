# Hair-gonomie Backend (Node.js)

Backend API Node.js pour l'application Hair-gonomie.

## 🚀 Installation

```bash
npm install
```

## 🔧 Configuration

Copiez le fichier `.env.example` vers `.env` et configurez les variables d'environnement :

```bash
cp .env.example .env
```

## 📦 Démarrage

### Mode développement (avec rechargement automatique)
```bash
npm run dev
```

### Mode production
```bash
npm start
```

Le serveur démarrera sur `http://localhost:8000` par défaut.

## 📚 API Endpoints

### GET /api/questions
Récupère la liste des questions pour le questionnaire.

**Response:**
```json
{
  "questions": [
    "Quel est ton niveau ?",
    "Combien de temps par jour ?",
    "Préférence : article, texte ou exercice ?"
  ]
}
```

### GET /api/health
Vérifie l'état de santé de l'API.

**Response:**
```json
{
  "status": "OK",
  "message": "API is running",
  "timestamp": "2025-12-05T10:00:00.000Z"
}
```

## 🏗️ Structure du projet

```
backend/
├── server.js           # Point d'entrée principal
├── routes/             # Routes de l'API
│   └── api.js         # Routes API
├── package.json        # Dépendances et scripts
├── .env               # Variables d'environnement
└── static/            # Fichiers statiques du frontend
```

## 🔒 Sécurité

Le backend utilise :
- **Helmet** pour sécuriser les headers HTTP
- **CORS** pour gérer les requêtes cross-origin
- **Morgan** pour le logging des requêtes

## 📝 Technologies

- Node.js
- Express.js
- ES Modules (import/export)
