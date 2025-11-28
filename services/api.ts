
import { GoogleGenAI } from "@google/genai";
import { MOCK_INPI_DB, AI_SYSTEM_INSTRUCTION } from '../constants';
import { Process, InpiMockResponse, Dispatch, DispatchStatus, Message } from '../types';

// Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const MockApiService = {
  // Auth
  verifyEmailCode: async (code: string): Promise<boolean> => {
    await delay(1000);
    return code === '123456';
  },

  // INPI Integration (Mock)
  searchByNumber: async (number: string): Promise<InpiMockResponse | null> => {
    await delay(1500);
    const found = MOCK_INPI_DB[number];
    if (found) {
      return {
        number: found.inpiNumber,
        brand: found.brandName,
        class: found.niceClass,
        owner: found.owner,
        specification: found.specification,
        status: found.status,
        dispatches: found.dispatches
      };
    }

    // Simulate "Not Found" or "New Process"
    return null;
  },

  // Gemini: Explain Dispatch
  explainDispatchWithAI: async (dispatch: Dispatch): Promise<string> => {
    if (!process.env.API_KEY) {
      return "Chave de API não configurada. Por favor, configure a chave para usar a IA.";
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Explique o seguinte despacho do INPI para um leigo e diga o que fazer:
        Código: ${dispatch.code}
        Descrição: ${dispatch.description}
        Status: ${dispatch.status}
        `,
        config: {
          systemInstruction: AI_SYSTEM_INSTRUCTION,
          thinkingConfig: { thinkingBudget: 0 } // Flash model usually doesn't need high budget for simple explanation
        }
      });
      return response.text || "Não foi possível gerar uma explicação no momento.";
    } catch (error) {
      console.error("AI Error:", error);
      return "Erro ao consultar inteligência artificial. Tente novamente mais tarde.";
    }
  },

  // Notifications (Mock)
  scheduleNotification: async (title: string, date: string): Promise<void> => {
    console.log(`[MOCK NOTIFICATION] Scheduled: "${title}" for ${date}`);
    // In a real native app, this would call the device's Push Notification API
    return Promise.resolve();
  },

  // Chat Services (Mock)
  sendMessage: async (text: string): Promise<Message> => {
    await delay(500);
    return {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date().toISOString(),
      isRead: true
    };
  },

  receiveMockReply: async (): Promise<Message> => {
    await delay(2500);
    return {
      id: (Date.now() + 1).toString(),
      text: 'Obrigado pelo contato! Vou analisar seu caso e retorno em instantes.',
      sender: 'specialist',
      timestamp: new Date().toISOString(),
      isRead: false
    };
  }
};