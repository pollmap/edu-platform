'use client';

// M-CM1-08 경우의 수 — 순열 nPr / 조합 nCr 의 차이를 트리·식·수치로 비교.
// 작은 n, r 에서 「실제 경우 나열」을 보여주고, 큰 값에선 식 계산만.

import { useMemo, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

function factorial(n: number): number {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

function nPr(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  return factorial(n) / factorial(n - r);
}

function nCr(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  return factorial(n) / (factorial(r) * factorial(n - r));
}

function listPermutations(items: string[], r: number): string[][] {
  if (r === 0) return [[]];
  const out: string[][] = [];
  for (let i = 0; i < items.length; i++) {
    const rest = items.slice(0, i).concat(items.slice(i + 1));
    for (const sub of listPermutations(rest, r - 1)) {
      out.push([items[i], ...sub]);
    }
  }
  return out;
}

function listCombinations(items: string[], r: number): string[][] {
  if (r === 0) return [[]];
  if (items.length === 0) return [];
  const [first, ...rest] = items;
  const withFirst = listCombinations(rest, r - 1).map((c) => [first, ...c]);
  const withoutFirst = listCombinations(rest, r);
  return [...withFirst, ...withoutFirst];
}

export function PermutationCombinationTree() {
  const [n, setN] = useState(4);
  const [r, setR] = useState(2);

  const items = useMemo(() => Array.from({ length: n }, (_, i) => String.fromCharCode(65 + i)), [n]);

  const showList = n <= 6 && r <= n;
  const perms = useMemo(() => (showList ? listPermutations(items, r) : []), [items, r, showList]);
  const combs = useMemo(() => (showList ? listCombinations(items, r) : []), [items, r, showList]);

  const nP = nPr(n, r);
  const nC = nCr(n, r);

  return (
    <div className="space-y-4">
      <div className="grid gap-2 md:grid-cols-2">
        <SliderRow label="전체 개수 n" value={n} min={1} max={8} step={1} onChange={(v) => setN(Math.round(v))} format={(v) => v.toFixed(0)} />
        <SliderRow label="뽑을 개수 r" value={r} min={0} max={Math.min(8, n)} step={1} onChange={(v) => setR(Math.round(v))} format={(v) => v.toFixed(0)} />
      </div>

      <div className="grid gap-2 md:grid-cols-2 text-sm">
        <div className="rounded-md bg-blue-50 dark:bg-blue-950/40 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">순열 P(n, r) — 순서 O</div>
          <div className="font-mono mt-1 text-blue-700 dark:text-blue-300">
            P({n}, {r}) = {n}! / ({n} − {r})! = {nP.toLocaleString()}
          </div>
        </div>
        <div className="rounded-md bg-emerald-50 dark:bg-emerald-950/40 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">조합 C(n, r) — 순서 X</div>
          <div className="font-mono mt-1 text-emerald-700 dark:text-emerald-300">
            C({n}, {r}) = {n}! / ({r}! · ({n} − {r})!) = {nC.toLocaleString()}
          </div>
        </div>
      </div>

      {showList ? (
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-blue-200 dark:border-blue-900 p-3">
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">순열 모든 경우 ({perms.length}개)</div>
            <div className="flex flex-wrap gap-1 max-h-48 overflow-auto text-xs font-mono">
              {perms.map((p, i) => (
                <span key={i} className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-950/50 text-blue-800 dark:text-blue-200">
                  {p.join('')}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-emerald-200 dark:border-emerald-900 p-3">
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">조합 모든 경우 ({combs.length}개)</div>
            <div className="flex flex-wrap gap-1 max-h-48 overflow-auto text-xs font-mono">
              {combs.map((c, i) => (
                <span key={i} className="px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200">
                  {c.join('')}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-xs text-zinc-500 dark:text-zinc-400 rounded-md bg-zinc-50 dark:bg-zinc-900 p-3">
          n &gt; 6 이면 경우의 수가 너무 많아 나열은 생략하고 공식 계산만 보여줘요.
        </div>
      )}

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 같은 r 에서 항상 P(n, r) = r! · C(n, r). 「순서를 따지면 r! 배 늘어난다」가 핵심.
      </p>
    </div>
  );
}
