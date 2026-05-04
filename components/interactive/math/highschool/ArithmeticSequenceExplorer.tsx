'use client';

// M-AL-06 등차수열 — 첫째항 a, 공차 d, 일반항·합 시각화.

import { useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

const MAX_TERMS = 12;

export function ArithmeticSequenceExplorer() {
  const [a, setA] = useState(2);
  const [d, setD] = useState(3);
  const [n, setN] = useState(8);

  const terms = Array.from({ length: n }, (_, i) => a + i * d);
  const last = a + (n - 1) * d;
  const sum = (n * (a + last)) / 2;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          등차수열 — 일정하게 더해 가는 규칙
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          공차 d 만큼씩 늘어나는 수열. 합 공식은 「(처음+끝) × 항수 ÷ 2」.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-4 space-y-2">
          <div className="text-sm font-semibold text-blue-800 dark:text-blue-300">일반항</div>
          <div className="text-center text-xl">
            <MathFormula tex={`a_n = ${a} + (n-1) \\cdot ${d}`} />
          </div>
        </div>
        <div className="rounded-xl bg-rose-50 dark:bg-rose-950/30 p-4 space-y-2">
          <div className="text-sm font-semibold text-rose-800 dark:text-rose-300">부분합 Sₙ</div>
          <div className="text-center text-xl">
            <MathFormula tex={`S_{${n}} = \\frac{${n}(${a} + ${last})}{2} = ${sum}`} />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950">
        <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">막대그래프 시각화</div>
        <div className="flex items-end gap-1.5 h-40 overflow-x-auto">
          {terms.map((v, i) => {
            const max = Math.max(...terms.map(Math.abs), 1);
            const heightPct = (Math.abs(v) / max) * 90;
            const isNeg = v < 0;
            return (
              <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0" style={{ width: '34px' }}>
                <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400">{v}</span>
                <div
                  className={`w-full rounded-t ${isNeg ? 'bg-rose-500' : 'bg-blue-600'}`}
                  style={{ height: `${heightPct}%` }}
                />
                <span className="text-xs text-zinc-500 dark:text-zinc-500">a{i + 1}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <SliderRow label="첫째항 a" value={a} min={-10} max={10} step={1} onChange={setA} />
        <SliderRow label="공차 d" value={d} min={-5} max={5} step={1} onChange={setD} />
        <SliderRow label="항수 n" value={n} min={3} max={MAX_TERMS} step={1} onChange={setN} />
      </div>
    </div>
  );
}
