const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;
const MODEL = "gemini-3.8-flash";

let aiInstance;

async function getAI() {
  if (!aiInstance) {
    const { GoogleGenAI } = await import("@google/genai");

    aiInstance = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  return aiInstance;
}

app.get("/", (req, res) => {
  res.send("SANBOL AI Server is Running");
});

async function startStreamWithRetry(message) {
  const ai = await getAI();

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const stream = await ai.models.generateContentStream({
        model: MODEL,
        contents: message,
        config: {
          maxOutputTokens: 500,
          systemInstruction:
            "You are SANBOL AI, a smart agricultural assistant. Help users with soil analysis, pH, nitrogen, phosphorus, potassium, irrigation, fertilizers, and farming. Give clear, accurate, practical, concise advice. Respond in the same language as the user.",
        },
      });

      const iterator = stream[Symbol.asyncIterator]();
      const firstChunk = await iterator.next();

      return { iterator, firstChunk };
    } catch (error) {
      const message = String(error.message || "");

      const temporary =
        error.status === 503 ||
        error.statusCode === 503 ||
        message.includes("503") ||
        message.includes("UNAVAILABLE");

      if (!temporary || attempt === 3) {
        throw error;
      }

      await new Promise((resolve) =>
        setTimeout(resolve, attempt * 1500)
      );
    }
  }
}

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({
      error: "Please enter a message",
    });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      error: "Gemini API key is missing",
    });
  }

  try {
    const { iterator, firstChunk } =
      await startStreamWithRetry(message.trim());

    res.setHeader("Content-Type", "application/x-ndjson");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    const sendChunk = (data) => {
      res.write(JSON.stringify(data) + "\n");
    };

    if (firstChunk.value?.text) {
      sendChunk({ text: firstChunk.value.text });
    }

    while (!firstChunk.done) {
      const next = await iterator.next();

      if (next.done) break;

      if (next.value?.text) {
        sendChunk({ text: next.value.text });
      }
    }

    res.end();
  } catch (error) {
    console.error("Gemini Error:", error);

    if (res.headersSent) {
      res.write(
        JSON.stringify({
          error: "SANBOL AI could not finish the response. Please try again.",
        }) + "\n"
      );
      return res.end();
    }

    res.status(500).json({
      error: "SANBOL AI is temporarily unavailable. Please try again.",
    });
  }
});
let latestSoilData = null;

app.post("/api/sensors", (req, res) => {
  const { ph, nitrogen, phosphorus, potassium, moisture, temperature } =
    req.body;

  const values = [
    ph,
    nitrogen,
    phosphorus,
    potassium,
    moisture,
    temperature,
  ];

  if (!values.every((value) => typeof value === "number" && Number.isFinite(value))) {
    return res.status(400).json({
      error: "Invalid sensor readings",
    });
  }

  latestSoilData = {
    ph,
    nitrogen,
    phosphorus,
    potassium,
    moisture,
    temperature,
    updatedAt: new Date().toISOString(),
  };

  res.json({
    success: true,
    message: "Sensor data received",
  });
});

app.get("/api/sensors", (req, res) => {
  if (!latestSoilData) {
    return res.status(404).json({
      error: "No sensor readings received yet",
    });
  }

  res.json(latestSoilData);
});
app.listen(PORT, () => {
  console.log(`SANBOL AI Server running on port ${PORT}`);
});