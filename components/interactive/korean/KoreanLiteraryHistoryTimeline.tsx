'use client';

// K-CK2-05 한국 문학사 — 시대별 주요 갈래·특징 타임라인.

import { useState } from 'react';

interface Era {
  id: string;
  label: string;
  period: string;
  context: string;
  genres: string[];
  feature: string;
  shift: string;
}

const ERAS: Era[] = [
  {
    id: 'ancient',
    label: '상고 시대',
    period: '~ 통일신라',
    context: '한자가 들어오기 전과 후가 섞이던 시기. 문자 기록이 적어 구전 문학이 중심.',
    genres: ['고대 가요', '향가', '설화'],
    feature: '구비 전승 → 한자 차용 표기. 주술·기원적 성격이 강함.',
    shift: '한자 표기 도입으로 노래·이야기가 처음 글로 남기 시작.',
  },
  {
    id: 'goryeo',
    label: '고려',
    period: '918~1392',
    context: '한문학이 귀족 문화로 자리잡고, 동시에 서민층 노래도 활발히 불림.',
    genres: ['고려가요', '경기체가', '한시·한문'],
    feature: '귀족-서민 이원 구조. 고려가요는 솔직한 정서 표현, 경기체가는 형식 정형.',
    shift: '한자 문학과 우리말 노래가 따로 흐르며, 양자가 점차 영향 주고받음.',
  },
  {
    id: 'joseon-early',
    label: '조선 전기',
    period: '1392~1592',
    context: '훈민정음 창제(1446)로 한국어를 표기할 도구가 처음 마련됨.',
    genres: ['시조', '가사', '악장'],
    feature: '사대부의 자연관·유교 이념이 시조·가사에 담김. 짧은 형식과 긴 형식이 나뉨.',
    shift: '한글 창제 → 우리말로 시·산문을 쓸 수 있게 됨 (전환점).',
  },
  {
    id: 'joseon-late',
    label: '조선 후기',
    period: '1592~1894',
    context: '임진왜란·병자호란 이후 신분제 동요, 상공업 발달, 평민 의식 성장.',
    genres: ['사설시조', '판소리', '한글소설'],
    feature: '서민의 일상·풍자·해학이 본격 등장. 형식이 길어지고 자유로워짐.',
    shift: '문학의 향유층이 양반 → 평민으로 확대. 산문(소설) 발달.',
  },
  {
    id: 'modern',
    label: '개화기·근대',
    period: '1894~1945',
    context: '갑오개혁·식민지화. 신문·잡지 등장, 서양 문학 양식 유입.',
    genres: ['신소설', '신체시', '근대소설·시'],
    feature: '계몽 의식 → 개인 내면 탐구로 이동. 자유시·단편소설 정착.',
    shift: '한문 중심 전통 문학이 끝나고, 한글 중심 현대 문학으로 전환.',
  },
  {
    id: 'contemporary',
    label: '광복 이후~현대',
    period: '1945 ~',
    context: '분단·전쟁·산업화·민주화·정보화를 차례로 겪으며 문제의식이 빠르게 변함.',
    genres: ['현대시', '현대소설', '희곡', '수필'],
    feature: '주제·형식 다변화. 분단·도시화·여성·환경·디지털 등 시대 이슈가 반영.',
    shift: '매체 환경 변화(인쇄→영상→디지털)에 따라 문학의 경계가 다시 흔들리는 중.',
  },
];

export function KoreanLiteraryHistoryTimeline() {
  const [active, setActive] = useState('joseon-early');
  const cur = ERAS.find((e) => e.id === active)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-1">한국 문학사 6시대</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          한국 문학은 <strong>상고 → 고려 → 조선 전기 → 조선 후기 → 근대 → 현대</strong> 6단계로 흐름이 큰 그림에서 정리돼요.
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1">
        {ERAS.map((e) => (
          <button
            key={e.id}
            type="button"
            onClick={() => setActive(e.id)}
            className={`px-1 py-2 text-[11px] rounded-md border min-h-[64px] ${
              active === e.id
                ? 'bg-red-50 dark:bg-red-950/30 border-red-500 ring-2 ring-red-300 font-bold'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
            }`}
          >
            <div className="font-semibold leading-tight">{e.label}</div>
            <div className="mt-0.5 text-[10px] text-zinc-500 dark:text-zinc-400">{e.period}</div>
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-4 space-y-3">
        <div>
          <div className="text-lg font-bold text-red-800 dark:text-red-300">{cur.label}</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">{cur.period}</div>
        </div>
        <div className="rounded-md bg-white dark:bg-zinc-900 p-3 text-xs text-zinc-700 dark:text-zinc-300">
          <strong>시대 배경</strong> — {cur.context}
        </div>
        <div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">대표 갈래</div>
          <div className="flex flex-wrap gap-1.5">
            {cur.genres.map((g) => (
              <span
                key={g}
                className="rounded-full bg-white dark:bg-zinc-900 border border-red-300 dark:border-red-700 px-2.5 py-1 text-xs font-semibold text-red-700 dark:text-red-300"
              >
                {g}
              </span>
            ))}
          </div>
        </div>
        <div className="text-xs text-zinc-700 dark:text-zinc-300">
          <strong>특징</strong> — {cur.feature}
        </div>
        <div className="rounded-md bg-yellow-50 dark:bg-yellow-950/20 px-3 py-2 text-xs text-yellow-800 dark:text-yellow-200">
          🔄 <strong>전환점</strong> — {cur.shift}
        </div>
      </div>

      <div className="rounded-md bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-600 dark:text-zinc-400">
        🎯 작품을 만나면 먼저 시대를 위치시키고, 그 시대의 매체·향유층·이념을 떠올려 보면 해석이 한결 쉬워져요.
      </div>
    </div>
  );
}
