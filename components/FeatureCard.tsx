"use client";

import React from "react";
import Link from "next/link";
import { GlassCard } from "./GlassCard";
import { LucideIcon, ArrowRight } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText: string;
  actionHref: string;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  actionText,
  actionHref,
  className = "",
}) => {
  return (
    <GlassCard hoverLift className={`p-8 flex flex-col justify-between ${className}`}>
      <div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/20 text-[#fe9832] mb-6">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="font-sans text-xl font-bold text-[#0B1F3A] dark:text-white mb-3">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {description}
        </p>
      </div>
      <div className="mt-8">
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#fe9832] transition-transform hover:translate-x-1 group"
        >
          {actionText}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </GlassCard>
  );
};
