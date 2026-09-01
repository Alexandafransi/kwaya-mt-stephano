"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { useList } from "@/lib/useResource";
import { adaptCommittee, committeesResource } from "@/lib/resources";
import { CommitteeDetailClient } from "@/components/committees/CommitteeDetailClient";

export default function CommitteePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: committees, loading } = useList(committeesResource.key, adaptCommittee);

  if (loading) return null;
  const committee = committees.find((c) => c.slug === slug);
  if (!committee) notFound();
  return <CommitteeDetailClient committee={committee} />;
}
