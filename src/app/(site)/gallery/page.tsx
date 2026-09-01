"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { ui } from "@/i18n/ui";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export default function GalleryPage() {
  const { lang } = useLanguage();
  return (
    <div>
      <PageHero
        eyebrow={ui.navHome[lang]}
        title={ui.navGallery[lang]}
        subtitle={
          lang === "sw"
            ? "Kumbukumbu za picha kutoka kwenye huduma na matukio ya kwaya."
            : "Photo memories from the choir's ministry and events."
        }
      />
      <Section>
        <GalleryGrid />
      </Section>
    </div>
  );
}
