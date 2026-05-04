'use client';

// M4-NA-04 소수의 덧셈과 뺄셈 — 자릿값 정렬 시각화.

import { useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

type Op = '+' | '-';

function digitsOf(n: number, decimals: number): { whole: number[]; frac: number[] } {
  const fixed = Math.abs(n).toFixed(decimals);
  const [w, f = ''] = fixed.split('.');
  return {
    whole: w.padStart(3, ' ').split('').map((c) => (c === ' ' ? -1 : Number(c))),
    frac: f.padEnd(decimals, '0').split('').map(Number),
  };
}

export function DecimalPlaceColumns() {
  const [a, setA] = useState(2.34);
  const [b, setB] = useState(1.7);
  const [op, setOp] = useState<Op>('+');

  const result = op === '+' ? a + b : a - b;
  const decimals = 2;
  const da = digitsOf(a, decimals);
  const db = digitsOf(b, decimals);
  const dr = digitsOf(result, decimals);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          소수의 덧셈/뺄셈 — 자릿값 정렬
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          소수점 위치를 맞춰서 같은 자리끼리 더하거나 빼야 해요. 같은 자리란 소수점 기준 거리가 같은 자리예요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 font-mono text-lg">
          <PlaceRow label="" digits={da} decimals={decimals} />
          <div className="flex items-center">
            <span className="w-8 text-zinc-500">{op}</span>
            <PlaceRow label="" digits={db} decimals={decimals} compact />
          </div>
          <div className="border-t-2 border-zinc-300 dark:border-zinc-600 pt-2">
            <PlaceRow label="" digits={dr} decimals={decimals} highlight />
          </div>
        </div>

        <div className="space-y-3">
          <SliderRow label="a" value={a} min={0} max={9.99} step={0.01} onChange={setA} />
          <SliderRow label="b" value={b} min={0} max={9.99} step={0.01} onChange={setB} />
          <div className="flex gap-2">
            {(['+', '-'] as const).map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => setOp(o)}
                className={`flex-1 min-h-[44px] rounded-md border-2 font-mono text-lg ${
                  op === o
                    ? 'bg-blue-600 text-white border-blue-700'
                    : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200'
                }`}
              >
                {o}
              </button>
            ))}
          </div>
          <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-3 text-sm font-mono">
            {a.toFixed(2)} {op} {b.toFixed(2)} = <strong>{result.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaceRow({ digits, decimals, highlight, compact }: {
  label: string;
  digits: { whole: number[]; frac: number[] };
  decimals: number;
  highlight?: boolean;
  compact?: boolean;
}) {
  const cellClass = `inline-block w-7 h-9 leading-9 text-center border-b ${
    highlight ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-500' : 'border-zinc-300 dark:border-zinc-700'
  }`;
  return (
    <div className={compact ? '' : 'pl-8'}>
      {digits.whole.map((d, i) => (
        <span key={`w${i}`} className={cellClass}>
          {d < 0 ? ' ' : d}
        </span>
      ))}
      <span className="inline-block w-3 text-center text-blue-600 dark:text-blue-400 font-bold">.</span>
      {digits.frac.slice(0, decimals).map((d, i) => (
        <span key={`f${i}`} className={cellClass}>{d}</span>
      ))}
    </div>
  );
}
