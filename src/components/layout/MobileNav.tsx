"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("nav");
  const locale = useLocale();

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/posts`, label: t("posts") },
    { href: `/${locale}/about`, label: t("about") },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-xl hover:bg-surface-100/50 text-text-primary transition-colors md:hidden cursor-pointer"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: locale === "he" ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: locale === "he" ? "100%" : "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 end-0 z-50 w-72 glass border-s border-surface-200/50 shadow-[0_0_60px_var(--glow-brand)]"
            >
              <div className="flex flex-col h-full p-6">
                {/* Close button */}
                <div className="flex justify-end mb-8">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl hover:bg-surface-100/50 text-text-primary transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Navigation links */}
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-3 rounded-xl text-lg font-medium text-text-primary hover:bg-brand-500/10 hover:text-brand-400 transition-all duration-300"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Bottom controls */}
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
