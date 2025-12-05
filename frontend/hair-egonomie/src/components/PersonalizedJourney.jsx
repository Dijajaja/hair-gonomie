import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import TradingBackground from './TradingBackground';
import { IconArrowRight, IconCheck } from './icons';

const PersonalizedJourney = ({ journey, onStart }) => {
  const containerRef = useRef(null);
  const autoScrollTimerRef = useRef(null);

  useEffect(() => {
    // Scroll automatique vers le haut au chargement
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let hasStarted = false;
    const startJourney = () => {
      if (!hasStarted && onStart) {
        hasStarted = true;
        onStart();
      }
    };

    // Démarrer le scroll automatique après un court délai
    const startAutoScroll = setTimeout(() => {
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Si le contenu dépasse la hauteur de l'écran, faire un scroll automatique
      if (documentHeight > viewportHeight * 1.1) {
        const scrollDuration = 4000; // 4 secondes comme demandé
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
            behavior: 'auto'
          });

          if (progress < 1) {
            autoScrollTimerRef.current = requestAnimationFrame(scrollStep);
          } else {
            // Scroll terminé, démarrer le parcours automatiquement
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
              startJourney();
            }, 500);
          }
        };

        scrollStep();
      } else {
        // Contenu court, démarrer automatiquement après 1 seconde
        setTimeout(() => {
          startJourney();
        }, 1000);
      }
    }, 500); // Démarrer rapidement après 0.5 seconde

    // Fallback : démarrer après 6 secondes maximum au cas où
    const fallbackTimer = setTimeout(() => {
      startJourney();
    }, 6000);

    return () => {
      clearTimeout(startAutoScroll);
      clearTimeout(fallbackTimer);
      if (autoScrollTimerRef.current) {
        cancelAnimationFrame(autoScrollTimerRef.current);
      }
    };
  }, [journey, onStart]);

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
      {/* Cartes flottantes */}
      <TradingBackground />

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 30%, rgba(190, 24, 93, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(219, 39, 119, 0.02) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{
          maxWidth: '800px',
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Titre */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            color: 'white',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            textShadow: '0 5px 20px rgba(190, 24, 93, 0.3)',
          }}
        >
          Votre parcours personnalisé
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.85)',
            marginBottom: '3rem',
          }}
        >
          {journey.description}
        </motion.p>

        {/* Parcours généré */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{
            background: 'rgba(20, 20, 20, 0.6)',
            backdropFilter: 'blur(20px) saturate(180%)',
            border: '2px solid rgba(190, 24, 93, 0.2)',
            borderRadius: '2rem',
            padding: '3rem',
            marginBottom: '3rem',
            boxShadow: '0 20px 60px rgba(190, 24, 93, 0.2)',
          }}
        >
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '2rem',
              textAlign: 'center',
            }}
          >
            Étapes de votre parcours
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            {journey.modules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  y: [0, -4, 0]
                }}
                transition={{ 
                  delay: 1 + index * 0.15,
                  y: {
                    duration: 3 + index * 0.25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1 + index * 0.15
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  padding: '1.5rem',
                  background: 'rgba(190, 24, 93, 0.1)',
                  borderRadius: '1rem',
                  border: '1px solid rgba(190, 24, 93, 0.2)',
                }}
              >
                <div
                  style={{
                    minWidth: '60px',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {module.icon && typeof module.icon === 'function' ? (
                    <module.icon size={40} color="rgba(190, 24, 93, 0.9)" />
                  ) : (
                    module.icon
                  )}
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: 'rgba(255, 255, 255, 0.95)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    Étape {index + 1} : {module.label}
                  </div>
                  <div
                    style={{
                      fontSize: '0.875rem',
                      color: 'rgba(255, 255, 255, 0.75)',
                    }}
                  >
                    Durée estimée : {module.duration}
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255, 255, 255, 0.6)',
                  }}
                >
                  {index < journey.modules.length - 1 ? (
                    <IconArrowRight size={24} color="rgba(255, 255, 255, 0.6)" />
                  ) : (
                    <IconCheck size={24} color="rgba(190, 24, 93, 0.9)" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </motion.div>
  );
};

export default PersonalizedJourney;

