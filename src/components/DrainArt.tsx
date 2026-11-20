// DrainArt.tsx — children for <svg viewBox="0 0 800 600">
const MIRROR = 'matrix(-1 0 0 1 800 0)';
const d = (s: number) => ({ animationDelay: `${s}s` });

/* ---------- Sky ---------- */
const CLOUD_FRONT =
  'M258 198 A20 20 0 0 1 268 166 A30 30 0 0 1 312 140 A40 40 0 0 1 370 112 A44 44 0 0 1 440 104 A34 34 0 0 1 498 130 A24 24 0 0 1 532 160 A22 22 0 0 1 548 198 Q500 204 452 198 T356 198 T258 198 Z';
const RIM_FRONT =
  'M268 166 A30 30 0 0 1 312 140 A40 40 0 0 1 370 112 A44 44 0 0 1 440 104 A34 34 0 0 1 498 130 A24 24 0 0 1 532 160';
const veil = (x0: number, x1: number, y: number, dx: number, dy: number) =>
  Array.from({ length: (x1 - x0) / 8 + 1 }, (_, i) => `M${x0 + i * 8} ${y} l${dx} ${dy}`).join(' ');

/* ---------- Skyline: Birtamod (left) · Arjundhara (right) ---------- */
const BUILDINGS: [number, number, number][] = [
  [196, 22, 14], [220, 16, 22], [238, 26, 12], [266, 14, 26], [282, 22, 18], [326, 24, 20], [352, 14, 13], [368, 16, 8],
  [414, 16, 9], [432, 16, 18], [450, 24, 24], [476, 14, 12], [492, 22, 20], [516, 18, 14], [536, 26, 22], [564, 14, 10], [580, 22, 16],
];
const TANKS: [number, number][] = [[225, 226], [269, 222], [340, 228], [456, 224], [498, 228], [545, 226]];
const STAIR_HEADS: [number, number, number][] = [[284, 229, 7], [506, 227, 6], [590, 231, 6]];
const DIM_WINDOWS: [number, number][] = [
  [223, 234], [229, 234], [223, 240], [229, 240], [269, 238], [275, 238], [275, 232], [286, 244], [292, 240], [298, 244],
  [336, 238], [342, 244], [330, 244], [435, 238], [441, 244], [454, 242], [460, 232], [466, 236], [466, 244], [503, 236],
  [509, 244], [540, 242], [548, 236], [554, 242], [586, 240], [594, 246],
];
const LIT_WINDOWS: [number, number, number][] = [
  [271, 232, -0.5], [330, 238, -2.1], [288, 240, -3.4], [455, 236, -1.2], [497, 240, -4], [542, 236, -2.7],
];
const TREES: [number, number][] = [[248, 248], [346, 248], [510, 248], [574, 250]];
const PALMS: [number, number][] = [[258, 1], [334, 0.85], [478, 0.95], [560, 1.1]];
const PALM =
  'M0 0 C-1 -14 2 -26 1 -36 M1 -36 q-6 -3 -13 2 M1 -36 q-5 -5 -11 -6 M1 -36 q1 -6 6 -9 M1 -36 q6 -3 12 1 M1 -36 q6 0 9 6 M1 -36 q-3 1 -7 6';

/* ---------- Scene ---------- */
const RAIN: [number, number, number, number][] = [
  [248, 232, 14, -2.6], [300, 300, 16, -3.9], [384, 262, 16, -4.4], [436, 300, 18, -3.1], [488, 236, 14, -2.8],
  [540, 290, 16, -1.4], [604, 330, 14, -2.4], [228, 340, 16, -0.3], [352, 372, 14, -1.1], [470, 360, 16, -0.7],
  [582, 384, 18, -2.2], [262, 430, 16, -4], [538, 444, 14, -1.6], [332, 296, 16, -3.3], [566, 262, 14, -0.9],
];
const RINGS: [number, number, number, number, number][] = [
  [393, 526, 5, 1.3, -0.6], [409, 546, 6, 1.5, -2.2], [401, 506, 4.5, 1.2, -3.7],
];

