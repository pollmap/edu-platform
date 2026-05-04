'use client';

// M3-GM-03 들이와 무게 — 가상 계량컵·저울 + 단위 변환.

import { useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

const VOLUME_PRESETS = [
  { label: '컵 200mL', value: 200 },
  { label: '우유 1L', value: 1000 },
  { label: '주전자 1.5L', value: 1500 },
  { label: '양동이 5L', value: 5000 },
];

const WEIGHT_PRESETS = [
  { label: '연필 5g', value: 5 },
  { label: '사과 200g', value: 200 },
  { label: '책 1kg', value: 1000 },
  { label: '쌀 5kg', value: 5000 },
];

export function CapacityWeightExplorer() {
  const [volumeML, setVolumeML] = useState(1000);
  const [weightG, setWeightG] = useState(1000);

  const fillRatio = Math.min(volumeML / 5000, 1);
  const liter = volumeML / 1000;
  const lPart = Math.floor(liter);
  const mlPart = volumeML - lPart * 1000;

  const kgPart = Math.floor(weightG / 1000);
  const gPart = weightG - kgPart * 1000;

  const balanceTilt = Math.max(-15, Math.min(15, (weightG - 1000) / 200));

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">들이와 무게</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          들이는 통 안에 담을 수 있는 양(L·mL), 무게는 물체가 얼마나 무거운지(g·kg)를 나타내요.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 들이 */}
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4">
          <h3 className="font-semibold mb-3 text-blue-700 dark:text-blue-400">계량컵 (최대 5L)</h3>
          <svg viewBox="0 0 160 200" className="w-full max-w-[180px] mx-auto block">
            <path d="M 30 30 L 30 180 Q 30 190 40 190 L 120 190 Q 130 190 130 180 L 130 30" fill="none" stroke="#1e293b" strokeWidth="3" className="dark:stroke-zinc-300" />
            <rect
              x={32}
              y={30 + (1 - fillRatio) * 158}
              width={96}
              height={fillRatio * 158}
              fill="#3b82f6"
              opacity={0.6}
            />
            {[1, 2, 3, 4, 5].map((l) => {
              const y = 30 + (1 - l / 5) * 158;
              return (
                <g key={l}>
                  <line x1={30} y1={y} x2={45} y2={y} stroke="#64748b" strokeWidth="1.5" />
                  <text x={20} y={y + 4} fontSize="10" textAnchor="end" fill="#475569" className="dark:fill-zinc-400">
                    {l}L
                  </text>
                </g>
              );
            })}
          </svg>
          <SliderRow label="물의 양 (mL)" value={volumeML} min={0} max={5000} step={50} onChange={setVolumeML} format={(v) => String(v)} unit="mL" />
          <div className="flex flex-wrap gap-2 mt-3">
            {VOLUME_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setVolumeML(p.value)}
                className="px-2 py-1 border border-zinc-300 dark:border-zinc-700 rounded text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-center text-sm">
            <div className="rounded bg-blue-50 dark:bg-blue-900/30 p-2">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">밀리리터</p>
              <p className="font-mono font-bold text-blue-700 dark:text-blue-300">{volumeML} mL</p>
            </div>
            <div className="rounded bg-blue-50 dark:bg-blue-900/30 p-2">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">리터</p>
              <p className="font-mono font-bold text-blue-700 dark:text-blue-300">{lPart}L {mlPart}mL</p>
            </div>
          </div>
        </div>

        {/* 무게 */}
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4">
          <h3 className="font-semibold mb-3 text-blue-700 dark:text-blue-400">양팔 저울 (1kg 기준)</h3>
          <svg viewBox="0 0 220 180" className="w-full max-w-[240px] mx-auto block">
            <line x1={110} y1={160} x2={110} y2={70} stroke="#475569" strokeWidth="3" className="dark:stroke-zinc-400" />
            <g transform={`rotate(${balanceTilt} 110 70)`}>
              <line x1={20} y1={70} x2={200} y2={70} stroke="#1e293b" strokeWidth="3" className="dark:stroke-zinc-300" />
              <rect x={10} y={70} width={50} height={32} fill="#fbbf24" stroke="#92400e" strokeWidth="1.5" />
              <text x={35} y={90} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#451a03">
                {weightG}g
              </text>
              <rect x={160} y={70} width={50} height={32} fill="#a3e635" stroke="#3f6212" strokeWidth="1.5" />
              <text x={185} y={90} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1a2e05">
                1kg
              </text>
            </g>
            <polygon points="100,160 120,160 110,170" fill="#475569" />
          </svg>
          <SliderRow label="무게 (g)" value={weightG} min={0} max={5000} step={50} onChange={setWeightG} format={(v) => String(v)} unit="g" />
          <div className="flex flex-wrap gap-2 mt-3">
            {WEIGHT_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setWeightG(p.value)}
                className="px-2 py-1 border border-zinc-300 dark:border-zinc-700 rounded text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-center text-sm">
            <div className="rounded bg-blue-50 dark:bg-blue-900/30 p-2">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">그램</p>
              <p className="font-mono font-bold text-blue-700 dark:text-blue-300">{weightG} g</p>
            </div>
            <div className="rounded bg-blue-50 dark:bg-blue-900/30 p-2">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">킬로그램</p>
              <p className="font-mono font-bold text-blue-700 dark:text-blue-300">{kgPart}kg {gPart}g</p>
            </div>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
            저울이 기울어요. {weightG > 1000 ? '왼쪽이 무거워요' : weightG < 1000 ? '오른쪽이 무거워요' : '평평해요!'}
          </p>
        </div>
      </div>

      <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800 p-3 text-sm">
        <p><strong>1L = 1000mL</strong>, <strong>1kg = 1000g</strong> &mdash; 두 단위 모두 1000배씩 묶여 있어서 기억이 쉬워요.</p>
      </div>
    </div>
  );
}
