# Fichiers Django à supprimer

Les fichiers suivants peuvent être supprimés car le backend utilise maintenant Node.js :

## Fichiers Python/Django
- `backend/manage.py`
- `backend/wsgi.py`
- `backend/requirements.txt`
- `backend/db.sqlite3`
- `backend/api/` (tout le dossier)
- `backend/core/` (tout le dossier sauf si vous voulez garder pour référence)
- `backend/templates/` (déjà remplacé par static/)

## Commande pour nettoyer
```bash
cd backend
rm -f manage.py wsgi.py requirements.txt db.sqlite3
rm -rf api/ core/ templates/
rm -rf **/__pycache__
```

## Fichiers à conserver
- `backend/static/` - Contient le frontend React compilé
- `backend/server.js` - Nouveau serveur Node.js
- `backend/routes/` - Routes API Node.js
- `backend/package.json` - Dépendances Node.js
- `backend/.env` - Configuration
- `backend/README.md` - Documentation

## ⚠️ Important
Avant de supprimer, assurez-vous que :
1. Le nouveau backend Node.js fonctionne correctement
2. Vous avez testé toutes les fonctionnalités
3. Vous avez fait une sauvegarde si nécessaire
