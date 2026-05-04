'use client';

// S5-MA-01 용해와 용액 — 입자 시각화 + 농도 (질량 퍼센트).

import { useMemo, useState } from 'react';

export function SolutionParticleSimulator() {
  const [solute, setSolute] = useState(20);
  const [water, setWater] = useState(100);

  const total = solute + water;
  const concentration = (solute / total) * 100;

  const particles = useMemo(() => {
    const count = Math.min(solute, 50);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 20 + Math.random() * 200,
      y: 50 + Math.random() * 130,
    }));
  }, [solute]);

  const tone =
    concentration < 10 ? '묽은' : concentration < 25 ? '보통' : concentration < 40 ? '진한' : '매우 진한';

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          용해와 농도 — 얼마나 진해?
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          물(<strong>용매</strong>)에 설탕(<strong>용질</strong>)을 녹이면 <strong>용액</strong>이 돼요.
          용질이 많을수록 진한 용액이 됩니다.
        </p>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4 flex justify-center">
        <svg viewBox="0 0 240 220" className="w-full max-w-[280px]">
          <path d="M 30 30 L 30 200 Q 30 210 40 210 L 200 210 Q 210 210 210 200 L 210 30" fill="none" stroke="#475569" strokeWidth="2" />

          <rect
            x="32"
            y={30 + (180 - 180 * Math.min(1, water / 100))}
            width="176"
            height={180 * Math.min(1, water / 100)}
            fill={`rgba(96, 165, 250, ${0.3 + (concentration / 100) * 0.4})`}
            rx="2"
          />

          {particles.map((p) => (
            <circle key={p.id} cx={p.x} cy={p.y} r="3" fill="#fbbf24" stroke="#d97706" strokeWidth="0.6" />
          ))}

          <text x="120" y="22" textAnchor="middle" fontSize="11" fill="#64748b">
            농도 {concentration.toFixed(1)}%
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            용질(설탕) {solute}g
          </div>
          <input
            type="range"
            min={0}
            max={50}
            value={solute}
            onChange={(e) => setSolute(Number(e.target.value))}
            className="w-full h-3 cursor-pointer"
            aria-label="용질"
          />
        </div>
        <div className="space-y-1">
          <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            물(용매) {water}g
          </div>
          <input
            type="range"
            min={50}
            max={200}
            value={water}
            onChange={(e) => setWater(Number(e.target.value))}
            className="w-full h-3 cursor-pointer"
            aria-label="용매"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-3 text-center">
          <div className="text-xs text-zinc-500">용액 질량</div>
          <div className="text-lg font-bold text-amber-700 dark:text-amber-300">{total}g</div>
        </div>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-3 text-center">
          <div className="text-xs text-zinc-500">농도</div>
          <div className="text-lg font-bold text-blue-700 dark:text-blue-300">{concentration.toFixed(1)}%</div>
        </div>
        <div className="rounded-lg bg-green-50 dark:bg-green-950/30 p-3 text-center">
          <div className="text-xs text-zinc-500">정도</div>
          <div className="text-lg font-bold text-green-700 dark:text-green-300">{tone}</div>
        </div>
      </div>

      <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950/40 p-3 text-xs text-zinc-600 dark:text-zinc-400">
        <strong>질량 퍼센트 농도</strong> = (용질 질량 ÷ 용액 질량) × 100 = ({solute} ÷ {total}) × 100 = {concentration.toFixed(2)}%
      </div>
    </div>
  );
}
