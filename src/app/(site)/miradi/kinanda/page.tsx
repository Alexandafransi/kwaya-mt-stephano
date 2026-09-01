"use client";

import { Piano } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ui } from "@/i18n/ui";
import { kinandaProject as kinandaFallback } from "@/data/projects";
import { useSiteData } from "@/site/SiteDataProvider";
import { useSingleton } from "@/lib/useResource";
import { adaptKinandaProject, kinandaProjectResource } from "@/lib/resources";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { parseAmount } from "@/lib/format";

export default function KinandaPage() {
  const { lang } = useLanguage();
  const { site } = useSiteData();
  const { data: kinandaProject } = useSingleton(kinandaProjectResource.key, adaptKinandaProject, kinandaFallback);
  const raised = parseAmount(kinandaProject.raisedAmount);
  const goal = parseAmount(kinandaProject.goalAmount);
  const percent = Math.min(100, Math.round((raised / goal) * 100));

  return (
    <div>
      <PageHero eyebrow={ui.navProjects[lang]} title={kinandaProject.title[lang]} />
      <Section containerClassName="max-w-3xl">
        <Reveal>
          <Card>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange-dark">
              <Piano size={22} />
            </div>
            <Prose text={kinandaProject.description[lang]} className="text-base" />

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm font-semibold text-content">
                <span>{kinandaProject.raisedAmount}</span>
                <span className="text-content-soft/50">{kinandaProject.goalAmount}</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-surface-alt">
                <div
                  className="h-full rounded-full bg-brand-orange"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-content-soft/50">
                {percent}% {lang === "sw" ? "imekamilika" : "funded"}
              </p>
            </div>

            <div className="mt-6">
              <Button href={site.social.whatsapp}>
                {lang === "sw" ? "Changia Mradi" : "Support the Project"}
              </Button>
            </div>
          </Card>
        </Reveal>
      </Section>
    </div>
  );
}
