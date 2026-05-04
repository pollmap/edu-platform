'use client';

// M4-NA-02 곱셈 표준 알고리즘 — 세로셈 단계별.

import { useMemo, useState } from 'react';

export function StandardMultiplicationAlgorithm() {
  const [a, setA] = useState(34);
  const [b, setB] = useState(7);
  const [step, setStep] = useState(0);

  const tens = Math.floor(a / 10);
  const ones = a % 10;
  const ones_x_b = ones * b;
  const ones_digit = ones_x_b % 10;
  const carry = Math.floor(ones_x_b / 10);
  const tens_x_b = tens * b + carry;
  const total = a * b;

  const STEPS = useMemo(
    () => [
      { label: '시작', desc: `${a} × ${b} 를 세로셈으로 풀어 봐요.` },
      { label: '일의 자리 곱', desc: `${ones} × ${b} = ${ones_x_b}. 일의 자리에 ${ones_digit}, ${carry > 0 ? `십의 자리로 ${carry} 올림` : '올림 없음'}.` },
      { label: '십의 자리 곱', desc: `${tens} × ${b} = ${tens * b}${carry > 0 ? ` (+ 올림 ${carry} = ${tens_x_b})` : ''}.` },
      { label: '완성', desc: `결과: ${a} × ${b} = ${total}` },
    ],
    [a, b, ones, ones_x_b, ones_digit, carry, tens, tens_x_b, total],
  );

  const cur = STEPS[Math.min(step, STEPS.length - 1)];

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          곱셈 세로셈 — 표준 알고리즘
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          일의 자리부터 곱하고, 10이 넘으면 윗자리로 <strong>올림</strong>해요. 단계별로 따라가 봐요.
        </p>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-6">
        <div className="font-mono text-2xl text-right max-w-[180px] mx-auto leading-tight">
          <div className={`relative ${step >= 2 && carry > 0 ? '' : 'invisible'}`}>
            <span className="text-xs text-red-600 dark:text-red-400 absolute -top-3 left-0 right-8 text-right">
              {carry || ''}
            </span>
            <span className="opacity-0">_</span>
          </div>
          <div className={step >= 1 ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400'}>{a}</div>
          <div className={step >= 1 ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400'}>×{' '}{b}</div>
          <div className="border-t border-zinc-400 my-1" />
          <div>
            <span className={step >= 2 ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-zinc-300'}>
              {step >= 3 ? total : step >= 2 ? `${tens_x_b}${ones_digit}` : ' '}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-4">
        <div className="font-bold text-blue-800 dark:text-blue-300 mb-1">{cur.label}</div>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">{cur.desc}</p>
      </div>

      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="px-3 py-2 text-sm rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 disabled:opacity-40 hover:bg-zinc-50 dark:hover:bg-zinc-800 min-h-[44px]"
        >
          ← 이전
        </button>
        <span className="text-xs text-zinc-500">{step + 1} / {STEPS.length}</span>
        <button
          type="button"
          onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
          disabled={step >= STEPS.length - 1}
          className="px-3 py-2 text-sm rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 disabled:opacity-40 hover:bg-zinc-50 dark:hover:bg-zinc-800 min-h-[44px]"
        >
          다음 →
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300">두 자리 수: {a}</div>
          <input
            type="range"
            min={11}
            max={99}
            value={a}
            onChange={(e) => { setA(Number(e.target.value)); setStep(0); }}
            className="w-full h-3 cursor-pointer"
            aria-label="두 자리 수"
          />
        </div>
        <div className="space-y-1">
          <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300">한 자리 수: {b}</div>
          <input
            type="range"
            min={2}
            max={9}
            value={b}
            onChange={(e) => { setB(Number(e.target.value)); setStep(0); }}
            className="w-full h-3 cursor-pointer"
            aria-label="한 자리 수"
          />
        </div>
      </div>
    </div>
  );
}
