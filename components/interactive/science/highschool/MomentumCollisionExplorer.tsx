'use client';

// S-PHY-04 운동량·충격량 — 1차원 충돌 시뮬 (탄성/완전비탄성).

import { useEffect, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

type CollisionType = 'elastic' | 'inelastic';

export function MomentumCollisionExplorer() {
  const [m1, setM1] = useState(2);
  const [m2, setM2] = useState(3);
  const [v1i, setV1i] = useState(4);
  const [v2i, setV2i] = useState(-1);
  const [type, setType] = useState<CollisionType>('elastic');
  const [t, setT] = useState(0);
  const [running, setRunning] = useState(true);

  // 충돌 후 속도 계산
  const computeFinal = () => {
    const totalP = m1 * v1i + m2 * v2i;
    if (type === 'inelastic') {
      const v = totalP / (m1 + m2);
      return { v1f: v, v2f: v };
    }
    // 1D 탄성충돌
    const v1f = ((m1 - m2) * v1i + 2 * m2 * v2i) / (m1 + m2);
    const v2f = ((m2 - m1) * v2i + 2 * m1 * v1i) / (m1 + m2);
    return { v1f, v2f };
  };

  const { v1f, v2f } = computeFinal();

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setT((p) => (p >= 6 ? 0 : p + 0.05)), 50);
    return () => clearInterval(id);
  }, [running]);

  const W = 360;
  const H = 140;
  const tCollide = 2.5; // 충돌 시점
  const x0_1 = 60;
  const x0_2 = 280;
  const SCALE = 12;

  let x1: number;
  let x2: number;
  if (t < tCollide) {
    x1 = x0_1 + v1i * t * SCALE;
    x2 = x0_2 + v2i * t * SCALE;
  } else {
    const xc1 = x0_1 + v1i * tCollide * SCALE;
    const xc2 = x0_2 + v2i * tCollide * SCALE;
    x1 = xc1 + v1f * (t - tCollide) * SCALE;
    x2 = xc2 + v2f * (t - tCollide) * SCALE;
  }

  const pBefore = m1 * v1i + m2 * v2i;
  const pAfter = m1 * v1f + m2 * v2f;
  const kBefore = 0.5 * m1 * v1i ** 2 + 0.5 * m2 * v2i ** 2;
  const kAfter = 0.5 * m1 * v1f ** 2 + 0.5 * m2 * v2f ** 2;
  const kLossPct = kBefore > 0 ? ((kBefore - kAfter) / kBefore) * 100 : 0;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          충돌해도 운동량 합은 일정
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          외력이 없으면 충돌 전후 운동량(p = mv)의 합은 보존돼요. 운동에너지는 비탄성 충돌일수록 손실이 커요.
        </p>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="충돌 시뮬레이션">
          <line x1={0} y1={H * 0.7} x2={W} y2={H * 0.7} stroke="#9ca3af" strokeWidth={1} />
          <rect
            x={Math.max(0, Math.min(W - 30, x1 - 15))}
            y={H * 0.7 - m1 * 8}
            width={30}
            height={m1 * 8}
            rx={4}
            fill="#3b82f6"
          />
          <text x={Math.max(15, Math.min(W - 15, x1))} y={H * 0.7 - m1 * 8 - 4} textAnchor="middle" fontSize={11} fill="#3b82f6" fontWeight={700}>
            {m1}kg
          </text>
          <rect
            x={Math.max(0, Math.min(W - 36, x2 - 18))}
            y={H * 0.7 - m2 * 8}
            width={36}
            height={m2 * 8}
            rx={4}
            fill="#dc2626"
          />
          <text x={Math.max(18, Math.min(W - 18, x2))} y={H * 0.7 - m2 * 8 - 4} textAnchor="middle" fontSize={11} fill="#dc2626" fontWeight={700}>
            {m2}kg
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        {(['elastic', 'inelastic'] as CollisionType[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setType(id);
              setT(0);
            }}
            className={`min-h-[44px] rounded-lg px-3 ${
              type === id
                ? 'bg-green-600 text-white font-semibold'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
            }`}
          >
            {id === 'elastic' ? '탄성충돌 (E 보존)' : '완전비탄성 (붙음)'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3">
          <div className="font-bold text-zinc-700 dark:text-zinc-300 mb-1">충돌 전</div>
          <div>운동량 합: <span className="font-mono">{pBefore.toFixed(2)}</span> kg·m/s</div>
          <div>운동E 합: <span className="font-mono">{kBefore.toFixed(2)}</span> J</div>
        </div>
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3">
          <div className="font-bold text-zinc-700 dark:text-zinc-300 mb-1">충돌 후</div>
          <div>운동량 합: <span className="font-mono">{pAfter.toFixed(2)}</span> kg·m/s</div>
          <div>운동E 합: <span className="font-mono">{kAfter.toFixed(2)}</span> J</div>
          <div className="text-orange-600 dark:text-orange-400 mt-1">
            손실 {kLossPct.toFixed(1)}%
          </div>
        </div>
      </div>

      <SliderRow label="물체1 질량 m₁" value={m1} min={1} max={8} step={1} onChange={setM1} unit=" kg" />
      <SliderRow label="물체2 질량 m₂" value={m2} min={1} max={8} step={1} onChange={setM2} unit=" kg" />
      <SliderRow label="물체1 초속도 v₁" value={v1i} min={-5} max={8} step={0.5} onChange={setV1i} unit=" m/s" />
      <SliderRow label="물체2 초속도 v₂" value={v2i} min={-5} max={8} step={0.5} onChange={setV2i} unit=" m/s" />

      <button
        type="button"
        onClick={() => {
          setT(0);
          setRunning(true);
        }}
        className="w-full min-h-[44px] rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
      >
        ▶ 다시 재생
      </button>
    </div>
  );
}
