import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Mail } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tSite = useTranslations("site");
  const locale = useLocale();

  const navLinks = [
    { href: `/${locale}`, label: tNav("home") },
    { href: `/${locale}/posts`, label: tNav("posts") },
    { href: `/${locale}/about`, label: tNav("about") },
  ];

  return (
    <footer className="relative bg-surface-0/50 backdrop-blur-sm border-t border-surface-200/50">
      <div
        className="absolute top-0 start-0 end-0 h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h2 className="text-lg font-bold font-heading gradient-text mb-3 inline-block">
              {tSite("name")}
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              {t("about")}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold font-heading text-text-primary mb-3">
              {t("links")}
            </h2>
            <nav className="flex flex-col gap-2" aria-label={t("links")}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-brand-400 transition-colors duration-300 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-lg font-bold font-heading text-text-primary mb-3">
              {t("contact")}
            </h2>
            <a
              href="mailto:hello@tarchiv.co.il"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-brand-400 transition-colors duration-300 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              hello@tarchiv.co.il
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-surface-200/50">
          <p className="text-center text-xs text-text-muted">
            &copy; {new Date().getFullYear()} {tSite("name")}. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
