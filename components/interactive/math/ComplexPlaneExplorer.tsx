'use client';

// M-CM1-04 복소수 — 복소평면(가우스 평면) 위에서 z = a + bi 시각화.
// 두 복소수의 덧셈·뺄셈·곱셈·켤레를 즉시 확인.

import { useMemo, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';
import { PresetBar } from '@/components/primitives/PresetBar';

interface Cnum {
  a: number;
  b: number;
}

const PRESETS = [
  { label: '실수 + 허수', value: { z1: { a: 3, b: 0 }, z2: { a: 0, b: 2 } } },
  { label: '켤레 합 = 실수', value: { z1: { a: 2, b: 3 }, z2: { a: 2, b: -3 } } },
  { label: 'i² = −1', value: { z1: { a: 0, b: 1 }, z2: { a: 0, b: 1 } } },
  { label: '90° 회전', value: { z1: { a: 2, b: 0 }, z2: { a: 0, b: 1 } } },
];

function add(a: Cnum, b: Cnum): Cnum {
  return { a: a.a + b.a, b: a.b + b.b };
}

function sub(a: Cnum, b: Cnum): Cnum {
  return { a: a.a - b.a, b: a.b - b.b };
}

function mul(a: Cnum, b: Cnum): Cnum {
  // (a + bi)(c + di) = (ac − bd) + (ad + bc)i
  return { a: a.a * b.a - a.b * b.b, b: a.a * b.b + a.b * b.a };
}

function modulus(z: Cnum): number {
  return Math.sqrt(z.a * z.a + z.b * z.b);
}

function fmt(z: Cnum): string {
  if (z.a === 0 && z.b === 0) return '0';
  if (z.b === 0) return `${z.a}`;
  if (z.a === 0) return `${z.b === 1 ? '' : z.b === -1 ? '-' : z.b}i`;
  const sign = z.b > 0 ? ' + ' : ' − ';
  const abs = Math.abs(z.b);
  return `${z.a}${sign}${abs === 1 ? '' : abs}i`;
}

const SCALE = 22; // px per unit
const VIEW = 10; // ±

export function ComplexPlaneExplorer() {
  const [z1, setZ1] = useState<Cnum>({ a: 3, b: 2 });
  const [z2, setZ2] = useState<Cnum>({ a: 1, b: 4 });

  const sumZ = useMemo(() => add(z1, z2), [z1, z2]);
  const diffZ = useMemo(() => sub(z1, z2), [z1, z2]);
  const prodZ = useMemo(() => mul(z1, z2), [z1, z2]);
  const conj1 = useMemo(() => ({ a: z1.a, b: -z1.b }), [z1]);

  const cx = VIEW * SCALE;
  const cy = VIEW * SCALE;
  const w = VIEW * 2 * SCALE;
  const h = VIEW * 2 * SCALE;

  const toPx = (z: Cnum) => ({ x: cx + z.a * SCALE, y: cy - z.b * SCALE });
  const points = [
    { z: z1, color: '#2563eb', label: 'z₁' },
    { z: z2, color: '#f59e0b', label: 'z₂' },
    { z: sumZ, color: '#10b981', label: 'z₁+z₂' },
    { z: prodZ, color: '#dc2626', label: 'z₁·z₂' },
  ];

  return (
    <div className="space-y-4">
      <PresetBar
        presets={PRESETS}
        onSelect={(v) => {
          setZ1(v.z1);
          setZ2(v.z2);
        }}
        onReset={() => {
          setZ1({ a: 3, b: 2 });
          setZ2({ a: 1, b: 4 });
        }}
      />
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2 rounded-lg border border-zinc-200 dark:border-zinc-700 p-3">
          <div className="text-sm font-bold text-blue-700 dark:text-blue-400">z₁ = {fmt(z1)}</div>
          <SliderRow label="실수부 a" value={z1.a} min={-VIEW} max={VIEW} step={1} onChange={(v) => setZ1({ ...z1, a: v })} format={(v) => v.toFixed(0)} />
          <SliderRow label="허수부 b" value={z1.b} min={-VIEW} max={VIEW} step={1} onChange={(v) => setZ1({ ...z1, b: v })} format={(v) => v.toFixed(0)} />
        </div>
        <div className="space-y-2 rounded-lg border border-zinc-200 dark:border-zinc-700 p-3">
          <div className="text-sm font-bold text-amber-700 dark:text-amber-400">z₂ = {fmt(z2)}</div>
          <SliderRow label="실수부 a" value={z2.a} min={-VIEW} max={VIEW} step={1} onChange={(v) => setZ2({ ...z2, a: v })} format={(v) => v.toFixed(0)} />
          <SliderRow label="허수부 b" value={z2.b} min={-VIEW} max={VIEW} step={1} onChange={(v) => setZ2({ ...z2, b: v })} format={(v) => v.toFixed(0)} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-zinc-50 dark:bg-zinc-900 rounded-lg" aria-label="복소평면">
          {/* grid */}
          {Array.from({ length: VIEW * 2 + 1 }, (_, i) => i - VIEW).map((g) => (
            <g key={g}>
              <line x1={cx + g * SCALE} y1={0} x2={cx + g * SCALE} y2={h} stroke="currentColor" strokeOpacity={g === 0 ? 0.5 : 0.1} />
              <line x1={0} y1={cy - g * SCALE} x2={w} y2={cy - g * SCALE} stroke="currentColor" strokeOpacity={g === 0 ? 0.5 : 0.1} />
            </g>
          ))}
          <text x={w - 50} y={cy - 6} className="text-xs" fill="currentColor">실수축 →</text>
          <text x={cx + 6} y={14} className="text-xs" fill="currentColor">↑ 허수축</text>

          {/* vectors */}
          {points.map((p) => {
            const { x, y } = toPx(p.z);
            return (
              <g key={p.label}>
                <line x1={cx} y1={cy} x2={x} y2={y} stroke={p.color} strokeWidth={2} strokeOpacity={0.6} />
                <circle cx={x} cy={y} r={5} fill={p.color} />
                <text x={x + 6} y={y - 6} fontSize={11} fill={p.color} fontWeight="bold">{p.label}</text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="grid gap-2 md:grid-cols-2 text-sm">
        <div className="rounded-md bg-emerald-50 dark:bg-emerald-950/40 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">덧셈 / 뺄셈</div>
          <div className="font-mono mt-1 text-emerald-700 dark:text-emerald-300">
            z₁ + z₂ = {fmt(sumZ)}<br />z₁ − z₂ = {fmt(diffZ)}
          </div>
        </div>
        <div className="rounded-md bg-red-50 dark:bg-red-950/40 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">곱셈 / 켤레 / 절댓값</div>
          <div className="font-mono mt-1 text-red-700 dark:text-red-300">
            z₁ · z₂ = {fmt(prodZ)}<br />z̄₁ = {fmt(conj1)} &nbsp;|z₁| = {modulus(z1).toFixed(2)}
          </div>
        </div>
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 곱셈은 「길이 곱하기 + 각도 더하기」예요. i 를 곱하면 90° 회전해요.
      </p>
    </div>
  );
}
