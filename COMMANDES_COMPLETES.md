# 🖥️ Toutes les commandes - Déploiement complet

Guide avec **toutes les commandes** à exécuter, étape par étape.

---

## 📍 ÉTAPE 1 : Sur votre machine Windows (LOCAL)

### 1.1 Build React

```powershell
# Aller à la racine du projet
cd C:\Users\PC\hair-gonomie

# Aller dans frontend
cd frontend\hair-egonomie

# Installer les dépendances (si pas déjà fait)
npm install

# Build React
npm run build
```

**Vérification** :
```powershell
# Vérifier que les fichiers sont créés
cd ..\..\backend\static
dir
```

Vous devriez voir : `index.html`, `assets/`, `vite.svg`

---

### 1.2 Préparer Git (optionnel mais recommandé)

```powershell
# Retourner à la racine
cd C:\Users\PC\hair-gonomie

# Initialiser Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Créer le commit
git commit -m "Ready for deployment"

# Créer un dépôt sur GitHub/GitLab, puis :
git remote add origin https://github.com/Dijajaja/hair-gonomie.git
git branch -M main
git push -u origin main
```

---

## 📍 ÉTAPE 2 : Sur PythonAnywhere (Bash Console)

### 2.1 Se connecter à PythonAnywhere

1. Allez sur https://www.pythonanywhere.com
2. Connectez-vous
3. Ouvrez l'onglet **"Bash"** (console)

---

### 2.2 Cloner le projet

```bash
# Aller dans le home
cd ~

# Cloner le projet (remplacez l'URL par votre dépôt Git)
git clone https://github.com/Dijajaja/hair-gonomie.git

# Vérifier que c'est bien cloné
ls -la hair-gonomie
```

**Si vous n'utilisez pas Git**, utilisez l'onglet "Files" pour uploader manuellement.

---

### 2.3 Aller dans le dossier backend

```bash
cd ~/hair-gonomie/backend
pwd
```

Vous devriez voir : `/home/votre-username/hair-gonomie/backend`

---

### 2.4 Installer les dépendances Python

```bash
# Installer les dépendances
pip3.10 install --user -r requirements.txt

# Si erreur, essayez :
# pip3.11 install --user -r requirements.txt
# ou
# pip3.12 install --user -r requirements.txt
```

**Vérification** :
```bash
# Vérifier que Django est installé
python3.10 -c "import django; print(django.get_version())"
```

---

### 2.5 Migrations de la base de données

```bash
# Exécuter les migrations
python3.10 manage.py migrate

# Vérifier que la base de données est créée
ls -la db.sqlite3
```

---

### 2.6 Collecter les fichiers statiques

```bash
# Collecter les fichiers statiques
python3.10 manage.py collectstatic --noinput

# Vérifier que les fichiers sont là
ls -la static/
ls -la static/assets/
```

---

### 2.7 Créer un superutilisateur (optionnel)

```bash
python3.10 manage.py createsuperuser
```

Suivez les instructions pour créer un compte admin.

---

## 📍 ÉTAPE 3 : Configuration Web App (via interface + commandes)

### 3.1 Créer la Web App (via interface)

1. Allez dans l'onglet **"Web"**
2. Cliquez sur **"Add a new web app"**
3. Choisissez **"Manual configuration"**
4. Sélectionnez **Python 3.10**
5. Cliquez sur **"Next"**

---

### 3.2 Configurer le WSGI (via interface)

1. Dans l'onglet **"Web"**, cliquez sur **"WSGI configuration file"**
2. **Supprimez tout le contenu**
3. **Copiez-collez** ce code :

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

4. **Remplacez `votre-username`** par votre nom d'utilisateur PythonAnywhere
5. Cliquez sur **"Save"**

**Alternative : Via commandes** (si vous préférez) :
```bash
# Trouver votre nom d'utilisateur
whoami

# Créer le fichier WSGI (remplacez votre-username)
cat > /var/www/votre-username_pythonanywhere_com_wsgi.py << 'EOF'
import os
import sys

path = '/home/votre-username/hair-gonomie/backend'
if path not in sys.path:
    sys.path.insert(0, path)

os.environ['DJANGO_SETTINGS_MODULE'] = 'core.settings'

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
EOF
```

---

### 3.3 Configurer les fichiers statiques (via interface)

1. Dans l'onglet **"Web"**, section **"Static files"**
2. Cliquez sur **"Add a new static files mapping"**
3. Remplissez :
   - **URL** : `/static/`
   - **Directory** : `/home/votre-username/hair-gonomie/backend/static/`
4. Cliquez sur **"Save"**

---

### 3.4 Modifier ALLOWED_HOSTS (via commandes)

