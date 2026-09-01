"use client";

import Link from "next/link";
import { Music4, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ui } from "@/i18n/ui";
import { useList } from "@/lib/useResource";
import { adaptSongCategory, songCategoriesResource } from "@/lib/resources";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

export default function SongsHubPage() {
  const { lang } = useLanguage();
  const { data: songCategories } = useList(songCategoriesResource.key, adaptSongCategory);
  return (
    <div>
      <PageHero
        eyebrow={ui.navHome[lang]}
        title={ui.navSongs[lang]}
        subtitle={
          lang === "sw"
            ? "Nyimbo za ibada zimepangwa kwa makundi, zikipakiwa hatua kwa hatua kupitia YouTube."
            : "Worship songs organized by category, uploaded progressively via YouTube."
        }
      />
      <Section>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {songCategories.map((cat, i) => (
            <Reveal key={cat.slug} delay={i * 0.04}>
              <Link href={`/nyimbo/${cat.slug}`}>
                <Card className="flex h-full flex-col">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange-dark">
                    <Music4 size={20} />
                  </div>
                  <h2 className="font-serif-display text-lg font-bold text-content">
                    {cat.name[lang]}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-content-soft/70">{cat.description[lang]}</p>
                  <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange-dark">
                    {cat.songs.length} {ui.navSongs[lang]} <ArrowRight size={14} />
                  </p>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
