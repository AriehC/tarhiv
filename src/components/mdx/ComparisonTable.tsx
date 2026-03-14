"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import {
  Users, MapPin, Route, Train, Zap, GitBranch, Globe, Percent,
  Home, Flag, Map, Plus,
} from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users, MapPin, Route, Train, Zap, GitBranch, Globe, Percent, Home, Flag, Map, Plus,
};

interface ComparisonColumn {
  key: string;
  label: string;
  icon?: string;
  image?: string;
}

interface ComparisonRow {
  label: string;
  values: Record<string, string | number>;
  type?: "text" | "number" | "bar" | "boolean";
  unit?: string;
  highlight?: string;
}

interface ComparisonTableProps {
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  title?: string;
  highlightColumn?: string;
}

function BarCell({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex items-center gap-2">
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-200/50">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-brand-400 to-accent-500"
        />
      </div>
      <span className="min-w-[3rem] text-end text-sm tabular-nums text-text-primary">
        {formatNumber(value)}
      </span>
    </div>
  );
}

function BooleanCell({ value }: { value: string | number }) {
  const isTrue =
    value === 1 ||
    value === "true" ||
    value === "כן" ||
    value === "yes";

  return isTrue ? (
    <Check className="mx-auto h-5 w-5 text-emerald-500" />
  ) : (
    <X className="mx-auto h-5 w-5 text-rose-400" />
  );
}

function ComparisonTable({
  columns,
  rows,
  title,
  highlightColumn,
}: ComparisonTableProps) {
  const maxValues = useMemo(() => {
    const maxes: Record<number, number> = {};
    rows.forEach((row, rowIdx) => {
      if (row.type === "bar" || row.type === "number") {
        const numericValues = columns
          .map((col) => {
            const v = row.values[col.key];
            return typeof v === "number" ? v : parseFloat(String(v));
          })
          .filter((v) => !isNaN(v));
        maxes[rowIdx] = Math.max(...numericValues, 1);
      }
    });
    return maxes;
  }, [rows, columns]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="my-8"
    >
      {title && (
        <h3 className="mb-4 font-heading text-xl font-bold text-text-primary">
          {title}
        </h3>
      )}

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-surface-200/50 bg-surface-0/80 backdrop-blur-sm shadow-[0_0_30px_var(--glow-brand)] md:block">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-surface-200/50 bg-gradient-to-r from-brand-500/5 via-accent-500/5 to-brand-500/5">
              <th className="p-3 text-start font-medium text-text-muted" />
              {columns.map((col) => {
                const IconComponent = col.icon ? iconMap[col.icon] : null;
                const isHighlighted = col.key === highlightColumn;
                return (
                  <th
                    key={col.key}
                    className={cn(
                      "p-3 text-center font-bold text-text-primary",
                      isHighlighted && "bg-brand-500/10",
                    )}
                  >
                    <div className="flex flex-col items-center gap-1">
                      {col.image && (
                        <img
                          src={col.image}
                          alt={col.label}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      )}
                      {IconComponent && (
                        <IconComponent className="h-5 w-5 text-text-muted" />
                      )}
                      <span>{col.label}</span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className={cn(
                  "border-b border-surface-200/30 last:border-b-0",
                  "transition-colors hover:bg-brand-500/5",
                )}
              >
                <td className="p-3 font-medium text-text-secondary">
                  {row.label}
                </td>
                {columns.map((col) => {
                  const value = row.values[col.key];
                  const isHighlighted =
                    col.key === highlightColumn ||
                    col.key === row.highlight;
                  return (
                    <td
                      key={col.key}
                      className={cn(
                        "p-3 text-center",
                        isHighlighted && "bg-brand-500/5",
                      )}
                    >
                      {row.type === "bar" ? (
                        <BarCell
                          value={
                            typeof value === "number"
                              ? value
                              : parseFloat(String(value)) || 0
                          }
                          max={maxValues[rowIdx] ?? 1}
                        />
                      ) : row.type === "boolean" ? (
                        <BooleanCell value={value} />
                      ) : row.type === "number" ? (
                        <span className="tabular-nums text-text-primary">
                          {typeof value === "number"
                            ? formatNumber(value)
                            : value}
                          {row.unit && (
                            <span className="ms-0.5 text-text-muted">
                              {row.unit}
                            </span>
                          )}
                        </span>
                      ) : (
                        <span className="text-text-primary">
                          {value}
                          {row.unit && (
                            <span className="ms-0.5 text-text-muted">
                              {row.unit}
                            </span>
                          )}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {columns.map((col) => {
          const IconComponent = col.icon ? iconMap[col.icon] : null;
          const isHighlighted = col.key === highlightColumn;
          return (
            <div
              key={col.key}
              className={cn(
                "rounded-xl border border-surface-200/50 bg-surface-0/80 backdrop-blur-sm p-4",
                isHighlighted && "border-brand-400/30 shadow-[0_0_20px_var(--glow-brand)]",
              )}
            >
              <div className="mb-3 flex items-center gap-2 border-b border-surface-200/30 pb-3">
                {col.image && (
                  <img
                    src={col.image}
                    alt={col.label}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                )}
                {IconComponent && (
                  <IconComponent className="h-5 w-5 text-text-muted" />
                )}
                <h4 className={cn(
                  "font-bold",
                  isHighlighted ? "text-brand-400" : "text-text-primary",
                )}>
                  {col.label}
                </h4>
              </div>
              <dl className="space-y-2">
                {rows.map((row, rowIdx) => {
                  const value = row.values[col.key];
                  return (
                    <div
                      key={rowIdx}
                      className="flex items-center justify-between gap-2"
                    >
                      <dt className="text-sm text-text-muted">{row.label}</dt>
                      <dd className="text-sm font-medium text-text-primary">
                        {row.type === "boolean" ? (
                          <BooleanCell value={value} />
                        ) : row.type === "bar" ? (
                          <span className="tabular-nums">
                            {typeof value === "number"
                              ? formatNumber(value)
                              : value}
                            {row.unit ?? ""}
                          </span>
                        ) : row.type === "number" ? (
                          <span className="tabular-nums">
                            {typeof value === "number"
                              ? formatNumber(value)
                              : value}
                            {row.unit ? ` ${row.unit}` : ""}
                          </span>
                        ) : (
                          <span>
                            {value}
                            {row.unit ? ` ${row.unit}` : ""}
                          </span>
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export { ComparisonTable, type ComparisonTableProps };
