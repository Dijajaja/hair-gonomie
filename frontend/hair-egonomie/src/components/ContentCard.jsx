import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import FloatingCards from './FloatingCards';
import NextButton from './NextButton';

const ContentCard = ({ content, onNext, onComplete }) => {
  const [showNextButton, setShowNextButton] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Timer pour estimer le temps de lecture
    const timer = setInterval(() => {
      setReadingTime(prev => prev + 1);
    }, 1000);

    // Détecter le scroll pour savoir si l'utilisateur a lu
    const handleScroll = () => {
      setHasScrolled(true);
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Si l'utilisateur a scrollé jusqu'à 80% du contenu, afficher le bouton
      if (scrollPosition >= documentHeight * 0.8) {
        setShowNextButton(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Afficher le bouton après un délai minimum (3 secondes) ou si l'utilisateur a scrollé
    const autoShowTimer = setTimeout(() => {
      if (hasScrolled || readingTime >= 3) {
        setShowNextButton(true);
      }
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(autoShowTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolled, readingTime]);

  const handleNext = () => {
    setShowNextButton(false);
    if (onNext) {
      onNext();
    } else if (onComplete) {
      onComplete();
    }
  };

  const getContentIcon = (contentType) => {
    switch (contentType) {
      case 'article':
        return '📄';
      case 'video':
        return '🎥';
      case 'exercise':
        return '✏️';
      default:
        return '📝';
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
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            style={{
              background: 'rgba(20, 20, 20, 0.7)',
              backdropFilter: 'blur(30px) saturate(180%)',
              WebkitBackdropFilter: 'blur(30px) saturate(180%)',
              borderRadius: '2rem',
              padding: '3rem',
              boxShadow: `
                0 20px 60px rgba(0, 0, 0, 0.5),
                0 8px 32px rgba(236, 72, 153, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `,
              border: '1px solid rgba(236, 72, 153, 0.2)',
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
                borderBottom: '1px solid rgba(236, 72, 153, 0.1)',
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
                    color: 'rgba(236, 72, 153, 0.7)',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {content.contentType === 'article' ? 'Article' : 
                   content.contentType === 'video' ? 'Vidéo' : 'Exercice'}
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #ec4899 0%, #db2777 50%, #f472b6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
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
                  borderTop: '1px solid rgba(236, 72, 153, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.875rem',
                  color: 'rgba(236, 72, 153, 0.6)',
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
                    <span>✓ Lu</span>
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

