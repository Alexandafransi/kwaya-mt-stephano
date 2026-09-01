"use client";

import { Download, FileText } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ui } from "@/i18n/ui";
import { useSiteData } from "@/site/SiteDataProvider";
import { voicePartLabel, type VoicePart } from "@/data/members";
import { useList } from "@/lib/useResource";
import { adaptMember, membersResource } from "@/lib/resources";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Reveal } from "@/components/ui/Reveal";

const VOICE_ORDER: VoicePart[] = ["soprano", "alto", "tenor", "bass"];

export default function MembersPage() {
  const { lang } = useLanguage();
  const { site } = useSiteData();
  const { data: members } = useList(membersResource.key, adaptMember);

  return (
    <div>
      <PageHero
        eyebrow={ui.navAbout[lang]}
        title={ui.navMembers[lang]}
        subtitle={
          lang === "sw"
            ? `Kwaya ina zaidi ya wanakwaya ${members.length} wanaotumikia kwa moyo katika sauti nne.`
            : `The choir has more than ${members.length} members serving faithfully across four voice parts.`
        }
      />
      <Section className="!pb-0 !pt-14">
        <Reveal>
          <Card className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange-dark">
              <FileText size={22} />
            </div>
            <div className="flex-1">
              <h2 className="font-serif-display text-lg font-bold text-content">
                {ui.registrationForm[lang]}
              </h2>
              <p className="mt-1 text-sm text-content-soft/70">{ui.registrationFormDesc[lang]}</p>
            </div>
            <div className="flex w-full shrink-0 gap-3 sm:w-auto">
              <a
                href={site.registrationFormPdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-content/15 px-5 py-2.5 text-sm font-semibold text-content transition hover:border-brand-orange hover:text-brand-orange-dark sm:flex-none"
              >
                <FileText size={15} />
                {ui.viewForm[lang]}
              </a>
              <a
                href={site.registrationFormPdf}
                download
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-orange-dark sm:flex-none"
              >
                <Download size={15} />
                {ui.downloadForm[lang]}
              </a>
            </div>
          </Card>
        </Reveal>
      </Section>
      {VOICE_ORDER.map((part) => {
        const group = members.filter((m) => m.voicePart === part);
        if (group.length === 0) return null;
        return (
          <Section key={part} className="!pb-0 !pt-10 first:!pt-14">
            <Reveal>
              <SectionHeading title={voicePartLabel[part][lang]} />
            </Reveal>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {group.map((member, i) => (
                <Reveal key={member.name} delay={i * 0.04}>
                  <Card className="flex flex-col items-center gap-3 text-center">
                    <Avatar name={member.name} className="h-16 w-16 text-lg" />
                    <div>
                      <p className="text-sm font-semibold text-content">{member.name}</p>
                      <p className="text-xs text-content-soft/50">
                        {ui.since[lang]} {member.joined}
                      </p>
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>
          </Section>
        );
      })}
      <div className="h-14" />
    </div>
  );
}
