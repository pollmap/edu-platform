'use client';

// S7-ME-01 힘 — 중력·마찰·탄성·부력 4가지 힘 시뮬.

import { useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

type ForceMode = 'gravity' | 'friction' | 'elastic' | 'buoyancy';

const MODES: { id: ForceMode; label: string; desc: string; formula: string }[] = [
  { id: 'gravity', label: '중력', desc: '지구가 물체를 끌어당기는 힘', formula: 'F = mg (g ≈ 9.8 m/s²)' },
  { id: 'friction', label: '마찰력', desc: '두 면 사이에서 운동을 방해하는 힘', formula: 'f = μN' },
  { id: 'elastic', label: '탄성력', desc: '늘어나거나 줄어든 물체가 원래대로 돌아가려는 힘', formula: 'F = -kx' },
  { id: 'buoyancy', label: '부력', desc: '액체·기체가 물체를 위로 떠받치는 힘', formula: 'F = ρVg' },
];

export function ForceVectorExplorer() {
  const [mode, setMode] = useState<ForceMode>('gravity');
  const [mass, setMass] = useState(2);
  const [extra, setExtra] = useState(0.4);

  const current = MODES.find((m) => m.id === mode)!;
  const g = 9.8;
  let value = 0;
  let unit = 'N';

  switch (mode) {
    case 'gravity':
      value = mass * g;
      break;
    case 'friction':
      value = extra * (mass * g);
      break;
    case 'elastic':
      value = extra * mass * 50;
      break;
    case 'buoyancy':
      value = 1000 * (mass / 1000) * g * extra;
      break;
  }

  const arrowLen = Math.min(120, value * 2.5);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          힘은 화살표로 그릴 수 있어요
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          힘은 <strong>크기 + 방향</strong>을 모두 가져요(벡터). 4가지 힘을 비교해 봐요.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={`px-2 py-3 text-sm rounded-md border min-h-[44px] font-medium ${
              mode === m.id
                ? 'bg-green-50 dark:bg-green-950/40 border-green-500 ring-2 ring-green-300 text-green-800 dark:text-green-200'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
        <svg viewBox="0 0 400 240" className="w-full" role="img" aria-label={`${current.label} 시뮬`}>
          {mode === 'gravity' && (
            <g>
              <line x1="0" y1="200" x2="400" y2="200" stroke="#22c55e" strokeWidth="2" />
              <rect x="180" y={170 - mass * 6} width={40 + mass * 6} height={30 + mass * 6} fill="#3b82f6" stroke="white" />
              <text x={200 + mass * 3} y={185 + mass * 3} fontSize="12" fill="white" textAnchor="middle">{mass}kg</text>
              <line x1={200 + mass * 3} y1={200 + mass * 3} x2={200 + mass * 3} y2={200 + mass * 3 + arrowLen} stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrR)" />
              <text x={210 + mass * 3} y={220 + arrowLen / 2} fontSize="11" fill="#fca5a5">중력 ↓</text>
            </g>
          )}
          {mode === 'friction' && (
            <g>
              <line x1="0" y1="180" x2="400" y2="180" stroke="#22c55e" strokeWidth="2" />
              <rect x="160" y="140" width="60" height="40" fill="#3b82f6" stroke="white" />
              <line x1="220" y1="160" x2={220 + 60} y2="160" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrR)" />
              <text x="245" y="155" fontSize="10" fill="#86efac">밀기 →</text>
              <line x1="160" y1="170" x2={160 - arrowLen / 2} y2="170" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrR)" />
              <text x={140 - arrowLen / 4} y="160" fontSize="10" fill="#fca5a5">마찰 ←</text>
              <text x="180" y="200" fontSize="10" fill="#94a3b8">μ = {extra.toFixed(2)}</text>
            </g>
          )}
          {mode === 'elastic' && (
            <g>
              <rect x="20" y="80" width="20" height="140" fill="#475569" />
              {[...Array(8)].map((_, i) => {
                const sx = 40 + i * (8 + extra * 12);
                return <path key={i} d={`M ${sx} 130 L ${sx + 4 + extra * 6} 120 L ${sx + 8 + extra * 12} 140 L ${sx + 12 + extra * 18} 120`} fill="none" stroke="#fbbf24" strokeWidth="2" />;
              })}
              <rect x={130 + extra * 100} y="110" width="50" height="40" fill="#3b82f6" stroke="white" />
              <text x={155 + extra * 100} y="135" fontSize="11" fill="white" textAnchor="middle">{mass}kg</text>
              <line x1={130 + extra * 100} y1="130" x2={130 + extra * 100 - arrowLen / 2} y2="130" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrR)" />
              <text x={120 + extra * 100 - arrowLen / 4} y="120" fontSize="10" fill="#fca5a5">탄성 ←</text>
              <text x="200" y="200" fontSize="10" fill="#94a3b8">늘어남 x = {extra.toFixed(2)} m</text>
            </g>
          )}
          {mode === 'buoyancy' && (
            <g>
              <rect x="0" y="120" width="400" height="120" fill="#1e40af" opacity="0.7" />
              <text x="20" y="140" fontSize="10" fill="#93c5fd">물</text>
              <rect x="170" y={130 + (1 - extra) * 40} width="60" height="50" fill="#fbbf24" stroke="white" />
              <text x="200" y={158 + (1 - extra) * 40} fontSize="11" fill="#7c2d12" textAnchor="middle">{mass}kg</text>
              <line x1="200" y1={155 + (1 - extra) * 40} x2="200" y2={155 + (1 - extra) * 40 + 50} stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrR)" />
              <line x1="200" y1={155 + (1 - extra) * 40} x2="200" y2={155 + (1 - extra) * 40 - arrowLen / 3} stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrG)" />
              <text x="220" y={140 + (1 - extra) * 40} fontSize="10" fill="#86efac">부력 ↑</text>
              <text x="220" y={195 + (1 - extra) * 40} fontSize="10" fill="#fca5a5">중력 ↓</text>
            </g>
          )}
          <defs>
            <marker id="arrR" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#dc2626" />
            </marker>
            <marker id="arrG" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" />
            </marker>
          </defs>
        </svg>
      </div>

      <SliderRow
        label="질량 (kg)"
        value={mass}
        min={0.5}
        max={5}
        step={0.5}
        onChange={setMass}
        format={(v) => v.toFixed(1)}
      />
      {mode !== 'gravity' && (
        <SliderRow
          label={mode === 'friction' ? '마찰계수 μ' : mode === 'elastic' ? '늘어남 x (m)' : '잠긴 비율'}
          value={extra}
          min={0.05}
          max={mode === 'buoyancy' ? 1 : 0.8}
          step={0.05}
          onChange={setExtra}
          format={(v) => v.toFixed(2)}
        />
      )}

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-3">
          <div className="text-xs text-zinc-500">{current.label} 크기</div>
          <div className="font-bold text-amber-700 dark:text-amber-300 text-lg">{value.toFixed(1)} {unit}</div>
        </div>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-3">
          <div className="text-xs text-zinc-500">공식</div>
          <div className="font-mono text-sm text-blue-700 dark:text-blue-300">{current.formula}</div>
        </div>
      </div>

      <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800 p-3 text-sm">
        <strong className="text-zinc-900 dark:text-zinc-100">{current.label}</strong>
        <div className="text-zinc-700 dark:text-zinc-300 mt-1">{current.desc}</div>
      </div>
    </div>
  );
}
