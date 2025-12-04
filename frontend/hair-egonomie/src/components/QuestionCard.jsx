import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slideUp, slideFromRight } from "../animations/variants";

// Questions de démonstration selon le mode sélectionné
const DEMO_QUESTIONS = {
  "Découvrir": [
    "Qu'est-ce que l'ergonomie dans le design d'interface ?",
    "Pourquoi la révélation progressive améliore-t-elle l'expérience utilisateur ?",
    "Comment réduire la charge cognitive dans une interface ?",
    "Quels sont les principes clés du design minimaliste ?"
  ],
  "Apprendre": [
    "Quelle est la différence entre UX et UI design ?",
    "Comment le parcours guidé réduit-il la friction utilisateur ?",
    "Pourquoi limiter les choix à une seule action à la fois ?",
    "Quels sont les bénéfices d'une navigation progressive ?"
  ],
  "S'exercer": [
    "Testez cette interface : que ressentez-vous pendant la navigation ?",
    "Identifiez les micro-interactions dans cette application.",
    "Analysez comment l'animation guide votre attention.",
    "Évaluez la fluidité de ce parcours guidé."
  ]
};

const QuestionCard = ({ mode }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Essayer de récupérer depuis l'API, sinon utiliser les questions de démo
    const loadQuestions = async () => {
      setIsLoading(true);
      
      try {
        const res = await fetch("http://127.0.0.1:8000/api/questions/");
        if (res.ok) {
          const data = await res.json();
          if (data.questions && data.questions.length > 0) {
            setQuestions(data.questions);
            setIsLoading(false);
            return;
          }
        }
      } catch {
        // Backend non disponible - continuer avec les questions de démo
      }
      
      // Utiliser les questions de démonstration
      console.log("Utilisation des questions de démonstration");
      setQuestions(DEMO_QUESTIONS[mode] || DEMO_QUESTIONS["Découvrir"]);
      setIsLoading(false);
    };

    loadQuestions();
  }, [mode]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

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
          fontSize: '1.5rem',
          color: '#333',
          background: '#f5f5f5'
        }}
      >
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Chargement des questions...
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
          fontSize: '1.5rem',
          color: '#333',
          background: '#f5f5f5'
        }}
      >
        Aucune question disponible
      </motion.div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <motion.div
      initial="initial"
      animate="animate"
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
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 60, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -60, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          style={{
            width: '100%',
            maxWidth: '600px',
            background: 'white',
            padding: '3rem',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
          }}
        >
          <motion.h2
            variants={slideUp}
            style={{
              fontSize: '1.8rem',
              marginBottom: '2rem',
              color: '#333'
            }}
          >
            {currentQuestion}
          </motion.h2>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                fontSize: '0.9rem',
                color: '#666'
              }}
            >
              Question {currentQuestionIndex + 1} sur {questions.length}
            </motion.span>
            
            {currentQuestionIndex < questions.length - 1 ? (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                onClick={handleNext}
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Suivant
              </motion.button>
            ) : (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                onClick={() => {
                  // Revenir au début ou à la sélection de mode
                  setCurrentQuestionIndex(0);
                }}
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Recommencer
              </motion.button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default QuestionCard;
