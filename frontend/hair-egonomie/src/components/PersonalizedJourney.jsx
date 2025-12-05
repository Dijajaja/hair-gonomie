import { motion } from 'framer-motion';
import FloatingCards from './FloatingCards';

const PersonalizedJourney = ({ journey, onStart }) => {
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
      <FloatingCards />

      {/* Overlay */}
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

      <motion.div
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
            textShadow: '0 5px 20px rgba(236, 72, 153, 0.3)',
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
            color: 'rgba(255, 255, 255, 0.8)',
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
            border: '2px solid rgba(236, 72, 153, 0.2)',
            borderRadius: '2rem',
            padding: '3rem',
            marginBottom: '3rem',
            boxShadow: '0 20px 60px rgba(236, 72, 153, 0.2)',
          }}
        >
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: '#ec4899',
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
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.15 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  padding: '1.5rem',
                  background: 'rgba(236, 72, 153, 0.1)',
                  borderRadius: '1rem',
                  border: '1px solid rgba(236, 72, 153, 0.2)',
                }}
              >
                <div
                  style={{
                    fontSize: '2.5rem',
                    minWidth: '60px',
                    textAlign: 'center',
                  }}
                >
                  {module.icon}
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: '#ec4899',
                      marginBottom: '0.25rem',
                    }}
                  >
                    Étape {index + 1} : {module.label}
                  </div>
                  <div
                    style={{
                      fontSize: '0.875rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    Durée estimée : {module.duration}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: '1.5rem',
                    color: 'rgba(236, 72, 153, 0.5)',
                  }}
                >
                  {index < journey.modules.length - 1 ? '→' : '✓'}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bouton pour commencer */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 15px 50px -10px rgba(236, 72, 153, 0.7)',
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          style={{
            padding: '1.25rem 3rem',
            fontSize: '1rem',
            fontWeight: 600,
            border: 'none',
            borderRadius: '1rem',
            background: 'linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 12px 40px rgba(236, 72, 153, 0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            margin: '0 auto',
            letterSpacing: '0.02em',
          }}
        >
          <span>Commencer le parcours</span>
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            animate={{ x: [0, 4, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </motion.svg>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default PersonalizedJourney;

