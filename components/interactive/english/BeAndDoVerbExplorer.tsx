'use client';

// E-GR-03 be동사 / 일반동사 — 인칭·시제별 활용 매트릭스 + 빈칸 채우기.

import { useMemo, useState } from 'react';

type Tab = 'matrix' | 'quiz';
type VerbKind = 'be' | 'do';
type Person = '1sg' | '2sg' | '3sg' | '1pl' | '3pl';
type Tense = 'present' | 'past';

interface Cell {
  value: string;
  example: string;
}

const SUBJECT_LABEL: Record<Person, string> = {
  '1sg': 'I',
  '2sg': 'you',
  '3sg': 'he / she / it',
  '1pl': 'we',
  '3pl': 'they',
};

const BE_MATRIX: Record<Person, Record<Tense, Cell>> = {
  '1sg': {
    present: { value: 'am', example: 'I am ready.' },
    past: { value: 'was', example: 'I was here yesterday.' },
  },
  '2sg': {
    present: { value: 'are', example: 'You are kind.' },
    past: { value: 'were', example: 'You were tired.' },
  },
  '3sg': {
    present: { value: 'is', example: 'She is a student.' },
    past: { value: 'was', example: 'He was happy.' },
  },
  '1pl': {
    present: { value: 'are', example: 'We are friends.' },
    past: { value: 'were', example: 'We were busy.' },
  },
  '3pl': {
    present: { value: 'are', example: 'They are at home.' },
    past: { value: 'were', example: 'They were quiet.' },
  },
};

const DO_MATRIX: Record<Person, Record<Tense, Cell>> = {
  '1sg': {
    present: { value: 'play', example: 'I play soccer.' },
    past: { value: 'played', example: 'I played soccer.' },
  },
  '2sg': {
    present: { value: 'play', example: 'You play soccer.' },
    past: { value: 'played', example: 'You played soccer.' },
  },
  '3sg': {
    present: { value: 'plays', example: 'She plays soccer.' },
    past: { value: 'played', example: 'She played soccer.' },
  },
  '1pl': {
    present: { value: 'play', example: 'We play soccer.' },
    past: { value: 'played', example: 'We played soccer.' },
  },
  '3pl': {
    present: { value: 'play', example: 'They play soccer.' },
    past: { value: 'played', example: 'They played soccer.' },
  },
};

const PERSONS: Person[] = ['1sg', '2sg', '3sg', '1pl', '3pl'];
const TENSES: Tense[] = ['present', 'past'];

interface Question {
  id: number;
  before: string;
  blank: string;
  after: string;
  options: string[];
  answer: string;
  reason: string;
}

const QUIZ: Question[] = [
  {
    id: 1,
    before: 'She ',
    blank: '___',
    after: ' a teacher.',
    options: ['am', 'is', 'are', 'be'],
    answer: 'is',
    reason: '주어가 3인칭 단수(she) + 현재 → is',
  },
  {
    id: 2,
    before: 'They ',
    blank: '___',
    after: ' at the park yesterday.',
    options: ['is', 'was', 'were', 'are'],
    answer: 'were',
    reason: '주어가 복수(they) + 과거 → were',
  },
  {
    id: 3,
    before: 'My brother ',
    blank: '___',
    after: ' breakfast every morning.',
    options: ['eat', 'eats', 'is eat', 'are eat'],
    answer: 'eats',
    reason: '3인칭 단수 현재 → 동사 + s',
  },
  {
    id: 4,
    before: 'We ',
    blank: '___',
    after: ' to school by bus.',
    options: ['go', 'goes', 'is go', 'are go'],
    answer: 'go',
    reason: '주어가 복수(we) → 동사 원형',
  },
  {
    id: 5,
    before: 'He ',
    blank: '___',
    after: " a book yesterday.",
    options: ['read', 'reads', 'readed', 'is read'],
    answer: 'read',
    reason: 'read는 불규칙 동사. 과거형도 read (발음만 [red])',
  },
  {
    id: 6,
    before: 'I ',
    blank: '___',
    after: ' not late today.',
    options: ['am', 'is', 'are', 'be'],
    answer: 'am',
    reason: '주어가 I + 현재 → am',
  },
];

