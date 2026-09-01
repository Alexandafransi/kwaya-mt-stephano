"use client";

import { useMemo } from "react";
import Link from "next/link";
import { BookOpenText, CalendarDays, Newspaper, Users } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useList, useSingleton } from "@/lib/useResource";
import {
  adaptNews,
  adaptHomily,
  adaptMember,
  adaptCommittee,
  adaptSongCategory,
  adaptShopItem,
  adaptKinandaProject,
  adaptCalendarEvent,
  newsResource,
  homiliesResource,
  membersResource,
  committeesResource,
  songCategoriesResource,
  songsResource,
  shopItemsResource,
  kinandaProjectResource,
  calendarResource,
  groupCalendarEvents,
  type KinandaProject,
} from "@/lib/resources";
import { getUpcomingEvents, flattenDatedEvents } from "@/lib/calendar-utils";
import { parseAmount } from "@/lib/format";
import { dashboardUi as t } from "@/lib/dashboardUi";
import { PasswordGate } from "@/components/dashboard/PasswordGate";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import styles from "./dashboard.module.css";

const EMPTY_KINANDA: KinandaProject = {
  title: { sw: "", en: "" },
  goalAmount: "TZS 0",
  raisedAmount: "TZS 0",
  description: { sw: "", en: "" },
};

function Gauge({ percent, label, sub }: { percent: number; label: string; sub: string }) {
  const R = 70;
  const SW = 18;
  const C = 2 * Math.PI * R;
  const SPAN = 0.78;
  return (
    <div style={{ position: "relative", width: 170, height: 170 }}>
      <svg viewBox="0 0 180 180" style={{ width: 170, height: 170, transform: "rotate(130deg)" }}>
        <circle
          cx="90"
          cy="90"
          r={R}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={SW}
          strokeLinecap="round"
          strokeDasharray={`${C * SPAN} ${C}`}
        />
        <circle
          cx="90"
          cy="90"
          r={R}
          fill="none"
          stroke="var(--chart-2)"
          strokeWidth={SW}
          strokeLinecap="round"
          strokeDasharray={`${C * SPAN * (percent / 100)} ${C}`}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center" }}>
        <div>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-.03em" }} className={styles.tnum}>
            {percent}%
          </div>
          <div style={{ fontSize: 11, color: "var(--muted-foreground)" }}>{label}</div>
        </div>
      </div>
      <p style={{ position: "absolute", bottom: -20, left: 0, right: 0, textAlign: "center", fontSize: 11, color: "var(--muted-foreground)" }}>
        {sub}
      </p>
    </div>
  );
}

function Pie({ data }: { data: { name: string; value: number; color: string }[] }) {
  const total = data.reduce((a, b) => a + b.value, 0) || 1;
  const cx = 85;
  const cy = 85;
  const r = 78;
  let a0 = -Math.PI / 2;
  const paths = data.map((d) => {
    const a1 = a0 + (d.value / total) * 2 * Math.PI;
    const big = a1 - a0 > Math.PI ? 1 : 0;
    const path = `M${cx},${cy} L${(cx + r * Math.cos(a0)).toFixed(2)},${(cy + r * Math.sin(a0)).toFixed(2)} A${r},${r} 0 ${big} 1 ${(cx + r * Math.cos(a1)).toFixed(2)},${(cy + r * Math.sin(a1)).toFixed(2)} Z`;
    a0 = a1;
    return path;
  });
  return (
    <svg viewBox="0 0 170 170" style={{ width: 160, height: 160 }}>
      {paths.map((p, i) => (
        <path key={i} d={p} fill={data[i].color} stroke="var(--card)" strokeWidth={2} />
      ))}
    </svg>
  );
}

