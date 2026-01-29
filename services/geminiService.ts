
import { GoogleGenAI, Type } from "@google/genai";
import { PhishingTask } from "../types";

// Using gemini-2.5-flash-lite-latest - the best alias for free tier and educational apps
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
const STABLE_MODEL = 'gemini-2.5-flash-lite-latest';

export async function askMentor(question: string) {
  const prompt = `Ты — Cyber-Mentor, эксперт по кибербезопасности проекта SafeStep. 
  Ответь на вопрос пользователя "${question}" коротко (макс 3 предложения), профессионально, но понятно для подростка (14-16 лет). 
  Будь дружелюбным, используй современный IT-сленг. Отвечай на русском языке.`;

  try {
    const response = await ai.models.generateContent({
      model: STABLE_MODEL,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "Мои нейронные фильтры временно перегружены. Попробуй задать вопрос чуть позже, а пока изучи наши статьи!";
  }
}

export async function simulateOsintScan(nickname: string, name: string) {
  const prompt = `Simulate an OSINT (Open Source Intelligence) search for a person with nickname "${nickname}". 
  Provide 5-7 fake but realistic sounding "leaked" data points in Russian. 
  Example: "Найден на форуме lolz.guru (2021): привязанный email test@mail.ru", "Утечка геолокации по фото в ВК: школа №12".
  Return as a JSON array of strings.`;

  try {
    const response = await ai.models.generateContent({
      model: STABLE_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("OSINT Analysis Error:", error);
    return ["Протокол OSINT заблокирован брандмауэром", "Повторите попытку позже"];
  }
}

export async function generatePhishingTask(): Promise<PhishingTask> {
  const prompt = `Generate a realistic phishing email training task in Russian.
  Include sender, url (suspicious vs real), text body, is_phishing (boolean), and a hint explaining the red flags.
  Return as a JSON object.`;

  try {
    const response = await ai.models.generateContent({
      model: STABLE_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sender: { type: Type.STRING },
            url: { type: Type.STRING },
            text: { type: Type.STRING },
            is_phishing: { type: Type.BOOLEAN },
            hint: { type: Type.STRING }
          },
          required: ["sender", "url", "text", "is_phishing", "hint"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Task Generation Error:", error);
    throw error;
  }
}
