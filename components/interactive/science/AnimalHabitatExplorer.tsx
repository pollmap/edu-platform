'use client';

// S3-LI-01 동물의 생활 — 서식지·먹이·특징 매칭.

import { useState } from 'react';

interface Habitat {
  id: string;
  label: string;
  emoji: string;
  bg: string;
  animals: Animal[];
}

interface Animal {
  name: string;
  emoji: string;
  food: string;
  feature: string;
}

const HABITATS: Habitat[] = [
  {
    id: 'land',
    label: '땅',
    emoji: '🌳',
    bg: 'from-amber-100 to-green-100 dark:from-amber-950/30 dark:to-green-950/30',
    animals: [
      { name: '토끼', emoji: '🐰', food: '풀·당근', feature: '귀가 길고 잘 들어요' },
      { name: '여우', emoji: '🦊', food: '쥐·토끼', feature: '잘 달리고 꾀가 많아요' },
      { name: '개미', emoji: '🐜', food: '단 음식·작은 곤충', feature: '여럿이 모여 살아요' },
    ],
  },
  {
    id: 'water',
    label: '물',
    emoji: '🌊',
    bg: 'from-cyan-100 to-blue-200 dark:from-cyan-950/30 dark:to-blue-950/30',
    animals: [
      { name: '물고기', emoji: '🐟', food: '플랑크톤·작은 물고기', feature: '아가미로 숨 쉬어요' },
      { name: '문어', emoji: '🐙', food: '게·새우', feature: '다리가 8개, 색을 바꿔요' },
      { name: '돌고래', emoji: '🐬', food: '물고기', feature: '소리로 위치를 알아요' },
    ],
  },
  {
    id: 'sky',
    label: '하늘',
    emoji: '☁️',
    bg: 'from-sky-100 to-blue-100 dark:from-sky-950/30 dark:to-blue-950/30',
    animals: [
      { name: '참새', emoji: '🐦', food: '곡식·벌레', feature: '작고 빨라요' },
      { name: '독수리', emoji: '🦅', food: '쥐·토끼', feature: '시력이 매우 좋아요' },
      { name: '나비', emoji: '🦋', food: '꽃의 꿀', feature: '날개에 무늬가 있어요' },
    ],
  },
  {
    id: 'desert',
    label: '사막',
    emoji: '🏜️',
    bg: 'from-orange-100 to-yellow-100 dark:from-orange-950/30 dark:to-yellow-950/30',
    animals: [
      { name: '낙타', emoji: '🐪', food: '풀·가시 식물', feature: '혹에 지방 저장, 며칠 안 마셔도 OK' },
      { name: '도마뱀', emoji: '🦎', food: '곤충', feature: '햇볕에 몸을 데워요' },
      { name: '전갈', emoji: '🦂', food: '곤충·작은 도마뱀', feature: '꼬리에 독이 있어요' },
    ],
  },
];

export function AnimalHabitatExplorer() {
  const [active, setActive] = useState('land');
  const [selected, setSelected] = useState<string | null>(null);

  const cur = HABITATS.find((h) => h.id === active)!;
  const animal = cur.animals.find((a) => a.name === selected);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          동물의 생활 — 서식지별로 살펴봐요
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          동물들은 사는 곳에 맞춰 <strong>몸의 모양·먹이·행동</strong>이 다르게 진화했어요.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {HABITATS.map((h) => (
          <button
            key={h.id}
            type="button"
            onClick={() => { setActive(h.id); setSelected(null); }}
            className={`px-3 py-3 text-sm rounded-md border min-h-[60px] ${
              active === h.id
                ? 'bg-green-50 dark:bg-green-950/30 border-green-500 ring-2 ring-green-300'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
            }`}
          >
            <div className="text-2xl">{h.emoji}</div>
            <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100 mt-1">{h.label}</div>
          </button>
        ))}
      </div>

      <div className={`rounded-xl bg-gradient-to-b ${cur.bg} border border-zinc-200 dark:border-zinc-800 p-4 space-y-3`}>
        <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {cur.emoji} {cur.label}에 사는 동물들 — 클릭해서 자세히 보세요
        </div>
        <div className="grid grid-cols-3 gap-2">
          {cur.animals.map((a) => (
            <button
              key={a.name}
              type="button"
              onClick={() => setSelected(a.name)}
              className={`bg-white dark:bg-zinc-900 rounded-lg p-3 border min-h-[80px] ${
                selected === a.name
                  ? 'border-green-500 ring-2 ring-green-300'
                  : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-400'
              }`}
            >
              <div className="text-3xl">{a.emoji}</div>
              <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100 mt-1">{a.name}</div>
            </button>
          ))}
        </div>
      </div>

      {animal && (
        <div className="rounded-xl bg-green-50 dark:bg-green-950/30 border-l-4 border-green-500 p-4 space-y-1">
          <div className="font-bold text-green-800 dark:text-green-300">
            {animal.emoji} {animal.name}
          </div>
          <div className="text-sm text-zinc-700 dark:text-zinc-300">
            <strong>먹이:</strong> {animal.food}
          </div>
          <div className="text-sm text-zinc-700 dark:text-zinc-300">
            <strong>특징:</strong> {animal.feature}
          </div>
        </div>
      )}
    </div>
  );
}
