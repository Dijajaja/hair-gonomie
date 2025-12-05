# Démarrage avec PM2 (Production)

PM2 est un gestionnaire de processus pour Node.js qui permet de gérer votre application en production.

## Installation de PM2

```bash
npm install -g pm2
```

## Démarrage de l'application

### Mode production
```bash
cd /home/oumar/Bureau/hair-gonomie/backend
pm2 start ecosystem.config.json
```

### Mode développement
```bash
pm2 start ecosystem.config.json --env development
```

## Commandes utiles PM2

```bash
# Voir les processus en cours
pm2 list

# Voir les logs
pm2 logs hair-gonomie

# Redémarrer l'application
pm2 restart hair-gonomie

# Arrêter l'application
pm2 stop hair-gonomie

# Supprimer du PM2
pm2 delete hair-gonomie

# Monitoring
pm2 monit

# Sauvegarder la config
pm2 save

# Auto-démarrage au boot
pm2 startup
```

## Mise à jour de l'application

```bash
# 1. Pull les dernières modifications
git pull

# 2. Rebuild le frontend si nécessaire
cd frontend/hair-egonomie
npm install
npm run build
cd ../..
cp -r frontend/hair-egonomie/dist/* backend/static/

# 3. Update backend
cd backend
npm install

# 4. Redémarrer avec PM2
pm2 restart hair-gonomie
```

## Logs

Les logs sont dans `backend/logs/` :
- `err.log` - Erreurs
- `out.log` - Sortie standard

```bash
# Voir les logs en temps réel
pm2 logs hair-gonomie

# Vider les logs
pm2 flush
```

## Configuration cluster

Par défaut, PM2 lance 2 instances en mode cluster pour optimiser les performances.
Vous pouvez ajuster dans `ecosystem.config.json` :

```json
"instances": 2,  // Nombre d'instances ou "max" pour tous les CPU
"exec_mode": "cluster"
```
