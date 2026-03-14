"use client";

import { motion } from "motion/react";
import { Info, Lightbulb, AlertTriangle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface InfoCardProps {
  type: "info" | "fact" | "warning" | "tip";
  title?: string;
  children: React.ReactNode;
}

const typeConfig = {
  info: {
    icon: Info,
    bg: "bg-blue-500/8 dark:bg-blue-500/10",
    border: "border-e-blue-500",
    borderAll: "border-blue-400/20 dark:border-blue-500/15",
    iconColor: "text-blue-500",
    titleColor: "text-blue-600 dark:text-blue-400",
    glow: "shadow-[0_0_25px_rgba(59,130,246,0.1)]",
    defaultTitle: "מידע",
  },
  fact: {
    icon: Sparkles,
    bg: "bg-violet-500/8 dark:bg-violet-500/10",
    border: "border-e-violet-500",
    borderAll: "border-violet-400/20 dark:border-violet-500/15",
    iconColor: "text-violet-500",
    titleColor: "text-violet-600 dark:text-violet-400",
    glow: "shadow-[0_0_25px_rgba(139,92,246,0.1)]",
    defaultTitle: "עובדה מעניינת",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-500/8 dark:bg-amber-500/10",
    border: "border-e-amber-500",
    borderAll: "border-amber-400/20 dark:border-amber-500/15",
    iconColor: "text-amber-500",
    titleColor: "text-amber-600 dark:text-amber-400",
    glow: "shadow-[0_0_25px_rgba(245,158,11,0.1)]",
    defaultTitle: "שימו לב",
  },
  tip: {
    icon: Lightbulb,
    bg: "bg-emerald-500/8 dark:bg-emerald-500/10",
    border: "border-e-emerald-500",
    borderAll: "border-emerald-400/20 dark:border-emerald-500/15",
    iconColor: "text-emerald-500",
    titleColor: "text-emerald-600 dark:text-emerald-400",
    glow: "shadow-[0_0_25px_rgba(16,185,129,0.1)]",
    defaultTitle: "טיפ",
  },
};

function InfoCard({ type, title, children }: InfoCardProps) {
  const config = typeConfig[type];
  const IconComponent = config.icon;
  const displayTitle = title ?? config.defaultTitle;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "my-6 rounded-xl border border-e-4 p-5 backdrop-blur-sm",
        config.bg,
        config.border,
        config.borderAll,
        config.glow,
      )}
    >
      <div className="mb-2 flex items-center gap-2">
        <IconComponent className={cn("h-5 w-5 shrink-0", config.iconColor)} />
        <h4 className={cn("text-base font-bold", config.titleColor)}>
          {displayTitle}
        </h4>
      </div>
      <div className="text-sm leading-relaxed text-text-secondary [&>p]:m-0">
        {children}
      </div>
    </motion.div>
  );
}

export { InfoCard, type InfoCardProps };
