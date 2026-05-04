'use client';

// M-AM-05 함수와 미분 (경사하강법) — 손실함수 위를 굴러내려가는 알고리즘.

import { useEffect, useRef, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

type LossFn = 'parabola' | 'wavy' | 'doublewell';

const FNS: Record<LossFn, { f: (x: number) => number; df: (x: number) => number; label: string }> = {
  parabola: {
    f: (x) => 0.5 * x * x + 1,
    df: (x) => x,
    label: 'L(x) = 0.5x² + 1',
  },
  wavy: {
    f: (x) => 0.1 * x * x + Math.sin(x) + 1,
    df: (x) => 0.2 * x + Math.cos(x),
    label: 'L(x) = 0.1x² + sin(x) + 1',
  },
  doublewell: {
    f: (x) => 0.05 * x * x * x * x - 0.5 * x * x + 1,
    df: (x) => 0.2 * x * x * x - x,
    label: 'L(x) = 0.05x⁴ − 0.5x² + 1',
  },
};

export function GradientDescentExplorer() {
  const [loss, setLoss] = useState<LossFn>('doublewell');
  const [lr, setLr] = useState(0.1);
  const [x, setX] = useState(2.5);
  const [history, setHistory] = useState<{ x: number; y: number }[]>([]);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const { f, df, label } = FNS[loss];

  function step() {
    setX((cur) => {
      const next = cur - lr * df(cur);
      setHistory((h) => [...h.slice(-99), { x: next, y: f(next) }]);
      return next;
    });
  }

  function reset() {
    setX(2.5);
    setHistory([]);
  }

  useEffect(() => {
    if (!running) return;
    intervalRef.current = window.setInterval(step, 80) as unknown as number;
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, [running, lr, loss]);

  // visualization
  const W = 480;
  const H = 240;
  const xMin = -4;
  const xMax = 4;
  const samples = 120;
  const xs = Array.from({ length: samples }, (_, i) => xMin + ((xMax - xMin) * i) / (samples - 1));
  const ys = xs.map(f);
  const yMin = Math.min(...ys);
  const yMax = Math.max(...ys);
  const xToPix = (xv: number): number => 30 + ((xv - xMin) / (xMax - xMin)) * (W - 40);
  const yToPix = (yv: number): number => 20 + (1 - (yv - yMin) / (yMax - yMin || 1)) * (H - 40);

  const path = xs.map((xv, i) => `${i === 0 ? 'M' : 'L'} ${xToPix(xv).toFixed(1)} ${yToPix(ys[i]).toFixed(1)}`).join(' ');
  const slope = df(x);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          경사하강법 — 미분이 가리키는 반대 방향으로 한 발씩
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          AI 학습은 「손실함수가 가장 낮은 점」을 찾는 일이에요. 미분(기울기)이 양수면 왼쪽으로,
          음수면 오른쪽으로 이동해 골짜기 바닥에 도달해요. 학습률(lr)이 너무 크면 튀고, 작으면 느려요.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(Object.keys(FNS) as LossFn[]).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => { setLoss(l); reset(); }}
            className={`min-h-[44px] px-3 rounded-md text-sm border-2 ${
              loss === l
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold'
                : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <SliderRow label="학습률 lr" value={lr} min={0.01} max={1} step={0.01} onChange={setLr} format={(v) => v.toFixed(2)} />

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3 text-center">
        <MathFormula tex={`x \\leftarrow x - \\eta\\,\\nabla L(x),\\quad ${label},\\quad \\eta = ${lr.toFixed(2)}`} />
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          <path d={path} fill="none" stroke="#2563eb" strokeWidth="2" />
          {history.map((p, i) => (
            <circle key={i} cx={xToPix(p.x)} cy={yToPix(p.y)} r="2" fill="#dc2626" fillOpacity={0.4 + 0.6 * (i / Math.max(history.length, 1))} />
          ))}
          <circle cx={xToPix(x)} cy={yToPix(f(x))} r="6" fill="#dc2626" stroke="#fff" strokeWidth="2" />
          {/* tangent */}
          <line
            x1={xToPix(x - 0.7)}
            y1={yToPix(f(x) - 0.7 * slope)}
            x2={xToPix(x + 0.7)}
            y2={yToPix(f(x) + 0.7 * slope)}
            stroke="#f97316"
            strokeWidth="2"
            strokeDasharray="3 2"
          />
          <text x={xToPix(x) + 10} y={yToPix(f(x)) - 6} fontSize="10" fontFamily="monospace" fill="#dc2626">
            x={x.toFixed(2)} L={f(x).toFixed(2)} ∇={slope.toFixed(2)}
          </text>
        </svg>
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => setRunning((r) => !r)} className="min-h-[44px] px-4 rounded-md border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50">
          {running ? '⏸ 정지' : '▶ 자동 학습'}
        </button>
        <button type="button" onClick={step} disabled={running} className="min-h-[44px] px-4 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 disabled:opacity-50">
          1 step
        </button>
        <button type="button" onClick={reset} className="min-h-[44px] px-4 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900">
          초기화
        </button>
        <span className="ml-auto self-center text-xs font-mono text-zinc-600 dark:text-zinc-400">
          step: {history.length}
        </span>
      </div>
    </div>
  );
}
