'use client';

// E-VOC 직무 영어 — 직무 상황별 영어 템플릿(이메일·미팅·요청).

import { useState } from 'react';

interface Template {
  id: string;
  label: string;
  scenario: string;
  template: string[];
  doDont: { do: string; dont: string };
  tone: string;
}

const TEMPLATES: Template[] = [
  {
    id: 'email-request',
    label: 'Email — Request',
    scenario: '동료·외부 파트너에게 자료·결정 요청',
    template: [
      'Subject: Request for [item] by [date]',
      'Hi [Name],',
      "I hope you're well. I'm writing to ask for [specific item].",
      'It would help us [purpose / why it matters].',
      'Could you send it by [deadline]? Let me know if you need any context.',
      'Thanks in advance,\n[Your name]',
    ],
    doDont: {
      do: 'Subject 에 마감일 명시, 본문은 5줄 이내',
      dont: '"Sorry to bother you" 같은 사과로 시작 — 약하게 들림',
    },
    tone: 'Polite + direct. Use "could you" not "you must"',
  },
  {
    id: 'email-update',
    label: 'Email — Status Update',
    scenario: '프로젝트·업무 진행 상황 공유',
    template: [
      'Subject: [Project] update — week of [date]',
      'Hi team,',
      'Quick update on [project]:',
      '• Completed: [items]',
      '• In progress: [items + ETA]',
      '• Blockers: [issues + what I need]',
      "Let me know if you'd like to discuss anything.\nBest, [Name]",
    ],
    doDont: {
      do: '불릿으로 정리, 막히는 부분(blocker) 명확히',
      dont: '"Everything is fine" — 구체성이 없으면 신뢰 잃음',
    },
    tone: 'Professional, factual. No filler words',
  },
  {
    id: 'meeting-open',
    label: 'Meeting — Opening',
    scenario: '회의를 시작하며 안건·시간 확인',
    template: [
      "Thanks everyone for joining. We have 30 minutes today.",
      "The goal is to align on [specific topic].",
      "I'll keep us on track — please jump in if I miss something.",
      "Let's start with [first agenda item].",
    ],
    doDont: {
      do: '시간·목표·진행 방식 1분 안에 명확히',
      dont: '"Let\'s see who\'s here" — 출석 체크로 시간 낭비',
    },
    tone: 'Confident host, friendly but focused',
  },
  {
    id: 'meeting-disagree',
    label: 'Meeting — Polite Disagreement',
    scenario: '의견이 다를 때 정중하게 반대',
    template: [
      'I see your point, but I think [your view].',
      'My concern is that [specific risk].',
      'Could we consider [alternative]?',
      'What do others think?',
    ],
    doDont: {
      do: '상대 의견 인정 → 내 의견 → 대안 제시',
      dont: '"You\'re wrong" — 인신공격으로 들림',
    },
    tone: 'Respectful, evidence-based',
  },
  {
    id: 'apology',
    label: 'Email — Apology',
    scenario: '실수·지연에 대한 사과',
    template: [
      'Subject: Apology — [issue]',
      'Hi [Name],',
      "I want to apologize for [specific issue]. I take responsibility for this.",
      "What happened: [brief, factual cause].",
      "What I'm doing to fix it: [concrete actions + timeline].",
      "Please let me know if there's anything else I can do.\nBest regards, [Name]",
    ],
    doDont: {
      do: '구체적 사실 + 책임 인정 + 구체적 조치',
      dont: '"It wasn\'t my fault" 식 책임 회피',
    },
    tone: 'Sincere, accountable, brief',
  },
  {
    id: 'introduction',
    label: 'Self-Introduction',
    scenario: '신입 동료·외부 미팅 첫 인사',
    template: [
      "Hi, I'm [Name], [role] at [team/company].",
      "I work on [main responsibility].",
      "I'm glad to meet you / nice to be here.",
      "I'd love to learn more about what you do.",
    ],
    doDont: {
      do: '역할 + 책임 + 만나서 반갑다 (15초 안에)',
      dont: '커리어 전체를 나열 — 첫 만남에 부담',
    },
    tone: 'Warm, concise, curious',
  },
];

export function WorkplaceEnglishTemplates() {
  const [active, setActive] = useState('email-request');
  const cur = TEMPLATES.find((t) => t.id === active)!;

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        직무 영어는 <strong>상황별 템플릿</strong>이 있으면 70% 해결돼요. 6가지 표준 패턴을 비교하세요.
      </p>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`min-h-[44px] rounded-lg border px-3 py-2 text-xs font-medium transition ${
              active === t.id
                ? 'border-purple-500 bg-purple-50 text-purple-900 dark:border-purple-400 dark:bg-purple-900/30 dark:text-purple-100'
                : 'border-zinc-300 bg-white text-zinc-700 hover:border-purple-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-1 text-base font-bold text-zinc-900 dark:text-zinc-100">{cur.label}</h3>
        <p className="text-xs text-zinc-500">상황: {cur.scenario}</p>

        <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-lg bg-zinc-50 p-3 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
{cur.template.join('\n')}
        </pre>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100">
            <p className="text-xs font-semibold">DO</p>
            <p>{cur.doDont.do}</p>
          </div>
          <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-900/30 dark:text-amber-100">
            <p className="text-xs font-semibold">DON&apos;T</p>
            <p>{cur.doDont.dont}</p>
          </div>
        </div>
        <div className="mt-2 rounded-lg bg-purple-50 p-3 text-sm text-purple-900 dark:bg-purple-900/30 dark:text-purple-100">
          <strong>Tone</strong> — {cur.tone}
        </div>
      </div>
    </div>
  );
}
