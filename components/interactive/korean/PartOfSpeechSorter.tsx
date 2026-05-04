'use client';

// K-GR-03 품사 분류 (9품사) — 단어 분류 게임.
// 9품사: 명사·대명사·수사 / 동사·형용사 / 관형사·부사 / 조사 / 감탄사

import { useState } from 'react';

type Pos = '명사' | '대명사' | '수사' | '동사' | '형용사' | '관형사' | '부사' | '조사' | '감탄사';

interface Word {
  text: string;
  pos: Pos;
  hint: string;
}

const POOL: Word[] = [
  { text: '책상', pos: '명사', hint: '사물의 이름 → 명사' },
  { text: '나', pos: '대명사', hint: '이름 대신 가리키는 말 → 대명사' },
  { text: '하나', pos: '수사', hint: '수량·순서 → 수사' },
  { text: '먹다', pos: '동사', hint: '움직임 → 동사' },
  { text: '예쁘다', pos: '형용사', hint: '상태·성질 → 형용사' },
  { text: '새', pos: '관형사', hint: '명사를 꾸밈 ("새 옷") → 관형사' },
  { text: '매우', pos: '부사', hint: '동사·형용사를 꾸밈 → 부사' },
  { text: '이/가', pos: '조사', hint: '단어 뒤에 붙어 관계를 나타냄 → 조사' },
  { text: '아', pos: '감탄사', hint: '느낌·놀람을 그대로 → 감탄사' },
  { text: '학교', pos: '명사', hint: '장소의 이름 → 명사' },
  { text: '걷다', pos: '동사', hint: '"~하다" 동작 → 동사' },
  { text: '빨리', pos: '부사', hint: '동사를 꾸밈 → 부사' },
];

const POS_LIST: { pos: Pos; group: string; brief: string }[] = [
  { pos: '명사', group: '체언', brief: '사물·사람 이름' },
  { pos: '대명사', group: '체언', brief: '이름 대신 가리킴' },
  { pos: '수사', group: '체언', brief: '수량·순서' },
  { pos: '동사', group: '용언', brief: '움직임' },
  { pos: '형용사', group: '용언', brief: '상태·성질' },
  { pos: '관형사', group: '수식언', brief: '명사 꾸밈' },
  { pos: '부사', group: '수식언', brief: '동사·형용사 꾸밈' },
  { pos: '조사', group: '관계언', brief: '단어 관계 표시' },
  { pos: '감탄사', group: '독립언', brief: '독립적 감정 표현' },
];

const GROUP_COLOR: Record<string, string> = {
  체언: 'bg-red-50 dark:bg-red-950/30 border-red-400 text-red-800 dark:text-red-300',
  용언: 'bg-amber-50 dark:bg-amber-950/30 border-amber-400 text-amber-800 dark:text-amber-300',
  수식언: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-400 text-emerald-800 dark:text-emerald-300',
  관계언: 'bg-blue-50 dark:bg-blue-950/30 border-blue-400 text-blue-800 dark:text-blue-300',
  독립언: 'bg-purple-50 dark:bg-purple-950/30 border-purple-400 text-purple-800 dark:text-purple-300',
};

export function PartOfSpeechSorter() {
  const [pool, setPool] = useState<Word[]>(POOL);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(0);
  const [feedback, setFeedback] = useState<{ ok: boolean; correct: Pos; hint: string } | null>(null);

  const cur = pool[0];

  const answer = (choice: Pos) => {
    if (!cur) return;
    const ok = cur.pos === choice;
    setFeedback({ ok, correct: cur.pos, hint: cur.hint });
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
          한국어 9품사 — 어떤 품사일까?
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          단어는 기능에 따라 9가지로 분류돼요. 색상은 상위 분류(체언·용언·수식언·관계언·독립언)예요.
        </p>
      </div>

      <div className="flex justify-between items-center text-sm">
        <span className="text-zinc-600 dark:text-zinc-400">진행 {done} / {POOL.length}</span>
        <span className="font-bold text-red-700 dark:text-red-300">정답 {score}</span>
      </div>

      {cur ? (
        <>
          <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border-2 border-zinc-200 dark:border-zinc-800 p-6 text-center">
            <p className="text-2xl text-zinc-900 dark:text-zinc-100 font-bold">{cur.text}</p>
          </div>

          {feedback ? (
            <div className={`rounded-xl border-l-4 p-4 ${feedback.ok ? 'bg-green-50 dark:bg-green-950/30 border-green-500' : 'bg-amber-50 dark:bg-amber-950/30 border-amber-500'}`}>
              <div className={`font-bold mb-1 ${feedback.ok ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'}`}>
                {feedback.ok ? '✓ 정답' : `✗ 정답은 "${feedback.correct}"`}
              </div>
              <div className="text-sm text-zinc-700 dark:text-zinc-300">{feedback.hint}</div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {POS_LIST.map((p) => (
                <button
                  key={p.pos}
                  type="button"
                  onClick={() => answer(p.pos)}
                  className={`px-2 py-2 rounded-md border-2 min-h-[56px] text-xs font-bold ${GROUP_COLOR[p.group]}`}
                >
                  {p.pos}
                  <div className="text-[10px] font-normal opacity-80 mt-0.5">{p.brief}</div>
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
        <strong>핵심:</strong> 형태(변하나?) + 기능(주어/서술/꾸밈) + 의미(이름/움직임/상태) 3 기준으로 분류해요.
      </div>
    </div>
  );
}
