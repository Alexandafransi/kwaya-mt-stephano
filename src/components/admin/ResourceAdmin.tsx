"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Lang } from "@/i18n/types";
import { api, ApiError, mediaUrl } from "@/lib/api";
import type { FieldConfig, ResourceConfig } from "@/lib/resources";
import { dashboardUi as t, fmt } from "@/lib/dashboardUi";
import styles from "@/app/dashboard/dashboard.module.css";

type Row = Record<string, unknown>;
type Option = { value: string; label: string };

function emptyForm(fields: FieldConfig[]): Row {
  const row: Row = {};
  for (const f of fields) {
    if (f.bilingual) {
      row[`${f.name}_sw`] = "";
      row[`${f.name}_en`] = "";
    } else if (f.type === "boolean") {
      row[f.name] = false;
    } else {
      row[f.name] = "";
    }
  }
  return row;
}

function rowLabel(row: Row, config: ResourceConfig): string {
  const v = row[config.titleField];
  return typeof v === "string" || typeof v === "number" ? String(v) : `#${row.id}`;
}

function fieldForKey(key: string, fields: FieldConfig[]): FieldConfig | undefined {
  return fields.find((f) => (f.bilingual ? key === `${f.name}_sw` || key === `${f.name}_en` : key === f.name));
}

function guessBilingualTitleField(sample: Row | undefined): { sw: string; en: string } | null {
  if (!sample) return null;
  if ("name_sw" in sample && "name_en" in sample) return { sw: "name_sw", en: "name_en" };
  if ("title_sw" in sample && "title_en" in sample) return { sw: "title_sw", en: "title_en" };
  return null;
}

