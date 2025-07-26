import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: "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",
});

export const generateResume = async (req, res) => {
    const {jobDescription, userDetails} = req.body;
    
    // Check if API key is set
    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({error: "OpenAI API key not configured"});
    }
    
    try{
        const completion = await client.chat.completions.create({
            model: "google/gemma-3n-e2b-it:free",
            messages: [
                {
                    role: "system",
                    content:  "You are an expert career assistant that generates resumes based on job descriptions and user details. Respond with JSON containing 'resumeText'."
                },
                {
                    role: "user",
                    content: `Job Description:\n ${jobDescription}\n\nUser Details:\n ${userDetails}`
                },
            ],
            response_format: {type: "json_object"},
        });
        const data = JSON.parse(completion.choices[0].message.content);
        res.json(data);
    } catch (error) {
        console.error("Resume generation error:", error);
        res.status(500).json({
            error: "Failed to generate resume", 
            details: error.message
        });
    }
}

export const generateCoverLetter = async (req, res) => {
    const {jobDescription, userDetails} = req.body;
    
    // Check if API key is set
    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({error: "OpenAI API key not configured"});
    }
    
    try{
        const completion = await client.chat.completions.create({
            model: "tngtech/deepseek-r1t2-chimera:free",
            messages: [
                {
                    role: "system",
                    content:  "You are an expert career assistant that generates cover letters based on job descriptions and user details. Respond with JSON containing 'coverLetterText'."
                },
                {
                    role: "user",
                    content: `Job Description:\n ${jobDescription}\n\nUser Details:\n ${userDetails}`
                },
            ],
            response_format: {type: "json_object"},
        });
        const data = JSON.parse(completion.choices[0].message.content);
        res.json(data);
    } catch (error) {
        console.error("Resume generation error:", error);
        res.status(500).json({
            error: "Failed to generate resume", 
            details: error.message
        });
    }
}

export const generateInterviewNotes = async (req, res) => {
    const {jobDescription, userDetails} = req.body;
    
    // Check if API key is set
    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({error: "OpenAI API key not configured"});
    }
    
    try{
        const completion = await client.chat.completions.create({
            model: "tngtech/deepseek-r1t2-chimera:free",
            messages: [
                {
                    role: "system",
                    content:  "You are an expert career assistant that generates interview notes based on job descriptions and user details. Respond with JSON containing 'interviewNotes'."
                },
                {
                    role: "user",
                    content: `Job Description:\n ${jobDescription}\n\nUser Details:\n ${userDetails}`
                },
            ],
            response_format: {type: "json_object"},
        });
        const data = JSON.parse(completion.choices[0].message.content);
        res.json(data);
    } catch (error) {
        console.error("Resume generation error:", error);
        res.status(500).json({
            error: "Failed to generate resume", 
            details: error.message
        });
    }
}