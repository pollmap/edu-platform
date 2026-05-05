'use client';

// S7-MA-02 물질의 특성 — 밀도와 용해도.
// 모드 1: 액체 밀도탑 (어떤 액체가 위/아래?)  모드 2: 용해도 곡선 (온도-용해도).

import { useMemo, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

interface Liquid {
  name: string;
  density: number; // g/mL
  color: string;
}

const LIQUIDS: Liquid[] = [
  { name: '꿀', density: 1.42, color: '#b45309' },
  { name: '글리세린', density: 1.26, color: '#fde68a' },
  { name: '물', density: 1.0, color: '#3b82f6' },
  { name: '식용유', density: 0.92, color: '#fbbf24' },
  { name: '에탄올', density: 0.79, color: '#a3e635' },
];

interface Solute {
  name: string;
  // 용해도 = a*T + b 단순 선형 근사
  a: number; // 기울기 (g/100g per °C)
  b: number; // 0°C 용해도
  color: string;
}

const SOLUTES: Solute[] = [
  { name: '질산칼륨 KNO₃', a: 2.6, b: 13, color: '#3b82f6' },
  { name: '염화나트륨 NaCl', a: 0.05, b: 35.7, color: '#10b981' },
  { name: '설탕', a: 1.5, b: 180, color: '#f59e0b' },
  { name: '염화암모늄', a: 1.0, b: 29, color: '#a855f7' },
];

export function DensitySolubilityExplorer() {
  const [mode, setMode] = useState<'density' | 'solubility'>('density');
  const [temp, setTemp] = useState(20);
  const [soluteIdx, setSoluteIdx] = useState(0);
  const [addedAmount, setAddedAmount] = useState(50);

  const sortedLiquids = useMemo(() => [...LIQUIDS].sort((a, b) => b.density - a.density), []);

  const solute = SOLUTES[soluteIdx];
  const solubility = useMemo(() => Math.max(0, solute.a * temp + solute.b), [solute, temp]);
  const isSaturated = addedAmount > solubility;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode('density')}
          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium min-h-[44px] ${
            mode === 'density' ? 'bg-emerald-600 text-white' : 'bg-zinc-200 dark:bg-zinc-700'
          }`}
        >
          🪨 밀도탑
        </button>
        <button
          type="button"
          onClick={() => setMode('solubility')}
          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium min-h-[44px] ${
            mode === 'solubility' ? 'bg-emerald-600 text-white' : 'bg-zinc-200 dark:bg-zinc-700'
          }`}
        >
          🧂 용해도
        </button>
      </div>

      {mode === 'density' && (
        <div className="space-y-3">
          <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-700">
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 text-center">5종 액체를 같은 비커에 넣으면…</div>
            <div className="mx-auto w-48 border-l-2 border-r-2 border-b-2 border-zinc-400 dark:border-zinc-500 rounded-b-lg overflow-hidden">
              {sortedLiquids.map((l) => {
                const heightPct = 18; // 동일 부피
                return (
                  <div
                    key={l.name}
                    style={{ background: l.color, height: `${heightPct}%`, minHeight: '40px' }}
                    className="flex items-center justify-between px-3 text-xs font-bold text-white drop-shadow"
                  >
                    <span>{l.name}</span>
                    <span className="font-mono">{l.density.toFixed(2)} g/mL</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            💡 밀도(=질량/부피)가 큰 물질은 가라앉고, 작은 물질은 뜨아요. 같은 부피라도 「얼마나 빽빽이 모였는가」가 달라서. 밀도는 물질마다 고유해서 「물질을 식별」하는 단서가 돼요.
          </div>
        </div>
      )}

      {mode === 'solubility' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {SOLUTES.map((s, i) => (
              <button
                key={s.name}
                type="button"
                onClick={() => setSoluteIdx(i)}
                className={`px-2 py-2 rounded text-xs font-medium min-h-[44px] ${
                  i === soluteIdx ? 'text-white' : 'bg-zinc-200 dark:bg-zinc-700'
                }`}
                style={i === soluteIdx ? { background: s.color } : undefined}
              >
                {s.name}
              </button>
            ))}
          </div>

          <SliderRow
            label="물 온도 (°C)"
            value={temp}
            min={0}
            max={100}
            step={1}
            onChange={(v) => setTemp(v)}
            format={(v) => `${v.toFixed(0)}°C`}
          />

          <SliderRow
            label="녹인 용질 (물 100g 기준 g)"
            value={addedAmount}
            min={0}
            max={300}
            step={1}
            onChange={(v) => setAddedAmount(v)}
            format={(v) => `${v.toFixed(0)} g`}
          />

          <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-700">
            <svg viewBox="0 0 360 220" className="w-full h-auto" role="img" aria-label="용해도 곡선">
              {/* 축 */}
              <line x1={40} y1={190} x2={340} y2={190} stroke="currentColor" strokeOpacity={0.3} />
              <line x1={40} y1={20} x2={40} y2={190} stroke="currentColor" strokeOpacity={0.3} />
              {[0, 50, 100, 150, 200, 250, 300].map((y) => (
                <g key={y}>
                  <line
                    x1={40}
                    y1={190 - (y / 300) * 170}
                    x2={340}
                    y2={190 - (y / 300) * 170}
                    stroke="currentColor"
                    strokeOpacity={0.05}
                  />
                  <text x={36} y={194 - (y / 300) * 170} textAnchor="end" fontSize="9" fill="currentColor" opacity={0.5}>
                    {y}
                  </text>
                </g>
              ))}
              {[0, 25, 50, 75, 100].map((x) => (
                <text
                  key={x}
                  x={40 + (x / 100) * 300}
                  y={205}
                  textAnchor="middle"
                  fontSize="9"
                  fill="currentColor"
                  opacity={0.5}
                >
                  {x}°C
                </text>
              ))}
              {/* 4종 곡선 */}
              {SOLUTES.map((s, i) => {
                const pts = Array.from({ length: 41 }).map((_, k) => {
                  const t = k * 2.5;
                  const sol = Math.max(0, s.a * t + s.b);
                  return `${(40 + (t / 100) * 300).toFixed(1)},${(190 - (sol / 300) * 170).toFixed(1)}`;
                });
                return (
                  <polyline
                    key={s.name}
                    points={pts.join(' ')}
                    fill="none"
                    stroke={s.color}
                    strokeWidth={i === soluteIdx ? 2.5 : 1}
                    opacity={i === soluteIdx ? 1 : 0.35}
                  />
                );
              })}
              {/* 현재 점 */}
              <circle cx={40 + (temp / 100) * 300} cy={190 - (solubility / 300) * 170} r={5} fill={solute.color} stroke="white" strokeWidth={1.5} />
              <text x={40 + (temp / 100) * 300} y={190 - (solubility / 300) * 170 - 8} fontSize="10" fontWeight="bold" textAnchor="middle" fill={solute.color}>
                {solubility.toFixed(0)}g
              </text>
              <text x={350} y={14} textAnchor="end" fontSize="10" fill="currentColor" opacity={0.7}>
                용해도(g/물 100g)
              </text>
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-2 text-center">
              <div className="text-xs text-zinc-500 dark:text-zinc-400">{temp}°C 용해도</div>
              <div className="text-lg font-bold" style={{ color: solute.color }}>
                {solubility.toFixed(1)} g
              </div>
            </div>
            <div
              className={`rounded-lg p-2 text-center ${
                isSaturated ? 'bg-rose-100 dark:bg-rose-950/40' : 'bg-emerald-100 dark:bg-emerald-950/40'
              }`}
            >
              <div className="text-xs">상태</div>
              <div
                className={`text-lg font-bold ${
                  isSaturated ? 'text-rose-700 dark:text-rose-300' : 'text-emerald-700 dark:text-emerald-300'
                }`}
              >
                {isSaturated ? `포화 (${(addedAmount - solubility).toFixed(0)}g 침전)` : '불포화'}
              </div>
            </div>
          </div>

          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            💡 대부분의 고체는 온도가 높을수록 더 많이 녹아요. NaCl은 예외적으로 온도에 거의 영향을 안 받죠. 「용해도 곡선」으로 「재결정」(KNO₃를 80°C에 녹이고 식히면 깨끗한 결정만 남음)이 가능해요.
          </div>
        </div>
      )}
    </div>
  );
}
