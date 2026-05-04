'use client';

// S-BIO-05 유전 — 펀넷정사각형으로 부모 유전자형 → 자손 표현형 비율 계산.
// 단성·이성잡종 모두 지원.

import { useMemo, useState } from 'react';

type AlleleSet = string[]; // 예: ['A','a'] 또는 ['AB','Ab','aB','ab']

interface CrossResult {
  cells: { genotype: string; phenotype: string }[][];
  rowAlleles: string[];
  colAlleles: string[];
  ratios: Record<string, { count: number; pct: number; sample: string }>;
}

function expandGametes(genotype: string): string[] {
  // 'AaBb' → ['AB','Ab','aB','ab'], 'Aa' → ['A','a'], 'AABb' → ['AB','Ab']
  const pairs: string[][] = [];
  for (let i = 0; i < genotype.length; i += 2) {
    const pair = [genotype[i], genotype[i + 1]];
    pairs.push(Array.from(new Set(pair)));
  }
  let combos: string[] = [''];
  for (const pair of pairs) {
    const next: string[] = [];
    for (const c of combos) for (const p of pair) next.push(c + p);
    combos = next;
  }
  return combos;
}

function combineGenotype(g1: string, g2: string): string {
  // g1, g2 같은 길이의 단일 대립유전자 문자열 합치기 (예: 'AB' + 'ab' → 'AaBb')
  let result = '';
  for (let i = 0; i < g1.length; i++) {
    const a = g1[i];
    const b = g2[i];
    // 대문자 우선
    const sorted = [a, b].sort((x, y) => {
      const xCap = x === x.toUpperCase();
      const yCap = y === y.toUpperCase();
      if (xCap && !yCap) return -1;
      if (!xCap && yCap) return 1;
      return x.localeCompare(y);
    });
    result += sorted.join('');
  }
  return result;
}

function genotypeToPhenotype(genotype: string): string {
  // 각 유전자쌍에서 대문자가 하나라도 있으면 우성 표현형
  let result = '';
  for (let i = 0; i < genotype.length; i += 2) {
    const a = genotype[i];
    const b = genotype[i + 1];
    if (a === a.toUpperCase() || b === b.toUpperCase()) {
      result += a.toUpperCase();
    } else {
      result += a.toLowerCase();
    }
  }
  return result;
}

function performCross(parent1: string, parent2: string): CrossResult {
  const g1 = expandGametes(parent1);
  const g2 = expandGametes(parent2);
  const cells = g1.map((row) =>
    g2.map((col) => {
      const genotype = combineGenotype(row, col);
      const phenotype = genotypeToPhenotype(genotype);
      return { genotype, phenotype };
    }),
  );
  const total = g1.length * g2.length;
  const ratios: Record<string, { count: number; pct: number; sample: string }> = {};
  cells.flat().forEach((c) => {
    if (!ratios[c.phenotype]) ratios[c.phenotype] = { count: 0, pct: 0, sample: c.genotype };
    ratios[c.phenotype].count += 1;
  });
  Object.values(ratios).forEach((r) => {
    r.pct = (r.count / total) * 100;
  });
  return { cells, rowAlleles: g1, colAlleles: g2, ratios };
}

const PRESETS: { label: string; p1: string; p2: string; note: string }[] = [
  { label: '단성 잡종 Aa × Aa', p1: 'Aa', p2: 'Aa', note: '3 : 1 (우성 : 열성) — 멘델 1법칙' },
  { label: '검정교배 Aa × aa', p1: 'Aa', p2: 'aa', note: '1 : 1 — 유전자형을 알아낼 때 사용' },
  { label: '이성 잡종 AaBb × AaBb', p1: 'AaBb', p2: 'AaBb', note: '9 : 3 : 3 : 1 — 멘델 2법칙(독립)' },
  { label: '동형접합 AA × aa', p1: 'AA', p2: 'aa', note: 'F1 모두 Aa, 표현형 100% 우성' },
];

export function PunnettSquareExplorer() {
  const [parent1, setParent1] = useState('Aa');
  const [parent2, setParent2] = useState('Aa');

  const result = useMemo(() => {
    try {
      return performCross(parent1, parent2);
    } catch {
      return null;
    }
  }, [parent1, parent2]);

  const validateInput = (s: string) => /^([A-Za-z]{2})+$/.test(s);

  const validP1 = validateInput(parent1);
  const validP2 = validateInput(parent2);
  const sameLength = parent1.length === parent2.length;
  const ok = validP1 && validP2 && sameLength && result;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setParent1(p.p1);
              setParent2(p.p2);
            }}
            className="px-3 py-2 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-emerald-100 dark:hover:bg-emerald-900 min-h-[44px]"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">부모 1 유전자형</span>
          <input
            type="text"
            value={parent1}
            onChange={(e) => setParent1(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 font-mono"
            placeholder="예: Aa, AaBb"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">부모 2 유전자형</span>
          <input
            type="text"
            value={parent2}
            onChange={(e) => setParent2(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 font-mono"
            placeholder="예: Aa, AaBb"
          />
        </label>
      </div>

      {!ok && (
        <div className="rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 p-3 text-sm text-rose-700 dark:text-rose-300">
          ⚠️ 두 부모의 유전자 길이가 같아야 하고, 영문자만 가능해요. (예: Aa, AaBb)
        </div>
      )}

      {ok && result && (
        <>
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800">
                  <th className="p-2 border border-zinc-200 dark:border-zinc-700"></th>
                  {result.colAlleles.map((c) => (
                    <th key={c} className="p-2 border border-zinc-200 dark:border-zinc-700 font-mono text-emerald-700 dark:text-emerald-400">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.cells.map((row, ri) => (
                  <tr key={ri}>
                    <th className="p-2 border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 font-mono text-emerald-700 dark:text-emerald-400">
                      {result.rowAlleles[ri]}
                    </th>
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className="p-2 border border-zinc-200 dark:border-zinc-700 text-center font-mono"
                      >
                        <div className="font-bold">{cell.genotype}</div>
                        <div className="text-[10px] text-zinc-500 dark:text-zinc-400">
                          ({cell.phenotype})
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-2">
            <div className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              표현형 비율
            </div>
            {Object.entries(result.ratios)
              .sort((a, b) => b[1].count - a[1].count)
              .map(([phen, info]) => (
                <div key={phen} className="rounded-lg bg-zinc-50 dark:bg-zinc-800 p-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-mono font-bold">{phen}</span>
                    <span>
                      {info.count} 칸 / {info.pct.toFixed(0)}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500"
                      style={{ width: `${info.pct.toFixed(0)}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </>
      )}

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        💡 대문자 = 우성, 소문자 = 열성. 한 자리당 두 글자가 한 쌍이에요. 예) Aa = 우성 헤테로.
      </div>
    </div>
  );
}
