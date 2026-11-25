import { useId } from 'react';

/**
 * Bespoke Multi-Layer Tactical Sci-Fi / Arcade HUD SVG Icon System for BLOCK NEXUS
 * Handcrafted geometric bevels, metallic gradients, dual-tone fillOpacity depth, and 1.5px precision strokes.
 */

export function NexusLogoMark({ className = 'w-14 h-14' }) {
  const uid = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}_cTop`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#67f8ff" />
          <stop offset="100%" stopColor="#00c4d6" />
        </linearGradient>
        <linearGradient id={`${uid}_cSide`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#083344" />
        </linearGradient>
        <linearGradient id={`${uid}_aTop`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id={`${uid}_aSide`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        <linearGradient id={`${uid}_pTop`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e879f9" />
          <stop offset="100%" stopColor="#9333ea" />
        </linearGradient>
        <linearGradient id={`${uid}_pSide`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7e22ce" />
          <stop offset="100%" stopColor="#3b0764" />
        </linearGradient>
      </defs>

      {/* Outer Octagonal Tactical Frame */}
      <polygon
        points="18,3 46,3 61,18 61,46 46,61 18,61 3,46 3,18"
        fill="#070c1a"
        fillOpacity="0.9"
        stroke="#00f3ff"
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />
      <polygon
        points="20,6 44,6 58,20 58,44 44,58 20,58 6,44 6,20"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.1"
        strokeWidth="1"
      />

      {/* Top Isometric Cube (Cyan) */}
      <polygon points="32,10 44,17 32,24 20,17" fill={`url(#${uid}_cTop)`} />
      <polygon points="20,17 32,24 32,36 20,29" fill={`url(#${uid}_cSide)`} />
      <polygon points="44,17 32,24 32,36 44,29" fill="#00f3ff" fillOpacity="0.32" />
      <polyline points="20,17 32,24 44,17" stroke="#e0faff" strokeWidth="1.2" strokeOpacity="0.85" />

      {/* Bottom-Left Isometric Cube (Amber Gold) */}
      <polygon points="20,29 32,36 20,43 8,36" fill={`url(#${uid}_aTop)`} />
      <polygon points="8,36 20,43 20,54 8,47" fill={`url(#${uid}_aSide)`} />
      <polygon points="32,36 20,43 20,54 32,47" fill="#f59e0b" fillOpacity="0.48" />
      <polyline points="8,36 20,43 32,36" stroke="#fef3c7" strokeWidth="1.2" strokeOpacity="0.85" />

      {/* Bottom-Right Isometric Cube (Electric Violet) */}
      <polygon points="44,29 56,36 44,43 32,36" fill={`url(#${uid}_pTop)`} />
      <polygon points="32,36 44,43 44,54 32,47" fill={`url(#${uid}_pSide)`} />
      <polygon points="56,36 44,43 44,54 56,47" fill="#c084fc" fillOpacity="0.35" />
      <polyline points="32,36 44,43 56,36" stroke="#f5d0fe" strokeWidth="1.2" strokeOpacity="0.85" />

      {/* Center Nexus Core Diamond */}
      <polygon
        points="32,29 37,33 32,37 27,33"
        fill="#ffffff"
        stroke="#00f3ff"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function ModeDragIcon({ className = 'w-14 h-14' }) {
  const uid = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}_cyan`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#67f8ff" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id={`${uid}_amber`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* Chamfered 3x3 Tactical Matrix Backplate */}
      <polygon
        points="8,2 62,2 62,56 56,62 2,62 2,8"
        fill="#080e1e"
        stroke="#00f3ff"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />

      {/* Recessed 3x3 Matrix Slots */}
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => (
          <rect
            key={`${r}_${c}`}
            x={9 + c * 16}
            y={9 + r * 16}
            width="13"
            height="13"
            rx="1.5"
            fill="#111a30"
            stroke="#334155"
            strokeWidth="1"
          />
        ))
      )}

      {/* Pre-placed Amber Anchor Block at bottom-right */}
      <rect x="41" y="41" width="13" height="13" rx="1.5" fill={`url(#${uid}_amber)`} />
      <polygon points="41,41 54,41 51,44 44,44 44,51 41,54" fill="#ffffff" fillOpacity="0.4" />
      <polygon points="54,41 54,54 41,54 44,51 51,51 51,44" fill="#000000" fillOpacity="0.35" />

      {/* Snapping Glowing L-Tetromino (shifted slightly up-left for dynamic snap feel) */}
      <g transform="translate(-1.5, -1.5)">
        {[
          [9, 9],
          [9, 25],
          [9, 41],
          [25, 41],
        ].map(([x, y], idx) => (
          <g key={idx}>
            <rect
              x={x}
              y={y}
              width="13"
              height="13"
              rx="1.5"
              fill={`url(#${uid}_cyan)`}
              stroke="#a5f3fc"
              strokeWidth="1"
            />
            <polygon
              points={`${x},${y} ${x + 13},${y} ${x + 10},${y + 3} ${x + 3},${y + 3} ${x + 3},${y + 10} ${x},${y + 13}`}
              fill="#ffffff"
              fillOpacity="0.42"
            />
            <polygon
              points={`${x + 13},${y} ${x + 13},${y + 13} ${x},${y + 13} ${x + 3},${y + 10} ${x + 10},${y + 10} ${x + 10},${y + 3}`}
              fill="#000000"
              fillOpacity="0.36"
            />
          </g>
        ))}
      </g>

      {/* Precision Snap Crosshair at Top-Right Target */}
      <path d="M44 15.5H51M47.5 12V19" stroke="#00f3ff" strokeWidth="1.5" strokeOpacity="0.85" />
    </svg>
  );
}

