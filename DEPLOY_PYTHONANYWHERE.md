# 🚀 Guide de déploiement sur PythonAnywhere

Guide complet pour déployer l'application Hair-Gonomie (React + Django) sur PythonAnywhere.

## 📋 Table des matières

1. [Prérequis](#prérequis)
2. [Étape 1 : Build local](#étape-1--build-local)
3. [Étape 2 : Préparation](#étape-2--préparation)
4. [Étape 3 : Upload sur PythonAnywhere](#étape-3--upload-sur-pythonanywhere)
5. [Étape 4 : Configuration PythonAnywhere](#étape-4--configuration-pythonanywhere)
6. [Étape 5 : Configuration Web App](#étape-5--configuration-web-app)
6. [Étape 6 : Finalisation](#étape-6--finalisation)
7. [Mises à jour](#mises-à-jour)
8. [Dépannage](#dépannage)

---

## Prérequis

- ✅ Compte PythonAnywhere (gratuit ou payant)
- ✅ Git installé localement
- ✅ Node.js installé localement (pour build React)
- ✅ Python 3.10+ installé localement (pour tests)

---

## Étape 1 : Build local

### Option A : Script automatique (recommandé)

```bash
# Windows (PowerShell)
cd frontend/hair-egonomie
npm install
npm run build

# Linux/Mac
chmod +x deploy.sh
./deploy.sh
```

### Option B : Manuellement

```bash
cd frontend/hair-egonomie
npm install
npm run build
```

**Résultat attendu** : Les fichiers sont générés dans `backend/static/` :
- `backend/static/index.html`
- `backend/static/assets/index-*.js`
- `backend/static/assets/index-*.css`

✅ **Vérification** : Vérifiez que le dossier `backend/static/` contient bien les fichiers.

---

## Étape 2 : Préparation

### 2.1 Vérifier la configuration

Le fichier `backend/core/settings.py` est déjà configuré. **IMPORTANT** : Vous devrez modifier `ALLOWED_HOSTS` sur PythonAnywhere (voir étape 6).

### 2.2 Créer un dépôt Git (recommandé)

```bash
# Initialiser Git si ce n'est pas déjà fait
git init
git add .
git commit -m "Ready for deployment"

# Créer un dépôt sur GitHub/GitLab et ajouter le remote
git remote add origin https://github.com/Dijajaja/hair-gonomie.git
git push -u origin main
```

---

## Étape 3 : Upload sur PythonAnywhere

### Option A : Via Git (recommandé)

1. **Sur PythonAnywhere**, ouvrez le **Bash console**
2. Exécutez :
```bash
cd ~
git clone https://github.com/Dijajaja/hair-gonomie.git
cd hair-gonomie
```

### Option B : Via l'interface Files

1. Allez dans l'onglet **"Files"** de PythonAnywhere
2. Créez un dossier `hair-gonomie` dans votre home
3. Upload tous les fichiers du projet
4. **Exclure** : `node_modules/`, `__pycache__/`, `.git/`

---

## Étape 4 : Configuration PythonAnywhere

### 4.1 Installer les dépendances Python

Dans le **Bash console** de PythonAnywhere :

```bash
cd ~/hair-gonomie/backend
pip3.10 install --user -r requirements.txt
```

**Note** : 
- Compte gratuit : utilisez `pip3.10`
- Compte payant : utilisez `pip3.11` ou `pip3.12` selon votre version

**Vérification** : Si des erreurs apparaissent, vérifiez que `requirements.txt` contient bien :
```
Django
djangorestframework
corsheaders
```

### 4.2 Migrations de la base de données

```bash
cd ~/hair-gonomie/backend
python3.10 manage.py migrate
```

**Résultat attendu** : Les tables sont créées dans `db.sqlite3`.

### 4.3 Collecter les fichiers statiques

```bash
python3.10 manage.py collectstatic --noinput
```

**Résultat attendu** : Les fichiers React sont copiés dans `backend/static/`.

### 4.4 Créer un superutilisateur (optionnel)

```bash
python3.10 manage.py createsuperuser
```

Suivez les instructions pour créer un compte admin.

---

## Étape 5 : Configuration Web App

### 5.1 Créer la Web App

1. Allez dans l'onglet **"Web"** de PythonAnywhere
2. Si vous n'avez pas encore d'app, cliquez sur **"Add a new web app"**
3. Choisissez **"Manual configuration"**
4. Sélectionnez **Python 3.10** (ou la version disponible)
5. Cliquez sur **"Next"**

### 5.2 Configuration du WSGI

1. Dans l'onglet **"Web"**, cliquez sur le lien **"WSGI configuration file"**
2. **Supprimez tout le contenu existant**
3. **Copiez-collez** ce code :

```python
import os
import sys

# IMPORTANT : Remplacez 'votre-username' par votre nom d'utilisateur PythonAnywhere
path = '/home/votre-username/hair-gonomie/backend'
if path not in sys.path:
    sys.path.insert(0, path)

os.environ['DJANGO_SETTINGS_MODULE'] = 'core.settings'

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

4. **Remplacez** `votre-username` par votre nom d'utilisateur PythonAnywhere
5. Cliquez sur **"Save"**

### 5.3 Configuration des fichiers statiques

Dans la section **"Static files"** de l'onglet **"Web"** :

1. Cliquez sur **"Add a new static files mapping"**
2. Remplissez :
   - **URL** : `/static/`
   - **Directory** : `/home/votre-username/hair-gonomie/backend/static/`
3. **Remplacez** `votre-username` par votre nom d'utilisateur
4. Cliquez sur **"Save"**

### 5.4 Configuration des fichiers média (optionnel)

Si vous avez des fichiers média (images uploadées) :

1. Cliquez sur **"Add a new static files mapping"**
2. Remplissez :
   - **URL** : `/media/`
   - **Directory** : `/home/votre-username/hair-gonomie/backend/media/`
3. Cliquez sur **"Save"**

---

## Étape 6 : Finalisation

### 6.1 Modifier ALLOWED_HOSTS

1. Allez dans l'onglet **"Files"** de PythonAnywhere
2. Naviguez vers `/home/votre-username/hair-gonomie/backend/core/settings.py`
3. Ouvrez le fichier
4. Trouvez la ligne : `ALLOWED_HOSTS = ['*']`
5. Remplacez par : `ALLOWED_HOSTS = ['votre-username.pythonanywhere.com']`
6. **Remplacez** `votre-username` par votre nom d'utilisateur
7. Cliquez sur **"Save"**

**Exemple** : Si votre nom d'utilisateur est `john`, la ligne devient :
```python
ALLOWED_HOSTS = ['john.pythonanywhere.com']
```

### 6.2 Redémarrer l'application

1. Allez dans l'onglet **"Web"**
2. Cliquez sur le bouton vert **"Reload"** pour redémarrer l'application
3. Attendez quelques secondes

### 6.3 Tester

Ouvrez votre navigateur et allez sur :
```
https://votre-username.pythonanywhere.com
```

**Résultat attendu** : L'application Hair-Gonomie s'affiche avec le splash screen.

---

## Mises à jour

Pour mettre à jour l'application après des modifications :

### 1. Build React (local)

```bash
cd frontend/hair-egonomie
npm run build
```

### 2. Upload sur PythonAnywhere

**Via Git** (recommandé) :
```bash
# Local
git add .
git commit -m "Update"
git push

# Sur PythonAnywhere
cd ~/hair-gonomie
git pull
cd backend
python3.10 manage.py collectstatic --noinput
```

**Via Files** :
- Upload les nouveaux fichiers
- Les fichiers React sont déjà dans `backend/static/` après le build

### 3. Redémarrer

- Allez dans l'onglet **"Web"**
- Cliquez sur **"Reload"**

---

## Dépannage

### ❌ Erreur 500

**Symptômes** : Page blanche ou erreur 500

**Solutions** :
1. Vérifiez les logs dans l'onglet **"Web"** > **"Error log"**
2. Vérifiez que `ALLOWED_HOSTS` contient votre domaine
3. Vérifiez que les migrations sont à jour :
   ```bash
   cd ~/hair-gonomie/backend
   python3.10 manage.py migrate
   ```
4. Vérifiez le fichier WSGI (chemin correct)

### ❌ Fichiers statiques non trouvés (404)

**Symptômes** : CSS/JS ne se chargent pas, page sans style

**Solutions** :
1. Vérifiez que `collectstatic` a été exécuté :
   ```bash
   python3.10 manage.py collectstatic --noinput
   ```
2. Vérifiez la configuration des fichiers statiques dans l'onglet **"Web"**
3. Vérifiez que les fichiers sont dans `backend/static/`
4. Vérifiez que l'URL est `/static/` (avec le slash final)

### ❌ Erreur d'import Python

**Symptômes** : Erreur dans les logs mentionnant un module non trouvé

**Solutions** :
1. Vérifiez que toutes les dépendances sont installées :
   ```bash
   pip3.10 install --user -r requirements.txt
   ```
2. Vérifiez le chemin dans le fichier WSGI
3. Vérifiez que vous êtes dans le bon répertoire

### ❌ L'application React ne se charge pas

**Symptômes** : Page blanche, pas de contenu React

**Solutions** :
1. Vérifiez que le build a bien créé les fichiers dans `backend/static/`
2. Vérifiez que le template `index.html` existe dans `backend/templates/`
3. Vérifiez que les URLs statiques sont correctement configurées
4. Ouvrez la console du navigateur (F12) et vérifiez les erreurs
5. Vérifiez que les chemins dans `index.html` sont corrects

### ❌ Erreur CORS

**Symptômes** : Les appels API échouent

**Solutions** :
1. Vérifiez que `corsheaders` est installé
2. Vérifiez que `CORS_ALLOW_ALL_ORIGINS = True` dans `settings.py` (pour le développement)
3. En production, restreignez avec `CORS_ALLOWED_ORIGINS`

### ❌ Base de données verrouillée

**Symptômes** : Erreur lors des migrations

**Solutions** :
1. Vérifiez que `db.sqlite3` n'est pas utilisé ailleurs
2. Supprimez `db.sqlite3-journal` si présent
3. Relancez les migrations

---

## Checklist finale

Avant de considérer le déploiement comme terminé, vérifiez :

- [ ] Build React effectué et fichiers dans `backend/static/`
- [ ] Projet uploadé sur PythonAnywhere
- [ ] Dépendances Python installées
- [ ] Migrations exécutées
- [ ] `collectstatic` exécuté
- [ ] WSGI configuré avec le bon chemin
- [ ] Fichiers statiques configurés dans l'onglet Web
- [ ] `ALLOWED_HOSTS` modifié avec votre domaine
- [ ] Application redémarrée (Reload)
- [ ] Application accessible sur `https://votre-username.pythonanywhere.com`
- [ ] L'API fonctionne (testez `/api/questions/`)

---

## Support

Pour plus d'aide :

- 📖 [Documentation PythonAnywhere](https://help.pythonanywhere.com/)
- 📖 [Documentation Django](https://docs.djangoproject.com/)
- 💬 [Forum PythonAnywhere](https://www.pythonanywhere.com/forums/)

---

## Notes importantes

⚠️ **Sécurité** :
- Changez `SECRET_KEY` en production (utilisez une variable d'environnement)
- Mettez `DEBUG = False` en production
- Restreignez `ALLOWED_HOSTS` à votre domaine uniquement

⚠️ **Performance** :
- Les comptes gratuits ont des limitations (CPU, trafic)
- Considérez un compte payant pour la production

⚠️ **Backup** :
- Sauvegardez régulièrement `db.sqlite3`
- Utilisez Git pour versionner votre code

---

**Bon déploiement ! 🚀**
