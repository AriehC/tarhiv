import type { MDXComponents } from "mdx/types";
import { AnimatedCounter } from "@/components/mdx/AnimatedCounter";
import { StatGrid } from "@/components/mdx/StatGrid";
import { DataChart } from "@/components/mdx/DataChart";
import { InteractiveMap } from "@/components/mdx/InteractiveMap";
import { Timeline } from "@/components/mdx/Timeline";
import { ComparisonTable } from "@/components/mdx/ComparisonTable";
import { HeroSection } from "@/components/mdx/HeroSection";
import { InfoCard } from "@/components/mdx/InfoCard";
import { QuoteBlock } from "@/components/mdx/QuoteBlock";
import { ImageGallery } from "@/components/mdx/ImageGallery";
import { ScrollReveal } from "@/components/mdx/ScrollReveal";
import { cn } from "@/lib/utils";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom visual components
    AnimatedCounter,
    StatGrid,
    DataChart,
    InteractiveMap,
    Timeline,
    ComparisonTable,
    HeroSection,
    InfoCard,
    QuoteBlock,
    ImageGallery,
    ScrollReveal,

    // Styled HTML element overrides
    h1: ({ children, ...props }) => (
      <h1
        className={cn(
          "mt-12 mb-4 font-heading text-4xl font-bold leading-tight",
          "gradient-text inline-block",
          "first:mt-0",
        )}
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className={cn(
          "mt-10 mb-3 font-heading text-2xl font-bold leading-snug",
          "text-text-primary",
          "border-b border-brand-500/20 pb-2",
        )}
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className={cn(
          "mt-8 mb-2 font-heading text-xl font-bold",
          "text-text-primary",
        )}
        {...props}
      >
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p
        className={cn(
          "my-4 text-base leading-relaxed",
          "text-text-secondary",
        )}
        {...props}
      >
        {children}
      </p>
    ),
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className={cn(
          "text-brand-500 underline decoration-brand-500/30 underline-offset-2",
          "transition-all hover:text-brand-400 hover:decoration-brand-400/60",
          "hover:shadow-[0_2px_10px_var(--glow-brand)]",
        )}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className={cn(
          "my-6 border-e-2 border-brand-400/50",
          "bg-brand-500/5 backdrop-blur-sm",
          "rounded-xl py-3 pe-4 ps-4",
          "text-text-secondary italic",
          "[&>p]:my-1",
        )}
        {...props}
      >
        {children}
      </blockquote>
    ),
    table: ({ children, ...props }) => (
      <div className="my-6 overflow-x-auto rounded-xl border border-surface-200/50 bg-surface-0/50 backdrop-blur-sm">
        <table
          className={cn(
            "w-full border-collapse text-sm",
            "[&_th]:bg-brand-500/5 [&_th]:p-3 [&_th]:text-start [&_th]:font-bold [&_th]:text-text-primary",
            "[&_td]:border-t [&_td]:border-surface-200/50 [&_td]:p-3 [&_td]:text-text-secondary",
            "[&_tr]:transition-colors [&_tbody_tr:hover]:bg-brand-500/5",
          )}
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    ul: ({ children, ...props }) => (
      <ul
        className={cn(
          "my-4 list-disc space-y-1 pe-6",
          "text-text-secondary marker:text-brand-400",
        )}
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol
        className={cn(
          "my-4 list-decimal space-y-1 pe-6",
          "text-text-secondary marker:text-brand-400",
        )}
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-relaxed" {...props}>
        {children}
      </li>
    ),
    hr: (props) => (
      <hr
        className="my-8 border-t-0 h-px bg-gradient-to-r from-transparent via-brand-400/30 to-transparent"
        {...props}
      />
    ),
    code: ({ children, ...props }) => (
      <code
        className={cn(
          "rounded-lg bg-surface-100/80 backdrop-blur-sm px-1.5 py-0.5 font-mono text-sm",
          "text-brand-500 border border-surface-200/50",
        )}
        {...props}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre
        className={cn(
          "my-6 overflow-x-auto rounded-xl bg-surface-100/60 backdrop-blur-md p-4",
          "border border-surface-200/50 text-sm",
          "shadow-[0_0_30px_var(--glow-brand)]",
          "[&_code]:bg-transparent [&_code]:p-0 [&_code]:border-0",
        )}
        dir="ltr"
        {...props}
      >
        {children}
      </pre>
    ),
    img: ({ src, alt, ...props }) => (
      <figure className="my-6">
        <img
          src={src}
          alt={alt ?? ""}
          className="w-full rounded-xl border border-surface-200/50 shadow-[0_0_30px_var(--glow-brand)]"
          loading="lazy"
          {...props}
        />
        {alt && (
          <figcaption className="mt-2 text-center text-sm text-text-muted">
            {alt}
          </figcaption>
        )}
      </figure>
    ),

    // Spread any additional components passed in
    ...components,
  };
}
