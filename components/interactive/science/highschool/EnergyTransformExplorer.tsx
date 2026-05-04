'use client';

// S-PHY-03 일과 에너지 — 롤러코스터 위치에너지↔운동에너지 변환 시각화.

import { useEffect, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

const G = 9.8;

export function EnergyTransformExplorer() {
  const [h0, setH0] = useState(40); // 출발 높이 (m)
  const [mass, setMass] = useState(500); // 질량 (kg)
  const [mu, setMu] = useState(0.0); // 마찰계수
  const [t, setT] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setT((p) => (p >= 1 ? 0 : p + 0.01)), 50);
    return () => clearInterval(id);
  }, [running]);

  // 코스 (sin 곡선 기반): 0~1 진행률에 따른 위치
  const W = 360;
  const H = 220;
  const padX = 24;
  const padY = 24;

  const profile = (x: number) => {
    // x: 0~1 → 높이 비율
    return 0.5 + 0.5 * Math.cos(x * Math.PI * 2 - Math.PI);
  };

  const points: { x: number; y: number; h: number }[] = [];
  const SAMPLES = 80;
  for (let i = 0; i <= SAMPLES; i++) {
    const xn = i / SAMPLES;
    const hn = 1 - profile(xn); // 시작이 높음 → 가운데가 골 → 끝이 다시 올라감(작게)
    const adjusted = hn * 0.7 + 0.05;
    const px = padX + xn * (W - padX * 2);
    const py = padY + adjusted * (H - padY * 2);
    points.push({ x: px, y: py, h: h0 * (1 - adjusted) });
  }

  const cur = points[Math.min(SAMPLES, Math.round(t * SAMPLES))];
  const curHeight = cur ? Math.max(0, h0 - (h0 - cur.h)) : 0;
  const heightAtT = curHeight; // 단순화
  // 에너지 보존: 1/2 mv² = mgh0 - mgh - μmg·s
  const distance = t * 100; // 상수 가정 거리
  const ePotential = mass * G * heightAtT;
  const eFriction = mu * mass * G * distance;
  const eMechanicalLoss = mass * G * h0 - ePotential - eFriction;
  const eKinetic = Math.max(0, eMechanicalLoss);
  const v = Math.sqrt((2 * eKinetic) / mass);

  const eTotal = mass * G * h0;
  const pctK = eTotal > 0 ? (eKinetic / eTotal) * 100 : 0;
  const pctP = eTotal > 0 ? (ePotential / eTotal) * 100 : 0;
  const pctF = eTotal > 0 ? (eFriction / eTotal) * 100 : 0;

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          높이가 줄면 속도가 빨라져요 — 에너지 보존
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          마찰이 없으면 위치에너지(mgh) + 운동에너지(½mv²)는 항상 일정.
          마찰이 있으면 일부가 열로 빠져나가요.
        </p>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="롤러코스터 트랙">
          <path d={path} stroke="#4b5563" strokeWidth={3} fill="none" />
          {cur && (
            <circle cx={cur.x} cy={cur.y - 10} r={9} fill="#dc2626" stroke="#fff" strokeWidth={2} />
          )}
          {/* 높이 표시선 */}
          {cur && (
            <>
              <line x1={cur.x} y1={cur.y - 10} x2={cur.x} y2={H - padY} stroke="#10b981" strokeDasharray="3 3" />
              <text x={cur.x + 6} y={cur.y + 8} fontSize={11} fill="#10b981" fontWeight={600}>
                h ≈ {heightAtT.toFixed(1)} m
              </text>
            </>
          )}
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div className="bg-blue-50 dark:bg-blue-950/40 rounded-lg p-2">
          <div className="text-xs text-blue-700 dark:text-blue-300">운동에너지</div>
          <div className="font-mono font-bold text-blue-700 dark:text-blue-300">{(eKinetic / 1000).toFixed(1)} kJ</div>
          <div className="text-[10px] text-zinc-500">{pctK.toFixed(0)}%</div>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-lg p-2">
          <div className="text-xs text-emerald-700 dark:text-emerald-300">위치에너지</div>
          <div className="font-mono font-bold text-emerald-700 dark:text-emerald-300">{(ePotential / 1000).toFixed(1)} kJ</div>
          <div className="text-[10px] text-zinc-500">{pctP.toFixed(0)}%</div>
        </div>
        <div className="bg-orange-50 dark:bg-orange-950/40 rounded-lg p-2">
          <div className="text-xs text-orange-700 dark:text-orange-300">마찰열</div>
          <div className="font-mono font-bold text-orange-700 dark:text-orange-300">{(eFriction / 1000).toFixed(1)} kJ</div>
          <div className="text-[10px] text-zinc-500">{pctF.toFixed(0)}%</div>
        </div>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm">
        <div className="flex justify-between">
          <span className="text-zinc-600 dark:text-zinc-300">현재 속도</span>
          <span className="font-mono font-bold text-red-500">{v.toFixed(1)} m/s</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-600 dark:text-zinc-300">총 역학적 에너지</span>
          <span className="font-mono">{(eTotal / 1000).toFixed(1)} kJ</span>
        </div>
      </div>

      <SliderRow label="출발 높이" value={h0} min={5} max={80} step={1} onChange={setH0} unit=" m" />
      <SliderRow label="질량" value={mass} min={100} max={1500} step={50} onChange={setMass} unit=" kg" />
      <SliderRow label="마찰계수 μ" value={mu} min={0} max={0.4} step={0.01} onChange={setMu} />

      <button
        type="button"
        onClick={() => setRunning((p) => !p)}
        className="w-full min-h-[44px] rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 active:scale-[0.99]"
      >
        {running ? '⏸ 정지' : '▶ 재생'}
      </button>
    </div>
  );
}
