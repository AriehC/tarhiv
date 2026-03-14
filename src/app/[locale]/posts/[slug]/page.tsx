import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CommentSection } from "@/components/comments/CommentSection";
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
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const tSite = await getTranslations("site");

  const titles: Record<string, Record<string, string>> = {
    "israel-railways": {
      he: "רכבת ישראל: 1,138 קילומטר של סיפור",
      en: "Israel Railways: 1,138 Kilometers of Story",
    },
    "jewish-diaspora": {
      he: "15.8 מיליון: פיזור היהודים בעולם",
      en: "15.8 Million: The Jewish Diaspora Worldwide",
    },
    "dead-sea-geology": {
      he: "ים המלח: הנקודה הנמוכה ביותר על פני כדור הארץ",
      en: "The Dead Sea: Earth's Lowest Point",
    },
    "israeli-tech-ecosystem": {
      he: "אומת הסטארט-אפ: האקוסיסטם הטכנולוגי של ישראל",
      en: "Startup Nation: Israel's Tech Ecosystem",
    },
    "hebrew-revival": {
      he: "תחיית השפה העברית: מלשון קודש לשפת יומיום",
      en: "The Revival of Hebrew: From Sacred Language to Daily Speech",
    },
  };

  const title = titles[slug]?.[locale] || slug;

  return {
    title: `${title} | ${tSite("name")}`,
  };
}

const coverImages: Record<string, string> = {
  "israel-railways": "/images/posts/israel-railways/hero.svg",
  "jewish-diaspora": "/images/posts/jewish-diaspora/hero.svg",
  "dead-sea-geology": "/images/posts/dead-sea-geology/hero.svg",
  "israeli-tech-ecosystem": "/images/posts/israeli-tech-ecosystem/hero.svg",
  "hebrew-revival": "/images/posts/hebrew-revival/hero.svg",
};

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

  const isRtl = locale === "he";
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;
  const t = await getTranslations("post");

  const coverImage = coverImages[slug];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero cover image */}
      {coverImage && (
        <div className="relative w-full aspect-[21/9] min-h-[250px] max-h-[450px] mt-16">
          <Image
            src={coverImage}
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
      )}

      <main className={`flex-1 ${coverImage ? "pb-16" : "pt-24 pb-16"}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href={`/${locale}/posts`}
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-brand-400 transition-colors mb-8"
          >
            <BackArrow className="h-4 w-4" />
            {t("back_to_posts")}
          </Link>

          {/* MDX Content */}
          <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-brand-600 hover:prose-a:text-brand-700 prose-img:rounded-xl">
            <MDXContent />
          </article>

          {/* Divider */}
          <hr className="my-12 border-surface-200" />

          {/* Comments */}
          <CommentSection postSlug={slug} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
