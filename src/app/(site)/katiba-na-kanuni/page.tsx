"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { ui } from "@/i18n/ui";
import { useList } from "@/lib/useResource";
import { adaptConstitutionArticle, constitutionResource } from "@/lib/resources";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";

export default function ConstitutionPage() {
  const { lang } = useLanguage();
  const { data: constitutionArticles } = useList(constitutionResource.key, adaptConstitutionArticle);
  return (
    <div>
      <PageHero
        eyebrow={lang === "sw" ? "Kanuni" : "Governance"}
        title={ui.navConstitution[lang]}
        subtitle={
          lang === "sw"
            ? "Msingi wa kisheria unaoongoza uendeshaji na maadili ya kwaya."
            : "The legal foundation guiding the choir's governance and conduct."
        }
      />
      <Section containerClassName="max-w-3xl">
        <div className="space-y-5">
          {constitutionArticles.map((article, i) => (
            <Reveal key={article.heading.en} delay={i * 0.05}>
              <Card>
                <h2 className="font-serif-display text-lg font-bold text-content">
                  {article.heading[lang]}
                </h2>
                <div className="mt-3">
                  <Prose text={article.body[lang]} />
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
