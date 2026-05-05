'use client';

// S3-EU-02 지표의 변화 — 흐르는 물에 의한 침식·운반·퇴적 시뮬.

import { useState } from 'react';

type Spot = '상류' | '중류' | '하류';

const SPOT_DATA: Record<Spot, {
  speed: string;
  process: string;
  ground: string;
  size: string;
  color: string;
  bg: string;
}> = {
  상류: {
    speed: '아주 빠름',
    process: '깎임 (침식)',
    ground: '바위 · 큰 돌',
    size: '큰 돌',
    color: '#dc2626',
    bg: 'from-emerald-700 to-emerald-900',
  },
  중류: {
    speed: '보통',
    process: '나르기 (운반)',
    ground: '자갈 · 모래',
    size: '자갈',
    color: '#ca8a04',
    bg: 'from-emerald-500 to-emerald-700',
  },
  하류: {
    speed: '느림',
    process: '쌓임 (퇴적)',
    ground: '모래 · 진흙',
    size: '고운 모래',
    color: '#16a34a',
    bg: 'from-amber-200 to-amber-400',
  },
};

const SPOTS: Spot[] = ['상류', '중류', '하류'];

export function ErosionDepositionExplorer() {
  const [spot, setSpot] = useState<Spot>('상류');
  const data = SPOT_DATA[spot];

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">강에서 일어나는 일</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          물이 빠르게 흐르면 땅을 깎고, 느려지면 알갱이를 떨어뜨려요.
          그래서 강의 위치마다 땅 모양이 다르게 만들어져요.
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">강의 어느 곳일까?</p>
        <div className="grid grid-cols-3 gap-2">
          {SPOTS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSpot(s)}
              className={`px-3 py-3 border rounded-md text-sm min-h-[44px] ${
                spot === s
                  ? 'border-green-600 bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-300'
                  : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4">
        <svg viewBox="0 0 360 200" className="w-full max-w-[480px] mx-auto block">
          {/* 산 */}
          <polygon points="0,180 90,40 180,120 270,80 360,180" fill="#475569" />
          {/* 강 */}
          <path d="M 60 180 Q 120 130 180 140 Q 240 150 320 180" stroke="#3b82f6" strokeWidth="6" fill="none" strokeLinecap="round" />
          {/* 위치 표시 */}
          {SPOTS.map((s, i) => {
            const x = 80 + i * 100;
            const y = i === 0 ? 130 : i === 1 ? 140 : 175;
            const active = s === spot;
            return (
              <g key={s}>
                <circle cx={x} cy={y} r={active ? 12 : 8} fill={active ? data.color : '#94a3b8'} stroke="white" strokeWidth="2" />
                <text x={x} y={y - 18} fontSize="11" textAnchor="middle" fontWeight="bold" fill={active ? data.color : '#64748b'}>
                  {s}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 p-2">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">물의 빠르기</p>
            <p className="font-semibold">{data.speed}</p>
          </div>
          <div className="rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 p-2">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">일어나는 일</p>
            <p className="font-semibold" style={{ color: data.color }}>{data.process}</p>
          </div>
          <div className="rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 p-2">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">바닥 모습</p>
            <p className="font-semibold">{data.ground}</p>
          </div>
          <div className="rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 p-2">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">알갱이 크기</p>
            <p className="font-semibold">{data.size}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-3 text-sm">
        <p className="font-semibold text-emerald-800 dark:text-emerald-300 mb-1">세 단어로 정리</p>
        <ul className="list-disc pl-5 space-y-0.5 text-emerald-900 dark:text-emerald-200">
          <li><strong>침식</strong> — 흐르는 물·바람이 땅을 깎는 일</li>
          <li><strong>운반</strong> — 깎인 알갱이를 다른 곳으로 나르는 일</li>
          <li><strong>퇴적</strong> — 나르던 알갱이가 천천히 쌓이는 일</li>
        </ul>
      </div>
    </div>
  );
}
