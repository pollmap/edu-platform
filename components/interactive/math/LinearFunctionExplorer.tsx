'use client';

// M8-CR-04 일차함수와 그래프 — 기울기·y절편 슬라이더.

import { useMemo, useState } from 'react';

const X_MIN = -8;
const X_MAX = 8;
const Y_MIN = -8;
const Y_MAX = 8;

const PRESETS: Array<{ label: string; m: number; b: number }> = [
  { label: 'y = x', m: 1, b: 0 },
  { label: 'y = 2x + 1', m: 2, b: 1 },
  { label: 'y = -x + 3', m: -1, b: 3 },
  { label: 'y = 0.5x', m: 0.5, b: 0 },
  { label: 'y = -2', m: 0, b: -2 },
];

export function LinearFunctionExplorer() {
  const [m, setM] = useState(1);
  const [b, setB] = useState(0);

  const W = 320;
  const H = 320;
  const SCALE_X = W / (X_MAX - X_MIN);
  const SCALE_Y = H / (Y_MAX - Y_MIN);

  const toPx = (x: number, y: number) => ({
    px: (x - X_MIN) * SCALE_X,
    py: H - (y - Y_MIN) * SCALE_Y,
  });

  const lineStart = toPx(X_MIN, m * X_MIN + b);
  const lineEnd = toPx(X_MAX, m * X_MAX + b);
  const yIntercept = toPx(0, b);
  const xIntercept = m !== 0 ? toPx(-b / m, 0) : null;

  const ticks = useMemo(() => {
    const t: number[] = [];
    for (let i = X_MIN; i <= X_MAX; i++) t.push(i);
    return t;
  }, []);

  const sample = useMemo(() => {
    return [-2, -1, 0, 1, 2].map((x) => ({ x, y: m * x + b }));
  }, [m, b]);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          일차함수 — 기울기·y절편
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          <strong>y = mx + b</strong>. m을 바꾸면 기울기, b를 바꾸면 위·아래로 평행이동해요.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setM(p.m);
              setB(p.b);
            }}
            className={`px-3 py-2 text-sm rounded-md border min-h-[44px] font-mono ${
              p.m === m && p.b === b
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-md mx-auto" style={{ aspectRatio: '1 / 1' }}>
          {/* 격자 */}
          {ticks.map((t) => {
            const { px } = toPx(t, 0);
            return <line key={`vx${t}`} x1={px} y1={0} x2={px} y2={H} stroke="#e5e7eb" strokeWidth="0.5" />;
          })}
          {ticks.map((t) => {
            const { py } = toPx(0, t);
            return <line key={`hz${t}`} x1={0} y1={py} x2={W} y2={py} stroke="#e5e7eb" strokeWidth="0.5" />;
          })}
          {/* 축 */}
          <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="#94a3b8" strokeWidth="1.5" />
          <line x1={W / 2} y1={0} x2={W / 2} y2={H} stroke="#94a3b8" strokeWidth="1.5" />
          {/* 라인 */}
          <line
            x1={lineStart.px}
            y1={lineStart.py}
            x2={lineEnd.px}
            y2={lineEnd.py}
            stroke="#2563eb"
            strokeWidth="2.5"
          />
          {/* y절편 */}
          <circle cx={yIntercept.px} cy={yIntercept.py} r="5" fill="#db2777" />
          <text x={yIntercept.px + 8} y={yIntercept.py - 6} fontSize="11" className="fill-pink-700 font-semibold">
            (0, {b})
          </text>
          {/* x절편 */}
          {xIntercept && Math.abs(-b / m) <= X_MAX && (
            <>
              <circle cx={xIntercept.px} cy={xIntercept.py} r="5" fill="#16a34a" />
              <text x={xIntercept.px + 8} y={xIntercept.py + 14} fontSize="11" className="fill-green-700 font-semibold">
                ({(-b / m).toFixed(1)}, 0)
              </text>
            </>
          )}
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs text-zinc-600 dark:text-zinc-400 flex justify-between">
            <span>m (기울기)</span>
            <span className="font-mono">{m}</span>
          </label>
          <input
            type="range"
            min={-3}
            max={3}
            step={0.5}
            value={m}
            onChange={(e) => setM(Number(e.target.value))}
            className="w-full min-h-[44px]"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-zinc-600 dark:text-zinc-400 flex justify-between">
            <span>b (y절편)</span>
            <span className="font-mono">{b}</span>
          </label>
          <input
            type="range"
            min={-5}
            max={5}
            step={1}
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            className="w-full min-h-[44px]"
          />
        </div>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 p-4 text-sm space-y-2">
        <p className="font-mono text-base">y = {m}x {b >= 0 ? '+' : '−'} {Math.abs(b)}</p>
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="text-zinc-500">
              <th className="text-left">x</th>
              {sample.map((p) => (
                <th key={p.x} className="text-center">{p.x}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-zinc-700 dark:text-zinc-300">y</td>
              {sample.map((p) => (
                <td key={p.x} className="text-center">{p.y}</td>
              ))}
            </tr>
          </tbody>
        </table>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          x가 1 늘어나면 y는 m={m}만큼 변해요. m이 양수면 우상향, 음수면 우하향, 0이면 수평.
        </p>
      </div>
    </div>
  );
}
