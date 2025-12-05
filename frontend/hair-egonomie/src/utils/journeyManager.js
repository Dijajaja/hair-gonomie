// Gestionnaire de parcours adaptatif
// Définit l'ordre et le contenu des étapes selon les choix de l'utilisateur

export const JOURNEY_CONFIG = {
  "Découvrir": {
    steps: [
      { type: "question", id: "intro", question: "Qu'est-ce que l'ergonomie dans le design d'interface ?" },
      { type: "content", id: "article1", contentType: "article", title: "L'ergonomie : définition et principes" },
      { type: "question", id: "progressive", question: "Pourquoi la révélation progressive améliore-t-elle l'expérience utilisateur ?" },
      { type: "content", id: "article2", contentType: "article", title: "La révélation progressive (Progressive Disclosure)" },
      { type: "question", id: "cognitive", question: "Comment réduire la charge cognitive dans une interface ?" },
      { type: "content", id: "article3", contentType: "article", title: "Réduire la charge cognitive : techniques et exemples" },
    ]
  },
  "Apprendre": {
    steps: [
      { type: "question", id: "ux-ui", question: "Quelle est la différence entre UX et UI design ?" },
      { type: "content", id: "video1", contentType: "video", title: "UX vs UI : comprendre les différences" },
      { type: "question", id: "guided", question: "Comment le parcours guidé réduit-il la friction utilisateur ?" },
      { type: "content", id: "article4", contentType: "article", title: "Les parcours guidés : réduire la friction" },
      { type: "question", id: "single-action", question: "Pourquoi limiter les choix à une seule action à la fois ?" },
      { type: "content", id: "article5", contentType: "article", title: "Le principe de l'action unique" },
    ]
  },
  "S'exercer": {
    steps: [
      { type: "question", id: "feeling", question: "Testez cette interface : que ressentez-vous pendant la navigation ?" },
      { type: "content", id: "exercise1", contentType: "exercise", title: "Analyse de l'expérience utilisateur" },
      { type: "question", id: "micro", question: "Identifiez les micro-interactions dans cette application." },
      { type: "content", id: "exercise2", contentType: "exercise", title: "Micro-interactions et feedback" },
      { type: "question", id: "animation", question: "Analysez comment l'animation guide votre attention." },
      { type: "content", id: "exercise3", contentType: "exercise", title: "L'animation comme guide" },
    ]
  }
};

