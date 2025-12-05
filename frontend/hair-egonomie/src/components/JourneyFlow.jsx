import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import QuestionCard from './QuestionCard';
import ContentCard from './ContentCard';
import { getContent } from '../utils/journeyManager';

const JourneyFlow = ({ journey, mode, onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [questionStats, setQuestionStats] = useState({ total: 0, completed: 0 });

  // Construire les étapes du parcours : alterner contenu et questions
  const buildJourneySteps = () => {
    const steps = [];
    
    if (!journey || !journey.modules) {
      return steps;
    }

    // Pour chaque module, créer une étape de contenu suivie d'une question
    journey.modules.forEach((module, index) => {
      // Étape de contenu
      const contentId = `content_${module.type}_${index}`;
      steps.push({
        type: 'content',
        id: contentId,
        module: module,
        moduleIndex: index,
        contentType: module.type,
        title: module.label,
      });

      // Question associée (utiliser les questions de démo selon le mode)
      const questionId = `question_${index}`;
      steps.push({
        type: 'question',
        id: questionId,
        moduleIndex: index,
        isLast: false, // Pas la dernière, il y aura un quiz final
      });
    });

    // TOUJOURS ajouter un quiz final pour évaluer la compréhension globale
    steps.push({
      type: 'question',
      id: 'final_quiz',
      moduleIndex: journey.modules.length,
      isLast: true, // C'est le dernier quiz
      isFinalQuiz: true, // Marqueur pour le quiz final
    });

    return steps;
  };

  const steps = buildJourneySteps();
  const currentStep = steps[currentStepIndex];

  const handleContentNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      // Scroll automatique vers le haut
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Parcours terminé
      if (onComplete) {
        onComplete({
          total: questionStats.total,
          completed: questionStats.completed,
        });
      }
    }
  };

  const handleQuestionComplete = (stats) => {
    setQuestionStats(prev => ({
      total: prev.total + stats.total,
      completed: prev.completed + stats.completed,
    }));

    // Passer à l'étape suivante
    if (currentStepIndex < steps.length - 1) {
      setTimeout(() => {
        setCurrentStepIndex(currentStepIndex + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 500);
    } else {
      // Dernière question terminée
      if (onComplete) {
        onComplete({
          total: questionStats.total + stats.total,
          completed: questionStats.completed + stats.completed,
        });
      }
    }
  };

  // Obtenir le contenu pour l'étape actuelle
  const getCurrentContent = () => {
    if (currentStep?.type === 'content') {
      const moduleType = currentStep.module?.type;
      let contentId = 'article1';
      
      // Mapper le type de module au contenu approprié
      if (moduleType === 'article') {
        const articleIds = ['article1', 'article1b', 'article2', 'article3', 'article4', 'article5'];
        contentId = articleIds[currentStep.moduleIndex % articleIds.length] || 'article1';
      } else if (moduleType === 'exercice') {
        const exerciseIds = ['exercise1', 'exercise2', 'exercise3'];
        contentId = exerciseIds[currentStep.moduleIndex % exerciseIds.length] || 'exercise1';
      } else if (moduleType === 'exemple') {
        // Utiliser article2 comme exemple, avec un contenu par défaut si non trouvé
        
        contentId = 'article2';
      } else if (moduleType === 'resume') {
        contentId = 'article3';
      }
      
      const contentData = getContent(contentId);
      
      // S'assurer qu'on a toujours un contenu valide
      if (!contentData || !contentData.content) {
        // Contenu par défaut si non trouvé
        return {
          id: currentStep.id,
          contentType: currentStep.contentType || moduleType || 'article',
          title: currentStep.title || currentStep.module?.label || 'Contenu',
          content: `
            <h2>${currentStep.title || currentStep.module?.label || 'Contenu'}</h2>
            <p>Ce contenu vous guide dans votre parcours d'apprentissage.</p>
            <p>Continuez pour découvrir la suite de votre parcours personnalisé.</p>
          `,
        };
      }
      
      return {
        id: currentStep.id,
        contentType: currentStep.contentType || moduleType || 'article',
        title: contentData.title || currentStep.title || currentStep.module?.label || 'Contenu',
        content: contentData.content,
      };
    }
    return null;
  };

  if (steps.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.25rem',
      }}>
        Aucun parcours disponible
      </div>
    );
  }

  // S'assurer qu'on a toujours un step valide
  if (!currentStep) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.25rem',
      }}>
        Chargement...
      </div>
    );
  }

  const currentContent = getCurrentContent();

  return (
    <AnimatePresence mode="wait">
      {currentStep.type === 'content' && currentContent && (
        <ContentCard
          key={currentStep.id}
          content={currentContent}
          onNext={handleContentNext}
          onComplete={currentStepIndex === steps.length - 1 ? handleContentNext : undefined}
        />
      )}

      {currentStep.type === 'question' && (
        <QuestionCard
          key={currentStep.id}
          mode={mode}
          onComplete={handleQuestionComplete}
        />
      )}
    </AnimatePresence>
  );
};

export default JourneyFlow;

