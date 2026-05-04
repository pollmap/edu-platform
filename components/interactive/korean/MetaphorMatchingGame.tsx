'use client';

// K-LT-05 비유와 상징 — 직유·은유·의인·상징 매칭 게임.
// 저작권: 시·소설 본문 인용 X. 일반 표현 예시만.

import { useState } from 'react';

type Kind = 'simile' | 'metaphor' | 'personify' | 'symbol';

interface Item {
  text: string;
  kind: Kind;
  hint: string;
}

const POOL: Item[] = [
  { text: '얼굴이 사과처럼 빨개졌다.', kind: 'simile', hint: '"~처럼/~같이" → 직유' },
  { text: '그의 말은 칼이었다.', kind: 'metaphor', hint: '"A는 B" 형태 → 은유' },
  { text: '바람이 속삭였다.', kind: 'personify', hint: '사물이 사람처럼 행동 → 의인' },
  { text: '비둘기는 평화를 뜻한다.', kind: 'symbol', hint: '구체 사물 ↔ 추상 개념 → 상징' },
  { text: '눈이 솜사탕 같았다.', kind: 'simile', hint: '"~같이" → 직유' },
  { text: '마음은 거울이다.', kind: 'metaphor', hint: '"A는 B" → 은유' },
  { text: '나무가 손을 흔들었다.', kind: 'personify', hint: '나무에 사람의 행동 → 의인' },
  { text: '십자가는 희생을 뜻한다.', kind: 'symbol', hint: '문화적으로 굳어진 의미 → 상징' },
  { text: '하늘이 울고 있다.', kind: 'personify', hint: '하늘에 감정 → 의인' },
  { text: '시간은 강물처럼 흘렀다.', kind: 'simile', hint: '"~처럼" → 직유' },
  { text: '시간은 도둑이다.', kind: 'metaphor', hint: '"A는 B" → 은유' },
  { text: '하얀 비둘기 = 평화', kind: 'symbol', hint: '오랜 관습으로 굳어진 의미' },
];

const KIND_INFO: Record<Kind, { label: string; brief: string; color: string }> = {
  simile: { label: '직유', brief: '"~같이/~처럼" 으로 직접 비교', color: 'bg-rose-50 dark:bg-rose-950/30 border-rose-500 text-rose-800 dark:text-rose-300' },
  metaphor: { label: '은유', brief: '"A는 B" 로 동일시', color: 'bg-amber-50 dark:bg-amber-950/30 border-amber-500 text-amber-800 dark:text-amber-300' },
  personify: { label: '의인', brief: '사물·자연을 사람처럼', color: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-800 dark:text-emerald-300' },
  symbol: { label: '상징', brief: '구체 사물 → 추상 개념', color: 'bg-blue-50 dark:bg-blue-950/30 border-blue-500 text-blue-800 dark:text-blue-300' },
};

export function MetaphorMatchingGame() {
  const [pool, setPool] = useState<Item[]>(POOL);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(0);
  const [feedback, setFeedback] = useState<{ ok: boolean; hint: string; correct: Kind } | null>(null);

  const cur = pool[0];

  const answer = (choice: Kind) => {
    if (!cur) return;
    const ok = cur.kind === choice;
    setFeedback({ ok, hint: cur.hint, correct: cur.kind });
    if (ok) setScore((s) => s + 1);
    setDone((d) => d + 1);
    setTimeout(() => {
      setPool((p) => p.slice(1));
      setFeedback(null);
    }, 1400);
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
          어떤 비유일까? — 직유·은유·의인·상징
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          비유는 한 가지를 다른 것에 빗대어 말하는 방법이에요. 4가지 종류를 구분해 보세요.
        </p>
      </div>

      <div className="flex justify-between items-center text-sm">
        <span className="text-zinc-600 dark:text-zinc-400">진행 {done} / {POOL.length}</span>
        <span className="font-bold text-red-700 dark:text-red-300">정답 {score}</span>
      </div>

      {cur ? (
        <>
          <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border-2 border-zinc-200 dark:border-zinc-800 p-6 text-center">
            <p className="text-base text-zinc-900 dark:text-zinc-100 font-medium italic">"{cur.text}"</p>
          </div>

          {feedback ? (
            <div className={`rounded-xl border-l-4 p-4 ${feedback.ok ? 'bg-green-50 dark:bg-green-950/30 border-green-500' : 'bg-amber-50 dark:bg-amber-950/30 border-amber-500'}`}>
              <div className={`font-bold mb-1 ${feedback.ok ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'}`}>
                {feedback.ok ? '✓ 정답' : `✗ 정답은 "${KIND_INFO[feedback.correct].label}"`}
              </div>
              <div className="text-sm text-zinc-700 dark:text-zinc-300">{feedback.hint}</div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(KIND_INFO) as Kind[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => answer(k)}
                  className={`px-3 py-3 rounded-md border-2 font-bold min-h-[60px] text-sm ${KIND_INFO[k].color}`}
                >
                  {KIND_INFO[k].label}
                  <div className="text-[10px] font-normal mt-0.5 opacity-80">{KIND_INFO[k].brief}</div>
                </button>
              ))}
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

      <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950/40 p-3 text-xs text-zinc-600 dark:text-zinc-400">
        <strong>차이 요약:</strong> 직유 = "~같이". 은유 = "A=B" (연결어 X). 의인 = 사물 + 사람 행동. 상징 = 사물 ↔ 추상 개념(평화·죽음·희망 등).
      </div>
    </div>
  );
}
