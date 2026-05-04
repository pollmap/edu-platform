'use client';

// M8-CR-01 식의 계산 (지수법칙) — 곱셈/나눗셈/거듭제곱 시뮬레이터.

import { useMemo, useState } from 'react';

type Law = 'mul' | 'pow' | 'div' | 'mul-bases';

const LAWS: Array<{ id: Law; tex: string; rule: string }> = [
  { id: 'mul', tex: 'aᵐ × aⁿ = aᵐ⁺ⁿ', rule: '같은 밑끼리 곱하면 지수는 더해요.' },
  { id: 'pow', tex: '(aᵐ)ⁿ = aᵐⁿ', rule: '거듭제곱의 거듭제곱은 지수끼리 곱해요.' },
  { id: 'div', tex: 'aᵐ ÷ aⁿ = aᵐ⁻ⁿ', rule: '같은 밑끼리 나누면 지수는 빼요.' },
  { id: 'mul-bases', tex: '(ab)ⁿ = aⁿbⁿ', rule: '곱의 거듭제곱은 따로 거듭제곱해서 곱해요.' },
];

export function ExponentLawExplorer() {
  const [law, setLaw] = useState<Law>('mul');
  const [a, setA] = useState(2);
  const [m, setM] = useState(3);
  const [n, setN] = useState(2);
  const [b, setB] = useState(3);

  const view = useMemo(() => {
    switch (law) {
      case 'mul': {
        const exp = m + n;
        return {
          left: `${a}^${m} × ${a}^${n}`,
          expand: `(${Array(m).fill(a).join('·')}) × (${Array(n).fill(a).join('·')})`,
          right: `${a}^${exp}`,
          value: a ** exp,
        };
      }
      case 'pow': {
        const exp = m * n;
        return {
          left: `(${a}^${m})^${n}`,
          expand: Array(n).fill(`${a}^${m}`).join(' × '),
          right: `${a}^${exp}`,
          value: a ** exp,
        };
      }
      case 'div': {
        const exp = m - n;
        return {
          left: `${a}^${m} ÷ ${a}^${n}`,
          expand: `${Array(m).fill(a).join('·')} ÷ ${Array(n).fill(a).join('·')}`,
          right: exp === 0 ? '1' : `${a}^${exp}`,
          value: a ** exp,
        };
      }
      case 'mul-bases': {
        return {
          left: `(${a}·${b})^${n}`,
          expand: Array(n).fill(`(${a}·${b})`).join(' × '),
          right: `${a}^${n} × ${b}^${n}`,
          value: (a * b) ** n,
        };
      }
    }
  }, [law, a, b, m, n]);

  const current = LAWS.find((l) => l.id === law)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          지수법칙 — 거듭제곱의 규칙
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          지수가 무엇을 의미하는지 풀어 쓰면 규칙이 자연스럽게 보여요.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {LAWS.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => setLaw(l.id)}
            className={`px-3 py-2 text-sm rounded-md border min-h-[44px] font-mono ${
              law === l.id
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700'
            }`}
          >
            {l.tex}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4 space-y-3 text-center font-mono">
        <div>
          <div className="text-xs text-zinc-500 mb-1">원래 식</div>
          <div className="text-xl text-zinc-800 dark:text-zinc-200">{view.left}</div>
        </div>
        <div className="text-zinc-400">↓ 풀어 쓰기</div>
        <div className="text-base text-purple-700 dark:text-purple-300 break-words">{view.expand}</div>
        <div className="text-zinc-400">↓ 다시 묶기</div>
        <div>
          <div className="text-xs text-zinc-500 mb-1">결과</div>
          <div className="text-xl text-blue-700 dark:text-blue-400 font-bold">
            {view.right} = {view.value}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <SliderRow label="a" value={a} min={2} max={5} onChange={setA} />
        <SliderRow label="m" value={m} min={1} max={5} onChange={setM} />
        <SliderRow label="n" value={n} min={1} max={5} onChange={setN} />
        {law === 'mul-bases' && (
          <SliderRow label="b" value={b} min={2} max={5} onChange={setB} />
        )}
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-4 text-sm text-zinc-700 dark:text-zinc-300">
        <strong>규칙:</strong> {current.rule}
      </div>
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1">
      <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300 font-mono">
        {label} = {value}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-3 cursor-pointer accent-blue-600"
        aria-label={label}
        style={{ minHeight: 44 }}
      />
    </div>
  );
}
