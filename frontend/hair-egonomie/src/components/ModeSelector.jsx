import { motion, AnimatePresence } from 'framer-motion';
import TradingBackground from './TradingBackground';

const ModeSelector = ({ onSelect }) => {
  const modes = [
    { 
      id: 'decouvrir',
      label: 'Découvrir',
      icon: '🔍',
      description: 'Explorez les concepts',
      color: '#667eea'
    },
    { 
      id: 'apprendre',
      label: 'Apprendre',
      icon: '📚',
      description: 'Approfondissez vos connaissances',
      color: '#764ba2'
    },
    { 
      id: 'exercer',
      label: "S'exercer",
      icon: '💪',
      description: 'Mettez en pratique',
      color: '#f093fb'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
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
      {/* Background animé */}
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
            radial-gradient(circle at 20% 30%, rgba(190, 24, 93, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(219, 39, 119, 0.02) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      
      {/* Overlay sombre pour mieux voir les cartes */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.1)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
          marginBottom: '4rem',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #be185d 0%, #9f1239 50%, #be185d 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            textShadow: '0 0 30px rgba(190, 24, 93, 0.3)',
          }}
        >
          Que voulez-vous faire aujourd'hui ?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            fontSize: '1.125rem',
            color: 'rgba(190, 24, 93, 0.8)',
            fontWeight: 400,
          }}
        >
          Choisissez votre parcours d'apprentissage
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
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
          {modes.map((mode, index) => (
            <motion.button
              key={mode.id}
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
              onClick={() => onSelect(mode.label)}
              style={{
                padding: '1.75rem 2rem',
                background: 'rgba(20, 20, 20, 0.6)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(190, 24, 93, 0.2)',
                borderRadius: '1.5rem',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 32px rgba(190, 24, 93, 0.1)',
                position: 'relative',
                overflow: 'hidden',
              }}
              onHoverStart={(e) => {
                e.currentTarget.style.borderColor = 'rgba(190, 24, 93, 0.5)';
                e.currentTarget.style.boxShadow = '0 12px 40px -8px rgba(190, 24, 93, 0.4)';
                e.currentTarget.style.background = 'rgba(30, 30, 30, 0.8)';
              }}
              onHoverEnd={(e) => {
                e.currentTarget.style.borderColor = 'rgba(190, 24, 93, 0.2)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(190, 24, 93, 0.1)';
                e.currentTarget.style.background = 'rgba(20, 20, 20, 0.6)';
              }}
            >
              {/* Barre de couleur animée rose */}
              <motion.div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '4px',
                  background: 'linear-gradient(180deg, #be185d 0%, #9f1239 100%)',
                  boxShadow: '0 0 10px rgba(190, 24, 93, 0.5)',
                }}
                initial={{ scaleY: 0 }}
                whileHover={{ scaleY: 1 }}
                transition={{ duration: 0.3 }}
              />

              <motion.div
                style={{
                  fontSize: '2.5rem',
                  lineHeight: 1,
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                {mode.icon}
              </motion.div>

              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#be185d',
                    marginBottom: '0.25rem',
                  }}
                >
                  {mode.label}
                </h3>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'rgba(190, 24, 93, 0.7)',
                    fontWeight: 400,
                  }}
                >
                  {mode.description}
                </p>
              </div>

              <motion.div
                style={{
                  fontSize: '1.5rem',
                  color: '#be185d',
                }}
                initial={{ x: -10, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default ModeSelector;
