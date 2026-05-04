'use client';

// K-CK2-06 매체 리터러시 — 가짜뉴스 5단계 판별 체크리스트.

import { useState } from 'react';

interface Step {
  id: string;
  label: string;
  question: string;
  redFlag: string;
  green: string;
  tool: string;
}

const STEPS: Step[] = [
  {
    id: 'source',
    label: '출처',
    question: '누가 쓴 글이고, 어디에 실렸는가?',
    redFlag: '필자 이름 없음 / 처음 듣는 사이트 / 도메인이 이상함(.tk, .top 등).',
    green: '실명 기자 + 검증된 매체(공영방송·주요 일간지·국제 통신사 등).',
    tool: '미디어 명을 따로 검색해 "어떤 곳인지"부터 확인.',
  },
  {
    id: 'date',
    label: '날짜',
    question: '언제 작성·게재된 정보인가?',
    redFlag: '날짜 표기 없음 / 몇 년 전 사건을 최신처럼 재공유.',
    green: '게재 날짜와 사건 발생일이 명확. 업데이트 이력도 있음.',
    tool: '브라우저 검색 → 같은 사진·영상의 원본 등장 시점을 역추적(역검색).',
  },
  {
    id: 'evidence',
    label: '근거',
    question: '주장 뒤에 자료(통계·발언·문서)가 붙어 있는가?',
    redFlag: '"한 전문가에 따르면" 식 익명 인용. 수치만 있고 출처 없음.',
    green: '실명 인용 + 원자료 링크. 수치는 기관·보고서명까지 명시.',
    tool: '인용된 통계의 원본 보고서를 직접 찾아 수치가 일치하는지 확인.',
  },
  {
    id: 'crosscheck',
    label: '교차 확인',
    question: '같은 사건을 다른 매체도 보도하는가?',
    redFlag: '한 곳에서만 보도되는 충격적 주장. 다른 매체는 침묵.',
    green: '서로 입장이 다른 2~3개 매체에서 동일한 사실관계를 공통으로 다룸.',
    tool: '핵심 키워드를 따로 검색해 동일 사건의 보도 폭을 살핌.',
  },
  {
    id: 'intent',
    label: '의도',
    question: '글이 독자에게 무엇을 시키려 하는가?',
    redFlag: '강한 분노·공포 자극 → "당장 공유하세요" "지금 행동하세요" 같은 행동 압박.',
    green: '사실 전달이 1차 목적. 의견 글이라면 "의견란"임이 분명히 표시.',
    tool: '감정이 격해질수록 멈추고 다시 읽어 보기. 흥분은 가짜뉴스가 노리는 진입점.',
  },
];

export function MediaLiteracyExplorer() {
  const [active, setActive] = useState('source');
  const cur = STEPS.find((s) => s.id === active)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-1">가짜뉴스 5단계 판별</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          공유 버튼 누르기 전에 <strong>출처 → 날짜 → 근거 → 교차 확인 → 의도</strong> 5단계만 거쳐도 가짜에 속을 확률이 크게 줄어요.
        </p>
      </div>

      <div className="grid grid-cols-5 gap-1">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActive(s.id)}
            className={`px-1 py-2 text-[11px] rounded-md border min-h-[60px] ${
              active === s.id
                ? 'bg-red-50 dark:bg-red-950/30 border-red-500 ring-2 ring-red-300 font-bold'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
            }`}
          >
            <div className="text-base font-bold">{i + 1}</div>
            <div className="mt-0.5 leading-tight">{s.label}</div>
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-4 space-y-2">
        <div className="text-lg font-bold text-red-800 dark:text-red-300">
          {cur.label} — {cur.question}
        </div>
        <div className="rounded-md bg-orange-50 dark:bg-orange-950/20 px-3 py-2 text-xs text-orange-700 dark:text-orange-300">
          🚩 <strong>위험 신호</strong> — {cur.redFlag}
        </div>
        <div className="rounded-md bg-green-50 dark:bg-green-950/20 px-3 py-2 text-xs text-green-700 dark:text-green-300">
          ✅ <strong>건강한 형태</strong> — {cur.green}
        </div>
        <div className="rounded-md bg-white dark:bg-zinc-900 px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300">
          🛠 <strong>점검 도구</strong> — {cur.tool}
        </div>
      </div>

      <div className="rounded-md bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-600 dark:text-zinc-400">
        🎯 매체 리터러시는 정보를 의심하는 능력이 아니라, "어디까지 믿을 수 있는지를 정하는" 능력이에요.
      </div>
    </div>
  );
}
