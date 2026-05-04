'use client';

// H-IS1-02 행복과 인간 — 행복의 결정요인 가중치 시뮬레이터.

import { useState } from 'react';

interface Factor {
  id: string;
  label: string;
  emoji: string;
  desc: string;
  evidence: string;
}

const FACTORS: Factor[] = [
  {
    id: 'income',
    label: '소득·물질',
    emoji: '💰',
    desc: '기본적인 의식주가 충족되는 수준까지는 행복에 큰 영향. 그 이상으로는 효과가 둔화된다는 연구가 다수.',
    evidence: '이스털린의 역설 — 일정 소득 이상에서는 GDP 증가가 행복 증가로 잘 이어지지 않음.',
  },
  {
    id: 'relation',
    label: '인간 관계',
    emoji: '👥',
    desc: '가족·친구·동료와의 안정적 관계는 행복의 가장 강력한 예측 변수 중 하나로 일관되게 보고됨.',
    evidence: '하버드대 80년 종단 연구 — 좋은 관계가 신체 건강·장수·만족도와 강하게 연관됨.',
  },
  {
    id: 'health',
    label: '건강',
    emoji: '🏃',
    desc: '신체적 건강과 정신적 건강이 모두 영향. 만성 통증·우울은 행복의 가장 큰 감소 요인 중 하나.',
    evidence: 'WHO World Happiness Report — 건강 기대수명이 국가 행복 지수의 주요 지표 중 하나.',
  },
  {
    id: 'autonomy',
    label: '자율성',
    emoji: '🎨',
    desc: '내가 내 삶의 결정을 통제하고 있다는 느낌. 일·시간·관계에서 선택권이 클수록 행복도 상승.',
    evidence: '자기결정 이론 — 자율성·유능성·관계성 3가지가 인간의 핵심 심리 욕구.',
  },
  {
    id: 'meaning',
    label: '의미·목적',
    emoji: '🎯',
    desc: '"내 삶이 어딘가로 향하고 있다"는 감각. 단기 쾌락(hedonic)과는 다른 차원의 지속적 만족.',
    evidence: '에우다이모니아(eudaimonic well-being) 연구 — 의미를 느끼는 사람은 스트레스 회복도 빠름.',
  },
  {
    id: 'social',
    label: '사회 신뢰·제도',
    emoji: '🏛️',
    desc: '"이 사회에서 노력하면 보상받을 것"이라는 신뢰. 부패가 적고 공정성이 높을수록 행복도 상승.',
    evidence: '국가 간 비교에서 부패 인식·사회 신뢰 지수가 행복 지수와 강한 상관관계.',
  },
];

export function HappinessFactorsExplorer() {
  const [weights, setWeights] = useState<Record<string, number>>({
    income: 30,
    relation: 25,
    health: 20,
    autonomy: 10,
    meaning: 10,
    social: 5,
  });
  const [active, setActive] = useState('income');

  const total = Object.values(weights).reduce((a, b) => a + b, 0);
  const cur = FACTORS.find((f) => f.id === active)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-1">행복의 결정요인 가중치</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          각 요인이 내 행복에 얼마나 영향을 준다고 생각하는지 비율로 조정해 보고, 연구 결과와 비교해 보세요.
        </p>
      </div>

      <div className="space-y-2">
        {FACTORS.map((f) => (
          <div key={f.id} className="rounded-md border border-zinc-200 dark:border-zinc-700 p-3 space-y-1.5">
            <button
              type="button"
              onClick={() => setActive(f.id)}
              className={`w-full text-left flex items-center justify-between text-xs ${
                active === f.id ? 'font-bold text-orange-700 dark:text-orange-400' : 'text-zinc-700 dark:text-zinc-300'
              }`}
            >
              <span>
                {f.emoji} {f.label}
              </span>
              <span className="font-mono">{weights[f.id]}%</span>
            </button>
            <input
              type="range"
              min={0}
              max={100}
              value={weights[f.id]}
              onChange={(e) => setWeights({ ...weights, [f.id]: Number(e.target.value) })}
              className="w-full h-2 accent-orange-500"
              aria-label={`${f.label} 가중치`}
            />
          </div>
        ))}
      </div>

      <div className="rounded-md bg-orange-50 dark:bg-orange-950/30 px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300">
        합계: <strong>{total}%</strong> {total !== 100 && <span className="text-orange-600 dark:text-orange-400">— 100%로 맞춰 보세요</span>}
      </div>

      <div className="rounded-xl bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-500 p-4 space-y-2">
        <div className="text-sm font-semibold text-orange-800 dark:text-orange-300">
          {cur.emoji} {cur.label}
        </div>
        <div className="text-sm text-zinc-700 dark:text-zinc-300">{cur.desc}</div>
        <div className="rounded-md bg-white dark:bg-zinc-900 px-3 py-2 text-xs text-zinc-600 dark:text-zinc-400">
          🔬 <strong>연구 단서</strong> — {cur.evidence}
        </div>
      </div>

      <div className="rounded-md bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-600 dark:text-zinc-400">
        🎯 다수 연구는 "관계 + 건강 + 의미"가 장기적 행복의 가장 큰 축이라 보고함. 소득은 일정 수준까지만 강한 영향.
      </div>
    </div>
  );
}
