import { motion, AnimatePresence } from 'framer-motion';

const NextButton = ({ label, onClick, isVisible, delay = 0 }) => {
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 50, scale: 0.9 }}
          transition={{
            delay,
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
          }}
          whileHover={{
            scale: 1.08,
            x: -5,
            boxShadow: '0 20px 50px -10px rgba(236, 72, 153, 0.7)',
          }}
          whileTap={{ scale: 0.95, x: 0 }}
          onClick={onClick}
          style={{
            position: 'fixed',
            bottom: '3rem',
            right: '3rem',
            padding: '1.25rem 3rem',
            fontSize: '1rem',
            fontWeight: 600,
            border: 'none',
            borderRadius: '1rem',
            background: 'linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 15px 50px rgba(236, 72, 153, 0.6), 0 0 0 1px rgba(236, 72, 153, 0.3)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            letterSpacing: '0.02em',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
          }}
        >
          <span>{label}</span>
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
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
      )}
    </AnimatePresence>
  );
};

export default NextButton;
