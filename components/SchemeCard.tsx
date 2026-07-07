"use client";

import React, { useState } from "react";
import { GlassCard } from "./GlassCard";
import { ConfidenceBadge } from "./ConfidenceBadge";
import { ExternalLink, ChevronDown, ChevronUp, FileText, CheckCircle2 } from "lucide-react";

interface SchemeCardProps {
  name: string;
  description: string;
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  sourceUrl: string;
  confidenceScore?: number;
  sourceDept?: string;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  name,
  description,
  eligibilityCriteria,
  requiredDocuments,
  sourceUrl,
  confidenceScore = 90,
  sourceDept = "Govt. of India",
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <GlassCard className="p-5 border-l-4 border-l-[#fe9832] dark:border-l-[#fe9832] mb-4">
      <div className="flex justify-between items-start gap-4">
        <div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">
            {sourceDept}
          </span>
          <h4 className="font-sans text-sm font-bold text-[#0B1F3A] dark:text-white leading-snug">
            {name}
          </h4>
        </div>
        <ConfidenceBadge score={confidenceScore} label="Match" />
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-3">
        {description}
      </p>

      {/* Expanded View */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3.5">
          {/* Eligibility */}
          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-emerald-500" />
              Eligibility Criteria
            </h5>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc pl-4">
              {eligibilityCriteria.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>

          {/* Required Docs */}
          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
              <FileText className="h-3 w-3 text-[#fe9832]" />
              Required Documents
            </h5>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc pl-4">
              {requiredDocuments.map((doc, i) => (
                <li key={i}>{doc}</li>
              ))}
            </ul>
          </div>

          {/* External Source Link */}
          <div className="pt-2">
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0B1F3A] hover:text-[#fe9832] dark:text-white dark:hover:text-[#fe9832] transition-colors"
            >
              Visit Official Website
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      )}

      {/* Expand/Collapse Toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 w-full flex items-center justify-center gap-1 py-1.5 border border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
      >
        {expanded ? (
          <>
            Hide Details
            <ChevronUp className="h-3.5 w-3.5" />
          </>
        ) : (
          <>
            View Details
            <ChevronDown className="h-3.5 w-3.5" />
          </>
        )}
      </button>
    </GlassCard>
  );
};
