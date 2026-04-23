"use client";

import { useState } from "react";
import {
  Twitter,
  Facebook,
  MessageCircle,
  Link2,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

const LABELS = {
  he: {
    share: "שתף",
    x: "שתף ב-X",
    whatsapp: "שתף בוואטסאפ",
    facebook: "שתף בפייסבוק",
    copy: "העתק קישור",
    copied: "הועתק!",
  },
  en: {
    share: "Share",
    x: "Share on X",
    whatsapp: "Share on WhatsApp",
    facebook: "Share on Facebook",
    copy: "Copy link",
    copied: "Copied!",
  },
} as const;

interface ShareButtonsProps {
  title: string;
  slug: string;
  locale: string;
  description?: string;
}

export function ShareButtons({ title, slug, locale }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const labels =
    locale === "en" ? LABELS.en : LABELS.he;

  const getUrl = () => {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (typeof window !== "undefined"
        ? window.location.origin
        : "https://tarchiv.web.app");
    return `${baseUrl}/${locale}/posts/${slug}`;
  };

  const openPopup = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleX = () => {
    const url = getUrl();
    openPopup(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title,
      )}&url=${encodeURIComponent(url)}`,
    );
  };

  const handleWhatsApp = () => {
    const url = getUrl();
    openPopup(
      `https://wa.me/?text=${encodeURIComponent(`${title}\n\n${url}`)}`,
    );
  };

  const handleFacebook = () => {
    const url = getUrl();
    openPopup(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    );
  };

  const handleCopy = async () => {
    try {
      const url = getUrl();
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard may be unavailable (e.g. insecure context); silently ignore
    }
  };

  const baseBtn =
    "inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 rounded-md px-1.5 py-1";

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        type="button"
        onClick={handleX}
        aria-label={labels.x}
        className={cn(baseBtn, "hover:text-text-primary")}
      >
        <Twitter className="h-4 w-4" />
        <span className="hidden sm:inline">X</span>
      </button>

      <button
        type="button"
        onClick={handleWhatsApp}
        aria-label={labels.whatsapp}
        className={cn(baseBtn, "hover:text-green-500")}
      >
        <MessageCircle className="h-4 w-4" />
        <span className="hidden sm:inline">WhatsApp</span>
      </button>

      <button
        type="button"
        onClick={handleFacebook}
        aria-label={labels.facebook}
        className={cn(baseBtn, "hover:text-blue-500")}
      >
        <Facebook className="h-4 w-4" />
        <span className="hidden sm:inline">Facebook</span>
      </button>

      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? labels.copied : labels.copy}
        className={cn(
          baseBtn,
          copied ? "text-brand-400" : "hover:text-brand-400",
        )}
      >
        {copied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Link2 className="h-4 w-4" />
        )}
        <span className="hidden sm:inline">
          {copied ? labels.copied : labels.copy}
        </span>
      </button>
    </div>
  );
}
