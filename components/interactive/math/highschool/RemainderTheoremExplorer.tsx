'use client';

// M-CM1-02 항등식과 나머지정리 — P(x)를 x − a 로 나눈 나머지 = P(a).
// 사용자는 다항식 계수와 a 를 조절. 세 가지를 동시에 보여준다:
//   (1) 직접 대입한 P(a) 값
//   (2) 조립제법(synthetic division) 단계 표
//   (3) "나머지 = P(a)" 일치 여부

import { useMemo, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

interface Coefs {
  a3: number;
  a2: number;
  a1: number;
  a0: number;
}

const PRESETS: Array<{ label: string; coefs: Coefs; divisor: number }> = [
  { label: '기본', coefs: { a3: 1, a2: -2, a1: 1, a0: 5 }, divisor: 2 },
  { label: '근(나머지 0)', coefs: { a3: 1, a2: -3, a1: 0, a0: 2 }, divisor: 1 },
  { label: '음수 a', coefs: { a3: 1, a2: 0, a1: -4, a0: 0 }, divisor: -2 },
  { label: '단순 이차', coefs: { a3: 0, a2: 1, a1: -3, a0: 2 }, divisor: 1 },
];

function evaluatePolynomial(c: Coefs, x: number): number {
  return c.a3 * x ** 3 + c.a2 * x ** 2 + c.a1 * x + c.a0;
}

function syntheticDivision(c: Coefs, divisor: number): number[] {
  // 조립제법: a3 → a3 → a3·d + a2 → ... 마지막 = 나머지
  const coefs = [c.a3, c.a2, c.a1, c.a0];
  const out: number[] = [coefs[0]];
  for (let i = 1; i < coefs.length; i++) {
    out.push(out[i - 1] * divisor + coefs[i]);
  }
  return out;
}

function formatPolynomial(c: Coefs): string {
  const terms: string[] = [];
  if (c.a3 !== 0) terms.push(`${c.a3}x³`);
  if (c.a2 !== 0) terms.push(`${c.a2 >= 0 && terms.length ? '+ ' : ''}${c.a2}x²`);
  if (c.a1 !== 0) terms.push(`${c.a1 >= 0 && terms.length ? '+ ' : ''}${c.a1}x`);
  if (c.a0 !== 0 || terms.length === 0) {
    terms.push(`${c.a0 >= 0 && terms.length ? '+ ' : ''}${c.a0}`);
  }
  return terms.join(' ').replace(/\+ -/g, '- ');
}

export function RemainderTheoremExplorer() {
  const [coefs, setCoefs] = useState<Coefs>({ a3: 1, a2: -2, a1: 1, a0: 5 });
  const [divisor, setDivisor] = useState(2);

  const remainder = useMemo(() => evaluatePolynomial(coefs, divisor), [coefs, divisor]);
  const synthetic = useMemo(() => syntheticDivision(coefs, divisor), [coefs, divisor]);
  const polyText = formatPolynomial(coefs);

  const isRoot = Math.abs(remainder) < 0.0001;

  const reset = () => {
    setCoefs({ a3: 1, a2: -2, a1: 1, a0: 5 });
    setDivisor(2);
  };

  const applyPreset = (p: { coefs: Coefs; divisor: number }) => {
    setCoefs(p.coefs);
    setDivisor(p.divisor);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => applyPreset(p)}
            className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-sm hover:border-blue-700 hover:text-blue-700 dark:hover:text-blue-400 min-h-[44px]"
          >
            {p.label}
          </button>
        ))}
        <button
          type="button"
          onClick={reset}
          className="ml-auto px-4 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 min-h-[44px]"
        >
          처음으로
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <SliderRow
          label="x³ 계수"
          value={coefs.a3}
          min={-3}
          max={3}
          step={1}
          onChange={(v) => setCoefs({ ...coefs, a3: v })}
          format={(v) => v.toFixed(0)}
        />
        <SliderRow
          label="x² 계수"
          value={coefs.a2}
          min={-5}
          max={5}
          step={1}
          onChange={(v) => setCoefs({ ...coefs, a2: v })}
          format={(v) => v.toFixed(0)}
        />
        <SliderRow
          label="x 계수"
          value={coefs.a1}
          min={-5}
          max={5}
          step={1}
          onChange={(v) => setCoefs({ ...coefs, a1: v })}
          format={(v) => v.toFixed(0)}
        />
        <SliderRow
          label="상수항"
          value={coefs.a0}
          min={-10}
          max={10}
          step={1}
          onChange={(v) => setCoefs({ ...coefs, a0: v })}
          format={(v) => v.toFixed(0)}
        />
        <SliderRow
          label="나누는 수 a (x − a)"
          value={divisor}
          min={-5}
          max={5}
          step={1}
          onChange={setDivisor}
          format={(v) => v.toFixed(0)}
        />
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 space-y-3 text-sm">
        <div className="font-mono">P(x) = {polyText}</div>
        <div className="font-mono">x − a = x − ({divisor})</div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-zinc-500 mb-1">방법 1 — 직접 대입</div>
            <div className="font-mono">P({divisor}) = <span className="text-blue-600 dark:text-blue-400 font-bold">{remainder.toFixed(2)}</span></div>
          </div>
          <div>
            <div className="text-xs text-zinc-500 mb-1">방법 2 — 조립제법 마지막 칸</div>
            <div className="font-mono">{synthetic[synthetic.length - 1].toFixed(2)}</div>
          </div>
        </div>
        <div className="text-xs text-zinc-600 dark:text-zinc-400">
          ⇒ <strong>나머지정리</strong>: 다항식 P(x)를 (x − a)로 나눈 나머지는 P(a)와 같다.
          {isRoot && <span className="ml-2 text-green-600 dark:text-green-400 font-bold">a = {divisor}는 P(x)의 근</span>}
        </div>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 overflow-x-auto">
        <div className="text-xs text-zinc-500 mb-2">조립제법 단계 (a = {divisor})</div>
        <table className="text-sm font-mono w-full">
          <thead>
            <tr className="border-b border-zinc-300 dark:border-zinc-700">
              <th className="px-2 py-1 text-left">차수</th>
              <th className="px-2 py-1">x³</th>
              <th className="px-2 py-1">x²</th>
              <th className="px-2 py-1">x</th>
              <th className="px-2 py-1">상수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1 text-zinc-500">계수</td>
              <td className="px-2 py-1 text-center">{coefs.a3}</td>
              <td className="px-2 py-1 text-center">{coefs.a2}</td>
              <td className="px-2 py-1 text-center">{coefs.a1}</td>
              <td className="px-2 py-1 text-center">{coefs.a0}</td>
            </tr>
            <tr className="border-t border-zinc-300 dark:border-zinc-700">
              <td className="px-2 py-1 text-zinc-500">누적</td>
              <td className="px-2 py-1 text-center text-blue-600 dark:text-blue-400 font-bold">{synthetic[0]}</td>
              <td className="px-2 py-1 text-center text-blue-600 dark:text-blue-400 font-bold">{synthetic[1]}</td>
              <td className="px-2 py-1 text-center text-blue-600 dark:text-blue-400 font-bold">{synthetic[2]}</td>
              <td className="px-2 py-1 text-center text-red-500 dark:text-red-400 font-bold">{synthetic[3]}</td>
            </tr>
          </tbody>
        </table>
        <div className="text-xs text-zinc-500 mt-2">마지막 칸(빨강)이 나머지. 나머지 좌측은 몫의 계수.</div>
      </div>
    </div>
  );
}
