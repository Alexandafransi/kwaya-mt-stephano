import type { Bilingual } from "@/i18n/types";

export type Homily = {
  slug: string;
  title: Bilingual;
  date: string; // ISO date
  reading: Bilingual;
  summary: Bilingual;
};

// Placeholder homily summaries — replace with real Sunday reflections as they're published.
export const homilies: Homily[] = [
  {
    slug: "jumapili-ya-kwanza-2026",
    title: { sw: "Jumapili ya Kwanza ya Mwaka", en: "First Sunday of the Year" },
    date: "2026-01-04",
    reading: { sw: "Yohana 1:1-18", en: "John 1:1-18" },
    summary: {
      sw: "Neno alifanyika mwili akakaa kwetu — tafakari juu ya kuzaliwa upya kwa imani mwanzoni mwa mwaka.",
      en: "The Word became flesh and dwelt among us — a reflection on renewing our faith at the start of the year.",
    },
  },
  {
    slug: "jumapili-ya-kwaresma-2026",
    title: { sw: "Jumapili ya Kwanza ya Kwaresma", en: "First Sunday of Lent" },
    date: "2026-02-22",
    reading: { sw: "Mathayo 4:1-11", en: "Matthew 4:1-11" },
    summary: {
      sw: "Yesu anajaribiwa jangwani — tunaalikwa kutafakari kuhusu majaribu na sala katika safari yetu ya Kwaresima.",
      en: "Jesus is tempted in the desert — an invitation to reflect on temptation and prayer during our Lenten journey.",
    },
  },
];

export function getHomily(slug: string) {
  return homilies.find((h) => h.slug === slug);
}
