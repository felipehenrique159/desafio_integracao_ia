import dotenv from 'dotenv';
import HuggingfaceService from "./HuggingfaceService";
import { loadLastAnalysis, saveLastAnalysis } from '../utils/AnalyzeStorage';
import { removeStopwords } from 'stopword';
dotenv.config();

interface SentimentAnalysisResult {
    totalWords: number;
    topWords: string[];
    sentiment: any;
}

export default class AnalyzeService {
    static async analyzeSentiment(text: string) {
        try {

            const words = text.split(/\s+/);
            const filteredWords = removeStopwords(words);

            const wordCount = words.length;
            const wordFrequency: { [key: string]: number } = {};

            filteredWords.forEach((word) => {
                const lower = word.toLowerCase();
                wordFrequency[lower] = (wordFrequency[lower] || 0) + 1;
            });

            const topWords = Object.entries(wordFrequency)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([word]) => word);

            saveLastAnalysis({ words: filteredWords.map(w => w.toLowerCase()) });

            const sentiment = await HuggingfaceService.analyzeSentiment(text);

            const result: SentimentAnalysisResult = {
                totalWords: wordCount,
                topWords,
                sentiment
            }

            return result;
        }
        catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async searchTerm(term: string) {
        try {
            const lastAnalyze = loadLastAnalysis();

            if (!lastAnalyze || !Array.isArray(lastAnalyze.words)) {
                return false;
            }

            return lastAnalyze.words.includes(term);
        }
        catch (error: any) {
            throw new Error(error.message);
        }
    }
}