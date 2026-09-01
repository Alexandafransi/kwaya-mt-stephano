import { Container } from "./Container";

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="grain-overlay relative overflow-hidden bg-ink py-24 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(232,185,35,0.18), transparent 55%), radial-gradient(circle at 80% 80%, rgba(217,114,12,0.18), transparent 55%)",
        }}
      />
      <Container className="relative">
        {eyebrow && (
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-brand-gold" />
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-gold">
              {eyebrow}
            </p>
          </div>
        )}
        <h1 className="font-serif-display text-4xl font-bold tracking-tight text-balance text-cream sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-base text-cream/70 sm:text-lg">
            {subtitle}
          </p>
        )}
      </Container>
    </div>
  );
}
