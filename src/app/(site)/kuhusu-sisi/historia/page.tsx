"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ui } from "@/i18n/ui";
import { history as historyFallback } from "@/data/about";
import { useSiteData } from "@/site/SiteDataProvider";
import { useSingleton } from "@/lib/useResource";
import { adaptAboutPage, aboutPageResource } from "@/lib/resources";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";

export default function HistoryPage() {
  const { lang } = useLanguage();
  const { site } = useSiteData();
  const { data: about } = useSingleton(aboutPageResource.key, adaptAboutPage, {
    intro: { sw: "", en: "" },
    history: historyFallback,
    vision: { sw: "", en: "" },
    mission: { sw: "", en: "" },
  });
  const { history } = about;
  return (
    <div>
      <PageHero eyebrow={ui.navAbout[lang]} title={ui.navHistory[lang]} />
      <Section containerClassName="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <Prose text={history[lang]} className="text-lg" />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-content/10 shadow-sm">
            <Image
              src={site.choirPhoto}
              alt={site.name[lang]}
              width={600}
              height={700}
              className="h-auto w-full object-cover"
            />
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
