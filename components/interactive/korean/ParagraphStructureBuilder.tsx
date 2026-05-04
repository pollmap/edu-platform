'use client';

// K-WR-01 글의 짜임 — 처음·가운데·끝 / 서론·본론·결론 / PREP 구조 비교.
// 저작권: 실제 글 인용 X. 추상적 일반 예시만.

import { useState } from 'react';

interface Block {
  label: string;
  role: 'open' | 'middle' | 'close';
  brief: string;
  example: string;
}

interface Pattern {
  id: string;
  name: string;
  use: string;
  blocks: Block[];
}

const PATTERNS: Pattern[] = [
  {
    id: 'three-part',
    name: '처음 · 가운데 · 끝',
    use: '초등 글쓰기, 일기, 짧은 산문',
    blocks: [
      { label: '처음', role: 'open', brief: '무엇에 대해 쓸지 알리기', example: '오늘 학교에서 있었던 일을 쓰려 한다.' },
      { label: '가운데', role: 'middle', brief: '핵심 내용을 자세히', example: '점심시간에 친구와 운동장에서 술래잡기를 했다…' },
      { label: '끝', role: 'close', brief: '느낌·생각으로 마무리', example: '오랜만에 땀 흘리니 기분이 상쾌했다.' },
    ],
  },
  {
    id: 'essay',
    name: '서론 · 본론 · 결론',
    use: '논설문, 설명문, 보고서',
    blocks: [
      { label: '서론', role: 'open', brief: '주장 또는 화제를 제시', example: '플라스틱 쓰레기는 줄여야 한다.' },
      { label: '본론', role: 'middle', brief: '근거 1·2·3 (예시·통계·전문가 인용)', example: '① 분해 시간이 길다. ② 해양 생물에 해롭다. ③ 재활용률이 낮다.' },
      { label: '결론', role: 'close', brief: '주장 재강조 + 행동 제안', example: '오늘부터 일회용품 사용을 줄이자.' },
    ],
  },
  {
    id: 'prep',
    name: 'PREP (주장-이유-예시-주장)',
    use: '발표·짧은 글·SNS 게시물',
    blocks: [
      { label: 'P 주장', role: 'open', brief: '결론을 먼저 한 줄로', example: '아침을 먹는 것이 좋다.' },
      { label: 'R 이유', role: 'middle', brief: '왜 그런지 근거', example: '뇌에 에너지를 공급하기 때문이다.' },
      { label: 'E 예시', role: 'middle', brief: '구체적 사례·통계', example: '연구에 따르면 아침 식사를 한 학생의 집중력이 높았다.' },
      { label: 'P 주장 (재진술)', role: 'close', brief: '결론 다시 강조', example: '그러므로 아침을 거르지 말자.' },
    ],
  },
];

const ROLE_STYLES: Record<Block['role'], string> = {
  open: 'border-red-500 bg-red-50 dark:bg-red-950/30',
  middle: 'border-amber-500 bg-amber-50 dark:bg-amber-950/30',
  close: 'border-green-500 bg-green-50 dark:bg-green-950/30',
};

export function ParagraphStructureBuilder() {
  const [patternId, setPatternId] = useState(PATTERNS[0].id);
  const pattern = PATTERNS.find((p) => p.id === patternId)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-1">
          글의 짜임 — 어떤 틀로 쓸까?
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          글의 목적에 따라 짜임이 달라요. 같은 내용도 어떤 틀에 담느냐에 따라 설득력·전달력이 달라져요.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {PATTERNS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPatternId(p.id)}
            className={`px-2 py-3 text-xs rounded-md border min-h-[60px] ${
              patternId === p.id
                ? 'bg-red-50 dark:bg-red-950/30 border-red-500 ring-2 ring-red-300 font-bold'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950/40 p-3 text-xs text-zinc-600 dark:text-zinc-400">
        <strong>언제 써?</strong> {pattern.use}
      </div>

      <div className="space-y-2">
        {pattern.blocks.map((b, idx) => (
          <div
            key={idx}
            className={`rounded-xl border-l-4 p-4 space-y-1 ${ROLE_STYLES[b.role]}`}
          >
            <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{b.label}</div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400">{b.brief}</div>
            <div className="text-sm text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 rounded-md p-2 border border-zinc-200 dark:border-zinc-800">
              예) {b.example}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950/40 p-3 text-xs text-zinc-600 dark:text-zinc-400">
        <strong>팁:</strong> 짧은 글 = PREP, 정식 보고서 = 서론·본론·결론, 일기 = 처음·가운데·끝. 짜임을 바꿔 같은 주제를 두 번 써 보면 빠르게 늘어요.
      </div>
    </div>
  );
}
