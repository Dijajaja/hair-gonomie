// Variantes d'animations réutilisables pour Framer Motion
// Optimisées pour fluidité et performance

export const fadeInOut = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
};

export const slideUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
};

export const slideFromRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
};

export const pulse = {
  animate: {
    scale: [1, 1.08, 1],
    opacity: [1, 0.9, 1]
  },
  transition: {
    duration: 2.5,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

export const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.2, ease: "easeOut" }
};

export const buttonTap = {
  scale: 0.95,
  transition: { duration: 0.1 }
};

