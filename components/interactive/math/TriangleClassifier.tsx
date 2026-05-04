'use client';

// M4-GM-03 삼각형 — 변·각으로 분류하는 인터랙티브.

import { useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

interface Triangle {
  label: string;
  a: number;
  b: number;
  c: number;
}

const PRESETS: Triangle[] = [
  { label: '정삼각형', a: 60, b: 60, c: 60 },
  { label: '이등변(예각)', a: 70, b: 70, c: 40 },
  { label: '직각', a: 90, b: 60, c: 30 },
  { label: '둔각', a: 120, b: 30, c: 30 },
];

function classifyByAngle(a: number, b: number, c: number): { name: string; color: string } {
  const max = Math.max(a, b, c);
  if (Math.abs(max - 90) < 0.5) return { name: '직각삼각형', color: '#16a34a' };
  if (max > 90) return { name: '둔각삼각형', color: '#dc2626' };
  return { name: '예각삼각형', color: '#3b82f6' };
}

function classifyBySides(a: number, b: number, c: number): { name: string; color: string } {
  const sides = [a, b, c];
  const eq = sides.filter((x) => Math.abs(x - sides[0]) < 0.5).length === 3;
  if (eq) return { name: '정삼각형', color: '#a855f7' };
  const pairs = [
    Math.abs(a - b) < 0.5,
    Math.abs(b - c) < 0.5,
    Math.abs(a - c) < 0.5,
  ];
  if (pairs.some(Boolean)) return { name: '이등변삼각형', color: '#f59e0b' };
  return { name: '부등변삼각형', color: '#64748b' };
}

export function TriangleClassifier() {
  const [a, setA] = useState(60);
  const [b, setB] = useState(60);
  const c = Math.max(0, 180 - a - b);

  const angleClass = classifyByAngle(a, b, c);
  const sideClass = classifyBySides(a, b, c);

  // SVG triangle: A=(0,0), AB along x-axis. Use law of sines for B,C positions.
  const W = 240;
  const H = 200;
  const cx = 120;
  const cy = 30;
  // Place vertex A at top, AB sides going down. We'll compute using angles.
  // Use a normalized triangle where each side opposite each angle.
  const aRad = (a * Math.PI) / 180;
  const bRad = (b * Math.PI) / 180;
  // sides: side_a opposite angle a, side_b opposite angle b, side_c opposite angle c
  const scale = 100;
  const side_c = scale * (Math.sin((c * Math.PI) / 180));
  const side_b = scale * Math.sin(bRad);
  // Place A at (cx,cy). Angle at A = a. Place B on left-down, C on right-down.
  const halfA = aRad / 2;
  const Bx = cx - side_c * Math.sin(halfA);
  const By = cy + side_c * Math.cos(halfA);
  const Cx = cx + side_b * Math.sin(halfA);
  const Cy = cy + side_b * Math.cos(halfA);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">삼각형 분류기</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          각도를 바꾸면 삼각형이 변해요. 세 각의 합은 항상 <strong>180°</strong>!
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
            className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 min-h-[44px]"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[320px] mx-auto block">
            <polygon
              points={`${cx},${cy} ${Bx},${By} ${Cx},${Cy}`}
              fill={angleClass.color}
              fillOpacity={0.2}
              stroke={angleClass.color}
              strokeWidth="2.5"
            />
            <circle cx={cx} cy={cy} r={4} fill="#dc2626" />
            <circle cx={Bx} cy={By} r={4} fill="#3b82f6" />
            <circle cx={Cx} cy={Cy} r={4} fill="#16a34a" />
            <text x={cx} y={cy - 8} fontSize="11" textAnchor="middle" fontWeight="bold" fill="#dc2626">
              A {a.toFixed(0)}°
            </text>
            <text x={Bx - 14} y={By + 14} fontSize="11" textAnchor="middle" fontWeight="bold" fill="#3b82f6">
              B {b.toFixed(0)}°
            </text>
            <text x={Cx + 14} y={Cy + 14} fontSize="11" textAnchor="middle" fontWeight="bold" fill="#16a34a">
              C {c.toFixed(0)}°
            </text>
          </svg>
        </div>

        <div className="space-y-3">
          <SliderRow label="각 A" value={a} min={10} max={160} step={1} onChange={(v) => setA(Math.min(v, 169 - b))} format={(v) => v.toFixed(0)} unit="°" />
          <SliderRow label="각 B" value={b} min={10} max={160} step={1} onChange={(v) => setB(Math.min(v, 169 - a))} format={(v) => v.toFixed(0)} unit="°" />
          <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800 p-3 text-sm space-y-1">
            <p>각 C = 180 − A − B = <strong>{c.toFixed(0)}°</strong></p>
            <p>합: {a.toFixed(0)} + {b.toFixed(0)} + {c.toFixed(0)} = <strong>{(a + b + c).toFixed(0)}°</strong></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg p-3" style={{ backgroundColor: angleClass.color + '20' }}>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">각 기준</p>
          <p className="text-lg font-bold" style={{ color: angleClass.color }}>
            {angleClass.name}
          </p>
        </div>
        <div className="rounded-lg p-3" style={{ backgroundColor: sideClass.color + '20' }}>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">변 기준</p>
          <p className="text-lg font-bold" style={{ color: sideClass.color }}>
            {sideClass.name}
          </p>
        </div>
      </div>

      <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800 p-3 text-xs space-y-1">
        <p><strong>각 분류:</strong> 모든 각&lt;90°=예각, 한 각=90°=직각, 한 각&gt;90°=둔각</p>
        <p><strong>변 분류:</strong> 세 변 같음=정삼각, 두 변 같음=이등변, 모두 다름=부등변</p>
      </div>
    </div>
  );
}
