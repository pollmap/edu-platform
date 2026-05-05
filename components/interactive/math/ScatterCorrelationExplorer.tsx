'use client';

// M9-DP-01 통계 (산점도·상관) — 점을 추가/제거하며 상관계수 r 변화 관찰.

import { useMemo, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

const SCALE = 30;
const VIEW = 10;

function pearson(pts: Point[]): number {
  if (pts.length < 2) return 0;
  const n = pts.length;
  const mx = pts.reduce((s, p) => s + p.x, 0) / n;
  const my = pts.reduce((s, p) => s + p.y, 0) / n;
  let num = 0;
  let dx = 0;
  let dy = 0;
  for (const p of pts) {
    num += (p.x - mx) * (p.y - my);
    dx += (p.x - mx) ** 2;
    dy += (p.y - my) ** 2;
  }
  if (dx === 0 || dy === 0) return 0;
  return num / Math.sqrt(dx * dy);
}

const PRESETS: Record<string, Point[]> = {
  positive: Array.from({ length: 8 }, (_, i) => ({ x: i + 1, y: i + 1 + (Math.sin(i) * 0.8) })),
  negative: Array.from({ length: 8 }, (_, i) => ({ x: i + 1, y: 9 - i + Math.cos(i) * 0.8 })),
  none: [
    { x: 2, y: 8 },
    { x: 3, y: 3 },
    { x: 5, y: 7 },
    { x: 6, y: 2 },
    { x: 7, y: 9 },
    { x: 8, y: 4 },
  ],
};

export function ScatterCorrelationExplorer() {
  const [pts, setPts] = useState<Point[]>(PRESETS.positive);

  const r = useMemo(() => pearson(pts), [pts]);

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * VIEW;
    const y = VIEW - ((e.clientY - rect.top) / rect.height) * VIEW;
    if (x < 0 || x > VIEW || y < 0 || y > VIEW) return;
    setPts((prev) => [...prev, { x, y }]);
  };

  const removeLast = () => setPts((prev) => prev.slice(0, -1));

  const correlationLabel =
    r > 0.7 ? '강한 양의 상관' : r > 0.3 ? '약한 양의 상관' : r > -0.3 ? '거의 무상관' : r > -0.7 ? '약한 음의 상관' : '강한 음의 상관';

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {(Object.keys(PRESETS) as Array<keyof typeof PRESETS>).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setPts(PRESETS[k])}
            className="px-3 py-2 min-h-[44px] bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm"
          >
            {k === 'positive' ? '양의 상관' : k === 'negative' ? '음의 상관' : '무상관'}
          </button>
        ))}
        <button
          type="button"
          onClick={removeLast}
          className="px-3 py-2 min-h-[44px] bg-zinc-300 dark:bg-zinc-700 rounded-lg text-sm"
          disabled={pts.length === 0}
        >
          마지막 점 제거
        </button>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg">
        <div className="text-xs text-zinc-500 mb-2">화면을 탭하면 점이 추가돼요 (현재 {pts.length}개)</div>
        <svg
          viewBox={`0 0 ${VIEW * SCALE} ${VIEW * SCALE}`}
          className="w-full aspect-square cursor-crosshair touch-none"
          onClick={handleClick}
        >
          <rect x={0} y={0} width={VIEW * SCALE} height={VIEW * SCALE} fill="white" className="dark:fill-zinc-800" />
          {Array.from({ length: VIEW + 1 }, (_, i) => (
            <g key={i}>
              <line x1={i * SCALE} y1={0} x2={i * SCALE} y2={VIEW * SCALE} stroke="#e5e7eb" strokeWidth="1" />
              <line x1={0} y1={i * SCALE} x2={VIEW * SCALE} y2={i * SCALE} stroke="#e5e7eb" strokeWidth="1" />
            </g>
          ))}
          {pts.map((p, i) => (
            <circle
              key={i}
              cx={p.x * SCALE}
              cy={(VIEW - p.y) * SCALE}
              r={5}
              fill="#3b82f6"
              stroke="#1e3a8a"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg text-sm space-y-1">
        <div className="font-mono">
          상관계수 r ≈ <span className="text-red-500 font-bold">{r.toFixed(3)}</span>
        </div>
        <div className="text-zinc-700 dark:text-zinc-300">→ {correlationLabel}</div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg text-sm">
        💡 r은 −1 ~ +1. <strong>+1</strong>은 완전 양의 직선, <strong>0</strong>은 무관, <strong>−1</strong>은 완전 음의 직선이에요. 인과관계 ≠ 상관관계!
      </div>
    </div>
  );
}
