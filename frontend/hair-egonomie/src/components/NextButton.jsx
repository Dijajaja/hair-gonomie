import { motion } from 'framer-motion';
import { scaleIn } from '../animations/variants';

const NextButton = ({ label, onClick, isVisible, delay = 0 }) => {
  if (!isVisible) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ 
        delay, 
        duration: 0.5, 
        ease: "easeOut" 
      }}
      whileHover={{ 
        scale: 1.08,
        y: -3,
        boxShadow: "0 20px 40px rgba(102, 126, 234, 0.5)"
      }}
      whileTap={{ scale: 0.95, y: 0 }}
      transition={{
        delay,
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }}
      onClick={onClick}
      style={{
        padding: '1.5rem 3rem',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        cursor: 'pointer',
        margin: '1rem',
        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
        position: 'fixed',
        bottom: '3rem',
        left: '50%',
        transform: 'translateX(-50%)'
      }}
    >
      {label}
    </motion.button>
  );
};

export default NextButton;

