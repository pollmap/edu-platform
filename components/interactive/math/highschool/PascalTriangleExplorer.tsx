'use client';

// M-PS-02 이항정리 — 파스칼의 삼각형과 (a+b)^n 전개 시각화.

import { useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

function buildPascal(rows: number): number[][] {
  const out: number[][] = [];
  for (let r = 0; r <= rows; r++) {
    const row: number[] = [];
    for (let k = 0; k <= r; k++) {
      if (k === 0 || k === r) row.push(1);
      else row.push(out[r - 1][k - 1] + out[r - 1][k]);
    }
    out.push(row);
  }
  return out;
}

export function PascalTriangleExplorer() {
  const [n, setN] = useState(6);
  const [highlightK, setHighlightK] = useState<number | null>(null);

  const triangle = buildPascal(Math.min(n, 12));
  const lastRow = triangle[Math.min(n, 12)];

  const expansion = lastRow
    .map((c, k) => {
      const aPow = n - k;
      const bPow = k;
      const cStr = c === 1 ? '' : `${c}\\,`;
      const aStr = aPow === 0 ? '' : aPow === 1 ? 'a' : `a^{${aPow}}`;
      const bStr = bPow === 0 ? '' : bPow === 1 ? 'b' : `b^{${bPow}}`;
      return `${cStr}${aStr}${bStr}`;
    })
    .join(' + ');

  const sumRow = lastRow.reduce((s, v) => s + v, 0);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          파스칼의 삼각형 — (a+b)^n의 계수가 그대로 나오는 이유
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          n번째 줄의 k번째 수가 곧 <strong>nCk</strong>예요. 위 두 칸을 더해 채우는 단순한 규칙 하나로 이항계수가 모두 만들어져요.
        </p>
      </div>

      <SliderRow label="n (전개 차수)" value={n} min={0} max={12} step={1} onChange={setN} format={(v) => v.toString()} />

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-4 overflow-auto">
        <div className="flex flex-col items-center gap-1.5">
          {triangle.map((row, r) => (
            <div key={r} className="flex gap-1.5 justify-center">
              {row.map((c, k) => {
                const active = r === Math.min(n, 12) && (highlightK === null || highlightK === k);
                const isCurrentHighlight = r === Math.min(n, 12) && highlightK === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setHighlightK(highlightK === k ? null : k)}
                    className={`min-w-[36px] min-h-[36px] px-2 rounded-md text-xs font-mono transition-colors ${
                      isCurrentHighlight
                        ? 'bg-yellow-300 dark:bg-yellow-500 text-zinc-900 font-bold ring-2 ring-yellow-500'
                        : active
                          ? 'bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100'
                          : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                    }`}
                    aria-label={`행 ${r}, 위치 ${k}, 값 ${c}`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4 text-center overflow-x-auto">
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">전개식</div>
        <MathFormula tex={`(a+b)^{${n}} = ${expansion}`} />
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950/40 p-3">
          <div className="text-zinc-500 dark:text-zinc-400 text-xs">행 합 (= 2^n)</div>
          <div className="font-mono text-base text-zinc-800 dark:text-zinc-200">{sumRow} = 2^{n}</div>
        </div>
        <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950/40 p-3">
          <div className="text-zinc-500 dark:text-zinc-400 text-xs">하키스틱 정체성</div>
          <div className="font-mono text-xs text-zinc-700 dark:text-zinc-300">위 두 수 더하기 = 아래 수</div>
        </div>
      </div>
    </div>
  );
}
