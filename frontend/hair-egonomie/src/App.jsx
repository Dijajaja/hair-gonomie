import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import './App.css';

// Import des composants
import SplashScreen from './components/SplashScreen';
// import ModeSelector from './components/ModeSelector'; // Navigation standard
import IntelligentNavigation from './components/IntelligentNavigation'; // Navigation intelligente et adaptative
import ConfigQuestions from './components/ConfigQuestions'; // Questions de configuration
import PersonalizedJourney from './components/PersonalizedJourney'; // Parcours personnalisé
import QuestionCard from './components/QuestionCard';
import ResultsPage from './components/ResultsPage';
import { generateJourney } from './utils/journeyGenerator';

function App() {
  const [step, setStep] = useState("splash");
  const [mode, setMode] = useState(null);
  const [questionStats, setQuestionStats] = useState({ total: 0, completed: 0 });
  const [personalizedJourney, setPersonalizedJourney] = useState(null);

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    // Transition automatique après un court délai (sans bouton)
    setTimeout(() => {
      setStep("config"); // Passer directement aux questions de configuration
    }, 1000);
  };

  const handleSplashComplete = () => {
    setStep("mode");
  };

  const handleConfigComplete = (answers) => {
    // Générer le parcours personnalisé
    const journey = generateJourney(answers);
    setPersonalizedJourney(journey);
    setStep("journey"); // Afficher le parcours généré
  };

  const handleJourneyStart = () => {
    setStep("questions"); // Commencer avec les questions du parcours
  };

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {step === "splash" && (
          <SplashScreen key="splash" next={handleSplashComplete} />
        )}
        
        {step === "mode" && (
          <IntelligentNavigation 
            key="mode" 
            onSelect={handleModeSelect} 
          />
        )}

        {step === "config" && (
          <ConfigQuestions
            key="config"
            onComplete={handleConfigComplete}
          />
        )}

        {step === "journey" && personalizedJourney && (
          <PersonalizedJourney
            key="journey"
            journey={personalizedJourney}
            onStart={handleJourneyStart}
          />
        )}

        {step === "questions" && (
          <QuestionCard 
            key="questions" 
            mode={mode}
            journey={personalizedJourney}
            onComplete={(stats) => {
              setQuestionStats(stats);
              setStep("results");
            }}
          />
        )}

        {step === "results" && (
          <ResultsPage
            key="results"
            mode={mode}
            totalQuestions={questionStats.total}
            completedQuestions={questionStats.completed}
            onRestart={() => {
              setStep("splash");
              setMode(null);
              setQuestionStats({ total: 0, completed: 0 });
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
