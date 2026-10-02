// A left-accent-border card: a distinct card style used sparingly to make a
// section (usually a dark band) pop differently from the default <Card>.
export function AccentCard({
  children,
  className = "",
  tone = "orange",
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "orange" | "gold";
  // For use inside permanently-dark bands (hero/footer-style "fixed brand
  // chrome"), where the surface shouldn't flip with the light/dark toggle.
  dark?: boolean;
}) {
  const borderColor = tone === "gold" ? "border-l-brand-gold" : "border-l-brand-orange";
  const glowColor = tone === "gold" ? "bg-brand-gold/[0.12]" : "bg-brand-orange/[0.12]";
  const surface = dark
    ? "border-cream/10 bg-cream/[0.04] shadow-none hover:bg-cream/[0.07]"
    : "border-content/8 bg-card shadow-[0_1px_2px_rgba(0,0,0,0.03),0_8px_24px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_32px_-12px_rgba(0,0,0,0.14)]";
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl rounded-l-sm border border-l-4 ${borderColor} ${surface} p-6 transition duration-300 hover:-translate-y-1 ${className}`}
    >
      <span className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full ${glowColor} blur-2xl`} />
      <div className="relative">{children}</div>
    </div>
  );
}
