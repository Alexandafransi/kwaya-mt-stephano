"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { ui } from "@/i18n/ui";
import { useList } from "@/lib/useResource";
import { adaptCalendarEvent, calendarResource } from "@/lib/resources";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { EventCalendar } from "@/components/calendar/EventCalendar";

export default function CalendarPage() {
  const { lang } = useLanguage();
  const { data: calendarEvents } = useList(calendarResource.key, adaptCalendarEvent);
  const calendarYear = calendarEvents[0]?.year ?? new Date().getFullYear();
  return (
    <div>
      <PageHero
        eyebrow={ui.navAbout[lang]}
        title={`${ui.navCalendar[lang]} ${calendarYear}`}
        subtitle={
          lang === "sw"
            ? "Fuatilia matukio muhimu ya kwaya kwa mwaka mzima."
            : "Follow the choir's key events throughout the year."
        }
      />
      <Section>
        <Reveal>
          <EventCalendar />
        </Reveal>
      </Section>
    </div>
  );
}
