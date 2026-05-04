'use client';

// M7-CR-01 문자와 식 — 동류항 묶기 시뮬레이터.

import { useMemo, useState } from 'react';

interface Term {
  coef: number;
  symbol: 'x' | 'y' | '1';
}

const PRESETS: Array<{ label: string; terms: Term[] }> = [
  { label: '3x + 2x − x', terms: [{ coef: 3, symbol: 'x' }, { coef: 2, symbol: 'x' }, { coef: -1, symbol: 'x' }] },
  { label: '2x + 3y + 4x', terms: [{ coef: 2, symbol: 'x' }, { coef: 3, symbol: 'y' }, { coef: 4, symbol: 'x' }] },
  { label: '5 + 3x − 2 + x', terms: [{ coef: 5, symbol: '1' }, { coef: 3, symbol: 'x' }, { coef: -2, symbol: '1' }, { coef: 1, symbol: 'x' }] },
];

export function AlgebraicExpressionBuilder() {
  const [presetIdx, setPresetIdx] = useState(0);
  const [grouped, setGrouped] = useState(false);

  const terms = PRESETS[presetIdx].terms;

  const result = useMemo(() => {
    const sum: Record<string, number> = { x: 0, y: 0, '1': 0 };
    terms.forEach((t) => {
      sum[t.symbol] += t.coef;
    });
    return sum;
  }, [terms]);

  const symbolColor = (s: Term['symbol']) =>
    s === 'x' ? 'bg-blue-100 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700'
      : s === 'y' ? 'bg-purple-100 dark:bg-purple-950/50 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700'
      : 'bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700';

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          동류항 묶기 — 색깔별로 모으기
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          문자가 같은 항(<strong>동류항</strong>)끼리만 더하거나 뺄 수 있어요. x와 y는 절대 합쳐지지 않아요.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p, i) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setPresetIdx(i);
              setGrouped(false);
            }}
            className={`px-3 py-2 text-sm rounded-md border min-h-[44px] ${
              i === presetIdx
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="text-xs text-zinc-500 mb-2">원래 식</div>
        <div className="flex flex-wrap gap-2 mb-4">
          {terms.map((t, i) => (
            <span
              key={i}
              className={`inline-flex items-center px-3 py-2 rounded-lg border-2 font-mono text-base ${symbolColor(t.symbol)}`}
            >
              {i > 0 && (t.coef >= 0 ? '+ ' : '− ')}
              {Math.abs(t.coef) === 1 && t.symbol !== '1' ? '' : Math.abs(t.coef)}
              {t.symbol === '1' ? '' : t.symbol}
            </span>
          ))}
        </div>

        {grouped && (
          <>
            <div className="text-xs text-zinc-500 mb-2">동류항끼리 묶고 합치기</div>
            <div className="flex flex-wrap gap-3 items-center text-lg font-mono">
              {(['x', 'y', '1'] as const).map((s) => {
                if (result[s] === 0) return null;
                return (
                  <span
                    key={s}
                    className={`inline-flex items-center px-3 py-2 rounded-lg border-2 ${symbolColor(s)}`}
                  >
                    {result[s] > 0 ? '+' : '−'} {Math.abs(result[s]) === 1 && s !== '1' ? '' : Math.abs(result[s])}
                    {s === '1' ? '' : s}
                  </span>
                );
              })}
            </div>
          </>
        )}
      </div>

      <button
        type="button"
        onClick={() => setGrouped((g) => !g)}
        className="w-full px-4 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 min-h-[44px]"
      >
        {grouped ? '↺ 다시 보기' : '✦ 동류항 묶기'}
      </button>

      <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-4 text-sm text-zinc-700 dark:text-zinc-300">
        <strong>흔한 오개념:</strong> 2x + 3y = 5xy 가 아니에요. 문자가 다르면 그냥 둬야 해요.
      </div>
    </div>
  );
}
