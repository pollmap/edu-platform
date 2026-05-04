'use client';

// S-CHE-04 분자 구조 (VSEPR) — 전자쌍 반발로 결정되는 분자 모양.

import { useState } from 'react';

interface Geometry {
  id: string;
  formula: string;
  name: string;
  steric: number; // 입체수
  bondAngle: string;
  shape: string;
  example: string;
}

const GEOMETRIES: Geometry[] = [
  { id: 'linear', formula: 'CO₂', name: '직선형', steric: 2, bondAngle: '180°', shape: 'linear', example: '이산화탄소' },
  { id: 'trigonal', formula: 'BF₃', name: '평면삼각형', steric: 3, bondAngle: '120°', shape: 'trigonal', example: '삼불화붕소' },
  { id: 'tetrahedral', formula: 'CH₄', name: '정사면체', steric: 4, bondAngle: '109.5°', shape: 'tetrahedral', example: '메테인' },
  { id: 'pyramidal', formula: 'NH₃', name: '삼각뿔(피라미드)', steric: 4, bondAngle: '107°', shape: 'pyramidal', example: '암모니아 (고립쌍 1개)' },
  { id: 'bent', formula: 'H₂O', name: '굽은형', steric: 4, bondAngle: '104.5°', shape: 'bent', example: '물 (고립쌍 2개)' },
];

export function MolecularGeometryExplorer() {
  const [selected, setSelected] = useState(GEOMETRIES[0]);

  const renderShape = (shape: string) => {
    const W = 360;
    const H = 200;
    const cx = W / 2;
    const cy = H / 2;
    const C_R = 22;
    const A_R = 16;

    const central = (
      <>
        <circle cx={cx} cy={cy} r={C_R} fill="#1f2937" />
        <text x={cx} y={cy + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill="#fff">
          {selected.formula[0]}
        </text>
      </>
    );

    if (shape === 'linear') {
      return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          <line x1={cx - 90} y1={cy} x2={cx + 90} y2={cy} stroke="#52525b" strokeWidth={3} />
          <circle cx={cx - 90} cy={cy} r={A_R} fill="#dc2626" />
          <text x={cx - 90} y={cy + 5} textAnchor="middle" fontSize={11} fontWeight={700} fill="#fff">O</text>
          <circle cx={cx + 90} cy={cy} r={A_R} fill="#dc2626" />
          <text x={cx + 90} y={cy + 5} textAnchor="middle" fontSize={11} fontWeight={700} fill="#fff">O</text>
          {central}
        </svg>
      );
    }
    if (shape === 'trigonal') {
      const angles = [-90, 30, 150];
      return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          {angles.map((deg, i) => {
            const r = (deg * Math.PI) / 180;
            const x = cx + 75 * Math.cos(r);
            const y = cy + 75 * Math.sin(r);
            return (
              <g key={i}>
                <line x1={cx} y1={cy} x2={x} y2={y} stroke="#52525b" strokeWidth={3} />
                <circle cx={x} cy={y} r={A_R} fill="#16a34a" />
                <text x={x} y={y + 5} textAnchor="middle" fontSize={11} fontWeight={700} fill="#fff">F</text>
              </g>
            );
          })}
          {central}
        </svg>
      );
    }
    if (shape === 'tetrahedral') {
      const positions = [[0, -75], [70, 30], [-70, 30], [0, 70]];
      return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          {positions.map((p, i) => {
            const x = cx + p[0];
            const y = cy + p[1];
            return (
              <g key={i}>
                <line x1={cx} y1={cy} x2={x} y2={y} stroke="#52525b" strokeWidth={3} />
                <circle cx={x} cy={y} r={A_R} fill="#3b82f6" />
                <text x={x} y={y + 5} textAnchor="middle" fontSize={11} fontWeight={700} fill="#fff">H</text>
              </g>
            );
          })}
          {central}
        </svg>
      );
    }
    if (shape === 'pyramidal') {
      const positions = [[0, 70], [60, 30], [-60, 30]];
      return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          {positions.map((p, i) => {
            const x = cx + p[0];
            const y = cy + p[1];
            return (
              <g key={i}>
                <line x1={cx} y1={cy} x2={x} y2={y} stroke="#52525b" strokeWidth={3} />
                <circle cx={x} cy={y} r={A_R} fill="#3b82f6" />
                <text x={x} y={y + 5} textAnchor="middle" fontSize={11} fontWeight={700} fill="#fff">H</text>
              </g>
            );
          })}
          {/* 고립쌍 */}
          <ellipse cx={cx} cy={cy - 60} rx={20} ry={12} fill="#fbbf24" opacity={0.6} />
          <text x={cx} y={cy - 56} textAnchor="middle" fontSize={9} fill="#92400e" fontWeight={700}>고립쌍</text>
          {central}
        </svg>
      );
    }
    if (shape === 'bent') {
      const positions = [[60, 40], [-60, 40]];
      return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          {positions.map((p, i) => {
            const x = cx + p[0];
            const y = cy + p[1];
            return (
              <g key={i}>
                <line x1={cx} y1={cy} x2={x} y2={y} stroke="#52525b" strokeWidth={3} />
                <circle cx={x} cy={y} r={A_R} fill="#3b82f6" />
                <text x={x} y={y + 5} textAnchor="middle" fontSize={11} fontWeight={700} fill="#fff">H</text>
              </g>
            );
          })}
          <ellipse cx={cx - 22} cy={cy - 40} rx={18} ry={10} fill="#fbbf24" opacity={0.6} />
          <ellipse cx={cx + 22} cy={cy - 40} rx={18} ry={10} fill="#fbbf24" opacity={0.6} />
          {central}
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          전자쌍은 서로를 밀쳐내요 — VSEPR
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          중심 원자 주변의 전자쌍(결합쌍 + 고립쌍)이 가장 멀리 떨어지려는 배치가 분자 모양을 결정해요.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
        {GEOMETRIES.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setSelected(g)}
            className={`min-h-[44px] rounded-lg px-2 py-2 ${
              selected.id === g.id
                ? 'bg-green-600 text-white font-semibold'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
            }`}
          >
            <div className="font-mono">{g.formula}</div>
            <div className="text-[10px] opacity-80">{g.name}</div>
          </button>
        ))}
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">{renderShape(selected.shape)}</div>

      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm space-y-1">
        <div className="flex justify-between">
          <span className="text-zinc-500">화학식</span>
          <span className="font-mono font-bold">{selected.formula}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">입체수 (전자쌍 수)</span>
          <span className="font-mono">{selected.steric}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">결합각</span>
          <span className="font-mono font-bold text-red-500">{selected.bondAngle}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">예시</span>
          <span className="text-zinc-600 dark:text-zinc-300">{selected.example}</span>
        </div>
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        고립쌍은 결합쌍보다 더 강하게 밀쳐내요. 그래서 NH₃(107°)·H₂O(104.5°)는 정사면체 109.5°보다 좁아져요.
      </p>
    </div>
  );
}
