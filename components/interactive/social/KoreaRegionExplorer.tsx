'use client';

// H4-GE-01 우리 지역 위치·특성 — 17 시·도 그리드 + 위키 카드.

import { useState } from 'react';
import { findWiki, KOREA_GEOGRAPHY } from '@/lib/data/wikipedia';
import { WikipediaInfobox } from '@/components/primitives/WikipediaInfobox';

interface Region {
  id: string;
  label: string;
  group: '특별·광역시' | '도·자치도';
  pos: { col: number; row: number };
}

const REGIONS: Region[] = [
  { id: '서울특별시', label: '서울', group: '특별·광역시', pos: { col: 2, row: 1 } },
  { id: '인천광역시', label: '인천', group: '특별·광역시', pos: { col: 1, row: 1 } },
  { id: '대전광역시', label: '대전', group: '특별·광역시', pos: { col: 2, row: 3 } },
  { id: '대구광역시', label: '대구', group: '특별·광역시', pos: { col: 3, row: 3 } },
  { id: '광주광역시', label: '광주', group: '특별·광역시', pos: { col: 1, row: 4 } },
  { id: '부산광역시', label: '부산', group: '특별·광역시', pos: { col: 4, row: 4 } },
  { id: '울산광역시', label: '울산', group: '특별·광역시', pos: { col: 4, row: 3 } },
  { id: '세종특별자치시', label: '세종', group: '특별·광역시', pos: { col: 2, row: 2 } },
  { id: '경기도', label: '경기', group: '도·자치도', pos: { col: 2, row: 0 } },
  { id: '강원특별자치도', label: '강원', group: '도·자치도', pos: { col: 3, row: 0 } },
  { id: '충청북도', label: '충북', group: '도·자치도', pos: { col: 3, row: 2 } },
  { id: '충청남도', label: '충남', group: '도·자치도', pos: { col: 1, row: 2 } },
  { id: '전북특별자치도', label: '전북', group: '도·자치도', pos: { col: 1, row: 3 } },
  { id: '전라남도', label: '전남', group: '도·자치도', pos: { col: 1, row: 5 } },
  { id: '경상북도', label: '경북', group: '도·자치도', pos: { col: 4, row: 2 } },
  { id: '경상남도', label: '경남', group: '도·자치도', pos: { col: 3, row: 4 } },
  { id: '제주특별자치도', label: '제주', group: '도·자치도', pos: { col: 1, row: 6 } },
];

export function KoreaRegionExplorer() {
  const [sel, setSel] = useState<string>('서울특별시');
  const wiki = findWiki(KOREA_GEOGRAPHY, sel);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-1">
          우리 지역 — 17 시·도
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          한국은 <strong>1특별시 + 6광역시 + 1특별자치시 + 8도 + 1특별자치도</strong> 총 17개 시·도로 나뉘어요. 격자에 위치를 단순화해 그렸어요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gridAutoRows: '52px' }}
          >
            {REGIONS.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setSel(r.id)}
                style={{ gridColumnStart: r.pos.col + 1, gridRowStart: r.pos.row + 1 }}
                className={`rounded-md border-2 text-xs font-semibold transition min-h-[44px] ${
                  sel === r.id
                    ? 'bg-orange-600 text-white border-orange-700'
                    : r.group === '특별·광역시'
                      ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-400 text-blue-900 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-900/50'
                      : 'bg-amber-50 dark:bg-amber-950/30 border-amber-400 text-amber-900 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/50'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-blue-400" /> 특별·광역시 (8)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-amber-400" /> 도·자치도 (9)
            </span>
          </div>
        </div>
        {wiki && <WikipediaInfobox data={wiki} />}
      </div>
    </div>
  );
}
