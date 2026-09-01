"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ALL_RESOURCES } from "@/lib/resources";
import { PasswordGate } from "@/components/dashboard/PasswordGate";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ResourceAdmin } from "@/components/admin/ResourceAdmin";

export default function ContentAdminPage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = use(params);
  const { lang } = useLanguage();
  const config = ALL_RESOURCES.find((r) => r.key === resource);
  if (!config) notFound();

  return (
    <PasswordGate>
      <DashboardShell title={config.label[lang]} activeHref={`/dashboard/content/${config.key}`}>
        <ResourceAdmin config={config} />
      </DashboardShell>
    </PasswordGate>
  );
}
