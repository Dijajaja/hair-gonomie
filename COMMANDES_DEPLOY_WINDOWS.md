
# 🖥️ Commandes de déploiement - Windows (Machine locale)

**IMPORTANT** : Ces commandes sont pour votre machine Windows locale. Les commandes PythonAnywhere sont différentes (voir `COMMANDES_DEPLOY.md`).

---

## 📍 Sur votre machine Windows

### 1. Build React

```powershell
cd frontend/hair-egonomie
npm install
npm run build
```

**Vérification** : Vérifiez que `backend/static/` contient les fichiers.

---

### 2. Tester Django localement (optionnel)

```powershell
# Retourner à la racine
cd ..\..

# Aller dans backend
cd backend

# Installer les dépendances (si pas déjà fait)
pip install -r requirements.txt

# Migrations (optionnel, juste pour tester)
python manage.py migrate

# Lancer le serveur de développement
python manage.py runserver
```

Ouvrez `http://127.0.0.1:8000` dans votre navigateur pour tester.

---

### 3. Préparer Git (optionnel mais recommandé)

```powershell
# Retourner à la racine du projet
cd ..

# Initialiser Git si ce n'est pas déjà fait
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Ready for deployment"

# Créer un dépôt sur GitHub/GitLab, puis :
git remote add origin https://github.com/Dijajaja/hair-gonomie.git
git branch -M main
git push -u origin main
```

---

## 📍 Sur PythonAnywhere (Bash Console)

**Ces commandes sont pour PythonAnywhere, pas pour Windows !**

### 1. Cloner le projet

```bash
cd ~
git clone https://github.com/Dijajaja/hair-gonomie.git
cd hair-gonomie/backend
```

### 2. Installer les dépendances

```bash
pip3.10 install --user -r requirements.txt
```

**Note** : Sur PythonAnywhere, utilisez `pip3.10` (ou `pip3.11` selon votre version).

### 3. Migrations

```bash
python3.10 manage.py migrate
```

### 4. Collecter les fichiers statiques

```bash
python3.10 manage.py collectstatic --noinput
```

---

## ⚠️ Différences Windows vs PythonAnywhere

| Action | Windows (local) | PythonAnywhere (Linux) |
|--------|----------------|------------------------|
| Python | `python` | `python3.10` |
| Pip | `pip` | `pip3.10` |
| Chemin | `C:\Users\PC\...` | `/home/username/...` |
| Shell | PowerShell | Bash |

---

## 📝 Résumé : Ce que vous devez faire

### ✅ Sur Windows (maintenant) :

1. **Build React** (déjà fait normalement)
2. **Tester localement** (optionnel)
3. **Push sur Git** (si vous utilisez Git)

### ✅ Sur PythonAnywhere (plus tard) :

1. Cloner le projet
2. Installer avec `pip3.10`
3. Migrations avec `python3.10`
4. Configurer la Web App

---

## 🔍 Vérifier Python sur Windows

```powershell
# Vérifier la version Python
python --version

# Vérifier pip
pip --version

# Si Python n'est pas installé, installez-le depuis python.org
```

---

**Rappel** : Les commandes avec `python3.10` et `pip3.10` sont **uniquement pour PythonAnywhere**, pas pour Windows !

