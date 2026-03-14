import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "תרחיב | Tarchiv",
  description: "בלוג ישראלי ויזואלי על הנושאים שמעניינים אותנו",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
