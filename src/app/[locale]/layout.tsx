import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { routing } from "@/i18n/routing";
import { frankRuhlLibre, heebo, inter } from "@/lib/fonts";
import "@/app/globals.css";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const direction = locale === "he" ? "rtl" : "ltr";
  const bodyFont = locale === "he" ? "font-body-he" : "font-body-en";

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body
        className={`${frankRuhlLibre.variable} ${heebo.variable} ${inter.variable} ${bodyFont} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
