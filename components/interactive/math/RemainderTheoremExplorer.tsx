'use client';

// M-CM1-02 항등식과 나머지정리 — f(x)를 (x − a)로 나눈 나머지 = f(a).
// 다항식 f(x) = a3·x³ + a2·x² + a1·x + a0 와 분모 (x − a) 의 a 값을 슬라이더로 변경.
// 조립제법(synthetic division) 표를 단계적으로 보여주고, 결과 나머지가 f(a)와 일치함을 강조.

import { useMemo, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';
import { PresetBar } from '@/components/primitives/PresetBar';

interface PolyState {
  a3: number;
  a2: number;
  a1: number;
  a0: number;
  divisorA: number;
}

const PRESETS = [
  { label: '나머지 0', value: { a3: 1, a2: -1, a1: -4, a0: 4, divisorA: 1 } },
  { label: '나머지 = 5', value: { a3: 1, a2: 0, a1: 0, a0: 5, divisorA: 0 } },
  { label: '인수정리 확인', value: { a3: 1, a2: 0, a1: -3, a0: 2, divisorA: 1 } },
  { label: '음수 a', value: { a3: 1, a2: 2, a1: -1, a0: -2, divisorA: -2 } },
];

function evalPoly(p: PolyState, x: number): number {
  return p.a3 * x ** 3 + p.a2 * x ** 2 + p.a1 * x + p.a0;
}

interface SyntheticRow {
  coef: number;
  bring: number;
}

function syntheticDivide(p: PolyState): { rows: SyntheticRow[]; remainder: number; quotient: number[] } {
  const a = p.divisorA;
  const coefs = [p.a3, p.a2, p.a1, p.a0];
  const rows: SyntheticRow[] = [];
  let bring = 0;
  for (let i = 0; i < coefs.length; i++) {
    const sum = coefs[i] + bring;
    rows.push({ coef: coefs[i], bring });
    bring = sum * a;
  }
  const finalSums = rows.map((r) => r.coef + r.bring);
  const remainder = finalSums[finalSums.length - 1];
  const quotient = finalSums.slice(0, -1);
  return { rows, remainder, quotient };
}

function fmtCoef(v: number): string {
  return Number.isInteger(v) ? v.toString() : v.toFixed(2);
}

export function RemainderTheoremExplorer() {
  const [s, setS] = useState<PolyState>(PRESETS[0].value);
  const sd = useMemo(() => syntheticDivide(s), [s]);
  const fOfA = useMemo(() => evalPoly(s, s.divisorA), [s]);

  return (
    <div className="space-y-4">
      <PresetBar presets={PRESETS} onSelect={(v) => setS(v)} onReset={() => setS(PRESETS[0].value)} />

      <div className="grid gap-2 md:grid-cols-2">
        <SliderRow label="x³ 계수" value={s.a3} min={-3} max={3} step={1} onChange={(v) => setS({ ...s, a3: v })} format={fmtCoef} />
        <SliderRow label="x² 계수" value={s.a2} min={-5} max={5} step={1} onChange={(v) => setS({ ...s, a2: v })} format={fmtCoef} />
        <SliderRow label="x 계수" value={s.a1} min={-5} max={5} step={1} onChange={(v) => setS({ ...s, a1: v })} format={fmtCoef} />
        <SliderRow label="상수항" value={s.a0} min={-9} max={9} step={1} onChange={(v) => setS({ ...s, a0: v })} format={fmtCoef} />
        <SliderRow label="나누는 식 (x − a) 의 a" value={s.divisorA} min={-3} max={3} step={1} onChange={(v) => setS({ ...s, divisorA: v })} format={fmtCoef} />
      </div>

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 p-3 overflow-x-auto">
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">조립제법 (a = {s.divisorA})</div>
        <table className="text-sm font-mono w-full min-w-[20rem]">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="px-2 py-1 text-left">단계</th>
              <th className="px-2 py-1">x³</th>
              <th className="px-2 py-1">x²</th>
              <th className="px-2 py-1">x</th>
              <th className="px-2 py-1">상수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1 text-zinc-500">계수</td>
              {sd.rows.map((r, i) => (
                <td key={`c${i}`} className="px-2 py-1 text-center">{fmtCoef(r.coef)}</td>
              ))}
            </tr>
            <tr>
              <td className="px-2 py-1 text-zinc-500">↓ 더할 값</td>
              {sd.rows.map((r, i) => (
                <td key={`b${i}`} className="px-2 py-1 text-center text-amber-600 dark:text-amber-400">
                  {i === 0 ? '' : `+${fmtCoef(r.bring)}`}
                </td>
              ))}
            </tr>
            <tr className="border-t border-zinc-200 dark:border-zinc-700 font-bold">
              <td className="px-2 py-1 text-zinc-500">합</td>
              {sd.rows.map((r, i) => (
                <td key={`s${i}`} className={`px-2 py-1 text-center ${i === sd.rows.length - 1 ? 'text-red-600 dark:text-red-400' : 'text-blue-700 dark:text-blue-400'}`}>
                  {fmtCoef(r.coef + r.bring)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid gap-2 md:grid-cols-2 text-sm">
        <div className="rounded-md bg-blue-50 dark:bg-blue-950/40 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">몫 Q(x)</div>
          <div className="font-mono mt-1 text-blue-700 dark:text-blue-300">
            {sd.quotient.map((c, i) => `${i === 0 || c < 0 ? '' : '+'}${fmtCoef(c)}x^${sd.quotient.length - 1 - i}`).join(' ').replace(/x\^0/g, '').replace(/x\^1/g, 'x')}
          </div>
        </div>
        <div className="rounded-md bg-red-50 dark:bg-red-950/40 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">나머지 = f(a)</div>
          <div className="font-mono mt-1 text-red-700 dark:text-red-300">
            R = {fmtCoef(sd.remainder)} &nbsp; / &nbsp; f({s.divisorA}) = {fmtCoef(fOfA)}
          </div>
          <div className="text-xs mt-1 text-zinc-500 dark:text-zinc-400">{Math.abs(sd.remainder - fOfA) < 1e-9 ? '✓ 일치 (나머지정리)' : '계산 확인'}</div>
        </div>
      </div>

      {Math.abs(sd.remainder) < 1e-9 ? (
        <div className="rounded-md bg-emerald-50 dark:bg-emerald-950/40 p-3 text-sm text-emerald-700 dark:text-emerald-300">
          나머지 0 → (x − {s.divisorA}) 가 f(x) 의 인수예요. <strong>인수정리</strong>가 성립.
        </div>
      ) : null}
    </div>
  );
}
