"use client";

import React from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverLift?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  hoverLift = false,
}) => {
  const hoverProps = hoverLift
    ? {
        whileHover: { y: -4, scale: 1.01 },
        transition: { type: "spring" as const, stiffness: 300, damping: 20 },
      }
    : {};

  return (
    <motion.div
      {...hoverProps}
      className={`relative overflow-hidden rounded-xl border border-white/20 bg-white/70 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-900/60 dark:shadow-slate-950/20 ${className}`}
    >
      {children}
    </motion.div>
  );
};
