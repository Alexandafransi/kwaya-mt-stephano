"use client";

import Image from "next/image";
import Link from "next/link";
import { FileText, LayoutGrid, Lock, Moon, Settings, Sun, ExternalLink } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useTheme } from "@/theme/ThemeProvider";
import { useSiteData } from "@/site/SiteDataProvider";
import { DASHBOARD_SESSION_KEY } from "@/lib/dashboard-auth";
import { clearToken } from "@/lib/api";
import { ALL_RESOURCES, siteSettingsResource, aboutPageResource, kinandaProjectResource } from "@/lib/resources";
import { dashboardUi as t } from "@/lib/dashboardUi";
import styles from "@/app/dashboard/dashboard.module.css";

// A dashboard-native SW/EN toggle (the site's <LanguageToggle> is styled for
// the dark ink header/footer chrome — cream text would be invisible here).
function DashboardLanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid var(--border)",
        borderRadius: 999,
        padding: 2,
        gap: 2,
      }}
    >
      {(["sw", "en"] as const).map((option) => (
        <button
          key={option}
          onClick={() => setLang(option)}
          aria-pressed={lang === option}
          style={{
            borderRadius: 999,
            padding: "4px 10px",
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            background: lang === option ? "var(--primary)" : "transparent",
            color: lang === option ? "var(--primary-foreground)" : "var(--muted-foreground)",
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

const SETTINGS_ITEMS = [
  { href: `/dashboard/settings/${siteSettingsResource.key}`, label: siteSettingsResource.label },
  { href: `/dashboard/settings/${aboutPageResource.key}`, label: aboutPageResource.label },
  { href: `/dashboard/settings/${kinandaProjectResource.key}`, label: kinandaProjectResource.label },
];

export function DashboardShell({
  title,
  activeHref,
  children,
}: {
  title: string;
  activeHref: string;
  children: React.ReactNode;
}) {
  const { lang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { site } = useSiteData();

  return (
    <div className={styles.root}>
      <div className={styles.shell}>
        <aside className={styles.side}>
          <div className={styles.sideHd}>
            <span className={styles.logo}>
              <Image src={site.logo} alt={site.shortName} width={28} height={28} unoptimized />
            </span>
            <b>
              {site.shortName} {t.dashboard[lang]}
            </b>
          </div>
          <nav className={styles.nav} aria-label={t.dashboard[lang]}>
            <Link href="/dashboard" className={activeHref === "/dashboard" ? styles.navActive : ""}>
              <LayoutGrid size={16} />
              {t.dashboard[lang]}
            </Link>

            <div className={styles.navLabel}>{t.contentManagement[lang]}</div>
            {ALL_RESOURCES.map((r) => {
              const href = `/dashboard/content/${r.key}`;
              return (
                <Link key={r.key} href={href} className={activeHref === href ? styles.navActive : ""}>
                  <FileText size={16} />
                  {r.label[lang]}
                </Link>
              );
            })}

            <div className={styles.navLabel}>{t.settings[lang]}</div>
            {SETTINGS_ITEMS.map((s) => (
              <Link key={s.href} href={s.href} className={activeHref === s.href ? styles.navActive : ""}>
                <Settings size={16} />
                {s.label[lang]}
              </Link>
            ))}
          </nav>
          <div className={styles.sideFt}>
            <button
              className={styles.sideFtRow}
              style={{ width: "100%", textAlign: "left" }}
              onClick={() => {
                window.sessionStorage.removeItem(DASHBOARD_SESSION_KEY);
                clearToken();
                window.location.href = "/dashboard";
              }}
            >
              <span className={styles.avatar} style={{ background: "var(--tint-1)", color: "var(--tint-1-fg)" }}>
                <Lock size={11} />
              </span>
              <span style={{ flex: 1, fontSize: 12.5, fontWeight: 600 }}>{t.closeDashboard[lang]}</span>
            </button>
          </div>
        </aside>

        <div className={styles.main}>
          <header className={styles.topbar}>
            <h1>{title}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
              <DashboardLanguageToggle />
              <button
                onClick={toggleTheme}
                className={styles.iconBtn}
                style={{ border: "1px solid var(--border)" }}
                aria-label={theme === "dark" ? t.enableLight[lang] : t.enableDark[lang]}
                aria-pressed={theme === "dark"}
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <a href="/" target="_blank" rel="noreferrer" className={styles.btn}>
                <ExternalLink size={14} />
                {t.viewSite[lang]}
              </a>
            </div>
          </header>

          <main className={styles.content}>
            <div className={styles.contentInner}>{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
