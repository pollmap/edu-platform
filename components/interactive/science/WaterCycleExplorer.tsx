'use client';

// S4-EU-02 물의 여행 — 물의 순환 단계 클릭 다이어그램.

import { useState } from 'react';

type Stage = '증발' | '응결' | '강수' | '흐름';

const STAGES: Record<Stage, {
  where: string;
  what: string;
  example: string;
  color: string;
}> = {
  증발: {
    where: '바다·강·호수 → 하늘',
    what: '햇빛이 물을 데우면 물이 수증기로 바뀌어 위로 올라가요.',
    example: '맑은 날 빨래가 마르는 것, 물웅덩이가 줄어드는 것',
    color: '#f97316',
  },
  응결: {
    where: '하늘 위',
    what: '높은 곳은 차가워서 수증기가 다시 작은 물방울로 변해요. 모이면 구름이 돼요.',
    example: '추운 날 입김이 하얗게 보이는 것, 차가운 컵 겉면에 물방울',
    color: '#a855f7',
  },
  강수: {
    where: '구름 → 땅',
    what: '구름 속 물방울이 무거워지면 비·눈·우박으로 떨어져요.',
    example: '비, 함박눈, 소나기, 우박',
    color: '#3b82f6',
  },
  흐름: {
    where: '땅 → 강 → 바다',
    what: '땅에 떨어진 물은 강을 따라 흐르거나 땅속으로 스며들어 다시 바다로 가요.',
    example: '시냇물·강물, 지하수, 댐의 물',
    color: '#16a34a',
  },
};

const STAGE_LIST: Stage[] = ['증발', '응결', '강수', '흐름'];

export function WaterCycleExplorer() {
  const [stage, setStage] = useState<Stage>('증발');
  const data = STAGES[stage];

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">물은 어디로 갈까</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          지구 위 물은 사라지지 않고 <strong>모양만 바꾸며 빙글빙글 돌고 있어요</strong>.
          이것을 물의 순환이라고 해요.
        </p>
      </div>

      <div className="rounded-xl bg-gradient-to-b from-sky-100 to-emerald-100 dark:from-sky-950 dark:to-emerald-950 border border-zinc-200 dark:border-zinc-800 p-4">
        <svg viewBox="0 0 360 220" className="w-full max-w-[480px] mx-auto block">
          {/* 태양 */}
          <circle cx="60" cy="40" r="20" fill="#fbbf24" />
          {/* 구름 */}
          <ellipse cx="200" cy="55" rx="50" ry="20" fill="#cbd5e1" stroke={stage === '응결' ? data.color : 'none'} strokeWidth="3" />
          {/* 산 */}
          <polygon points="40,200 120,90 200,160 280,110 340,200" fill="#16a34a" />
          {/* 바다 */}
          <rect x="0" y="190" width="360" height="30" fill="#3b82f6" />
          {/* 화살표 */}
          <path d="M 90 180 Q 70 110 180 70" stroke={stage === '증발' ? data.color : '#fb923c'} strokeWidth={stage === '증발' ? 3 : 2} fill="none" markerEnd="url(#arr)" />
          <path d="M 220 75 Q 240 90 230 100" stroke={stage === '응결' ? data.color : '#a78bfa'} strokeWidth={stage === '응결' ? 3 : 2} fill="none" />
          <path d="M 200 80 L 200 130" stroke={stage === '강수' ? data.color : '#60a5fa'} strokeWidth={stage === '강수' ? 3 : 2} fill="none" markerEnd="url(#arr)" strokeDasharray="3 3" />
          <path d="M 200 160 Q 240 180 90 195" stroke={stage === '흐름' ? data.color : '#22c55e'} strokeWidth={stage === '흐름' ? 3 : 2} fill="none" markerEnd="url(#arr)" />
          <defs>
            <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M 0 0 L 6 3 L 0 6 Z" fill="currentColor" />
            </marker>
          </defs>
          <text x="55" y="23" fontSize="9" textAnchor="middle" fill="#92400e">햇빛</text>
        </svg>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {STAGE_LIST.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStage(s)}
            className={`px-3 py-3 border rounded-md text-sm min-h-[44px] ${
              stage === s
                ? 'border-green-600 bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-300 font-semibold'
                : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="rounded-lg p-4 border" style={{ borderColor: data.color, backgroundColor: `${data.color}15` }}>
        <p className="font-semibold text-base mb-1" style={{ color: data.color }}>{stage}</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">{data.where}</p>
        <p className="text-sm mb-2 text-zinc-800 dark:text-zinc-200">{data.what}</p>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">예: {data.example}</p>
      </div>

      <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-3 text-sm">
        <p className="text-emerald-900 dark:text-emerald-200">
          지구의 물은 새로 생기지 않아요. 공룡이 마시던 물이 지금 우리가 마시는 물과 같은 물이에요.
          물을 아껴 써야 하는 이유는 <strong>마실 수 있는 깨끗한 물이 한정</strong>되어 있기 때문이에요.
        </p>
      </div>
    </div>
  );
}
