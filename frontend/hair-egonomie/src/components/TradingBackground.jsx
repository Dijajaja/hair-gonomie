import React from 'react';
import { motion } from 'framer-motion';

const TradingBackground = () => {
  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 30%, #1a1a1a 70%, #0a0a0a 100%)',
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      {/* 1. Grille animée style trading - Plus dynamique */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.15, 0.25, 0.15],
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ 
          opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          backgroundPosition: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(190, 24, 93, 0.25) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(190, 24, 93, 0.25) 1px, transparent 1px),
            linear-gradient(rgba(159, 18, 57, 0.1) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(159, 18, 57, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px, 80px 80px, 20px 20px, 20px 20px',
          backgroundPosition: '0 0, 0 0, 0 0, 0 0',
          maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 100%)',
        }}
      />

      {/* 2. Lignes de connexion animées (style trading) */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          style={{
            position: 'absolute',
            width: '2px',
            height: '100%',
            background: `linear-gradient(180deg, 
              transparent 0%, 
              rgba(190, 24, 93, ${0.1 + i * 0.05}) ${20 + i * 10}%, 
              rgba(190, 24, 93, ${0.15 + i * 0.05}) ${50 + i * 5}%, 
              transparent 100%
            )`,
            left: `${15 + i * 15}%`,
            top: 0,
            filter: 'blur(1px)',
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* 3. Particules flottantes animées (style trading) */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          style={{
            position: 'absolute',
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            borderRadius: '50%',
            background: `rgba(190, 24, 93, ${0.3 + (i % 3) * 0.2})`,
            left: `${(i * 7) % 100}%`,
            top: `${(i * 11) % 100}%`,
            boxShadow: `0 0 ${4 + i * 2}px rgba(190, 24, 93, 0.5)`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, (i % 2 === 0 ? 1 : -1) * 50, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 8 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}

      {/* 4. Les Orbes Lumineux Roses - Animations ultra-fluides et dynamiques */}
      
      {/* Orbe Rose Principal - Haut gauche */}
      <motion.div
        style={{
          position: 'absolute',
          top: '5%',
          left: '10%',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          mixBlendMode: 'screen',
          filter: 'blur(120px)',
          background: 'radial-gradient(circle, rgba(190, 24, 93, 0.7) 0%, rgba(159, 18, 57, 0.4) 35%, rgba(0,0,0,0) 65%)',
        }}
        animate={{
          x: [0, 80, -50, 40, 0],
          y: [0, -60, 50, -30, 0],
          scale: [1, 1.2, 0.9, 1.15, 1],
          opacity: [0.4, 0.55, 0.45, 0.5, 0.4],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      />

      {/* Orbe Rose Foncé - Bas droite */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '15%',
          width: '900px',
          height: '900px',
          borderRadius: '50%',
          mixBlendMode: 'screen',
          filter: 'blur(130px)',
          background: 'radial-gradient(circle, rgba(159, 18, 57, 0.6) 0%, rgba(190, 24, 93, 0.35) 35%, rgba(0,0,0,0) 65%)',
        }}
        animate={{
          x: [0, -90, 60, -50, 0],
          y: [0, 70, -55, 40, 0],
          scale: [1, 0.85, 1.25, 0.9, 1],
          opacity: [0.35, 0.5, 0.4, 0.45, 0.35],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 4,
        }}
      />

      {/* Orbe Rose Clair - Centre */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1000px',
          height: '800px',
          borderRadius: '50%',
          mixBlendMode: 'screen',
          filter: 'blur(140px)',
          background: 'radial-gradient(circle, rgba(190, 24, 93, 0.5) 0%, rgba(190, 24, 93, 0.3) 35%, rgba(0,0,0,0) 65%)',
        }}
        animate={{
          opacity: [0.3, 0.45, 0.35, 0.4, 0.3],
          scale: [1, 1.15, 0.92, 1.08, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 2,
        }}
      />

      {/* Orbe Rose Subtile - Milieu gauche */}
      <motion.div
        style={{
          position: 'absolute',
          top: '55%',
          left: '2%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          mixBlendMode: 'screen',
          filter: 'blur(110px)',
          background: 'radial-gradient(circle, rgba(219, 39, 119, 0.45) 0%, rgba(190, 24, 93, 0.25) 35%, rgba(0,0,0,0) 65%)',
        }}
        animate={{
          x: [0, 45, -30, 25, 0],
          y: [0, -35, 30, -20, 0],
          opacity: [0.28, 0.4, 0.32, 0.36, 0.28],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 6,
        }}
      />

      {/* Orbe Rose Subtile - Haut droite */}
      <motion.div
        style={{
          position: 'absolute',
          top: '15%',
          right: '8%',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          mixBlendMode: 'screen',
          filter: 'blur(115px)',
          background: 'radial-gradient(circle, rgba(190, 24, 93, 0.4) 0%, rgba(159, 18, 57, 0.22) 35%, rgba(0,0,0,0) 65%)',
        }}
        animate={{
          x: [0, -50, 35, -25, 0],
          y: [0, 40, -30, 25, 0],
          opacity: [0.25, 0.38, 0.3, 0.35, 0.25],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 8,
        }}
      />

      {/* 5. Overlay de profondeur avec gradients animés */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ 
          opacity: { duration: 4 },
          backgroundPosition: { duration: 15, repeat: Infinity, ease: "linear" }
        }}
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(190, 24, 93, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(159, 18, 57, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(190, 24, 93, 0.1) 0%, transparent 60%)
          `,
          backgroundSize: '200% 200%',
          pointerEvents: 'none',
        }}
      />

      {/* 6. Effets de flux animés (style trading) */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`flow-${i}`}
          style={{
            position: 'absolute',
            width: '300px',
            height: '2px',
            background: `linear-gradient(90deg, 
              transparent 0%, 
              rgba(190, 24, 93, ${0.3 + i * 0.1}) 50%, 
              transparent 100%
            )`,
            left: `${20 + i * 25}%`,
            top: `${30 + i * 20}%`,
            filter: 'blur(2px)',
            transform: `rotate(${-45 + i * 15}deg)`,
          }}
          animate={{
            x: [0, 200, 0],
            y: [0, 100, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 6 + i * 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}

      {/* 7. Points de connexion animés */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`connection-${i}`}
          style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: 'rgba(190, 24, 93, 0.8)',
            left: `${10 + (i * 12) % 80}%`,
            top: `${15 + (i * 15) % 70}%`,
            boxShadow: '0 0 8px rgba(190, 24, 93, 0.8)',
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.5, 1, 0.5],
            boxShadow: [
              '0 0 8px rgba(190, 24, 93, 0.8)',
              '0 0 20px rgba(190, 24, 93, 1)',
              '0 0 8px rgba(190, 24, 93, 0.8)',
            ],
          }}
          transition={{
            duration: 3 + i * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
};

export default TradingBackground;

