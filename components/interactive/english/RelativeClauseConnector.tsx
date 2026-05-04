'use client';

// E-GR-08 관계사 — 두 문장 → 관계사로 연결.

import { useMemo, useState } from 'react';

interface SentencePair {
  id: number;
  s1: string;
  s2: string;
  shared: string;
  noun: 'person' | 'thing' | 'place' | 'time';
  role: 'subject' | 'object' | 'place' | 'time';
  combined: { who: string; which: string; that: string; where?: string; when?: string };
  best: string;
  hint: string;
}

const PAIRS: SentencePair[] = [
  {
    id: 1,
    s1: 'I know a girl.',
    s2: 'She speaks three languages.',
    shared: 'a girl / She',
    noun: 'person',
    role: 'subject',
    combined: {
      who: 'I know a girl who speaks three languages.',
      which: 'I know a girl which speaks three languages.',
      that: 'I know a girl that speaks three languages.',
    },
    best: 'who',
    hint: '사람이 주어 자리 → who (또는 that)',
  },
  {
    id: 2,
    s1: 'This is the book.',
    s2: 'I bought it yesterday.',
    shared: 'the book / it',
    noun: 'thing',
    role: 'object',
    combined: {
      who: 'This is the book who I bought yesterday.',
      which: 'This is the book which I bought yesterday.',
      that: 'This is the book that I bought yesterday.',
    },
    best: 'which',
    hint: '사물이 목적어 → which 또는 that. 회화에서는 생략도 가능',
  },
  {
    id: 3,
    s1: 'I remember the day.',
    s2: 'We first met on that day.',
    shared: 'the day / that day',
    noun: 'time',
    role: 'time',
    combined: {
      who: 'I remember the day who we first met.',
      which: 'I remember the day which we first met.',
      that: 'I remember the day that we first met.',
      when: 'I remember the day when we first met.',
    },
    best: 'when',
    hint: '시간 + 전치사구 → when',
  },
  {
    id: 4,
    s1: 'This is the city.',
    s2: 'I grew up in this city.',
    shared: 'the city / this city',
    noun: 'place',
    role: 'place',
    combined: {
      who: 'This is the city who I grew up.',
      which: 'This is the city which I grew up.',
      that: 'This is the city that I grew up.',
      where: 'This is the city where I grew up.',
    },
    best: 'where',
    hint: '장소 + 전치사구 → where',
  },
];

const RELATIVES: Array<'who' | 'which' | 'that' | 'when' | 'where'> = [
  'who',
  'which',
  'that',
  'when',
  'where',
];

const REL_LABEL: Record<string, string> = {
  who: 'who (사람·주어/목적어)',
  which: 'which (사물·주어/목적어)',
  that: 'that (사람·사물 모두)',
  when: 'when (시간)',
  where: 'where (장소)',
};

export function RelativeClauseConnector() {
  const [idx, setIdx] = useState(0);
  const [pick, setPick] = useState<keyof SentencePair['combined'] | null>(null);

  const cur = PAIRS[idx];

  const available = useMemo(() => {
    const keys: Array<keyof SentencePair['combined']> = ['who', 'which', 'that'];
    if (cur.combined.when) keys.push('when');
    if (cur.combined.where) keys.push('where');
    return keys;
  }, [cur]);

  const result = pick ? cur.combined[pick] : null;
  const isBest = pick === cur.best;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-1">
          관계사 연결 시뮬
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          한국어 ‘~하는’이 영어에서는 <strong>who / which / that / when / where</strong>로 갈라져요.
          두 문장의 공통된 명사를 찾아 알맞은 관계사로 연결해보세요.
        </p>
      </div>

      <div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">문장쌍</div>
        <div className="flex flex-wrap gap-2">
          {PAIRS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setIdx(i);
                setPick(null);
              }}
              className={`min-h-[44px] px-3 py-2 rounded-md text-xs border transition ${
                idx === i
                  ? 'bg-purple-600 text-white border-purple-700'
                  : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 hover:border-purple-500 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              {p.noun} #{p.id}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border-2 border-zinc-200 dark:border-zinc-800 p-5 space-y-3">
        <div className="text-xs text-zinc-500 dark:text-zinc-400">두 문장</div>
        <div className="font-mono text-base text-zinc-900 dark:text-zinc-100">① {cur.s1}</div>
        <div className="font-mono text-base text-zinc-900 dark:text-zinc-100">② {cur.s2}</div>
        <div className="text-xs text-zinc-600 dark:text-zinc-400">
          공통된 부분: <strong>{cur.shared}</strong>
        </div>
      </div>

      <div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">관계사 선택</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {RELATIVES.filter((r) => available.includes(r)).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setPick(r)}
              aria-pressed={pick === r}
              className={`min-h-[44px] px-3 py-2 rounded-md text-xs sm:text-sm border-2 transition ${
                pick === r
                  ? r === cur.best
                    ? 'bg-green-100 dark:bg-green-950/40 border-green-500 text-green-800 dark:text-green-200'
                    : 'bg-amber-100 dark:bg-amber-950/40 border-amber-500 text-amber-800 dark:text-amber-200'
                  : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 hover:border-purple-500 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              {REL_LABEL[r]}
            </button>
          ))}
        </div>
      </div>

      {result && (
        <article
          className={`rounded-xl border-l-4 p-5 space-y-2 ${
            isBest
              ? 'bg-green-50 dark:bg-green-950/30 border-green-500'
              : 'bg-amber-50 dark:bg-amber-950/30 border-amber-500'
          }`}
        >
          <div className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
            {isBest ? '✓ 자연스러운 연결' : '△ 가능하지만 더 좋은 선택이 있어요'}
          </div>
          <div className="text-base font-mono text-zinc-900 dark:text-zinc-100">{result}</div>
          {!isBest && (
            <div className="text-xs text-zinc-600 dark:text-zinc-400">
              가장 자연스러운 답: <strong>{cur.best}</strong> — {cur.hint}
            </div>
          )}
          {isBest && (
            <div className="text-xs text-zinc-600 dark:text-zinc-400">{cur.hint}</div>
          )}
        </article>
      )}

      <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950/40 p-3 text-xs text-zinc-600 dark:text-zinc-400">
        💡 <strong>핵심</strong>: 관계사 = <strong>접속사 + 대명사</strong> 두 일을 한 번에. 그래서
        뒤 문장에서는 그 자리를 비워둡니다 (the book that I bought —, 빈 자리 OK).
      </div>
    </div>
  );
}
