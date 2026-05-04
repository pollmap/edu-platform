'use client';

// S5-ME-02 물체의 운동 — 시간-거리 그래프 + 속력 슬라이더.

import { useEffect, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

const T_MAX = 10;

export function TimeDistanceGraph() {
  const [speed, setSpeed] = useState(2);
  const [t, setT] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setT((prev) => (prev >= T_MAX ? 0 : prev + 0.1));
    }, 100);
    return () => clearInterval(id);
  }, [running]);

  const distance = speed * t;

  // SVG: 0~10초, 0~30m
  const padX = 40;
  const padY = 20;
  const W = 360;
  const H = 200;
  const xMax = 10;
  const yMax = 30;
  const tx = (sec: number) => padX + (sec / xMax) * (W - padX - 10);
  const ty = (d: number) => H - padY - (d / yMax) * (H - padY - 10);

  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= t * 10; i++) {
    const s = i / 10;
    points.push({ x: tx(s), y: ty(speed * s) });
  }
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          빠를수록 그래프 기울기가 가팔라져요
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          속력 = 거리 ÷ 시간. 일정한 속력으로 움직이면 시간-거리 그래프는 <strong>직선</strong>이에요.
        </p>
      </div>

      <SliderRow
        label="속력 (m/s)"
        value={speed}
        min={0.5}
        max={3}
        step={0.1}
        onChange={(v) => {
          setSpeed(v);
          setT(0);
        }}
        format={(v) => v.toFixed(1)}
      />

      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="시간-거리 그래프">
          <line x1={padX} y1={padY} x2={padX} y2={H - padY} stroke="#94a3b8" strokeWidth="1.2" />
          <line x1={padX} y1={H - padY} x2={W - 10} y2={H - padY} stroke="#94a3b8" strokeWidth="1.2" />

          {[5, 10, 15, 20, 25, 30].map((d) => (
            <g key={`yg${d}`}>
              <line x1={padX} y1={ty(d)} x2={W - 10} y2={ty(d)} stroke="#334155" strokeWidth="0.4" />
              <text x={padX - 6} y={ty(d) + 3} fontSize="9" fill="#94a3b8" textAnchor="end">{d}</text>
            </g>
          ))}
          {[2, 4, 6, 8, 10].map((s) => (
            <g key={`xg${s}`}>
              <line x1={tx(s)} y1={padY} x2={tx(s)} y2={H - padY} stroke="#334155" strokeWidth="0.4" />
              <text x={tx(s)} y={H - padY + 14} fontSize="9" fill="#94a3b8" textAnchor="middle">{s}</text>
            </g>
          ))}

          <path d={pathD} fill="none" stroke="#22c55e" strokeWidth="2.5" />
          {points.length > 0 && (
            <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="6" fill="#facc15" stroke="white" strokeWidth="1.5" />
          )}

          <text x={W - 10} y={H - 4} fontSize="10" fill="#cbd5e1" textAnchor="end">시간 (s)</text>
          <text x={padX + 4} y={padY - 4} fontSize="10" fill="#cbd5e1">거리 (m)</text>
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-3 text-center">
          <div className="text-xs text-zinc-500">시간</div>
          <div className="text-lg font-bold text-amber-700 dark:text-amber-300">{t.toFixed(1)} s</div>
        </div>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-3 text-center">
          <div className="text-xs text-zinc-500">이동거리</div>
          <div className="text-lg font-bold text-blue-700 dark:text-blue-300">{distance.toFixed(1)} m</div>
        </div>
        <div className="rounded-lg bg-green-50 dark:bg-green-950/30 p-3 text-center">
          <div className="text-xs text-zinc-500">속력</div>
          <div className="text-lg font-bold text-green-700 dark:text-green-300">{speed.toFixed(1)} m/s</div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          className="flex-1 px-3 py-2 text-sm rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 min-h-[44px]"
        >
          {running ? '일시정지' : '재생'}
        </button>
        <button
          type="button"
          onClick={() => setT(0)}
          className="flex-1 px-3 py-2 text-sm rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 min-h-[44px]"
        >
          처음으로
        </button>
      </div>

      <p className="text-xs text-zinc-500">
        ※ 속력을 바꾸면 그래프 직선의 <strong>기울기</strong>가 달라져요. 기울기 = 속력.
      </p>
    </div>
  );
}
