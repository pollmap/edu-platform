'use client';

// H-IS2-01 사회정의·불평등 — 지니계수와 정의론 비교.

import { useState, useMemo } from 'react';

interface JusticeView {
  id: string;
  label: string;
  thinker: string;
  core: string;
  metric: string;
  critique: string;
}

const VIEWS: JusticeView[] = [
  {
    id: 'utilitarian',
    label: '공리주의',
    thinker: '벤담·밀',
    core: '사회 전체 효용(행복)의 합을 최대화하는 분배가 정의.',
    metric: '평균 행복 수준, 총 효용.',
    critique: '소수의 큰 희생으로 다수가 이익을 보는 결과를 정당화할 수 있다는 비판.',
  },
  {
    id: 'libertarian',
    label: '자유주의(자유지상)',
    thinker: '노직 등',
    core: '정당한 절차로 얻은 소유는 침해할 수 없음. 최소 국가가 핵심.',
    metric: '재산권 보장, 자발적 거래의 자유.',
    critique: '출발선의 불평등을 그대로 두면 결과의 격차가 누적된다는 비판.',
  },
  {
    id: 'egalitarian',
    label: '평등주의(롤스의 정의론)',
    thinker: '롤스',
    core: '사회의 가장 약한 사람에게 가장 큰 이익이 갈 때만 불평등이 정당화됨(차등의 원칙).',
    metric: '최소 수혜자의 처지, 기회 균등.',
    critique: '재분배 강도와 인센티브 사이의 균형을 어디서 잡을지 어렵다는 비판.',
  },
  {
    id: 'capability',
    label: '역량 접근',
    thinker: '센·누스바움',
    core: '소득보다는 사람이 실제로 "할 수 있고 될 수 있는" 능력의 격차가 핵심.',
    metric: '교육·건강·정치 참여 등 다차원 지표.',
    critique: '핵심 역량 목록을 누가 어떻게 정할지 합의가 어렵다는 점.',
  },
];

const SCENARIOS = [
  { id: 'eq', label: '거의 평등', dist: [20, 20, 20, 20, 20], gini: 0.0 },
  { id: 'mod', label: '중간 격차', dist: [10, 15, 20, 25, 30], gini: 0.2 },
  { id: 'high', label: '큰 격차', dist: [5, 10, 15, 25, 45], gini: 0.4 },
  { id: 'extreme', label: '매우 큰 격차', dist: [3, 7, 10, 20, 60], gini: 0.57 },
];

export function GiniCoefficientExplorer() {
  const [scenarioId, setScenarioId] = useState('mod');
  const [viewId, setViewId] = useState('utilitarian');
  const scenario = SCENARIOS.find((s) => s.id === scenarioId)!;
  const view = VIEWS.find((v) => v.id === viewId)!;

  const lorenz = useMemo(() => {
    const sorted = [...scenario.dist].sort((a, b) => a - b);
    const total = sorted.reduce((a, b) => a + b, 0);
    let cum = 0;
    return [0, ...sorted.map((s) => ((cum += s) / total) * 100)];
  }, [scenario]);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-1">지니계수 × 정의론</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          불평등 지표(<strong>지니계수</strong>)와 정의를 보는 4가지 시각을 함께 비교해 보세요.
        </p>
      </div>

      <div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">분배 시나리오</div>
        <div className="grid grid-cols-4 gap-1.5">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setScenarioId(s.id)}
              className={`px-1 py-2 text-[11px] rounded-md border min-h-[60px] ${
                scenarioId === s.id
                  ? 'bg-orange-50 dark:bg-orange-950/30 border-orange-500 ring-2 ring-orange-300 font-bold'
                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
              }`}
            >
              <div className="leading-tight">{s.label}</div>
              <div className="mt-0.5 font-mono text-[10px]">G={s.gini.toFixed(2)}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-500 p-4 space-y-2">
        <div className="text-sm font-semibold">로렌츠 곡선 (5분위 누적)</div>
        <svg viewBox="0 0 200 200" className="w-full h-48 bg-white dark:bg-zinc-900 rounded-md">
          <line x1="0" y1="200" x2="200" y2="0" stroke="#a3a3a3" strokeDasharray="4 4" />
          <polyline
            points={lorenz.map((v, i) => `${(i / (lorenz.length - 1)) * 200},${200 - (v / 100) * 200}`).join(' ')}
            fill="none"
            stroke="#ea580c"
            strokeWidth="3"
          />
          <text x="100" y="195" textAnchor="middle" fontSize="10" fill="#737373">인구 누적 비율 (저소득→고소득)</text>
        </svg>
        <div className="text-xs text-zinc-600 dark:text-zinc-400">
          점선(완전 평등)에서 곡선이 멀어질수록 지니계수가 커지고, 불평등이 심하다는 뜻이에요. 일반적으로 G≥0.4면 격차가 큰 사회로 분류돼요.
        </div>
      </div>

      <div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">정의를 보는 시각</div>
        <div className="grid grid-cols-2 gap-1.5">
          {VIEWS.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setViewId(v.id)}
              className={`px-2 py-2 text-xs rounded-md border min-h-[44px] ${
                viewId === v.id
                  ? 'bg-orange-50 dark:bg-orange-950/30 border-orange-500 ring-2 ring-orange-300 font-bold'
                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-500 p-4 space-y-2">
        <div className="text-sm font-bold text-orange-800 dark:text-orange-300">
          {view.label} <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400">— {view.thinker}</span>
        </div>
        <div className="text-sm text-zinc-700 dark:text-zinc-300">{view.core}</div>
        <div className="rounded-md bg-white dark:bg-zinc-900 px-3 py-2 text-xs">
          📏 <strong>주된 평가 지표</strong> — {view.metric}
        </div>
        <div className="rounded-md bg-yellow-50 dark:bg-yellow-950/20 px-3 py-2 text-xs text-yellow-800 dark:text-yellow-200">
          🤔 <strong>주된 비판</strong> — {view.critique}
        </div>
      </div>

      <div className="rounded-md bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-600 dark:text-zinc-400">
        🎯 어떤 시각을 택하느냐에 따라 같은 지니계수도 "수용 가능"과 "교정 대상"으로 평가가 달라져요. 정답은 하나가 아닙니다.
      </div>
    </div>
  );
}
