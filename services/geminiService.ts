
import { GoogleGenAI } from "@google/genai";

export interface MockupDetails {
  type: string;
  flavor: string;
  filling: string;
  frosting: string;
  message: string;
  inspirationImage?: {
    data: string; // Base64
    mimeType: string;
  };
}

export const generateCakeVisualMockup = async (details: MockupDetails) => {
  // Always create a new instance before use to ensure the most current API key is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const prompt = `A professional, high-end food photography shot of a ${details.type} cake. 
    Culinary Details: 
    - Base Flavour: ${details.flavor}
    - Filling: ${details.filling}
    - Frosting: ${details.frosting}
    - Custom Elements: ${details.message}
    
    Aesthetic Direction: Premium artisan bakery style, elegant presentation on a ceramic pedestal, soft natural morning light, magazine-quality, Ottolenghi aesthetic. 
    The photograph should look like a real, finished custom cake from a luxury bakery. 
    ${details.inspirationImage ? "Incorporate the visual style, color palette, or decorative spirit of the attached inspiration image into this specific cake type." : ""}
    Clean, minimalist background with soft neutral tones.`;

    const parts: any[] = [{ text: prompt }];

    if (details.inspirationImage) {
      parts.push({
        inlineData: {
          data: details.inspirationImage.data,
          mimeType: details.inspirationImage.mimeType,
        },
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        // Correctly identify image part from parts array
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Visual Mockup AI failed:", error);
    return null;
  }
};
