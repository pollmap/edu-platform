'use client';

// S5-MA-02 산과 염기 — pH 슬라이더 + 지시약 색.
// 0~14 pH 스케일과 일반적 지시약(BTB·페놀프탈레인·리트머스) 반응.

import { useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

interface Indicator {
  name: string;
  colorOf: (pH: number) => { color: string; label: string };
}

const INDICATORS: Indicator[] = [
  {
    name: 'BTB 용액',
    colorOf: (p) =>
      p < 6 ? { color: '#fbbf24', label: '노란색 (산성)' } :
      p > 7.6 ? { color: '#3b82f6', label: '파란색 (염기성)' } :
      { color: '#22c55e', label: '초록색 (중성)' },
  },
  {
    name: '페놀프탈레인',
    colorOf: (p) =>
      p < 8.2 ? { color: '#f3f4f6', label: '무색' } :
      { color: '#ec4899', label: '붉은색 (염기성)' },
  },
  {
    name: '리트머스',
    colorOf: (p) =>
      p < 4.5 ? { color: '#dc2626', label: '붉은색 (산성)' } :
      p > 8.3 ? { color: '#2563eb', label: '푸른색 (염기성)' } :
      { color: '#a78bfa', label: '보라색 (중성)' },
  },
];

const SAMPLES = [
  { label: '레몬즙', pH: 2 },
  { label: '식초', pH: 3 },
  { label: '우유', pH: 6.5 },
  { label: '순수한 물', pH: 7 },
  { label: '비누물', pH: 10 },
  { label: '암모니아', pH: 12 },
];

function category(pH: number): string {
  if (pH < 7) return '산성';
  if (pH > 7) return '염기성';
  return '중성';
}

function gradientColor(pH: number): string {
  if (pH < 7) {
    const t = pH / 7;
    return `oklch(${0.65 + 0.05 * t} 0.2 ${20 + 50 * t})`;
  }
  const t = (pH - 7) / 7;
  return `oklch(${0.65 + 0.05 * (1 - t)} 0.2 ${250 - 30 * t})`;
}

export function PHIndicator() {
  const [pH, setPH] = useState(7);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          pH · 산과 염기
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          pH는 용액이 얼마나 산성/염기성인지 0~14로 나타내는 척도예요. <strong>7이 중성</strong>, 작을수록 산성, 클수록 염기성.
        </p>
      </div>

      <div className="space-y-4">
        <div className="h-12 rounded-xl overflow-hidden flex relative">
          {Array.from({ length: 28 }, (_, i) => {
            const v = (i / 27) * 14;
            return (
              <div
                key={i}
                style={{ background: gradientColor(v), flex: 1 }}
                aria-hidden="true"
              />
            );
          })}
          <div
            className="absolute top-0 h-full w-1 bg-zinc-900 dark:bg-white shadow"
            style={{ left: `${(pH / 14) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-zinc-500 px-1 font-mono">
          {[0, 2, 4, 7, 10, 12, 14].map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <SliderRow label="pH" value={pH} min={0} max={14} step={0.1} onChange={setPH} />
          <div className="flex flex-wrap gap-2">
            {SAMPLES.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setPH(s.pH)}
                className="px-3 py-2 text-xs rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 min-h-[36px]"
              >
                {s.label} ({s.pH})
              </button>
            ))}
          </div>
          <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border-l-4 border-green-500 p-3 font-mono text-sm">
            pH = <strong>{pH.toFixed(1)}</strong> · {category(pH)}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">지시약 반응</div>
          {INDICATORS.map((ind) => {
            const r = ind.colorOf(pH);
            return (
              <div key={ind.name} className="flex items-center gap-3">
                <div className="text-xs w-24 text-zinc-700 dark:text-zinc-300">{ind.name}</div>
                <div
                  className="w-12 h-12 rounded-lg border-2 border-zinc-300 dark:border-zinc-600"
                  style={{ background: r.color }}
                  aria-label={r.label}
                />
                <div className="text-xs text-zinc-700 dark:text-zinc-300 flex-1">{r.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
