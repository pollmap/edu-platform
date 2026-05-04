'use client';

// S6-LI-02 식물의 구조와 기능 — 광합성 입출력 슬라이더 시뮬레이터.

import { useMemo, useState } from 'react';

export function PhotosynthesisExplorer() {
  const [light, setLight] = useState(70);
  const [water, setWater] = useState(70);
  const [co2, setCo2] = useState(70);

  const rate = useMemo(() => {
    const limiting = Math.min(light, water, co2);
    return Math.round(limiting * 1.0);
  }, [light, water, co2]);

  const oxygen = Math.round(rate * 0.6);
  const glucose = Math.round(rate * 0.4);
  const limitingFactor =
    light <= water && light <= co2 ? '햇빛' : water <= co2 ? '물' : '이산화탄소';

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          광합성 — 햇빛이 음식이 되는 마법
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          식물은 잎에서 <strong>햇빛 + 물 + 이산화탄소</strong>로 <strong>포도당 + 산소</strong>를 만들어요.
          각 입력을 조절해 보세요.
        </p>
      </div>

      <div className="rounded-xl bg-gradient-to-b from-sky-100 to-green-100 dark:from-sky-950/30 dark:to-green-950/30 border border-zinc-200 dark:border-zinc-800 p-4">
        <svg viewBox="0 0 400 240" className="w-full max-w-[480px] mx-auto block">
          <circle cx="60" cy="50" r="22" fill={`rgba(253, 224, 71, ${0.3 + light / 200})`} />
          <circle cx="60" cy="50" r="14" fill="#fde047" />
          {[...Array(8)].map((_, i) => (
            <line
              key={i}
              x1={60 + Math.cos((i * Math.PI) / 4) * 22}
              y1={50 + Math.sin((i * Math.PI) / 4) * 22}
              x2={60 + Math.cos((i * Math.PI) / 4) * (28 + light / 8)}
              y2={50 + Math.sin((i * Math.PI) / 4) * (28 + light / 8)}
              stroke="#facc15"
              strokeWidth="2"
              opacity={light / 100}
            />
          ))}

          <ellipse cx="200" cy="120" rx="80" ry="50" fill="#16a34a" />
          <ellipse cx="200" cy="120" rx="80" ry="50" fill="none" stroke="#15803d" strokeWidth="2" />
          <path d="M 200 170 L 200 220" stroke="#78350f" strokeWidth="6" />

          <ellipse cx="200" cy="225" rx="50" ry="8" fill="#92400e" opacity="0.3" />
          <text x="160" y="230" fontSize="9" fill="#78350f" opacity={water / 100}>
            💧 뿌리에서 물 흡수
          </text>

          <text x="320" y="60" fontSize="11" fill="#0369a1" opacity={co2 / 100}>
            CO₂ →
          </text>
          <text x="40" y="200" fontSize="11" fill="#16a34a" opacity={oxygen / 60}>
            ← O₂
          </text>
          <text x="40" y="215" fontSize="9" fill="#16a34a" opacity={glucose / 40}>
            (포도당은 잎에 저장)
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { label: '햇빛', value: light, set: setLight, color: 'amber' },
          { label: '물', value: water, set: setWater, color: 'blue' },
          { label: '이산화탄소', value: co2, set: setCo2, color: 'sky' },
        ].map((s) => (
          <div key={s.label} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">{s.label}</span>
              <span className="text-zinc-500">{s.value}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={s.value}
              onChange={(e) => s.set(Number(e.target.value))}
              className="w-full h-3 cursor-pointer"
              aria-label={s.label}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-400 p-3 text-center">
          <div className="text-xs text-zinc-500">산소 (O₂)</div>
          <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{oxygen}</div>
        </div>
        <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-400 p-3 text-center">
          <div className="text-xs text-zinc-500">포도당</div>
          <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">{glucose}</div>
        </div>
      </div>

      <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950/40 p-3 text-sm">
        <strong className="text-zinc-900 dark:text-zinc-100">제한 요인:</strong>{' '}
        <span className="text-red-600 dark:text-red-400 font-bold">{limitingFactor}</span>{' '}
        <span className="text-zinc-600 dark:text-zinc-400">
          — 셋 중 가장 적은 게 광합성 속도를 정해요 (리비히의 최소량 법칙).
        </span>
      </div>
    </div>
  );
}
