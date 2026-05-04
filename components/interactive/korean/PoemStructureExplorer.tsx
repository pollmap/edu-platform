'use client';

// K-LT-01 시의 구성 요소 — 화자/주제/심상/운율/비유 5요소 토글.
// 저작권: 실제 시 본문 인용 금지. 구조 개념과 일반 예시만 사용.

import { useState } from 'react';

interface Element {
  id: string;
  label: string;
  emoji: string;
  brief: string;
  example: string;
  detail: string;
}

const ELEMENTS: Element[] = [
  {
    id: 'speaker',
    label: '화자',
    emoji: '🗣️',
    brief: '시 안에서 말하는 사람',
    example: '"나는 풀을 보았다" 의 〈나〉',
    detail: '시인 본인일 수도, 시인이 만든 가상의 인물일 수도 있어요. 화자의 처지와 정서를 알면 시가 더 잘 보여요.',
  },
  {
    id: 'theme',
    label: '주제',
    emoji: '🎯',
    brief: '시가 전하려는 핵심 생각',
    example: '그리움 · 자연 사랑 · 자유',
    detail: '한 줄로 요약 가능해야 해요. "이 시는 _____ 에 대해 말하고 있다."',
  },
  {
    id: 'image',
    label: '심상',
    emoji: '🎨',
    brief: '시를 읽을 때 떠오르는 감각',
    example: '시각(노란 햇살) · 청각(파도 소리) · 후각(꽃향기)',
    detail: '눈 · 귀 · 코 · 혀 · 피부 5감각으로 분류해요. 한 시에 여러 심상이 함께 나오기도 해요.',
  },
  {
    id: 'rhythm',
    label: '운율',
    emoji: '🎵',
    brief: '시를 노래처럼 만드는 박자',
    example: '같은 글자 수 반복 (3·4조) · 같은 소리 반복',
    detail: '소리 내어 읽었을 때 느껴지는 리듬이에요. 한국 시는 글자 수, 영어 시는 강세로 운율을 만들어요.',
  },
  {
    id: 'figure',
    label: '비유와 상징',
    emoji: '🌗',
    brief: '다른 것에 빗대어 표현',
    example: '직유(꽃 같은 너) · 은유(너는 꽃) · 상징(비둘기 = 평화)',
    detail: '직유는 "~같이/처럼" 으로 직접 비교, 은유는 "A는 B" 로 동일시, 상징은 사물 하나가 추상 개념을 대표해요.',
  },
];

export function PoemStructureExplorer() {
  const [active, setActive] = useState('speaker');
  const cur = ELEMENTS.find((e) => e.id === active)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-1">
          시를 이루는 5가지 요소
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          시 한 편을 분석할 때 살펴보는 5가지 핵심 요소예요. 카드를 골라 보세요.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {ELEMENTS.map((e) => (
          <button
            key={e.id}
            type="button"
            onClick={() => setActive(e.id)}
            className={`px-2 py-3 rounded-md border min-h-[64px] flex flex-col items-center gap-1 transition ${
              active === e.id
                ? 'bg-red-50 dark:bg-red-950/30 border-red-500 ring-2 ring-red-300'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
          >
            <span className="text-2xl">{e.emoji}</span>
            <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{e.label}</span>
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{cur.emoji}</span>
          <span className="text-lg font-bold text-red-800 dark:text-red-300">{cur.label}</span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">— {cur.brief}</span>
        </div>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">{cur.detail}</p>
        <div className="text-xs text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 rounded-md p-2 border border-zinc-200 dark:border-zinc-800">
          <strong>예시:</strong> {cur.example}
        </div>
      </div>

      <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950/40 p-3 text-xs text-zinc-600 dark:text-zinc-400">
        시를 분석할 때 다섯 요소 모두를 한꺼번에 보지 않아도 돼요. 시를 여러 번 읽으면서 한 요소씩 발견해 보세요.
      </div>
    </div>
  );
}
