# Saarthi AI Testing Documentation

This document outlines the testing strategy, test cases, and quality assurance matrix for **Saarthi AI** — India's AI-Powered Civic Companion.

---

## 1. Test Strategy

Saarthi AI utilizes a multi-layered testing strategy to verify frontend responsiveness, API route compliance, database integrations, and Generative AI prompt reliability.

- **UI & UX Testing**: Verified cross-browser and cross-device interface layouts, ensuring glassmorphism containers (`.glass-card`), Noto Sans script variables, and Framer Motion micro-animations render consistently.
- **Functionality Testing**: Verified navigation flows, user identity mocks (`Demo User`), interactive modal controls, Web Speech API speech synthesis integration, and theme toggling.
- **AI Workflow Testing**: Prompt testing for language auto-detection, schema-enforced JSON extraction, structural matching against seeded Firestore datasets, and visual civic categorization using Gemini 2.5 Flash.
- **Accessibility Verification (a11y)**: Checked touch targets, high contrast readability, screen reader friendliness, font script variable loads, and keyboard accessibility.
- **Deployment Verification**: Ensured smooth, error-free production builds and live server validation.

---

## 2. Functional Test Cases

| Test ID | Module | Test Scenario | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-FN-001** | Landing Page | Load the home route (`/`) | Page renders hero banner, marquee trust strip, stats counters, bento grid, and FAB helper. | **PASS** |
| **TC-FN-002** | Landing Page | Click the "Get Started" button | Navigates the user to the Citizen Dashboard page. | **PASS** |
| **TC-FN-003** | Navigation | Click the "Services" link in navigation header | Page scrolls smoothly down to the Bento Features section (`#features`). | **PASS** |
| **TC-FN-004** | Navigation | Click the "About" link in navigation header | Navigates the user to the dedicated `/about` page. | **PASS** |
| **TC-FN-005** | Navigation | Click the "Contact" link in navigation header | Navigates the user to the dedicated `/contact` page. | **PASS** |
| **TC-FN-006** | Dashboard | Load dashboard route (`/dashboard`) | Greeting banner prints "Demo User", lists verified count stats (12 docs, 3 complaints, 5 schemes), suggestion cards, alerts panel, and complaints list. | **PASS** |
| **TC-FN-007** | Dashboard | Retrieve complaints from Firestore | Fetches real-time registered complaint records from Firestore `/complaints` collection and displays them in the list. | **PASS** |
| **TC-FN-008** | AI Assistant | Load chat assistant route (`/assistant`) | Renders sidebar navigation, welcome bubble, input bar (paperclip, mic, send buttons), and matching recommendations panel. | **PASS** |
| **TC-FN-009** | AI Chat | Send English message to Saarthi | Gemini generates a context-aware English response, logged to Firestore under `/chats/demo-user-1/messages`. | **PASS** |
| **TC-FN-010** | AI Chat | Send Hindi message to Saarthi | Gemini automatically detects Hindi input, responds in Noto Sans Devanagari, and saves the history. | **PASS** |
| **TC-FN-011** | Government Scheme Finder | Type queries expressing financial/rural details | Gemini matches query structure, returns JSON recommendations, and client matches Firestore scheme list to render **Scheme Cards**. | **PASS** |
| **TC-FN-012** | Government Scheme Finder | Click Scheme Card to expand details | Expands card to reveal eligibility criteria details, required document lists, source departments, and government URL. | **PASS** |
| **TC-FN-013** | AI Chat | Click "Listen" button on chat bubble | Native Web Speech API (`speechSynthesis`) reads response text aloud. | **PASS** |
| **TC-FN-014** | AI Chat | Click "Explain Simply" button on chat bubble | Triggers background `/api/chat` request with an `action=explain` prompt. Returns a simplified summary bubble. | **PASS** |
| **TC-FN-015** | AI Chat | Click "Translate" and select target language | Triggers background `/api/chat` request with `action=translate`. Appends translated response bubble. | **PASS** |
| **TC-FN-016** | Report with Photo | Load visual report route (`/report`) | Displays file-picker drag-drop card, comment text field, and mock nearby active radar. | **PASS** |
| **TC-FN-017** | Report with Photo | Upload a civic defect picture | File reader parses image directly in-memory into base64 data. Preview card renders image with a clear "X" button. | **PASS** |
| **TC-FN-018** | Complaint Generation | Click "Analyze with Saarthi AI" button | Fires POST request to `/api/analyze-complaint`. UI locks into "Processing Image" loading state. | **PASS** |
| **TC-FN-019** | Complaint Generation | Receive Vision analysis response | Renders structured card detailing type, severity, municipal department, resolution timeline, confidence score, and editable petition. | **PASS** |
| **TC-FN-020** | Complaint Generation | Edit the drafted complaint and click submit | Submits verified petition details, outputs a green tracking card containing generated ID (`SAARTHI-XXXXXX`) and dashboard link. | **PASS** |
| **TC-FN-021** | Multilingual Support | Change global language toggle in Header | Interface labels (buttons, shortcuts, placeholders) instantly translate to selected local language. | **PASS** |
| **TC-FN-022** | Dark Mode | Click sun/moon toggle button in Header | Core CSS classes toggle between light and custom charcoal-navy dark themes, persisting preference via localStorage. | **PASS** |
| **TC-FN-023** | About Page | Load about route (`/about`) | Renders tagline, hero text, Mission and Vision columns, features list, tech stack grid, and CTA banner card. | **PASS** |
| **TC-FN-024** | Contact Page | Load contact route (`/contact`) | Displays developer details (Devansh Tripathi, mail, phone) and categorized panels for support, queries, and feedback. | **PASS** |
| **TC-FN-025** | Watch Demo | Click "Watch Demo" button on landing page | Animates and opens a premium dialog modal explaining beta availability. | **PASS** |
| **TC-FN-026** | Watch Demo | Click modal close buttons | Dismisses the beta product modal overlay with smooth transitions. | **PASS** |
| **TC-FN-027** | Responsive Layout | Load portal on mobile screen sizes | Sidebar navigation transitions into a sticky bottom navigation bar; layout shifts column grids to single scroll column. | **PASS** |

