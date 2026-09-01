"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ui } from "@/i18n/ui";
import { useSiteData } from "@/site/SiteDataProvider";
import { useList } from "@/lib/useResource";
import { adaptAlbum, albumsResource } from "@/lib/resources";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

export default function AlbumPage() {
  const { lang } = useLanguage();
  const { site } = useSiteData();
  const { data: albums } = useList(albumsResource.key, adaptAlbum);
  return (
    <div>
      <PageHero
        eyebrow={ui.navAlbum[lang]}
        title={ui.navAlbum[lang]}
        subtitle={
          lang === "sw"
            ? "Mkusanyiko wa kumbukumbu za picha na video za matukio ya kwaya."
            : "A collection of photo and video memories from the choir's events."
        }
      />
      <Section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {albums.map((album, i) => (
            <Reveal key={album.slug} delay={i * 0.05}>
              <Card className="overflow-hidden !p-0">
                <div className="relative h-52 w-full">
                  <Image
                    src={album.images[0]?.src || site.choirPhoto}
                    alt={album.title[lang]}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                  <p className="absolute bottom-4 left-5 font-serif-display text-xl font-bold text-cream">
                    {album.title[lang]}
                  </p>
                </div>
                <div className="p-6">
                  <p className="text-sm text-content-soft/70">{album.description[lang]}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