// Contenu détaillé pour chaque étape
export const CONTENT_DATA = {
  article1: {
    title: "L'ergonomie : définition et principes",
    content: `
      <h2>Qu'est-ce que l'ergonomie ?</h2>
      <p>L'ergonomie dans le design d'interface consiste à adapter l'environnement numérique aux capacités et limites humaines. Elle vise à créer des interfaces intuitives, efficaces et agréables à utiliser.</p>
      
      <h3>Les principes fondamentaux</h3>
      <ul>
        <li><strong>Clarté</strong> : L'information doit être immédiatement compréhensible</li>
        <li><strong>Simplicité</strong> : Réduire la complexité au minimum nécessaire</li>
        <li><strong>Feedback</strong> : Chaque action doit avoir une réponse visuelle claire</li>
        <li><strong>Consistance</strong> : Maintenir des patterns cohérents dans l'interface</li>
        <li><strong>Prévention d'erreurs</strong> : Anticiper et éviter les erreurs utilisateur</li>
      </ul>
      
      <p>Ces principes guident la création d'interfaces qui respectent les capacités cognitives et physiques des utilisateurs.</p>
    `
  },
  article2: {
    title: "La révélation progressive (Progressive Disclosure)",
    content: `
      <h2>Le concept de révélation progressive</h2>
      <p>La révélation progressive est une technique UX qui consiste à présenter l'information de manière séquentielle, en ne montrant que ce qui est nécessaire à chaque étape.</p>
      
      <h3>Avantages</h3>
      <ul>
        <li><strong>Réduction de la surcharge cognitive</strong> : L'utilisateur ne voit que l'essentiel</li>
        <li><strong>Meilleure compréhension</strong> : Chaque étape est digeste et claire</li>
        <li><strong>Engagement accru</strong> : L'effet de découverte maintient l'intérêt</li>
        <li><strong>Guidance naturelle</strong> : Le parcours devient intuitif</li>
      </ul>
      
      <h3>Mise en pratique</h3>
      <p>Dans cette application, vous expérimentez la révélation progressive : chaque action dévoile uniquement l'étape suivante, créant un sentiment de fluidité et de contrôle.</p>
    `
  },
  article3: {
    title: "Réduire la charge cognitive : techniques et exemples",
    content: `
      <h2>Qu'est-ce que la charge cognitive ?</h2>
      <p>La charge cognitive représente l'effort mental nécessaire pour traiter l'information. En design d'interface, réduire cette charge améliore significativement l'expérience utilisateur.</p>
      
      <h3>Techniques principales</h3>
      <ul>
        <li><strong>Chunking</strong> : Grouper l'information en unités logiques</li>
        <li><strong>Hiérarchie visuelle</strong> : Utiliser la taille, la couleur et l'espacement pour guider l'attention</li>
        <li><strong>Élimination des distractions</strong> : Supprimer les éléments non essentiels</li>
        <li><strong>Actions uniques</strong> : Présenter une seule action à la fois</li>
        <li><strong>Feedback immédiat</strong> : Confirmer chaque interaction</li>
      </ul>
      
      <p>Cette application applique ces principes en ne montrant qu'un élément à la fois, éliminant ainsi la surcharge visuelle.</p>
    `
  },
  article4: {
    title: "Les parcours guidés : réduire la friction",
    content: `
      <h2>Pourquoi les parcours guidés ?</h2>
      <p>Les parcours guidés transforment des tâches complexes en séquences simples et linéaires, réduisant ainsi la friction cognitive et émotionnelle.</p>
      
      <h3>Bénéfices mesurables</h3>
      <ul>
        <li><strong>Taux de complétion</strong> : +40% en moyenne</li>
        <li><strong>Temps de prise en main</strong> : Réduction de 60%</li>
        <li><strong>Satisfaction utilisateur</strong> : Amélioration significative</li>
        <li><strong>Erreurs</strong> : Réduction de 50%</li>
      </ul>
      
      <h3>Principes de conception</h3>
      <p>Un bon parcours guidé doit être : progressif, adaptatif, clair et rassurant. Chaque étape doit avoir un objectif unique et compréhensible.</p>
    `
  },
  article5: {
    title: "Le principe de l'action unique",
    content: `
      <h2>Une action à la fois</h2>
      <p>Présenter une seule action visible à la fois est un principe puissant qui simplifie radicalement l'expérience utilisateur.</p>
      
      <h3>Pourquoi ça fonctionne ?</h3>
      <ul>
        <li><strong>Décision simplifiée</strong> : Pas de choix paralysant</li>
        <li><strong>Focus total</strong> : L'attention est dirigée vers l'essentiel</li>
        <li><strong>Confiance</strong> : L'utilisateur sait exactement quoi faire</li>
        <li><strong>Progression claire</strong> : Chaque étape est un accomplissement</li>
      </ul>
      
      <h3>Dans cette application</h3>
      <p>Vous expérimentez ce principe : à chaque moment, un seul élément est visible et actionnable, créant un sentiment de clarté et de contrôle.</p>
    `
  },
  video1: {
    title: "UX vs UI : comprendre les différences",
    content: `
      <h2>UX Design vs UI Design</h2>
      <p>Bien que souvent confondus, UX et UI design sont complémentaires mais distincts.</p>
      
      <h3>UI Design (User Interface)</h3>
      <ul>
        <li>Focus sur l'apparence et le style</li>
        <li>Design visuel des éléments</li>
        <li>Couleurs, typographie, icônes</li>
        <li>Esthétique et branding</li>
      </ul>
      
      <h3>UX Design (User Experience)</h3>
      <ul>
        <li>Focus sur l'expérience globale</li>
        <li>Usabilité et fonctionnalité</li>
        <li>Parcours utilisateur</li>
        <li>Résolution de problèmes</li>
      </ul>
      
      <p><strong>En résumé</strong> : L'UI est ce que l'utilisateur voit, l'UX est ce qu'il ressent et vit.</p>
    `
  },
  exercise1: {
    title: "Analyse de l'expérience utilisateur",
    content: `
      <h2>Exercice pratique</h2>
      <p>Prenez un moment pour réfléchir à votre expérience jusqu'à présent dans cette application.</p>
      
      <h3>Questions de réflexion</h3>
      <ol>
        <li>Comment vous êtes-vous senti lors de la navigation ?</li>
        <li>Y a-t-il eu des moments de confusion ou d'hésitation ?</li>
        <li>Qu'est-ce qui vous a surpris agréablement ?</li>
        <li>L'interface vous a-t-elle guidé naturellement ?</li>
      </ol>
      
      <h3>Points à observer</h3>
      <ul>
        <li>La fluidité des transitions</li>
        <li>La clarté des instructions</li>
        <li>Le sentiment de progression</li>
        <li>L'absence de surcharge visuelle</li>
      </ul>
      
      <p>Cette auto-analyse vous aide à comprendre l'impact du design sur l'expérience utilisateur.</p>
    `
  },
  exercise2: {
    title: "Micro-interactions et feedback",
    content: `
      <h2>Identifier les micro-interactions</h2>
      <p>Les micro-interactions sont ces petits détails qui rendent une interface vivante et réactive.</p>
      
      <h3>À observer dans cette application</h3>
      <ul>
        <li><strong>Hover effects</strong> : Changements visuels au survol</li>
        <li><strong>Transitions</strong> : Animations entre les états</li>
        <li><strong>Feedback visuel</strong> : Confirmation des actions</li>
        <li><strong>Loading states</strong> : Indicateurs de chargement</li>
        <li><strong>Progress indicators</strong> : Barres de progression</li>
      </ul>
      
      <h3>Pourquoi c'est important ?</h3>
      <p>Les micro-interactions créent un sentiment de réactivité et de qualité, renforçant la confiance de l'utilisateur dans l'interface.</p>
    `
  },
  exercise3: {
    title: "L'animation comme guide",
    content: `
      <h2>L'animation guide l'attention</h2>
      <p>Les animations ne sont pas seulement décoratives : elles guident l'attention et communiquent l'état de l'interface.</p>
      
      <h3>Rôles de l'animation</h3>
      <ul>
        <li><strong>Orientation</strong> : Montrer où regarder</li>
        <li><strong>Feedback</strong> : Confirmer les actions</li>
        <li><strong>Hiérarchie</strong> : Indiquer l'importance</li>
        <li><strong>Transition</strong> : Créer de la continuité</li>
      </ul>
      
      <h3>Dans cette application</h3>
      <p>Observez comment les animations vous guident naturellement vers l'action suivante, créant un flux continu et intuitif.</p>
    `
  }
};

// Fonction pour obtenir le parcours selon le mode
export const getJourney = (mode) => {
  return JOURNEY_CONFIG[mode] || JOURNEY_CONFIG["Découvrir"];
};

// Fonction pour obtenir le contenu d'une étape
export const getContent = (contentId) => {
  return CONTENT_DATA[contentId] || null;
};

// Fonction pour adapter le parcours selon les réponses
export const adaptJourney = (mode, userAnswers) => {
  const baseJourney = getJourney(mode);
  
  // Logique d'adaptation simple : si l'utilisateur répond rapidement, on peut accélérer
  // Si l'utilisateur prend du temps, on peut ajouter des étapes d'aide
  const adaptedSteps = [...baseJourney.steps];
  
  // Exemple d'adaptation : si l'utilisateur a répondu rapidement à toutes les questions
  const quickAnswers = userAnswers.filter(a => a.responseTime < 3000).length;
  if (quickAnswers > 2 && mode === "Apprendre") {
    // Ajouter une étape bonus pour les utilisateurs rapides
    adaptedSteps.push({
      type: "content",
      id: "bonus",
      contentType: "article",
      title: "Bonus : Techniques avancées"
    });
  }
  
  return { ...baseJourney, steps: adaptedSteps };
};

