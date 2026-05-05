'use client';

// K-TR 주제별 독서 — 목적·주제별 독해 전략을 매트릭스로.

import { useState } from 'react';

interface Strategy {
  topic: string;
  purpose: string;
  examples: string[];
  approach: string;
  noteStyle: string;
  evalQuestion: string;
}

const STRATEGIES: Strategy[] = [
  {
    topic: '인문',
    purpose: '개념·관점 이해',
    examples: ['철학 개론', '심리학 입문', '역사 비평'],
    approach: '핵심 개념을 정의 단위로 옮겨 적기. 저자의 입장과 반대 입장 함께 메모',
    noteStyle: '개념 → 정의 → 예 → 비판 4열 표',
    evalQuestion: '"이 저자는 어떤 관점을 전제로 하는가?"',
  },
  {
    topic: '사회',
    purpose: '현상·구조 분석',
    examples: ['도시론', '제도 분석', '미디어 비평'],
    approach: '사례 → 통계 → 해석 흐름 추적. 책의 데이터가 최신인지 확인',
    noteStyle: '사례 ↔ 데이터 ↔ 해석 3열',
    evalQuestion: '"이 통계는 언제·누구의 자료인가?"',
  },
  {
    topic: '과학·기술',
    purpose: '원리·실험 추적',
    examples: ['물리 교양서', '기술사', '과학 저널 기사'],
    approach: '용어 정의를 따로 정리. 가설→실험→결과 흐름 도식화',
    noteStyle: '가설 → 변인 → 결과 → 결론',
    evalQuestion: '"실험 결과가 가설을 뒷받침하는가?"',
  },
  {
    topic: '예술',
    purpose: '형식·맥락 감상',
    examples: ['미술사', '음악 비평', '영화 이론'],
    approach: '작품의 형식 요소(구도·리듬·편집)와 시대 맥락을 분리해 메모',
    noteStyle: '형식 / 내용 / 맥락 3구분',
    evalQuestion: '"이 작품의 형식 선택이 의미와 어떻게 연결되는가?"',
  },
  {
    topic: '진로·직무',
    purpose: '실용 정보·기술 습득',
    examples: ['직무 가이드', '자기계발', '실용서'],
    approach: '내가 적용할 행동 1~3개로 압축. 적용 후 결과를 따로 기록',
    noteStyle: '주장 → 행동 → 결과 검증',
    evalQuestion: '"내 상황에 적용 가능한가? 부작용은?"',
  },
];

export function ReadingPurposeMatrix() {
  const [active, setActive] = useState('인문');
  const cur = STRATEGIES.find((s) => s.topic === active)!;

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        주제별로 <strong>읽는 목적</strong>이 다르고, 그래서 메모법·평가 질문도 달라져요. 5가지 영역을 비교해 보세요.
      </p>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {STRATEGIES.map((s) => (
          <button
            key={s.topic}
            onClick={() => setActive(s.topic)}
            className={`min-h-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition ${
              active === s.topic
                ? 'border-red-500 bg-red-50 text-red-900 dark:border-red-400 dark:bg-red-900/30 dark:text-red-100'
                : 'border-zinc-300 bg-white text-zinc-700 hover:border-red-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300'
            }`}
          >
            {s.topic}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{cur.topic} — {cur.purpose}</h3>
        <p className="mt-1 text-xs text-zinc-500">예: {cur.examples.join(', ')}</p>
        <div className="mt-3 space-y-2">
          <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800">
            <p className="text-xs font-semibold text-zinc-500">접근법</p>
            <p className="text-sm text-zinc-800 dark:text-zinc-200">{cur.approach}</p>
          </div>
          <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800">
            <p className="text-xs font-semibold text-zinc-500">메모 형식</p>
            <p className="text-sm text-zinc-800 dark:text-zinc-200">{cur.noteStyle}</p>
          </div>
          <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/30">
            <p className="text-xs font-semibold text-red-700 dark:text-red-300">평가 질문</p>
            <p className="text-sm text-red-900 dark:text-red-100">{cur.evalQuestion}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
