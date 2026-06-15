import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getLocalizedPosts } from "@/lib/posts";
import { getCanonicalAndAlternates } from "@/lib/seo";
import { PostsPageContent } from "./PostsPageContent";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("nav");
  const tSite = await getTranslations("site");
  return {
    title: `${t("posts")} | ${tSite("name")}`,
    description: tSite("description"),
    alternates: getCanonicalAndAlternates("/posts", locale),
    openGraph: {
      title: `${t("posts")} | ${tSite("name")}`,
      description: tSite("description"),
      type: "website",
      locale: locale === "he" ? "he_IL" : "en_US",
    },
  };
}

export default async function PostsPage() {
  const locale = await getLocale();
  const posts = getLocalizedPosts(locale);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <PostsPageContent posts={posts} locale={locale} />
      </main>

      <Footer />
    </div>
  );
}
