"use client";

import React, { useState } from "react";
import { GlassCard } from "./GlassCard";
import { Check, Copy, Landmark, AlertTriangle, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

interface TrackingSuccessCardProps {
  trackingId: string;
  issueType: string;
  department: string;
  severity: string;
  estimatedResolution: string;
}

export const TrackingSuccessCard: React.FC<TrackingSuccessCardProps> = ({
  trackingId,
  issueType,
  department,
  severity,
  estimatedResolution,
}) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <GlassCard className="p-8 text-center max-w-xl mx-auto space-y-6">
      {/* Animated Success Checkmark */}
      <div className="flex justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="h-16 w-16 rounded-full bg-[#138808] text-white flex items-center justify-center shadow-lg shadow-emerald-500/20"
        >
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Check className="h-8 w-8 stroke-[3]" />
          </motion.div>
        </motion.div>
      </div>

      <div className="space-y-1.5">
        <h3 className="font-sans text-2xl font-bold text-[#0B1F3A] dark:text-white">
          Complaint Submitted Successfully!
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Your digital Saarthi has registered this concern with the relevant authority.
        </p>
      </div>

      {/* Tracking ID Badge */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center justify-between gap-4">
        <div className="text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
            {t("trackingCodeLabel")}
          </span>
          <span className="font-mono text-xl font-bold text-[#0B1F3A] dark:text-white tracking-wider">
            {trackingId}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-900"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Summary parameters list */}
      <div className="border-t border-slate-100 dark:border-slate-850 pt-5 text-left space-y-3.5 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-400">Issue Type</span>
          <span className="font-bold text-slate-800 dark:text-slate-200 capitalize">{issueType.replace("_", " ")}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-400">Department assigned</span>
          <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Landmark className="h-3.5 w-3.5 text-slate-500" />
            {department}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-400">Severity Level</span>
          <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
            {severity}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-400">Estimated Resolution</span>
          <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 font-sans">
            <Calendar className="h-3.5 w-3.5 text-[#fe9832]" />
            {estimatedResolution}
          </span>
        </div>
      </div>

      {/* Action Redirect */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-850">
        <Link
          href="/dashboard"
          className="w-full saffron-gradient text-white text-sm font-bold py-3 px-6 rounded-xl shadow-md hover:brightness-110 active:scale-95 transition-all inline-flex items-center justify-center gap-2"
        >
          Return to Dashboard
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </GlassCard>
  );
};
