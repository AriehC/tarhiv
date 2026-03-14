"use client";

import { motion } from "motion/react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { AnimatedCounter } from "./AnimatedCounter";

interface StatItem {
  value: number | string;
  label: string;
  icon?: string;
  prefix?: string;
  suffix?: string;
  change?: number;
  changeLabel?: string;
}

interface StatGridProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4;
  title?: string;
}

const columnClasses = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

const cardColors = [
  { bg: "bg-cyan-500/10", border: "border-cyan-400/30", text: "text-cyan-500 dark:text-cyan-400", glow: "shadow-[0_0_20px_rgba(6,182,212,0.12)]" },
  { bg: "bg-violet-500/10", border: "border-violet-400/30", text: "text-violet-500 dark:text-violet-400", glow: "shadow-[0_0_20px_rgba(139,92,246,0.12)]" },
  { bg: "bg-emerald-500/10", border: "border-emerald-400/30", text: "text-emerald-500 dark:text-emerald-400", glow: "shadow-[0_0_20px_rgba(16,185,129,0.12)]" },
  { bg: "bg-amber-500/10", border: "border-amber-400/30", text: "text-amber-500 dark:text-amber-400", glow: "shadow-[0_0_20px_rgba(245,158,11,0.12)]" },
  { bg: "bg-rose-500/10", border: "border-rose-400/30", text: "text-rose-500 dark:text-rose-400", glow: "shadow-[0_0_20px_rgba(244,63,94,0.12)]" },
  { bg: "bg-blue-500/10", border: "border-blue-400/30", text: "text-blue-500 dark:text-blue-400", glow: "shadow-[0_0_20px_rgba(59,130,246,0.12)]" },
];

function StatGrid({ stats, columns, title }: StatGridProps) {
  const resolvedColumns =
    columns ?? (stats.length <= 2 ? 2 : stats.length <= 3 ? 3 : 4);

  return (
    <div className="my-8">
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-4 font-heading text-xl font-bold text-text-primary"
        >
          {title}
        </motion.h3>
      )}
      <div className={cn("grid gap-4", columnClasses[resolvedColumns])}>
        {stats.map((stat, index) => {
          const isNumeric = typeof stat.value === "number";

          if (isNumeric) {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative"
              >
                <AnimatedCounter
                  value={stat.value as number}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  label={stat.label}
                  icon={stat.icon}
                  _index={index}
                />
                {stat.change != null && (
                  <div className="absolute bottom-2 start-2 end-2 flex items-center justify-center gap-1 text-xs">
                    {stat.change > 0 ? (
                      <ArrowUp className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <ArrowDown className="h-3 w-3 text-rose-500" />
                    )}
                    <span
                      className={cn(
                        stat.change > 0
                          ? "text-emerald-500"
                          : "text-rose-500",
                      )}
                    >
                      {Math.abs(stat.change)}%
                    </span>
                    {stat.changeLabel && (
                      <span className="text-text-muted">
                        {stat.changeLabel}
                      </span>
                    )}
                  </div>
                )}
              </motion.div>
            );
          }

          const color = cardColors[index % cardColors.length];

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={cn(
                "rounded-2xl border p-6 backdrop-blur-sm",
                "text-center transition-all duration-500 hover:scale-[1.03]",
                color.bg,
                color.border,
                color.glow,
              )}
            >
              <span className={cn("block text-3xl font-bold font-heading", color.text)}>
                {stat.prefix}
                {stat.value}
                {stat.suffix}
              </span>
              <p className="mt-2 text-sm text-text-secondary">{stat.label}</p>
              {stat.change != null && (
                <div className="mt-2 flex items-center justify-center gap-1 text-xs">
                  {stat.change > 0 ? (
                    <ArrowUp className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <ArrowDown className="h-3 w-3 text-rose-500" />
                  )}
                  <span
                    className={cn(
                      stat.change > 0
                        ? "text-emerald-500"
                        : "text-rose-500",
                    )}
                  >
                    {Math.abs(stat.change)}%
                  </span>
                  {stat.changeLabel && (
                    <span className="text-text-muted">
                      {stat.changeLabel}
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export { StatGrid, type StatGridProps };
