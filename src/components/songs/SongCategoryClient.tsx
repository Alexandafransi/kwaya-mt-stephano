"use client";

import Link from "next/link";
import { ArrowLeft, Download, Music2, PlayCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ui } from "@/i18n/ui";
import { mediaUrl } from "@/lib/api";
import type { SongCategory } from "@/data/songs";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

export function SongCategoryClient({ category }: { category: SongCategory }) {
  const { lang } = useLanguage();
  return (
    <div>
      <PageHero
        eyebrow={ui.navSongs[lang]}
        title={category.name[lang]}
        subtitle={category.description[lang]}
      />
      <Section>
        <Link
          href="/nyimbo"
          className="mb-8 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange-dark"
        >
          <ArrowLeft size={14} /> {ui.backTo[lang]}
        </Link>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {category.songs.map((song, i) => {
            const audioUrl = mediaUrl(song.audioFile ?? null);
            return (
              <Reveal key={song.title} delay={i * 0.05}>
                <Card className="!p-0 overflow-hidden">
                  {song.youtubeId ? (
                    <div className="aspect-video w-full">
                      <iframe
                        className="h-full w-full"
                        src={`https://www.youtube.com/embed/${song.youtubeId}`}
                        title={song.title}
                        allowFullScreen
                      />
                    </div>
                  ) : audioUrl ? (
                    <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 bg-ink p-6 text-cream">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">
                        <Music2 size={26} />
                      </div>
                      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                      <audio controls preload="none" src={audioUrl} className="w-full max-w-xs">
                        Your browser does not support audio playback.
                      </audio>
                    </div>
                  ) : (
                    <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 bg-ink text-cream/60">
                      <PlayCircle size={32} className="text-brand-gold/70" />
                      <span className="text-xs font-semibold uppercase tracking-wide">
                        {ui.comingSoon[lang]}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 p-5">
                    <Music2 size={16} className="shrink-0 text-brand-orange-dark" />
                    <p className="flex-1 font-semibold text-content">{song.title}</p>
                    {audioUrl && (
                      <a
                        href={audioUrl}
                        download
                        className="flex shrink-0 items-center gap-1.5 rounded-full border border-content/15 px-3 py-1.5 text-xs font-semibold text-content-soft transition hover:border-brand-orange/40 hover:text-brand-orange-dark"
                      >
                        <Download size={13} />
                        {ui.downloadSong[lang]}
                      </a>
                    )}
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
