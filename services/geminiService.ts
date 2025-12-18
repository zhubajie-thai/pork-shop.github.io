
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from "../types";

export async function generateRecipeForProduct(productName: string, lang: string = 'en'): Promise<Recipe | null> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const langInstruction = lang === 'th' ? "Respond in Thai language." : lang === 'my' ? "Respond in Myanmar language." : "Respond in English.";
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a gourmet recipe for ${productName}. ${langInstruction}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            ingredients: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            instructions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            cookingTime: { type: Type.STRING },
            difficulty: { type: Type.STRING, enum: ["Easy", "Intermediate", "Advanced"] }
          },
          required: ["title", "ingredients", "instructions", "cookingTime", "difficulty"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating recipe:", error);
    return null;
  }
}

export async function askTheButcher(query: string, chatHistory: any[], lang: string = 'en'): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const langInstruction = lang === 'th' ? "You must speak and respond ONLY in Thai language." : lang === 'my' ? "You must speak and respond ONLY in Myanmar language." : "You must speak and respond ONLY in English.";
    
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are "Old Man Pete", a friendly, expert butcher with 40 years of experience. You know everything about pork cuts, cooking temperatures, seasoning, and animal welfare. Keep your answers concise, rustic, and helpful. Use butcher terminology where appropriate. ${langInstruction}`,
      },
    });

    const response = await chat.sendMessage({ message: query });
    return response.text;
  } catch (error) {
    console.error("Error asking the butcher:", error);
    return lang === 'th' ? "ขอโทษทีเพื่อนบ้าน ฉันยุ่งอยู่กับการเตรียมหมูนิดหน่อย ถามฉันใหม่ในอีกนาทีนะ!" : "Sorry neighbor, I'm a bit tied up with a side of pork. Ask me again in a minute!";
  }
}
