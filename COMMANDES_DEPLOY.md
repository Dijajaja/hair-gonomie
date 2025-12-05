# 🖥️ Commandes de déploiement - Hair-Gonomie

Toutes les commandes à exécuter pour déployer l'application sur PythonAnywhere.

---

## 📍 ÉTAPE 1 : Sur votre machine locale

### 1.1 Build React

```bash
cd frontend/hair-egonomie
npm install
npm run build
```

**Vérification** : Vérifiez que `backend/static/` contient les fichiers.

---

### 1.2 Préparer Git (optionnel mais recommandé)

```bash
# Retourner à la racine du projet
cd ../../

# Initialiser Git si ce n'est pas déjà fait
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Ready for deployment"

# Créer un dépôt sur GitHub/GitLab, puis :
git remote add origin https://github.com/votre-username/hair-gonomie.git
git branch -M main
git push -u origin main
```

---

## ⚠️ IMPORTANT : Différence Windows vs PythonAnywhere

**Sur Windows (votre machine locale)** :
- Utilisez `python` et `pip` (sans numéro de version)
- Ces commandes sont juste pour tester localement

**Sur PythonAnywhere (serveur Linux)** :
- Utilisez `python3.10` et `pip3.10`
- Ces commandes sont pour le déploiement réel

---

## 📍 ÉTAPE 2 : Sur PythonAnywhere (Bash Console)


### 2.1 Cloner/Télécharger le projet

**Option A : Via Git**
```bash
cd ~
git clone https://github.com/votre-username/hair-gonomie.git
cd hair-gonomie
```

**Option B : Via Files (si pas de Git)**
- Allez dans l'onglet "Files"
- Créez un dossier `hair-gonomie`
- Upload tous les fichiers manuellement

---

### 2.2 Installer les dépendances Python

```bash
cd ~/hair-gonomie/backend
pip3.10 install --user -r requirements.txt
```

**Note** : Si erreur, essayez `pip3.11` ou `pip3.12` selon votre version Python.

---

### 2.3 Configurer la base de données

```bash
cd ~/hair-gonomie/backend
python3.10 manage.py migrate
```

---

### 2.4 Collecter les fichiers statiques

```bash
python3.10 manage.py collectstatic --noinput
```

---

### 2.5 Créer un superutilisateur (optionnel)

```bash
python3.10 manage.py createsuperuser
```

Suivez les instructions pour créer un compte admin.

---

## 📍 ÉTAPE 3 : Configuration dans l'interface PythonAnywhere

### 3.1 Créer la Web App

1. Allez dans l'onglet **"Web"**
2. Cliquez sur **"Add a new web app"**
3. Choisissez **"Manual configuration"**
4. Sélectionnez **Python 3.10**
5. Cliquez sur **"Next"**

---

### 3.2 Configurer le WSGI

1. Dans l'onglet **"Web"**, cliquez sur **"WSGI configuration file"**
2. **Supprimez tout le contenu**
3. **Copiez-collez** ce code (remplacez `votre-username` par votre nom d'utilisateur) :

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

4. Cliquez sur **"Save"**

---

### 3.3 Configurer les fichiers statiques

1. Dans l'onglet **"Web"**, section **"Static files"**
2. Cliquez sur **"Add a new static files mapping"**
3. Remplissez :
   - **URL** : `/static/`
   - **Directory** : `/home/votre-username/hair-gonomie/backend/static/`
4. **Remplacez `votre-username`** par votre nom d'utilisateur
5. Cliquez sur **"Save"**

---

### 3.4 Modifier ALLOWED_HOSTS

1. Allez dans l'onglet **"Files"**
2. Naviguez vers `/home/votre-username/hair-gonomie/backend/core/settings.py`
3. Ouvrez le fichier
4. Trouvez la ligne : `ALLOWED_HOSTS = ['*']`
5. Remplacez par : `ALLOWED_HOSTS = ['votre-username.pythonanywhere.com']`
6. **Remplacez `votre-username`** par votre nom d'utilisateur
7. Cliquez sur **"Save"**

---

### 3.5 Redémarrer l'application

1. Allez dans l'onglet **"Web"**
2. Cliquez sur le bouton vert **"Reload"**
3. Attendez quelques secondes

---

## 📍 ÉTAPE 4 : Tester

Ouvrez votre navigateur et allez sur :
```
https://votre-username.pythonanywhere.com
```

**Remplacez `votre-username` par votre nom d'utilisateur PythonAnywhere.**

---

## 🔄 Mises à jour futures

### Sur votre machine locale

```bash
# 1. Build React
cd frontend/hair-egonomie
npm run build

# 2. Commit et push
cd ../../
git add .
git commit -m "Update"
git push
```

### Sur PythonAnywhere

```bash
# 1. Pull les modifications
cd ~/hair-gonomie
git pull

# 2. Collecter les nouveaux fichiers statiques
cd backend
python3.10 manage.py collectstatic --noinput
```

### Redémarrer

- Allez dans l'onglet **"Web"**
- Cliquez sur **"Reload"**

---

## 🐛 Commandes de dépannage

### Vérifier les logs d'erreur
```bash
# Dans l'onglet "Web" > "Error log"
# Ou via Bash :
tail -n 50 ~/hair-gonomie/backend/*.log
```

### Réinstaller les dépendances
```bash
cd ~/hair-gonomie/backend
pip3.10 install --user --force-reinstall -r requirements.txt
```

### Vérifier la structure
```bash
cd ~/hair-gonomie
ls -la backend/static/
ls -la backend/templates/
```

### Tester Django localement (sur PythonAnywhere)
```bash
cd ~/hair-gonomie/backend
python3.10 manage.py check
python3.10 manage.py runserver 127.0.0.1:8000
```

### Vérifier les migrations
```bash
cd ~/hair-gonomie/backend
python3.10 manage.py showmigrations
python3.10 manage.py migrate --plan
```

---

## 📝 Résumé rapide (copier-coller)

### Sur votre machine (une seule fois)
```bash
cd frontend/hair-egonomie
npm install
npm run build
cd ../../
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/votre-username/hair-gonomie.git
git push -u origin main
```

### Sur PythonAnywhere (une seule fois)
```bash
cd ~
git clone https://github.com/votre-username/hair-gonomie.git
cd hair-gonomie/backend
pip3.10 install --user -r requirements.txt
python3.10 manage.py migrate
python3.10 manage.py collectstatic --noinput
```

Puis configurez dans l'interface Web (voir section 3 ci-dessus).

---

## ⚠️ Points d'attention

1. **Remplacez `votre-username`** partout par votre vrai nom d'utilisateur PythonAnywhere
2. **Vérifiez les chemins** dans le WSGI et la config des fichiers statiques
3. **N'oubliez pas** de modifier `ALLOWED_HOSTS` dans `settings.py`
4. **Redémarrez** toujours l'application après les modifications (bouton Reload)

---

**Temps estimé : 15-20 minutes** ⏱️

