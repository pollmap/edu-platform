'use client';

// M-CA2-06 적분 (치환·부분) — 두 핵심 적분 기법 비교.

import { useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';

type Tech = 'sub' | 'parts';

interface Example {
  id: string;
  techExpect: Tech;
  problem: string;
  hint: string;
  step1: string;
  step2: string;
  answer: string;
}

const EXAMPLES: Example[] = [
  {
    id: 'sub1',
    techExpect: 'sub',
    problem: '\\int 2x \\cos(x^2) \\, dx',
    hint: 'u = x², du = 2x dx 로 치환.',
    step1: 'u = x^2,\\ du = 2x\\,dx',
    step2: '\\int \\cos u\\,du = \\sin u + C',
    answer: '\\sin(x^2) + C',
  },
  {
    id: 'sub2',
    techExpect: 'sub',
    problem: '\\int \\frac{1}{x \\ln x}\\, dx',
    hint: 'u = ln x, du = (1/x) dx 로 치환.',
    step1: 'u = \\ln x,\\ du = \\frac{1}{x} dx',
    step2: '\\int \\frac{1}{u}\\,du = \\ln |u| + C',
    answer: '\\ln |\\ln x| + C',
  },
  {
    id: 'parts1',
    techExpect: 'parts',
    problem: '\\int x e^x \\, dx',
    hint: 'LIATE: x를 u, e^x dx를 dv 로.',
    step1: 'u = x,\\ dv = e^x dx,\\ du = dx,\\ v = e^x',
    step2: 'uv - \\int v\\,du = xe^x - \\int e^x\\,dx',
    answer: 'xe^x - e^x + C',
  },
  {
    id: 'parts2',
    techExpect: 'parts',
    problem: '\\int x \\ln x \\, dx',
    hint: 'ln x를 u, x dx를 dv 로.',
    step1: 'u = \\ln x,\\ dv = x\\,dx,\\ du = \\frac{1}{x} dx,\\ v = \\frac{x^2}{2}',
    step2: '\\frac{x^2}{2}\\ln x - \\int \\frac{x^2}{2}\\cdot\\frac{1}{x}\\,dx',
    answer: '\\frac{x^2}{2}\\ln x - \\frac{x^2}{4} + C',
  },
];

export function IntegrationTechniquesExplorer() {
  const [tech, setTech] = useState<Tech>('sub');
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(false);

  const filtered = EXAMPLES.filter((e) => e.techExpect === tech);
  const current = filtered[idx % filtered.length];

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          적분 — 치환과 부분, 두 핵심 기법
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          치환적분 = 미분의 연쇄법칙 역방향. 부분적분 = 곱의 미분 역방향.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => {
            setTech('sub');
            setIdx(0);
            setShow(false);
          }}
          className={`px-3 py-2 rounded-md text-sm font-semibold min-h-[44px] ${
            tech === 'sub' ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800'
          }`}
        >
          치환적분
        </button>
        <button
          type="button"
          onClick={() => {
            setTech('parts');
            setIdx(0);
            setShow(false);
          }}
          className={`px-3 py-2 rounded-md text-sm font-semibold min-h-[44px] ${
            tech === 'parts' ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800'
          }`}
        >
          부분적분
        </button>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3 text-center">
        {tech === 'sub' ? (
          <MathFormula tex={'\\int f(g(x))\\,g\'(x)\\,dx = \\int f(u)\\,du'} />
        ) : (
          <MathFormula tex={'\\int u\\,dv = uv - \\int v\\,du'} />
        )}
      </div>

      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 space-y-3">
        <div className="text-xs text-zinc-500">문제 {idx + 1} / {filtered.length}</div>
        <div className="text-center text-lg">
          <MathFormula tex={current.problem} />
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">힌트: {current.hint}</p>

        {show ? (
          <div className="space-y-2 text-sm">
            <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800 p-3">
              <div className="text-xs font-semibold text-zinc-500 mb-1">Step 1</div>
              <MathFormula tex={current.step1} />
            </div>
            <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800 p-3">
              <div className="text-xs font-semibold text-zinc-500 mb-1">Step 2</div>
              <MathFormula tex={current.step2} />
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-3">
              <div className="text-xs font-semibold text-amber-600 mb-1">정답</div>
              <MathFormula tex={current.answer} />
            </div>
          </div>
        ) : null}

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-semibold min-h-[44px] flex-1"
          >
            {show ? '풀이 숨기기' : '풀이 보기'}
          </button>
          <button
            type="button"
            onClick={() => {
              setIdx((i) => (i + 1) % filtered.length);
              setShow(false);
            }}
            className="px-4 py-2 rounded-md bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 text-sm font-semibold min-h-[44px] flex-1"
          >
            다음 문제
          </button>
        </div>
      </div>
    </div>
  );
}
