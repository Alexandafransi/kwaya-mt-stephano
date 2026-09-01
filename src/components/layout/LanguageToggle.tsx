"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-cream/25 bg-cream/5 p-1 text-xs font-semibold ${className}`}
    >
      {(["sw", "en"] as const).map((option) => (
        <button
          key={option}
          onClick={() => setLang(option)}
          className={`rounded-full px-3 py-1 uppercase tracking-wide transition ${
            lang === option
              ? "bg-brand-gold text-ink"
              : "text-cream/70 hover:text-cream"
          }`}
          aria-pressed={lang === option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
