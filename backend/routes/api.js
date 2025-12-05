import express from 'express';

const router = express.Router();

// GET /api/questions
router.get('/questions', (req, res) => {
  try {
    res.json({
      questions: [
        "Quel est ton niveau ?",
        "Combien de temps par jour ?",
        "Préférence : article, texte ou exercice ?"
      ]
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Route de test
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

export default router;
