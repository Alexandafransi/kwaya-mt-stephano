export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group relative rounded-xl border border-content/8 bg-card p-6 shadow-sm shadow-content/[0.03] transition duration-300 hover:-translate-y-1 hover:border-brand-gold/40 hover:shadow-lg hover:shadow-content/[0.06] ${className}`}
    >
      <span className="pointer-events-none absolute inset-x-6 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-brand-gold to-transparent transition-transform duration-300 group-hover:scale-x-100" />
      {children}
    </div>
  );
}
