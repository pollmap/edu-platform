'use client';

// K-LT-02 소설의 구성 — 발단·전개·위기·절정·결말 5단 곡선.
// 저작권: 실제 소설 본문 인용 X. 일반 구조 + 추상 예시만.

import { useState } from 'react';

const STAGES = [
  {
    id: 'intro',
    label: '발단',
    x: 50,
    y: 220,
    tension: 1,
    desc: '인물·배경·상황을 소개해요. 갈등이 아직 본격화되지 않은 단계.',
    cue: '"이야기가 시작되는 곳"',
  },
  {
    id: 'rising',
    label: '전개',
    x: 130,
    y: 170,
    tension: 3,
    desc: '사건이 본격 진행되며 갈등의 씨앗이 자라요.',
    cue: '"갈등이 드러나기 시작"',
  },
  {
    id: 'crisis',
    label: '위기',
    x: 210,
    y: 110,
    tension: 6,
    desc: '갈등이 심화되고 인물이 큰 어려움을 만나요. 긴장이 빠르게 올라가요.',
    cue: '"긴장이 치솟아"',
  },
  {
    id: 'climax',
    label: '절정',
    x: 290,
    y: 50,
    tension: 9,
    desc: '갈등이 최고조에 이르러 결정적 사건이 일어나요. 이야기의 정점.',
    cue: '"가장 짜릿한 순간"',
  },
  {
    id: 'denouement',
    label: '결말',
    x: 370,
    y: 200,
    tension: 2,
    desc: '갈등이 풀리고 사건이 정리돼요. 인물의 운명이 결정되는 마지막 단계.',
    cue: '"이야기가 정리되는 곳"',
  },
];

export function PlotDiagramExplorer() {
  const [active, setActive] = useState('intro');
  const cur = STAGES.find((s) => s.id === active)!;

  const pathD = `M ${STAGES[0].x} ${STAGES[0].y} Q ${STAGES[1].x} ${STAGES[1].y - 20} ${STAGES[2].x} ${STAGES[2].y} T ${STAGES[3].x} ${STAGES[3].y} L ${STAGES[4].x} ${STAGES[4].y}`;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-1">
          소설의 구성 — 5단 플롯 곡선
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          소설은 보통 <strong>발단 → 전개 → 위기 → 절정 → 결말</strong> 5단계로 흘러요. 점을 클릭해 단계별 특징을 살펴보세요.
        </p>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4">
        <svg viewBox="0 0 420 260" className="w-full max-w-[520px] mx-auto block">
          <line x1="30" y1="240" x2="400" y2="240" stroke="#94a3b8" strokeWidth="1" />
          <line x1="30" y1="30" x2="30" y2="240" stroke="#94a3b8" strokeWidth="1" />
          <text x="20" y="35" fontSize="10" fill="#64748b" textAnchor="end">긴장</text>
          <text x="395" y="255" fontSize="10" fill="#64748b">시간</text>

          <path d={pathD} fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />

          {STAGES.map((s) => {
            const isActive = active === s.id;
            return (
              <g key={s.id} onClick={() => setActive(s.id)} style={{ cursor: 'pointer' }}>
                <circle
                  cx={s.x}
                  cy={s.y}
                  r={isActive ? 11 : 7}
                  fill={isActive ? '#dc2626' : '#fca5a5'}
                  stroke="white"
                  strokeWidth="2"
                />
                <text
                  x={s.x}
                  y={s.y - 18}
                  fontSize="11"
                  fontWeight={isActive ? 'bold' : 'normal'}
                  fill="#dc2626"
                  textAnchor="middle"
                >
                  {s.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="grid grid-cols-5 gap-1.5">
        {STAGES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActive(s.id)}
            className={`px-1 py-2 text-xs rounded-md border min-h-[44px] ${
              active === s.id
                ? 'bg-red-50 dark:bg-red-950/30 border-red-500 ring-2 ring-red-300 font-bold'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-4 space-y-2">
        <div className="text-lg font-bold text-red-800 dark:text-red-300">{cur.label}</div>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">{cur.desc}</p>
        <div className="text-xs text-zinc-500 dark:text-zinc-400 italic">{cur.cue}</div>
      </div>
    </div>
  );
}
