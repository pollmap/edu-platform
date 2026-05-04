'use client';

// M-CA2-01 수열의 극한 — 수렴/발산 판정.

import { useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';

type SeqType = 'inv' | 'expo' | 'oscillate' | 'log';

interface SeqDef {
  id: SeqType;
  label: string;
  tex: string;
  fn: (n: number) => number;
  limit: number | null;
  diverges: boolean;
  desc: string;
}

const SEQS: SeqDef[] = [
  {
    id: 'inv',
    label: '1/n',
    tex: 'a_n = \\frac{1}{n}',
    fn: (n) => 1 / n,
    limit: 0,
    diverges: false,
    desc: 'n이 커질수록 0에 가까워짐 → 수렴 (극한 0)',
  },
  {
    id: 'expo',
    label: '(0.7)ⁿ',
    tex: 'a_n = 0.7^n',
    fn: (n) => Math.pow(0.7, n),
    limit: 0,
    diverges: false,
    desc: '|r| < 1인 등비수열은 0으로 수렴',
  },
  {
    id: 'oscillate',
    label: '(-1)ⁿ',
    tex: 'a_n = (-1)^n',
    fn: (n) => Math.pow(-1, n),
    limit: null,
    diverges: true,
    desc: '+1, −1을 반복 → 수렴값 없음 (진동발산)',
  },
  {
    id: 'log',
    label: 'log n',
    tex: 'a_n = \\log_{10} n',
    fn: (n) => Math.log10(n),
    limit: null,
    diverges: true,
    desc: '느리지만 ∞로 발산',
  },
];

export function SequenceLimitExplorer() {
  const [seqId, setSeqId] = useState<SeqType>('inv');
  const [n, setN] = useState(20);

  const current = SEQS.find((s) => s.id === seqId)!;
  const recent = Array.from({ length: Math.min(15, n) }, (_, i) => {
    const idx = n - Math.min(15, n) + i + 1;
    return { n: idx, val: current.fn(idx) };
  });
  const last = current.fn(n);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          수열의 극한 — n → ∞일 때 어디로 가나
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          n을 크게 키워 보세요. 한 값으로 수렴하는지, 발산하는지 직접 확인.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {SEQS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSeqId(s.id)}
            className={`px-3 py-2 rounded-md text-sm font-mono min-h-[44px] transition-colors ${
              seqId === s.id
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3 text-center text-lg">
        <MathFormula tex={current.tex} />
      </div>

      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950">
        <div className="text-xs text-zinc-500 mb-2">최근 15개 항</div>
        <div className="font-mono text-xs space-y-1 max-h-48 overflow-y-auto">
          {recent.map((r) => (
            <div key={r.n} className="flex justify-between">
              <span>a_{r.n}</span>
              <span className={Math.abs(r.val) < 0.01 ? 'text-emerald-600' : ''}>{r.val.toFixed(6)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg">
          <div className="flex justify-between text-sm">
            <span className="font-bold text-blue-700 dark:text-blue-400">n =</span>
            <span className="font-mono text-red-500 font-semibold">{n}</span>
          </div>
          <input
            type="range"
            value={n}
            min={1}
            max={1000}
            step={1}
            onChange={(e) => setN(parseInt(e.target.value))}
            className="w-full h-3 cursor-pointer accent-blue-600 mt-2"
            aria-label="n"
          />
        </div>

        <div
          className={`rounded-xl p-4 text-sm border-l-4 ${
            current.diverges
              ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-500'
              : 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500'
          }`}
        >
          <p className="font-semibold mb-1">
            {current.diverges ? '발산 (수렴값 없음)' : `수렴 → ${current.limit}`}
          </p>
          <p>현재 a_{n} = <span className="font-mono">{last.toFixed(8)}</span></p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">{current.desc}</p>
        </div>
      </div>
    </div>
  );
}
