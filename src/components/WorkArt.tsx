import React from 'react';
import { PlanetBall } from './PlanetBall';
import { DrainArt } from './DrainArt';

/**
 * Animated stand-in artwork for a Key Works slide that has no photos yet.
 * Pure SVG + CSS; motion only runs while the slide is on screen (see .wk-art rules in index.css).
 */

const Backdrop: React.FC<{ id: string }> = ({ id }) => (
  <>
    <defs>
      <radialGradient id={`${id}-glow`} cx="68%" cy="32%" r="75%">
        <stop offset="0" stopColor="#b3485a" stopOpacity="0.75" />
        <stop offset="0.45" stopColor="#9b2335" stopOpacity="0.55" />
        <stop offset="1" stopColor="#3d0d16" stopOpacity="1" />
      </radialGradient>
      <pattern id={`${id}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M40 0H0V40" fill="none" stroke="#fff" strokeOpacity="0.06" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="800" height="600" fill="#3d0d16" />
    <rect width="800" height="600" fill={`url(#${id}-glow)`} />
    <rect width="800" height="600" fill={`url(#${id}-grid)`} />
  </>
);

/* ── Punctuality: a clock that keeps time ── */
const ClockArt = () => (
  <>
    <Backdrop id="clk" />
    <g transform="translate(400 290)">
      {[260, 210, 150].map((r, i) => (
        <circle key={r} r={r} fill="none" stroke="#f0b8c2" strokeOpacity={0.1 + i * 0.06} strokeWidth="1" className="wk-art-ring" style={{ '--i': i } as React.CSSProperties} />
      ))}
      {Array.from({ length: 60 }, (_, i) => {
        const major = i % 5 === 0;
        return (
          <line
            key={i}
            x1="0"
            y1={major ? -200 : -192}
            x2="0"
            y2="-182"
            stroke="#fff"
            strokeOpacity={major ? 0.85 : 0.3}
            strokeWidth={major ? 3 : 1.25}
            strokeLinecap="round"
            transform={`rotate(${i * 6})`}
          />
        );
      })}
      <g className="wk-hand-h"><line y1="12" y2="-92" stroke="#fff" strokeWidth="8" strokeLinecap="round" /></g>
      <g className="wk-hand-m"><line y1="16" y2="-150" stroke="#fff" strokeWidth="5" strokeLinecap="round" /></g>
      <g className="wk-hand-s">
        <line y1="28" y2="-172" stroke="#f0b8c2" strokeWidth="2" strokeLinecap="round" />
        <circle cy="-172" r="5" fill="#f0b8c2" />
      </g>
      <circle r="10" fill="#fff" />
      <circle r="4" fill="#9b2335" />
    </g>
    <text x="400" y="548" textAnchor="middle" fill="#fff" fillOpacity="0.55" fontSize="14" fontWeight="700" letterSpacing="5">10:00 AM · OFFICE OPENS ON TIME</text>
  </>
);

/* ── Drainage: monsoon rain over the Birtamod–Arjundhara skyline, channelled into the canal and culvert (DrainArt.tsx) ── */
const DrainScene = () => (
  <>
    <Backdrop id="drn" />
    <DrainArt />
  </>
);

/* ── Football: just the backdrop; the ball itself is drawn by PlanetBall ── */
const BallBackdrop = () => <Backdrop id="pch" />;

/* ── Blood drive: a steady heartbeat ── */
const PulseArt = () => (
  <>
    <Backdrop id="pls" />
    {Array.from({ length: 6 }, (_, r) =>
      Array.from({ length: 9 }, (_, c) => (
        <path key={`${r}-${c}`} d={`M${70 + c * 85} ${80 + r * 90}h12M${76 + c * 85} ${74 + r * 90}v12`} stroke="#fff" strokeOpacity="0.08" strokeWidth="2" strokeLinecap="round" />
      ))
    )}
    <path d="M0 330 H230 L262 300 L290 330 H330 L360 180 L400 450 L436 270 L462 330 H520 L548 300 L574 330 H800" fill="none" stroke="#fff" strokeOpacity="0.14" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
    <path
      d="M0 330 H230 L262 300 L290 330 H330 L360 180 L400 450 L436 270 L462 330 H520 L548 300 L574 330 H800"
      fill="none"
      stroke="#f0b8c2"
      strokeWidth="4"
      strokeLinejoin="round"
      strokeLinecap="round"
      className="wk-ecg"
      pathLength={1}
    />
    <g transform="translate(560 170)" className="wk-drop">
      <path d="M0 -70 C 30 -30, 52 0, 52 26 A52 52 0 0 1 -52 26 C -52 0, -30 -30, 0 -70 Z" fill="#fff" fillOpacity="0.92" />
      <path d="M-6 6h12M0 0v12" stroke="#9b2335" strokeWidth="5" strokeLinecap="round" transform="translate(0 14) scale(1.6)" />
    </g>
  </>
);

const ART: Record<string, React.FC> = {
  'courtyard-service': ClockArt,
  'aawas-drainage': DrainScene,
  'jhapa-gold-cup': BallBackdrop,
  'blood-donation': PulseArt,
};

/** Whether a work has its own illustration (shown before its photos). */
export const hasArt = (id: string) => id in ART;

interface WorkArtProps {
  id: string;
  active?: boolean;
}

export const WorkArt: React.FC<WorkArtProps> = ({ id, active = false }) => {
  const Art = ART[id] ?? ClockArt;
  const isBall = id === 'jhapa-gold-cup';
  return (
    <div className="wk-art absolute inset-0" aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <Art />
      </svg>
      {isBall && (
        <PlanetBall
          active={active}
          period={14}
          className="absolute inset-0 m-auto w-[78%] h-[78%] max-w-[440px] max-h-[440px]"
        />
      )}
    </div>
  );
};
