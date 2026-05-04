'use client';

// E-CE1-02 읽기 — 핵심 문장(주제문·뒷받침문) 식별 연습.

import { useState } from 'react';

interface Sentence {
  text: string;
  role: 'topic' | 'support' | 'detail';
  why: string;
}

interface Passage {
  id: string;
  title: string;
  sentences: Sentence[];
  summary: string;
}

const PASSAGES: Passage[] = [
  {
    id: 'sleep',
    title: 'Why Sleep Matters',
    sentences: [
      {
        text: 'Sleep is essential for both physical and mental health.',
        role: 'topic',
        why: '문단 전체의 주장을 한 문장에 담은 주제문. 가장 일반적이고 추상적.',
      },
      {
        text: 'During deep sleep, the body repairs muscles and stores energy.',
        role: 'support',
        why: '주제문(중요한 이유)을 신체적 측면에서 받쳐 줌.',
      },
      {
        text: 'The brain also organizes memories and removes waste products.',
        role: 'support',
        why: '주제문을 정신적 측면에서 받쳐 줌.',
      },
      {
        text: 'For example, students who sleep seven hours score higher on memory tests.',
        role: 'detail',
        why: '구체적 예시. 주장 자체보다는 뒷받침 문장을 다시 받쳐 주는 보조 정보.',
      },
    ],
    summary: 'Sleep helps both body and brain — physically by repair, mentally by memory.',
  },
  {
    id: 'reading',
    title: 'The Power of Reading',
    sentences: [
      {
        text: 'Reading regularly strengthens both language and thinking skills.',
        role: 'topic',
        why: '문단의 핵심 주장. "language and thinking" 두 축이 뒤에 따라 나옴.',
      },
      {
        text: 'It expands vocabulary and improves writing fluency.',
        role: 'support',
        why: 'language 축을 받쳐 줌.',
      },
      {
        text: 'It also trains readers to follow long arguments and recognize patterns.',
        role: 'support',
        why: 'thinking 축을 받쳐 줌.',
      },
      {
        text: 'A 2022 OECD study found that frequent readers performed better in problem-solving tasks.',
        role: 'detail',
        why: '특정 연구를 인용한 구체 사례. 주장의 신뢰도를 보강.',
      },
    ],
    summary: 'Regular reading boosts language (vocabulary, fluency) and thinking (logic, patterns).',
  },
];

const ROLE_STYLE: Record<Sentence['role'], { label: string; color: string }> = {
  topic: { label: '주제문', color: 'bg-purple-200 dark:bg-purple-800/50 border-purple-500' },
  support: { label: '뒷받침문', color: 'bg-blue-100 dark:bg-blue-900/30 border-blue-400' },
  detail: { label: '예시·세부', color: 'bg-zinc-100 dark:bg-zinc-800 border-zinc-400' },
};

export function KeySentenceHighlighter() {
  const [pid, setPid] = useState('sleep');
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [showSummary, setShowSummary] = useState(false);
  const passage = PASSAGES.find((p) => p.id === pid)!;

  const reset = (newPid: string) => {
    setPid(newPid);
    setRevealed({});
    setShowSummary(false);
  };

  const toggle = (i: number) => {
    setRevealed((r) => ({ ...r, [`${pid}-${i}`]: !r[`${pid}-${i}`] }));
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-1">핵심 문장 하이라이터</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          문단을 읽을 때는 모든 문장을 똑같이 읽지 말고 <strong>주제문 → 뒷받침문 → 예시</strong>의 위계를 잡아야 빨리 이해돼요.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {PASSAGES.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => reset(p.id)}
            className={`px-2 py-2 text-xs rounded-md border min-h-[44px] ${
              pid === p.id
                ? 'bg-purple-50 dark:bg-purple-950/30 border-purple-500 ring-2 ring-purple-300 font-bold'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {passage.sentences.map((s, i) => {
          const key = `${pid}-${i}`;
          const r = revealed[key];
          const meta = ROLE_STYLE[s.role];
          return (
            <button
              key={key}
              type="button"
              onClick={() => toggle(i)}
              className={`w-full text-left rounded-md border-l-4 p-3 transition ${r ? meta.color : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700'}`}
            >
              <div className="flex items-start gap-2">
                <div className="text-sm text-zinc-800 dark:text-zinc-200 flex-1">{s.text}</div>
                {r && (
                  <span className="rounded-full bg-white dark:bg-zinc-900 px-2 py-0.5 text-[10px] font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 whitespace-nowrap">
                    {meta.label}
                  </span>
                )}
              </div>
              {r && (
                <div className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 italic">→ {s.why}</div>
              )}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setShowSummary((v) => !v)}
        className="w-full rounded-md bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2 min-h-[44px]"
      >
        {showSummary ? '요약 닫기' : '한 문장 요약 보기'}
      </button>
      {showSummary && (
        <div className="rounded-md bg-purple-50 dark:bg-purple-950/30 border-l-4 border-purple-500 p-3 text-sm text-zinc-700 dark:text-zinc-300">
          <strong>One-line summary:</strong> {passage.summary}
        </div>
      )}

      <div className="rounded-md bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-600 dark:text-zinc-400">
        🎯 시험에서 "필자가 말하고자 하는 바"를 묻는 문제는 결국 주제문 위치를 묻는 문제. 위계 식별이 핵심.
      </div>
    </div>
  );
}
