'use client';

// H-KH2-01 대한민국 발전 (정치) — 정부수립~민주화.
// 자체 정리. 정치적 평가는 학계 일반 합의 수준에서 중립.

import { useState } from 'react';

interface Era {
  id: string;
  label: string;
  start: number;
  end: number;
  president: string;
  summary: string;
  highlights: string[];
  significance: string;
  color: string;
}

const ERAS: Era[] = [
  {
    id: 'founding',
    label: '정부 수립~제1공화국',
    start: 1948,
    end: 1960,
    president: '이승만',
    summary: '5·10 총선 → 헌법 제정 → 정부 수립(1948.8.15). 한국전쟁(1950~53) → 휴전.',
    highlights: ['제헌 헌법(1948)', '한국전쟁(1950~53)', '발췌 개헌·사사오입 개헌', '4·19 혁명(1960) → 이승만 하야'],
    significance: '대한민국 건국과 분단 고착. 권위주의의 첫 제도화와 학생·시민 저항의 시작.',
    color: 'bg-blue-700',
  },
  {
    id: 'short-democracy',
    label: '제2공화국',
    start: 1960,
    end: 1961,
    president: '윤보선·장면',
    summary: '내각책임제 도입. 짧은 의회 민주주의 실험.',
    highlights: ['양원제 국회', '시민·학생 운동 활성화', '경제 개발 계획 수립 단계'],
    significance: '민주주의 제도 실험기. 5·16 군사정변(1961)으로 단명.',
    color: 'bg-emerald-700',
  },
  {
    id: 'park',
    label: '제3·4공화국',
    start: 1961,
    end: 1979,
    president: '박정희',
    summary: '5·16 군사정변 → 1963 민정 이양 → 1972 유신 체제. 경제 5개년 계획·중화학공업화.',
    highlights: ['경제 5개년 계획 (1962~)', '한일협정(1965)', '경부고속도로(1970)', '유신 헌법(1972)', '10·26 사건(1979)'],
    significance: '고도성장의 토대. 동시에 정치적 자유·언론·노동권의 강한 제약.',
    color: 'bg-amber-700',
  },
  {
    id: 'chun',
    label: '제5공화국',
    start: 1980,
    end: 1988,
    president: '전두환',
    summary: '12·12 군사반란 → 5·18 광주민주화운동 진압 → 신군부 집권. 단임 7년제 헌법.',
    highlights: ['5·18 광주민주화운동(1980)', '6월 민주항쟁(1987)', '6·29 선언 — 직선제 수용', '서울 올림픽 준비'],
    significance: '권위주의의 마지막 시기. 6월 항쟁이 직선제 개헌으로 이어지며 민주화의 분기점.',
    color: 'bg-rose-700',
  },
  {
    id: 'democratization',
    label: '제6공화국 (민주화 이후)',
    start: 1988,
    end: 2025,
    president: '노태우~현재',
    summary: '대통령 직선제 정착(5년 단임). 평화적 정권교체가 여러 차례 이뤄짐.',
    highlights: ['1992 김영삼·1997 김대중 — 평화적 정권교체', '1997 외환위기·구제금융', '2000 남북정상회담', '2017 헌법재판소 대통령 탄핵 결정', '디지털 경제·K-콘텐츠 성장'],
    significance: '권위주의에서 절차적 민주주의로 안착. 동시에 양극화·지역 갈등 등 새로운 과제 대두.',
    color: 'bg-purple-700',
  },
];

export function PostwarKoreaTimeline() {
  const [eraId, setEraId] = useState(ERAS[0].id);
  const era = ERAS.find((e) => e.id === eraId) ?? ERAS[0];

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="mb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">시기 선택 (1948~현재)</p>
        <div className="flex flex-wrap gap-2">
          {ERAS.map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => setEraId(e.id)}
              className={`min-h-11 rounded-md px-3 py-2 text-left text-sm transition ${
                eraId === e.id
                  ? 'bg-orange-600 text-white'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              <div className="font-bold">{e.label}</div>
              <div className={`text-xs ${eraId === e.id ? 'text-orange-100' : 'text-zinc-500 dark:text-zinc-400'}`}>
                {e.start}~{e.end === 2025 ? '현재' : e.end}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className={`mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold text-white ${era.color}`}>
          {era.president}
        </div>
        <h3 className="mb-2 text-lg font-bold">{era.label}</h3>
        <p className="mb-3 text-sm text-zinc-700 dark:text-zinc-300">{era.summary}</p>
        <div className="mb-3">
          <p className="mb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">주요 사건</p>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {era.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-md bg-orange-50 p-3 text-sm dark:bg-orange-950/30">
          <strong className="text-orange-700 dark:text-orange-300">의의 </strong>
          {era.significance}
        </div>
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 정권에 대한 평가는 정치적 입장에 따라 차이가 있어요. 이 자료는 학계 일반 합의 수준에서 핵심 사실만 정리했어요.
      </p>
    </div>
  );
}
