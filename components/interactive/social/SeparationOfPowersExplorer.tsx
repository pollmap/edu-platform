'use client';

// H6-SO-01 우리나라 정치 발전 — 삼권분립(입법·행정·사법) 도식.

import { useState } from 'react';

type Branch = 'legislative' | 'executive' | 'judicial';

interface BranchInfo {
  id: Branch;
  label: string;
  organ: string;
  role: string;
  bullets: string[];
  color: string;
  cx: number;
  cy: number;
}

const BRANCHES: BranchInfo[] = [
  {
    id: 'legislative',
    label: '입법부',
    organ: '국회',
    role: '법을 만들어요.',
    bullets: [
      '국민의 대표(국회의원)가 모여 법을 만들고 고쳐요.',
      '나라 살림(예산)을 검토하고 결정해요.',
      '행정부가 일을 잘하는지 살피기도 해요(국정감사).',
    ],
    color: '#ea580c',
    cx: 150,
    cy: 70,
  },
  {
    id: 'executive',
    label: '행정부',
    organ: '정부 (대통령·국무총리·각 부)',
    role: '법을 실제로 집행해요.',
    bullets: [
      '국회가 만든 법대로 나라 일을 처리해요.',
      '교육·외교·국방·복지 같은 분야별로 「부」가 나뉘어 있어요.',
      '대통령은 국민이 직접 뽑아요.',
    ],
    color: '#2563eb',
    cx: 70,
    cy: 220,
  },
  {
    id: 'judicial',
    label: '사법부',
    organ: '법원',
    role: '법에 따라 옳고 그름을 가려요.',
    bullets: [
      '다툼(소송)이 있을 때 법대로 판결해요.',
      '대법원 → 고등법원 → 지방법원 순서로 단계가 있어요.',
      '판사는 외부 압력 없이 양심에 따라 재판해요.',
    ],
    color: '#16a34a',
    cx: 230,
    cy: 220,
  },
];

export function SeparationOfPowersExplorer() {
  const [active, setActive] = useState<Branch>('legislative');
  const cur = BRANCHES.find((b) => b.id === active)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-1">
          삼권분립 — 한 곳에 힘이 몰리지 않게
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          나라 일을 하는 큰 힘을 <strong>입법·행정·사법</strong> 셋으로 나누고 서로 견제해요. 어느 한 곳이 너무 강해지면 국민의 권리가 위험해질 수 있기 때문이에요.
        </p>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800 p-4">
        <svg viewBox="0 0 300 300" className="w-full max-w-sm mx-auto">
          <line x1="150" y1="90" x2="80" y2="200" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="150" y1="90" x2="220" y2="200" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="90" y1="220" x2="210" y2="220" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x="115" y="155" fontSize="9" fill="#64748b">견제</text>
          <text x="180" y="155" fontSize="9" fill="#64748b">견제</text>
          <text x="143" y="240" fontSize="9" fill="#64748b">견제</text>
          {BRANCHES.map((b) => (
            <g key={b.id} onClick={() => setActive(b.id)} style={{ cursor: 'pointer' }}>
              <circle
                cx={b.cx}
                cy={b.cy}
                r={active === b.id ? 38 : 32}
                fill={b.color}
                opacity={active === b.id ? 0.95 : 0.65}
                stroke="white"
                strokeWidth="2"
              />
              <text x={b.cx} y={b.cy + 2} textAnchor="middle" fontSize="13" fontWeight="bold" fill="white">
                {b.label}
              </text>
              <text x={b.cx} y={b.cy + 18} textAnchor="middle" fontSize="9" fill="white">
                {b.organ.split(' ')[0]}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        {BRANCHES.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setActive(b.id)}
            className={`px-2 py-2 text-xs sm:text-sm rounded-md border min-h-[44px] ${
              active === b.id
                ? 'ring-2 ring-orange-300 font-bold'
                : 'border-zinc-200 dark:border-zinc-700'
            }`}
            style={{
              borderColor: active === b.id ? b.color : undefined,
              background: active === b.id ? b.color + '22' : undefined,
            }}
          >
            {b.label}
          </button>
        ))}
      </div>

      <div
        className="rounded-xl border-l-4 p-4 space-y-2 text-sm"
        style={{ borderColor: cur.color, background: cur.color + '11' }}
      >
        <div className="font-bold" style={{ color: cur.color }}>
          {cur.label} — {cur.organ}
        </div>
        <p className="font-medium">{cur.role}</p>
        <ul className="list-disc list-inside space-y-1 text-xs text-zinc-700 dark:text-zinc-300">
          {cur.bullets.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
