import type { CalendarMonth } from "./resources";

export type CalendarEvent = { date: number | null; title: { sw: string; en: string } };

export type FlatEvent = CalendarEvent & {
  monthIndex: number;
  monthName: { sw: string; en: string };
  jsDate: Date;
};

export function flattenDatedEvents(months: CalendarMonth[], year: number): FlatEvent[] {
  const flat: FlatEvent[] = [];
  for (const month of months) {
    for (const event of month.events) {
      if (event.date === null) continue;
      flat.push({
        ...event,
        monthIndex: month.monthIndex,
        monthName: month.monthName,
        jsDate: new Date(year, month.monthIndex, event.date),
      });
    }
  }
  return flat.sort((a, b) => a.jsDate.getTime() - b.jsDate.getTime());
}

export function getUpcomingEvents(months: CalendarMonth[], year: number, limit: number, from: Date): FlatEvent[] {
  const flat = flattenDatedEvents(months, year);
  const upcoming = flat.filter((event) => event.jsDate >= from);
  if (upcoming.length >= limit) return upcoming.slice(0, limit);
  return [...upcoming, ...flat.slice(0, limit - upcoming.length)];
}
