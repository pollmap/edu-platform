'use client';

// K-WR-02 개요 짜기 — 주제 → 핵심 메시지 → 가지(소주제) → 근거.
// 마인드맵 형식으로 가지를 펼쳐 보는 시각화.

import { useState } from 'react';

interface Branch {
  id: string;
  label: string;
  details: string[];
}

interface Topic {
  id: string;
  topic: string;
  message: string;
  branches: Branch[];
}

const TOPICS: Topic[] = [
  {
    id: 'plastic',
    topic: '플라스틱 쓰레기를 줄여야 한다',
    message: '오늘 당장 행동을 바꾸자.',
    branches: [
      { id: 'env', label: '환경 측면', details: ['바다로 흘러간 미세플라스틱', '분해까지 수백 년', '해양 동물 피해'] },
      { id: 'health', label: '건강 측면', details: ['먹이사슬을 통해 인체로', '내분비계 교란 우려', '소금·물에서도 검출'] },
      { id: 'action', label: '실천 방안', details: ['장바구니·텀블러 사용', '분리배출 정확히', '학교·동네 캠페인'] },
    ],
  },
  {
    id: 'reading',
    topic: '책 읽기는 청소년에게 왜 중요한가',
    message: '독서는 가장 저렴한 멘토링이다.',
    branches: [
      { id: 'lang', label: '언어 능력', details: ['어휘력 향상', '문장 이해 속도', '글쓰기 모범 흡수'] },
      { id: 'think', label: '사고력', details: ['논리적 흐름 따라가기', '다양한 관점 접하기', '비판적 사고 훈련'] },
      { id: 'emotion', label: '정서·인성', details: ['타인의 감정 이해', '공감 능력 확대', '자기 성찰'] },
    ],
  },
  {
    id: 'diary',
    topic: '일기를 매일 쓰면 좋은 이유',
    message: '하루 5분의 기록이 1년 뒤 자신을 만든다.',
    branches: [
      { id: 'memory', label: '기억', details: ['하루를 정리해 잊지 않게', '시간이 지나도 다시 꺼내 봄'] },
      { id: 'growth', label: '성장', details: ['실수를 객관적으로 보기', '잘한 점 강화', '목표 추적'] },
      { id: 'writing', label: '글쓰기 실력', details: ['매일 쓰면 손에 익음', '자기 문체 발견', '소재 발견 훈련'] },
    ],
  },
];

export function OutlinePlannerExplorer() {
  const [topicId, setTopicId] = useState(TOPICS[0].id);
  const [activeBranch, setActiveBranch] = useState<string | null>(TOPICS[0].branches[0].id);

  const topic = TOPICS.find((t) => t.id === topicId)!;
  const cur = topic.branches.find((b) => b.id === activeBranch);

  const switchTopic = (id: string) => {
    setTopicId(id);
    const next = TOPICS.find((t) => t.id === id)!;
    setActiveBranch(next.branches[0].id);
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-1">
          개요 = 글쓰기 전 머릿속 지도
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          주제를 정하고 → 한 줄 메시지 → 가지를 3개로 펼치고 → 가지마다 근거를 모아요. 개요만 잘 짜면 본 글쓰기는 절반 끝.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {TOPICS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => switchTopic(t.id)}
            className={`px-2 py-3 text-xs rounded-md border min-h-[56px] text-left ${
              topicId === t.id
                ? 'bg-red-50 dark:bg-red-950/30 border-red-500 ring-2 ring-red-300 font-bold'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
          >
            {t.topic.length > 18 ? t.topic.slice(0, 16) + '…' : t.topic}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4">
        <svg viewBox="0 0 360 220" className="w-full max-w-[480px] mx-auto block">
          {/* 중심 */}
          <ellipse cx="180" cy="110" rx="68" ry="32" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" className="dark:fill-red-950/40" />
          <text x="180" y="105" fontSize="10" fontWeight="bold" fill="#7f1d1d" textAnchor="middle">주제</text>
          <text x="180" y="120" fontSize="9" fill="#7f1d1d" textAnchor="middle">{topic.topic.length > 16 ? topic.topic.slice(0, 14) + '…' : topic.topic}</text>

          {topic.branches.map((b, i) => {
            const angle = -120 + i * 60;
            const rad = (angle * Math.PI) / 180;
            const cx = 180 + Math.cos(rad) * 130;
            const cy = 110 + Math.sin(rad) * 70;
            const isActive = activeBranch === b.id;
            return (
              <g key={b.id} onClick={() => setActiveBranch(b.id)} style={{ cursor: 'pointer' }}>
                <line x1="180" y1="110" x2={cx} y2={cy} stroke={isActive ? '#dc2626' : '#fca5a5'} strokeWidth={isActive ? 2.5 : 1.5} />
                <ellipse cx={cx} cy={cy} rx="48" ry="20" fill={isActive ? '#dc2626' : '#fecaca'} stroke="#dc2626" strokeWidth="1.5" />
                <text x={cx} y={cy + 3} fontSize="10" fontWeight="bold" fill={isActive ? 'white' : '#7f1d1d'} textAnchor="middle">
                  {b.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="rounded-xl bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-4 space-y-2">
        <div className="text-xs text-red-700 dark:text-red-400 font-bold">한 줄 메시지</div>
        <p className="text-sm text-zinc-800 dark:text-zinc-200 italic">"{topic.message}"</p>
      </div>

      {cur && (
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4 space-y-2">
          <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{cur.label} — 근거 모음</div>
          <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
            {cur.details.map((d, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-red-500">•</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950/40 p-3 text-xs text-zinc-600 dark:text-zinc-400">
        <strong>팁:</strong> 가지가 3개면 글이 균형 잡혀요. 한 가지에만 근거가 너무 많으면 다른 가지로 옮기거나 새 가지를 만들어요.
      </div>
    </div>
  );
}
