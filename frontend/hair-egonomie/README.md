# Hair-Gonomie - Parcours Guidé Progressif

Une application React qui propose un parcours utilisateur complètement guidé, étape par étape, sans menus classiques, barre de navigation ou listes visibles. L'utilisateur voit une seule action à la fois, et l'interface se révèle progressivement selon ses choix.

## 🎯 Concept

Cette application implémente un **parti pris ergonomique fort** :
- **Pas de menu, pas de sidebar, pas de top-bar**
- **Une seule action visible à la fois**
- **Navigation progressive** : chaque étape dévoile seulement ce qui est nécessaire
- **Minimalisme fonctionnel** : interface épurée, aucun élément décoratif inutile

## ✨ Fonctionnalités

### 1. Splash Screen
- Animation douce et minimaliste
- Transition fluide vers le parcours

### 2. Sélection de Mode
- Trois parcours disponibles : **Découvrir**, **Apprendre**, **S'exercer**
- Révélation progressive des options
- Animations staggered pour un effet de découverte

### 3. Parcours Adaptatif
- Alternance entre **questions** et **contenu** (articles, vidéos, exercices)
- Adaptation intelligente selon les réponses de l'utilisateur
- Micro-feedbacks contextuels pour guider et encourager

### 4. Contenu Progressif
- Articles, vidéos et exercices avec révélation progressive
- Détection du scroll pour afficher le bouton suivant
- Styles HTML soignés pour une lecture agréable

### 5. Page de Fin
- Suggestions personnalisées selon le mode choisi
- Statistiques de parcours
- Options pour continuer ou recommencer

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build
npm run preview
```

## 📁 Structure du Projet

```
src/
├── components/
│   ├── SplashScreen.jsx       # Écran d'accueil animé
│   ├── ModeSelector.jsx        # Sélection du mode de parcours
│   ├── QuestionCard.jsx       # Affichage des questions
│   ├── ContentCard.jsx        # Affichage du contenu (articles, vidéos, exercices)
│   ├── CompletionScreen.jsx   # Page de fin avec suggestions
│   ├── NextButton.jsx         # Bouton de navigation progressive
│   ├── MicroFeedback.jsx      # Micro-feedbacks contextuels
│   └── FloatingCards.jsx      # Éléments décoratifs animés
├── utils/
│   └── journeyManager.js      # Gestionnaire de parcours adaptatif
├── animations/
│   └── variants.js            # Variantes d'animations Framer Motion
├── App.jsx                     # Composant principal avec logique de navigation
└── main.jsx                    # Point d'entrée
```

## 🎨 Technologies Utilisées

- **React 19** - Bibliothèque UI
- **Vite** - Build tool et dev server
- **Framer Motion** - Animations fluides
- **Tailwind CSS** - Styles utilitaires
- **CSS Modules** - Styles personnalisés

## 📚 Parcours Disponibles

### Découvrir
- Introduction à l'ergonomie
- Révélation progressive
- Réduction de la charge cognitive

### Apprendre
- Différences UX/UI
- Parcours guidés
- Principe de l'action unique

### S'exercer
- Analyse de l'expérience utilisateur
- Micro-interactions
- Animation comme guide

## 🎯 Principes UX Appliqués

1. **Progressive Disclosure** - Révélation progressive de l'information
2. **Single Responsibility** - Une seule action à la fois
3. **Micro-interactions** - Feedback immédiat pour chaque action
4. **Adaptation intelligente** - Parcours qui s'adapte aux réponses

## 📖 Documentation UX

Consultez [JUSTIFICATION_UX.md](./JUSTIFICATION_UX.md) pour une explication détaillée du parti pris ergonomique, des compromis acceptés et des bénéfices mesurables.

## 🔧 Configuration

Le projet utilise :
- **Vite** pour le build et le HMR
- **ESLint** pour la qualité du code
- **Tailwind CSS** pour les styles
- **Framer Motion** pour les animations

## 📝 Notes

- L'application fonctionne sans backend (mode standalone)
- Les questions peuvent être chargées depuis un backend Django si disponible
- Le parcours s'adapte selon les réponses de l'utilisateur
- Les micro-feedbacks apparaissent contextuellement

## 🎨 Personnalisation

Pour modifier les parcours, éditez `src/utils/journeyManager.js` :
- Ajoutez de nouveaux parcours dans `JOURNEY_CONFIG`
- Ajoutez du contenu dans `CONTENT_DATA`
- Personnalisez la logique d'adaptation dans `adaptJourney()`

## 📄 Licence

Ce projet est un prototype éducatif pour démontrer les principes de design UX progressif.

---

*Créé avec ❤️ pour explorer les limites de la navigation guidée*
