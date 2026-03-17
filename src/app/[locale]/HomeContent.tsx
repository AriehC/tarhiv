"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CategoryFilter, type Category } from "@/components/home/CategoryFilter";
import { PostCard } from "@/components/home/PostCard";

interface Post {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  date: string;
  category: string;
  readingTime: number;
}

interface HomeContentProps {
  locale: string;
  allPosts: Post[];
}

export function HomeContent({
  locale,
  allPosts,
}: HomeContentProps) {
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
        {/* All Posts with Category Filter */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold font-heading gradient-text inline-block">
              {t("all_posts")}
            </h2>
          </div>

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
              {locale === "he"
                ? "לא נמצאו פוסטים בקטגוריה זו"
                : "No posts found in this category"}
            </p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
