"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { Bell } from "lucide-react";
import Image from "next/image";
import Logo from "./Logo";

export const Header: React.FC = () => {
  const { t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 w-full h-16 flex justify-between items-center px-4 md:px-10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 z-50 shadow-sm shadow-slate-200/5">
      <Link href="/" className="flex items-center gap-2 group">
        <Logo className="h-8 w-8 md:h-10 md:w-10" />
        <span className="font-sans text-xl md:text-2xl font-bold tracking-tight text-[#0B1F3A] dark:text-white border-b-4 border-[#fe9832] transition-transform duration-200 group-hover:scale-95">
          {t("brandName")}
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
        <Link href="/" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
          {t("services")}
        </Link>
        <Link href="#" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
          {t("about")}
        </Link>
        <Link href="#" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors font-medium">
          {t("contact")}
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <ThemeToggle />
        <button className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <Bell className="h-5 w-5" />
        </button>

        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
            <img
              alt="Rohan Verma Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1IOtQmvbMOiAvdqULIpB-mkhV2vAbUgM5FHvTxVb_x0hrDwfyiVXYIGLL37YReNxJvYQDKJnfsku4JoPUsm5LHPlAU6ODWEcYrMADj9hRmWJCRZ7AfSO-sAAsrvsWfs9H7yBtYgzK0NH-QiA6Fx4qBwpPLEYSekhnlSV7BnM9pktmNkVlxOp_IB5au3NS2WDS8pCG3KHDv7fJDxpqkYlifRRdmgcFYvFzDtyXu84tba7Q5LLI1K8QNSEurck43K6LyoA8J7tdiQw8"
            />
          </div>
        </Link>
      </div>
    </nav>
  );
};
