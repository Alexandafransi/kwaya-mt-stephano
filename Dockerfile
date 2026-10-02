# --- Dependencies ---
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# --- Build ---
FROM node:22-alpine AS builder
WORKDIR /app
# The browser calls the API cross-origin, so this must be an absolute URL
# and is baked into the bundle at build time. Defaulting to the PRODUCTION
# origin on purpose: an image built without the build arg then still works
# in production, whereas a localhost default silently ships a bundle that
# can only talk to a developer's own machine. Local `npm run dev` reads
# .env.local directly and never goes through this Dockerfile.
ARG NEXT_PUBLIC_API_URL=https://kpb.kezmak.co.tz
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- Run ---
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
