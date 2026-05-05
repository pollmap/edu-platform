'use client';

// S8-EU-01 수권·해류 — 한반도 주변 해류(쿠로시오·동한난류·북한한류·연해주한류) + 염분/수온.
// 위도와 계절을 바꾸며 해수 특성과 해류 방향을 본다.

import { useMemo, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

interface CurrentArrow {
  key: string;
  name: string;
  type: 'warm' | 'cold';
  // SVG 좌표
  path: string; // bezier
  speed: number;
}

const CURRENTS: CurrentArrow[] = [
  {
    key: 'kuroshio',
    name: '쿠로시오 (북태평양 난류)',
    type: 'warm',
    path: 'M 280 250 Q 250 200 220 150',
    speed: 1.0,
  },
  {
    key: 'donghan',
    name: '동한난류',
    type: 'warm',
    path: 'M 220 200 Q 215 150 200 100',
    speed: 0.7,
  },
  {
    key: 'bukhan',
    name: '북한한류',
    type: 'cold',
    path: 'M 175 60 Q 180 90 185 130',
    speed: 0.6,
  },
  {
    key: 'liman',
    name: '연해주(리만)한류',
    type: 'cold',
    path: 'M 145 30 Q 155 80 165 130',
    speed: 0.5,
  },
];

export function OceanCurrentExplorer() {
  const [latitude, setLatitude] = useState(35); // 위도
  const [season, setSeason] = useState<'summer' | 'winter'>('summer');

  // 위도 → 표층 수온 (적도 28°C → 극 -1°C)
  const surfaceTemp = useMemo(() => {
    const baseT = 28 - (Math.abs(latitude) - 0) * 0.55;
    return season === 'winter' ? baseT - 5 : baseT;
  }, [latitude, season]);

  // 위도/계절 → 염분 (강수 많은 적도/극 < 중위도)
  const salinity = useMemo(() => {
    const lat = Math.abs(latitude);
    let s = 35.5 - 0.05 * Math.abs(lat - 30); // 중위도 최대
    if (lat < 10) s -= 1.5; // 적도 강수
    if (lat > 60) s -= 1.0; // 극 빙하 융해
    return Math.max(30, Math.min(37, s));
  }, [latitude]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <SliderRow
          label="위도 (°N)"
          value={latitude}
          min={0}
          max={75}
          step={1}
          onChange={(v) => setLatitude(v)}
          format={(v) => `${v.toFixed(0)}°N`}
        />
        <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg">
          <div className="flex justify-between mb-2 text-sm">
            <span className="font-bold text-blue-700 dark:text-blue-400">계절</span>
            <span className="font-mono text-red-500 dark:text-red-400 font-semibold">
              {season === 'summer' ? '여름' : '겨울'}
            </span>
          </div>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setSeason('summer')}
              className={`flex-1 px-2 py-2 rounded text-xs font-medium min-h-[40px] ${
                season === 'summer'
                  ? 'bg-orange-500 text-white'
                  : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              ☀️ 여름
            </button>
            <button
              type="button"
              onClick={() => setSeason('winter')}
              className={`flex-1 px-2 py-2 rounded text-xs font-medium min-h-[40px] ${
                season === 'winter'
                  ? 'bg-blue-500 text-white'
                  : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              ❄️ 겨울
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-700">
        <svg viewBox="0 0 360 280" className="w-full h-auto" role="img" aria-label="한반도 주변 해류">
          {/* 바다 배경 */}
          <rect width={360} height={280} fill="#dbeafe" className="dark:fill-slate-900" />
          {/* 한반도 단순 윤곽 */}
          <path
            d="M 180 50 L 195 60 L 205 90 L 200 130 L 215 150 L 210 180 L 195 200 L 175 195 L 165 175 L 168 145 L 175 120 L 170 100 L 165 80 L 175 55 Z"
            fill="#86efac"
            stroke="#16a34a"
            strokeWidth={1.5}
            className="dark:fill-emerald-800/60"
          />
          <text x={185} y={130} textAnchor="middle" fontSize="9" fill="#166534" className="dark:fill-emerald-200">
            한반도
          </text>

          {/* 해류 화살표 */}
          {CURRENTS.map((c) => {
            const color = c.type === 'warm' ? '#ef4444' : '#3b82f6';
            return (
              <g key={c.key}>
                <path
                  d={c.path}
                  stroke={color}
                  strokeWidth={3}
                  fill="none"
                  strokeLinecap="round"
                  markerEnd={`url(#arrow-${c.type})`}
                  opacity={season === 'summer' && c.type === 'warm' ? 1 : season === 'winter' && c.type === 'cold' ? 1 : 0.45}
                />
              </g>
            );
          })}

          {/* 화살표 마커 정의 */}
          <defs>
            <marker id="arrow-warm" viewBox="0 0 8 8" refX={6} refY={4} markerWidth={6} markerHeight={6} orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="#ef4444" />
            </marker>
            <marker id="arrow-cold" viewBox="0 0 8 8" refX={6} refY={4} markerWidth={6} markerHeight={6} orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="#3b82f6" />
            </marker>
          </defs>

          {/* 위도 표시선 */}
          <line
            x1={20}
            y1={280 - (latitude / 75) * 240}
            x2={340}
            y2={280 - (latitude / 75) * 240}
            stroke="#fbbf24"
            strokeWidth={1.5}
            strokeDasharray="6 4"
            opacity={0.7}
          />
          <text
            x={344}
            y={280 - (latitude / 75) * 240 + 4}
            fontSize="10"
            fill="#92400e"
            className="dark:fill-amber-300"
            fontWeight="bold"
          >
            {latitude}°
          </text>

          {/* 범례 */}
          <g transform="translate(20 250)">
            <rect width={4} height={8} fill="#ef4444" />
            <text x={8} y={8} fontSize="9" fill="currentColor" opacity={0.8}>
              난류
            </text>
            <rect x={48} width={4} height={8} fill="#3b82f6" />
            <text x={56} y={8} fontSize="9" fill="currentColor" opacity={0.8}>
              한류
            </text>
          </g>
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-orange-50 dark:bg-orange-950/30 p-3 border border-orange-200 dark:border-orange-800">
          <div className="text-xs text-orange-700 dark:text-orange-300">표층 수온</div>
          <div className="text-2xl font-bold text-orange-800 dark:text-orange-200">{surfaceTemp.toFixed(1)}°C</div>
        </div>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-3 border border-blue-200 dark:border-blue-800">
          <div className="text-xs text-blue-700 dark:text-blue-300">염분</div>
          <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">{salinity.toFixed(1)} ‰</div>
        </div>
      </div>

      <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800 p-3">
        <div className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">난류·한류 만남</div>
        <ul className="text-xs space-y-1 text-zinc-600 dark:text-zinc-400">
          <li>• 동해 「조경수역」: 동한난류 + 북한한류 (좋은 어장 — 명태/오징어)</li>
          <li>• 난류는 영양분이 적고, 한류는 영양분이 풍부 → 만나는 곳에 플랑크톤 폭증</li>
          <li>• 여름엔 난류 우세, 겨울엔 한류가 남하</li>
        </ul>
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        💡 해류는 「바람·자전·염분차·수온차」가 만들어요. 한반도는 사면이 바다로 둘러싸여 한·난류 모두의 영향을 받는 「복합 어장」입니다.
      </div>
    </div>
  );
}
