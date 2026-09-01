"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, List } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ui } from "@/i18n/ui";
import { useList } from "@/lib/useResource";
import { adaptCalendarEvent, calendarResource, groupCalendarEvents } from "@/lib/resources";

const WEEKDAYS_SW = ["J2", "J3", "J4", "J5", "Ij", "J1", "Jm"];
const WEEKDAYS_EN = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function mondayIndex(jsWeekday: number) {
  // JS: 0=Sun..6=Sat -> convert to 0=Mon..6=Sun
  return (jsWeekday + 6) % 7;
}

export function EventCalendar() {
  const { lang } = useLanguage();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [monthIndex, setMonthIndex] = useState(0);

  const { data: calendarEvents } = useList(calendarResource.key, adaptCalendarEvent);
  const calendarYear = calendarEvents[0]?.year ?? new Date().getFullYear();
  const calendar2026 = useMemo(() => groupCalendarEvents(calendarEvents), [calendarEvents]);
  const month = calendar2026[monthIndex];

  const gridCells = useMemo(() => {
    const firstWeekday = mondayIndex(new Date(calendarYear, monthIndex, 1).getDay());
    const daysInMonth = new Date(calendarYear, monthIndex + 1, 0).getDate();
    const eventDates = new Set(
      month.events.filter((e) => e.date !== null).map((e) => e.date as number)
    );
    const cells: { day: number | null; hasEvent: boolean }[] = [];
    for (let i = 0; i < firstWeekday; i++) cells.push({ day: null, hasEvent: false });
    for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, hasEvent: eventDates.has(d) });
    return cells;
  }, [monthIndex, month]);

  const weekdays = lang === "sw" ? WEEKDAYS_SW : WEEKDAYS_EN;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {calendar2026.map((m, i) => (
            <button
              key={m.month}
              onClick={() => setMonthIndex(i)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                i === monthIndex && view === "grid"
                  ? "bg-brand-orange text-white"
                  : "bg-card text-content-soft/70 hover:bg-surface-alt"
              }`}
            >
              {m.monthName[lang].slice(0, 3)}
            </button>
          ))}
        </div>
        <div className="flex items-center rounded-full border border-content/10 bg-card p-1">
          <button
            onClick={() => setView("grid")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              view === "grid" ? "bg-ink text-cream" : "text-content-soft/60"
            }`}
          >
            <CalendarDays size={14} /> {ui.monthView[lang]}
          </button>
          <button
            onClick={() => setView("list")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              view === "list" ? "bg-ink text-cream" : "text-content-soft/60"
            }`}
          >
            <List size={14} /> {ui.listView[lang]}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-content/10 bg-card p-5 shadow-sm"
          >
            <h3 className="mb-4 font-serif-display text-xl font-bold text-content">
              {month.monthName[lang]} {calendarYear}
            </h3>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-content-soft/50">
              {weekdays.map((w) => (
                <div key={w} className="py-1">
                  {w}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {gridCells.map((cell, i) => (
                <div
                  key={i}
                  className={`flex aspect-square items-center justify-center rounded-lg text-sm ${
                    cell.day === null
                      ? ""
                      : cell.hasEvent
                        ? "bg-brand-orange font-bold text-white"
                        : "bg-surface-alt/60 text-content-soft/70"
                  }`}
                >
                  {cell.day}
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-2 border-t border-content/10 pt-4">
              {month.events.length === 0 && (
                <p className="text-sm text-content-soft/50">{ui.comingSoon[lang]}</p>
              )}
              {month.events.map((event, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-xs font-bold text-brand-orange-dark">
                    {event.date ?? "•"}
                  </span>
                  <span className="text-content-soft/80">{event.title[lang]}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {calendar2026.map((m) => (
              <div key={m.month} className="rounded-2xl border border-content/10 bg-card p-5 shadow-sm">
                <h3 className="mb-3 font-serif-display text-lg font-bold text-content">
                  {m.monthName[lang]}
                </h3>
                <div className="space-y-2">
                  {m.events.map((event, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-xs font-bold text-brand-orange-dark">
                        {event.date ?? "•"}
                      </span>
                      <span className="text-content-soft/80">{event.title[lang]}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
