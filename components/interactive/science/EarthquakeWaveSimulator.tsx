'use client';

// S-EAR-05 자연재해 — 지진파 P·S파 도착 시간 차이로 진앙 거리 계산.
// P파 속도 ~6 km/s, S파 ~3.5 km/s. (수능에서 오우치(大谷) 공식 t_PS = (Vp×Vs)/(Vp-Vs) × Δt 등장)

import { useEffect, useMemo, useRef, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

const VP = 6.0; // P파 km/s
const VS = 3.5; // S파 km/s

const W = 360;
const H = 180;
const PAD = 30;

export function EarthquakeWaveSimulator() {
  const [distance, setDistance] = useState(120); // km
  const [magnitude, setMagnitude] = useState(5.5);
  const [time, setTime] = useState(0); // 초
  const [running, setRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    timerRef.current = setInterval(() => {
      setTime((t) => {
        if (t > distance / VS + 5) {
          setRunning(false);
          return t;
        }
        return t + 0.4;
      });
    }, 80);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [running, distance]);

  const reset = () => {
    setRunning(false);
    setTime(0);
  };

  const tP = distance / VP;
  const tS = distance / VS;
  const ps = tS - tP; // P-S 시간차
  // 거리 역산: Δ = (Vp Vs)/(Vp - Vs) × (tS - tP)
  const psFactor = (VP * VS) / (VP - VS);

  // P파 진폭 = 작음, S파 진폭 = 큼. 표층파(L파)는 단순화 생략
  const xScale = (t: number) => PAD + ((W - PAD * 2) * t) / Math.max(tS + 5, 30);
  const baseY = H / 2;

  // 시그널 그리기 (현재 시간 t까지)
  const samples = 200;
  const signalPath = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i <= samples; i++) {
      const t = (i / samples) * time;
      let amp = 0;
      if (t > tP && t < tP + 4) {
        amp = Math.sin((t - tP) * 8) * Math.exp(-(t - tP) * 0.4) * (3 + magnitude);
      }
      if (t > tS && t < tS + 6) {
        amp += Math.sin((t - tS) * 5) * Math.exp(-(t - tS) * 0.3) * (10 + magnitude * 3);
      }
      pts.push(`${i === 0 ? 'M' : 'L'}${xScale(t).toFixed(1)},${(baseY - amp).toFixed(1)}`);
    }
    return pts.join(' ');
  }, [time, tP, tS, magnitude]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <SliderRow
          label="📍 진앙 거리 (km)"
          value={distance}
          min={20}
          max={500}
          step={10}
          onChange={(v) => {
            setDistance(v);
            reset();
          }}
          unit=" km"
          format={(v) => v.toFixed(0)}
        />
        <SliderRow
          label="💥 규모 (M)"
          value={magnitude}
          min={3}
          max={8}
          step={0.1}
          onChange={setMagnitude}
          format={(v) => v.toFixed(1)}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            if (time > tS + 4) reset();
            setRunning((r) => !r);
          }}
          className="px-4 py-2 rounded-lg bg-rose-600 text-white font-medium min-h-[44px]"
        >
          {running ? '⏸ 일시정지' : time > tS + 4 ? '🔁 다시' : '▶️ 지진 발생'}
        </button>
        <button
          type="button"
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium min-h-[44px]"
        >
          초기화
        </button>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-700">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="지진계 P·S파 신호">
          {/* 기준선 */}
          <line x1={PAD} y1={baseY} x2={W - PAD} y2={baseY} stroke="currentColor" strokeOpacity={0.2} />
          {/* P파 도달 */}
          {time > tP && (
            <line
              x1={xScale(tP)}
              y1={PAD}
              x2={xScale(tP)}
              y2={H - PAD}
              stroke="#3b82f6"
              strokeWidth={1.5}
              strokeDasharray="3 3"
            />
          )}
          {/* S파 도달 */}
          {time > tS && (
            <line
              x1={xScale(tS)}
              y1={PAD}
              x2={xScale(tS)}
              y2={H - PAD}
              stroke="#ef4444"
              strokeWidth={1.5}
              strokeDasharray="3 3"
            />
          )}
          <path d={signalPath} stroke="#10b981" strokeWidth={1.4} fill="none" />
          {/* 시간축 */}
          {[0, 10, 20, 30, 40, 50].map((t) => {
            if (t > tS + 5) return null;
            return (
              <g key={t}>
                <line x1={xScale(t)} y1={H - PAD} x2={xScale(t)} y2={H - PAD + 4} stroke="currentColor" strokeOpacity={0.4} />
                <text x={xScale(t)} y={H - 8} textAnchor="middle" fontSize="9" fill="currentColor" opacity={0.6}>
                  {t}s
                </text>
              </g>
            );
          })}
          {time > tP && (
            <text x={xScale(tP)} y={PAD - 4} textAnchor="middle" fontSize="10" fill="#3b82f6" fontWeight="bold">
              P
            </text>
          )}
          {time > tS && (
            <text x={xScale(tS)} y={PAD - 4} textAnchor="middle" fontSize="10" fill="#ef4444" fontWeight="bold">
              S
            </text>
          )}
        </svg>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/40 p-3 border border-blue-200 dark:border-blue-800">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">P파 도달</div>
          <div className="font-bold">{tP.toFixed(1)} 초</div>
        </div>
        <div className="rounded-lg bg-rose-50 dark:bg-rose-950/40 p-3 border border-rose-200 dark:border-rose-800">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">S파 도달</div>
          <div className="font-bold">{tS.toFixed(1)} 초</div>
        </div>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/40 p-3 border border-amber-200 dark:border-amber-800">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">P-S 시간차</div>
          <div className="font-bold">{ps.toFixed(1)} 초</div>
        </div>
        <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/40 p-3 border border-emerald-200 dark:border-emerald-800">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">역산 거리</div>
          <div className="font-bold">{(psFactor * ps).toFixed(0)} km</div>
        </div>
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        💡 진앙 거리 = (Vp × Vs)/(Vp − Vs) × (tS − tP) ≈ {psFactor.toFixed(2)} × ΔtPS.
        세 관측소의 거리 원이 만나는 곳이 진앙. 「긴급재난문자」가 도달하는 시점은 P파 감지 후 S파(큰 흔들림) 도달 직전 — 이 차이가 클수록 경보가 빠르게 작동해요.
      </div>
    </div>
  );
}
