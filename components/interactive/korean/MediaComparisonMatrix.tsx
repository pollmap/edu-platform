'use client';

// K-CK1-06 매체 — 인쇄·방송·영상·소셜 4매체 비교 매트릭스.

import { useState } from 'react';

interface Medium {
  id: string;
  label: string;
  emoji: string;
  speed: number;
  reach: number;
  depth: number;
  trust: number;
  feature: string;
  caution: string;
}

const MEDIA: Medium[] = [
  {
    id: 'print',
    label: '인쇄(신문·잡지)',
    emoji: '📰',
    speed: 1,
    reach: 2,
    depth: 4,
    trust: 4,
    feature: '편집·교정 단계가 길어서 사실 검증이 가장 깐깐. 한 사건을 깊게 분석.',
    caution: '발행이 느려 속보에는 약함. 종이 매체는 독자 연령층이 한쪽에 쏠릴 수 있음.',
  },
  {
    id: 'broadcast',
    label: '방송(TV·라디오)',
    emoji: '📺',
    speed: 3,
    reach: 4,
    depth: 2,
    trust: 3,
    feature: '시청각이 결합돼 정보 전달이 직관적. 동시간대에 많은 사람이 같은 화면을 봄.',
    caution: '시간 제약(보통 1~3분)으로 깊이가 얕아짐. 화면 편집이 인상에 큰 영향.',
  },
  {
    id: 'video',
    label: '영상 플랫폼(유튜브)',
    emoji: '▶️',
    speed: 4,
    reach: 4,
    depth: 3,
    trust: 2,
    feature: '제작자가 누구나 가능. 알고리즘이 비슷한 영상을 계속 추천.',
    caution: '편집 자유도가 높아 의도적 왜곡이 쉬움. 알고리즘이 시야를 좁힐 수 있음(필터버블).',
  },
  {
    id: 'social',
    label: '소셜 미디어(SNS)',
    emoji: '💬',
    speed: 5,
    reach: 5,
    depth: 1,
    trust: 1,
    feature: '실시간·쌍방향. 사용자가 곧 발신자. 공유로 빠르게 확산.',
    caution: '검증 절차 거의 없음. 가짜뉴스·혐오·확증편향이 가장 빠르게 퍼짐.',
  },
];

const AXES = [
  { key: 'speed', label: '속도', color: 'red' },
  { key: 'reach', label: '도달 범위', color: 'blue' },
  { key: 'depth', label: '심층성', color: 'green' },
  { key: 'trust', label: '검증 강도', color: 'purple' },
] as const;

export function MediaComparisonMatrix() {
  const [active, setActive] = useState('print');
  const cur = MEDIA.find((m) => m.id === active)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-1">매체 비교 매트릭스</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          같은 사건도 어떤 <strong>매체</strong>로 전해지냐에 따라 완전히 다른 정보가 돼요. 4가지 축으로 비교해 보세요.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {MEDIA.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setActive(m.id)}
            className={`px-2 py-3 text-xs rounded-md border min-h-[60px] ${
              active === m.id
                ? 'bg-red-50 dark:bg-red-950/30 border-red-500 ring-2 ring-red-300 font-bold'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
            }`}
          >
            <div className="text-2xl">{m.emoji}</div>
            <div className="mt-1 text-[11px] leading-tight">{m.label}</div>
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-4 space-y-3">
        <div className="text-lg font-bold text-red-800 dark:text-red-300">
          {cur.emoji} {cur.label}
        </div>
        <div className="space-y-1.5">
          {AXES.map((a) => {
            const v = cur[a.key as keyof Medium] as number;
            return (
              <div key={a.key} className="flex items-center gap-2 text-xs">
                <div className="w-20 text-zinc-600 dark:text-zinc-400">{a.label}</div>
                <div className="flex-1 h-3 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-red-500"
                    style={{ width: `${(v / 5) * 100}%` }}
                  />
                </div>
                <div className="w-8 text-right font-mono">{v}/5</div>
              </div>
            );
          })}
        </div>
        <div className="rounded-md bg-white dark:bg-zinc-900 p-3 text-xs text-zinc-700 dark:text-zinc-300 space-y-1">
          <div>
            <strong className="text-green-700 dark:text-green-400">강점</strong> — {cur.feature}
          </div>
          <div>
            <strong className="text-orange-700 dark:text-orange-400">주의</strong> — {cur.caution}
          </div>
        </div>
      </div>

      <div className="rounded-md bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-600 dark:text-zinc-400">
        🎯 같은 정보를 여러 매체에서 교차 확인하는 습관이 미디어 리터러시의 출발점.
      </div>
    </div>
  );
}
