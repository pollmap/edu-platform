'use client';

// S5-EU-01 태양계와 별 — 8 행성 궤도 + 상대 크기·거리.
// 행성 데이터: NASA Planetary Fact Sheet (실측). 사진·요약: 위키백과 ko (CC BY-SA 3.0).

import { useEffect, useRef, useState } from 'react';
import { findWiki, PLANETS as WIKI_PLANETS } from '@/lib/data/wikipedia';
import { WikipediaInfobox } from '@/components/primitives/WikipediaInfobox';

interface Planet {
  name: string;
  color: string;
  radiusKm: number;
  distanceAU: number;
  periodYears: number;
}

// 실데이터 기반 (NASA Planetary Fact Sheet 평균값).
const PLANETS: Planet[] = [
  { name: '수성', color: '#9ca3af', radiusKm: 2440,  distanceAU: 0.39, periodYears: 0.24 },
  { name: '금성', color: '#fbbf24', radiusKm: 6052,  distanceAU: 0.72, periodYears: 0.62 },
  { name: '지구', color: '#3b82f6', radiusKm: 6371,  distanceAU: 1.00, periodYears: 1.00 },
  { name: '화성', color: '#dc2626', radiusKm: 3390,  distanceAU: 1.52, periodYears: 1.88 },
  { name: '목성', color: '#d97706', radiusKm: 69911, distanceAU: 5.20, periodYears: 11.86 },
  { name: '토성', color: '#facc15', radiusKm: 58232, distanceAU: 9.58, periodYears: 29.46 },
  { name: '천왕성', color: '#06b6d4', radiusKm: 25362, distanceAU: 19.18, periodYears: 84.01 },
  { name: '해왕성', color: '#1d4ed8', radiusKm: 24622, distanceAU: 30.07, periodYears: 164.79 },
];

export function SolarSystemExplorer() {
  const [t, setT] = useState(0);
  const [running, setRunning] = useState(true);
  const [selected, setSelected] = useState<string>('지구');
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    let last = performance.now();
    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setT((tt) => tt + dt * 0.3);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [running]);

  // 거리 압축 (log 스케일) — 시각적 가독성. 실제 비례는 어렵다고 안내.
  const W = 480;
  const H = 380;
  const cx = W / 2;
  const cy = H / 2;

  function distancePx(au: number): number {
    return 18 + 18 * Math.log10(au * 10 + 1);
  }

  const sel = PLANETS.find((p) => p.name === selected) ?? PLANETS[2];

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          태양계 — 8 행성 궤도
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          행성은 태양을 중심으로 돌아요. <strong>먼 행성일수록 한 바퀴 도는 데 시간이 오래 걸려요</strong> (케플러 제3법칙). 화면은 거리·크기를 압축해 그렸어요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 rounded-xl bg-zinc-950 overflow-hidden">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
            {PLANETS.map((p) => (
              <circle
                key={`o-${p.name}`}
                cx={cx}
                cy={cy}
                r={distancePx(p.distanceAU)}
                fill="none"
                stroke="#374151"
                strokeWidth="0.5"
              />
            ))}
            <circle cx={cx} cy={cy} r="14" fill="#fbbf24" />
            <text x={cx} y={cy + 28} textAnchor="middle" fill="#fbbf24" fontSize="10">태양</text>
            {PLANETS.map((p) => {
              const r = distancePx(p.distanceAU);
              const angle = (t / p.periodYears) * Math.PI * 2;
              const px = cx + r * Math.cos(angle);
              const py = cy + r * Math.sin(angle);
              const size = Math.max(2, Math.min(7, Math.log10(p.radiusKm) * 1.4));
              const isSel = p.name === selected;
              return (
                <g key={p.name} onClick={() => setSelected(p.name)} style={{ cursor: 'pointer' }}>
                  <circle cx={px} cy={py} r={size} fill={p.color}
                    stroke={isSel ? 'white' : 'none'} strokeWidth={isSel ? 2 : 0} />
                  {isSel && (
                    <text x={px} y={py - size - 4} textAnchor="middle" fill="white" fontSize="10">
                      {p.name}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="space-y-2">
          {PLANETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => setSelected(p.name)}
              className={`w-full px-3 py-2 rounded-md text-xs border text-left flex items-center gap-2 min-h-[36px] ${
                selected === p.name
                  ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500'
                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
              }`}
            >
              <span className="w-3 h-3 rounded-full shrink-0" style={{ background: p.color }} />
              <span className="font-medium text-zinc-900 dark:text-zinc-100">{p.name}</span>
              <span className="ml-auto text-zinc-500 font-mono text-[11px]">{p.distanceAU} AU</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 text-sm">
          <div className="font-bold text-amber-900 dark:text-amber-200">{sel.name} — 측정값</div>
          <div className="text-xs text-zinc-700 dark:text-zinc-300 mt-1 space-y-0.5 font-mono">
            <div>반지름: {sel.radiusKm.toLocaleString()} km</div>
            <div>태양과의 평균 거리: {sel.distanceAU} AU (1 AU ≈ 1.5억 km)</div>
            <div>공전 주기: {sel.periodYears} 년</div>
          </div>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-2">
            출처: NASA Planetary Fact Sheet
          </div>
        </div>
        {(() => {
          const w = findWiki(WIKI_PLANETS, sel.name);
          return w ? <WikipediaInfobox data={w} /> : null;
        })()}
      </div>

      <button
        type="button"
        onClick={() => setRunning((r) => !r)}
        className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 min-h-[44px] text-sm"
      >
        {running ? '⏸ 정지' : '▶ 재생'}
      </button>
    </div>
  );
}
