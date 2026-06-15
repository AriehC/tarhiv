import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getCanonicalAndAlternates } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("nav");
  const tSite = await getTranslations("site");
  const tAbout = await getTranslations("about");
  return {
    title: `${t("about")} | ${tSite("name")}`,
    description: tSite("description"),
    alternates: getCanonicalAndAlternates("/about", locale),
    openGraph: {
      title: `${t("about")} | ${tSite("name")}`,
      description: tSite("description"),
      type: "website",
      locale: locale === "he" ? "he_IL" : "en_US",
    },
    twitter: {
      card: "summary",
      title: tAbout("title"),
      description: tSite("description"),
    },
  };
}

export default async function AboutPage() {
  const locale = await getLocale();
  const t = await getTranslations("about");
  const isRtl = locale === "he";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold font-heading text-text-primary mb-6">
            {t("title")}
          </h1>

          <div
            className={`prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-brand-600 hover:prose-a:text-brand-700 dark:prose-a:text-brand-400 dark:hover:prose-a:text-brand-300 ${
              isRtl ? "prose-rtl" : "prose-ltr"
            }`}
          >
            <p dangerouslySetInnerHTML={{ __html: t.raw("intro") as string }} />

            <h2>{t("what_heading")}</h2>
            <p>{t("what_body")}</p>

            <h2>{t("why_heading")}</h2>
            <p>{t("why_body")}</p>

            <h2>{t("who_heading")}</h2>
            <p>{t("who_body")}</p>

            <h2>{t("contact_heading")}</h2>
            <p>
              {t("contact_body")}
              <a href="mailto:hello@tarchiv.co.il">hello@tarchiv.co.il</a>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
