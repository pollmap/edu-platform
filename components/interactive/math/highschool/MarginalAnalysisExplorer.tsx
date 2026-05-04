'use client';

// M-EM-04 미분과 경제 — 한계비용·한계수입과 이윤 극대화.

import { useMemo, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

export function MarginalAnalysisExplorer() {
  const [a, setA] = useState(0.5); // C(Q) = aQ² + bQ + c
  const [b, setB] = useState(2);
  const [c, setC] = useState(20);
  const [price, setPrice] = useState(30);

  // C(Q) = aQ² + bQ + c → MC = 2aQ + b
  // R(Q) = pQ → MR = p
  // π(Q) = R - C → π'(Q) = MR - MC = 0 → Q* = (p - b)/(2a)
  const qStar = useMemo(() => (price - b) / (2 * a), [price, a, b]);

  const data = useMemo(() => {
    const arr: { q: number; cost: number; revenue: number; profit: number; mc: number; mr: number }[] = [];
    for (let q = 0; q <= 30; q += 0.5) {
      const cost = a * q * q + b * q + c;
      const revenue = price * q;
      arr.push({ q, cost, revenue, profit: revenue - cost, mc: 2 * a * q + b, mr: price });
    }
    return arr;
  }, [a, b, c, price]);

  const W = 480;
  const H = 220;
  const padL = 40;
  const padR = 10;
  const padT = 10;
  const padB = 30;
  const yMax = Math.max(...data.map((d) => Math.max(d.cost, d.revenue)));
  const xToPix = (q: number): number => padL + (q / 30) * (W - padL - padR);
  const yToPix = (y: number): number => padT + (1 - y / Math.max(yMax, 1)) * (H - padT - padB);

  const costPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xToPix(d.q).toFixed(1)} ${yToPix(d.cost).toFixed(1)}`).join(' ');
  const revPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xToPix(d.q).toFixed(1)} ${yToPix(d.revenue).toFixed(1)}`).join(' ');

  // marginal chart
  const H2 = 160;
  const yMax2 = Math.max(...data.map((d) => Math.max(d.mc, d.mr))) * 1.1;
  const yToPix2 = (y: number): number => padT + (1 - y / Math.max(yMax2, 1)) * (H2 - padT - padB);
  const mcPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xToPix(d.q).toFixed(1)} ${yToPix2(d.mc).toFixed(1)}`).join(' ');
  const mrPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xToPix(d.q).toFixed(1)} ${yToPix2(d.mr).toFixed(1)}`).join(' ');

  const profitMax = a * qStar * qStar + b * qStar + c;
  const profitVal = qStar > 0 ? price * qStar - profitMax : -c;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          한계비용 = 한계수입 — 미분이 「언제 멈출지」 알려줘요
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          한 단위 더 만들 때 드는 비용이 한계비용(MC), 받는 돈이 한계수입(MR). 이윤은 MR이 MC보다 클 때만 더 만들고,
          MR=MC가 되는 순간 멈춰야 해요. 이게 미분으로 푼 「이윤 극대화」예요.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <SliderRow label="C 곡률 a" value={a} min={0.1} max={2} step={0.1} onChange={setA} format={(v) => v.toFixed(1)} />
        <SliderRow label="C 기울기 b" value={b} min={0} max={20} step={1} onChange={setB} format={(v) => v.toFixed(0)} />
        <SliderRow label="고정비 c" value={c} min={0} max={50} step={5} onChange={setC} format={(v) => v.toFixed(0)} />
        <SliderRow label="시장가 P" value={price} min={5} max={60} step={1} onChange={setPrice} format={(v) => v.toFixed(0)} />
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-4 text-center text-xs">
        <MathFormula
          tex={`C(Q) = ${a}Q^2 + ${b}Q + ${c},\\quad MC = ${(2 * a).toFixed(1)}Q + ${b},\\quad MR = ${price}\\Rightarrow Q^{*} = ${qStar.toFixed(2)}`}
        />
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3 space-y-2">
        <div className="text-xs text-zinc-500 dark:text-zinc-400">총비용 vs 총수입</div>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="#94a3b8" />
          <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="#94a3b8" />
          <path d={costPath} fill="none" stroke="#dc2626" strokeWidth="2" />
          <path d={revPath} fill="none" stroke="#16a34a" strokeWidth="2" />
          {qStar > 0 && qStar < 30 && (
            <line x1={xToPix(qStar)} y1={padT} x2={xToPix(qStar)} y2={H - padB} stroke="#facc15" strokeDasharray="3 2" />
          )}
          <text x={W - padR - 5} y={padT + 14} textAnchor="end" fontSize="10" fill="#dc2626">— 비용 C</text>
          <text x={W - padR - 5} y={padT + 28} textAnchor="end" fontSize="10" fill="#16a34a">— 수입 R</text>
        </svg>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3 space-y-2">
        <div className="text-xs text-zinc-500 dark:text-zinc-400">한계비용 vs 한계수입</div>
        <svg viewBox={`0 0 ${W} ${H2}`} className="w-full h-auto">
          <line x1={padL} y1={H2 - padB} x2={W - padR} y2={H2 - padB} stroke="#94a3b8" />
          <line x1={padL} y1={padT} x2={padL} y2={H2 - padB} stroke="#94a3b8" />
          <path d={mcPath} fill="none" stroke="#dc2626" strokeWidth="2" />
          <path d={mrPath} fill="none" stroke="#16a34a" strokeWidth="2" />
          {qStar > 0 && qStar < 30 && (
            <g>
              <line x1={xToPix(qStar)} y1={padT} x2={xToPix(qStar)} y2={H2 - padB} stroke="#facc15" strokeDasharray="3 2" />
              <circle cx={xToPix(qStar)} cy={yToPix2(price)} r="5" fill="#facc15" stroke="#000" />
              <text x={xToPix(qStar) + 6} y={yToPix2(price) - 4} fontSize="10" fontFamily="monospace" fill="#92400e">
                MC=MR
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="rounded bg-blue-50 dark:bg-blue-950/30 p-3 text-center">
          <div className="text-xs text-blue-700 dark:text-blue-300">최적 생산량 Q*</div>
          <div className="font-mono text-base">{qStar > 0 ? qStar.toFixed(2) : '0 (생산 X)'}</div>
        </div>
        <div className="rounded bg-green-50 dark:bg-green-950/30 p-3 text-center">
          <div className="text-xs text-green-700 dark:text-green-300">최대 이윤 π*</div>
          <div className="font-mono text-base">{qStar > 0 ? profitVal.toFixed(2) : (-c).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
