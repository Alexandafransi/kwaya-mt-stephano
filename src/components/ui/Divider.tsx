export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden>
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-brand-gold/70 sm:w-24" />
      <span className="h-2 w-2 rotate-45 border border-brand-gold/80" />
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-brand-gold/70 sm:w-24" />
    </div>
  );
}
