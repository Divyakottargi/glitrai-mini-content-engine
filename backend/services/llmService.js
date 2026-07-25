const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateImagePrompt(productName, description) {
  try {
    const prompt = `
You are an expert product photographer.

Create a highly detailed image generation prompt.

Product Name:
${productName}

Description:
${description}

Generate only the final prompt.
Do not explain anything.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.log(error);

    return `Professional product photography of ${productName}, ultra realistic, studio lighting, highly detailed.`;
  }
}

module.exports = {
  generateImagePrompt,
};