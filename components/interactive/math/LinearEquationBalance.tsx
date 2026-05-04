'use client';

// M7-CR-02 일차방정식 — 양팔 저울로 해 구하기.

import { useMemo, useState } from 'react';

export function LinearEquationBalance() {
  // ax + b = cx + d 형태
  const [a, setA] = useState(3);
  const [b, setB] = useState(2);
  const [c, setC] = useState(1);
  const [d, setD] = useState(8);
  const [step, setStep] = useState(0);

  const solution = useMemo(() => {
    const denom = a - c;
    if (denom === 0) return null;
    return (d - b) / denom;
  }, [a, b, c, d]);

  const STEPS = [
    {
      label: '시작',
      desc: `양팔 저울에 ${a}x + ${b} = ${c}x + ${d} 가 놓여 있어요. 저울이 균형이려면 양쪽이 같아야 해요.`,
    },
    {
      label: '양변에서 같은 것 빼기',
      desc: `양쪽에서 ${c}x를 빼고, 양쪽에서 ${b}을 빼요. 그러면 ${a - c}x = ${d - b}.`,
    },
    {
      label: `양변을 ${a - c}로 나누기`,
      desc:
        solution === null
          ? `${a - c}로 나눌 수 없어요. (계수가 같으면 해가 없거나 무수히 많음)`
          : `x = ${d - b} ÷ ${a - c} = ${solution}.`,
    },
  ];

  const cur = STEPS[Math.min(step, STEPS.length - 1)];
  const left = a * (solution ?? 0) + b;
  const right = c * (solution ?? 0) + d;
  const balanced = step >= 2 && solution !== null && Math.abs(left - right) < 1e-9;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          일차방정식 — 양팔 저울
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          저울이 균형을 잃지 않게 <strong>양쪽에 똑같이</strong> 빼고 나눠요. x의 정체를 찾아봐요.
        </p>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4">
        <svg viewBox="0 0 320 160" className="w-full max-w-md mx-auto">
          <line x1="160" y1="20" x2="160" y2="120" stroke="#6b7280" strokeWidth="3" />
          <g transform={`translate(160 50) rotate(${balanced ? 0 : 0})`}>
            <line x1="-100" y1="0" x2="100" y2="0" stroke="#6b7280" strokeWidth="4" />
            <rect x="-130" y="0" width="60" height="40" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
            <text x="-100" y="25" textAnchor="middle" className="fill-blue-700 dark:fill-blue-300 font-mono" fontSize="14">
              {a}x+{b}
            </text>
            <rect x="70" y="0" width="60" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
            <text x="100" y="25" textAnchor="middle" className="fill-pink-700 dark:fill-pink-300 font-mono" fontSize="14">
              {c}x+{d}
            </text>
          </g>
          <polygon points="140,120 180,120 160,140" fill="#6b7280" />
        </svg>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {[
          ['a', a, setA, 1, 9],
          ['b', b, setB, -9, 9],
          ['c', c, setC, 0, 8],
          ['d', d, setD, -9, 9],
        ].map(([label, value, set, min, max]) => (
          <div key={label as string} className="space-y-1">
            <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300 font-mono">
              {label as string} = {value as number}
            </div>
            <input
              type="range"
              min={min as number}
              max={max as number}
              value={value as number}
              onChange={(e) => {
                (set as (v: number) => void)(Number(e.target.value));
                setStep(0);
              }}
              className="w-full h-3 cursor-pointer accent-blue-600"
              aria-label={label as string}
              style={{ minHeight: 44 }}
            />
          </div>
        ))}
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
    </div>
  );
}
