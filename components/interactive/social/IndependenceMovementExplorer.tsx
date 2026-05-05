'use client';

// H-HI-07 일제 강점기·민족운동 — 1910~1945 독립운동의 갈래.
// 자체 정리. 정치적 평가는 학계 일반 합의 수준의 사실 위주.

import { useState } from 'react';

type Track = 'domestic' | 'overseas' | 'armed' | 'culture';

interface Movement {
  id: string;
  year: number;
  title: string;
  track: Track;
  region: string;
  summary: string;
  significance: string;
}

const MOVEMENTS: Movement[] = [
  {
    id: 'sinminhoe',
    year: 1907,
    title: '신민회 조직',
    track: 'domestic',
    region: '국내',
    summary: '안창호·양기탁 등이 주도한 비밀 결사. 교육·산업 활동을 통한 실력 양성을 추구.',
    significance: '국권 상실 직전 형성된 대표 비밀 결사. 105인 사건(1911)으로 와해.',
  },
  {
    id: 'march1',
    year: 1919,
    title: '3·1 운동',
    track: 'domestic',
    region: '한반도 전역',
    summary: '독립 선언서 발표 → 전국적 만세 시위. 약 2개월간 200만 명 이상 참가 추산.',
    significance: '전 민족이 참여한 평화 시위. 임시정부 수립과 새로운 독립운동 흐름의 출발점.',
  },
  {
    id: 'kpg',
    year: 1919,
    title: '대한민국 임시정부 수립',
    track: 'overseas',
    region: '상하이',
    summary: '3·1 운동 직후 상하이에 통합 임시정부 수립. 민주공화제 채택.',
    significance: '한국사 최초의 민주공화제 정부. 광복까지 독립운동의 구심점.',
  },
  {
    id: 'cheongsan',
    year: 1920,
    title: '청산리 전투',
    track: 'armed',
    region: '북간도',
    summary: '김좌진·홍범도 등이 이끄는 독립군이 일본군과의 전투에서 큰 승리.',
    significance: '독립군 활동의 대표 승전. 봉오동 전투(1920)와 함께 무장 독립운동의 정점.',
  },
  {
    id: 'singanhoe',
    year: 1927,
    title: '신간회 결성',
    track: 'domestic',
    region: '국내',
    summary: '민족주의·사회주의 진영의 합작 단체. 합법 운동·노동·농민 운동을 지원.',
    significance: '일제 강점기 최대 합법 민족 운동 단체. 1931년 해소.',
  },
  {
    id: 'gwangju',
    year: 1929,
    title: '광주 학생 항일 운동',
    track: 'domestic',
    region: '광주·전국',
    summary: '광주 학생들의 충돌 사건이 전국 학생 시위로 확산.',
    significance: '3·1 운동 이후 가장 큰 민족 운동. 학생층의 조직된 저항.',
  },
  {
    id: 'yun',
    year: 1932,
    title: '윤봉길 의거',
    track: 'overseas',
    region: '상하이',
    summary: '4월 29일 상하이 훙커우 공원에서 일본군 고위 인사들에게 폭탄 의거 단행.',
    significance: '한인 애국단 활동 정점. 임시정부에 대한 중국의 지원 강화 계기.',
  },
  {
    id: 'culture-movement',
    year: 1933,
    title: '한글 맞춤법 통일안',
    track: 'culture',
    region: '국내',
    summary: '조선어학회가 한글 맞춤법 통일안 발표. 우리말·역사·문학 연구 활성화.',
    significance: '문화적 저항. 1942년 조선어학회 사건으로 회원들이 검거됨.',
  },
  {
    id: 'kla',
    year: 1940,
    title: '한국광복군 창설',
    track: 'armed',
    region: '충칭',
    summary: '대한민국 임시정부의 정규군. 미군 OSS와 합작 훈련, 국내 진공 작전 준비.',
    significance: '임시정부의 군사력 정비. 광복 직전까지 활동.',
  },
  {
    id: 'liberation',
    year: 1945,
    title: '광복',
    track: 'domestic',
    region: '한반도',
    summary: '8월 15일 일본의 항복으로 35년간의 식민 지배에서 벗어남.',
    significance: '독립운동의 결실. 그러나 곧이어 분단의 출발점이 됨.',
  },
];

const TRACK_META: Record<Track, { label: string; color: string }> = {
  domestic: { label: '국내 운동', color: 'bg-blue-700' },
  overseas: { label: '국외·임시정부', color: 'bg-emerald-700' },
  armed: { label: '무장 독립운동', color: 'bg-rose-700' },
  culture: { label: '문화·교육 운동', color: 'bg-amber-700' },
};

export function IndependenceMovementExplorer() {
  const [filter, setFilter] = useState<Track | 'all'>('all');
  const [activeId, setActiveId] = useState('march1');
  const filtered = filter === 'all' ? MOVEMENTS : MOVEMENTS.filter((m) => m.track === filter);
  const active = MOVEMENTS.find((m) => m.id === activeId)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-1">독립운동의 4 갈래</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          독립운동은 한 가지 길로만 진행되지 않았어요. 갈래별로 골라서 보세요.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`rounded-full border px-3 py-1 text-xs ${
            filter === 'all'
              ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400'
              : 'border-zinc-300 dark:border-zinc-700'
          }`}
        >
          전체
        </button>
        {(Object.keys(TRACK_META) as Track[]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setFilter(k)}
            className={`rounded-full border px-3 py-1 text-xs ${
              filter === k
                ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400'
                : 'border-zinc-300 dark:border-zinc-700'
            }`}
          >
            <span className={`inline-block w-2 h-2 rounded-full ${TRACK_META[k].color} mr-1.5`} />
            {TRACK_META[k].label}
          </button>
        ))}
      </div>

      <div className="space-y-1.5">
        {filtered.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setActiveId(m.id)}
            className={`w-full flex items-center gap-3 rounded-md border p-2 text-left text-xs transition ${
              activeId === m.id
                ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/30'
                : 'border-zinc-200 dark:border-zinc-700 hover:border-orange-300'
            }`}
          >
            <span className="font-mono font-bold w-12 shrink-0">{m.year}</span>
            <span
              className={`inline-block w-2 h-2 rounded-full shrink-0 ${TRACK_META[m.track].color}`}
            />
            <span className="font-bold flex-1">{m.title}</span>
            <span className="text-zinc-500 dark:text-zinc-400 shrink-0">{m.region}</span>
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-500 p-4 space-y-2">
        <div className="text-sm font-bold text-orange-800 dark:text-orange-300">
          {active.year} · {active.title}
        </div>
        <p className="text-sm">{active.summary}</p>
        <div className="rounded-md bg-yellow-50 dark:bg-yellow-950/20 px-3 py-2 text-xs text-yellow-800 dark:text-yellow-200">
          🪶 <strong>의의</strong> — {active.significance}
        </div>
      </div>

      <div className="rounded-md bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-600 dark:text-zinc-400">
        🎯 4갈래는 한 사람·한 단체가 한 길만 걸었다는 뜻이 아니에요. 같은 인물이 시기에 따라 여러 갈래에서 활동하기도 했어요.
      </div>
    </div>
  );
}