export function ModeDropIcon({ className = 'w-14 h-14' }) {
  const uid = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}_trail`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#bc13fe" stopOpacity="0" />
          <stop offset="65%" stopColor="#bc13fe" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#e879f9" stopOpacity="0.72" />
        </linearGradient>
        <linearGradient id={`${uid}_block`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0abfc" />
          <stop offset="55%" stopColor="#bc13fe" />
          <stop offset="100%" stopColor="#6b21a8" />
        </linearGradient>
      </defs>

      {/* Chamfered Chassis */}
      <polygon
        points="8,2 62,2 62,56 56,62 2,62 2,8"
        fill="#0d081d"
        stroke="#bc13fe"
        strokeOpacity="0.48"
        strokeWidth="1.5"
      />

      {/* Vertical Laser Speed-Trails */}
      <rect x="26.5" y="6" width="11" height="22" fill={`url(#${uid}_trail)`} />
      <rect x="12.5" y="12" width="11" height="28" fill={`url(#${uid}_trail)`} fillOpacity="0.75" />
      <rect x="40.5" y="12" width="11" height="28" fill={`url(#${uid}_trail)`} fillOpacity="0.75" />

      {/* Falling T-Tetromino (4 Beveled Cells) */}
      {[
        [25.5, 22],
        [11.5, 36],
        [25.5, 36],
        [39.5, 36],
      ].map(([x, y], idx) => (
        <g key={idx}>
          <rect
            x={x}
            y={y}
            width="13"
            height="13"
            rx="1.5"
            fill={`url(#${uid}_block)`}
            stroke="#f5d0fe"
            strokeWidth="1"
          />
          <polygon
            points={`${x},${y} ${x + 13},${y} ${x + 10},${y + 3} ${x + 3},${y + 3} ${x + 3},${y + 10} ${x},${y + 13}`}
            fill="#ffffff"
            fillOpacity="0.4"
          />
          <polygon
            points={`${x + 13},${y} ${x + 13},${y + 13} ${x},${y + 13} ${x + 3},${y + 10} ${x + 10},${y + 10} ${x + 10},${y + 3}`}
            fill="#000000"
            fillOpacity="0.38"
          />
        </g>
      ))}

      {/* Impact Laser Horizon & Sparks */}
      <line x1="9" y1="53" x2="55" y2="53" stroke="#00f3ff" strokeWidth="1.5" strokeOpacity="0.85" />
      <path d="M16 56L13 59M32 56V60M48 56L51 59" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export function TrophyHexIcon({ className = 'w-6 h-6' }) {
  const uid = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}_gold`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>
      <polygon
        points="16,2 28,9 28,23 16,30 4,23 4,9"
        fill="#f59e0b"
        fillOpacity="0.16"
        stroke={`url(#${uid}_gold)`}
        strokeWidth="1.5"
      />
      <path
        d="M11 9H21V14.5C21 17.5 18.8 19.5 16 19.5C13.2 19.5 11 17.5 11 14.5V9Z"
        fill={`url(#${uid}_gold)`}
      />
      <path
        d="M11 11H8.5V13.5C8.5 15 9.6 16 11 16M21 11H23.5V13.5C23.5 15 22.4 16 21 16"
        stroke="#fde68a"
        strokeWidth="1.5"
      />
      <path d="M16 19.5V23M12.5 23.5H19.5" stroke="#fde68a" strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  );
}

