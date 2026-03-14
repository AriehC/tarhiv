"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { motion } from "motion/react";
import { Badge, type BadgeCategory } from "@/components/ui/Badge";
import { useTranslations } from "next-intl";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  title: string;
  description: string;
  slug: string;
  coverImage: string;
  date: string;
  category: string;
  readingTime: number;
  locale: string;
}

export function PostCard({
  title,
  description,
  slug,
  coverImage,
  date,
  category,
  readingTime,
  locale,
}: PostCardProps) {
  const t = useTranslations("home");
  const tCat = useTranslations("categories");

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
    >
      <Link
        href={`/${locale}/posts/${slug}`}
        className="group block rounded-2xl bg-surface-0/80 backdrop-blur-md border border-surface-200/50 overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_var(--glow-brand)] hover:border-brand-500/30"
      >
        {/* Image container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {/* Category badge overlay */}
          <div className="absolute top-3 start-3">
            <Badge category={category as BadgeCategory}>
              {tCat(category)}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold font-heading text-text-primary mb-2 line-clamp-2 group-hover:text-brand-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-text-secondary line-clamp-2 mb-4">
            {description}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-text-muted">
            <time dateTime={date}>{formatDate(date, locale)}</time>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {readingTime} {t("min_read")}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
