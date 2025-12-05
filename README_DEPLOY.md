# 📦 Guide de déploiement - Hair-Gonomie

Ce projet contient une application React (frontend) et Django (backend) qui doit être déployée sur PythonAnywhere.

## 📁 Structure du projet

```
hair-gonomie/
├── frontend/
│   └── hair-egonomie/     # Application React
│       ├── src/
│       ├── package.json
│       └── vite.config.js
├── backend/                # Application Django
│   ├── api/
│   ├── core/
│   ├── static/             # Fichiers React buildés (générés)
│   ├── templates/         # Template HTML pour React
│   └── manage.py
├── DEPLOY_PYTHONANYWHERE.md  # Guide complet
├── QUICK_DEPLOY.md           # Guide rapide
└── deploy.sh                 # Script de déploiement
```

## 🚀 Démarrage rapide

### 1. Build React
```bash
cd frontend/hair-egonomie
npm install
npm run build
```

### 2. Suivre le guide
- **Débutant** : Lisez `QUICK_DEPLOY.md`
- **Détaillé** : Lisez `DEPLOY_PYTHONANYWHERE.md`

## 📚 Documentation

- **`QUICK_DEPLOY.md`** : Guide rapide (15-20 min)
- **`DEPLOY_PYTHONANYWHERE.md`** : Guide complet avec dépannage

## ⚙️ Configuration

### Variables importantes

- **ALLOWED_HOSTS** : Doit contenir votre domaine PythonAnywhere
- **STATIC_ROOT** : `backend/static/` (fichiers React buildés)
- **TEMPLATES** : `backend/templates/index.html` (template Django)

### Build React

Le build React génère les fichiers dans `backend/static/` grâce à la configuration dans `vite.config.js` :

```javascript
build: {
  outDir: '../../backend/static',
  base: '/static/',
}
```

## 🔧 Commandes utiles

### Local
```bash
# Build React
cd frontend/hair-egonomie && npm run build

# Test Django
cd backend && python manage.py runserver
```

### PythonAnywhere
```bash
# Migrations
python3.10 manage.py migrate

# Collect static
python3.10 manage.py collectstatic --noinput

# Install dependencies
pip3.10 install --user -r requirements.txt
```

## 🐛 Dépannage

Consultez la section "Dépannage" dans `DEPLOY_PYTHONANYWHERE.md` pour :
- Erreur 500
- Fichiers statiques non trouvés
- Erreurs d'import
- Problèmes CORS

## 📝 Notes

- Le build React doit être fait **avant** l'upload sur PythonAnywhere
- Les fichiers statiques sont dans `backend/static/` après le build
- `ALLOWED_HOSTS` doit être modifié sur PythonAnywhere avec votre domaine
- Utilisez Git pour faciliter les mises à jour

## 🔗 Liens utiles

- [PythonAnywhere Help](https://help.pythonanywhere.com/)
- [Django Documentation](https://docs.djangoproject.com/)
- [Vite Documentation](https://vitejs.dev/)

---

**Besoin d'aide ?** Consultez `DEPLOY_PYTHONANYWHERE.md` pour le guide complet.

