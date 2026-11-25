/**
 * Bespoke Illustrated Multi-Layer SVG Scenery — Themes 14 to 25
 * ViewBox: 0 0 800 500
 */

const GALAXY_STARS = Array.from({ length: 44 }, (_, i) => {
  const arm = i % 2;
  const t = (i / 22) * 3.1 + 0.35;
  const radius = 18 + t * 72;
  const angle = t * 1.45 + arm * Math.PI;
  return {
    x: 400 + Math.cos(angle) * radius * 1.35,
    y: 250 + Math.sin(angle) * radius * 0.52,
    r: 1.2 + (i % 3) * 0.9,
    color: i % 3 === 0 ? '#ffffff' : i % 3 === 1 ? '#93c5fd' : '#c4b5fd',
  };
});

const SAKURA_PETALS = [
  [105, 85, 18], [195, 165, -25], [268, 95, 42], [352, 195, 12], [510, 120, -35],
  [595, 185, 28], [685, 105, -18], [735, 235, 34], [148, 285, -40], [630, 310, 22],
  [445, 290, -15], [290, 330, 30],
];

export function renderScenePartB(bgId, uid) {
  switch (bgId) {
    // 14. BG_ANDROMEDA_CORE — Tilted spiral galaxy arms, luminous star-dust, radiant sapphire core
    case 'BG_ANDROMEDA_CORE':
      return (
        <>
          <defs>
            <radialGradient id={`${uid}_sapphire`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="22%" stopColor="#93c5fd" stopOpacity="0.9" />
              <stop offset="55%" stopColor="#2563eb" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#03050c" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g transform="rotate(-18 400 250)">
            {/* Outer spiral disc glow */}
            <ellipse cx="400" cy="250" rx="330" ry="125" fill={`url(#${uid}_sapphire)`} opacity="0.55" />
            {/* Spiral arms */}
            <path
              d="M400 250 C460 195, 600 185, 690 255 C610 215, 495 225, 400 250 Z"
              fill="#60a5fa"
              fillOpacity="0.32"
            />
            <path
              d="M400 250 C340 305, 200 315, 110 245 C190 285, 305 275, 400 250 Z"
              fill="#60a5fa"
              fillOpacity="0.32"
            />
            <ellipse cx="400" cy="250" rx="225" ry="78" fill="none" stroke="#93c5fd" strokeOpacity="0.28" strokeWidth="1.5" strokeDasharray="12 10" />
            {/* Orbiting star-dust particles */}
            {GALAXY_STARS.map((st, idx) => (
              <circle key={idx} cx={st.x} cy={st.y} r={st.r} fill={st.color} fillOpacity="0.82" />
            ))}
            {/* Radiant Sapphire Core */}
            <circle cx="400" cy="250" r="68" fill={`url(#${uid}_sapphire)`} />
            <circle cx="400" cy="250" r="16" fill="#ffffff" />
          </g>
        </>
      );

    // 15. BG_BLOOD_MOON — Cratered crimson full moon, drifting mist clouds, gothic spire silhouettes
    case 'BG_BLOOD_MOON':
      return (
        <>
          <defs>
            <radialGradient id={`${uid}_bmoon`} cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fca5a5" />
              <stop offset="45%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#450a0a" />
            </radialGradient>
            <radialGradient id={`${uid}_bglow`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.52" />
              <stop offset="100%" stopColor="#070305" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Crimson aura & detailed cratered full moon */}
          <circle cx="400" cy="185" r="205" fill={`url(#${uid}_bglow)`} />
          <circle cx="400" cy="185" r="105" fill={`url(#${uid}_bmoon)`} />
          <g fill="#7f1d1d" fillOpacity="0.45">
            <circle cx="362" cy="155" r="22" />
            <circle cx="436" cy="142" r="15" />
            <circle cx="422" cy="212" r="26" />
            <circle cx="355" cy="220" r="12" />
            <circle cx="395" cy="176" r="10" />
          </g>
          {/* Drifting mist clouds */}
          <g fill="#450a0a" fillOpacity="0.52" className="backdrop-drift">
            <ellipse cx="215" cy="265" rx="185" ry="26" />
            <ellipse cx="595" cy="245" rx="200" ry="28" />
          </g>
          {/* Dark Gothic spire silhouettes */}
          <path
            d="M0 500 L0 365 L52 365 L72 245 L92 365 L138 365 L154 295 L170 365 L235 420 L565 420 L625 355 L645 260 L665 355 L712 355 L736 225 L760 355 L800 355 L800 500 Z"
            fill="#070204"
            stroke="#f87171"
            strokeOpacity="0.22"
            strokeWidth="1.2"
          />
        </>
      );

    // 16. BG_CRYSTAL_CAVERN — Faceted amethyst & cyan crystal clusters jutting from corners + light refractions
    case 'BG_CRYSTAL_CAVERN':
      return (
        <>
          <defs>
            <linearGradient id={`${uid}_ame`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e879f9" />
              <stop offset="55%" stopColor="#7e22ce" />
              <stop offset="100%" stopColor="#2e1065" />
            </linearGradient>
            <linearGradient id={`${uid}_cya`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#67f8ff" />
              <stop offset="55%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#082f49" />
            </linearGradient>
          </defs>
          {/* Bottom-left crystal cluster */}
          <g stroke="#e0faff" strokeOpacity="0.45" strokeWidth="1.2">
            <polygon points="0,500 28,275 102,360 112,500" fill={`url(#${uid}_cya)`} />
            <polygon points="28,275 68,385 112,500 52,500" fill="#ffffff" fillOpacity="0.16" stroke="none" />
            <polygon points="75,500 135,325 198,410 185,500" fill={`url(#${uid}_ame)`} />
            <polygon points="0,500 0,355 55,418 45,500" fill={`url(#${uid}_ame)`} />
          </g>
          {/* Top-right crystal cluster */}
          <g stroke="#f5d0fe" strokeOpacity="0.45" strokeWidth="1.2">
            <polygon points="800,0 765,225 692,138 688,0" fill={`url(#${uid}_ame)`} />
            <polygon points="725,0 660,175 595,88 615,0" fill={`url(#${uid}_cya)`} />
            <polygon points="800,0 800,155 745,92 752,0" fill={`url(#${uid}_cya)`} />
          </g>
          {/* Bottom-right & Top-left accent shards */}
          <polygon points="800,500 710,340 655,445 690,500" fill={`url(#${uid}_cya)`} stroke="#bae6fd" strokeOpacity="0.4" />
          <polygon points="0,0 92,140 138,52 105,0" fill={`url(#${uid}_ame)`} stroke="#f5d0fe" strokeOpacity="0.4" />
          {/* Sparkling light refractions */}
          {[
            [175, 290, 10], [260, 170, 7], [565, 200, 11], [635, 340, 8], [410, 110, 6],
          ].map(([x, y, s], i) => (
            <path
              key={i}
              d={`M${x} ${y - s} L${x + 2} ${y - 2} L${x + s} ${y} L${x + 2} ${y + 2} L${x} ${y + s} L${x - 2} ${y + 2} L${x - s} ${y} L${x - 2} ${y - 2} Z`}
              fill="#ffffff"
              className="backdrop-pulse"
            />
          ))}
        </>
      );

    // 17. BG_CHERRY_NIGHT — Đêm Hoa Anh Đào: Torii gate silhouette under glowing full moon + drifting sakura petals
    case 'BG_CHERRY_NIGHT':
      return (
        <>
          <defs>
            <radialGradient id={`${uid}_cmoon`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff1f2" />
              <stop offset="68%" stopColor="#fbcfe8" />
              <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Full moon glow */}
          <circle cx="400" cy="185" r="155" fill={`url(#${uid}_cmoon)`} opacity="0.45" />
          <circle cx="400" cy="185" r="88" fill="#fdf2f8" />
          {/* Distant hills */}
          <path d="M0 500 L0 390 Q200 345 400 385 T800 375 L800 500 Z" fill="#17061c" />
          {/* Traditional Japanese Torii Gate Silhouette */}
          <g fill="#08030c" stroke="#f472b6" strokeOpacity="0.32" strokeWidth="1.2">
            {/* Curved top kasagi beam */}
            <path d="M235 258 Q400 282 565 258 L555 278 Q400 298 245 278 Z" />
            {/* Secondary nuki crossbar */}
            <rect x="275" y="302" width="250" height="16" />
            {/* Center plaque */}
            <rect x="388" y="280" width="24" height="28" />
            {/* Twin pillars */}
            <rect x="304" y="276" width="22" height="224" />
            <rect x="474" y="276" width="22" height="224" />
          </g>
          {/* Drifting pink sakura petals */}
          <g className="backdrop-drift">
            {SAKURA_PETALS.map(([x, y, rot], idx) => (
              <ellipse
                key={idx}
                cx={x}
                cy={y}
                rx="7"
                ry="3.6"
                transform={`rotate(${rot} ${x} ${y})`}
                fill={idx % 2 === 0 ? '#fbcfe8' : '#f472b6'}
                fillOpacity="0.85"
              />
            ))}
          </g>
        </>
      );

    // 18. BG_SOLAR_ECLIPSE — Nhật Thực Hoàng Kim: black moon disc eclipsing golden solar corona + lens flares
    case 'BG_SOLAR_ECLIPSE':
      return (
        <>
          <defs>
            <radialGradient id={`${uid}_cor`} cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="#fef3c7" stopOpacity="0.95" />
              <stop offset="56%" stopColor="#f59e0b" stopOpacity="0.65" />
              <stop offset="78%" stopColor="#ea580c" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`${uid}_flare`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
              <stop offset="50%" stopColor="#fef08a" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Blazing golden solar corona */}
          <circle cx="400" cy="235" r="230" fill={`url(#${uid}_cor)`} className="backdrop-pulse" />
          {/* Horizontal & diagonal lens-flare rays */}
          <rect x="30" y="232" width="740" height="6" fill={`url(#${uid}_flare)`} />
          <rect x="130" y="233" width="540" height="4" transform="rotate(-24 400 235)" fill={`url(#${uid}_flare)`} opacity="0.55" />
          <rect x="130" y="233" width="540" height="4" transform="rotate(24 400 235)" fill={`url(#${uid}_flare)`} opacity="0.55" />
          {/* Pitch-black eclipsing moon disc with bright diamond-ring rim */}
          <circle cx="400" cy="235" r="98" fill="#050406" stroke="#fde68a" strokeWidth="3" />
          {/* Diamond ring flare at top-right edge */}
          <circle cx="470" cy="166" r="18" fill="#fef08a" fillOpacity="0.65" />
          <circle cx="470" cy="166" r="6" fill="#ffffff" />
        </>
      );

    // 19. BG_SUPERNOVA_BLAST — Expanding stellar shockwave rings, ejecta plasma streaks, white-orange core flare
    case 'BG_SUPERNOVA_BLAST':
      return (
        <>
          <defs>
            <radialGradient id={`${uid}_nova`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="22%" stopColor="#fdba74" stopOpacity="0.9" />
              <stop offset="55%" stopColor="#c026d3" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#090612" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Expanding stellar shockwave rings */}
          <circle cx="400" cy="250" r="215" fill={`url(#${uid}_nova)`} />
          <g fill="none" className="backdrop-pulse">
            <circle cx="400" cy="250" r="128" stroke="#fdba74" strokeOpacity="0.6" strokeWidth="3" />
            <circle cx="400" cy="250" r="192" stroke="#e879f9" strokeOpacity="0.42" strokeWidth="2" strokeDasharray="24 12" />
            <circle cx="400" cy="250" r="275" stroke="#fb923c" strokeOpacity="0.22" strokeWidth="1.5" />
          </g>
          {/* Radial ejecta plasma streaks */}
          <g strokeLinecap="round">
            {Array.from({ length: 18 }, (_, i) => {
              const a = (i * 20 * Math.PI) / 180;
              const r1 = 55 + (i % 3) * 18;
              const r2 = 210 + (i % 4) * 55;
              return (
                <line
                  key={i}
                  x1={400 + Math.cos(a) * r1}
                  y1={250 + Math.sin(a) * r1}
                  x2={400 + Math.cos(a) * r2}
                  y2={250 + Math.sin(a) * r2}
                  stroke={i % 2 === 0 ? '#fdba74' : '#e879f9'}
                  strokeOpacity={0.35 + (i % 3) * 0.16}
                  strokeWidth={i % 3 === 0 ? '3' : '1.6'}
                />
              );
            })}
          </g>
          <circle cx="400" cy="250" r="32" fill="#ffffff" />
        </>
      );

    // 20. BG_FROST_GLACIER — Sharp translucent icebergs, crystalline snowflake geometry, arctic frost particles
    case 'BG_FROST_GLACIER':
      return (
        <>
          <defs>
            <linearGradient id={`${uid}_ice`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#cffafe" stopOpacity="0.72" />
              <stop offset="55%" stopColor="#0891b2" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#040d14" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          {/* Giant crystalline snowflake geometry in sky */}
          <g
            transform="translate(400, 175)"
            stroke="#a5f3fc"
            strokeOpacity="0.28"
            strokeWidth="2"
            fill="none"
            className="backdrop-spin"
          >
            {[0, 60, 120].map((deg) => (
              <g key={deg} transform={`rotate(${deg})`}>
                <line x1="-130" y1="0" x2="130" y2="0" />
                <polyline points="-95,-18 -75,0 -95,18" />
                <polyline points="95,-18 75,0 95,18" />
              </g>
            ))}
            <polygon points="0,-58 50,-29 50,29 0,58 -50,29 -50,-29" />
          </g>
          {/* Sharp translucent icebergs */}
          <polygon points="0,500 40,305 145,380 225,270 325,430 465,435 585,260 690,365 765,295 800,365 800,500" fill={`url(#${uid}_ice)`} stroke="#a5f3fc" strokeOpacity="0.45" />
          <polygon points="225,270 250,430 145,380" fill="#ffffff" fillOpacity="0.18" />
          <polygon points="585,260 618,435 690,365" fill="#ffffff" fillOpacity="0.16" />
          {/* Drifting arctic frost particles */}
          <g fill="#e0faff" className="backdrop-drift">
            {[
              [80, 120, 3], [175, 210, 2.5], [290, 95, 3.5], [510, 130, 3], [650, 190, 2.8],
              [735, 115, 3.2], [140, 340, 2.5], [640, 330, 3],
            ].map(([cx, cy, r], i) => (
              <circle key={i} cx={cx} cy={cy} r={r} fillOpacity="0.78" />
            ))}
          </g>
        </>
      );

    // 21. BG_DRAGON_FIRE — Volcanic magma fissures at bottom, rising fire sparks, swirling smoke plumes
    case 'BG_DRAGON_FIRE':
      return (
        <>
          <defs>
            <linearGradient id={`${uid}_magma`} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#fb923c" stopOpacity="0.75" />
              <stop offset="35%" stopColor="#dc2626" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#090507" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="210" width="800" height="290" fill={`url(#${uid}_magma)`} />
          {/* Swirling dark smoke plumes */}
          <g fill="#1c0a07" fillOpacity="0.58">
            <ellipse cx="180" cy="195" rx="190" ry="75" transform="rotate(-12 180 195)" />
            <ellipse cx="620" cy="185" rx="200" ry="82" transform="rotate(14 620 185)" />
          </g>
          {/* Cracked volcanic basalt floor + glowing magma fissures */}
          <path d="M0 500 L0 395 L180 435 L395 405 L615 440 L800 385 L800 500 Z" fill="#120504" />
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="45,500 115,448 180,455 245,420" stroke="#f97316" strokeWidth="5" strokeOpacity="0.75" />
            <polyline points="45,500 115,448 180,455 245,420" stroke="#fef08a" strokeWidth="2" />
            <polyline points="355,500 398,442 465,452 535,418" stroke="#f97316" strokeWidth="5" strokeOpacity="0.75" />
            <polyline points="355,500 398,442 465,452 535,418" stroke="#fef08a" strokeWidth="2" />
            <polyline points="740,500 685,445 620,455" stroke="#fb923c" strokeWidth="4" />
          </g>
          {/* Rising fire sparks */}
          <g className="backdrop-drift">
            {[
              [95, 325, 3.5], [165, 255, 2.5], [240, 350, 3], [340, 290, 4], [460, 265, 3],
              [555, 345, 3.5], [645, 275, 2.8], [725, 320, 3.2], [410, 175, 2.5], [290, 195, 2.5],
            ].map(([cx, cy, r], i) => (
              <circle key={i} cx={cx} cy={cy} r={r} fill={i % 2 === 0 ? '#fde047' : '#fb923c'} />
            ))}
          </g>
        </>
      );

    // 22. BG_QUANTUM_REALM — Sacred geometry tesseract wireframes, floating glowing orbs, quantum wave lines
    case 'BG_QUANTUM_REALM':
      return (
        <>
          {/* Intersecting quantum sine wave lines */}
          <g fill="none" strokeOpacity="0.38" strokeWidth="1.5">
            <path d="M0 250 Q200 120 400 250 T800 250" stroke="#2dd4bf" />
            <path d="M0 250 Q200 380 400 250 T800 250" stroke="#818cf8" />
            <path d="M0 165 Q200 295 400 165 T800 165" stroke="#2dd4bf" strokeOpacity="0.24" />
            <path d="M0 335 Q200 205 400 335 T800 335" stroke="#818cf8" strokeOpacity="0.24" />
          </g>
          {/* Sacred Geometry Tesseract Wireframe */}
          <g stroke="#5eead4" strokeOpacity="0.58" strokeWidth="1.6" fill="none" className="backdrop-spin">
            {/* Outer cube */}
            <rect x="275" y="125" width="250" height="250" />
            {/* Inner rotated cube */}
            <rect x="335" y="185" width="130" height="130" stroke="#a5b4fc" />
            <polygon points="400,95 555,250 400,405 245,250" strokeOpacity="0.4" />
            {/* Tesseract vertex connectors */}
            <line x1="275" y1="125" x2="335" y2="185" />
            <line x1="525" y1="125" x2="465" y2="185" />
            <line x1="275" y1="375" x2="335" y2="315" />
            <line x1="525" y1="375" x2="465" y2="315" />
          </g>
          {/* Floating quantum energy orbs */}
          {[
            [140, 140, 8], [660, 140, 8], [140, 360, 7], [660, 360, 7], [400, 250, 11],
          ].map(([cx, cy, r], i) => (
            <g key={i} className="backdrop-pulse">
              <circle cx={cx} cy={cy} r={r * 2.4} fill="#2dd4bf" fillOpacity="0.2" />
              <circle cx={cx} cy={cy} r={r} fill="#ccfbf1" />
            </g>
          ))}
        </>
      );

    // 23. BG_PRISM_HOLOGRAM — Refracted rainbow crystal shards, iridescent holographic beams, floating prisms
    case 'BG_PRISM_HOLOGRAM':
      return (
        <>
          <defs>
            <linearGradient id={`${uid}_holo1`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.52" />
              <stop offset="50%" stopColor="#ec4899" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.52" />
            </linearGradient>
            <linearGradient id={`${uid}_beamR`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#00f3ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Iridescent holographic light beams */}
          <polygon points="0,190 400,250 0,295" fill={`url(#${uid}_beamR)`} opacity="0.35" />
          <polygon points="400,250 800,70 800,155" fill="#00f3ff" fillOpacity="0.22" />
          <polygon points="400,250 800,175 800,265" fill="#ec4899" fillOpacity="0.24" />
          <polygon points="400,250 800,290 800,385" fill="#f59e0b" fillOpacity="0.22" />
          {/* Central Floating Prism */}
          <polygon
            points="400,110 520,330 280,330"
            fill={`url(#${uid}_holo1)`}
            stroke="#ffffff"
            strokeOpacity="0.72"
            strokeWidth="2"
          />
          <polygon points="400,110 435,330 280,330" fill="#ffffff" fillOpacity="0.16" />
          {/* Floating refracted crystal shards */}
          <g stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.2" className="backdrop-drift">
            <polygon points="115,120 165,95 145,165" fill="#00f3ff" fillOpacity="0.38" />
            <polygon points="650,115 705,145 645,185" fill="#ec4899" fillOpacity="0.4" />
            <polygon points="150,365 205,340 190,415" fill="#f59e0b" fillOpacity="0.38" />
            <polygon points="615,355 685,375 635,430" fill="#a855f7" fillOpacity="0.4" />
          </g>
        </>
      );

    // 24. BG_CELESTIAL_PALACE — Thiên Cung Hoàng Đế: golden astrolabe rings, cloud scrolls, imperial light pillars
    case 'BG_CELESTIAL_PALACE':
      return (
        <>
          <defs>
            <linearGradient id={`${uid}_pillar`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fde68a" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Radiant imperial gold light pillars */}
          <rect x="135" y="0" width="44" height="440" fill={`url(#${uid}_pillar)`} />
          <rect x="621" y="0" width="44" height="440" fill={`url(#${uid}_pillar)`} />
          <rect x="368" y="0" width="64" height="480" fill={`url(#${uid}_pillar)`} opacity="0.65" />
          {/* Golden Celestial Astrolabe Rings */}
          <g fill="none" stroke="#fbbf24" className="backdrop-spin">
            <circle cx="400" cy="235" r="175" strokeOpacity="0.55" strokeWidth="2.4" />
            <circle cx="400" cy="235" r="145" strokeOpacity="0.42" strokeWidth="1.5" strokeDasharray="10 8" />
            <ellipse cx="400" cy="235" rx="175" ry="62" strokeOpacity="0.5" strokeWidth="1.8" />
            <ellipse cx="400" cy="235" rx="62" ry="175" strokeOpacity="0.42" strokeWidth="1.6" />
          </g>
          {/* Imperial cloud scrolls */}
          <g fill="#fef3c7" fillOpacity="0.18" stroke="#fbbf24" strokeOpacity="0.45" strokeWidth="1.5">
            <path d="M20 420 Q85 385 155 410 Q210 385 265 420 L265 445 L20 445 Z" />
            <path d="M535 420 Q600 385 665 410 Q725 385 785 420 L785 445 L535 445 Z" />
          </g>
          <circle cx="400" cy="235" r="24" fill="#fef08a" fillOpacity="0.85" />
        </>
      );

    // 25. BG_OMEGA_SINGULARITY — Hố Đen Omega: supermassive black hole event horizon + warped golden-violet accretion disk
    case 'BG_OMEGA_SINGULARITY':
      return (
        <>
          <defs>
            <radialGradient id={`${uid}_lens`} cx="50%" cy="50%" r="50%">
              <stop offset="32%" stopColor="#000000" />
              <stop offset="44%" stopColor="#fde68a" stopOpacity="0.95" />
              <stop offset="56%" stopColor="#bc13fe" stopOpacity="0.55" />
              <stop offset="76%" stopColor="#0891b2" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#03050c" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`${uid}_disk`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f3ff" stopOpacity="0" />
              <stop offset="22%" stopColor="#bc13fe" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#fef08a" stopOpacity="0.98" />
              <stop offset="78%" stopColor="#f59e0b" stopOpacity="0.78" />
              <stop offset="100%" stopColor="#00f3ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Gravitational lensing halo */}
          <circle cx="400" cy="250" r="225" fill={`url(#${uid}_lens)`} />
          {/* Upper & lower gravitationally warped photon rings */}
          <ellipse cx="400" cy="250" rx="145" ry="132" fill="none" stroke="#c084fc" strokeOpacity="0.45" strokeWidth="2.5" />
          <ellipse cx="400" cy="250" rx="195" ry="165" fill="none" stroke="#00f3ff" strokeOpacity="0.24" strokeWidth="1.5" strokeDasharray="18 14" />
          {/* Back half of accretion disk */}
          <ellipse
            cx="400"
            cy="250"
            rx="320"
            ry="44"
            transform="rotate(-10 400 250)"
            fill="none"
            stroke={`url(#${uid}_disk)`}
            strokeWidth="16"
          />
          {/* Pitch-Black Event Horizon */}
          <circle cx="400" cy="250" r="78" fill="#000000" stroke="#fef08a" strokeWidth="2.4" />
          {/* Front bright accretion arc crossing over the event horizon */}
          <path
            d="M112 298 Q400 326 688 204"
            fill="none"
            stroke={`url(#${uid}_disk)`}
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M148 292 Q400 315 652 212"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.75"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </>
      );

    default:
      return null;
  }
}
