import { motion } from 'framer-motion';
import { useEffect } from 'react';

const SplashScreen = ({ next }) => {
  useEffect(() => {
    // Augmenter le temps d'affichage pour permettre la lecture des descriptions
    const timer = setTimeout(() => {
      next();
    }, 4000);

    return () => clearTimeout(timer);
  }, [next]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 40%, #0f0f0f 100%)',
        overflow: 'hidden',
        zIndex: 10000,
        pointerEvents: 'auto'
      }}
    >
      {/* Effet de lumière rose en arrière-plan */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(80px)',
        }}
      />
      
      {/* Particules roses animées */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `${15 + i * 8}px`,
            height: `${15 + i * 8}px`,
            borderRadius: '50%',
            background: `rgba(236, 72, 153, ${0.1 + i * 0.02})`,
            backdropFilter: 'blur(10px)',
            left: `${10 + i * 12}%`,
            top: `${8 + i * 10}%`,
            boxShadow: `0 0 20px rgba(236, 72, 153, ${0.3 + i * 0.1})`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Logo/Titre principal */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        <motion.h1
          animate={{
            scale: [1, 1.05, 1],
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            scale: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
            backgroundPosition: {
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #ec4899 0%, #db2777 40%, #f472b6 60%, #ec4899 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1.5rem',
            letterSpacing: '-0.03em',
            filter: 'drop-shadow(0 0 30px rgba(236, 72, 153, 0.5))',
          }}
        >
          Hair-Gonomie
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: 'rgba(236, 72, 153, 0.9)',
            fontWeight: 500,
            letterSpacing: '0.02em',
            marginBottom: 'clamp(2rem, 5vw, 3rem)',
          }}
        >
          Parcours guidé progressif
        </motion.div>

        {/* Description principale */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          style={{
            maxWidth: '600px',
            textAlign: 'center',
            marginBottom: 'clamp(2rem, 5vw, 3rem)',
            padding: '0 clamp(1rem, 4vw, 2rem)',
          }}
        >
          <motion.p
            style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              color: 'rgba(236, 72, 153, 0.85)',
              fontWeight: 400,
              lineHeight: 1.7,
              marginBottom: '1.5rem',
            }}
          >
            Une expérience d'apprentissage révolutionnaire qui vous guide étape par étape, 
            sans surcharge cognitive ni distractions inutiles.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            {[
              { icon: '✨', text: 'Navigation intelligente et adaptative' },
              { icon: '🎯', text: 'Parcours personnalisé selon vos besoins' },
              { icon: '🚀', text: 'Révélation progressive pour une meilleure compréhension' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 + index * 0.15, duration: 0.5 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontSize: 'clamp(0.85rem, 1.8vw, 1rem)',
                  color: 'rgba(236, 72, 153, 0.75)',
                  fontWeight: 400,
                }}
              >
                <span style={{ fontSize: '1.2em' }}>{feature.icon}</span>
                <span>{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Indicateur de chargement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          style={{
            marginTop: 'clamp(1.5rem, 4vw, 3rem)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <motion.p
            style={{
              fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)',
              color: 'rgba(236, 72, 153, 0.6)',
              fontWeight: 400,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            Chargement de votre parcours...
          </motion.p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'rgba(236, 72, 153, 0.8)',
                  boxShadow: '0 0 10px rgba(236, 72, 153, 0.5)',
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
