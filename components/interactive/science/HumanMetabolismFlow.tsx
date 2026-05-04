'use client';

// S-BIO-02 사람의 물질대사 — 영양소 → 소화 → 순환 → 호흡 → ATP 흐름.
// 4가지 영양소 (탄수화물·지방·단백질·핵산?) 슬라이더로 칼로리·산소소비량·CO2 배출량·ATP 생산량 반영.

import { useMemo, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

interface Nutrient {
  id: string;
  label: string;
  kcalPerG: number; // 그램당 kcal
  o2PerKcal: number; // kcal당 O2 소비량 (L)
  co2PerKcal: number; // kcal당 CO2 배출량 (L)
  color: string;
}

const NUTRIENTS: Nutrient[] = [
  { id: 'carb', label: '탄수화물 (밥·빵)', kcalPerG: 4, o2PerKcal: 0.207, co2PerKcal: 0.207, color: '#fbbf24' },
  { id: 'fat', label: '지방 (기름·버터)', kcalPerG: 9, o2PerKcal: 0.213, co2PerKcal: 0.151, color: '#f87171' },
  { id: 'protein', label: '단백질 (고기·콩)', kcalPerG: 4, o2PerKcal: 0.232, co2PerKcal: 0.187, color: '#60a5fa' },
];

// 사용자 기초대사량 가정 (성인 1500 kcal/day)
const BASE_BMR = 1500;

export function HumanMetabolismFlow() {
  const [carbG, setCarbG] = useState(300); // 한 끼+간식 평균
  const [fatG, setFatG] = useState(60);
  const [proteinG, setProteinG] = useState(80);
  const [activity, setActivity] = useState(1.4); // 활동 계수 (1.2 = 거의 X, 1.9 = 매우 활동적)

  const result = useMemo(() => {
    const intake = [
      { ...NUTRIENTS[0], grams: carbG, kcal: NUTRIENTS[0].kcalPerG * carbG },
      { ...NUTRIENTS[1], grams: fatG, kcal: NUTRIENTS[1].kcalPerG * fatG },
      { ...NUTRIENTS[2], grams: proteinG, kcal: NUTRIENTS[2].kcalPerG * proteinG },
    ];
    const totalKcal = intake.reduce((acc, n) => acc + n.kcal, 0);
    const expenditure = BASE_BMR * activity;
    const balance = totalKcal - expenditure; // 양수 = 잉여, 음수 = 부족
    const o2 = intake.reduce((acc, n) => acc + n.kcal * n.o2PerKcal, 0); // L/day
    const co2 = intake.reduce((acc, n) => acc + n.kcal * n.co2PerKcal, 0); // L/day
    const rq = co2 / Math.max(o2, 1); // 호흡지수 (Respiratory Quotient)
    // 1 mol 포도당 → 38 ATP (대략). 1 kcal ≈ 0.0042 mol ATP equiv (단순화)
    const atp = totalKcal * 0.18; // 매우 단순화한 ATP 단위 (mol)
    return { intake, totalKcal, expenditure, balance, o2, co2, rq, atp };
  }, [carbG, fatG, proteinG, activity]);

  const balanceColor =
    result.balance > 100 ? 'text-rose-500' : result.balance < -100 ? 'text-blue-500' : 'text-emerald-500';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <SliderRow
          label="🍚 탄수화물 (g)"
          value={carbG}
          min={0}
          max={600}
          step={10}
          onChange={setCarbG}
          unit=" g"
          format={(v) => v.toFixed(0)}
        />
        <SliderRow
          label="🥑 지방 (g)"
          value={fatG}
          min={0}
          max={150}
          step={5}
          onChange={setFatG}
          unit=" g"
          format={(v) => v.toFixed(0)}
        />
        <SliderRow
          label="🥩 단백질 (g)"
          value={proteinG}
          min={0}
          max={200}
          step={5}
          onChange={setProteinG}
          unit=" g"
          format={(v) => v.toFixed(0)}
        />
        <SliderRow
          label="🏃 활동계수 (1.2 정좌, 1.9 격렬)"
          value={activity}
          min={1.2}
          max={1.9}
          step={0.05}
          onChange={setActivity}
          format={(v) => v.toFixed(2)}
        />
      </div>

      {/* 영양소 비율 막대 */}
      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-700">
        <div className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-2">
          섭취 칼로리 구성 (총 {result.totalKcal.toFixed(0)} kcal)
        </div>
        <div className="flex h-6 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
          {result.intake.map((n) => {
            const pct = (n.kcal / Math.max(result.totalKcal, 1)) * 100;
            return (
              <div
                key={n.id}
                style={{ width: `${pct}%`, background: n.color }}
                className="text-[10px] text-zinc-900 font-bold flex items-center justify-center"
                title={`${n.label} ${n.kcal.toFixed(0)} kcal`}
              >
                {pct > 8 ? `${pct.toFixed(0)}%` : ''}
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
          {result.intake.map((n) => (
            <div key={n.id} className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm" style={{ background: n.color }} />
              <span className="text-zinc-600 dark:text-zinc-400">{n.kcal.toFixed(0)} kcal</span>
            </div>
          ))}
        </div>
      </div>

      {/* 흐름 */}
      <div className="rounded-xl bg-gradient-to-r from-amber-50 via-emerald-50 to-blue-50 dark:from-amber-950/40 dark:via-emerald-950/40 dark:to-blue-950/40 p-4 border border-zinc-200 dark:border-zinc-700">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="text-center flex-1">
            <div className="font-bold text-amber-700 dark:text-amber-400">소화·흡수</div>
            <div className="font-mono">{result.totalKcal.toFixed(0)} kcal</div>
          </div>
          <div className="text-zinc-400">→</div>
          <div className="text-center flex-1">
            <div className="font-bold text-emerald-700 dark:text-emerald-400">세포호흡</div>
            <div className="font-mono">O₂ {result.o2.toFixed(0)} L</div>
            <div className="font-mono">CO₂ {result.co2.toFixed(0)} L</div>
          </div>
          <div className="text-zinc-400">→</div>
          <div className="text-center flex-1">
            <div className="font-bold text-blue-700 dark:text-blue-400">ATP 생성</div>
            <div className="font-mono">≈ {result.atp.toFixed(0)} mol</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
        <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">총 섭취</div>
          <div className="font-bold">{result.totalKcal.toFixed(0)} kcal</div>
        </div>
        <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">총 소비</div>
          <div className="font-bold">{result.expenditure.toFixed(0)} kcal</div>
        </div>
        <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">에너지 균형</div>
          <div className={`font-bold ${balanceColor}`}>
            {result.balance > 0 ? '+' : ''}
            {result.balance.toFixed(0)} kcal
          </div>
        </div>
        <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">호흡지수 RQ</div>
          <div className="font-bold">{result.rq.toFixed(2)}</div>
        </div>
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        💡 호흡지수(RQ) = CO₂ 배출/O₂ 소비. 탄수화물=1.0, 지방=0.7, 단백질=0.8. 식단으로 RQ 변화를 확인해 보세요.
      </div>
    </div>
  );
}
