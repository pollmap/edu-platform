'use client';

// M5-NA-05 분수의 곱셈 — 격자 시각화 (a/b × c/d).

import { useMemo, useState } from 'react';

export function FractionMultiplicationExplorer() {
  const [n1, setN1] = useState(2);
  const [d1, setD1] = useState(3);
  const [n2, setN2] = useState(3);
  const [d2, setD2] = useState(4);

  const result = useMemo(() => {
    const num = n1 * n2;
    const den = d1 * d2;
    const g = gcd(num, den);
    return { num, den, simpleNum: num / g, simpleDen: den / g, simplified: g > 1 };
  }, [n1, d1, n2, d2]);

  const cell = 240 / Math.max(d1, d2);
  const w = d2 * cell;
  const h = d1 * cell;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          분수의 곱셈 — 격자로 보기
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          가로로 <strong>{n2}/{d2}</strong>, 세로로 <strong>{n1}/{d1}</strong> 만큼 칠해 봐요. 겹치는 부분이 답이에요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4 flex justify-center">
          <svg viewBox={`0 0 ${w + 20} ${h + 20}`} className="w-full max-w-[300px]">
            {[...Array(d1 * d2)].map((_, i) => {
              const r = Math.floor(i / d2);
              const c = i % d2;
              const inH = r < n1;
              const inV = c < n2;
              const both = inH && inV;
              const fill = both ? '#a855f7' : inH ? '#fda4af' : inV ? '#93c5fd' : 'white';
              return (
                <rect
                  key={i}
                  x={10 + c * cell}
                  y={10 + r * cell}
                  width={cell}
                  height={cell}
                  fill={fill}
                  stroke="#475569"
                  strokeWidth="0.8"
                  opacity={both ? 0.85 : inH || inV ? 0.55 : 1}
                />
              );
            })}
          </svg>
        </div>

        <div className="space-y-3">
          <SliderRow label={`첫째 분자 ${n1}`} value={n1} max={d1} onChange={setN1} />
          <SliderRow label={`첫째 분모 ${d1}`} value={d1} min={2} max={8} onChange={(v) => { setD1(v); if (n1 > v) setN1(v); }} />
          <SliderRow label={`둘째 분자 ${n2}`} value={n2} max={d2} onChange={setN2} />
          <SliderRow label={`둘째 분모 ${d2}`} value={d2} min={2} max={8} onChange={(v) => { setD2(v); if (n2 > v) setN2(v); }} />
        </div>
      </div>

      <div className="rounded-xl bg-purple-50 dark:bg-purple-950/30 border-l-4 border-purple-500 p-4 text-center">
        <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
          <FractionText n={n1} d={d1} /> × <FractionText n={n2} d={d2} /> ={' '}
          <span className="font-bold">
            <FractionText n={result.num} d={result.den} />
          </span>
          {result.simplified && (
            <>
              {' '}= <span className="font-bold text-purple-700 dark:text-purple-300">
                <FractionText n={result.simpleNum} d={result.simpleDen} />
              </span>
            </>
          )}
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          분자끼리, 분모끼리 곱해요. 약분 가능하면 약분.
        </p>
      </div>
    </div>
  );
}

function SliderRow({
  label, value, min = 1, max, onChange,
}: { label: string; value: number; min?: number; max: number; onChange: (v: number) => void }) {
  return (
    <div className="space-y-1">
      <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{label}</div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-3 cursor-pointer"
        aria-label={label}
      />
    </div>
  );
}

function FractionText({ n, d }: { n: number; d: number }) {
  return (
    <span className="inline-flex flex-col items-center align-middle text-base leading-none mx-0.5">
      <span>{n}</span>
      <span className="border-t border-current px-2">{d}</span>
    </span>
  );
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}
