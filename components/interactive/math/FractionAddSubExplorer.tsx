'use client';

import { useMemo, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}
function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

interface FractionBarProps {
  num: number;
  den: number;
  color: string;
  label: string;
}

function FractionBar({ num, den, color, label }: FractionBarProps) {
  const cells = Array.from({ length: den });
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between text-xs text-zinc-600 dark:text-zinc-400">
        <span>{label}</span>
        <span className="font-mono">
          {num} / {den}
        </span>
      </div>
      <div className="grid grid-flow-col auto-cols-fr h-8 gap-px rounded overflow-hidden border border-zinc-300 dark:border-zinc-700">
        {cells.map((_, i) => (
          <div key={i} className={`${i < num ? color : 'bg-zinc-100 dark:bg-zinc-800'}`} />
        ))}
      </div>
    </div>
  );
}

export function FractionAddSubExplorer() {
  const [n1, setN1] = useState(1);
  const [d1, setD1] = useState(2);
  const [n2, setN2] = useState(1);
  const [d2, setD2] = useState(3);
  const [op, setOp] = useState<'+' | '-'>('+');

  const common = useMemo(() => lcm(d1, d2), [d1, d2]);
  const a = (n1 * common) / d1;
  const b = (n2 * common) / d2;
  const sumNum = op === '+' ? a + b : a - b;
  const g = sumNum === 0 ? 1 : Math.abs(gcd(Math.abs(sumNum), common));
  const finalNum = sumNum / g;
  const finalDen = common / g;

  const tex = `\\frac{${n1}}{${d1}} ${op} \\frac{${n2}}{${d2}} = \\frac{${a}}{${common}} ${op} \\frac{${b}}{${common}} = \\frac{${sumNum}}{${common}} = \\frac{${finalNum}}{${finalDen}}`;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
        분수의 덧셈·뺄셈 (분모가 다른)
      </h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
        분모가 다르면 먼저 <strong>통분</strong>해서 분모를 맞춘 뒤 분자끼리 더하거나 빼요.
      </p>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-4 mb-6 text-center text-lg overflow-x-auto">
        <MathFormula tex={tex} block />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <FractionBar num={n1} den={d1} color="bg-blue-500" label="첫 번째 분수" />
          <FractionBar num={n2} den={d2} color="bg-green-500" label="두 번째 분수" />
          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3">
            <FractionBar
              num={Math.max(0, sumNum)}
              den={common}
              color="bg-amber-500"
              label={`결과 (분모 ${common} 통분 후, 약분 전)`}
            />
            <p className="text-xs mt-2 text-zinc-500 dark:text-zinc-400">
              약분: 분자 분모를 최대공약수 {g} 로 나눈 결과 = {finalNum}/{finalDen}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <SliderRow label="분자 1" value={n1} min={1} max={d1} step={1} onChange={(v) => setN1(Math.min(v, d1))} />
          <SliderRow label="분모 1" value={d1} min={2} max={10} step={1} onChange={(v) => { setD1(v); if (n1 > v) setN1(v); }} />
          <SliderRow label="분자 2" value={n2} min={1} max={d2} step={1} onChange={(v) => setN2(Math.min(v, d2))} />
          <SliderRow label="분모 2" value={d2} min={2} max={10} step={1} onChange={(v) => { setD2(v); if (n2 > v) setN2(v); }} />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setOp('+')}
              aria-pressed={op === '+'}
              className={`flex-1 py-2 rounded-md border min-h-[44px] ${op === '+' ? 'bg-blue-600 text-white border-blue-700' : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700'}`}
            >
              + 더하기
            </button>
            <button
              type="button"
              onClick={() => setOp('-')}
              aria-pressed={op === '-'}
              className={`flex-1 py-2 rounded-md border min-h-[44px] ${op === '-' ? 'bg-blue-600 text-white border-blue-700' : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700'}`}
            >
              − 빼기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
