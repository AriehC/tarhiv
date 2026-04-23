import { getLocale } from "next-intl/server";
import { HomeContent } from "./HomeContent";

const getMockPosts = (locale: string) => [
  {
    slug: "israel-railways",
    title:
      locale === "he"
        ? "רכבת ישראל: 1,138 קילומטר של סיפור"
        : "Israel Railways: 1,138 Kilometers of Story",
    description:
      locale === "he"
        ? "סקירה מקיפה של רשת הרכבות בישראל - מהרכבת הראשונה ב-1892 ועד תוכניות ההרחבה"
        : "A comprehensive review of Israel's railway network",
    coverImage: "/images/posts/israel-railways/hero.svg",
    date: "2026-03-08",
    category: "infrastructure",
    readingTime: 12,
  },
  {
    slug: "jewish-diaspora",
    title:
      locale === "he"
        ? "15.8 מיליון: פיזור היהודים בעולם"
        : "15.8 Million: The Jewish Diaspora Worldwide",
    description:
      locale === "he"
        ? "מפת הפיזור של העם היהודי ברחבי העולם - מגמות, נתונים וסיפורים"
        : "The distribution map of the Jewish people worldwide",
    coverImage: "/images/posts/jewish-diaspora/hero.svg",
    date: "2026-03-10",
    category: "society",
    readingTime: 15,
  },
  {
    slug: "dead-sea-geology",
    title:
      locale === "he"
        ? "ים המלח: הנקודה הנמוכה ביותר על פני כדור הארץ"
        : "The Dead Sea: Earth's Lowest Point",
    description:
      locale === "he"
        ? "הגיאולוגיה, הכימיה והאקולוגיה של אחד מפלאי הטבע המרתקים בעולם"
        : "The geology, chemistry and ecology of one of nature's most fascinating wonders",
    coverImage: "/images/posts/dead-sea-geology/hero.svg",
    date: "2026-03-05",
    category: "environment",
    readingTime: 10,
  },
  {
    slug: "israeli-tech-ecosystem",
    title:
      locale === "he"
        ? "אומת הסטארט-אפ: האקוסיסטם הטכנולוגי של ישראל"
        : "Startup Nation: Israel's Tech Ecosystem",
    description:
      locale === "he"
        ? "כיצד מדינה קטנה הפכה למעצמה טכנולוגית עולמית"
        : "How a small country became a global tech powerhouse",
    coverImage: "/images/posts/israeli-tech-ecosystem/hero.svg",
    date: "2026-03-03",
    category: "economy",
    readingTime: 8,
  },
  {
    slug: "hebrew-revival",
    title:
      locale === "he"
        ? "תחיית השפה העברית: מלשון קודש לשפת יומיום"
        : "The Revival of Hebrew: From Sacred Language to Daily Speech",
    description:
      locale === "he"
        ? "הסיפור המדהים של השפה היחידה שקמה לתחייה כשפת אם"
        : "The incredible story of the only language to be revived as a mother tongue",
    coverImage: "/images/posts/hebrew-revival/hero.svg",
    date: "2026-03-01",
    category: "culture",
    readingTime: 11,
  },
  {
    slug: "coffee-culture",
    title:
      locale === "he"
        ? "קפה: הנוזל השחור ששולט בעולם"
        : "Coffee: The Black Liquid That Rules the World",
    description:
      locale === "he"
        ? "2.25 מיליארד כוסות ביום, תעשייה של 495 מיליארד דולר - הסיפור המלא של תרבות הקפה העולמית"
        : "2.25 billion cups a day, a $495B industry - the full story of global coffee culture",
    coverImage: "/images/posts/coffee-culture/hero.svg",
    date: "2026-03-17",
    category: "culture",
    readingTime: 14,
  },
  {
    slug: "endangered-languages",
    title:
      locale === "he"
        ? "שפות בסכנת הכחדה: 3,000 קולות שנעלמים"
        : "Endangered Languages: 3,000 Vanishing Voices",
    description:
      locale === "he"
        ? "כל שבועיים מתה שפה. מ-7,000 שפות בעולם, כמחצית בסכנת הכחדה — ואיתן נעלמים עולמות שלמים"
        : "A language dies every two weeks. Of 7,000 world languages, nearly half are endangered",
    coverImage: "/images/posts/endangered-languages/hero.svg",
    date: "2026-03-15",
    category: "culture",
    readingTime: 15,
  },
  {
    slug: "israeli-cuisine",
    title:
      locale === "he"
        ? "האוכל הישראלי: מהפלאפל של הרחוב עד שולחנות העולם"
        : "Israeli Cuisine: From Street Falafel to World Tables",
    description:
      locale === "he"
        ? "מהפלאפל של הרחוב ועד שולחנות העולם - איך מטבח של מהגרים הפך לתופעה גלובלית"
        : "From street falafel to world tables - how an immigrant kitchen became a global phenomenon",
    coverImage: "/images/posts/israeli-cuisine/hero.svg",
    date: "2026-03-12",
    category: "culture",
    readingTime: 13,
  },
  {
    slug: "stateless-peoples",
    title:
      locale === "he"
        ? "350 מיליון ללא דגל: העמים שעוד ממתינים למדינה"
        : "350 Million Without a Flag: Peoples Still Waiting for a State",
    description:
      locale === "he"
        ? "כורדים, רומא, טיבטים, רוהינגה ועוד — סיפורם של עמים שחיים בלי מדינה משלהם, בחוויה תלת-ממדית"
        : "Kurds, Roma, Tibetans, Rohingya and more — the story of peoples living without a state",
    coverImage: "/images/posts/stateless-peoples/hero.svg",
    date: "2026-03-18",
    category: "society",
    readingTime: 12,
  },
  {
    slug: "israel-superpower",
    title:
      locale === "he"
        ? "מעצמה מול איראן: איך ישראל שינתה את חוקי המשחק"
        : "Superpower vs. Iran: How Israel Changed the Rules of the Game",
    description:
      locale === "he"
        ? "מכיפת ברזל ועד חץ-3, מסייבר ועד מודיעין — איך מדינה קטנה בנתה את מערך ההגנה המתוחכם בהיסטוריה"
        : "From Iron Dome to Arrow-3, from cyber to intelligence — how a small nation built history's most sophisticated defense",
    coverImage: "/images/posts/israel-superpower/hero.svg",
    date: "2026-04-11",
    category: "society",
    readingTime: 14,
  },
  {
    slug: "israel-78",
    title:
      locale === "he"
        ? "78 שנה למדינה: ישראל במספרים, בסיפורים ובמסע של שמונה עשורים"
        : "Israel at 78: A Nation in Numbers, Stories, and Eight Decades of Journey",
    description:
      locale === "he"
        ? "מ-806 אלף ל-10 מיליון, מצנע למעצמת היי-טק, משבע מלחמות לשישה הסכמי שלום — המסע המופלא של 78 שנות עצמאות"
        : "From 806K to 10M, from austerity to tech powerhouse, from seven wars to six peace agreements — the remarkable journey of 78 years of independence",
    coverImage: "/images/posts/israel-78/hero.svg",
    date: "2026-04-22",
    category: "society",
    readingTime: 11,
  },
];

export default async function HomePage() {
  const locale = await getLocale();
  const posts = getMockPosts(locale).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <HomeContent
      locale={locale}
      allPosts={posts}
    />
  );
}
