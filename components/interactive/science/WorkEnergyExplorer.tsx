'use client';

// S9-ME-02 일과 역학적 에너지 — 롤러코스터 곡선에서 위치/운동에너지 변환.
// 마찰 없는 이상 시스템에서 역학적 에너지(Ep+Ek)는 보존됨을 본다.

import { useEffect, useMemo, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

const W = 380;
const H = 220;
const G = 9.8;

// 트랙: 사인 곡선 + 시작 높이
function trackHeight(x: number, h0: number) {
  // x: 0~W (가로)
  // 시작 0에서 h0, 중앙에서 0, 다시 절반높이로 올라가는 형태
  const t = x / W; // 0~1
  if (t < 0.5) {
    return h0 * (1 - t * 2); // 선형 하강
  }
  return h0 * 0.5 * (1 - Math.cos((t - 0.5) * 4 * Math.PI)) * 0.5;
}

export function WorkEnergyExplorer() {
  const [h0, setH0] = useState(80); // 시작 높이 m
  const [mass, setMass] = useState(50); // kg
  const [t, setT] = useState(0); // 0~1 트랙 위치
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setT((prev) => {
        const next = prev + 0.012;
        if (next >= 1) {
          setRunning(false);
          return 1;
        }
        return next;
      });
    }, 32);
    return () => clearInterval(id);
  }, [running]);

  const x = t * W;
  const h = trackHeight(x, h0);
  const Ep = mass * G * h;
  // 에너지 보존: Ek = E_total - Ep, E_total = m*g*h0
  const Etotal = mass * G * h0;
  const Ek = Math.max(0, Etotal - Ep);
  const v = Math.sqrt((2 * Ek) / mass);

  // 트랙 path (그리기용)
  const trackPath = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i <= 60; i++) {
      const xx = (i / 60) * W;
      const hh = trackHeight(xx, h0);
      const yy = H - 30 - (hh / 100) * (H - 60);
      pts.push(`${i === 0 ? 'M' : 'L'}${xx.toFixed(1)},${yy.toFixed(1)}`);
    }
    return pts.join(' ');
  }, [h0]);

  const cartY = H - 30 - (h / 100) * (H - 60);

  const epPct = (Ep / Etotal) * 100;
  const ekPct = (Ek / Etotal) * 100;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <SliderRow
          label="시작 높이 h₀ (m)"
          value={h0}
          min={20}
          max={100}
          step={5}
          onChange={(v) => {
            setH0(v);
            setT(0);
            setRunning(false);
          }}
          format={(v) => `${v.toFixed(0)} m`}
        />
        <SliderRow
          label="질량 m (kg)"
          value={mass}
          min={10}
          max={200}
          step={5}
          onChange={(v) => setMass(v)}
          format={(v) => `${v.toFixed(0)} kg`}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            if (t >= 1) setT(0);
            setRunning((r) => !r);
          }}
          className="flex-1 px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium min-h-[44px]"
        >
          {running ? '⏸ 정지' : t >= 1 ? '🔁 다시' : '▶️ 출발'}
        </button>
        <button
          type="button"
          onClick={() => {
            setT(0);
            setRunning(false);
          }}
          className="px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-700 font-medium min-h-[44px]"
        >
          초기화
        </button>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-700">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="롤러코스터 트랙">
          {/* 지면 */}
          <line x1={0} y1={H - 30} x2={W} y2={H - 30} stroke="currentColor" strokeOpacity={0.3} />
          {/* 트랙 */}
          <path d={trackPath} stroke="#10b981" strokeWidth={2.5} fill="none" />
          {/* 카트 */}
          <circle cx={x} cy={cartY} r={8} fill="#fbbf24" stroke="#92400e" strokeWidth={1.5} />
          {/* 높이 표시선 */}
          <line x1={x} y1={cartY} x2={x} y2={H - 30} stroke="#3b82f6" strokeOpacity={0.4} strokeDasharray="3 3" />
          {/* 라벨 */}
          <text x={6} y={14} fontSize="10" fill="currentColor" opacity={0.7}>
            높이 h = {h.toFixed(1)} m
          </text>
          <text x={W - 6} y={14} textAnchor="end" fontSize="10" fill="currentColor" opacity={0.7}>
            속력 v = {v.toFixed(1)} m/s
          </text>
        </svg>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-blue-700 dark:text-blue-400 w-20">위치 Ep</span>
          <div className="flex-1 h-5 rounded bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{ width: `${epPct.toFixed(1)}%` }}
            />
          </div>
          <span className="text-xs font-mono w-24 text-right">{(Ep / 1000).toFixed(2)} kJ</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 w-20">운동 Ek</span>
          <div className="flex-1 h-5 rounded bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-rose-500 transition-all"
              style={{ width: `${ekPct.toFixed(1)}%` }}
            />
          </div>
          <span className="text-xs font-mono w-24 text-right">{(Ek / 1000).toFixed(2)} kJ</span>
        </div>
        <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/30 p-2 text-center text-xs font-bold text-emerald-700 dark:text-emerald-300">
          총 역학적 에너지 = Ep + Ek = {(Etotal / 1000).toFixed(2)} kJ (보존)
        </div>
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        💡 위치에너지 Ep = m·g·h, 운동에너지 Ek = ½mv². 마찰을 무시하면 둘의 합은 항상 일정해요. 높이를
        잃은 만큼 속력을 얻고, 다시 올라갈 때 속력을 잃은 만큼 높이를 얻어요. 「에너지는 형태만 바뀌지 사라지지 않는다」.
      </div>
    </div>
  );
}
