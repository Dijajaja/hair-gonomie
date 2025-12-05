import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingCards from './FloatingCards';
import NextButton from './NextButton';

const QuestionCard = ({ mode, question, questionId, onNext }) => {
  const [showNextButton, setShowNextButton] = useState(false);
  const [responseTime, setResponseTime] = useState(0);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    // Timer pour mesurer le temps de réponse
    const timer = setInterval(() => {
      setResponseTime(Date.now() - startTime);
    }, 100);

    // Afficher le bouton après un délai minimum (2 secondes)
    const showButtonTimer = setTimeout(() => {
      setShowNextButton(true);
    }, 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(showButtonTimer);
    };
  }, [startTime]);

  const handleNext = () => {
    const finalResponseTime = Date.now() - startTime;
    setShowNextButton(false);
    if (onNext) {
      onNext(finalResponseTime);
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
        <AnimatePresence mode="wait">
          <motion.div
            key={questionId || question}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
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
            {/* Indicateur de question */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
              }}
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
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
                Question
              </motion.span>
            </motion.div>

            {/* Question */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #ec4899 0%, #db2777 50%, #f472b6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '3rem',
                lineHeight: 1.3,
                letterSpacing: '-0.02em',
              }}
            >
              {question}
            </motion.h2>

            {/* Message d'encouragement */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                fontSize: '1rem',
                color: 'rgba(236, 72, 153, 0.6)',
                fontStyle: 'italic',
                marginTop: '2rem',
                textAlign: 'center',
              }}
            >
              Prenez le temps de réfléchir à cette question...
            </motion.p>
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

export default QuestionCard;
