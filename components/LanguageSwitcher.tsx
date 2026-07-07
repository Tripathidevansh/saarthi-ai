"use client";

import React from "react";
import { useLanguage, Locale } from "@/lib/i18n";
import { Globe } from "lucide-react";

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Locale);
  };

  return (
    <div className="relative flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/50 px-3 py-1 text-sm font-medium transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-950">
      <Globe className="h-4 w-4 text-slate-500 dark:text-slate-400" />
      <select
        value={language}
        onChange={handleLanguageChange}
        className="cursor-pointer border-0 bg-transparent py-0 pl-0 pr-6 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-0 dark:text-slate-200"
        style={{
          backgroundImage: "none", // Override default tailwind forms select arrow
        }}
      >
        <option value="en" className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">EN</option>
        <option value="hi" className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">हिन्दी</option>
        <option value="bn" className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">বাংলা</option>
        <option value="ta" className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">தமிழ்</option>
        <option value="mr" className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">मराठी</option>
      </select>
      <span className="absolute right-2.5 pointer-events-none text-[10px] text-slate-500">▼</span>
    </div>
  );
};
