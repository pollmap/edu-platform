'use client';

// E-LIT 영미 문학 읽기 — 시대별 주요 사조와 특징을 작품 정보 없이 구조만.
// 저작권 안전: 작품 본문/대사 인용 X, 작가명·출판년도·장르 정보만.

import { useState } from 'react';

interface Era {
  id: string;
  label: string;
  period: string;
  movement: string;
  themes: string[];
  formal: string[];
  context: string;
  authors: string[];
}

const ERAS: Era[] = [
  {
    id: 'renaissance',
    label: '르네상스',
    period: '16~17C',
    movement: 'Elizabethan / Jacobean',
    themes: ['인간 중심', '비극적 운명', '왕권·신권'],
    formal: ['소네트(14행)', '무운시(blank verse)', '5막 비극'],
    context: '인쇄술 보급 + 종교개혁 + 신대륙 발견 — 인간 가능성에 대한 자신감과 불안 공존',
    authors: ['Shakespeare(1564~1616)', 'Spenser(1552~1599)', 'Donne(1572~1631)'],
  },
  {
    id: 'romantic',
    label: '낭만주의',
    period: '1798~1830s',
    movement: 'Romanticism',
    themes: ['자연·숭고', '개인의 감정', '상상력·천재성'],
    formal: ['서정시', '오드(ode)', '발라드'],
    context: '산업혁명 + 프랑스 혁명 — 도시화에 대한 반작용으로 자연과 개인 내면에 주목',
    authors: ['Wordsworth(1770~1850)', 'Coleridge(1772~1834)', 'Keats(1795~1821)'],
  },
  {
    id: 'victorian',
    label: '빅토리아 시대',
    period: '1837~1901',
    movement: 'Victorian Realism',
    themes: ['사회 계급', '도덕·결혼', '제국·식민'],
    formal: ['장편 사실주의 소설', '연재 소설(serial)', '드라마틱 모놀로그'],
    context: '대영제국 절정기 + 도시 빈곤 + 다윈 — 외형의 안정 속 균열을 소설이 포착',
    authors: ['Dickens(1812~1870)', 'Eliot(1819~1880)', 'Hardy(1840~1928)'],
  },
  {
    id: 'modernism',
    label: '모더니즘',
    period: '1900~1945',
    movement: 'Modernism',
    themes: ['자아 분열', '시간·기억', '전쟁의 트라우마'],
    formal: ['의식의 흐름', '비선형 서사', '자유시(free verse)'],
    context: '1·2차 세계대전 + 프로이트 + 영화 — 외부 세계 묘사보다 내면 시간을 우선',
    authors: ['Joyce(1882~1941)', 'Woolf(1882~1941)', 'Eliot T.S.(1888~1965)'],
  },
  {
    id: 'postwar',
    label: '전후·포스트모던',
    period: '1945~2000',
    movement: 'Postmodernism',
    themes: ['거대 서사 회의', '정체성·다문화', '메타픽션'],
    formal: ['패러디·혼성', '메타-내러티브', '단편·미니멀리즘'],
    context: '냉전 + 시민권 운동 + TV·디지털 — 단일한 진리에 대한 의심',
    authors: ['Pynchon(1937~)', 'Morrison(1931~2019)', 'DeLillo(1936~)'],
  },
  {
    id: 'contemporary',
    label: '현대',
    period: '2000~',
    movement: 'Contemporary / Global',
    themes: ['디지털 정체성', '기후·생태', '이주·디아스포라'],
    formal: ['짧은 챕터', '다중 시점', '하이브리드(논픽션+픽션)'],
    context: '인터넷 + 기후위기 + 글로벌 이동 — 영미 문학의 경계가 글로벌 영어로 확장',
    authors: ['Adichie(1977~)', 'Ishiguro(1954~)', 'Whitehead(1969~)'],
  },
];

export function LiteraryEraTimeline() {
  const [active, setActive] = useState('renaissance');
  const cur = ERAS.find((e) => e.id === active)!;

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        영미 문학은 <strong>시대 배경 → 형식 변화 → 주제 변화</strong>의 흐름으로 읽으면 보여요. 6개 시대를 비교하세요.
      </p>

      <div className="overflow-x-auto pb-2">
        <div className="flex min-w-max gap-2">
          {ERAS.map((e, i) => (
            <button
              key={e.id}
              onClick={() => setActive(e.id)}
              className={`flex min-h-[44px] flex-col items-start rounded-lg border px-3 py-2 text-left transition ${
                active === e.id
                  ? 'border-purple-500 bg-purple-50 text-purple-900 dark:border-purple-400 dark:bg-purple-900/30 dark:text-purple-100'
                  : 'border-zinc-300 bg-white text-zinc-700 hover:border-purple-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300'
              }`}
            >
              <span className="text-xs text-zinc-500">{i + 1}.</span>
              <span className="text-sm font-semibold">{e.label}</span>
              <span className="text-xs">{e.period}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-2 flex flex-wrap items-baseline gap-2">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{cur.label}</h3>
          <span className="text-xs text-zinc-500">{cur.period} · {cur.movement}</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
            <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">주제</p>
            <ul className="mt-1 space-y-0.5 text-sm text-zinc-700 dark:text-zinc-300">
              {cur.themes.map((t) => (
                <li key={t}>• {t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800">
            <p className="text-xs font-semibold text-zinc-500">형식·장르</p>
            <ul className="mt-1 space-y-0.5 text-sm text-zinc-700 dark:text-zinc-300">
              {cur.formal.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-3 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800">
          <p className="text-xs font-semibold text-zinc-500">시대 맥락</p>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">{cur.context}</p>
        </div>
        <div className="mt-2 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800">
          <p className="text-xs font-semibold text-zinc-500">대표 작가 (생몰년)</p>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">{cur.authors.join(' · ')}</p>
        </div>
      </div>
    </div>
  );
}
