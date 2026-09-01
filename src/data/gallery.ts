import type { Bilingual } from "@/i18n/types";

export type GalleryImage = {
  src: string;
  caption: Bilingual;
};

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/choir-photo.jpg",
    caption: { sw: "Wanakwaya baada ya Ibada", en: "Choir members after Mass" },
  },
  {
    src: "/images/logo.jpg",
    caption: { sw: "Nembo ya Kwaya", en: "Choir Emblem" },
  },
];

// Number of "more photos coming soon" placeholder tiles to render after the real images.
export const morePhotosPlaceholderCount = 6;

export const albums = [
  {
    slug: "matukio-2025",
    title: { sw: "Matukio ya Mwaka 2025", en: "2025 Highlights" },
    description: {
      sw: "Mkusanyiko wa picha na kumbukumbu za matukio muhimu ya kwaya mwaka 2025.",
      en: "A collection of photos and memories from the choir's key events in 2025.",
    } satisfies Bilingual,
  },
  {
    slug: "stefano-day",
    title: { sw: "Stefano Day", en: "Stefano Day" },
    description: {
      sw: "Kumbukumbu za sherehe ya kila mwaka ya Stefano Day, tarehe 26 Desemba.",
      en: "Memories from the annual Stefano Day celebration held every December 26th.",
    } satisfies Bilingual,
  },
];
