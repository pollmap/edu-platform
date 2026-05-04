'use client';

// H6-HI-01 근대~일제 강점기 — 19~20세기 타임라인 + 위키 카드.

import { useState } from 'react';
import { findWiki, KOREA_HISTORY_LATE } from '@/lib/data/wikipedia';
import { WikipediaInfobox } from '@/components/primitives/WikipediaInfobox';

interface Era {
  id: string;
  label: string;
  start: number;
  end: number;
  color: string;
  summary: string;
  highlights: string[];
  wikiLabel?: string;
}

const ERAS: Era[] = [
  {
    id: 'joseon-late',
    label: '조선 후기 (개항 전)',
    start: 1392,
    end: 1876,
    color: 'bg-emerald-700',
    summary: '500년 왕조의 마지막 한 세기. 세도 정치, 농민 봉기(동학·홍경래), 천주교 박해. 외국 함선 출몰.',
    highlights: ['실학 (정약용·박지원)', '세도 정치', '동학 (1860 최제우)', '병인양요 1866 · 신미양요 1871'],
    wikiLabel: '조선',
  },
  {
    id: 'opening',
    label: '개항·근대화',
    start: 1876,
    end: 1897,
    color: 'bg-amber-700',
    summary: '강화도조약(1876) 으로 개항. 갑신정변(1884), 동학농민운동(1894), 갑오개혁(1894).',
    highlights: ['강화도조약 1876', '갑신정변 1884', '동학농민운동 1894', '갑오개혁 1894'],
    wikiLabel: '조선',
  },
  {
    id: 'empire',
    label: '대한제국',
    start: 1897,
    end: 1910,
    color: 'bg-red-700',
    summary: '고종 황제 즉위(1897). 광무개혁. 그러나 러일전쟁(1904) 후 을사늑약(1905) → 한일병합(1910).',
    highlights: ['고종 황제 즉위 1897', '을사늑약 1905', '헤이그 특사 1907', '한일병합 1910'],
    wikiLabel: '대한제국',
  },
  {
    id: 'colonial',
    label: '일제 강점기',
    start: 1910,
    end: 1945,
    color: 'bg-zinc-800',
    summary: '35년 식민 통치. 토지조사·산미증식·창씨개명. 3·1운동(1919), 임시정부 수립, 광복군 활동.',
    highlights: ['3·1 운동 1919', '대한민국 임시정부 1919', '윤봉길 의거 1932', '광복 1945.8.15'],
    wikiLabel: '일제 강점기',
  },
  {
    id: 'liberation',
    label: '해방 후 분단',
    start: 1945,
    end: 1953,
    color: 'bg-blue-700',
    summary: '미·소 분할. 정부 수립(1948). 한국전쟁(1950~1953). 분단 고착.',
    highlights: ['8·15 광복 1945', '대한민국 정부 수립 1948', '한국전쟁 1950~1953', '정전협정 1953'],
    wikiLabel: '대한민국 임시정부',
  },
  {
    id: 'modern',
    label: '대한민국 현대',
    start: 1953,
    end: 2026,
    color: 'bg-purple-700',
    summary: '경제 성장(한강의 기적), 4·19·5·18·6월 항쟁의 민주화, 88올림픽·G20·문화 확산.',
    highlights: ['4·19 혁명 1960', '5·18 광주 민주화 1980', '6월 민주항쟁 1987', '88서울올림픽 1988'],
    wikiLabel: '6월 민주 항쟁',
  },
];

export function KoreanModernHistoryTimeline() {
  const [sel, setSel] = useState<Era>(ERAS[3]); // 일제 강점기 기본

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-1">
          한국 근현대사 — 1392 ~ 현재
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          조선 후기부터 현대까지 약 600년의 큰 변화. 각 시기를 클릭해 핵심 사건을 보세요.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1">
        {ERAS.map((e) => (
          <button
            key={e.id}
            type="button"
            onClick={() => setSel(e)}
            className={`${e.color} text-white px-2 py-3 rounded text-xs font-semibold transition hover:brightness-110 ${
              sel.id === e.id ? 'ring-4 ring-amber-400 ring-inset' : ''
            } min-h-[52px]`}
          >
            <div>{e.label}</div>
            <div className="text-[10px] font-mono opacity-80 mt-0.5">{e.start}~{e.end === 2026 ? '현재' : e.end}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <article className="md:col-span-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{sel.label}</h3>
          <p className="text-sm text-zinc-800 dark:text-zinc-200 my-2">{sel.summary}</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-zinc-700 dark:text-zinc-300">
            {sel.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 mt-0.5">●</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </article>
        {sel.wikiLabel && (() => {
          const w = findWiki(KOREA_HISTORY_LATE, sel.wikiLabel);
          return w ? <WikipediaInfobox data={w} /> : null;
        })()}
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-500">
        출처: NCIC 2022 개정 사회과 / 한국사데이터베이스 / 위키백과 ko (CC BY-SA 3.0)
      </p>
    </div>
  );
}
