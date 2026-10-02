export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-content/8 bg-card p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_8px_24px_-12px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:border-brand-gold/40 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_32px_-12px_rgba(0,0,0,0.14)] ${className}`}
    >
      {/* Soft corner wash — barely-there warmth so cards don't read as flat white boxes */}
      <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-gold/[0.07] blur-2xl transition-opacity duration-300 group-hover:bg-brand-orange/[0.1]" />
      {/* Hover-reveal top accent line */}
      <span className="pointer-events-none absolute inset-x-6 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-brand-gold to-transparent transition-transform duration-300 group-hover:scale-x-100" />
      <div className="relative">{children}</div>
    </div>
  );
}

// A two-tone gradient icon badge used inside cards — richer than a flat
// tinted circle, with a soft ring and shadow for a bit of depth.
export function CardIcon({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-brand-orange/15 via-brand-gold/10 to-transparent text-brand-orange-dark shadow-sm ring-1 ring-brand-orange/15 transition duration-300 group-hover:ring-brand-orange/30 ${className}`}
    >
      {children}
    </div>
  );
}
