'use client';

// M6-NA-02 소수의 나눗셈 — 자릿수 이동 + 세로셈 단계.

import { useMemo, useState } from 'react';

export function DecimalDivisionExplorer() {
  const [a, setA] = useState(7.2);
  const [b, setB] = useState(0.4);

  const view = useMemo(() => {
    // 소수점 자릿수 = 두 수 중 가장 많은 소수 자릿수
    const da = (a.toString().split('.')[1] || '').length;
    const db = (b.toString().split('.')[1] || '').length;
    const shift = Math.max(da, db);
    const factor = 10 ** shift;
    const A = Math.round(a * factor);
    const B = Math.round(b * factor);
    const quotient = Math.round((A / B) * 1000) / 1000;
    return { da, db, shift, A, B, quotient };
  }, [a, b]);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          소수의 나눗셈 — 자릿수 이동
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          나누는 수가 정수가 되도록 <strong>소수점을 똑같이 옮겨요</strong>. 그러면 익숙한 정수 나눗셈으로 바뀌어요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-3">
          <SliderRow
            label={`나누어지는 수 ${a.toFixed(2)}`}
            value={a}
            min={0.1}
            max={20}
            step={0.1}
            onChange={setA}
          />
          <SliderRow
            label={`나누는 수 ${b.toFixed(2)}`}
            value={b}
            min={0.1}
            max={5}
            step={0.1}
            onChange={setB}
          />
        </div>

        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4 font-mono text-center">
          <div className="text-zinc-400 text-sm mb-1">원래 식</div>
          <div className="text-lg text-zinc-700 dark:text-zinc-300 mb-3">
            {a} ÷ {b}
          </div>
          <div className="text-zinc-400 text-sm mb-1">소수점 {view.shift}칸 오른쪽으로</div>
          <div className="text-xl text-blue-700 dark:text-blue-400 font-bold mb-3">
            {view.A} ÷ {view.B}
          </div>
          <div className="text-zinc-400 text-sm mb-1">몫</div>
          <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
            {view.quotient}
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-4 text-sm text-zinc-700 dark:text-zinc-300">
        <strong>핵심:</strong> 두 수에 똑같이 10·100·1000을 곱해도 몫은 변하지 않아요.
        그래서 나누는 수를 <strong>정수로 만든 뒤</strong> 평소처럼 세로셈을 하면 돼요.
      </div>
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1">
      <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{label}</div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-3 cursor-pointer accent-blue-600"
        aria-label={label}
        style={{ minHeight: 44 }}
      />
    </div>
  );
}
