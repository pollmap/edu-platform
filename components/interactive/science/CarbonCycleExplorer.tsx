'use client';

// S-IS2-04 환경과 에너지 — 탄소순환 + 기후변화.
// 화석연료 사용량 슬라이더가 대기 CO2 농도·평균기온 변화에 미치는 영향 시각화.

import { useMemo, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

interface Reservoir {
  id: string;
  label: string;
  emoji: string;
  baseGtC: number; // 탄소 저장량 (Gt)
  color: string;
}

const RESERVOIRS: Reservoir[] = [
  { id: 'atmosphere', label: '대기', emoji: '☁️', baseGtC: 870, color: '#60a5fa' },
  { id: 'ocean', label: '해양', emoji: '🌊', baseGtC: 38000, color: '#0891b2' },
  { id: 'biosphere', label: '생물권', emoji: '🌳', baseGtC: 2300, color: '#16a34a' },
  { id: 'fossil', label: '화석연료', emoji: '🛢', baseGtC: 4000, color: '#7c2d12' },
  { id: 'soil', label: '토양·지각', emoji: '⛰', baseGtC: 1500, color: '#a16207' },
];

// 산업혁명 이전 대기 CO2 = 280 ppm. 1 ppm CO2 ≈ 2.13 GtC.
const PRE_INDUSTRIAL_PPM = 280;
const GT_PER_PPM = 2.13;

export function CarbonCycleExplorer() {
  const [emissionRate, setEmissionRate] = useState(36); // GtC/year
  const [years, setYears] = useState(100);
  const [reforestation, setReforestation] = useState(0); // GtC/year 흡수
  const [activeReservoir, setActiveReservoir] = useState('atmosphere');

  const result = useMemo(() => {
    // 단순 모델: 매년 배출량의 50%가 대기에 남고, 30% 해양, 20% 생물권 (실제 분배 비율 근사)
    const totalEmission = (emissionRate - reforestation) * years;
    const atmAdd = totalEmission * 0.5;
    const oceanAdd = totalEmission * 0.3;
    const bioAdd = totalEmission * 0.2;
    const fossilLoss = totalEmission;
    const newAtmGt = RESERVOIRS[0].baseGtC + atmAdd;
    const newPpm = newAtmGt / GT_PER_PPM;
    // 기후 민감도: 2×CO2 → +3°C (IPCC 중간 추정)
    const tempIncrease = 3 * Math.log2(newPpm / PRE_INDUSTRIAL_PPM);
    return { atmAdd, oceanAdd, bioAdd, fossilLoss, newAtmGt, newPpm, tempIncrease, totalEmission };
  }, [emissionRate, reforestation, years]);

  const reservoirData = useMemo(
    () =>
      RESERVOIRS.map((r) => {
        let delta = 0;
        if (r.id === 'atmosphere') delta = result.atmAdd;
        else if (r.id === 'ocean') delta = result.oceanAdd;
        else if (r.id === 'biosphere') delta = result.bioAdd;
        else if (r.id === 'fossil') delta = -result.fossilLoss;
        return { ...r, delta, current: r.baseGtC + delta };
      }),
    [result],
  );

  const active = reservoirData.find((r) => r.id === activeReservoir)!;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <SliderRow
          label="🛢 화석연료 배출 (GtC/년)"
          value={emissionRate}
          min={0}
          max={60}
          step={1}
          onChange={setEmissionRate}
          unit=" Gt/y"
          format={(v) => v.toFixed(0)}
        />
        <SliderRow
          label="🌳 조림·CCS 흡수 (GtC/년)"
          value={reforestation}
          min={0}
          max={20}
          step={0.5}
          onChange={setReforestation}
          unit=" Gt/y"
          format={(v) => v.toFixed(1)}
        />
        <SliderRow
          label="📅 시뮬 기간"
          value={years}
          min={10}
          max={300}
          step={10}
          onChange={setYears}
          unit=" 년"
          format={(v) => v.toFixed(0)}
        />
      </div>

      {/* 저장소 막대 */}
      <div className="space-y-1.5">
        {reservoirData.map((r) => {
          const maxLog = Math.log10(40000); // 해양 최대치 기준
          const widthLog = (Math.log10(Math.max(r.current, 1)) / maxLog) * 100;
          const isActive = r.id === activeReservoir;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setActiveReservoir(r.id)}
              className={`block w-full text-left transition ${isActive ? 'ring-2 ring-yellow-400 rounded-lg' : ''}`}
            >
              <div className="flex items-center justify-between mb-1 text-xs">
                <span className="font-bold">
                  {r.emoji} {r.label}
                </span>
                <span className="font-mono text-zinc-600 dark:text-zinc-300">
                  {r.current.toFixed(0)} GtC{' '}
                  <span className={r.delta > 0 ? 'text-rose-500' : r.delta < 0 ? 'text-emerald-500' : ''}>
                    ({r.delta > 0 ? '+' : ''}
                    {r.delta.toFixed(0)})
                  </span>
                </span>
              </div>
              <div className="h-5 rounded bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                <div
                  className="h-full transition-all"
                  style={{ width: `${widthLog}%`, background: r.color }}
                />
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/40 p-3 border border-blue-200 dark:border-blue-800">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">CO₂ 농도</div>
          <div className="font-bold">{result.newPpm.toFixed(0)} ppm</div>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-400">산업혁명 전 280 ppm</div>
        </div>
        <div className="rounded-lg bg-rose-50 dark:bg-rose-950/40 p-3 border border-rose-200 dark:border-rose-800">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">기온 상승</div>
          <div className="font-bold">+{result.tempIncrease.toFixed(2)} °C</div>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-400">파리협정 +1.5℃ 목표</div>
        </div>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/40 p-3 border border-amber-200 dark:border-amber-800">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">총 배출량</div>
          <div className="font-bold">{result.totalEmission.toFixed(0)} GtC</div>
        </div>
        <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/40 p-3 border border-emerald-200 dark:border-emerald-800">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">순 배출률</div>
          <div className="font-bold">{(emissionRate - reforestation).toFixed(1)} GtC/년</div>
        </div>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-700">
        <div className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-1">
          {active.emoji} {active.label} 저장소
        </div>
        <div className="text-sm text-zinc-700 dark:text-zinc-300">
          기준값 {active.baseGtC.toLocaleString()} GtC →{' '}
          <span className="font-bold">{active.current.toFixed(0)} GtC</span>{' '}
          ({active.delta >= 0 ? '+' : ''}
          {active.delta.toFixed(0)} GtC,{' '}
          {((active.delta / active.baseGtC) * 100).toFixed(1)}% 변화)
        </div>
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        💡 화석연료에 묻혀 있던 탄소를 태우면 그 양만큼 대기 CO₂가 늘어나요. 해양은 이산화탄소를 흡수하지만, 그 결과 「해양 산성화」가 일어나 산호초·조개류가 위협받아요. 임업·CCS 기술로 흡수를 늘리는 게 핵심.
      </div>
    </div>
  );
}
