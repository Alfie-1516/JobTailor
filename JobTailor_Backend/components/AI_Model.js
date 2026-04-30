import { openrouter } from "../lib/openrouter.js";

export async function ai_model(prompt) {
  try {
    console.log(prompt);
    const response = await openrouter.chat.send({
      model: "tngtech/deepseek-r1t2-chimera:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenRouter API Error:", error);
    throw new Error(
      error.message || "Failed to get AI response from OpenRouter"
    );
  }
}
