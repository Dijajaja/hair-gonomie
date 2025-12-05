import request from 'supertest';
import app from '../server.js';

describe('API Endpoints', () => {
  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const res = await request(app)
        .get('/api/health')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(res.body).toHaveProperty('status', 'OK');
      expect(res.body).toHaveProperty('message', 'API is running');
      expect(res.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /api/questions', () => {
    it('should return list of questions', async () => {
      const res = await request(app)
        .get('/api/questions')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(res.body).toHaveProperty('questions');
      expect(Array.isArray(res.body.questions)).toBe(true);
      expect(res.body.questions.length).toBeGreaterThan(0);
    });

    it('should return expected questions', async () => {
      const res = await request(app)
        .get('/api/questions')
        .expect(200);
      
      const expectedQuestions = [
        "Quel est ton niveau ?",
        "Combien de temps par jour ?",
        "Préférence : article, texte ou exercice ?"
      ];
      
      expect(res.body.questions).toEqual(expectedQuestions);
    });
  });
});
