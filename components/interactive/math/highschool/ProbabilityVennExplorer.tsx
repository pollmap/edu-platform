'use client';

// M-PS-03 확률 — 표본공간·사건의 합/교/여 벤다이어그램.

import { useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

export function ProbabilityVennExplorer() {
  const [pA, setPA] = useState(0.4);
  const [pB, setPB] = useState(0.5);
  const [pAB, setPAB] = useState(0.2);

  // clamp to valid prob
  const safePAB = Math.min(pAB, pA, pB);
  const onlyA = pA - safePAB;
  const onlyB = pB - safePAB;
  const neither = Math.max(0, 1 - onlyA - onlyB - safePAB);
  const union = onlyA + onlyB + safePAB;

  const VW = 320;
  const VH = 200;
  const cx1 = 110;
  const cx2 = 210;
  const cy = 100;
  const r = 70;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          표본공간과 사건 — 벤다이어그램으로 잡는 확률 직관
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          전체(표본공간)는 1. 두 사건 A, B의 「합집합 = 각각 합 − 교집합」.
          슬라이더로 P(A), P(B), P(A∩B)를 바꿔 보고 P(A∪B)가 어떻게 변하는지 확인해 봐요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <SliderRow label="P(A)" value={pA} min={0} max={1} step={0.01} onChange={setPA} format={(v) => v.toFixed(2)} />
        <SliderRow label="P(B)" value={pB} min={0} max={1} step={0.01} onChange={setPB} format={(v) => v.toFixed(2)} />
        <SliderRow label="P(A∩B)" value={safePAB} min={0} max={Math.min(pA, pB)} step={0.01} onChange={setPAB} format={(v) => v.toFixed(2)} />
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4 flex flex-col items-center">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-md h-auto">
          <rect x="2" y="2" width={VW - 4} height={VH - 4} fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" className="dark:fill-zinc-800 dark:stroke-zinc-600" rx="6" />
          <text x={VW - 8} y="14" textAnchor="end" fontSize="10" className="fill-zinc-600 dark:fill-zinc-400">U(전체)</text>
          <circle cx={cx1} cy={cy} r={r} fill="rgba(59,130,246,0.4)" stroke="#2563eb" strokeWidth="1.5" />
          <circle cx={cx2} cy={cy} r={r} fill="rgba(239,68,68,0.4)" stroke="#dc2626" strokeWidth="1.5" />
          <text x={cx1 - 30} y={cy + 4} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e3a8a" className="dark:fill-blue-300">A</text>
          <text x={cx2 + 30} y={cy + 4} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#7f1d1d" className="dark:fill-red-300">B</text>
          <text x={cx1 - 25} y={cy + 22} textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#1e293b" className="dark:fill-zinc-200">{onlyA.toFixed(2)}</text>
          <text x={(cx1 + cx2) / 2} y={cy + 22} textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#1e293b" className="dark:fill-zinc-200">{safePAB.toFixed(2)}</text>
          <text x={cx2 + 25} y={cy + 22} textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#1e293b" className="dark:fill-zinc-200">{onlyB.toFixed(2)}</text>
          <text x={VW / 2} y={VH - 10} textAnchor="middle" fontSize="10" fontFamily="monospace" className="fill-zinc-500 dark:fill-zinc-400">P(A^c∩B^c) = {neither.toFixed(2)}</text>
        </svg>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-4 text-center">
        <MathFormula tex={`P(A\\cup B) = P(A) + P(B) - P(A\\cap B) = ${pA.toFixed(2)} + ${pB.toFixed(2)} - ${safePAB.toFixed(2)} = ${union.toFixed(2)}`} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
        <div className="rounded bg-zinc-50 dark:bg-zinc-950/40 p-2">P(A) = {pA.toFixed(2)}</div>
        <div className="rounded bg-zinc-50 dark:bg-zinc-950/40 p-2">P(B) = {pB.toFixed(2)}</div>
        <div className="rounded bg-zinc-50 dark:bg-zinc-950/40 p-2">P(A∩B) = {safePAB.toFixed(2)}</div>
        <div className="rounded bg-zinc-50 dark:bg-zinc-950/40 p-2">P(A∪B) = {union.toFixed(2)}</div>
      </div>
    </div>
  );
}
