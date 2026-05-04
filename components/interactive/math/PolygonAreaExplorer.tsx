'use client';

// M5-GM-01 다각형의 둘레와 넓이 — 단위 정사각형 채우기.

import { useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

type Shape = 'rect' | 'parallelogram' | 'triangle' | 'trapezoid';

const SHAPES: Array<{ id: Shape; label: string; formula: string }> = [
  { id: 'rect', label: '직사각형', formula: '가로 × 세로' },
  { id: 'parallelogram', label: '평행사변형', formula: '밑변 × 높이' },
  { id: 'triangle', label: '삼각형', formula: '밑변 × 높이 / 2' },
  { id: 'trapezoid', label: '사다리꼴', formula: '(윗변 + 아랫변) × 높이 / 2' },
];

function area(shape: Shape, base: number, height: number, top: number): number {
  switch (shape) {
    case 'rect': return base * height;
    case 'parallelogram': return base * height;
    case 'triangle': return (base * height) / 2;
    case 'trapezoid': return ((top + base) * height) / 2;
  }
}

function perimeter(shape: Shape, base: number, height: number, top: number): number {
  switch (shape) {
    case 'rect': return 2 * (base + height);
    case 'parallelogram': {
      const slant = Math.sqrt(height * height + 1); // 가정 단순화
      return 2 * base + 2 * slant;
    }
    case 'triangle': {
      const half = base / 2;
      const slant = Math.sqrt(half * half + height * height);
      return base + 2 * slant;
    }
    case 'trapezoid': {
      const dx = (base - top) / 2;
      const slant = Math.sqrt(dx * dx + height * height);
      return base + top + 2 * slant;
    }
  }
}

export function PolygonAreaExplorer() {
  const [shape, setShape] = useState<Shape>('rect');
  const [base, setBase] = useState(6);
  const [height, setHeight] = useState(4);
  const [top, setTop] = useState(3);

  const a = area(shape, base, height, top);
  const p = perimeter(shape, base, height, top);

  // SVG 좌표 (왼쪽 아래 원점, 위 +y)
  const SVG_W = 360;
  const SVG_H = 240;
  const PAD = 30;
  const cellPx = 24;

  function flipY(y: number): number {
    return SVG_H - PAD - y * cellPx;
  }
  function x0(x: number): number {
    return PAD + x * cellPx;
  }

  let pts: Array<[number, number]> = [];
  switch (shape) {
    case 'rect':
      pts = [[0, 0], [base, 0], [base, height], [0, height]];
      break;
    case 'parallelogram':
      pts = [[0, 0], [base, 0], [base + 1, height], [1, height]];
      break;
    case 'triangle':
      pts = [[0, 0], [base, 0], [base / 2, height]];
      break;
    case 'trapezoid': {
      const dx = (base - top) / 2;
      pts = [[0, 0], [base, 0], [base - dx, height], [dx, height]];
      break;
    }
  }
  const points = pts.map(([x, y]) => `${x0(x)},${flipY(y)}`).join(' ');

  // 격자
  const gridW = 12;
  const gridH = 7;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          다각형의 둘레·넓이
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          넓이는 <strong>도형 안에 들어가는 단위 정사각형(1×1)의 개수</strong>. 모든 도형의 넓이 공식은 결국 직사각형으로 환원돼요.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {SHAPES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setShape(s.id)}
            className={`px-3 py-2 text-xs rounded-md border-2 min-h-[40px] ${
              shape === s.id
                ? 'bg-blue-600 text-white border-blue-700'
                : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3">
          <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full">
            {Array.from({ length: gridW + 1 }, (_, i) => (
              <line key={`vx-${i}`} x1={x0(i)} y1={flipY(0)} x2={x0(i)} y2={flipY(gridH)} stroke="#cbd5e1" strokeWidth="0.5" />
            ))}
            {Array.from({ length: gridH + 1 }, (_, i) => (
              <line key={`hy-${i}`} x1={x0(0)} y1={flipY(i)} x2={x0(gridW)} y2={flipY(i)} stroke="#cbd5e1" strokeWidth="0.5" />
            ))}
            <polygon points={points} fill="rgba(59, 130, 246, 0.35)" stroke="#1d4ed8" strokeWidth="2" />
          </svg>
        </div>

        <div className="space-y-3">
          <SliderRow label="밑변 (또는 가로)" value={base} min={1} max={10} step={1} onChange={setBase} />
          <SliderRow label="높이 (또는 세로)" value={height} min={1} max={6} step={1} onChange={setHeight} />
          {shape === 'trapezoid' && (
            <SliderRow label="윗변" value={top} min={1} max={base} step={1} onChange={setTop} />
          )}
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-4 text-sm space-y-1">
            <div className="font-mono text-zinc-900 dark:text-zinc-100">
              공식: {SHAPES.find((s) => s.id === shape)!.formula}
            </div>
            <div className="font-mono text-zinc-900 dark:text-zinc-100">
              넓이 = <strong>{a.toFixed(1)}</strong> 단위²
            </div>
            <div className="font-mono text-zinc-700 dark:text-zinc-300 text-xs">
              둘레 ≈ {p.toFixed(2)} 단위
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
