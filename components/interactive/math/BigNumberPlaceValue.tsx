'use client';

// M4-NA-01 큰 수 (억·조) — 자릿값 단계별 확대.

import { useState } from 'react';

const SAMPLES = [
  { label: '1만', n: 10_000 },
  { label: '100만', n: 1_000_000 },
  { label: '1억', n: 100_000_000 },
  { label: '1조', n: 1_000_000_000_000 },
  { label: '5조 7천억', n: 5_700_000_000_000 },
  { label: '12조 3456억 7890만', n: 12_345_678_900_000 },
];

const UNIT_LABELS = ['', '만', '억', '조', '경']; // 4자리씩 묶음

function chunks(n: number): Array<{ unit: string; value: number }> {
  const out: Array<{ unit: string; value: number }> = [];
  let i = 0;
  let m = Math.floor(n);
  while (m > 0 && i < UNIT_LABELS.length) {
    const v = m % 10000;
    out.push({ unit: UNIT_LABELS[i] ?? '?', value: v });
    m = Math.floor(m / 10000);
    i++;
  }
  return out.reverse();
}

function format(n: number): string {
  const cs = chunks(n);
  return cs
    .filter((c) => c.value !== 0 || cs.length === 1)
    .map((c) => `${c.value.toLocaleString()}${c.unit}`)
    .join(' ');
}

export function BigNumberPlaceValue() {
  const [n, setN] = useState<number>(1_234_567_890);
  const cs = chunks(n);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          큰 수 — 만 · 억 · 조
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          한국어는 큰 수를 <strong>4자리씩 묶어서</strong> 만·억·조 같은 단위 이름을 붙여요. 영어는 3자리씩 묶어 thousand·million 을 쓰는 것과 다른 방식이에요.
        </p>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-4">
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">현재 수</div>
        <div className="font-mono text-xl text-zinc-900 dark:text-zinc-100 break-all">
          {n.toLocaleString()}
        </div>
        <div className="text-sm text-zinc-700 dark:text-zinc-300 mt-1">
          한글 표기: <strong>{format(n)}</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {cs.map((c, i) => (
          <div key={i} className="rounded-lg border-2 border-blue-300 dark:border-blue-700 bg-white dark:bg-zinc-900 p-3 text-center">
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400">{c.unit || '일의 묶음'}</div>
            <div className="font-mono text-lg font-bold text-blue-700 dark:text-blue-300">
              {c.value.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="text-xs text-zinc-500 dark:text-zinc-400">예시 수</div>
        <div className="flex flex-wrap gap-2">
          {SAMPLES.map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => setN(s.n)}
              className="px-3 py-2 text-xs rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 min-h-[36px] font-mono"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
