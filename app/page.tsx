"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { GlassCard } from "@/components/GlassCard";
import { StatCounter } from "@/components/StatCounter";
import { FeatureCard } from "@/components/FeatureCard";
import { TricolorSeparator } from "@/components/TricolorSeparator";
import Logo from "@/components/Logo";
import { motion } from "framer-motion";
import {
  Mic,
  Keyboard,
  Camera,
  PlayCircle,
  Sparkles,
  Search,
  AlertOctagon,
  FileCheck,
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  Languages,
  Clock
} from "lucide-react";

export default function LandingPage() {
  const { t, language } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 lang-${language}`}>
      <TricolorSeparator />

      {/* Hero Section */}
      <section className="relative flex-1 min-h-[85vh] flex flex-col items-center justify-center text-center px-6 md:px-10 py-16 hero-mesh">
        <div className="absolute inset-0 bg-white/40 dark:bg-slate-950/40 backdrop-blur-[2px] pointer-events-none"></div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-4xl mx-auto space-y-8"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fe9832]/10 border border-[#fe9832]/25 text-[#fe9832] text-xs font-bold"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t("heroBadge")}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-5xl font-extrabold text-[#0B1F3A] dark:text-white leading-tight tracking-tight max-w-4xl"
          >
            {t("heroTitle")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-slate-650 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            {t("heroSubtitle")}
          </motion.p>

          {/* Action Interface Card */}
          <motion.div variants={itemVariants} className="max-w-3xl mx-auto w-full mt-10">
            <GlassCard className="p-6 md:p-8 space-y-6">
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/assistant"
                  className="flex items-center gap-3 px-6 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white hover:border-[#fe9832] dark:bg-slate-900 dark:hover:border-[#fe9832] transition-all shadow-sm group w-full sm:w-auto text-left"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">🎤</span>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                      Voice Input
                    </div>
                    <span className="font-bold text-sm text-slate-700 dark:text-slate-200">
                      {t("speak")}
                    </span>
                  </div>
                </Link>

                <Link
                  href="/assistant"
                  className="flex items-center gap-3 px-6 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white hover:border-[#fe9832] dark:bg-slate-900 dark:hover:border-[#fe9832] transition-all shadow-sm group w-full sm:w-auto text-left"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">⌨️</span>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                      Text Chat
                    </div>
                    <span className="font-bold text-sm text-slate-700 dark:text-slate-200">
                      {t("type")}
                    </span>
                  </div>
                </Link>

                <Link
                  href="/report"
                  className="flex items-center gap-3 px-6 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white hover:border-[#fe9832] dark:bg-slate-900 dark:hover:border-[#fe9832] transition-all shadow-sm group w-full sm:w-auto text-left"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">📷</span>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                      AI Vision
                    </div>
                    <span className="font-bold text-sm text-slate-700 dark:text-slate-200">
                      {t("uploadPhoto")}
                    </span>
                  </div>
                </Link>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto saffron-gradient text-white text-sm font-bold px-10 py-4 rounded-xl shadow-lg hover:brightness-110 transition-all active:scale-95 text-center"
                >
                  {t("getStarted")}
                </Link>
                <Link
                  href="#"
                  className="w-full sm:w-auto border-2 border-slate-800 dark:border-white text-slate-800 dark:text-white text-sm font-bold px-10 py-3.5 rounded-xl hover:bg-slate-800 hover:text-white dark:hover:bg-white dark:hover:text-slate-800 transition-all flex items-center justify-center gap-2"
                >
                  <PlayCircle className="h-5 w-5" />
                  {t("watchDemo")}
                </Link>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Strip */}
      <section className="bg-[#0B1F3A] py-5 overflow-hidden border-y border-slate-800">
        <div className="animate-marquee whitespace-nowrap gap-12 items-center text-white/90 text-xs font-bold uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#fe9832]" /> Powered by Official Public Information
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#fe9832]" /> AI-Generated Guidance
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <Languages className="h-4 w-4 text-[#fe9832]" /> Multilingual Support
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#fe9832]" /> Available 24×7
          </span>

          {/* Repeat */}
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#fe9832]" /> Powered by Official Public Information
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#fe9832]" /> AI-Generated Guidance
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <Languages className="h-4 w-4 text-[#fe9832]" /> Multilingual Support
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#fe9832]" /> Available 24×7
          </span>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="py-24 px-6 md:px-10 max-w-[1280px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={Search}
            title={t("discoverSchemesTitle")}
            description={t("discoverSchemesDesc")}
            actionText={t("exploreSchemesBtn")}
            actionHref="/dashboard"
          />

          <FeatureCard
            icon={AlertOctagon}
            title={t("reportWithAiTitle")}
            description={t("reportWithAiDesc")}
            actionText={t("fileReportBtn")}
            actionHref="/report"
          />

          <FeatureCard
            icon={FileCheck}
            title={t("checkDocsTitle")}
            description={t("checkDocsDesc")}
            actionText={t("checkNowBtn")}
            actionHref="/dashboard"
          />

          <GlassCard
            hoverLift
            className="md:col-span-3 p-8 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="max-w-2xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/20 text-[#fe9832] mb-6">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="font-sans text-xl font-bold text-[#0B1F3A] dark:text-white mb-3">
                {t("trackComplaintsTitle")}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {t("trackComplaintsDesc")}
              </p>
            </div>
            <div className="w-full md:w-auto flex-shrink-0">
              <Link
                href="/dashboard"
                className="w-full md:w-auto saffron-gradient text-white text-sm font-bold px-12 py-4 rounded-xl shadow-lg hover:brightness-110 transition-all inline-block text-center"
              >
                {t("trackDashboardBtn")}
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Stats Row */}
      <section className="py-16 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCounter value="50,000+" label={t("statsAssisted")} />
            <StatCounter value="200+" label={t("statsSchemes")} />
            <StatCounter value="10+" label={t("statsLanguages")} />
            <StatCounter value="24×7" label={t("statsAvailability")} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-6 md:px-10 flex flex-col items-center gap-6 bg-[#051122] text-slate-400 border-t border-slate-900">
        <div className="flex items-center gap-2">
          <Logo className="h-6 w-6" />
          <span className="font-sans text-lg font-bold text-white tracking-wider">
            {t("brandName")}
          </span>
        </div>
        <div className="flex gap-8 text-sm font-semibold">
          <Link href="#" className="hover:text-[#fe9832] transition-colors">{t("services")}</Link>
          <Link href="#" className="hover:text-[#fe9832] transition-colors">{t("about")}</Link>
          <Link href="#" className="hover:text-[#fe9832] transition-colors">{t("contact")}</Link>
        </div>
        <div className="w-full max-w-xl h-px bg-slate-800 my-4"></div>
        <p className="text-xs text-slate-500">
          © 2024 Saarthi AI | Digital India Initiative
        </p>
      </footer>

      {/* FAB for quick AI help */}
      <Link
        href="/assistant"
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full saffron-gradient text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group"
      >
        <MessageSquare className="h-7 w-7" />
        <span className="absolute right-20 bg-[#0B1F3A] text-white px-4 py-2 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
          Ask Saarthi
        </span>
      </Link>
    </div>
  );
}
