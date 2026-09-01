"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ui } from "@/i18n/ui";
import { useList } from "@/lib/useResource";
import { adaptNews, newsResource } from "@/lib/resources";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

export default function NewsPage() {
  const { lang } = useLanguage();
  const { data: news } = useList(newsResource.key, adaptNews);
  const sorted = [...news].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div>
      <PageHero eyebrow={ui.navHome[lang]} title={ui.navNews[lang]} />
      <Section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.05}>
              <Link href={`/habari-na-matukio/${item.slug}`}>
                <Card className="flex h-full flex-col">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-orange-dark">
                    {new Date(item.date).toLocaleDateString(lang === "sw" ? "sw-TZ" : "en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="mt-2 font-serif-display text-lg font-semibold text-content">
                    {item.title[lang]}
                  </p>
                  <p className="mt-2 flex-1 text-sm text-content-soft/70">{item.excerpt[lang]}</p>
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
