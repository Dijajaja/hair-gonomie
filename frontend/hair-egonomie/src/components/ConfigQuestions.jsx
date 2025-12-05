import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TradingBackground from './TradingBackground';
import { 
  IconTrendingUp, IconUser, IconZap, IconWaves, IconZap as IconLightning,
  IconBot, IconBook, IconTarget, IconMap, IconLightbulb, IconFileText, IconEye
} from './icons';

// Mapping des icônes pour chaque option
const getIconForOption = (questionId, optionId) => {
  const iconMap = {
    level: {
      debutant: IconTrendingUp,
      intermediaire: IconUser,
      avance: IconZap,
    },
    intention: {
      comprendre: IconBook,
      voir: IconEye,
      pratiquer: IconTarget,
      explorer: IconMap,
    },
    rythme: {
      doucement: IconWaves,
      rapidement: IconLightning,
      auto: IconBot,
    },
    style: {
      exemples: IconLightbulb,
      explications: IconFileText,
      visuel: IconEye,
      pratique: IconTarget,
    },
  };
  return iconMap[questionId]?.[optionId] || IconLightbulb;
};

const CONFIG_QUESTIONS = [
  {
    id: 'level',
    question: "Quel est ton niveau aujourd'hui ?",
    options: [
      { id: 'debutant', label: 'Débutant', description: 'Je découvre l\'ergonomie' },
      { id: 'intermediaire', label: 'Intermédiaire', description: 'J\'ai des bases' },
      { id: 'avance', label: 'Avancé', description: 'Je maîtrise les concepts' },
    ],
    reason: 'Réduire l\'incertitude et filtrer le contenu futur',
  },
  {
    id: 'intention',
    question: "Qu'est-ce que tu veux faire maintenant ?",
    options: [
      { id: 'comprendre', label: 'Comprendre', description: 'Lecture, théorie' },
      { id: 'voir', label: 'Voir', description: 'Exemples visuels' },
      { id: 'pratiquer', label: 'Pratiquer', description: 'Exercice' },
      { id: 'explorer', label: 'Explorer', description: 'Parcours guidé' },
    ],
    reason: 'Oriente le parcours et déclenche l\'ordre des modules',
  },
  {
    id: 'rythme',
    question: 'Tu préfères avancer comment ?',
    options: [
      { id: 'doucement', label: 'Doucement', description: 'Mode fluide' },
      { id: 'rapidement', label: 'Rapidement', description: 'Mode rapide' },
      { id: 'auto', label: 'Laisser l\'application décider', description: 'Adaptation automatique' },
    ],
    reason: 'Applique la navigation fluide/rapide et détermine la durée des animations',
  },
  {
    id: 'style',
    question: 'Tu apprends mieux avec quoi ?',
    options: [
      { id: 'exemples', label: 'Des exemples', description: 'Cas concrets' },
      { id: 'explications', label: 'Des explications simples', description: 'Théorie claire' },
      { id: 'visuel', label: 'Format visuel', description: 'Exemples illustrés' },
      { id: 'pratique', label: 'De la pratique directe', description: 'Exercices immédiats' },
    ],
    reason: 'Change l\'ordre d\'affichage selon les préférences cognitives',
  },
];

