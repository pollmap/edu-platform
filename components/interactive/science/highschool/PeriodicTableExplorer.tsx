'use client';

// S-CHE-02 원자 구조·주기율 — 미니 주기율표(20번까지) + 전자배치.

import { useState } from 'react';

interface Element {
  z: number;
  symbol: string;
  name: string;
  group: number;
  period: number;
  config: string;
  family: 'alkali' | 'alkaline' | 'metalloid' | 'nonmetal' | 'halogen' | 'noble' | 'transition' | 'other';
}

const ELEMENTS: Element[] = [
  { z: 1, symbol: 'H', name: '수소', group: 1, period: 1, config: '1s¹', family: 'nonmetal' },
  { z: 2, symbol: 'He', name: '헬륨', group: 18, period: 1, config: '1s²', family: 'noble' },
  { z: 3, symbol: 'Li', name: '리튬', group: 1, period: 2, config: '[He] 2s¹', family: 'alkali' },
  { z: 4, symbol: 'Be', name: '베릴륨', group: 2, period: 2, config: '[He] 2s²', family: 'alkaline' },
  { z: 5, symbol: 'B', name: '붕소', group: 13, period: 2, config: '[He] 2s² 2p¹', family: 'metalloid' },
  { z: 6, symbol: 'C', name: '탄소', group: 14, period: 2, config: '[He] 2s² 2p²', family: 'nonmetal' },
  { z: 7, symbol: 'N', name: '질소', group: 15, period: 2, config: '[He] 2s² 2p³', family: 'nonmetal' },
  { z: 8, symbol: 'O', name: '산소', group: 16, period: 2, config: '[He] 2s² 2p⁴', family: 'nonmetal' },
  { z: 9, symbol: 'F', name: '플루오린', group: 17, period: 2, config: '[He] 2s² 2p⁵', family: 'halogen' },
  { z: 10, symbol: 'Ne', name: '네온', group: 18, period: 2, config: '[He] 2s² 2p⁶', family: 'noble' },
  { z: 11, symbol: 'Na', name: '나트륨', group: 1, period: 3, config: '[Ne] 3s¹', family: 'alkali' },
  { z: 12, symbol: 'Mg', name: '마그네슘', group: 2, period: 3, config: '[Ne] 3s²', family: 'alkaline' },
  { z: 13, symbol: 'Al', name: '알루미늄', group: 13, period: 3, config: '[Ne] 3s² 3p¹', family: 'other' },
  { z: 14, symbol: 'Si', name: '규소', group: 14, period: 3, config: '[Ne] 3s² 3p²', family: 'metalloid' },
  { z: 15, symbol: 'P', name: '인', group: 15, period: 3, config: '[Ne] 3s² 3p³', family: 'nonmetal' },
  { z: 16, symbol: 'S', name: '황', group: 16, period: 3, config: '[Ne] 3s² 3p⁴', family: 'nonmetal' },
  { z: 17, symbol: 'Cl', name: '염소', group: 17, period: 3, config: '[Ne] 3s² 3p⁵', family: 'halogen' },
  { z: 18, symbol: 'Ar', name: '아르곤', group: 18, period: 3, config: '[Ne] 3s² 3p⁶', family: 'noble' },
  { z: 19, symbol: 'K', name: '칼륨', group: 1, period: 4, config: '[Ar] 4s¹', family: 'alkali' },
  { z: 20, symbol: 'Ca', name: '칼슘', group: 2, period: 4, config: '[Ar] 4s²', family: 'alkaline' },
];

const FAMILY_COLOR: Record<Element['family'], string> = {
  alkali: 'bg-red-500',
  alkaline: 'bg-orange-500',
  metalloid: 'bg-yellow-500',
  nonmetal: 'bg-emerald-500',
  halogen: 'bg-cyan-500',
  noble: 'bg-violet-500',
  transition: 'bg-blue-500',
  other: 'bg-zinc-500',
};

const FAMILY_LABEL: Record<Element['family'], string> = {
  alkali: '알칼리금속',
  alkaline: '알칼리토금속',
  metalloid: '준금속',
  nonmetal: '비금속',
  halogen: '할로겐',
  noble: '비활성기체',
  transition: '전이금속',
  other: '기타',
};

export function PeriodicTableExplorer() {
  const [selected, setSelected] = useState<Element>(ELEMENTS[0]);

  const grid: (Element | null)[][] = Array.from({ length: 4 }, () => Array(18).fill(null));
  for (const el of ELEMENTS) {
    grid[el.period - 1][el.group - 1] = el;
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          전자 배치가 같은 원소끼리 같은 족
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          주기율표의 세로(족)는 최외각 전자 수가 같아 화학적 성질이 비슷해요. 가로(주기)는 새 전자껍질이 시작.
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="grid grid-rows-4 gap-1 min-w-[560px]" style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}>
          {grid.map((row, ri) =>
            row.map((el, gi) =>
              el ? (
                <button
                  key={`${ri}-${gi}`}
                  type="button"
                  onClick={() => setSelected(el)}
                  style={{ gridColumn: gi + 1, gridRow: ri + 1 }}
                  className={`${FAMILY_COLOR[el.family]} rounded text-white text-xs font-bold p-1 leading-tight aspect-square min-w-[28px] flex flex-col items-center justify-center transition ${
                    selected.z === el.z ? 'ring-2 ring-yellow-400 scale-110' : 'opacity-90 hover:opacity-100'
                  }`}
                >
                  <span className="text-[8px] opacity-80">{el.z}</span>
                  <span>{el.symbol}</span>
                </button>
              ) : null
            )
          )}
        </div>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
        <div className="flex items-baseline gap-3 mb-2">
          <span className={`${FAMILY_COLOR[selected.family]} text-white px-3 py-1 rounded font-bold text-2xl`}>
            {selected.symbol}
          </span>
          <div>
            <div className="text-lg font-bold text-zinc-800 dark:text-zinc-100">{selected.name}</div>
            <div className="text-xs text-zinc-500">{FAMILY_LABEL[selected.family]} · {selected.period}주기 · {selected.group}족</div>
          </div>
        </div>
        <div className="text-sm space-y-1">
          <div>원자번호 Z = <span className="font-mono">{selected.z}</span></div>
          <div>전자배치: <span className="font-mono text-blue-600 dark:text-blue-400">{selected.config}</span></div>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-7 gap-1 text-[10px]">
        {(Object.keys(FAMILY_LABEL) as Element['family'][]).filter((f) => f !== 'transition').map((f) => (
          <div key={f} className="flex items-center gap-1">
            <span className={`${FAMILY_COLOR[f]} w-3 h-3 rounded`} />
            <span className="text-zinc-600 dark:text-zinc-300">{FAMILY_LABEL[f]}</span>
          </div>
        ))}
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        주기 → 원자번호↑ : 원자반지름↓·이온화에너지↑·전기음성도↑ (오른쪽으로 갈수록).
        족 → 원자번호↑ : 원자반지름↑·이온화에너지↓ (아래로 내려갈수록).
      </p>
    </div>
  );
}
