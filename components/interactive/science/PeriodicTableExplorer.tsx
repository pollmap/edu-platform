'use client';

// S-IS1-02 물질과 규칙성 — 주기율표 인터랙티브.
// 1~20번 원소 + 주요 비금속 클릭 시 원자번호·원자량·전자배치·금속/비금속 분류·일상 용도.

import { useMemo, useState } from 'react';

interface Element {
  z: number;
  symbol: string;
  name: string;
  period: number;
  group: number;
  category: 'alkali' | 'alkaline' | 'transition' | 'post' | 'metalloid' | 'nonmetal' | 'halogen' | 'noble';
  mass: number;
  config: string;
  use: string;
}

const ELEMENTS: Element[] = [
  { z: 1, symbol: 'H', name: '수소', period: 1, group: 1, category: 'nonmetal', mass: 1.008, config: '1s¹', use: '연료전지·암모니아 합성' },
  { z: 2, symbol: 'He', name: '헬륨', period: 1, group: 18, category: 'noble', mass: 4.003, config: '1s²', use: '풍선·MRI 냉각' },
  { z: 3, symbol: 'Li', name: '리튬', period: 2, group: 1, category: 'alkali', mass: 6.94, config: '[He] 2s¹', use: '리튬이온전지' },
  { z: 4, symbol: 'Be', name: '베릴륨', period: 2, group: 2, category: 'alkaline', mass: 9.012, config: '[He] 2s²', use: '항공기 합금' },
  { z: 5, symbol: 'B', name: '붕소', period: 2, group: 13, category: 'metalloid', mass: 10.81, config: '[He] 2s²2p¹', use: '내열유리(파이렉스)' },
  { z: 6, symbol: 'C', name: '탄소', period: 2, group: 14, category: 'nonmetal', mass: 12.01, config: '[He] 2s²2p²', use: '생명체 골격·다이아몬드' },
  { z: 7, symbol: 'N', name: '질소', period: 2, group: 15, category: 'nonmetal', mass: 14.01, config: '[He] 2s²2p³', use: '대기 78%·비료' },
  { z: 8, symbol: 'O', name: '산소', period: 2, group: 16, category: 'nonmetal', mass: 16.00, config: '[He] 2s²2p⁴', use: '호흡·산화제' },
  { z: 9, symbol: 'F', name: '플루오린', period: 2, group: 17, category: 'halogen', mass: 19.00, config: '[He] 2s²2p⁵', use: '치약·테플론' },
  { z: 10, symbol: 'Ne', name: '네온', period: 2, group: 18, category: 'noble', mass: 20.18, config: '[He] 2s²2p⁶', use: '네온사인' },
  { z: 11, symbol: 'Na', name: '나트륨', period: 3, group: 1, category: 'alkali', mass: 22.99, config: '[Ne] 3s¹', use: '소금·나트륨등' },
  { z: 12, symbol: 'Mg', name: '마그네슘', period: 3, group: 2, category: 'alkaline', mass: 24.31, config: '[Ne] 3s²', use: '엽록소·합금' },
  { z: 13, symbol: 'Al', name: '알루미늄', period: 3, group: 13, category: 'post', mass: 26.98, config: '[Ne] 3s²3p¹', use: '캔·항공기 동체' },
  { z: 14, symbol: 'Si', name: '규소', period: 3, group: 14, category: 'metalloid', mass: 28.09, config: '[Ne] 3s²3p²', use: '반도체·유리' },
  { z: 15, symbol: 'P', name: '인', period: 3, group: 15, category: 'nonmetal', mass: 30.97, config: '[Ne] 3s²3p³', use: 'DNA 골격·성냥' },
  { z: 16, symbol: 'S', name: '황', period: 3, group: 16, category: 'nonmetal', mass: 32.07, config: '[Ne] 3s²3p⁴', use: '단백질·황산' },
  { z: 17, symbol: 'Cl', name: '염소', period: 3, group: 17, category: 'halogen', mass: 35.45, config: '[Ne] 3s²3p⁵', use: '소금·표백제' },
  { z: 18, symbol: 'Ar', name: '아르곤', period: 3, group: 18, category: 'noble', mass: 39.95, config: '[Ne] 3s²3p⁶', use: '백열등 충전' },
  { z: 19, symbol: 'K', name: '칼륨', period: 4, group: 1, category: 'alkali', mass: 39.10, config: '[Ar] 4s¹', use: '비료·심장 박동' },
  { z: 20, symbol: 'Ca', name: '칼슘', period: 4, group: 2, category: 'alkaline', mass: 40.08, config: '[Ar] 4s²', use: '뼈·시멘트' },
];

