"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface QuoteBlockProps {
  author?: string;
  role?: string;
  children: React.ReactNode;
}

function QuoteBlock({ author, role, children }: QuoteBlockProps) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative my-8"
    >
      {/* Decorative opening quote mark */}
      <span
        className={cn(
          "absolute -top-4 end-0 select-none font-heading text-8xl leading-none",
          "text-brand-400/30 dark:text-brand-400/20",
        )}
        aria-hidden
      >
        &#8220;
      </span>

      <blockquote
        className={cn(
          "relative rounded-2xl border border-brand-400/20 bg-brand-500/5 backdrop-blur-sm p-6 pt-8",
          "text-lg leading-relaxed italic text-text-primary",
          "shadow-[0_0_30px_var(--glow-brand)]",
          "[&>p]:m-0",
        )}
      >
        {children}
      </blockquote>

      {/* Decorative closing quote mark */}
      <span
        className={cn(
          "absolute -bottom-6 start-4 select-none font-heading text-8xl leading-none",
          "text-accent-400/30 dark:text-accent-400/20",
        )}
        aria-hidden
      >
        &#8221;
      </span>

      {(author || role) && (
        <figcaption className="mt-4 pe-6 text-end">
          {author && (
            <cite className="not-italic font-bold gradient-text">
              {author}
            </cite>
          )}
          {role && (
            <span className="block text-sm text-text-muted">{role}</span>
          )}
        </figcaption>
      )}
    </motion.figure>
  );
}

export { QuoteBlock, type QuoteBlockProps };
