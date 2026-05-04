'use client';

// M-AL-08 수학적 귀납법 — 도미노 시각화.

import { useEffect, useRef, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';

const TOTAL = 12;

export function DominoInductionExplorer() {
  const [step, setStep] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  const start = () => {
    if (intervalRef.current !== null) return;
    setStep(0);
    intervalRef.current = window.setInterval(() => {
      setStep((s) => {
        if (s >= TOTAL) {
          if (intervalRef.current !== null) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return s;
        }
        return s + 1;
      });
    }, 350);
  };

  const reset = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setStep(0);
  };

  const sumK = (step * (step + 1)) / 2;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          수학적 귀납법 — 도미노 효과
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          ① n=1에서 성립 ② n=k 성립 가정하면 n=k+1도 성립 → 모든 n에서 성립.
        </p>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800 p-6 min-h-[140px]">
        <div className="flex justify-center items-end gap-1.5 h-24">
          {Array.from({ length: TOTAL }).map((_, i) => {
            const fallen = i < step;
            return (
              <div
                key={i}
                className={`w-5 transition-all duration-300 origin-bottom ${
                  fallen ? 'bg-blue-600' : 'bg-zinc-300 dark:bg-zinc-600'
                }`}
                style={{
                  height: '80px',
                  transform: fallen ? `rotate(${Math.min(85, (step - i) * 30)}deg)` : 'rotate(0deg)',
                }}
              />
            );
          })}
        </div>
        <div className="text-center text-sm text-zinc-600 dark:text-zinc-400 mt-3">
          현재 쓰러진 도미노: <strong>{step}</strong> / {TOTAL}
        </div>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-4 text-center space-y-2">
        <div className="text-sm font-semibold text-blue-800 dark:text-blue-300">
          예: 1 + 2 + ... + n = n(n+1)/2 증명
        </div>
        <div className="text-xl">
          <MathFormula tex={`1 + 2 + \\cdots + ${step} = \\frac{${step}(${step + 1})}{2} = ${sumK}`} />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={start}
          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold min-h-[44px]"
        >
          연쇄 시작
        </button>
        <button
          type="button"
          onClick={reset}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md min-h-[44px]"
        >
          리셋
        </button>
      </div>

      <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 text-sm space-y-1">
        <p>
          <strong>① 기초 단계</strong>: n=1에서 좌변=1, 우변=1·2/2=1. 성립.
        </p>
        <p>
          <strong>② 귀납 단계</strong>: n=k 성립 가정. n=k+1: (k(k+1)/2) + (k+1) = (k+1)(k+2)/2. 성립.
        </p>
      </div>
    </div>
  );
}