export function BeAndDoVerbExplorer() {
  const [tab, setTab] = useState<Tab>('matrix');
  const [kind, setKind] = useState<VerbKind>('be');
  const [sel, setSel] = useState<{ person: Person; tense: Tense }>({
    person: '1sg',
    tense: 'present',
  });
  const [qIdx, setQIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const matrix = kind === 'be' ? BE_MATRIX : DO_MATRIX;
  const cell = matrix[sel.person][sel.tense];
  const cur = QUIZ[qIdx];
  const isAnswered = picked !== null;
  const isCorrect = picked === cur.answer;

  const accuracy = useMemo(
    () => (score.total === 0 ? 0 : Math.round((score.correct / score.total) * 100)),
    [score],
  );

  const choose = (opt: string) => {
    if (isAnswered) return;
    setPicked(opt);
    setScore((s) => ({
      correct: s.correct + (opt === cur.answer ? 1 : 0),
      total: s.total + 1,
    }));
  };

  const next = () => {
    setPicked(null);
    setQIdx((i) => (i + 1) % QUIZ.length);
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-1">
          동사 활용기
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          영어의 두 종류 동사 — <strong>be동사</strong>(am/is/are/was/were)와{' '}
          <strong>일반동사</strong>(play, go, eat ...) — 가 인칭·시제에 따라 어떻게 변하는지
          확인해보세요.
        </p>
      </div>

      <div className="flex gap-2">
        {(['matrix', 'quiz'] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`min-h-[44px] px-4 py-2 rounded-md text-sm font-bold transition ${
              tab === t
                ? 'bg-purple-600 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            {t === 'matrix' ? '활용 매트릭스' : '빈칸 채우기'}
          </button>
        ))}
      </div>

      {tab === 'matrix' ? (
        <div className="space-y-4">
          <div className="flex gap-2">
            {(['be', 'do'] as VerbKind[]).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setKind(k)}
                className={`min-h-[44px] px-3 py-2 rounded-md text-sm border transition ${
                  kind === k
                    ? 'bg-purple-100 dark:bg-purple-950/40 border-purple-500 text-purple-800 dark:text-purple-200'
                    : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                {k === 'be' ? 'be동사' : '일반동사 (play)'}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[420px] text-sm">
              <thead>
                <tr>
                  <th className="p-2"></th>
                  {TENSES.map((t) => (
                    <th
                      key={t}
                      className="text-zinc-600 dark:text-zinc-300 font-semibold p-2 border-b border-zinc-200 dark:border-zinc-800 text-left"
                    >
                      {t === 'present' ? '현재' : '과거'}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PERSONS.map((p) => (
                  <tr key={p}>
                    <th className="text-zinc-600 dark:text-zinc-300 text-left p-2 whitespace-nowrap font-semibold">
                      {SUBJECT_LABEL[p]}
                    </th>
                    {TENSES.map((t) => {
                      const isSel = sel.person === p && sel.tense === t;
                      return (
                        <td key={t} className="p-1">
                          <button
                            type="button"
                            onClick={() => setSel({ person: p, tense: t })}
                            aria-pressed={isSel}
                            className={`w-full min-h-[44px] px-2 py-1 rounded-md border font-mono transition ${
                              isSel
                                ? 'bg-purple-600 text-white border-purple-700'
                                : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 hover:border-purple-500 text-zinc-800 dark:text-zinc-200'
                            }`}
                          >
                            {matrix[p][t].value}
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
              {SUBJECT_LABEL[sel.person]} · {sel.tense === 'present' ? '현재' : '과거'} ·{' '}
              {kind === 'be' ? 'be동사' : '일반동사'}
            </div>
            <div className="text-3xl font-mono font-bold text-zinc-900 dark:text-zinc-100">
              {cell.value}
            </div>
            <div className="text-sm text-zinc-700 dark:text-zinc-300 font-mono">
              예문: {cell.example}
            </div>
          </article>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border-2 border-zinc-200 dark:border-zinc-800 p-6">
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
              문제 {qIdx + 1} / {QUIZ.length} · 정답률 {accuracy}%
            </div>
            <div className="text-lg sm:text-xl font-mono leading-relaxed text-zinc-900 dark:text-zinc-100 mb-5">
              {cur.before}
              <span
                className={`mx-1 px-2 py-1 rounded border-2 border-dashed ${
                  isAnswered
                    ? isCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300'
                      : 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300'
                    : 'border-purple-400 text-purple-700 dark:text-purple-300'
                }`}
              >
                {isAnswered ? cur.answer : cur.blank}
              </span>
              {cur.after}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {cur.options.map((opt) => {
                const sel2 = picked === opt;
                const correct = isAnswered && opt === cur.answer;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => choose(opt)}
                    disabled={isAnswered}
                    className={`min-h-[44px] px-3 py-2 rounded-md border-2 font-mono text-base transition ${
                      correct
                        ? 'border-green-500 bg-green-100 dark:bg-green-950/40 text-green-800 dark:text-green-200'
                        : sel2
                          ? 'border-red-500 bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-200'
                          : 'border-zinc-300 dark:border-zinc-700 hover:border-purple-500 text-zinc-800 dark:text-zinc-200'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {isAnswered && (
            <div
              className={`rounded-lg p-4 border-l-4 ${
                isCorrect
                  ? 'bg-green-50 dark:bg-green-950/30 border-green-500'
                  : 'bg-amber-50 dark:bg-amber-950/30 border-amber-500'
              }`}
            >
              <div className="text-sm font-bold mb-1 text-zinc-900 dark:text-zinc-100">
                {isCorrect ? '✓ 맞아요!' : '✗ 정답: ' + cur.answer}
              </div>
              <div className="text-sm text-zinc-700 dark:text-zinc-300">{cur.reason}</div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={next}
              className="px-4 py-2 rounded-md bg-purple-600 text-white font-bold hover:bg-purple-700 min-h-[44px]"
            >
              다음 문제 →
            </button>
          </div>
        </div>
      )}

      <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950/40 p-3 text-xs text-zinc-600 dark:text-zinc-400">
        💡 <strong>핵심</strong>: be동사는 ‘상태·정체성’(=이다/있다), 일반동사는 ‘동작’.
        한 문장에 두 동사가 같이 오면 보통 be + 분사 형태(진행·수동)입니다.
      </div>
    </div>
  );
}
