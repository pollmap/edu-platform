'use client';

// S9-MA-01 화학반응의 규칙성 — 화학반응식 균형 맞추기 + 질량보존.
// 계수를 직접 조절하며 좌우 원자 수가 일치하는 순간 「균형」 표시.

import { useMemo, useState } from 'react';

interface Reaction {
  key: string;
  name: string;
  left: { formula: string; atoms: Record<string, number> }[];
  right: { formula: string; atoms: Record<string, number> }[];
  balanced: number[]; // [좌1, 좌2, ..., 우1, ...]
  hint: string;
}

const REACTIONS: Reaction[] = [
  {
    key: 'h2o',
    name: '수소 연소: H₂ + O₂ → H₂O',
    left: [
      { formula: 'H₂', atoms: { H: 2 } },
      { formula: 'O₂', atoms: { O: 2 } },
    ],
    right: [{ formula: 'H₂O', atoms: { H: 2, O: 1 } }],
    balanced: [2, 1, 2],
    hint: '왼쪽 O는 짝수, 오른쪽 H₂O의 O는 홀수 가능성 → H₂O 계수를 짝수로.',
  },
  {
    key: 'ch4',
    name: '메탄 연소: CH₄ + O₂ → CO₂ + H₂O',
    left: [
      { formula: 'CH₄', atoms: { C: 1, H: 4 } },
      { formula: 'O₂', atoms: { O: 2 } },
    ],
    right: [
      { formula: 'CO₂', atoms: { C: 1, O: 2 } },
      { formula: 'H₂O', atoms: { H: 2, O: 1 } },
    ],
    balanced: [1, 2, 1, 2],
    hint: '탄소부터 맞추고, 수소(H₂O 계수), 마지막에 산소.',
  },
  {
    key: 'fe2o3',
    name: '철 산화: Fe + O₂ → Fe₂O₃',
    left: [
      { formula: 'Fe', atoms: { Fe: 1 } },
      { formula: 'O₂', atoms: { O: 2 } },
    ],
    right: [{ formula: 'Fe₂O₃', atoms: { Fe: 2, O: 3 } }],
    balanced: [4, 3, 2],
    hint: '오른쪽 O가 3 → 왼쪽 O를 6으로 만들기 위해 O₂ 계수 3.',
  },
  {
    key: 'nh3',
    name: '암모니아 합성: N₂ + H₂ → NH₃',
    left: [
      { formula: 'N₂', atoms: { N: 2 } },
      { formula: 'H₂', atoms: { H: 2 } },
    ],
    right: [{ formula: 'NH₃', atoms: { N: 1, H: 3 } }],
    balanced: [1, 3, 2],
    hint: 'N부터 맞춘 뒤 H. NH₃ 계수가 짝수여야 H가 정수.',
  },
];

function totalAtoms(items: { atoms: Record<string, number> }[], coefs: number[]) {
  const total: Record<string, number> = {};
  items.forEach((it, i) => {
    Object.entries(it.atoms).forEach(([el, n]) => {
      total[el] = (total[el] || 0) + n * coefs[i];
    });
  });
  return total;
}

