'use client';

// M-CM1-01 다항식 — 두 다항식의 덧셈·뺄셈·곱을 동류항 정렬로 시각화.
// 슬라이더로 1차/2차 계수를 바꾸면 결과 다항식이 즉시 갱신.

import { useMemo, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';
import { PresetBar } from '@/components/primitives/PresetBar';

interface Poly {
  a2: number;
  a1: number;
  a0: number;
}

const PRESETS = [
  { label: '동류항 합치기', value: { A: { a2: 1, a1: 2, a0: 3 }, B: { a2: 2, a1: -1, a0: 4 } } },
  { label: '차의 제곱 형', value: { A: { a2: 1, a1: -3, a0: 0 }, B: { a2: 0, a1: 1, a0: -3 } } },
  { label: '곱셈 → 2차', value: { A: { a2: 0, a1: 1, a0: 2 }, B: { a2: 0, a1: 1, a0: -2 } } },
  { label: '0차 (상수)', value: { A: { a2: 0, a1: 0, a0: 5 }, B: { a2: 0, a1: 0, a0: 7 } } },
];

function add(a: Poly, b: Poly): Poly {
  return { a2: a.a2 + b.a2, a1: a.a1 + b.a1, a0: a.a0 + b.a0 };
}

function sub(a: Poly, b: Poly): Poly {
  return { a2: a.a2 - b.a2, a1: a.a1 - b.a1, a0: a.a0 - b.a0 };
}

interface ProductTerm {
  coef: number;
  deg: number;
}

function multiply(a: Poly, b: Poly): ProductTerm[] {
  const aTerms: ProductTerm[] = [
    { coef: a.a2, deg: 2 },
    { coef: a.a1, deg: 1 },
    { coef: a.a0, deg: 0 },
  ].filter((t) => t.coef !== 0);
  const bTerms: ProductTerm[] = [
    { coef: b.a2, deg: 2 },
    { coef: b.a1, deg: 1 },
    { coef: b.a0, deg: 0 },
  ].filter((t) => t.coef !== 0);
  const buckets: Record<number, number> = {};
  for (const x of aTerms) {
    for (const y of bTerms) {
      const d = x.deg + y.deg;
      buckets[d] = (buckets[d] ?? 0) + x.coef * y.coef;
    }
  }
  const out: ProductTerm[] = [];
  for (const k of Object.keys(buckets)
    .map(Number)
    .sort((p, q) => q - p)) {
    if (buckets[k] !== 0) out.push({ coef: buckets[k], deg: k });
  }
  return out;
}

function fmtSimple(p: Poly): string {
  const parts: string[] = [];
  if (p.a2 !== 0) parts.push(`${p.a2 === 1 ? '' : p.a2 === -1 ? '-' : p.a2}x²`);
  if (p.a1 !== 0) {
    const sign = p.a1 > 0 && parts.length > 0 ? '+ ' : p.a1 < 0 ? '- ' : '';
    const abs = Math.abs(p.a1);
    parts.push(`${sign}${abs === 1 ? '' : abs}x`);
  }
  if (p.a0 !== 0) {
    const sign = p.a0 > 0 && parts.length > 0 ? '+ ' : p.a0 < 0 ? '- ' : '';
    parts.push(`${sign}${Math.abs(p.a0)}`);
  }
  return parts.length === 0 ? '0' : parts.join(' ');
}

function fmtTerms(terms: ProductTerm[]): string {
  if (terms.length === 0) return '0';
  return terms
    .map((t, i) => {
      const sign = t.coef > 0 && i > 0 ? '+ ' : t.coef < 0 ? '- ' : '';
      const abs = Math.abs(t.coef);
      const coefStr = abs === 1 && t.deg !== 0 ? '' : `${abs}`;
      const varStr = t.deg === 0 ? '' : t.deg === 1 ? 'x' : `x^${t.deg}`;
      return `${sign}${coefStr}${varStr}`.trim();
    })
    .join(' ');
}

export function PolynomialOperationsExplorer() {
  const [A, setA] = useState<Poly>({ a2: 1, a1: 2, a0: 3 });
  const [B, setB] = useState<Poly>({ a2: 2, a1: -1, a0: 4 });

  const sumP = useMemo(() => add(A, B), [A, B]);
  const diffP = useMemo(() => sub(A, B), [A, B]);
  const prodTerms = useMemo(() => multiply(A, B), [A, B]);

  const reset = () => {
    setA({ a2: 1, a1: 2, a0: 3 });
    setB({ a2: 2, a1: -1, a0: 4 });
  };

  return (
    <div className="space-y-4">
      <PresetBar
        presets={PRESETS}
        onSelect={(v) => {
          setA(v.A);
          setB(v.B);
        }}
        onReset={reset}
      />

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2 rounded-lg border border-zinc-200 dark:border-zinc-700 p-3">
          <div className="text-sm font-bold text-blue-700 dark:text-blue-400">A(x) = {fmtSimple(A) || '0'}</div>
          <SliderRow label="x² 계수" value={A.a2} min={-3} max={3} step={1} onChange={(v) => setA({ ...A, a2: v })} format={(v) => v.toFixed(0)} />
          <SliderRow label="x 계수" value={A.a1} min={-5} max={5} step={1} onChange={(v) => setA({ ...A, a1: v })} format={(v) => v.toFixed(0)} />
          <SliderRow label="상수항" value={A.a0} min={-9} max={9} step={1} onChange={(v) => setA({ ...A, a0: v })} format={(v) => v.toFixed(0)} />
        </div>
        <div className="space-y-2 rounded-lg border border-zinc-200 dark:border-zinc-700 p-3">
          <div className="text-sm font-bold text-blue-700 dark:text-blue-400">B(x) = {fmtSimple(B) || '0'}</div>
          <SliderRow label="x² 계수" value={B.a2} min={-3} max={3} step={1} onChange={(v) => setB({ ...B, a2: v })} format={(v) => v.toFixed(0)} />
          <SliderRow label="x 계수" value={B.a1} min={-5} max={5} step={1} onChange={(v) => setB({ ...B, a1: v })} format={(v) => v.toFixed(0)} />
          <SliderRow label="상수항" value={B.a0} min={-9} max={9} step={1} onChange={(v) => setB({ ...B, a0: v })} format={(v) => v.toFixed(0)} />
        </div>
      </div>

      <div className="grid gap-2 md:grid-cols-3 text-sm">
        <div className="rounded-md bg-blue-50 dark:bg-blue-950/40 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">A + B</div>
          <div className="font-mono text-blue-700 dark:text-blue-300 mt-1">{fmtSimple(sumP) || '0'}</div>
        </div>
        <div className="rounded-md bg-amber-50 dark:bg-amber-950/40 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">A − B</div>
          <div className="font-mono text-amber-700 dark:text-amber-300 mt-1">{fmtSimple(diffP) || '0'}</div>
        </div>
        <div className="rounded-md bg-emerald-50 dark:bg-emerald-950/40 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">A × B</div>
          <div className="font-mono text-emerald-700 dark:text-emerald-300 mt-1 break-words">{fmtTerms(prodTerms)}</div>
        </div>
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 곱셈은 「분배 → 차수별 모으기」가 핵심. x² + x + 상수까지 차수 5까지 자동으로 합쳐줘요.
      </p>
    </div>
  );
}
