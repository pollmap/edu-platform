'use client';

// M8-DP-01 확률 — 동전·주사위 시뮬레이터: 시행 횟수가 늘면 상대도수→이론값 수렴.

import { useState } from 'react';

type Mode = 'coin' | 'die';

export function ProbabilitySimulator() {
  const [mode, setMode] = useState<Mode>('coin');
  const [counts, setCounts] = useState<number[]>([0, 0]);
  const [trials, setTrials] = useState(0);

  const sides = mode === 'coin' ? 2 : 6;
  const labels = mode === 'coin' ? ['앞', '뒤'] : ['1', '2', '3', '4', '5', '6'];
  const theoretical = 1 / sides;

  const reset = (newMode?: Mode) => {
    const m = newMode ?? mode;
    setMode(m);
    setCounts(Array.from({ length: m === 'coin' ? 2 : 6 }, () => 0));
    setTrials(0);
  };

  const run = (n: number) => {
    setCounts((prev) => {
      const next = [...prev];
      for (let i = 0; i < n; i++) {
        const r = Math.floor(Math.random() * sides);
        next[r] += 1;
      }
      return next;
    });
    setTrials((t) => t + n);
  };

  const total = trials || 1;
  const max = Math.max(...counts, 1);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['coin', 'die'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => reset(m)}
            className={`px-3 py-2 min-h-[44px] rounded-lg text-sm font-semibold ${
              mode === m ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {m === 'coin' ? '동전' : '주사위'}
          </button>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        {[1, 10, 100, 1000].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => run(n)}
            className="px-3 py-2 min-h-[44px] bg-blue-600 text-white rounded-lg text-sm font-semibold active:bg-blue-800"
          >
            {n}회 던지기
          </button>
        ))}
        <button
          type="button"
          onClick={() => reset()}
          className="px-3 py-2 min-h-[44px] bg-zinc-300 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-lg text-sm"
        >
          초기화
        </button>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg">
        <div className="text-xs text-zinc-500 mb-2">총 시행: {trials}회 / 이론 확률 = 1/{sides} ≈ {theoretical.toFixed(3)}</div>
        <div className="space-y-2">
          {counts.map((c, i) => {
            const rel = c / total;
            return (
              <div key={i} className="flex items-center gap-2">
                <div className="w-8 text-sm font-bold text-blue-600 dark:text-blue-400">{labels[i]}</div>
                <div className="flex-1 bg-zinc-200 dark:bg-zinc-700 rounded h-6 relative overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-blue-500 transition-all duration-200"
                    style={{ width: `${(c / max) * 100}%` }}
                  />
                  <div className="absolute inset-y-0 right-0 border-r-2 border-red-500 border-dashed" style={{ right: `${(1 - theoretical) * 100}%` }} />
                </div>
                <div className="w-20 text-right text-xs font-mono">
                  {c}회 ({(rel * 100).toFixed(1)}%)
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-xs text-zinc-500 mt-2">빨간 점선 = 이론 확률 위치</div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg text-sm">
        💡 <strong>큰 수의 법칙</strong>: 시행 횟수가 충분히 많으면 상대도수가 이론 확률에 가까워져요.
      </div>
    </div>
  );
}
