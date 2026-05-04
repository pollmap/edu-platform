'use client';

// M8-GM-03 피타고라스 정리 — 정사각형 면적 시각 증명.

import { useMemo, useState } from 'react';

const PRESETS: Array<{ a: number; b: number; label: string }> = [
  { a: 3, b: 4, label: '3·4·5' },
  { a: 5, b: 12, label: '5·12·13' },
  { a: 8, b: 15, label: '8·15·17' },
  { a: 6, b: 6, label: '6·6 (이등변)' },
  { a: 1, b: 1, label: '1·1 (√2)' },
];

export function PythagoreanTheoremExplorer() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);

  const c = useMemo(() => Math.sqrt(a * a + b * b), [a, b]);
  const cRounded = Math.round(c * 1000) / 1000;
  const isInteger = Math.abs(c - Math.round(c)) < 1e-9;

  // SVG 좌표 — 직각삼각형 + 세 변의 정사각형
  const SCALE = 14;
  const margin = 60;
  // 직각은 좌하단. 가로(밑변)=a, 세로(높이)=b.
  const VW = (a + a + b) * SCALE + margin * 2;
  const VH = (b + b + a) * SCALE + margin * 2;
  // 직각 꼭짓점 P
  const px = margin + b * SCALE;
  const py = margin + b * SCALE;
  // 세 꼭짓점
  const A = { x: px, y: py }; // 직각
  const B = { x: px + a * SCALE, y: py }; // 밑변 끝
  const C = { x: px, y: py - b * SCALE }; // 높이 끝

  // a 변(밑변) 위의 정사각형 — 아래쪽
  const sqA = `${A.x},${A.y} ${B.x},${B.y} ${B.x},${A.y + a * SCALE} ${A.x},${A.y + a * SCALE}`;
  // b 변(높이) 위의 정사각형 — 왼쪽
  const sqB = `${A.x},${A.y} ${C.x},${C.y} ${C.x - b * SCALE},${C.y} ${A.x - b * SCALE},${A.y}`;
  // c 변(빗변) 위의 정사각형 — 오른쪽 위 (외부로)
  // 빗변 벡터 (B->C)
  const dx = C.x - B.x;
  const dy = C.y - B.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  // 외측 단위 수직 (좌측 90도 회전)
  const nx = -dy / len;
  const ny = dx / len;
  const sqC = `${B.x},${B.y} ${C.x},${C.y} ${C.x + nx * len},${C.y + ny * len} ${B.x + nx * len},${B.y + ny * len}`;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          피타고라스 — 정사각형 면적 증명
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          직각삼각형 세 변 위의 정사각형. <strong>a² + b² = c²</strong> 가 면적으로 보여요.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setA(p.a);
              setB(p.b);
            }}
            className={`px-3 py-2 text-sm rounded-md border min-h-[44px] font-mono ${
              p.a === a && p.b === b
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3 overflow-x-auto">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" style={{ minWidth: 320, maxHeight: 420 }}>
          {/* a^2 정사각형 (파랑) */}
          <polygon points={sqA} fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          <text x={(A.x + B.x) / 2} y={A.y + (a * SCALE) / 2 + 5} textAnchor="middle" fontSize="13" className="fill-blue-700 font-semibold">
            a² = {a * a}
          </text>
          {/* b^2 정사각형 (초록) */}
          <polygon points={sqB} fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          <text x={A.x - (b * SCALE) / 2} y={(A.y + C.y) / 2 + 5} textAnchor="middle" fontSize="13" className="fill-green-700 font-semibold">
            b² = {b * b}
          </text>
          {/* c^2 정사각형 (분홍) */}
          <polygon points={sqC} fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
          <text
            x={(B.x + C.x) / 2 + (nx * len) / 2}
            y={(B.y + C.y) / 2 + (ny * len) / 2 + 5}
            textAnchor="middle"
            fontSize="13"
            className="fill-pink-700 font-semibold"
          >
            c² = {a * a + b * b}
          </text>
          {/* 직각삼각형 */}
          <polygon
            points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
            fill="#fef9c3"
            stroke="#b45309"
            strokeWidth="2"
          />
          {/* 직각 표시 */}
          <rect x={A.x} y={A.y - 10} width="10" height="10" fill="none" stroke="#b45309" strokeWidth="1.2" />
          {/* 변 길이 */}
          <text x={(A.x + B.x) / 2} y={A.y - 6} textAnchor="middle" fontSize="11" className="fill-zinc-700 dark:fill-zinc-300">a={a}</text>
          <text x={A.x + 6} y={(A.y + C.y) / 2} fontSize="11" className="fill-zinc-700 dark:fill-zinc-300">b={b}</text>
          <text x={(B.x + C.x) / 2 + 8} y={(B.y + C.y) / 2 - 4} fontSize="11" className="fill-zinc-700 dark:fill-zinc-300">c={cRounded}</text>
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {([
          ['a (밑변)', a, setA, 1, 12],
          ['b (높이)', b, setB, 1, 12],
        ] as const).map(([label, value, set, min, max]) => (
          <div key={label} className="space-y-1">
            <label className="text-xs text-zinc-600 dark:text-zinc-400 flex justify-between">
              <span>{label}</span>
              <span className="font-mono">{value}</span>
            </label>
            <input
              type="range"
              min={min}
              max={max}
              value={value}
              onChange={(e) => set(Number(e.target.value))}
              className="w-full min-h-[44px]"
            />
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 p-4 text-sm space-y-1">
        <p className="font-mono text-base">
          {a}² + {b}² = {a * a} + {b * b} = <strong>{a * a + b * b}</strong> = c²
        </p>
        <p>
          따라서 <span className="font-mono">c = √{a * a + b * b} = {cRounded}</span>
          {isInteger ? ' (정수, 피타고라스 수)' : ' (무리수일 수 있음)'}
        </p>
      </div>
    </div>
  );
}
