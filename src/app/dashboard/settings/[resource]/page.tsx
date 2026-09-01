"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageProvider";
import { siteSettingsResource, aboutPageResource, kinandaProjectResource } from "@/lib/resources";
import { PasswordGate } from "@/components/dashboard/PasswordGate";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { SingletonAdmin } from "@/components/admin/SingletonAdmin";

const SETTINGS_RESOURCES = [siteSettingsResource, aboutPageResource, kinandaProjectResource];

export default function SettingsAdminPage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = use(params);
  const { lang } = useLanguage();
  const config = SETTINGS_RESOURCES.find((r) => r.key === resource);
  if (!config) notFound();

  return (
    <PasswordGate>
      <DashboardShell title={config.label[lang]} activeHref={`/dashboard/settings/${config.key}`}>
        <SingletonAdmin config={config} />
      </DashboardShell>
    </PasswordGate>
  );
}
