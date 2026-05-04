'use client';

// E-GR-10 비교급·최상급 — 슬라이더로 형용사 변형.

import { useMemo, useState } from 'react';

interface AdjItem {
  base: string;
  meaning: string;
  comp: string;
  sup: string;
  rule: string;
}

const ADJECTIVES: AdjItem[] = [
  {
    base: 'tall',
    meaning: '키가 큰',
    comp: 'taller',
    sup: 'tallest',
    rule: '1음절 → -er / -est',
  },
  {
    base: 'big',
    meaning: '큰',
    comp: 'bigger',
    sup: 'biggest',
    rule: '단모음 + 단자음 → 자음 한 번 더 + er / est',
  },
  {
    base: 'happy',
    meaning: '행복한',
    comp: 'happier',
    sup: 'happiest',
    rule: '자음 + y → y를 i로 바꾸고 -er / -est',
  },
  {
    base: 'beautiful',
    meaning: '아름다운',
    comp: 'more beautiful',
    sup: 'most beautiful',
    rule: '3음절 이상 → more / most',
  },
  {
    base: 'good',
    meaning: '좋은',
    comp: 'better',
    sup: 'best',
    rule: '불규칙 변화 (good - better - best)',
  },
  {
    base: 'bad',
    meaning: '나쁜',
    comp: 'worse',
    sup: 'worst',
    rule: '불규칙 변화 (bad - worse - worst)',
  },
];

type Level = 0 | 1 | 2;

const LEVEL_LABEL: Record<Level, string> = {
  0: '원급 (그냥)',
  1: '비교급 (~보다 더)',
  2: '최상급 (가장 ~)',
};

const TEMPLATE_LABEL: Record<Level, string> = {
  0: 'as ___ as',
  1: '___er than / more ___ than',
  2: 'the ___est / the most ___',
};

export function ComparativeSlider() {
  const [adjIdx, setAdjIdx] = useState(0);
  const [level, setLevel] = useState<Level>(0);

  const adj = ADJECTIVES[adjIdx];

  const formed = useMemo(() => {
    if (level === 0) return adj.base;
    if (level === 1) return adj.comp;
    return adj.sup;
  }, [level, adj]);

  const sentence = useMemo(() => {
    if (level === 0) {
      return {
        en: `Tom is as ${adj.base} as Mike.`,
        ko: `Tom은 Mike만큼 ${adj.meaning}.`,
      };
    }
    if (level === 1) {
      return {
        en: `Tom is ${adj.comp} than Mike.`,
        ko: `Tom은 Mike보다 더 ${adj.meaning}.`,
      };
    }
    return {
      en: `Tom is the ${adj.sup} of all.`,
      ko: `Tom은 모두 중에 가장 ${adj.meaning}.`,
    };
  }, [level, adj]);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-1">
          비교 슬라이더
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          슬라이더를 움직이면 형용사가 <strong>원급 → 비교급 → 최상급</strong>으로 단계적으로 변해요.
          한국어 ‘큰 / 더 큰 / 가장 큰’의 영어 짝을 찾아보세요.
        </p>
      </div>

      <div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">형용사 선택</div>
        <div className="flex flex-wrap gap-2">
          {ADJECTIVES.map((a, i) => (
            <button
              key={a.base}
              type="button"
              onClick={() => setAdjIdx(i)}
              className={`min-h-[44px] px-3 py-2 rounded-md text-sm border transition font-mono ${
                adjIdx === i
                  ? 'bg-purple-600 text-white border-purple-700'
                  : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 hover:border-purple-500 text-zinc-800 dark:text-zinc-200'
              }`}
            >
              {a.base}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="level" className="block text-xs text-zinc-500 dark:text-zinc-400 mb-2">
          단계: <strong>{LEVEL_LABEL[level]}</strong>
        </label>
        <input
          id="level"
          type="range"
          min={0}
          max={2}
          step={1}
          value={level}
          onChange={(e) => setLevel(Number(e.target.value) as Level)}
          className="w-full h-3 accent-purple-600"
        />
        <div className="flex justify-between text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
          <span>원급</span>
          <span>비교급</span>
          <span>최상급</span>
        </div>
      </div>

      <article className="rounded-xl bg-purple-50 dark:bg-purple-950/30 border-l-4 border-purple-500 p-5 space-y-3">
        <div className="text-xs text-purple-700 dark:text-purple-300 font-bold">
          {LEVEL_LABEL[level]} · {TEMPLATE_LABEL[level]}
        </div>
        <div className="text-3xl font-mono font-bold text-zinc-900 dark:text-zinc-100">
          {formed}
        </div>
        <div className="text-xs text-zinc-600 dark:text-zinc-400">변화 규칙: {adj.rule}</div>
        <div className="rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3">
          <div className="text-base font-mono text-zinc-900 dark:text-zinc-100">{sentence.en}</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{sentence.ko}</div>
        </div>
      </article>

      <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950/40 p-3 text-xs text-zinc-600 dark:text-zinc-400">
        💡 <strong>흔한 실수</strong>: 비교급/최상급에 <code>more</code>와 <code>-er</code>를 동시에
        쓰면 안 돼요. <code>more bigger</code> ✗ → <code>bigger</code> ○. 최상급 앞에는 거의 항상
        <code> the</code>가 붙습니다.
      </div>
    </div>
  );
}
