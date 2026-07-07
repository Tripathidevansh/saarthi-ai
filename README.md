# Saarthi AI
**Har Nagarik Ka Digital Saarthi**

Saarthi AI is a fully functional Next.js 14 civic-tech application designed to act as an AI-powered conversational companion and visual reporting assistant for Indian citizens accessing public services.

---

## The Problem
For millions of citizens in India, navigating government welfare benefits and municipal offices presents severe entry barriers due to language differences, complex bureaucratic terminology, and lack of transparency. Key public scheme parameters are scattered across disconnected websites, while filing local civic complaints (like road defects, street light failures, or pipe leaks) requires drafting formal petitions to specific municipal departments that citizens are unfamiliar with. This creates a civic access gap that leaves many vulnerable populations underserved.

---

## Our Solution
Saarthi AI closes this gap by consolidating welfare scheme indexing, document checklists, and local grievance reporting into a single intuitive, multilingual portal. Using generative AI, Saarthi translates official procedures into simple language, automatically detects eligible welfare benefits from conversation logs, and analyzes pictures of municipal issues in-memory to categorize, assign, and draft civic petitions.

---

## Key Features

- **Ask Saarthi AI (Real Gemini API Chat)**: 
  Engage in context-aware conversations. The backend calls Google Gemini 2.5 Flash to answer civic questions, simplify complex processes, and dynamically match user profiles with eligible programs.
- **Dynamic Scheme Matcher (Real Gemini API + Firestore)**: 
  Whenever Gemini detects matching welfare benefits in a chat, it structures a JSON recommendation payload. The client searches the Firestore `schemes` database and renders complete **Scheme Cards** (containing required documents, eligibility details, and links).
- **Explain Simply & Translate (Real Gemini API)**: 
  Action buttons on assistant response bubbles let users simplify bureaucratic jargon or translate chat history to other target languages via on-demand Gemini prompt routes.
- **Listen Feature (Native Web Speech API)**: 
  A Text-to-Speech tool that uses the browser's native `speechSynthesis` API to read assistant replies aloud in regional accents.
- **Incident Visual Reporting (Real Gemini API Vision + Firestore)**: 
  Upload a picture of a civic issue. The client converts the file into a base64 string in-memory. The `/api/analyze-complaint` route forwards it to Gemini 2.5 Flash Vision to extract metadata (severity level, responsible department, resolution time) and drafts a formal complaint. The ticket is then registered in Firestore.
- **Citizen Dashboard (Firestore + Mock Data)**: 
  Displays verified citizen details for user "Rohan Verma", suggestions calendar (passport renewal, scholarship deadlines), civic alerts, and a history feed queried directly from the Firestore `/complaints` collection.
- **Multi-Language UI (Static Context Mapping)**: 
  Fully localizes the interface text across English, हिन्दी, বাংলা, தமிழ், and मराठी.
- **Dark Mode Configuration**: 
  Supports persistent system and toggleable Light/Dark modes utilizing `next-themes`.

---

## Tech Stack

| Technology / Library | Version | Purpose |
| :--- | :--- | :--- |
| **Next.js** | `14.2.35` | Core Application Framework (App Router & API Routes) |
| **React** | `^18` | UI Library |
| **Tailwind CSS** | `^3.4.1` | Styling Utility (brand colors, gradients, layout) |
| **@google/genai** | `^2.10.0` | Official Google Gen AI SDK (Gemini 2.5 Flash integration) |
| **Firebase** | `^12.15.0` | Client Database SDK (Cloud Firestore) |
| **Framer Motion** | `^12.42.2` | Page transitions, hover cards, and micro-animations |
| **Next Themes** | `^0.4.6` | Persistent Light/Dark theme switching |
| **Lucide React** | `^1.23.0` | UI Icons |
| **Dotenv** | `^17.4.2` | Local Environment Parameter loading (seeding script) |

---

## Architecture Overview

Saarthi AI is structured around a decoupled Client-Server architecture utilizing Next.js API Routes:

```text
Saarthi AI Architecture Flow:
[User Interface] ──(Inputs/Image)──> [API Route] ──> [Gemini 2.5 Flash]
       ▲                                                   │ (Structured JSON)
       │                                                   ▼
[Dashboard / Cards] <──(Real-time Queries)── [Cloud Firestore]
```

