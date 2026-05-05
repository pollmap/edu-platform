'use client';

// H-CSW 기후변화·지속가능 세계 — 탄소발자국·시나리오 시뮬레이터.
// 자체 정리. 일반 평균치는 학술·국제기구 공개 자료의 대략적 근사.

import { useMemo, useState } from 'react';

export function CarbonFootprintExplorer() {
  // kg CO2/년 단위 가상 모델 — 정밀 계산 X, 비교용.
  const [carKm, setCarKm] = useState(10000); // 자가용 연 주행거리 (km)
  const [flights, setFlights] = useState(2); // 연간 국제 항공 (왕복 횟수)
  const [meatDays, setMeatDays] = useState(5); // 주당 육식 횟수
  const [electric, setElectric] = useState(300); // 월 전기 사용 (kWh)

  const result = useMemo(() => {
    // 단순 환산 계수 (참고용)
    const car = carKm * 0.18; // 0.18 kg/km (소형차)
    const flight = flights * 1100; // 한 번 왕복 약 1.1톤 (단·중거리 가정)
    const meat = meatDays * 52 * 6; // 1식당 약 6 kg
    const elec = electric * 12 * 0.45; // 0.45 kg/kWh
    const total = car + flight + meat + elec;
    const target15 = 2300; // 1.5도 시나리오 인당 목표
    return { car, flight, meat, elec, total, target15 };
  }, [carKm, flights, meatDays, electric]);

  const max = Math.max(result.car, result.flight, result.meat, result.elec);

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h4 className="mb-3 font-bold">생활 패턴 입력</h4>
        <div className="space-y-3">
          <div>
            <label className="mb-1 flex justify-between text-sm">
              <span>자가용 연 주행거리</span>
              <span className="font-mono">{carKm.toLocaleString()} km</span>
            </label>
            <input type="range" min={0} max={30000} step={1000} value={carKm} onChange={(e) => setCarKm(Number(e.target.value))} className="h-11 w-full" />
          </div>
          <div>
            <label className="mb-1 flex justify-between text-sm">
              <span>국제 항공 (왕복 횟수/년)</span>
              <span className="font-mono">{flights}회</span>
            </label>
            <input type="range" min={0} max={10} step={1} value={flights} onChange={(e) => setFlights(Number(e.target.value))} className="h-11 w-full" />
          </div>
          <div>
            <label className="mb-1 flex justify-between text-sm">
              <span>주당 육식 횟수</span>
              <span className="font-mono">{meatDays}회</span>
            </label>
            <input type="range" min={0} max={14} step={1} value={meatDays} onChange={(e) => setMeatDays(Number(e.target.value))} className="h-11 w-full" />
          </div>
          <div>
            <label className="mb-1 flex justify-between text-sm">
              <span>월 전기 사용</span>
              <span className="font-mono">{electric} kWh</span>
            </label>
            <input type="range" min={100} max={1000} step={50} value={electric} onChange={(e) => setElectric(Number(e.target.value))} className="h-11 w-full" />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="mb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">연간 탄소발자국 (kg CO₂eq)</p>
        <div className="space-y-2">
          {[
            { label: '자동차', v: result.car, color: 'bg-rose-600' },
            { label: '항공', v: result.flight, color: 'bg-orange-600' },
            { label: '식습관', v: result.meat, color: 'bg-amber-600' },
            { label: '전기', v: result.elec, color: 'bg-emerald-600' },
          ].map((row) => (
            <div key={row.label}>
              <div className="mb-1 flex justify-between text-xs">
                <span>{row.label}</span>
                <span className="font-mono">{Math.round(row.v).toLocaleString()} kg</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div className={`h-3 rounded-full ${row.color}`} style={{ width: `${(row.v / Math.max(max, 1)) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-md bg-zinc-50 p-3 text-sm dark:bg-zinc-800/50">
          <p className="mb-1 font-bold">총 배출량 — {Math.round(result.total).toLocaleString()} kg CO₂eq / 년</p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            1.5도 시나리오 1인 목표(약 {result.target15.toLocaleString()} kg) 대비 {' '}
            <strong className={result.total > result.target15 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}>
              {((result.total / result.target15 - 1) * 100).toFixed(0)}%
            </strong>
          </p>
        </div>
      </div>

      <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm dark:border-amber-900 dark:bg-amber-950/30">
        <strong className="text-amber-700 dark:text-amber-300">핵심 </strong>
        탄소 감축의 가장 큰 지렛대는 「항공·자동차·육식·전기」예요. 한두 가지만 줄여도 큰 차이가 나요.
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 환산 계수는 IPCC·국제에너지기구 공개 자료를 단순화한 근사예요. 정밀 측정에는 적합하지 않아요.
      </p>
    </div>
  );
}
