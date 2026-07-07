import React from "react";

interface StatCounterProps {
  value: string;
  label: string;
}

export const StatCounter: React.FC<StatCounterProps> = ({ value, label }) => {
  return (
    <div className="space-y-1.5 p-4 text-center">
      <div className="font-sans text-3xl md:text-4xl font-extrabold text-[#0B1F3A] dark:text-white">
        {value}
      </div>
      <div className="font-sans text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
};
