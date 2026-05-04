'use client';

// M5-DP-01 평균과 가능성 — 주사위 시뮬레이션 + 평균 수렴 시각화.

import { useEffect, useRef, useState } from 'react';

interface Roll {
  v: number;
  cum: number; // 누적 평균
}

export function AverageSimulator() {
  const [rolls, setRolls] = useState<Roll[]>([]);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const last = rolls[rolls.length - 1];

  function addOne() {
    setRolls((arr) => {
      const v = 1 + Math.floor(Math.random() * 6);
      const total = arr.reduce((s, r) => s + r.v, 0) + v;
      const cum = total / (arr.length + 1);
      return [...arr.slice(-199), { v, cum }];
    });
  }

  useEffect(() => {
    if (!running) return;
    intervalRef.current = window.setInterval(addOne, 60) as unknown as number;
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, [running]);

  const counts = [0, 0, 0, 0, 0, 0];
  for (const r of rolls) counts[r.v - 1]++;
  const max = Math.max(...counts, 1);

  const W = 600;
  const H = 100;
  const xOf = (i: number): number => (i / Math.max(rolls.length - 1, 1)) * W;
  const yOf = (v: number): number => H - ((v - 1) / 5) * (H - 10) - 5;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          평균 시뮬레이터 — 주사위
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          공정한 주사위의 기댓값은 <strong>(1+2+3+4+5+6)/6 = 3.5</strong>. 던지는 횟수가 많아질수록 평균은 3.5에 가까워져요 (큰 수의 법칙).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">눈별 빈도 (히스토그램)</div>
          <div className="flex items-end gap-2 h-32">
            {counts.map((c, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end">
                <div className="text-[10px] font-mono text-zinc-600 dark:text-zinc-400 mb-1">{c}</div>
                <div
                  className="w-full bg-blue-500 rounded-t"
                  style={{ height: `${(c / max) * 100}%`, minHeight: c > 0 ? 4 : 0 }}
                />
                <div className="text-xs font-mono mt-1 text-zinc-700 dark:text-zinc-300">{i + 1}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">누적 평균 (3.5에 수렴)</div>
          <svg viewBox={`0 0 ${W} ${H + 20}`} className="w-full h-32">
            <line x1="0" y1={yOf(3.5)} x2={W} y2={yOf(3.5)} stroke="#dc2626" strokeDasharray="4 3" strokeWidth="1" />
            <text x={W - 5} y={yOf(3.5) - 4} textAnchor="end" fontSize="10" fill="#dc2626">3.5</text>
            {rolls.length > 1 && (
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="1.5"
                points={rolls.map((r, i) => `${xOf(i)},${yOf(r.cum)}`).join(' ')}
              />
            )}
            <text x="5" y="14" fontSize="11" fill="#475569" fontFamily="monospace">
              n={rolls.length} · μ={last ? last.cum.toFixed(3) : '—'}
            </text>
          </svg>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          className="min-h-[44px] px-4 rounded-md border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50"
        >
          {running ? '⏸ 정지' : '▶ 자동 시뮬'}
        </button>
        <button
          type="button"
          onClick={addOne}
          disabled={running}
          className="min-h-[44px] px-4 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50"
        >
          🎲 1번 던지기
        </button>
        <button
          type="button"
          onClick={() => setRolls([])}
          className="min-h-[44px] px-4 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800"
        >
          초기화
        </button>
        {last && (
          <span className="ml-auto text-sm font-mono text-zinc-700 dark:text-zinc-300">
            마지막 눈: <strong className="text-2xl">{last.v}</strong>
          </span>
        )}
      </div>
    </div>
  );
}
