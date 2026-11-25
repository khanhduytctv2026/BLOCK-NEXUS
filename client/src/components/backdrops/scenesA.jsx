/**
 * Bespoke Illustrated Multi-Layer SVG Scenery — Themes 1 to 13
 * ViewBox: 0 0 800 500 (scales crisply to both Shop h-36 previews and 100dvh Gameplay)
 */

const STARS_SMALL = [
  [54, 48, 1.4], [122, 86, 1.8], [198, 38, 1.2], [268, 112, 1.6], [344, 54, 1.3],
  [412, 92, 1.9], [488, 44, 1.5], [566, 108, 1.4], [642, 52, 2.0], [728, 88, 1.3],
  [84, 184, 1.3], [164, 232, 1.7], [634, 188, 1.6], [744, 214, 1.4], [702, 144, 1.8],
  [38, 310, 1.2], [756, 332, 1.5], [220, 160, 1.1], [540, 175, 1.2], [312, 194, 1.3],
];

export function renderScenePartA(bgId, uid) {
  switch (bgId) {
    // 1. BG_DEFAULT — Deep Space Navy: tactical star-chart grid, radar rings, micro-stars
    case 'BG_DEFAULT':
      return (
        <>
          <defs>
            <radialGradient id={`${uid}_rad`} cx="50%" cy="46%" r="55%">
              <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.18" />
              <stop offset="55%" stopColor="#1e3a8a" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#070913" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="500" fill={`url(#${uid}_rad)`} />
          {/* Star-chart grid */}
          <g stroke="#00f3ff" strokeOpacity="0.1" strokeWidth="1">
            {[80, 160, 240, 320, 400, 480, 560, 640, 720].map((x) => (
              <line key={`vx${x}`} x1={x} y1="0" x2={x} y2="500" />
            ))}
            {[60, 140, 220, 300, 380, 460].map((y) => (
              <line key={`hy${y}`} x1="0" y1={y} x2="800" y2={y} />
            ))}
          </g>
          {/* Faint concentric radar rings */}
          <g fill="none" stroke="#00f3ff" strokeOpacity="0.22">
            <circle cx="400" cy="240" r="95" strokeWidth="1" strokeDasharray="6 6" />
            <circle cx="400" cy="240" r="175" strokeWidth="1.2" strokeOpacity="0.18" />
            <circle cx="400" cy="240" r="265" strokeWidth="1" strokeDasharray="12 10" strokeOpacity="0.14" />
            <line x1="400" y1="30" x2="400" y2="450" strokeOpacity="0.12" />
            <line x1="120" y1="240" x2="680" y2="240" strokeOpacity="0.12" />
          </g>
          {/* Radar sweep wedge */}
          <path
            d="M400 240 L545 135 A175 175 0 0 1 575 240 Z"
            fill="#00f3ff"
            fillOpacity="0.09"
            className="backdrop-pulse"
          />
          {/* Distant micro-stars & constellation ticks */}
          <g fill="#e0faff">
            {STARS_SMALL.map(([x, y, r], i) => (
              <circle key={i} cx={x} cy={y} r={r} fillOpacity={0.35 + (i % 4) * 0.16} />
            ))}
          </g>
          <polyline
            points="122,86 198,38 268,112 344,54"
            fill="none"
            stroke="#38bdf8"
            strokeOpacity="0.22"
            strokeWidth="1"
          />
        </>
      );

    // 2. BG_MIDNIGHT_SLATE — Obsidian Stealth: carbon-fiber hex armor + brushed titanium diagonal beams
    case 'BG_MIDNIGHT_SLATE':
      return (
        <>
          <defs>
            <pattern id={`${uid}_hex`} width="56" height="48.5" patternUnits="userSpaceOnUse">
              <polygon
                points="14,1 42,1 55,24 42,47.5 14,47.5 1,24"
                fill="none"
                stroke="#94a3b8"
                strokeOpacity="0.18"
                strokeWidth="1.2"
              />
              <polygon
                points="18,6 38,6 49,24 38,42.5 18,42.5 7,24"
                fill="#1e293b"
                fillOpacity="0.24"
              />
            </pattern>
            <linearGradient id={`${uid}_beam`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0" />
              <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="800" height="500" fill={`url(#${uid}_hex)`} />
          {/* Brushed titanium diagonal light beams */}
          <polygon points="-40,500 220,0 320,0 60,500" fill={`url(#${uid}_beam)`} />
          <polygon points="360,500 620,0 710,0 450,500" fill={`url(#${uid}_beam)`} opacity="0.65" />
          {/* Stepped stealth armor plates on corners */}
          <polygon points="0,0 210,0 165,45 0,45" fill="#0f172a" stroke="#64748b" strokeOpacity="0.45" />
          <polygon points="800,500 570,500 620,448 800,448" fill="#0f172a" stroke="#64748b" strokeOpacity="0.45" />
          <g stroke="#cbd5e1" strokeOpacity="0.3" strokeWidth="1.5">
            <line x1="28" y1="22" x2="138" y2="22" />
            <line x1="650" y1="474" x2="770" y2="474" />
          </g>
        </>
      );

    // 3. BG_DEEP_OCEAN — Mariana Abyss: underwater god-rays, bioluminescent bubbles, trench silhouettes
    case 'BG_DEEP_OCEAN':
      return (
        <>
          <defs>
            <linearGradient id={`${uid}_ray`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.34" />
              <stop offset="65%" stopColor="#0284c7" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#050b14" stopOpacity="0" />
            </linearGradient>
            <radialGradient id={`${uid}_bio`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Volumetric underwater god-rays */}
          <polygon points="150,0 245,0 130,440 20,440" fill={`url(#${uid}_ray)`} />
          <polygon points="340,0 455,0 410,480 265,480" fill={`url(#${uid}_ray)`} />
          <polygon points="560,0 645,0 760,450 640,450" fill={`url(#${uid}_ray)`} />
          {/* Deep ocean trench rock silhouettes */}
          <path
            d="M0 500 L0 330 L95 365 L175 425 L260 475 L540 475 L625 415 L715 350 L800 315 L800 500 Z"
            fill="#020812"
          />
          <path
            d="M0 500 L0 390 L130 435 L230 500 Z M575 500 L680 420 L800 375 L800 500 Z"
            fill="#071a2f"
            fillOpacity="0.85"
          />
          {/* Rising bioluminescent bubbles & deep sea plankton */}
          <g className="backdrop-drift">
            {[
              [96, 290, 9], [148, 215, 5], [186, 345, 7], [248, 175, 4], [584, 240, 8],
              [638, 162, 5], [685, 295, 10], [728, 210, 6], [420, 140, 4], [362, 310, 6],
            ].map(([cx, cy, r], i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r={r * 2.2} fill={`url(#${uid}_bio)`} opacity="0.35" />
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="#38bdf8"
                  fillOpacity="0.22"
                  stroke="#bae6fd"
                  strokeOpacity="0.7"
                  strokeWidth="1.2"
                />
                <circle cx={cx - r * 0.3} cy={cy - r * 0.3} r={r * 0.25} fill="#ffffff" fillOpacity="0.85" />
              </g>
            ))}
          </g>
        </>
      );

    // 4. BG_EMERALD_SHADOW — Matrix Terminal: vertical digital code columns, circuit traces, emerald nodes
    case 'BG_EMERALD_SHADOW':
      return (
        <>
          <defs>
            <linearGradient id={`${uid}_col`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
              <stop offset="70%" stopColor="#10b981" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          {/* Cascading digital code columns */}
          <g>
            {[45, 98, 152, 215, 276, 338, 462, 528, 594, 656, 712, 762].map((x, i) => {
              const h = 140 + ((i * 53) % 210);
              const y = ((i * 41) % 130);
              return (
                <g key={x}>
                  <rect x={x} y={y} width="3" height={h} fill={`url(#${uid}_col)`} />
                  <rect x={x - 1} y={y + h - 4} width="5" height="5" fill="#d1fae5" />
                  {[0.2, 0.45, 0.72].map((f, j) => (
                    <rect
                      key={j}
                      x={x - 4}
                      y={y + h * f}
                      width="11"
                      height="2"
                      fill="#34d399"
                      fillOpacity="0.35"
                    />
                  ))}
                </g>
              );
            })}
          </g>
          {/* Circuit-board traces */}
          <g fill="none" stroke="#10b981" strokeOpacity="0.42" strokeWidth="1.8">
            <polyline points="0,390 95,390 135,350 225,350" />
            <polyline points="0,445 140,445 185,400 280,400" />
            <polyline points="800,375 700,375 655,330 570,330" />
            <polyline points="800,435 640,435 595,390 520,390" />
            <polyline points="0,95 110,95 145,130" />
            <polyline points="800,105 690,105 650,145" />
          </g>
          {/* Glowing emerald nodes */}
          {[
            [225, 350], [280, 400], [570, 330], [520, 390], [145, 130], [650, 145],
          ].map(([cx, cy], idx) => (
            <g key={idx}>
              <circle cx={cx} cy={cy} r="9" fill="#10b981" fillOpacity="0.22" />
              <circle cx={cx} cy={cy} r="4" fill="#6ee7b7" />
            </g>
          ))}
        </>
      );

    // 5. BG_CRIMSON_DUSK — Velvet Eclipse: giant dark red sun behind jagged obsidian peaks + drifting embers
    case 'BG_CRIMSON_DUSK':
      return (
        <>
          <defs>
            <radialGradient id={`${uid}_sun`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="55%" stopColor="#be123c" />
              <stop offset="100%" stopColor="#4c0519" />
            </radialGradient>
            <radialGradient id={`${uid}_halo`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#4c0519" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Giant crimson sun */}
          <circle cx="545" cy="195" r="200" fill={`url(#${uid}_halo)`} />
          <circle cx="545" cy="195" r="108" fill={`url(#${uid}_sun)`} />
          {/* Distant smoky ridge */}
          <polygon
            points="0,500 0,340 120,255 245,335 375,230 510,325 650,245 800,330 800,500"
            fill="#22060f"
          />
          {/* Jagged obsidian foreground mountain peaks */}
          <polygon
            points="0,500 0,395 95,305 185,390 295,285 400,405 515,315 620,395 725,290 800,365 800,500"
            fill="#090306"
            stroke="#fb7185"
            strokeOpacity="0.26"
            strokeWidth="1.2"
          />
          {/* Drifting embers */}
          <g className="backdrop-drift">
            {[
              [88, 220, 3], [164, 175, 2.5], [248, 265, 3.5], [332, 160, 2], [440, 290, 3],
              [628, 240, 2.8], [712, 175, 3.2], [758, 260, 2.2], [510, 120, 2.5], [202, 345, 2.6],
            ].map(([cx, cy, r], i) => (
              <circle key={i} cx={cx} cy={cy} r={r} fill={i % 2 === 0 ? '#fda4af' : '#fb923c'} />
            ))}
          </g>
        </>
      );

    // 6. BG_CYBER_GRID — Cyberpunk Tokyo: 3D synth-grid floor, skyscraper skyline with lit windows, neon rain
    case 'BG_CYBER_GRID':
      return (
        <>
          <defs>
            <linearGradient id={`${uid}_floor`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#090d16" stopOpacity="1" />
            </linearGradient>
            <linearGradient id={`${uid}_glow`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff2e93" stopOpacity="0" />
              <stop offset="100%" stopColor="#ff2e93" stopOpacity="0.45" />
            </linearGradient>
          </defs>
          {/* Horizon glow */}
          <rect x="0" y="210" width="800" height="125" fill={`url(#${uid}_glow)`} />
          {/* Distant cyberpunk skyscraper skyline */}
          <g fill="#0c0f24" stroke="#6366f1" strokeOpacity="0.4" strokeWidth="1">
            {[
              [18, 175, 58, 160], [82, 120, 64, 215], [154, 190, 48, 145], [210, 145, 68, 190],
              [288, 205, 52, 130], [458, 195, 56, 140], [522, 130, 70, 205], [600, 170, 58, 165],
              [666, 110, 66, 225], [740, 165, 48, 170],
            ].map(([x, y, w, h], idx) => (
              <g key={idx}>
                <rect x={x} y={y} width={w} height={h} />
                {/* Lit neon windows */}
                {[0, 1, 2, 3, 4].map((row) => (
                  <rect
                    key={row}
                    x={x + 8}
                    y={y + 14 + row * 22}
                    width={w - 16}
                    height="5"
                    fill={row % 2 === 0 ? '#00f3ff' : '#ff2e93'}
                    fillOpacity={0.35 + ((idx + row) % 3) * 0.2}
                    stroke="none"
                  />
                ))}
              </g>
            ))}
          </g>
          {/* 3D Perspective Neon Synth-Grid Floor */}
          <rect x="0" y="335" width="800" height="165" fill={`url(#${uid}_floor)`} />
          <line x1="0" y1="335" x2="800" y2="335" stroke="#00f3ff" strokeWidth="2" />
          <g stroke="#00f3ff" strokeOpacity="0.45" strokeWidth="1.2">
            {[-420, -280, -160, -60, 40, 140, 240, 340, 460, 600, 740, 860, 980, 1120, 1240].map((bx) => (
              <line key={bx} x1="400" y1="335" x2={bx} y2="500" />
            ))}
            {[350, 368, 390, 418, 452, 492].map((hy) => (
              <line key={hy} x1="0" y1={hy} x2="800" y2={hy} stroke="#ff2e93" strokeOpacity="0.48" />
            ))}
          </g>
          {/* Vertical neon rain streaks */}
          <g stroke="#00f3ff" strokeOpacity="0.45" strokeWidth="1.2">
            {[60, 142, 235, 345, 448, 558, 645, 738].map((rx, i) => (
              <line key={rx} x1={rx} y1={25 + (i % 3) * 35} x2={rx} y2={85 + (i % 3) * 35} />
            ))}
          </g>
        </>
      );

    // 7. BG_SYNTHWAVE_84 — Retro striped sunset sun, wireframe mountains, magenta perspective grid
    case 'BG_SYNTHWAVE_84':
      return (
        <>
          <defs>
            <linearGradient id={`${uid}_retroSun`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="48%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#c026d3" />
            </linearGradient>
            <clipPath id={`${uid}_sunClip`}>
              <circle cx="400" cy="245" r="122" />
            </clipPath>
          </defs>
          {/* Retro horizontal-striped sunset sun */}
          <g clipPath={`url(#${uid}_sunClip)`}>
            <rect x="275" y="120" width="250" height="250" fill={`url(#${uid}_retroSun)`} />
            {[232, 250, 267, 283, 298, 312, 325, 338].map((sy, idx) => (
              <rect key={sy} x="270" y={sy} width="260" height={4 + idx * 1.4} fill="#2e1065" />
            ))}
          </g>
          {/* Wireframe mountain horizon */}
          <polygon
            points="0,335 90,235 175,305 255,215 340,335 465,335 550,220 630,295 720,235 800,335"
            fill="#14062b"
            stroke="#e879f9"
            strokeWidth="1.6"
          />
          <g stroke="#e879f9" strokeOpacity="0.35" strokeWidth="1">
            <line x1="90" y1="235" x2="115" y2="335" />
            <line x1="255" y1="215" x2="235" y2="335" />
            <line x1="550" y1="220" x2="575" y2="335" />
            <line x1="720" y1="235" x2="695" y2="335" />
          </g>
          {/* Glowing magenta perspective grid */}
          <rect x="0" y="335" width="800" height="165" fill="#120526" />
          <line x1="0" y1="335" x2="800" y2="335" stroke="#f0abfc" strokeWidth="2.2" />
          <g stroke="#e879f9" strokeOpacity="0.55" strokeWidth="1.2">
            {[-350, -180, -40, 80, 200, 300, 400, 500, 600, 720, 840, 980, 1150].map((gx) => (
              <line key={gx} x1="400" y1="335" x2={gx} y2="500" />
            ))}
            {[352, 372, 396, 426, 462].map((gy) => (
              <line key={gy} x1="0" y1={gy} x2="800" y2={gy} />
            ))}
          </g>
        </>
      );

    // 8. BG_ELECTRIC_PULSE — Volt Overdrive: Tesla coil arcs, jagged cyan lightning, concentric energy shockwaves
    case 'BG_ELECTRIC_PULSE':
      return (
        <>
          <defs>
            <radialGradient id={`${uid}_core`} cx="50%" cy="45%" r="48%">
              <stop offset="0%" stopColor="#67f8ff" stopOpacity="0.45" />
              <stop offset="55%" stopColor="#0891b2" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#060b19" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="500" fill={`url(#${uid}_core)`} />
          {/* Concentric energy shockwaves */}
          <g fill="none" stroke="#00f3ff" className="backdrop-pulse">
            <circle cx="400" cy="240" r="78" strokeOpacity="0.45" strokeWidth="2" />
            <circle cx="400" cy="240" r="145" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="16 8" />
            <circle cx="400" cy="240" r="225" strokeOpacity="0.2" strokeWidth="1.2" />
            <circle cx="400" cy="240" r="315" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="10 14" />
          </g>
          {/* Jagged cyan high-voltage lightning bolts */}
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline
              points="0,115 95,148 145,112 230,178 295,165 375,232"
              stroke="#00f3ff"
              strokeWidth="4"
              strokeOpacity="0.4"
            />
            <polyline
              points="0,115 95,148 145,112 230,178 295,165 375,232"
              stroke="#e0faff"
              strokeWidth="1.8"
            />
            <polyline
              points="800,135 705,165 645,122 555,195 495,182 425,238"
              stroke="#00f3ff"
              strokeWidth="4"
              strokeOpacity="0.4"
            />
            <polyline
              points="800,135 705,165 645,122 555,195 495,182 425,238"
              stroke="#e0faff"
              strokeWidth="1.8"
            />
            <polyline
              points="110,500 185,405 245,425 320,335 385,260"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeOpacity="0.7"
            />
            <polyline
              points="695,500 610,395 555,418 485,325 415,260"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeOpacity="0.7"
            />
          </g>
          {/* Tesla core flash */}
          <circle cx="400" cy="240" r="24" fill="#67f8ff" fillOpacity="0.28" />
          <circle cx="400" cy="240" r="9" fill="#ffffff" />
        </>
      );

    // 9. BG_TOXIC_NEON — Biohazard Lab: glowing containment reactor rings, radioactive particles, hazard chevrons
    case 'BG_TOXIC_NEON':
      return (
        <>
          <defs>
            <pattern id={`${uid}_haz`} width="40" height="24" patternUnits="userSpaceOnUse">
              <polygon points="0,24 16,0 28,0 12,24" fill="#a3e635" fillOpacity="0.32" />
            </pattern>
            <radialGradient id={`${uid}_tox`} cx="50%" cy="52%" r="48%">
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#070c06" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="500" fill={`url(#${uid}_tox)`} />
          {/* Industrial hazard chevron strips top & bottom */}
          <rect x="0" y="0" width="800" height="20" fill={`url(#${uid}_haz)`} />
          <rect x="0" y="480" width="800" height="20" fill={`url(#${uid}_haz)`} />
          <line x1="0" y1="20" x2="800" y2="20" stroke="#a3e635" strokeOpacity="0.45" />
          <line x1="0" y1="480" x2="800" y2="480" stroke="#a3e635" strokeOpacity="0.45" />
          {/* Glowing containment reactor rings */}
          <g fill="none" stroke="#a3e635" className="backdrop-spin">
            <circle cx="400" cy="255" r="140" strokeWidth="6" strokeDasharray="52 36" strokeOpacity="0.35" />
            <circle cx="400" cy="255" r="95" strokeWidth="2.5" strokeDasharray="24 14" strokeOpacity="0.58" />
            <circle cx="400" cy="255" r="195" strokeWidth="1.5" strokeDasharray="8 16" strokeOpacity="0.28" />
          </g>
          {/* Floating radioactive spores */}
          <g className="backdrop-drift" fill="#bef264">
            {[
              [120, 145, 5], [185, 345, 7], [250, 210, 4], [585, 165, 6], [660, 320, 8],
              [718, 225, 4.5], [105, 415, 5], [610, 410, 5.5],
            ].map(([cx, cy, r], i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r={r * 2.1} fill="#84cc16" fillOpacity="0.22" />
                <circle cx={cx} cy={cy} r={r} />
              </g>
            ))}
          </g>
        </>
      );

    // 10. BG_VIOLET_STORM — Ultraviolet Surge: swirling nebula vortex clouds + crackling violet arc-lightning
    case 'BG_VIOLET_STORM':
      return (
        <>
          <defs>
            <radialGradient id={`${uid}_v1`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.42" />
              <stop offset="60%" stopColor="#7e22ce" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#090514" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Swirling nebula vortex clouds */}
          <ellipse cx="260" cy="190" rx="260" ry="135" transform="rotate(-18 260 190)" fill={`url(#${uid}_v1)`} />
          <ellipse cx="560" cy="310" rx="280" ry="145" transform="rotate(15 560 310)" fill={`url(#${uid}_v1)`} />
          <g fill="none" stroke="#d8b4fe" strokeOpacity="0.24" strokeWidth="2">
            <path d="M120 340 C240 160, 520 120, 690 250" />
            <path d="M80 260 C260 390, 540 360, 740 170" />
            <path d="M190 95 C380 205, 450 320, 640 420" strokeOpacity="0.18" />
          </g>
          {/* Crackling violet arc-lightning */}
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="80,60 170,135 145,168 250,240" stroke="#e879f9" strokeWidth="3.2" strokeOpacity="0.5" />
            <polyline points="80,60 170,135 145,168 250,240" stroke="#ffffff" strokeWidth="1.4" />
            <polyline points="735,95 635,170 662,210 545,295" stroke="#c084fc" strokeWidth="3.2" strokeOpacity="0.5" />
            <polyline points="735,95 635,170 662,210 545,295" stroke="#ffffff" strokeWidth="1.4" />
          </g>
        </>
      );

    // 11. BG_MIAMI_NIGHTS — Palm tree silhouettes, dual cyan/pink neon light bars, Art Deco sunbeams
    case 'BG_MIAMI_NIGHTS':
      return (
        <>
          <defs>
            <linearGradient id={`${uid}_deco`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>
          {/* Art Deco radial sunbeams */}
          <g stroke="#f43f5e" strokeOpacity="0.16" strokeWidth="2">
            {[-60, -40, -20, 0, 20, 40, 60].map((deg) => (
              <line
                key={deg}
                x1="400"
                y1="440"
                x2={400 + Math.sin((deg * Math.PI) / 180) * 520}
                y2={440 - Math.cos((deg * Math.PI) / 180) * 520}
              />
            ))}
          </g>
          {/* Dual Cyan/Pink Neon Light Bars & Diamond Frame */}
          <polygon
            points="400,55 595,250 400,445 205,250"
            fill="none"
            stroke={`url(#${uid}_deco)`}
            strokeWidth="3.5"
            strokeOpacity="0.72"
          />
          <rect x="40" y="95" width="6" height="280" fill="#00f3ff" fillOpacity="0.7" />
          <rect x="56" y="135" width="3" height="220" fill="#ff2e93" fillOpacity="0.65" />
          <rect x="754" y="95" width="6" height="280" fill="#ff2e93" fillOpacity="0.7" />
          <rect x="741" y="135" width="3" height="220" fill="#00f3ff" fillOpacity="0.65" />
          {/* Left & Right Palm Tree Silhouettes */}
          <g fill="#050711">
            {/* Left palm */}
            <path d="M95 500 Q118 370 150 265 L164 268 Q135 375 120 500 Z" />
            <path d="M155 268 Q95 235 45 268 Q102 258 152 276 Z" />
            <path d="M156 266 Q110 202 68 205 Q122 222 152 270 Z" />
            <path d="M158 265 Q172 195 225 198 Q188 220 162 270 Z" />
            <path d="M158 268 Q215 232 258 262 Q208 256 160 278 Z" />
            {/* Right palm */}
            <path d="M705 500 Q682 370 650 265 L636 268 Q665 375 680 500 Z" />
            <path d="M645 268 Q705 235 755 268 Q698 258 648 276 Z" />
            <path d="M644 266 Q690 202 732 205 Q678 222 648 270 Z" />
            <path d="M642 265 Q628 195 575 198 Q612 220 638 270 Z" />
            <path d="M642 268 Q585 232 542 262 Q592 256 640 278 Z" />
          </g>
        </>
      );

    // 12. BG_DEEP_COSMOS — Tinh Vân Orion: translucent nebula clouds, 4-point star clusters, ringed gas giant
    case 'BG_DEEP_COSMOS':
      return (
        <>
          <defs>
            <radialGradient id={`${uid}_neb1`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`${uid}_planet`} cx="35%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#ddd6fe" />
              <stop offset="45%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </radialGradient>
          </defs>
          {/* Multi-layered translucent nebula clouds */}
          <ellipse cx="220" cy="290" rx="280" ry="150" transform="rotate(-14 220 290)" fill={`url(#${uid}_neb1)`} />
          <ellipse cx="590" cy="180" rx="260" ry="135" transform="rotate(18 590 180)" fill={`url(#${uid}_neb1)`} />
          {/* Distant Ringed Gas Giant */}
          <g transform="translate(615, 165)">
            <ellipse cx="0" cy="0" rx="115" ry="26" transform="rotate(-18)" fill="none" stroke="#c4b5fd" strokeOpacity="0.52" strokeWidth="6" />
            <circle cx="0" cy="0" r="54" fill={`url(#${uid}_planet)`} />
            <path d="M-108,35 A115,26 -18 0 0 108,-35" fill="none" stroke="#e9d5ff" strokeOpacity="0.82" strokeWidth="4" />
          </g>
          {/* Twinkling 4-point star clusters */}
          {[
            [140, 120, 12], [245, 80, 8], [320, 165, 10], [110, 340, 9], [690, 360, 11], [480, 95, 7],
          ].map(([x, y, s], i) => (
            <path
              key={i}
              d={`M${x} ${y - s} L${x + s * 0.22} ${y - s * 0.22} L${x + s} ${y} L${x + s * 0.22} ${y + s * 0.22} L${x} ${y + s} L${x - s * 0.22} ${y + s * 0.22} L${x - s} ${y} L${x - s * 0.22} ${y - s * 0.22} Z`}
              fill="#f5f3ff"
              className="backdrop-pulse"
            />
          ))}
          <g fill="#e2e8f0">
            {STARS_SMALL.map(([x, y, r], i) => (
              <circle key={i} cx={x} cy={y} r={r} fillOpacity="0.65" />
            ))}
          </g>
        </>
      );

    // 13. BG_AURORA_NEBULA — Cực Quang Bắc Cực: wavy emerald/teal aurora curtains + snowy mountains + stars
    case 'BG_AURORA_NEBULA':
      return (
        <>
          <defs>
            <linearGradient id={`${uid}_aur1`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0" />
              <stop offset="35%" stopColor="#10b981" stopOpacity="0.58" />
              <stop offset="78%" stopColor="#06b6d4" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#040711" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`${uid}_aur2`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0" />
              <stop offset="45%" stopColor="#34d399" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#040711" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Starry Arctic sky */}
          <g fill="#ecfeff">
            {STARS_SMALL.map(([x, y, r], i) => (
              <circle key={i} cx={x} cy={y * 0.85} r={r} fillOpacity="0.6" />
            ))}
          </g>
          {/* Wavy translucent Aurora Borealis curtains */}
          <path
            d="M-20 140 Q150 45 310 135 T650 110 T820 155 L820 320 Q640 245 480 305 T160 275 L-20 315 Z"
            fill={`url(#${uid}_aur1)`}
            className="backdrop-pulse"
          />
          <path
            d="M-20 90 Q190 155 390 75 T820 120 L820 260 Q610 195 390 250 T-20 225 Z"
            fill={`url(#${uid}_aur2)`}
          />
          {/* Sharp snowy mountain silhouettes */}
          <polygon
            points="0,500 0,385 115,285 215,375 340,260 455,380 575,275 695,365 800,305 800,500"
            fill="#06121c"
          />
          {/* Snow highlights on ridges */}
          <g fill="#a7f3d0" fillOpacity="0.25">
            <polygon points="115,285 152,320 118,318 92,332" />
            <polygon points="340,260 382,304 344,300 312,315" />
            <polygon points="575,275 618,314 580,312 548,325" />
          </g>
        </>
      );

    default:
      return null;
  }
}
