import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import './App.css';

// Import des composants
import SplashScreen from './components/SplashScreen';
import ModeSelector from './components/ModeSelector';
import QuestionCard from './components/QuestionCard';
import ContentCard from './components/ContentCard';
import CompletionScreen from './components/CompletionScreen';
import NextButton from './components/NextButton';
import MicroFeedback from './components/MicroFeedback';

// Import du gestionnaire de parcours
import { getJourney, getContent, adaptJourney } from './utils/journeyManager';

function App() {
  const [step, setStep] = useState("splash");
  const [mode, setMode] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  
  // Gestion du parcours adaptatif
  const [journey, setJourney] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [journeyStats, setJourneyStats] = useState({
    stepsCompleted: 0,
    startTime: null,
    totalTime: 0,
  });
  
  // Micro-feedbacks
  const [microFeedback, setMicroFeedback] = useState(null);

  // Initialiser les stats au début du parcours
  useEffect(() => {
    if (journey && journeyStats.startTime === null) {
      setJourneyStats(prev => ({
        ...prev,
        startTime: Date.now(),
      }));
    }
  }, [journey, journeyStats.startTime]);

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    // Initialiser le parcours selon le mode
    const initialJourney = getJourney(selectedMode);
    setJourney(initialJourney);
    
    // Révélation progressive du bouton après un délai
    setTimeout(() => {
      setShowNextButton(true);
    }, 800);
  };

  const handleSplashComplete = () => {
    setStep("mode");
  };

  const handleStartJourney = () => {
    setShowNextButton(false);
    setCurrentStepIndex(0);
    setStep("journey");
  };

  const handleStepComplete = (stepData = {}) => {
    // Enregistrer la réponse si c'est une question
    if (stepData.type === 'question') {
      const responseTime = stepData.responseTime || 0;
      setUserAnswers(prev => [...prev, {
        stepId: stepData.id,
        responseTime,
        timestamp: Date.now(),
      }]);

      // Micro-feedback selon le temps de réponse
      if (responseTime < 2000) {
        setMicroFeedback({
          type: 'encouragement',
          message: 'Réflexion rapide ! Vous progressez bien.',
        });
      } else if (responseTime > 10000) {
        setMicroFeedback({
          type: 'hint',
          message: 'Prenez votre temps, c\'est important de bien comprendre.',
        });
      }
    }

    // Mettre à jour les stats
    setJourneyStats(prev => ({
      ...prev,
      stepsCompleted: prev.stepsCompleted + 1,
    }));

    // Micro-feedback de progression
    if (journey && currentStepIndex < journey.steps.length - 1) {
      const progress = ((currentStepIndex + 1) / journey.steps.length) * 100;
      if (progress >= 50 && progress < 60) {
        setMicroFeedback({
          type: 'encouragement',
          message: 'Vous êtes à mi-parcours ! Continuez comme ça.',
        });
      }
    }

    // Passer à l'étape suivante
    if (journey && currentStepIndex < journey.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Parcours terminé
      const totalTime = journeyStats.startTime 
        ? Math.floor((Date.now() - journeyStats.startTime) / 1000)
        : 0;
      
      setJourneyStats(prev => ({
        ...prev,
        totalTime,
      }));
      
      setMicroFeedback({
        type: 'success',
        message: 'Félicitations ! Parcours complété avec succès.',
      });
      
      setTimeout(() => {
        setStep("completion");
      }, 1500);
    }
  };

  const handleRestart = () => {
    setStep("splash");
    setMode(null);
    setJourney(null);
    setCurrentStepIndex(0);
    setUserAnswers([]);
    setJourneyStats({
      stepsCompleted: 0,
      startTime: null,
      totalTime: 0,
    });
    setShowNextButton(false);
  };

  const handleContinue = (action) => {
    // Logique pour continuer avec une autre action
    // Pour l'instant, on redémarre
    handleRestart();
  };

  // Obtenir l'étape actuelle
  const getCurrentStep = () => {
    if (!journey || currentStepIndex >= journey.steps.length) {
      return null;
    }
    return journey.steps[currentStepIndex];
  };

  const currentStep = getCurrentStep();

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {step === "splash" && (
          <SplashScreen key="splash" next={handleSplashComplete} />
        )}
        
        {step === "mode" && (
          <>
            <ModeSelector 
              key="mode" 
              onSelect={handleModeSelect} 
            />
            {showNextButton && (
              <NextButton
                label={`Commencer avec ${mode}`}
                onClick={handleStartJourney}
                isVisible={showNextButton}
                delay={0.2}
              />
            )}
          </>
        )}

        {step === "journey" && currentStep && (
          <>
            {currentStep.type === "question" && (
              <QuestionCard
                key={`question-${currentStepIndex}`}
                mode={mode}
                question={currentStep.question}
                questionId={currentStep.id}
                onNext={(responseTime) => handleStepComplete({
                  type: 'question',
                  id: currentStep.id,
                  responseTime,
                })}
              />
            )}
            
            {currentStep.type === "content" && (
              <ContentCard
                key={`content-${currentStepIndex}`}
                content={{
                  id: currentStep.id,
                  title: currentStep.title,
                  contentType: currentStep.contentType,
                  ...getContent(currentStep.id),
                }}
                onNext={() => handleStepComplete({
                  type: 'content',
                  id: currentStep.id,
                })}
              />
            )}
          </>
        )}

        {step === "completion" && (
          <CompletionScreen
            key="completion"
            mode={mode}
            journeyStats={journeyStats}
            onRestart={handleRestart}
            onContinue={handleContinue}
          />
        )}
      </AnimatePresence>

      {/* Micro-feedback global */}
      {microFeedback && (
        <MicroFeedback
          type={microFeedback.type}
          message={microFeedback.message}
          onDismiss={() => setMicroFeedback(null)}
        />
      )}
    </div>
  );
}

export default App;
