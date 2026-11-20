import React, { useEffect, useRef } from 'react';

/**
 * Line-art football that rotates on a tilted axis, like a planet.
 * Real geometry (12 pentagons, 20 hexagons) projected onto a sphere; drawn as SVG strokes.
 * Front seams are bright, seams on the far side show faintly through, so the turn reads as 3D.
 */

type V = [number, number, number];
const PHI = (1 + Math.sqrt(5)) / 2;
const norm = (v: V): V => {
  const l = Math.hypot(v[0], v[1], v[2]);
  return [v[0] / l, v[1] / l, v[2] / l];
};
const lerp = (a: V, b: V, t: number): V => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const sub = (a: V, b: V): V => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a: V, b: V): V => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a: V, b: V) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

const ICO: V[] = [];
for (const s1 of [-1, 1]) for (const s2 of [-1, 1]) ICO.push([0, s1, s2 * PHI], [s1, s2 * PHI, 0], [s2 * PHI, 0, s1]);
const EDGES: [number, number][] = [];
for (let i = 0; i < ICO.length; i++)
  for (let j = i + 1; j < ICO.length; j++) if (Math.abs(Math.hypot(...sub(ICO[i], ICO[j])) - 2) < 1e-6) EDGES.push([i, j]);

const STEPS = 8;
const arc = (a: V, b: V): V[] => Array.from({ length: STEPS + 1 }, (_, k) => norm(lerp(a, b, k / STEPS)));

const PENTAGONS: V[][] = ICO.map((v, i) => {
  const corners = EDGES.filter(([a, b]) => a === i || b === i).map(([a, b]) => lerp(v, ICO[a === i ? b : a], 1 / 3));
  const axis = norm(v);
  const ref = norm(sub(corners[0], v));
  const ref2 = cross(axis, ref);
  const ang = (p: V) => Math.atan2(dot(sub(p, v), ref2), dot(sub(p, v), ref));
  corners.sort((p, q) => ang(p) - ang(q));
  return corners.flatMap((c, k) => arc(c, corners[(k + 1) % 5]).slice(0, -1));
});
// Every seam on the ball: pentagon outlines + the hexagon-to-hexagon seams
const LINES: V[][] = [
  ...PENTAGONS.map((p) => [...p, p[0]]),
  ...EDGES.map(([a, b]) => arc(lerp(ICO[a], ICO[b], 1 / 3), lerp(ICO[a], ICO[b], 2 / 3))),
];

const C = 200; // centre of the 400×400 viewBox
const R = 170; // ball radius

interface PlanetBallProps {
  active?: boolean;
  /** seconds per full turn */
  period?: number;
  className?: string;
}

export const PlanetBall: React.FC<PlanetBallProps> = ({ active = true, period = 14, className = '' }) => {
  const front = useRef<SVGPathElement>(null);
  const back = useRef<SVGPathElement>(null);
  const panels = useRef<SVGPathElement>(null);
  const angle = useRef(0.4);

  useEffect(() => {
    const tilt = (23.5 * Math.PI) / 180; // axis leans like Earth's
    const lean = (16 * Math.PI) / 180; // top tipped toward the viewer
    const ct = Math.cos(tilt), st = Math.sin(tilt), cl = Math.cos(lean), sl = Math.sin(lean);
    const f = (n: number) => n.toFixed(1);

    const draw = (a: number) => {
      const ca = Math.cos(a), sa = Math.sin(a);
      const rot = (p: V): V => {
        // spin about the ball's own axis (Y)…
        const x = p[0] * ca + p[2] * sa;
        const z = -p[0] * sa + p[2] * ca;
        const y = p[1];
        // …tip the top toward the viewer (X)…
        const y1 = y * cl - z * sl;
        const z1 = y * sl + z * cl;
        // …and lean the axis sideways (Z)
        return [x * ct - y1 * st, x * st + y1 * ct, z1];
      };
      const P = (p: V) => `${f(C + p[0] * R)} ${f(C - p[1] * R)}`;

      let fd = '', bd = '', pd = '';
      for (const line of LINES) {
        const pts = line.map(rot);
        let fPen = false, bPen = false;
        for (const p of pts) {
          if (p[2] >= 0) {
            fd += (fPen ? 'L' : 'M') + P(p);
            fPen = true;
            bPen = false;
          } else {
            bd += (bPen ? 'L' : 'M') + P(p);
            bPen = true;
            fPen = false;
          }
        }
      }
      for (const poly of PENTAGONS) {
        const pts = poly.map(rot);
        if (pts.reduce((s, p) => s + p[2], 0) / pts.length < 0.05) continue;
        pd +=
          'M' +
          pts
            .map((p) => {
              if (p[2] >= 0) return P(p);
              const l = Math.hypot(p[0], p[1]) || 1; // pin hidden corners to the rim
              return P([p[0] / l, p[1] / l, 0]);
            })
            .join('L') +
          'Z';
      }
      front.current?.setAttribute('d', fd);
      back.current?.setAttribute('d', bd);
      panels.current?.setAttribute('d', pd);
    };

    draw(angle.current);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!active || reduced) return;
    let raf = 0;
    let last = performance.now();
    const speed = (Math.PI * 2) / period;
    const loop = (now: number) => {
      angle.current += Math.min(0.05, (now - last) / 1000) * speed;
      last = now;
      draw(angle.current);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active, period]);

  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="pb-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0.6" stopColor="#f0b8c2" stopOpacity="0.18" />
          <stop offset="1" stopColor="#f0b8c2" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="pb-body" cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#7a1a2c" stopOpacity="0.85" />
          <stop offset="1" stopColor="#3d0d16" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx={C} cy={C} r={R + 28} fill="url(#pb-glow)" />
      <circle cx={C} cy={C} r={R} fill="url(#pb-body)" />
      <path ref={back} fill="none" stroke="#f0b8c2" strokeOpacity="0.16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path ref={panels} fill="#f0b8c2" fillOpacity="0.32" stroke="none" />
      <path ref={front} fill="none" stroke="#fff" strokeOpacity="0.92" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={C} cy={C} r={R} fill="none" stroke="#fff" strokeWidth="3" />
    </svg>
  );
};
