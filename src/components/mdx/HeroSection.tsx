"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  image: string;
  title: string;
  subtitle?: string;
  credit?: string;
  height?: "full" | "large" | "medium";
  overlay?: "dark" | "light" | "gradient";
}

const heightClasses = {
  full: "h-screen",
  large: "h-[70vh]",
  medium: "h-[50vh]",
};

const overlayClasses = {
  dark: "bg-black/50",
  light: "bg-white/30",
  gradient:
    "bg-gradient-to-t from-black/70 via-black/20 to-transparent",
};

function HeroSection({
  image,
  title,
  subtitle,
  credit,
  height = "large",
  overlay = "gradient",
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative -mx-4 overflow-hidden sm:-mx-6 md:-mx-8 lg:-mx-12",
        "my-8 w-screen max-w-none self-center",
        heightClasses[height],
      )}
      style={{ marginInlineStart: "calc(-50vw + 50%)", width: "100vw" }}
    >
      {/* Parallax image */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </motion.div>

      {/* Overlay */}
      <div className={cn("absolute inset-0", overlayClasses[overlay])} />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className={cn(
          "relative z-10 flex h-full flex-col items-center justify-end",
          "px-6 pb-12 text-center",
        )}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={cn(
            "font-heading text-4xl font-bold leading-tight sm:text-5xl md:text-6xl",
            overlay === "light" ? "text-text-primary" : "text-white",
          )}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={cn(
              "mt-4 max-w-2xl text-lg sm:text-xl",
              overlay === "light"
                ? "text-text-secondary"
                : "text-white/80",
            )}
          >
            {subtitle}
          </motion.p>
        )}

        {credit && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className={cn(
              "absolute bottom-3 end-4 text-xs",
              overlay === "light"
                ? "text-text-muted"
                : "text-white/50",
            )}
          >
            {credit}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}

export { HeroSection, type HeroSectionProps };
