'use client';

// E-PD 영어 발표와 토론 — 발표·토론의 단계별 영어 표현 시뮬레이터.

import { useState } from 'react';

interface Stage {
  id: string;
  label: string;
  purpose: string;
  phrases: { english: string; korean: string }[];
  tip: string;
}

const STAGES: Stage[] = [
  {
    id: 'open',
    label: 'Opening',
    purpose: '관심 끌고 발표 주제 알리기',
    phrases: [
      { english: "Good morning, everyone. Today I'd like to talk about ...", korean: '안녕하세요. 오늘은 ~에 대해 이야기하고자 합니다.' },
      { english: "Let me start with a question — have you ever ...?", korean: '질문 하나로 시작할게요 — 혹시 ~한 적 있으신가요?' },
      { english: "By the end of this talk, you will understand ...", korean: '이 발표가 끝날 때쯤 여러분은 ~를 이해하게 될 거예요.' },
    ],
    tip: '질문·통계·짧은 일화로 시작 — "오늘은 ~"보다 강한 첫인상',
  },
  {
    id: 'preview',
    label: 'Preview',
    purpose: '발표의 흐름 안내',
    phrases: [
      { english: "I'll cover three main points: first ..., second ..., and finally ...", korean: '세 가지 핵심을 다룹니다 — 첫째 ~, 둘째 ~, 셋째 ~.' },
      { english: "Feel free to ask questions at the end.", korean: '질문은 마지막에 자유롭게 해주세요.' },
      { english: "This will take about ten minutes.", korean: '발표는 약 10분 정도 걸립니다.' },
    ],
    tip: '청중의 인지 부담 줄이기 — 흐름을 알면 따라오기 쉬움',
  },
  {
    id: 'body',
    label: 'Main Points',
    purpose: '논점 전개와 근거 제시',
    phrases: [
      { english: "First, let's look at ...", korean: '먼저, ~를 살펴보겠습니다.' },
      { english: "According to a recent study, ...", korean: '최근 연구에 따르면, ~' },
      { english: "For example, ...", korean: '예를 들어, ~' },
      { english: "On the other hand, ...", korean: '한편으로는, ~' },
    ],
    tip: '주장 → 근거 → 예시 (PREP) 구조 — 한 점당 1~2분',
  },
  {
    id: 'transition',
    label: 'Transition',
    purpose: '논점 사이 연결',
    phrases: [
      { english: "Now, let's move on to ...", korean: '이제 ~로 넘어가 보죠.' },
      { english: "That brings me to my next point.", korean: '다음 논점으로 이어집니다.' },
      { english: "Building on that, ...", korean: '거기서 더 나아가, ~' },
    ],
    tip: '전환 표현 없이 점프하면 청중이 길을 잃음',
  },
  {
    id: 'close',
    label: 'Closing',
    purpose: '핵심 다시 강조 + 행동 요청',
    phrases: [
      { english: "To sum up, the three key takeaways are ...", korean: '요약하자면 핵심은 다음 세 가지입니다 — ~' },
      { english: "I'd encourage you to ...", korean: '여러분께 ~를 권해드립니다.' },
      { english: "Thank you for your attention. I'm happy to take questions.", korean: '경청해주셔서 감사합니다. 질문 받겠습니다.' },
    ],
    tip: '새 정보 추가 X — 이미 한 말 정리만',
  },
  {
    id: 'qa',
    label: 'Q&A',
    purpose: '질문에 침착하게 답하기',
    phrases: [
      { english: "That's a great question. Let me think for a moment.", korean: '좋은 질문입니다. 잠시 생각할 시간을 주세요.' },
      { english: "I'm not sure about that, but I can find out and follow up.", korean: '그건 확실치 않은데, 확인 후 추후에 알려드리겠습니다.' },
      { english: "Could you clarify what you mean by ...?", korean: '~의 의미를 좀 더 설명해주실 수 있나요?' },
    ],
    tip: '모르면 솔직히 — 추측·억지보다 신뢰 유지',
  },
];

export function PresentationStructureSimulator() {
  const [active, setActive] = useState('open');
  const cur = STAGES.find((s) => s.id === active)!;
  const idx = STAGES.findIndex((s) => s.id === active);

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        영어 발표는 <strong>6단계</strong>로 흐름이 정해져 있어요. 각 단계의 자주 쓰는 표현을 익혀보세요.
      </p>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {STAGES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={`min-h-[44px] rounded-lg border px-2 py-2 text-xs font-medium transition ${
              active === s.id
                ? 'border-purple-500 bg-purple-50 text-purple-900 dark:border-purple-400 dark:bg-purple-900/30 dark:text-purple-100'
                : 'border-zinc-300 bg-white text-zinc-700 hover:border-purple-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300'
            }`}
          >
            <span className="block text-[10px] text-zinc-500">{i + 1}</span>
            {s.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-500 text-sm font-bold text-white">
            {idx + 1}
          </span>
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{cur.label}</h3>
        </div>
        <p className="mt-1 text-xs text-zinc-500">목적 — {cur.purpose}</p>

        <ul className="mt-3 space-y-2">
          {cur.phrases.map((p) => (
            <li key={p.english} className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800">
              <p className="font-mono text-sm text-zinc-900 dark:text-zinc-100">"{p.english}"</p>
              <p className="mt-1 text-xs text-zinc-500">→ {p.korean}</p>
            </li>
          ))}
        </ul>

        <div className="mt-3 rounded-lg bg-purple-50 p-3 text-sm text-purple-900 dark:bg-purple-900/30 dark:text-purple-100">
          <strong>팁</strong> — {cur.tip}
        </div>
      </div>
    </div>
  );
}
