'use client';

// S8-EU-02 / S5-EU-02 기권과 날씨 — 기단·전선·일기도.
// 한반도 영향 4대 기단을 토글하며 전선 형성과 날씨 변화를 본다.

import { useState } from 'react';

interface AirMass {
  key: 'siberian' | 'okhotsk' | 'pacific' | 'tropical';
  name: string;
  origin: string;
  temp: 'cold' | 'warm';
  humid: 'dry' | 'wet';
  season: string;
  cx: number;
  cy: number;
  color: string;
}

const AIR_MASSES: AirMass[] = [
  {
    key: 'siberian',
    name: '시베리아 기단',
    origin: '대륙 시베리아',
    temp: 'cold',
    humid: 'dry',
    season: '겨울',
    cx: 80,
    cy: 60,
    color: '#3b82f6',
  },
  {
    key: 'okhotsk',
    name: '오호츠크해 기단',
    origin: '오호츠크 해상',
    temp: 'cold',
    humid: 'wet',
    season: '초여름(장마)',
    cx: 280,
    cy: 50,
    color: '#06b6d4',
  },
  {
    key: 'pacific',
    name: '북태평양 기단',
    origin: '태평양',
    temp: 'warm',
    humid: 'wet',
    season: '한여름',
    cx: 280,
    cy: 240,
    color: '#10b981',
  },
  {
    key: 'tropical',
    name: '적도 기단',
    origin: '적도 해상',
    temp: 'warm',
    humid: 'wet',
    season: '태풍기',
    cx: 100,
    cy: 250,
    color: '#f97316',
  },
];

const FRONTS = [
  {
    key: 'cold',
    name: '한랭전선',
    desc: '찬 공기가 따뜻한 공기 밑으로 → 짧고 강한 소나기·뇌우',
    color: '#3b82f6',
    symbol: '▼',
  },
  {
    key: 'warm',
    name: '온난전선',
    desc: '따뜻한 공기가 찬 공기 위로 → 넓고 약한 비 (이슬비)',
    color: '#ef4444',
    symbol: '●',
  },
  {
    key: 'stationary',
    name: '정체전선',
    desc: '두 기단 힘이 비슷 → 장마전선처럼 오래 머묾',
    color: '#a855f7',
    symbol: '▲▼',
  },
  {
    key: 'occluded',
    name: '폐색전선',
    desc: '한랭이 온난을 따라잡음 → 강한 비 후 맑음',
    color: '#06b6d4',
    symbol: '◆',
  },
];

export function WeatherFrontExplorer() {
  const [activeMasses, setActiveMasses] = useState<Set<string>>(new Set(['siberian']));
  const [selectedFront, setSelectedFront] = useState(0);

  const toggleMass = (key: string) => {
    setActiveMasses((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const presetSeason = (season: string) => {
    if (season === '겨울') setActiveMasses(new Set(['siberian']));
    else if (season === '여름') setActiveMasses(new Set(['pacific']));
    else if (season === '장마') setActiveMasses(new Set(['okhotsk', 'pacific']));
    else if (season === '태풍') setActiveMasses(new Set(['pacific', 'tropical']));
  };

  const front = FRONTS[selectedFront];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {['겨울', '장마', '여름', '태풍'].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => presetSeason(s)}
            className="px-2 py-2 rounded text-xs font-medium min-h-[44px] bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-emerald-500 hover:text-white"
          >
            {s} 프리셋
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-700">
        <svg viewBox="0 0 360 300" className="w-full h-auto" role="img" aria-label="한반도 일기도">
          {/* 한반도 */}
          <path
            d="M 180 130 L 195 140 L 205 165 L 200 195 L 215 215 L 210 240 L 195 250 L 175 245 L 165 225 L 168 200 L 175 180 L 170 155 L 175 135 Z"
            fill="#86efac"
            stroke="#16a34a"
            strokeWidth={1.5}
            className="dark:fill-emerald-800/60"
          />
          <text x={185} y={195} textAnchor="middle" fontSize="9" fill="#166534" className="dark:fill-emerald-200">
            한반도
          </text>

          {/* 기단 */}
          {AIR_MASSES.map((m) => {
            const active = activeMasses.has(m.key);
            return (
              <g key={m.key}>
                <circle
                  cx={m.cx}
                  cy={m.cy}
                  r={active ? 50 : 30}
                  fill={m.color}
                  fillOpacity={active ? 0.35 : 0.12}
                  stroke={m.color}
                  strokeWidth={active ? 2 : 1}
                  strokeDasharray={active ? '0' : '4 3'}
                  className="transition-all"
                />
                <text
                  x={m.cx}
                  y={m.cy + 3}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight={active ? 'bold' : 'normal'}
                  fill="currentColor"
                  opacity={active ? 1 : 0.6}
                >
                  {m.name.replace(' 기단', '')}
                </text>
                <text
                  x={m.cx}
                  y={m.cy + 16}
                  textAnchor="middle"
                  fontSize="7"
                  fill={m.color}
                  fontWeight="bold"
                  opacity={active ? 1 : 0.6}
                >
                  {m.temp === 'cold' ? '❄️' : '🔥'}
                  {m.humid === 'wet' ? '💧' : '🏜'}
                </text>
              </g>
            );
          })}

          {/* 기압 등압선 (시베리아 활성 시 고기압) */}
          {activeMasses.has('siberian') && (
            <g opacity={0.5}>
              <circle cx={80} cy={60} r={70} fill="none" stroke="#3b82f6" strokeWidth={0.8} strokeDasharray="3 3" />
              <text x={80} y={28} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#3b82f6">
                고
              </text>
            </g>
          )}
          {activeMasses.has('pacific') && (
            <g opacity={0.5}>
              <circle cx={280} cy={240} r={70} fill="none" stroke="#10b981" strokeWidth={0.8} strokeDasharray="3 3" />
              <text x={280} y={282} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#10b981">
                고
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {AIR_MASSES.map((m) => {
          const active = activeMasses.has(m.key);
          return (
            <button
              key={m.key}
              type="button"
              onClick={() => toggleMass(m.key)}
              className={`px-2 py-2 rounded text-xs font-medium min-h-[44px] ${
                active ? 'text-white' : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
              }`}
              style={active ? { background: m.color } : undefined}
            >
              {m.name.replace(' 기단', '')}
              <div className="text-[10px] opacity-80">{m.season}</div>
            </button>
          );
        })}
      </div>

      <div>
        <div className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">전선의 종류</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {FRONTS.map((f, i) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setSelectedFront(i)}
              className={`px-2 py-2 rounded text-xs font-medium min-h-[44px] ${
                i === selectedFront ? 'bg-emerald-600 text-white' : 'bg-zinc-200 dark:bg-zinc-700'
              }`}
            >
              {f.symbol} {f.name}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl p-3 border-l-4 bg-zinc-100 dark:bg-zinc-800 text-sm" style={{ borderColor: front.color }}>
        <div className="font-bold text-zinc-900 dark:text-zinc-100">{front.name}</div>
        <div className="text-zinc-600 dark:text-zinc-400 mt-1">{front.desc}</div>
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        💡 「기단」 = 같은 성질의 거대 공기 덩어리. 두 기단이 만나는 경계가 「전선」. 한반도는 4대 기단이 계절마다 교대로 영향을 줘서 사계절이 뚜렷해요.
        장마는 차가운 오호츠크해 기단과 따뜻한 북태평양 기단이 한반도에서 부딪치는 「정체전선」이에요.
      </div>
    </div>
  );
}
