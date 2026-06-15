export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tarchiv.co.il";

export const LOCALES = ["he", "en"] as const;
export const DEFAULT_LOCALE = "he";

export function getCanonicalAndAlternates(
  pathWithoutLocale: string,
  currentLocale: string,
) {
  const normalized =
    pathWithoutLocale === "/" || pathWithoutLocale === ""
      ? ""
      : pathWithoutLocale.startsWith("/")
        ? pathWithoutLocale
        : `/${pathWithoutLocale}`;

  const buildHref = (locale: string) => `${SITE_URL}/${locale}${normalized}`;

  return {
    canonical: buildHref(currentLocale),
    languages: {
      he: buildHref("he"),
      en: buildHref("en"),
      "x-default": buildHref(DEFAULT_LOCALE),
    },
  };
}
