"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Locale = "en" | "hi" | "bn" | "ta" | "mr";

export interface Translations {
  [key: string]: {
    [locale in Locale]: string;
  };
}

export const translations: Translations = {
  // Navigation & Brand
  brandName: {
    en: "Saarthi AI",
    hi: "सारथी AI",
    bn: "সারথী AI",
    ta: "சாரதி AI",
    mr: "सारथी AI",
  },
  services: {
    en: "Services",
    hi: "सेवाएं",
    bn: "পরিষেবা",
    ta: "சேவைகள்",
    mr: "सेवा",
  },
  about: {
    en: "About",
    hi: "हमारे बारे में",
    bn: "সম্পর্কে",
    ta: "பற்றி",
    mr: "बदद्ल",
  },
  contact: {
    en: "Contact",
    hi: "संपर्क करें",
    bn: "যোগাযোগ",
    ta: "தொடர்பு",
    mr: "संपर्क",
  },
  dashboard: {
    en: "Dashboard",
    hi: "डैशबोर्ड",
    bn: "ড্যাশবোর্ড",
    ta: "டேஷ்போர்டு",
    mr: "डॅशबोर्ड",
  },
  schemes: {
    en: "Schemes",
    hi: "योजनाएं",
    bn: "স্কিমসমূহ",
    ta: "திட்டங்கள்",
    mr: "योजना",
  },
  complaints: {
    en: "Complaints",
    hi: "शिकायतें",
    bn: "অভিযোগসমূহ",
    ta: "புகார்கள்",
    mr: "तक्रारी",
  },
  documents: {
    en: "Documents",
    hi: "दस्तावेज़",
    bn: "নথিপত্র",
    ta: "ஆவணங்கள்",
    mr: "कागदपत्रे",
  },

  // Hero Section
  heroBadge: {
    en: "AI-Powered Citizen Guide",
    hi: "AI-संचालित नागरिक मार्गदर्शक",
    bn: "AI-চালিত নাগরিক গাইড",
    ta: "AI-ஆற்றல் கொண்ட குடிமகன் வழிகாட்டி",
    mr: "AI-द्वारे समर्थित नागरिक मार्गदर्शक",
  },
  heroTitle: {
    en: "🙏 Namaste! Meet Saarthi — your AI companion for every government service, scheme, and civic need.",
    hi: "🙏 नमस्ते! सारथी से मिलें — हर सरकारी सेवा, योजना और नागरिक आवश्यकता के लिए आपका AI साथी।",
    bn: "🙏 নমস্তে! সারথীর সাথে দেখা করুন — প্রতিটি সরকারি পরিষেবা, স্কিম এবং নাগরিক প্রয়োজনের জন্য আপনার AI সঙ্গী।",
    ta: "🙏 நமஸ்தே! சாரதியைச் சந்திக்கவும் — ஒவ்வொரு அரசு சேவை, திட்டம் மற்றும் குடிமைத் தேவைகளுக்கான உங்கள் AI துணை.",
    mr: "🙏 नमस्ते! सारथीला भेटा — प्रत्येक सरकारी सेवा, योजना आणि नागरी गरजेसाठी आपला AI सोबती.",
  },
  heroSubtitle: {
    en: "How can I help you today? Ask me about subsidy updates, document requirements, or report a local issue instantly.",
    hi: "मैं आज आपकी क्या सहायता कर सकता हूँ? मुझसे सब्सिडी अपडेट, दस्तावेज़ की ज़रूरतों के बारे में पूछें, या तुरंत स्थानीय समस्या की रिपोर्ट करें।",
    bn: "আমি আজ আপনাকে কীভাবে সাহায্য করতে পারি? আমাকে ভর্তুকি আপডেট, নথির প্রয়োজনীয়তা সম্পর্কে জিজ্ঞাসা করুন বা অবিলম্বে একটি স্থানীয় সমস্যা রিপোর্ট করুন।",
    ta: "இன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்? மானியப் புதுப்பிப்புகள், ஆவணத் தேவைகள் பற்றி என்னிடம் கேளுங்கள் அல்லது உள்ளூர் சிக்கலை உடனடியாகப் புகாரளிக்கவும்.",
    mr: "मी आज तुम्हाला कशी मदत करू शकतो? मला सबसिडी अपडेट्स, कागदपत्रांच्या गरजांबद्दल विचारा किंवा स्थानिक समस्येची त्वरित तक्रार करा.",
  },

  // Action Buttons
  speak: {
    en: "Speak",
    hi: "बोलें",
    bn: "বলুন",
    ta: "பேசவும்",
    mr: "बोला",
  },
  type: {
    en: "Type",
    hi: "लिखें",
    bn: "টাইপ করুন",
    ta: "டைப் செய்யவும்",
    mr: "टाईप करा",
  },
  uploadPhoto: {
    en: "Upload Photo",
    hi: "फोटो अपलोड करें",
    bn: "ছবি আপলোড করুন",
    ta: "புகைப்படம் பதிவேற்றவும்",
    mr: "फोटो अपलोड करा",
  },
  getStarted: {
    en: "Get Started",
    hi: "शुरू करें",
    bn: "শুরু করুন",
    ta: "தொடங்கவும்",
    mr: "सुरू करा",
  },
  watchDemo: {
    en: "Watch Demo",
    hi: "डेमो देखें",
    bn: "ডেমো দেখুন",
    ta: "டெமோ பார்க்கவும்",
    mr: "डेमो पहा",
  },

  // Bento Grid / Features
  discoverSchemesTitle: {
    en: "Discover Schemes",
    hi: "योजनाएं खोजें",
    bn: "স্কিম আবিষ্কার করুন",
    ta: "திட்டங்களைக் கண்டறியவும்",
    mr: "योजना शोधा",
  },
  discoverSchemesDesc: {
    en: "Find government schemes tailored specifically for your profile. From farming to education, never miss an opportunity again.",
    hi: "विशेष रूप से आपकी प्रोफ़ाइल के लिए तैयार की गई सरकारी योजनाएं खोजें। खेती से लेकर शिक्षा तक, कभी कोई अवसर न चूकें।",
    bn: "আপনার প্রোফাইলের জন্য বিশেষভাবে তৈরি সরকারি স্কিম খুঁজুন। চাষাবাদ থেকে শিক্ষা পর্যন্ত, কোনো সুযোগ হাতছাড়া করবেন না।",
    ta: "உங்கள் சுயவிவரத்திற்கு ஏற்ப தயாரிக்கப்பட்ட அரசு திட்டங்களைக் கண்டறியவும். விவசாயம் முதல் கல்வி வரை, எந்த ஒரு வாய்ப்பையும் தவறவிடாதீர்கள்.",
    mr: "तुमच्या प्रोफाइलसाठी खास तयार केलेल्या सरकारी योजना शोधा. शेतीपासून शिक्षणापर्यंत, कोणतीही संधी पुन्हा गमावू नका.",
  },
  reportWithAiTitle: {
    en: "Report with AI",
    hi: "AI के साथ रिपोर्ट करें",
    bn: "AI এর সাথে রিপোর্ট করুন",
    ta: "AI உடன் புகாரளிக்கவும்",
    mr: "AI सह तक्रार करा",
  },
  reportWithAiDesc: {
    en: "Snap a photo of potholes or broken lights. AI handles the paperwork.",
    hi: "गड्ढों या टूटी लाइटों की एक तस्वीर लें। AI कागजी कार्रवाई संभालता है।",
    bn: "রাস্তার গর্ত বা ভাঙা আলোর ছবি তুলুন। AI বাকি কাগজপত্রের কাজ সামলে নেবে।",
    ta: "குழிகள் அல்லது உடைந்த விளக்குகளைப் படம் பிடிக்கவும். AI ஆவணப் பணிகளைக் கையாள்கிறது.",
    mr: "खड्डे किंवा तुटलेल्या दिव्यांचा फोटो काढा. AI कागदपत्रांचे काम सांभाळते.",
  },
  checkDocsTitle: {
    en: "Check Documents",
    hi: "दस्तावेज़ जांचें",
    bn: "নথিপত্র যাচাই করুন",
    ta: "ஆவணங்களைச் சரிபார்க்கவும்",
    mr: "कागदपत्रे तपासा",
  },
  checkDocsDesc: {
    en: "Validate required IDs and certificates for any official process.",
    hi: "किसी भी आधिकारिक प्रक्रिया के लिए आवश्यक आईडी और प्रमाणपत्रों को सत्यापित करें।",
    bn: "যেকোনো অফিসিয়াল প্রক্রিয়ার জন্য প্রয়োজনীয় আইডি এবং সার্টিফিকেট যাচাই করুন।",
    ta: "எந்தவொரு அதிகாரப்பூர்வ செயல்முறைக்கும் தேவையான அடையாள அட்டைகள் மற்றும் சான்றிதழ்களைச் சரிபார்க்கவும்.",
    mr: "कोणत्याही अधिकृत प्रक्रियेसाठी आवश्यक आयडी आणि प्रमाणपत्रे सत्यापित करा.",
  },
  trackComplaintsTitle: {
    en: "Track Complaints",
    hi: "शिकायतें ट्रैक करें",
    bn: "অভিযোগ ট্র্যাক করুন",
    ta: "புகார்களைத் கண்காணிக்கவும்",
    mr: "तक्रारींचा मागोवा घ्या",
  },
  trackComplaintsDesc: {
    en: "Real-time monitoring of your requests. Get intelligent updates on status changes and next steps.",
    hi: "आपके अनुरोधों की वास्तविक समय में निगरानी। स्थिति परिवर्तन और अगले कदमों पर बुद्धिमान अपडेट प्राप्त करें।",
    bn: "আপনার অনুরোধের রিয়েল-টাইম পর্যবেক্ষণ। স্ট্যাটাস পরিবর্তন এবং পরবর্তী পদক্ষেপগুলির বুদ্ধিমান আপডেট পান।",
    ta: "உங்கள் கோரிக்கைகளின் நிகழ்நேர கண்காணிப்பு. நிலை மாற்றங்கள் மற்றும் அடுத்த படிகள் பற்றிய புத்திசாலித்தனமான புதுப்பிப்புகளைப் பெறுங்கள்.",
    mr: "तुमच्या विनंत्यांचे रिअल-टाइम मॉनिटरिंग. स्थितीतील बदल आणि पुढील चरणांबद्दल बुद्धिमान अद्यतने मिळवा.",
  },
  exploreSchemesBtn: {
    en: "Explore Schemes",
    hi: "योजनाएं देखें",
    bn: "স্কিম এক্সপ্লোর করুন",
    ta: "திட்டங்களை ஆராய்க",
    mr: "योजना एक्सप्लोर करा",
  },
  fileReportBtn: {
    en: "File Report",
    hi: "रिपोर्ट दर्ज करें",
    bn: "অভিযোগ জমা দিন",
    ta: "புகார் செய்ய",
    mr: "तक्रार नोंदवा",
  },
  checkNowBtn: {
    en: "Check Now",
    hi: "अभी जांचें",
    bn: "এখনই যাচাই করুন",
    ta: "இப்போது சரிபார்க்கவும்",
    mr: "आता तपासा",
  },
  trackDashboardBtn: {
    en: "Track Dashboard",
    hi: "ट्रैकिंग डैशबोर्ड",
    bn: "ট্র্যাক ড্যাশবোর্ড",
    ta: "கண்காணிப்பு டேஷ்போர்டு",
    mr: "मागोवा घ्या",
  },

  // Stats Row
  statsAssisted: {
    en: "Citizens Assisted",
    hi: "सहायता प्राप्त नागरिक",
    bn: "সহায়তা প্রাপ্ত নাগরিক",
    ta: "உதவி பெற்ற குடிமக்கள்",
    mr: "मदत केलेले नागरिक",
  },
  statsSchemes: {
    en: "Schemes Listed",
    hi: "सूचीबद्ध योजनाएं",
    bn: "তালিকাভুক্ত স্কিমসমূহ",
    ta: "பட்டியலிடப்பட்ட திட்டங்கள்",
    mr: "नोंदणीकृत योजना",
  },
  statsLanguages: {
    en: "Languages",
    hi: "भाषाएं",
    bn: "ভাষা",
    ta: "மொழிகள்",
    mr: "भाषा",
  },
  statsAvailability: {
    en: "Availability",
    hi: "उपलब्धता",
    bn: "সহজলভ্যতা",
    ta: "கிடைக்கும் தன்மை",
    mr: "उपलब्धता",
  },

  // Dashboard Specific
  goodMorning: {
    en: "Good Morning",
    hi: "शुभ प्रभात",
    bn: "সুপ্রভাত",
    ta: "காலை வணக்கம்",
    mr: "शुभ सकाळ",
  },
  suggestionsTitle: {
    en: "Today's Suggestions",
    hi: "आज के सुझाव",
    bn: "আজকের পরামর্শ",
    ta: "இன்றைய பரிந்துரைகள்",
    mr: "आजच्या सूचना",
  },
  frequentlyAsked: {
    en: "Frequently Asked",
    hi: "अक्सर पूछे जाने वाले प्रश्न",
    bn: "প্রায়শই জিজ্ঞাসিত",
    ta: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    mr: "वारंवार विचारले जाणारे प्रश्न",
  },
  civicAlertsTitle: {
    en: "Civic Alerts",
    hi: "नागरिक चेतावनी",
    bn: "নাগরিক সতর্কবার্তা",
    ta: "குடிமை விழிப்பூட்டல்கள்",
    mr: "नागरी सूचना",
  },
  verifiedCitizenBadge: {
    en: "Verified Citizen",
    hi: "सत्यापित नागरिक",
    bn: "যাচাইকৃত নাগরিক",
    ta: "சரிபார்க்கப்பட்ட குடிமகன்",
    mr: "सत्यापित नागरिक",
  },
  trustedAccountBadge: {
    en: "Trusted Account Badge",
    hi: "विश्वसनीय खाता बैज",
    bn: "বিশ্বস্ত অ্যাকাউন্ট ব্যাজ",
    ta: "நம்பகமான கணக்கு பேட்ஜ்",
    mr: "विश्वासार्ह खाते बॅज",
  },

  // Chat page
  askQuestionPlaceholder: {
    en: "Type your question here...",
    hi: "अपना प्रश्न यहाँ लिखें...",
    bn: "আপনার প্রশ্ন এখানে টাইপ করুন...",
    ta: "உங்கள் கேள்வியை இங்கே டைப் செய்யவும்...",
    mr: "तुमचा प्रश्न येथे टाईप करा...",
  },
  tailoredForYou: {
    en: "Tailored for You",
    hi: "आपके लिए विशेष",
    bn: "আপনার জন্য তৈরি",
    ta: "உங்களுக்காக வடிவமைக்கப்பட்டது",
    mr: "तुमच्यासाठी खास",
  },
  explainSimplyBtn: {
    en: "Explain Simply",
    hi: "सरल भाषा में समझाएं",
    bn: "সহজে ব্যাখ্যা করুন",
    ta: "எளிமையாக விளக்குங்கள்",
    mr: "सोप्या भाषेत सांगा",
  },
  translateBtn: {
    en: "Translate",
    hi: "अनुवाद करें",
    bn: "অনুবাদ করুন",
    ta: "மொழிபெயர்க்கவும்",
    mr: "भाषांतर करा",
  },
  listenBtn: {
    en: "Listen",
    hi: "सुनें",
    bn: "শুনুন",
    ta: "கேளுங்கள்",
    mr: "ऐका",
  },
  copyBtn: {
    en: "Copy",
    hi: "कॉपी करें",
    bn: "কপি করুন",
    ta: "நகலெடுக்கவும்",
    mr: "कॉपी करा",
  },

  // Report screen
  incidentReportTitle: {
    en: "Report a Civic Issue",
    hi: "एक नागरिक समस्या की रिपोर्ट करें",
    bn: "একটি নাগরিক সমস্যা রিপোর্ট করুন",
    ta: "ஒரு குடிமைப் பிரச்சினையைப் புகாரளிக்கவும்",
    mr: "नागरी समस्येची तक्रार नोंदवा",
  },
  uploadDesc: {
    en: "Click to upload a photo or drag & drop. Potholes, garbage piles, leaking pipes, or faulty streetlights.",
    hi: "फोटो अपलोड करने के लिए क्लिक करें या खींचें। गड्ढे, कचरे के ढेर, लीक होने वाले पाइप, या खराब स्ट्रीटलाइट।",
    bn: "ছবি আপলোড করতে ক্লিক করুন বা ড্র্যাগ ও ড্রপ করুন। রাস্তার গর্ত, আবর্জনার স্তূপ, ফুটো পাইপ বা নষ্ট স্ট্রিটলাইট।",
    ta: "புகைப்படத்தைப் பதிவேற்ற கிளிக் செய்யவும் அல்லது இழுத்து விடவும். குழிகள், குப்பைக் குவியல்கள், கசியும் குழாய்கள் அல்லது உடைந்த தெருவிளக்குகள்.",
    mr: "फोटो अपलोड करण्यासाठी क्लिक करा किंवा ड्रॅग आणि ड्रॉप करा. खड्डे, कचऱ्याचे ढीग, गळणारे पाईप्स किंवा खराब पथदिवे.",
  },
  optionalDescriptionLabel: {
    en: "Optional Description / Comments",
    hi: "वैकल्पिक विवरण / टिप्पणियाँ",
    bn: "ঐচ্ছিক বিবরণ / মন্তব্য",
    ta: "விருப்பமான விளக்கம் / கருத்துகள்",
    mr: "पर्यायी वर्णन / टिप्पण्या",
  },
  submitComplaintBtn: {
    en: "Analyze with Saarthi AI",
    hi: "सारथी AI के साथ विश्लेषण करें",
    bn: "সারথী AI দিয়ে বিশ্লেষণ করুন",
    ta: "சாரதி AI உடன் பகுப்பாய்வு செய்யவும்",
    mr: "सारथी AI सह विश्लेषण करा",
  },
  analyzingLabel: {
    en: "Saarthi AI is analyzing the photo...",
    hi: "सारथी AI फोटो का विश्लेषण कर रहा है...",
    bn: "সারথী AI ছবিটি বিশ্লেষণ করছে...",
    ta: "சாரதி AI புகைப்படத்தைப் பகுப்பாய்வு செய்கிறது...",
    mr: "सारथी AI फोटोचे विश्लेषण करत आहे...",
  },
  trackingCodeLabel: {
    en: "Tracking ID Generated",
    hi: "ट्रैकिंग आईडी जेनरेट हुई",
    bn: "ট্র্যাকিং আইডি তৈরি হয়েছে",
    ta: "கண்காணிப்பு ஐடி உருவாக்கப்பட்டது",
    mr: "ट्रॅकिंग आयडी तयार झाला",
  },
  fileOfficialComplaintBtn: {
    en: "File Official Complaint",
    hi: "आधिकारिक शिकायत दर्ज करें",
    bn: "অফিসিয়াল অভিযোগ দায়ের করুন",
    ta: "அதிகாரப்பூர்வ புகாரைப் பதிவு செய்யவும்",
    mr: "अधिकृत तक्रार नोंदवा",
  },
};

interface LanguageContextProps {
  language: Locale;
  setLanguage: (lang: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Locale>("en");

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("saarthi-language") as Locale;
    if (savedLang && ["en", "hi", "bn", "ta", "mr"].includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Locale) => {
    setLanguageState(lang);
    localStorage.setItem("saarthi-language", lang);
  };

  const t = (key: string): string => {
    if (!translations[key]) return key;
    return translations[key][language] || translations[key]["en"] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
