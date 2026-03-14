"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "motion/react";
import {
  Users,
  MapPin,
  Route,
  Train,
  Zap,
  GitBranch,
  Globe,
  Percent,
  Home,
  Flag,
  Map,
  Plus,
  ArrowDown,
  Droplets,
  Ruler,
  Maximize2,
  TrendingDown,
  TrendingUp,
  Clock,
  Rocket,
  DollarSign,
  Building2,
  Star,
  Shield,
  GraduationCap,
  Award,
  Banknote,
  Moon,
  Sparkles,
  BookOpen,
  Type,
  Newspaper,
  Mic,
} from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users, MapPin, Route, Train, Zap, GitBranch, Globe, Percent, Home, Flag, Map, Plus,
  ArrowDown, Droplets, Ruler, Maximize2, TrendingDown, TrendingUp, Clock,
  Rocket, DollarSign, Building2, Star, Shield, GraduationCap, Award, Banknote,
  Moon, Sparkles, BookOpen, Type, Newspaper, Mic,
};

const colorConfig = {
  cyan: {
    bg: "bg-cyan-500/10 dark:bg-cyan-500/10",
    border: "border-cyan-400/30 dark:border-cyan-500/20",
    icon: "text-cyan-500",
    number: "text-cyan-600 dark:text-cyan-400",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.15)]",
  },
  emerald: {
    bg: "bg-emerald-500/10 dark:bg-emerald-500/10",
    border: "border-emerald-400/30 dark:border-emerald-500/20",
    icon: "text-emerald-500",
    number: "text-emerald-600 dark:text-emerald-400",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
  },
  amber: {
    bg: "bg-amber-500/10 dark:bg-amber-500/10",
    border: "border-amber-400/30 dark:border-amber-500/20",
    icon: "text-amber-500",
    number: "text-amber-600 dark:text-amber-400",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]",
  },
  rose: {
    bg: "bg-rose-500/10 dark:bg-rose-500/10",
    border: "border-rose-400/30 dark:border-rose-500/20",
    icon: "text-rose-500",
    number: "text-rose-600 dark:text-rose-400",
    glow: "shadow-[0_0_20px_rgba(244,63,94,0.15)]",
  },
  violet: {
    bg: "bg-violet-500/10 dark:bg-violet-500/10",
    border: "border-violet-400/30 dark:border-violet-500/20",
    icon: "text-violet-500",
    number: "text-violet-600 dark:text-violet-400",
    glow: "shadow-[0_0_20px_rgba(139,92,246,0.15)]",
  },
  blue: {
    bg: "bg-blue-500/10 dark:bg-blue-500/10",
    border: "border-blue-400/30 dark:border-blue-500/20",
    icon: "text-blue-500",
    number: "text-blue-600 dark:text-blue-400",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]",
  },
};

type ColorKey = keyof typeof colorConfig;
const colorKeys = Object.keys(colorConfig) as ColorKey[];

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  duration?: number;
  decimals?: number;
  icon?: string;
  color?: ColorKey;
  _index?: number;
}

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  label,
  duration = 2,
  decimals = 0,
  icon,
  color,
  _index = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const displayValue = useTransform(motionValue, (latest) => {
    if (decimals > 0) {
      return latest.toFixed(decimals);
    }
    return formatNumber(Math.round(latest));
  });

  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, value, duration, motionValue]);

  useEffect(() => {
    const unsubscribe = displayValue.on("change", (latest) => {
      if (displayRef.current) {
        displayRef.current.textContent = `${prefix}${latest}${suffix}`;
      }
    });
    return unsubscribe;
  }, [displayValue, prefix, suffix]);

  const resolvedColor = color ?? colorKeys[_index % colorKeys.length];
  const colors = colorConfig[resolvedColor];
  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "rounded-2xl border p-6 text-center backdrop-blur-sm",
        "transition-all duration-500 hover:scale-[1.03]",
        colors.bg,
        colors.border,
        colors.glow,
      )}
    >
      {IconComponent && (
        <div className="mb-3 flex justify-center">
          <IconComponent className={cn("h-8 w-8", colors.icon)} />
        </div>
      )}
      <span
        ref={displayRef}
        className={cn(
          "block text-4xl font-bold font-heading tabular-nums",
          colors.number,
        )}
      >
        {prefix}0{suffix}
      </span>
      <p className="mt-2 text-sm text-text-secondary">{label}</p>
    </motion.div>
  );
}

export { AnimatedCounter, type AnimatedCounterProps };
