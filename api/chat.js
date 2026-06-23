import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config({
  path: ".env.local",
  override: true
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const HOUSE_PROMPT = fs.readFileSync(
  path.join(process.cwd(), "server", "house.txt"),
  "utf8"
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { message } = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
${HOUSE_PROMPT}

User: ${message}

Respond as Dr. Gregory House.
`,
    });

    return res.status(200).json({
      reply: response.text,
    });
  } catch (err) {
  console.error("FULL ERROR:");
  console.error(err);

  return res.status(503).json({
  error: "House is busy insulting someone else. Try again in a moment."
});
}
}