const ConfigQuestions = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flippedCards, setFlippedCards] = useState({});
  const autoGuideTimerRef = useRef(null);

  const currentQuestion = CONFIG_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === CONFIG_QUESTIONS.length - 1;
  const progress = ((currentQuestionIndex + 1) / CONFIG_QUESTIONS.length) * 100;
  const hasAnsweredCurrentQuestion = answers[currentQuestion.id] !== undefined;

  // Guidage automatique si l'utilisateur ne répond pas
  useEffect(() => {
    // Réinitialiser le timer si l'utilisateur a déjà répondu
    if (hasAnsweredCurrentQuestion) {
      if (autoGuideTimerRef.current) {
        clearTimeout(autoGuideTimerRef.current);
        autoGuideTimerRef.current = null;
      }
      return;
    }

    // Calculer le délai selon le rythme choisi
    const rythme = answers.rythme;
    let delay = 9000; // 9 secondes par défaut
    if (rythme === 'doucement') {
      delay = 12000; // 12 secondes pour doucement
    } else if (rythme === 'rapidement') {
      delay = 6000; // 6 secondes pour rapidement
    }

    // Démarrer le guidage automatique
    autoGuideTimerRef.current = setTimeout(() => {
      // Sélectionner automatiquement la première option
      if (currentQuestion.options && currentQuestion.options.length > 0) {
        const firstOptionId = currentQuestion.options[0].id;
        const newAnswers = {
          ...answers,
          [currentQuestion.id]: firstOptionId,
        };
        setAnswers(newAnswers);

        if (isLastQuestion) {
          setTimeout(() => {
            onComplete(newAnswers);
          }, 500);
        } else {
          setTimeout(() => {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setFlippedCards({});
          }, 600);
        }
      }
    }, delay);

    return () => {
      if (autoGuideTimerRef.current) {
        clearTimeout(autoGuideTimerRef.current);
        autoGuideTimerRef.current = null;
      }
    };
  }, [currentQuestionIndex, hasAnsweredCurrentQuestion, currentQuestion, answers, isLastQuestion, onComplete]);

  const handleOptionSelect = (optionId) => {
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: optionId,
    };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Générer le parcours et compléter
      setTimeout(() => {
        onComplete(newAnswers);
      }, 500);
    } else {
      // Passer à la question suivante
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setFlippedCards({});
      }, 600);
    }
  };

  const handleCardFlip = (optionId) => {
    setFlippedCards((prev) => ({
      ...prev,
      [optionId]: !prev[optionId],
    }));
  };

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
      {/* Cartes flottantes */}
      <TradingBackground />

      {/* Overlay */}
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

      {/* Barre de progression */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #ec4899 0%, #db2777 100%)',
          zIndex: 1000,
          boxShadow: '0 2px 10px rgba(236, 72, 153, 0.3)',
        }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: '900px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* En-tête de la question */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                textAlign: 'center',
                marginBottom: '3rem',
              }}
            >
              <div
                style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '1rem',
                }}
              >
                Question {currentQuestionIndex + 1} sur {CONFIG_QUESTIONS.length}
              </div>
              <h1
                style={{
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontWeight: 700,
                  color: 'rgba(255, 255, 255, 0.95)',
                  marginBottom: '1rem',
                  letterSpacing: '-0.02em',
                  textShadow: '0 5px 20px rgba(236, 72, 153, 0.3)',
                }}
              >
                {currentQuestion.question}
              </h1>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.75)',
                  fontStyle: 'italic',
                  marginBottom: '1rem',
                }}
              >
                {currentQuestion.reason}
              </p>
              {/* Indicateur de guidage automatique */}
              {!hasAnsweredCurrentQuestion && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontSize: '0.75rem',
                    color: 'rgba(236, 72, 153, 0.8)',
                    fontStyle: 'italic',
                    marginTop: '0.5rem',
                  }}
                >
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ⏱️
                  </motion.span>
                  <span>
                    Sélection automatique dans quelques secondes...
                  </span>
                </motion.div>
              )}
            </motion.div>

            {/* Options avec effet flip */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem',
              }}
            >
              {currentQuestion.options.map((option, index) => {
                const IconComponent = getIconForOption(currentQuestion.id, option.id);
                return (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  style={{ perspective: '1000px' }}
                  onMouseEnter={() => handleCardFlip(option.id)}
                  onMouseLeave={() => handleCardFlip(option.id)}
                  onClick={() => handleOptionSelect(option.id)}
                >
                  <motion.div
                    animate={{
                      rotateY: flippedCards[option.id] ? 180 : 0,
                      scale: flippedCards[option.id] ? 1.05 : 1,
                    }}
                    transition={{ 
                      duration: 0.7, 
                      ease: [0.4, 0, 0.2, 1],
                      scale: { duration: 0.3 }
                    }}
                    style={{
                      width: '100%',
                      height: '220px',
                      position: 'relative',
                      transformStyle: 'preserve-3d',
                      cursor: 'pointer',
                      perspective: '1000px',
                    }}
                  >
                    {/* Face avant */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        background: 'rgba(20, 20, 20, 0.6)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        border: '2px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '1.5rem',
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                      }}
                      whileHover={{
                        borderColor: 'rgba(255, 255, 255, 0.35)',
                        boxShadow: '0 12px 40px rgba(255, 255, 255, 0.1)',
                        scale: 1.05,
                      }}
                    >
                      <div
                        style={{
                          marginBottom: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {IconComponent && <IconComponent size={48} color="rgba(255, 255, 255, 0.9)" />}
                      </div>
                      <h3
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 600,
                          color: 'rgba(255, 255, 255, 0.95)',
                          marginBottom: '0.5rem',
                          textAlign: 'center',
                        }}
                      >
                        {option.label}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.875rem',
                          color: 'rgba(255, 255, 255, 0.75)',
                          textAlign: 'center',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {option.description}
                      </p>
                      <div
                        style={{
                          fontSize: '0.75rem',
                          color: 'rgba(255, 255, 255, 0.6)',
                          fontStyle: 'italic',
                          marginTop: '0.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                        }}
                      >
                        <span>💡</span>
                        <span>Survolez pour voir la logique</span>
                      </div>
                    </motion.div>

                    {/* Face arrière (logique) */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        background: 'rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        border: '2px solid rgba(255, 255, 255, 0.25)',
                        borderRadius: '1.5rem',
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 12px 40px rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '2rem',
                          marginBottom: '1rem',
                        }}
                      >
                        💭
                      </div>
                      <p
                        style={{
                          fontSize: '0.875rem',
                          color: 'rgba(255, 255, 255, 0.9)',
                          textAlign: 'center',
                          lineHeight: 1.6,
                        }}
                      >
                        {getLogicDescription(currentQuestion.id, option.id)}
                      </p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Fonction pour obtenir la description logique selon la question et l'option
const getLogicDescription = (questionId, optionId) => {
  const logicMap = {
    level: {
      debutant: 'Contenu simplifié, pas de surcharge cognitive, progression douce',
      intermediaire: 'Contenu équilibré, quelques défis, approfondissement possible',
      avance: 'Contenu approfondi, concepts avancés, défis stimulants',
    },
    intention: {
      comprendre: 'Ordre : Article → Exemples → Exercice',
      voir: 'Ordre : Exemples → Mini explication → Exercice',
      pratiquer: 'Ordre : Exercice → Article → Exemple',
      explorer: 'Mélange progressif selon votre niveau',
    },
    rythme: {
      doucement: 'Transitions lentes, un bouton à la fois, révélation progressive',
      rapidement: 'Transitions rapides, plusieurs options visibles, navigation fluide',
      auto: 'L\'application adapte la vitesse selon votre comportement',
    },
    style: {
      exemples: 'Priorité aux cas concrets et démonstrations pratiques',
      explications: 'Priorité aux articles et résumés théoriques clairs',
      visuel: 'Priorité aux exemples visuels et illustrations',
      pratique: 'Priorité aux exercices interactifs immédiats',
    },
  };

  return logicMap[questionId]?.[optionId] || 'Cette option influencera votre parcours personnalisé';
};

export default ConfigQuestions;

