"use client";

import { useEffect, useState, useCallback } from "react";
import { api } from "./api";

export function useList<T>(
  resource: string,
  adapt: (raw: Record<string, unknown>) => T,
  params?: Record<string, string | number | undefined>
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const paramsKey = params ? JSON.stringify(params) : "";

  const refetch = useCallback(() => {
    setLoading(true);
    api
      .list<Record<string, unknown>>(resource, params)
      .then((raw) => setData(raw.map(adapt)))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource, paramsKey]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}

export function useSingleton<T>(resource: string, adapt: (raw: Record<string, unknown>) => T, fallback: T) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(() => {
    setLoading(true);
    api
      .singletonGet<Record<string, unknown>>(resource)
      .then((raw) => setData(adapt(raw)))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}
