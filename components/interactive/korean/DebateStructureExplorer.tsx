'use client';

// K-LS-01 토론·토의·발표 — 토론 흐름과 발언 종류.

import { useState } from 'react';

interface Stage {
  id: string;
  label: string;
  speaker: string;
  role: string;
  example: string;
  tip: string;
}

const STAGES: Stage[] = [
  {
    id: 'open',
    label: '입론',
    speaker: '찬성·반대 측',
    role: '내 주장과 근거를 처음 펼침',
    example: '"저는 교복 자율화에 찬성합니다. 이유는 첫째 ___, 둘째 ___, 셋째 ___ 입니다."',
    tip: '주장 1개 + 근거 3개 구조가 표준이에요.',
  },
  {
    id: 'cross',
    label: '교차 질의',
    speaker: '상대방',
    role: '상대 입론의 근거를 짧게 묻고 답함',
    example: 'Q: "두 번째 근거의 통계 출처가 어디인가요?" A: "2024년 교육부 보고서입니다."',
    tip: '상대 약점을 찌르되 인신공격 X. 사실·논리만.',
  },
  {
    id: 'rebuttal',
    label: '반론',
    speaker: '반대편',
    role: '상대 주장의 약점을 정리해 반박',
    example: '"상대편의 첫 근거는 사례가 한 학교뿐이라 일반화할 수 없습니다."',
    tip: '상대 근거를 그대로 받아서 "그러나 ~" 로 시작하면 자연스러워요.',
  },
  {
    id: 'close',
    label: '최종 변론',
    speaker: '찬성·반대 측',
    role: '핵심 주장을 다시 강조하며 마무리',
    example: '"오늘 저희는 ___ 와 ___ 를 보였습니다. 따라서 ___ 가 옳습니다."',
    tip: '새 근거를 들고 오면 안 돼요. 이미 말한 내용 정리만.',
  },
];

const RULES = [
  { ban: '인신공격 ("너는 멍청해")', good: '주장에만 집중 ("그 주장의 근거가 부족합니다")' },
  { ban: '권위에 호소 ("교수님이 그랬어")', good: '근거를 직접 제시 ("이 통계에 따르면…")' },
  { ban: '동문서답', good: '상대 질문에 직접 답하기' },
  { ban: '말 끊기', good: '상대 발언이 끝나기를 기다리기' },
];

export function DebateStructureExplorer() {
  const [active, setActive] = useState('open');
  const cur = STAGES.find((s) => s.id === active)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-1">
          토론의 4단계 흐름
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          토론은 그냥 말다툼이 아니에요. <strong>입론 → 교차 질의 → 반론 → 최종 변론</strong> 4단계로 구조가 정해져 있어요.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-1.5">
        {STAGES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActive(s.id)}
            className={`px-2 py-3 text-xs rounded-md border min-h-[60px] ${
              active === s.id
                ? 'bg-red-50 dark:bg-red-950/30 border-red-500 ring-2 ring-red-300 font-bold'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
            }`}
          >
            <div className="text-base font-bold">{i + 1}</div>
            <div className="mt-1">{s.label}</div>
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-4 space-y-2">
        <div className="text-lg font-bold text-red-800 dark:text-red-300">{cur.label}</div>
        <div className="text-xs text-zinc-600 dark:text-zinc-400">
          <strong>발언자:</strong> {cur.speaker} · <strong>역할:</strong> {cur.role}
        </div>
        <div className="rounded-md bg-white dark:bg-zinc-900 p-3 text-sm text-zinc-700 dark:text-zinc-300 italic">
          {cur.example}
        </div>
        <div className="text-xs text-zinc-600 dark:text-zinc-400">
          💡 {cur.tip}
        </div>
      </div>

      <div>
        <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">토론 매너 — 하지 말 것 vs 해야 할 것</div>
        <div className="space-y-1.5">
          {RULES.map((r, i) => (
            <div key={i} className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-md bg-red-50 dark:bg-red-950/20 px-3 py-2 text-red-700 dark:text-red-300">
                ✗ {r.ban}
              </div>
              <div className="rounded-md bg-green-50 dark:bg-green-950/20 px-3 py-2 text-green-700 dark:text-green-300">
                ✓ {r.good}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