export function ChemicalEquationBalancer() {
  const [rxIdx, setRxIdx] = useState(0);
  const rx = REACTIONS[rxIdx];
  const initial = useMemo(() => Array(rx.left.length + rx.right.length).fill(1), [rx]);
  const [coefs, setCoefs] = useState<number[]>(initial);

  // 반응이 바뀌면 초기화
  const reset = () => setCoefs(Array(rx.left.length + rx.right.length).fill(1));

  const leftCoefs = coefs.slice(0, rx.left.length);
  const rightCoefs = coefs.slice(rx.left.length);
  const leftAtoms = totalAtoms(rx.left, leftCoefs);
  const rightAtoms = totalAtoms(rx.right, rightCoefs);
  const allElements = Array.from(new Set([...Object.keys(leftAtoms), ...Object.keys(rightAtoms)]));
  const balanced = allElements.every((el) => (leftAtoms[el] || 0) === (rightAtoms[el] || 0));

  const totalLeftMass = Object.values(leftAtoms).reduce((s, n) => s + n, 0);
  const totalRightMass = Object.values(rightAtoms).reduce((s, n) => s + n, 0);

  const updateCoef = (i: number, delta: number) => {
    setCoefs((prev) => prev.map((c, j) => (i === j ? Math.max(1, Math.min(10, c + delta)) : c)));
  };

  const showAnswer = () => setCoefs(rx.balanced);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {REACTIONS.map((r, i) => (
          <button
            key={r.key}
            type="button"
            onClick={() => {
              setRxIdx(i);
              setCoefs(Array(r.left.length + r.right.length).fill(1));
            }}
            className={`px-2 py-2 rounded text-xs font-medium min-h-[44px] ${
              i === rxIdx
                ? 'bg-emerald-600 text-white'
                : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {r.name.split(':')[0]}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-700">
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">{rx.name}</div>
        <div className="flex flex-wrap items-center justify-center gap-2 text-base md:text-lg font-mono">
          {rx.left.map((it, i) => (
            <div key={`l${i}`} className="flex items-center gap-1">
              {i > 0 && <span className="text-zinc-400">+</span>}
              <CoefStepper value={leftCoefs[i]} onUp={() => updateCoef(i, 1)} onDown={() => updateCoef(i, -1)} />
              <span className="text-zinc-900 dark:text-zinc-100">{it.formula}</span>
            </div>
          ))}
          <span className="text-emerald-600 dark:text-emerald-400 mx-1">→</span>
          {rx.right.map((it, i) => (
            <div key={`r${i}`} className="flex items-center gap-1">
              {i > 0 && <span className="text-zinc-400">+</span>}
              <CoefStepper
                value={rightCoefs[i]}
                onUp={() => updateCoef(rx.left.length + i, 1)}
                onDown={() => updateCoef(rx.left.length + i, -1)}
              />
              <span className="text-zinc-900 dark:text-zinc-100">{it.formula}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3 border border-blue-200 dark:border-blue-800">
          <div className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">왼쪽(반응물) 원자 수</div>
          <ul className="space-y-1 text-sm font-mono">
            {allElements.map((el) => (
              <li key={`L${el}`} className="flex justify-between">
                <span>{el}</span>
                <span
                  className={
                    (leftAtoms[el] || 0) === (rightAtoms[el] || 0)
                      ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                      : 'text-rose-500 dark:text-rose-400 font-bold'
                  }
                >
                  {leftAtoms[el] || 0}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl bg-orange-50 dark:bg-orange-950/30 p-3 border border-orange-200 dark:border-orange-800">
          <div className="text-xs font-bold text-orange-700 dark:text-orange-300 mb-2">오른쪽(생성물) 원자 수</div>
          <ul className="space-y-1 text-sm font-mono">
            {allElements.map((el) => (
              <li key={`R${el}`} className="flex justify-between">
                <span>{el}</span>
                <span
                  className={
                    (leftAtoms[el] || 0) === (rightAtoms[el] || 0)
                      ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                      : 'text-rose-500 dark:text-rose-400 font-bold'
                  }
                >
                  {rightAtoms[el] || 0}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className={`rounded-xl p-3 text-center text-sm font-bold ${
          balanced
            ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
            : 'bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300'
        }`}
      >
        {balanced
          ? `✅ 균형 완성! 좌우 원자 합 ${totalLeftMass} = ${totalRightMass} (질량보존)`
          : `❌ 아직 균형이 안 맞아요 (좌 ${totalLeftMass} / 우 ${totalRightMass})`}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={reset}
          className="flex-1 px-3 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-medium min-h-[44px]"
        >
          초기화
        </button>
        <button
          type="button"
          onClick={showAnswer}
          className="flex-1 px-3 py-2 rounded-lg bg-blue-600 text-white font-medium min-h-[44px]"
        >
          정답 보기
        </button>
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400">💡 힌트: {rx.hint}</div>
      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        💎 라부아지에의 「질량보존의 법칙」 — 반응 전후 원자의 종류와 개수는 변하지 않아요. 화학반응은 원자의 「재배열」일 뿐.
      </div>
    </div>
  );
}

function CoefStepper({ value, onUp, onDown }: { value: number; onUp: () => void; onDown: () => void }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      <button
        type="button"
        onClick={onDown}
        className="w-6 h-6 rounded bg-zinc-200 dark:bg-zinc-700 text-xs font-bold"
        aria-label="감소"
      >
        −
      </button>
      <span
        className={`inline-block min-w-[1.4em] text-center font-bold ${
          value > 1 ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-400'
        }`}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={onUp}
        className="w-6 h-6 rounded bg-zinc-200 dark:bg-zinc-700 text-xs font-bold"
        aria-label="증가"
      >
        +
      </button>
    </span>
  );
}
