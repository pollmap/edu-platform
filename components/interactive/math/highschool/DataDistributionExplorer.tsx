'use client';

// M-AM-01 AI와 빅데이터 — 데이터 분포·이상치 탐지 (Z-score, IQR).

import { useMemo, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';

const PRESETS: Record<string, number[]> = {
  '시험 성적': [62, 70, 71, 73, 75, 75, 77, 78, 79, 80, 82, 85, 88, 90, 92, 100],
  '집값 (천만원)': [25, 28, 30, 32, 35, 38, 40, 42, 45, 50, 55, 60, 120, 480],
  '유튜브 조회수': [100, 120, 130, 140, 150, 200, 250, 300, 1500, 8000],
};

function quantile(sorted: number[], q: number): number {
  if (sorted.length === 0) return 0;
  const pos = (sorted.length - 1) * q;
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  if (lo === hi) return sorted[lo];
  return sorted[lo] * (hi - pos) + sorted[hi] * (pos - lo);
}

export function DataDistributionExplorer() {
  const [preset, setPreset] = useState<keyof typeof PRESETS>('시험 성적');
  const [data, setData] = useState<number[]>(PRESETS['시험 성적']);
  const [zThresh, setZThresh] = useState(2);
  const [input, setInput] = useState('');

  const stats = useMemo(() => {
    if (data.length === 0) return null;
    const sorted = [...data].sort((a, b) => a - b);
    const mean = data.reduce((s, x) => s + x, 0) / data.length;
    const variance = data.reduce((s, x) => s + (x - mean) ** 2, 0) / data.length;
    const sd = Math.sqrt(variance);
    const q1 = quantile(sorted, 0.25);
    const q2 = quantile(sorted, 0.5);
    const q3 = quantile(sorted, 0.75);
    const iqr = q3 - q1;
    const zScores = data.map((x) => (sd === 0 ? 0 : (x - mean) / sd));
    const outlierZ = data.map((x, i) => Math.abs(zScores[i]) > zThresh);
    const outlierIQR = data.map((x) => x < q1 - 1.5 * iqr || x > q3 + 1.5 * iqr);
    return { sorted, mean, sd, q1, q2, q3, iqr, zScores, outlierZ, outlierIQR };
  }, [data, zThresh]);

  function applyPreset(name: keyof typeof PRESETS): void {
    setPreset(name);
    setData(PRESETS[name]);
  }

  function applyCustom(): void {
    const arr = input.split(/[\s,]+/).map((s) => parseFloat(s)).filter((x) => Number.isFinite(x));
    if (arr.length > 0) setData(arr);
  }

  const W = 480;
  const H = 160;
  if (!stats) {
    return <div className="p-6 text-zinc-500">데이터를 입력해주세요.</div>;
  }
  const xMin = Math.min(stats.sorted[0], stats.q1 - 1.5 * stats.iqr) - stats.iqr * 0.1;
  const xMax = Math.max(stats.sorted[stats.sorted.length - 1], stats.q3 + 1.5 * stats.iqr) + stats.iqr * 0.1;
  const xToPix = (x: number): number => 30 + ((x - xMin) / (xMax - xMin || 1)) * (W - 40);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          데이터 분포·이상치 — AI 학습 전, 데이터부터 들여다보기
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          기계학습 모델은 「입력 데이터에 따라 결정」돼요. 이상치 한두 개가 결과를 통째로 흔들 수 있죠.
          평균·분산 기반 Z-score, 사분위수 기반 IQR — 두 방법으로 이상치를 잡아 보세요.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(Object.keys(PRESETS) as (keyof typeof PRESETS)[]).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => applyPreset(p)}
            className={`min-h-[44px] px-3 rounded-md text-sm border-2 ${
              preset === p
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold'
                : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="예: 10, 20, 30, 35, 200"
          className="flex-1 min-h-[44px] px-3 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-mono text-sm"
        />
        <button type="button" onClick={applyCustom} className="min-h-[44px] px-4 rounded-md border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300">
          적용
        </button>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3">
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">박스플롯 (Q1·중앙값·Q3)</div>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          <line x1="20" y1="80" x2={W - 20} y2="80" stroke="#94a3b8" strokeWidth="1" />
          <line x1={xToPix(stats.q1 - 1.5 * stats.iqr)} y1="60" x2={xToPix(stats.q3 + 1.5 * stats.iqr)} y2="60" stroke="#475569" strokeWidth="1" />
          <line x1={xToPix(stats.q1 - 1.5 * stats.iqr)} y1="50" x2={xToPix(stats.q1 - 1.5 * stats.iqr)} y2="70" stroke="#475569" />
          <line x1={xToPix(stats.q3 + 1.5 * stats.iqr)} y1="50" x2={xToPix(stats.q3 + 1.5 * stats.iqr)} y2="70" stroke="#475569" />
          <rect x={xToPix(stats.q1)} y="40" width={Math.max(2, xToPix(stats.q3) - xToPix(stats.q1))} height="40" fill="rgba(59,130,246,0.4)" stroke="#2563eb" />
          <line x1={xToPix(stats.q2)} y1="40" x2={xToPix(stats.q2)} y2="80" stroke="#dc2626" strokeWidth="2" />
          {data.map((x, i) => (
            <circle
              key={i}
              cx={xToPix(x)}
              cy={120}
              r={stats.outlierIQR[i] || stats.outlierZ[i] ? 5 : 3}
              fill={stats.outlierIQR[i] ? '#dc2626' : stats.outlierZ[i] ? '#f97316' : '#64748b'}
              fillOpacity="0.7"
            >
              <title>{x.toFixed(2)} (z={stats.zScores[i].toFixed(2)})</title>
            </circle>
          ))}
          <text x={xToPix(stats.q1)} y="32" fontSize="9" fontFamily="monospace" textAnchor="middle" className="fill-zinc-600 dark:fill-zinc-400">Q1={stats.q1.toFixed(1)}</text>
          <text x={xToPix(stats.q2)} y="32" fontSize="9" fontFamily="monospace" textAnchor="middle" fill="#dc2626">중앙={stats.q2.toFixed(1)}</text>
          <text x={xToPix(stats.q3)} y="32" fontSize="9" fontFamily="monospace" textAnchor="middle" className="fill-zinc-600 dark:fill-zinc-400">Q3={stats.q3.toFixed(1)}</text>
          <text x="20" y="138" fontSize="9" className="fill-zinc-500 dark:fill-zinc-400">● 정상 ● Z-이상치 ● IQR-이상치</text>
        </svg>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
        <div className="rounded bg-blue-50 dark:bg-blue-950/30 p-2">평균 μ = {stats.mean.toFixed(2)}</div>
        <div className="rounded bg-blue-50 dark:bg-blue-950/30 p-2">표준편차 σ = {stats.sd.toFixed(2)}</div>
        <div className="rounded bg-zinc-50 dark:bg-zinc-950/40 p-2">IQR = {stats.iqr.toFixed(2)}</div>
        <div className="rounded bg-red-50 dark:bg-red-950/30 p-2">이상치 = {stats.outlierIQR.filter(Boolean).length}개</div>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-4 text-center">
        <MathFormula tex={`Z = \\frac{x - \\mu}{\\sigma},\\ |Z| > ${zThresh}\\ \\Rightarrow\\ \\text{이상치 후보}`} />
      </div>
    </div>
  );
}
