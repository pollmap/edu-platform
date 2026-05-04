'use client';

import { useState } from 'react';
import { findWiki, KOREA_FIGURES, KOREA_HISTORY } from '@/lib/data/wikipedia';
import { WikipediaInfobox } from '@/components/primitives/WikipediaInfobox';

interface Era {
  id: string;
  name: string;
  start: number; // 연도 (음수 = BC)
  end: number;
  color: string; // Tailwind class
  summary: string;
  highlights: string[];
  wikiLabel?: string; // 위키미디어 매핑
}

// 출처: NCIC 2022 개정 사회과 + 한국사데이터베이스 (https://db.history.go.kr)
// 단군신화 BC 2333 은 전통 연대 (학교 교과서 표기). 고고학적 청동기 시작은 BC 2000 전후.
const ERAS: Era[] = [
  {
    id: 'paleolithic',
    name: '구석기 시대',
    start: -700000,
    end: -8000,
    color: 'bg-stone-500',
    summary: '약 70만 년 전부터 시작된 가장 오랜 시기. 뗀석기를 사용하고 사냥·채집으로 생활.',
    highlights: ['뗀석기 (주먹도끼)', '동굴·막집 거주', '이동 생활', '사냥·채집'],
    wikiLabel: '선사 시대',
  },
  {
    id: 'neolithic',
    name: '신석기 시대',
    start: -8000,
    end: -2000,
    color: 'bg-amber-600',
    summary: '간석기와 토기를 사용. 농경과 목축 시작. 정착 생활로 마을 형성.',
    highlights: ['간석기·빗살무늬토기', '농경(조·피)·목축', '움집 정착', '씨족 사회'],
    wikiLabel: '선사 시대',
  },
  {
    id: 'bronze',
    name: '청동기 시대',
    start: -2000,
    end: -400,
    color: 'bg-amber-800',
    summary: '청동기 사용. 계급과 국가 형성. 단군신화의 고조선 건국 (전통 BC 2333).',
    highlights: ['청동검·민무늬토기', '고인돌 (지배 계층)', '벼농사 시작', '고조선 건국'],
    wikiLabel: '고조선',
  },
  {
    id: 'iron',
    name: '철기 시대',
    start: -400,
    end: 300,
    color: 'bg-zinc-700',
    summary: '철제 도구·무기로 농업·전쟁 변혁. 부여·고구려·옥저·동예·삼한 등 여러 나라 형성.',
    highlights: ['철제 농기구', '여러 나라의 성장', '위만조선', '한군현 (낙랑 등)'],
    wikiLabel: '고조선',
  },
  {
    id: 'three-kingdoms',
    name: '삼국 시대',
    start: -57,
    end: 668,
    color: 'bg-red-700',
    summary: '고구려·백제·신라가 경쟁하며 발전. 한반도와 만주 일대를 다툼.',
    highlights: ['고구려 (BC 37~668)', '백제 (BC 18~660)', '신라 (BC 57~935)', '광개토대왕·진흥왕'],
    wikiLabel: '삼국 시대',
  },
  {
    id: 'unified-silla-balhae',
    name: '남북국 시대',
    start: 668,
    end: 935,
    color: 'bg-purple-700',
    summary: '통일신라 (남)와 발해 (북). 통일신라는 7~9세기 황금기, 발해는 해동성국으로 불림.',
    highlights: ['통일신라 668~935', '발해 698~926', '경덕왕 문화 절정', '장보고 청해진'],
    wikiLabel: '통일 신라',
  },
  {
    id: 'goryeo',
    name: '고려',
    start: 918,
    end: 1392,
    color: 'bg-emerald-700',
    summary: '왕건 건국. 후삼국 통일 936. 거란·여진·몽골과의 전쟁. 인쇄술·청자 절정.',
    highlights: ['왕건 건국 918', '후삼국 통일 936', '강감찬 귀주대첩 1019', '직지심체요절 1377'],
    wikiLabel: '고려',
  },
];

function fmtYear(y: number): string {
  if (y < 0) return `B.C. ${Math.abs(y).toLocaleString('ko-KR')}`;
  return `A.D. ${y.toLocaleString('ko-KR')}`;
}

function eraDuration(e: Era): string {
  return `${fmtYear(e.start)} ~ ${fmtYear(e.end)}`;
}

export function KoreanHistoryTimeline() {
  const [selected, setSelected] = useState<Era>(ERAS[ERAS.length - 1]); // 고려 기본 선택

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
      <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-1">
        한국사 타임라인 — 선사 ~ 고려
      </h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
        시대 막대를 클릭하면 그 시기의 핵심 사건과 특징을 볼 수 있어요.
      </p>

      {/* 타임라인 (시대당 동일 칸 — 학습 인식 우선) */}
      <div className="relative mb-6">
        <div className="grid grid-cols-7 gap-1 rounded-md overflow-hidden">
          {ERAS.map((era) => (
            <button
              key={era.id}
              type="button"
              onClick={() => setSelected(era)}
              aria-pressed={selected.id === era.id}
              className={`${era.color} text-white px-2 py-3 text-xs font-semibold transition hover:brightness-110 ${
                selected.id === era.id ? 'ring-4 ring-amber-400 ring-inset' : ''
              } min-h-[44px]`}
              title={`${era.name} (${eraDuration(era)})`}
            >
              {era.name}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 mt-1 text-[10px] text-zinc-500 dark:text-zinc-400 font-mono text-center">
          {ERAS.map((era) => (
            <div key={era.id}>
              {era.start < 0 ? `${Math.abs(era.start / 1000).toFixed(0)}k BC` : era.start}
            </div>
          ))}
        </div>
      </div>

      {/* 선택된 시대 카드 + 위키백과 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <article className="md:col-span-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-5">
          <header className="flex items-baseline justify-between flex-wrap gap-2 mb-3">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{selected.name}</h3>
            <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
              {eraDuration(selected)}
            </span>
          </header>
          <p className="text-zinc-800 dark:text-zinc-200 mb-3">{selected.summary}</p>
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">핵심 사건·특징</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-zinc-700 dark:text-zinc-300">
            {selected.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2">
                <span aria-hidden className="text-amber-600 dark:text-amber-400 mt-0.5">●</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </article>
        {selected.wikiLabel && (() => {
          const w = findWiki(KOREA_HISTORY, selected.wikiLabel);
          return w ? <WikipediaInfobox data={w} /> : null;
        })()}
      </div>

      {/* 핵심 인물 5인 — 위키백과 카드 */}
      <section className="mt-6">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
          핵심 인물 (위키백과)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {KOREA_FIGURES.items.map((f) => (
            <WikipediaInfobox key={f.title} data={f} />
          ))}
        </div>
      </section>

      <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-500">
        출처: NCIC 2022 개정 사회과 / 한국사데이터베이스 (db.history.go.kr) / 위키백과 ko (CC BY-SA 3.0)
      </p>
    </div>
  );
}
