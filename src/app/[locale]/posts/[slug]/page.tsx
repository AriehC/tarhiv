import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge, type BadgeCategory } from "@/components/ui/Badge";
import { CommentSection } from "@/components/comments/CommentSection";
import { PostEngagement } from "@/components/posts/PostEngagement";
import { Skeleton } from "@/components/ui/Skeleton";

function MDXLoading() {
  return (
    <div className="space-y-4 py-8">
      <Skeleton variant="rect" className="w-full h-8" />
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-full" />
      <Skeleton variant="text" className="w-5/6" />
      <Skeleton variant="rect" className="w-full h-48 mt-4" />
      <Skeleton variant="text" className="w-full" />
      <Skeleton variant="text" className="w-2/3" />
    </div>
  );
}

const postComponents: Record<string, Record<string, React.ComponentType>> = {
  "israel-railways": {
    he: dynamic(
      () => import("@/../content/posts/israel-railways/index.he.mdx"),
      { loading: MDXLoading },
    ),
    en: dynamic(
      () => import("@/../content/posts/israel-railways/index.en.mdx"),
      { loading: MDXLoading },
    ),
  },
  "jewish-diaspora": {
    he: dynamic(
      () => import("@/../content/posts/jewish-diaspora/index.he.mdx"),
      { loading: MDXLoading },
    ),
    en: dynamic(
      () => import("@/../content/posts/jewish-diaspora/index.en.mdx"),
      { loading: MDXLoading },
    ),
  },
  "dead-sea-geology": {
    he: dynamic(
      () => import("@/../content/posts/dead-sea-geology/index.he.mdx"),
      { loading: MDXLoading },
    ),
    en: dynamic(
      () => import("@/../content/posts/dead-sea-geology/index.en.mdx"),
      { loading: MDXLoading },
    ),
  },
  "israeli-tech-ecosystem": {
    he: dynamic(
      () => import("@/../content/posts/israeli-tech-ecosystem/index.he.mdx"),
      { loading: MDXLoading },
    ),
    en: dynamic(
      () => import("@/../content/posts/israeli-tech-ecosystem/index.en.mdx"),
      { loading: MDXLoading },
    ),
  },
  "hebrew-revival": {
    he: dynamic(
      () => import("@/../content/posts/hebrew-revival/index.he.mdx"),
      { loading: MDXLoading },
    ),
    en: dynamic(
      () => import("@/../content/posts/hebrew-revival/index.en.mdx"),
      { loading: MDXLoading },
    ),
  },
  "coffee-culture": {
    he: dynamic(
      () => import("@/../content/posts/coffee-culture/index.he.mdx"),
      { loading: MDXLoading },
    ),
  },
  "endangered-languages": {
    he: dynamic(
      () => import("@/../content/posts/endangered-languages/index.he.mdx"),
      { loading: MDXLoading },
    ),
  },
  "israeli-cuisine": {
    he: dynamic(
      () => import("@/../content/posts/israeli-cuisine/index.he.mdx"),
      { loading: MDXLoading },
    ),
  },
  "stateless-peoples": {
    he: dynamic(
      () => import("@/../content/posts/stateless-peoples/index.he.mdx"),
      { loading: MDXLoading },
    ),
  },
};

interface PostMeta {
  title: Record<string, string>;
  coverImage: string;
  category: string;
  date: string;
  readingTime: number;
}

