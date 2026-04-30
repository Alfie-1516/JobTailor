import { OpenRouter } from "@openrouter/sdk";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const apiKey = process.env.OPENROUTER_API_KEY;

if (!apiKey) {
  throw new Error(
    "OPENROUTER_API_KEY is not set in environment variables. Please add it to your .env file."
  );
}

export const openrouter = new OpenRouter({
  apiKey: apiKey,
});
