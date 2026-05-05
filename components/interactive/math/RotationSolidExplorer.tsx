'use client';

// M6-GM-05 원기둥·원뿔·구 — 회전체와 부피·겉넓이 공식.

import { useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

type Solid = 'cylinder' | 'cone' | 'sphere';

export function RotationSolidExplorer() {
  const [solid, setSolid] = useState<Solid>('cylinder');
  const [r, setR] = useState(3);
  const [h, setH] = useState(5);

  const labels = {
    cylinder: '원기둥',
    cone: '원뿔',
    sphere: '구',
  };

  const formulas = (() => {
    if (solid === 'cylinder') {
      const V = Math.PI * r * r * h;
      const S = 2 * Math.PI * r * (r + h);
      return {
        volume: `V = πr²h = π·${r}²·${h} = ${(Math.PI * r * r * h).toFixed(2)}`,
        surface: `S = 2πr(r+h) = ${S.toFixed(2)}`,
        v: V,
      };
    }
    if (solid === 'cone') {
      const V = (Math.PI * r * r * h) / 3;
      const slant = Math.sqrt(r * r + h * h);
      const S = Math.PI * r * (r + slant);
      return {
        volume: `V = ⅓πr²h = ${V.toFixed(2)}`,
        surface: `S = πr(r+ℓ) = ${S.toFixed(2)} (ℓ=${slant.toFixed(2)})`,
        v: V,
      };
    }
    const V = (4 * Math.PI * r * r * r) / 3;
    const S = 4 * Math.PI * r * r;
    return {
      volume: `V = ⁴⁄₃πr³ = ${V.toFixed(2)}`,
      surface: `S = 4πr² = ${S.toFixed(2)}`,
      v: V,
    };
  })();

  const SCALE = 14;
  const cx = 100;
  const cyB = 160;
  const rPix = r * SCALE;
  const hPix = h * SCALE;

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {(['cylinder', 'cone', 'sphere'] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSolid(s)}
            className={`px-3 py-2 min-h-[44px] rounded-lg text-sm font-semibold ${
              solid === s ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {labels[s]}
          </button>
        ))}
      </div>

      <div className={`grid ${solid === 'sphere' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-2`}>
        <SliderRow label="반지름 r" value={r} min={1} max={5} step={1} onChange={setR} format={(v) => `${v}`} unit=" cm" />
        {solid !== 'sphere' && (
          <SliderRow label="높이 h" value={h} min={1} max={8} step={1} onChange={setH} format={(v) => `${v}`} unit=" cm" />
        )}
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg flex justify-center">
        <svg viewBox="0 0 200 200" className="w-full max-w-md aspect-square">
          {solid === 'cylinder' && (
            <>
              <ellipse cx={cx} cy={cyB - hPix} rx={rPix} ry={rPix * 0.3} fill="#93c5fd" stroke="#1e3a8a" strokeWidth="2" />
              <line x1={cx - rPix} y1={cyB - hPix} x2={cx - rPix} y2={cyB} stroke="#1e3a8a" strokeWidth="2" />
              <line x1={cx + rPix} y1={cyB - hPix} x2={cx + rPix} y2={cyB} stroke="#1e3a8a" strokeWidth="2" />
              <path d={`M ${cx - rPix} ${cyB} A ${rPix} ${rPix * 0.3} 0 0 0 ${cx + rPix} ${cyB}`} fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />
              <path d={`M ${cx - rPix} ${cyB} A ${rPix} ${rPix * 0.3} 0 0 1 ${cx + rPix} ${cyB}`} fill="none" stroke="#1e3a8a" strokeWidth="1" strokeDasharray="3" />
            </>
          )}
          {solid === 'cone' && (
            <>
              <line x1={cx - rPix} y1={cyB} x2={cx} y2={cyB - hPix} stroke="#1e3a8a" strokeWidth="2" />
              <line x1={cx + rPix} y1={cyB} x2={cx} y2={cyB - hPix} stroke="#1e3a8a" strokeWidth="2" />
              <path d={`M ${cx - rPix} ${cyB} A ${rPix} ${rPix * 0.3} 0 0 0 ${cx + rPix} ${cyB}`} fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />
              <path d={`M ${cx - rPix} ${cyB} A ${rPix} ${rPix * 0.3} 0 0 1 ${cx + rPix} ${cyB}`} fill="none" stroke="#1e3a8a" strokeWidth="1" strokeDasharray="3" />
              <circle cx={cx} cy={cyB - hPix} r="3" fill="#dc2626" />
            </>
          )}
          {solid === 'sphere' && (
            <>
              <circle cx={cx} cy={120} r={rPix} fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />
              <ellipse cx={cx} cy={120} rx={rPix} ry={rPix * 0.3} fill="none" stroke="#1e3a8a" strokeWidth="1" strokeDasharray="3" />
            </>
          )}
        </svg>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg text-sm font-mono space-y-1">
        <div>{formulas.volume}</div>
        <div>{formulas.surface}</div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg text-sm">
        💡 <strong>핵심</strong>: 같은 밑면·높이일 때 원기둥 부피의 ⅓ = 원뿔 부피. 구의 부피는 정육면체에 갇힌 비율로 외워두면 편해요.
      </div>
    </div>
  );
}
