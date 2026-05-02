export function GridBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden
    >
      {/* Layer 1 – dot grid */}
      <svg
        className="absolute inset-0 size-full opacity-[0.18] dark:opacity-[0.22]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dot-grid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="1"
              cy="1"
              r="1"
              fill="currentColor"
              className="text-[var(--foreground)]"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>

      {/* Layer 2 – accent radial glow (dark mode only) */}
      <div
        className="absolute inset-0 opacity-0 dark:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(45,212,191,0.13) 0%, transparent 70%)," +
            "radial-gradient(ellipse 50% 35% at 85% 90%, rgba(99,102,241,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Layer 3 – SVG noise grain */}
      <svg
        className="absolute inset-0 size-full opacity-[0.045] dark:opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}
