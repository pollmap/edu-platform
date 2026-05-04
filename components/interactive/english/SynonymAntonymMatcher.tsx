'use client';

// E-VOC-03 동의어·반의어 — 매칭 게임.

import { useState } from 'react';

interface Pair {
  word: string;
  syn: string;
  ant: string;
  meaning: string;
}

const PAIRS: Pair[] = [
  { word: 'happy', syn: 'glad', ant: 'sad', meaning: '행복한' },
  { word: 'big', syn: 'huge', ant: 'small', meaning: '큰' },
  { word: 'fast', syn: 'quick', ant: 'slow', meaning: '빠른' },
  { word: 'easy', syn: 'simple', ant: 'difficult', meaning: '쉬운' },
  { word: 'cold', syn: 'chilly', ant: 'hot', meaning: '추운' },
  { word: 'old', syn: 'aged', ant: 'young', meaning: '나이 든' },
  { word: 'rich', syn: 'wealthy', ant: 'poor', meaning: '부유한' },
  { word: 'strong', syn: 'powerful', ant: 'weak', meaning: '강한' },
];

export function SynonymAntonymMatcher() {
  const [idx, setIdx] = useState(0);
  const [reveal, setReveal] = useState(false);

  const cur = PAIRS[idx];
  const next = () => {
    setReveal(false);
    setIdx((i) => (i + 1) % PAIRS.length);
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-1">
          동의어 (synonym) · 반의어 (antonym)
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          <strong>동의어</strong>는 비슷한 뜻 단어, <strong>반의어</strong>는 반대 뜻 단어.
          한 단어를 외울 때 동의어·반의어를 같이 익히면 어휘가 3배로 늘어요.
        </p>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border-2 border-zinc-200 dark:border-zinc-800 p-6 text-center space-y-3">
        <div className="text-xs text-zinc-500 dark:text-zinc-400">단어 {idx + 1} / {PAIRS.length}</div>
        <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">{cur.word}</div>
        <div className="text-sm text-zinc-600 dark:text-zinc-400">뜻: {cur.meaning}</div>

        {reveal ? (
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="rounded-lg bg-green-50 dark:bg-green-950/30 border-l-4 border-green-500 p-3">
              <div className="text-xs text-green-700 dark:text-green-300 font-bold mb-1">동의어 (= 비슷)</div>
              <div className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{cur.syn}</div>
            </div>
            <div className="rounded-lg bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-3">
              <div className="text-xs text-red-700 dark:text-red-300 font-bold mb-1">반의어 (= 반대)</div>
              <div className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{cur.ant}</div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setReveal(true)}
            className="mt-4 px-4 py-3 rounded-md bg-purple-600 text-white font-bold hover:bg-purple-700 min-h-[44px]"
          >
            동의어 · 반의어 보기
          </button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => { setReveal(false); setIdx((i) => (i - 1 + PAIRS.length) % PAIRS.length); }}
          className="px-3 py-2 text-sm rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 min-h-[44px]"
        >
          ← 이전
        </button>
        <button
          type="button"
          onClick={next}
          className="px-3 py-2 text-sm rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 min-h-[44px]"
        >
          다음 →
        </button>
      </div>

      <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950/40 p-3 text-xs text-zinc-600 dark:text-zinc-400">
        💡 <strong>팁</strong>: 영어 시험에서는 "비슷한 뜻 단어 고르기"가 자주 나와요. 단어 하나를 외울 때 동의어 1개, 반의어 1개를 같이 외우는 습관을 들이세요.
      </div>
    </div>
  );
}
