'use client';

// M5-CR-01 규칙과 대응 — 함수 박스 (입력 → 출력).

import { useMemo, useState } from 'react';

type Rule = 'add' | 'mul' | 'linear' | 'square';

const RULES: Array<{ id: Rule; label: string; tex: string; fn: (x: number) => number }> = [
  { id: 'add', label: 'x + 3', tex: 'y = x + 3', fn: (x) => x + 3 },
  { id: 'mul', label: '2 × x', tex: 'y = 2 × x', fn: (x) => 2 * x },
  { id: 'linear', label: '2x + 1', tex: 'y = 2x + 1', fn: (x) => 2 * x + 1 },
  { id: 'square', label: 'x × x', tex: 'y = x²', fn: (x) => x * x },
];

const INPUTS = [1, 2, 3, 4, 5, 6, 7, 8];

export function FunctionBoxExplorer() {
  const [ruleId, setRuleId] = useState<Rule>('linear');
  const [active, setActive] = useState(3);

  const rule = RULES.find((r) => r.id === ruleId)!;
  const table = useMemo(
    () => INPUTS.map((x) => ({ x, y: rule.fn(x) })),
    [rule],
  );

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          함수 박스 — 입력 → 출력
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          어떤 수를 박스에 넣으면 박스가 약속된 규칙대로 다른 수를 내보내요. 같은 수를 넣으면 항상 같은 수가 나오는 게 <strong>함수</strong>의 핵심이에요.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {RULES.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setRuleId(r.id)}
            className={`px-3 py-2 rounded-md text-xs border-2 font-mono min-h-[40px] ${
              ruleId === r.id
                ? 'bg-blue-600 text-white border-blue-700'
                : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 py-4">
        <Bubble label={`x = ${active}`} color="#3b82f6" />
        <Arrow />
        <div className="px-6 py-4 rounded-xl border-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">규칙</div>
          <div className="font-mono text-lg font-bold text-blue-700 dark:text-blue-300">{rule.tex}</div>
        </div>
        <Arrow />
        <Bubble label={`y = ${rule.fn(active)}`} color="#f59e0b" />
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-1">
        {INPUTS.map((x) => (
          <button
            key={x}
            type="button"
            onClick={() => setActive(x)}
            className={`min-h-[44px] rounded-md border font-mono ${
              active === x
                ? 'bg-blue-600 text-white border-blue-700'
                : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200'
            }`}
          >
            {x}
          </button>
        ))}
      </div>

      <table className="w-full text-sm font-mono">
        <thead>
          <tr className="border-b-2 border-zinc-300 dark:border-zinc-700">
            <th className="py-2 text-left text-zinc-600 dark:text-zinc-400">x (입력)</th>
            <th className="py-2 text-left text-zinc-600 dark:text-zinc-400">y (출력)</th>
          </tr>
        </thead>
        <tbody>
          {table.map(({ x, y }) => (
            <tr
              key={x}
              className={`border-b border-zinc-100 dark:border-zinc-800 ${
                x === active ? 'bg-blue-50 dark:bg-blue-950/30' : ''
              }`}
            >
              <td className="py-1.5">{x}</td>
              <td className="py-1.5 font-bold text-blue-700 dark:text-blue-300">{y}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Bubble({ label, color }: { label: string; color: string }) {
  return (
    <div
      className="px-4 py-3 rounded-full font-mono font-bold text-white"
      style={{ background: color }}
    >
      {label}
    </div>
  );
}

function Arrow() {
  return <span className="text-2xl text-zinc-400">→</span>;
}
