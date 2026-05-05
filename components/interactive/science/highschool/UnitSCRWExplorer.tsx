'use client';

// S-CRW 화학반응의 세계 — 평형상수 K 시뮬, 르샤틀리에 원리, 표준전극전위 비교.

import { useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

type Topic = 'equilibrium' | 'lechatelier' | 'redox';

const HALF_CELLS = [
  { id: 'Li', label: 'Li⁺/Li', e: -3.04 },
  { id: 'Mg', label: 'Mg²⁺/Mg', e: -2.37 },
  { id: 'Zn', label: 'Zn²⁺/Zn', e: -0.76 },
  { id: 'H', label: 'H⁺/H₂', e: 0.0 },
  { id: 'Cu', label: 'Cu²⁺/Cu', e: 0.34 },
  { id: 'Ag', label: 'Ag⁺/Ag', e: 0.8 },
  { id: 'Au', label: 'Au³⁺/Au', e: 1.5 },
] as const;

export function UnitSCRWExplorer() {
  const [topic, setTopic] = useState<Topic>('equilibrium');

  // 평형
  const [a, setA] = useState(1.0);
  const [b, setB] = useState(1.0);
  const [c, setC] = useState(0.5);
  const [d, setD] = useState(0.5);
  const Q = (c * d) / (a * b);
  const K = 4.0;
  const direction = Q < K ? '정반응' : Q > K ? '역반응' : '평형';
  const directionColor = Q < K ? '#16a34a' : Q > K ? '#dc2626' : '#a16207';

  // 르샤틀리에
  const [stress, setStress] = useState<'addReactant' | 'addProduct' | 'heat' | 'pressure'>('addReactant');
  const lcExplain: Record<typeof stress, string> = {
    addReactant: '반응물 ↑ → 정반응 진행. 평형이 오른쪽으로 이동.',
    addProduct: '생성물 ↑ → 역반응 진행. 평형이 왼쪽으로 이동.',
    heat: '발열반응 + 가열 → 역반응 진행. 흡열반응 + 가열 → 정반응 진행.',
    pressure: '몰수 적은 쪽으로 이동. N₂ + 3H₂ ⇌ 2NH₃ 에서는 압력 ↑ → 오른쪽.',
  };

  // 산화환원
  const [anode, setAnode] = useState(0); // 산화 (낮은 E°)
  const [cathode, setCathode] = useState(4); // 환원 (높은 E°)
  const emf = HALF_CELLS[cathode].e - HALF_CELLS[anode].e;
  const spontaneous = emf > 0;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          평형 · 르샤틀리에 · 전기화학
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          반응이 「언제 멈추고」 「어떻게 흔들리는지」, 그리고 전지가 어떻게 전류를 만드는지 추적해 보세요.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm">
        {(['equilibrium', 'lechatelier', 'redox'] as Topic[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setTopic(id)}
            className={`min-h-[44px] rounded-lg px-2 ${
              topic === id
                ? 'bg-green-600 text-white font-semibold'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
            }`}
          >
            {id === 'equilibrium' ? '평형 K' : id === 'lechatelier' ? '르샤틀리에' : '전기화학'}
          </button>
        ))}
      </div>

      {topic === 'equilibrium' && (
        <>
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-center font-mono text-sm">
            aA + bB ⇌ cC + dD &nbsp;&nbsp; Q = [C][D] / [A][B]
          </div>

          <SliderRow label="[A]" value={a} min={0.1} max={3.0} step={0.1} onChange={setA} unit=" M" />
          <SliderRow label="[B]" value={b} min={0.1} max={3.0} step={0.1} onChange={setB} unit=" M" />
          <SliderRow label="[C]" value={c} min={0.1} max={3.0} step={0.1} onChange={setC} unit=" M" />
          <SliderRow label="[D]" value={d} min={0.1} max={3.0} step={0.1} onChange={setD} unit=" M" />

          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span>반응지수 Q</span>
              <span className="font-mono">{Q.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>평형상수 K</span>
              <span className="font-mono">{K.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-zinc-200 dark:border-zinc-700 pt-1">
              <span className="font-bold">진행 방향</span>
              <span className="font-mono font-bold" style={{ color: directionColor }}>
                {direction}
              </span>
            </div>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Q &lt; K → 정반응(생성물 부족), Q &gt; K → 역반응, Q = K → 평형. K는 온도에만 의존.
          </p>
        </>
      )}

      {topic === 'lechatelier' && (
        <>
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-center font-mono text-sm">
            N₂(g) + 3H₂(g) ⇌ 2NH₃(g) + 92 kJ
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {(['addReactant', 'addProduct', 'heat', 'pressure'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStress(s)}
                className={`min-h-[44px] rounded-lg px-2 ${
                  stress === s
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                }`}
              >
                {s === 'addReactant'
                  ? '반응물 첨가'
                  : s === 'addProduct'
                    ? '생성물 첨가'
                    : s === 'heat'
                      ? '온도 ↑'
                      : '압력 ↑'}
              </button>
            ))}
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm">
            {lcExplain[stress]}
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            「자극을 가하면 자극을 줄이는 방향으로 평형이 이동」 — 하버-보슈 공정도 이 원리로 NH₃ 수율을 끌어올렸어요.
          </p>
        </>
      )}

      {topic === 'redox' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3">
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">산화(−극)</div>
              <select
                value={anode}
                onChange={(e) => setAnode(parseInt(e.target.value, 10))}
                className="w-full bg-white dark:bg-zinc-900 rounded p-2 text-sm"
              >
                {HALF_CELLS.map((c, i) => (
                  <option key={c.id} value={i}>
                    {c.label} ({c.e.toFixed(2)} V)
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3">
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">환원(+극)</div>
              <select
                value={cathode}
                onChange={(e) => setCathode(parseInt(e.target.value, 10))}
                className="w-full bg-white dark:bg-zinc-900 rounded p-2 text-sm"
              >
                {HALF_CELLS.map((c, i) => (
                  <option key={c.id} value={i}>
                    {c.label} ({c.e.toFixed(2)} V)
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span>E°_cell = E°(환원) − E°(산화)</span>
              <span className="font-mono">{emf.toFixed(2)} V</span>
            </div>
            <div className="flex justify-between border-t border-zinc-200 dark:border-zinc-700 pt-1">
              <span className="font-bold">자발성</span>
              <span
                className={`font-mono font-bold ${
                  spontaneous ? 'text-green-600 dark:text-green-400' : 'text-red-500'
                }`}
              >
                {spontaneous ? 'YES (전지)' : 'NO (전기분해 필요)'}
              </span>
            </div>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            E°_cell &gt; 0 이면 자발적 갈바니 전지. 다니엘 전지(Zn|Cu)의 1.10 V는 0.34 − (−0.76) = 1.10 V로 계산.
          </p>
        </>
      )}
    </div>
  );
}
