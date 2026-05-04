'use client';

// M8-NA-01 유리수와 순환소수 — 분수 → 소수 변환, 순환마디 강조.

import { useMemo, useState } from 'react';

interface Result {
  intPart: string;
  prefix: string;
  cycle: string;
  isTerminating: boolean;
}

function divide(num: number, den: number, maxDigits = 30): Result {
  if (den === 0) return { intPart: '∞', prefix: '', cycle: '', isTerminating: true };

  const intPart = Math.floor(num / den).toString();
  let remainder = num % den;
  if (remainder === 0) return { intPart, prefix: '', cycle: '', isTerminating: true };

  const seen = new Map<number, number>();
  const digits: string[] = [];
  let cycleStart = -1;

  for (let i = 0; i < maxDigits; i++) {
    if (seen.has(remainder)) {
      cycleStart = seen.get(remainder)!;
      break;
    }
    seen.set(remainder, i);
    remainder *= 10;
    digits.push(Math.floor(remainder / den).toString());
    remainder %= den;
    if (remainder === 0) {
      return { intPart, prefix: digits.join(''), cycle: '', isTerminating: true };
    }
  }

  if (cycleStart >= 0) {
    return {
      intPart,
      prefix: digits.slice(0, cycleStart).join(''),
      cycle: digits.slice(cycleStart).join(''),
      isTerminating: false,
    };
  }
  return { intPart, prefix: digits.join(''), cycle: '', isTerminating: true };
}

export function RepeatingDecimalExplorer() {
  const [num, setNum] = useState(1);
  const [den, setDen] = useState(7);

  const result = useMemo(() => divide(num, den), [num, den]);

  const denFactors = useMemo(() => {
    let n = den;
    const factors: number[] = [];
    for (const p of [2, 3, 5, 7, 11, 13]) {
      while (n % p === 0) {
        factors.push(p);
        n = n / p;
      }
    }
    if (n > 1) factors.push(n);
    return factors;
  }, [den]);

  const onlyTwoFive = denFactors.every((f) => f === 2 || f === 5);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          분수 → 소수 — 순환마디 찾기
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          유리수는 <strong>유한소수</strong>이거나 <strong>순환소수</strong>예요. 분모의 소인수만 보면 알 수 있어요.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300 font-mono">
            분자 = {num}
          </div>
          <input
            type="range"
            min={1}
            max={20}
            value={num}
            onChange={(e) => setNum(Number(e.target.value))}
            className="w-full h-3 cursor-pointer accent-blue-600"
            aria-label="분자"
            style={{ minHeight: 44 }}
          />
        </div>
        <div className="space-y-1">
          <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300 font-mono">
            분모 = {den}
          </div>
          <input
            type="range"
            min={2}
            max={30}
            value={den}
            onChange={(e) => setDen(Number(e.target.value))}
            className="w-full h-3 cursor-pointer accent-blue-600"
            aria-label="분모"
            style={{ minHeight: 44 }}
          />
        </div>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-5 text-center">
        <div className="text-xs text-zinc-500 mb-1">분수</div>
        <div className="text-xl mb-3 font-mono text-zinc-800 dark:text-zinc-200">
          {num}/{den}
        </div>
        <div className="text-xs text-zinc-500 mb-1">소수 표현</div>
        <div className="text-2xl font-mono">
          <span className="text-zinc-800 dark:text-zinc-200">
            {result.intPart}
            {(result.prefix || result.cycle) && '.'}
            {result.prefix}
          </span>
          {result.cycle && (
            <span className="text-purple-700 dark:text-purple-300 underline decoration-2 underline-offset-2 font-bold">
              {result.cycle}
            </span>
          )}
          {result.cycle && (
            <span className="text-zinc-500 ml-1">…</span>
          )}
        </div>
        {result.cycle && (
          <div className="text-xs text-purple-700 dark:text-purple-300 mt-2">
            순환마디: <span className="font-mono font-bold">({result.cycle})</span> · 길이 {result.cycle.length}
          </div>
        )}
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-4 text-sm text-zinc-700 dark:text-zinc-300">
        <div className="mb-1">
          <strong>분모 {den}</strong>의 소인수: {denFactors.join(' × ') || '1'}
        </div>
        {onlyTwoFive ? (
          <div>분모의 소인수가 <strong>2와 5뿐</strong>이라 <strong>유한소수</strong>로 떨어져요.</div>
        ) : (
          <div>2·5 외의 소인수가 있어 <strong>순환소수</strong>가 돼요.</div>
        )}
      </div>
    </div>
  );
}
