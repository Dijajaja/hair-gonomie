import { motion, AnimatePresence } from 'framer-motion';
import { slideUp, staggerContainer } from '../animations/variants';

const ModeSelector = ({ onSelect }) => {
  const modes = ['Découvrir', 'Apprendre', 'S\'exercer'];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideUp}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
        background: '#f5f5f5'
      }}
    >
      <motion.h1
        variants={slideUp}
        style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          marginBottom: '4rem',
          color: '#333',
          textAlign: 'center'
        }}
      >
        Que veux-tu faire aujourd'hui ?
      </motion.h1>
      
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          width: '100%',
          maxWidth: '400px'
        }}
      >
        <AnimatePresence>
          {modes.map((mode, index) => (
            <motion.button
              key={mode}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ 
                delay: index * 0.12,
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1]
              }}
              whileHover={{ 
                scale: 1.05,
                y: -2,
                boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
                borderColor: "#764ba2"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(mode)}
              style={{
                padding: '1.5rem 2rem',
                fontSize: '1.2rem',
                fontWeight: '600',
                border: '2px solid #667eea',
                borderRadius: '12px',
                background: 'white',
                color: '#667eea',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.1)'
              }}
            >
              {mode}
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default ModeSelector;

