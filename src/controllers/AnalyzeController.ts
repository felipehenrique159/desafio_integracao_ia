import { Request, Response } from 'express';
import AnalyzeService from '../services/analyzeService';
export default class AnalyzeController {
    static async analyzeText(request: Request, response: Response) {
        try {
            const { text } = request.body;

            if (!text) {
                return response.status(400).json({ error: "Text is required" });
            }

            const textAnalyze = await AnalyzeService.analyzeSentiment(text);

            response.status(200).json(textAnalyze);
        } catch (error) {
            response.status(500).json({ error: 'Error analyzing text' });
        }
    }

    static async searchTerm(request: Request, response: Response) {
        try {
            const term = (request.query.term as string)?.toLowerCase();

            if (!term) {
                return response.status(400).json({ error: "Term is required" });
            }

            const isFoundTerm = await AnalyzeService.searchTerm(term);

            if (!isFoundTerm) {
                return response.status(404).json({ error: "No analysis found for this term." });
            }

            response.json({ isFoundTerm });
        } catch (error) {
            response.status(500).json({ error: 'Error searching term' });
        }
    }
}
