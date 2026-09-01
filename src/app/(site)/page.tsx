"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { ArrowRight, CalendarDays, Music4, Newspaper, Images } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ui } from "@/i18n/ui";
import { useSiteData } from "@/site/SiteDataProvider";
import { useList } from "@/lib/useResource";
import {
  adaptNews,
  adaptSongCategory,
  adaptCalendarEvent,
  newsResource,
  songCategoriesResource,
  calendarResource,
  groupCalendarEvents,
} from "@/lib/resources";
import { getUpcomingEvents } from "@/lib/calendar-utils";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Divider } from "@/components/ui/Divider";

export default function Home() {
  const { lang } = useLanguage();
  const { site } = useSiteData();
  const { data: news } = useList(newsResource.key, adaptNews);
  const { data: songCategories } = useList(songCategoriesResource.key, adaptSongCategory);
  const { data: calendarEvents } = useList(calendarResource.key, adaptCalendarEvent);

  const now = useMemo(() => new Date(), []);
  const calendarYear = calendarEvents[0]?.year ?? now.getFullYear();
  const calendarMonths = useMemo(() => groupCalendarEvents(calendarEvents), [calendarEvents]);
  const upcoming = useMemo(
    () => getUpcomingEvents(calendarMonths, calendarYear, 4, now),
    [calendarMonths, calendarYear, now]
  );
  const latestNews = [...news].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3);

  const quickLinks = [
    { href: "/kuhusu-sisi/utangulizi", icon: Newspaper, label: ui.navAbout[lang] },
    { href: "/nyimbo", icon: Music4, label: ui.navSongs[lang] },
    { href: "/kuhusu-sisi/kalenda", icon: CalendarDays, label: ui.navCalendar[lang] },
    { href: "/gallery", icon: Images, label: ui.navGallery[lang] },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="grain-overlay relative overflow-hidden bg-ink">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 10%, rgba(232,185,35,0.22), transparent 50%), radial-gradient(circle at 85% 90%, rgba(217,114,12,0.22), transparent 50%)",
          }}
        />
        <Container className="relative grid grid-cols-1 items-center gap-14 py-24 sm:py-28 lg:grid-cols-2 lg:py-32">
          <div className="animate-fade-in-up">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-brand-gold" />
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-gold">
                {site.parish[lang]} &middot; {site.diocese[lang]}
              </p>
            </div>
            <h1 className="font-serif-display text-5xl font-bold leading-[1.05] tracking-tight text-balance text-cream sm:text-6xl md:text-7xl">
              {site.name[lang]}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-cream/70 sm:text-xl">{site.tagline[lang]}</p>
            <p className="mt-3 text-sm tracking-wide text-cream/50">
              {ui.since[lang]} {site.founded}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/kuhusu-sisi/utangulizi">
                {ui.ourMinistry[lang]}
                <ArrowRight size={16} />
              </Button>
              <Button href="/nyimbo" variant="ghost">
                {ui.navSongs[lang]}
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md animate-fade-in-up [animation-delay:150ms]">
            <div className="absolute -inset-3 rounded-[2.5rem] border border-brand-gold/25" />
            <div className="relative overflow-hidden rounded-[2rem] border border-cream/10 shadow-2xl shadow-black/40">
              <Image
                src={site.choirPhoto}
                alt={site.name[lang]}
                width={800}
                height={900}
                className="h-auto w-full object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-brand-gold/10" />
            </div>
            <div className="absolute -bottom-7 -left-7 rounded-full border-2 border-brand-gold/50 bg-ink p-1.5 shadow-xl">
              <Image
                src={site.logo}
                alt={site.shortName}
                width={92}
                height={92}
                className="rounded-full"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Quick links */}
      <Section className="!py-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {quickLinks.map(({ href, icon: Icon, label }, i) => (
            <Reveal key={href} delay={i * 0.05}>
              <Link href={href}>
                <Card className="flex flex-col items-center gap-3 py-8 text-center hover:border-brand-orange/30">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange-dark">
                    <Icon size={22} />
                  </div>
                  <span className="text-sm font-semibold text-content">{label}</span>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Divider />

      {/* Upcoming events */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow={ui.navCalendar[lang]}
            title={ui.upcomingEvents[lang]}
            subtitle={
              lang === "sw"
                ? "Matukio kutoka kwenye kalenda rasmi ya mwaka 2026 ya kwaya."
                : "Events from the choir's official 2026 calendar."
            }
          />
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {upcoming.map((event, i) => (
            <Reveal key={`${event.monthName.en}-${event.date}-${i}`} delay={i * 0.05}>
              <Card className="h-full">
                <p className="font-serif-display text-3xl font-bold text-brand-orange-dark">
                  {event.date}
                </p>
                <p className="text-xs font-semibold uppercase tracking-wide text-content-soft/60">
                  {event.monthName[lang]}
                </p>
                <p className="mt-3 text-sm font-medium text-content">{event.title[lang]}</p>
              </Card>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href="/kuhusu-sisi/kalenda" variant="ghost" className="!text-content border-content/15 hover:!bg-content/5">
            {ui.viewAll[lang]}
            <ArrowRight size={16} />
          </Button>
        </div>
      </Section>

      {/* Latest news */}
      <Section className="bg-surface-alt/60">
        <Reveal>
          <SectionHeading eyebrow={ui.navNews[lang]} title={ui.latestNews[lang]} />
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {latestNews.map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.05}>
              <Link href={`/habari-na-matukio/${item.slug}`}>
                <Card className="h-full">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-orange-dark">
                    {new Date(item.date).toLocaleDateString(lang === "sw" ? "sw-TZ" : "en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="mt-2 font-serif-display text-lg font-semibold text-content">
                    {item.title[lang]}
                  </p>
                  <p className="mt-2 text-sm text-content-soft/70">{item.excerpt[lang]}</p>
                  <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange-dark">
                    {ui.readMore[lang]} <ArrowRight size={14} />
                  </p>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Songs teaser */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow={ui.navSongs[lang]}
            title={ui.navSongs[lang]}
            subtitle={
              lang === "sw"
                ? "Vikundi vya nyimbo za ibada, zinazopakiwa hatua kwa hatua."
                : "Categories of worship songs, being uploaded progressively."
            }
          />
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {songCategories.slice(0, 5).map((cat, i) => (
            <Reveal key={cat.slug} delay={i * 0.05}>
              <Link href={`/nyimbo/${cat.slug}`}>
                <Card className="flex h-full flex-col items-center gap-2 py-6 text-center">
                  <Music4 size={20} className="text-brand-orange-dark" />
                  <span className="text-sm font-semibold text-content">{cat.name[lang]}</span>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href="/nyimbo" variant="ghost" className="!text-content border-content/15 hover:!bg-content/5">
            {ui.viewAll[lang]}
            <ArrowRight size={16} />
          </Button>
        </div>
      </Section>

      {/* Contact strip */}
      <section className="grain-overlay bg-ink py-20">
        <Container className="flex flex-col items-center gap-6 text-center">
          <Divider className="mb-2" />
          <p className="font-serif-display text-3xl font-bold text-cream sm:text-4xl">
            {ui.contactUs[lang]}
          </p>
          <p className="max-w-xl text-cream/60">
            {lang === "sw"
              ? "Una swali, unataka kujiunga nasi, au unapenda kuwasiliana na kwaya? Tupo tayari kukusikiliza."
              : "Have a question, want to join us, or wish to reach out to the choir? We're ready to hear from you."}
          </p>
          <Button href="/mawasiliano">
            {ui.navContact[lang]}
            <ArrowRight size={16} />
          </Button>
        </Container>
      </section>
    </div>
  );
}
