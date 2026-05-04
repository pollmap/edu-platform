'use client';

// K-CK2-03 작문(논증·창의적) — 주장-근거-반론 수용의 논증 구조 빌더.

import { useState } from 'react';

interface Block {
  id: string;
  label: string;
  role: string;
  example: string;
  fail: string;
}

const BLOCKS: Block[] = [
  {
    id: 'claim',
    label: '주장',
    role: '하고 싶은 핵심 입장. 한 문장으로.',
    example: '학교에서 무인 매점은 오히려 학생 자율성을 늘리는 데 도움이 된다.',
    fail: '"~인 것 같다", "~할 수도 있다" 같은 흐릿한 표현 → 입장 약해짐.',
  },
  {
    id: 'evidence',
    label: '근거',
    role: '주장을 뒷받침하는 사실·통계·사례. 출처 명시.',
    example: '2024년 한국교육개발원 조사에서 무인 매점 도입 학교의 학생 만족도가 평균 28% 더 높았다.',
    fail: '"많은 사람이 그렇게 생각한다" 같은 미확인 일반화. 출처 없는 수치.',
  },
  {
    id: 'warrant',
    label: '근거-주장 연결',
    role: '근거가 왜 주장을 뒷받침하는지 논리 다리 놓기.',
    example: '만족도가 높다는 것은 학생이 자기 결정 경험을 긍정적으로 평가했음을 보여준다. 즉 자율성 함양 효과가 있다는 뜻.',
    fail: '근거 던지고 끝 → "그래서?" 가 안 풀림. 독자가 점프하는 구간을 메워야 함.',
  },
  {
    id: 'counter',
    label: '반론 수용',
    role: '예상되는 반대 의견을 먼저 짚고, 그 한계를 지적.',
    example: '"도난 우려가 있다"는 반론도 일리는 있다. 다만 도입교 23곳 중 도난 사고 보고는 2건에 불과해, 우려가 과장됐다.',
    fail: '반대 의견을 무시 → 일방적 글이 되고 설득력 떨어짐.',
  },
  {
    id: 'conclusion',
    label: '결론',
    role: '주장을 다시 강조 + 행동 제안 또는 의의.',
    example: '따라서 무인 매점은 단순 편의 시설이 아니라 학생 자치 교육의 도구로 검토할 가치가 있다.',
    fail: '새 근거를 갑자기 추가하거나, 결론에서 입장이 흔들리면 글 전체가 흐트러짐.',
  },
];

export function ArgumentStructureBuilder() {
  const [active, setActive] = useState('claim');
  const cur = BLOCKS.find((b) => b.id === active)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-1">논증 구조 5블록</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          좋은 논증은 <strong>주장 → 근거 → 연결 → 반론 수용 → 결론</strong> 5블록으로 구성돼요. 한 블록만 빠져도 글이 약해져요.
        </p>
      </div>

      <div className="grid grid-cols-5 gap-1">
        {BLOCKS.map((b, i) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setActive(b.id)}
            className={`px-1 py-2 text-[11px] rounded-md border min-h-[60px] ${
              active === b.id
                ? 'bg-red-50 dark:bg-red-950/30 border-red-500 ring-2 ring-red-300 font-bold'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
            }`}
          >
            <div className="text-base font-bold">{i + 1}</div>
            <div className="mt-0.5 leading-tight">{b.label}</div>
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-4 space-y-2">
        <div className="text-lg font-bold text-red-800 dark:text-red-300">{cur.label}</div>
        <div className="text-xs text-zinc-600 dark:text-zinc-400">
          <strong>역할:</strong> {cur.role}
        </div>
        <div className="rounded-md bg-white dark:bg-zinc-900 p-3 text-sm text-zinc-700 dark:text-zinc-300">
          ✅ <strong>예시</strong> — {cur.example}
        </div>
        <div className="rounded-md bg-orange-50 dark:bg-orange-950/20 px-3 py-2 text-xs text-orange-700 dark:text-orange-300">
          ❌ <strong>흔한 실수</strong> — {cur.fail}
        </div>
      </div>

      <div className="rounded-md bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-600 dark:text-zinc-400">
        🎯 5블록을 머릿속에 두고 글을 점검하면, 자기 글의 약한 지점이 어디인지 빠르게 보여요.
      </div>
    </div>
  );
}
