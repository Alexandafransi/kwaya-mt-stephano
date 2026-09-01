"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { ui } from "@/i18n/ui";
import { intro as introFallback } from "@/data/about";
import { useSiteData } from "@/site/SiteDataProvider";
import { useSingleton } from "@/lib/useResource";
import { adaptAboutPage, aboutPageResource } from "@/lib/resources";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";

export default function IntroPage() {
  const { lang } = useLanguage();
  const { site } = useSiteData();
  const { data: about } = useSingleton(aboutPageResource.key, adaptAboutPage, {
    intro: introFallback,
    history: { sw: "", en: "" },
    vision: { sw: "", en: "" },
    mission: { sw: "", en: "" },
  });
  const { intro } = about;
  return (
    <div>
      <PageHero eyebrow={ui.navAbout[lang]} title={ui.navIntro[lang]} />
      <Section containerClassName="max-w-3xl">
        <Reveal>
          <Prose text={intro[lang]} className="text-lg" />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-brand-orange-dark">
            {ui.founded[lang]}: {site.founded}
          </p>
        </Reveal>
      </Section>
    </div>
  );
}
