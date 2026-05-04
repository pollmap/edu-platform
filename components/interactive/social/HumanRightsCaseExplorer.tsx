'use client';

// H5-SO-01 인권 존중 — 사례 → 인권 종류 매칭.

import { useMemo, useState } from 'react';

interface RightCategory {
  id: string;
  label: string;
  emoji: string;
  desc: string;
}

interface Case {
  id: string;
  text: string;
  rightId: string;
  hint: string;
}

const RIGHTS: RightCategory[] = [
  {
    id: 'equality',
    label: '평등권',
    emoji: '⚖️',
    desc: '나이·성별·외모 같은 이유로 차별받지 않을 권리.',
  },
  {
    id: 'liberty',
    label: '자유권',
    emoji: '🕊️',
    desc: '내 생각·말·행동을 자유롭게 할 권리(다른 사람에게 해를 끼치지 않는 한).',
  },
  {
    id: 'social',
    label: '사회권',
    emoji: '🏥',
    desc: '교육·의료·일자리 같은 사람답게 살 수 있는 조건을 누릴 권리.',
  },
  {
    id: 'participate',
    label: '참정권',
    emoji: '🗳️',
    desc: '나라 일에 참여할 권리(투표, 의견 표현 등).',
  },
];

const CASES: Case[] = [
  {
    id: 'c1',
    text: '학교에서 누구나 무료로 점심을 먹을 수 있게 해 줘요.',
    rightId: 'social',
    hint: '먹고 배우는 건 사람답게 사는 기본 조건.',
  },
  {
    id: 'c2',
    text: '같은 일을 했는데 여자라서 월급을 적게 주는 건 안 돼요.',
    rightId: 'equality',
    hint: '성별이라는 이유로 다른 대우 → 차별.',
  },
  {
    id: 'c3',
    text: '내가 좋아하는 책을 읽고, 내 생각을 글로 쓸 수 있어요.',
    rightId: 'liberty',
    hint: '생각·표현을 막지 않는 것.',
  },
  {
    id: 'c4',
    text: '18살이 넘으면 누구나 대통령 선거에 투표할 수 있어요.',
    rightId: 'participate',
    hint: '나라의 대표를 뽑는 일에 참여.',
  },
  {
    id: 'c5',
    text: '몸이 불편한 친구를 위해 학교에 경사로를 만들었어요.',
    rightId: 'equality',
    hint: '몸 상태와 상관없이 같이 다닐 수 있게.',
  },
  {
    id: 'c6',
    text: '아픈데 돈이 없어도 병원에서 치료받을 수 있게 도와줘요.',
    rightId: 'social',
    hint: '건강은 사람다운 삶의 조건.',
  },
];

export function HumanRightsCaseExplorer() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const score = useMemo(() => {
    let correct = 0;
    let total = 0;
    for (const c of CASES) {
      if (answers[c.id]) {
        total++;
        if (answers[c.id] === c.rightId) correct++;
      }
    }
    return { correct, total };
  }, [answers]);

  function pick(caseId: string, rightId: string) {
    setAnswers((prev) => ({ ...prev, [caseId]: rightId }));
    setRevealed((prev) => ({ ...prev, [caseId]: true }));
  }

  function reset() {
    setAnswers({});
    setRevealed({});
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-1">
          인권 사례 매칭 — 어떤 권리에 해당할까요?
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          <strong>인권</strong>은 사람이라면 누구나 가지는 권리예요. 사례를 읽고 어떤 권리에 가까운지 골라 보세요.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {RIGHTS.map((r) => (
          <div key={r.id} className="rounded-lg border border-zinc-200 dark:border-zinc-700 p-3 text-xs">
            <div className="font-bold text-orange-700 dark:text-orange-400">
              {r.emoji} {r.label}
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 mt-1 leading-snug">{r.desc}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {CASES.map((c) => {
          const sel = answers[c.id];
          const isRevealed = revealed[c.id];
          const isCorrect = sel === c.rightId;
          return (
            <div
              key={c.id}
              className={`rounded-xl border p-3 ${
                !isRevealed
                  ? 'border-zinc-200 dark:border-zinc-700'
                  : isCorrect
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20'
                    : 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/20'
              }`}
            >
              <p className="text-sm mb-2">{c.text}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {RIGHTS.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => pick(c.id, r.id)}
                    className={`px-2 py-2 text-xs rounded-md border min-h-[44px] ${
                      sel === r.id
                        ? 'border-orange-500 ring-2 ring-orange-300 font-bold'
                        : 'border-zinc-200 dark:border-zinc-700'
                    }`}
                  >
                    {r.emoji} {r.label}
                  </button>
                ))}
              </div>
              {isRevealed && (
                <div className="mt-2 text-xs">
                  {isCorrect ? (
                    <span className="text-emerald-700 dark:text-emerald-400">정답이에요!</span>
                  ) : (
                    <span className="text-rose-700 dark:text-rose-400">
                      힌트: {c.hint}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="font-mono text-zinc-700 dark:text-zinc-300">
          맞힌 개수: <strong className="text-orange-700 dark:text-orange-400">{score.correct}</strong> / {score.total}
        </div>
        <button
          type="button"
          onClick={reset}
          className="px-3 py-2 text-xs rounded-md border border-zinc-300 dark:border-zinc-600 min-h-[44px]"
        >
          다시 풀기
        </button>
      </div>
    </div>
  );
}
