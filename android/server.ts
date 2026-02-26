import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Modality, Type, ThinkingLevel } from "@google/genai";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  const getAI = () => {
    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
    
    // Check if the key is missing or looks like a placeholder
    if (!apiKey || apiKey === 'YOUR_API_KEY' || apiKey.includes('INSERT_')) {
      throw new Error("API_KEY_MISSING");
    }
    
    return new GoogleGenAI({ apiKey });
  };

  // Helper to sanitize parts
  const sanitizeParts = (parts: any[]) => {
    return parts.map(part => {
      if (part.inlineData && part.inlineData.data) {
        const data = part.inlineData.data;
        if (typeof data === 'string' && data.startsWith('data:')) {
          const matches = data.match(/^data:(.+);base64,(.+)$/);
          if (matches) return { inlineData: { mimeType: matches[1], data: matches[2] } };
        }
      }
      return part;
    });
  };

  // Advanced AI Response
  app.post("/api/ai/advanced", async (req, res) => {
    try {
      const { message, history, imageBase64, systemInstruction } = req.body;
      const ai = getAI();
      const parts: any[] = [];
      if (imageBase64) {
        const match = imageBase64.match(/^data:(.+);base64,(.+)$/);
        parts.push({
          inlineData: {
            mimeType: match ? match[1] : 'image/jpeg',
            data: match ? match[2] : imageBase64
          }
        });
      }
      if (message) parts.push({ text: message });

      const sanitizedHistory = (history || []).map((turn: any) => ({
        role: turn.role === 'model' ? 'model' : 'user',
        parts: sanitizeParts(turn.parts || [])
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: [...sanitizedHistory, { role: 'user', parts }],
        config: {
          systemInstruction: systemInstruction,
          thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
          tools: [{ googleSearch: {} }]
        },
      });
      res.json({ text: response.text, model: 'gemini-3.1-pro-preview' });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  // Pro Chat Response
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { message, history, imageBase64, systemInstruction } = req.body;
      const ai = getAI();
      const parts: any[] = [];
      if (imageBase64) {
        const match = imageBase64.match(/^data:(.+);base64,(.+)$/);
        parts.push({
          inlineData: {
            mimeType: match ? match[1] : 'image/jpeg',
            data: match ? match[2] : imageBase64
          }
        });
      }
      if (message) parts.push({ text: message });

      const sanitizedHistory = (history || []).map((turn: any) => ({
        role: turn.role === 'model' ? 'model' : 'user',
        parts: sanitizeParts(turn.parts || [])
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...sanitizedHistory, { role: 'user', parts }],
        config: { systemInstruction },
      });
      res.json({ text: response.text });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  // Image Generation
  app.post("/api/ai/image-gen", async (req, res) => {
    try {
      const { prompt, imageSize } = req.body;
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts: [{ text: prompt }] },
        config: {
          imageConfig: { aspectRatio: "1:1", imageSize: imageSize || "1K" }
        }
      });
      const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
      res.json({ imageUrl: part ? `data:image/png;base64,${part.inlineData.data}` : null });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Image Editing
  app.post("/api/ai/image-edit", async (req, res) => {
    try {
      const { base64Image, prompt } = req.body;
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64Image.split(',')[1] || base64Image, mimeType: 'image/jpeg' } },
            { text: prompt }
          ]
        }
      });
      const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
      res.json({ imageUrl: part ? `data:image/png;base64,${part.inlineData.data}` : null });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Transcription
  app.post("/api/ai/transcribe", async (req, res) => {
    try {
      const { base64Audio, mimeType } = req.body;
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            { inlineData: { data: base64Audio, mimeType: mimeType || 'audio/wav' } },
            { text: "Transcribe this medical audio accurately. Return only the text." }
          ]
        }
      });
      res.json({ text: response.text });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Speech Generation (TTS)
  app.post("/api/ai/tts", async (req, res) => {
    try {
      const { text, voice } = req.body;
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: text.trim() }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: voice || 'Kore' } },
          },
        },
      });
      res.json({ audioData: response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Nearby Places
  app.post("/api/ai/nearby", async (req, res) => {
    try {
      const { prompt, location, config } = req.body;
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: config,
      });
      res.json({
        text: response.text,
        chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Email Validation
  app.post("/api/ai/validate-email", async (req, res) => {
    try {
      const { email } = req.body;
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Check whether the given email address is real or not: ${email}. Validate the email format and domain. Respond only in JSON format with true or false.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: { isReal: { type: Type.BOOLEAN } },
            required: ["isReal"]
          }
        }
      });
      res.json(JSON.parse(response.text || '{"isReal": false}'));
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => res.sendFile(path.join(__dirname, "dist/index.html")));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
