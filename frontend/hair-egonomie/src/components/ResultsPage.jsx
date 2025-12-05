import { motion } from 'framer-motion';
import TradingBackground from './TradingBackground';

const ResultsPage = ({ mode, onRestart, totalQuestions, completedQuestions }) => {
  // Calculer le pourcentage correctement - seulement si des questions ont été répondues
  const completionPercentage = totalQuestions > 0 
    ? Math.round((completedQuestions / totalQuestions) * 100) 
    : 0; // 0% si aucune question n'a été répondue

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

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{
          maxWidth: '700px',
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Icône de succès animée */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            fontSize: '5rem',
            marginBottom: '2rem',
          }}
        >
          ✨
        </motion.div>

        {/* Titre */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            color: 'white',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            textShadow: '0 5px 20px rgba(236, 72, 153, 0.3)',
          }}
        >
          Parcours terminé !
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            fontSize: '1.25rem',
            color: 'rgba(255, 255, 255, 0.8)',
            fontWeight: 400,
            marginBottom: '3rem',
          }}
        >
          Vous avez complété le mode "{mode}"
        </motion.p>

        {/* Carte de résultats élégante */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          style={{
            background: 'rgba(20, 20, 20, 0.6)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '2px solid rgba(236, 72, 153, 0.2)',
            borderRadius: '2rem',
            padding: '3rem',
            marginBottom: '3rem',
            boxShadow: '0 20px 60px rgba(236, 72, 153, 0.2)',
          }}
        >
          {/* Barre de progression circulaire */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              width: '150px',
              height: '150px',
              margin: '0 auto 2rem',
              position: 'relative',
            }}
          >
            <svg width="150" height="150" style={{ transform: 'rotate(-90deg)' }}>
              {/* Cercle de fond */}
              <circle
                cx="75"
                cy="75"
                r="65"
                fill="none"
                stroke="rgba(236, 72, 153, 0.1)"
                strokeWidth="12"
              />
              {/* Cercle de progression animé */}
              <motion.circle
                cx="75"
                cy="75"
                r="65"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="12"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: completionPercentage / 100 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="50%" stopColor="#db2777" />
                  <stop offset="100%" stopColor="#be185d" />
                </linearGradient>
              </defs>
            </svg>
            {/* Pourcentage au centre */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '2rem',
                fontWeight: 700,
                color: 'rgba(255, 255, 255, 0.95)',
              }}
            >
              {completionPercentage}%
            </div>
          </motion.div>

          {/* Statistiques */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              gap: '2rem',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: 'rgba(255, 255, 255, 0.95)',
                  marginBottom: '0.5rem',
                }}
              >
                {completedQuestions}
              </div>
              <div
                style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Questions
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: 'rgba(255, 255, 255, 0.95)',
                  marginBottom: '0.5rem',
                }}
              >
                {mode}
              </div>
              <div
                style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Mode
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bouton de retour */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 15px 50px -10px rgba(236, 72, 153, 0.6)',
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
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
          <span>Recommencer un parcours</span>
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a9.5 9.5 0 1 1 19 0" />
          </motion.svg>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ResultsPage;

