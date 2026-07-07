import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MOCK_USER_ID = "demo-user-1";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history = [], language = "en", action, targetLanguage } = body;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    let systemPrompt = "";
    let responseSchema: any = null;

    if (action === "explain") {
      systemPrompt = `You are Saarthi, a warm and trustworthy AI civic assistant for Indian citizens. 
Re-explain the following text in extremely simple, plain language. Break down complex jargon, documents, or procedures.
Respond in the SAME language as the input text.
Return the output as a JSON object with a single field 'text' containing the simplified explanation.`;

      responseSchema = {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING, description: "The simplified explanation text" },
        },
        required: ["text"],
      };
    } else if (action === "translate") {
      systemPrompt = `You are Saarthi, a warm and trustworthy AI civic assistant for Indian citizens.
Translate the following text into the language requested: "${targetLanguage || "Hindi"}". 
Ensure translation is warm, natural, and easy to read.
Return the output as a JSON object with a single field 'text' containing the translated content.`;

      responseSchema = {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING, description: "The translated text" },
        },
        required: ["text"],
      };
    } else {
      // Normal Chat Mode
      systemPrompt = `You are Saarthi, a warm and trustworthy AI civic assistant for Indian citizens. 
Detect the language the user is writing in and respond in that same language. 
Explain government schemes, documents, and procedures in simple, plain language. 
When relevant, recommend specific Indian government schemes (e.g. PM-Kisan, Ayushman Bharat, PM Awas Yojana) based on what the user describes about themselves. 
Always end scheme recommendations with a short list of required documents.

You must return a JSON response matching the requested schema. 
In the 'text' field, output your markdown conversational response.
In the 'recommendedSchemes' array, list any official Indian schemes mentioned in the conversational text. 
For each recommended scheme, provide:
1. 'schemeName' (e.g. "Ayushman Bharat")
2. 'eligibilityTags' (a list of 2-3 short tags showing why they qualify, e.g. ["Low Income", "Healthcare"])
3. 'confidenceScore' (a score from 1 to 100 representing how confident you are that the user qualifies).`;

      responseSchema = {
        type: Type.OBJECT,
        properties: {
          text: {
            type: Type.STRING,
            description: "The main conversational response in the user's language containing the guide/explanation."
          },
          recommendedSchemes: {
            type: Type.ARRAY,
            description: "A list of government schemes recommended during this turn.",
            items: {
              type: Type.OBJECT,
              properties: {
                schemeName: { type: Type.STRING },
                eligibilityTags: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                confidenceScore: { type: Type.INTEGER }
              },
              required: ["schemeName", "eligibilityTags", "confidenceScore"]
            }
          }
        },
        required: ["text"]
      };
    }

    // Build chat conversation payload for Gemini
    const contents: any[] = [];
    
    // Append conversation history
    if (!action && history && history.length > 0) {
      history.forEach((msg: any) => {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        });
      });
    }

    // Append current message/request
    const userPrompt = action 
      ? `Original Text:\n"${message}"`
      : message;

    contents.push({
      role: "user",
      parts: [{ text: userPrompt }]
    });

    // Call Gemini 2.5 Flash using unified @google/genai SDK
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    const rawText = response.text;
    if (!rawText) {
      throw new Error("Empty response from Gemini API");
    }

    const data = JSON.parse(rawText);

    // If it's a normal chat (no action helper was requested), save messages to Firestore
    if (!action) {
      try {
        // Save user message
        await addDoc(collection(db, "chats", MOCK_USER_ID, "messages"), {
          role: "user",
          text: message,
          language: language,
          timestamp: new Date()
        });

        // Save assistant response
        await addDoc(collection(db, "chats", MOCK_USER_ID, "messages"), {
          role: "assistant",
          text: data.text,
          language: language,
          timestamp: new Date()
        });
      } catch (dbErr) {
        console.error("Firestore logging failed:", dbErr);
        // Do not fail the response if database write fails during hackathon demo
      }
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in chat API route:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process chat" },
      { status: 550 }
    );
  }
}
