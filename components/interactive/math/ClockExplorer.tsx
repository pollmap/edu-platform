'use client';

// M3-GM-02 길이와 시간 — 아날로그/디지털 시계 동기화 + 단위 변환.

import { useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

const LENGTH_PRESETS = [
  { label: '연필 18cm', value: 18 },
  { label: '책 30cm', value: 30 },
  { label: '책상 80cm', value: 80 },
  { label: '키 130cm', value: 130 },
];

export function ClockExplorer() {
  const [hour, setHour] = useState(3);
  const [minute, setMinute] = useState(15);
  const [lengthCm, setLengthCm] = useState(130);

  const cx = 110;
  const cy = 110;
  const R = 90;
  const minuteAngle = (minute / 60) * 360 - 90;
  const hourAngle = ((hour % 12) / 12) * 360 + (minute / 60) * 30 - 90;

  const minuteRad = (minuteAngle * Math.PI) / 180;
  const hourRad = (hourAngle * Math.PI) / 180;
  const minX = cx + 75 * Math.cos(minuteRad);
  const minY = cy + 75 * Math.sin(minuteRad);
  const hrX = cx + 50 * Math.cos(hourRad);
  const hrY = cy + 50 * Math.sin(hourRad);

  const digital = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  const totalMinutes = hour * 60 + minute;
  const m = Math.round(lengthCm * 10) / 1000; // mm 기준 변환 보조
  const cmPart = Math.floor(lengthCm);
  const mmPart = Math.round((lengthCm - cmPart) * 10);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">시계와 길이</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          시·분 바늘을 움직여 디지털 시간과 비교해 봐요. 아래는 길이 단위(mm·cm·m) 변환 연습이에요.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4">
          <svg viewBox="0 0 220 220" className="w-full max-w-[260px] mx-auto block">
            <circle cx={cx} cy={cy} r={R} fill="white" stroke="#3b82f6" strokeWidth="3" className="dark:fill-zinc-800" />
            {Array.from({ length: 12 }, (_, i) => {
              const a = (i / 12) * 2 * Math.PI - Math.PI / 2;
              const x = cx + (R - 14) * Math.cos(a);
              const y = cy + (R - 14) * Math.sin(a) + 4;
              return (
                <text key={i} x={x} y={y} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e293b" className="dark:fill-zinc-200">
                  {i === 0 ? 12 : i}
                </text>
              );
            })}
            {Array.from({ length: 60 }, (_, i) => {
              const a = (i / 60) * 2 * Math.PI - Math.PI / 2;
              const inner = i % 5 === 0 ? R - 6 : R - 3;
              const x1 = cx + inner * Math.cos(a);
              const y1 = cy + inner * Math.sin(a);
              const x2 = cx + R * Math.cos(a);
              const y2 = cy + R * Math.sin(a);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#94a3b8" strokeWidth={i % 5 === 0 ? 1.5 : 0.6} />;
            })}
            <line x1={cx} y1={cy} x2={hrX} y2={hrY} stroke="#1e3a8a" strokeWidth="6" strokeLinecap="round" className="dark:stroke-blue-300" />
            <line x1={cx} y1={cy} x2={minX} y2={minY} stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
            <circle cx={cx} cy={cy} r={5} fill="#1e293b" className="dark:fill-zinc-200" />
          </svg>
          <div className="mt-3 text-center">
            <span className="font-mono text-3xl font-bold text-zinc-900 dark:text-zinc-100">{digital}</span>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">자정부터 {totalMinutes}분</p>
          </div>
        </div>

        <div className="space-y-3">
          <SliderRow label="시 (0~23)" value={hour} min={0} max={23} step={1} onChange={setHour} format={(v) => String(v)} unit="시" />
          <SliderRow label="분 (0~59)" value={minute} min={0} max={59} step={1} onChange={setMinute} format={(v) => String(v)} unit="분" />
          <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800 p-3 text-sm space-y-1">
            <p><strong>1시간 = 60분</strong>, 1분 = 60초</p>
            <p>시 바늘은 한 시간에 한 칸, 분 바늘은 한 시간에 한 바퀴를 돌아요.</p>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-5">
        <h3 className="text-lg font-semibold mb-3 text-blue-700 dark:text-blue-400">길이 단위 바꾸기</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {LENGTH_PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => setLengthCm(p.value)}
              className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 min-h-[44px]"
            >
              {p.label}
            </button>
          ))}
        </div>
        <SliderRow label="길이 (cm)" value={lengthCm} min={1} max={300} step={1} onChange={setLengthCm} format={(v) => String(v)} unit="cm" />
        <div className="grid grid-cols-3 gap-3 mt-3 text-center">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-900/30 p-3">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">밀리미터</p>
            <p className="font-mono text-xl font-bold text-blue-700 dark:text-blue-300">{lengthCm * 10} mm</p>
          </div>
          <div className="rounded-lg bg-blue-50 dark:bg-blue-900/30 p-3">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">센티미터</p>
            <p className="font-mono text-xl font-bold text-blue-700 dark:text-blue-300">{cmPart}cm {mmPart}mm</p>
          </div>
          <div className="rounded-lg bg-blue-50 dark:bg-blue-900/30 p-3">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">미터</p>
            <p className="font-mono text-xl font-bold text-blue-700 dark:text-blue-300">{m} m</p>
          </div>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
          1cm = 10mm, 1m = 100cm. 단위는 “묶음”이라고 생각하면 쉬워요.
        </p>
      </div>
    </div>
  );
}
