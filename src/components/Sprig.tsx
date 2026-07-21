export default function Sprig({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.9">
        <path d="M60 118 C60 90 60 70 60 40" />
        <path d="M60 92 C44 86 36 74 34 60" />
        <path d="M60 92 C76 86 84 74 86 60" />
        <path d="M60 72 C48 68 42 58 40 48" />
        <path d="M60 72 C72 68 78 58 80 48" />
      </g>
      <g fill={color} opacity="0.85">
        <ellipse cx="34" cy="56" rx="8" ry="13" transform="rotate(-28 34 56)" />
        <ellipse cx="86" cy="56" rx="8" ry="13" transform="rotate(28 86 56)" />
        <ellipse cx="40" cy="44" rx="6.5" ry="10.5" transform="rotate(-22 40 44)" />
        <ellipse cx="80" cy="44" rx="6.5" ry="10.5" transform="rotate(22 80 44)" />
        <circle cx="60" cy="36" r="6.5" />
      </g>
    </svg>
  );
}