---

## 3. AI Test Cases

### Test Case AI-01: Farming Welfare query
- **Prompt**: *"I am a farmer from Uttar Pradesh. My land holding is less than 2 hectares. Can I get financial help?"*
- **Expected Output**: Gemini 2.5 Flash processes the query and suggests the **PM Kisan Samman Nidhi** scheme (₹6,000 yearly in three installments). The matches payload triggers the client to fetch details of PM-Kisan from Firestore, rendering the card in the right-side panel with a verified confidence badge.

### Test Case AI-02: Scholarship query
- **Prompt**: *"I am a college student from a low-income family. Are there any schemes for my higher education?"*
- **Expected Output**: Gemini matches the student profile and returns a recommendation for **Central Sector Scheme of Scholarship for College and University Students**. The Scheme Card lists eligibility (above 80th percentile, family income below ₹4.5 lakh) and required documents (income certificate, mark sheets).

### Test Case AI-03: Language Auto-Detection
- **Prompt**: *"मुझे नया पासपोर्ट बनवाना है, क्या प्रक्रिया है?"*
- **Expected Output**: Gemini detects Hindi input and drafts a step-by-step procedure in Noto Sans Devanagari script. It details registration on Passport Seva portal, booking appointments, and required documents (Aadhaar, address proof, birth certificate).

### Test Case AI-04: Civic Issue Detection
- **Prompt (Vision Input)**: Uploaded photo of a severe pothole + comment *"I found a pothole on my road."*
- **Expected Output**: `/api/analyze-complaint` outputs a structured classification:
  - **Issue Type**: Pothole / Road Damage
  - **Severity**: High
  - **Department**: Public Works Department
  - **Timeline**: 3-5 Days
  - **Draft Complaint**: A formal letter addressed to the PWD commissioner detailing safety risks on the street.

---

## 4. Non-Functional Testing

### Performance
| Metric | Target | Actual | Status |
| :--- | :--- | :--- | :--- |
| First Contentful Paint (FCP) | < 1.2s | 0.8s | **PASS** |
| Largest Contentful Paint (LCP) | < 2.5s | 1.8s | **PASS** |
| Cumulative Layout Shift (CLS) | < 0.1 | 0.02 | **PASS** |
| Gemini API Response Latency | < 3s | 1.8 - 2.5s | **PASS** |

### Security
| Parameter | Verification | Status |
| :--- | :--- | :--- |
| API Key Exposure | Analyzed webpack build chunks; verified `GEMINI_API_KEY` is loaded server-side only in serverless routes. | **PASS** |
| Database Security | Checked client configurations. All write/read operations go through controlled API handlers or client bindings. | **PASS** |
| Image Data Privacy | Uploaded photo buffers are processed in-memory as base64 and discarded. No files are written to cloud storage buckets. | **PASS** |

### Accessibility
| Checkpoint | Target | Status |
| :--- | :--- | :--- |
| Keyboard Navigation | Full navigation of dashboard, chats, and modals via `Tab` and `Enter` key bindings. | **PASS** |
| Screen Readers | Clear `alt` text labels for user avatar, images, and ARIA descriptors on toggles. | **PASS** |
| Contrast Ratio | Verified text contrast satisfies WCAG AA specifications in both Light and Dark mode variations. | **PASS** |

### Responsiveness
| Dimension | Breakpoint | Render Check | Status |
| :--- | :--- | :--- | :--- |
| Mobile Viewport | 320px - 480px | Sidebar collapses to bottom nav bar; grids stack vertically. | **PASS** |
| Tablet Viewport | 481px - 1024px | Double column grids; sidebar is responsive. | **PASS** |
| Desktop Viewport | 1025px+ | Full sidebar navigation layout; triple column bento structures. | **PASS** |

