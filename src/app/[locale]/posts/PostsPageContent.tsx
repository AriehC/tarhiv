"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
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

interface PostsPageContentProps {
  posts: Post[];
  locale: string;
}

export function PostsPageContent({ posts, locale }: PostsPageContentProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const t = useTranslations("home");

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [activeCategory, posts]);

  return (
    <>
      <h1 className="text-3xl font-bold font-heading text-text-primary mb-8">
        {t("all_posts")}
      </h1>

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
    </>
  );
}
