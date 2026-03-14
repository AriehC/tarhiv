"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Users, MapPin, Route, Train, Zap, GitBranch, Globe, Percent,
  Home, Flag, Map, Plus, Circle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users, MapPin, Route, Train, Zap, GitBranch, Globe, Percent, Home, Flag, Map, Plus,
};

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  image?: string;
  icon?: string;
  highlight?: boolean;
}

interface TimelineProps {
  events: TimelineEvent[];
  title?: string;
  color?: string;
}

function TimelineCard({
  event,
  index,
  side,
}: {
  event: TimelineEvent;
  index: number;
  side: "start" | "end";
}) {
  const IconComponent = event.icon ? iconMap[event.icon] : Circle;

  return (
    <div
      className={cn(
        "relative flex gap-4 pb-10",
        "md:w-1/2",
        side === "start" ? "md:self-start md:pe-8" : "md:self-end md:ps-8",
      )}
    >
      {/* Dot on the line */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className={cn(
          "absolute top-1 z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          "border-2 backdrop-blur-sm",
          event.highlight
            ? "border-brand-400 bg-brand-500/20 shadow-[0_0_15px_var(--glow-brand)]"
            : "border-surface-200/50 bg-surface-0/80",
          "start-0",
          side === "start" ? "md:start-auto md:-end-4" : "md:-start-4",
        )}
      >
        <IconComponent
          className={cn(
            "h-4 w-4",
            event.highlight ? "text-brand-400" : "text-text-muted",
          )}
        />
      </motion.div>

      {/* Card content */}
      <motion.div
        initial={{ opacity: 0, x: side === "start" ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className={cn(
          "ms-12 flex-1 rounded-xl border border-surface-200/50 bg-surface-0/80 backdrop-blur-sm p-4",
          "transition-all duration-500 hover:shadow-[0_0_20px_var(--glow-brand)] hover:border-brand-500/20",
          "md:ms-0",
          event.highlight &&
            "border-brand-400/30 shadow-[0_0_20px_var(--glow-brand)]",
        )}
      >
        <span className={cn(
          "text-xs font-semibold tracking-wide uppercase",
          event.highlight ? "text-brand-400" : "text-accent-500",
        )}>
          {event.date}
        </span>
        <h4 className="mt-1 font-heading text-base font-bold text-text-primary">
          {event.title}
        </h4>
        <p className="mt-1 text-sm leading-relaxed text-text-secondary">
          {event.description}
        </p>
        {event.image && (
          <div className="mt-3 overflow-hidden rounded-lg">
            <img
              src={event.image}
              alt={event.title}
              className="h-40 w-full object-cover"
              loading="lazy"
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}

function Timeline({ events, title, color }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="my-10" ref={containerRef}>
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-center font-heading text-xl font-bold text-text-primary"
        >
          {title}
        </motion.h3>
      )}

      <div className="relative">
        {/* Static background line */}
        <div
          className={cn(
            "absolute top-0 bottom-0 w-0.5 bg-surface-200/50",
            "start-4 md:start-1/2 md:-translate-x-1/2",
          )}
        />

        {/* Animated progress line with glow */}
        <motion.div
          className={cn(
            "absolute top-0 w-0.5",
            "start-4 md:start-1/2 md:-translate-x-1/2",
          )}
          style={{
            height: lineHeight,
            background: color
              ? `linear-gradient(180deg, ${color}, ${color}88)`
              : "linear-gradient(180deg, var(--brand-400), var(--accent-500))",
            boxShadow: `0 0 10px ${color ?? "var(--brand-400)"}40`,
          }}
        />

        {/* Events */}
        <div className="relative flex flex-col md:items-center">
          {events.map((event, index) => (
            <TimelineCard
              key={index}
              event={event}
              index={index}
              side={index % 2 === 0 ? "start" : "end"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export { Timeline, type TimelineProps, type TimelineEvent };
