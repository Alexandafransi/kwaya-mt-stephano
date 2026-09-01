// Client for the Django REST backend. Two layers:
//  - the raw `api` object: generic list/get/create/update/remove against any
//    `/api/<resource>/` endpoint, plus auth.
//  - typed `adapt*`/`to*Payload` pairs per resource: convert between the
//    backend's flat `title_sw`/`title_en` fields and the frontend's existing
//    `{ sw, en }` Bilingual shape, so presentational components (built around
//    the old static-data types) don't need to change at all.

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";

const TOKEN_KEY = "kwaya-api-token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  window.sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  window.sessionStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  status: number;
  body: unknown;
  constructor(status: number, body: unknown) {
    super(`API error ${status}`);
    this.status = status;
    this.body = body;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(options.body && !(options.body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Token ${token}` } : {}),
    ...(options.headers as Record<string, string> | undefined),
  };

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    let body: unknown = null;
    try {
      body = await res.json();
    } catch {
      // no JSON body
    }
    throw new ApiError(res.status, body);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function login(username: string, password: string): Promise<string> {
  const data = await request<{ token: string }>("/api/auth/login/", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  setToken(data.token);
  return data.token;
}

type Paginated<T> = { count: number; next: string | null; previous: string | null; results: T[] };

export const api = {
  async list<T>(resource: string, params?: Record<string, string | number | undefined>): Promise<T[]> {
    const qs = params
      ? "?" +
        Object.entries(params)
          .filter(([, v]) => v !== undefined)
          .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
          .join("&")
      : "";
    const data = await request<Paginated<T> | T[]>(`/api/${resource}/${qs}`);
    return Array.isArray(data) ? data : data.results;
  },
  get<T>(resource: string, idOrSlug: string | number): Promise<T> {
    return request<T>(`/api/${resource}/${idOrSlug}/`);
  },
  create<T>(resource: string, payload: unknown): Promise<T> {
    const body = payload instanceof FormData ? payload : JSON.stringify(payload);
    return request<T>(`/api/${resource}/`, { method: "POST", body });
  },
  update<T>(resource: string, idOrSlug: string | number, payload: unknown): Promise<T> {
    const body = payload instanceof FormData ? payload : JSON.stringify(payload);
    return request<T>(`/api/${resource}/${idOrSlug}/`, { method: "PATCH", body });
  },
  remove(resource: string, idOrSlug: string | number): Promise<void> {
    return request<void>(`/api/${resource}/${idOrSlug}/`, { method: "DELETE" });
  },
  singletonGet<T>(resource: string): Promise<T> {
    return request<T>(`/api/${resource}/`);
  },
  singletonUpdate<T>(resource: string, payload: unknown): Promise<T> {
    const body = payload instanceof FormData ? payload : JSON.stringify(payload);
    return request<T>(`/api/${resource}/`, { method: "PUT", body });
  },
};

export function mediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${API_URL}${path}`;
}
