'use client';

// H7-SO-01 개인과 사회생활 — 사회화 단계 + 사회화 기관.

import { useState } from 'react';

interface Stage {
  id: string;
  age: string;
  label: string;
  desc: string;
  examples: string[];
  color: string;
}

const STAGES: Stage[] = [
  {
    id: 'primary',
    age: '0~6세',
    label: '1차 사회화',
    desc: '말, 식습관, 기본 예절 같은 가장 기본 행동을 배우는 시기.',
    examples: ['엄마·아빠 따라 인사하기', '숟가락·젓가락 사용 익히기', '가족과 친해지기'],
    color: '#f59e0b',
  },
  {
    id: 'school',
    age: '7~18세',
    label: '2차 사회화',
    desc: '학교·친구·미디어 등에서 더 다양한 규범과 지식을 익히는 시기.',
    examples: ['학교 규칙 따르기', '친구와 협동·갈등 해결', '여러 직업·문화 알기'],
    color: '#3b82f6',
  },
  {
    id: 'adult',
    age: '성인 이후',
    label: '재사회화',
    desc: '직장·새 환경에서 새로운 규범을 다시 배우는 과정. 평생 이어져요.',
    examples: ['신입사원 교육', '이주 후 새 문화 적응', '은퇴 후 새 역할 배우기'],
    color: '#10b981',
  },
];

interface Agent {
  id: string;
  label: string;
  role: '1차' | '2차';
  desc: string;
}

const AGENTS: Agent[] = [
  { id: 'family', label: '가족', role: '1차', desc: '가장 처음·가장 깊게 영향. 기본 인성·습관.' },
  { id: 'peer', label: '또래집단', role: '1차', desc: '친구. 협동·경쟁·우정 배움.' },
  { id: 'school', label: '학교', role: '2차', desc: '체계적 교육. 지식·규칙·역할.' },
  { id: 'media', label: '대중매체', role: '2차', desc: 'TV·인터넷. 정보·가치관 빠르게 전달.' },
  { id: 'workplace', label: '직장', role: '2차', desc: '성인이 되어 새 규범 학습(재사회화).' },
];

type View = 'stage' | 'agent';

export function SocializationStagesExplorer() {
  const [view, setView] = useState<View>('stage');
  const [activeStage, setActiveStage] = useState<string>('primary');
  const [activeAgent, setActiveAgent] = useState<string>('family');

  const stage = STAGES.find((s) => s.id === activeStage)!;
  const agent = AGENTS.find((a) => a.id === activeAgent)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-1">
          사회화 — 사람은 어떻게 「사회 사람」이 될까요?
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          <strong>사회화</strong>는 한 사람이 그 사회의 말·예절·규범·역할을 익혀 가는 과정이에요. 평생 이어집니다.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        <button
          type="button"
          onClick={() => setView('stage')}
          className={`px-2 py-2 text-sm rounded-md border min-h-[44px] ${
            view === 'stage'
              ? 'border-orange-500 ring-2 ring-orange-300 font-bold bg-orange-50 dark:bg-orange-950/30'
              : 'border-zinc-200 dark:border-zinc-700'
          }`}
        >
          단계로 보기
        </button>
        <button
          type="button"
          onClick={() => setView('agent')}
          className={`px-2 py-2 text-sm rounded-md border min-h-[44px] ${
            view === 'agent'
              ? 'border-orange-500 ring-2 ring-orange-300 font-bold bg-orange-50 dark:bg-orange-950/30'
              : 'border-zinc-200 dark:border-zinc-700'
          }`}
        >
          기관으로 보기
        </button>
      </div>

      {view === 'stage' && (
        <>
          <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800 p-4">
            <div className="relative h-3 rounded-full overflow-hidden flex">
              {STAGES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveStage(s.id)}
                  className="flex-1 transition-opacity"
                  style={{
                    background: s.color,
                    opacity: activeStage === s.id ? 1 : 0.5,
                  }}
                  aria-label={`${s.label} 선택`}
                />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-1 mt-2 text-[10px] text-zinc-600 dark:text-zinc-400">
              {STAGES.map((s) => (
                <div key={s.id} className="text-center">
                  {s.age}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {STAGES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveStage(s.id)}
                className={`px-2 py-2 text-xs rounded-md border min-h-[44px] ${
                  activeStage === s.id
                    ? 'ring-2 ring-orange-300 font-bold'
                    : 'border-zinc-200 dark:border-zinc-700'
                }`}
                style={{
                  borderColor: activeStage === s.id ? s.color : undefined,
                  background: activeStage === s.id ? s.color + '22' : undefined,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div
            className="rounded-xl border-l-4 p-4 space-y-2 text-sm"
            style={{ borderColor: stage.color, background: stage.color + '11' }}
          >
            <div className="font-bold" style={{ color: stage.color }}>
              {stage.label} <span className="text-xs font-normal text-zinc-500">({stage.age})</span>
            </div>
            <p>{stage.desc}</p>
            <ul className="list-disc list-inside space-y-1 text-xs text-zinc-700 dark:text-zinc-300">
              {stage.examples.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        </>
      )}

      {view === 'agent' && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
            {AGENTS.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setActiveAgent(a.id)}
                className={`px-2 py-3 text-xs rounded-md border min-h-[44px] flex flex-col items-center ${
                  activeAgent === a.id
                    ? 'border-orange-500 ring-2 ring-orange-300 font-bold bg-orange-50 dark:bg-orange-950/30'
                    : 'border-zinc-200 dark:border-zinc-700'
                }`}
              >
                <span>{a.label}</span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">{a.role}</span>
              </button>
            ))}
          </div>

          <div className="rounded-xl border-l-4 border-orange-500 bg-orange-50/50 dark:bg-orange-950/20 p-4 space-y-1 text-sm">
            <div className="font-bold text-orange-700 dark:text-orange-400">
              {agent.label} <span className="text-xs font-normal">({agent.role}적 사회화 기관)</span>
            </div>
            <p>{agent.desc}</p>
          </div>
        </>
      )}
    </div>
  );
}
