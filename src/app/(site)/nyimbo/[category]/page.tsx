"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { useList } from "@/lib/useResource";
import { adaptSongCategory, songCategoriesResource } from "@/lib/resources";
import { SongCategoryClient } from "@/components/songs/SongCategoryClient";

export default function SongCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const { data: songCategories, loading } = useList(songCategoriesResource.key, adaptSongCategory);

  if (loading) return null;
  const songCategory = songCategories.find((c) => c.slug === category);
  if (!songCategory) notFound();
  return <SongCategoryClient category={songCategory} />;
}
