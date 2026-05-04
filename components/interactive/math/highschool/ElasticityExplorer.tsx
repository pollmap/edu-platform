'use client';

// M-EM-03 함수와 경제 — 수요·공급 곡선과 가격 탄력성.

import { useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

export function ElasticityExplorer() {
  const [demandSlope, setDemandSlope] = useState(-2);
  const [demandIntercept, setDemandIntercept] = useState(100);
  const [supplySlope, setSupplySlope] = useState(2);
  const [supplyIntercept, setSupplyIntercept] = useState(20);
  const [priceShift, setPriceShift] = useState(0);

  // p = aQ + b
  const eqQ = (demandIntercept - supplyIntercept) / (supplySlope - demandSlope);
  const eqP = supplySlope * eqQ + supplyIntercept;

  const newP = eqP * (1 + priceShift / 100);
  const newQd = (newP - demandIntercept) / demandSlope;
  const newQs = (newP - supplyIntercept) / supplySlope;

  // elasticity = (%ΔQ)/(%ΔP) at equilibrium
  const ed = Math.abs((1 / demandSlope) * (eqP / eqQ));
  const es = Math.abs((1 / supplySlope) * (eqP / eqQ));

  const W = 480;
  const H = 280;
  const padL = 40;
  const padR = 10;
  const padT = 10;
  const padB = 30;
  const qMax = 50;
  const pMax = 120;
  const xToPix = (q: number): number => padL + (q / qMax) * (W - padL - padR);
  const yToPix = (p: number): number => padT + (1 - p / pMax) * (H - padT - padB);

  // demand: P = mQ + b → at Q=0, P=intercept; at Q=qMax
  const demandLine = `M ${xToPix(0)} ${yToPix(demandIntercept)} L ${xToPix(qMax)} ${yToPix(demandSlope * qMax + demandIntercept)}`;
  const supplyLine = `M ${xToPix(0)} ${yToPix(supplyIntercept)} L ${xToPix(qMax)} ${yToPix(supplySlope * qMax + supplyIntercept)}`;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          수요·공급·탄력성 — 함수의 미분이 곧 시장의 「민감도」
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          수요·공급 곡선의 기울기 자체로는 단위가 달라 비교가 어려워요. 그래서 「가격이 1% 변할 때 수량이 몇 % 변하나」를
          쓰는데 이게 가격 탄력성이에요. 탄력적이면 |E|&gt;1, 비탄력적이면 |E|&lt;1.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <SliderRow label="수요 절편" value={demandIntercept} min={50} max={150} step={5} onChange={setDemandIntercept} format={(v) => v.toFixed(0)} />
        <SliderRow label="수요 기울기" value={demandSlope} min={-5} max={-0.2} step={0.1} onChange={setDemandSlope} format={(v) => v.toFixed(1)} />
        <SliderRow label="공급 절편" value={supplyIntercept} min={0} max={60} step={5} onChange={setSupplyIntercept} format={(v) => v.toFixed(0)} />
        <SliderRow label="공급 기울기" value={supplySlope} min={0.2} max={5} step={0.1} onChange={setSupplySlope} format={(v) => v.toFixed(1)} />
      </div>

      <SliderRow label="가격 변동률 (정부개입 등)" value={priceShift} min={-30} max={30} step={1} onChange={setPriceShift} format={(v) => `${v >= 0 ? '+' : ''}${v}`} unit="%" />

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="#94a3b8" />
          <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="#94a3b8" />
          <text x={W - padR - 5} y={H - padB + 14} textAnchor="end" fontSize="9" className="fill-zinc-600 dark:fill-zinc-400">수량 Q</text>
          <text x={padL + 5} y={padT + 12} fontSize="9" className="fill-zinc-600 dark:fill-zinc-400">가격 P</text>

          <path d={demandLine} stroke="#2563eb" strokeWidth="2" />
          <path d={supplyLine} stroke="#dc2626" strokeWidth="2" />

          {eqQ > 0 && eqQ < qMax && eqP > 0 && eqP < pMax && (
            <g>
              <line x1={xToPix(eqQ)} y1={H - padB} x2={xToPix(eqQ)} y2={yToPix(eqP)} stroke="#475569" strokeDasharray="3 2" />
              <line x1={padL} y1={yToPix(eqP)} x2={xToPix(eqQ)} y2={yToPix(eqP)} stroke="#475569" strokeDasharray="3 2" />
              <circle cx={xToPix(eqQ)} cy={yToPix(eqP)} r="5" fill="#facc15" stroke="#000" />
              <text x={xToPix(eqQ) + 8} y={yToPix(eqP) - 6} fontSize="10" fontFamily="monospace" className="fill-zinc-700 dark:fill-zinc-300">
                E*({eqQ.toFixed(1)}, {eqP.toFixed(1)})
              </text>
            </g>
          )}

          {priceShift !== 0 && (
            <line x1={padL} y1={yToPix(newP)} x2={W - padR} y2={yToPix(newP)} stroke="#f97316" strokeDasharray="4 3" />
          )}

          <text x={W - padR - 5} y={padT + 14} textAnchor="end" fontSize="10" fill="#2563eb">— 수요</text>
          <text x={W - padR - 5} y={padT + 28} textAnchor="end" fontSize="10" fill="#dc2626">— 공급</text>
        </svg>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-4 text-center text-xs">
        <MathFormula tex={`E_d = \\left|\\frac{\\Delta Q/Q}{\\Delta P/P}\\right| = ${ed.toFixed(2)},\\quad E_s = ${es.toFixed(2)}`} />
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        <div className="rounded bg-zinc-50 dark:bg-zinc-950/40 p-2">균형 (Q*, P*) = ({eqQ.toFixed(2)}, {eqP.toFixed(2)})</div>
        <div className="rounded bg-zinc-50 dark:bg-zinc-950/40 p-2">P 변동 후 부족/잉여 = {(newQs - newQd).toFixed(2)}</div>
        <div className="rounded bg-blue-50 dark:bg-blue-950/30 p-2">
          수요 탄력성 |E_d| {ed > 1 ? '> 1 (탄력적)' : '< 1 (비탄력적)'}
        </div>
        <div className="rounded bg-red-50 dark:bg-red-950/30 p-2">
          공급 탄력성 |E_s| {es > 1 ? '> 1 (탄력적)' : '< 1 (비탄력적)'}
        </div>
      </div>
    </div>
  );
}
