'use client';

// S-BIO-01 생명과학의 이해 — 생명의 7가지 특성 매트릭스.
// 7가지 특성 (세포 구조·물질대사·반응·항상성·발생/생장·생식/유전·적응/진화) 중에서
// 어떤 것을 "갖췄는지" 표시되는 매트릭스로 바이러스/박테리아/식물/동물/광물(돌)/불꽃을 비교.

import { useMemo, useState } from 'react';

interface Trait {
  id: string;
  label: string;
  short: string;
  hint: string;
}

interface Subject {
  id: string;
  label: string;
  emoji: string;
  // 특성별 점수: 0=없음, 0.5=일부/부분, 1=있음
  scores: Record<string, number>;
  note: string;
}

const TRAITS: Trait[] = [
  { id: 'cell', label: '세포 구조', short: '세포', hint: '모든 생물은 세포로 이뤄져 있어요. 바이러스는 세포가 없어요.' },
  { id: 'metabolism', label: '물질대사', short: '대사', hint: '효소를 써서 동화·이화 작용으로 에너지를 만들고 써요.' },
  { id: 'response', label: '자극 반응', short: '반응', hint: '빛·소리·온도 같은 자극에 반응해요.' },
  { id: 'homeostasis', label: '항상성', short: '항상', hint: '체온·혈당·삼투압 같은 내부 환경을 일정하게 유지해요.' },
  { id: 'development', label: '발생/생장', short: '생장', hint: '수정란→배아→성체로 자라며 형태가 바뀌어요.' },
  { id: 'reproduction', label: '생식/유전', short: '유전', hint: 'DNA를 자손에게 물려줘요.' },
  { id: 'evolution', label: '적응/진화', short: '진화', hint: '여러 세대에 걸쳐 환경에 맞춰 변해요.' },
];

const SUBJECTS: Subject[] = [
  {
    id: 'animal',
    label: '동물 (사람)',
    emoji: '🦊',
    scores: { cell: 1, metabolism: 1, response: 1, homeostasis: 1, development: 1, reproduction: 1, evolution: 1 },
    note: '7가지 특성 모두 충족 — 전형적인 생물.',
  },
  {
    id: 'plant',
    label: '식물',
    emoji: '🌳',
    scores: { cell: 1, metabolism: 1, response: 1, homeostasis: 1, development: 1, reproduction: 1, evolution: 1 },
    note: '광합성으로 스스로 양분을 만드는 자가영양 생물.',
  },
  {
    id: 'bacteria',
    label: '세균',
    emoji: '🦠',
    scores: { cell: 1, metabolism: 1, response: 1, homeostasis: 1, development: 0.5, reproduction: 1, evolution: 1 },
    note: '단세포라 발생 단계는 단순하지만, 생물의 모든 특성을 갖춘 원핵생물.',
  },
  {
    id: 'virus',
    label: '바이러스',
    emoji: '🧬',
    scores: { cell: 0, metabolism: 0, response: 0, homeostasis: 0, development: 0, reproduction: 0.5, evolution: 1 },
    note: '숙주 안에서만 증식하고 변이해요. 세포가 없고 스스로 대사 못해요. 생물·무생물의 경계.',
  },
  {
    id: 'fire',
    label: '불꽃',
    emoji: '🔥',
    scores: { cell: 0, metabolism: 0.5, response: 0.5, homeostasis: 0, development: 0, reproduction: 0, evolution: 0 },
    note: '연소 반응(에너지 변환)·산소에 반응처럼 보여 헷갈리지만, 세포·DNA·진화가 없어요.',
  },
  {
    id: 'rock',
    label: '광물 (수정)',
    emoji: '🪨',
    scores: { cell: 0, metabolism: 0, response: 0, homeostasis: 0, development: 0.5, reproduction: 0, evolution: 0 },
    note: '결정 성장은 "자라는 것처럼" 보이지만 대사가 없어요. 무생물.',
  },
];

function cellColor(score: number): string {
  if (score === 1) return 'bg-green-500/90 text-white';
  if (score === 0.5) return 'bg-amber-400/80 text-zinc-900';
  return 'bg-zinc-300 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400';
}

function cellSymbol(score: number): string {
  if (score === 1) return 'O';
  if (score === 0.5) return '△';
  return 'X';
}

export function CharacteristicsOfLifeMatrix() {
  const [activeSubject, setActiveSubject] = useState<string>('animal');
  const [activeTrait, setActiveTrait] = useState<string>('cell');

  const subject = useMemo(() => SUBJECTS.find((s) => s.id === activeSubject)!, [activeSubject]);
  const trait = useMemo(() => TRAITS.find((t) => t.id === activeTrait)!, [activeTrait]);

  const totalScore = useMemo(() => {
    return Object.values(subject.scores).reduce((acc, v) => acc + v, 0);
  }, [subject]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {SUBJECTS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveSubject(s.id)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition min-h-[44px] ${
              activeSubject === s.id
                ? 'bg-green-600 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
            }`}
            aria-pressed={activeSubject === s.id}
          >
            <span className="mr-1">{s.emoji}</span>
            {s.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-700">
        <table className="w-full text-sm">
          <thead className="bg-zinc-100 dark:bg-zinc-800">
            <tr>
              <th className="px-2 py-2 text-left">대상</th>
              {TRAITS.map((t) => (
                <th
                  key={t.id}
                  className="px-1 py-2 text-center cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  onClick={() => setActiveTrait(t.id)}
                >
                  {t.short}
                </th>
              ))}
              <th className="px-2 py-2 text-center">합계</th>
            </tr>
          </thead>
          <tbody>
            {SUBJECTS.map((s) => {
              const total = Object.values(s.scores).reduce((acc, v) => acc + v, 0);
              return (
                <tr
                  key={s.id}
                  className={`border-t border-zinc-200 dark:border-zinc-700 cursor-pointer ${
                    activeSubject === s.id ? 'bg-green-50 dark:bg-green-950/40' : ''
                  }`}
                  onClick={() => setActiveSubject(s.id)}
                >
                  <td className="px-2 py-2 font-medium whitespace-nowrap">
                    {s.emoji} {s.label}
                  </td>
                  {TRAITS.map((t) => (
                    <td
                      key={t.id}
                      className={`px-1 py-2 text-center font-bold ${cellColor(s.scores[t.id] ?? 0)}`}
                    >
                      {cellSymbol(s.scores[t.id] ?? 0)}
                    </td>
                  ))}
                  <td className="px-2 py-2 text-center font-mono">{total.toFixed(1)}/7</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-xl bg-green-50 dark:bg-green-950/40 p-4 border border-green-200 dark:border-green-800">
          <div className="text-xs uppercase tracking-wide text-green-700 dark:text-green-400 mb-1">
            선택한 대상
          </div>
          <div className="font-bold mb-1">
            {subject.emoji} {subject.label} — 점수 {totalScore.toFixed(1)} / 7
          </div>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">{subject.note}</p>
        </div>
        <div className="rounded-xl bg-blue-50 dark:bg-blue-950/40 p-4 border border-blue-200 dark:border-blue-800">
          <div className="text-xs uppercase tracking-wide text-blue-700 dark:text-blue-400 mb-1">
            선택한 특성
          </div>
          <div className="font-bold mb-1">{trait.label}</div>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">{trait.hint}</p>
        </div>
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        ⚪ O = 충족 · △ = 부분 · X = 없음. 표 헤더와 셀을 눌러 비교해 보세요.
      </div>
    </div>
  );
}
