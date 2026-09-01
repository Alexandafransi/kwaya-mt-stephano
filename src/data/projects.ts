import type { Bilingual } from "@/i18n/types";

export type ShopItem = {
  name: Bilingual;
  price: string;
  description: Bilingual;
};

// Placeholder catalogue — informational only, no checkout/backend.
export const shopItems: ShopItem[] = [
  {
    name: { sw: "T-Shirt ya Kwaya", en: "Choir T-Shirt" },
    price: "TZS 20,000",
    description: {
      sw: "T-Shirt yenye nembo ya Kwaya ya Mt. Stefano Shahidi, ipatikane kwa saizi mbalimbali.",
      en: "T-Shirt featuring the St. Stefano Shahidi Choir emblem, available in various sizes.",
    },
  },
  {
    name: { sw: "CD ya Nyimbo za Kwaya", en: "Choir Songs CD" },
    price: "TZS 10,000",
    description: {
      sw: "Mkusanyiko wa nyimbo teule zilizorekodiwa na kwaya.",
      en: "A collection of selected songs recorded by the choir.",
    },
  },
  {
    name: { sw: "Kalenda ya Kwaya 2026", en: "2026 Choir Calendar" },
    price: "TZS 5,000",
    description: {
      sw: "Kalenda rasmi ya matukio ya kwaya kwa mwaka 2026.",
      en: "The official 2026 choir events calendar.",
    },
  },
];

export const kinandaProject = {
  title: { sw: "Mradi wa Kinanda", en: "Instrument (Kinanda) Fund" } satisfies Bilingual,
  goalAmount: "TZS 8,000,000",
  raisedAmount: "TZS 3,200,000",
  description: {
    sw: "Kwaya inaendesha mradi wa kuchangisha fedha kwa ajili ya kununua kinanda (keyboard) kipya ili kuboresha huduma ya muziki Kanisani.",
    en: "The choir is running a fundraising project to purchase a new keyboard (kinanda) to strengthen its music ministry at church.",
  },
};
