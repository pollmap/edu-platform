'use client';

// S-CHE-01 화학의 언어 — 몰·질량·분자수 변환 + 화학식 작성.

import { useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

const NA = 6.022e23;

const SAMPLES: { id: string; formula: string; molarMass: number; desc: string }[] = [
  { id: 'water', formula: 'H₂O', molarMass: 18.0, desc: '물' },
  { id: 'co2', formula: 'CO₂', molarMass: 44.0, desc: '이산화탄소' },
  { id: 'glucose', formula: 'C₆H₁₂O₆', molarMass: 180.2, desc: '포도당' },
  { id: 'nacl', formula: 'NaCl', molarMass: 58.5, desc: '소금' },
  { id: 'caco3', formula: 'CaCO₃', molarMass: 100.1, desc: '탄산칼슘' },
];

export function MoleConverterExplorer() {
  const [selected, setSelected] = useState(SAMPLES[0]);
  const [moles, setMoles] = useState(1.0);

  const mass = moles * selected.molarMass;
  const molecules = moles * NA;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          1몰 = 6.022 × 10²³개
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          몰은 물질의 양을 세는 단위. 1몰 = 분자수 NA = 분자량 g.
          이 세 가지 양은 항상 셋 중 하나만 알면 나머지가 결정돼요.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
        {SAMPLES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSelected(s)}
            className={`min-h-[44px] rounded-lg px-3 py-2 ${
              selected.id === s.id
                ? 'bg-green-600 text-white font-semibold'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            <div className="font-mono text-xs">{s.formula}</div>
            <div className="text-[10px] opacity-80">{s.desc}</div>
          </button>
        ))}
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-xs text-zinc-500 mb-1">몰수</div>
            <div className="text-2xl font-bold font-mono text-green-700 dark:text-green-400">
              {moles.toFixed(2)}
            </div>
            <div className="text-xs text-zinc-500">mol</div>
          </div>
          <div className="border-l border-r border-zinc-300 dark:border-zinc-700">
            <div className="text-xs text-zinc-500 mb-1">질량</div>
            <div className="text-2xl font-bold font-mono text-blue-700 dark:text-blue-400">
              {mass.toFixed(1)}
            </div>
            <div className="text-xs text-zinc-500">g</div>
          </div>
          <div>
            <div className="text-xs text-zinc-500 mb-1">분자 수</div>
            <div className="text-2xl font-bold font-mono text-red-600 dark:text-red-400">
              {molecules.toExponential(2)}
            </div>
            <div className="text-xs text-zinc-500">개</div>
          </div>
        </div>
        <div className="mt-3 text-center text-xs text-zinc-500 dark:text-zinc-400">
          분자량 M = <span className="font-mono">{selected.molarMass}</span> g/mol
        </div>
      </div>

      <SliderRow label="몰수" value={moles} min={0.1} max={10} step={0.1} onChange={setMoles} unit=" mol" />

      <div className="bg-blue-50 dark:bg-blue-950/40 rounded-lg p-3 text-xs text-blue-900 dark:text-blue-200">
        <strong>왜 몰을 쓰나?</strong> 원자·분자는 너무 작아 1g 안에도 10²² 개 이상이 들어요.
        그래서 6.022×10²³ 개를 묶어 "1 dozen" 처럼 한 묶음으로 다루는 게 몰. 화학반응식의 계수도 곧 몰비예요.
      </div>
    </div>
  );
}
