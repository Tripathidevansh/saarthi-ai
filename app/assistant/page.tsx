"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import { Sidebar } from "@/components/Sidebar";
import { GlassCard } from "@/components/GlassCard";
import { ChatBubble } from "@/components/ChatBubble";
import { SchemeCard } from "@/components/SchemeCard";
import { TricolorSeparator } from "@/components/TricolorSeparator";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Send, Paperclip, Mic, HelpCircle, AlertCircle, Info, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: string;
}

interface Scheme {
  id?: string;
  name: string;
  description: string;
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  sourceUrl: string;
  confidenceScore?: number;
}

function AssistantContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "नमस्ते! I am Saarthi, your digital companion. How can I help you today? You can ask me about government schemes, documents required for certificates, or explain any official procedure in simple words.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [loading, setLoading] = useState(false);
  
  // Interactive action states per bubble
  const [explainingId, setExplainingId] = useState<string | null>(null);
  const [translatingId, setTranslatingId] = useState<string | null>(null);

  // Firestore seeded schemes and recommended schemes in the panel
  const [allSchemes, setAllSchemes] = useState<Scheme[]>([]);
  const [recommendedSchemes, setRecommendedSchemes] = useState<Scheme[]>([]);

  // Fetch all schemes on load for fuzzy matching
  useEffect(() => {
    async function fetchSchemes() {
      try {
        const querySnapshot = await getDocs(collection(db, "schemes"));
        const fetched: Scheme[] = [];
        querySnapshot.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() } as Scheme);
        });
        setAllSchemes(fetched);
      } catch (err) {
        console.error("Failed to load schemes for matcher:", err);
      }
    }
    fetchSchemes();
  }, []);

  // Handle URL query parameters (prefills and auto-submits)
  useEffect(() => {
    const queryQ = searchParams.get("q");
    if (queryQ) {
      setInput(queryQ);
    }
  }, [searchParams]);

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsgId = `user-${Date.now()}`;
    const userMessage: Message = {
      id: userMsgId,
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Build conversation history payload
      const historyPayload = messages
        .filter((msg) => msg.id !== "welcome")
        .map((msg) => ({
          role: msg.role,
          text: msg.text
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
          language: language
        })
      });

      if (!res.ok) {
        throw new Error("Chat request failed");
      }

      const data = await res.json();

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Process recommended schemes from server-side extraction
      if (data.recommendedSchemes && data.recommendedSchemes.length > 0) {
        const matched: Scheme[] = [];

        data.recommendedSchemes.forEach((rec: any) => {
          // Look for matching scheme in our Firestore database
          const found = allSchemes.find(
            (s) =>
              s.name.toLowerCase().includes(rec.schemeName.toLowerCase()) ||
              rec.schemeName.toLowerCase().includes(s.name.toLowerCase())
          );

          if (found) {
            matched.push({
              ...found,
              confidenceScore: rec.confidenceScore
            });
          } else {
            // Fallback to metadata returned by Gemini if not in seed data
            matched.push({
              name: rec.schemeName,
              description: `Government scheme match for ${rec.schemeName}.`,
              eligibilityCriteria: rec.eligibilityTags,
              requiredDocuments: ["Aadhaar Card", "Income Certificate"],
              sourceUrl: "https://india.gov.in",
              confidenceScore: rec.confidenceScore
            });
          }
        });

        // Set matching recommendations
        setRecommendedSchemes(matched);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          text: "I encountered a minor connection issue. Please check your network and try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Chat action: Explain Simply
  const handleExplainSimply = async (messageText: string, messageId: string) => {
    setExplainingId(messageId);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          action: "explain",
          language: language
        })
      });
      if (!res.ok) throw new Error("Explanation failed");
      const data = await res.json();
      
      // Update history with explanation bubble below
      setMessages((prev) => [
        ...prev,
        {
          id: `explain-${Date.now()}`,
          role: "assistant",
          text: `💡 Simplified Explanation:\n\n${data.text}`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setExplainingId(null);
    }
  };

  // Chat action: Translate
  const handleTranslate = async (messageText: string, targetLanguage: string, messageId: string) => {
    setTranslatingId(messageId);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          action: "translate",
          targetLanguage: targetLanguage,
          language: language
        })
      });
      if (!res.ok) throw new Error("Translation failed");
      const data = await res.json();
      
      // Append translation bubble
      setMessages((prev) => [
        ...prev,
        {
          id: `translate-${Date.now()}`,
          role: "assistant",
          text: `🌐 Translated to ${targetLanguage}:\n\n${data.text}`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setTranslatingId(null);
    }
  };

  return (
    <div className={`min-h-[calc(100vh-64px)] flex bg-slate-50 dark:bg-slate-950 lang-${language}`}>
      <Sidebar />

      {/* Main Container Area */}
      <div className="flex-1 md:pl-64 flex flex-col h-[calc(100vh-64px)] overflow-hidden">
        <TricolorSeparator />

        <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 overflow-hidden h-full">
          {/* Left Chat column */}
          <div className="lg:col-span-8 flex flex-col h-full overflow-hidden border-r border-slate-200 dark:border-slate-800">
            {/* Messages viewport */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <ChatBubble
                  key={msg.id}
                  role={msg.role}
                  text={msg.text}
                  timestamp={msg.timestamp}
                  onExplainSimply={
                    msg.role === "assistant" && !msg.id.startsWith("explain") && !msg.id.startsWith("translate")
                      ? () => handleExplainSimply(msg.text, msg.id)
                      : undefined
                  }
                  onTranslate={
                    msg.role === "assistant" && !msg.id.startsWith("explain") && !msg.id.startsWith("translate")
                      ? (lang) => handleTranslate(msg.text, lang, msg.id)
                      : undefined
                  }
                  explaining={explainingId === msg.id}
                  translating={translatingId === msg.id}
                />
              ))}

              {/* Loading indicator */}
              {loading && (
                <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold p-2">
                  <span className="w-2 h-2 bg-[#fe9832] rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-[#fe9832] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 bg-[#fe9832] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  <span>Saarthi is thinking...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input bar */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-150 dark:border-slate-800 flex items-center gap-3">
              <button className="p-2.5 text-slate-400 hover:text-slate-650 dark:text-slate-500 dark:hover:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors">
                <Paperclip className="h-5 w-5" />
              </button>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(input);
                }}
                className="flex-1 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t("askQuestionPlaceholder")}
                  className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-3 text-sm focus:border-[#fe9832] focus:outline-none focus:ring-1 focus:ring-[#fe9832] dark:text-white"
                />

                <button
                  type="button"
                  className="p-2.5 text-slate-400 hover:text-slate-650 dark:text-slate-500 dark:hover:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors"
                >
                  <Mic className="h-5 w-5" />
                </button>

                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="p-3 bg-[#fe9832] text-white rounded-xl shadow-md hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 flex-shrink-0"
                >
                  <Send className="h-4.5 w-4.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Recommendations Sidebar */}
          <aside className="hidden lg:flex lg:col-span-4 flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-y-auto p-5 space-y-4">
            <h3 className="text-sm font-extrabold text-[#0B1F3A] dark:text-white flex items-center gap-2 uppercase tracking-wider">
              <Sparkles className="h-4 w-4 text-[#fe9832]" />
              {t("tailoredForYou")}
            </h3>

            {recommendedSchemes.length === 0 ? (
              <GlassCard className="p-5 text-center text-xs text-slate-450 leading-relaxed border dark:border-slate-800">
                <Info className="h-5 w-5 mx-auto mb-2 text-slate-400" />
                Explain your financial, educational, or professional details (e.g. "I am a small landowner farming rice") to see custom eligible schemes here.
              </GlassCard>
            ) : (
              <div className="space-y-4">
                {recommendedSchemes.map((s, i) => (
                  <SchemeCard
                    key={i}
                    name={s.name}
                    description={s.description}
                    eligibilityCriteria={s.eligibilityCriteria}
                    requiredDocuments={s.requiredDocuments}
                    sourceUrl={s.sourceUrl}
                    confidenceScore={s.confidenceScore || 90}
                    sourceDept={s.name.includes("PM") ? "Central Government" : "Ministry Welfare"}
                  />
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function AssistantPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading Assistant...</div>}>
      <AssistantContent />
    </Suspense>
  );
}
