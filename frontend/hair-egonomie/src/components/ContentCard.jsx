import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import TradingBackground from './TradingBackground';
import NextButton from './NextButton';

import { IconArticle, IconExample, IconExercise, IconSummary, IconCheck } from './icons';

const ContentCard = ({ content, onNext, onComplete }) => {
  const [showNextButton, setShowNextButton] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const contentRef = useRef(null);
  const autoScrollTimerRef = useRef(null);

  useEffect(() => {
    // Scroll automatique vers le haut au chargement
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Timer pour estimer le temps de lecture
    const timer = setInterval(() => {
      setReadingTime(prev => prev + 1);
    }, 1000);

    // Scroll automatique progressif pour aider l'utilisateur
    const startAutoScroll = () => {
      if (contentRef.current) {
        const viewportHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Si le contenu dépasse la hauteur de l'écran, faire un scroll automatique
        if (documentHeight > viewportHeight * 1.2) {
          const scrollDuration = 6000; // 6 secondes pour scroller tout le contenu
          const scrollDistance = documentHeight - viewportHeight + 100;
          const startTime = Date.now();
          const startScroll = window.scrollY || 0;

          const scrollStep = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / scrollDuration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // Easing cubic

            const targetScroll = startScroll + (scrollDistance * easeProgress);
            window.scrollTo({
              top: targetScroll,
              behavior: 'auto' // Utiliser 'auto' pour un scroll plus fluide
            });

            if (progress < 1) {
              autoScrollTimerRef.current = requestAnimationFrame(scrollStep);
            } else {
              // Scroll terminé, afficher le bouton
              setShowNextButton(true);
            }
          };

          // Démarrer le scroll automatique après 2 secondes
          setTimeout(() => {
            scrollStep();
          }, 2000);
        } else {
          // Contenu court, afficher le bouton après 3 secondes
          setTimeout(() => {
            setShowNextButton(true);
          }, 3000);
        }
      }
    };

    // Détecter le scroll manuel pour arrêter le scroll automatique
    const handleScroll = () => {
      setHasScrolled(true);
      if (autoScrollTimerRef.current) {
        cancelAnimationFrame(autoScrollTimerRef.current);
        autoScrollTimerRef.current = null;
      }
      
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Si l'utilisateur a scrollé jusqu'à 80% du contenu, afficher le bouton
      if (scrollPosition >= documentHeight * 0.8) {
        setShowNextButton(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Démarrer le scroll automatique après un court délai
    const autoScrollDelay = setTimeout(() => {
      startAutoScroll();
    }, 1000);

    return () => {
      clearInterval(timer);
      clearTimeout(autoScrollDelay);
      window.removeEventListener('scroll', handleScroll);
      if (autoScrollTimerRef.current) {
        cancelAnimationFrame(autoScrollTimerRef.current);
      }
    };
  }, [content]);

  const handleNext = () => {
    setShowNextButton(false);
    if (onNext) {
      onNext();
    } else if (onComplete) {
      onComplete();
    }
  };

  const getContentIcon = (contentType) => {
    const iconSize = 24;
    const iconColor = 'rgba(255, 255, 255, 0.9)';
    
    switch (contentType) {
      case 'article':
        return <IconArticle size={iconSize} color={iconColor} />;
      case 'exemple':
        return <IconExample size={iconSize} color={iconColor} />;
      case 'exercise':
        return <IconExercise size={iconSize} color={iconColor} />;
      default:
        return <IconSummary size={iconSize} color={iconColor} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '2rem',
        paddingTop: '4rem',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Cartes flottantes en arrière-plan */}
      <TradingBackground />
      
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

      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={content.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: [0, -7, 0], 
              scale: 1 
            }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.4, 0, 0.2, 1],
              y: {
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            style={{
              background: 'rgba(20, 20, 20, 0.7)',
              backdropFilter: 'blur(30px) saturate(180%)',
              WebkitBackdropFilter: 'blur(30px) saturate(180%)',
              borderRadius: '2rem',
              padding: '3rem',
              boxShadow: `
                0 20px 60px rgba(0, 0, 0, 0.5),
                0 8px 32px rgba(255, 255, 255, 0.08),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `,
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            {/* En-tête avec icône */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem',
                paddingBottom: '1.5rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <motion.div
                style={{
                  fontSize: '3rem',
                  lineHeight: 1,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {getContentIcon(content.contentType)}
              </motion.div>
              <div style={{ flex: 1 }}>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {content.contentType === 'article' ? 'Article' : 
                   content.contentType === 'exemple' ? 'Exemple' : 'Exercice'}
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                    fontWeight: 700,
                    color: 'rgba(255, 255, 255, 0.95)',
                    marginTop: '0.5rem',
                    lineHeight: 1.3,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {content.title}
                </motion.h1>
              </div>
            </motion.div>

            {/* Contenu */}
            {content.content && (
              <motion.div
                ref={contentRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="content-html"
                style={{
                  fontSize: '1.125rem',
                  lineHeight: 1.8,
                  color: 'rgba(255, 255, 255, 0.9)',
                }}
                dangerouslySetInnerHTML={{ __html: content.content }}
              />
            )}

            {/* Indicateur de lecture */}
            {readingTime > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  marginTop: '2rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                }}
              >
                <span>Temps de lecture : {readingTime}s</span>
                {hasScrolled && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <IconCheck size={16} color="rgba(255, 255, 255, 0.9)" style={{ marginRight: '0.25rem' }} />
                    <span>Lu</span>
                  </motion.span>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bouton suivant avec révélation progressive */}
      {showNextButton && (
        <NextButton
          label="Continuer"
          onClick={handleNext}
          isVisible={showNextButton}
          delay={0}
        />
      )}
    </motion.div>
  );
};

export default ContentCard;

