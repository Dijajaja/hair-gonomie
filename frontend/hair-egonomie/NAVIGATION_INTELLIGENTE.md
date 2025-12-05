# Navigation Intelligente - Documentation

## 🧠 Système de Navigation Adaptative

Le système de navigation intelligente s'adapte automatiquement à l'état mental et aux besoins de l'utilisateur.

## ✨ Fonctionnalités

### 1. **Analyse de l'État Mental**
- **Exploratory** : Mode exploration par défaut
- **Hesitant** : Utilisateur hésitant (temps de survol long, pas d'interaction)
- **Focused** : Utilisateur concentré (plusieurs interactions rapides)
- **Confident** : Utilisateur confiant (clics rapides, navigation fluide)

### 2. **Algorithme Intelligent de Tri**
L'algorithme calcule un score de pertinence pour chaque option basé sur :
- Préférences utilisateur (clics précédents)
- Temps de survol (curiosité)
- État mental actuel
- Temps passé sur la page
- Patterns de navigation (séquences logiques)
- Niveau d'hésitation

### 3. **Recommandations Instantanées**
- Suggestions contextuelles basées sur l'état de l'utilisateur
- Raisons explicites pour chaque recommandation
- Badges visuels "Recommandé"

### 4. **Révélation Progressive**
- Les options apparaissent progressivement selon l'état mental
- Hésitants : révélation lente (3s par option)
- Confiants : révélation rapide (1.5s par option)

## 📦 Composants Créés

### 1. `useUserState` Hook
Hook React qui track :
- Temps passé sur la page
- Interactions (clics, survols)
- Patterns de navigation
- État mental calculé

### 2. `navigationAlgorithm.js`
Algorithme qui :
- Calcule les scores de pertinence
- Génère des recommandations
- Détermine l'ordre d'affichage

### 3. `IntelligentNavigation` Component
Composant React qui :
- Affiche les options dans l'ordre intelligent
- Montre les recommandations
- S'adapte en temps réel

## 🚀 Utilisation

### Remplacement simple de ModeSelector

```jsx
import IntelligentNavigation from './components/IntelligentNavigation';

// Dans App.jsx
{step === "mode" && (
  <IntelligentNavigation 
    onSelect={handleModeSelect} 
  />
)}
```

### Avec gestion des recommandations

```jsx
const handleRecommendationClick = (item) => {
  console.log(`Recommandation: ${item.label}`);
  console.log(`Raison: ${item.recommendationReason}`);
  handleModeSelect(item.label);
};

<IntelligentNavigation 
  onSelect={handleModeSelect}
  onRecommendationClick={handleRecommendationClick}
/>
```

## 🎯 Exemple d'Adaptation

### Utilisateur Hésitant
- Longs temps de survol (> 2s)
- Pas d'interaction après 10s
- **Résultat** : Options simples en premier, recommandations rassurantes

### Utilisateur Confiant
- Clics rapides (< 1s entre actions)
- Navigation fluide
- **Résultat** : Options avancées en premier, révélation rapide

### Utilisateur Explorateur
- Interactions variées
- Temps moyen
- **Résultat** : Ordre équilibré, toutes options visibles

## 🔧 Personnalisation

### Ajouter des Options

Dans `IntelligentNavigation.jsx` :

```jsx
const [availableItems] = useState([
  {
    id: 'nouvelle-option',
    label: 'Nouvelle Option',
    icon: '⭐',
    description: 'Description',
    color: '#ec4899',
    type: 'custom',
    complexity: 'medium',
    recommended: false,
  },
  // ...
]);
```

### Modifier l'Algorithme

Dans `navigationAlgorithm.js`, ajustez les scores :

```jsx
// Augmenter le poids des préférences
score += preferenceScore * 15; // Au lieu de 10

// Modifier les seuils de recommandation
const recommendations = sorted
  .filter((item) => item.relevanceScore >= 20) // Au lieu de 15
  .slice(0, 3); // Au lieu de 2
```

## 🎨 Style

Le composant utilise le même style rose élégant que le reste de l'application :
- Couleurs : Rose (#ec4899) sur fond noir
- Animations : Framer Motion pour transitions fluides
- Glassmorphism : Effets de flou et transparence

## 📊 Debug Mode

En mode développement, un indicateur en bas à gauche affiche :
- État mental actuel
- Temps passé sur la page

Pour activer : `process.env.NODE_ENV === 'development'`

