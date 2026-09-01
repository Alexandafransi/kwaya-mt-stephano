import type { Bilingual } from "@/i18n/types";

export type CalendarEvent = {
  date: number | null;
  title: Bilingual;
};

export type CalendarMonth = {
  month: string;
  monthName: Bilingual;
  monthIndex: number; // 0-based, JS Date convention
  events: CalendarEvent[];
};

// Transcribed from "KALENDA YA MATUKIO - 2026.pdf"
export const calendar2026: CalendarMonth[] = [
  {
    month: "January",
    monthName: { sw: "Januari", en: "January" },
    monthIndex: 0,
    events: [
      { date: 11, title: { sw: "Uapisho wa Viongozi Wapya", en: "Swearing-in of New Leaders" } },
      {
        date: 18,
        title: {
          sw: "Makabidhiano Viongozi Wapya na Walimaliza Muda",
          en: "Handover Between New and Outgoing Leaders",
        },
      },
    ],
  },
  {
    month: "February",
    monthName: { sw: "Februari", en: "February" },
    monthIndex: 1,
    events: [
      { date: 1, title: { sw: "Semina ya Uimbaji", en: "Singing Seminar" } },
      { date: 15, title: { sw: "Kikao cha Halmashauri Kuu", en: "Main Council Meeting" } },
      { date: 22, title: { sw: "Mkutano Mkuu wa Kwaya", en: "Choir General Meeting" } },
    ],
  },
  {
    month: "March",
    monthName: { sw: "Machi", en: "March" },
    monthIndex: 2,
    events: [
      { date: null, title: { sw: "Recording 1", en: "Recording 1" } },
      { date: 21, title: { sw: "Semina ya Kiroho na Mafungo 1", en: "Spiritual Seminar & Retreat 1" } },
    ],
  },
  {
    month: "April",
    monthName: { sw: "Aprili", en: "April" },
    monthIndex: 3,
    events: [{ date: 26, title: { sw: "Mtoko wa Furaha", en: "Joy Excursion" } }],
  },
  {
    month: "May",
    monthName: { sw: "Mei", en: "May" },
    monthIndex: 4,
    events: [
      {
        date: null,
        title: { sw: "Ziara ya Uimbaji (Ndani ya Jimbo)", en: "Singing Tour (Within the Diocese)" },
      },
    ],
  },
  {
    month: "June",
    monthName: { sw: "Juni", en: "June" },
    monthIndex: 5,
    events: [
      { date: 7, title: { sw: "Fundraising", en: "Fundraising" } },
      { date: 21, title: { sw: "Kikao cha Halmashauri Kuu ya Kwaya", en: "Choir Main Council Meeting" } },
      { date: 28, title: { sw: "Mkutano Mkuu wa Kwaya", en: "Choir General Meeting" } },
    ],
  },
  {
    month: "July",
    monthName: { sw: "Julai", en: "July" },
    monthIndex: 6,
    events: [
      {
        date: null,
        title: { sw: "Ziara ya Uimbaji (Nje ya Jimbo)", en: "Singing Tour (Outside the Diocese)" },
      },
      { date: null, title: { sw: "Recording 2", en: "Recording 2" } },
    ],
  },
  {
    month: "August",
    monthName: { sw: "Agosti", en: "August" },
    monthIndex: 7,
    events: [{ date: 8, title: { sw: "Hija na Matendo ya Upendo", en: "Pilgrimage & Acts of Charity" } }],
  },
  {
    month: "September",
    monthName: { sw: "Septemba", en: "September" },
    monthIndex: 8,
    events: [
      {
        date: null,
        title: { sw: "Ziara ya Uimbaji (Ndani ya Jimbo)", en: "Singing Tour (Within the Diocese)" },
      },
    ],
  },
  {
    month: "October",
    monthName: { sw: "Oktoba", en: "October" },
    monthIndex: 9,
    events: [
      { date: 18, title: { sw: "Kikao cha Halmashauri Kuu ya Kwaya", en: "Choir Main Council Meeting" } },
      { date: 25, title: { sw: "Mkutano Mkuu wa Kwaya", en: "Choir General Meeting" } },
    ],
  },
  {
    month: "November",
    monthName: { sw: "Novemba", en: "November" },
    monthIndex: 10,
    events: [{ date: null, title: { sw: "Recording 3", en: "Recording 3" } }],
  },
  {
    month: "December",
    monthName: { sw: "Desemba", en: "December" },
    monthIndex: 11,
    events: [
      { date: 5, title: { sw: "Semina ya Kiroho na Mafungo 2", en: "Spiritual Seminar & Retreat 2" } },
      { date: 26, title: { sw: "Stefano Day", en: "Stefano Day" } },
    ],
  },
];

export const calendarYear = 2026;
