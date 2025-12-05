import { useState, useEffect, useRef } from 'react';

/**
 * Hook pour tracker l'état mental et comportemental de l'utilisateur
 * Analyse les interactions, le temps passé, les hésitations, etc.
 */
export const useUserState = () => {
  const [userState, setUserState] = useState({
    mentalState: 'exploratory', // exploratory, focused, hesitant, confident
    timeSpent: 0,
    interactions: [],
    hoverTimes: {},
    clickPatterns: [],
    hesitationLevel: 0,
    preferences: {},
    currentFocus: null,
  });

  const startTime = useRef(Date.now());
  const hoverTimers = useRef({});
  const lastInteraction = useRef(null);

  // Tracker le temps passé
  useEffect(() => {
    const interval = setInterval(() => {
      setUserState((prev) => ({
        ...prev,
        timeSpent: Math.floor((Date.now() - startTime.current) / 1000),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Analyser l'état mental basé sur les interactions
  useEffect(() => {
    const analyzeMentalState = () => {
      const { hoverTimes, interactions, timeSpent } = userState;

      // Calculer le niveau d'hésitation
      const totalHoverTime = Object.values(hoverTimes).reduce((a, b) => a + b, 0);
      const avgHoverTime = totalHoverTime / Math.max(Object.keys(hoverTimes).length, 1);
      
      let hesitationLevel = 0;
      if (avgHoverTime > 3000) hesitationLevel = 3; // Très hésitant
      else if (avgHoverTime > 2000) hesitationLevel = 2; // Modéré
      else if (avgHoverTime > 1000) hesitationLevel = 1; // Légèrement hésitant

      // Déterminer l'état mental
      let mentalState = 'exploratory';
      
      if (hesitationLevel >= 2) {
        mentalState = 'hesitant';
      } else if (interactions.length > 3 && timeSpent < 30) {
        mentalState = 'focused';
      } else if (interactions.length === 0 && timeSpent > 10) {
        mentalState = 'hesitant';
      } else if (interactions.length > 0 && timeSpent < 60) {
        mentalState = 'confident';
      }

      setUserState((prev) => ({
        ...prev,
        mentalState,
        hesitationLevel,
      }));
    };

    analyzeMentalState();
  }, [userState.hoverTimes, userState.interactions, userState.timeSpent]);

  // Fonctions pour tracker les interactions
  const trackHoverStart = (itemId) => {
    hoverTimers.current[itemId] = Date.now();
  };

  const trackHoverEnd = (itemId) => {
    if (hoverTimers.current[itemId]) {
      const hoverTime = Date.now() - hoverTimers.current[itemId];
      setUserState((prev) => ({
        ...prev,
        hoverTimes: {
          ...prev.hoverTimes,
          [itemId]: (prev.hoverTimes[itemId] || 0) + hoverTime,
        },
      }));
      delete hoverTimers.current[itemId];
    }
  };

  const trackClick = (itemId, metadata = {}) => {
    const interaction = {
      itemId,
      timestamp: Date.now(),
      timeSpent: userState.timeSpent,
      ...metadata,
    };

    setUserState((prev) => ({
      ...prev,
      interactions: [...prev.interactions, interaction],
      clickPatterns: [...prev.clickPatterns.slice(-4), itemId],
      preferences: {
        ...prev.preferences,
        [itemId]: (prev.preferences[itemId] || 0) + 1,
      },
      currentFocus: itemId,
    }));

    lastInteraction.current = interaction;
  };

  const trackView = (itemId) => {
    setUserState((prev) => ({
      ...prev,
      currentFocus: itemId,
    }));
  };

  return {
    userState,
    trackHoverStart,
    trackHoverEnd,
    trackClick,
    trackView,
  };
};

