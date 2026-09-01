"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { useList } from "@/lib/useResource";
import { adaptNews, newsResource } from "@/lib/resources";
import { NewsDetailClient } from "@/components/news/NewsDetailClient";

export default function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: news, loading } = useList(newsResource.key, adaptNews);

  if (loading) return null;
  const item = news.find((n) => n.slug === slug);
  if (!item) notFound();
  return <NewsDetailClient item={item} />;
}
