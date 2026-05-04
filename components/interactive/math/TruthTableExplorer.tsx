'use client';

// M-CM2-06 명제 — 두 명제 p, q 에 대한 진리표.
// p, q 의 참/거짓 토글 + 연산자 선택 (∧, ∨, →, ↔).
// 「역·이·대우」 표를 동시에 보여 동치 관계 확인.

import { useMemo, useState } from 'react';

type Op = 'and' | 'or' | 'imply' | 'iff';

const OP_LABEL: Record<Op, string> = {
  and: 'p ∧ q (그리고)',
  or: 'p ∨ q (또는)',
  imply: 'p → q (조건문)',
  iff: 'p ↔ q (필요충분)',
};

function evalOp(op: Op, p: boolean, q: boolean): boolean {
  switch (op) {
    case 'and':
      return p && q;
    case 'or':
      return p || q;
    case 'imply':
      return !p || q;
    case 'iff':
      return p === q;
  }
}

function tf(b: boolean): string {
  return b ? 'T' : 'F';
}

const TF_CLASS = (b: boolean) => (b ? 'text-blue-700 dark:text-blue-400' : 'text-red-600 dark:text-red-400');

export function TruthTableExplorer() {
  const [op, setOp] = useState<Op>('imply');

  const rows = useMemo(() => {
    const out = [];
    for (const p of [true, false]) {
      for (const q of [true, false]) {
        out.push({
          p,
          q,
          notP: !p,
          notQ: !q,
          original: evalOp(op, p, q),
          converse: evalOp(op, q, p),
          inverse: evalOp(op, !p, !q),
          contrapositive: evalOp(op, !q, !p),
        });
      }
    }
    return out;
  }, [op]);

  // 동치 검사: original ≡ contrapositive ?
  const equiv = useMemo(() => {
    return rows.every((r) => r.original === r.contrapositive);
  }, [rows]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(OP_LABEL) as Op[]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setOp(k)}
            className={`px-3 py-2 border rounded-md text-sm min-h-[44px] ${
              op === k
                ? 'border-blue-700 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400'
                : 'border-zinc-300 dark:border-zinc-700 hover:border-blue-700'
            }`}
          >
            {OP_LABEL[k]}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-700">
        <table className="w-full text-sm font-mono">
          <thead className="bg-zinc-50 dark:bg-zinc-900">
            <tr className="text-xs text-zinc-500">
              <th className="px-2 py-2">p</th>
              <th className="px-2 py-2">q</th>
              <th className="px-2 py-2">¬p</th>
              <th className="px-2 py-2">¬q</th>
              <th className="px-2 py-2 border-l border-zinc-200 dark:border-zinc-700">원명제</th>
              <th className="px-2 py-2">역 (q ∘ p)</th>
              <th className="px-2 py-2">이 (¬p ∘ ¬q)</th>
              <th className="px-2 py-2">대우 (¬q ∘ ¬p)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-zinc-200 dark:border-zinc-800">
                <td className={`px-2 py-2 text-center ${TF_CLASS(r.p)}`}>{tf(r.p)}</td>
                <td className={`px-2 py-2 text-center ${TF_CLASS(r.q)}`}>{tf(r.q)}</td>
                <td className={`px-2 py-2 text-center ${TF_CLASS(r.notP)}`}>{tf(r.notP)}</td>
                <td className={`px-2 py-2 text-center ${TF_CLASS(r.notQ)}`}>{tf(r.notQ)}</td>
                <td className={`px-2 py-2 text-center border-l border-zinc-200 dark:border-zinc-700 ${TF_CLASS(r.original)}`}>{tf(r.original)}</td>
                <td className={`px-2 py-2 text-center ${TF_CLASS(r.converse)}`}>{tf(r.converse)}</td>
                <td className={`px-2 py-2 text-center ${TF_CLASS(r.inverse)}`}>{tf(r.inverse)}</td>
                <td className={`px-2 py-2 text-center ${TF_CLASS(r.contrapositive)}`}>{tf(r.contrapositive)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`rounded-md p-3 text-sm ${equiv ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300' : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'}`}>
        {equiv
          ? `★ 원명제 ≡ 대우 (모든 행에서 진리값이 같다). 「대우는 항상 원명제와 동치」 — 증명에 자주 쓰여요.`
          : `이 연산자에서는 원명제와 대우의 진리값이 행별로 같지 않을 수 있어요. 조건문(p → q)에서만 「대우 동치」가 성립.`}
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ p → q 의 역(q → p) 과 이(¬p → ¬q) 도 서로 동치예요. 「원 ≡ 대우, 역 ≡ 이」 두 짝을 기억.
      </p>
    </div>
  );
}
