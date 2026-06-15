"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CategoryFilter, type Category } from "@/components/home/CategoryFilter";
import { PostCard } from "@/components/home/PostCard";
import type { LocalizedPost } from "@/lib/posts";

interface HomeContentProps {
  locale: string;
  allPosts: LocalizedPost[];
}

export function HomeContent({ locale, allPosts }: HomeContentProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const t = useTranslations("home");

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return allPosts;
    return allPosts.filter((p) => p.category === activeCategory);
  }, [activeCategory, allPosts]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h1 className="sr-only">{t("all_posts")}</h1>

          <CategoryFilter
            onFilterChange={setActiveCategory}
            activeCategory={activeCategory}
          />

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.slug} {...post} locale={locale} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <p className="text-center text-text-muted py-12">
              {t("no_posts_in_category")}
            </p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
