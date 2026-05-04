'use client';

// M-AL-07 등비수열 — 첫째항 a, 공비 r, 합과 무한등비급수 수렴.

import { useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

const MAX_TERMS = 12;

export function GeometricSequenceExplorer() {
  const [a, setA] = useState(2);
  const [r, setR] = useState(0.5);
  const [n, setN] = useState(8);

  const terms = Array.from({ length: n }, (_, i) => a * Math.pow(r, i));
  const sum =
    Math.abs(r - 1) < 0.0001 ? a * n : (a * (1 - Math.pow(r, n))) / (1 - r);
  const infiniteSum = Math.abs(r) < 1 ? a / (1 - r) : Infinity;
  const converges = Math.abs(r) < 1;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          등비수열 — 일정 비율로 늘거나 줄어드는 규칙
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          |r| &lt; 1이면 무한히 더해도 유한값으로 수렴. 그렇지 않으면 발산.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-4 space-y-2">
          <div className="text-sm font-semibold text-blue-800 dark:text-blue-300">일반항</div>
          <div className="text-center text-xl">
            <MathFormula tex={`a_n = ${a} \\cdot ${r}^{n-1}`} />
          </div>
        </div>
        <div className="rounded-xl bg-rose-50 dark:bg-rose-950/30 p-4 space-y-2">
          <div className="text-sm font-semibold text-rose-800 dark:text-rose-300">유한합 Sₙ</div>
          <div className="text-center text-lg font-mono">{sum.toFixed(4)}</div>
        </div>
      </div>

      <div
        className={`rounded-xl border-l-4 p-4 ${
          converges
            ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500'
            : 'bg-amber-50 dark:bg-amber-950/30 border-amber-500'
        }`}
      >
        <div className="text-sm font-semibold mb-1">무한등비급수 (n → ∞)</div>
        <div className="text-lg">
          {converges ? (
            <span>
              수렴: S = a/(1−r) = <strong className="font-mono">{infiniteSum.toFixed(4)}</strong>
            </span>
          ) : (
            <span className="text-amber-700 dark:text-amber-400">발산 (|r| ≥ 1이므로)</span>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950">
        <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">항의 변화</div>
        <div className="flex items-end gap-1.5 h-40 overflow-x-auto">
          {terms.map((v, i) => {
            const max = Math.max(...terms.map(Math.abs), 0.01);
            const heightPct = (Math.abs(v) / max) * 90;
            const isNeg = v < 0;
            return (
              <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0" style={{ width: '38px' }}>
                <span className="text-[10px] font-mono text-zinc-600 dark:text-zinc-400">{v.toFixed(2)}</span>
                <div
                  className={`w-full rounded-t ${isNeg ? 'bg-rose-500' : 'bg-blue-600'}`}
                  style={{ height: `${Math.max(2, heightPct)}%` }}
                />
                <span className="text-xs text-zinc-500 dark:text-zinc-500">a{i + 1}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <SliderRow label="첫째항 a" value={a} min={-5} max={5} step={0.5} onChange={setA} />
        <SliderRow label="공비 r" value={r} min={-2} max={2} step={0.05} onChange={setR} />
        <SliderRow label="항수 n" value={n} min={3} max={MAX_TERMS} step={1} onChange={setN} />
      </div>
    </div>
  );
}
