# ✅ Checklist de déploiement - Hair-Gonomie

Utilisez cette checklist pour vous assurer que toutes les étapes sont complétées.

## 📍 Sur votre machine locale

### Préparation
- [ ] Node.js installé
- [ ] Git installé et configuré
- [ ] Compte PythonAnywhere créé

### Build
- [ ] `cd frontend/hair-egonomie`
- [ ] `npm install` exécuté sans erreur
- [ ] `npm run build` exécuté avec succès
- [ ] Vérification : `backend/static/` contient `index.html` et `assets/`

### Git (optionnel mais recommandé)
- [ ] `git init` (si pas déjà fait)
- [ ] `.gitignore` vérifié
- [ ] `git add .` et `git commit`
- [ ] Dépôt distant créé (GitHub/GitLab)
- [ ] `git push` effectué

---

## 📍 Sur PythonAnywhere

### Upload
- [ ] Projet cloné/téléchargé dans `~/hair-gonomie/`
- [ ] Structure des dossiers vérifiée

### Installation
- [ ] `cd ~/hair-gonomie/backend`
- [ ] `pip3.10 install --user -r requirements.txt` exécuté sans erreur
- [ ] `python3.10 manage.py migrate` exécuté
- [ ] `python3.10 manage.py collectstatic --noinput` exécuté

### Configuration Web App
- [ ] Web App créée (Manual configuration, Python 3.10)
- [ ] **WSGI configuré** :
  - [ ] Chemin correct (`/home/votre-username/hair-gonomie/backend`)
  - [ ] `DJANGO_SETTINGS_MODULE = 'core.settings'`
- [ ] **Static files configuré** :
  - [ ] URL: `/static/`
  - [ ] Directory: `/home/votre-username/hair-gonomie/backend/static/`
- [ ] **ALLOWED_HOSTS modifié** :
  - [ ] Fichier `settings.py` ouvert
  - [ ] `ALLOWED_HOSTS = ['votre-username.pythonanywhere.com']`
  - [ ] Nom d'utilisateur remplacé

### Finalisation
- [ ] Bouton "Reload" cliqué dans l'onglet Web
- [ ] Attente de quelques secondes
- [ ] Test : `https://votre-username.pythonanywhere.com` accessible
- [ ] Test : L'application React s'affiche correctement
- [ ] Test : L'API fonctionne (`/api/questions/`)

---

## 🔍 Vérifications finales

### Interface
- [ ] Splash screen s'affiche
- [ ] Navigation fonctionne
- [ ] Animations fonctionnent
- [ ] Styles CSS chargés

### API
- [ ] `/api/questions/` retourne des données
- [ ] Pas d'erreurs CORS dans la console

### Console navigateur
- [ ] Pas d'erreurs 404 (fichiers statiques)
- [ ] Pas d'erreurs JavaScript
- [ ] Pas d'erreurs réseau

### Logs PythonAnywhere
- [ ] Pas d'erreurs dans l'onglet "Web" > "Error log"
- [ ] Pas d'erreurs dans "Server log"

---

## 🎯 Résultat attendu

✅ Application accessible sur `https://votre-username.pythonanywhere.com`
✅ Interface React fonctionnelle
✅ API Django accessible
✅ Fichiers statiques chargés correctement

---

## 📝 Notes

- **Temps estimé** : 15-20 minutes
- **Difficulté** : Moyenne
- **Support** : Consultez `DEPLOY_PYTHONANYWHERE.md` en cas de problème

---

**Une fois toutes les cases cochées, votre application est déployée ! 🎉**