export function RankMedalIcon({ rank = 1, className = 'w-10 h-10' }) {
  const uid = useId().replace(/:/g, '');

  const palettes = {
    1: {
      top: '#fef08a',
      mid: '#f97316',
      bot: '#b91c1c',
      rim: '#fde047',
      core: '#7c2d12',
      text: '#fef9c3',
    },
    2: {
      top: '#f8fafc',
      mid: '#fde68a',
      bot: '#94a3b8',
      rim: '#ffffff',
      core: '#1e293b',
      text: '#ffffff',
    },
    3: {
      top: '#fdba74',
      mid: '#c2410c',
      bot: '#78350f',
      rim: '#38bdf8',
      core: '#1c1917',
      text: '#ffedd5',
    },
  };

  const p = palettes[rank] || palettes[3];

  return (
    <svg viewBox="0 0 44 44" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}_metal`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={p.top} />
          <stop offset="52%" stopColor={p.mid} />
          <stop offset="100%" stopColor={p.bot} />
        </linearGradient>
      </defs>

      {/* Rank 1 Sculpted Laurel Wings */}
      {rank === 1 && (
        <g stroke="#fde047" strokeWidth="1.4" strokeLinecap="round" fill="#f59e0b" fillOpacity="0.35">
          <path d="M9 30C4 26 3 19 6 13L10 17C8 21 8.5 25 11.5 28Z" />
          <path d="M35 30C40 26 41 19 38 13L34 17C36 21 35.5 25 32.5 28Z" />
        </g>
      )}

      {/* Rank 2 / 3 Flank Accent Chevrons */}
      {rank === 2 && (
        <g stroke="#e2e8f0" strokeWidth="1.5" strokeOpacity="0.85">
          <polyline points="8,16 4,22 8,28" />
          <polyline points="36,16 40,22 36,28" />
        </g>
      )}
      {rank === 3 && (
        <g stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.85">
          <line x1="5" y1="22" x2="9" y2="22" />
          <line x1="35" y1="22" x2="39" y2="22" />
        </g>
      )}

      {/* Hexagonal E-Sports Medal Body */}
      <polygon
        points="22,4 36,12 36,32 22,40 8,32 8,12"
        fill={`url(#${uid}_metal)`}
        stroke={p.rim}
        strokeWidth="1.6"
      />
      {/* Top Specular Bevel */}
      <polygon points="22,6 34,13 22,18 10,13" fill="#ffffff" fillOpacity="0.3" />
      {/* Inner Dark Hex Core */}
      <polygon
        points="22,10 31,15.5 31,28.5 22,34 13,28.5 13,15.5"
        fill={p.core}
        fillOpacity="0.72"
        stroke={p.rim}
        strokeOpacity="0.65"
        strokeWidth="1.1"
      />
      {/* Engraved Numeral */}
      <text
        x="22"
        y="26.5"
        textAnchor="middle"
        fill={p.text}
        fontFamily="JetBrains Mono, monospace"
        fontWeight="800"
        fontSize="14"
      >
        {rank}
      </text>
    </svg>
  );
}

export function NexusCoinIcon({ className = 'w-5 h-5' }) {
  const uid = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}_rim`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <radialGradient id={`${uid}_core`} cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#d97706" />
        </radialGradient>
      </defs>
      {/* Octagonal Metallic Token */}
      <polygon
        points="9,2 19,2 26,9 26,19 19,26 9,26 2,19 2,9"
        fill={`url(#${uid}_rim)`}
        stroke="#fef3c7"
        strokeWidth="1.2"
      />
      <polygon
        points="10.5,5 17.5,5 23,10.5 23,17.5 17.5,23 10.5,23 5,17.5 5,10.5"
        fill="#451a03"
        fillOpacity="0.58"
        stroke="#fde68a"
        strokeOpacity="0.65"
        strokeWidth="1"
      />
      {/* Glowing Energy Core Prism */}
      <polygon points="14,7.5 19.5,14 14,20.5 8.5,14" fill={`url(#${uid}_core)`} />
    </svg>
  );
}

