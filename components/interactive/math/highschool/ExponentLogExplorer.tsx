'use client';

// M-AL-01 지수와 로그 — 지수와 로그의 관계 (역연산) 시각화.

import { useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

export function ExponentLogExplorer() {
  const [base, setBase] = useState(2);
  const [exponent, setExponent] = useState(3);

  const result = Math.pow(base, exponent);
  const logResult = Math.log(result) / Math.log(base);
  const expanded = Array.from({ length: Math.max(0, Math.floor(Math.abs(exponent))) }, () => base.toFixed(0)).join(' × ') || '1';

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          지수 ↔ 로그 — 같은 사실을 두 가지 관점으로
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          지수는 「몇 번 곱했나」, 로그는 「몇 번 곱해야 하나」를 거꾸로 묻는 거예요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-4 space-y-3">
          <div className="text-sm font-semibold text-blue-800 dark:text-blue-300">지수 표현</div>
          <div className="text-center text-2xl">
            <MathFormula tex={`${base}^{${exponent.toFixed(2)}} = ${result.toFixed(4)}`} />
          </div>
          {Number.isInteger(exponent) && exponent >= 0 && exponent <= 10 ? (
            <div className="text-xs font-mono text-zinc-600 dark:text-zinc-400 text-center break-all">
              {exponent === 0 ? '1 (어떤 수의 0제곱 = 1)' : expanded}
            </div>
          ) : null}
        </div>
        <div className="rounded-xl bg-purple-50 dark:bg-purple-950/30 p-4 space-y-3">
          <div className="text-sm font-semibold text-purple-800 dark:text-purple-300">로그 표현 (역함수)</div>
          <div className="text-center text-2xl">
            <MathFormula tex={`\\log_{${base}} ${result.toFixed(4)} = ${logResult.toFixed(2)}`} />
          </div>
          <div className="text-xs text-zinc-600 dark:text-zinc-400 text-center">
            「{base}을 몇 번 곱해야 {result.toFixed(2)}이 되나?」
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <SliderRow
          label="밑 a"
          value={base}
          min={2}
          max={10}
          step={1}
          onChange={setBase}
        />
        <SliderRow
          label="지수 x"
          value={exponent}
          min={-3}
          max={6}
          step={0.5}
          onChange={setExponent}
        />
      </div>

      <details className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
        <summary className="font-semibold text-blue-700 dark:text-blue-400 cursor-pointer">로그법칙 한눈에</summary>
        <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300 font-mono pl-4">
          <li>• log(MN) = log M + log N</li>
          <li>• log(M/N) = log M − log N</li>
          <li>• log Mⁿ = n · log M</li>
          <li>• log_a M = log_b M / log_b a (밑 변환)</li>
          <li>• a^(log_a x) = x (역함수 성질)</li>
        </ul>
      </details>
    </div>
  );
}
