'use client';

// K-CK1-05 문학 — 시·소설·극·수필 갈래별 구조 비교.

import { useState } from 'react';

interface Genre {
  id: string;
  label: string;
  emoji: string;
  unit: string;
  voice: string;
  structure: string[];
  example: string;
  reading: string;
}

const GENRES: Genre[] = [
  {
    id: 'poem',
    label: '시',
    emoji: '🌙',
    unit: '행과 연',
    voice: '시적 화자(서정적 자아)',
    structure: ['압축', '운율', '심상', '함축'],
    example: '한 문장도 안 되는 짧은 표현 안에 풍경·감정·시간을 다 압축해 넣어요. "겨울이 왔다" 한 줄이 한 편의 시가 될 수도 있어요.',
    reading: '소리 내어 읽으며 운율 느끼기 → 화자가 누구인지 찾기 → 핵심 이미지 1개 잡기.',
  },
  {
    id: 'novel',
    label: '소설',
    emoji: '📖',
    unit: '문단과 장(章)',
    voice: '서술자(1·2·3인칭, 전지적 등)',
    structure: ['인물', '사건', '배경', '주제'],
    example: '인물의 내면을 따라가며 시간 순서대로 사건이 전개돼요. 주인공이 갈등을 겪고 변화하는 과정이 핵심이에요.',
    reading: '인물 관계도 그리기 → 발단·전개·위기·절정·결말 5단계로 사건 정리 → 서술자 위치 파악.',
  },
  {
    id: 'drama',
    label: '극(희곡)',
    emoji: '🎭',
    unit: '막과 장면',
    voice: '등장인물의 대사 (서술자 없음)',
    structure: ['대사', '지시문', '갈등', '무대'],
    example: '서술자가 없고 대사와 행동만으로 사건이 진행돼요. 무대 위에서 실제로 보여주는 것을 전제로 쓰기 때문에 "지금 여기"의 현재성이 강해요.',
    reading: '인물별 대사 색깔 다르게 표시 → 지시문(괄호 부분)으로 행동·감정 추리 → 갈등 축 1개 잡기.',
  },
  {
    id: 'essay',
    label: '수필',
    emoji: '✍️',
    unit: '단락',
    voice: '글쓴이 자신 (= 화자 = 작가)',
    structure: ['체험', '성찰', '개성', '자유 형식'],
    example: '글쓴이 자신이 직접 보고 느낀 것을 자유 형식으로 써요. 일기에 가깝지만 더 다듬어져 있고 주제 의식이 있어요.',
    reading: '글쓴이의 직접 경험인지 확인 → 사건에서 끌어낸 깨달음(성찰) 찾기 → 어조(유머·진지·서정)가 어떤지 관찰.',
  },
];

export function LiteraryGenreExplorer() {
  const [active, setActive] = useState('poem');
  const cur = GENRES.find((g) => g.id === active)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-1">문학 4갈래 비교</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          문학은 형식에 따라 <strong>시·소설·극·수필</strong> 4가지로 나눠요. 같은 주제라도 갈래가 바뀌면 전달 방식이 완전히 달라져요.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {GENRES.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setActive(g.id)}
            className={`px-2 py-3 text-xs rounded-md border min-h-[60px] ${
              active === g.id
                ? 'bg-red-50 dark:bg-red-950/30 border-red-500 ring-2 ring-red-300 font-bold'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
            }`}
          >
            <div className="text-2xl">{g.emoji}</div>
            <div className="mt-1">{g.label}</div>
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-4 space-y-3">
        <div className="text-lg font-bold text-red-800 dark:text-red-300">
          {cur.emoji} {cur.label}
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-md bg-white dark:bg-zinc-900 px-3 py-2">
            <div className="text-zinc-500 dark:text-zinc-400 mb-0.5">기본 단위</div>
            <div className="font-semibold">{cur.unit}</div>
          </div>
          <div className="rounded-md bg-white dark:bg-zinc-900 px-3 py-2">
            <div className="text-zinc-500 dark:text-zinc-400 mb-0.5">말하는 사람</div>
            <div className="font-semibold">{cur.voice}</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {cur.structure.map((s) => (
            <span
              key={s}
              className="rounded-full bg-white dark:bg-zinc-900 border border-red-300 dark:border-red-700 px-2.5 py-1 text-xs font-semibold text-red-700 dark:text-red-300"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="rounded-md bg-white dark:bg-zinc-900 p-3 text-sm text-zinc-700 dark:text-zinc-300">
          {cur.example}
        </div>
        <div className="text-xs text-zinc-600 dark:text-zinc-400">
          💡 <strong>읽는 법</strong> — {cur.reading}
        </div>
      </div>

      <div className="rounded-md bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-600 dark:text-zinc-400">
        🎯 같은 사건도 시는 압축해서, 소설은 풀어서, 극은 보여주듯, 수필은 성찰로 — 갈래별 변환 연습이 작품 분석의 출발점.
      </div>
    </div>
  );
}
