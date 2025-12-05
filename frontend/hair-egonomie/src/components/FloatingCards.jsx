import { motion } from 'framer-motion';

const FloatingCards = () => {
  // Configuration des cartes - couloirs séparés pour éviter les croisements
  // Couloir 1 : Haut de la page - mouvement de gauche à droite uniquement
  const topLaneCards = [
    {
      id: 1,
      width: 300,
      height: 190,
      y: '10%',      // Couloir haut
      rotation: -12,
      delay: 0,
      depth: 1,
      speed: 12,
      direction: 'left-to-right',
    },
    {
      id: 2,
      width: 280,
      height: 175,
      y: '10%',      // Même couloir haut
      rotation: 18,
      delay: 1.5,
      depth: 2,
      speed: 14,
      direction: 'left-to-right',
    },
    {
      id: 3,
      width: 260,
      height: 165,
      y: '10%',      // Même couloir haut
      rotation: -8,
      delay: 3,
      depth: 3,
      speed: 13,
      direction: 'left-to-right',
    },
  ];

  // Couloir 2 : Milieu-haut - mouvement de droite à gauche uniquement
  const middleTopLaneCards = [
    {
      id: 4,
      width: 290,
      height: 180,
      y: '30%',      // Couloir milieu-haut
      rotation: 22,
      delay: 0.5,
      depth: 4,
      speed: 15,
      direction: 'right-to-left',
    },
    {
      id: 5,
      width: 275,
      height: 172,
      y: '30%',      // Même couloir
      rotation: -15,
      delay: 2,
      depth: 5,
      speed: 13,
      direction: 'right-to-left',
    },
    {
      id: 6,
      width: 285,
      height: 178,
      y: '30%',      // Même couloir
      rotation: 20,
      delay: 3.5,
      depth: 6,
      speed: 14,
      direction: 'right-to-left',
    },
  ];

  // Couloir 3 : Centre - mouvement de gauche à droite uniquement
  const centerLaneCards = [
    {
      id: 7,
      width: 270,
      height: 170,
      y: '50%',      // Couloir centre
      rotation: -10,
      delay: 1,
      depth: 7,
      speed: 12,
      direction: 'left-to-right',
    },
    {
      id: 8,
      width: 295,
      height: 185,
      y: '50%',      // Même couloir
      rotation: 25,
      delay: 2.5,
      depth: 8,
      speed: 16,
      direction: 'left-to-right',
    },
    {
      id: 9,
      width: 265,
      height: 168,
      y: '50%',      // Même couloir
      rotation: -18,
      delay: 4,
      depth: 9,
      speed: 13,
      direction: 'left-to-right',
    },
  ];

  // Couloir 4 : Milieu-bas - mouvement de droite à gauche uniquement
  const middleBottomLaneCards = [
    {
      id: 10,
      width: 280,
      height: 175,
      y: '70%',      // Couloir milieu-bas
      rotation: 15,
      delay: 0.8,
      depth: 10,
      speed: 14,
      direction: 'right-to-left',
    },
    {
      id: 11,
      width: 290,
      height: 182,
      y: '70%',      // Même couloir
      rotation: -22,
      delay: 2.3,
      depth: 11,
      speed: 15,
      direction: 'right-to-left',
    },
    {
      id: 12,
      width: 275,
      height: 172,
      y: '70%',      // Même couloir
      rotation: 12,
      delay: 3.8,
      depth: 12,
      speed: 13,
      direction: 'right-to-left',
    },
  ];

  // Couloir 5 : Bas - mouvement de gauche à droite uniquement
  const bottomLaneCards = [
    {
      id: 13,
      width: 285,
      height: 178,
      y: '90%',      // Couloir bas
      rotation: -20,
      delay: 1.2,
      depth: 13,
      speed: 12,
      direction: 'left-to-right',
    },
    {
      id: 14,
      width: 270,
      height: 170,
      y: '90%',      // Même couloir
      rotation: 18,
      delay: 2.7,
      depth: 14,
      speed: 14,
      direction: 'left-to-right',
    },
    {
      id: 15,
      width: 295,
      height: 185,
      y: '90%',      // Même couloir
      rotation: -15,
      delay: 4.2,
      depth: 15,
      speed: 13,
      direction: 'left-to-right',
    },
  ];

  // Combiner toutes les cartes par couloirs
  const cards = [
    ...topLaneCards,
    ...middleTopLaneCards,
    ...centerLaneCards,
    ...middleBottomLaneCards,
    ...bottomLaneCards,
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {cards.map((card) => {
        // Opacité très augmentée pour meilleure visibilité
        const baseOpacity = 0.7 - (card.depth - 1) * 0.03;
        const borderOpacity = 0.9 - (card.depth - 1) * 0.03;
        const glowOpacity = 0.65 - (card.depth - 1) * 0.03;
        
        const finalY = parseFloat(card.y);
        const travelDistance = 200;
        
        // Calculer les positions selon la direction
        let startX, endX;
        if (card.direction === 'right-to-left') {
          startX = 100 + travelDistance;
          endX = -travelDistance;
        } else {
          startX = -travelDistance;
          endX = 100 + travelDistance;
        }
        
        return (
          <motion.div
            key={card.id}
            initial={{
              opacity: 0,
              scale: 0.8,
              x: `${startX}%`,
              y: `${finalY}%`,
              rotate: card.rotation - 8,
            }}
            animate={{
              opacity: [
                0,
                baseOpacity * 0.8,
                baseOpacity * 1.2,
                baseOpacity * 1.2,
                baseOpacity * 0.8,
                0,
              ],
              scale: [
                0.8,
                0.95,
                1.05,
                1.05,
                0.95,
                0.8,
              ],
              x: card.direction === 'right-to-left' 
                ? [
                    `${startX}%`,
                    `${95}%`,
                    `${50}%`,
                    `${5}%`,
                    `${-travelDistance * 0.5}%`,
                    `${endX}%`,
                  ]
                : [
                    `${startX}%`,
                    `${5}%`,
                    `${50}%`,
                    `${95}%`,
                    `${100 + travelDistance * 0.5}%`,
                    `${endX}%`,
                  ],
              y: [
                `${finalY}%`,
                `${finalY}%`,  // Reste dans le même couloir
                `${finalY}%`,
                `${finalY}%`,
                `${finalY}%`,
                `${finalY}%`,
              ],
              rotate: [
                card.rotation - 8,
                card.rotation - 1,
                card.rotation + 1,
                card.rotation,
                card.rotation - 1,
                card.rotation - 8,
              ],
            }}
            transition={{
              opacity: {
                times: [0, 0.1, 0.25, 0.75, 0.9, 1],
                duration: card.speed,
                ease: [0.4, 0, 0.2, 1],
                repeat: Infinity,
                repeatDelay: card.delay,
              },
              scale: {
                times: [0, 0.1, 0.25, 0.75, 0.9, 1],
                duration: card.speed,
                ease: [0.4, 0, 0.2, 1],
                repeat: Infinity,
                repeatDelay: card.delay,
              },
              x: {
                times: [0, 0.1, 0.25, 0.75, 0.9, 1],
                duration: card.speed,
                ease: [0.25, 0.1, 0.25, 1],
                repeat: Infinity,
                repeatDelay: card.delay,
              },
              y: {
                times: [0, 0.1, 0.25, 0.75, 0.9, 1],
                duration: card.speed * 0.8,
                ease: [0.4, 0, 0.6, 1],
                repeat: Infinity,
                repeatDelay: card.delay,
              },
              rotate: {
                times: [0, 0.1, 0.25, 0.75, 0.9, 1],
                duration: card.speed * 0.6,
                ease: [0.4, 0, 0.6, 1],
                repeat: Infinity,
                repeatDelay: card.delay,
              },
              delay: card.delay,
            }}
            style={{
              position: 'absolute',
              width: `${card.width}px`,
              height: `${card.height}px`,
              background: `linear-gradient(135deg, 
                rgba(236, 72, 153, ${baseOpacity}) 0%, 
                rgba(219, 39, 119, ${baseOpacity * 0.95}) 25%,
                rgba(236, 72, 153, ${baseOpacity * 0.75}) 50%,
                rgba(219, 39, 119, ${baseOpacity * 0.9}) 75%,
                rgba(236, 72, 153, ${baseOpacity}) 100%)`,
              border: `2px solid rgba(236, 72, 153, ${borderOpacity})`,
              borderRadius: '28px',
              backdropFilter: 'blur(25px) saturate(160%)',
              WebkitBackdropFilter: 'blur(25px) saturate(160%)',
              boxShadow: `
                0 25px 70px rgba(236, 72, 153, ${glowOpacity}),
                0 12px 35px rgba(236, 72, 153, ${glowOpacity * 0.8}),
                0 0 0 1px rgba(236, 72, 153, ${borderOpacity * 0.5}),
                inset 0 3px 10px rgba(255, 255, 255, 0.35),
                inset 0 -3px 10px rgba(0, 0, 0, 0.5)
              `,
              transform: 'translate(-50%, -50%)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Effet de brillance interne */}
            <motion.div
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [0.7, 1.4, 0.7],
                x: [0, 20, 0],
                y: [0, 15, 0],
              }}
              transition={{
                duration: 2 + card.id * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                top: '10%',
                left: '10%',
                width: '80%',
                height: '80%',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(236, 72, 153, 0.3) 40%, transparent 75%)',
                borderRadius: '50%',
                filter: 'blur(45px)',
                pointerEvents: 'none',
              }}
            />
            
            {/* Reflet subtil */}
            <motion.div
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 2.5 + card.id * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                top: '10%',
                left: '10%',
                right: '10%',
                height: '40%',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, transparent 100%)',
                borderRadius: '28px 28px 0 0',
                pointerEvents: 'none',
              }}
            />
            
            {/* Particules flottantes */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -30, 0],
                  x: [0, 20, 0],
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2.5 + i * 0.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.5,
                }}
                style={{
                  position: 'absolute',
                  width: `${15 + i * 5}px`,
                  height: `${15 + i * 5}px`,
                  borderRadius: '50%',
                  background: `rgba(236, 72, 153, ${0.4 + i * 0.1})`,
                  top: `${20 + i * 25}%`,
                  left: `${20 + i * 20}%`,
                  filter: 'blur(8px)',
                  pointerEvents: 'none',
                }}
              />
            ))}
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingCards;
