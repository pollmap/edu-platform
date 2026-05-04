'use client';

// M-CM2-05 집합 — 두 집합 A, B 의 영역(합집합·교집합·차집합·여집합)을 클릭으로 토글.
// 7개 영역(A only / A∩B / B only / U − (A∪B))과 식 표기 매핑.

import { useMemo, useState } from 'react';

type Region = 'aOnly' | 'both' | 'bOnly' | 'outside';

interface SetState {
  selected: Set<Region>;
}

const ALL_REGIONS: Region[] = ['aOnly', 'both', 'bOnly', 'outside'];

const PRESETS: Array<{ label: string; set: Region[] }> = [
  { label: 'A', set: ['aOnly', 'both'] },
  { label: 'B', set: ['bOnly', 'both'] },
  { label: 'A ∪ B', set: ['aOnly', 'both', 'bOnly'] },
  { label: 'A ∩ B', set: ['both'] },
  { label: 'A − B', set: ['aOnly'] },
  { label: 'A^c', set: ['bOnly', 'outside'] },
  { label: '(A ∪ B)^c', set: ['outside'] },
];

function describeSet(selected: Set<Region>): string {
  if (selected.size === 0) return '∅ (공집합)';
  if (selected.size === 4) return 'U (전체집합)';
  for (const p of PRESETS) {
    if (p.set.length === selected.size && p.set.every((r) => selected.has(r))) return p.label;
  }
  return '복합 영역';
}

export function VennDiagramExplorer() {
  const [selected, setSelected] = useState<Set<Region>>(new Set(['both']));

  const toggle = (r: Region) => {
    const next = new Set(selected);
    if (next.has(r)) next.delete(r);
    else next.add(r);
    setSelected(next);
  };

  const selectPreset = (regions: Region[]) => {
    setSelected(new Set(regions));
  };

  const description = useMemo(() => describeSet(selected), [selected]);

  const fillColor = (r: Region) => (selected.has(r) ? 'rgba(37,99,235,0.45)' : 'rgba(37,99,235,0.05)');

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => selectPreset(p.set)}
            className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md text-sm hover:border-blue-700 hover:text-blue-700 dark:hover:text-blue-400 min-h-[44px]"
          >
            {p.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setSelected(new Set())}
          className="ml-auto px-4 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 min-h-[44px]"
        >
          모두 비우기
        </button>
      </div>

      <div className="overflow-x-auto">
        <svg viewBox="0 0 360 240" className="w-full max-w-md mx-auto bg-zinc-50 dark:bg-zinc-900 rounded-lg" role="img" aria-label="벤다이어그램">
          {/* U (전체집합 사각형) */}
          <rect
            x={5}
            y={5}
            width={350}
            height={230}
            fill={fillColor('outside')}
            stroke="currentColor"
            strokeOpacity={0.5}
            onClick={() => toggle('outside')}
            className="cursor-pointer"
          />
          <text x={345} y={20} fontSize={12} fill="currentColor" textAnchor="end">U</text>

          {/* A (왼쪽 원) */}
          <circle
            cx={130}
            cy={120}
            r={75}
            fill={fillColor('aOnly')}
            stroke="#2563eb"
            strokeWidth={2}
            onClick={() => toggle('aOnly')}
            className="cursor-pointer"
          />
          <text x={70} y={50} fontSize={14} fill="#2563eb" fontWeight="bold">A</text>

          {/* B (오른쪽 원) */}
          <circle
            cx={230}
            cy={120}
            r={75}
            fill={fillColor('bOnly')}
            stroke="#f59e0b"
            strokeWidth={2}
            onClick={() => toggle('bOnly')}
            className="cursor-pointer"
          />
          <text x={285} y={50} fontSize={14} fill="#f59e0b" fontWeight="bold">B</text>

          {/* A ∩ B 영역 (lens) — 클릭 영역만 별도 path */}
          <path
            d="M 180 60 A 75 75 0 0 1 180 180 A 75 75 0 0 1 180 60 Z"
            fill={fillColor('both')}
            stroke="none"
            onClick={() => toggle('both')}
            className="cursor-pointer"
          />

          <text x={95} y={125} fontSize={11} fill="currentColor">A − B</text>
          <text x={170} y={125} fontSize={11} fill="currentColor">A ∩ B</text>
          <text x={235} y={125} fontSize={11} fill="currentColor">B − A</text>
        </svg>
        <p className="text-xs text-center mt-2 text-zinc-500 dark:text-zinc-400">영역을 클릭해서 직접 토글하거나 위 버튼을 눌러 보세요.</p>
      </div>

      <div className="rounded-md bg-blue-50 dark:bg-blue-950/40 p-3 text-sm">
        <div className="text-xs text-zinc-500 dark:text-zinc-400">선택된 영역</div>
        <div className="font-mono mt-1 text-blue-700 dark:text-blue-300 text-base">{description}</div>
        <div className="text-xs mt-2 text-zinc-500 dark:text-zinc-400">
          영역 코드: {ALL_REGIONS.filter((r) => selected.has(r)).join(', ') || '(없음)'}
        </div>
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 드모르간: (A ∪ B)^c = A^c ∩ B^c, &nbsp;(A ∩ B)^c = A^c ∪ B^c. 두 결과의 영역 색칠을 비교해 보세요.
      </p>
    </div>
  );
}
