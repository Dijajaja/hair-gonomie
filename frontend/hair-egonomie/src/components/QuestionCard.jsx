import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TradingBackground from './TradingBackground';

// Questions de démonstration selon le mode sélectionné avec réponses correctes
const DEMO_QUESTIONS = {
  "Découvrir": [
    {
      question: "Qu'est-ce que l'ergonomie dans le design d'interface ?",
      correctAnswer: "L'ergonomie dans le design d'interface consiste à adapter l'environnement numérique aux capacités et limites humaines pour créer des interfaces intuitives, efficaces et agréables à utiliser."
    },
    {
      question: "Pourquoi la révélation progressive améliore-t-elle l'expérience utilisateur ?",
      correctAnswer: "La révélation progressive réduit la surcharge cognitive en présentant l'information de manière séquentielle, ne montrant que ce qui est nécessaire à chaque étape, ce qui améliore la compréhension et maintient l'engagement."
    },
    {
      question: "Comment réduire la charge cognitive dans une interface ?",
      correctAnswer: "On réduit la charge cognitive en présentant une seule action à la fois, en utilisant le chunking (regroupement logique), en éliminant les distractions et en fournissant un feedback immédiat."
    },
    {
      question: "Quels sont les principes clés du design minimaliste ?",
      correctAnswer: "Les principes clés du design minimaliste sont la simplicité, la clarté, la fonctionnalité, l'élimination des éléments non essentiels et l'accent mis sur l'essentiel."
    }
  ],
  "Apprendre": [
    {
      question: "Quelle est la différence entre UX et UI design ?",
      correctAnswer: "UX (User Experience) design se concentre sur l'expérience globale de l'utilisateur et la résolution de problèmes, tandis que UI (User Interface) design se concentre sur l'apparence visuelle et l'interaction avec l'interface."
    },
    {
      question: "Comment le parcours guidé réduit-il la friction utilisateur ?",
      correctAnswer: "Le parcours guidé réduit la friction en transformant des tâches complexes en séquences simples et linéaires, réduisant ainsi la charge cognitive et émotionnelle."
    },
    {
      question: "Pourquoi limiter les choix à une seule action à la fois ?",
      correctAnswer: "Limiter les choix à une seule action à la fois réduit la surcharge cognitive, évite la paralysie du choix et guide naturellement l'utilisateur vers l'action suivante."
    },
    {
      question: "Quels sont les bénéfices d'une navigation progressive ?",
      correctAnswer: "Les bénéfices d'une navigation progressive incluent une guidance claire, une réduction du stress, une meilleure compréhension étape par étape et un sentiment de contrôle."
    }
  ],
  "S'exercer": [
    {
      question: "Testez cette interface : que ressentez-vous pendant la navigation ?",
      correctAnswer: "Vous devriez ressentir de la fluidité et de la clarté grâce à la révélation progressive et aux animations guidantes qui réduisent la charge cognitive."
    },
    {
      question: "Identifiez les micro-interactions dans cette application.",
      correctAnswer: "Les micro-interactions incluent les animations de transition, les effets de survol, les feedbacks visuels lors des clics, et les animations qui guident l'attention."
    },
    {
      question: "Analysez comment l'animation guide votre attention.",
      correctAnswer: "Les animations guident l'attention en créant un flux visuel naturel, en indiquant l'importance des éléments, et en fournissant un feedback immédiat sur les actions."
    },
    {
      question: "Évaluez la fluidité de ce parcours guidé.",
      correctAnswer: "Ce parcours guidé devrait être perçu comme fluide et intuitif grâce à la révélation progressive, aux transitions douces et à la présentation d'une seule action à la fois."
    }
  ]
};

// Délai d'avance automatique (ms) - défini avant utilisation
const AUTO_ADVANCE_DELAY = 5000; // 5 secondes par question

