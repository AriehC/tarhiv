"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroCard } from "@/components/home/HeroCard";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
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
  featured?: boolean;
}

interface HomeContentProps {
  locale: string;
  featuredPost: Post;
  allPosts: Post[];
  gridPosts: Post[];
}

export function HomeContent({
  locale,
  featuredPost,
  allPosts,
  gridPosts,
}: HomeContentProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const t = useTranslations("home");

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return gridPosts;
    return allPosts.filter((p) => p.category === activeCategory);
  }, [activeCategory, gridPosts, allPosts]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <HeroCard {...featuredPost} locale={locale} />
        </section>

        {/* Featured Grid */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold font-heading gradient-text inline-block mb-6">
            {t("featured")}
          </h2>
          <FeaturedGrid posts={gridPosts.slice(0, 3)} locale={locale} />
        </section>

        {/* All Posts with Category Filter */}
        <section className="py-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
