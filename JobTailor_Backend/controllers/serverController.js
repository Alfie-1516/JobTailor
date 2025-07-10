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
            model: "tngtech/deepseek-r1t2-chimera:free",
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