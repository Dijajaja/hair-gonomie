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

      {/* Conteneur principal avec layout flex */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: '1400px',
          gap: '3rem',
          alignItems: 'flex-start',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 10,
          padding: '0 2rem',
        }}
      >
        {/* Colonne gauche : Titre et Options */}
        <div
          style={{
            flex: 1,
            maxWidth: '600px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Titre */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            style={{
              width: '100%',
              textAlign: 'center',
              marginBottom: '4rem',
            }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 700,
                color: '#ec4899',
                marginBottom: '1rem',
                letterSpacing: '-0.02em',
                textShadow: '0 5px 20px rgba(236, 72, 153, 0.4)',
              }}
            >
              Que voulez-vous faire aujourd'hui ?
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              style={{
                fontSize: '1.125rem',
                color: '#ec4899',
                fontWeight: 400,
                opacity: 0.9,
              }}
            >
              Navigation adaptée à vos besoins
            </motion.p>
          </motion.div>

          {/* Options de navigation ordonnées intelligemment */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.3,
                  ease: [0.25, 0.1, 0.25, 1],
                },
              },
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem', // Espacement augmenté pour disperser les cartes
              width: '100%',
              maxWidth: '450px', // Légèrement réduit
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
                    duration: 0.7,
                    ease: [0.25, 0.1, 0.25, 1],
                  },
                },
              }}
              whileHover={{
                scale: 1.02,
                y: -4,
                transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
              }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => trackHoverStart(item.id)}
              onHoverEnd={() => trackHoverEnd(item.id)}
              onClick={() => handleItemClick(item)}
              style={{
                padding: '1.25rem 1.5rem', // Réduit de 1.75rem 2rem
                background: item.isRecommended
                  ? 'rgba(236, 72, 153, 0.15)'
                  : 'rgba(20, 20, 20, 0.6)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: item.isRecommended
                  ? '2px solid rgba(236, 72, 153, 0.5)'
                  : '1px solid rgba(236, 72, 153, 0.2)',
                borderRadius: '1.25rem', // Légèrement réduit
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem', // Réduit de 1.5rem
                transition: 'all 0.3s ease',
                boxShadow: item.isRecommended
                  ? '0 10px 35px -8px rgba(236, 72, 153, 0.4)'
                  : '0 6px 28px rgba(236, 72, 153, 0.1)',
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
                    top: '0.625rem', // Réduit
                    right: '0.625rem', // Réduit
                    background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                    color: 'white',
                    fontSize: '0.7rem', // Réduit
                    fontWeight: 600,
                    padding: '0.2rem 0.625rem', // Réduit
                    borderRadius: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    boxShadow: '0 4px 12px rgba(236, 72, 153, 0.4)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <IconStar size={10} color="currentColor" /> {/* Réduit */}
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
                  width: '3px', // Réduit de 4px
                  background: `linear-gradient(180deg, ${item.color} 0%, ${item.color}dd 100%)`,
                  boxShadow: `0 0 8px ${item.color}80`,
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
                  width: '2.5rem', // Réduit de 3rem
                  height: '2.5rem', // Réduit de 3rem
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                {item.IconComponent && <item.IconComponent size={32} color={item.color} />} {/* Réduit de 40 */}
              </motion.div>

              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: '1.1rem', // Réduit de 1.25rem
                    fontWeight: 600,
                    color: '#ec4899',
                    marginBottom: '0.2rem', // Réduit
                  }}
                >
                  {item.label}
                </h3>
                <p
                  style={{
                    fontSize: '0.8rem', // Réduit de 0.875rem
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
                <IconArrowRight size={20} color="#ec4899" /> {/* Réduit de 24 */}
              </motion.div>
            </motion.button>
          ))}
        </AnimatePresence>
          </motion.div>
        </div>

        {/* Colonne droite : Recommandations */}
        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              delay: 0.6,
              duration: 0.9,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{
              flex: '0 0 auto',
              width: '280px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              paddingTop: '9.5rem', // Aligné avec le début des cartes (hauteur h1 ~3rem + margin h1 1rem + hauteur p ~1.5rem + marginBottom conteneur 4rem)
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              style={{
                background: 'rgba(236, 72, 153, 0.08)',
                border: '2px solid rgba(236, 72, 153, 0.25)',
                borderRadius: '1.25rem',
                padding: '1rem',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: '0 20px 60px -12px rgba(236, 72, 153, 0.3)',
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.875rem',
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <IconSparkles size={18} color="#ec4899" />
                </motion.div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#ec4899',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  Recommandation
                </span>
              </motion.div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {recommendations.map((rec, index) => {
                  const item = availableItems.find((i) => i.id === rec.id);
                  return (
                    <motion.button
                      key={rec.id}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 1 + index * 0.15,
                        duration: 0.5,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      whileHover={{
                        scale: 1.02,
                        x: 3,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleRecommendationClick({ ...item, recommendationReason: rec.reason })}
                      style={{
                        width: '100%',
                        padding: '0.625rem 0.875rem',
                        background: 'rgba(236, 72, 153, 0.15)',
                        border: '1.5px solid rgba(236, 72, 153, 0.4)',
                        borderRadius: '0.75rem',
                        color: 'white',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.375rem',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 6px 20px -4px rgba(236, 72, 153, 0.2)',
                      }}
                    >
                      {/* Effet de brillance au survol */}
                      <motion.div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: '-100%',
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                        }}
                        whileHover={{ left: '100%' }}
                        transition={{ duration: 0.6 }}
                      />

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {item?.IconComponent && (
                            <motion.div
                              whileHover={{ rotate: 15, scale: 1.1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <item.IconComponent size={16} color="#ec4899" />
                            </motion.div>
                          )}
                          <div style={{ fontWeight: 600, color: '#ec4899', fontSize: '0.8rem' }}>
                            {item?.label}
                          </div>
                        </div>
                        <motion.div
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          <IconArrowRight size={14} color="#ec4899" />
                        </motion.div>
                      </div>
                      <div
                        style={{
                          fontSize: '0.7rem',
                          color: 'rgba(255, 255, 255, 0.75)',
                          lineHeight: 1.4,
                          paddingLeft: '2rem',
                        }}
                      >
                        {rec.reason}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

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

