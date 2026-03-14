"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Languages } from "lucide-react";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = () => {
    const nextLocale = locale === "he" ? "en" : "he";
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <button
      onClick={switchLocale}
      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-100/50 hover:bg-surface-200/50 text-text-secondary hover:text-brand-400 text-sm font-medium transition-all duration-300 cursor-pointer hover:shadow-[0_0_15px_var(--glow-brand)]"
      aria-label={locale === "he" ? "Switch to English" : "עבור לעברית"}
    >
      <Languages className="h-4 w-4" />
      <span>{locale === "he" ? "EN" : "עב"}</span>
    </button>
  );
}
