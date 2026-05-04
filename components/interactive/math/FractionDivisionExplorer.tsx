'use client';

// M6-NA-01 분수의 나눗셈 — 역수·면적 모델.
// (a/b) ÷ (c/d) = (a/b) × (d/c) 의 의미를 시각화.

import { useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function reduce(n: number, d: number): { n: number; d: number } {
  if (d === 0) return { n: 0, d: 1 };
  const g = gcd(Math.abs(n), Math.abs(d));
  return { n: n / g, d: d / g };
}

export function FractionDivisionExplorer() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const [c, setC] = useState(2);
  const [d, setD] = useState(5);

  const reciprocal = { n: d, d: c };
  const productN = a * d;
  const productD = b * c;
  const result = reduce(productN, productD);
  const decimal = productD === 0 ? Infinity : productN / productD;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          분수의 나눗셈 — 역수 곱셈
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          분수로 나누는 것은 <strong>그 분수의 역수를 곱하는 것</strong>과 같아요. <code>(a/b) ÷ (c/d) = (a/b) × (d/c)</code>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <FormulaRow label="원래 식" tex={`${a}/${b} ÷ ${c}/${d}`} />
          <FormulaRow label="나눌 분수의 역수" tex={`${reciprocal.n}/${reciprocal.d}`} highlight />
          <FormulaRow label="곱셈으로 변환" tex={`${a}/${b} × ${reciprocal.n}/${reciprocal.d}`} />
          <FormulaRow label="분자·분모 곱" tex={`${productN}/${productD}`} />
          <FormulaRow label="기약분수" tex={`${result.n}/${result.d} ≈ ${decimal.toFixed(3)}`} highlight />
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <SliderRow label="a (분자 ①)" value={a} min={1} max={12} step={1} onChange={setA} />
            <SliderRow label="b (분모 ①)" value={b} min={1} max={12} step={1} onChange={setB} />
            <SliderRow label="c (분자 ②)" value={c} min={1} max={12} step={1} onChange={setC} />
            <SliderRow label="d (분모 ②)" value={d} min={1} max={12} step={1} onChange={setD} />
          </div>
          <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-4 text-sm">
            <div className="font-mono text-zinc-900 dark:text-zinc-100 leading-relaxed">
              <div className="text-zinc-600 dark:text-zinc-400 text-xs mb-1">왜 역수일까?</div>
              {b}/1 의 1/{b} = {1}/{b}, 같은 식으로 c/d 의 역수 = d/c.
              나누기는 “몇 번 들어 있냐” 묻는 거예요.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormulaRow({ label, tex, highlight }: { label: string; tex: string; highlight?: boolean }) {
  return (
    <div className={`rounded-lg p-3 border ${
      highlight
        ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-400'
        : 'bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700'
    }`}>
      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mb-0.5">{label}</div>
      <div className="font-mono text-lg text-zinc-900 dark:text-zinc-100">{tex}</div>
    </div>
  );
}