export function ShopCoreIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
      <polygon
        points="14,2.5 24.5,8.5 24.5,19.5 14,25.5 3.5,19.5 3.5,8.5"
        fill="#bc13fe"
        fillOpacity="0.18"
        stroke="#e879f9"
        strokeWidth="1.5"
      />
      <polygon points="14,2.5 24.5,8.5 14,14.5 3.5,8.5" fill="#00f3ff" fillOpacity="0.28" />
      <polyline points="3.5,8.5 14,14.5 24.5,8.5" stroke="#67f8ff" strokeWidth="1.5" />
      <line x1="14" y1="14.5" x2="14" y2="25.5" stroke="#e879f9" strokeWidth="1.5" />
      <polygon points="14,11 17,13 14,15 11,13" fill="#ffffff" />
    </svg>
  );
}

export function GearHexIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
      <path
        d="M11.5 2.5H16.5L17.5 5.6L20.5 6.8L23.2 5.2L26 8L24.4 10.7L25.6 13.7L25.6 14.3L24.4 17.3L26 20L23.2 22.8L20.5 21.2L17.5 22.4L16.5 25.5H11.5L10.5 22.4L7.5 21.2L4.8 22.8L2 20L3.6 17.3L2.4 14.3V13.7L3.6 10.7L2 8L4.8 5.2L7.5 6.8L10.5 5.6L11.5 2.5Z"
        fill="#00f3ff"
        fillOpacity="0.16"
        stroke="#67f8ff"
        strokeWidth="1.5"
        strokeLinejoin="miter"
      />
      <polygon
        points="14,9.5 18,11.8 18,16.2 14,18.5 10,16.2 10,11.8"
        fill="#070c1a"
        stroke="#00f3ff"
        strokeWidth="1.5"
      />
      <circle cx="14" cy="14" r="1.5" fill="#ffffff" />
    </svg>
  );
}

export function FounderCrownIcon({ className = 'w-5 h-5' }) {
  const uid = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}_cr`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="55%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>
      <polygon
        points="3,20 5,8 10.5,13 14,5 17.5,13 23,8 25,20"
        fill={`url(#${uid}_cr)`}
        fillOpacity="0.88"
        stroke="#fef3c7"
        strokeWidth="1.5"
        strokeLinejoin="miter"
      />
      <rect x="4" y="21.5" width="20" height="3" fill="#f59e0b" stroke="#fef08a" strokeWidth="1" />
      <polygon points="14,12 16,15 14,18 12,15" fill="#ffffff" />
    </svg>
  );
}

/* Bespoke Tactical Utility Icons for Settings, Gameplay HUD & Controls */
export function SoundWaveIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <polygon points="3,9 8,9 14,4 14,20 8,15 3,15" fill="#00f3ff" fillOpacity="0.22" stroke="#00f3ff" strokeWidth="1.5" />
      <path d="M17 8.5L19.5 11V13L17 15.5" stroke="#67f8ff" strokeWidth="1.5" />
      <path d="M19.5 6L22 9.5V14.5L19.5 18" stroke="#00f3ff" strokeOpacity="0.65" strokeWidth="1.5" />
    </svg>
  );
}

export function BgmSynthIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="13" width="3.5" height="7" fill="#bc13fe" fillOpacity="0.35" stroke="#e879f9" strokeWidth="1.4" />
      <rect x="8.5" y="7" width="3.5" height="13" fill="#bc13fe" fillOpacity="0.5" stroke="#e879f9" strokeWidth="1.4" />
      <rect x="14" y="4" width="3.5" height="16" fill="#00f3ff" fillOpacity="0.35" stroke="#67f8ff" strokeWidth="1.4" />
      <rect x="19.5" y="10" width="2.5" height="10" fill="#bc13fe" fillOpacity="0.35" stroke="#e879f9" strokeWidth="1.4" />
    </svg>
  );
}

