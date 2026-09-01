"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag, Piano } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ui } from "@/i18n/ui";
import { kinandaProject as kinandaFallback } from "@/data/projects";
import { useSingleton } from "@/lib/useResource";
import { adaptKinandaProject, kinandaProjectResource } from "@/lib/resources";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

export default function ProjectsOverviewPage() {
  const { lang } = useLanguage();
  const { data: kinandaProject } = useSingleton(kinandaProjectResource.key, adaptKinandaProject, kinandaFallback);
  const items = [
    {
      href: "/miradi/duka",
      icon: ShoppingBag,
      title: ui.navShop[lang],
      description:
        lang === "sw"
          ? "Bidhaa rasmi za kwaya zinazouzwa kusaidia shughuli za huduma."
          : "Official choir merchandise sold to support ministry activities.",
    },
    {
      href: "/miradi/kinanda",
      icon: Piano,
      title: ui.navInstrument[lang],
      description: kinandaProject.description[lang],
    },
  ];

  return (
    <div>
      <PageHero
        eyebrow={ui.navProjects[lang]}
        title={ui.navProjects[lang]}
        subtitle={
          lang === "sw"
            ? "Miradi ya maendeleo inayoendeshwa na kwaya kuimarisha huduma yake."
            : "Development projects run by the choir to strengthen its ministry."
        }
      />
      <Section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map(({ href, icon: Icon, title, description }, i) => (
            <Reveal key={href} delay={i * 0.05}>
              <Link href={href}>
                <Card className="flex h-full flex-col">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange-dark">
                    <Icon size={22} />
                  </div>
                  <h2 className="font-serif-display text-xl font-bold text-content">{title}</h2>
                  <p className="mt-2 flex-1 text-sm text-content-soft/70">{description}</p>
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
