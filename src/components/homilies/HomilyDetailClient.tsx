"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ui } from "@/i18n/ui";
import type { Homily } from "@/data/homilies";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";

export function HomilyDetailClient({ homily }: { homily: Homily }) {
  const { lang } = useLanguage();
  return (
    <div>
      <PageHero eyebrow={homily.reading[lang]} title={homily.title[lang]} />
      <Section containerClassName="max-w-3xl">
        <Link
          href="/homilia"
          className="mb-8 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange-dark"
        >
          <ArrowLeft size={14} /> {ui.backTo[lang]}
        </Link>
        <Reveal>
          <Prose text={homily.summary[lang]} className="text-lg" />
        </Reveal>
      </Section>
    </div>
  );
}
