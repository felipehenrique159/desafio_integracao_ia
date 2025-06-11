import express, { Request, Response } from 'express'
import AnalyzeController from './controllers/AnalyzeController';

const routes = express.Router()

routes.post('/analyze-text', async (request: Request, response: Response) => {
  return await AnalyzeController.analyzeText(request, response);
});

export default routes
