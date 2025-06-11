import express, { Request, Response } from 'express'
import AnalyzeController from './controllers/AnalyzeController';

const routes = express.Router()

/**
 * @swagger
 * /api/analyze-text:
 *   post:
 *     summary: Realiza análise de sentimento e retorna as principais palavras do texto.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Resultado da análise
 */
routes.post('/analyze-text', async (request: Request, response: Response) => {
  return await AnalyzeController.analyzeText(request, response);
});

/**
 * @swagger
 * /api/search-term:
 *   get:
 *     summary: Busca se o termo informado foi analisado no último texto processado.
 *     parameters:
 *       - in: query
 *         name: term
 *         schema:
 *           type: string
 *         required: true
 *         description: Termo a ser buscado
 *     responses:
 *       200:
 *         description: Resultado da busca
 */
routes.get('/search-term', async (request: Request, response: Response) => {
  return await AnalyzeController.searchTerm(request, response);
});

export default routes