"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Lock, ShieldCheck } from "lucide-react";
import { DASHBOARD_PASSWORD, DASHBOARD_SESSION_KEY } from "@/lib/dashboard-auth";
import { login } from "@/lib/api";
import { useSiteData } from "@/site/SiteDataProvider";
import { useLanguage } from "@/i18n/LanguageProvider";
import { dashboardUi as t } from "@/lib/dashboardUi";
import styles from "@/app/dashboard/dashboard.module.css";

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const { site } = useSiteData();
  const { lang } = useLanguage();
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setUnlocked(window.sessionStorage.getItem(DASHBOARD_SESSION_KEY) === "1");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input !== DASHBOARD_PASSWORD) {
      setError(true);
      return;
    }
    setSubmitting(true);
    try {
      // The single shared choir-leader password also logs the dashboard
      // into the Django API (as a shared service account) so CRUD writes
      // carry a valid auth token — see backend DASHBOARD_USERNAME/PASSWORD.
      await login("dashboard", DASHBOARD_PASSWORD);
      window.sessionStorage.setItem(DASHBOARD_SESSION_KEY, "1");
      setUnlocked(true);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (unlocked === null) {
    return <div className={styles.root} />;
  }

  if (!unlocked) {
    return (
      <div className={styles.root}>
        <div className={styles.lockScreen}>
          <div className={styles.lockBg} aria-hidden="true">
            <Image src={site.choirPhoto} alt="" fill priority className={styles.lockBgImg} />
            <div className={styles.lockBgOverlay} />
          </div>

          <form onSubmit={handleSubmit} className={styles.lockCard}>
            <div className={styles.lockLogoWrap}>
              <Image src={site.logo} alt={site.shortName} width={72} height={72} className={styles.lockLogo} priority />
            </div>

            <h1 className={styles.lockTitle}>{site.name[lang]}</h1>
            <p className={styles.lockSubtitle}>{site.tagline[lang]}</p>

            <div className={styles.lockDivider} />

            <p className={styles.lockDesc}>{t.lockTagline[lang]}</p>

            <div className={styles.lockInputWrap}>
              <Lock size={15} className={styles.lockInputIcon} />
              <input
                type="password"
                autoFocus
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setError(false);
                }}
                placeholder={lang === "sw" ? "Nenosiri" : "Password"}
                className={`${styles.lockInput} ${error ? styles.lockInputError : ""}`}
              />
            </div>
            {error && <p className={styles.lockError}>{t.wrongPassword[lang]}</p>}

            <button
              type="submit"
              disabled={submitting}
              className={`${styles.btn} ${styles.btnPrimary}`}
              style={{ width: "100%", justifyContent: "center", marginTop: error ? 4 : 14, opacity: submitting ? 0.7 : 1 }}
            >
              <Lock size={14} />
              {submitting ? t.opening[lang] : t.fungua[lang]}
            </button>

            <p className={styles.lockFooter}>
              <ShieldCheck size={12} />
              {t.protected[lang]} &middot; {site.parish[lang]}
            </p>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
