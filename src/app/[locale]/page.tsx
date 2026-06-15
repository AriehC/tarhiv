import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { getLocalizedPosts } from "@/lib/posts";
import { getCanonicalAndAlternates } from "@/lib/seo";
import { HomeContent } from "./HomeContent";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const tSite = await getTranslations("site");
  return {
    title: tSite("name"),
    description: tSite("description"),
    alternates: getCanonicalAndAlternates("/", locale),
    openGraph: {
      title: tSite("name"),
      description: tSite("description"),
      type: "website",
      locale: locale === "he" ? "he_IL" : "en_US",
    },
  };
}

export default async function HomePage() {
  const locale = await getLocale();
  const posts = getLocalizedPosts(locale);

  return <HomeContent locale={locale} allPosts={posts} />;
}
