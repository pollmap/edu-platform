'use client';

// S-EAR-04 지구의 역사 — 46억년 지질연대표 + 주요 사건·화석 표지.
// 시대 클릭 시 대표 생물·환경·사건이 표시되는 인터랙티브.

import { useMemo, useState } from 'react';

interface Era {
  id: string;
  name: string;
  startMa: number; // 백만년 전
  endMa: number;
  color: string;
  icon: string;
  events: string[];
}

const ERAS: Era[] = [
  {
    id: 'hadean',
    name: '명왕누대 (Hadean)',
    startMa: 4600,
    endMa: 4000,
    color: '#7c2d12',
    icon: '🔥',
    events: ['지구 형성 4.6 Ga', '달 형성 (거대 충돌설)', '대기·바다 형성 시작', '생물 흔적 없음'],
  },
  {
    id: 'archean',
    name: '시생누대 (Archean)',
    startMa: 4000,
    endMa: 2500,
    color: '#9a3412',
    icon: '🦠',
    events: ['최초 원핵생물 (3.5 Ga)', '시아노박테리아 광합성 시작', '스트로마톨라이트', '지각 안정화'],
  },
  {
    id: 'proterozoic',
    name: '원생누대 (Proterozoic)',
    startMa: 2500,
    endMa: 541,
    color: '#a16207',
    icon: '🧬',
    events: ['대산소화 사건 2.4 Ga', '진핵생물 출현', '눈덩이 지구', '에디아카라 동물군 (635 Ma)'],
  },
  {
    id: 'paleozoic',
    name: '고생대 (Paleozoic)',
    startMa: 541,
    endMa: 252,
    color: '#16a34a',
    icon: '🐟',
    events: [
      '캄브리아기 대폭발 — 다세포 동물 폭증',
      '어류·양서류·파충류 출현',
      '석탄기 거대 양치식물·곤충',
      'P-Tr 대멸종 (252 Ma) — 95% 종 멸종',
    ],
  },
  {
    id: 'mesozoic',
    name: '중생대 (Mesozoic)',
    startMa: 252,
    endMa: 66,
    color: '#0891b2',
    icon: '🦕',
    events: [
      '공룡 시대 — 트라이아스기·쥐라기·백악기',
      '겉씨식물 → 속씨식물 등장',
      '암모나이트 번성',
      'K-Pg 대멸종 (66 Ma) — 소행성 충돌설',
    ],
  },
  {
    id: 'cenozoic',
    name: '신생대 (Cenozoic)',
    startMa: 66,
    endMa: 0,
    color: '#9333ea',
    icon: '🐘',
    events: ['포유류 시대', '히말라야·알프스 융기', '빙하기 4회 (제4기)', '인류 (호모 사피엔스 0.3 Ma)'],
  },
];

const TOTAL_MA = 4600;

export function GeologicTimescaleExplorer() {
  const [activeEraId, setActiveEraId] = useState('cenozoic');
  const [showLog, setShowLog] = useState(false); // 로그 스케일 (최근 시대 강조)

  const activeEra = useMemo(() => ERAS.find((e) => e.id === activeEraId)!, [activeEraId]);

  const totalLogified = useMemo(() => {
    if (!showLog) return TOTAL_MA;
    return Math.log10(TOTAL_MA + 1);
  }, [showLog]);

  function widthForEra(era: Era): number {
    if (!showLog) {
      return ((era.startMa - era.endMa) / TOTAL_MA) * 100;
    }
    const lStart = Math.log10(era.startMa + 1);
    const lEnd = Math.log10(era.endMa + 1);
    return ((lStart - lEnd) / totalLogified) * 100;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <button
          type="button"
          onClick={() => setShowLog((v) => !v)}
          className={`px-3 py-2 rounded-lg text-sm font-medium min-h-[44px] ${
            showLog ? 'bg-purple-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
          }`}
        >
          {showLog ? '📐 로그 스케일 (최근 강조)' : '📏 선형 스케일 (실제 비율)'}
        </button>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          전체 46억년 = {showLog ? '비선형 압축' : '실제 비율'}
        </div>
      </div>

      {/* 연대표 막대 */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
        <div className="flex h-16">
          {ERAS.map((era) => {
            const width = widthForEra(era);
            const isActive = era.id === activeEraId;
            return (
              <button
                key={era.id}
                type="button"
                onClick={() => setActiveEraId(era.id)}
                className={`relative transition-all flex-shrink-0 ${
                  isActive ? 'ring-4 ring-yellow-400 z-10' : 'hover:opacity-80'
                }`}
                style={{
                  width: `${width}%`,
                  background: era.color,
                  minWidth: width < 1.5 ? '24px' : undefined,
                }}
                aria-label={era.name}
              >
                <span className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <span className="text-lg">{era.icon}</span>
                  {width > 8 && <span className="text-[9px] font-bold">{era.name.split(' ')[0]}</span>}
                </span>
              </button>
            );
          })}
        </div>
        <div className="flex text-[10px] text-zinc-500 dark:text-zinc-400 px-2 py-1 justify-between">
          <span>4,600 Ma</span>
          <span>현재 0 Ma</span>
        </div>
      </div>

      {/* 활성 시대 상세 */}
      <div
        className="rounded-xl p-4 border-2"
        style={{
          background: `${activeEra.color}15`,
          borderColor: activeEra.color,
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{activeEra.icon}</span>
          <div>
            <div className="font-bold text-lg" style={{ color: activeEra.color }}>
              {activeEra.name}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              {activeEra.startMa.toLocaleString()} ~ {activeEra.endMa.toLocaleString()} Ma · 지속 {(activeEra.startMa - activeEra.endMa).toLocaleString()}백만년
            </div>
          </div>
        </div>
        <ul className="space-y-1 text-sm">
          {activeEra.events.map((ev, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-zinc-400">•</span>
              <span className="text-zinc-700 dark:text-zinc-300">{ev}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        💡 인류 역사(호모 사피엔스 30만년)는 지구 46억년의 0.0065% — 지질연대표 막대에서 머리카락 한 가닥보다 얇아요.
        지층 누중·관입 관계·표준화석 같은 상대 연대법과 방사성 동위원소(반감기) 절대 연대법으로 나이를 매겨요.
      </div>
    </div>
  );
}
