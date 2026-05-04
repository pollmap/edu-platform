'use client';

// S5-ME-01 온도와 열 — 전도·대류·복사 3가지 열전달 방식 시뮬.

import { useEffect, useState } from 'react';

type Mode = 'conduction' | 'convection' | 'radiation';

const MODES: { id: Mode; label: string; example: string; medium: string; color: string }[] = [
  { id: 'conduction', label: '전도', example: '뜨거운 국에 담근 숟가락 손잡이가 뜨거워짐', medium: '고체 (직접 닿음)', color: 'red' },
  { id: 'convection', label: '대류', example: '에어컨 찬바람이 위에서 아래로, 난로 더운 공기는 위로', medium: '액체·기체 (이동)', color: 'blue' },
  { id: 'radiation', label: '복사', example: '햇빛, 모닥불에서 떨어져 있어도 따뜻함', medium: '진공·공기 (전자기파)', color: 'amber' },
];

export function HeatTransferExplorer() {
  const [mode, setMode] = useState<Mode>('conduction');
  const [tick, setTick] = useState(0);
  const current = MODES.find((m) => m.id === mode)!;

  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % 60), 80);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          열은 어떻게 전달될까? — 3가지 방법
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          버튼을 눌러서 <strong>전도·대류·복사</strong>가 어떻게 다른지 봐요.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={`px-2 py-3 text-sm rounded-md border min-h-[44px] font-medium ${
              mode === m.id
                ? 'bg-green-50 dark:bg-green-950/40 border-green-500 ring-2 ring-green-300 text-green-800 dark:text-green-200'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 overflow-hidden">
        <svg viewBox="0 0 400 240" className="w-full" role="img" aria-label={`${current.label} 시뮬`}>
          {mode === 'conduction' && (
            <g>
              <rect x="40" y="100" width="320" height="40" fill="#475569" />
              {[...Array(16)].map((_, i) => {
                const x = 50 + i * 20;
                const heat = Math.max(0, 1 - Math.abs(i - tick / 4) / 8);
                return (
                  <rect
                    key={i}
                    x={x}
                    y="100"
                    width="18"
                    height="40"
                    fill={`rgb(${239 * heat + 71 * (1 - heat)},${heat * 50 + 85},${(1 - heat) * 105 + 30})`}
                  />
                );
              })}
              <text x="60" y="90" fill="#fbbf24" fontSize="12" fontWeight="bold">불 (열원)</text>
              <text x="300" y="90" fill="#e2e8f0" fontSize="11">차가운 끝</text>
              <path d="M 50 160 L 50 180 M 70 160 L 70 180 M 90 160 L 90 180" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
              <text x="55" y="200" fill="#fb923c" fontSize="10">열원</text>
            </g>
          )}
          {mode === 'convection' && (
            <g>
              <rect x="60" y="40" width="280" height="180" fill="#1e293b" stroke="#475569" />
              <rect x="100" y="200" width="200" height="20" fill="#dc2626" />
              <text x="150" y="218" fill="white" fontSize="11" fontWeight="bold">난로 (뜨거움)</text>
              {[...Array(6)].map((_, i) => {
                const phase = (tick + i * 10) % 60;
                const x = 130 + (i % 3) * 60;
                const baseY = 200 - phase * 2.5;
                return (
                  <g key={i}>
                    <circle cx={x} cy={baseY} r="6" fill="#f87171" opacity={1 - phase / 60} />
                    <text x={x} y={baseY + 3} fontSize="8" textAnchor="middle" fill="white">↑</text>
                  </g>
                );
              })}
              {[...Array(4)].map((_, i) => {
                const phase = (tick + i * 12) % 60;
                const x = 90 + i * 60;
                const baseY = 60 + phase * 2.2;
                return (
                  <g key={`c${i}`}>
                    <circle cx={x} cy={baseY} r="6" fill="#60a5fa" opacity={1 - phase / 60} />
                    <text x={x} y={baseY + 3} fontSize="8" textAnchor="middle" fill="white">↓</text>
                  </g>
                );
              })}
              <text x="70" y="30" fill="#93c5fd" fontSize="11">차가운 공기 ↓</text>
              <text x="220" y="30" fill="#fca5a5" fontSize="11">더운 공기 ↑</text>
            </g>
          )}
          {mode === 'radiation' && (
            <g>
              <circle cx="80" cy="120" r="28" fill="#fbbf24" />
              <text x="80" y="125" fontSize="11" textAnchor="middle" fill="#7c2d12" fontWeight="bold">태양</text>
              {[...Array(8)].map((_, i) => {
                const phase = (tick + i * 7) % 60;
                const r = 30 + phase * 5;
                return (
                  <circle
                    key={i}
                    cx="80"
                    cy="120"
                    r={r}
                    fill="none"
                    stroke="#fde047"
                    strokeWidth="1.5"
                    opacity={Math.max(0, 0.6 - phase / 60)}
                  />
                );
              })}
              <rect x="320" y="90" width="50" height="60" fill="#3b82f6" rx="6" />
              <text x="345" y="125" fontSize="10" textAnchor="middle" fill="white">지구</text>
              <text x="200" y="60" fill="#fde047" fontSize="11" textAnchor="middle">매개체 없이 전자기파로 전달</text>
              <text x="200" y="200" fill="#94a3b8" fontSize="10" textAnchor="middle">진공의 우주 공간을 가로질러 옴</text>
            </g>
          )}
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
        <div className={`rounded-lg bg-${current.color}-50 dark:bg-${current.color}-950/30 p-3`}>
          <div className="text-xs text-zinc-500">매개체</div>
          <div className="font-semibold text-zinc-900 dark:text-zinc-100">{current.medium}</div>
        </div>
        <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800 p-3">
          <div className="text-xs text-zinc-500">예시</div>
          <div className="text-zinc-900 dark:text-zinc-100">{current.example}</div>
        </div>
      </div>

      <p className="text-xs text-zinc-500">
        ※ 일상에서는 보통 3가지가 동시에 일어나요. 예: 모닥불 — 불꽃 자체는 복사, 데워진 공기는 대류, 꼬챙이는 전도.
      </p>
    </div>
  );
}