const CATEGORY_COLOR: Record<Element['category'], string> = {
  alkali: 'bg-rose-500/80 text-white',
  alkaline: 'bg-orange-500/80 text-white',
  transition: 'bg-amber-500/80 text-white',
  post: 'bg-emerald-500/80 text-white',
  metalloid: 'bg-teal-500/80 text-white',
  nonmetal: 'bg-sky-500/80 text-white',
  halogen: 'bg-violet-500/80 text-white',
  noble: 'bg-fuchsia-500/80 text-white',
};

const CATEGORY_LABEL: Record<Element['category'], string> = {
  alkali: '알칼리금속',
  alkaline: '알칼리토금속',
  transition: '전이금속',
  post: '후전이금속',
  metalloid: '준금속',
  nonmetal: '비금속',
  halogen: '할로겐',
  noble: '비활성기체',
};

export function PeriodicTableExplorer() {
  const [activeZ, setActiveZ] = useState(6); // 탄소
  const [filterCategory, setFilterCategory] = useState<Element['category'] | 'all'>('all');

  const active = useMemo(() => ELEMENTS.find((e) => e.z === activeZ)!, [activeZ]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1">
        {(['all', 'alkali', 'alkaline', 'metalloid', 'nonmetal', 'halogen', 'noble'] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilterCategory(cat)}
            className={`px-2 py-1.5 rounded text-xs font-medium ${
              filterCategory === cat ? 'bg-emerald-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
            }`}
          >
            {cat === 'all' ? '전체' : CATEGORY_LABEL[cat]}
          </button>
        ))}
      </div>

      {/* 18×4 grid (1~20번까지만) */}
      <div className="overflow-x-auto">
        <div className="grid grid-cols-18 gap-1 min-w-[600px]" style={{ gridTemplateColumns: 'repeat(18, minmax(0,1fr))' }}>
          {Array.from({ length: 18 * 4 }).map((_, idx) => {
            const period = Math.floor(idx / 18) + 1;
            const group = (idx % 18) + 1;
            const elem = ELEMENTS.find((e) => e.period === period && e.group === group);
            if (!elem) {
              return <div key={idx} className="aspect-square" />;
            }
            const dim = filterCategory !== 'all' && elem.category !== filterCategory;
            const isActive = elem.z === activeZ;
            return (
              <button
                key={elem.z}
                type="button"
                onClick={() => setActiveZ(elem.z)}
                className={`aspect-square rounded text-center flex flex-col justify-center items-center transition ${
                  CATEGORY_COLOR[elem.category]
                } ${dim ? 'opacity-25' : ''} ${isActive ? 'ring-4 ring-yellow-400 z-10' : ''}`}
                aria-label={`${elem.symbol} ${elem.name}`}
                title={`${elem.symbol} (${elem.name})`}
              >
                <span className="text-[8px] opacity-80">{elem.z}</span>
                <span className="text-sm font-bold leading-none">{elem.symbol}</span>
                <span className="text-[7px] opacity-80 hidden md:block">{elem.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={`rounded-xl p-4 border-2 ${CATEGORY_COLOR[active.category]} bg-opacity-20`}
        style={{ background: 'rgba(0,0,0,0.04)' }}
      >
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-3xl font-bold">{active.symbol}</span>
          <span className="font-bold">{active.name}</span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">원자번호 {active.z}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-zinc-500 dark:text-zinc-400">원자량</span>{' '}
            <span className="font-mono">{active.mass.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-zinc-500 dark:text-zinc-400">분류</span>{' '}
            <span>{CATEGORY_LABEL[active.category]}</span>
          </div>
          <div>
            <span className="text-zinc-500 dark:text-zinc-400">주기/족</span>{' '}
            <span className="font-mono">{active.period}주기 {active.group}족</span>
          </div>
          <div>
            <span className="text-zinc-500 dark:text-zinc-400">전자배치</span>{' '}
            <span className="font-mono">{active.config}</span>
          </div>
        </div>
        <div className="mt-2 text-sm">
          <span className="text-zinc-500 dark:text-zinc-400">일상 용도: </span>
          <span>{active.use}</span>
        </div>
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        💡 별의 핵융합으로 H→He→C→O→...→Fe까지 만들어지고, 초신성 폭발로 더 무거운 원소가 우주로 뿌려져요. 우리 몸의 칼슘·철은 모두 별의 잔해.
      </div>
    </div>
  );
}
