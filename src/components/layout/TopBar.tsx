"use client";

import { Mail, Phone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSiteData } from "@/site/SiteDataProvider";

export function TopBar() {
  const { lang } = useLanguage();
  const { site } = useSiteData();

  return (
    <div className="hidden border-b border-cream/5 bg-[#120f0c] text-cream/55 sm:block">
      <div className="mx-auto flex max-w-[100rem] items-center justify-between gap-4 px-5 py-1.5 text-xs sm:px-8">
        <p className="truncate italic">{site.tagline[lang]}</p>
        <div className="flex shrink-0 items-center gap-4">
          <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 transition hover:text-brand-gold">
            <Mail size={12} />
            <span className="hidden md:inline">{site.email}</span>
          </a>
          <a href={`tel:${site.phone}`} className="flex items-center gap-1.5 transition hover:text-brand-gold">
            <Phone size={12} />
            <span>{site.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
