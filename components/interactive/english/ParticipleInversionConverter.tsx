'use client';

// E-CE2-03 어휘·문법 — 분사구문·도치·강조 변환을 인터랙티브로.

import { useState } from 'react';

interface Pattern {
  id: string;
  label: string;
  rule: string;
  base: string;
  converted: string;
  steps: string[];
  caution: string;
}

const PATTERNS: Pattern[] = [
  {
    id: 'participle',
    label: '분사구문',
    rule: '두 절을 한 절로 줄이기 — 접속사·주어 생략, 동사를 -ing/-ed로',
    base: 'Because she felt tired, she went to bed early.',
    converted: 'Feeling tired, she went to bed early.',
    steps: [
      '접속사 (Because) 제거',
      '주어 (she) 가 메인 절과 같으면 생략',
      '동사 (felt) → 분사 (Feeling)',
      '쉼표로 메인 절과 연결',
    ],
    caution: '주어가 다르면 절대 생략 X — Independent participle 필요',
  },
  {
    id: 'inversion-neg',
    label: '부정어 도치',
    rule: '부정어구가 문장 앞으로 가면 주어·동사 자리가 바뀜',
    base: 'I have never seen such a beautiful view.',
    converted: 'Never have I seen such a beautiful view.',
    steps: [
      '부정어 (Never) 를 문장 맨 앞으로',
      '조동사 (have) 를 주어 (I) 앞으로',
      '본동사는 그대로',
      '강조 효과 — 격식·문어체에서 주로 사용',
    ],
    caution: 'Not until / Hardly / Seldom 도 같은 규칙',
  },
  {
    id: 'inversion-only',
    label: 'Only + 부사구 도치',
    rule: 'Only + 부사구가 문장 앞으로 가면 도치 발생',
    base: 'I realized the truth then.',
    converted: 'Only then did I realize the truth.',
    steps: [
      'Only 부사구 (Only then) 를 맨 앞으로',
      '조동사 (did) 를 주어 (I) 앞으로',
      '본동사 (realized) → 원형 (realize)',
      '강조 효과로 시점·조건이 부각',
    ],
    caution: 'Only when / Only if / Only after 모두 도치 유발',
  },
  {
    id: 'cleft',
    label: 'It is ~ that 강조',
    rule: '강조하고 싶은 부분을 it is/was ~ that 사이에 넣기',
    base: 'He met her at the cafe yesterday.',
    converted: 'It was at the cafe that he met her yesterday.',
    steps: [
      '강조 대상 선택 (장소: at the cafe)',
      'It was [강조 대상] that ... 구조에 끼워 넣기',
      '나머지 문장은 that 뒤에',
      '강조 부분만 도치 X, 강조만 받음',
    ],
    caution: '주어 강조는 that 뒤에 동사 일치 — 사람은 who 도 가능',
  },
  {
    id: 'so-such',
    label: 'So/Such 도치',
    rule: 'So + 형용사·부사 또는 Such + 명사가 앞으로 가면 도치',
    base: 'The book was so interesting that I read it twice.',
    converted: 'So interesting was the book that I read it twice.',
    steps: [
      'So + 형용사 (So interesting) 를 앞으로',
      'be 동사 (was) 를 주어 (the book) 앞으로',
      'that 절은 그대로',
      '문어체·격식 표현',
    ],
    caution: 'Such 의 경우 — Such was the impact that ...',
  },
];

export function ParticipleInversionConverter() {
  const [active, setActive] = useState('participle');
  const [showSteps, setShowSteps] = useState(false);
  const cur = PATTERNS.find((p) => p.id === active)!;

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        영어 고급 문법의 핵심은 <strong>같은 의미를 다른 구조로</strong> 옮기는 능력. 5가지 변환 패턴을 비교하세요.
      </p>

      <div className="flex flex-wrap gap-2">
        {PATTERNS.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setActive(p.id);
              setShowSteps(false);
            }}
            className={`min-h-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition ${
              active === p.id
                ? 'border-purple-500 bg-purple-50 text-purple-900 dark:border-purple-400 dark:bg-purple-900/30 dark:text-purple-100'
                : 'border-zinc-300 bg-white text-zinc-700 hover:border-purple-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-1 text-base font-bold text-zinc-900 dark:text-zinc-100">{cur.label}</h3>
        <p className="text-xs text-zinc-500">{cur.rule}</p>

        <div className="mt-3 space-y-2">
          <div className="rounded-lg border border-zinc-300 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800">
            <p className="text-xs font-semibold text-zinc-500">원형</p>
            <p className="font-mono text-sm text-zinc-800 dark:text-zinc-200">{cur.base}</p>
          </div>
          <div className="text-center text-2xl text-purple-500">↓</div>
          <div className="rounded-lg border border-purple-300 bg-purple-50 p-3 dark:border-purple-700 dark:bg-purple-900/30">
            <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">변환 결과</p>
            <p className="font-mono text-sm text-purple-900 dark:text-purple-100">{cur.converted}</p>
          </div>
        </div>

        <button
          onClick={() => setShowSteps((s) => !s)}
          className="mt-3 min-h-[44px] w-full rounded-lg bg-purple-600 px-3 py-2 text-sm font-medium text-white hover:bg-purple-700"
        >
          {showSteps ? '단계 숨기기' : '변환 단계 보기'}
        </button>

        {showSteps && (
          <ol className="mt-3 space-y-2">
            {cur.steps.map((s, i) => (
              <li
                key={s}
                className="flex gap-2 rounded-lg bg-zinc-50 p-2 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-xs text-white">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        )}

        <div className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-900/30 dark:text-amber-100">
          <strong>주의</strong> — {cur.caution}
        </div>
      </div>
    </div>
  );
}
