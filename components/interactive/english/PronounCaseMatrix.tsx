'use client';

// E-GR-02 인칭대명사·소유격 — 격 매트릭스 + 빈칸 채우기.

import { useState } from 'react';

type Person = '1sg' | '2sg' | '3sg-m' | '3sg-f' | '3sg-n' | '1pl' | '2pl' | '3pl';
type Case = 'subject' | 'object' | 'possessive-adj' | 'possessive-pron' | 'reflexive';

interface Cell {
  value: string;
  example: string;
}

const ROW_LABEL: Record<Person, string> = {
  '1sg': '나 (I)',
  '2sg': '너 (you)',
  '3sg-m': '그 (he)',
  '3sg-f': '그녀 (she)',
  '3sg-n': '그것 (it)',
  '1pl': '우리 (we)',
  '2pl': '너희 (you)',
  '3pl': '그들 (they)',
};

const COL_LABEL: Record<Case, string> = {
  subject: '주격 (~은/는)',
  object: '목적격 (~을/를)',
  'possessive-adj': '소유격 (~의 +명사)',
  'possessive-pron': '소유대명사 (~의 것)',
  reflexive: '재귀 (~자신)',
};

const MATRIX: Record<Person, Record<Case, Cell>> = {
  '1sg': {
    subject: { value: 'I', example: 'I run.' },
    object: { value: 'me', example: 'Help me.' },
    'possessive-adj': { value: 'my', example: 'my book' },
    'possessive-pron': { value: 'mine', example: 'It is mine.' },
    reflexive: { value: 'myself', example: 'I made it myself.' },
  },
  '2sg': {
    subject: { value: 'you', example: 'You run.' },
    object: { value: 'you', example: 'I see you.' },
    'possessive-adj': { value: 'your', example: 'your bag' },
    'possessive-pron': { value: 'yours', example: 'It is yours.' },
    reflexive: { value: 'yourself', example: 'Help yourself.' },
  },
  '3sg-m': {
    subject: { value: 'he', example: 'He runs.' },
    object: { value: 'him', example: 'I called him.' },
    'possessive-adj': { value: 'his', example: 'his car' },
    'possessive-pron': { value: 'his', example: 'It is his.' },
    reflexive: { value: 'himself', example: 'He cooks himself.' },
  },
  '3sg-f': {
    subject: { value: 'she', example: 'She runs.' },
    object: { value: 'her', example: 'I called her.' },
    'possessive-adj': { value: 'her', example: 'her phone' },
    'possessive-pron': { value: 'hers', example: 'It is hers.' },
    reflexive: { value: 'herself', example: 'She drew herself.' },
  },
  '3sg-n': {
    subject: { value: 'it', example: 'It runs.' },
    object: { value: 'it', example: 'I have it.' },
    'possessive-adj': { value: 'its', example: 'its tail' },
    'possessive-pron': { value: '—', example: '소유대명사 형태 없음' },
    reflexive: { value: 'itself', example: 'The door closed itself.' },
  },
  '1pl': {
    subject: { value: 'we', example: 'We run.' },
    object: { value: 'us', example: 'Help us.' },
    'possessive-adj': { value: 'our', example: 'our team' },
    'possessive-pron': { value: 'ours', example: 'It is ours.' },
    reflexive: { value: 'ourselves', example: 'We solved it ourselves.' },
  },
  '2pl': {
    subject: { value: 'you', example: 'You all run.' },
    object: { value: 'you', example: 'I see you all.' },
    'possessive-adj': { value: 'your', example: 'your seats' },
    'possessive-pron': { value: 'yours', example: 'They are yours.' },
    reflexive: { value: 'yourselves', example: 'Enjoy yourselves.' },
  },
  '3pl': {
    subject: { value: 'they', example: 'They run.' },
    object: { value: 'them', example: 'I called them.' },
    'possessive-adj': { value: 'their', example: 'their house' },
    'possessive-pron': { value: 'theirs', example: 'It is theirs.' },
    reflexive: { value: 'themselves', example: 'They cleaned themselves.' },
  },
};

const PERSONS: Person[] = ['1sg', '2sg', '3sg-m', '3sg-f', '3sg-n', '1pl', '2pl', '3pl'];
const CASES: Case[] = ['subject', 'object', 'possessive-adj', 'possessive-pron', 'reflexive'];

export function PronounCaseMatrix() {
  const [sel, setSel] = useState<{ person: Person; cas: Case }>({
    person: '1sg',
    cas: 'subject',
  });

  const cell = MATRIX[sel.person][sel.cas];

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
      <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-1">
        인칭대명사 격 매트릭스
      </h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">
        한국어 ‘나/내/나를/나의 것/내 자신’이 영어에서는 형태가 다 달라요. 행(인칭) × 열(격)의 한 칸을
        눌러보세요.
      </p>

      <div className="overflow-x-auto mb-5">
        <table className="w-full border-collapse min-w-[560px] text-xs sm:text-sm">
          <thead>
            <tr>
              <th className="p-2"></th>
              {CASES.map((c) => (
                <th
                  key={c}
                  className="text-zinc-600 dark:text-zinc-300 font-semibold p-2 border-b border-zinc-200 dark:border-zinc-800 text-left"
                >
                  {COL_LABEL[c]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERSONS.map((p) => (
              <tr key={p}>
                <th className="text-zinc-600 dark:text-zinc-300 text-left p-2 whitespace-nowrap font-semibold">
                  {ROW_LABEL[p]}
                </th>
                {CASES.map((c) => {
                  const isSel = sel.person === p && sel.cas === c;
                  return (
                    <td key={c} className="p-1">
                      <button
                        type="button"
                        onClick={() => setSel({ person: p, cas: c })}
                        aria-pressed={isSel}
                        className={`w-full min-h-[44px] px-2 py-1 rounded-md border font-mono transition ${
                          isSel
                            ? 'bg-purple-600 text-white border-purple-700'
                            : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 hover:border-purple-500 text-zinc-800 dark:text-zinc-200'
                        }`}
                      >
                        {MATRIX[p][c].value}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <article className="rounded-xl bg-purple-50 dark:bg-purple-950/30 border-l-4 border-purple-500 p-5 space-y-2">
        <div className="text-xs text-purple-700 dark:text-purple-300 font-bold">
          {ROW_LABEL[sel.person]} · {COL_LABEL[sel.cas]}
        </div>
        <div className="text-3xl font-mono font-bold text-zinc-900 dark:text-zinc-100">
          {cell.value}
        </div>
        <div className="text-sm text-zinc-700 dark:text-zinc-300 font-mono">예문: {cell.example}</div>
      </article>

      <div className="mt-4 rounded-lg bg-zinc-50 dark:bg-zinc-950/40 p-3 text-xs text-zinc-600 dark:text-zinc-400">
        💡 <strong>흔한 실수</strong>: <code>its</code>(그것의) ≠ <code>it&apos;s</code>(it is의 줄임).
        <code>your</code>(너의) ≠ <code>you&apos;re</code>(you are의 줄임). 시험에 매년 나옵니다.
      </div>
    </div>
  );
}
