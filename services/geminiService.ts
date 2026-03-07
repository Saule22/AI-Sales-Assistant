
import { GoogleGenAI, Chat } from "@google/genai";
import { Message, Role } from '../types';
import { SYSTEM_INSTRUCTION } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const chat: Chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
});

export const getBotResponse = async (prompt: string, history: Message[]): Promise<string> => {
  try {
    // Note: The current implementation of this simple chat does not pass full history
    // because the `ai.chats.create` with system instruction already maintains context.
    // For more complex scenarios, you might need to manage history more explicitly.
    const response = await chat.sendMessage({ message: prompt });
    
    if (response.text) {
      return response.text;
    }

    return "Мен толық түсінбедім. Қайталап айта аласыз ба?";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Сіздің сұранысыңызды өңдеу кезінде қате пайда болды. Кейінірек қайталап көріңіз.";
  }
};
