# Déploiement avec Docker

## 🐳 Prérequis

- Docker
- Docker Compose (optionnel)

## 🚀 Démarrage rapide avec Docker Compose

```bash
# Build et démarrer
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter
docker-compose down
```

L'application sera disponible sur http://localhost:8000

## 🛠️ Build manuel Docker

### Build de l'image
```bash
docker build -t hair-gonomie:latest .
```

### Lancer le conteneur
```bash
docker run -d \
  --name hair-gonomie \
  -p 8000:8000 \
  -e NODE_ENV=production \
  -e PORT=8000 \
  -v $(pwd)/backend/logs:/app/logs \
  hair-gonomie:latest
```

### Commandes utiles

```bash
# Voir les logs
docker logs -f hair-gonomie

# Arrêter le conteneur
docker stop hair-gonomie

# Démarrer le conteneur
docker start hair-gonomie

# Supprimer le conteneur
docker rm hair-gonomie

# Entrer dans le conteneur
docker exec -it hair-gonomie sh

# Rebuild après modifications
docker build -t hair-gonomie:latest . && docker-compose up -d
```

## 🌐 Déploiement sur le Cloud

### Docker Hub
```bash
# Tag
docker tag hair-gonomie:latest votre-username/hair-gonomie:latest

# Push
docker push votre-username/hair-gonomie:latest
```

### Google Cloud Run
```bash
# Build et push
gcloud builds submit --tag gcr.io/PROJECT-ID/hair-gonomie

# Deploy
gcloud run deploy hair-gonomie \
  --image gcr.io/PROJECT-ID/hair-gonomie \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated
```

### AWS ECS / Azure Container Instances
Suivez la documentation de votre plateforme cloud préférée.

## 🔍 Healthcheck

Le conteneur inclut un healthcheck qui vérifie `/api/health` toutes les 30 secondes.

```bash
# Voir l'état de santé
docker inspect --format='{{.State.Health.Status}}' hair-gonomie
```

## 📊 Optimisations

- Multi-stage build pour réduire la taille
- Node Alpine pour une image légère
- PM2 pour la gestion de processus
- Logs persistants via volumes
- Healthcheck intégré

## 🐛 Dépannage

### Le conteneur ne démarre pas
```bash
# Voir les logs
docker logs hair-gonomie

# Vérifier la configuration
docker inspect hair-gonomie
```

### Rebuilder complètement
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```
