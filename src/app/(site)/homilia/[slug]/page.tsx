"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { useList } from "@/lib/useResource";
import { adaptHomily, homiliesResource } from "@/lib/resources";
import { HomilyDetailClient } from "@/components/homilies/HomilyDetailClient";

export default function HomilyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: homilies, loading } = useList(homiliesResource.key, adaptHomily);

  if (loading) return null;
  const homily = homilies.find((h) => h.slug === slug);
  if (!homily) notFound();
  return <HomilyDetailClient homily={homily} />;
}