const groundSide = (
  <>
    <polygon points="400,250 -150,600 230,600" fill="#fff" fillOpacity="0.035" />
    <polygon points="400,250 230,600 300,600" fill="#fff" fillOpacity="0.06" />
    <polygon points="400,250 300,600 312,600" fill="#fff" fillOpacity="0.16" />
    <polygon points="400,250 312,600 356,600" fill="#9b2335" fillOpacity="0.4" />
    <path d="M400 250 L230 600" stroke="#fff" strokeOpacity="0.45" strokeWidth="1.5" />
    <path d="M400 250 L300 600" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.5" />
    <path d="M400 250 L312 600" stroke="#fff" strokeOpacity="0.95" strokeWidth="2.2" />
    <path d="M400 250 L356 600" stroke="#f6c9d1" strokeOpacity="0.85" strokeWidth="1.5" />
    <path
      d="M379.6 271 L372.8 278 M362.6 288.5 L350.7 300.75 M335.4 316.5 L316.7 335.75 M294.6 358.5 L264 390 M230 425 L182.4 474 M128 530 L60 600"
      stroke="#fff" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round"
    />
    <path
      d="M389.4 292 L393.7 300.4 M382.4 320 L389.4 334 M373.6 355 L384.2 376 M363 397 L377.8 426.4 M345.4 467 L367.3 510.4 M334 512.5 L360.4 565 M320.8 565 L352.5 628"
      stroke="#fff" strokeOpacity="0.18" strokeWidth="1"
    />
  </>
);

const horizonLamps = (o: number) => (
  <>
    <path d="M393.25 267.5 V260.5 H394.6" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="0.7" />
    <circle className="drn2-lamp" style={d(o - 0.8)} cx="394.6" cy="260.5" r="3" fill="url(#drn2-glow)" />
    <path d="M387.85 281.5 V268.5 H390.5" fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="0.8" />
    <circle className="drn2-lamp" style={d(o - 2.6)} cx="390.5" cy="268.5" r="4.5" fill="url(#drn2-glow)" />
  </>
);

const farSide = (o: number) => (
  <>
    <rect x="331" y="381.5" width="8" height="3" rx="0.8" fill="#9b2335" stroke="#fff" strokeOpacity="0.7" strokeWidth="0.8" />
    <ellipse cx="381" cy="306" rx="6" ry="1.4" fill="url(#drn2-pool)" />
    <path d="M378.4 306 V283 Q378.4 281 380.4 281 H383.4" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="1" />
    <circle className="drn2-lamp" style={d(o)} cx="383.4" cy="282.5" r="6" fill="url(#drn2-glow)" />
    <circle cx="383.4" cy="282" r="1.1" fill="#fff" />
    <ellipse cx="366" cy="355" rx="11" ry="2.5" fill="url(#drn2-pool)" />
    <path d="M359.5 355 V313 Q359.5 309 363.5 309 H368.5" fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth="1.5" />
    <circle className="drn2-lamp" style={d(o - 2)} cx="368.5" cy="311" r="10" fill="url(#drn2-glow)" />
    <path d="M366 310.2 H371" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
  </>
);

