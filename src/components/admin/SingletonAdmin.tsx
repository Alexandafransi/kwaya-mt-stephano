"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Lang } from "@/i18n/types";
import { api, ApiError, mediaUrl } from "@/lib/api";
import type { FieldConfig, ResourceConfig } from "@/lib/resources";
import { dashboardUi as t } from "@/lib/dashboardUi";
import styles from "@/app/dashboard/dashboard.module.css";

type Row = Record<string, unknown>;

function fieldForKey(key: string, fields: FieldConfig[]): FieldConfig | undefined {
  return fields.find((f) => (f.bilingual ? key === `${f.name}_sw` || key === `${f.name}_en` : key === f.name));
}

export function SingletonAdmin({ config }: { config: ResourceConfig }) {
  const { lang } = useLanguage();
  const [form, setForm] = useState<Row>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [files, setFiles] = useState<Record<string, File>>({});

  useEffect(() => {
    api
      .singletonGet<Row>(config.key)
      .then(setForm)
      .catch((e) => setError(describeError(e)))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.key]);

  function describeError(e: unknown): string {
    if (e instanceof ApiError && e.status === 401) return t.sessionExpired[lang];
    return t.genericError[lang];
  }

  function setField(name: string, value: string) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const hasFiles = Object.keys(files).length > 0;
      let payload: unknown;
      if (hasFiles) {
        const fd = new FormData();
        for (const [k, v] of Object.entries(form)) {
          if (v !== "" && v !== null && v !== undefined && typeof v !== "object") fd.append(k, String(v));
        }
        for (const [k, file] of Object.entries(files)) fd.append(k, file);
        payload = fd;
      } else {
        const cleaned: Row = {};
        for (const [k, v] of Object.entries(form)) {
          if (typeof v === "object") continue;
          if (v === "") {
            const field = fieldForKey(k, config.fields);
            if (field?.nullable) {
              cleaned[k] = null;
            } else if (field && (field.type === "number" || field.type === "date")) {
              continue; // not nullable, "" isn't valid — omit, keep existing value
            } else {
              cleaned[k] = v;
            }
          } else {
            cleaned[k] = v;
          }
        }
        payload = cleaned;
      }
      const updated = await api.singletonUpdate<Row>(config.key, payload);
      setForm(updated);
      setFiles({});
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      setError(describeError(e));
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <section className={styles.card}>
        <div className={styles.adminEmpty}>{t.loading[lang]}</div>
      </section>
    );
  }

  return (
    <section className={styles.card}>
      <div className={styles.cardBd} style={{ paddingTop: 16 }}>
        <div className={styles.adminToolbar}>
          <div>
            <h2>{config.label[lang]}</h2>
            <p>{t.liveOnSite[lang]}</p>
          </div>
        </div>
        {error && <div className={styles.adminBanner}>{error}</div>}
        {saved && (
          <div className={styles.adminBanner} style={{ background: "var(--success-soft)", color: "var(--success)" }}>
            {t.saved[lang]}
          </div>
        )}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 560 }}>
          {config.fields.map((f) => (
            <SingletonField
              key={f.name}
              field={f}
              lang={lang}
              form={form}
              setField={setField}
              setFile={(n, file) => setFiles((s) => ({ ...s, [n]: file }))}
            />
          ))}
          <div>
            <button
              type="submit"
              disabled={saving}
              className={`${styles.btn} ${styles.btnPrimary}`}
              style={{ opacity: saving ? 0.7 : 1 }}
            >
              {saving ? t.saving[lang] : t.saveChanges[lang]}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function SingletonField({
  field,
  lang,
  form,
  setField,
  setFile,
}: {
  field: FieldConfig;
  lang: Lang;
  form: Row;
  setField: (name: string, value: string) => void;
  setFile: (name: string, file: File) => void;
}) {
  if (field.bilingual) {
    return (
      <div className={styles.formField}>
        <label className={styles.formLabel}>{field.label[lang]}</label>
        <div className={styles.formRow}>
          {(["sw", "en"] as const).map((l) => {
            const key = `${field.name}_${l}`;
            const Tag = field.type === "textarea" ? "textarea" : "input";
            return (
              <Tag
                key={key}
                className={field.type === "textarea" ? styles.formTextarea : styles.formInput}
                placeholder={l.toUpperCase()}
                value={(form[key] as string) ?? ""}
                onChange={(e) => setField(key, e.target.value)}
              />
            );
          })}
        </div>
      </div>
    );
  }

  if (field.type === "image" || field.type === "file") {
    const current = form[field.name];
    const url = typeof current === "string" ? mediaUrl(current) : null;
    return (
      <div className={styles.formField}>
        <label className={styles.formLabel}>{field.label[lang]}</label>
        {field.type === "image" && url && <img src={url} alt="" className={styles.formImgPreview} />}
        {field.type === "file" && url && (
          <a href={url} target="_blank" rel="noreferrer" className={styles.link} style={{ marginBottom: 6 }}>
            {t.currentFile[lang]}
          </a>
        )}
        <input
          type="file"
          accept={field.accept ?? (field.type === "image" ? "image/*" : undefined)}
          className={styles.formInput}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setFile(field.name, file);
          }}
        />
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className={styles.formField}>
        <label className={styles.formLabel}>{field.label[lang]}</label>
        <textarea
          className={styles.formTextarea}
          value={(form[field.name] as string) ?? ""}
          onChange={(e) => setField(field.name, e.target.value)}
        />
      </div>
    );
  }

  return (
    <div className={styles.formField}>
      <label className={styles.formLabel}>{field.label[lang]}</label>
      <input
        type={field.type === "number" ? "number" : "text"}
        className={styles.formInput}
        value={(form[field.name] as string) ?? ""}
        onChange={(e) => setField(field.name, e.target.value)}
      />
    </div>
  );
}
