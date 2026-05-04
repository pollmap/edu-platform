'use client';

// M-CM2-03 원의 방정식 — (x − a)² + (y − b)² = r².
// 중심 (a, b)와 반지름 r 슬라이더로 원과 직선의 위치 관계 (만나지 않음/접함/두 점) 시각화.

import { useMemo, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';
import { PresetBar } from '@/components/primitives/PresetBar';

interface State {
  cx: number;
  cy: number;
  r: number;
  m: number; // y = mx + k 직선
  k: number;
}

const PRESETS = [
  { label: '단위원', value: { cx: 0, cy: 0, r: 1, m: 0, k: 0 } },
  { label: '두 점에서 만남', value: { cx: 0, cy: 0, r: 3, m: 1, k: 0 } },
  { label: '접함', value: { cx: 0, cy: 0, r: 2, m: 1, k: 2 * Math.SQRT2 } },
  { label: '만나지 않음', value: { cx: 0, cy: 0, r: 1, m: 0, k: 3 } },
];

const VIEW = 6;
const SCALE = 32;

export function CircleEquationExplorer() {
  const [s, setS] = useState<State>({ cx: 0, cy: 0, r: 3, m: 1, k: 0 });

  // 직선: y = m·x + k → m·x − y + k = 0. 점-직선 거리 = |m·cx − cy + k| / √(m² + 1)
  const dist = useMemo(() => Math.abs(s.m * s.cx - s.cy + s.k) / Math.sqrt(s.m * s.m + 1), [s]);
  const relation = useMemo(() => {
    if (Math.abs(dist - s.r) < 0.01) return '접함 (한 점)';
    if (dist < s.r) return '두 점에서 만남';
    return '만나지 않음';
  }, [dist, s.r]);

  const cx = VIEW * SCALE;
  const cy = VIEW * SCALE;
  const W = VIEW * 2 * SCALE;
  const H = VIEW * 2 * SCALE;
  const toPx = (x: number, y: number) => ({ x: cx + x * SCALE, y: cy - y * SCALE });

  // 직선 양 끝
  const x1 = -VIEW;
  const y1 = s.m * x1 + s.k;
  const x2 = VIEW;
  const y2 = s.m * x2 + s.k;
  const lp1 = toPx(x1, y1);
  const lp2 = toPx(x2, y2);

  const center = toPx(s.cx, s.cy);

  return (
    <div className="space-y-4">
      <PresetBar
        presets={PRESETS}
        onSelect={(v) => setS(v)}
        onReset={() => setS({ cx: 0, cy: 0, r: 3, m: 1, k: 0 })}
      />
      <div className="grid gap-2 md:grid-cols-2">
        <SliderRow label="중심 a" value={s.cx} min={-VIEW + 1} max={VIEW - 1} step={1} onChange={(v) => setS({ ...s, cx: v })} format={(v) => v.toFixed(0)} />
        <SliderRow label="중심 b" value={s.cy} min={-VIEW + 1} max={VIEW - 1} step={1} onChange={(v) => setS({ ...s, cy: v })} format={(v) => v.toFixed(0)} />
        <SliderRow label="반지름 r" value={s.r} min={0.5} max={VIEW - 1} step={0.5} onChange={(v) => setS({ ...s, r: v })} format={(v) => v.toFixed(1)} />
        <SliderRow label="직선 기울기 m" value={s.m} min={-3} max={3} step={0.5} onChange={(v) => setS({ ...s, m: v })} format={(v) => v.toFixed(1)} />
        <SliderRow label="직선 y절편 k" value={s.k} min={-VIEW} max={VIEW} step={0.5} onChange={(v) => setS({ ...s, k: v })} format={(v) => v.toFixed(1)} />
      </div>

      <div className="overflow-x-auto">
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="bg-zinc-50 dark:bg-zinc-900 rounded-lg" aria-label="원과 직선">
          {Array.from({ length: VIEW * 2 + 1 }, (_, i) => i - VIEW).map((g) => (
            <g key={g}>
              <line x1={cx + g * SCALE} y1={0} x2={cx + g * SCALE} y2={H} stroke="currentColor" strokeOpacity={g === 0 ? 0.5 : 0.1} />
              <line x1={0} y1={cy - g * SCALE} x2={W} y2={cy - g * SCALE} stroke="currentColor" strokeOpacity={g === 0 ? 0.5 : 0.1} />
            </g>
          ))}
          <circle cx={center.x} cy={center.y} r={s.r * SCALE} fill="rgba(37,99,235,0.1)" stroke="#2563eb" strokeWidth={2} />
          <circle cx={center.x} cy={center.y} r={4} fill="#2563eb" />
          <text x={center.x + 6} y={center.y - 6} fontSize={11} fill="#2563eb" fontWeight="bold">({s.cx},{s.cy})</text>
          <line x1={lp1.x} y1={lp1.y} x2={lp2.x} y2={lp2.y} stroke="#dc2626" strokeWidth={2} />
        </svg>
      </div>

      <div className="grid gap-2 md:grid-cols-2 text-sm">
        <div className="rounded-md bg-blue-50 dark:bg-blue-950/40 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">원의 방정식</div>
          <div className="font-mono mt-1 text-blue-700 dark:text-blue-300">
            (x − {s.cx})² + (y − {s.cy})² = {(s.r * s.r).toFixed(2)}
          </div>
        </div>
        <div className="rounded-md bg-red-50 dark:bg-red-950/40 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">중심에서 직선까지 거리 d</div>
          <div className="font-mono mt-1 text-red-700 dark:text-red-300">d = {dist.toFixed(2)} &nbsp; r = {s.r.toFixed(2)}</div>
          <div className="text-xs mt-1 font-semibold">→ {relation}</div>
        </div>
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ d &lt; r → 두 점, d = r → 접함, d &gt; r → 만나지 않음. 위치 관계는 「거리 vs 반지름」만 비교하면 끝.
      </p>
    </div>
  );
}
