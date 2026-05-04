'use client';

// H-IS1-01 통합적 관점 — 시간·공간·사회·윤리 4관점 비교.

import { useState } from 'react';

interface Issue {
  id: string;
  label: string;
  emoji: string;
  perspectives: {
    time: string;
    space: string;
    social: string;
    ethical: string;
  };
}

const ISSUES: Issue[] = [
  {
    id: 'energy',
    label: '에너지 전환',
    emoji: '⚡',
    perspectives: {
      time: '산업혁명 이후 화석연료 200년 → 기후 위기로 재생에너지 전환이 본격화 → 100년 단위의 흐름 속에서 현재가 어디 위치하는지를 봄.',
      space: '북유럽은 풍력·태양광 비중이 높고, 산유국은 화석연료 의존이 강함. 같은 정책도 지역 자원 조건에 따라 효과가 달라짐.',
      social: '발전소 인근 주민·전기 요금을 내는 가계·기업·산업 종사자 등 각 집단의 이해관계가 어떻게 부딪히는지 살핌.',
      ethical: '미래 세대에 어떤 환경을 남길 것인가, 비용 부담을 누가 더 질 것인가 같은 가치 판단의 문제.',
    },
  },
  {
    id: 'aging',
    label: '저출산·고령화',
    emoji: '👵',
    perspectives: {
      time: '20세기 후반 베이비붐 → 2000년대 출산율 급락 → 2020년대 인구 감소. 인구 구조 변화는 한 세대(30년) 단위로 큰 흐름이 움직임.',
      space: '도시는 출산율이 더 낮고, 농촌은 고령화가 더 빠름. 수도권 집중 vs 지방 소멸의 공간 분포 문제로 연결됨.',
      social: '청년·중장년·노년의 부양 부담, 의료·연금·노동시장 등 각 영역에서 구조적 변화가 동시에 발생.',
      ethical: '아이를 낳을지 말지는 개인의 선택이지만, 그 결과를 사회 전체가 함께 감당해야 한다는 균형의 문제.',
    },
  },
  {
    id: 'ai',
    label: 'AI와 일자리',
    emoji: '🤖',
    perspectives: {
      time: '18세기 기계화 → 20세기 자동화 → 21세기 AI. 매번 사라지는 일자리와 새로 생기는 일자리가 함께 있었던 흐름의 연장.',
      space: '선진국은 AI 도입이 빠르고 신산업이 생기지만, 개발도상국 노동집약 산업은 더 큰 충격을 받을 수 있음.',
      social: '단순 반복 일자리·고숙련 일자리·창의적 일자리에 미치는 영향이 다름. 같은 기술이라도 직군마다 결과가 달라짐.',
      ethical: '효율과 인간 존엄 사이 균형, AI의 의사결정에 대한 책임 소재, 데이터 학습의 동의 같은 새로운 가치 판단 영역.',
    },
  },
];

const PERSPECTIVES = [
  { key: 'time', label: '시간 관점', emoji: '⏳', desc: '과거→현재→미래의 흐름 속 위치' },
  { key: 'space', label: '공간 관점', emoji: '🌍', desc: '지역·환경·자원의 차이' },
  { key: 'social', label: '사회 관점', emoji: '🤝', desc: '집단·계층·이해관계의 맞물림' },
  { key: 'ethical', label: '윤리 관점', emoji: '⚖️', desc: '가치 판단·책임·정의' },
] as const;

export function MultiPerspectiveAnalyzer() {
  const [issueId, setIssueId] = useState('energy');
  const [perspKey, setPerspKey] = useState<'time' | 'space' | 'social' | 'ethical'>('time');
  const issue = ISSUES.find((i) => i.id === issueId)!;
  const persp = PERSPECTIVES.find((p) => p.key === perspKey)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-1">통합적 관점 4축</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          하나의 사회 현상을 <strong>시간·공간·사회·윤리</strong> 4관점으로 동시에 보면, 한쪽 시각만으로 놓치는 부분이 보여요.
        </p>
      </div>

      <div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">분석할 주제</div>
        <div className="grid grid-cols-3 gap-2">
          {ISSUES.map((i) => (
            <button
              key={i.id}
              type="button"
              onClick={() => setIssueId(i.id)}
              className={`px-2 py-3 text-xs rounded-md border min-h-[60px] ${
                issueId === i.id
                  ? 'bg-orange-50 dark:bg-orange-950/30 border-orange-500 ring-2 ring-orange-300 font-bold'
                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
              }`}
            >
              <div className="text-2xl">{i.emoji}</div>
              <div className="mt-1">{i.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">관점</div>
        <div className="grid grid-cols-4 gap-1.5">
          {PERSPECTIVES.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setPerspKey(p.key)}
              className={`px-1 py-2 text-[11px] rounded-md border min-h-[60px] ${
                perspKey === p.key
                  ? 'bg-orange-50 dark:bg-orange-950/30 border-orange-500 ring-2 ring-orange-300 font-bold'
                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
              }`}
            >
              <div className="text-lg">{p.emoji}</div>
              <div className="mt-0.5 leading-tight">{p.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-500 p-4 space-y-2">
        <div className="text-sm font-semibold text-orange-800 dark:text-orange-300">
          {issue.emoji} {issue.label} × {persp.emoji} {persp.label}
        </div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">{persp.desc}</div>
        <div className="rounded-md bg-white dark:bg-zinc-900 p-3 text-sm text-zinc-700 dark:text-zinc-300">
          {issue.perspectives[perspKey]}
        </div>
      </div>

      <div className="rounded-md bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-600 dark:text-zinc-400">
        🎯 4관점을 모두 거치고 나면, 처음 떠올린 단편적 결론이 좀 더 두께를 갖게 돼요.
      </div>
    </div>
  );
}