### Folder Directory Breakdown:
- `/app`: Application router routes (`page.tsx` landing, `/dashboard`, `/assistant` chat, `/report` vision).
- `/app/api`: Server-side API endpoints wrapping Gemini SDK operations.
- `/components`: Custom modular components (`Logo.tsx`, `Header.tsx`, `Sidebar.tsx`, `GlassCard.tsx`, etc.).
- `/lib`: Firestore configurations (`firebase.ts`), custom localization hooks (`i18n.tsx`), and database seed vectors (`schemes-seed.ts`).
- `/scripts`: Standalone Node.js scripting files.

---

## Screenshots

### 1. Landing Portal
![Saarthi AI Landing Screen](https://raw.githubusercontent.com/aida-public/placeholder-landing.png)
*Tagline, visual shortcuts, marquee strip, statistics counter, and feature grid.*

### 2. Citizen Dashboard
![Saarthi AI Citizen Dashboard Screen](https://raw.githubusercontent.com/aida-public/placeholder-dashboard.png)
*Rohan Verma's profile card, suggested updates (passport, bills), recent complaints registry, and alerts list.*

### 3. Ask Saarthi AI Chat Window
![Saarthi AI Assistant Screen](https://raw.githubusercontent.com/aida-public/placeholder-assistant.png)
*Multilingual conversation log, dynamic scheme matching cards, and text action widgets.*

### 4. Vision Incident Grievance Page
![Saarthi AI Vision Screen](https://raw.githubusercontent.com/aida-public/placeholder-report.png)
*Camera file drag-drop field, AI vision category output, editable complaint textbox, and confirmation tracking code card.*

---

## Getting Started / Local Setup

### 1. Clone & Setup
Clone the repository and navigate to the project directory:
```bash
cd saarthi-ai
```

### 2. Install Dependencies
Install all package configurations:
```bash
npm install
```

### 3. Setup Environment Variables
Configure your environment parameters. Create a `.env.local` file at the root:
```bash
cp .env.example .env.local
# Open .env.local and populate the values
```

### 4. Seed the Database
Seed Cloud Firestore with 15 real welfare schemes (PM-Kisan, Ayushman Bharat, PMAY-U, etc.):
```bash
node scripts/seed-schemes.js
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Environment Variables

| Variable Name | Description | Required For |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Google AI Studio Developer Key | Gemini 2.5 Flash API calls |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API Access Key | Client SDK Firestore Database |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Domain | Client SDK Database Identification |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Project identifier ID | Client SDK Database Connection |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging sender ID | Database Connection |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase App Identifier | Database Connection |

---

## API Routes

### 1. `/api/chat`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "message": "User query text",
    "history": [{"role": "user", "text": "previous query"}],
    "language": "en",
    "action": "explain | translate",
    "targetLanguage": "hi (optional)"
  }
  ```
- **Returns**:
  ```json
  {
    "text": "Gemini response text",
    "recommendedSchemes": [
      {
        "schemeName": "PM Kisan",
        "eligibilityTags": ["Farming", "Landowner"],
        "confidenceScore": 95
      }
    ]
  }
  ```

### 2. `/api/analyze-complaint`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "image": "data:image/jpeg;base64,...",
    "description": "Optional comment text"
  }
  ```
- **Returns**:
  ```json
  {
    "trackingId": "SAARTHI-729415",
    "analysis": {
      "issueType": "road_damage",
      "severity": "High",
      "department": "Public Works Department",
      "estimatedResolution": "5 Days",
      "draftComplaint": "Formal petition text drafted...",
      "confidenceScore": 92
    }
  }
  ```

---

## Known Limitations / Not Yet Implemented

- **No Real Authentication**: User context is hardcoded to a mock object (`{ name: "Rohan Verma", uid: "demo-user-1" }`) for demo purposes.
- **In-Memory Images**: Uploaded images are converted to base64, processed directly in Gemini's API context, and discarded immediately. No Firebase Storage setup is integrated.
- **Regional Speech Models**: Native browser `speechSynthesis` voices are dependent on local machine voice lists; non-English/non-Hindi text playback quality depends on client OS support.

---

## Future Roadmap

- **Storage Persistence Integration**: Connect Firebase Storage to persist image attachments for municipal records.
- **Official API Grievance Pipelines**: Wire tracking code submits directly to civic grievance channels (like CPGRAMS).
- **Aadhaar Mock Sandbox**: Create a document checklist verification gateway simulating official Aadhaar verification APIs.
- **Speech-to-Text Inputs**: Integrate native Web Speech API recognition directly in the input bar.

---

## Built For
This project was built for **DEVENGERS PromptWars 2026** hackathon under the **Smart Bharat – AI-Powered Civic Companion** theme.

---

## License
MIT License. Feel free to use and distribute.

---

## Contributors
- **DEVENGERS Hackathon Team** (PromptWars 2026)
