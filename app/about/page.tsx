"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";
import { GlassCard } from "@/components/GlassCard";
import { TricolorSeparator } from "@/components/TricolorSeparator";
import { Sidebar } from "@/components/Sidebar";
import { motion } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  Compass,
  FileCheck,
  Languages,
  CheckCircle,
  HelpCircle,
  Layers,
  Cpu
} from "lucide-react";

export default function AboutPage() {
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
    <div className={`min-h-screen flex bg-slate-50 dark:bg-slate-950 lang-${language} pb-12`}>
      {/* Sidebar is optional for main marketing pages, but we render it for consistency if needed, 
          or we can render a clean centered single column. Let's make it a centered single column with premium margins. */}
      <div className="flex-1 flex flex-col">
        <TricolorSeparator />

        <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 space-y-12 w-full">
          {/* Hero Header */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="text-center space-y-4"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fe9832]/10 border border-[#fe9832]/25 text-[#fe9832] text-xs font-bold"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Har Nagarik Ka Digital Saathi</span>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-3.5xl md:text-5xl font-extrabold text-[#0B1F3A] dark:text-white"
            >
              About Saarthi AI
            </motion.h1>
          </motion.div>

          {/* Core Description */}
          <GlassCard className="p-8 md:p-10 space-y-6">
            <p className="text-base leading-relaxed text-slate-700 dark:text-slate-350">
              Saarthi AI is an AI-powered civic companion designed to simplify the way Indian citizens interact with public services. Built using Generative AI, Saarthi bridges the gap between citizens and government by making essential information easier to access, understand and act upon.
            </p>
            <p className="text-base leading-relaxed text-slate-700 dark:text-slate-350">
              Instead of navigating multiple government websites, confusing procedures and lengthy documentation, citizens can simply talk to Saarthi in natural language and receive personalized guidance within seconds.
            </p>
          </GlassCard>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="p-6 space-y-4 border-l-4 border-l-[#fe9832]">
              <h2 className="text-xl font-bold text-[#0B1F3A] dark:text-white flex items-center gap-2">
                <Compass className="h-5 w-5 text-[#fe9832]" />
                Our Mission
              </h2>
              <p className="text-sm leading-relaxed text-slate-650 dark:text-slate-400">
                Our mission is to make governance more accessible, transparent and inclusive through Artificial Intelligence.
              </p>
              <p className="text-sm leading-relaxed text-slate-650 dark:text-slate-400">
                We believe every citizen—regardless of language, education or digital literacy—should be able to access government services confidently and effortlessly.
              </p>
            </GlassCard>

            <GlassCard className="p-6 space-y-4 border-l-4 border-l-[#138808]">
              <h2 className="text-xl font-bold text-[#0B1F3A] dark:text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#138808]" />
                Our Vision
              </h2>
              <p className="text-sm leading-relaxed text-slate-650 dark:text-slate-400">
                Saarthi AI is a step towards a future where every citizen has an intelligent digital companion capable of simplifying governance, improving civic engagement and making public services truly accessible for everyone.
              </p>
            </GlassCard>
          </div>

          {/* Key Features Grid */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-[#0B1F3A] dark:text-white text-center">
              Key Capabilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <GlassCard className="p-6 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-[#fe9832] flex items-center justify-center">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200">
                  AI-powered Civic Assistant
                </h3>
                <p className="text-xs leading-normal text-slate-500 dark:text-slate-400">
                  Natural language conversations for government-related guidance.
                </p>
              </GlassCard>

              {/* Feature 2 */}
              <GlassCard className="p-6 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-[#fe9832] flex items-center justify-center">
                  <Compass className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200">
                  Government Scheme Discovery
                </h3>
                <p className="text-xs leading-normal text-slate-500 dark:text-slate-400">
                  Personalized recommendations based on user needs and eligibility.
                </p>
              </GlassCard>

              {/* Feature 3 */}
              <GlassCard className="p-6 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-[#fe9832] flex items-center justify-center">
                  <FileCheck className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200">
                  AI Vision Complaint System
                </h3>
                <p className="text-xs leading-normal text-slate-500 dark:text-slate-400">
                  Upload an image of a civic issue and automatically generate a structured complaint.
                </p>
              </GlassCard>

              {/* Feature 4 */}
              <GlassCard className="p-6 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-[#fe9832] flex items-center justify-center">
                  <Languages className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200">
                  Multilingual Experience
                </h3>
                <p className="text-xs leading-normal text-slate-500 dark:text-slate-400">
                  Supports multiple Indian languages to improve accessibility.
                </p>
              </GlassCard>

              {/* Feature 5 */}
              <GlassCard className="p-6 space-y-3 md:col-span-2">
                <div className="h-10 w-10 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-[#fe9832] flex items-center justify-center">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200">
                  Explainable AI
                </h3>
                <p className="text-xs leading-normal text-slate-500 dark:text-slate-400">
                  Transparent recommendations with confidence indicators and official references.
                </p>
              </GlassCard>
            </div>
          </section>

          {/* Technology Stack */}
          <GlassCard className="p-8 space-y-6">
            <h2 className="text-xl font-bold text-[#0B1F3A] dark:text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-[#fe9832]" />
              Technology Stack
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-slate-100 dark:bg-slate-900 px-4 py-3.5 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-350 border dark:border-slate-800">
                Next.js 14
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 px-4 py-3.5 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-350 border dark:border-slate-800">
                Google Gemini 2.5 Flash
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 px-4 py-3.5 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-350 border dark:border-slate-800">
                Firebase Firestore
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 px-4 py-3.5 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-350 border dark:border-slate-800">
                Tailwind CSS
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 px-4 py-3.5 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-350 border dark:border-slate-800">
                Framer Motion
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 px-4 py-3.5 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-350 border dark:border-slate-800">
                Vercel
              </div>
            </div>
          </GlassCard>

          {/* Call-to-action */}
          <GlassCard className="saffron-gradient text-white p-8 rounded-2xl text-center shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
            <h3 className="text-xl md:text-2xl font-extrabold tracking-wide">
              "Building a Smarter Digital India, One Citizen at a Time."
            </h3>
          </GlassCard>
        </main>
      </div>
    </div>
  );
}
