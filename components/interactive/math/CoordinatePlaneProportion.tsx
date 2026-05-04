'use client';

// M7-CR-03 좌표평면과 그래프 — 정비례/반비례 슬라이더.

import { useMemo, useState } from 'react';

type Mode = 'direct' | 'inverse';

export function CoordinatePlaneProportion() {
  const [mode, setMode] = useState<Mode>('direct');
  const [k, setK] = useState(2);

  const points = useMemo(() => {
    const xs = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
    return xs
      .map((x) => {
        const y = mode === 'direct' ? k * x : k / x;
        return { x, y };
      })
      .filter((p) => Math.abs(p.y) <= 12);
  }, [mode, k]);

  const W = 280;
  const H = 280;
  const SCALE = 22;
  const CX = W / 2;
  const CY = H / 2;

  const path = useMemo(() => {
    if (mode === 'direct') {
      // y = kx 직선
      const xMin = -6;
      const xMax = 6;
      return `M ${CX + xMin * SCALE} ${CY - k * xMin * SCALE} L ${CX + xMax * SCALE} ${CY - k * xMax * SCALE}`;
    }
    // y = k/x 두 갈래 곡선
    const drawBranch = (xs: number[]) =>
      xs.map((x, i) => {
        const y = k / x;
        const px = CX + x * SCALE;
        const py = CY - y * SCALE;
        return `${i === 0 ? 'M' : 'L'} ${px.toFixed(2)} ${py.toFixed(2)}`;
      }).join(' ');
    const right: number[] = [];
    const left: number[] = [];
    for (let x = 0.3; x <= 6; x += 0.1) right.push(Number(x.toFixed(2)));
    for (let x = -0.3; x >= -6; x -= 0.1) left.push(Number(x.toFixed(2)));
    return `${drawBranch(right)} ${drawBranch(left)}`;
  }, [mode, k]);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          좌표평면 위 정비례 vs 반비례
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          정비례는 <strong>직선</strong>, 반비례는 <strong>곡선(쌍곡선)</strong>이에요. 비례상수 k를 움직여 모양을 비교해 봐요.
        </p>
      </div>

      <div className="flex gap-2">
        {(['direct', 'inverse'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`flex-1 px-3 py-2 text-sm rounded-md border min-h-[44px] ${
              mode === m
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700'
            }`}
          >
            {m === 'direct' ? '정비례 y = kx' : '반비례 y = k/x'}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4 flex justify-center">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[320px]">
          {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((g) => (
            <g key={g}>
              <line x1={CX + g * SCALE} y1={0} x2={CX + g * SCALE} y2={H} stroke="#e5e7eb" strokeWidth="0.5" className="dark:stroke-zinc-700" />
              <line x1={0} y1={CY + g * SCALE} x2={W} y2={CY + g * SCALE} stroke="#e5e7eb" strokeWidth="0.5" className="dark:stroke-zinc-700" />
            </g>
          ))}
          <line x1={0} y1={CY} x2={W} y2={CY} stroke="#94a3b8" strokeWidth="1.5" />
          <line x1={CX} y1={0} x2={CX} y2={H} stroke="#94a3b8" strokeWidth="1.5" />
          <path d={path} stroke="#3b82f6" strokeWidth="2.5" fill="none" />
          {points.map((p) => (
            <circle
              key={`${p.x}`}
              cx={CX + p.x * SCALE}
              cy={CY - p.y * SCALE}
              r="3"
              fill="#a855f7"
            />
          ))}
        </svg>
      </div>

      <div className="space-y-1">
        <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
          비례상수 k = {k}
        </div>
        <input
          type="range"
          min={-4}
          max={4}
          step={0.5}
          value={k}
          onChange={(e) => setK(Number(e.target.value))}
          className="w-full h-3 cursor-pointer accent-blue-600"
          aria-label="비례상수"
          style={{ minHeight: 44 }}
        />
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-4 text-sm text-zinc-700 dark:text-zinc-300">
        <strong>정비례:</strong> x가 2배가 되면 y도 2배. 원점을 지나는 직선.
        <br />
        <strong>반비례:</strong> x가 2배가 되면 y는 1/2배. 두 좌표축에 점점 가까워지는 쌍곡선.
      </div>
    </div>
  );
}
