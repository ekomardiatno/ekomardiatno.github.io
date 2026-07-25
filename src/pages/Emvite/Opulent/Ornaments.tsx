/** Floating gold particles — rendered once, fixed position */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 53 + 7) % 95}%`,
  delay: `${(i * 1.9) % 14}s`,
  duration: `${10 + ((i * 3) % 8)}s`,
  size: 2 + (i % 3),
}));

export function GoldParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="gold-particle"
          style={{
            left: p.left,
            bottom: '-5px',
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}

/** SVG ornate divider — horizontal flourish */
export function OrnamentDivider({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 24"
      fill="none"
      className={`w-48 md:w-56 mx-auto ${className}`}
    >
      {/* Left scroll */}
      <path
        d="M60 12 Q40 4 20 12 Q10 16 4 12"
        stroke="#b8860b"
        strokeWidth="0.8"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M60 12 Q40 20 20 12"
        stroke="#d4af37"
        strokeWidth="0.5"
        fill="none"
        opacity="0.4"
      />
      {/* Center diamond */}
      <path
        d="M112 4 L120 12 L128 4"
        stroke="#b8860b"
        strokeWidth="0.8"
        fill="none"
      />
      <path
        d="M112 20 L120 12 L128 20"
        stroke="#b8860b"
        strokeWidth="0.8"
        fill="none"
      />
      <circle cx="120" cy="12" r="2" fill="#d4af37" />
      {/* Right scroll */}
      <path
        d="M180 12 Q200 4 220 12 Q230 16 236 12"
        stroke="#b8860b"
        strokeWidth="0.8"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M180 12 Q200 20 220 12"
        stroke="#d4af37"
        strokeWidth="0.5"
        fill="none"
        opacity="0.4"
      />
      {/* Connecting lines */}
      <line x1="60" y1="12" x2="112" y2="12" stroke="#b8860b" strokeWidth="0.4" opacity="0.3" />
      <line x1="128" y1="12" x2="180" y2="12" stroke="#b8860b" strokeWidth="0.4" opacity="0.3" />
      {/* Small dots */}
      <circle cx="75" cy="12" r="1" fill="#d4af37" opacity="0.5" />
      <circle cx="165" cy="12" r="1" fill="#d4af37" opacity="0.5" />
    </svg>
  );
}

/** SVG corner ornament for frames */
export function CornerOrnament({
  position,
  visible = true,
}: {
  position: 'tl' | 'tr' | 'bl' | 'br';
  visible?: boolean;
}) {
  const transforms: Record<string, string> = {
    tl: '',
    tr: 'scaleX(-1)',
    bl: 'scaleY(-1)',
    br: 'scale(-1)',
  };
  const positions: Record<string, React.CSSProperties> = {
    tl: { top: -6, left: -6 },
    tr: { top: -6, right: -6 },
    bl: { bottom: -6, left: -6 },
    br: { bottom: -6, right: -6 },
  };

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className="absolute w-8 h-8 transition-opacity duration-700"
      style={{
        ...positions[position],
        transform: transforms[position],
        opacity: visible ? 1 : 0,
        pointerEvents: 'none',
      }}
    >
      <path d="M4 4 L4 18" stroke="#b8860b" strokeWidth="1.2" />
      <path d="M4 4 L18 4" stroke="#b8860b" strokeWidth="1.2" />
      <circle cx="4" cy="4" r="2" fill="#d4af37" />
      <path d="M4 4 Q4 10 10 10" stroke="#d4af37" strokeWidth="0.6" opacity="0.5" />
    </svg>
  );
}

/** Small sparkle dots that twinkle around a frame */
export function SparkleDots() {
  const dots = [
    { top: '5%', right: '-8px', delay: '0s' },
    { top: '40%', left: '-8px', delay: '0.7s' },
    { bottom: '15%', right: '-6px', delay: '1.4s' },
    { top: '-6px', left: '30%', delay: '2.1s' },
    { bottom: '-6px', right: '25%', delay: '0.5s' },
  ];

  return (
    <>
      {dots.map((d, i) => (
        <div
          key={i}
          className="sparkle-dot"
          style={{ ...d, animationDelay: d.delay } as React.CSSProperties}
        />
      ))}
    </>
  );
}
