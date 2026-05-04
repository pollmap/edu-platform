'use client';

// H-IS2-02 문화와 다양성 — 문화 비교 5축 매트릭스(Hofstede 차원 변형).

import { useState } from 'react';

interface Dimension {
  id: string;
  label: string;
  low: string;
  high: string;
  example: string;
}

const DIMENSIONS: Dimension[] = [
  {
    id: 'individual',
    label: '개인 vs 집단',
    low: '집단주의 — 가족·공동체의 결정을 우선. "우리"가 핵심.',
    high: '개인주의 — 개인의 자유와 선택을 우선. "나"가 핵심.',
    example: '동아시아 일부 사회는 집단주의 성향이 강하고, 북미·서유럽 일부는 개인주의 성향이 더 두드러진다고 비교 연구는 보고함.',
  },
  {
    id: 'power',
    label: '권력 거리',
    low: '평등 지향 — 윗사람에게 의문을 제기하기 쉬움.',
    high: '위계 강함 — 직급·연령 차이가 행동에 큰 영향.',
    example: '학교·회사에서 "선배에게 다른 의견 내기"의 난이도는 사회마다 매우 다름.',
  },
  {
    id: 'uncertainty',
    label: '불확실성 회피',
    low: '낮음 — 새 시도와 변화에 관대.',
    high: '높음 — 명확한 규칙과 매뉴얼 선호.',
    example: '같은 신기술이라도 어떤 사회는 빠르게 도입하고, 어떤 사회는 충분한 검증 후에 도입하는 경향이 강함.',
  },
  {
    id: 'time',
    label: '시간 관점',
    low: '단기 지향 — 빠른 결과·전통 유지.',
    high: '장기 지향 — 인내·미래 투자 선호.',
    example: '교육·저축·노후 준비 같은 장기 계획에 대한 사회적 압력이 문화권마다 다르게 작동.',
  },
  {
    id: 'gender',
    label: '성역할 유연성',
    low: '경직 — 직업·가사·돌봄에서 성별 역할이 뚜렷하게 구분.',
    high: '유연 — 성별과 무관한 역할 분담을 추구.',
    example: '같은 사회 안에서도 세대·지역에 따라 격차가 크고, 시간이 지나며 점차 유연한 방향으로 이동하는 흐름이 일반적.',
  },
];

export function CultureComparisonMatrix() {
  const [values, setValues] = useState<Record<string, number>>({
    individual: 50,
    power: 50,
    uncertainty: 50,
    time: 50,
    gender: 50,
  });
  const [active, setActive] = useState('individual');
  const cur = DIMENSIONS.find((d) => d.id === active)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-1">문화 비교 5축</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          문화는 우열이 아니라 <strong>축의 차이</strong>예요. 5가지 축에서 어디 쯤에 위치하는지를 보면 차이가 보여요.
        </p>
      </div>

      <div className="space-y-3">
        {DIMENSIONS.map((d) => (
          <div key={d.id} className="rounded-md border border-zinc-200 dark:border-zinc-700 p-3 space-y-1.5">
            <button
              type="button"
              onClick={() => setActive(d.id)}
              className={`w-full text-left text-xs ${
                active === d.id ? 'font-bold text-orange-700 dark:text-orange-400' : 'text-zinc-700 dark:text-zinc-300'
              }`}
            >
              {d.label}
            </button>
            <input
              type="range"
              min={0}
              max={100}
              value={values[d.id]}
              onChange={(e) => setValues({ ...values, [d.id]: Number(e.target.value) })}
              className="w-full h-2 accent-orange-500"
              aria-label={d.label}
            />
            <div className="flex justify-between text-[10px] text-zinc-500 dark:text-zinc-400">
              <span>← 0</span>
              <span>100 →</span>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-500 p-4 space-y-2">
        <div className="text-sm font-bold text-orange-800 dark:text-orange-300">{cur.label}</div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-md bg-white dark:bg-zinc-900 px-3 py-2">
            <div className="text-zinc-500 dark:text-zinc-400 mb-0.5">한쪽 끝 (낮음)</div>
            <div>{cur.low}</div>
          </div>
          <div className="rounded-md bg-white dark:bg-zinc-900 px-3 py-2">
            <div className="text-zinc-500 dark:text-zinc-400 mb-0.5">반대쪽 끝 (높음)</div>
            <div>{cur.high}</div>
          </div>
        </div>
        <div className="rounded-md bg-yellow-50 dark:bg-yellow-950/20 px-3 py-2 text-xs text-yellow-800 dark:text-yellow-200">
          🌍 <strong>관찰</strong> — {cur.example}
        </div>
      </div>

      <div className="rounded-md bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-600 dark:text-zinc-400">
        🎯 다른 문화권을 만났을 때 "이상하다"가 아니라 "이 축에서 다른 위치에 있구나"로 보는 것이 문화 상대주의의 시작이에요.
      </div>
    </div>
  );
}
