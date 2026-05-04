'use client';

// M-PS-07 통계적 추정 — 표본평균과 신뢰구간 시뮬레이션.

import { useEffect, useRef, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

function gaussian(): number {
  // Box-Muller
  const u1 = Math.random();
  const u2 = Math.random();
  return Math.sqrt(-2 * Math.log(u1 || 1e-9)) * Math.cos(2 * Math.PI * u2);
}

interface CI {
  mean: number;
  lower: number;
  upper: number;
  contains: boolean;
}

export function ConfidenceIntervalSimulator() {
  const [muTrue, setMuTrue] = useState(50);
  const [sigma, setSigma] = useState(10);
  const [n, setN] = useState(30);
  const [confidence, setConfidence] = useState(0.95);
  const [history, setHistory] = useState<CI[]>([]);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // z value table approx
  const zMap: Record<string, number> = { '0.90': 1.645, '0.95': 1.96, '0.99': 2.576 };
  const z = zMap[confidence.toFixed(2)] ?? 1.96;

  function drawSample(): CI {
    let sum = 0;
    for (let i = 0; i < n; i++) sum += muTrue + sigma * gaussian();
    const mean = sum / n;
    const margin = (z * sigma) / Math.sqrt(n);
    const lower = mean - margin;
    const upper = mean + margin;
    return { mean, lower, upper, contains: muTrue >= lower && muTrue <= upper };
  }

  function step() {
    setHistory((h) => [...h.slice(-49), drawSample()]);
  }

  useEffect(() => {
    if (!running) return;
    intervalRef.current = window.setInterval(step, 200) as unknown as number;
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, [running, muTrue, sigma, n, confidence]);

  const containsCount = history.filter((h) => h.contains).length;
  const coverage = history.length > 0 ? containsCount / history.length : 0;

  const W = 480;
  const H = 220;
  const xMin = muTrue - 4 * (sigma / Math.sqrt(n)) * z * 1.2;
  const xMax = muTrue + 4 * (sigma / Math.sqrt(n)) * z * 1.2;
  const xToPix = (x: number): number => 30 + ((x - xMin) / (xMax - xMin)) * (W - 40);
  const rowH = Math.max(3, (H - 30) / Math.max(history.length, 1));

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          신뢰구간 — 「100번 뽑으면 95번은 진짜 평균을 포함하는 자(尺)」
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          한 번의 표본만으로 모평균을 정확히 알 순 없어요. 대신 「95% 신뢰구간」은 똑같은 절차로 표본을 뽑을 때
          <strong> 그 자가 진짜 평균을 덮을 비율이 95%</strong>라는 뜻이에요. 시뮬을 돌려 「덮은 비율」이 95% 근처인지 확인해 봐요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <SliderRow label="진짜 평균 μ" value={muTrue} min={0} max={100} step={1} onChange={setMuTrue} format={(v) => v.toFixed(0)} />
        <SliderRow label="모표준편차 σ" value={sigma} min={1} max={30} step={1} onChange={setSigma} format={(v) => v.toFixed(0)} />
        <SliderRow label="표본 크기 n" value={n} min={5} max={200} step={5} onChange={setN} format={(v) => v.toFixed(0)} />
        <div>
          <div className="text-sm font-bold text-blue-700 dark:text-blue-400 mb-2">신뢰수준</div>
          <div className="flex gap-2">
            {([0.9, 0.95, 0.99] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setConfidence(c)}
                className={`min-h-[44px] px-3 rounded-md border-2 text-sm ${
                  confidence === c
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                {(c * 100).toFixed(0)}%
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-4 text-center">
        <MathFormula
          tex={`\\bar{X} \\pm z_{${(confidence * 100).toFixed(0)}/2} \\cdot \\frac{\\sigma}{\\sqrt{n}} = \\bar{X} \\pm ${z}\\cdot\\frac{${sigma}}{\\sqrt{${n}}} = \\bar{X} \\pm ${((z * sigma) / Math.sqrt(n)).toFixed(2)}`}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => setRunning((r) => !r)} className="min-h-[44px] px-4 rounded-md border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50">
          {running ? '⏸ 정지' : '▶ 자동 시뮬'}
        </button>
        <button type="button" onClick={step} disabled={running} className="min-h-[44px] px-4 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50">
          1번 표본
        </button>
        <button type="button" onClick={() => setHistory([])} className="min-h-[44px] px-4 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800">
          초기화
        </button>
        <span className="ml-auto text-sm font-mono text-zinc-700 dark:text-zinc-300 self-center">
          덮은 비율: <strong className="text-base">{(coverage * 100).toFixed(1)}%</strong> ({containsCount}/{history.length})
        </span>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          <line x1={xToPix(muTrue)} y1="0" x2={xToPix(muTrue)} y2={H} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x={xToPix(muTrue) + 4} y="12" fontSize="10" fill="#dc2626">진짜 μ</text>
          {history.map((h, i) => {
            const y = 20 + i * rowH;
            return (
              <g key={i}>
                <line x1={xToPix(h.lower)} y1={y} x2={xToPix(h.upper)} y2={y} stroke={h.contains ? '#16a34a' : '#dc2626'} strokeWidth="1.5" />
                <circle cx={xToPix(h.mean)} cy={y} r="2" fill={h.contains ? '#16a34a' : '#dc2626'} />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
