import { Container } from "./Container";

export function Section({
  children,
  className = "",
  containerClassName = "",
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section className={`py-16 sm:py-24 ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <div className={`mb-4 flex items-center gap-3 ${center ? "justify-center" : ""}`}>
          <span className="h-px w-8 bg-brand-gold" />
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-orange-dark">
            {eyebrow}
          </p>
        </div>
      )}
      <h2 className="font-serif-display text-3xl font-bold tracking-tight text-balance text-content sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg text-content-soft/70 ${center ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
