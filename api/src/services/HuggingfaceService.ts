import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

export default class HuggingfaceService {
    static async analyzeSentiment(text: string) {
        try {
            const apiKey = process.env.HUGGINGFACE_API_KEY;

            if (!apiKey) {
                throw new Error("HUGGINGFACE_API_KEY is not defined in the environment.");
            }

            const response = await axios.post(
                "https://router.huggingface.co/hf-inference/models/distilbert/distilbert-base-uncased-finetuned-sst-2-english",
                { inputs: text },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    }
                }
            );

            return response.data[0];
        }
        catch (error: any) {
            throw new Error(error.message);
        }
    }
}