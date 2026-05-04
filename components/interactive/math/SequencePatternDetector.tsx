'use client';

// M4-CR-01 규칙 찾기 (수열) — 등차·등비·제곱·합 등.

import { useMemo, useState } from 'react';

type Rule = '+a' | '×a' | 'square' | 'fib';

const RULES: Array<{ id: Rule; label: string; build: (n: number) => number }> = [
  { id: '+a', label: '같은 수 더하기 (등차)', build: (n) => 3 + n * 2 },
  { id: '×a', label: '같은 수 곱하기 (등비)', build: (n) => 1 * Math.pow(2, n) },
  { id: 'square', label: '제곱수 (1, 4, 9, 16…)', build: (n) => (n + 1) * (n + 1) },
  { id: 'fib', label: '피보나치 (앞 두 수의 합)', build: (n) => fib(n + 1) },
];

function fib(n: number): number {
  let a = 1, b = 1;
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return n === 0 ? 1 : b;
}

export function SequencePatternDetector() {
  const [ruleId, setRuleId] = useState<Rule>('+a');
  const [length, setLength] = useState(8);

  const rule = RULES.find((r) => r.id === ruleId)!;
  const seq = useMemo(
    () => Array.from({ length }, (_, i) => rule.build(i)),
    [rule, length],
  );
  const diffs = useMemo(
    () => seq.slice(1).map((v, i) => v - seq[i]),
    [seq],
  );
  const ratios = useMemo(
    () => seq.slice(1).map((v, i) => (seq[i] === 0 ? 0 : v / seq[i])),
    [seq],
  );

  const max = Math.max(...seq, 1);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          수열 규칙 탐지기
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          숫자 사이의 <strong>차이</strong> 또는 <strong>비율</strong>이 일정하면 규칙이 보여요. 4가지 대표 규칙을 비교해 보세요.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {RULES.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setRuleId(r.id)}
            className={`px-3 py-2 rounded-md text-xs border-2 min-h-[40px] ${
              ruleId === r.id
                ? 'bg-blue-600 text-white border-blue-700'
                : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 p-4 space-y-3">
        <div className="font-mono text-zinc-900 dark:text-zinc-100">
          {seq.join(', ')}
        </div>
        <div className="flex items-end gap-1 h-20">
          {seq.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center justify-end">
              <div
                className="w-full bg-blue-500 rounded-t"
                style={{ height: `${(v / max) * 100}%` }}
                title={String(v)}
              />
              <div className="text-[9px] text-zinc-500 mt-0.5">{i + 1}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 text-xs">
          <div className="text-zinc-500 dark:text-zinc-400 mb-1">차 (다음 - 이전)</div>
          <div className="font-mono text-sm text-zinc-900 dark:text-zinc-100">
            {diffs.join(', ')}
          </div>
        </div>
        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/30 border-l-4 border-purple-500 p-3 text-xs">
          <div className="text-zinc-500 dark:text-zinc-400 mb-1">비 (다음 ÷ 이전)</div>
          <div className="font-mono text-sm text-zinc-900 dark:text-zinc-100">
            {ratios.map((r) => r.toFixed(2)).join(', ')}
          </div>
        </div>
      </div>

      <div>
        <label className="text-xs text-zinc-500 dark:text-zinc-400">항 수: {length}</label>
        <input
          type="range"
          min={4}
          max={12}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full"
          aria-label="수열 길이"
        />
      </div>
    </div>
  );
}
