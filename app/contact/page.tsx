"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";
import { GlassCard } from "@/components/GlassCard";
import { TricolorSeparator } from "@/components/TricolorSeparator";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  User,
  HelpCircle,
  Wrench,
  Lightbulb,
  ArrowUpRight
} from "lucide-react";

export default function ContactPage() {
  const { language } = useLanguage();

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
    <div className={`min-h-screen flex bg-slate-50 dark:bg-slate-950 lang-${language} pb-16`}>
      <div className="flex-1 flex flex-col">
        <TricolorSeparator />

        <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 space-y-12 w-full">
          {/* Header */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="text-center space-y-4 animate-fade-in"
          >
            <motion.h1
              variants={itemVariants}
              className="text-3.5xl md:text-5xl font-extrabold text-[#0B1F3A] dark:text-white"
            >
              Get in Touch
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto"
            >
              We'd love to hear your ideas, suggestions and feedback.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Developer Metadata Card */}
            <GlassCard className="md:col-span-5 p-8 flex flex-col justify-between space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800 pb-3">
                  Developer Profile
                </h2>
                <div className="space-y-4">
                  {/* Name */}
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-[#fe9832] flex items-center justify-center flex-shrink-0">
                      <User className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Developer</div>
                      <div className="text-sm font-bold text-slate-850 dark:text-slate-200">Devansh Tripathi</div>
                    </div>
                  </div>

                  {/* Email */}
                  <a href="mailto:devansh.tripathi2004@gmail.com" className="flex items-center gap-3 hover:text-[#fe9832] transition-colors group">
                    <div className="h-9 w-9 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-[#fe9832] flex items-center justify-center flex-shrink-0">
                      <Mail className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Email Address</div>
                      <div className="text-sm font-bold text-slate-850 dark:text-slate-200 flex items-center gap-1">
                        devansh.tripathi2004@gmail.com
                        <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </a>

                  {/* Phone */}
                  <a href="tel:8587880855" className="flex items-center gap-3 hover:text-[#fe9832] transition-colors group">
                    <div className="h-9 w-9 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-[#fe9832] flex items-center justify-center flex-shrink-0">
                      <Phone className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Phone Number</div>
                      <div className="text-sm font-bold text-slate-850 dark:text-slate-200 flex items-center gap-1">
                        +91 8587880855
                        <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider bg-slate-100 dark:bg-slate-900 px-3 py-2 rounded-lg text-center border dark:border-slate-800">
                🇮🇳 PromptWars 2026 Submission
              </div>
            </GlassCard>

            {/* Department query channels */}
            <div className="md:col-span-7 space-y-4">
              {/* General Queries */}
              <GlassCard className="p-5 flex gap-4 items-start border-l-4 border-l-blue-500">
                <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-500 flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                    General Queries
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Have questions about how Saarthi AI works or want to get more details on scheme updates? Shoot us a general inquiry.
                  </p>
                </div>
              </GlassCard>

              {/* Technical Support */}
              <GlassCard className="p-5 flex gap-4 items-start border-l-4 border-l-amber-500">
                <div className="h-10 w-10 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-[#fe9832] flex items-center justify-center flex-shrink-0">
                  <Wrench className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                    Technical Support
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Encountered an issue running the Firestore seeding scripts, API calls, or layout rendering? Get support instantly.
                  </p>
                </div>
              </GlassCard>

              {/* Feature Suggestions */}
              <GlassCard className="p-5 flex gap-4 items-start border-l-4 border-l-emerald-500">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                    Feature Suggestions
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Want to suggest features like Aadhaar authentication integrations, GIS mapping overlays, or specific local welfare programs? We love feedback!
                  </p>
                </div>
              </GlassCard>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
