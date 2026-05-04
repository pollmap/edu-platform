'use client';

// M-AM-04 행렬 — 2D 선형변환 시각화 (회전·스케일·전단).

import { useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

type Preset = 'identity' | 'rotate' | 'scale' | 'shear' | 'reflect' | 'custom';

export function MatrixTransformExplorer() {
  const [preset, setPreset] = useState<Preset>('rotate');
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [d, setD] = useState(1);
  const [theta, setTheta] = useState(45);
  const [s, setS] = useState(1.5);
  const [k, setK] = useState(0.5);

  const matrix = (() => {
    switch (preset) {
      case 'identity':
        return { a: 1, b: 0, c: 0, d: 1 };
      case 'rotate': {
        const r = (theta * Math.PI) / 180;
        return { a: Math.cos(r), b: -Math.sin(r), c: Math.sin(r), d: Math.cos(r) };
      }
      case 'scale':
        return { a: s, b: 0, c: 0, d: s };
      case 'shear':
        return { a: 1, b: k, c: 0, d: 1 };
      case 'reflect':
        return { a: 1, b: 0, c: 0, d: -1 };
      case 'custom':
        return { a, b, c, d };
    }
  })();

  // unit square corners + house
  const shape = [
    [0, 0],
    [2, 0],
    [2, 1],
    [1, 1.5],
    [0, 1],
    [0, 0],
  ];
  const transformed = shape.map(([x, y]) => [
    matrix.a * x + matrix.b * y,
    matrix.c * x + matrix.d * y,
  ]);

  const W = 480;
  const H = 280;
  const scale = 50;
  const cx = W / 2;
  const cy = H / 2;
  const toScreen = ([x, y]: number[]): [number, number] => [cx + x * scale, cy - y * scale];

  const det = matrix.a * matrix.d - matrix.b * matrix.c;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          행렬은 「공간 그 자체를 회전·확대·찌그러뜨리는 함수」
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          2×2 행렬을 점 (x,y)에 곱하면 좌표 평면 전체가 변해요. 회전·확대·전단·반사 같은 변환은 모두
          행렬 곱셈 한 줄로 표현돼요. 행렬식(det)은 「면적이 몇 배가 됐나」를 알려줘요.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {([
          { id: 'identity', label: 'I (항등)' },
          { id: 'rotate', label: '회전' },
          { id: 'scale', label: '확대' },
          { id: 'shear', label: '전단' },
          { id: 'reflect', label: '반사' },
          { id: 'custom', label: '직접' },
        ] as { id: Preset; label: string }[]).map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPreset(p.id)}
            className={`min-h-[44px] px-3 rounded-md text-sm border-2 ${
              preset === p.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold'
                : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {preset === 'rotate' && (
        <SliderRow label="θ (도)" value={theta} min={-180} max={180} step={5} onChange={setTheta} format={(v) => `${v.toFixed(0)}°`} />
      )}
      {preset === 'scale' && (
        <SliderRow label="스케일 s" value={s} min={0.1} max={3} step={0.1} onChange={setS} format={(v) => `×${v.toFixed(1)}`} />
      )}
      {preset === 'shear' && (
        <SliderRow label="전단 k" value={k} min={-2} max={2} step={0.1} onChange={setK} format={(v) => v.toFixed(1)} />
      )}
      {preset === 'custom' && (
        <div className="grid grid-cols-2 gap-2">
          <SliderRow label="a" value={a} min={-2} max={2} step={0.1} onChange={setA} />
          <SliderRow label="b" value={b} min={-2} max={2} step={0.1} onChange={setB} />
          <SliderRow label="c" value={c} min={-2} max={2} step={0.1} onChange={setC} />
          <SliderRow label="d" value={d} min={-2} max={2} step={0.1} onChange={setD} />
        </div>
      )}

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-4 text-center">
        <MathFormula
          tex={`\\begin{pmatrix} ${matrix.a.toFixed(2)} & ${matrix.b.toFixed(2)} \\\\ ${matrix.c.toFixed(2)} & ${matrix.d.toFixed(2)} \\end{pmatrix}\\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} x' \\\\ y' \\end{pmatrix},\\quad \\det = ${det.toFixed(2)}`}
        />
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          <line x1="0" y1={cy} x2={W} y2={cy} stroke="#94a3b8" strokeWidth="0.5" />
          <line x1={cx} y1="0" x2={cx} y2={H} stroke="#94a3b8" strokeWidth="0.5" />
          {[-4, -3, -2, -1, 1, 2, 3, 4].map((g) => (
            <g key={g}>
              <line x1={cx + g * scale} y1="0" x2={cx + g * scale} y2={H} stroke="#e2e8f0" strokeOpacity="0.3" />
              <line x1="0" y1={cy - g * scale} x2={W} y2={cy - g * scale} stroke="#e2e8f0" strokeOpacity="0.3" />
            </g>
          ))}
          <polygon points={shape.map((p) => toScreen(p).join(',')).join(' ')} fill="rgba(148,163,184,0.3)" stroke="#64748b" strokeDasharray="3 2" strokeWidth="1" />
          <polygon points={transformed.map((p) => toScreen(p).join(',')).join(' ')} fill="rgba(59,130,246,0.5)" stroke="#2563eb" strokeWidth="2" />
          {/* basis vectors */}
          <line x1={cx} y1={cy} x2={cx + matrix.a * scale} y2={cy - matrix.c * scale} stroke="#dc2626" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1={cx} y1={cy} x2={cx + matrix.b * scale} y2={cy - matrix.d * scale} stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrow)" />
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#475569" />
            </marker>
          </defs>
          <text x="10" y="20" fontSize="11" fontFamily="monospace" className="fill-zinc-600 dark:fill-zinc-400">회색=원본 / 파랑=변환 / 빨강=ê₁′ / 초록=ê₂′</text>
        </svg>
      </div>
    </div>
  );
}
