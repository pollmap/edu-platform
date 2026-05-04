'use client';

// S-EAR-02 대기·해양 — 전지구 대기 대순환 (Hadley·Ferrel·Polar) + 표층 해류.
// 위도별 가열 차이로 발생하는 3순환계와 코리올리 효과로 휘어지는 대기·해양 표층 흐름.

import { useMemo, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

interface CellInfo {
  name: string;
  latRange: [number, number]; // [low, high]
  direction: 'rising' | 'falling';
  description: string;
  color: string;
}

const CELLS: CellInfo[] = [
  {
    name: '해들리 (Hadley)',
    latRange: [0, 30],
    direction: 'rising',
    description:
      '적도 부근 강한 가열 → 상승 (적도 저압대) → 30°에서 하강 (아열대 고압대). 사하라·아라비아 사막이 여기.',
    color: '#fbbf24',
  },
  {
    name: '페렐 (Ferrel)',
    latRange: [30, 60],
    direction: 'rising',
    description: '중위도 — 편서풍대. 한국·일본·미국 본토 모두 여기. 저기압 시스템이 빈번해 날씨 변동 큼.',
    color: '#10b981',
  },
  {
    name: '극 (Polar)',
    latRange: [60, 90],
    direction: 'falling',
    description: '극지방 강한 냉각 → 하강 (극 고압대). 한대 동풍이 60°N에서 편서풍과 만나며 한대 전선 형성.',
    color: '#60a5fa',
  },
];

// 위도별 평균 받는 태양복사량 (cos(위도))
function solarFlux(latDeg: number): number {
  return Math.cos((latDeg * Math.PI) / 180);
}

const W = 360;
const H = 220;

export function GlobalCirculationExplorer() {
  const [coriolisStrength, setCoriolisStrength] = useState(1.0);
  const [hemisphere, setHemisphere] = useState<'N' | 'S'>('N');
  const [activeCell, setActiveCell] = useState<string>('해들리 (Hadley)');

  const cells = useMemo(() => CELLS, []);
  const cell = cells.find((c) => c.name === activeCell)!;

  // 표층 해류는 코리올리×풍계로 결정. 단순화: 무역풍 (적도→서) + 편서풍 (중위도→동) + 극풍 (극→서).
  const currents = useMemo(() => {
    const arr: { lat: number; speed: number; dir: 'E' | 'W' }[] = [];
    for (let lat = 5; lat <= 85; lat += 10) {
      const dir: 'E' | 'W' =
        lat < 30 ? 'W' : lat < 60 ? 'E' : 'W';
      const speed = solarFlux(lat) * coriolisStrength;
      arr.push({ lat, speed, dir });
    }
    return arr;
  }, [coriolisStrength]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <SliderRow
          label="🌍 코리올리 효과 강도"
          value={coriolisStrength}
          min={0}
          max={2}
          step={0.05}
          onChange={setCoriolisStrength}
          format={(v) => v.toFixed(2)}
        />
        <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg flex items-center gap-2">
          <button
            type="button"
            onClick={() => setHemisphere('N')}
            className={`flex-1 px-3 py-2 rounded-lg font-medium min-h-[44px] ${
              hemisphere === 'N' ? 'bg-blue-600 text-white' : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            북반구
          </button>
          <button
            type="button"
            onClick={() => setHemisphere('S')}
            className={`flex-1 px-3 py-2 rounded-lg font-medium min-h-[44px] ${
              hemisphere === 'S' ? 'bg-blue-600 text-white' : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            남반구
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-gradient-to-b from-blue-100 to-blue-50 dark:from-zinc-900 dark:to-zinc-800 p-3 border border-zinc-200 dark:border-zinc-700">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="대기 대순환 단면도">
          {/* 위도선 */}
          {[0, 30, 60, 90].map((lat) => {
            const y = H - 20 - (H - 40) * (lat / 90);
            return (
              <g key={lat}>
                <line x1={20} y1={y} x2={W - 20} y2={y} stroke="currentColor" strokeOpacity={0.2} strokeDasharray="2 2" />
                <text x={6} y={y + 3} fontSize="9" fill="currentColor" opacity={0.6}>
                  {lat}°
                </text>
              </g>
            );
          })}
          {/* 셀별 영역 */}
          {cells.map((c) => {
            const yLow = H - 20 - (H - 40) * (c.latRange[0] / 90);
            const yHigh = H - 20 - (H - 40) * (c.latRange[1] / 90);
            return (
              <rect
                key={c.name}
                x={20}
                y={yHigh}
                width={W - 40}
                height={yLow - yHigh}
                fill={c.color}
                fillOpacity={c.name === activeCell ? 0.35 : 0.15}
                onClick={() => setActiveCell(c.name)}
                style={{ cursor: 'pointer' }}
              />
            );
          })}
          {/* 순환 화살표 (셀 안에서) */}
          {cells.map((c, idx) => {
            const yLow = H - 20 - (H - 40) * (c.latRange[0] / 90);
            const yHigh = H - 20 - (H - 40) * (c.latRange[1] / 90);
            const cx = W / 2;
            const cy = (yLow + yHigh) / 2;
            return (
              <g key={c.name}>
                <text x={cx} y={cy + 3} textAnchor="middle" fontSize="11" fontWeight="bold" fill="currentColor">
                  {c.name.split(' ')[0]}
                </text>
                <text x={cx} y={cy + 16} textAnchor="middle" fontSize="9" fill="currentColor" opacity={0.7}>
                  {idx === 1 ? '간접 순환' : '직접 순환'}
                </text>
              </g>
            );
          })}
          {/* 코리올리 영향 표층풍 화살표 — 우측에 모아서 그림 */}
          {currents.map((cur, i) => {
            const y = H - 20 - (H - 40) * (cur.lat / 90);
            const len = 14 + cur.speed * 30;
            const dirSign = cur.dir === 'E' ? 1 : -1;
            const x1 = W - 80;
            const x2 = x1 + len * dirSign;
            return (
              <g key={i}>
                <line x1={x1} y1={y} x2={x2} y2={y} stroke="#ef4444" strokeWidth={1.6} />
                <polygon
                  points={`${x2},${y} ${x2 - 4 * dirSign},${y - 3} ${x2 - 4 * dirSign},${y + 3}`}
                  fill="#ef4444"
                />
              </g>
            );
          })}
          <text x={W - 60} y={20} fontSize="9" fill="#ef4444" fontWeight="bold">
            표층 풍계 (E/W)
          </text>
        </svg>
      </div>

      <div className="flex flex-wrap gap-2">
        {cells.map((c) => (
          <button
            key={c.name}
            type="button"
            onClick={() => setActiveCell(c.name)}
            className={`px-3 py-2 rounded-lg text-sm font-medium min-h-[44px] ${
              activeCell === c.name ? 'bg-emerald-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-4 border border-emerald-200 dark:border-emerald-800">
        <div className="font-bold mb-1">{cell.name} 순환</div>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">{cell.description}</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
          위도 {cell.latRange[0]}° ~ {cell.latRange[1]}° / {hemisphere === 'N' ? '북반구' : '남반구'}.
          코리올리 강도 {coriolisStrength.toFixed(2)}배에서 표층풍이 {hemisphere === 'N' ? '오른쪽' : '왼쪽'}으로 휘어요.
        </p>
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        💡 한반도(약 36°N)는 페렐 셀에 속해 편서풍을 받기 때문에 날씨가 「서→동」으로 이동해요. 일기예보에서 「중국발 황사」라는 표현이 자연스러운 이유.
      </div>
    </div>
  );
}
