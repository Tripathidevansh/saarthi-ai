"use client";

import React, { useState } from "react";
import { Volume2, Copy, HelpCircle, Languages, Check, Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface ChatBubbleProps {
  role: "user" | "assistant";
  text: string;
  timestamp: string;
  onExplainSimply?: () => void;
  onTranslate?: (langName: string) => void;
  explaining?: boolean;
  translating?: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  role,
  text,
  timestamp,
  onExplainSimply,
  onTranslate,
  explaining = false,
  translating = false,
}) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranslateMenu, setShowTranslateMenu] = useState(false);

  const isAssistant = role === "assistant";

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleListen = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Heuristic for language detection
      const containsDevanagari = /[\u0900-\u097F]/.test(text);
      const containsBengali = /[\u0980-\u09FF]/.test(text);
      const containsTamil = /[\u0B80-\u0BFF]/.test(text);
      
      if (containsDevanagari) {
        utterance.lang = "hi-IN";
      } else if (containsBengali) {
        utterance.lang = "bn-IN";
      } else if (containsTamil) {
        utterance.lang = "ta-IN";
      } else {
        utterance.lang = "en-IN"; // English with Indian Accent
      }

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={`flex flex-col ${isAssistant ? "items-start" : "items-end"} space-y-1 max-w-[85%] ${isAssistant ? "mr-auto" : "ml-auto"}`}>
      {/* Sender name / Icon */}
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
        {isAssistant ? t("brandName") : "You"}
      </span>

      {/* Bubble Content */}
      <div
        className={`rounded-2xl px-5 py-3.5 shadow-sm text-sm leading-relaxed ${
          isAssistant
            ? "bg-white border border-slate-200 dark:border-slate-800 dark:bg-slate-900 text-slate-800 dark:text-slate-200"
            : "bg-[#0B1F3A] text-white dark:bg-slate-850 dark:border dark:border-slate-800"
        }`}
      >
        <p className="whitespace-pre-line">{text}</p>
        <div className={`text-[9px] mt-1.5 text-right ${isAssistant ? "text-slate-400" : "text-white/60"}`}>
          {timestamp}
        </div>
      </div>

      {/* Assistant Toolbar Actions */}
      {isAssistant && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1.5 relative">
          {/* Explain Simply */}
          {onExplainSimply && (
            <button
              onClick={onExplainSimply}
              disabled={explaining}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-950 dark:text-slate-300 disabled:opacity-50"
            >
              {explaining ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <HelpCircle className="h-3 w-3 text-slate-500" />
              )}
              {t("explainSimplyBtn")}
            </button>
          )}

          {/* Translate */}
          {onTranslate && (
            <div className="relative">
              <button
                onClick={() => setShowTranslateMenu(!showTranslateMenu)}
                disabled={translating}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-950 dark:text-slate-300 disabled:opacity-50"
              >
                {translating ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Languages className="h-3 w-3 text-slate-500" />
                )}
                {t("translateBtn")}
              </button>

              {showTranslateMenu && (
                <div className="absolute left-0 bottom-8 z-50 mt-1 min-w-[120px] rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-800 dark:bg-slate-900 text-[11px]">
                  {["English", "हिन्दी (Hindi)", "বাংলা (Bengali)", "தமிழ் (Tamil)", "मराठी (Marathi)"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        onTranslate(lang);
                        setShowTranslateMenu(false);
                      }}
                      className="block w-full px-3 py-1.5 text-left text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-850"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Listen */}
          <button
            onClick={handleListen}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-200 text-[11px] font-semibold transition-all ${
              isPlaying
                ? "bg-[#fe9832] text-white border-[#fe9832]"
                : "bg-white hover:bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-950 dark:text-slate-300"
            }`}
          >
            <Volume2 className="h-3 w-3" />
            {isPlaying ? "Stop" : t("listenBtn")}
          </button>

          {/* Copy */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-950 dark:text-slate-300"
          >
            {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3 text-slate-500" />}
            {copied ? "Copied" : t("copyBtn")}
          </button>
        </div>
      )}
    </div>
  );
};
