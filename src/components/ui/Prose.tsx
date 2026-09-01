export function Prose({ text, className = "" }: { text: string; className?: string }) {
  const paragraphs = text.split(/\n+/).filter(Boolean);
  return (
    <div className={`space-y-4 text-base leading-relaxed text-content-soft/80 ${className}`}>
      {paragraphs.map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  );
}