function DashboardContent() {
  const { lang } = useLanguage();

  const { data: news } = useList(newsResource.key, adaptNews);
  const { data: homilies } = useList(homiliesResource.key, adaptHomily);
  const { data: members } = useList(membersResource.key, adaptMember);
  const { data: committees } = useList(committeesResource.key, adaptCommittee);
  const { data: songCategories } = useList(songCategoriesResource.key, adaptSongCategory);
  const { data: shopItems } = useList(shopItemsResource.key, adaptShopItem);
  const { data: calendarEvents } = useList(calendarResource.key, adaptCalendarEvent);
  const { data: kinandaProject } = useSingleton(kinandaProjectResource.key, adaptKinandaProject, EMPTY_KINANDA);

  const now = useMemo(() => new Date(), []);
  const calendarYear = calendarEvents[0]?.year ?? now.getFullYear();
  const calendarMonths = useMemo(() => groupCalendarEvents(calendarEvents), [calendarEvents]);
  const upcoming = useMemo(
    () => getUpcomingEvents(calendarMonths, calendarYear, 1, now),
    [calendarMonths, calendarYear, now]
  );
  const upcomingCount = useMemo(
    () => flattenDatedEvents(calendarMonths, calendarYear).filter((e) => e.jsDate >= now).length,
    [calendarMonths, calendarYear, now]
  );

  const totalSongs = songCategories.reduce((sum, c) => sum + c.songs.length, 0);
  const uploadedSongs = songCategories.reduce(
    (sum, c) => sum + c.songs.filter((s) => s.youtubeId !== null).length,
    0
  );
  const songPercent = totalSongs === 0 ? 0 : Math.round((uploadedSongs / totalSongs) * 100);

  const raised = parseAmount(kinandaProject.raisedAmount);
  const goal = parseAmount(kinandaProject.goalAmount);
  const kinandaPercent = goal === 0 ? 0 : Math.min(100, Math.round((raised / goal) * 100));

  const recentContent = [
    ...news.map((n) => ({ kind: "news" as const, date: n.date, title: n.title[lang], href: `/habari-na-matukio/${n.slug}` })),
    ...homilies.map((h) => ({ kind: "homily" as const, date: h.date, title: h.title[lang], href: `/homilia/${h.slug}` })),
  ]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 6);

  const pieData = [
    { name: membersResource.label[lang], value: members.length, color: "var(--chart-1)" },
    { name: songsResource.label[lang], value: totalSongs, color: "var(--chart-2)" },
    { name: newsResource.label[lang], value: news.length, color: "var(--chart-3)" },
    { name: homiliesResource.label[lang], value: homilies.length, color: "var(--chart-4)" },
    { name: shopItemsResource.label[lang], value: shopItems.length + 1, color: "var(--chart-5)" },
  ];

  const kpis = [
    { label: t.kpiMembers[lang], value: members.length, icon: Users },
    { label: t.kpiNewsPublished[lang], value: news.length, icon: Newspaper },
    { label: t.kpiHomiliesPublished[lang], value: homilies.length, icon: BookOpenText },
    {
      label: t.kpiUpcomingEvents[lang],
      value: upcomingCount,
      icon: CalendarDays,
      sub: upcoming[0] ? `${t.kpiNext[lang]}: ${upcoming[0].title[lang]}` : undefined,
    },
  ];

  return (
    <DashboardShell title={t.dashboard[lang]} activeHref="/dashboard">
      <div className={styles.grid} style={{ marginBottom: "var(--card-gap)" }}>
        {kpis.map((k) => (
          <section key={k.label} className={`${styles.card} ${styles.kpi} ${styles.c3}`} style={{ padding: "var(--card-pad)" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <p className={styles.l}>{k.label}</p>
              <k.icon size={16} style={{ color: "var(--muted-foreground)" }} />
            </div>
            <p className={`${styles.v} ${styles.tnum}`}>{k.value}</p>
            {k.sub && <p className={styles.kpiSub}>{k.sub}</p>}
          </section>
        ))}
      </div>

      <div className={styles.grid}>
        <section className={`${styles.card} ${styles.c8}`}>
          <div className={styles.cardHd}>
            <div>
              <h3>{t.recentContentTitle[lang]}</h3>
              <p>{t.recentContentSubtitle[lang]}</p>
            </div>
          </div>
          <div className={`${styles.cardBd} ${styles.cardBdFlush}`} style={{ paddingTop: 6, paddingBottom: 0 }}>
            <div style={{ overflowX: "auto" }}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{t.colDate[lang]}</th>
                    <th>{t.colTitle[lang]}</th>
                    <th>{t.colType[lang]}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {recentContent.map((item) => (
                    <tr key={item.href}>
                      <td className={`${styles.nw} ${styles.tnum}`} style={{ color: "var(--muted-foreground)" }}>
                        {new Date(item.date).toLocaleDateString(lang === "sw" ? "sw-TZ" : "en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td style={{ fontWeight: 500 }}>{item.title}</td>
                      <td className={styles.nw}>
                        <span className={`${styles.badge} ${item.kind === "news" ? styles.badgeInfo : styles.badgeSuccess}`}>
                          <i />
                          {item.kind === "news" ? newsResource.label[lang] : homiliesResource.label[lang]}
                        </span>
                      </td>
                      <td className={styles.nw}>
                        <Link href={item.href} className={styles.link}>
                          {t.open[lang]}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={`${styles.card} ${styles.c4}`}>
          <div className={styles.cardHd}>
            <div>
              <h3>{t.songsUploadedTitle[lang]}</h3>
              <p>{t.songsUploadedSubtitle[lang]}</p>
            </div>
          </div>
          <div className={styles.cardBd} style={{ alignItems: "center", justifyContent: "center", gap: 28, paddingTop: 10 }}>
            <Gauge
              percent={songPercent}
              label={t.uploaded[lang]}
              sub={`${uploadedSongs} ${t.outOfSongs[lang]} ${totalSongs} ${t.songsWord[lang]}`}
            />
          </div>
        </section>

        <section className={`${styles.card} ${styles.c7}`}>
          <div className={styles.cardHd}>
            <div>
              <h3>{t.leadershipTitle[lang]}</h3>
              <p>{t.leadershipSubtitle[lang]}</p>
            </div>
          </div>
          <div className={styles.cardBd} style={{ paddingTop: 2 }}>
            {committees.map((c) => (
              <div key={c.slug} className={styles.rowItem}>
                <span className={styles.avatar} style={{ marginTop: 2, background: "var(--tint-2)", color: "var(--tint-2-fg)" }}>
                  <Users size={11} />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4>{c.name[lang]}</h4>
                  <p>{c.description[lang]}</p>
                  <div className={styles.rowMeta}>
                    {c.members.length} {t.membersWord[lang]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={`${styles.card} ${styles.c5}`}>
          <div className={styles.cardHd}>
            <div>
              <h3>{t.contentBreakdownTitle[lang]}</h3>
              <p>{t.contentBreakdownSubtitle[lang]}</p>
            </div>
          </div>
          <div className={styles.cardBd} style={{ alignItems: "center", justifyContent: "center", gap: 14, flexDirection: "row" }}>
            <Pie data={pieData} />
            <ul style={{ display: "grid", gap: 6, fontSize: 11.5 }}>
              {pieData.map((d) => (
                <li key={d.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 9, height: 9, borderRadius: 3, background: d.color }} />
                  <span style={{ color: "var(--muted-foreground)" }}>{d.name}</span>
                  <b className={styles.tnum}>{d.value}</b>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${styles.card} ${styles.c12}`}>
          <div className={styles.cardHd}>
            <div>
              <h3>{t.kinandaFundTitle[lang]}</h3>
              <p>{kinandaProject.description[lang]}</p>
            </div>
            <Link href="/miradi/kinanda" className={styles.link}>
              {t.view[lang]}
            </Link>
          </div>
          <div className={styles.cardBd}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
              <span>{kinandaProject.raisedAmount}</span>
              <span style={{ color: "var(--muted-foreground)" }}>{kinandaProject.goalAmount}</span>
            </div>
            <div style={{ height: 10, borderRadius: 99, background: "var(--muted)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${kinandaPercent}%`, borderRadius: 99, background: "var(--chart-2)" }} />
            </div>
            <p style={{ marginTop: 6, fontSize: 11, color: "var(--muted-foreground)" }}>
              {kinandaPercent}% {t.percentFunded[lang]}
            </p>
          </div>
        </section>
      </div>

      <p style={{ marginTop: 18, fontSize: 11, color: "var(--muted-foreground)", textAlign: "center" }}>
        {t.statsRealFooter[lang]}
      </p>
    </DashboardShell>
  );
}

export default function DashboardPage() {
  return (
    <PasswordGate>
      <DashboardContent />
    </PasswordGate>
  );
}
