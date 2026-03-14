import { getLocale, getTranslations } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export async function generateMetadata() {
  const t = await getTranslations("nav");
  const tSite = await getTranslations("site");
  return {
    title: `${t("about")} | ${tSite("name")}`,
  };
}

export default async function AboutPage() {
  const locale = await getLocale();
  const isHe = locale === "he";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold font-heading text-text-primary mb-6">
            {isHe ? "אודות תרחיב" : "About Tarchiv"}
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:text-text-primary prose-p:text-text-secondary">
            {isHe ? (
              <>
                <p>
                  <strong>תרחיב</strong> הוא בלוג ויזואלי ישראלי שמטרתו להציג נושאים
                  מורכבים בצורה פשוטה, ברורה ויפה. אנחנו מאמינים שמידע חשוב צריך
                  להיות נגיש לכולם, ושהדרך הטובה ביותר להבין נתונים היא לראות אותם.
                </p>

                <h2>מה תמצאו כאן?</h2>
                <p>
                  בכל פוסט אנחנו בוחרים נושא ישראלי מרתק ומציגים אותו באמצעות
                  אינפוגרפיקות, גרפים אינטראקטיביים, מפות ונתונים מעודכנים. הנושאים
                  נעים בין תשתיות, חברה, היסטוריה, סביבה, כלכלה ותרבות.
                </p>

                <h2>למה ויזואלי?</h2>
                <p>
                  המוח האנושי מעבד תמונות מהר פי 60,000 מטקסט. ויזואליזציה של נתונים
                  מאפשרת לנו לראות דפוסים, מגמות וקשרים שקשה לזהות כשקוראים טבלאות
                  מספרים. זו הדרך שלנו להרחיב את ההבנה.
                </p>

                <h2>מי אנחנו?</h2>
                <p>
                  תרחיב נולד מתוך אהבה לנתונים ולעיצוב. אנחנו צוות קטן של חובבי
                  מידע שרוצים להפוך נושאים יבשים למשהו שכיף לקרוא ולחקור. כל פוסט
                  עובר מחקר מעמיק, אימות נתונים ועיצוב קפדני.
                </p>

                <h2>צרו קשר</h2>
                <p>
                  יש לכם רעיון לפוסט? מצאתם טעות? רוצים לשתף פעולה? נשמח לשמוע
                  מכם. כתבו לנו ל-
                  <a href="mailto:hello@tarchiv.co.il">hello@tarchiv.co.il</a>.
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>Tarchiv</strong> is a visual Israeli blog that presents
                  complex topics in a simple, clear, and beautiful way. We believe
                  that important information should be accessible to everyone, and
                  that the best way to understand data is to see it.
                </p>

                <h2>What will you find here?</h2>
                <p>
                  In each post, we choose a fascinating Israeli topic and present it
                  through infographics, interactive charts, maps, and up-to-date
                  data. Topics range from infrastructure, society, history, environment,
                  economy, and culture.
                </p>

                <h2>Why visual?</h2>
                <p>
                  The human brain processes images 60,000 times faster than text.
                  Data visualization allows us to see patterns, trends, and connections
                  that are hard to identify when reading tables of numbers. This is
                  our way of expanding understanding.
                </p>

                <h2>Who are we?</h2>
                <p>
                  Tarchiv was born from a love of data and design. We are a small
                  team of information enthusiasts who want to turn dry topics into
                  something fun to read and explore. Every post goes through thorough
                  research, data verification, and careful design.
                </p>

                <h2>Get in touch</h2>
                <p>
                  Have an idea for a post? Found an error? Want to collaborate? We
                  would love to hear from you. Write to us at{" "}
                  <a href="mailto:hello@tarchiv.co.il">hello@tarchiv.co.il</a>.
                </p>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
