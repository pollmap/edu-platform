'use client';

// E-GR-07 수동태 — 능동/수동 변환기.

import { useMemo, useState } from 'react';

interface Sample {
  id: number;
  active: { subject: string; verb: string; object: string; full: string };
  passive: { subject: string; bePp: string; byAgent: string; full: string };
  tense: string;
  hint: string;
}

const SAMPLES: Sample[] = [
  {
    id: 1,
    active: {
      subject: 'The students',
      verb: 'clean',
      object: 'the classroom',
      full: 'The students clean the classroom.',
    },
    passive: {
      subject: 'The classroom',
      bePp: 'is cleaned',
      byAgent: 'by the students',
      full: 'The classroom is cleaned by the students.',
    },
    tense: '현재 단순',
    hint: 'be(현재) + 과거분사 → is/are + p.p.',
  },
  {
    id: 2,
    active: {
      subject: 'A famous chef',
      verb: 'made',
      object: 'this cake',
      full: 'A famous chef made this cake.',
    },
    passive: {
      subject: 'This cake',
      bePp: 'was made',
      byAgent: 'by a famous chef',
      full: 'This cake was made by a famous chef.',
    },
    tense: '과거 단순',
    hint: 'be(과거) + 과거분사 → was/were + p.p.',
  },
  {
    id: 3,
    active: {
      subject: 'Many people',
      verb: 'will use',
      object: 'this app',
      full: 'Many people will use this app.',
    },
    passive: {
      subject: 'This app',
      bePp: 'will be used',
      byAgent: 'by many people',
      full: 'This app will be used by many people.',
    },
    tense: '미래',
    hint: 'will + be + 과거분사',
  },
  {
    id: 4,
    active: {
      subject: 'Someone',
      verb: 'has broken',
      object: 'the window',
      full: 'Someone has broken the window.',
    },
    passive: {
      subject: 'The window',
      bePp: 'has been broken',
      byAgent: '',
      full: 'The window has been broken.',
    },
    tense: '현재 완료',
    hint: '행위자가 모르거나 중요하지 않으면 by 생략',
  },
  {
    id: 5,
    active: {
      subject: 'They',
      verb: 'are building',
      object: 'a new library',
      full: 'They are building a new library.',
    },
    passive: {
      subject: 'A new library',
      bePp: 'is being built',
      byAgent: '',
      full: 'A new library is being built.',
    },
    tense: '현재 진행',
    hint: 'be + being + 과거분사 (진행 수동)',
  },
];

type Voice = 'active' | 'passive';

export function PassiveVoiceConverter() {
  const [idx, setIdx] = useState(0);
  const [voice, setVoice] = useState<Voice>('active');

  const cur = SAMPLES[idx];

  const display = useMemo(() => {
    if (voice === 'active') {
      return {
        chunks: [
          { label: '주어 (행위자)', value: cur.active.subject, color: 'bg-blue-500' },
          { label: '동사', value: cur.active.verb, color: 'bg-purple-500' },
          { label: '목적어', value: cur.active.object, color: 'bg-amber-500' },
        ],
        full: cur.active.full,
      };
    }
    const chunks = [
      { label: '주어 (받는 쪽)', value: cur.passive.subject, color: 'bg-amber-500' },
      { label: 'be + 과거분사', value: cur.passive.bePp, color: 'bg-green-500' },
    ];
    if (cur.passive.byAgent) {
      chunks.push({ label: 'by + 행위자', value: cur.passive.byAgent, color: 'bg-blue-500' });
    }
    return { chunks, full: cur.passive.full };
  }, [voice, cur]);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-1">
          능동/수동 변환기
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          수동태는 ‘<strong>받는 쪽</strong>’이 주어가 되는 문장이에요.{' '}
          <code>주어 → 행위자 / 목적어 → 새 주어 / 동사 → be + 과거분사</code> 세 단계 변환을 슬라이더로
          확인해보세요.
        </p>
      </div>

      <div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">예문</div>
        <div className="flex flex-wrap gap-2">
          {SAMPLES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIdx(i)}
              className={`min-h-[44px] px-3 py-2 rounded-md text-xs border transition ${
                idx === i
                  ? 'bg-purple-600 text-white border-purple-700'
                  : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 hover:border-purple-500 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              {s.tense}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {(['active', 'passive'] as Voice[]).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setVoice(v)}
            aria-pressed={voice === v}
            className={`min-h-[44px] px-4 py-3 rounded-md text-sm font-bold border-2 transition ${
              voice === v
                ? 'bg-purple-600 text-white border-purple-700'
                : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:border-purple-500'
            }`}
          >
            {v === 'active' ? '능동 (Active)' : '수동 (Passive)'}
          </button>
        ))}
      </div>

      <article className="rounded-xl bg-purple-50 dark:bg-purple-950/30 border-l-4 border-purple-500 p-5 space-y-4">
        <div className="text-xs text-purple-700 dark:text-purple-300 font-bold">
          {voice === 'active' ? '능동태 구조' : '수동태 구조'} · {cur.tense}
        </div>
        <div className="space-y-2">
          {display.chunks.map((c) => (
            <div key={c.label} className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span
                className={`inline-block ${c.color} text-white text-xs font-bold rounded px-2 py-1 sm:w-40 text-center`}
              >
                {c.label}
              </span>
              <span className="font-mono text-zinc-900 dark:text-zinc-100">{c.value}</span>
            </div>
          ))}
        </div>
        <div className="rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3">
          <div className="text-base font-mono text-zinc-900 dark:text-zinc-100">{display.full}</div>
        </div>
        <div className="text-xs text-zinc-600 dark:text-zinc-400">{cur.hint}</div>
      </article>

      <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950/40 p-3 text-xs text-zinc-600 dark:text-zinc-400">
        💡 <strong>주의</strong>: 자동사(go, sleep, arrive)는 목적어가 없어서 수동태로 못 바꿔요.
        ‘<code>was gone</code>’ 같은 형태는 비표준입니다.
      </div>
    </div>
  );
}
