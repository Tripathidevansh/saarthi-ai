import React from "react";

interface ConfidenceBadgeProps {
  score: number; // percentage from 0 to 100 or decimal from 0 to 1
  label?: string;
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ score, label }) => {
  // Normalize score to 0-100 range
  const normalizedScore = score <= 1 ? Math.round(score * 100) : Math.round(score);

  let colorClasses = "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400";
  if (normalizedScore < 50) {
    colorClasses = "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-400";
  } else if (normalizedScore < 80) {
    colorClasses = "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400";
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${colorClasses}`}>
      {label ? `${label}: ` : ""}{normalizedScore}%
    </span>
  );
};