```bash
# Aller dans le dossier backend
cd ~/hair-gonomie/backend

# Trouver votre nom d'utilisateur
USERNAME=$(whoami)
echo "Votre nom d'utilisateur : $USERNAME"

# Modifier ALLOWED_HOSTS dans settings.py
sed -i "s/ALLOWED_HOSTS = \['\*'\]/ALLOWED_HOSTS = ['${USERNAME}.pythonanywhere.com']/" core/settings.py

# Vérifier la modification
grep "ALLOWED_HOSTS" core/settings.py
```

**Ou manuellement** :
```bash
# Ouvrir le fichier avec nano
nano core/settings.py

# Trouver la ligne : ALLOWED_HOSTS = ['*']
# Remplacer par : ALLOWED_HOSTS = ['votre-username.pythonanywhere.com']
# Sauvegarder : Ctrl+O, Enter, Ctrl+X
```

---

### 3.5 Redémarrer l'application (via interface)

1. Allez dans l'onglet **"Web"**
2. Cliquez sur le bouton vert **"Reload"**
3. Attendez quelques secondes

**Via commandes** (alternative) :
```bash
# Toucher le fichier WSGI pour forcer le rechargement
touch /var/www/votre-username_pythonanywhere_com_wsgi.py
```

---

## 📍 ÉTAPE 4 : Vérification et test

### 4.1 Vérifier les fichiers

```bash
# Vérifier la structure
cd ~/hair-gonomie
tree -L 3

# Vérifier les fichiers statiques
ls -la backend/static/
ls -la backend/static/assets/

# Vérifier le template
ls -la backend/templates/
```

---

### 4.2 Tester l'application

Ouvrez votre navigateur et allez sur :
```
https://votre-username.pythonanywhere.com
```

**Remplacez `votre-username` par votre nom d'utilisateur PythonAnywhere.**

---

### 4.3 Vérifier les logs (si problème)

```bash
# Logs d'erreur
tail -n 50 ~/logs/votre-username.pythonanywhere.com.error.log

# Logs serveur
tail -n 50 ~/logs/votre-username.pythonanywhere.com.server.log
```

---

## 🔄 Mises à jour futures

### Sur votre machine Windows

```powershell
# 1. Build React
cd C:\Users\PC\hair-gonomie\frontend\hair-egonomie
npm run build

# 2. Commit et push
cd ..\..
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

# 3. Redémarrer (via interface Web > Reload)
# Ou toucher le WSGI :
touch /var/www/votre-username_pythonanywhere_com_wsgi.py
```

---

## 🐛 Commandes de dépannage

### Réinstaller les dépendances

```bash
cd ~/hair-gonomie/backend
pip3.10 install --user --force-reinstall -r requirements.txt
```

### Vérifier Python et Django

```bash
# Version Python
python3.10 --version

# Version Django
python3.10 -c "import django; print(django.get_version())"

# Vérifier les imports
python3.10 -c "import sys; sys.path.insert(0, '/home/votre-username/hair-gonomie/backend'); import django; django.setup()"
```

### Vérifier les migrations

```bash
cd ~/hair-gonomie/backend
python3.10 manage.py showmigrations
python3.10 manage.py migrate --plan
```

### Vérifier les fichiers statiques

```bash
cd ~/hair-gonomie/backend
python3.10 manage.py findstatic assets/index.js
ls -la static/assets/
```

### Tester Django localement (sur PythonAnywhere)

```bash
cd ~/hair-gonomie/backend
python3.10 manage.py check
python3.10 manage.py runserver 127.0.0.1:8000
```

---

## 📝 Script complet (copier-coller)

### Sur Windows (une seule fois)

```powershell
cd C:\Users\PC\hair-gonomie\frontend\hair-egonomie
npm install
npm run build
cd ..\..
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/Dijajaja/hair-gonomie.git
git push -u origin main
```

### Sur PythonAnywhere (une seule fois)

```bash
cd ~
git clone https://github.com/Dijajaja/hair-gonomie.git
cd hair-gonomie/backend
pip3.10 install --user -r requirements.txt
python3.10 manage.py migrate
python3.10 manage.py collectstatic --noinput
USERNAME=$(whoami)
sed -i "s/ALLOWED_HOSTS = \['\*'\]/ALLOWED_HOSTS = ['${USERNAME}.pythonanywhere.com']/" core/settings.py
```

Puis configurez la Web App dans l'interface (section 3.1, 3.2, 3.3) et cliquez sur "Reload".

---

## ✅ Checklist finale

- [ ] Build React effectué
- [ ] Projet uploadé sur PythonAnywhere
- [ ] Dépendances installées
- [ ] Migrations exécutées
- [ ] Fichiers statiques collectés
- [ ] WSGI configuré
- [ ] Fichiers statiques configurés dans l'interface
- [ ] ALLOWED_HOSTS modifié
- [ ] Application redémarrée (Reload)
- [ ] Application accessible sur votre domaine

---

**Temps estimé : 15-20 minutes** ⏱️

