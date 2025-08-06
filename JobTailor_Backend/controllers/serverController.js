import OpenAI from "openai";
import dotenv from "dotenv";
import { prompt } from "../util/prompt.js";

dotenv.config();

// Check if API key is set
if (!process.env.OPENROUTER_API_KEY) {
  console.error("OpenRouter API key not configured in environment variables");
}

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey:
    "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",
});

export const generateResume = async (req, res) => {
  const { jobDescription, userDetails } = req.body;

  try {
    const completion = await client.chat.completions.create({
      extra_headers: {
        "HTTP-Referer": "https://jobtailor.com", // Optional. Site URL for rankings on openrouter.ai.
        "X-Title": "JobTailor", // Optional. Site title for rankings on openrouter.ai.
      },
      model: "deepseek/deepseek-r1:free",
      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: `Job Description:\n ${jobDescription}\n\nUser Details:\n ${userDetails}`,
        },
      ],
      response_format: { type: "json_object" },
    });
    const data = JSON.parse(completion.choices[0].message.content);
    res.json(data);
  } catch (error) {
    console.error("Resume generation error:", error);
    res.status(500).json({
      error: "Failed to generate resume",
      details: error.message,
    });
  }
};

export const generateCoverLetter = async (req, res) => {
  const { jobDescription, userDetails } = req.body;

  try {
    const completion = await client.chat.completions.create({
      extra_headers: {
        "HTTP-Referer": "https://jobtailor.com", // Optional. Site URL for rankings on openrouter.ai.
        "X-Title": "JobTailor", // Optional. Site title for rankings on openrouter.ai.
      },
      model: "deepseek/deepseek-r1:free",
      messages: [
        {
          role: "system",
          content:
            "You are an expert career assistant that generates cover letters based on job descriptions and user details. Respond with JSON containing 'coverLetterText'.",
        },
        {
          role: "user",
          content: `Job Description:\n ${jobDescription}\n\nUser Details:\n ${userDetails}`,
        },
      ],
      response_format: { type: "json_object" },
    });
    const data = JSON.parse(completion.choices[0].message.content);
    res.json(data);
  } catch (error) {
    console.error("Resume generation error:", error);
    res.status(500).json({
      error: "Failed to generate resume",
      details: error.message,
    });
  }
};

export const generateInterviewNotes = async (req, res) => {
  const { jobDescription, userDetails } = req.body;

  try {
    const completion = await client.chat.completions.create({
      extra_headers: {
        "HTTP-Referer": "https://jobtailor.com", // Optional. Site URL for rankings on openrouter.ai.
        "X-Title": "JobTailor", // Optional. Site title for rankings on openrouter.ai.
      },
      model: "deepseek/deepseek-r1:free",
      messages: [
        {
          role: "system",
          content:
            "You are an expert career assistant that generates interview notes based on job descriptions and user details. Respond with JSON containing 'interviewNotes'.",
        },
        {
          role: "user",
          content: `Job Description:\n ${jobDescription}\n\nUser Details:\n ${userDetails}`,
        },
      ],
      response_format: { type: "json_object" },
    });
    const data = JSON.parse(completion.choices[0].message.content);
    res.json(data);
  } catch (error) {
    console.error("Resume generation error:", error);
    res.status(500).json({
      error: "Failed to generate resume",
      details: error.message,
    });
  }
};
