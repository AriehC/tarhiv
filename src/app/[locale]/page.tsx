import { getLocale } from "next-intl/server";
import { HomeContent } from "./HomeContent";

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
    featured: true,
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
    featured: true,
  },
  {
    slug: "dead-sea-geology",
    title:
      locale === "he"
        ? "ים המלח: הנקודה הנמוכה ביותר על פני כדור הארץ"
        : "The Dead Sea: Earth's Lowest Point",
    description:
      locale === "he"
        ? "הגיאולוגיה, הכימיה והאקולוגיה של אחד מפלאי הטבע המרתקים בעולם"
        : "The geology, chemistry and ecology of one of nature's most fascinating wonders",
    coverImage: "/images/posts/dead-sea-geology/hero.svg",
    date: "2026-03-10",
    category: "environment",
    readingTime: 10,
    featured: false,
  },
  {
    slug: "israeli-tech-ecosystem",
    title:
      locale === "he"
        ? "אומת הסטארט-אפ: האקוסיסטם הטכנולוגי של ישראל"
        : "Startup Nation: Israel's Tech Ecosystem",
    description:
      locale === "he"
        ? "כיצד מדינה קטנה הפכה למעצמה טכנולוגית עולמית"
        : "How a small country became a global tech powerhouse",
    coverImage: "/images/posts/israeli-tech-ecosystem/hero.svg",
    date: "2026-03-05",
    category: "economy",
    readingTime: 8,
    featured: false,
  },
  {
    slug: "hebrew-revival",
    title:
      locale === "he"
        ? "תחיית השפה העברית: מלשון קודש לשפת יומיום"
        : "The Revival of Hebrew: From Sacred Language to Daily Speech",
    description:
      locale === "he"
        ? "הסיפור המדהים של השפה היחידה שקמה לתחייה כשפת אם"
        : "The incredible story of the only language to be revived as a mother tongue",
    coverImage: "/images/posts/hebrew-revival/hero.svg",
    date: "2026-02-28",
    category: "culture",
    readingTime: 11,
    featured: false,
  },
];

export default async function HomePage() {
  const locale = await getLocale();
  const posts = getMockPosts(locale);
  const featuredPost = posts.find((p) => p.featured) ?? posts[0];
  const gridPosts = posts.filter((p) => p.slug !== featuredPost.slug);

  return (
    <HomeContent
      locale={locale}
      featuredPost={featuredPost}
      allPosts={posts}
      gridPosts={gridPosts}
    />
  );
}
