"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import { Home, Compass, MessageSquare, Camera, Settings, User } from "lucide-react";

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { t } = useLanguage();

  const links = [
    { name: t("dashboard"), href: "/dashboard", icon: Home },
    { name: t("speak"), href: "/assistant", icon: MessageSquare },
    { name: t("uploadPhoto"), href: "/report", icon: Camera },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside aria-label="Desktop Navigation" className="hidden md:flex fixed top-16 left-0 h-[calc(100vh-64px)] w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md px-4 py-6 z-40">
        <div className="space-y-1.5 flex-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe9832] ${
                  isActive
                    ? "bg-[#fe9832] text-white shadow-md shadow-[#fe9832]/25"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                {link.name}
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav aria-label="Mobile Bottom Navigation" className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 h-16 flex justify-around items-center z-50 px-2 pb-safe">
        <Link
          href="/dashboard"
          className={`flex flex-col items-center gap-1 text-[10px] font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe9832] rounded-lg p-1 ${
            pathname === "/dashboard" ? "text-[#fe9832]" : "text-slate-500"
          }`}
        >
          <Home className="h-5 w-5" />
          <span>{t("dashboard")}</span>
        </Link>

        <Link
          href="/assistant"
          className={`flex flex-col items-center gap-1 text-[10px] font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe9832] rounded-lg p-1 ${
            pathname === "/assistant" ? "text-[#fe9832]" : "text-slate-500"
          }`}
        >
          <MessageSquare className="h-5 w-5" />
          <span>{t("speak")}</span>
        </Link>

        <Link
          href="/report"
          className={`flex flex-col items-center gap-1 text-[10px] font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe9832] rounded-lg p-1 ${
            pathname === "/report" ? "text-[#fe9832]" : "text-slate-500"
          }`}
        >
          <Camera className="h-5 w-5" />
          <span>{t("uploadPhoto")}</span>
        </Link>
      </nav>
    </>
  );
};
