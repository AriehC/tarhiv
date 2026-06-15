import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "תרחיב | Tarchiv",
    template: "%s | תרחיב",
  },
  description: "בלוג ישראלי ויזואלי על הנושאים שמעניינים אותנו",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
