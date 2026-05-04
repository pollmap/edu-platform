'use client';

// S6-LI-01 우리 몸 구조와 기능 — 8 인체 시스템 클릭 토글 + 기능 설명.

import { useState } from 'react';

interface BodySystem {
  id: string;
  name: string;
  color: string;
  organs: string[];
  function: string;
  paths: { d: string }[];
}

const SYSTEMS: BodySystem[] = [
  {
    id: 'skeletal',
    name: '뼈대(골격)계',
    color: '#e5e7eb',
    organs: ['두개골', '척추', '갈비뼈', '팔다리뼈'],
    function: '몸을 지탱하고 내장을 보호해요. 어른은 뼈가 약 206개 있어요.',
    paths: [
      { d: 'M 100 30 Q 90 30 90 50 Q 90 70 100 70 Q 110 70 110 50 Q 110 30 100 30' },
      { d: 'M 95 70 L 95 180 M 105 70 L 105 180' },
      { d: 'M 75 95 L 95 90 M 75 105 L 95 100 M 75 115 L 95 110 M 105 90 L 125 95 M 105 100 L 125 105 M 105 110 L 125 115' },
      { d: 'M 95 180 L 80 280 M 105 180 L 120 280' },
      { d: 'M 95 90 L 65 160 M 105 90 L 135 160' },
    ],
  },
  {
    id: 'muscular',
    name: '근육계',
    color: '#dc2626',
    organs: ['팔근육', '다리근육', '심장근육', '복근'],
    function: '뼈를 움직이고 자세를 유지해요. 우리 몸에 약 600개의 근육이 있어요.',
    paths: [
      { d: 'M 75 100 Q 60 130 70 165 Q 80 155 85 130 Q 85 110 75 100' },
      { d: 'M 125 100 Q 140 130 130 165 Q 120 155 115 130 Q 115 110 125 100' },
      { d: 'M 80 190 Q 70 230 75 270 Q 85 270 90 230 Q 90 200 80 190' },
      { d: 'M 120 190 Q 130 230 125 270 Q 115 270 110 230 Q 110 200 120 190' },
    ],
  },
  {
    id: 'circulatory',
    name: '순환계',
    color: '#ef4444',
    organs: ['심장', '동맥', '정맥', '모세혈관'],
    function: '심장이 펌프처럼 피를 온몸으로 보내 산소·영양분을 전달해요.',
    paths: [
      { d: 'M 92 110 Q 88 100 95 100 Q 100 95 100 105 Q 100 95 105 100 Q 112 100 108 110 Q 100 125 92 110' },
      { d: 'M 100 115 L 100 250 M 100 115 L 70 180 M 100 115 L 130 180' },
      { d: 'M 95 250 L 80 290 M 105 250 L 120 290' },
    ],
  },
  {
    id: 'respiratory',
    name: '호흡계',
    color: '#3b82f6',
    organs: ['코', '기관', '폐', '횡격막'],
    function: '공기에서 산소를 받아들이고 이산화탄소를 내보내요.',
    paths: [
      { d: 'M 100 85 L 100 110' },
      { d: 'M 80 110 Q 70 130 75 160 Q 85 160 90 140 Q 92 120 80 110' },
      { d: 'M 120 110 Q 130 130 125 160 Q 115 160 110 140 Q 108 120 120 110' },
      { d: 'M 70 165 L 130 165' },
    ],
  },
  {
    id: 'digestive',
    name: '소화계',
    color: '#f59e0b',
    organs: ['입', '식도', '위', '소장', '대장'],
    function: '음식물을 잘게 부수고 영양분을 흡수해요. 길이 약 9m.',
    paths: [
      { d: 'M 100 85 L 100 130' },
      { d: 'M 100 130 Q 85 135 88 155 Q 95 165 110 158 Q 115 145 100 130' },
      { d: 'M 100 160 Q 80 175 85 195 Q 100 205 115 200 Q 125 185 100 160' },
      { d: 'M 88 180 L 88 230 L 115 230 L 115 180' },
    ],
  },
  {
    id: 'nervous',
    name: '신경계',
    color: '#8b5cf6',
    organs: ['뇌', '척수', '신경'],
    function: '신호를 주고받아 몸을 움직이고 생각·감각을 만들어요.',
    paths: [
      { d: 'M 85 30 Q 85 15 100 15 Q 115 15 115 30 Q 115 45 100 50 Q 85 45 85 30' },
      { d: 'M 100 50 L 100 250' },
      { d: 'M 100 100 L 70 130 M 100 100 L 130 130' },
      { d: 'M 100 200 L 75 240 M 100 200 L 125 240' },
    ],
  },
  {
    id: 'excretory',
    name: '배설계',
    color: '#10b981',
    organs: ['콩팥', '요관', '방광'],
    function: '몸의 노폐물을 오줌으로 걸러 내보내요.',
    paths: [
      { d: 'M 80 175 Q 75 175 75 185 Q 75 200 82 200 Q 88 200 88 185 Q 88 175 80 175' },
      { d: 'M 120 175 Q 125 175 125 185 Q 125 200 118 200 Q 112 200 112 185 Q 112 175 120 175' },
      { d: 'M 82 200 L 95 230 M 118 200 L 105 230' },
      { d: 'M 88 230 L 112 230 L 110 245 L 90 245 Z' },
    ],
  },
  {
    id: 'sensory',
    name: '감각계',
    color: '#ec4899',
    organs: ['눈', '귀', '코', '혀', '피부'],
    function: '빛·소리·냄새·맛·촉감을 통해 바깥세상을 느껴요.',
    paths: [
      { d: 'M 92 28 Q 95 26 98 28 Q 95 30 92 28 M 102 28 Q 105 26 108 28 Q 105 30 102 28' },
      { d: 'M 84 32 Q 80 35 84 38 M 116 32 Q 120 35 116 38' },
      { d: 'M 100 36 L 100 40' },
    ],
  },
];

