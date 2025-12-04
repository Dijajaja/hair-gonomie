import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { pulse, fadeInOut, slideUp } from '../animations/variants';

const SplashScreen = ({ next }) => {
  useEffect(() => {
    // Déclencher la transition après 2.5 secondes pour laisser le temps à l'animation
    const timer = setTimeout(() => {
      next();
    }, 2500);

    return () => clearTimeout(timer);
  }, [next]);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeInOut}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Effet de fond animé */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          filter: 'blur(60px)'
        }}
      />

      <motion.div
        variants={pulse}
        animate="animate"
        initial="initial"
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          letterSpacing: '-0.02em'
        }}
      >
        Hair-Gonomie
      </motion.div>
      
      <motion.p
        variants={slideUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.8, duration: 0.6 }}
        style={{
          fontSize: 'clamp(1rem, 2vw, 1.3rem)',
          opacity: 0.95,
          position: 'relative',
          zIndex: 1,
          fontWeight: 300
        }}
      >
        Parcours guidé progressif
      </motion.p>
    </motion.div>
  );
};

export default SplashScreen;

