'use client';

// M8-CR-03 연립일차방정식 — 두 직선 교점 시각화.

import { useMemo, useState } from 'react';

interface Line {
  a: number; // ax + by = c
  b: number;
  c: number;
}

const PRESETS: Array<{ label: string; L1: Line; L2: Line }> = [
  { label: '한 점', L1: { a: 1, b: 1, c: 5 }, L2: { a: 2, b: -1, c: 1 } },
  { label: '평행 (해 없음)', L1: { a: 1, b: 1, c: 3 }, L2: { a: 1, b: 1, c: 6 } },
  { label: '일치 (무수)', L1: { a: 1, b: 1, c: 4 }, L2: { a: 2, b: 2, c: 8 } },
  { label: 'y절편 같음', L1: { a: 1, b: -1, c: -2 }, L2: { a: -1, b: -1, c: -2 } },
];

const X_MIN = -8;
const X_MAX = 8;
const Y_MIN = -8;
const Y_MAX = 8;

function evalY(line: Line, x: number): number | null {
  // ax + by = c → y = (c - ax) / b
  if (line.b === 0) return null;
  return (line.c - line.a * x) / line.b;
}

function intersect(L1: Line, L2: Line): { x: number; y: number } | 'parallel' | 'coincident' {
  const det = L1.a * L2.b - L2.a * L1.b;
  if (Math.abs(det) < 1e-9) {
    // 평행 또는 일치
    if (L1.a === 0 && L2.a === 0) return Math.abs(L1.c / (L1.b || 1) - L2.c / (L2.b || 1)) < 1e-9 ? 'coincident' : 'parallel';
    const ratioA = L2.a / (L1.a || 1);
    if (Math.abs(L2.c - L1.c * ratioA) < 1e-9 && Math.abs(L2.b - L1.b * ratioA) < 1e-9) return 'coincident';
    return 'parallel';
  }
  const x = (L2.b * L1.c - L1.b * L2.c) / det;
  const y = (L1.a * L2.c - L2.a * L1.c) / det;
  return { x, y };
}