export function HumanBodySystems() {
  const [active, setActive] = useState<string>('skeletal');
  const sys = SYSTEMS.find((s) => s.id === active)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          우리 몸 8가지 시스템
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          시스템을 골라 보세요. 각 부분이 어떤 일을 하는지 보여드려요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4">
          <svg viewBox="0 0 200 300" className="w-full max-w-[260px] mx-auto block" aria-label="인체 모형">
            <ellipse cx="100" cy="35" rx="18" ry="22" fill="#fde68a" stroke="#1f2937" strokeWidth="1.2" />
            <path d="M 75 70 L 125 70 L 130 180 L 70 180 Z" fill="#fde68a" stroke="#1f2937" strokeWidth="1.2" />
            <rect x="73" y="180" width="22" height="100" rx="6" fill="#fde68a" stroke="#1f2937" strokeWidth="1.2" />
            <rect x="105" y="180" width="22" height="100" rx="6" fill="#fde68a" stroke="#1f2937" strokeWidth="1.2" />
            <rect x="55" y="80" width="14" height="80" rx="6" fill="#fde68a" stroke="#1f2937" strokeWidth="1.2" />
            <rect x="131" y="80" width="14" height="80" rx="6" fill="#fde68a" stroke="#1f2937" strokeWidth="1.2" />
            {sys.paths.map((p, i) => (
              <path key={i} d={p.d} fill="none" stroke={sys.color} strokeWidth="2.2" strokeLinecap="round" />
            ))}
          </svg>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {SYSTEMS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                className={`px-3 py-2 text-sm rounded-md border min-h-[44px] text-left transition ${
                  active === s.id
                    ? 'bg-green-50 dark:bg-green-950/30 border-green-500 ring-2 ring-green-300'
                    : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                }`}
              >
                <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ background: s.color }} />
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{s.name}</span>
              </button>
            ))}
          </div>

          <div className="rounded-xl bg-green-50 dark:bg-green-950/30 border-l-4 border-green-500 p-4">
            <div className="font-bold text-green-800 dark:text-green-300 mb-1.5">{sys.name}</div>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-2">{sys.function}</p>
            <div className="text-xs text-zinc-600 dark:text-zinc-400">
              주요 기관: {sys.organs.join(' · ')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
