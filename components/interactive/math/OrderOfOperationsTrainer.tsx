'use client';

// M5-NA-01 자연수의 혼합 계산 — 연산 우선순위 시각화.

import { useMemo, useState } from 'react';

interface Step {
  expr: string;
  highlight: [number, number] | null;
  rule: string;
}

const PRESETS = [
  '12 + 3 × 4',
  '20 - 8 ÷ 2',
  '(6 + 4) × 3',
  '15 + 9 ÷ 3 × 2',
];

export function OrderOfOperationsTrainer() {
  const [expr, setExpr] = useState(PRESETS[0]);
  const [stepIdx, setStepIdx] = useState(0);

  const steps = useMemo(() => buildSteps(expr), [expr]);
  const cur = steps[Math.min(stepIdx, steps.length - 1)];

  const reset = (e: string) => {
    setExpr(e);
    setStepIdx(0);
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          연산 순서 — 어디부터 계산해?
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          순서: <strong>괄호 → ×, ÷ (왼쪽부터) → +, − (왼쪽부터)</strong>. 한 단계씩 넘기며 보세요.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => reset(p)}
            className={`px-3 py-2 text-xs rounded-md border min-h-[44px] ${
              expr === p
                ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-500 ring-2 ring-blue-300'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-6 text-center">
        <div className="font-mono text-3xl text-zinc-900 dark:text-zinc-100 mb-2">
          {cur.highlight ? renderHighlighted(cur.expr, cur.highlight) : cur.expr}
        </div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">{cur.rule}</div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
          disabled={stepIdx === 0}
          className="px-3 py-2 text-sm rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 disabled:opacity-40 hover:bg-zinc-50 dark:hover:bg-zinc-800 min-h-[44px]"
        >
          ← 이전
        </button>
        <span className="text-xs text-zinc-500">
          {Math.min(stepIdx, steps.length - 1) + 1} / {steps.length}
        </span>
        <button
          type="button"
          onClick={() => setStepIdx((i) => Math.min(steps.length - 1, i + 1))}
          disabled={stepIdx >= steps.length - 1}
          className="px-3 py-2 text-sm rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 disabled:opacity-40 hover:bg-zinc-50 dark:hover:bg-zinc-800 min-h-[44px]"
        >
          다음 →
        </button>
      </div>
    </div>
  );
}

function renderHighlighted(expr: string, [start, end]: [number, number]) {
  return (
    <>
      <span>{expr.slice(0, start)}</span>
      <span className="bg-yellow-300 dark:bg-yellow-500/40 px-1 rounded">{expr.slice(start, end)}</span>
      <span>{expr.slice(end)}</span>
    </>
  );
}

function buildSteps(expr: string): Step[] {
  const steps: Step[] = [{ expr, highlight: null, rule: '원래 식' }];
  let cur = expr;

  while (true) {
    const parenMatch = cur.match(/\(([^()]+)\)/);
    if (parenMatch) {
      const start = parenMatch.index!;
      const end = start + parenMatch[0].length;
      steps.push({ expr: cur, highlight: [start, end], rule: '괄호 안부터 계산' });
      const inner = evalSimple(parenMatch[1]);
      cur = cur.slice(0, start) + inner + cur.slice(end);
      steps.push({ expr: cur, highlight: null, rule: `괄호 결과: ${inner}` });
      continue;
    }

    const mdMatch = cur.match(/(\d+)\s*([×÷])\s*(\d+)/);
    if (mdMatch) {
      const start = mdMatch.index!;
      const end = start + mdMatch[0].length;
      steps.push({ expr: cur, highlight: [start, end], rule: '× ÷ 먼저 (왼쪽부터)' });
      const r = evalSimple(mdMatch[0]);
      cur = cur.slice(0, start) + r + cur.slice(end);
      steps.push({ expr: cur, highlight: null, rule: `결과: ${r}` });
      continue;
    }

    const asMatch = cur.match(/(\d+)\s*([+\-])\s*(\d+)/);
    if (asMatch) {
      const start = asMatch.index!;
      const end = start + asMatch[0].length;
      steps.push({ expr: cur, highlight: [start, end], rule: '+ − 마지막 (왼쪽부터)' });
      const r = evalSimple(asMatch[0]);
      cur = cur.slice(0, start) + r + cur.slice(end);
      steps.push({ expr: cur, highlight: null, rule: `결과: ${r}` });
      continue;
    }

    break;
  }

  steps.push({ expr: cur, highlight: null, rule: '✓ 완료' });
  return steps;
}

function evalSimple(s: string): string {
  const m = s.match(/(\d+)\s*([×÷+\-])\s*(\d+)/);
  if (!m) return s;
  const a = Number(m[1]);
  const b = Number(m[3]);
  const op = m[2];
  let r = 0;
  if (op === '×') r = a * b;
  else if (op === '÷') r = a / b;
  else if (op === '+') r = a + b;
  else r = a - b;
  return String(r);
}
