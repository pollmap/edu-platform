'use client';

// M6-CR-01 비와 비율 — 비율 슬라이더 + 시각화.
// a:b 의 의미를 막대·원·백분율로 동시 표시.

import { useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

const PRESETS: Array<{ label: string; a: number; b: number }> = [
  { label: '1:2', a: 1, b: 2 },
  { label: '2:3', a: 2, b: 3 },
  { label: '3:5', a: 3, b: 5 },
  { label: '7:3', a: 7, b: 3 },
  { label: '1:1', a: 1, b: 1 },
];

export function RatioExplorer() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(3);

  const total = a + b;
  const ratioPct = total === 0 ? 0 : (a / total) * 100;
  const value = b === 0 ? Infinity : a / b;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          비와 비율
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          <strong>a : b</strong> 는 두 양의 크기 관계예요. 같은 비라도 표현 방법이 여러 가지: 분수, 소수, 백분율.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <div className="text-xs text-zinc-500 mb-1.5">막대 비교 (a:b 길이 비)</div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-12 text-xs font-mono text-zinc-600">a={a}</div>
                <div className="flex-1 h-6 bg-zinc-100 dark:bg-zinc-800 rounded overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${(a / Math.max(a, b)) * 100}%` }} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 text-xs font-mono text-zinc-600">b={b}</div>
                <div className="flex-1 h-6 bg-zinc-100 dark:bg-zinc-800 rounded overflow-hidden">
                  <div className="h-full bg-amber-500" style={{ width: `${(b / Math.max(a, b)) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs text-zinc-500 mb-1.5">전체에서의 a 의 비율 ({ratioPct.toFixed(1)}%)</div>
            <div className="h-6 rounded-lg overflow-hidden flex">
              <div className="bg-blue-500" style={{ width: `${ratioPct}%` }} />
              <div className="bg-amber-500" style={{ width: `${100 - ratioPct}%` }} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <SliderRow label="a" value={a} min={0} max={20} step={1} onChange={setA} />
          <SliderRow label="b" value={b} min={1} max={20} step={1} onChange={setB} />
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => { setA(p.a); setB(p.b); }}
                className="px-3 py-2 text-xs rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 min-h-[36px]"
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-4 text-sm space-y-1">
            <div className="font-mono text-zinc-900 dark:text-zinc-100">비 a:b = <strong>{a}:{b}</strong></div>
            <div className="text-zinc-700 dark:text-zinc-300">
              비율 = a/b = {Number.isFinite(value) ? value.toFixed(3) : '정의 안 됨'}
            </div>
            <div className="text-zinc-700 dark:text-zinc-300">
              비의 값 (a/(a+b)) = {ratioPct.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