const nearSide = (o: number) => (
  <>
    <rect x="278" y="486" width="13" height="4.5" rx="1" fill="#9b2335" stroke="#fff" strokeOpacity="0.7" strokeWidth="1" />
    <ellipse cx="351" cy="510" rx="4.5" ry="5.5" fill="#3d0d16" fillOpacity="0.85" stroke="#fff" strokeWidth="1.4" />
    <path className="drn2-pour" style={d(o)} d="M353.5 512 Q359 515 366 534" fill="none"
      stroke="#f6c9d1" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 7" />
    <ellipse className="drn2-ring" style={d(o - 1)} cx="368" cy="534" rx="4" ry="1.1" fill="none" stroke="#f6c9d1" strokeWidth="1" />
    {[[376, 496, 384], [375, 512, 384], [373, 530, 383], [371, 550, 382]].map(([x1, y, x2], i) => (
      <path key={y} className="drn2-shimmer" style={d(o - 0.6 - i * 1.25)} d={`M${x1} ${y} H${x2}`}
        stroke="#f6c9d1" strokeWidth="1.5" strokeLinecap="round" />
    ))}
    <ellipse cx="316" cy="509" rx="24" ry="5.5" fill="url(#drn2-pool)" />
    <path d="M295 509 H305" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M300.1 509 V408 Q300.1 398 310.1 398 H322" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    <circle className="drn2-lamp" style={d(o - 1)} cx="322" cy="402" r="20" fill="url(#drn2-glow)" />
    <path d="M317 400 H327" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
  </>
);

export const DrainArt = () => (
  <>
    <defs>
      <radialGradient id="drn2-halo">
        <stop offset="0" stopColor="#f6c9d1" stopOpacity="0.13" />
        <stop offset="1" stopColor="#f6c9d1" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="drn2-glow">
        <stop offset="0" stopColor="#f6c9d1" stopOpacity="0.75" />
        <stop offset="0.35" stopColor="#f6c9d1" stopOpacity="0.25" />
        <stop offset="1" stopColor="#f6c9d1" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="drn2-pool">
        <stop offset="0" stopColor="#f6c9d1" stopOpacity="0.22" />
        <stop offset="1" stopColor="#f6c9d1" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="drn2-cloud-front" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff" stopOpacity="0.15" />
        <stop offset="0.6" stopColor="#fff" stopOpacity="0.06" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="drn2-cloud-back" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff" stopOpacity="0.09" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="drn2-rim-front" gradientUnits="userSpaceOnUse" x1="262" y1="0" x2="534" y2="0">
        <stop offset="0" stopColor="#fff" stopOpacity="0.15" />
        <stop offset="0.25" stopColor="#fff" stopOpacity="1" />
        <stop offset="0.75" stopColor="#fff" stopOpacity="1" />
        <stop offset="1" stopColor="#fff" stopOpacity="0.15" />
      </linearGradient>
      <linearGradient id="drn2-rim-back" gradientUnits="userSpaceOnUse" x1="408" y1="0" x2="540" y2="0">
        <stop offset="0" stopColor="#f6c9d1" stopOpacity="0" />
        <stop offset="0.35" stopColor="#f6c9d1" stopOpacity="0.6" />
        <stop offset="1" stopColor="#f6c9d1" stopOpacity="0.6" />
      </linearGradient>
      <radialGradient id="drn2-veil-grad">
        <stop offset="0.35" stopColor="#fff" />
        <stop offset="1" stopColor="#000" />
      </radialGradient>
      <mask id="drn2-veil-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="800" height="600">
        <ellipse cx="404" cy="226" rx="128" ry="30" fill="url(#drn2-veil-grad)" />
        <ellipse cx="582" cy="168" rx="34" ry="34" fill="url(#drn2-veil-grad)" />
        <ellipse cx="226" cy="176" rx="34" ry="32" fill="url(#drn2-veil-grad)" />
      </mask>
      <linearGradient id="drn2-edge" gradientUnits="userSpaceOnUse" x1="190" y1="0" x2="610" y2="0">
        <stop offset="0" stopColor="#fff" stopOpacity="0" />
        <stop offset="0.15" stopColor="#fff" stopOpacity="1" />
        <stop offset="0.85" stopColor="#fff" stopOpacity="1" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="drn2-depth-grad" gradientUnits="userSpaceOnUse" x1="0" y1="254" x2="0" y2="340">
        <stop offset="0" stopColor="#000" />
        <stop offset="1" stopColor="#fff" />
      </linearGradient>
      <mask id="drn2-depth" maskUnits="userSpaceOnUse" x="0" y="0" width="800" height="600">
        <rect x="0" y="250" width="800" height="350" fill="url(#drn2-depth-grad)" />
      </mask>
    </defs>

    {/* Sky: layered monsoon clouds with lit tops and dissolving bases */}
    <ellipse cx="400" cy="150" rx="220" ry="110" fill="url(#drn2-halo)" />
    <g className="drn2-cloud-b">
      <path d="M380 150 A30 30 0 0 1 408 112 A34 34 0 0 1 462 88 A32 32 0 0 1 514 100 A28 28 0 0 1 540 136 Q520 150 460 152 T380 150 Z"
        fill="url(#drn2-cloud-back)" />
      <path d="M408 112 A34 34 0 0 1 462 88 A32 32 0 0 1 514 100 A28 28 0 0 1 540 136"
        fill="none" stroke="url(#drn2-rim-back)" strokeWidth="1.4" strokeLinecap="round" />
    </g>
    <g className="drn2-cloud-c">
      <path d="M196 146 A13 13 0 0 1 210 126 A18 18 0 0 1 242 120 A15 15 0 0 1 262 140 Q230 150 196 146 Z" fill="url(#drn2-cloud-back)" />
      <path d="M196 146 A13 13 0 0 1 210 126 A18 18 0 0 1 242 120 A15 15 0 0 1 262 140"
        fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round" />
    </g>
    <g className="drn2-cloud-d">
      <path d="M556 134 A13 13 0 0 1 570 114 A16 16 0 0 1 598 110 A12 12 0 0 1 612 128 Q584 140 556 134 Z" fill="url(#drn2-cloud-back)" />
      <path d="M556 134 A13 13 0 0 1 570 114 A16 16 0 0 1 598 110 A12 12 0 0 1 612 128"
        fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round" />
    </g>
    <g className="drn2-cloud-a">
      <path d={CLOUD_FRONT} fill="url(#drn2-cloud-front)" />
      <path className="drn2-flash" d={CLOUD_FRONT} fill="#f6c9d1" opacity="0" />
      <g fill="none" stroke="#f6c9d1" strokeLinecap="round" strokeWidth="1.2">
        <path d="M330 160 A34 34 0 0 1 384 136" strokeOpacity="0.45" />
        <path d="M424 150 A30 30 0 0 1 474 140" strokeOpacity="0.35" />
        <path d="M286 184 A26 26 0 0 1 326 170" strokeOpacity="0.3" />
        <path d="M300 194 Q360 188 420 194 T520 192" strokeOpacity="0.25" />
      </g>
      <path d={RIM_FRONT} fill="none" stroke="url(#drn2-rim-front)" strokeWidth="2.25" strokeLinecap="round" />
    </g>

    {/* Horizon: hills, two-row skyline, temple, tower */}
    <ellipse cx="400" cy="252" rx="220" ry="26" fill="url(#drn2-halo)" />
    <path d="M190 247 Q240 238 296 241 T408 239 T520 237 T610 246 V252 H190 Z" fill="#f6c9d1" fillOpacity="0.04" />
    <path d="M190 247 Q240 238 296 241 T408 239 T520 237 T610 246" fill="none" stroke="#f6c9d1" strokeOpacity="0.2" strokeWidth="1" />
    <g fill="#f0b8c2" fillOpacity="0.07">
      <path d="M196 252 V244 H204 V240 H214 V246 H222 V236 H230 V242 H246 V238 H258 V244 H272 V232 H280 V240 H296 V236 H312 V244 H330 V238 H342 V246 H360 V242 H374 V248 H386 V252 Z" />
      <path d="M414 252 V246 H428 V240 H440 V244 H456 V236 H470 V242 H486 V234 H494 V240 H510 V244 H524 V238 H540 V242 H556 V236 H566 V244 H582 V240 H596 V246 H606 V252 Z" />
    </g>
    <path d="M524 252 L527 214 L530 252 M524.9 240 H529.1 M525.8 228 H528.2 M527 214 V208"
      fill="none" stroke="#f6c9d1" strokeOpacity="0.4" strokeWidth="0.9" />
    <g className="drn2-beacon">
      <circle cx="527" cy="207" r="4" fill="url(#drn2-glow)" />
      <circle cx="527" cy="207" r="1.3" fill="#f6c9d1" />
    </g>
    <g fill="#f0b8c2" fillOpacity="0.13">
      {BUILDINGS.map(([x, w, h]) => <rect key={x} x={x} y={252 - h} width={w} height={h} />)}
    </g>
    <path d={BUILDINGS.map(([x, w, h]) => `M${x} ${252 - h} h${w}`).join(' ')}
      stroke="#f6c9d1" strokeOpacity="0.35" strokeWidth="0.8" />
    <path d="M306 252 V242 H308 L310 232 Q312 222 314 216 L315 212 L316 216 Q318 222 320 232 L322 242 H324 V252 Z"
      fill="#f0b8c2" fillOpacity="0.17" />
    <path d="M315 212 V207" stroke="#f6c9d1" strokeOpacity="0.6" strokeWidth="0.9" />
    <g fill="#f0b8c2" fillOpacity="0.28">
      {TANKS.map(([x, y]) => <rect key={x} x={x} y={y} width="5" height="4" rx="1" />)}
    </g>
    <g fill="#f0b8c2" fillOpacity="0.18">
      {STAIR_HEADS.map(([x, y, w]) => <rect key={x} x={x} y={y} width={w} height="5" />)}
    </g>
    <path d="M296 234 V230 M301 234 V230 M520 238 V234 M530 238 V234" stroke="#f0b8c2" strokeOpacity="0.35" strokeWidth="1" />
    <g fill="#f6c9d1" fillOpacity="0.22">
      {DIM_WINDOWS.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width="1.8" height="1.8" />)}
    </g>
    <g fill="#f6c9d1">
      {LIT_WINDOWS.map(([x, y, dl]) => (
        <rect key={x} className="drn2-window" style={d(dl)} x={x} y={y} width="2.5" height="2.5" />
      ))}
    </g>
    <g fill="#f0b8c2" opacity="0.14">
      {TREES.map(([x, y]) => (
        <g key={x}>
          <circle cx={x - 6} cy={y} r="5" />
          <circle cx={x} cy={y - 3} r="6" />
          <circle cx={x + 6} cy={y} r="4.5" />
        </g>
      ))}
    </g>
    <g fill="none" stroke="#f6c9d1" strokeOpacity="0.5" strokeWidth="0.9" strokeLinecap="round">
      {PALMS.map(([x, s]) => <path key={x} transform={`translate(${x} 252) scale(${s})`} d={PALM} />)}
    </g>
    <path d="M190 252 H610" stroke="url(#drn2-edge)" strokeOpacity="0.35" strokeWidth="1" />

    {/* Rain curtains hanging from the cloud bases */}
    <g mask="url(#drn2-veil-mask)" fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="1"
      strokeLinecap="round" strokeDasharray="7 11">
      <path className="drn2-veil" d={veil(286, 526, 198, -11, 54)} />
      <path className="drn2-veil" style={d(-1.5)} d={veil(560, 608, 134, -12, 62)} />
      <path className="drn2-veil" style={d(-3)} d={veil(202, 258, 144, -12, 60)} />
    </g>

    {/* Ground, canal walls and water (unchanged) */}
    <g mask="url(#drn2-depth)">
      {groundSide}
      <g transform={MIRROR}>{groundSide}</g>
      <polygon points="400,250 356,600 444,600" fill="#f6c9d1" fillOpacity="0.14" />
      <polygon points="400,250 388,600 412,600" fill="#f6c9d1" fillOpacity="0.08" />
    </g>

    {/* Lamp chain receding to the vanishing point */}
    {horizonLamps(0)}
    <g transform={MIRROR}>{horizonLamps(-3)}</g>

    <g fill="none" stroke="#f6c9d1" strokeWidth="0.6">
      {[0, -1.6, -3.2].map((dl) => (
        <path key={dl} className="drn2-ripple-far" style={d(dl)} d="M395.5 286 Q400 288 404.5 286" />
      ))}
    </g>
    {farSide(0)}
    <g transform={MIRROR}>{farSide(-3)}</g>

    {/* Twin-barrel culvert bridge */}
    <polygon points="312.5,426 487.5,426 492.3,432 307.7,432" fill="#fff" fillOpacity="0.08" />
    <path d="M313 418 H487" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.2" />
    <rect x="307.7" y="432" width="184.6" height="14" rx="1" fill="#fff" fillOpacity="0.1" stroke="#fff" strokeWidth="2" />
    <path d="M312 439 H488" stroke="#9b2335" strokeWidth="1.5" />
    <polygon points="355.4,446 444.6,446 428.7,478 371.3,478" fill="#3d0d16" fillOpacity="0.8" />
    <rect x="397" y="446" width="6" height="32" fill="#fff" fillOpacity="0.16" />
    <path d="M371.3 478 H428.7" stroke="#f6c9d1" strokeOpacity="0.9" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M308 421 H492" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <path d="M316 421 V432 M337 421 V432 M358 421 V432 M379 421 V432 M400 421 V432 M421 421 V432 M442 421 V432 M463 421 V432 M484 421 V432"
      stroke="#fff" strokeOpacity="0.5" strokeWidth="1.2" />

    <g fill="none">
      {[0, -1.2, -2.4, -3.6].map((dl) => (
        <g key={dl} className="drn2-ripple" style={d(dl)}>
          <path d="M370.5 486 Q400 491 429.5 486" stroke="#f6c9d1" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M377 493 Q400 497 423 493" stroke="#fff" strokeOpacity="0.5" strokeWidth="1" strokeLinecap="round" />
        </g>
      ))}
      {RINGS.map(([cx, cy, rx, ry, dl]) => (
        <ellipse key={cx} className="drn2-ring" style={d(dl)} cx={cx} cy={cy} rx={rx} ry={ry} stroke="#f6c9d1" strokeWidth="1" />
      ))}
    </g>

    {nearSide(0)}
    <g transform={MIRROR}>{nearSide(-1.5)}</g>

    <g stroke="#fff" strokeWidth="1.4" strokeLinecap="round">
      {RAIN.map(([x, y, len, dl]) => (
        <line key={`${x}-${y}`} className="drn2-rain" style={d(dl)} x1={x} y1={y} x2={x - 3} y2={y + len} />
      ))}
    </g>
  </>
);
