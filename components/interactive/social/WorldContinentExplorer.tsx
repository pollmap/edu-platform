'use client';

// H7-GE-01 내가 사는 세계 — 6대륙 클릭 + 대표 정보.

import { useState } from 'react';

interface Continent {
  id: string;
  name: string;
  area: string;
  population: string;
  features: string;
  countries: string;
  color: string;
  d: string;
}

const CONTINENTS: Continent[] = [
  {
    id: 'asia',
    name: '아시아',
    area: '4,460만 km²',
    population: '약 47억 명 (세계 최다)',
    features: '6대륙 중 가장 큰 대륙. 한국·중국·일본·인도 포함. 사막부터 열대까지 기후가 가장 다양해요.',
    countries: '한국·중국·일본·인도·인도네시아 등 49개국',
    color: '#f59e0b',
    d: 'M 280 80 L 380 70 L 420 110 L 410 160 L 360 180 L 290 170 L 270 130 Z',
  },
  {
    id: 'africa',
    name: '아프리카',
    area: '3,037만 km²',
    population: '약 14억 명',
    features: '두 번째로 큰 대륙. 적도가 지나가서 열대 지역이 많고 사하라 사막이 있어요.',
    countries: '이집트·나이지리아·남아프리카공화국 등 54개국',
    color: '#16a34a',
    d: 'M 230 170 L 290 170 L 300 220 L 280 280 L 250 290 L 230 250 L 220 200 Z',
  },
  {
    id: 'europe',
    name: '유럽',
    area: '1,018만 km²',
    population: '약 7.5억 명',
    features: '아시아와 한 덩어리(유라시아). 나라 수가 많고 작아요. 북대서양 해류로 같은 위도 다른 곳보다 따뜻해요.',
    countries: '영국·프랑스·독일·이탈리아 등 50개국',
    color: '#3b82f6',
    d: 'M 230 80 L 290 75 L 290 130 L 260 140 L 230 130 Z',
  },
  {
    id: 'namerica',
    name: '북아메리카',
    area: '2,471만 km²',
    population: '약 5.9억 명',
    features: '미국·캐나다·멕시코. 북쪽은 매우 춥고 남쪽은 따뜻. 로키산맥과 미시시피강이 유명.',
    countries: '미국·캐나다·멕시코 등 23개국',
    color: '#8b5cf6',
    d: 'M 80 80 L 180 70 L 200 130 L 180 180 L 130 200 L 90 170 L 70 120 Z',
  },
  {
    id: 'samerica',
    name: '남아메리카',
    area: '1,784만 km²',
    population: '약 4.4억 명',
    features: '아마존 열대우림(지구 최대), 안데스산맥(세계 최장). 브라질이 면적의 절반.',
    countries: '브라질·아르헨티나·칠레 등 12개국',
    color: '#ec4899',
    d: 'M 130 220 L 180 210 L 200 260 L 180 320 L 150 330 L 120 290 L 110 250 Z',
  },
  {
    id: 'oceania',
    name: '오세아니아',
    area: '849만 km²',
    population: '약 0.4억 명',
    features: '6대륙 중 가장 작아요. 호주가 대부분이고 뉴질랜드·태평양 섬나라들 포함. 고유 동물(코알라·캥거루) 풍부.',
    countries: '호주·뉴질랜드·피지 등 14개국',
    color: '#06b6d4',
    d: 'M 360 240 L 420 235 L 430 275 L 400 290 L 365 280 Z',
  },
];

export function WorldContinentExplorer() {
  const [active, setActive] = useState('asia');
  const cur = CONTINENTS.find((c) => c.id === active)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-1">
          세계 6대륙 — 클릭해서 살펴봐요
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          지구의 육지는 크게 6개 대륙으로 나뉘어요. 각 대륙은 면적·기후·문화가 다 달라요.
        </p>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-zinc-200 dark:border-zinc-800 p-4">
        <svg viewBox="0 0 500 350" className="w-full">
          <rect x="0" y="0" width="500" height="350" fill="#dbeafe" className="dark:fill-blue-950/50" />
          {CONTINENTS.map((c) => {
            const isActive = active === c.id;
            return (
              <g key={c.id} onClick={() => setActive(c.id)} style={{ cursor: 'pointer' }}>
                <path
                  d={c.d}
                  fill={c.color}
                  stroke="white"
                  strokeWidth="1.5"
                  opacity={isActive ? 1 : 0.65}
                />
                <text
                  x={getCentroid(c.d).x}
                  y={getCentroid(c.d).y}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight={isActive ? 'bold' : 'normal'}
                  fill="white"
                  pointerEvents="none"
                >
                  {c.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
        {CONTINENTS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActive(c.id)}
            className={`px-2 py-2 text-xs rounded-md border min-h-[44px] ${
              active === c.id
                ? 'border-orange-500 ring-2 ring-orange-300 font-bold'
                : 'border-zinc-200 dark:border-zinc-700'
            }`}
            style={{ background: active === c.id ? c.color + '22' : undefined }}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="rounded-xl border-l-4 p-4 space-y-2" style={{ borderColor: cur.color, background: cur.color + '11' }}>
        <div className="text-lg font-bold" style={{ color: cur.color }}>{cur.name}</div>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">{cur.features}</p>
        <div className="grid grid-cols-2 gap-2 text-xs text-zinc-600 dark:text-zinc-400">
          <div><strong>면적:</strong> {cur.area}</div>
          <div><strong>인구:</strong> {cur.population}</div>
          <div className="col-span-2"><strong>대표 국가:</strong> {cur.countries}</div>
        </div>
      </div>
    </div>
  );
}

function getCentroid(d: string) {
  const nums = d.match(/[\d.]+/g)?.map(Number) ?? [];
  let sx = 0, sy = 0, n = 0;
  for (let i = 0; i + 1 < nums.length; i += 2) {
    sx += nums[i];
    sy += nums[i + 1];
    n++;
  }
  return { x: n ? sx / n : 0, y: n ? sy / n : 0 };
}
