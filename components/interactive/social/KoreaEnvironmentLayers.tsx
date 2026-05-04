'use client';

// H5-GE-02 자연환경과 인문환경 — 레이어 토글로 비교.

import { useState } from 'react';

type Layer = 'climate' | 'terrain' | 'population';

interface LayerInfo {
  id: Layer;
  label: string;
  category: '자연환경' | '인문환경';
  short: string;
  details: string[];
}

const LAYERS: LayerInfo[] = [
  {
    id: 'terrain',
    label: '지형',
    category: '자연환경',
    short: '동쪽이 높고 서쪽이 낮은 「동고서저」.',
    details: [
      '동쪽: 태백·소백 산맥. 높고 험해요.',
      '서쪽: 평야가 넓어요(호남·김포·논산 평야).',
      '강은 대체로 동→서, 또는 동→남으로 흐름.',
    ],
  },
  {
    id: 'climate',
    label: '기후',
    category: '자연환경',
    short: '사계절이 뚜렷한 온대 기후. 남북·동서 차이 있음.',
    details: [
      '여름: 덥고 비가 많이 옴(장마·태풍).',
      '겨울: 춥고 건조. 시베리아 바람의 영향.',
      '북쪽일수록·산지일수록 기온이 낮아져요.',
    ],
  },
  {
    id: 'population',
    label: '인구·도시',
    category: '인문환경',
    short: '평야와 해안에 인구가 몰려 있어요.',
    details: [
      '수도권(서울·경기·인천)에 약 절반이 거주.',
      '항구 도시(부산·인천·울산)는 무역·산업 중심.',
      '지형이 험한 산간 지역은 인구가 적어요.',
    ],
  },
];

export function KoreaEnvironmentLayers() {
  const [active, setActive] = useState<Layer>('terrain');
  const cur = LAYERS.find((l) => l.id === active)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-1">
          자연환경 vs 인문환경 — 레이어로 비교
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          <strong>자연환경</strong>은 사람이 만들지 않은 것(지형·기후 등). <strong>인문환경</strong>은 사람이 만든 것(도시·인구·산업 등).
        </p>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        {LAYERS.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => setActive(l.id)}
            className={`px-2 py-3 text-sm rounded-md border min-h-[44px] flex flex-col items-center ${
              active === l.id
                ? 'border-orange-500 ring-2 ring-orange-300 font-bold bg-orange-50 dark:bg-orange-950/30'
                : 'border-zinc-200 dark:border-zinc-700'
            }`}
          >
            <span>{l.label}</span>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">{l.category}</span>
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-zinc-200 dark:border-zinc-800 p-4">
        <svg viewBox="0 0 300 380" className="w-full max-w-xs mx-auto">
          <rect x="0" y="0" width="300" height="380" fill="#dbeafe" className="dark:fill-blue-950/50" />
          {active === 'terrain' && (
            <>
              <path d="M 75 130 L 110 100 L 150 75 L 195 70 L 220 95 L 215 140 L 195 175 L 230 195 L 220 215 L 195 220 L 175 250 L 165 290 L 145 320 L 130 360 L 115 340 L 105 295 L 90 250 L 70 210 L 60 170 Z" fill="#86efac" />
              <path d="M 175 90 Q 190 100 200 130 T 200 200 T 175 260 L 165 290 L 175 250" fill="#15803d" opacity="0.7" />
              <text x="195" y="155" fontSize="10" fill="#14532d" fontWeight="bold" transform="rotate(-15 195 155)">동쪽 산맥</text>
              <text x="80" y="220" fontSize="10" fill="#14532d" fontWeight="bold">서쪽 평야</text>
            </>
          )}
          {active === 'climate' && (
            <>
              <path d="M 75 130 L 110 100 L 150 75 L 195 70 L 220 95 L 215 140 L 195 175 L 230 195 L 220 215 L 195 220 L 175 250 L 165 290 L 145 320 L 130 360 L 115 340 L 105 295 L 90 250 L 70 210 L 60 170 Z" fill="url(#climGrad)" />
              <defs>
                <linearGradient id="climGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#fb923c" />
                </linearGradient>
              </defs>
              <text x="160" y="100" fontSize="10" fill="#1e3a8a" fontWeight="bold">북쪽 추움</text>
              <text x="135" y="345" fontSize="10" fill="#7c2d12" fontWeight="bold">남쪽 따뜻</text>
            </>
          )}
          {active === 'population' && (
            <>
              <path d="M 75 130 L 110 100 L 150 75 L 195 70 L 220 95 L 215 140 L 195 175 L 230 195 L 220 215 L 195 220 L 175 250 L 165 290 L 145 320 L 130 360 L 115 340 L 105 295 L 90 250 L 70 210 L 60 170 Z" fill="#fde68a" />
              <circle cx="135" cy="170" r="22" fill="#dc2626" opacity="0.7" />
              <text x="135" y="174" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">수도권</text>
              <circle cx="170" cy="280" r="11" fill="#dc2626" opacity="0.6" />
              <text x="170" y="298" textAnchor="middle" fontSize="9" fill="#7f1d1d" fontWeight="bold">부산</text>
              <circle cx="100" cy="160" r="8" fill="#dc2626" opacity="0.5" />
              <text x="80" y="155" fontSize="9" fill="#7f1d1d" fontWeight="bold">인천</text>
            </>
          )}
        </svg>
      </div>

      <div className="rounded-xl border-l-4 border-orange-500 bg-orange-50/50 dark:bg-orange-950/20 p-4 space-y-2 text-sm">
        <div className="font-bold text-orange-700 dark:text-orange-400">
          {cur.label} <span className="text-xs font-normal">({cur.category})</span>
        </div>
        <p className="font-medium">{cur.short}</p>
        <ul className="list-disc list-inside space-y-1 text-xs text-zinc-700 dark:text-zinc-300">
          {cur.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
