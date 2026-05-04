'use client';

// H5-GE-01 국토의 위치와 영역 — 위경도/4극점/영해 인터랙티브.

import { useState } from 'react';

type View = 'location' | 'extreme' | 'territory';

interface ExtremePoint {
  id: string;
  name: string;
  lat: string;
  lon: string;
  cx: number;
  cy: number;
  desc: string;
}

const EXTREME_POINTS: ExtremePoint[] = [
  {
    id: 'north',
    name: '극북 — 함경북도 온성군',
    lat: '북위 약 43°',
    lon: '동경 약 130°',
    cx: 195,
    cy: 70,
    desc: '한반도에서 가장 북쪽. 두만강이 흘러요.',
  },
  {
    id: 'south',
    name: '극남 — 마라도(제주)',
    lat: '북위 약 33°',
    lon: '동경 약 126°',
    cx: 130,
    cy: 360,
    desc: '한반도에서 가장 남쪽. 제주도 아래 작은 섬.',
  },
  {
    id: 'east',
    name: '극동 — 독도',
    lat: '북위 약 37°',
    lon: '동경 약 132°',
    cx: 235,
    cy: 200,
    desc: '동해에 있는 섬. 우리나라 영토예요.',
  },
  {
    id: 'west',
    name: '극서 — 평안북도 마안도',
    lat: '북위 약 40°',
    lon: '동경 약 124°',
    cx: 75,
    cy: 130,
    desc: '서해 쪽 가장 서쪽 섬.',
  },
];

const VIEW_LABEL: Record<View, string> = {
  location: '수리·지리적 위치',
  extreme: '4극점',
  territory: '영토·영해·영공',
};

export function KoreaTerritoryExplorer() {
  const [view, setView] = useState<View>('location');
  const [activeExtreme, setActiveExtreme] = useState<string>('east');
  const cur = EXTREME_POINTS.find((p) => p.id === activeExtreme)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-1">
          한반도 위치와 영역
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          탭을 눌러 위치 표현 방법, 4극점, 영토·영해·영공을 차례로 살펴보세요.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        {(['location', 'extreme', 'territory'] as View[]).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={`px-2 py-2 text-xs sm:text-sm rounded-md border min-h-[44px] ${
              view === v
                ? 'border-orange-500 ring-2 ring-orange-300 font-bold bg-orange-50 dark:bg-orange-950/30'
                : 'border-zinc-200 dark:border-zinc-700'
            }`}
          >
            {VIEW_LABEL[v]}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-zinc-200 dark:border-zinc-800 p-4">
        <svg viewBox="0 0 300 400" className="w-full max-w-xs mx-auto">
          <rect x="0" y="0" width="300" height="400" fill="#dbeafe" className="dark:fill-blue-950/50" />
          {view === 'territory' && (
            <ellipse cx="150" cy="220" rx="135" ry="155" fill="#60a5fa" opacity="0.3" />
          )}
          <path
            d="M 75 130 L 110 100 L 150 75 L 195 70 L 220 95 L 215 140 L 195 175 L 230 195 L 220 215 L 195 220 L 175 250 L 165 290 L 145 320 L 130 360 L 115 340 L 105 295 L 90 250 L 70 210 L 60 170 Z"
            fill="#fbbf24"
            stroke="#92400e"
            strokeWidth="1.5"
          />
          {view === 'extreme' &&
            EXTREME_POINTS.map((p) => (
              <g key={p.id} onClick={() => setActiveExtreme(p.id)} style={{ cursor: 'pointer' }}>
                <circle
                  cx={p.cx}
                  cy={p.cy}
                  r={activeExtreme === p.id ? 10 : 6}
                  fill="#dc2626"
                  stroke="white"
                  strokeWidth="2"
                />
                <text x={p.cx} y={p.cy - 14} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7f1d1d">
                  {p.id === 'north' ? '북' : p.id === 'south' ? '남' : p.id === 'east' ? '동' : '서'}
                </text>
              </g>
            ))}
          {view === 'location' && (
            <>
              <line x1="0" y1="200" x2="300" y2="200" stroke="#16a34a" strokeWidth="1" strokeDasharray="4 3" />
              <line x1="150" y1="0" x2="150" y2="400" stroke="#16a34a" strokeWidth="1" strokeDasharray="4 3" />
              <text x="6" y="195" fontSize="10" fill="#15803d" fontWeight="bold">위도</text>
              <text x="155" y="14" fontSize="10" fill="#15803d" fontWeight="bold">경도</text>
            </>
          )}
        </svg>
      </div>

      {view === 'location' && (
        <div className="rounded-xl border-l-4 border-orange-500 bg-orange-50/50 dark:bg-orange-950/20 p-4 space-y-2 text-sm">
          <div className="font-bold text-orange-700 dark:text-orange-400">수리적 위치 vs 지리적 위치</div>
          <p>
            <strong>수리적 위치</strong>는 <em>위도·경도</em>로 표현해요. 한반도는 대략 <strong>북위 33°~43°, 동경 124°~132°</strong>에 위치합니다.
          </p>
          <p>
            <strong>지리적 위치</strong>는 주변 지형·바다와의 관계로 말해요. 한반도는 <strong>유라시아 대륙 동쪽 끝, 삼면이 바다인 반도</strong>예요.
          </p>
        </div>
      )}

      {view === 'extreme' && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {EXTREME_POINTS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveExtreme(p.id)}
                className={`px-2 py-2 text-xs rounded-md border min-h-[44px] ${
                  activeExtreme === p.id
                    ? 'border-orange-500 ring-2 ring-orange-300 font-bold'
                    : 'border-zinc-200 dark:border-zinc-700'
                }`}
              >
                {p.id === 'north' ? '극북' : p.id === 'south' ? '극남' : p.id === 'east' ? '극동' : '극서'}
              </button>
            ))}
          </div>
          <div className="rounded-xl border-l-4 border-orange-500 bg-orange-50/50 dark:bg-orange-950/20 p-4 space-y-1 text-sm">
            <div className="font-bold text-orange-700 dark:text-orange-400">{cur.name}</div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400">{cur.lat} · {cur.lon}</div>
            <p>{cur.desc}</p>
          </div>
        </>
      )}

      {view === 'territory' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-xl border-l-4 border-yellow-600 bg-yellow-50/50 dark:bg-yellow-950/20 p-3">
            <div className="font-bold text-yellow-700 dark:text-yellow-400">영토</div>
            <p className="text-xs">땅. 한반도와 부속 도서(섬) 전부.</p>
          </div>
          <div className="rounded-xl border-l-4 border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 p-3">
            <div className="font-bold text-blue-700 dark:text-blue-400">영해</div>
            <p className="text-xs">바다. 보통 해안에서 12해리(약 22km)까지.</p>
          </div>
          <div className="rounded-xl border-l-4 border-sky-600 bg-sky-50/50 dark:bg-sky-950/20 p-3">
            <div className="font-bold text-sky-700 dark:text-sky-400">영공</div>
            <p className="text-xs">하늘. 영토와 영해 위쪽 공중까지.</p>
          </div>
        </div>
      )}
    </div>
  );
}
