const PALETTE = [
  "bg-brand-orange",
  "bg-brand-gold",
  "bg-ink-soft",
  "bg-brand-orange-dark",
];

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function Avatar({ name, className = "" }: { name: string; className?: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const color = PALETTE[hashString(name) % PALETTE.length];

  return (
    <div
      className={`flex items-center justify-center rounded-full font-serif-display font-semibold text-white ${color} ${className}`}
      aria-hidden
    >
      {initials}
    </div>
  );
}