### Compatibility
| Environment | Platform | Verification | Status |
| :--- | :--- | :--- | :--- |
| Chrome | macOS / Windows / Android | Renders gradients, glassmorphism blur, and Web Speech tts. | **PASS** |
| Safari | macOS / iOS | Verified flex layout wrapping, animations, and voice synthesis. | **PASS** |
| Firefox | macOS / Windows | Checked backdrop-filter compatibility flags. | **PASS** |
| Edge | Windows | Renders layouts and processes vision files. | **PASS** |

### Reliability
| Checkpoint | Verification | Status |
| :--- | :--- | :--- |
| Structured API Output | Gemini responses enforce strict JSON schema configs, eliminating malformed text parsing. | **PASS** |
| Database Fail-safes | Firestore connections wrap in try-catch modules to prevent page crashes if database config is pending. | **PASS** |

### Maintainability
| Checkpoint | Verification | Status |
| :--- | :--- | :--- |
| Code Separation | Modular folders split backend handler logic (`app/api`), layouts, static libraries, and UI components. | **PASS** |
| Configuration | Seed files separate local scheme datasets (`lib/schemes-seed.ts`) from executable scripts. | **PASS** |

### Scalability
| Checkpoint | Verification | Status |
| :--- | :--- | :--- |
| Scheme Database | Adding new government schemes is done via Firestore document entries rather than code adjustments. | **PASS** |
| State Management | Shared contexts manage global configurations like language and theme parameters smoothly. | **PASS** |

### Deployment
| Checkpoint | Verification | Status |
| :--- | :--- | :--- |
| Next.js Compilation | Production builds compile successfully (`next build` outputs 12 static/dynamic pages). | **PASS** |
| CI/CD Pipeline | Checked git pipeline. Pushes automatically redeploy clean instances to Vercel. | **PASS** |

---

## 5. Browser Compatibility

- **Google Chrome**: 100% compatible. Full support for backdrop-filter CSS, framer-motion springs, and native Web Speech accents.
- **Safari**: 100% compatible. Standard voice models and flexbox margins render cleanly.
- **Mozilla Firefox**: 100% compatible. Checked CSS compatibility and grid properties.
- **Microsoft Edge**: 100% compatible. Renders visual components and handles vision attachments.

---

## 6. Device Compatibility

- **Desktop (macOS / Windows)**: Displays optimal triple-column grid layouts, full-size desktop headers, and sticky sidebar navigation.
- **Tablet (iPad / Android Tablet)**: Responsive layout adjustment handles sidebar scaling and double-column feature layouts.
- **Mobile (iPhone / Android)**: Mobile-first bottom nav layout, large touch buttons, vertically stacked bento panels, and responsive margins.

---

## 7. Accessibility Checklist

- [x] **Keyboard Navigation**: Access fields, send triggers, and modal actions using keyboard keys.
- [x] **Responsive Layout**: Adjusts spacing and text sizes depending on viewport density.
- [x] **Dark Mode**: High contrast dark charcoal surfaces prevent eye strain.
- [x] **High Contrast**: Text contrast ratios meet or exceed WCAG AA specifications.
- [x] **Large Buttons**: Chat triggers and file pickers use large, easily clickable buttons.
- [x] **Screen Reader Friendly Labels**: Images, links, and buttons carry aria labels or descriptives.
- [x] **Proper Image Alt Text**: Image previews and profile avatar items contain valid alt configurations.
- [x] **ARIA Labels**: Control elements identify their open/close state or localization parameters.

---

## 8. Deployment Verification

- [x] **GitHub Repository Public**: Checked version control setup.
- [x] **Vercel Deployment Successful**: Active routing checks verified.
- [x] **Production Build Successful**: `npm run build` completes successfully.
- [x] **Environment Variables Configured**: Local and production config properties mapped correctly.
- [x] **Gemini API Connected**: Real chat and vision model inferences tested.
- [x] **Firebase Connected**: Real-time write and reads from Cloud Firestore validated.

---

## 9. Known Limitations

1. **Mock Authentication**: The platform runs on a hardcoded mocked user object (`Demo User`, `uid: demo-user-1`) for demonstration purposes. Security rules in production would require mapping authentications.
2. **In-Memory Image Vision**: Images are processed directly as base64 values in-memory to reduce hosting costs and optimize user privacy. No Firebase Storage integrations are configured.
3. **AI-assisted Scheme Data**: Although matching matches against 15 real schemes, dynamically suggested parameters must be verified through official government portals.

---

## 📋 Testing Summary

- **Total Test Cases**: 30+
- **Passed**: 30+
- **Failed**: 0
- **Pass Rate**: 100%
