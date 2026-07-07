"use client";

import React, { useState } from "react";
import { GlassCard } from "./GlassCard";
import { ConfidenceBadge } from "./ConfidenceBadge";
import { AlertCircle, Calendar, ShieldCheck, Landmark, CheckCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface ComplaintAnalysisCardProps {
  issueType: string;
  severity: string;
  department: string;
  estimatedResolution: string;
  draftComplaint: string;
  confidenceScore: number;
  onSubmit: (complaintText: string) => void;
  submitting?: boolean;
}

export const ComplaintAnalysisCard: React.FC<ComplaintAnalysisCardProps> = ({
  issueType,
  severity,
  department,
  estimatedResolution,
  draftComplaint,
  confidenceScore,
  onSubmit,
  submitting = false,
}) => {
  const { t } = useLanguage();
  const [editedText, setEditedText] = useState(draftComplaint);

  const severityColor =
    severity.toLowerCase() === "high"
      ? "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20"
      : severity.toLowerCase() === "medium"
      ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20"
      : "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20";

  return (
    <GlassCard className="p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">
            AI Vision Analysis Results
          </span>
          <h3 className="font-sans text-2xl font-bold text-[#0B1F3A] dark:text-white capitalize">
            {issueType.replace("_", " ")}
          </h3>
        </div>
        <ConfidenceBadge score={confidenceScore} label="AI Confidence" />
      </div>

      {/* Meta grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Severity */}
        <div className={`p-4 rounded-xl flex items-center gap-3 ${severityColor}`}>
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider block opacity-75">
              Severity
            </span>
            <span className="text-sm font-bold capitalize">{severity}</span>
          </div>
        </div>

        {/* Responsible Department */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center gap-3 text-slate-800 dark:text-slate-200">
          <Landmark className="h-5 w-5 flex-shrink-0 text-slate-500" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider block text-slate-400">
              Department
            </span>
            <span className="text-sm font-bold truncate block max-w-[150px]">{department}</span>
          </div>
        </div>

        {/* Resolution Time */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center gap-3 text-slate-800 dark:text-slate-200">
          <Calendar className="h-5 w-5 flex-shrink-0 text-[#fe9832]" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider block text-slate-400">
              Estimated Resolution
            </span>
            <span className="text-sm font-bold">{estimatedResolution}</span>
          </div>
        </div>
      </div>

      {/* Editable complaint box */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
          Draft Complaint (Click to edit before filing)
        </label>
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          rows={6}
          className="w-full rounded-xl border border-slate-200 bg-white/50 p-4 text-sm leading-relaxed text-slate-800 focus:border-[#fe9832] focus:outline-none focus:ring-1 focus:ring-[#fe9832] dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200"
        />
      </div>

      {/* Action Submit */}
      <div className="flex justify-end pt-2">
        <button
          onClick={() => onSubmit(editedText)}
          disabled={submitting}
          className="w-full sm:w-auto saffron-gradient text-white text-sm font-bold px-8 py-3.5 rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {submitting ? (
            "Filing..."
          ) : (
            <>
              <ShieldCheck className="h-4.5 w-4.5" />
              {t("fileOfficialComplaintBtn")}
            </>
          )}
        </button>
      </div>
    </GlassCard>
  );
};
