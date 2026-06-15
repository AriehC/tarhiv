import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { CommentSection } from "@/components/comments/CommentSection";
import { PostEngagement } from "@/components/posts/PostEngagement";
import { ShareButtons } from "@/components/posts/ShareButtons";
import { Skeleton } from "@/components/ui/Skeleton";
import { getPostBySlug, POSTS } from "@/lib/posts";
import { SITE_URL, getCanonicalAndAlternates } from "@/lib/seo";

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
    he: dynamic(() => import("@/../content/posts/israel-railways/index.he.mdx"), {
      loading: MDXLoading,
    }),
    en: dynamic(() => import("@/../content/posts/israel-railways/index.en.mdx"), {
      loading: MDXLoading,
    }),
  },
  "jewish-diaspora": {
    he: dynamic(() => import("@/../content/posts/jewish-diaspora/index.he.mdx"), {
      loading: MDXLoading,
    }),
    en: dynamic(() => import("@/../content/posts/jewish-diaspora/index.en.mdx"), {
      loading: MDXLoading,
    }),
  },
  "dead-sea-geology": {
    he: dynamic(() => import("@/../content/posts/dead-sea-geology/index.he.mdx"), {
      loading: MDXLoading,
    }),
    en: dynamic(() => import("@/../content/posts/dead-sea-geology/index.en.mdx"), {
      loading: MDXLoading,
    }),
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
    he: dynamic(() => import("@/../content/posts/hebrew-revival/index.he.mdx"), {
      loading: MDXLoading,
    }),
    en: dynamic(() => import("@/../content/posts/hebrew-revival/index.en.mdx"), {
      loading: MDXLoading,
    }),
  },
  "coffee-culture": {
    he: dynamic(() => import("@/../content/posts/coffee-culture/index.he.mdx"), {
      loading: MDXLoading,
    }),
  },
  "endangered-languages": {
    he: dynamic(
      () => import("@/../content/posts/endangered-languages/index.he.mdx"),
      { loading: MDXLoading },
    ),
  },
  "israeli-cuisine": {
    he: dynamic(() => import("@/../content/posts/israeli-cuisine/index.he.mdx"), {
      loading: MDXLoading,
    }),
  },
  "stateless-peoples": {
    he: dynamic(() => import("@/../content/posts/stateless-peoples/index.he.mdx"), {
      loading: MDXLoading,
    }),
  },
  "israel-superpower": {
    he: dynamic(() => import("@/../content/posts/israel-superpower/index.he.mdx"), {
      loading: MDXLoading,
    }),
  },
  "israel-78": {
    he: dynamic(() => import("@/../content/posts/israel-78/index.he.mdx"), {
      loading: MDXLoading,
    }),
  },
  "israeli-demography-2050": {
    he: dynamic(
      () => import("@/../content/posts/israeli-demography-2050/index.he.mdx"),
      { loading: MDXLoading },
    ),
  },
};

export function generateStaticParams() {
  return POSTS.flatMap((post) =>
    post.supportedLocales.map((locale) => ({
      locale,
      slug: post.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);
  const tSite = await getTranslations("site");

  if (!post) return {};

  const title = post.title[locale] ?? post.title.he;
  const description = post.description[locale] ?? post.description.he;
  const image = `${SITE_URL}${post.coverImage}`;

  return {
    title: `${title} | ${tSite("name")}`,
    description,
    alternates: getCanonicalAndAlternates(`/posts/${slug}`, locale),
    openGraph: {
      title,
      description,
      type: "article",
      locale: locale === "he" ? "he_IL" : "en_US",
      publishedTime: post.date,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
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

  const post = getPostBySlug(slug);
  const MDXContent = localeComponents[locale] || localeComponents["he"];
  if (!MDXContent || !post) {
    notFound();
  }

  const isRtl = locale === "he";
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;
  const t = await getTranslations("post");
  const tHome = await getTranslations("home");
  const tCat = await getTranslations("categories");
  const tSite = await getTranslations("site");

  const title = post.title[locale] ?? post.title.he;
  const description = post.description[locale] ?? post.description.he;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: `${SITE_URL}${post.coverImage}`,
    datePublished: post.date,
    inLanguage: locale === "he" ? "he-IL" : "en-US",
    author: { "@type": "Organization", name: tSite("name") },
    publisher: {
      "@type": "Organization",
      name: tSite("name"),
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${locale}/posts/${slug}`,
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <div className="relative w-full aspect-[21/9] min-h-[250px] max-h-[450px] mt-16">
        <Image
          src={post.coverImage}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <main className="flex-1 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/posts`}
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-brand-400 transition-colors mb-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 rounded"
          >
            <BackArrow className="h-4 w-4" aria-hidden="true" />
            {t("back_to_posts")}
          </Link>

          <header className="mb-10">
            <Badge category={post.category} className="mb-4">
              {tCat(post.category)}
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading gradient-text leading-tight mb-4">
              {title}
            </h1>
            <div className="flex items-center flex-wrap gap-4 text-sm text-text-muted">
              <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {post.readingTime} {tHome("min_read")}
              </span>
              <PostEngagement postSlug={slug} />
            </div>
            <div className="mt-6 pt-4 border-t border-surface-200/30">
              <ShareButtons title={title} slug={slug} locale={locale} />
            </div>
            <div
              className="mt-6 h-px bg-gradient-to-r from-transparent via-brand-400/30 to-transparent"
              aria-hidden="true"
            />
          </header>

          <article
            className={`prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-brand-600 hover:prose-a:text-brand-700 dark:prose-a:text-brand-400 dark:hover:prose-a:text-brand-300 prose-img:rounded-xl ${
              isRtl ? "prose-rtl" : "prose-ltr"
            }`}
          >
            <MDXContent />
          </article>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 rounded-xl bg-surface-0/50 backdrop-blur-sm border border-surface-200/50">
            <PostEngagement postSlug={slug} />
            <ShareButtons title={title} slug={slug} locale={locale} />
          </div>

          <hr
            className="my-12 h-px border-0 bg-gradient-to-r from-transparent via-brand-400/30 to-transparent"
            aria-hidden="true"
          />

          <CommentSection postSlug={slug} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
