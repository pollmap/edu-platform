'use client';

// E-GR-01 명사·관사 — a / an / the / 무관사 빈칸 채우기.

import { useMemo, useState } from 'react';

type Article = 'a' | 'an' | 'the' | '∅';

interface Question {
  id: number;
  before: string;
  noun: string;
  after: string;
  answer: Article;
  reason: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    before: 'I have ',
    noun: 'apple',
    after: ' in my bag.',
    answer: 'an',
    reason: '셀 수 있는 단수 명사 + 모음(a/e/i/o/u) 발음 시작 → an',
  },
  {
    id: 2,
    before: 'She is ',
    noun: 'university student',
    after: '.',
    answer: 'a',
    reason: 'university는 [yu] 자음 발음으로 시작 → a',
  },
  {
    id: 3,
    before: '',
    noun: 'sun',
    after: ' rises in the east.',
    answer: 'the',
    reason: '세상에 하나뿐인 것 (해, 달, 지구) → the',
  },
  {
    id: 4,
    before: 'I love ',
    noun: 'music',
    after: '.',
    answer: '∅',
    reason: '셀 수 없는 명사를 일반적 의미로 말할 때 → 무관사',
  },
  {
    id: 5,
    before: 'Can you pass me ',
    noun: 'salt',
    after: ', please?',
    answer: 'the',
    reason: '듣는 사람도 어떤 것인지 아는 (식탁 위) 그 소금 → the',
  },
  {
    id: 6,
    before: 'He plays ',
    noun: 'guitar',
    after: ' very well.',
    answer: 'the',
    reason: '악기 연주 표현은 보통 the + 악기',
  },
  {
    id: 7,
    before: 'My brother goes to ',
    noun: 'school',
    after: ' by bus.',
    answer: '∅',
    reason: '본래 목적(공부하러)으로 갈 때는 무관사',
  },
  {
    id: 8,
    before: 'I saw ',
    noun: 'honest man',
    after: ' on the bus.',
    answer: 'an',
    reason: 'honest의 h는 묵음 → 발음이 모음으로 시작 → an',
  },
];

const OPTIONS: Article[] = ['a', 'an', 'the', '∅'];

export function NounArticleExplorer() {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<Article | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const cur = QUESTIONS[idx];
  const isAnswered = picked !== null;
  const isCorrect = picked === cur.answer;

  const choose = (opt: Article) => {
    if (isAnswered) return;
    setPicked(opt);
    setScore((s) => ({
      correct: s.correct + (opt === cur.answer ? 1 : 0),
      total: s.total + 1,
    }));
  };

  const next = () => {
    setPicked(null);
    setIdx((i) => (i + 1) % QUESTIONS.length);
  };

  const accuracy = useMemo(
    () => (score.total === 0 ? 0 : Math.round((score.correct / score.total) * 100)),
    [score],
  );

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-1">
          관사 빈칸 채우기
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          <strong>a / an</strong> = 처음 말하는 ‘하나’, <strong>the</strong> = 서로 아는 ‘그것’,
          <strong>∅(무관사)</strong> = 일반 개념·복수·셀 수 없는 명사.
        </p>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border-2 border-zinc-200 dark:border-zinc-800 p-6">
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
          문제 {idx + 1} / {QUESTIONS.length} · 정답률 {accuracy}%
        </div>
        <div className="text-lg sm:text-xl font-mono leading-relaxed text-zinc-900 dark:text-zinc-100 mb-5">
          {cur.before}
          <span
            className={`mx-1 px-2 py-1 rounded border-2 border-dashed ${
              isAnswered
                ? isCorrect
                  ? 'border-green-500 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300'
                  : 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300'
                : 'border-purple-400 text-purple-700 dark:text-purple-300'
            }`}
          >
            {isAnswered ? cur.answer : '___'}
          </span>{' '}
          <strong>{cur.noun}</strong>
          {cur.after}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {OPTIONS.map((opt) => {
            const sel = picked === opt;
            const correct = isAnswered && opt === cur.answer;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => choose(opt)}
                disabled={isAnswered}
                className={`min-h-[44px] px-3 py-2 rounded-md border-2 font-mono text-base transition ${
                  correct
                    ? 'border-green-500 bg-green-100 dark:bg-green-950/40 text-green-800 dark:text-green-200'
                    : sel
                    ? 'border-red-500 bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-200'
                    : 'border-zinc-300 dark:border-zinc-700 hover:border-purple-500 text-zinc-800 dark:text-zinc-200'
                }`}
                aria-label={`옵션 ${opt}`}
              >
                {opt === '∅' ? '∅ (무관사)' : opt}
              </button>
            );
          })}
        </div>
      </div>

      {isAnswered && (
        <div
          className={`rounded-lg p-4 border-l-4 ${
            isCorrect
              ? 'bg-green-50 dark:bg-green-950/30 border-green-500'
              : 'bg-amber-50 dark:bg-amber-950/30 border-amber-500'
          }`}
        >
          <div className="text-sm font-bold mb-1 text-zinc-900 dark:text-zinc-100">
            {isCorrect ? '✓ 맞아요!' : '✗ 정답: ' + cur.answer}
          </div>
          <div className="text-sm text-zinc-700 dark:text-zinc-300">{cur.reason}</div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={next}
          className="px-4 py-2 rounded-md bg-purple-600 text-white font-bold hover:bg-purple-700 min-h-[44px]"
        >
          다음 문제 →
        </button>
      </div>

      <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950/40 p-3 text-xs text-zinc-600 dark:text-zinc-400">
        💡 <strong>팁</strong>: ‘처음 등장 = a/an · 다시 등장 = the’ 가 가장 흔한 패턴이에요.
        a/an은 글자가 아니라 <strong>발음</strong> 기준입니다 (an honest, a university).
      </div>
    </div>
  );
}
