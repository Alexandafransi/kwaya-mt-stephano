import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition duration-300";
  const styles =
    variant === "primary"
      ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20 hover:-translate-y-0.5 hover:bg-brand-orange-dark hover:shadow-xl hover:shadow-brand-orange/25"
      : "border border-cream/30 text-cream hover:-translate-y-0.5 hover:border-brand-gold/60 hover:bg-cream/10";
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
