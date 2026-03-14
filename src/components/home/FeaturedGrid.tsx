"use client";

import { PostCard } from "./PostCard";

interface Post {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  date: string;
  category: string;
  readingTime: number;
}

interface FeaturedGridProps {
  posts: Post[];
  locale: string;
}

export function FeaturedGrid({ posts, locale }: FeaturedGridProps) {
  if (posts.length === 0) return null;

  const [first, ...rest] = posts;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Featured large card - takes 2/3 width */}
      <div className="lg:col-span-2">
        <PostCard {...first} locale={locale} />
      </div>

      {/* Side stack - takes 1/3 width */}
      <div className="flex flex-col gap-6">
        {rest.map((post) => (
          <PostCard key={post.slug} {...post} locale={locale} />
        ))}
      </div>
    </div>
  );
}