const postMeta: Record<string, PostMeta> = {
  "israel-railways": {
    title: {
      he: "רכבת ישראל: 1,138 קילומטר של סיפור",
      en: "Israel Railways: 1,138 Kilometers of Story",
    },
    coverImage: "/images/posts/israel-railways/hero.svg",
    category: "infrastructure",
    date: "2026-03-08",
    readingTime: 12,
  },
  "jewish-diaspora": {
    title: {
      he: "15.8 מיליון: פיזור היהודים בעולם",
      en: "15.8 Million: The Jewish Diaspora Worldwide",
    },
    coverImage: "/images/posts/jewish-diaspora/hero.svg",
    category: "society",
    date: "2026-03-10",
    readingTime: 15,
  },
  "dead-sea-geology": {
    title: {
      he: "ים המלח: הנקודה הנמוכה ביותר על פני כדור הארץ",
      en: "The Dead Sea: Earth's Lowest Point",
    },
    coverImage: "/images/posts/dead-sea-geology/hero.svg",
    category: "environment",
    date: "2026-03-05",
    readingTime: 10,
  },
  "israeli-tech-ecosystem": {
    title: {
      he: "אומת הסטארט-אפ: האקוסיסטם הטכנולוגי של ישראל",
      en: "Startup Nation: Israel's Tech Ecosystem",
    },
    coverImage: "/images/posts/israeli-tech-ecosystem/hero.svg",
    category: "economy",
    date: "2026-03-03",
    readingTime: 8,
  },
  "hebrew-revival": {
    title: {
      he: "תחיית השפה העברית: מלשון קודש לשפת יומיום",
      en: "The Revival of Hebrew: From Sacred Language to Daily Speech",
    },
    coverImage: "/images/posts/hebrew-revival/hero.svg",
    category: "culture",
    date: "2026-03-01",
    readingTime: 11,
  },
  "coffee-culture": {
    title: {
      he: "קפה: הנוזל השחור ששולט בעולם",
      en: "Coffee: The Black Liquid That Rules the World",
    },
    coverImage: "/images/posts/coffee-culture/hero.svg",
    category: "culture",
    date: "2026-03-17",
    readingTime: 14,
  },
  "endangered-languages": {
    title: {
      he: "שפות בסכנת הכחדה: 3,000 קולות שנעלמים",
      en: "Endangered Languages: 3,000 Vanishing Voices",
    },
    coverImage: "/images/posts/endangered-languages/hero.svg",
    category: "culture",
    date: "2026-03-15",
    readingTime: 15,
  },
  "israeli-cuisine": {
    title: {
      he: "האוכל הישראלי: מהפלאפל של הרחוב עד שולחנות העולם",
      en: "Israeli Cuisine: From Street Falafel to World Tables",
    },
    coverImage: "/images/posts/israeli-cuisine/hero.svg",
    category: "culture",
    date: "2026-03-12",
    readingTime: 13,
  },
  "stateless-peoples": {
    title: {
      he: "350 מיליון ללא דגל: העמים שעוד ממתינים למדינה",
      en: "350 Million Without a Flag: Peoples Still Waiting for a State",
    },
    coverImage: "/images/posts/stateless-peoples/hero.svg",
    category: "society",
    date: "2026-03-18",
    readingTime: 16,
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const tSite = await getTranslations("site");
  const meta = postMeta[slug];
  const title = meta?.title[locale] ?? slug;

  return {
    title: `${title} | ${tSite("name")}`,
  };
}

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(
    locale === "he" ? "he-IL" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const localeComponents = postComponents[slug];
  if (!localeComponents) {
    notFound();
  }

  const MDXContent = localeComponents[locale] || localeComponents["he"];
  if (!MDXContent) {
    notFound();
  }

  const meta = postMeta[slug];
  const isRtl = locale === "he";
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;
  const t = await getTranslations("post");
  const tCat = await getTranslations("categories");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero cover image */}
      {meta?.coverImage && (
        <div className="relative w-full aspect-[21/9] min-h-[250px] max-h-[450px] mt-16">
          <Image
            src={meta.coverImage}
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
      )}

      <main className={`flex-1 ${meta?.coverImage ? "pb-16" : "pt-24 pb-16"}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href={`/${locale}/posts`}
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-brand-400 transition-colors mb-6"
          >
            <BackArrow className="h-4 w-4" />
            {t("back_to_posts")}
          </Link>

          {/* Post header */}
          {meta && (
            <header className="mb-10">
              <Badge category={meta.category as BadgeCategory} className="mb-4">
                {tCat(meta.category)}
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading gradient-text leading-tight mb-4">
                {meta.title[locale] ?? meta.title.he}
              </h1>
              <div className="flex items-center flex-wrap gap-4 text-sm text-text-muted">
                <time dateTime={meta.date}>
                  {formatDate(meta.date, locale)}
                </time>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {meta.readingTime} {locale === "he" ? "דק׳ קריאה" : "min read"}
                </span>
                <PostEngagement postSlug={slug} />
              </div>
              <div className="mt-6 h-px bg-gradient-to-r from-transparent via-brand-400/30 to-transparent" />
            </header>
          )}

          {/* MDX Content */}
          <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-brand-600 hover:prose-a:text-brand-700 prose-img:rounded-xl">
            <MDXContent />
          </article>

          {/* Bottom engagement bar */}
          <div className="mt-10 flex items-center justify-center py-4 rounded-xl bg-surface-0/50 backdrop-blur-sm border border-surface-200/50">
            <PostEngagement postSlug={slug} />
          </div>

          {/* Divider */}
          <hr className="my-12 h-px border-0 bg-gradient-to-r from-transparent via-brand-400/30 to-transparent" />

          {/* Comments */}
          <CommentSection postSlug={slug} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
