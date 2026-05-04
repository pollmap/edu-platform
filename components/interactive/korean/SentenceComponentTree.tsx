'use client';

// K-GR-04 문장 성분 — 주어·서술어·목적어·보어·관형어·부사어·독립어 시각화.

import { useState } from 'react';

type Role = '주어' | '서술어' | '목적어' | '보어' | '관형어' | '부사어' | '독립어';

interface Token {
  text: string;
  role: Role;
}

interface Sentence {
  id: string;
  label: string;
  tokens: Token[];
  note: string;
}

const SENTENCES: Sentence[] = [
  {
    id: 's1',
    label: '주어 + 서술어 (가장 단순)',
    tokens: [
      { text: '하늘이', role: '주어' },
      { text: '푸르다', role: '서술어' },
    ],
    note: '주어와 서술어만 있어도 문장이 돼요.',
  },
  {
    id: 's2',
    label: '주어 + 목적어 + 서술어',
    tokens: [
      { text: '아이가', role: '주어' },
      { text: '책을', role: '목적어' },
      { text: '읽는다', role: '서술어' },
    ],
    note: '"무엇을" 답하는 자리가 목적어예요.',
  },
  {
    id: 's3',
    label: '주어 + 보어 + 서술어',
    tokens: [
      { text: '그녀는', role: '주어' },
      { text: '의사가', role: '보어' },
      { text: '되었다', role: '서술어' },
    ],
    note: '"되다·아니다" 앞에 오는 성분이 보어예요.',
  },
  {
    id: 's4',
    label: '관형어와 부사어로 풍성하게',
    tokens: [
      { text: '작은', role: '관형어' },
      { text: '아이가', role: '주어' },
      { text: '매우', role: '부사어' },
      { text: '빠르게', role: '부사어' },
      { text: '뛴다', role: '서술어' },
    ],
    note: '관형어(명사 꾸밈) · 부사어(동사·형용사 꾸밈)는 문장을 풍성하게 만드는 곁다리예요.',
  },
  {
    id: 's5',
    label: '독립어 포함',
    tokens: [
      { text: '아', role: '독립어' },
      { text: '하늘이', role: '주어' },
      { text: '맑구나', role: '서술어' },
    ],
    note: '감탄사처럼 다른 성분과 직접 관계 없는 게 독립어.',
  },
];

const ROLE_STYLE: Record<Role, string> = {
  주어: 'bg-red-50 dark:bg-red-950/40 border-red-500 text-red-800 dark:text-red-300',
  서술어: 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-800 dark:text-amber-300',
  목적어: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-300',
  보어: 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-800 dark:text-blue-300',
  관형어: 'bg-purple-50 dark:bg-purple-950/40 border-purple-500 text-purple-800 dark:text-purple-300',
  부사어: 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-300',
  독립어: 'bg-zinc-100 dark:bg-zinc-800 border-zinc-500 text-zinc-700 dark:text-zinc-300',
};

const ROLE_GROUPS: { group: string; roles: Role[]; desc: string }[] = [
  { group: '주성분', roles: ['주어', '서술어', '목적어', '보어'], desc: '문장의 뼈대 (없으면 문장 X)' },
  { group: '부속성분', roles: ['관형어', '부사어'], desc: '꾸며 주는 곁다리' },
  { group: '독립성분', roles: ['독립어'], desc: '독립적 (감탄·부름)' },
];

export function SentenceComponentTree() {
  const [sentenceId, setSentenceId] = useState(SENTENCES[0].id);
  const [activeRole, setActiveRole] = useState<Role | null>(null);

  const sentence = SENTENCES.find((s) => s.id === sentenceId)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-1">
          문장은 7가지 성분으로 짜여 있어요
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          문장 성분 = 단어들이 문장 안에서 맡는 <strong>역할</strong>이에요. 같은 단어도 자리에 따라 역할이 달라져요.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {SENTENCES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              setSentenceId(s.id);
              setActiveRole(null);
            }}
            className={`px-2 py-3 text-xs rounded-md border min-h-[52px] text-left ${
              sentenceId === s.id
                ? 'bg-red-50 dark:bg-red-950/30 border-red-500 ring-2 ring-red-300 font-bold'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border-2 border-zinc-200 dark:border-zinc-800 p-4 space-y-3">
        <div className="flex flex-wrap gap-2 justify-center items-end">
          {sentence.tokens.map((t, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className={`px-3 py-2 rounded-md border-2 text-sm font-bold ${ROLE_STYLE[t.role]} ${activeRole === t.role ? 'ring-2 ring-offset-1 ring-red-400' : ''}`}>
                {t.text}
              </div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-400">{t.role}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 italic text-center">{sentence.note}</p>
      </div>

      <div className="space-y-2">
        {ROLE_GROUPS.map((g) => (
          <div key={g.group} className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3 space-y-2">
            <div className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              {g.group} <span className="font-normal text-zinc-500">— {g.desc}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {g.roles.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setActiveRole(activeRole === r ? null : r)}
                  className={`px-2.5 py-1 text-xs rounded border-2 ${ROLE_STYLE[r]} ${activeRole === r ? 'ring-2 ring-red-400' : ''}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950/40 p-3 text-xs text-zinc-600 dark:text-zinc-400">
        <strong>품사 vs 성분:</strong> 품사 = 단어 자체의 종류 (명사·동사…). 성분 = 문장 속 역할 (주어·서술어…). 같은 명사도 주어가 될 수도, 목적어가 될 수도 있어요.
      </div>
    </div>
  );
}
