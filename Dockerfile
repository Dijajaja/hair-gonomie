# Multi-stage build pour optimiser la taille
FROM node:18-alpine AS frontend-builder

# Build du frontend
WORKDIR /app/frontend
COPY frontend/hair-egonomie/package*.json ./
RUN npm ci
COPY frontend/hair-egonomie/ ./
RUN npm run build

# Stage final
FROM node:18-alpine

WORKDIR /app

# Installer PM2 globalement
RUN npm install -g pm2

# Copier les fichiers du backend
COPY backend/package*.json ./
RUN npm ci --only=production

COPY backend/ ./

# Copier le frontend buildé
COPY --from=frontend-builder /app/frontend/dist ./static

# Créer le dossier logs
RUN mkdir -p logs

# Variables d'environnement
ENV NODE_ENV=production
ENV PORT=8000

# Exposer le port
EXPOSE 8000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Démarrer avec PM2
CMD ["pm2-runtime", "start", "ecosystem.config.json", "--env", "production"]
