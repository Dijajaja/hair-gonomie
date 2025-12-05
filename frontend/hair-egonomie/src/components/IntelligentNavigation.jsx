import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserState } from '../hooks/useUserState';
import { calculateNavigationOrder, shouldShowItem } from '../utils/navigationAlgorithm';
import FloatingCards from './FloatingCards';
import { IconDiscover, IconLearn, IconPractice, IconStar, IconArrowRight, IconSparkles } from './icons';

const IntelligentNavigation = ({ onSelect, onRecommendationClick }) => {
  const { userState, trackHoverStart, trackHoverEnd, trackClick } = useUserState();

  // Configuration des options de navigation avec métadonnées
  const [availableItems] = useState([
    {
      id: 'decouvrir',
      label: 'Découvrir',
      IconComponent: IconDiscover,
      description: 'Explorez les concepts clés de l\'ergonomie',
      color: '#ec4899',
      type: 'discover',
      complexity: 'simple',
      recommended: false,
    },
    {
      id: 'apprendre',
      label: 'Apprendre',
      IconComponent: IconLearn,
      description: 'Approfondissez vos connaissances en UX/UI',
      color: '#db2777',
      type: 'learn',
      complexity: 'medium',
      recommended: false,
    },
    {
      id: 'exercer',
      label: "S'exercer",
      IconComponent: IconPractice,
      description: 'Mettez en pratique avec des cas concrets',
      color: '#f472b6',
      type: 'practice',
      complexity: 'advanced',
      recommended: false,
    },
  ]);

  // Calculer l'ordre intelligent
  const { orderedItems, recommendations, mentalState } = calculateNavigationOrder(
    availableItems,
    userState
  );

  // État pour les items visibles - calculé directement depuis orderedItems
  const visibleItems = orderedItems.filter((item, index) =>
    shouldShowItem(item, userState, index)
  );

  // Marquer les recommandations
  const itemsWithRecommendations = visibleItems.map((item) => ({
    ...item,
    isRecommended: recommendations.some((rec) => rec.id === item.id),
    recommendationReason: recommendations.find((rec) => rec.id === item.id)?.reason,
  }));

  const handleItemClick = (item) => {
    trackClick(item.id, { type: item.type });
    onSelect(item.label);
  };

  const handleRecommendationClick = (item) => {
    trackClick(item.id, { type: 'recommendation', reason: item.recommendationReason });
    if (onRecommendationClick) {
      onRecommendationClick(item);
    } else {
      onSelect(item.label);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: 'linear-gradient(to bottom, #0a0a0a 0%, #1a1a1a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Cartes flottantes en arrière-plan */}
      <FloatingCards />

      {/* Overlay élégant */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 30%, rgba(236, 72, 153, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(219, 39, 119, 0.02) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Titre avec indication d'état mental */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
          marginBottom: recommendations.length > 0 ? '2rem' : '4rem',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            color: 'white',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            textShadow: '0 5px 20px rgba(236, 72, 153, 0.3)',
          }}
        >
          Que voulez-vous faire aujourd'hui ?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.8)',
            fontWeight: 400,
          }}
        >
          Navigation adaptée à vos besoins
        </motion.p>
      </motion.div>

      {/* Recommandations instantanées */}
      {recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            maxWidth: '600px',
            width: '100%',
            marginBottom: '2rem',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div
            style={{
              background: 'rgba(236, 72, 153, 0.1)',
              border: '2px solid rgba(236, 72, 153, 0.3)',
              borderRadius: '1rem',
              padding: '1rem 1.5rem',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.75rem',
              }}
            >
              <IconSparkles size={20} color="#ec4899" />
              <span
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#ec4899',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Recommandation
              </span>
            </div>
            {recommendations.map((rec) => {
              const item = availableItems.find((i) => i.id === rec.id);
              return (
                <motion.button
                  key={rec.id}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleRecommendationClick({ ...item, recommendationReason: rec.reason })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(236, 72, 153, 0.2)',
                    border: '1px solid rgba(236, 72, 153, 0.4)',
                    borderRadius: '0.5rem',
                    color: 'white',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '0.5rem',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: '#ec4899', marginBottom: '0.25rem' }}>
                      {item?.label}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                      {rec.reason}
                    </div>
                  </div>
                  <IconArrowRight size={20} color="currentColor" />
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Options de navigation ordonnées intelligemment */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.4,
            },
          },
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          width: '100%',
          maxWidth: '500px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <AnimatePresence>
          {itemsWithRecommendations.map((item, index) => (
            <motion.button
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1],
                  },
                },
              }}
              whileHover={{
                scale: 1.02,
                y: -4,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => trackHoverStart(item.id)}
              onHoverEnd={() => trackHoverEnd(item.id)}
              onClick={() => handleItemClick(item)}
              style={{
                padding: '1.75rem 2rem',
                background: item.isRecommended
                  ? 'rgba(236, 72, 153, 0.15)'
                  : 'rgba(20, 20, 20, 0.6)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: item.isRecommended
                  ? '2px solid rgba(236, 72, 153, 0.5)'
                  : '1px solid rgba(236, 72, 153, 0.2)',
                borderRadius: '1.5rem',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                transition: 'all 0.3s ease',
                boxShadow: item.isRecommended
                  ? '0 12px 40px -8px rgba(236, 72, 153, 0.4)'
                  : '0 8px 32px rgba(236, 72, 153, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 20, // Assure que les boutons sont cliquables
                pointerEvents: 'auto', // Force les événements de pointeur
              }}
            >
              {/* Badge Recommandé */}
              {item.isRecommended && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    boxShadow: '0 4px 12px rgba(236, 72, 153, 0.4)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <IconStar size={12} color="currentColor" />
                    <span>Recommandé</span>
                  </div>
                </motion.div>
              )}

              {/* Barre de couleur animée */}
              <motion.div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '4px',
                  background: `linear-gradient(180deg, ${item.color} 0%, ${item.color}dd 100%)`,
                  boxShadow: `0 0 10px ${item.color}80`,
                }}
                initial={{ scaleY: 0 }}
                whileHover={{ scaleY: 1 }}
                transition={{ duration: 0.3 }}
              />

              <motion.div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '3rem',
                  height: '3rem',
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                {item.IconComponent && <item.IconComponent size={40} color={item.color} />}
              </motion.div>

              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#ec4899',
                    marginBottom: '0.25rem',
                  }}
                >
                  {item.label}
                </h3>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'rgba(236, 72, 153, 0.7)',
                    fontWeight: 400,
                  }}
                >
                  {item.description}
                </p>
              </div>

              <motion.div
                style={{
                  color: '#ec4899',
                }}
                initial={{ x: -10, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <IconArrowRight size={24} color="#ec4899" />
              </motion.div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Indicateur d'état mental (optionnel, pour debug) */}
      {import.meta.env.DEV && (
        <div
          style={{
            position: 'fixed',
            bottom: '1rem',
            left: '1rem',
            background: 'rgba(0, 0, 0, 0.7)',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            color: 'white',
            fontSize: '0.75rem',
            zIndex: 1000,
          }}
        >
          État: {mentalState} | Temps: {userState.timeSpent}s
        </div>
      )}
    </motion.div>
  );
};

export default IntelligentNavigation;

