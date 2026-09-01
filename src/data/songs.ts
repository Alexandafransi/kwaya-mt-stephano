import type { Bilingual } from "@/i18n/types";

export type Song = {
  title: string;
  youtubeId: string | null;
};

export type SongCategory = {
  slug: string;
  name: Bilingual;
  description: Bilingual;
  songs: Song[];
};

// Song titles are illustrative placeholders. Add a real YouTube video ID to
// each entry (or new entries) as recordings are uploaded — until then the
// card shows a "coming soon" state instead of a broken embed.
export const songCategories: SongCategory[] = [
  {
    slug: "mwanzo",
    name: { sw: "Nyimbo za Mwanzo", en: "Opening Songs" },
    description: {
      sw: "Nyimbo za kuanza Misa na kukaribisha Umati kwa Ibada.",
      en: "Songs used to open Mass and welcome the congregation into worship.",
    },
    songs: [
      { title: "Tumsifu Mungu Wetu", youtubeId: null },
      { title: "Njoo Ukae Nasi", youtubeId: null },
    ],
  },
  {
    slug: "kati",
    name: { sw: "Nyimbo za Kati", en: "Middle of Mass Songs" },
    description: {
      sw: "Nyimbo zinazoimbwa katikati ya Ibada, kabla na baada ya Neno la Mungu.",
      en: "Songs sung during the middle portion of Mass, around the Liturgy of the Word.",
    },
    songs: [{ title: "Neno Lako Bwana", youtubeId: null }],
  },
  {
    slug: "matoleo",
    name: { sw: "Nyimbo za Matoleo", en: "Offertory Songs" },
    description: {
      sw: "Nyimbo za wakati wa kutoa sadaka na kuandaa Meza ya Bwana.",
      en: "Songs for the offertory procession and preparation of the altar.",
    },
    songs: [{ title: "Tunakuletea Bwana", youtubeId: null }],
  },
  {
    slug: "komunio",
    name: { sw: "Nyimbo za Komunio", en: "Communion Songs" },
    description: {
      sw: "Nyimbo za wakati wa kupokea Ekaristi Takatifu.",
      en: "Songs sung during the reception of Holy Communion.",
    },
    songs: [
      { title: "Karibu Yesu Karibu", youtubeId: null },
      { title: "Mkate wa Uzima", youtubeId: null },
    ],
  },
  {
    slug: "christmas",
    name: { sw: "Nyimbo za Christmass", en: "Christmas Songs" },
    description: {
      sw: "Nyimbo za sikukuu ya kuzaliwa kwa Bwana wetu Yesu Kristo.",
      en: "Songs for the celebration of the birth of our Lord Jesus Christ.",
    },
    songs: [{ title: "Leo Kristo Amezaliwa", youtubeId: null }],
  },
  {
    slug: "pasaka",
    name: { sw: "Nyimbo za Pasaka", en: "Easter Songs" },
    description: {
      sw: "Nyimbo za furaha ya ufufuko wa Bwana wetu Yesu Kristo.",
      en: "Joyful songs celebrating the resurrection of our Lord Jesus Christ.",
    },
    songs: [{ title: "Kristo Amefufuka", youtubeId: null }],
  },
  {
    slug: "kwaresma",
    name: { sw: "Nyimbo za Kwaresma", en: "Lenten Songs" },
    description: {
      sw: "Nyimbo za toba na maandalizi wakati wa Kwaresima.",
      en: "Songs of repentance and preparation during the season of Lent.",
    },
    songs: [{ title: "Ee Bwana Uturehemu", youtubeId: null }],
  },
  {
    slug: "majilio",
    name: { sw: "Nyimbo za Majilio", en: "Advent Songs" },
    description: {
      sw: "Nyimbo za matarajio wakati wa Majilio, kuandaa njia ya Bwana.",
      en: "Songs of hopeful expectation during Advent, preparing the way of the Lord.",
    },
    songs: [{ title: "Njoo Bwana Yesu", youtubeId: null }],
  },
  {
    slug: "bikira-maria",
    name: { sw: "Nyimbo za Bikira Maria", en: "Marian Songs" },
    description: {
      sw: "Nyimbo za heshima kwa Bikira Maria, Mama wa Mungu.",
      en: "Songs honoring the Virgin Mary, Mother of God.",
    },
    songs: [{ title: "Salamu Maria", youtubeId: null }],
  },
  {
    slug: "nyinginezo",
    name: { sw: "Nyimbo Nyinginezo", en: "Other Songs" },
    description: {
      sw: "Nyimbo nyingine za ibada na matukio maalum ya kwaya.",
      en: "Other worship songs and songs for special choir occasions.",
    },
    songs: [{ title: "Asante Bwana", youtubeId: null }],
  },
];

export function getSongCategory(slug: string) {
  return songCategories.find((c) => c.slug === slug);
}
