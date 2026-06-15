import type { BadgeCategory } from "@/components/ui/Badge";

export type PostCategory = Exclude<BadgeCategory, "default">;

export interface Post {
  slug: string;
  title: Record<string, string>;
  description: Record<string, string>;
  coverImage: string;
  date: string;
  category: PostCategory;
  readingTime: number;
  supportedLocales: ("he" | "en")[];
}

export const POSTS: Post[] = [
  {
    slug: "israeli-demography-2050",
    title: {
      he: "דמוגרפיה ישראלית 2050: 15.9 מיליון אזרחים, חברה ללא רוב",
      en: "Israeli Demography 2050: 15.9 Million Citizens, a Society Without a Majority",
    },
    description: {
      he: "תחזית הלמ\"ס: 15.9 מיליון אזרחים, חרדים יקפצו מ-14% ל-22%, גיל החציון יעלה ל-35, ואוכלוסיית 65+ תוכפל. השאלה הדמוגרפית הגדולה של ישראל",
      en: "CBS projections: 15.9M citizens, Haredi share jumping from 14% to 22%, median age rising to 35, and 65+ population doubling. Israel's defining demographic question",
    },
    coverImage: "/images/posts/israeli-demography-2050/hero.svg",
    date: "2026-06-15",
    category: "society",
    readingTime: 13,
    supportedLocales: ["he"],
  },
  {
    slug: "israel-78",
    title: {
      he: "78 שנה למדינה: ישראל במספרים, בסיפורים ובמסע של שמונה עשורים",
      en: "Israel at 78: A Nation in Numbers, Stories, and Eight Decades of Journey",
    },
    description: {
      he: "מ-806 אלף ל-10 מיליון, מצנע למעצמת היי-טק, משבע מלחמות לשישה הסכמי שלום — המסע המופלא של 78 שנות עצמאות",
      en: "From 806K to 10M, from austerity to tech powerhouse, from seven wars to six peace agreements — the remarkable journey of 78 years of independence",
    },
    coverImage: "/images/posts/israel-78/hero.svg",
    date: "2026-04-22",
    category: "society",
    readingTime: 11,
    supportedLocales: ["he"],
  },
  {
    slug: "israel-superpower",
    title: {
      he: "מעצמה מול איראן: איך ישראל שינתה את חוקי המשחק",
      en: "Superpower vs. Iran: How Israel Changed the Rules of the Game",
    },
    description: {
      he: "מכיפת ברזל ועד חץ-3, מסייבר ועד מודיעין — איך מדינה קטנה בנתה את מערך ההגנה המתוחכם בהיסטוריה",
      en: "From Iron Dome to Arrow-3, from cyber to intelligence — how a small nation built history's most sophisticated defense",
    },
    coverImage: "/images/posts/israel-superpower/hero.svg",
    date: "2026-04-11",
    category: "society",
    readingTime: 14,
    supportedLocales: ["he"],
  },
  {
    slug: "stateless-peoples",
    title: {
      he: "350 מיליון ללא דגל: העמים שעוד ממתינים למדינה",
      en: "350 Million Without a Flag: Peoples Still Waiting for a State",
    },
    description: {
      he: "כורדים, רומא, טיבטים, רוהינגה ועוד — סיפורם של עמים שחיים בלי מדינה משלהם, בחוויה תלת-ממדית",
      en: "Kurds, Roma, Tibetans, Rohingya and more — the story of peoples living without a state",
    },
    coverImage: "/images/posts/stateless-peoples/hero.svg",
    date: "2026-03-18",
    category: "society",
    readingTime: 12,
    supportedLocales: ["he"],
  },
  {
    slug: "coffee-culture",
    title: {
      he: "קפה: הנוזל השחור ששולט בעולם",
      en: "Coffee: The Black Liquid That Rules the World",
    },
    description: {
      he: "2.25 מיליארד כוסות ביום, תעשייה של 495 מיליארד דולר - הסיפור המלא של תרבות הקפה העולמית",
      en: "2.25 billion cups a day, a $495B industry - the full story of global coffee culture",
    },
    coverImage: "/images/posts/coffee-culture/hero.svg",
    date: "2026-03-17",
    category: "culture",
    readingTime: 14,
    supportedLocales: ["he"],
  },
  {
    slug: "endangered-languages",
    title: {
      he: "שפות בסכנת הכחדה: 3,000 קולות שנעלמים",
      en: "Endangered Languages: 3,000 Vanishing Voices",
    },
    description: {
      he: "כל שבועיים מתה שפה. מ-7,000 שפות בעולם, כמחצית בסכנת הכחדה — ואיתן נעלמים עולמות שלמים",
      en: "A language dies every two weeks. Of 7,000 world languages, nearly half are endangered",
    },
    coverImage: "/images/posts/endangered-languages/hero.svg",
    date: "2026-03-15",
    category: "culture",
    readingTime: 15,
    supportedLocales: ["he"],
  },
  {
    slug: "israeli-cuisine",
    title: {
      he: "האוכל הישראלי: מהפלאפל של הרחוב עד שולחנות העולם",
      en: "Israeli Cuisine: From Street Falafel to World Tables",
    },
    description: {
      he: "מהפלאפל של הרחוב ועד שולחנות העולם - איך מטבח של מהגרים הפך לתופעה גלובלית",
      en: "From street falafel to world tables - how an immigrant kitchen became a global phenomenon",
    },
    coverImage: "/images/posts/israeli-cuisine/hero.svg",
    date: "2026-03-12",
    category: "culture",
    readingTime: 13,
    supportedLocales: ["he"],
  },
  {
    slug: "jewish-diaspora",
    title: {
      he: "15.8 מיליון: פיזור היהודים בעולם",
      en: "15.8 Million: The Jewish Diaspora Worldwide",
    },
    description: {
      he: "מפת הפיזור של העם היהודי ברחבי העולם - מגמות, נתונים וסיפורים",
      en: "The distribution map of the Jewish people worldwide",
    },
    coverImage: "/images/posts/jewish-diaspora/hero.svg",
    date: "2026-03-10",
    category: "society",
    readingTime: 15,
    supportedLocales: ["he", "en"],
  },
  {
    slug: "israel-railways",
    title: {
      he: "רכבת ישראל: 1,138 קילומטר של סיפור",
      en: "Israel Railways: 1,138 Kilometers of Story",
    },
    description: {
      he: "סקירה מקיפה של רשת הרכבות בישראל - מהרכבת הראשונה ב-1892 ועד תוכניות ההרחבה",
      en: "A comprehensive review of Israel's railway network",
    },
    coverImage: "/images/posts/israel-railways/hero.svg",
    date: "2026-03-08",
    category: "infrastructure",
    readingTime: 12,
    supportedLocales: ["he", "en"],
  },
  {
    slug: "dead-sea-geology",
    title: {
      he: "ים המלח: הנקודה הנמוכה ביותר על פני כדור הארץ",
      en: "The Dead Sea: Earth's Lowest Point",
    },
    description: {
      he: "הגיאולוגיה, הכימיה והאקולוגיה של אחד מפלאי הטבע המרתקים בעולם",
      en: "The geology, chemistry and ecology of one of nature's most fascinating wonders",
    },
    coverImage: "/images/posts/dead-sea-geology/hero.svg",
    date: "2026-03-05",
    category: "environment",
    readingTime: 10,
    supportedLocales: ["he", "en"],
  },
  {
    slug: "israeli-tech-ecosystem",
    title: {
      he: "אומת הסטארט-אפ: האקוסיסטם הטכנולוגי של ישראל",
      en: "Startup Nation: Israel's Tech Ecosystem",
    },
    description: {
      he: "כיצד מדינה קטנה הפכה למעצמה טכנולוגית עולמית",
      en: "How a small country became a global tech powerhouse",
    },
    coverImage: "/images/posts/israeli-tech-ecosystem/hero.svg",
    date: "2026-03-03",
    category: "economy",
    readingTime: 8,
    supportedLocales: ["he", "en"],
  },
  {
    slug: "hebrew-revival",
    title: {
      he: "תחיית השפה העברית: מלשון קודש לשפת יומיום",
      en: "The Revival of Hebrew: From Sacred Language to Daily Speech",
    },
    description: {
      he: "הסיפור המדהים של השפה היחידה שקמה לתחייה כשפת אם",
      en: "The incredible story of the only language to be revived as a mother tongue",
    },
    coverImage: "/images/posts/hebrew-revival/hero.svg",
    date: "2026-03-01",
    category: "culture",
    readingTime: 11,
    supportedLocales: ["he", "en"],
  },
];

export interface LocalizedPost {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  date: string;
  category: PostCategory;
  readingTime: number;
}

export function getLocalizedPosts(locale: string): LocalizedPost[] {
  return POSTS.map((p) => ({
    slug: p.slug,
    title: p.title[locale] ?? p.title.he,
    description: p.description[locale] ?? p.description.he,
    coverImage: p.coverImage,
    date: p.date,
    category: p.category,
    readingTime: p.readingTime,
  })).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
