'use client';

// S-BIO-04 면역 — 1차/2차 방어 + 백신 효과 시뮬.
// 항원 침입 시 항체 생산량 vs 시간 그래프 (초감염 vs 재감염).

import { useMemo, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

interface SeriesPoint {
  day: number;
  primary: number; // 1차 면역 반응 항체량
  secondary: number; // 2차 면역 반응
}

function buildSeries(antigenStrength: number, vaccinated: boolean): SeriesPoint[] {
  const points: SeriesPoint[] = [];
  // 1차 반응: 잠복기 ~5일, 피크 ~14일, 느리게 상승
  // 2차 반응 (또는 백신): 잠복기 ~1-2일, 피크 ~5-7일, 매우 빠르고 강함
  for (let day = 0; day <= 30; day++) {
    let primary = 0;
    let secondary = 0;
    // 1차: 시그모이드+감쇠
    if (day >= 4) {
      const t = day - 4;
      primary = (antigenStrength * t * t) / (t * t + 100) * Math.exp(-Math.max(0, day - 16) * 0.15);
    }
    // 2차 (재감염 또는 백신 후 감염): 빠른 상승, 더 높은 피크
    if (vaccinated && day >= 1) {
      const t = day - 1;
      secondary = (antigenStrength * 2.2 * t * t) / (t * t + 12) * Math.exp(-Math.max(0, day - 8) * 0.18);
    }
    points.push({ day, primary, secondary });
  }
  return points;
}

const W = 360;
const H = 200;
const PAD = 28;

export function ImmuneResponseSimulator() {
  const [antigenStrength, setAntigenStrength] = useState(80);
  const [vaccinated, setVaccinated] = useState(true);
  const [showLymphocyte, setShowLymphocyte] = useState(true);

  const series = useMemo(() => buildSeries(antigenStrength, vaccinated), [antigenStrength, vaccinated]);

  const maxY = useMemo(() => {
    const max = series.reduce(
      (m, p) => Math.max(m, p.primary, p.secondary),
      1,
    );
    return Math.max(max, 80);
  }, [series]);

  const xScale = (d: number) => PAD + ((W - PAD * 2) * d) / 30;
  const yScale = (v: number) => H - PAD - ((H - PAD * 2) * v) / maxY;

  const primaryPath = series.map((p, i) => `${i === 0 ? 'M' : 'L'}${xScale(p.day).toFixed(1)},${yScale(p.primary).toFixed(1)}`).join(' ');
  const secondaryPath = series.map((p, i) => `${i === 0 ? 'M' : 'L'}${xScale(p.day).toFixed(1)},${yScale(p.secondary).toFixed(1)}`).join(' ');

  const peakPrimary = series.reduce((m, p) => (p.primary > m ? p.primary : m), 0);
  const peakSecondary = series.reduce((m, p) => (p.secondary > m ? p.secondary : m), 0);
  const peakPrimaryDay = series.find((p) => p.primary === peakPrimary)?.day ?? 0;
  const peakSecondaryDay = series.find((p) => p.secondary === peakSecondary)?.day ?? 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <SliderRow
          label="항원 침입량 (병원체 강도)"
          value={antigenStrength}
          min={20}
          max={150}
          step={5}
          onChange={setAntigenStrength}
          format={(v) => v.toFixed(0)}
        />
        <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg flex items-center gap-3">
          <button
            type="button"
            onClick={() => setVaccinated((v) => !v)}
            className={`px-4 py-2 rounded-lg font-medium min-h-[44px] ${
              vaccinated ? 'bg-emerald-600 text-white' : 'bg-zinc-300 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
            }`}
            aria-pressed={vaccinated}
          >
            {vaccinated ? '✅ 백신 접종' : '⬜ 미접종'}
          </button>
          <button
            type="button"
            onClick={() => setShowLymphocyte((v) => !v)}
            className={`px-3 py-2 rounded-lg text-sm min-h-[44px] ${
              showLymphocyte ? 'bg-blue-600 text-white' : 'bg-zinc-300 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            세포 표시
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-700">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          role="img"
          aria-label="면역 반응 항체량 변화 그래프"
        >
          {/* axes */}
          <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="currentColor" strokeOpacity={0.3} />
          <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} stroke="currentColor" strokeOpacity={0.3} />
          {/* gridlines */}
          {[7, 14, 21, 28].map((d) => (
            <g key={d}>
              <line
                x1={xScale(d)}
                y1={PAD}
                x2={xScale(d)}
                y2={H - PAD}
                stroke="currentColor"
                strokeOpacity={0.08}
                strokeDasharray="2 2"
              />
              <text
                x={xScale(d)}
                y={H - 10}
                textAnchor="middle"
                fontSize="10"
                fill="currentColor"
                opacity={0.5}
              >
                {d}일
              </text>
            </g>
          ))}
          {/* primary curve */}
          <path d={primaryPath} stroke="#f87171" strokeWidth={2.5} fill="none" />
          {/* secondary curve */}
          {vaccinated && <path d={secondaryPath} stroke="#10b981" strokeWidth={2.5} fill="none" />}
          {/* labels */}
          <text x={W - PAD - 10} y={PAD + 14} textAnchor="end" fontSize="10" fill="#f87171" fontWeight="bold">
            1차 반응 (느림)
          </text>
          {vaccinated && (
            <text x={W - PAD - 10} y={PAD + 28} textAnchor="end" fontSize="10" fill="#10b981" fontWeight="bold">
              2차 반응 (빠름·강함)
            </text>
          )}
          <text x={PAD - 4} y={PAD + 4} textAnchor="end" fontSize="10" fill="currentColor" opacity={0.6}>
            항체량
          </text>
        </svg>
      </div>

      {showLymphocyte && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="rounded-lg bg-rose-50 dark:bg-rose-950/40 p-2 border border-rose-200 dark:border-rose-800">
            <div className="font-bold">대식세포</div>
            <div className="text-zinc-600 dark:text-zinc-400">항원 식균</div>
          </div>
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/40 p-2 border border-blue-200 dark:border-blue-800">
            <div className="font-bold">보조 T세포</div>
            <div className="text-zinc-600 dark:text-zinc-400">B세포 활성화</div>
          </div>
          <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/40 p-2 border border-emerald-200 dark:border-emerald-800">
            <div className="font-bold">B세포 / 형질세포</div>
            <div className="text-zinc-600 dark:text-zinc-400">항체 생산</div>
          </div>
          <div className="rounded-lg bg-purple-50 dark:bg-purple-950/40 p-2 border border-purple-200 dark:border-purple-800">
            <div className="font-bold">기억세포</div>
            <div className="text-zinc-600 dark:text-zinc-400">2차 반응 담당</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-lg bg-rose-50 dark:bg-rose-950/40 p-3 border border-rose-200 dark:border-rose-800">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">1차 반응 피크</div>
          <div className="font-bold">{peakPrimary.toFixed(0)} 단위 / {peakPrimaryDay}일째</div>
        </div>
        <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/40 p-3 border border-emerald-200 dark:border-emerald-800">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">2차 반응 피크</div>
          <div className="font-bold">
            {vaccinated ? `${peakSecondary.toFixed(0)} 단위 / ${peakSecondaryDay}일째` : '없음 (미접종)'}
          </div>
        </div>
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        💡 백신은 「기억 B·T세포」를 미리 만들어 둬요. 같은 항원이 다시 들어오면 1~2일 안에 폭발적으로 항체를 생산해요.
      </div>
    </div>
  );
}
