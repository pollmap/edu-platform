'use client';

// E-CE1-01 듣기·말하기 — 상황별 영어 회화 패턴 비교.

import { useState } from 'react';

interface Situation {
  id: string;
  label: string;
  emoji: string;
  formality: '격식' | '준격식' | '비격식';
  exchange: { en: string; ko: string }[];
  tip: string;
}

const SITUATIONS: Situation[] = [
  {
    id: 'cafe',
    label: '카페 주문',
    emoji: '☕',
    formality: '준격식',
    exchange: [
      { en: 'Hi, can I get an iced Americano, please?', ko: '아이스 아메리카노 한 잔 주실 수 있을까요?' },
      { en: 'Sure. What size would you like?', ko: '네. 사이즈는 어떻게 해드릴까요?' },
      { en: 'A medium, to go, please.', ko: '미디엄, 테이크아웃이요.' },
      { en: "Anything else? — That'll be all, thanks.", ko: '더 필요하신 건요? — 그게 전부예요, 감사합니다.' },
    ],
    tip: '"Can I get..."은 자연스러운 주문 표현. "I want..."은 너무 직설적.',
  },
  {
    id: 'directions',
    label: '길 묻기',
    emoji: '🗺️',
    formality: '준격식',
    exchange: [
      { en: 'Excuse me, could you tell me how to get to the station?', ko: '실례합니다, 역까지 어떻게 가는지 알려주실 수 있을까요?' },
      { en: 'Sure. Go straight two blocks, then turn left.', ko: '그럼요. 두 블록 직진하시고 왼쪽으로 도세요.' },
      { en: "It's right next to the bank. You can't miss it.", ko: '은행 바로 옆이에요. 못 찾을 수가 없어요.' },
      { en: 'Thanks a lot!', ko: '정말 감사합니다!' },
    ],
    tip: '낯선 사람에게는 "Excuse me" 로 시작하는 게 안전. "Could you...?" 는 "Can you...?" 보다 정중.',
  },
  {
    id: 'interview',
    label: '면접 상황',
    emoji: '💼',
    formality: '격식',
    exchange: [
      { en: 'Could you tell me a little about yourself?', ko: '본인에 대해 간단히 말씀해 주시겠어요?' },
      { en: 'Certainly. I am a high school student interested in data science.', ko: '네. 저는 데이터 과학에 관심 있는 고등학생입니다.' },
      { en: 'Why are you applying for this program?', ko: '이 프로그램에 지원하신 이유는요?' },
      { en: 'I would like to deepen my understanding of statistics through hands-on projects.', ko: '실습 프로젝트를 통해 통계에 대한 이해를 깊게 하고 싶어서요.' },
    ],
    tip: '격식체에서는 줄임말(I\'m, don\'t) 자제. "would like to" 같은 정중한 표현 사용.',
  },
  {
    id: 'friend',
    label: '친구와 대화',
    emoji: '👥',
    formality: '비격식',
    exchange: [
      { en: 'Hey, what are you up to this weekend?', ko: '야, 이번 주말에 뭐 해?' },
      { en: 'Not much. Just chilling. You?', ko: '별 거 없어. 그냥 쉬어. 너는?' },
      { en: 'Wanna grab a movie?', ko: '영화 보러 갈래?' },
      { en: 'Sounds good!', ko: '좋아!' },
    ],
    tip: '친구 사이에서는 줄임말과 슬랭이 자연스러움. "Wanna" = "Want to" 의 구어체.',
  },
];

const FORMALITY_COLOR: Record<Situation['formality'], string> = {
  격식: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  준격식: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  비격식: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
};

export function SituationalDialogueSimulator() {
  const [active, setActive] = useState('cafe');
  const cur = SITUATIONS.find((s) => s.id === active)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-1">상황별 대화 패턴</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          영어는 <strong>상황과 격식 수준</strong>에 따라 같은 의미라도 표현이 달라져요. 4가지 상황을 비교해 보세요.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {SITUATIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActive(s.id)}
            className={`px-2 py-3 text-xs rounded-md border min-h-[60px] ${
              active === s.id
                ? 'bg-purple-50 dark:bg-purple-950/30 border-purple-500 ring-2 ring-purple-300 font-bold'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
            }`}
          >
            <div className="text-2xl">{s.emoji}</div>
            <div className="mt-1 leading-tight">{s.label}</div>
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-purple-50 dark:bg-purple-950/30 border-l-4 border-purple-500 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-purple-800 dark:text-purple-300">
            {cur.emoji} {cur.label}
          </div>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${FORMALITY_COLOR[cur.formality]}`}>
            {cur.formality}
          </span>
        </div>
        <div className="space-y-2">
          {cur.exchange.map((line, i) => (
            <div key={i} className="rounded-md bg-white dark:bg-zinc-900 p-3 text-sm">
              <div className={i % 2 === 0 ? 'text-purple-700 dark:text-purple-300 font-semibold' : 'text-zinc-700 dark:text-zinc-300'}>
                {line.en}
              </div>
              <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{line.ko}</div>
            </div>
          ))}
        </div>
        <div className="rounded-md bg-yellow-50 dark:bg-yellow-950/20 px-3 py-2 text-xs text-yellow-800 dark:text-yellow-200">
          💡 {cur.tip}
        </div>
      </div>

      <div className="rounded-md bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-600 dark:text-zinc-400">
        🎯 외운 한 표현만 모든 상황에 쓰지 말고, 상황의 격식 수준에 맞춰 골라 쓰는 감각이 진짜 회화 실력.
      </div>
    </div>
  );
}
