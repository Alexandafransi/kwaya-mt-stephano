"use client";

import Link from "next/link";
import { ArrowRight, Users2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ui } from "@/i18n/ui";
import { useList } from "@/lib/useResource";
import { adaptCommittee, committeesResource } from "@/lib/resources";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

export default function LeadershipOverviewPage() {
  const { lang } = useLanguage();
  const { data: committees } = useList(committeesResource.key, adaptCommittee);
  return (
    <div>
      <PageHero eyebrow={ui.navAbout[lang]} title={ui.navLeadership[lang]} />
      <Section>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {committees.map((committee, i) => (
            <Reveal key={committee.slug} delay={i * 0.05}>
              <Link href={`/kuhusu-sisi/uongozi/${committee.slug}`}>
                <Card className="flex h-full flex-col">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange-dark">
                    <Users2 size={20} />
                  </div>
                  <h2 className="font-serif-display text-lg font-bold text-content">
                    {committee.name[lang]}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-content-soft/70">
                    {committee.description[lang]}
                  </p>
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
