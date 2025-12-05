import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import FloatingCards from './FloatingCards';
import NextButton from './NextButton';

const CompletionScreen = ({ mode, journeyStats, onRestart, onContinue }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    // Générer des suggestions personnalisées selon le mode et les stats
    const generateSuggestions = () => {
      const baseSuggestions = {
        "Découvrir": [
          { label: "Explorer d'autres concepts", action: "explore", icon: "🔍" },
          { label: "Passer à l'apprentissage", action: "learn", icon: "📚" },
          { label: "Mettre en pratique", action: "practice", icon: "💪" },
        ],
        "Apprendre": [
          { label: "Approfondir vos connaissances", action: "deepen", icon: "📖" },
          { label: "Tester vos acquis", action: "test", icon: "✏️" },
          { label: "Découvrir de nouveaux sujets", action: "discover", icon: "🌟" },
        ],
        "S'exercer": [
          { label: "Refaire les exercices", action: "retry", icon: "🔄" },
          { label: "Consolider avec la théorie", action: "theory", icon: "📚" },
          { label: "Explorer d'autres pratiques", action: "explore", icon: "🚀" },
        ],
      };

      return baseSuggestions[mode] || baseSuggestions["Découvrir"];
    };

    const suggestionsList = generateSuggestions();
    setSuggestions(suggestionsList);

    // Afficher les suggestions après un délai
    setTimeout(() => {
      setShowSuggestions(true);
    }, 1000);
  }, [mode]);

  const handleSuggestionClick = (action) => {
    // Logique pour gérer les actions de suggestion
    if (action === "retry" || action === "restart") {
      onRestart();
    } else {
      onContinue(action);
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
        justifyContent: 'center',
        padding: '2rem',
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
          maxWidth: '700px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
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
            textAlign: 'center',
          }}
        >
          {/* Animation de succès */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            style={{
              fontSize: '5rem',
              marginBottom: '1.5rem',
            }}
          >
            ✨
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
            }}
          >
            Parcours terminé !
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              fontSize: '1.125rem',
              color: 'rgba(236, 72, 153, 0.8)',
              marginBottom: '2rem',
              lineHeight: 1.6,
            }}
          >
            Vous avez complété le parcours <strong>{mode}</strong> avec succès.
            {journeyStats && (
              <span style={{ display: 'block', marginTop: '0.5rem', fontSize: '0.95rem', color: 'rgba(236, 72, 153, 0.6)' }}>
                {journeyStats.stepsCompleted} étapes complétées
              </span>
            )}
          </motion.p>

          {/* Suggestions personnalisées */}
          {showSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                marginTop: '2rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(236, 72, 153, 0.1)',
              }}
            >
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'rgba(236, 72, 153, 0.9)',
                  marginBottom: '1.5rem',
                }}
              >
                Que souhaitez-vous faire maintenant ?
              </motion.h3>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.7,
                    },
                  },
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: 0.4,
                          ease: [0.4, 0, 0.2, 1],
                        },
                      },
                    }}
                    whileHover={{
                      scale: 1.02,
                      x: 4,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSuggestionClick(suggestion.action)}
                    style={{
                      padding: '1.25rem 1.5rem',
                      background: 'rgba(30, 30, 30, 0.6)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(236, 72, 153, 0.2)',
                      borderRadius: '1rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 16px rgba(236, 72, 153, 0.1)',
                    }}
                    onHoverStart={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.5)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(236, 72, 153, 0.3)';
                      e.currentTarget.style.background = 'rgba(40, 40, 40, 0.8)';
                    }}
                    onHoverEnd={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.2)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(236, 72, 153, 0.1)';
                      e.currentTarget.style.background = 'rgba(30, 30, 30, 0.6)';
                    }}
                  >
                    <span style={{ fontSize: '1.5rem' }}>{suggestion.icon}</span>
                    <span
                      style={{
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: 'rgba(236, 72, 153, 0.9)',
                      }}
                    >
                      {suggestion.label}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Bouton pour recommencer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{
              marginTop: '2rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(236, 72, 153, 0.1)',
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRestart}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                border: '1px solid rgba(236, 72, 153, 0.3)',
                borderRadius: '0.75rem',
                background: 'transparent',
                color: 'rgba(236, 72, 153, 0.8)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onHoverStart={(e) => {
                e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.6)';
                e.currentTarget.style.color = 'rgba(236, 72, 153, 1)';
                e.currentTarget.style.background = 'rgba(236, 72, 153, 0.1)';
              }}
              onHoverEnd={(e) => {
                e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.3)';
                e.currentTarget.style.color = 'rgba(236, 72, 153, 0.8)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Recommencer le parcours
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CompletionScreen;

