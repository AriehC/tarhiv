"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("nav");
  const tSite = useTranslations("site");
  const locale = useLocale();
  const openerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      openerRef.current?.focus();
    }
  }, [isOpen]);

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/posts`, label: t("posts") },
    { href: `/${locale}/about`, label: t("about") },
  ];

  return (
    <>
      <button
        ref={openerRef}
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-xl hover:bg-surface-100/50 text-text-primary transition-colors md:hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        aria-label={locale === "he" ? "פתח תפריט" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              id="mobile-nav-panel"
              role="dialog"
              aria-modal="true"
              aria-label={tSite("name")}
              initial={{ x: locale === "he" ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: locale === "he" ? "100%" : "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 end-0 z-50 w-72 glass border-s border-surface-200/50 shadow-[0_0_60px_var(--glow-brand)]"
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex justify-end mb-8">
                  <button
                    ref={closeRef}
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl hover:bg-surface-100/50 text-text-primary transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                    aria-label={locale === "he" ? "סגור תפריט" : "Close menu"}
                  >
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <nav className="flex flex-col gap-2" aria-label={tSite("name")}>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-3 rounded-xl text-lg font-medium text-text-primary hover:bg-brand-500/10 hover:text-brand-400 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="flex-1" />

                <div className="flex items-center gap-3 pt-6 border-t border-surface-200/50">
                  <LocaleSwitcher />
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
