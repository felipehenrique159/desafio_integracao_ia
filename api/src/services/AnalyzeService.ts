import dotenv from 'dotenv';
import HuggingfaceService from "./HuggingfaceService";
import { loadLastAnalysis, saveLastAnalyze } from '../utils/AnalyzeStorage';
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
            const words = this.getWords(text);
            const filteredWords = this.getFilteredWords(words);
            const topWords = this.getTopWords(filteredWords, 5);
            const sentiment = await HuggingfaceService.analyzeSentiment(text);

            saveLastAnalyze({ words: filteredWords.map(w => w.toLowerCase()) });

            return {
                totalWords: words.length,
                topWords,
                sentiment
            } as SentimentAnalysisResult;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    private static getWords(text: string): string[] {
        return text.split(/\s+/);
    }

    private static getFilteredWords(words: string[]): string[] {
        return removeStopwords(words);
    }

    private static getTopWords(words: string[], limit: number): string[] {
        const wordFrequency: { [key: string]: number } = {};
        words.forEach((word) => {
            const lower = word.toLowerCase();
            wordFrequency[lower] = (wordFrequency[lower] || 0) + 1;
        });

        return Object.entries(wordFrequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([word]) => word);
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