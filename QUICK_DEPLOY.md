# ⚡ Déploiement rapide sur PythonAnywhere

Guide condensé pour déployer rapidement l'application.

## ✅ Étape 1 : Build local (FAIT)

Le build React a été effectué. Les fichiers sont dans `backend/static/`.

---

## 📋 Checklist de déploiement

### Sur votre machine (déjà fait ✅)
- [x] Build React effectué
- [x] Configuration Django mise à jour
- [x] Fichiers statiques générés dans `backend/static/`

### Sur PythonAnywhere

#### 1️⃣ Upload du projet

**Option A : Via Git (recommandé)**
```bash
# Sur votre machine
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/votre-username/hair-gonomie.git
git push -u origin main

# Sur PythonAnywhere (Bash console)
cd ~
git clone https://github.com/votre-username/hair-gonomie.git
```

**Option B : Via Files**
- Allez dans l'onglet "Files" de PythonAnywhere
- Créez un dossier `hair-gonomie`
- Upload tous les fichiers (sauf `node_modules/`, `__pycache__/`)

---

#### 2️⃣ Installation des dépendances

Dans le **Bash console** de PythonAnywhere :
```bash
cd ~/hair-gonomie/backend
pip3.10 install --user -r requirements.txt
```

---

#### 3️⃣ Configuration de la base de données

```bash
cd ~/hair-gonomie/backend
python3.10 manage.py migrate
python3.10 manage.py collectstatic --noinput
```

---

#### 4️⃣ Configuration Web App

**Dans l'onglet "Web" de PythonAnywhere :**

1. **Source code** : `/home/votre-username/hair-gonomie/backend`
2. **Working directory** : `/home/votre-username/hair-gonomie/backend`

3. **WSGI configuration file** - Cliquez sur le lien et remplacez tout par :
```python
import os
import sys

path = '/home/votre-username/hair-gonomie/backend'
if path not in sys.path:
    sys.path.insert(0, path)

os.environ['DJANGO_SETTINGS_MODULE'] = 'core.settings'

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```
⚠️ **Remplacez `votre-username` par votre nom d'utilisateur PythonAnywhere**

4. **Static files** - Ajoutez :
   - URL: `/static/`
   - Directory: `/home/votre-username/hair-gonomie/backend/static/`
   ⚠️ **Remplacez `votre-username` par votre nom d'utilisateur**

5. **Modifier ALLOWED_HOSTS** :
   - Onglet "Files" → `/home/votre-username/hair-gonomie/backend/core/settings.py`
   - Changez `ALLOWED_HOSTS = ['*']` en `ALLOWED_HOSTS = ['votre-username.pythonanywhere.com']`
   ⚠️ **Remplacez `votre-username` par votre nom d'utilisateur**

6. **Redémarrer** : Cliquez sur le bouton vert **"Reload"**

---

## 🎉 C'est prêt !

Votre application devrait être accessible sur :
```
https://votre-username.pythonanywhere.com
```

---

## 🔄 Mises à jour futures

```bash
# 1. Build local
cd frontend/hair-egonomie
npm run build

# 2. Push sur Git
git add .
git commit -m "Update"
git push

# 3. Sur PythonAnywhere
cd ~/hair-gonomie
git pull
cd backend
python3.10 manage.py collectstatic --noinput

# 4. Reload dans l'onglet Web
```

---

## 🆘 Problèmes courants

| Problème | Solution |
|---------|----------|
| Erreur 500 | Vérifiez les logs Web, `ALLOWED_HOSTS`, migrations |
| Fichiers statiques 404 | Exécutez `collectstatic`, vérifiez la config Web |
| Import error | Réinstallez les dépendances : `pip3.10 install --user -r requirements.txt` |
| Page blanche | Vérifiez que les fichiers sont dans `backend/static/` |

---

## 📖 Documentation complète

Voir `DEPLOY_PYTHONANYWHERE.md` pour plus de détails et le dépannage avancé.

---

**Temps estimé : 15-20 minutes** ⏱️
