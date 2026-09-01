"use client";

import { createContext, useContext } from "react";
import { site as staticSiteFallback } from "@/data/site";
import { useSingleton } from "@/lib/useResource";
import { adaptSiteSettings, siteSettingsResource, type SiteSettings } from "@/lib/resources";
import { mediaUrl } from "@/lib/api";

type SiteDataContextValue = {
  site: SiteSettings;
  loading: boolean;
  refetch: () => void;
};

const SiteDataContext = createContext<SiteDataContextValue | null>(null);

// Seeds with the last-known-good static content so nothing on the page
// (header, footer, hero) is ever blank while the live fetch is in flight.
const FALLBACK: SiteSettings = {
  ...staticSiteFallback,
  social: { ...staticSiteFallback.social },
};

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const { data, loading, refetch } = useSingleton<SiteSettings>(
    siteSettingsResource.key,
    (raw) => {
      const adapted = adaptSiteSettings(raw, FALLBACK);
      return {
        ...adapted,
        logo: mediaUrl(adapted.logo) || FALLBACK.logo,
        choirPhoto: mediaUrl(adapted.choirPhoto) || FALLBACK.choirPhoto,
        registrationFormPdf: mediaUrl(adapted.registrationFormPdf) || FALLBACK.registrationFormPdf,
      };
    },
    FALLBACK
  );

  return (
    <SiteDataContext.Provider value={{ site: data, loading, refetch }}>{children}</SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) {
    throw new Error("useSiteData must be used within a SiteDataProvider");
  }
  return ctx;
}
