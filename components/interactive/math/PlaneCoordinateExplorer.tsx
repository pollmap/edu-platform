'use client';

// M-CM2-01 평면좌표 — 두 점 A(x1,y1), B(x2,y2) 의 거리·중점·내분점·외분점 시각화.

import { useMemo, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';
import { PresetBar } from '@/components/primitives/PresetBar';

interface Pt {
  x: number;
  y: number;
}

const PRESETS = [
  { label: '거리 5 (3,4)', value: { A: { x: 0, y: 0 }, B: { x: 3, y: 4 }, m: 1, n: 1 } },
  { label: '중점 = (0,0)', value: { A: { x: -2, y: -3 }, B: { x: 2, y: 3 }, m: 1, n: 1 } },
  { label: '2:1 내분', value: { A: { x: 0, y: 0 }, B: { x: 6, y: 3 }, m: 2, n: 1 } },
  { label: '1:2 외분', value: { A: { x: -2, y: 0 }, B: { x: 4, y: 0 }, m: 1, n: 2 } },
];

const VIEW = 8;
const SCALE = 24;

export function PlaneCoordinateExplorer() {
  const [A, setA] = useState<Pt>({ x: -3, y: 1 });
  const [B, setB] = useState<Pt>({ x: 3, y: 5 });
  const [m, setM] = useState(2);
  const [n, setN] = useState(1);

  const distance = useMemo(() => Math.sqrt((B.x - A.x) ** 2 + (B.y - A.y) ** 2), [A, B]);
  const midpoint = useMemo<Pt>(() => ({ x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 }), [A, B]);
  const innerDiv = useMemo<Pt | null>(() => {
    if (m + n === 0) return null;
    return { x: (m * B.x + n * A.x) / (m + n), y: (m * B.y + n * A.y) / (m + n) };
  }, [A, B, m, n]);
  const outerDiv = useMemo<Pt | null>(() => {
    if (m - n === 0) return null;
    return { x: (m * B.x - n * A.x) / (m - n), y: (m * B.y - n * A.y) / (m - n) };
  }, [A, B, m, n]);

  const cx = VIEW * SCALE;
  const cy = VIEW * SCALE;
  const W = VIEW * 2 * SCALE;
  const H = VIEW * 2 * SCALE;
  const toPx = (p: Pt) => ({ x: cx + p.x * SCALE, y: cy - p.y * SCALE });

  return (
    <div className="space-y-4">
      <PresetBar
        presets={PRESETS}
        onSelect={(v) => {
          setA(v.A);
          setB(v.B);
          setM(v.m);
          setN(v.n);
        }}
        onReset={() => {
          setA({ x: -3, y: 1 });
          setB({ x: 3, y: 5 });
          setM(2);
          setN(1);
        }}
      />

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 p-3 space-y-2">
          <div className="text-sm font-bold text-blue-700 dark:text-blue-400">A({A.x}, {A.y})</div>
          <SliderRow label="A의 x" value={A.x} min={-VIEW} max={VIEW} step={1} onChange={(v) => setA({ ...A, x: v })} format={(v) => v.toFixed(0)} />
          <SliderRow label="A의 y" value={A.y} min={-VIEW} max={VIEW} step={1} onChange={(v) => setA({ ...A, y: v })} format={(v) => v.toFixed(0)} />
        </div>
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 p-3 space-y-2">
          <div className="text-sm font-bold text-amber-700 dark:text-amber-400">B({B.x}, {B.y})</div>
          <SliderRow label="B의 x" value={B.x} min={-VIEW} max={VIEW} step={1} onChange={(v) => setB({ ...B, x: v })} format={(v) => v.toFixed(0)} />
          <SliderRow label="B의 y" value={B.y} min={-VIEW} max={VIEW} step={1} onChange={(v) => setB({ ...B, y: v })} format={(v) => v.toFixed(0)} />
        </div>
        <SliderRow label="비 m" value={m} min={1} max={5} step={1} onChange={(v) => setM(Math.round(v))} format={(v) => v.toFixed(0)} />
        <SliderRow label="비 n" value={n} min={1} max={5} step={1} onChange={(v) => setN(Math.round(v))} format={(v) => v.toFixed(0)} />
      </div>

      <div className="overflow-x-auto">
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="bg-zinc-50 dark:bg-zinc-900 rounded-lg" aria-label="평면좌표">
          {Array.from({ length: VIEW * 2 + 1 }, (_, i) => i - VIEW).map((g) => (
            <g key={g}>
              <line x1={cx + g * SCALE} y1={0} x2={cx + g * SCALE} y2={H} stroke="currentColor" strokeOpacity={g === 0 ? 0.5 : 0.1} />
              <line x1={0} y1={cy - g * SCALE} x2={W} y2={cy - g * SCALE} stroke="currentColor" strokeOpacity={g === 0 ? 0.5 : 0.1} />
            </g>
          ))}
          {/* AB 선분 */}
          <line x1={toPx(A).x} y1={toPx(A).y} x2={toPx(B).x} y2={toPx(B).y} stroke="#2563eb" strokeWidth={2} />
          {/* 점들 */}
          <circle cx={toPx(A).x} cy={toPx(A).y} r={6} fill="#2563eb" />
          <text x={toPx(A).x + 8} y={toPx(A).y - 8} fontSize={12} fontWeight="bold" fill="#2563eb">A</text>
          <circle cx={toPx(B).x} cy={toPx(B).y} r={6} fill="#f59e0b" />
          <text x={toPx(B).x + 8} y={toPx(B).y - 8} fontSize={12} fontWeight="bold" fill="#f59e0b">B</text>
          <circle cx={toPx(midpoint).x} cy={toPx(midpoint).y} r={5} fill="#10b981" />
          <text x={toPx(midpoint).x + 8} y={toPx(midpoint).y + 14} fontSize={11} fill="#10b981">M</text>
          {innerDiv ? (
            <>
              <circle cx={toPx(innerDiv).x} cy={toPx(innerDiv).y} r={5} fill="#dc2626" />
              <text x={toPx(innerDiv).x + 8} y={toPx(innerDiv).y - 6} fontSize={11} fill="#dc2626">P({m}:{n} 내)</text>
            </>
          ) : null}
          {outerDiv ? (
            <>
              <circle cx={toPx(outerDiv).x} cy={toPx(outerDiv).y} r={5} fill="#a855f7" />
              <text x={toPx(outerDiv).x + 8} y={toPx(outerDiv).y - 6} fontSize={11} fill="#a855f7">Q({m}:{n} 외)</text>
            </>
          ) : null}
        </svg>
      </div>

      <div className="grid gap-2 md:grid-cols-2 text-sm">
        <div className="rounded-md bg-blue-50 dark:bg-blue-950/40 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">거리 |AB|</div>
          <div className="font-mono mt-1 text-blue-700 dark:text-blue-300">
            √(({(B.x - A.x).toFixed(0)})² + ({(B.y - A.y).toFixed(0)})²) = {distance.toFixed(2)}
          </div>
        </div>
        <div className="rounded-md bg-emerald-50 dark:bg-emerald-950/40 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">중점 M</div>
          <div className="font-mono mt-1 text-emerald-700 dark:text-emerald-300">
            ({midpoint.x.toFixed(1)}, {midpoint.y.toFixed(1)})
          </div>
        </div>
        <div className="rounded-md bg-red-50 dark:bg-red-950/40 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">{m}:{n} 내분점</div>
          <div className="font-mono mt-1 text-red-700 dark:text-red-300">
            {innerDiv ? `(${innerDiv.x.toFixed(2)}, ${innerDiv.y.toFixed(2)})` : '정의 안 됨'}
          </div>
        </div>
        <div className="rounded-md bg-purple-50 dark:bg-purple-950/40 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">{m}:{n} 외분점</div>
          <div className="font-mono mt-1 text-purple-700 dark:text-purple-300">
            {outerDiv ? `(${outerDiv.x.toFixed(2)}, ${outerDiv.y.toFixed(2)})` : 'm = n 이면 정의 X'}
          </div>
        </div>
      </div>
    </div>
  );
}
