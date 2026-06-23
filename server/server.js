const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
});

const fs = require("fs");
const path = require("path");

const HOUSE_PROMPT = fs.readFileSync(
  path.join(__dirname, "house.txt"),
  "utf8"
);


app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await ai.models.generateContent({
  model: "gemini-2.5-flash-lite",

  contents: `
${HOUSE_PROMPT}

User: ${message}

Respond as Gregory House.
`
});

    
    res.json({
       reply: response.text
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
  error: "House is currently out of Vicodin. Try again in a minute."
});
  }
});

app.listen(5000, () => {
  console.log("Server running");
});