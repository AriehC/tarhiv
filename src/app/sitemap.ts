import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/posts";
import { SITE_URL, LOCALES } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ["", "/posts", "/about"];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1.0 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`]),
        ),
      },
    })),
  );

  const postEntries: MetadataRoute.Sitemap = POSTS.flatMap((post) =>
    post.supportedLocales.map((locale) => ({
      url: `${SITE_URL}/${locale}/posts/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          post.supportedLocales.map((l) => [
            l,
            `${SITE_URL}/${l}/posts/${post.slug}`,
          ]),
        ),
      },
    })),
  );

  return [...staticEntries, ...postEntries];
}
