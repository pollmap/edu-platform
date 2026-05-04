'use client';

// K-LT-03 인물 분석 — 인물의 성격·욕망·갈등·관계 4축으로 살피기.
// 저작권: 실제 작품 인용 X. 일반화된 가상 인물 예시만.

import { useState } from 'react';

interface Character {
  id: string;
  name: string;
  role: '주인공' | '조력자' | '적대자' | '주변 인물';
  trait: string;
  desire: string;
  conflict: string;
  arc: string;
}

interface Story {
  id: string;
  title: string;
  setting: string;
  cast: Character[];
  relations: { from: string; to: string; label: string; tone: 'pos' | 'neg' | 'mix' }[];
}

const STORIES: Story[] = [
  {
    id: 'school',
    title: '학교 합창대회 이야기',
    setting: '평범한 중학교, 합창대회를 앞둔 한 학기',
    cast: [
      { id: 'A', name: '주인공', role: '주인공', trait: '소심하지만 책임감 강함', desire: '자신감을 얻고 싶음', conflict: '대중 앞에서 떨림 vs 무대에 서고 싶음', arc: '연습을 통해 자기 효능감 회복' },
      { id: 'B', name: '친구', role: '조력자', trait: '활발·따뜻함', desire: '주인공이 빛나기를 바람', conflict: '몰래 응원 vs 직접 부담 주지 않기', arc: '진짜 우정을 보여 줌' },
      { id: 'C', name: '경쟁자', role: '적대자', trait: '재능 있지만 오만', desire: '1등을 유지하고 싶음', conflict: '자존심 vs 인정', arc: '패배에서 배우기' },
    ],
    relations: [
      { from: 'A', to: 'B', label: '의지 / 우정', tone: 'pos' },
      { from: 'A', to: 'C', label: '경쟁 / 부담', tone: 'neg' },
      { from: 'B', to: 'C', label: '의례적 거리감', tone: 'mix' },
    ],
  },
  {
    id: 'family',
    title: '이사 가는 날 이야기',
    setting: '익숙한 동네를 떠나야 하는 가족',
    cast: [
      { id: 'A', name: '주인공', role: '주인공', trait: '감수성 풍부, 추억 많음', desire: '친구와 헤어지지 않기', conflict: '가족 따라가야 함 vs 떠나기 싫음', arc: '이별을 받아들이며 성숙' },
      { id: 'B', name: '엄마', role: '조력자', trait: '단단하고 따뜻함', desire: '아이의 적응', conflict: '강요할 수 없는 마음', arc: '말없이 곁을 지킴' },
      { id: 'C', name: '오랜 친구', role: '주변 인물', trait: '솔직·유쾌', desire: '관계가 끊기지 않기', conflict: '서운함 vs 응원', arc: '편지·연락으로 우정 유지 약속' },
    ],
    relations: [
      { from: 'A', to: 'B', label: '갈등 → 이해', tone: 'mix' },
      { from: 'A', to: 'C', label: '깊은 우정', tone: 'pos' },
    ],
  },
];

const TONE_STYLE = {
  pos: { color: '#16a34a', label: '긍정' },
  neg: { color: '#dc2626', label: '갈등' },
  mix: { color: '#ca8a04', label: '복합' },
} as const;

export function CharacterRelationExplorer() {
  const [storyId, setStoryId] = useState(STORIES[0].id);
  const [charId, setCharId] = useState<string>('A');

  const story = STORIES.find((s) => s.id === storyId)!;
  const cur = story.cast.find((c) => c.id === charId);

  const switchStory = (id: string) => {
    setStoryId(id);
    setCharId('A');
  };

  // 노드 위치 계산 (3명 기준 삼각형)
  const positions: Record<string, { x: number; y: number }> = {};
  story.cast.forEach((c, i) => {
    const angle = -90 + i * (360 / story.cast.length);
    const rad = (angle * Math.PI) / 180;
    positions[c.id] = {
      x: 180 + Math.cos(rad) * 90,
      y: 110 + Math.sin(rad) * 60,
    };
  });

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-1">
          인물 분석 — 성격·욕망·갈등·관계
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          인물은 단순히 "착한·나쁜"이 아니에요. <strong>욕망</strong>이 무엇인지, 그것이 어디서 막히는지(<strong>갈등</strong>) 보면 인물이 살아나요.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {STORIES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => switchStory(s.id)}
            className={`px-2 py-3 text-xs rounded-md border min-h-[48px] ${
              storyId === s.id
                ? 'bg-red-50 dark:bg-red-950/30 border-red-500 ring-2 ring-red-300 font-bold'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400 italic">{story.setting}</div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4">
        <svg viewBox="0 0 360 220" className="w-full max-w-[480px] mx-auto block">
          {story.relations.map((r, i) => {
            const a = positions[r.from];
            const b = positions[r.to];
            if (!a || !b) return null;
            return (
              <g key={i}>
                <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={TONE_STYLE[r.tone].color} strokeWidth="1.5" strokeDasharray={r.tone === 'mix' ? '4 3' : ''} />
                <text x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 4} fontSize="9" fill={TONE_STYLE[r.tone].color} textAnchor="middle">
                  {r.label}
                </text>
              </g>
            );
          })}
          {story.cast.map((c) => {
            const p = positions[c.id];
            const isActive = charId === c.id;
            return (
              <g key={c.id} onClick={() => setCharId(c.id)} style={{ cursor: 'pointer' }}>
                <circle cx={p.x} cy={p.y} r={isActive ? 26 : 22} fill={isActive ? '#dc2626' : '#fecaca'} stroke="#dc2626" strokeWidth="2" />
                <text x={p.x} y={p.y - 1} fontSize="10" fontWeight="bold" fill={isActive ? 'white' : '#7f1d1d'} textAnchor="middle">
                  {c.name}
                </text>
                <text x={p.x} y={p.y + 11} fontSize="8" fill={isActive ? 'white' : '#7f1d1d'} textAnchor="middle">
                  {c.role}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {cur && (
        <div className="rounded-xl bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-4 space-y-2">
          <div className="text-lg font-bold text-red-800 dark:text-red-300">{cur.name} <span className="text-xs font-normal text-zinc-500">({cur.role})</span></div>
          <dl className="text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
            <div><dt className="inline font-bold">성격: </dt><dd className="inline">{cur.trait}</dd></div>
            <div><dt className="inline font-bold">욕망: </dt><dd className="inline">{cur.desire}</dd></div>
            <div><dt className="inline font-bold">갈등: </dt><dd className="inline">{cur.conflict}</dd></div>
            <div><dt className="inline font-bold">변화: </dt><dd className="inline">{cur.arc}</dd></div>
          </dl>
        </div>
      )}

      <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950/40 p-3 text-xs text-zinc-600 dark:text-zinc-400">
        <strong>팁:</strong> 인물의 욕망과 그것을 막는 갈등을 한 문장으로 적어 보세요. 그 한 문장이 인물의 핵심이에요.
      </div>
    </div>
  );
}
