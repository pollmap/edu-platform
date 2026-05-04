'use client';

// M-CM2-04 도형의 이동 — 평행이동 / x축·y축·원점 대칭 / y = x 대칭 시각화.
// 사용자가 원본 도형을 슬라이더로 이동·반사. 좌표가 어떻게 바뀌는지 표로 표시.

import { useMemo, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

type Transform = 'translate' | 'reflectX' | 'reflectY' | 'reflectO' | 'reflectYX';

const ORIGINAL_POINTS: Array<[number, number]> = [
  [1, 1],
  [3, 1],
  [3, 3],
  [1, 3],
];

const VIEW = 8;
const SCALE = 24;

interface State {
  mode: Transform;
  dx: number;
  dy: number;
}

function applyTransform(p: [number, number], s: State): [number, number] {
  switch (s.mode) {
    case 'translate':
      return [p[0] + s.dx, p[1] + s.dy];
    case 'reflectX':
      return [p[0], -p[1]];
    case 'reflectY':
      return [-p[0], p[1]];
    case 'reflectO':
      return [-p[0], -p[1]];
    case 'reflectYX':
      return [p[1], p[0]];
  }
}

const MODE_LABEL: Record<Transform, string> = {
  translate: '평행이동',
  reflectX: 'x축 대칭',
  reflectY: 'y축 대칭',
  reflectO: '원점 대칭',
  reflectYX: 'y = x 대칭',
};

const MODE_RULE: Record<Transform, string> = {
  translate: '(x, y) → (x + a, y + b)',
  reflectX: '(x, y) → (x, −y)',
  reflectY: '(x, y) → (−x, y)',
  reflectO: '(x, y) → (−x, −y)',
  reflectYX: '(x, y) → (y, x)',
};

export function TransformationExplorer() {
  const [s, setS] = useState<State>({ mode: 'translate', dx: 2, dy: 1 });

  const transformed = useMemo(() => ORIGINAL_POINTS.map((p) => applyTransform(p, s)), [s]);

  const cx = VIEW * SCALE;
  const cy = VIEW * SCALE;
  const W = VIEW * 2 * SCALE;
  const H = VIEW * 2 * SCALE;
  const toPx = (x: number, y: number) => ({ x: cx + x * SCALE, y: cy - y * SCALE });

  const orig = ORIGINAL_POINTS.map((p) => toPx(p[0], p[1]));
  const moved = transformed.map((p) => toPx(p[0], p[1]));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(MODE_LABEL) as Transform[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setS({ ...s, mode: m })}
            className={`px-3 py-2 border rounded-md text-sm min-h-[44px] ${
              s.mode === m
                ? 'border-blue-700 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400'
                : 'border-zinc-300 dark:border-zinc-700 hover:border-blue-700'
            }`}
          >
            {MODE_LABEL[m]}
          </button>
        ))}
      </div>

      {s.mode === 'translate' && (
        <div className="grid gap-2 md:grid-cols-2">
          <SliderRow label="x 이동량 a" value={s.dx} min={-5} max={5} step={1} onChange={(v) => setS({ ...s, dx: v })} format={(v) => v.toFixed(0)} />
          <SliderRow label="y 이동량 b" value={s.dy} min={-5} max={5} step={1} onChange={(v) => setS({ ...s, dy: v })} format={(v) => v.toFixed(0)} />
        </div>
      )}

      <div className="overflow-x-auto">
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="bg-zinc-50 dark:bg-zinc-900 rounded-lg" aria-label="도형의 이동">
          {Array.from({ length: VIEW * 2 + 1 }, (_, i) => i - VIEW).map((g) => (
            <g key={g}>
              <line x1={cx + g * SCALE} y1={0} x2={cx + g * SCALE} y2={H} stroke="currentColor" strokeOpacity={g === 0 ? 0.5 : 0.1} />
              <line x1={0} y1={cy - g * SCALE} x2={W} y2={cy - g * SCALE} stroke="currentColor" strokeOpacity={g === 0 ? 0.5 : 0.1} />
            </g>
          ))}
          {/* y = x */}
          {s.mode === 'reflectYX' && (
            <line x1={toPx(-VIEW, -VIEW).x} y1={toPx(-VIEW, -VIEW).y} x2={toPx(VIEW, VIEW).x} y2={toPx(VIEW, VIEW).y} stroke="#a855f7" strokeOpacity={0.4} strokeDasharray="4 3" />
          )}
          {/* 원본 */}
          <polygon points={orig.map((p) => `${p.x},${p.y}`).join(' ')} fill="rgba(37,99,235,0.18)" stroke="#2563eb" strokeWidth={2} />
          {/* 이동 후 */}
          <polygon points={moved.map((p) => `${p.x},${p.y}`).join(' ')} fill="rgba(220,38,38,0.18)" stroke="#dc2626" strokeWidth={2} strokeDasharray="4 3" />
        </svg>
      </div>

      <div className="rounded-md bg-blue-50 dark:bg-blue-950/40 p-3 text-sm">
        <div className="text-xs text-zinc-500 dark:text-zinc-400">변환 규칙</div>
        <div className="font-mono mt-1 text-blue-700 dark:text-blue-300">{MODE_RULE[s.mode]}</div>
      </div>

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 p-3 overflow-x-auto">
        <table className="text-sm w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700 text-xs text-zinc-500">
              <th className="px-2 py-1 text-left">꼭짓점</th>
              <th className="px-2 py-1">원본 (x, y)</th>
              <th className="px-2 py-1">이동 후</th>
            </tr>
          </thead>
          <tbody>
            {ORIGINAL_POINTS.map((p, i) => (
              <tr key={i} className="font-mono">
                <td className="px-2 py-1 text-zinc-500">P{i + 1}</td>
                <td className="px-2 py-1 text-center text-blue-700 dark:text-blue-400">({p[0]}, {p[1]})</td>
                <td className="px-2 py-1 text-center text-red-600 dark:text-red-400">({transformed[i][0]}, {transformed[i][1]})</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
