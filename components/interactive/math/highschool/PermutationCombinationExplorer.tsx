'use client';

// M-PS-01 순열·조합 — n개에서 r개 뽑기를 트리·공식으로 동시에 시각화.

import { useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

type Mode = 'permutation' | 'combination' | 'repeat-permutation' | 'circular';

function fact(n: number): number {
  if (n < 0) return NaN;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

export function PermutationCombinationExplorer() {
  const [n, setN] = useState(5);
  const [r, setR] = useState(3);
  const [mode, setMode] = useState<Mode>('permutation');

  const safeR = Math.min(r, n);

  const value = (() => {
    switch (mode) {
      case 'permutation':
        return fact(n) / fact(n - safeR);
      case 'combination':
        return fact(n) / (fact(safeR) * fact(n - safeR));
      case 'repeat-permutation':
        return Math.pow(n, safeR);
      case 'circular':
        return n >= 1 ? fact(n - 1) : 0;
    }
  })();

  const formula = (() => {
    switch (mode) {
      case 'permutation':
        return `_{${n}}P_{${safeR}} = \\frac{${n}!}{(${n}-${safeR})!} = ${value}`;
      case 'combination':
        return `_{${n}}C_{${safeR}} = \\frac{${n}!}{${safeR}!\\,(${n}-${safeR})!} = ${value}`;
      case 'repeat-permutation':
        return `\\Pi_{${n}}^{${safeR}} = ${n}^{${safeR}} = ${value}`;
      case 'circular':
        return `(${n}-1)! = ${value}`;
    }
  })();

  // tree visualization for small permutation/combination
  const items = Array.from({ length: n }, (_, i) => String.fromCharCode(65 + i));
  const samples: string[][] = [];
  if (mode === 'permutation' && n <= 5 && safeR <= 4) {
    const out: string[][] = [];
    const used = new Set<number>();
    function rec(path: number[]) {
      if (path.length === safeR) { out.push(path.map(i => items[i])); return; }
      for (let i = 0; i < n; i++) if (!used.has(i)) { used.add(i); rec([...path, i]); used.delete(i); }
    }
    rec([]);
    samples.push(...out.slice(0, 24));
  } else if (mode === 'combination' && n <= 6 && safeR <= 4) {
    const out: string[][] = [];
    function rec(start: number, path: number[]) {
      if (path.length === safeR) { out.push(path.map(i => items[i])); return; }
      for (let i = start; i < n; i++) rec(i + 1, [...path, i]);
    }
    rec(0, []);
    samples.push(...out.slice(0, 24));
  }

  const modeButtons: { id: Mode; label: string }[] = [
    { id: 'permutation', label: '순열 nPr' },
    { id: 'combination', label: '조합 nCr' },
    { id: 'repeat-permutation', label: '중복순열 n^r' },
    { id: 'circular', label: '원순열 (n−1)!' },
  ];

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          순열 vs 조합 — 「순서가 중요한가?」 한 줄로 갈리는 차이
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          순서가 의미 있으면 <strong>순열(P)</strong>, 묶음만 보면 <strong>조합(C)</strong>이에요.
          중복을 허용하면 n^r, 원형으로 앉히면 (n−1)! — 같은 「뽑기」도 조건에 따라 공식이 갈려요.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {modeButtons.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setMode(b.id)}
            className={`min-h-[44px] px-3 rounded-md text-sm border-2 ${
              mode === b.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold'
                : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <SliderRow label="n (전체 수)" value={n} min={1} max={10} step={1} onChange={setN} format={(v) => v.toString()} />
        {mode !== 'circular' && (
          <SliderRow label="r (뽑을 수)" value={r} min={0} max={Math.min(10, n)} step={1} onChange={setR} format={(v) => v.toString()} />
        )}
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-5 text-center">
        <MathFormula tex={formula} />
        <div className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
          {mode === 'permutation' && `${n}명에서 ${safeR}명을 일렬로 세우는 경우의 수`}
          {mode === 'combination' && `${n}명에서 ${safeR}명을 묶어 뽑는 경우의 수`}
          {mode === 'repeat-permutation' && `${n}글자에서 ${safeR}자리를 중복 허용해 뽑는 경우의 수`}
          {mode === 'circular' && `${n}명을 원탁에 앉히는 경우의 수`}
        </div>
      </div>

      {samples.length > 0 && (
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
            예시 나열 (최대 24개) — A,B,C,…를 {n}개 중에서 {safeR}개
          </div>
          <div className="flex flex-wrap gap-2">
            {samples.map((s, i) => (
              <span key={i} className="px-2 py-1 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 font-mono text-xs">
                {s.join(mode === 'combination' ? '·' : '→')}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
