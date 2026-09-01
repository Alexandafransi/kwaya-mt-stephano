import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Allows the dev server's HMR/RSC navigation requests when previewed through
  // a tunnel (ngrok/cloudflared) instead of localhost.
  allowedDevOrigins: ["*.trycloudflare.com", "*.ngrok-free.dev", "*.ngrok-free.app", "*.ngrok.io"],
  images: {
    // Uploaded media (logo, choir photo, gallery images, ...) is served by
    // the Django backend at a browser-reachable URL (NEXT_PUBLIC_API_URL,
    // e.g. localhost:8001) that is NOT reachable from inside this container
    // (server-side image optimization would need the internal Docker
    // network hostname instead). Skipping optimization avoids that mismatch
    // — the browser just fetches the original file directly.
    unoptimized: true,
  },
};

export default nextConfig;
