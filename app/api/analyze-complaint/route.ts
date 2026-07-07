import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const generateTrackingId = () => {
  const digits = Math.floor(100000 + Math.random() * 900000);
  return `SAARTHI-${digits}`;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { image, description = "" } = body;

    if (!image) {
      return NextResponse.json({ error: "Image data is required" }, { status: 400 });
    }

    // Extract raw base64 and mimeType
    // Example: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ..."
    const match = image.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
    if (!match) {
      return NextResponse.json(
        { error: "Invalid image format. Must be a base64 data URL." },
        { status: 400 }
      );
    }

    const mimeType = match[1];
    const base64Data = match[2];

    const systemPrompt = `You are analyzing a photo of a civic issue in India. 
Identify:
1. the type of issue (pothole, garbage, water leakage, streetlight fault, road damage, etc.)
2. a severity level (Low/Medium/High)
3. the Indian government department likely responsible (e.g. PWD, Municipal Corporation, Electricity Board)
4. an estimated resolution time (e.g. "3 Days", "5 Days", "1 Week")
5. draft a formal, polite official complaint paragraph describing the issue for submission.

Return this as structured JSON matching the requested schema.`;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        issueType: { type: Type.STRING },
        severity: { type: Type.STRING },
        department: { type: Type.STRING },
        estimatedResolution: { type: Type.STRING },
        draftComplaint: { type: Type.STRING },
        confidenceScore: { type: Type.INTEGER }
      },
      required: [
        "issueType",
        "severity",
        "department",
        "estimatedResolution",
        "draftComplaint",
        "confidenceScore"
      ]
    };

    const userPrompt = `Analyze this civic issue image. ${
      description ? `User description of the issue: "${description}"` : ""
    }`;

    // Call Gemini 2.5 Flash Vision in the same request
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType
              }
            },
            {
              text: userPrompt
            }
          ]
        }
      ],
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: responseSchema
      }
    });

    const rawText = response.text;
    if (!rawText) {
      throw new Error("Empty response from Gemini Vision API");
    }

    const data = JSON.parse(rawText);
    const trackingId = generateTrackingId();

    // Store complaint metadata to Firestore under /complaints/{trackingId}
    // Do NOT store image or image URL.
    try {
      await setDoc(doc(db, "complaints", trackingId), {
        issueType: data.issueType,
        severity: data.severity,
        department: data.department,
        estimatedResolution: data.estimatedResolution,
        complaintText: data.draftComplaint,
        status: "Pending",
        timestamp: new Date()
      });
    } catch (dbErr) {
      console.error("Firestore complaint save failed:", dbErr);
      // Proceed even if database fails, returning generated metadata for demo resilience
    }

    return NextResponse.json({
      trackingId,
      analysis: data
    });
  } catch (error: any) {
    console.error("Error in analyze-complaint API route:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze complaint image" },
      { status: 500 }
    );
  }
}
