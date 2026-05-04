'use client';

// M-CM1-03 인수분해 — 다항식 패턴을 보고 알맞은 인수분해 형태를 고르는 트레이너.
// 패턴 5종(공통인수, 완전제곱, 합차, 이차삼항식, 삼차합차).

import { useMemo, useState } from 'react';

type PatternKey = 'common' | 'square' | 'sumDiff' | 'trinomial' | 'cube';

interface Problem {
  question: string;
  answer: string;
  pattern: PatternKey;
  explanation: string;
}

const PROBLEMS: Problem[] = [
  {
    question: '6x² + 9x',
    answer: '3x(2x + 3)',
    pattern: 'common',
    explanation: '공통인수 3x를 묶어요.',
  },
  {
    question: 'x² + 6x + 9',
    answer: '(x + 3)²',
    pattern: 'square',
    explanation: 'a² + 2ab + b² = (a + b)². 6x = 2·x·3 이라서 b = 3.',
  },
  {
    question: 'x² − 25',
    answer: '(x + 5)(x − 5)',
    pattern: 'sumDiff',
    explanation: 'a² − b² = (a + b)(a − b). 25 = 5².',
  },
  {
    question: 'x² + 5x + 6',
    answer: '(x + 2)(x + 3)',
    pattern: 'trinomial',
    explanation: '곱이 6, 합이 5인 두 수 = 2와 3.',
  },
  {
    question: 'x³ − 8',
    answer: '(x − 2)(x² + 2x + 4)',
    pattern: 'cube',
    explanation: 'a³ − b³ = (a − b)(a² + ab + b²). 8 = 2³.',
  },
  {
    question: 'x² − 10x + 25',
    answer: '(x − 5)²',
    pattern: 'square',
    explanation: 'a² − 2ab + b² = (a − b)². 10x = 2·x·5.',
  },
  {
    question: '4x² − 9',
    answer: '(2x + 3)(2x − 3)',
    pattern: 'sumDiff',
    explanation: '(2x)² − 3².',
  },
  {
    question: 'x² − 7x + 12',
    answer: '(x − 3)(x − 4)',
    pattern: 'trinomial',
    explanation: '곱이 12, 합이 −7인 두 수 = −3과 −4.',
  },
];

const PATTERN_LABEL: Record<PatternKey, string> = {
  common: '공통인수',
  square: '완전제곱식',
  sumDiff: '합·차의 곱',
  trinomial: 'x² + (a+b)x + ab',
  cube: '세제곱 합·차',
};

export function FactoringPatternMatcher() {
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [selected, setSelected] = useState<PatternKey | null>(null);

  const problem = PROBLEMS[idx];
  const isCorrect = selected === problem.pattern;

  const next = () => {
    setIdx((idx + 1) % PROBLEMS.length);
    setRevealed(false);
    setSelected(null);
  };

  const prev = () => {
    setIdx((idx - 1 + PROBLEMS.length) % PROBLEMS.length);
    setRevealed(false);
    setSelected(null);
  };

  const patterns: PatternKey[] = useMemo(() => ['common', 'square', 'sumDiff', 'trinomial', 'cube'], []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center text-sm text-zinc-500">
        <span>문제 {idx + 1} / {PROBLEMS.length}</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={prev}
            className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 min-h-[44px]"
          >
            이전
          </button>
          <button
            type="button"
            onClick={next}
            className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 min-h-[44px]"
          >
            다음
          </button>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-6 text-center">
        <div className="text-xs text-zinc-500 mb-2">다음 식의 패턴은?</div>
        <div className="text-2xl font-mono font-bold text-blue-700 dark:text-blue-400">{problem.question}</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {patterns.map((p) => {
          const isThis = selected === p;
          const showResult = revealed && isThis;
          const correctMark = revealed && p === problem.pattern;
          let cls = 'px-3 py-3 border rounded-md text-sm min-h-[44px] transition-colors ';
          if (correctMark) cls += 'bg-green-100 dark:bg-green-950/40 border-green-500 text-green-700 dark:text-green-400';
          else if (showResult && !isCorrect) cls += 'bg-red-100 dark:bg-red-950/40 border-red-500 text-red-700 dark:text-red-400';
          else if (isThis) cls += 'border-blue-700 text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30';
          else cls += 'border-zinc-300 dark:border-zinc-700 hover:border-blue-700 hover:text-blue-700 dark:hover:text-blue-400';
          return (
            <button
              key={p}
              type="button"
              onClick={() => {
                setSelected(p);
                setRevealed(true);
              }}
              className={cls}
            >
              {PATTERN_LABEL[p]}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className={`rounded-lg p-4 text-sm ${isCorrect ? 'bg-green-50 dark:bg-green-950/30 border border-green-300 dark:border-green-900' : 'bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-900'}`}>
          <div className="font-bold mb-1">
            {isCorrect ? '정답!' : `정답은 「${PATTERN_LABEL[problem.pattern]}」`}
          </div>
          <div className="font-mono text-blue-700 dark:text-blue-400 mb-1">{problem.question} = {problem.answer}</div>
          <div className="text-xs text-zinc-600 dark:text-zinc-400">{problem.explanation}</div>
        </div>
      )}
    </div>
  );
}
