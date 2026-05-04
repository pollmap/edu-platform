'use client';

// E-GR-06 to부정사·동명사·분사 — 같은 동사를 4 형태로 변환.

import { useMemo, useState } from 'react';

type Form = 'base' | 'to-inf' | 'gerund' | 'present-participle' | 'past-participle';

interface VerbItem {
  base: string;
  pastParticiple: string;
}

const VERBS: VerbItem[] = [
  { base: 'play', pastParticiple: 'played' },
  { base: 'eat', pastParticiple: 'eaten' },
  { base: 'write', pastParticiple: 'written' },
  { base: 'study', pastParticiple: 'studied' },
  { base: 'run', pastParticiple: 'run' },
];

const FORM_LABEL: Record<Form, string> = {
  base: '동사 원형',
  'to-inf': 'to부정사 (to + 동사)',
  gerund: '동명사 (동사 + ing)',
  'present-participle': '현재분사 (-ing, 진행)',
  'past-participle': '과거분사 (완료·수동)',
};

const FORM_ROLE: Record<Form, string> = {
  base: '명령문, 조동사 뒤. 동사 그 자체.',
  'to-inf': '미래·목적·계획 의미. 명사·형용사·부사 역할.',
  gerund: '명사 역할. 주어·목적어·전치사 뒤에 사용.',
  'present-participle': 'be + ~ing = 진행 / 형용사처럼 명사 수식.',
  'past-participle': 'have + p.p. = 완료 / be + p.p. = 수동 / 형용사 역할.',
};

const EXAMPLE_TEMPLATE: Record<Form, (verb: VerbItem) => { text: string; jp: string }> = {
  base: (v) => ({ text: `Just ${v.base}!`, jp: `그냥 ${v.base}해!` }),
  'to-inf': (v) => ({
    text: `I want to ${v.base}.`,
    jp: `나는 ${v.base}하고 싶다.`,
  }),
  gerund: (v) => ({
    text: `${v.base.charAt(0).toUpperCase()}${ingForm(v.base).slice(1)} is fun.`,
    jp: `${v.base}하는 것은 재미있다.`,
  }),
  'present-participle': (v) => ({
    text: `I am ${ingForm(v.base)} now.`,
    jp: `나는 지금 ${v.base}하고 있다.`,
  }),
  'past-participle': (v) => ({
    text: `I have ${v.pastParticiple} before.`,
    jp: `나는 전에 ${v.base}한 적이 있다.`,
  }),
};

function ingForm(base: string): string {
  if (base.endsWith('e') && base.length > 2 && !base.endsWith('ee')) {
    return base.slice(0, -1) + 'ing';
  }
  if (base === 'run') return 'running';
  return base + 'ing';
}

function toInfForm(base: string): string {
  return `to ${base}`;
}

function gerundForm(base: string): string {
  return ingForm(base);
}

function presentParticipleForm(base: string): string {
  return ingForm(base);
}

const FORMS: Form[] = ['base', 'to-inf', 'gerund', 'present-participle', 'past-participle'];

export function VerbalFormSimulator() {
  const [verbIdx, setVerbIdx] = useState(0);
  const [form, setForm] = useState<Form>('to-inf');

  const verb = VERBS[verbIdx];

  const formed = useMemo(() => {
    switch (form) {
      case 'base':
        return verb.base;
      case 'to-inf':
        return toInfForm(verb.base);
      case 'gerund':
        return gerundForm(verb.base);
      case 'present-participle':
        return presentParticipleForm(verb.base);
      case 'past-participle':
        return verb.pastParticiple;
    }
  }, [form, verb]);

  const example = EXAMPLE_TEMPLATE[form](verb);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-1">
          준동사 형태 변환 시뮬
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          한 동사가 옷을 갈아입어요. 같은 의미가 <strong>to부정사</strong>·<strong>동명사</strong>·
          <strong>분사</strong>로 변신하면서 문장 안에서 다른 역할을 합니다.
        </p>
      </div>

      <div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">동사 선택</div>
        <div className="flex flex-wrap gap-2">
          {VERBS.map((v, i) => (
            <button
              key={v.base}
              type="button"
              onClick={() => setVerbIdx(i)}
              className={`min-h-[44px] px-3 py-2 rounded-md text-sm border transition font-mono ${
                verbIdx === i
                  ? 'bg-purple-600 text-white border-purple-700'
                  : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 hover:border-purple-500 text-zinc-800 dark:text-zinc-200'
              }`}
            >
              {v.base}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">형태 선택</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {FORMS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setForm(f)}
              aria-pressed={form === f}
              className={`min-h-[44px] px-3 py-2 rounded-md text-xs sm:text-sm border transition text-left ${
                form === f
                  ? 'bg-purple-100 dark:bg-purple-950/40 border-purple-500 text-purple-800 dark:text-purple-200'
                  : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 hover:border-purple-500 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              {FORM_LABEL[f]}
            </button>
          ))}
        </div>
      </div>

      <article className="rounded-xl bg-purple-50 dark:bg-purple-950/30 border-l-4 border-purple-500 p-5 space-y-3">
        <div className="text-xs text-purple-700 dark:text-purple-300 font-bold">
          {FORM_LABEL[form]}
        </div>
        <div className="text-3xl font-mono font-bold text-zinc-900 dark:text-zinc-100">
          {formed}
        </div>
        <div className="text-sm text-zinc-700 dark:text-zinc-300">{FORM_ROLE[form]}</div>
        <div className="rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3">
          <div className="text-base font-mono text-zinc-900 dark:text-zinc-100">{example.text}</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{example.jp}</div>
        </div>
      </article>

      <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950/40 p-3 text-xs text-zinc-600 dark:text-zinc-400">
        💡 <strong>구분 팁</strong>: <code>-ing</code> 형태가{' '}
        <strong>be 뒤</strong>에 오면 진행, <strong>주어·목적어 자리</strong>에 오면 동명사,
        <strong> 명사 앞</strong>에 오면 형용사처럼 꾸미는 분사예요. 자리를 보면 정체가 보입니다.
      </div>
    </div>
  );
}