export function ResourceAdmin({ config }: { config: ResourceConfig }) {
  const { lang } = useLanguage();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [parentOptions, setParentOptions] = useState<Option[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<Row | null>(null); // null = creating
  const [form, setForm] = useState<Row>({});
  const [files, setFiles] = useState<Record<string, File>>({});
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    setError(null);
    api
      .list<Row>(config.key)
      .then(setRows)
      .catch((e) => setError(describeError(e)))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    if (config.parent) {
      api
        .list<Row>(config.parent.resource)
        .then((parentRows) => {
          const titleFields = guessBilingualTitleField(parentRows[0]);
          setParentOptions(
            parentRows.map((p) => ({
              value: String(p.id),
              label: (titleFields ? (p[titleFields[lang]] as string) : (p.name as string)) || `#${p.id}`,
            }))
          );
        })
        .catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.key, lang]);

  function describeError(e: unknown): string {
    if (e instanceof ApiError) {
      if (e.status === 401) return t.sessionExpired[lang];
      if (e.body && typeof e.body === "object") {
        return Object.entries(e.body as Record<string, unknown>)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
          .join(" · ");
      }
    }
    return t.genericError[lang];
  }

  function openCreate() {
    setEditing(null);
    setForm(emptyForm(config.fields));
    setFiles({});
    setError(null);
    setDrawerOpen(true);
  }

  function openEdit(row: Row) {
    setEditing(row);
    setForm({ ...row });
    setFiles({});
    setError(null);
    setDrawerOpen(true);
  }

  async function handleDelete(row: Row) {
    const label = rowLabel(row, config);
    if (!window.confirm(fmt(t.confirmDelete, lang, label))) return;
    const idOrSlug = (config.lookup === "slug" ? row.slug : row.id) as string | number;
    try {
      await api.remove(config.key, idOrSlug);
      load();
    } catch (e) {
      setError(describeError(e));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const hasFiles = Object.keys(files).length > 0;
      let payload: unknown;
      if (hasFiles) {
        const fd = new FormData();
        for (const [k, v] of Object.entries(form)) {
          if (v !== "" && v !== null && v !== undefined) fd.append(k, String(v));
        }
        for (const [k, file] of Object.entries(files)) fd.append(k, file);
        payload = fd;
      } else {
        const cleaned: Row = {};
        for (const [k, v] of Object.entries(form)) {
          if (v === "") {
            const field = fieldForKey(k, config.fields);
            if (field?.nullable) {
              cleaned[k] = null;
            } else if (field && (field.type === "number" || field.type === "date")) {
              // Not nullable and "" isn't a valid int/date — omit so the
              // backend keeps its default (create) or existing value (edit).
              continue;
            } else {
              cleaned[k] = v; // blank=True text/select fields accept "".
            }
          } else {
            cleaned[k] = v;
          }
        }
        payload = cleaned;
      }

      if (editing) {
        const idOrSlug = (config.lookup === "slug" ? editing.slug : editing.id) as string | number;
        await api.update(config.key, idOrSlug, payload);
      } else {
        await api.create(config.key, payload);
      }
      setDrawerOpen(false);
      load();
    } catch (e) {
      setError(describeError(e));
    } finally {
      setSaving(false);
    }
  }

  function setField(name: string, value: string | boolean) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  const columns = config.fields.filter((f) => f.type !== "textarea" && f.type !== "image" && f.type !== "file").slice(0, 4);

  return (
    <section className={styles.card}>
      <div className={styles.cardBd} style={{ paddingTop: 16 }}>
        <div className={styles.adminToolbar}>
          <div>
            <h2>{config.label[lang]}</h2>
            <p>
              {rows.length} {t.total[lang]}
            </p>
          </div>
          <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={openCreate}>
            <Plus size={14} />
            {t.addNew[lang]}
          </button>
        </div>

        {error && !drawerOpen && <div className={styles.adminBanner}>{error}</div>}

        {loading ? (
          <div className={styles.adminEmpty}>{t.loading[lang]}</div>
        ) : rows.length === 0 ? (
          <div className={styles.adminEmpty}>{t.noContentYet[lang]}</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {columns.map((c) => (
                    <th key={c.name}>{c.label[lang]}</th>
                  ))}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={String(row.id)}>
                    {columns.map((c) => (
                      <td key={c.name} className={c.type === "number" || c.type === "date" ? styles.nw : ""}>
                        {formatCell(row, c, lang)}
                      </td>
                    ))}
                    <td className={styles.nw}>
                      <div className={styles.adminActions}>
                        <button className={styles.adminIconBtn} onClick={() => openEdit(row)} aria-label={t.edit[lang]}>
                          <Pencil size={13} />
                        </button>
                        <button
                          className={`${styles.adminIconBtn} ${styles.adminIconBtnDanger}`}
                          onClick={() => handleDelete(row)}
                          aria-label={t.delete[lang]}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {drawerOpen && (
        <div className={styles.drawerOverlay} onClick={() => setDrawerOpen(false)}>
          <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.drawerHd}>
              <h3>
                {editing ? `${t.edit[lang]}: ${rowLabel(editing, config)}` : `${t.add[lang]} ${config.label[lang]}`}
              </h3>
              <button className={styles.iconBtn} onClick={() => setDrawerOpen(false)} aria-label={t.close[lang]}>
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: "contents" }}>
              <div className={styles.drawerBd}>
                {error && <div className={styles.adminBanner}>{error}</div>}
                {config.fields.map((f) => (
                  <FieldInput
                    key={f.name}
                    field={f}
                    lang={lang}
                    form={form}
                    setField={setField}
                    setFile={(name, file) => setFiles((s) => ({ ...s, [name]: file }))}
                    parentOptions={config.parent?.field === f.name ? parentOptions : undefined}
                    editingImage={editing ? (editing[f.name] as string) : null}
                  />
                ))}
              </div>
              <div className={styles.drawerFt}>
                <button
                  type="button"
                  className={styles.btn}
                  style={{ flex: 1, justifyContent: "center" }}
                  onClick={() => setDrawerOpen(false)}
                >
                  {t.cancel[lang]}
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  style={{ flex: 1, justifyContent: "center", opacity: saving ? 0.7 : 1 }}
                >
                  {saving ? t.saving[lang] : t.save[lang]}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

function formatCell(row: Row, field: FieldConfig, lang: Lang): string {
  if (field.bilingual) {
    return (row[`${field.name}_sw`] as string) || "—";
  }
  const v = row[field.name];
  if (field.type === "boolean") {
    return v ? (lang === "sw" ? "Ndiyo" : "Yes") : lang === "sw" ? "Hapana" : "No";
  }
  if (field.type === "select" && field.options) {
    const opt = field.options.find((o) => o.value === v);
    if (opt) return opt.label[lang];
  }
  if (v === null || v === undefined || v === "") return "—";
  return String(v);
}

function FieldInput({
  field,
  lang,
  form,
  setField,
  setFile,
  parentOptions,
  editingImage,
}: {
  field: FieldConfig;
  lang: Lang;
  form: Row;
  setField: (name: string, value: string | boolean) => void;
  setFile: (name: string, file: File) => void;
  parentOptions?: Option[];
  editingImage: string | null;
}) {
  const options = field.options ? field.options.map((o) => ({ value: o.value, label: o.label[lang] })) : parentOptions;

  if (field.type === "boolean") {
    return (
      <div className={styles.formField}>
        <label className={styles.formLabel} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={form[field.name] === true}
            onChange={(e) => setField(field.name, e.target.checked)}
            style={{ width: 15, height: 15, accentColor: "var(--primary)" }}
          />
          {field.label[lang]}
        </label>
        {field.help && <p className={styles.formHelp}>{field.help[lang]}</p>}
      </div>
    );
  }

  if (field.bilingual) {
    return (
      <div className={styles.formField}>
        <label className={styles.formLabel}>
          {field.label[lang]} {field.required && <small>*</small>}
        </label>
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
                required={field.required}
              />
            );
          })}
        </div>
        {field.help && <p className={styles.formHelp}>{field.help[lang]}</p>}
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div className={styles.formField}>
        <label className={styles.formLabel}>
          {field.label[lang]} {field.required && <small>*</small>}
        </label>
        <select
          className={styles.formSelect}
          value={(form[field.name] as string) ?? ""}
          onChange={(e) => setField(field.name, e.target.value)}
          required={field.required}
        >
          <option value="">—</option>
          {(options ?? []).map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "image" || field.type === "file") {
    const url = mediaUrl(editingImage);
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
          accept={field.type === "image" ? "image/*" : undefined}
          className={styles.formInput}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setFile(field.name, file);
          }}
        />
        {field.help && <p className={styles.formHelp}>{field.help[lang]}</p>}
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className={styles.formField}>
        <label className={styles.formLabel}>
          {field.label[lang]} {field.required && <small>*</small>}
        </label>
        <textarea
          className={styles.formTextarea}
          value={(form[field.name] as string) ?? ""}
          onChange={(e) => setField(field.name, e.target.value)}
          required={field.required}
        />
        {field.help && <p className={styles.formHelp}>{field.help[lang]}</p>}
      </div>
    );
  }

  return (
    <div className={styles.formField}>
      <label className={styles.formLabel}>
        {field.label[lang]} {field.required && <small>*</small>}
      </label>
      <input
        type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
        className={styles.formInput}
        value={(form[field.name] as string) ?? ""}
        onChange={(e) => setField(field.name, e.target.value)}
        required={field.required}
      />
      {field.help && <p className={styles.formHelp}>{field.help[lang]}</p>}
    </div>
  );
}
