'use client';

// M-PS-06 이항·정규분포 — μ, σ 슬라이더로 정규분포 형태 변화.

import { useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

function pdf(x: number, mu: number, sigma: number): number {
  const z = (x - mu) / sigma;
  return Math.exp(-0.5 * z * z) / (sigma * Math.sqrt(2 * Math.PI));
}

// approximate cdf via erf
function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * ax);
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-ax * ax);
  return sign * y;
}
function cdf(x: number, mu: number, sigma: number): number {
  return 0.5 * (1 + erf((x - mu) / (sigma * Math.sqrt(2))));
}

export function NormalDistributionExplorer() {
  const [mu, setMu] = useState(0);
  const [sigma, setSigma] = useState(1);
  const [zLow, setZLow] = useState(-1);
  const [zHigh, setZHigh] = useState(1);

  const xMin = mu - 4 * sigma;
  const xMax = mu + 4 * sigma;
  const samples = 121;
  const xs = Array.from({ length: samples }, (_, i) => xMin + ((xMax - xMin) * i) / (samples - 1));
  const ys = xs.map((x) => pdf(x, mu, sigma));
  const yMax = Math.max(...ys);

  const W = 480;
  const H = 200;
  const padL = 20;
  const padR = 10;
  const padT = 10;
  const padB = 30;
  const xToPix = (x: number): number => padL + ((x - xMin) / (xMax - xMin)) * (W - padL - padR);
  const yToPix = (y: number): number => padT + (1 - y / yMax) * (H - padT - padB);

  const lowVal = mu + zLow * sigma;
  const highVal = mu + zHigh * sigma;
  const prob = cdf(highVal, mu, sigma) - cdf(lowVal, mu, sigma);

  const pathD = xs.map((x, i) => `${i === 0 ? 'M' : 'L'} ${xToPix(x).toFixed(1)} ${yToPix(ys[i]).toFixed(1)}`).join(' ');

  const fillXs = xs.filter((x) => x >= lowVal && x <= highVal);
  const fillD = (() => {
    if (fillXs.length < 2) return '';
    const start = `M ${xToPix(fillXs[0]).toFixed(1)} ${yToPix(0).toFixed(1)}`;
    const top = fillXs.map((x) => `L ${xToPix(x).toFixed(1)} ${yToPix(pdf(x, mu, sigma)).toFixed(1)}`).join(' ');
    const end = `L ${xToPix(fillXs[fillXs.length - 1]).toFixed(1)} ${yToPix(0).toFixed(1)} Z`;
    return `${start} ${top} ${end}`;
  })();

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          정규분포 — μ로 좌우, σ로 폭이 결정되는 종 모양
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          정규분포 N(μ, σ²)는 평균 주위에 데이터가 몰리는 「종 모양」 분포예요.
          68−95−99.7 규칙: μ±σ 안에 약 68%, μ±2σ 안에 약 95%가 들어와요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <SliderRow label="μ (평균)" value={mu} min={-3} max={3} step={0.1} onChange={setMu} format={(v) => v.toFixed(1)} />
        <SliderRow label="σ (표준편차)" value={sigma} min={0.3} max={3} step={0.1} onChange={setSigma} format={(v) => v.toFixed(1)} />
        <SliderRow label="z_low (μ + z·σ)" value={zLow} min={-3} max={3} step={0.1} onChange={setZLow} format={(v) => v.toFixed(1)} />
        <SliderRow label="z_high (μ + z·σ)" value={zHigh} min={-3} max={3} step={0.1} onChange={setZHigh} format={(v) => v.toFixed(1)} />
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="#94a3b8" strokeWidth="1" />
          <line x1={xToPix(mu)} y1={padT} x2={xToPix(mu)} y2={H - padB} stroke="#dc2626" strokeWidth="1" strokeDasharray="3 2" />
          {fillD && <path d={fillD} fill="rgba(59,130,246,0.35)" />}
          <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="2" />
          {[-2, -1, 0, 1, 2].map((k) => {
            const x = mu + k * sigma;
            return (
              <g key={k}>
                <line x1={xToPix(x)} y1={H - padB} x2={xToPix(x)} y2={H - padB + 4} stroke="#475569" />
                <text x={xToPix(x)} y={H - padB + 16} textAnchor="middle" fontSize="9" fontFamily="monospace" className="fill-zinc-600 dark:fill-zinc-400">
                  {k === 0 ? 'μ' : `μ${k > 0 ? '+' : ''}${k}σ`}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-4 text-center">
        <div className="text-xs text-blue-700 dark:text-blue-300 mb-1">선택 구간 확률</div>
        <MathFormula
          tex={`P(${lowVal.toFixed(2)} \\le X \\le ${highVal.toFixed(2)}) = ${prob.toFixed(4)} \\approx ${(prob * 100).toFixed(1)}\\%`}
        />
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs font-mono">
        <div className="rounded bg-zinc-50 dark:bg-zinc-950/40 p-2 text-center">μ ± 1σ ≈ 68%</div>
        <div className="rounded bg-zinc-50 dark:bg-zinc-950/40 p-2 text-center">μ ± 2σ ≈ 95%</div>
        <div className="rounded bg-zinc-50 dark:bg-zinc-950/40 p-2 text-center">μ ± 3σ ≈ 99.7%</div>
      </div>
    </div>
  );
}
