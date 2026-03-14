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
      {/* Top gradient line */}
      <div className="absolute top-0 start-0 end-0 h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About column */}
          <div>
            <h3 className="text-lg font-bold font-heading gradient-text mb-3 inline-block">
              {tSite("name")}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {t("about")}
            </p>
          </div>

          {/* Navigation links column */}
          <div>
            <h3 className="text-lg font-bold font-heading text-text-primary mb-3">
              {t("links")}
            </h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-brand-400 transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="text-lg font-bold font-heading text-text-primary mb-3">
              {t("contact")}
            </h3>
            <a
              href="mailto:hello@tarchiv.co.il"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-brand-400 transition-colors duration-300"
            >
              <Mail className="h-4 w-4" />
              hello@tarchiv.co.il
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-surface-200/50">
          <p className="text-center text-xs text-text-muted">
            &copy; {new Date().getFullYear()} {tSite("name")}. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
