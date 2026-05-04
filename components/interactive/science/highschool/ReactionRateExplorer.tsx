'use client';

// S-CHE-07 화학반응 속도 — 농도/온도/촉매에 따른 속도 변화 + 1차 반응 곡선.

import { useEffect, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

const R = 8.314; // J/(mol·K)

export function ReactionRateExplorer() {
  const [conc, setConc] = useState(1.0); // 초기 농도 mol/L
  const [tempC, setTempC] = useState(25);
  const [eA, setEA] = useState(50); // kJ/mol
  const [hasCatalyst, setHasCatalyst] = useState(false);
  const [t, setT] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setT((p) => (p >= 60 ? 0 : p + 0.5)), 60);
    return () => clearInterval(id);
  }, [running]);

  // 아레니우스 (정성적 비교용 상수)
  const T_K = tempC + 273.15;
  const eAEff = (eA * (hasCatalyst ? 0.6 : 1)) * 1000; // J/mol
  const k = 1e8 * Math.exp(-eAEff / (R * T_K)); // 임의의 A 상수
  // 시간 ↔ 농도: 1차 반응 [A] = [A]₀ exp(-kt)
  const A0 = conc;
  const kScale = Math.min(0.2, k * 1e-7); // 시각화용 스케일
  const At = A0 * Math.exp(-kScale * t);

  // 그래프
  const W = 360;
  const H = 180;
  const padX = 40;
  const padY = 20;
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= 60; i++) {
    const c = A0 * Math.exp(-kScale * i);
    const px = padX + (i / 60) * (W - padX - 10);
    const py = H - padY - (c / Math.max(A0, 0.1)) * (H - padY - 10);
    points.push({ x: px, y: py });
  }
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

  // 현재 시점 위치
  const cx = padX + (t / 60) * (W - padX - 10);
  const cy = H - padY - (At / Math.max(A0, 0.1)) * (H - padY - 10);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          반응 속도는 농도 · 온도 · 촉매가 결정해요
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          속도상수 k = A·exp(-Eₐ/RT). 온도 10K 오르면 속도가 약 2~3배 빨라져요(아레니우스).
        </p>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="농도-시간 곡선">
          <line x1={padX} y1={padY} x2={padX} y2={H - padY} stroke="#9ca3af" />
          <line x1={padX} y1={H - padY} x2={W - 5} y2={H - padY} stroke="#9ca3af" />
          <text x={padX - 4} y={padY + 4} fontSize={9} textAnchor="end" fill="#71717a">[A]₀</text>
          <text x={W - 5} y={H - padY + 12} fontSize={9} textAnchor="end" fill="#71717a">시간 →</text>
          <path d={path} stroke="#16a34a" strokeWidth={3} fill="none" />
          <circle cx={cx} cy={cy} r={5} fill="#dc2626" stroke="#fff" strokeWidth={2} />
          <text x={cx + 8} y={cy - 4} fontSize={11} fill="#dc2626" fontWeight={700}>
            [A] = {At.toFixed(2)}
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div className="bg-blue-50 dark:bg-blue-950/40 rounded-lg p-2">
          <div className="text-xs text-blue-700 dark:text-blue-300">속도상수 k</div>
          <div className="font-mono font-bold text-blue-700 dark:text-blue-300">
            {k.toExponential(1)}
          </div>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-lg p-2">
          <div className="text-xs text-emerald-700 dark:text-emerald-300">현재 [A]</div>
          <div className="font-mono font-bold text-emerald-700 dark:text-emerald-300">
            {At.toFixed(2)} M
          </div>
        </div>
        <div className="bg-orange-50 dark:bg-orange-950/40 rounded-lg p-2">
          <div className="text-xs text-orange-700 dark:text-orange-300">전환율</div>
          <div className="font-mono font-bold text-orange-700 dark:text-orange-300">
            {(((A0 - At) / A0) * 100).toFixed(0)}%
          </div>
        </div>
      </div>

      <SliderRow label="초기 농도 [A]₀" value={conc} min={0.2} max={2.0} step={0.1} onChange={setConc} unit=" M" />
      <SliderRow label="온도" value={tempC} min={0} max={100} step={5} onChange={setTempC} unit=" °C" />
      <SliderRow label="활성화에너지 Eₐ" value={eA} min={20} max={120} step={5} onChange={setEA} unit=" kJ/mol" />

      <button
        type="button"
        onClick={() => setHasCatalyst((p) => !p)}
        className={`w-full min-h-[44px] rounded-lg font-semibold ${
          hasCatalyst ? 'bg-yellow-500 text-zinc-900' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
        }`}
      >
        {hasCatalyst ? '✓ 촉매 ON (Eₐ -40%)' : '+ 촉매 추가'}
      </button>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        냉장고가 음식을 보존하는 이유: 온도 ↓ → k ↓ → 부패 반응이 느려져요. 압력솥은 반대 — 온도 ↑로 조리 빨라짐.
      </p>
    </div>
  );
}
