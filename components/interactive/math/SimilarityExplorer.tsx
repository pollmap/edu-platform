'use client';

// M8-GM-02 도형의 닮음 — 닮음비 슬라이더로 두 삼각형의 변·넓이 비 비교.

import { useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

const BASE: Array<[number, number]> = [
  [0, 0],
  [60, 0],
  [30, 50],
];

export function SimilarityExplorer() {
  const [k, setK] = useState(1.5);

  const scaled: Array<[number, number]> = BASE.map((p) => [p[0] * k, p[1] * k]);

  const sides = (() => {
    const a = Math.hypot(BASE[1][0] - BASE[0][0], BASE[1][1] - BASE[0][1]);
    const b = Math.hypot(BASE[2][0] - BASE[1][0], BASE[2][1] - BASE[1][1]);
    const c = Math.hypot(BASE[2][0] - BASE[0][0], BASE[2][1] - BASE[0][1]);
    return [a, b, c];
  })();
  const scaledSides = sides.map((s) => s * k);

  const area = (60 * 50) / 2;
  const scaledArea = area * k * k;

  return (
    <div className="space-y-4">
      <SliderRow label="닮음비 k" value={k} min={0.5} max={3} step={0.1} onChange={setK} format={(v) => v.toFixed(1)} unit=" 배" />

      <div className="bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg flex justify-center">
        <svg viewBox="0 0 320 220" className="w-full max-w-md">
          <g transform="translate(20, 180) scale(1, -1)">
            <polygon points={BASE.map((p) => p.join(',')).join(' ')} fill="rgba(96,165,250,0.5)" stroke="#1e3a8a" strokeWidth="2" />
          </g>
          <g transform="translate(160, 180) scale(1, -1)">
            <polygon points={scaled.map((p) => p.join(',')).join(' ')} fill="rgba(59,130,246,0.6)" stroke="#1e3a8a" strokeWidth="2" />
          </g>
          <text x={50} y={205} fontSize="11" fill="currentColor">원본 △ABC</text>
          <text x={195} y={205} fontSize="11" fill="currentColor">닮음 △A'B'C'</text>
        </svg>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg text-sm space-y-2">
        <div className="grid grid-cols-2 gap-2 font-mono text-xs">
          <div>
            <div className="text-zinc-500">원본 변</div>
            <div>a = {sides[0].toFixed(1)}</div>
            <div>b = {sides[1].toFixed(1)}</div>
            <div>c = {sides[2].toFixed(1)}</div>
          </div>
          <div>
            <div className="text-zinc-500">닮음 변</div>
            <div>a' = {scaledSides[0].toFixed(1)} (×{k.toFixed(1)})</div>
            <div>b' = {scaledSides[1].toFixed(1)} (×{k.toFixed(1)})</div>
            <div>c' = {scaledSides[2].toFixed(1)} (×{k.toFixed(1)})</div>
          </div>
        </div>
        <div className="border-t border-zinc-300 dark:border-zinc-700 pt-2 font-mono">
          넓이 비 = k² = <span className="text-red-500 font-bold">{(k * k).toFixed(2)}</span>{' '}
          (원본 {area.toFixed(0)} → 닮음 {scaledArea.toFixed(0)})
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg text-sm">
        💡 <strong>닮음비 k</strong> → 변 비 = k, 넓이 비 = k², 부피 비 = k³ (입체일 때).
      </div>
    </div>
  );
}
