'use client';

// S-CHE-03 화학 결합 — 이온/공유/금속 결합 비교 + 전기음성도 차이.

import { useState } from 'react';

type BondType = 'ionic' | 'covalent' | 'metallic';

const BONDS: { id: BondType; label: string; example: string; deltaEN: string; description: string; tip: string }[] = [
  {
    id: 'ionic',
    label: '이온결합',
    example: 'NaCl',
    deltaEN: 'ΔEN > 1.7',
    description: '금속이 전자를 잃고(+이온), 비금속이 받아(-이온) 정전기적으로 끌림.',
    tip: '단단하지만 잘 부서져요. 물에 녹으면 전기 통함.',
  },
  {
    id: 'covalent',
    label: '공유결합',
    example: 'H₂O',
    deltaEN: 'ΔEN < 1.7',
    description: '두 비금속 원자가 전자쌍을 공유. 분자성 물질.',
    tip: '녹는점·끓는점 낮고 대부분 전기 안 통함.',
  },
  {
    id: 'metallic',
    label: '금속결합',
    example: 'Cu',
    deltaEN: '금속+금속',
    description: '양이온 사이를 자유전자가 바다처럼 흐름.',
    tip: '전기·열 잘 통하고, 두드리면 늘어나요(연성·전성).',
  },
];

export function ChemicalBondExplorer() {
  const [type, setType] = useState<BondType>('ionic');
  const cur = BONDS.find((b) => b.id === type)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          전자가 어떻게 다뤄지느냐로 결합 종류가 갈려요
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          이온결합 = 주고받음, 공유결합 = 같이 씀, 금속결합 = 모두 함께 흐름.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm">
        {BONDS.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setType(b.id)}
            className={`min-h-[44px] rounded-lg px-3 py-2 ${
              type === b.id
                ? 'bg-green-600 text-white font-semibold'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
        <svg viewBox="0 0 360 200" className="w-full h-auto" role="img" aria-label={cur.label}>
          {type === 'ionic' && (
            <>
              <circle cx={110} cy={100} r={36} fill="#dc2626" opacity={0.85} />
              <text x={110} y={94} textAnchor="middle" fontSize={20} fontWeight={700} fill="#fff">Na⁺</text>
              <text x={110} y={114} textAnchor="middle" fontSize={11} fill="#fff" opacity={0.9}>10 전자</text>
              <circle cx={250} cy={100} r={48} fill="#16a34a" opacity={0.85} />
              <text x={250} y={94} textAnchor="middle" fontSize={20} fontWeight={700} fill="#fff">Cl⁻</text>
              <text x={250} y={114} textAnchor="middle" fontSize={11} fill="#fff" opacity={0.9}>18 전자</text>
              <line x1={146} y1={100} x2={202} y2={100} stroke="#fbbf24" strokeWidth={3} strokeDasharray="4 3" />
              <text x={174} y={92} textAnchor="middle" fontSize={11} fill="#fbbf24" fontWeight={700}>전기적 인력</text>
            </>
          )}
          {type === 'covalent' && (
            <>
              <circle cx={120} cy={100} r={32} fill="#3b82f6" opacity={0.7} />
              <text x={120} y={106} textAnchor="middle" fontSize={20} fontWeight={700} fill="#fff">H</text>
              <circle cx={240} cy={100} r={32} fill="#3b82f6" opacity={0.7} />
              <text x={240} y={106} textAnchor="middle" fontSize={20} fontWeight={700} fill="#fff">H</text>
              <ellipse cx={180} cy={100} rx={50} ry={20} fill="#fbbf24" opacity={0.5} />
              <circle cx={170} cy={100} r={5} fill="#fbbf24" />
              <circle cx={190} cy={100} r={5} fill="#fbbf24" />
              <text x={180} y={68} textAnchor="middle" fontSize={11} fill="#fbbf24" fontWeight={700}>공유 전자쌍</text>
            </>
          )}
          {type === 'metallic' && (
            <>
              {[0, 1, 2, 3].map((r) =>
                [0, 1, 2, 3].map((c) => (
                  <circle key={`${r}-${c}`} cx={70 + c * 70} cy={50 + r * 35} r={16} fill="#a78bfa" opacity={0.85} />
                ))
              )}
              {[0, 1, 2, 3].map((r) =>
                [0, 1, 2, 3].map((c) => (
                  <text key={`t-${r}-${c}`} x={70 + c * 70} y={55 + r * 35} textAnchor="middle" fontSize={11} fontWeight={700} fill="#fff">M⁺</text>
                ))
              )}
              {/* free electrons */}
              {Array.from({ length: 25 }).map((_, i) => {
                const x = 50 + ((i * 31) % 280);
                const y = 30 + ((i * 19) % 130);
                return <circle key={`e-${i}`} cx={x} cy={y} r={3} fill="#fbbf24" opacity={0.7} />;
              })}
              <text x={180} y={195} textAnchor="middle" fontSize={11} fill="#fbbf24" fontWeight={700}>자유전자(노랑) 바다</text>
            </>
          )}
        </svg>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-zinc-500">예시</span>
          <span className="font-mono font-bold">{cur.example}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">전기음성도 차</span>
          <span className="font-mono">{cur.deltaEN}</span>
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-2">{cur.description}</p>
        <p className="text-xs text-blue-700 dark:text-blue-400 italic">{cur.tip}</p>
      </div>
    </div>
  );
}
