import React from "react";

export const TricolorSeparator: React.FC = () => {
  return (
    <div className="flex w-full h-[3px]">
      <div className="flex-1 bg-[#FF9933]"></div> {/* Saffron */}
      <div className="w-[10%] bg-slate-200 dark:bg-slate-700"></div> {/* Ashoka Blue / White Placeholder */}
      <div className="flex-1 bg-[#138808]"></div> {/* Green */}
    </div>
  );
};
