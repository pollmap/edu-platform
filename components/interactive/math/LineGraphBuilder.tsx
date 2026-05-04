'use client';

// M4-DP-02 꺾은선그래프 — 시계열 데이터 → 점·선으로 시각화.

import { useState } from 'react';

interface Point {
  label: string;
  value: number;
}

const PRESETS: Record<string, { unit: string; data: Point[] }> = {
  temperature: {
    unit: '°C',
    data: [
      { label: '월', value: 22 },
      { label: '화', value: 24 },
      { label: '수', value: 27 },
      { label: '목', value: 25 },
      { label: '금', value: 21 },
      { label: '토', value: 23 },
      { label: '일', value: 26 },
    ],
  },
  growth: {
    unit: 'cm',
    data: [
      { label: '1월', value: 130 },
      { label: '3월', value: 132 },
      { label: '5월', value: 134 },
      { label: '7월', value: 136 },
      { label: '9월', value: 138 },
      { label: '11월', value: 139 },
    ],
  },
  visitor: {
    unit: '명',
    data: [
      { label: '월', value: 30 },
      { label: '화', value: 25 },
      { label: '수', value: 40 },
      { label: '목', value: 55 },
      { label: '금', value: 70 },
      { label: '토', value: 90 },
      { label: '일', value: 60 },
    ],
  },
};

export function LineGraphBuilder() {
  const [presetKey, setPresetKey] = useState<keyof typeof PRESETS>('temperature');
  const [data, setData] = useState<Point[]>(PRESETS.temperature.data);

  const switchPreset = (key: keyof typeof PRESETS) => {
    setPresetKey(key);
    setData(PRESETS[key].data);
  };

  const updateValue = (i: number, v: number) => {
    setData((d) => d.map((p, j) => (j === i ? { ...p, value: v } : p)));
  };

  const W = 360;
  const H = 220;
  const padL = 38;
  const padR = 16;
  const padT = 20;
  const padB = 36;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const max = Math.max(...data.map((p) => p.value), 1);
  const min = Math.min(...data.map((p) => p.value), 0);
  const range = max - min || 1;

  const xs = data.map((_, i) => padL + (i / (data.length - 1)) * innerW);
  const ys = data.map((p) => padT + (1 - (p.value - min) / range) * innerH);

  const polyline = xs.map((x, i) => `${x},${ys[i]}`).join(' ');

  const max2 = data.reduce((acc, p) => (p.value > acc.value ? p : acc), data[0]);
  const min2 = data.reduce((acc, p) => (p.value < acc.value ? p : acc), data[0]);

  const trends = data.slice(1).map((p, i) => p.value - data[i].value);
  const upCount = trends.filter((t) => t > 0).length;
  const downCount = trends.filter((t) => t < 0).length;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">꺾은선그래프 만들기</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          시간에 따른 변화는 점을 찍고 선으로 이어 표현해요. 막대그래프 대신 <strong>이어진 선</strong>이라 변화가 잘 보여요.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {Object.entries(PRESETS).map(([key, val]) => (
          <button
            key={key}
            type="button"
            onClick={() => switchPreset(key as keyof typeof PRESETS)}
            className={`px-3 py-2 border rounded-md text-sm min-h-[44px] ${
              presetKey === key
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
          >
            {key === 'temperature' ? '일주일 기온' : key === 'growth' ? '내 키 변화' : '카페 손님 수'}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[480px] mx-auto block">
          {[0, 0.25, 0.5, 0.75, 1].map((r) => {
            const y = padT + r * innerH;
            const v = max - r * range;
            return (
              <g key={r}>
                <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#cbd5e1" strokeDasharray="2 3" strokeWidth="0.6" className="dark:stroke-zinc-700" />
                <text x={padL - 4} y={y + 3} fontSize="9" textAnchor="end" fill="#475569" className="dark:fill-zinc-400">
                  {Math.round(v)}
                </text>
              </g>
            );
          })}
          <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="#94a3b8" strokeWidth="1" />
          <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="#94a3b8" strokeWidth="1" />

          <polyline points={polyline} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinejoin="round" />
          {data.map((p, i) => (
            <g key={p.label}>
              <circle cx={xs[i]} cy={ys[i]} r={5} fill="#3b82f6" stroke="white" strokeWidth="2" />
              <text x={xs[i]} y={ys[i] - 10} fontSize="9" textAnchor="middle" fontWeight="bold" fill="#1e3a8a" className="dark:fill-blue-300">
                {p.value}
              </text>
              <text x={xs[i]} y={H - padB + 14} fontSize="10" textAnchor="middle" fill="#475569" className="dark:fill-zinc-400">
                {p.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">값 바꿔 보기</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {data.map((p, i) => (
            <div key={p.label} className="rounded bg-zinc-50 dark:bg-zinc-800 p-2 text-xs">
              <label className="block font-semibold mb-1">{p.label}</label>
              <input
                type="number"
                value={p.value}
                onChange={(e) => updateValue(i, parseFloat(e.target.value) || 0)}
                className="w-full px-2 py-1 border border-zinc-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-900 text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-blue-50 dark:bg-blue-900/30 p-3 text-sm space-y-1">
        <p>
          <strong>최고:</strong> {max2.label} {max2.value}
          {PRESETS[presetKey].unit} &nbsp;·&nbsp; <strong>최저:</strong> {min2.label} {min2.value}
          {PRESETS[presetKey].unit}
        </p>
        <p>
          <strong>오른 구간:</strong> {upCount}번 &nbsp;·&nbsp; <strong>내린 구간:</strong> {downCount}번
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          선이 <strong>위로 가면 늘어남</strong>, 아래로 가면 줄어듦, 평평하면 변화 없음을 뜻해요.
        </p>
      </div>
    </div>
  );
}