export function HapticPulseIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="7" y="3.5" width="10" height="17" fill="#f59e0b" fillOpacity="0.2" stroke="#fbbf24" strokeWidth="1.5" />
      <line x1="10" y1="17.5" x2="14" y2="17.5" stroke="#fde68a" strokeWidth="1.5" />
      <polyline points="4.5,7 2.5,9.5 4.5,12 2.5,14.5 4.5,17" stroke="#f59e0b" strokeWidth="1.5" />
      <polyline points="19.5,7 21.5,9.5 19.5,12 21.5,14.5 19.5,17" stroke="#f59e0b" strokeWidth="1.5" />
    </svg>
  );
}

export function HomeHexIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <polygon points="12,3 21,10 21,20 15,20 15,14 9,14 9,20 3,20 3,10" fill="#10b981" fillOpacity="0.22" stroke="#34d399" strokeWidth="1.5" />
    </svg>
  );
}

export function ReplayArcIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <polygon points="12,3 20,7.5 20,16.5 12,21 4,16.5 4,12" fill="#10b981" fillOpacity="0.14" stroke="#34d399" strokeWidth="1.5" />
      <polyline points="4,7 4,12 9,12" stroke="#6ee7b7" strokeWidth="1.6" />
      <line x1="4" y1="12" x2="9" y2="6.5" stroke="#34d399" strokeWidth="1.5" />
    </svg>
  );
}

export function SwitchModeIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="4" width="8" height="8" fill="#00f3ff" fillOpacity="0.24" stroke="#67f8ff" strokeWidth="1.5" />
      <rect x="13" y="12" width="8" height="8" fill="#bc13fe" fillOpacity="0.28" stroke="#e879f9" strokeWidth="1.5" />
      <polyline points="14,6 19,6 19,10" stroke="#34d399" strokeWidth="1.5" />
      <polyline points="10,18 5,18 5,14" stroke="#34d399" strokeWidth="1.5" />
    </svg>
  );
}

export function SlidersHexIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <line x1="3" y1="7" x2="21" y2="7" stroke="#34d399" strokeOpacity="0.5" strokeWidth="1.5" />
      <line x1="3" y1="12" x2="21" y2="12" stroke="#34d399" strokeOpacity="0.5" strokeWidth="1.5" />
      <line x1="3" y1="17" x2="21" y2="17" stroke="#34d399" strokeOpacity="0.5" strokeWidth="1.5" />
      <rect x="7" y="4.5" width="4" height="5" fill="#10b981" stroke="#a7f3d0" strokeWidth="1.2" />
      <rect x="14" y="9.5" width="4" height="5" fill="#00f3ff" stroke="#a5f3fc" strokeWidth="1.2" />
      <rect x="9" y="14.5" width="4" height="5" fill="#10b981" stroke="#a7f3d0" strokeWidth="1.2" />
    </svg>
  );
}

export function SkinPrismIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <polygon points="12,2.5 21,8 21,16 12,21.5 3,16 3,8" fill="#00f3ff" fillOpacity="0.18" stroke="#67f8ff" strokeWidth="1.5" />
      <polygon points="12,2.5 21,8 12,12 3,8" fill="#ffffff" fillOpacity="0.28" />
      <polygon points="12,12 21,8 21,16 12,21.5" fill="#0284c7" fillOpacity="0.35" />
    </svg>
  );
}

export function PauseBarsIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <polygon points="6,4 10,4 10,20 6,20" fill="#00f3ff" fillOpacity="0.28" stroke="#67f8ff" strokeWidth="1.5" />
      <polygon points="14,4 18,4 18,20 14,20" fill="#00f3ff" fillOpacity="0.28" stroke="#67f8ff" strokeWidth="1.5" />
    </svg>
  );
}

export function PlayTriIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <polygon points="5,3 17,10 5,17" fill="currentColor" />
    </svg>
  );
}

export function CloseCrossIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  );
}

export function ShieldHexIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <polygon points="12,2.5 20.5,6 20.5,13 12,21.5 3.5,13 3.5,6" fill="#00f3ff" fillOpacity="0.18" stroke="#67f8ff" strokeWidth="1.5" />
      <polyline points="8.5,12 11,14.5 16,9.5" stroke="#ffffff" strokeWidth="1.6" />
    </svg>
  );
}
