import { cn } from "@/lib/utils";

type BadgeCategory =
  | "infrastructure"
  | "society"
  | "history"
  | "culture"
  | "environment"
  | "economy"
  | "default";

interface BadgeProps {
  children: React.ReactNode;
  category?: BadgeCategory;
  className?: string;
}

const categoryStyles: Record<BadgeCategory, string> = {
  infrastructure: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]",
  society: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]",
  history: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]",
  culture: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.1)]",
  environment: "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]",
  economy: "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.1)]",
  default: "bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/20",
};

function Badge({ children, category = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase",
        "border backdrop-blur-sm transition-all duration-300",
        categoryStyles[category],
        className,
      )}
    >
      {children}
    </span>
  );
}

export { Badge, type BadgeProps, type BadgeCategory };
