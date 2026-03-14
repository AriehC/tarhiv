"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { cn, formatNumber } from "@/lib/utils";

interface YKeyConfig {
  key: string;
  label: string;
  color: string;
}

interface DataChartProps {
  type: "bar" | "line" | "area" | "pie";
  data: Array<Record<string, string | number>>;
  xKey: string;
  yKeys: YKeyConfig[];
  title?: string;
  subtitle?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  stacked?: boolean;
  formatY?: "number" | "percent" | "currency";
}

function formatYValue(
  value: number,
  format?: "number" | "percent" | "currency",
): string {
  switch (format) {
    case "percent":
      return `${value}%`;
    case "currency":
      return `₪${formatNumber(value)}`;
    default:
      return formatNumber(value);
  }
}

function CustomTooltip({
  active,
  payload,
  label,
  formatY,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
  formatY?: "number" | "percent" | "currency";
}) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className={cn(
        "rounded-xl border border-surface-200/50 bg-surface-0/90 backdrop-blur-md px-3 py-2",
        "shadow-[0_0_20px_var(--glow-brand)] text-sm",
      )}
      dir="rtl"
    >
      <p className="mb-1 font-bold text-text-primary">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <span
            className="inline-block h-3 w-3 rounded-full shadow-sm"
            style={{ backgroundColor: entry.color, boxShadow: `0 0 6px ${entry.color}60` }}
          />
          <span className="text-text-secondary">{entry.name}:</span>
          <span className="font-medium text-text-primary">
            {formatYValue(entry.value, formatY)}
          </span>
        </div>
      ))}
    </div>
  );
}

function DataChart({
  type,
  data,
  xKey,
  yKeys,
  title,
  subtitle,
  height = 350,
  showGrid = true,
  showLegend = true,
  stacked = false,
  formatY,
}: DataChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const tickFormatter = (value: number) => formatYValue(value, formatY);

  const commonAxisProps = {
    tick: { fontSize: 12, fill: "var(--text-muted)" },
    axisLine: { stroke: "var(--surface-200)" },
    tickLine: false,
  };

  const renderChart = () => {
    if (type === "pie") {
      const pieData = data.map((item) => ({
        name: item[xKey] as string,
        value: item[yKeys[0]?.key] as number,
      }));

      const COLORS = yKeys.length > 0
        ? [yKeys[0].color, ...data.slice(1).map((_, i) => {
            const hue = (i * 137.508) % 360;
            return `hsl(${hue}, 65%, 55%)`;
          })]
        : data.map((_, i) => {
            const hue = (i * 137.508) % 360;
            return `hsl(${hue}, 65%, 55%)`;
          });

      return (
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
            nameKey="name"
            animationBegin={0}
            animationDuration={1200}
          >
            {pieData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            content={<CustomTooltip formatY={formatY} />}
          />
          {showLegend && (
            <Legend
              verticalAlign="bottom"
              formatter={(value: string) => (
                <span className="text-sm text-text-secondary">{value}</span>
              )}
            />
          )}
        </PieChart>
      );
    }

    const ChartComponent =
      type === "bar" ? BarChart : type === "line" ? LineChart : AreaChart;
    const DataComponent =
      type === "bar" ? Bar : type === "line" ? Line : Area;

    return (
      <ChartComponent data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        {showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--surface-200)"
            vertical={false}
          />
        )}
        <XAxis dataKey={xKey} {...commonAxisProps} />
        <YAxis
          orientation="right"
          tickFormatter={tickFormatter}
          {...commonAxisProps}
        />
        <Tooltip
          content={<CustomTooltip formatY={formatY} />}
        />
        {showLegend && (
          <Legend
            verticalAlign="bottom"
            formatter={(value: string) => (
              <span className="text-sm text-text-secondary">{value}</span>
            )}
          />
        )}
        {yKeys.map((yKey) => {
          const commonDataProps = {
            dataKey: yKey.key,
            name: yKey.label,
            animationBegin: 0,
            animationDuration: 1200,
          };

          if (type === "bar") {
            return (
              <Bar
                key={yKey.key}
                {...commonDataProps}
                fill={yKey.color}
                radius={[6, 6, 0, 0]}
                stackId={stacked ? "stack" : undefined}
              />
            );
          }
          if (type === "line") {
            return (
              <Line
                key={yKey.key}
                {...commonDataProps}
                stroke={yKey.color}
                strokeWidth={2.5}
                dot={{ r: 4, fill: yKey.color, strokeWidth: 0 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                type="monotone"
              />
            );
          }
          // area
          return (
            <Area
              key={yKey.key}
              {...commonDataProps}
              stroke={yKey.color}
              fill={`url(#gradient-${yKey.key})`}
              fillOpacity={1}
              strokeWidth={2.5}
              type="monotone"
              stackId={stacked ? "stack" : undefined}
            />
          );
        })}
        {/* Gradient definitions for area charts */}
        <defs>
          {yKeys.map((yKey) => (
            <linearGradient key={yKey.key} id={`gradient-${yKey.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={yKey.color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={yKey.color} stopOpacity={0.02} />
            </linearGradient>
          ))}
        </defs>
      </ChartComponent>
    );
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "my-8 rounded-2xl border border-surface-200/50 bg-surface-0/80 backdrop-blur-sm p-5",
        "shadow-[0_0_30px_var(--glow-brand)]",
      )}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="font-heading text-lg font-bold text-text-primary">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-text-muted">{subtitle}</p>
          )}
        </div>
      )}
      <div style={{ height }} dir="ltr">
        {isInView && (
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
}

export { DataChart, type DataChartProps };
