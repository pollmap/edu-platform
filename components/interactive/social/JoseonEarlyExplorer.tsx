'use client';

// H-HI-04 조선 성립·발전 — 전기(태조~선조) 정치·문화 인터랙티브.
// 자체 정리. 학교 한국사 교과서 일반 합의 수준에서 사실 위주, 정치 중립.

import { useState } from 'react';

interface Reign {
  id: string;
  king: string;
  start: number;
  end: number;
  highlights: string[];
  summary: string;
  significance: string;
  color: string;
}

const REIGNS: Reign[] = [
  {
    id: 'taejo',
    king: '태조',
    start: 1392,
    end: 1398,
    highlights: ['조선 건국(1392)', '한양 천도(1394)', '경복궁 창건', '정도전 주도 통치 체제'],
    summary: '이성계가 위화도 회군 뒤 고려를 무너뜨리고 조선을 세움. 한양으로 도읍을 옮기고 새 왕조의 기틀을 세움.',
    significance: '500년 왕조의 시작점. 성리학을 통치 이념으로 삼는 새 국가의 출발.',
    color: 'bg-rose-700',
  },
  {
    id: 'taejong',
    king: '태종',
    start: 1400,
    end: 1418,
    highlights: ['사병 혁파', '6조 직계제', '호패법(1413)', '신문고 설치'],
    summary: '왕자의 난을 거쳐 즉위. 강력한 왕권 중심으로 행정·군사 제도를 정비함.',
    significance: '왕권을 안정시켜 다음 세대의 문화 발전을 가능하게 한 토대 마련.',
    color: 'bg-amber-700',
  },
  {
    id: 'sejong',
    king: '세종',
    start: 1418,
    end: 1450,
    highlights: ['훈민정음 창제(1443)·반포(1446)', '집현전 학문 활동', '측우기·앙부일구', '대마도 정벌·4군 6진'],
    summary: '한글 창제, 과학 기구 발명, 국토 확장 등 정치·문화·과학에서 큰 업적을 남김.',
    significance: '조선 전기 문화의 황금기. 한글 창제는 동아시아 문자 역사상 매우 드문 사례.',
    color: 'bg-emerald-700',
  },
  {
    id: 'sejo',
    king: '세조·성종',
    start: 1455,
    end: 1494,
    highlights: ['계유정난(1453)', '직전법(1466)', '경국대전 완성(1485)', '집현전 폐지·홍문관 설치'],
    summary: '세조의 즉위 과정에는 정치적 갈등이 컸으나, 토지·법전 정비로 통치 제도가 완성됨.',
    significance: '경국대전 = 조선 통치 체제의 법적 완성. 약 500년간 큰 틀이 유지됨.',
    color: 'bg-blue-700',
  },
  {
    id: 'mid',
    king: '중종~선조',
    start: 1506,
    end: 1608,
    highlights: ['조광조 개혁·기묘사화(1519)', '4대 사화', '서원·향약 보급', '임진왜란(1592~1598)'],
    summary: '사림이 정계에 본격 등장하며 사화가 잇따름. 16세기 말 임진왜란으로 큰 피해를 입음.',
    significance: '전기에서 후기로의 분기점. 전쟁의 충격이 사회 변동의 시작점이 됨.',
    color: 'bg-purple-700',
  },
];

const CULTURE = [
  { area: '정치', detail: '의정부·6조, 사간원·사헌부·홍문관(3사), 과거제 정비. 신하들의 견제와 왕권의 균형.' },
  { area: '경제', detail: '과전법 → 직전법 → 관수관급제. 전세·역(군역·요역)이 농민의 큰 부담.' },
  { area: '사회', detail: '양천제(양인·천인). 양반·중인·상민·천민의 신분제. 향약·서원이 향촌 질서의 축.' },
  { area: '문화', detail: '훈민정음 반포, 동국통감·고려사 같은 역사 정리, 분청사기·백자 발달.' },
  { area: '과학', detail: '측우기·자격루·혼천의·간의 등 천문·관측 기구. 농사직설 같은 농업서.' },
];

export function JoseonEarlyExplorer() {
  const [active, setActive] = useState('sejong');
  const reign = REIGNS.find((r) => r.id === active)!;
  const minYear = 1390;
  const maxYear = 1610;
  const span = maxYear - minYear;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-1">조선 전기 — 왕대별 흐름</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          버튼을 눌러 왕대별 주요 사건을 살펴보세요. 색띠는 재위 기간이에요.
        </p>
      </div>

      <div className="space-y-2">
        {REIGNS.map((r) => {
          const left = ((r.start - minYear) / span) * 100;
          const width = ((r.end - r.start) / span) * 100;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setActive(r.id)}
              className={`w-full rounded-md border p-2 text-left text-xs transition ${
                active === r.id
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/30'
                  : 'border-zinc-200 dark:border-zinc-700 hover:border-orange-300'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold">{r.king}</span>
                <span className="text-zinc-500 dark:text-zinc-400">
                  {r.start}~{r.end}
                </span>
              </div>
              <div className="relative h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <div
                  className={`absolute top-0 h-full ${r.color}`}
                  style={{ left: `${left}%`, width: `${Math.max(width, 1.5)}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      <div className="rounded-xl bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-500 p-4 space-y-2">
        <div className="text-sm font-bold text-orange-800 dark:text-orange-300">
          {reign.king} ({reign.start}~{reign.end})
        </div>
        <p className="text-sm">{reign.summary}</p>
        <ul className="grid grid-cols-2 gap-1.5 text-xs">
          {reign.highlights.map((h) => (
            <li
              key={h}
              className="rounded-md bg-white dark:bg-zinc-900 px-2 py-1 text-zinc-700 dark:text-zinc-300"
            >
              · {h}
            </li>
          ))}
        </ul>
        <div className="rounded-md bg-yellow-50 dark:bg-yellow-950/20 px-3 py-2 text-xs text-yellow-800 dark:text-yellow-200">
          🪶 <strong>의의</strong> — {reign.significance}
        </div>
      </div>

      <div className="rounded-md border border-zinc-200 dark:border-zinc-700 p-3">
        <div className="text-xs font-bold mb-2 text-zinc-700 dark:text-zinc-300">조선 전기의 5개 영역</div>
        <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
          {CULTURE.map((c) => (
            <li key={c.area}>
              <strong className="text-orange-700 dark:text-orange-400">{c.area}</strong> — {c.detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
