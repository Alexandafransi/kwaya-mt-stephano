"use client";

import { Compass, Target } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ui } from "@/i18n/ui";
import { vision as visionFallback, mission as missionFallback } from "@/data/about";
import { useSingleton } from "@/lib/useResource";
import { adaptAboutPage, aboutPageResource } from "@/lib/resources";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";

export default function VisionMissionPage() {
  const { lang } = useLanguage();
  const { data: about } = useSingleton(aboutPageResource.key, adaptAboutPage, {
    intro: { sw: "", en: "" },
    history: { sw: "", en: "" },
    vision: visionFallback,
    mission: missionFallback,
  });
  const { vision, mission } = about;
  return (
    <div>
      <PageHero eyebrow={ui.navAbout[lang]} title={ui.navVisionMission[lang]} />
      <Section containerClassName="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Reveal>
          <Card className="h-full">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange-dark">
              <Compass size={22} />
            </div>
            <h2 className="font-serif-display text-xl font-bold text-content">
              {lang === "sw" ? "Dira" : "Vision"}
            </h2>
            <div className="mt-3">
              <Prose text={vision[lang]} />
            </div>
          </Card>
        </Reveal>
        <Reveal delay={0.1}>
          <Card className="h-full">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold/15 text-brand-orange-dark">
              <Target size={22} />
            </div>
            <h2 className="font-serif-display text-xl font-bold text-content">
              {lang === "sw" ? "Dhamira" : "Mission"}
            </h2>
            <div className="mt-3">
              <Prose text={mission[lang]} />
            </div>
          </Card>
        </Reveal>
      </Section>
    </div>
  );
}
