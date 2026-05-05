'use client';

// S7-MA-03 혼합물 분리 — 끓는점/녹는점/입자크기/밀도 차이로 분리.
// 혼합물을 선택하면 적합한 분리법을 추천하고 단계별 시뮬레이션.

import { useState } from 'react';

interface Mixture {
  key: string;
  name: string;
  components: { name: string; bp: number; density: number; size: 'small' | 'large' }[];
  bestMethod: 'distillation' | 'filtration' | 'separator' | 'chromatography' | 'recrystallization';
  reason: string;
}

const MIXTURES: Mixture[] = [
  {
    key: 'water-ethanol',
    name: '물 + 에탄올',
    components: [
      { name: '물', bp: 100, density: 1.0, size: 'small' },
      { name: '에탄올', bp: 78.4, density: 0.79, size: 'small' },
    ],
    bestMethod: 'distillation',
    reason: '끓는점이 다름 → 증류',
  },
  {
    key: 'sand-water',
    name: '모래 + 물',
    components: [
      { name: '모래', bp: 1700, density: 2.6, size: 'large' },
      { name: '물', bp: 100, density: 1.0, size: 'small' },
    ],
    bestMethod: 'filtration',
    reason: '입자 크기 다름 → 거름',
  },
  {
    key: 'oil-water',
    name: '식용유 + 물',
    components: [
      { name: '식용유', bp: 300, density: 0.92, size: 'small' },
      { name: '물', bp: 100, density: 1.0, size: 'small' },
    ],
    bestMethod: 'separator',
    reason: '서로 안 섞이고 밀도 다름 → 분별깔때기',
  },
  {
    key: 'ink',
    name: '잉크 색소',
    components: [
      { name: '빨강', bp: 100, density: 1.0, size: 'small' },
      { name: '파랑', bp: 100, density: 1.0, size: 'small' },
      { name: '노랑', bp: 100, density: 1.0, size: 'small' },
    ],
    bestMethod: 'chromatography',
    reason: '용매에 끌려가는 정도 다름 → 크로마토그래피',
  },
  {
    key: 'salt-impurity',
    name: '소금 (불순물 포함)',
    components: [
      { name: '소금', bp: 1413, density: 2.16, size: 'small' },
      { name: '불순물', bp: 1500, density: 2.0, size: 'small' },
    ],
    bestMethod: 'recrystallization',
    reason: '온도별 용해도 차이 → 재결정',
  },
];

const METHODS: Record<
  string,
  { name: string; principle: string; example: string; color: string }
> = {
  distillation: {
    name: '증류',
    principle: '끓는점 낮은 것부터 기화 → 다시 응결',
    example: '바닷물에서 식수, 술 빚기',
    color: '#ef4444',
  },
  filtration: {
    name: '거름',
    principle: '거름종이 구멍보다 큰 입자만 걸러짐',
    example: '커피 드립, 정수기',
    color: '#3b82f6',
  },
  separator: {
    name: '분별깔때기',
    principle: '밀도 큰 액체가 아래로 → 마개로 따로 받음',
    example: '기름 유출 사고 처리',
    color: '#10b981',
  },
  chromatography: {
    name: '크로마토그래피',
    principle: '용매를 따라 이동하는 속도 차이',
    example: '혈액 검사, 도핑 검사',
    color: '#a855f7',
  },
  recrystallization: {
    name: '재결정',
    principle: '뜨거운 물에 녹였다 식히면 깨끗한 결정만 석출',
    example: '천일염 정제',
    color: '#f59e0b',
  },
};

export function MixtureSeparationExplorer() {
  const [mixIdx, setMixIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const mix = MIXTURES[mixIdx];
  const method = METHODS[mix.bestMethod];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {MIXTURES.map((m, i) => (
          <button
            key={m.key}
            type="button"
            onClick={() => {
              setMixIdx(i);
              setShowAnswer(false);
            }}
            className={`px-2 py-2 rounded text-xs font-medium min-h-[44px] ${
              i === mixIdx
                ? 'bg-emerald-600 text-white'
                : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-700">
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">선택한 혼합물 성분</div>
        <table className="w-full text-sm">
          <thead className="text-xs text-zinc-500 dark:text-zinc-400">
            <tr>
              <th className="text-left">성분</th>
              <th className="text-right">끓는점(°C)</th>
              <th className="text-right">밀도(g/mL)</th>
              <th className="text-right">입자</th>
            </tr>
          </thead>
          <tbody>
            {mix.components.map((c) => (
              <tr key={c.name} className="border-t border-zinc-200 dark:border-zinc-700">
                <td className="py-1 font-medium">{c.name}</td>
                <td className="py-1 text-right font-mono">{c.bp}</td>
                <td className="py-1 text-right font-mono">{c.density.toFixed(2)}</td>
                <td className="py-1 text-right">{c.size === 'small' ? '🔵 작음' : '🟠 큼'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={() => setShowAnswer((s) => !s)}
        className="w-full px-3 py-2 rounded-lg bg-blue-600 text-white font-medium min-h-[44px]"
      >
        {showAnswer ? '🙈 정답 가리기' : '💡 적합한 분리법은?'}
      </button>

      {showAnswer && (
        <div
          className="rounded-xl p-4 border-l-4"
          style={{ borderColor: method.color, background: `${method.color}14` }}
        >
          <div className="text-xs text-zinc-500 dark:text-zinc-400">추천 분리법</div>
          <div className="text-2xl font-bold mb-2" style={{ color: method.color }}>
            {method.name}
          </div>
          <div className="text-sm space-y-1">
            <div>
              <span className="font-bold text-zinc-700 dark:text-zinc-300">원리: </span>
              <span className="text-zinc-600 dark:text-zinc-400">{method.principle}</span>
            </div>
            <div>
              <span className="font-bold text-zinc-700 dark:text-zinc-300">예시: </span>
              <span className="text-zinc-600 dark:text-zinc-400">{method.example}</span>
            </div>
            <div className="mt-2 pt-2 border-t border-zinc-200 dark:border-zinc-700">
              <span className="font-bold text-zinc-700 dark:text-zinc-300">왜? </span>
              <span className="text-zinc-600 dark:text-zinc-400">{mix.reason}</span>
            </div>
          </div>
        </div>
      )}

      <div>
        <div className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">5가지 분리법 한눈에</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          {Object.entries(METHODS).map(([k, m]) => (
            <div
              key={k}
              className="flex items-start gap-2 rounded-lg p-2 bg-zinc-100 dark:bg-zinc-800"
            >
              <div
                className="w-1 self-stretch rounded-full flex-shrink-0"
                style={{ background: m.color }}
              />
              <div>
                <div className="font-bold text-zinc-900 dark:text-zinc-100">{m.name}</div>
                <div className="text-zinc-600 dark:text-zinc-400">{m.principle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        💡 「섞이기 쉬워도 분리는 어렵다」 — 혼합물 분리는 「두 물질이 다른 점」을 활용해요. 끓는점이 다르면 증류, 입자가 크기 다르면 거름, 안 섞이고 밀도 다르면 분별깔때기.
      </div>
    </div>
  );
}
