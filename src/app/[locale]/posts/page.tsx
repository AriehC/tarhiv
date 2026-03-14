import { getLocale, getTranslations } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PostsPageContent } from "./PostsPageContent";

const getMockPosts = (locale: string) => [
  {
    slug: "israel-railways",
    title:
      locale === "he"
        ? "רכבת ישראל: 1,138 קילומטר של סיפור"
        : "Israel Railways: 1,138 Kilometers of Story",
    description:
      locale === "he"
        ? "סקירה מקיפה של רשת הרכבות בישראל - מהרכבת הראשונה ב-1892 ועד תוכניות ההרחבה"
        : "A comprehensive review of Israel's railway network",
    coverImage: "/images/posts/israel-railways/hero.svg",
    date: "2026-03-15",
    category: "infrastructure",
    readingTime: 12,
  },
  {
    slug: "jewish-diaspora",
    title:
      locale === "he"
        ? "15.8 מיליון: פיזור היהודים בעולם"
        : "15.8 Million: The Jewish Diaspora Worldwide",
    description:
      locale === "he"
        ? "מפת הפיזור של העם היהודי ברחבי העולם - מגמות, נתונים וסיפורים"
        : "The distribution map of the Jewish people worldwide",
    coverImage: "/images/posts/jewish-diaspora/hero.svg",
    date: "2026-03-20",
    category: "society",
    readingTime: 15,
  },
];

export async function generateMetadata() {
  const t = await getTranslations("nav");
  const tSite = await getTranslations("site");
  return {
    title: `${t("posts")} | ${tSite("name")}`,
  };
}

export default async function PostsPage() {
  const locale = await getLocale();
  const posts = getMockPosts(locale);

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
