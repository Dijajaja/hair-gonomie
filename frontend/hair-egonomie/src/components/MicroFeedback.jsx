import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

// Composant pour afficher des micro-feedbacks contextuels
const MicroFeedback = ({ type, message, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-dismiss après 4 secondes
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onDismiss) {
        setTimeout(onDismiss, 500);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  const getIcon = () => {
    switch (type) {
      case 'hint':
        return '💡';
      case 'encouragement':
        return '✨';
      case 'reminder':
        return '📌';
      case 'success':
        return '🎉';
      default:
        return '💬';
    }
  };

  const getColor = () => {
    switch (type) {
      case 'hint':
        return 'rgba(59, 130, 246, 0.2)'; // Blue
      case 'encouragement':
        return 'rgba(190, 24, 93, 0.2)'; // Pink
      case 'reminder':
        return 'rgba(245, 158, 11, 0.2)'; // Amber
      case 'success':
        return 'rgba(16, 185, 129, 0.2)'; // Green
      default:
        return 'rgba(190, 24, 93, 0.2)';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'fixed',
            bottom: '6rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(20, 20, 20, 0.9)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: `1px solid ${getColor()}`,
            borderRadius: '1rem',
            padding: '1rem 1.5rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            maxWidth: '500px',
            width: '90%',
          }}
        >
          <motion.span
            style={{ fontSize: '1.5rem' }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {getIcon()}
          </motion.span>
          <span
            style={{
              fontSize: '0.875rem',
              color: 'rgba(190, 24, 93, 0.9)',
              fontWeight: 500,
            }}
          >
            {message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MicroFeedback;

