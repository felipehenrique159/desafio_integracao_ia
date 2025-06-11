import { Request, Response } from 'express';

export default class AnalyzeController {
    static async analyzeText(request: Request, response: Response) {
        return response.status(200).json({
            message: 'teste',
        });
    }
}
