'use client';

// E-GR-09 가정법 — 사실/가정 변환기.

import { useState } from 'react';

type ConditionalType = 'zero' | 'first' | 'second' | 'third';

interface Sample {
  id: number;
  topic: string;
  fact: { if: string; result: string; full: string };
  zero: string;
  first: string;
  second: string;
  third: string;
  meaning: { zero: string; first: string; second: string; third: string };
}

const SAMPLES: Sample[] = [
  {
    id: 1,
    topic: '비 / 우산',
    fact: {
      if: 'It rains.',
      result: "I bring an umbrella.",
      full: 'It rains, so I bring an umbrella.',
    },
    zero: 'If it rains, I bring an umbrella.',
    first: 'If it rains tomorrow, I will bring an umbrella.',
    second: 'If it rained right now, I would bring an umbrella.',
    third: 'If it had rained yesterday, I would have brought an umbrella.',
    meaning: {
      zero: '항상 사실 / 일반적 진리',
      first: '미래에 일어날 수 있는 일',
      second: '현재의 사실과 반대되는 상상',
      third: '과거에 일어나지 않은 일에 대한 후회',
    },
  },
  {
    id: 2,
    topic: '돈 / 여행',
    fact: {
      if: 'I have money.',
      result: 'I travel abroad.',
      full: 'I have money, so I travel abroad.',
    },
    zero: 'If I have money, I travel abroad.',
    first: 'If I have money next year, I will travel abroad.',
    second: 'If I had money now, I would travel abroad.',
    third: 'If I had had money last year, I would have traveled abroad.',
    meaning: {
      zero: '나의 일반적 습관',
      first: '실제 가능성 있는 미래',
      second: '지금 돈이 없다는 사실의 반대 가정',
      third: '작년에 돈이 없었던 과거 사실의 반대',
    },
  },
  {
    id: 3,
    topic: '시간 / 운동',
    fact: {
      if: 'I have time.',
      result: 'I exercise.',
      full: 'I have time, so I exercise.',
    },
    zero: 'If I have time, I exercise.',
    first: 'If I have time tomorrow, I will exercise.',
    second: 'If I had time today, I would exercise.',
    third: 'If I had had time yesterday, I would have exercised.',
    meaning: {
      zero: '내 일반적 습관',
      first: '내일 가능한 계획',
      second: '오늘 시간이 없다는 사실의 반대',
      third: '어제 운동을 못한 것에 대한 후회',
    },
  },
];

const TYPE_LABEL: Record<ConditionalType, string> = {
  zero: '0형 (일반 사실)',
  first: '1형 (미래 가능)',
  second: '2형 (현재 가정)',
  third: '3형 (과거 후회)',
};

const STRUCTURE: Record<ConditionalType, string> = {
  zero: 'If + 현재, 현재',
  first: 'If + 현재, will + 동사 원형',
  second: 'If + 과거, would + 동사 원형',
  third: 'If + had + p.p., would have + p.p.',
};

const TYPES: ConditionalType[] = ['zero', 'first', 'second', 'third'];

export function ConditionalConverter() {
  const [idx, setIdx] = useState(0);
  const [type, setType] = useState<ConditionalType>('zero');

  const cur = SAMPLES[idx];
  const sentence = cur[type];
  const meaning = cur.meaning[type];

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-1">
          가정법 변환기
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          한국어 ‘만약 ~이라면’이 영어에서는 <strong>사실인지 / 상상인지 / 후회인지</strong>에 따라
          시제 구조가 4단계로 달라져요. 같은 상황을 4 형태로 갈아입혀보세요.
        </p>
      </div>

      <div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">상황</div>
        <div className="flex flex-wrap gap-2">
          {SAMPLES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIdx(i)}
              className={`min-h-[44px] px-3 py-2 rounded-md text-xs border transition ${
                idx === i
                  ? 'bg-purple-600 text-white border-purple-700'
                  : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 hover:border-purple-500 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              {s.topic}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border-2 border-zinc-200 dark:border-zinc-800 p-5 space-y-2">
        <div className="text-xs text-zinc-500 dark:text-zinc-400">사실 (가정 아님)</div>
        <div className="font-mono text-base text-zinc-900 dark:text-zinc-100">
          {cur.fact.full}
        </div>
      </div>

      <div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">조건문 형태</div>
        <div className="grid grid-cols-2 gap-2">
          {TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              aria-pressed={type === t}
              className={`min-h-[44px] px-3 py-2 rounded-md text-xs sm:text-sm border-2 transition text-left ${
                type === t
                  ? 'bg-purple-600 text-white border-purple-700'
                  : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 hover:border-purple-500 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              <div className="font-bold">{TYPE_LABEL[t]}</div>
              <div className="text-[10px] opacity-80 mt-1 font-mono">{STRUCTURE[t]}</div>
            </button>
          ))}
        </div>
      </div>

      <article className="rounded-xl bg-purple-50 dark:bg-purple-950/30 border-l-4 border-purple-500 p-5 space-y-3">
        <div className="text-xs text-purple-700 dark:text-purple-300 font-bold">
          {TYPE_LABEL[type]} · {STRUCTURE[type]}
        </div>
        <div className="text-base sm:text-lg font-mono text-zinc-900 dark:text-zinc-100">
          {sentence}
        </div>
        <div className="text-sm text-zinc-700 dark:text-zinc-300">의미: {meaning}</div>
      </article>

      <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950/40 p-3 text-xs text-zinc-600 dark:text-zinc-400">
        💡 <strong>핵심</strong>: 가정의 거리가 멀수록 시제를 한 칸 더 과거로 옮겨요. 현재의
        반대(2형) → 과거 시제 사용. 과거의 반대(3형) → 과거완료(had p.p.) 사용.
        <code> If I were </code>는 가정 전용 어법(주어가 I여도 was 대신 were).
      </div>
    </div>
  );
}
