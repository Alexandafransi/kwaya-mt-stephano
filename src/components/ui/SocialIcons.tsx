type IconProps = { size?: number; className?: string };

export function FacebookIcon({ size = 16, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M15 8.5h2V5.5h-2c-2.2 0-4 1.8-4 4V12H9v3h2v6h3v-6h2.2l.8-3H14v-1.7c0-.7.3-1.3 1-1.3z"
        fill="currentColor"
      />
    </svg>
  );
}

export function InstagramIcon({ size = 16, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className={className}
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ size = 16, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className={className}
    >
      <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
      <path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsappIcon({ size = 16, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className={className}
    >
      <path d="M6 19l1.1-3.3A7.5 7.5 0 1 1 10 18.2z" />
      <path
        d="M9.3 9.6c.2-.5.5-.5.7-.5h.5c.2 0 .4 0 .5.4.2.4.6 1.4.6 1.5.1.1.1.3 0 .4-.1.2-.2.3-.3.4-.1.1-.3.3-.4.4-.1.1-.3.3-.1.5.2.3.7 1.1 1.5 1.7.9.7 1.4.9 1.6 1 .2.1.3.1.4-.1.1-.2.6-.7.7-.9.1-.2.3-.2.5-.1.2.1 1.3.6 1.5.7.2.1.3.2.4.3 0 .1 0 .6-.2 1.2-.2.6-1.2 1.1-1.6 1.1-.4 0-1.5-.2-2.9-1.1-1.7-1.1-2.8-3-2.9-3.1-.1-.1-.7-1-.7-1.9 0-.9.5-1.3.6-1.5z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
