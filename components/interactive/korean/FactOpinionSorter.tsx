'use client';

// K-RD-02 사실과 의견 — 문장 분류 게임.

import { useState } from 'react';

interface Sentence {
  text: string;
  type: 'fact' | 'opinion';
  hint: string;
}

const POOL: Sentence[] = [
  { text: '한국의 수도는 서울이다.', type: 'fact', hint: '검증 가능 (지도·자료)' },
  { text: '서울은 정말 살기 좋은 도시이다.', type: 'opinion', hint: '"좋다" = 주관적 평가' },
  { text: '물은 100°C에서 끓는다 (1기압).', type: 'fact', hint: '실험으로 확인 가능' },
  { text: '여름에는 아이스크림이 최고다.', type: 'opinion', hint: '"최고" = 개인 취향' },
  { text: '지구는 태양 주위를 1년에 한 바퀴 돈다.', type: 'fact', hint: '천문학으로 측정' },
  { text: '강아지가 고양이보다 똑똑하다.', type: 'opinion', hint: '"똑똑하다" 비교는 기준 따라 다름' },
  { text: '한글은 1443년에 창제되었다.', type: 'fact', hint: '역사 기록' },
  { text: '한글은 세계에서 가장 과학적인 글자다.', type: 'opinion', hint: '"가장 ~한"은 평가' },
];

export function FactOpinionSorter() {
  const [pool, setPool] = useState<Sentence[]>(POOL);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(0);
  const [feedback, setFeedback] = useState<{ ok: boolean; hint: string } | null>(null);

  const cur = pool[0];

  const answer = (choice: 'fact' | 'opinion') => {
    if (!cur) return;
    const ok = cur.type === choice;
    setFeedback({ ok, hint: cur.hint });
    if (ok) setScore((s) => s + 1);
    setDone((d) => d + 1);
    setTimeout(() => {
      setPool((p) => p.slice(1));
      setFeedback(null);
    }, 1200);
  };

  const reset = () => {
    setPool([...POOL].sort(() => Math.random() - 0.5));
    setScore(0);
    setDone(0);
    setFeedback(null);
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-1">
          사실 vs 의견 — 어떤 문장일까?
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          <strong>사실</strong>은 누구나 확인할 수 있는 객관 정보, <strong>의견</strong>은 사람마다 다를 수 있는 생각이에요.
        </p>
      </div>

      <div className="flex justify-between items-center text-sm">
        <span className="text-zinc-600 dark:text-zinc-400">진행 {done} / {POOL.length}</span>
        <span className="font-bold text-red-700 dark:text-red-300">정답 {score}</span>
      </div>

      {cur ? (
        <>
          <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border-2 border-zinc-200 dark:border-zinc-800 p-6 text-center">
            <p className="text-lg text-zinc-900 dark:text-zinc-100 font-medium">{cur.text}</p>
          </div>

          {feedback ? (
            <div className={`rounded-xl border-l-4 p-4 ${feedback.ok ? 'bg-green-50 dark:bg-green-950/30 border-green-500' : 'bg-amber-50 dark:bg-amber-950/30 border-amber-500'}`}>
              <div className={`font-bold mb-1 ${feedback.ok ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'}`}>
                {feedback.ok ? '✓ 정답' : '✗ 다시 생각해 봐요'}
              </div>
              <div className="text-sm text-zinc-700 dark:text-zinc-300">{feedback.hint}</div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => answer('fact')}
                className="px-4 py-3 rounded-md bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-400 text-blue-800 dark:text-blue-300 font-bold min-h-[60px] hover:bg-blue-100 dark:hover:bg-blue-950/50"
              >
                사실
              </button>
              <button
                type="button"
                onClick={() => answer('opinion')}
                className="px-4 py-3 rounded-md bg-orange-50 dark:bg-orange-950/30 border-2 border-orange-400 text-orange-800 dark:text-orange-300 font-bold min-h-[60px] hover:bg-orange-100 dark:hover:bg-orange-950/50"
              >
                의견
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-xl bg-green-50 dark:bg-green-950/30 border-l-4 border-green-500 p-6 text-center space-y-2">
          <div className="text-2xl">🎉</div>
          <div className="font-bold text-green-800 dark:text-green-300">완료!</div>
          <div className="text-sm text-zinc-700 dark:text-zinc-300">
            {POOL.length} 문제 중 <strong>{score}</strong>개 정답 ({Math.round((score / POOL.length) * 100)}%)
          </div>
          <button
            type="button"
            onClick={reset}
            className="mt-3 px-4 py-2 text-sm rounded-md bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            다시 풀기
          </button>
        </div>
      )}
    </div>
  );
}
