'use client';

// S-CEE 기후변화·환경생태 — 단순 IPCC 시나리오 (배출 증가율 → 2100 ppm/온도)

import { useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

type Scenario = 'low' | 'mid' | 'high' | 'custom';

const SCENARIOS: Record<Exclude<Scenario, 'custom'>, { rate: number; label: string; ppm2100: number; warming: number }> = {
  low: { rate: -2, label: 'SSP1 적극 감축', ppm2100: 445, warming: 1.4 },
  mid: { rate: 0, label: 'SSP2 중간', ppm2100: 600, warming: 2.7 },
  high: { rate: 1.5, label: 'SSP5 화석연료 의존', ppm2100: 1135, warming: 4.4 },
};

export function UnitSCEEExplorer() {
  const [scenario, setScenario] = useState<Scenario>('mid');
  const [customRate, setCustomRate] = useState(0);

  const rate =
    scenario === 'custom'
      ? customRate
      : SCENARIOS[scenario].rate;

  // 단순 모형: ppm = 420 * (1 + rate/100)^77
  const years = 77; // 2026 → 2100
  const ppm2100 =
    scenario === 'custom'
      ? Math.round(420 * Math.pow(1 + rate / 100, years))
      : SCENARIOS[scenario].ppm2100;

  // 기후 민감도 ~3 °C / CO₂ 2배
  const warming =
    scenario === 'custom'
      ? +(3.0 * (Math.log(ppm2100 / 280) / Math.log(2))).toFixed(1) - 0.6 // 산업화 이전 기준 보정
      : SCENARIOS[scenario].warming;

  const seaLevel = warming * 0.43; // m, 단순 비례
  const reefLoss = Math.max(0, Math.min(99, Math.round((warming - 1) * 50))); // %

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          IPCC 시나리오 시뮬
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          오늘 우리가 어떤 배출 경로를 택하는지에 따라 2100년 지구가 얼마나 달라지는지.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        {(['low', 'mid', 'high', 'custom'] as Scenario[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setScenario(s)}
            className={`min-h-[44px] rounded-lg px-2 ${
              scenario === s
                ? 'bg-green-600 text-white font-semibold'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
            }`}
          >
            {s === 'low' ? '1.5°C 경로' : s === 'mid' ? '중간' : s === 'high' ? '고배출' : '직접 입력'}
          </button>
        ))}
      </div>

      {scenario === 'custom' && (
        <SliderRow
          label="연간 배출량 변화율"
          value={customRate}
          min={-5}
          max={4}
          step={0.1}
          onChange={setCustomRate}
          format={(v) => (v >= 0 ? `+${v.toFixed(1)}` : v.toFixed(1))}
          unit=" %/yr"
        />
      )}

      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
        <svg viewBox="0 0 360 160" className="w-full h-auto" role="img" aria-label="2100 시나리오">
          {/* 지구 */}
          <circle cx={180} cy={80} r={50} fill={`hsl(${Math.max(0, 200 - warming * 35)}, 70%, ${50 + warming * 3}%)`} stroke="#16a34a" strokeWidth={2} />
          <text x={180} y={84} fontSize={14} textAnchor="middle" fill="#fff" fontWeight={700}>
            +{warming.toFixed(1)} °C
          </text>
          <text x={180} y={150} fontSize={11} textAnchor="middle" fill="#71717a">
            2100년 지구 평균 기온 변화
          </text>
        </svg>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm space-y-1">
        <div className="flex justify-between">
          <span>2100 CO₂ 농도</span>
          <span className="font-mono">{ppm2100} ppm</span>
        </div>
        <div className="flex justify-between">
          <span>2100 기온 상승 (산업화 이전 대비)</span>
          <span
            className="font-mono font-bold"
            style={{ color: warming < 2 ? '#22c55e' : warming < 3 ? '#eab308' : '#dc2626' }}
          >
            +{warming.toFixed(1)} °C
          </span>
        </div>
        <div className="flex justify-between">
          <span>해수면 상승 (대략)</span>
          <span className="font-mono">{seaLevel.toFixed(2)} m</span>
        </div>
        <div className="flex justify-between border-t border-zinc-200 dark:border-zinc-700 pt-1">
          <span className="font-bold">산호초 손실</span>
          <span className="font-mono font-bold" style={{ color: reefLoss > 70 ? '#dc2626' : reefLoss > 30 ? '#eab308' : '#22c55e' }}>
            {reefLoss} %
          </span>
        </div>
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        파리협정 1.5 °C 목표는 SSP1 수준의 즉각적·강력 감축 전제. 현재 배출 추세는 SSP3-7.0(~3 °C) 부근. 2 °C 넘으면 산호·빙하·영구동토 임계점 통과 위험.
      </p>
    </div>
  );
}
