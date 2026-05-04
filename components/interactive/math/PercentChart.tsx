'use client';

// M6-DP-01 띠그래프·원그래프 — 백분율 데이터 → 두 그래프 변환 시각화.

import { useState } from 'react';

interface Slice {
  label: string;
  pct: number;
  color: string;
}

const PRESETS: Array<{ name: string; data: Slice[] }> = [
  {
    name: '취미 분포',
    data: [
      { label: '게임', pct: 30, color: '#3b82f6' },
      { label: '운동', pct: 25, color: '#10b981' },
      { label: '독서', pct: 20, color: '#f59e0b' },
      { label: '음악', pct: 15, color: '#dc2626' },
      { label: '기타', pct: 10, color: '#a78bfa' },
    ],
  },
  {
    name: '점심 메뉴',
    data: [
      { label: '한식', pct: 45, color: '#dc2626' },
      { label: '분식', pct: 25, color: '#f59e0b' },
      { label: '양식', pct: 18, color: '#3b82f6' },
      { label: '중식', pct: 12, color: '#10b981' },
    ],
  },
  {
    name: '학년별 인원',
    data: [
      { label: '1학년', pct: 28, color: '#a78bfa' },
      { label: '2학년', pct: 26, color: '#3b82f6' },
      { label: '3학년', pct: 24, color: '#10b981' },
      { label: '4학년', pct: 22, color: '#f59e0b' },
    ],
  },
];

export function PercentChart() {
  const [presetIdx, setPresetIdx] = useState(0);
  const data = PRESETS[presetIdx].data;
  const total = data.reduce((s, d) => s + d.pct, 0);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          띠그래프 ↔ 원그래프
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          같은 백분율 자료를 두 가지 모양으로 그릴 수 있어요. <strong>띠그래프</strong>는 길이로, <strong>원그래프</strong>는 각도(파이 조각)로 비율을 나타내요.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p, i) => (
          <button
            key={p.name}
            type="button"
            onClick={() => setPresetIdx(i)}
            className={`px-3 py-2 text-xs rounded-md border-2 min-h-[40px] ${
              presetIdx === i
                ? 'bg-blue-600 text-white border-blue-700'
                : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1.5">띠그래프</div>
          <div className="h-10 rounded-md overflow-hidden flex border border-zinc-300 dark:border-zinc-700">
            {data.map((d) => (
              <div
                key={d.label}
                className="flex items-center justify-center text-white text-xs font-semibold relative"
                style={{ background: d.color, width: `${(d.pct / total) * 100}%` }}
                title={`${d.label} ${d.pct}%`}
              >
                {d.pct >= 10 ? `${d.pct}%` : ''}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <PieChart data={data} total={total} />
          <ul className="space-y-1.5 text-sm">
            {data.map((d) => (
              <li key={d.label} className="flex items-center gap-2">
                <span className="w-4 h-4 rounded shrink-0" style={{ background: d.color }} />
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{d.label}</span>
                <span className="ml-auto font-mono text-zinc-700 dark:text-zinc-300">
                  {d.pct}% · {((d.pct / total) * 360).toFixed(0)}°
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function PieChart({ data, total }: { data: Slice[]; total: number }) {
  const cx = 100;
  const cy = 100;
  const r = 90;
  let acc = 0;

  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[220px] mx-auto">
      {data.map((d) => {
        const a0 = (acc / total) * Math.PI * 2 - Math.PI / 2;
        acc += d.pct;
        const a1 = (acc / total) * Math.PI * 2 - Math.PI / 2;
        const x0 = cx + r * Math.cos(a0);
        const y0 = cy + r * Math.sin(a0);
        const x1 = cx + r * Math.cos(a1);
        const y1 = cy + r * Math.sin(a1);
        const largeArc = d.pct / total > 0.5 ? 1 : 0;
        const path = `M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${largeArc} 1 ${x1} ${y1} Z`;
        const labelAngle = (a0 + a1) / 2;
        const lx = cx + r * 0.6 * Math.cos(labelAngle);
        const ly = cy + r * 0.6 * Math.sin(labelAngle);
        return (
          <g key={d.label}>
            <path d={path} fill={d.color} stroke="white" strokeWidth="2" />
            {d.pct >= 8 && (
              <text x={lx} y={ly} textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">
                {d.pct}%
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
