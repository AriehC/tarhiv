"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "all",
  "infrastructure",
  "society",
  "history",
  "environment",
  "economy",
  "culture",
] as const;

type Category = (typeof CATEGORIES)[number];

interface CategoryFilterProps {
  onFilterChange: (category: Category) => void;
  activeCategory?: Category;
}

export function CategoryFilter({
  onFilterChange,
  activeCategory = "all",
}: CategoryFilterProps) {
  const [selected, setSelected] = useState<Category>(activeCategory);
  const tCat = useTranslations("categories");

  const handleSelect = (category: Category) => {
    setSelected(category);
    onFilterChange(category);
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => handleSelect(category)}
          className={cn(
            "relative shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer",
            selected === category
              ? "text-brand-400"
              : "text-text-secondary hover:text-text-primary hover:bg-surface-100/50",
          )}
        >
          {selected === category && (
            <motion.div
              layoutId="category-underline"
              className="absolute inset-0 rounded-full bg-brand-500/10 border border-brand-400/30 shadow-[0_0_15px_var(--glow-brand)]"
              transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
            />
          )}
          <span className="relative z-10">
            {tCat(category)}
          </span>
        </button>
      ))}
    </div>
  );
}

export type { Category };
