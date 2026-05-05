'use client';

// M6-GM-04 원의 넓이 — 원을 부채꼴로 잘라 직사각형으로 변환 (π 유도).

import { useState } from 'react';

export function CircleAreaExplorer() {
  const [r, setR] = useState(40);
  const [n, setN] = useState(8);

  const C = 2 * Math.PI * r;
  const A = Math.PI * r * r;
  const halfC = C / 2;

  // SVG 원 (왼쪽)
  const cx = 80;
  const cy = 80;
  const slices = Array.from({ length: n }, (_, i) => {
    const a1 = (i / n) * Math.PI * 2 - Math.PI / 2;
    const a2 = ((i + 1) / n) * Math.PI * 2 - Math.PI / 2;
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const x2 = cx + r * Math.cos(a2);
    const y2 = cy + r * Math.sin(a2);
    const isEven = i % 2 === 0;
    return { path: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`, fill: isEven ? '#60a5fa' : '#1e3a8a' };
  });

  // SVG 직사각형 (오른쪽) — 부채꼴들을 위·아래로 번갈아 배치한 결과
  const rectW = halfC;
  const rectH = r;
  const triW = halfC / (n / 2);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg">
          <div className="flex justify-between mb-2 text-sm">
            <span className="font-bold text-blue-700 dark:text-blue-400">반지름 r</span>
            <span className="font-mono text-red-500 font-semibold">{r} px</span>
          </div>
          <input
            type="range"
            min={20}
            max={60}
            step={2}
            value={r}
            onChange={(e) => setR(parseInt(e.target.value, 10))}
            className="w-full h-3 cursor-pointer accent-blue-600"
          />
        </div>
        <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg">
          <div className="flex justify-between mb-2 text-sm">
            <span className="font-bold text-blue-700 dark:text-blue-400">분할 개수 n</span>
            <span className="font-mono text-red-500 font-semibold">{n}조각</span>
          </div>
          <input
            type="range"
            min={4}
            max={32}
            step={2}
            value={n}
            onChange={(e) => setN(parseInt(e.target.value, 10))}
            className="w-full h-3 cursor-pointer accent-blue-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg">
          <div className="text-xs text-zinc-500 mb-2 text-center">원 (분할)</div>
          <svg viewBox="0 0 160 160" className="w-full aspect-square">
            {slices.map((s, i) => (
              <path key={i} d={s.path} fill={s.fill} stroke="white" strokeWidth="0.5" />
            ))}
          </svg>
        </div>
        <div className="bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg">
          <div className="text-xs text-zinc-500 mb-2 text-center">직사각형으로 재배치</div>
          <svg viewBox={`0 0 ${rectW + 20} ${rectH + 20}`} className="w-full">
            {Array.from({ length: Math.floor(n / 2) }, (_, i) => (
              <g key={i}>
                <polygon
                  points={`${10 + i * triW},10 ${10 + (i + 1) * triW},10 ${10 + i * triW + triW / 2},${10 + rectH}`}
                  fill="#60a5fa"
                  stroke="white"
                  strokeWidth="0.5"
                />
                <polygon
                  points={`${10 + i * triW + triW / 2},10 ${10 + (i + 1) * triW},${10 + rectH} ${10 + i * triW},${10 + rectH}`}
                  fill="#1e3a8a"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </g>
            ))}
            <text x={10 + rectW / 2} y={10 + rectH + 14} fontSize="9" textAnchor="middle" fill="#dc2626" fontFamily="monospace">
              π × r ≈ {halfC.toFixed(1)}
            </text>
          </svg>
        </div>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg text-sm font-mono space-y-1">
        <div>분할이 많아질수록 → 부채꼴들의 합이 직사각형(가로 πr, 세로 r)에 가까워져요.</div>
        <div>
          넓이 ≈ πr × r = <span className="text-red-500 font-bold">πr²</span> ≈ {A.toFixed(1)} px²
        </div>
        <div className="text-xs text-zinc-500">현재 분할: {n}조각, 직사각형 가로 ≈ {halfC.toFixed(1)} (= πr)</div>
      </div>
    </div>
  );
}
