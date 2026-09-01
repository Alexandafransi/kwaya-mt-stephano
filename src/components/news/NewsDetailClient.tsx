"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ui } from "@/i18n/ui";
import type { NewsItem } from "@/data/news";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";

export function NewsDetailClient({ item }: { item: NewsItem }) {
  const { lang } = useLanguage();
  return (
    <div>
      <PageHero
        eyebrow={new Date(item.date).toLocaleDateString(lang === "sw" ? "sw-TZ" : "en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        title={item.title[lang]}
      />
      <Section containerClassName="max-w-3xl">
        <Link
          href="/habari-na-matukio"
          className="mb-8 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange-dark"
        >
          <ArrowLeft size={14} /> {ui.backTo[lang]}
        </Link>
        <Reveal>
          <Prose text={item.body[lang]} className="text-lg" />
        </Reveal>
      </Section>
    </div>
  );
}
