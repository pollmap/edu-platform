'use client';

// S-IS2-01 화학변화와 평형 — 가역 반응 평형 시뮬.
// A + B ⇌ C + D 의 농도 변화 그래프. 평형상수 K, 르샤틀리에 원리 (농도/온도 변화 시 어디로 이동).

import { useEffect, useMemo, useRef, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

interface State {
  A: number;
  B: number;
  C: number;
  D: number;
}

const STEPS = 60;
const W = 360;
const H = 200;
const PAD = 30;

function buildSeries(initA: number, initB: number, K: number, kf: number): State[] {
  const series: State[] = [];
  let A = initA;
  let B = initB;
  let C = 0;
  let D = 0;
  for (let i = 0; i <= STEPS; i++) {
    series.push({ A, B, C, D });
    // 1차 반응속도식: rate_f = kf * A * B, rate_r = kr * C * D
    // K = kf/kr → kr = kf / K
    const kr = kf / Math.max(K, 0.0001);
    const rateF = kf * A * B;
    const rateR = kr * C * D;
    const net = rateF - rateR;
    const dt = 0.05;
    A = Math.max(0, A - net * dt);
    B = Math.max(0, B - net * dt);
    C = C + net * dt;
    D = D + net * dt;
  }
  return series;
}

export function ChemicalEquilibriumSimulator() {
  const [initA, setInitA] = useState(1.0);
  const [initB, setInitB] = useState(1.0);
  const [K, setK] = useState(4.0);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const series = useMemo(() => buildSeries(initA, initB, K, 0.6), [initA, initB, K]);

  useEffect(() => {
    if (!running) return;
    timerRef.current = setInterval(() => {
      setStep((s) => {
        if (s >= STEPS) {
          setRunning(false);
          return STEPS;
        }
        return s + 1;
      });
    }, 100);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [running]);

  const reset = () => {
    setStep(0);
    setRunning(false);
  };

  const current = series[step];
  const equilibrium = series[STEPS];
  const Q = (current.C * current.D) / Math.max(current.A * current.B, 0.0001);

  const xScale = (i: number) => PAD + ((W - PAD * 2) * i) / STEPS;
  const yScale = (v: number) => H - PAD - ((H - PAD * 2) * v) / 1.5;

  const pathFor = (key: keyof State) =>
    series
      .slice(0, step + 1)
      .map((p, i) => `${i === 0 ? 'M' : 'L'}${xScale(i).toFixed(1)},${yScale(p[key]).toFixed(1)}`)
      .join(' ');

  const colorMap: Record<keyof State, string> = {
    A: '#3b82f6',
    B: '#10b981',
    C: '#f59e0b',
    D: '#ef4444',
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <SliderRow
          label="초기 [A]"
          value={initA}
          min={0.1}
          max={2.0}
          step={0.1}
          onChange={(v) => {
            setInitA(v);
            reset();
          }}
          unit=" mol/L"
          format={(v) => v.toFixed(2)}
        />
        <SliderRow
          label="초기 [B]"
          value={initB}
          min={0.1}
          max={2.0}
          step={0.1}
          onChange={(v) => {
            setInitB(v);
            reset();
          }}
          unit=" mol/L"
          format={(v) => v.toFixed(2)}
        />
        <SliderRow
          label="평형상수 K"
          value={K}
          min={0.1}
          max={50}
          step={0.1}
          onChange={(v) => {
            setK(v);
            reset();
          }}
          format={(v) => v.toFixed(2)}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            if (step >= STEPS) reset();
            setRunning((r) => !r);
          }}
          className="px-4 py-2 rounded-lg bg-amber-600 text-white font-medium min-h-[44px]"
        >
          {running ? '⏸ 정지' : step >= STEPS ? '🔁 다시' : '▶️ 반응 시작'}
        </button>
        <button
          type="button"
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium min-h-[44px]"
        >
          초기화
        </button>
        <div className="flex-1 flex items-center justify-end font-mono text-xs text-zinc-500 dark:text-zinc-400">
          반응식: A + B ⇌ C + D
        </div>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-700">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="농도 변화">
          <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="currentColor" strokeOpacity={0.3} />
          <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} stroke="currentColor" strokeOpacity={0.3} />
          {(['A', 'B', 'C', 'D'] as (keyof State)[]).map((k) => (
            <path key={k} d={pathFor(k)} stroke={colorMap[k]} strokeWidth={2} fill="none" />
          ))}
          {step >= STEPS && (
            <line
              x1={PAD}
              y1={yScale(equilibrium.A)}
              x2={W - PAD}
              y2={yScale(equilibrium.A)}
              stroke="currentColor"
              strokeOpacity={0.15}
              strokeDasharray="4 2"
            />
          )}
          <text x={W - PAD - 6} y={PAD + 12} textAnchor="end" fontSize="10" fill="#3b82f6" fontWeight="bold">
            [A] {current.A.toFixed(2)}
          </text>
          <text x={W - PAD - 6} y={PAD + 26} textAnchor="end" fontSize="10" fill="#10b981" fontWeight="bold">
            [B] {current.B.toFixed(2)}
          </text>
          <text x={W - PAD - 6} y={PAD + 40} textAnchor="end" fontSize="10" fill="#f59e0b" fontWeight="bold">
            [C] {current.C.toFixed(2)}
          </text>
          <text x={W - PAD - 6} y={PAD + 54} textAnchor="end" fontSize="10" fill="#ef4444" fontWeight="bold">
            [D] {current.D.toFixed(2)}
          </text>
          <text x={PAD - 4} y={PAD + 4} textAnchor="end" fontSize="10" fill="currentColor" opacity={0.5}>
            mol/L
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
        <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">반응지수 Q</div>
          <div className="font-bold">{Q.toFixed(2)}</div>
        </div>
        <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">평형상수 K</div>
          <div className="font-bold">{K.toFixed(2)}</div>
        </div>
        <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">진행 방향</div>
          <div className="font-bold">
            {step >= STEPS ? '평형 도달' : Q < K ? '→ 정반응' : Q > K ? '← 역반응' : '평형'}
          </div>
        </div>
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        💡 K가 클수록 「생성물 쪽으로 치우친 평형」. Q ＜ K면 정반응, Q ＞ K면 역반응으로 이동해 평형에 도달해요. 르샤틀리에 원리 — 평형은 외부 자극(농도·온도·압력)에 「반대로」 반응해요.
      </div>
    </div>
  );
}
