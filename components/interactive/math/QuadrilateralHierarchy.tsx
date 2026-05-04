'use client';

// M4-GM-04 사각형 — 사각형의 위계 + 속성 비교.

import { useState } from 'react';

interface QuadInfo {
  key: string;
  name: string;
  parent: string | null;
  color: string;
  desc: string;
  features: string[];
  points: string;
}

const QUADS: QuadInfo[] = [
  {
    key: 'trapezoid',
    name: '사다리꼴',
    parent: null,
    color: '#64748b',
    desc: '평행한 변이 한 쌍 있는 사각형',
    features: ['평행한 변 1쌍 이상'],
    points: '20,80 100,80 80,20 40,20',
  },
  {
    key: 'parallelogram',
    name: '평행사변형',
    parent: 'trapezoid',
    color: '#3b82f6',
    desc: '마주 보는 두 쌍의 변이 평행한 사각형',
    features: ['평행한 변 2쌍', '마주 보는 변 길이 같음', '마주 보는 각 같음'],
    points: '15,80 95,80 105,20 25,20',
  },
  {
    key: 'rhombus',
    name: '마름모',
    parent: 'parallelogram',
    color: '#f59e0b',
    desc: '네 변의 길이가 모두 같은 평행사변형',
    features: ['네 변 길이 모두 같음', '대각선이 직각으로 만남'],
    points: '60,15 100,50 60,85 20,50',
  },
  {
    key: 'rectangle',
    name: '직사각형',
    parent: 'parallelogram',
    color: '#16a34a',
    desc: '네 각이 모두 직각인 평행사변형',
    features: ['네 각 모두 90°', '대각선 길이 같음'],
    points: '20,25 100,25 100,75 20,75',
  },
  {
    key: 'square',
    name: '정사각형',
    parent: 'rectangle',
    color: '#a855f7',
    desc: '네 변이 같고 네 각이 모두 직각',
    features: ['네 변 같음', '네 각 90°', '마름모이자 직사각형'],
    points: '30,20 90,20 90,80 30,80',
  },
];

export function QuadrilateralHierarchy() {
  const [selected, setSelected] = useState<string>('square');
  const current = QUADS.find((q) => q.key === selected) ?? QUADS[0];

  // Compute parent chain for highlighting
  const ancestors: string[] = [];
  let cursor: string | null = current.key;
  while (cursor) {
    ancestors.push(cursor);
    const node: QuadInfo | undefined = QUADS.find((q) => q.key === cursor);
    cursor = node?.parent ?? null;
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">사각형의 위계</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          사각형은 <strong>조건이 점점 까다로워질수록</strong> 더 특별한 이름이 붙어요. 정사각형은 직사각형이자 마름모예요!
        </p>
      </div>

      <div className="grid sm:grid-cols-5 gap-2">
        {QUADS.map((q) => {
          const isAncestor = ancestors.includes(q.key);
          return (
            <button
              key={q.key}
              type="button"
              onClick={() => setSelected(q.key)}
              className={`p-3 rounded-lg border text-center transition-colors min-h-[44px] ${
                isAncestor
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/40'
                  : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700'
              }`}
            >
              <svg viewBox="0 0 120 100" className="w-full h-12 mx-auto mb-1">
                <polygon
                  points={q.points}
                  fill={q.color}
                  fillOpacity={isAncestor ? 0.5 : 0.2}
                  stroke={q.color}
                  strokeWidth="2"
                />
              </svg>
              <p className={`text-xs font-semibold ${isAncestor ? 'text-blue-700 dark:text-blue-300' : 'text-zinc-700 dark:text-zinc-300'}`}>
                {q.name}
              </p>
            </button>
          );
        })}
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-center gap-3 mb-3">
          <svg viewBox="0 0 120 100" className="w-20 h-16 flex-shrink-0">
            <polygon points={current.points} fill={current.color} fillOpacity={0.3} stroke={current.color} strokeWidth="2.5" />
          </svg>
          <div>
            <h3 className="text-xl font-bold" style={{ color: current.color }}>
              {current.name}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{current.desc}</p>
          </div>
        </div>
        <ul className="list-disc pl-5 text-sm space-y-1">
          {current.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        {ancestors.length > 1 ? (
          <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
            <strong>{current.name}</strong>은(는){' '}
            {ancestors
              .slice(1)
              .map((a) => QUADS.find((q) => q.key === a)?.name)
              .filter(Boolean)
              .join(' · ')}
            의 특별한 경우예요.
          </p>
        ) : null}
      </div>

      <div className="rounded-lg bg-amber-50 dark:bg-amber-900/30 p-3 text-sm">
        <p className="font-semibold mb-1">위계 다이어그램 (포함 관계)</p>
        <p className="text-xs leading-relaxed">
          사다리꼴 ⊃ 평행사변형 ⊃ {'{'} 직사각형, 마름모 {'}'} ⊃ 정사각형
          <br />
          위쪽 도형의 성질을 모두 가지면서 추가 조건을 만족하면 더 아래(특별한) 도형이 돼요.
        </p>
      </div>
    </div>
  );
}
