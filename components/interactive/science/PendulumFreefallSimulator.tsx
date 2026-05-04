'use client';

// S-IS1-04 시스템과 상호작용 — 자유낙하·진자 시뮬레이션.
// 자유낙하: g, h 슬라이더로 낙하시간 t = √(2h/g) + 도달속도 v = √(2gh)
// 단진자: 길이 L 변화에 따른 주기 T = 2π√(L/g) — 등시성 시각화

import { useEffect, useMemo, useRef, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

const W = 360;
const H = 220;

export function PendulumFreefallSimulator() {
  const [mode, setMode] = useState<'fall' | 'pendulum'>('fall');
  const [g, setG] = useState(9.8);
  const [height, setHeight] = useState(80);
  const [length, setLength] = useState(1.0); // m
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fallTime = useMemo(() => Math.sqrt((2 * height) / g), [g, height]);
  const fallVelocity = useMemo(() => Math.sqrt(2 * g * height), [g, height]);
  const period = useMemo(() => 2 * Math.PI * Math.sqrt(length / g), [g, length]);

  useEffect(() => {
    if (!running) return;
    timerRef.current = setInterval(() => {
      setTime((t) => {
        if (mode === 'fall' && t >= fallTime) {
          setRunning(false);
          return fallTime;
        }
        return t + 0.04;
      });
    }, 30);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [running, mode, fallTime]);

  const reset = () => {
    setRunning(false);
    setTime(0);
  };

  // 자유낙하: y(t) = ½g t²
  const fallY = Math.min(0.5 * g * time * time, height);
  const fallProgress = Math.min(fallY / height, 1);
  const ballY = 30 + (H - 60) * fallProgress;

  // 진자: θ(t) = θ₀ cos(2π t / T), 작은 각도 가정
  const theta0 = 0.4; // 라디안 (~23도)
  const theta = theta0 * Math.cos((2 * Math.PI * time) / period);
  const pivotX = W / 2;
  const pivotY = 30;
  const pxRange = 140;
  const bobX = pivotX + Math.sin(theta) * pxRange * (length / 2);
  const bobY = pivotY + Math.cos(theta) * pxRange * (length / 2);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            setMode('fall');
            reset();
          }}
          className={`px-4 py-2 rounded-lg font-medium min-h-[44px] flex-1 ${
            mode === 'fall' ? 'bg-emerald-600 text-white' : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
          }`}
        >
          🍎 자유낙하
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('pendulum');
            reset();
          }}
          className={`px-4 py-2 rounded-lg font-medium min-h-[44px] flex-1 ${
            mode === 'pendulum' ? 'bg-emerald-600 text-white' : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
          }`}
        >
          🕰 단진자
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <SliderRow
          label="🌍 중력가속도 g"
          value={g}
          min={1.6}
          max={24}
          step={0.1}
          onChange={(v) => {
            setG(v);
            reset();
          }}
          unit=" m/s²"
          format={(v) => v.toFixed(1)}
        />
        {mode === 'fall' ? (
          <SliderRow
            label="📏 낙하 높이 h"
            value={height}
            min={1}
            max={300}
            step={1}
            onChange={(v) => {
              setHeight(v);
              reset();
            }}
            unit=" m"
            format={(v) => v.toFixed(0)}
          />
        ) : (
          <SliderRow
            label="📏 진자 길이 L"
            value={length}
            min={0.2}
            max={4}
            step={0.05}
            onChange={(v) => {
              setLength(v);
              reset();
            }}
            unit=" m"
            format={(v) => v.toFixed(2)}
          />
        )}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            if (mode === 'fall' && time >= fallTime) reset();
            setRunning((r) => !r);
          }}
          className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium min-h-[44px]"
        >
          {running ? '⏸ 정지' : '▶️ 시작'}
        </button>
        <button
          type="button"
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium min-h-[44px]"
        >
          처음으로
        </button>
      </div>

      <div className="rounded-xl bg-gradient-to-b from-sky-100 to-emerald-100 dark:from-zinc-900 dark:to-zinc-800 p-3 border border-zinc-200 dark:border-zinc-700">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="물리 시뮬레이션">
          {mode === 'fall' ? (
            <>
              <line x1={W / 2 - 50} y1={30} x2={W / 2 + 50} y2={30} stroke="currentColor" strokeWidth={2} />
              <line
                x1={W / 2}
                y1={30}
                x2={W / 2}
                y2={H - 30}
                stroke="currentColor"
                strokeOpacity={0.2}
                strokeDasharray="3 3"
              />
              <line x1={W / 2 - 60} y1={H - 30} x2={W / 2 + 60} y2={H - 30} stroke="#65a30d" strokeWidth={3} />
              <circle cx={W / 2} cy={ballY} r={10} fill="#dc2626" />
              <text x={W / 2 + 18} y={ballY + 4} fontSize="10" fill="currentColor">
                {fallY.toFixed(1)} m
              </text>
            </>
          ) : (
            <>
              <line x1={W / 2 - 60} y1={30} x2={W / 2 + 60} y2={30} stroke="currentColor" strokeWidth={2} />
              <line x1={pivotX} y1={pivotY} x2={bobX} y2={bobY} stroke="currentColor" strokeWidth={1.5} />
              <circle cx={bobX} cy={bobY} r={12} fill="#dc2626" />
              <circle cx={pivotX} cy={pivotY} r={3} fill="currentColor" />
              <text x={W / 2} y={H - 12} textAnchor="middle" fontSize="10" fill="currentColor" opacity={0.6}>
                각도 {((theta * 180) / Math.PI).toFixed(1)}°
              </text>
            </>
          )}
        </svg>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
        {mode === 'fall' ? (
          <>
            <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800 p-3">
              <div className="text-xs text-zinc-500 dark:text-zinc-400">낙하시간</div>
              <div className="font-bold">{fallTime.toFixed(2)} 초</div>
            </div>
            <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800 p-3">
              <div className="text-xs text-zinc-500 dark:text-zinc-400">도달속도</div>
              <div className="font-bold">{fallVelocity.toFixed(1)} m/s</div>
            </div>
            <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800 p-3">
              <div className="text-xs text-zinc-500 dark:text-zinc-400">현재 시간</div>
              <div className="font-bold">{time.toFixed(2)} s</div>
            </div>
          </>
        ) : (
          <>
            <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800 p-3">
              <div className="text-xs text-zinc-500 dark:text-zinc-400">주기 T</div>
              <div className="font-bold">{period.toFixed(2)} 초</div>
            </div>
            <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800 p-3">
              <div className="text-xs text-zinc-500 dark:text-zinc-400">진동수 f</div>
              <div className="font-bold">{(1 / period).toFixed(3)} Hz</div>
            </div>
            <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800 p-3">
              <div className="text-xs text-zinc-500 dark:text-zinc-400">현재 시간</div>
              <div className="font-bold">{time.toFixed(2)} s</div>
            </div>
          </>
        )}
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        💡 자유낙하 t = √(2h/g), 단진자 T = 2π√(L/g) — 둘 다 질량(m)이 없어요. 갈릴레이가 「피사의 사탑에서 깃털과 쇠공이 동시에 떨어진다」고 한 것이 핵심.
      </div>
    </div>
  );
}
