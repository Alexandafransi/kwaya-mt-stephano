"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ui } from "@/i18n/ui";
import type { Committee } from "@/data/leadership";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Reveal } from "@/components/ui/Reveal";

export function CommitteeDetailClient({ committee }: { committee: Committee }) {
  const { lang } = useLanguage();
  return (
    <div>
      <PageHero
        eyebrow={ui.navLeadership[lang]}
        title={committee.name[lang]}
        subtitle={committee.description[lang]}
      />
      <Section>
        <Link
          href="/kuhusu-sisi/uongozi"
          className="mb-8 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange-dark"
        >
          <ArrowLeft size={14} /> {ui.backTo[lang]}
        </Link>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {committee.members.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.05}>
              <Card className="flex items-center gap-4">
                <Avatar name={member.name} className="h-14 w-14 shrink-0 text-lg" />
                <div>
                  <p className="font-semibold text-content">{member.name}</p>
                  <p className="text-sm text-content-soft/60">{member.role[lang]}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
