"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Badge, type BadgeCategory } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

interface HeroCardProps {
  title: string;
  description: string;
  slug: string;
  coverImage: string;
  date: string;
  category: string;
  readingTime: number;
  locale: string;
}

export function HeroCard({
  title,
  description,
  slug,
  coverImage,
  date,
  category,
  readingTime,
  locale,
}: HeroCardProps) {
  const t = useTranslations("home");
  const tCat = useTranslations("categories");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const isRtl = locale === "he";
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section ref={containerRef} className="relative overflow-hidden rounded-3xl group">
      <Link
        href={`/${locale}/posts/${slug}`}
        className="block relative aspect-[21/9] min-h-[400px] md:min-h-[500px]"
      >
        {/* Background image with parallax */}
        <motion.div className="absolute inset-0" style={{ y: imageY }}>
          <Image
            src={coverImage}
            alt={title}
            fill
            priority
            className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
          />
        </motion.div>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

        {/* Glow effect on bottom */}
        <div className="absolute bottom-0 start-0 end-0 h-40 bg-gradient-to-t from-brand-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge category={category as BadgeCategory} className="mb-4">
              {tCat(category)}
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-white mb-3 max-w-3xl leading-tight drop-shadow-[0_0_30px_rgba(6,182,212,0.15)]"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg text-white/80 mb-6 max-w-2xl line-clamp-2"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-4 flex-wrap"
          >
            <Button variant="primary" size="lg">
              {t("read_more")}
              <Arrow className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-4 text-sm text-white/60">
              <time dateTime={date}>{formatDate(date, locale)}</time>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {readingTime} {t("min_read")}
              </span>
            </div>
          </motion.div>
        </div>
      </Link>

      {/* Border glow */}
      <div className="absolute inset-0 rounded-3xl border border-white/5 group-hover:border-brand-400/20 transition-colors duration-700 pointer-events-none" />
    </section>
  );
}
