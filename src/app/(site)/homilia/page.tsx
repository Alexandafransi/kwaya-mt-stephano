"use client";

import Link from "next/link";
import { ArrowRight, BookOpenText } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ui } from "@/i18n/ui";
import { useList } from "@/lib/useResource";
import { adaptHomily, homiliesResource } from "@/lib/resources";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

export default function HomiliesPage() {
  const { lang } = useLanguage();
  const { data: homilies } = useList(homiliesResource.key, adaptHomily);
  const sorted = [...homilies].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div>
      <PageHero
        eyebrow={ui.navHome[lang]}
        title={ui.navHomilies[lang]}
        subtitle={
          lang === "sw"
            ? "Tafakari fupi za Neno la Mungu kwa kila Dominika."
            : "Short reflections on God's Word for each Sunday."
        }
      />
      <Section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {sorted.map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.05}>
              <Link href={`/homilia/${item.slug}`}>
                <Card className="flex h-full flex-col">
                  <div className="mb-3 flex items-center gap-2 text-brand-orange-dark">
                    <BookOpenText size={18} />
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      {item.reading[lang]}
                    </span>
                  </div>
                  <p className="font-serif-display text-lg font-semibold text-content">
                    {item.title[lang]}
                  </p>
                  <p className="mt-2 flex-1 text-sm text-content-soft/70">{item.summary[lang]}</p>
                  <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange-dark">
                    {ui.readMore[lang]} <ArrowRight size={14} />
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
