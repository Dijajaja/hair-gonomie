/**
 * Algorithme intelligent pour déterminer l'ordre et la pertinence des options de navigation
 * S'adapte à l'état mental et aux besoins de l'utilisateur
 */

export const calculateNavigationOrder = (items, userState) => {
  const { mentalState, preferences, hoverTimes, hesitationLevel, timeSpent } = userState;

  // Calculer un score pour chaque item
  const scoredItems = items.map((item) => {
    let score = 0;

    // 1. Score basé sur les préférences utilisateur
    const preferenceScore = preferences[item.id] || 0;
    score += preferenceScore * 10;

    // 2. Score basé sur le temps de survol (curiosité)
    const hoverTime = hoverTimes[item.id] || 0;
    if (hoverTime > 2000) {
      score += 5; 
    }

    // 3. Score basé sur l'état mental
    switch (mentalState) {
      case 'hesitant':
        // Pour les hésitants, prioriser les options simples et rassurantes
        if (item.complexity === 'simple' || item.type === 'discover') {
          score += 15;
        }
        if (item.recommended) {
          score += 10;
        }
        break;

      case 'focused':
        // Pour les utilisateurs focalisés, prioriser l'action directe
        if (item.type === 'action' || item.type === 'learn') {
          score += 15;
        }
        break;

      case 'confident':
        // Pour les confiants, offrir des défis
        if (item.complexity === 'advanced' || item.type === 'practice') {
          score += 15;
        }
        break;

      case 'exploratory':
      default:
        // Mode exploration : équilibrer les options
        score += 5;
        break;
    }

    // 4. Score basé sur le temps passé
    if (timeSpent > 30 && !preferences[item.id]) {
      // Après 30s, suggérer de nouveaux contenus
      if (item.type === 'discover') {
        score += 8;
      }
    }

    // 5. Score basé sur le niveau d'hésitation
    if (hesitationLevel >= 2) {
      // Pour les très hésitants, simplifier et recommander
      if (item.recommended || item.type === 'discover') {
        score += 12;
      }
    }

    // 6. Recommandations basées sur les patterns
    const recentClicks = userState.clickPatterns || [];
    if (recentClicks.length > 0) {
      // Si l'utilisateur a cliqué sur "Découvrir", suggérer "Apprendre" ensuite
      if (recentClicks[recentClicks.length - 1] === 'decouvrir' && item.id === 'apprendre') {
        score += 10;
      }
      // Si l'utilisateur a cliqué sur "Apprendre", suggérer "S'exercer" ensuite
      if (recentClicks[recentClicks.length - 1] === 'apprendre' && item.id === 'exercer') {
        score += 10;
      }
    }

    // 7. Boost pour les items recommandés
    if (item.recommended) {
      score += 8;
    }

    // 8. Décrémenter si déjà cliqué récemment (pour varier)
    if (recentClicks.includes(item.id)) {
      score -= 3;
    }

    return {
      ...item,
      relevanceScore: score,
      priority: score >= 20 ? 'high' : score >= 10 ? 'medium' : 'low',
    };
  });

  // Trier par score décroissant
  const sorted = scoredItems.sort((a, b) => b.relevanceScore - a.relevanceScore);

  // Générer des recommandations
  const recommendations = sorted
    .filter((item) => item.relevanceScore >= 15)
    .slice(0, 2)
    .map((item) => ({
      id: item.id,
      label: item.label,
      reason: getRecommendationReason(item, userState),
    }));

  return {
    orderedItems: sorted,
    recommendations,
    mentalState,
  };
};

/**
 * Génère une raison pour la recommandation
 */
const getRecommendationReason = (item, userState) => {
  const { mentalState, preferences, timeSpent } = userState;

  if (preferences[item.id]) {
    return "Basé sur vos préférences";
  }

  if (mentalState === 'hesitant') {
    return "Commencez par ici pour débuter";
  }

  if (mentalState === 'focused') {
    return "Parfait pour votre objectif actuel";
  }

  if (timeSpent > 30 && !preferences[item.id]) {
    return "Nouveau contenu à découvrir";
  }

  if (item.type === 'discover') {
    return "Idéal pour explorer";
  }

  if (item.type === 'learn') {
    return "Approfondissez vos connaissances";
  }

  if (item.type === 'practice') {
    return "Mettez en pratique";
  }

  return "Recommandé pour vous";
};

/**
 * Détermine si un item doit être affiché immédiatement ou progressivement
 */
export const shouldShowItem = (item, userState, index) => {
  // Par défaut, toujours afficher tous les items pour éviter les problèmes
  // La révélation progressive peut être ajoutée plus tard si nécessaire
  return true;
  
  /* Code pour révélation progressive (désactivé pour l'instant)
  const { mentalState, timeSpent } = userState;

  // Toujours afficher les 2 premiers immédiatement
  if (index < 2) return true;

  // Au début (tempsSpent < 1), afficher les 3 premiers
  if (timeSpent < 1 && index < 3) return true;

  // Pour les hésitants, afficher progressivement
  if (mentalState === 'hesitant') {
    return timeSpent > (index - 2) * 3;
  }

  // Pour les confiants, afficher plus rapidement
  if (mentalState === 'confident') {
    return timeSpent > (index - 2) * 1.5;
  }

  // Par défaut, afficher progressivement après les 2 premiers
  return timeSpent > (index - 2) * 2;
  */
};

