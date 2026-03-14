"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("nav");
  const tSite = useTranslations("site");
  const locale = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/posts`, label: t("posts") },
    { href: `/${locale}/about`, label: t("about") },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 start-0 end-0 z-50 transition-all duration-500",
        scrolled
          ? "h-16 glass border-b border-brand-500/10 shadow-[0_1px_30px_-5px_var(--glow-brand)]"
          : "h-20 bg-transparent",
      )}
    >
      {/* Bottom gradient line */}
      {scrolled && (
        <div className="absolute bottom-0 start-0 end-0 h-px bg-gradient-to-r from-transparent via-brand-400/50 to-transparent" />
      )}

      <div className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2 shrink-0">
          <span className="text-2xl font-bold font-heading gradient-text">
            {tSite("name")}
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-brand-400 transition-all duration-300 hover:bg-brand-500/5"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <LocaleSwitcher />
            <ThemeToggle />
            <Button variant="primary" size="sm">
              <LogIn className="h-4 w-4" />
              {t("login")}
            </Button>
          </div>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
