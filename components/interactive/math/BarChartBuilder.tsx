'use client';

// M4-DP-01 막대그래프 — 데이터 입력 + 시각화.

import { useState } from 'react';

interface Bar {
  label: string;
  value: number;
  color: string;
}

const PRESETS: Record<string, Bar[]> = {
  fruit: [
    { label: '사과', value: 12, color: '#dc2626' },
    { label: '바나나', value: 8, color: '#facc15' },
    { label: '딸기', value: 15, color: '#ec4899' },
    { label: '포도', value: 6, color: '#7c3aed' },
    { label: '오렌지', value: 10, color: '#f97316' },
  ],
  weather: [
    { label: '월', value: 23, color: '#3b82f6' },
    { label: '화', value: 25, color: '#3b82f6' },
    { label: '수', value: 28, color: '#dc2626' },
    { label: '목', value: 22, color: '#3b82f6' },
    { label: '금', value: 19, color: '#16a34a' },
    { label: '토', value: 24, color: '#3b82f6' },
    { label: '일', value: 26, color: '#3b82f6' },
  ],
  pet: [
    { label: '강아지', value: 18, color: '#a16207' },
    { label: '고양이', value: 14, color: '#525252' },
    { label: '햄스터', value: 6, color: '#ea580c' },
    { label: '물고기', value: 9, color: '#0891b2' },
  ],
};

export function BarChartBuilder() {
  const [presetKey, setPresetKey] = useState<keyof typeof PRESETS>('fruit');
  const [data, setData] = useState<Bar[]>(PRESETS.fruit);

  const switchPreset = (key: keyof typeof PRESETS) => {
    setPresetKey(key);
    setData(PRESETS[key]);
  };

  const updateValue = (i: number, v: number) => {
    setData((d) => d.map((b, j) => (j === i ? { ...b, value: v } : b)));
  };

  const max = Math.max(...data.map((b) => b.value), 1);
  const total = data.reduce((s, b) => s + b.value, 0);
  const W = 360;
  const H = 220;
  const barW = (W - 60) / data.length - 6;
  const padBottom = 40;
  const padTop = 20;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          막대그래프 — 데이터를 한눈에
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          숫자만 보면 비교가 어려워요. 막대로 그리면 누가 많고 적은지 즉시 보여요. 슬라이더로 값을 바꿔 보세요.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { k: 'fruit' as const, label: '좋아하는 과일' },
          { k: 'weather' as const, label: '한 주 기온' },
          { k: 'pet' as const, label: '키우는 반려동물' },
        ].map((p) => (
          <button
            key={p.k}
            type="button"
            onClick={() => switchPreset(p.k)}
            className={`px-3 py-2 text-xs rounded-md border min-h-[44px] ${
              presetKey === p.k
                ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-500 ring-2 ring-blue-300'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4 overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 320 }}>
          {[0, 0.25, 0.5, 0.75, 1].map((p) => (
            <g key={p}>
              <line x1="40" y1={H - padBottom - p * (H - padBottom - padTop)} x2={W - 10} y2={H - padBottom - p * (H - padBottom - padTop)} stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 2" />
              <text x="36" y={H - padBottom - p * (H - padBottom - padTop) + 3} fontSize="9" textAnchor="end" fill="#64748b">
                {Math.round(max * p)}
              </text>
            </g>
          ))}

          {data.map((b, i) => {
            const h = (b.value / max) * (H - padBottom - padTop);
            const x = 50 + i * (barW + 6);
            const y = H - padBottom - h;
            return (
              <g key={i}>
                <rect
                  x={x}
                  y={y}
                  width={barW}
                  height={h}
                  fill={b.color}
                  rx="2"
                />
                <text x={x + barW / 2} y={y - 4} fontSize="10" textAnchor="middle" fill={b.color} fontWeight="bold">
                  {b.value}
                </text>
                <text x={x + barW / 2} y={H - padBottom + 14} fontSize="10" textAnchor="middle" fill="#475569">
                  {b.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="space-y-2">
        {data.map((b, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-xs w-16 text-zinc-700 dark:text-zinc-300">{b.label}</span>
            <input
              type="range"
              min={0}
              max={30}
              value={b.value}
              onChange={(e) => updateValue(i, Number(e.target.value))}
              className="flex-1 h-3 cursor-pointer"
              aria-label={b.label}
            />
            <span className="text-xs w-8 text-right font-mono text-zinc-600 dark:text-zinc-400">{b.value}</span>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-3 text-xs text-zinc-600 dark:text-zinc-400">
        <strong>합계:</strong> {total} · <strong>최댓값:</strong> {max} · <strong>항목 수:</strong> {data.length}
      </div>
    </div>
  );
}
