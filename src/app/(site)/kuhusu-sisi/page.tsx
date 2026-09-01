"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Compass, History, Landmark, Users, CalendarDays } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ui } from "@/i18n/ui";
import { intro as introFallback } from "@/data/about";
import { useSiteData } from "@/site/SiteDataProvider";
import { useSingleton } from "@/lib/useResource";
import { adaptAboutPage, aboutPageResource } from "@/lib/resources";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

export default function AboutOverviewPage() {
  const { lang } = useLanguage();
  const { site } = useSiteData();
  const { data: about } = useSingleton(aboutPageResource.key, adaptAboutPage, {
    intro: introFallback,
    history: { sw: "", en: "" },
    vision: { sw: "", en: "" },
    mission: { sw: "", en: "" },
  });
  const { intro } = about;

  const links = [
    { href: "/kuhusu-sisi/utangulizi", label: ui.navIntro[lang], icon: BookOpen },
    { href: "/kuhusu-sisi/historia", label: ui.navHistory[lang], icon: History },
    { href: "/kuhusu-sisi/dira-na-dhamira", label: ui.navVisionMission[lang], icon: Compass },
    { href: "/kuhusu-sisi/kalenda", label: ui.navCalendar[lang], icon: CalendarDays },
    { href: "/kuhusu-sisi/uongozi", label: ui.navLeadership[lang], icon: Landmark },
    { href: "/kuhusu-sisi/wanakwaya", label: ui.navMembers[lang], icon: Users },
  ];

  return (
    <div>
      <PageHero
        eyebrow={site.parish[lang]}
        title={ui.navAbout[lang]}
        subtitle={intro[lang]}
      />
      <Section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map(({ href, label, icon: Icon }, i) => (
            <Reveal key={href} delay={i * 0.05}>
              <Link href={href}>
                <Card className="flex h-full items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange-dark">
                    <Icon size={20} />
                  </div>
                  <div className="flex flex-1 items-center justify-between">
                    <span className="font-semibold text-content">{label}</span>
                    <ArrowRight size={16} className="text-content-soft/40" />
                  </div>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