const QuestionCard = ({ mode, onComplete }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [answerFeedback, setAnswerFeedback] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(AUTO_ADVANCE_DELAY);
  const autoAdvanceTimerRef = useRef(null);
  const countdownTimerRef = useRef(null);

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      
      try {
        const res = await fetch("http://127.0.0.1:8000/api/questions/");
        if (res.ok) {
          const data = await res.json();
          if (data.questions && data.questions.length > 0) {
            // Si le backend retourne des questions simples (strings), les convertir en format avec réponses
            const formattedQuestions = data.questions.map(q => {
              if (typeof q === 'string') {
                return {
                  question: q,
                  correctAnswer: "Réponse correcte à définir"
                };
              }
              return q;
            });
            setQuestions(formattedQuestions);
            setIsLoading(false);
            return;
          }
        }
      } catch {
        // Backend non disponible - continuer avec les questions de démo
        console.log("Backend non disponible, utilisation des questions de démonstration");
      }
      
      // Utiliser les questions de démo selon le mode
      // Normaliser le mode pour correspondre aux clés de DEMO_QUESTIONS
      let normalizedMode = mode;
      if (mode && typeof mode === 'string') {
        // Correspondance flexible pour les modes
        const modeLower = mode.toLowerCase();
        if (modeLower.includes("découvrir") || modeLower.includes("decouvrir")) {
          normalizedMode = "Découvrir";
        } else if (modeLower.includes("apprendre")) {
          normalizedMode = "Apprendre";
        } else if (modeLower.includes("exercer") || modeLower.includes("s'exercer")) {
          normalizedMode = "S'exercer";
        } else if (mode === "Découvrir" || mode === "Apprendre" || mode === "S'exercer") {
          // Mode déjà correct
          normalizedMode = mode;
        } else {
          // Mode non reconnu, utiliser "Découvrir" par défaut
          normalizedMode = "Découvrir";
        }
      } else {
        // Mode null ou undefined, utiliser "Découvrir" par défaut
        normalizedMode = "Découvrir";
      }
      
      // Utiliser le mode normalisé ou "Découvrir" par défaut
      const demoQuestions = DEMO_QUESTIONS[normalizedMode] || DEMO_QUESTIONS["Découvrir"];
      console.log("Utilisation des questions de démonstration pour le mode:", normalizedMode);
      setQuestions(demoQuestions);
      setIsLoading(false);
    };

    loadQuestions();
  }, [mode]);

  const handleNext = useCallback(() => {
    setCurrentAnswer('');
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < questions.length - 1) {
        return prevIndex + 1;
      } else {
        // Dernière question terminée
        if (onComplete) {
          onComplete({
            total: questions.length,
            completed: questions.length,
          });
        }
        return prevIndex;
      }
    });
  }, [questions.length, onComplete]);

  // Timer automatique pour avancer les questions
  useEffect(() => {
    if (questions.length === 0 || isLoading) return;

    // Nettoyer les timers précédents
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
    }

    // Si c'est la dernière question, afficher pendant un délai puis compléter
    if (currentQuestionIndex >= questions.length - 1) {
      // Réinitialiser le compte à rebours pour la dernière question de manière asynchrone
      setTimeout(() => {
        setTimeRemaining(AUTO_ADVANCE_DELAY);
      }, 0);
      
      // Compte à rebours visuel pour la dernière question
      countdownTimerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 100) {
            return 0;
          }
          return prev - 100;
        });
      }, 100);

      // Attendre le délai avant de compléter (pour que la dernière question soit visible)
      autoAdvanceTimerRef.current = setTimeout(() => {
        if (onComplete) {
          onComplete({
            total: questions.length,
            completed: questions.length,
          });
        }
      }, AUTO_ADVANCE_DELAY);

      return () => {
        if (autoAdvanceTimerRef.current) {
          clearTimeout(autoAdvanceTimerRef.current);
          autoAdvanceTimerRef.current = null;
        }
        if (countdownTimerRef.current) {
          clearInterval(countdownTimerRef.current);
          countdownTimerRef.current = null;
        }
      };
    }

    // Réinitialiser le compte à rebours (asynchrone pour éviter l'avertissement)
    setTimeout(() => {
      setTimeRemaining(AUTO_ADVANCE_DELAY);
    }, 0);

    // Compte à rebours visuel
    countdownTimerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 100) {
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    // Créer un nouveau timer pour la question suivante
    autoAdvanceTimerRef.current = setTimeout(() => {
      handleNext();
    }, AUTO_ADVANCE_DELAY);

    // Nettoyer les timers au démontage ou changement de question
    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
        autoAdvanceTimerRef.current = null;
      }
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
        countdownTimerRef.current = null;
      }
    };
  }, [currentQuestionIndex, questions.length, isLoading, handleNext, onComplete]);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)',
        }}
      >
        <motion.div
          style={{
            textAlign: 'center',
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              fontSize: '3rem',
              marginBottom: '1.5rem',
            }}
          >
            ✨
          </motion.div>
          <motion.p
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              fontSize: '1.25rem',
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 500,
            }}
          >
            Chargement des questions...
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

  if (questions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          fontSize: '1.25rem',
          color: 'rgba(255, 255, 255, 0.8)',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)',
        }}
      >
        Aucune question disponible
      </motion.div>
    );
  }

  // Fonction pour vérifier si la réponse est correcte (comparaison flexible)
  const checkAnswer = (userAnswer, correctAnswer) => {
    if (!userAnswer || !correctAnswer) return false;
    const userLower = userAnswer.toLowerCase().trim();
    const correctLower = correctAnswer.toLowerCase().trim();
    
    // Vérifier si la réponse contient des mots-clés importants de la bonne réponse
    const correctKeywords = correctLower.split(' ').filter(word => word.length > 4);
    const matchingKeywords = correctKeywords.filter(keyword => userLower.includes(keyword));
    
    // Si au moins 30% des mots-clés correspondent, considérer comme correct
    return matchingKeywords.length >= correctKeywords.length * 0.3 || 
           userLower.includes(correctLower.substring(0, Math.min(20, correctLower.length)));
  };

  const handleSubmitAnswer = () => {
    if (!currentAnswer.trim()) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = typeof currentQuestion === 'object' && currentQuestion?.correctAnswer
      ? currentQuestion.correctAnswer
      : '';
    
    const isCorrect = checkAnswer(currentAnswer, correctAnswer);
    
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: currentAnswer
    }));
    
    setAnswerFeedback(prev => ({
      ...prev,
      [currentQuestionIndex]: {
        isCorrect,
        correctAnswer
      }
    }));
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const currentQuestionText = typeof currentQuestion === 'string' 
    ? currentQuestion 
    : currentQuestion?.question || '';
  const feedback = answerFeedback[currentQuestionIndex];
  const hasAnswered = userAnswers[currentQuestionIndex] !== undefined;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1rem, 4vw, 2rem)',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Cartes flottantes en arrière-plan */}
      <TradingBackground />
      
      {/* Overlay élégant */}
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
      
      {/* Overlay sombre pour mieux voir les cartes */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.1)',
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
          height: '3px',
          background: 'linear-gradient(90deg, #ec4899 0%, #db2777 50%, #be185d 100%)',
          zIndex: 1000,
          boxShadow: '0 2px 20px rgba(236, 72, 153, 0.5)',
        }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: 'min(700px, 95vw)',
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
            style={{
              background: 'rgba(20, 20, 20, 0.7)',
              backdropFilter: 'blur(30px) saturate(180%)',
              WebkitBackdropFilter: 'blur(30px) saturate(180%)',
              borderRadius: 'clamp(1rem, 4vw, 2rem)',
              padding: 'clamp(1.5rem, 5vw, 3rem)',
              boxShadow: `
                0 20px 60px rgba(0, 0, 0, 0.5),
                0 8px 32px rgba(236, 72, 153, 0.2),
                inset 0 1px 0 rgba(236, 72, 153, 0.15)
              `,
              border: '1px solid rgba(236, 72, 153, 0.2)',
            }}
          >
            {/* Indicateur de question */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: 'clamp(1rem, 3vw, 2rem)',
              }}
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                  color: 'rgba(236, 72, 153, 0.7)',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Question {currentQuestionIndex + 1} sur {questions.length}
              </motion.span>
              
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  display: 'flex',
                  gap: 'clamp(0.25rem, 1vw, 0.5rem)',
                  flexWrap: 'wrap',
                }}
              >
                {questions.map((_, index) => (
                  <div
                    key={index}
                    style={{
                      width: 'clamp(6px, 1.5vw, 8px)',
                      height: 'clamp(6px, 1.5vw, 8px)',
                      borderRadius: '50%',
                      background: index === currentQuestionIndex
                        ? '#ec4899'
                        : index < currentQuestionIndex
                        ? 'rgba(236, 72, 153, 0.6)'
                        : 'rgba(236, 72, 153, 0.2)',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Question */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #ec4899 0%, #db2777 50%, #f472b6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: 'clamp(1.5rem, 4vw, 3rem)',
                lineHeight: 1.3,
                letterSpacing: '-0.02em',
              }}
            >
              {currentQuestionText}
            </motion.h2>

            {/* Champ de réponse */}
            {!hasAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  marginBottom: 'clamp(1.5rem, 4vw, 3rem)',
                }}
              >
                <textarea
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  placeholder="Écrivez votre réponse ici..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.ctrlKey) {
                      handleSubmitAnswer();
                    }
                  }}
                  style={{
                    width: '100%',
                    minHeight: '120px',
                    padding: 'clamp(1rem, 3vw, 1.5rem)',
                    fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                    color: 'rgba(255, 255, 255, 0.95)',
                    background: 'rgba(236, 72, 153, 0.1)',
                    border: '2px solid rgba(236, 72, 153, 0.3)',
                    borderRadius: 'clamp(0.75rem, 2vw, 1rem)',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    lineHeight: 1.6,
                    outline: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(236, 72, 153, 0.6)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(236, 72, 153, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(236, 72, 153, 0.3)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmitAnswer}
                  disabled={!currentAnswer.trim()}
                  style={{
                    marginTop: '1rem',
                    padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                    fontWeight: 600,
                    border: 'none',
                    borderRadius: 'clamp(0.5rem, 2vw, 0.75rem)',
                    background: currentAnswer.trim()
                      ? 'linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)'
                      : 'rgba(236, 72, 153, 0.3)',
                    color: 'white',
                    cursor: currentAnswer.trim() ? 'pointer' : 'not-allowed',
                    boxShadow: currentAnswer.trim() ? '0 8px 24px rgba(236, 72, 153, 0.4)' : 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Vérifier la réponse
                </motion.button>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  style={{
                    marginTop: '0.5rem',
                    fontSize: '0.75rem',
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontStyle: 'italic',
                  }}
                >
                  Appuyez sur Ctrl+Entrée pour soumettre
                </motion.p>
              </motion.div>
            )}

            {/* Feedback de la réponse */}
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  marginBottom: 'clamp(1.5rem, 4vw, 3rem)',
                  padding: 'clamp(1rem, 3vw, 1.5rem)',
                  borderRadius: 'clamp(0.75rem, 2vw, 1rem)',
                  background: feedback.isCorrect
                    ? 'rgba(34, 197, 94, 0.15)'
                    : 'rgba(239, 68, 68, 0.15)',
                  border: `2px solid ${feedback.isCorrect ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1rem',
                    fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
                    fontWeight: 600,
                    color: feedback.isCorrect ? '#22c55e' : '#ef4444',
                  }}
                >
                  <span>{feedback.isCorrect ? '✓' : '✗'}</span>
                  <span>{feedback.isCorrect ? 'Bonne réponse !' : 'Réponse incorrecte'}</span>
                </motion.div>
                
                {!feedback.isCorrect && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: 0.4 }}
                    style={{
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <p
                      style={{
                        fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                        color: 'rgba(255, 255, 255, 0.8)',
                        marginBottom: '0.5rem',
                        fontWeight: 500,
                      }}
                    >
                      Réponse correcte :
                    </p>
                    <p
                      style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                        color: 'rgba(255, 255, 255, 0.95)',
                        lineHeight: 1.6,
                        padding: '1rem',
                        background: 'rgba(0, 0, 0, 0.2)',
                        borderRadius: '0.5rem',
                        border: '1px solid rgba(236, 72, 153, 0.2)',
                      }}
                    >
                      {feedback.correctAnswer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Barre de progression automatique */}
            {currentQuestionIndex < questions.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  width: '100%',
                  height: '3px',
                  background: 'rgba(236, 72, 153, 0.2)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  marginBottom: 'clamp(1rem, 3vw, 2rem)',
                }}
              >
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={{ 
                    scaleX: timeRemaining / AUTO_ADVANCE_DELAY,
                  }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, #ec4899 0%, #db2777 50%, #be185d 100%)',
                    transformOrigin: 'left',
                  }}
                />
              </motion.div>
            )}

            {/* Bouton d'action - afficher seulement après avoir répondu */}
            {hasAnswered && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: 'clamp(1rem, 3vw, 2rem)',
                }}
              >
                {currentQuestionIndex < questions.length - 1 ? (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 12px 40px -8px rgba(236, 72, 153, 0.5)',
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentAnswer('');
                      handleNext();
                    }}
                    style={{
                      padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.25rem, 3vw, 2rem)',
                      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                      fontWeight: 600,
                      border: 'none',
                      borderRadius: 'clamp(0.5rem, 2vw, 0.75rem)',
                      background: 'linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                      boxShadow: '0 8px 24px rgba(236, 72, 153, 0.4)',
                      width: 'auto',
                      minWidth: 'fit-content',
                    }}
                  >
                    <span>Question suivante</span>
                    <motion.svg
                      width="clamp(16px, 3vw, 20px)"
                      height="clamp(16px, 3vw, 20px)"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      animate={{ x: [0, 4, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{ flexShrink: 0 }}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </motion.svg>
                  </motion.button>
                ) : (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 12px 40px -8px rgba(236, 72, 153, 0.5)',
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      // Passer à la page de résultats avec les statistiques
                      if (onComplete) {
                        onComplete({
                          total: questions.length,
                          completed: questions.length,
                        });
                      }
                    }}
                    style={{
                      padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.25rem, 3vw, 2rem)',
                      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                      fontWeight: 600,
                      border: 'none',
                      borderRadius: 'clamp(0.5rem, 2vw, 0.75rem)',
                      background: 'linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)',
                      color: 'white',
                      cursor: 'pointer',
                      boxShadow: '0 8px 24px rgba(236, 72, 153, 0.4)',
                      width: 'auto',
                      minWidth: 'fit-content',
                    }}
                  >
                    Voir les résultats
                  </motion.button>
      )}
    </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default QuestionCard;
