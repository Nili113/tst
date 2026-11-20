import React from 'react';
import { NEPAL, JHAPA, BIRTAMOD, WARD5_LL } from '../data/locatorShapes';

type Ring = [number, number][];

/** Fit rings into a w×h box (equirectangular, corrected for latitude) and return SVG paths. */
function project(frame: Ring, rings: Ring[], w: number, h: number, pad = 10) {
  const k = Math.cos((frame.reduce((s, p) => s + p[1], 0) / frame.length) * (Math.PI / 180));
  const xs = frame.map((p) => p[0] * k);
  const ys = frame.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min((w - pad * 2) / (x1 - x0), (h - pad * 2) / (y1 - y0));
  const ox = (w - (x1 - x0) * s) / 2;
  const oy = (h - (y1 - y0) * s) / 2;
  const pt = ([lng, lat]: [number, number]) => `${(ox + (lng * k - x0) * s).toFixed(1)},${(oy + (y1 - lat) * s).toFixed(1)}`;
  return rings.map((r) => `M${r.map(pt).join('L')}Z`);
}

const W = 160;
const H = 110;

const Panel: React.FC<{ frame: Ring; focus: Ring; step: string; name: string; i: number }> = ({ frame, focus, step, name, i }) => {
  const [outline, area] = project(frame, [frame, focus], W, H);
  return (
    <figure className="locator-step" style={{ '--i': i } as React.CSSProperties}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" aria-hidden="true">
        <path d={outline} fill="#f6efe9" stroke="#b9a79a" strokeWidth="1" strokeLinejoin="round" />
        <path d={area} fill="#9b2335" fillOpacity="0.85" stroke="#6e1b2b" strokeWidth="1" strokeLinejoin="round" className="locator-area" />
      </svg>
      <figcaption className="mt-1.5 text-center leading-tight">
        <span className="block text-[11px] font-medium text-stone-400">{step}</span>
        <span className="block text-[13px] font-semibold text-ink">{name}</span>
      </figcaption>
    </figure>
  );
};

/** Nepal → Jhapa → Birtamod: where Ward No. 5 sits, drawn from real boundaries. */
export const WardLocator: React.FC<{ ne: boolean }> = ({ ne }) => {
  const steps = [
    { frame: NEPAL, focus: JHAPA, step: ne ? 'नेपालमा' : 'In Nepal', name: ne ? 'झापा जिल्ला' : 'Jhapa District' },
    { frame: JHAPA, focus: BIRTAMOD, step: ne ? 'झापामा' : 'In Jhapa', name: ne ? 'बिर्तामोड नगरपालिका' : 'Birtamod' },
    { frame: BIRTAMOD, focus: WARD5_LL, step: ne ? 'बिर्तामोडमा' : 'In Birtamod', name: ne ? 'वडा नं. ५' : 'Ward No. 5' },
  ];
  return (
    <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-1.5 sm:gap-3">
      {steps.map((s, i) => (
        <React.Fragment key={s.name}>
          {i > 0 && <span aria-hidden="true" className="text-stone-300 text-lg">›</span>}
          <Panel {...s} i={i} />
        </React.Fragment>
      ))}
    </div>
  );
};
