'use client';

// S-CHE-05 화학반응 — 반응 에너지 다이어그램 (활성화에너지 + 반응엔탈피).

import { useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

type ReactionType = 'exo' | 'endo';

export function ReactionEnergyDiagram() {
  const [type, setType] = useState<ReactionType>('exo');
  const [eA, setEA] = useState(80); // 활성화에너지 kJ/mol
  const [deltaH, setDeltaH] = useState(50); // 반응엔탈피 절댓값
  const [hasCatalyst, setHasCatalyst] = useState(false);

  const W = 360;
  const H = 220;
  const padX = 40;
  const padY = 30;

  const reactantY = type === 'exo' ? padY + 100 : padY + 140;
  const productY = type === 'exo' ? reactantY + deltaH * 0.5 : reactantY - deltaH * 0.5;
  const peakY = reactantY - eA * 0.7 * (hasCatalyst ? 0.5 : 1);

  const x0 = padX + 20;
  const xPeak = W / 2;
  const xEnd = W - padX - 20;

  // S-curve (smooth)
  const path = `M ${x0} ${reactantY} L ${x0 + 30} ${reactantY} Q ${(x0 + xPeak) / 2} ${reactantY}, ${xPeak} ${peakY} Q ${(xPeak + xEnd) / 2} ${productY}, ${xEnd - 30} ${productY} L ${xEnd} ${productY}`;

  const eAEffective = eA * (hasCatalyst ? 0.5 : 1);
  const realDeltaH = type === 'exo' ? -deltaH : deltaH;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          반응이 일어나려면 "에너지 언덕"을 넘어야 해요
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          활성화에너지(Eₐ)는 출발 → 정점까지의 높이. 반응엔탈피(ΔH)는 출발 - 도착 차이.
          ΔH &lt; 0 발열, ΔH &gt; 0 흡열.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        {(['exo', 'endo'] as ReactionType[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setType(id)}
            className={`min-h-[44px] rounded-lg px-3 ${
              type === id
                ? 'bg-green-600 text-white font-semibold'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
            }`}
          >
            {id === 'exo' ? '발열반응 (ΔH < 0)' : '흡열반응 (ΔH > 0)'}
          </button>
        ))}
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="에너지 다이어그램">
          {/* 축 */}
          <line x1={padX} y1={padY} x2={padX} y2={H - padY} stroke="#9ca3af" />
          <line x1={padX} y1={H - padY} x2={W - padX / 2} y2={H - padY} stroke="#9ca3af" />
          <text x={padX - 8} y={padY + 8} fontSize={10} textAnchor="end" fill="#71717a">E</text>
          <text x={W - padX / 2} y={H - padY + 14} fontSize={10} textAnchor="end" fill="#71717a">반응 좌표 →</text>

          {/* 곡선 */}
          <path d={path} stroke={type === 'exo' ? '#dc2626' : '#3b82f6'} strokeWidth={3} fill="none" />

          {/* Eₐ 화살표 */}
          <line x1={xPeak - 60} y1={reactantY} x2={xPeak - 60} y2={peakY} stroke="#fbbf24" strokeWidth={2} markerEnd="url(#arrow)" />
          <text x={xPeak - 56} y={(reactantY + peakY) / 2} fontSize={11} fill="#d97706" fontWeight={700}>
            Eₐ = {eAEffective.toFixed(0)}
          </text>

          {/* ΔH */}
          <line x1={xEnd - 50} y1={reactantY} x2={xEnd - 50} y2={productY} stroke="#10b981" strokeWidth={2} strokeDasharray="3 2" />
          <text x={xEnd - 46} y={(reactantY + productY) / 2} fontSize={11} fill="#059669" fontWeight={700}>
            ΔH = {realDeltaH > 0 ? '+' : ''}{realDeltaH.toFixed(0)}
          </text>

          {/* 라벨 */}
          <text x={x0 + 5} y={reactantY - 6} fontSize={11} fill="#52525b" fontWeight={600}>반응물</text>
          <text x={xEnd - 5} y={productY - 6} textAnchor="end" fontSize={11} fill="#52525b" fontWeight={600}>생성물</text>
          <text x={xPeak} y={peakY - 6} textAnchor="middle" fontSize={11} fill="#71717a">전이상태</text>

          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#fbbf24" />
            </marker>
          </defs>
        </svg>
      </div>

      <SliderRow label="활성화에너지 Eₐ" value={eA} min={20} max={150} step={5} onChange={setEA} unit=" kJ/mol" />
      <SliderRow label="|ΔH|" value={deltaH} min={10} max={120} step={5} onChange={setDeltaH} unit=" kJ/mol" />

      <button
        type="button"
        onClick={() => setHasCatalyst((p) => !p)}
        className={`w-full min-h-[44px] rounded-lg font-semibold ${
          hasCatalyst ? 'bg-yellow-500 text-zinc-900' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
        }`}
      >
        {hasCatalyst ? '✓ 촉매 첨가됨 (Eₐ 감소)' : '+ 촉매 첨가하기'}
      </button>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        촉매는 ΔH는 못 바꿔요. Eₐ만 낮춰서 반응 속도를 빠르게 할 뿐. 효소가 대표적인 생체 촉매.
      </p>
    </div>
  );
}
