import OpenAI from "openai";
import dotenv from "dotenv";
import { prompt } from "../util/resume_prompt.js";
import { coverLetterPrompt } from "../util/coverLetter_Prompt.js";

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
            `You are an expert career assistant that generates cover letters based on job descriptions and user details. Respond with JSON of this structure {
  "applicantName": "",
  "applicantEmail": "",
  "applicantPhone": "",
  "applicantLocation": "",
  "date": "",
  "recipientName": "",
  "companyName": "",
  "greeting": "",
  "openingParagraph": "",
  "bodyParagraph1": "",
  "bodyParagraph2": "",
  "bodyParagraph3": "",
  "closingParagraph": "",
}'.`,
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
            `You are an expert career assistant that generates interview notes based on job descriptions and user details. Respond with JSON of this structure {
  "position": [
    ""
  ],
  "company": [
    ""
  ],
  "aboutCompany": [
    ""
  ],
  "requiredYearsOfExperience": [
    ""
  ],
  "salary": [
    ""
  ],
  "requiredTechnicalSkills": [
    ""
  ],
  "thingsToLearnPriorToInterview": [
    ""
  ],
  "questionsToAskDuringInterview": [
    ""
  ]
}`,
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
