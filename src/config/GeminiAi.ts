/*
 * Install the Generative AI SDK
 */

import {
  GoogleGenerativeAI,
} from "@google/generative-ai";


const apiKey: any = process.env.NEXT_PUBLIC_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


export const chatSession = (prompt: any) => {
  console.log(prompt.userPrompt, "prompt==>", prompt.modelPrompt)
  return model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: prompt.userPrompt,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: prompt.modelPrompt,
          },
        ],
      },
    ]
  })
};
