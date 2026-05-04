'use client';

// M3-NA-04 분수의 의미 — 패턴 12 변환기.
// 분자/분모 슬라이더 → 막대·원 동시 시각화 + 동치분수 표시.

import { useMemo, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

const PRESETS: Array<{ label: string; n: number; d: number }> = [
  { label: '1/2', n: 1, d: 2 },
  { label: '2/4', n: 2, d: 4 },
  { label: '3/4', n: 3, d: 4 },
  { label: '5/6', n: 5, d: 6 },
  { label: '7/8', n: 7, d: 8 },
];

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function reduce(n: number, d: number): { n: number; d: number } {
  const g = gcd(Math.abs(n), Math.abs(d));
  return { n: n / g, d: d / g };
}

export function FractionMeaningExplorer() {
  const [num, setNum] = useState(3);
  const [den, setDen] = useState(4);

  const safeDen = Math.max(1, den);
  const value = num / safeDen;
  const reduced = useMemo(() => reduce(num, safeDen), [num, safeDen]);
  const isReducible = reduced.d !== safeDen;

  const equivalents = useMemo(() => {
    const out: Array<{ n: number; d: number }> = [];
    for (let k = 2; k <= 4; k++) {
      out.push({ n: reduced.n * k, d: reduced.d * k });
    }
    return out;
  }, [reduced]);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          분수 막대·원 분할
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          전체를 똑같이 <strong>{safeDen}</strong>조각으로 나누고 그 중 <strong>{num}</strong>조각을 색칠한 그림이 분수 {num}/{safeDen} 입니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <FractionBar n={num} d={safeDen} />
          <FractionPie n={num} d={safeDen} />
        </div>

        <div className="space-y-4">
          <SliderRow
            label="분자 n (색칠한 조각 수)"
            value={num}
            min={0}
            max={Math.max(safeDen, 12)}
            step={1}
            onChange={(v) => setNum(Math.min(v, safeDen))}
          />
          <SliderRow
            label="분모 d (전체 조각 수)"
            value={safeDen}
            min={1}
            max={12}
            step={1}
            onChange={(v) => {
              setDen(v);
              if (num > v) setNum(v);
            }}
          />

          <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-4 text-sm space-y-1">
            <div className="font-mono text-2xl text-zinc-900 dark:text-zinc-100">
              {num}/{safeDen} = {value.toFixed(3)}
            </div>
            <div className="text-zinc-700 dark:text-zinc-300">
              {isReducible
                ? `약분하면 ${reduced.n}/${reduced.d} 입니다.`
                : '이미 가장 간단한 형태(기약분수)입니다.'}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  setNum(p.n);
                  setDen(p.d);
                }}
                className="px-3 py-2 text-xs rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 min-h-[36px]"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="text-sm text-zinc-700 dark:text-zinc-300 mb-2">
          <strong>{reduced.n}/{reduced.d}</strong>과 같은 크기의 분수 (동치분수)
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <EquivalentChip n={reduced.n} d={reduced.d} highlight />
          {equivalents.map((eq) => (
            <EquivalentChip key={`${eq.n}/${eq.d}`} n={eq.n} d={eq.d} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FractionBar({ n, d }: { n: number; d: number }) {
  return (
    <div className="space-y-1">
      <div className="text-xs text-zinc-500 dark:text-zinc-400">막대 분할</div>
      <div className="flex h-12 rounded-lg overflow-hidden border-2 border-zinc-300 dark:border-zinc-700">
        {Array.from({ length: d }, (_, i) => (
          <div
            key={i}
            className={`flex-1 border-r last:border-r-0 border-zinc-300 dark:border-zinc-700 ${
              i < n ? 'bg-blue-500' : 'bg-zinc-100 dark:bg-zinc-800'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function FractionPie({ n, d }: { n: number; d: number }) {
  const radius = 70;
  const cx = 80;
  const cy = 80;
  const slices = Array.from({ length: d }, (_, i) => {
    const a0 = (i / d) * Math.PI * 2 - Math.PI / 2;
    const a1 = ((i + 1) / d) * Math.PI * 2 - Math.PI / 2;
    const x0 = cx + radius * Math.cos(a0);
    const y0 = cy + radius * Math.sin(a0);
    const x1 = cx + radius * Math.cos(a1);
    const y1 = cy + radius * Math.sin(a1);
    const largeArc = 1 / d > 0.5 ? 1 : 0;
    return {
      idx: i,
      d: `M ${cx} ${cy} L ${x0} ${y0} A ${radius} ${radius} 0 ${largeArc} 1 ${x1} ${y1} Z`,
    };
  });
  return (
    <div className="space-y-1">
      <div className="text-xs text-zinc-500 dark:text-zinc-400">원 분할</div>
      <svg viewBox="0 0 160 160" className="w-32 h-32">
        {slices.map((s) => (
          <path
            key={s.idx}
            d={s.d}
            fill={s.idx < n ? '#3b82f6' : 'transparent'}
            stroke="#94a3b8"
            strokeWidth="1.5"
          />
        ))}
      </svg>
    </div>
  );
}

function EquivalentChip({ n, d, highlight }: { n: number; d: number; highlight?: boolean }) {
  return (
    <div
      className={`text-center font-mono py-2 rounded-lg border ${
        highlight
          ? 'bg-blue-100 dark:bg-blue-950/50 border-blue-500 text-blue-900 dark:text-blue-200'
          : 'bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
      }`}
    >
      {n}/{d}
    </div>
  );
}
