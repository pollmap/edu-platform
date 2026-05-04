'use client';

// M-PS-05 확률변수·분포 — 이산확률분포 막대그래프와 기댓값/분산.

import { useMemo, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';

type Preset = 'uniform' | 'binomial' | 'custom';

function binomCoeff(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let c = 1;
  for (let i = 0; i < k; i++) c = (c * (n - i)) / (i + 1);
  return c;
}

export function DiscreteDistributionExplorer() {
  const [preset, setPreset] = useState<Preset>('binomial');
  const [n, setN] = useState(8);
  const [p, setP] = useState(0.5);
  const [custom, setCustom] = useState<number[]>([0.1, 0.2, 0.4, 0.2, 0.1]);

  const probs = useMemo<number[]>(() => {
    if (preset === 'uniform') {
      const arr = Array.from({ length: n + 1 }, () => 1 / (n + 1));
      return arr;
    }
    if (preset === 'binomial') {
      return Array.from({ length: n + 1 }, (_, k) =>
        binomCoeff(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k)
      );
    }
    const sum = custom.reduce((a, b) => a + b, 0) || 1;
    return custom.map((v) => v / sum);
  }, [preset, n, p, custom]);

  const xs = probs.map((_, i) => i);
  const mean = xs.reduce((s, x, i) => s + x * probs[i], 0);
  const variance = xs.reduce((s, x, i) => s + Math.pow(x - mean, 2) * probs[i], 0);
  const sd = Math.sqrt(variance);
  const totalProb = probs.reduce((a, b) => a + b, 0);

  const W = 480;
  const H = 200;
  const barW = W / probs.length;
  const maxP = Math.max(...probs, 0.01);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          이산확률분포 — 「가능한 값들 위에 확률을 얹은 막대그래프」
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          이산확률변수 X의 분포는 「각 값에 확률을 배정」한 표예요. 기댓값 E(X)는 무게중심,
          분산 V(X)는 흩어짐의 정도를 알려줘요. 막대 합은 항상 1.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {([
          { id: 'uniform', label: '균등 분포' },
          { id: 'binomial', label: '이항 B(n,p)' },
          { id: 'custom', label: '사용자 지정' },
        ] as { id: Preset; label: string }[]).map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setPreset(b.id)}
            className={`min-h-[44px] px-3 rounded-md text-sm border-2 ${
              preset === b.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold'
                : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      {preset === 'binomial' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="text-sm">
            <div className="flex justify-between mb-1">
              <span className="text-zinc-700 dark:text-zinc-300 font-semibold">n (시행 수)</span>
              <span className="font-mono text-blue-600 dark:text-blue-400">{n}</span>
            </div>
            <input type="range" min={1} max={20} step={1} value={n} onChange={(e) => setN(parseInt(e.target.value))} className="w-full h-3 cursor-pointer accent-blue-600" />
          </label>
          <label className="text-sm">
            <div className="flex justify-between mb-1">
              <span className="text-zinc-700 dark:text-zinc-300 font-semibold">p (성공 확률)</span>
              <span className="font-mono text-blue-600 dark:text-blue-400">{p.toFixed(2)}</span>
            </div>
            <input type="range" min={0} max={1} step={0.01} value={p} onChange={(e) => setP(parseFloat(e.target.value))} className="w-full h-3 cursor-pointer accent-blue-600" />
          </label>
        </div>
      )}

      {preset === 'custom' && (
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">각 X 값의 가중치 (자동 정규화)</div>
          <div className="flex flex-wrap gap-2">
            {custom.map((v, i) => (
              <label key={i} className="flex flex-col items-center text-xs">
                <span className="font-mono text-zinc-600 dark:text-zinc-400">x={i}</span>
                <input
                  type="number"
                  value={v}
                  min={0}
                  step={0.05}
                  onChange={(e) => {
                    const nv = parseFloat(e.target.value) || 0;
                    setCustom((c) => c.map((x, j) => (j === i ? nv : x)));
                  }}
                  className="w-16 mt-1 px-1 py-1 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-mono"
                />
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3">
        <svg viewBox={`0 0 ${W} ${H + 30}`} className="w-full h-auto">
          {probs.map((pr, i) => {
            const h = (pr / maxP) * H;
            return (
              <g key={i}>
                <rect x={i * barW + 2} y={H - h} width={barW - 4} height={h} fill="#3b82f6" />
                <text x={i * barW + barW / 2} y={H + 12} textAnchor="middle" fontSize="9" fontFamily="monospace" className="fill-zinc-600 dark:fill-zinc-400">{i}</text>
                <text x={i * barW + barW / 2} y={H - h - 3} textAnchor="middle" fontSize="8" fontFamily="monospace" className="fill-zinc-500 dark:fill-zinc-500">{pr.toFixed(2)}</text>
              </g>
            );
          })}
          <line x1={mean * barW + barW / 2} y1="0" x2={mean * barW + barW / 2} y2={H} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x={mean * barW + barW / 2 + 4} y="14" fontSize="10" fontFamily="monospace" fill="#dc2626">E(X)</text>
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="rounded bg-blue-50 dark:bg-blue-950/30 p-3 text-center">
          <div className="text-xs text-blue-700 dark:text-blue-300">기댓값 E(X)</div>
          <MathFormula tex={`\\mu = ${mean.toFixed(3)}`} />
        </div>
        <div className="rounded bg-zinc-50 dark:bg-zinc-950/40 p-3 text-center">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">분산 V(X)</div>
          <MathFormula tex={`\\sigma^2 = ${variance.toFixed(3)}`} />
        </div>
        <div className="rounded bg-zinc-50 dark:bg-zinc-950/40 p-3 text-center">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">표준편차</div>
          <MathFormula tex={`\\sigma = ${sd.toFixed(3)}`} />
        </div>
      </div>
      <div className="text-[11px] text-zinc-500 dark:text-zinc-500 font-mono text-center">
        ∑P(x) = {totalProb.toFixed(4)} (정확히 1이어야 함)
      </div>
    </div>
  );
}
