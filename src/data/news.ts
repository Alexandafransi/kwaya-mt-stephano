import type { Bilingual } from "@/i18n/types";

export type NewsItem = {
  slug: string;
  title: Bilingual;
  date: string; // ISO date
  excerpt: Bilingual;
  body: Bilingual;
};

// Placeholder news items, structured around the real 2026 calendar events —
// swap in real write-ups as events happen.
export const news: NewsItem[] = [
  {
    slug: "uapisho-viongozi-wapya-2026",
    title: { sw: "Uapisho wa Viongozi Wapya wa Kwaya", en: "Swearing-in of the Choir's New Leaders" },
    date: "2026-01-11",
    excerpt: {
      sw: "Kwaya imefanya ibada ya uapisho kwa viongozi wapya waliochaguliwa kuongoza kwa mwaka ujao.",
      en: "The choir held a swearing-in ceremony for the new leaders elected to serve in the coming year.",
    },
    body: {
      sw: "Jumapili tarehe 11 Januari, kwaya ilifanya ibada maalum ya uapisho kwa viongozi wapya waliochaguliwa na wanakwaya. Ibada hii iliambatana na sala na baraka kutoka kwa Mchungaji wa Kiroho, ikifuatiwa na makabidhiano rasmi kutoka kwa viongozi walimaliza muda wao.",
      en: "On Sunday, January 11th, the choir held a special swearing-in service for the new leaders elected by choir members. The ceremony included prayers and a blessing from the Spiritual Director, followed by the formal handover from the outgoing leadership.",
    },
  },
  {
    slug: "semina-ya-uimbaji-2026",
    title: { sw: "Semina ya Uimbaji Yafanyika", en: "Singing Seminar Held" },
    date: "2026-02-01",
    excerpt: {
      sw: "Wanakwaya wamepata mafunzo ya uimbaji na ustadi wa sauti kuboresha huduma ya muziki.",
      en: "Choir members received training in singing technique and vocal skills to strengthen the music ministry.",
    },
    body: {
      sw: "Semina ya uimbaji ilifanyika ikiwashirikisha wanakwaya wote, ikilenga kuboresha ustadi wa sauti, upumuaji na uelewano wa vipande vya muziki vinavyotumika Kanisani.",
      en: "The singing seminar brought together all choir members, focusing on improving vocal technique, breathing, and understanding of the musical pieces used in church.",
    },
  },
  {
    slug: "mtoko-wa-furaha-2026",
    title: { sw: "Mtoko wa Furaha wa Kwaya", en: "Choir Joy Excursion" },
    date: "2026-04-26",
    excerpt: {
      sw: "Wanakwaya walifurahia siku ya mapumziko na burudani pamoja kama familia moja.",
      en: "Choir members enjoyed a day of rest and recreation together as one family.",
    },
    body: {
      sw: "Kwaya ilifanya mtoko wa furaha uliojumuisha michezo, chakula na muda wa kujengana kiroho na kijamii miongoni mwa wanakwaya na familia zao.",
      en: "The choir held a joy excursion that included games, food, and time to build spiritual and social bonds among members and their families.",
    },
  },
];

export function getNewsItem(slug: string) {
  return news.find((n) => n.slug === slug);
}