export function SystemOfEquationsExplorer() {
  const [L1, setL1] = useState<Line>({ a: 1, b: 1, c: 5 });
  const [L2, setL2] = useState<Line>({ a: 2, b: -1, c: 1 });

  const W = 320;
  const H = 320;
  const SX = W / (X_MAX - X_MIN);
  const SY = H / (Y_MAX - Y_MIN);
  const toPx = (x: number, y: number) => ({ px: (x - X_MIN) * SX, py: H - (y - Y_MIN) * SY });

  const path1 = useMemo(() => {
    const y1 = evalY(L1, X_MIN);
    const y2 = evalY(L1, X_MAX);
    if (y1 === null || y2 === null) {
      // 수직선 by=0 → x = c/a
      const x = L1.c / L1.a;
      return { x1: toPx(x, Y_MIN).px, y1: 0, x2: toPx(x, Y_MAX).px, y2: H };
    }
    return { x1: toPx(X_MIN, y1).px, y1: toPx(X_MIN, y1).py, x2: toPx(X_MAX, y2).px, y2: toPx(X_MAX, y2).py };
  }, [L1]);

  const path2 = useMemo(() => {
    const y1 = evalY(L2, X_MIN);
    const y2 = evalY(L2, X_MAX);
    if (y1 === null || y2 === null) {
      const x = L2.c / L2.a;
      return { x1: toPx(x, Y_MIN).px, y1: 0, x2: toPx(x, Y_MAX).px, y2: H };
    }
    return { x1: toPx(X_MIN, y1).px, y1: toPx(X_MIN, y1).py, x2: toPx(X_MAX, y2).px, y2: toPx(X_MAX, y2).py };
  }, [L2]);

  const sol = intersect(L1, L2);
  const ticks = [-6, -4, -2, 2, 4, 6];

  const fmt = (line: Line) => `${line.a}x ${line.b >= 0 ? '+' : '−'} ${Math.abs(line.b)}y = ${line.c}`;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          연립일차방정식 — 두 직선의 교점
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          두 식을 동시에 만족하는 (x, y)는 <strong>두 직선이 만나는 점</strong>이에요.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setL1(p.L1);
              setL2(p.L2);
            }}
            className="px-3 py-2 text-sm rounded-md border min-h-[44px] bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-md mx-auto" style={{ aspectRatio: '1 / 1' }}>
          {ticks.map((t) => {
            const { px } = toPx(t, 0);
            return <line key={`vx${t}`} x1={px} y1={0} x2={px} y2={H} stroke="#e5e7eb" strokeWidth="0.5" />;
          })}
          {ticks.map((t) => {
            const { py } = toPx(0, t);
            return <line key={`hz${t}`} x1={0} y1={py} x2={W} y2={py} stroke="#e5e7eb" strokeWidth="0.5" />;
          })}
          <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="#94a3b8" strokeWidth="1.5" />
          <line x1={W / 2} y1={0} x2={W / 2} y2={H} stroke="#94a3b8" strokeWidth="1.5" />
          <line x1={path1.x1} y1={path1.y1} x2={path1.x2} y2={path1.y2} stroke="#2563eb" strokeWidth="2.5" />
          <line x1={path2.x1} y1={path2.y1} x2={path2.x2} y2={path2.y2} stroke="#db2777" strokeWidth="2.5" />
          {typeof sol === 'object' && Math.abs(sol.x) <= X_MAX && Math.abs(sol.y) <= Y_MAX && (
            <>
              <circle cx={toPx(sol.x, sol.y).px} cy={toPx(sol.x, sol.y).py} r="6" fill="#facc15" stroke="#854d0e" strokeWidth="1.5" />
              <text x={toPx(sol.x, sol.y).px + 8} y={toPx(sol.x, sol.y).py - 6} fontSize="11" className="fill-yellow-800 dark:fill-yellow-200 font-semibold">
                ({sol.x.toFixed(2)}, {sol.y.toFixed(2)})
              </text>
            </>
          )}
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2 rounded-lg bg-blue-50 dark:bg-blue-950/30 p-3 border border-blue-200 dark:border-blue-900">
          <p className="text-sm font-mono text-blue-700 dark:text-blue-300 font-semibold">{fmt(L1)}</p>
          {(['a', 'b', 'c'] as const).map((k) => (
            <div key={`L1-${k}`} className="space-y-1">
              <label className="text-xs text-zinc-600 dark:text-zinc-400 flex justify-between">
                <span>{k}</span>
                <span className="font-mono">{L1[k]}</span>
              </label>
              <input
                type="range"
                min={-5}
                max={5}
                value={L1[k]}
                onChange={(e) => setL1({ ...L1, [k]: Number(e.target.value) })}
                className="w-full min-h-[44px]"
              />
            </div>
          ))}
        </div>
        <div className="space-y-2 rounded-lg bg-pink-50 dark:bg-pink-950/30 p-3 border border-pink-200 dark:border-pink-900">
          <p className="text-sm font-mono text-pink-700 dark:text-pink-300 font-semibold">{fmt(L2)}</p>
          {(['a', 'b', 'c'] as const).map((k) => (
            <div key={`L2-${k}`} className="space-y-1">
              <label className="text-xs text-zinc-600 dark:text-zinc-400 flex justify-between">
                <span>{k}</span>
                <span className="font-mono">{L2[k]}</span>
              </label>
              <input
                type="range"
                min={-5}
                max={5}
                value={L2[k]}
                onChange={(e) => setL2({ ...L2, [k]: Number(e.target.value) })}
                className="w-full min-h-[44px]"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4 text-sm">
        {typeof sol === 'string' ? (
          sol === 'parallel' ? (
            <p>두 직선이 <strong>평행</strong>해서 만나지 않아요. <span className="font-mono">해 없음</span>.</p>
          ) : (
            <p>두 식이 <strong>같은 직선</strong>이에요. <span className="font-mono">해가 무수히 많음</span>.</p>
          )
        ) : (
          <p>
            교점 <span className="font-mono font-semibold">x = {sol.x.toFixed(3)}, y = {sol.y.toFixed(3)}</span> — 두 식을 모두 만족하는 단 하나의 해예요.
          </p>
        )}
      </div>
    </div>
  );
}
