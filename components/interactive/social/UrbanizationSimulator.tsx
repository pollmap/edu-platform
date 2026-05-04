'use client';

// H-IS1-04 생활공간과 사회 — 도시화·정보화 단계 시뮬레이터.

import { useState } from 'react';

interface Stage {
  id: string;
  label: string;
  era: string;
  urbanRate: string;
  benefits: string[];
  problems: string[];
  signal: string;
}

const STAGES: Stage[] = [
  {
    id: 'agri',
    label: '농경 사회',
    era: '~ 19세기 초',
    urbanRate: '5~15%',
    benefits: ['공동체 강함', '자연과 가까움', '계절 리듬'],
    problems: ['생산력 한계', '재해 취약', '교육·의료 접근성 낮음'],
    signal: '인구 대부분이 농사·어업·수공업에 종사. 도시는 행정·시장 중심지 정도.',
  },
  {
    id: 'industrial',
    label: '산업화 초기',
    era: '19~20세기 중반',
    urbanRate: '20~50%',
    benefits: ['일자리 증가', '소득 상승', '대중 교육 확대'],
    problems: ['도시 빈민가', '환경 오염', '장시간 노동', '주거 부족'],
    signal: '농촌 → 도시로의 대이동(이촌향도). 공장·철도 중심 도시 형성.',
  },
  {
    id: 'mature',
    label: '도시화 성숙',
    era: '20세기 후반',
    urbanRate: '60~80%',
    benefits: ['서비스업 발달', '인프라 완비', '문화 다양성'],
    problems: ['교통 혼잡', '주택 가격 상승', '도시 격차', '도시-농촌 격차'],
    signal: '인구 다수가 도시 거주. 신도시·위성도시·수도권 집중 현상.',
  },
  {
    id: 'info',
    label: '정보화 사회',
    era: '21세기 초~',
    urbanRate: '80%+',
    benefits: ['원격 근무', '정보 접근 평등화', '플랫폼 경제'],
    problems: ['디지털 격차', '개인정보 위험', '플랫폼 노동 불안정', '필터버블'],
    signal: '인터넷·스마트폰이 일상의 기반. 일부 일자리는 위치와 무관해짐.',
  },
  {
    id: 'smart',
    label: '스마트·녹색 도시',
    era: '진행 중',
    urbanRate: '재구성',
    benefits: ['에너지 효율', '데이터 기반 행정', '15분 생활권'],
    problems: ['감시 사회 우려', '소외 계층 배제', '인프라 비용', '데이터 독점'],
    signal: '도시 자체가 데이터를 수집·분석. 기후 위기 대응형 인프라가 새 기준.',
  },
];

export function UrbanizationSimulator() {
  const [idx, setIdx] = useState(2);
  const cur = STAGES[idx];

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-1">도시화·정보화 단계</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          농경사회 → 산업화 → 도시화 성숙 → 정보화 → 스마트 도시. 각 단계마다 <strong>혜택과 문제</strong>가 함께 와요.
        </p>
      </div>

      <div>
        <input
          type="range"
          min={0}
          max={STAGES.length - 1}
          value={idx}
          onChange={(e) => setIdx(Number(e.target.value))}
          className="w-full h-3 accent-orange-500"
          aria-label="발전 단계 슬라이더"
        />
        <div className="mt-2 grid grid-cols-5 gap-1 text-[10px] text-zinc-500 dark:text-zinc-400 text-center">
          {STAGES.map((s) => (
            <div key={s.id} className="leading-tight">
              {s.label}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-500 p-4 space-y-3">
        <div>
          <div className="text-lg font-bold text-orange-800 dark:text-orange-300">{cur.label}</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            {cur.era} · 도시화율 {cur.urbanRate}
          </div>
        </div>
        <div className="rounded-md bg-white dark:bg-zinc-900 px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300">
          📍 <strong>특징</strong> — {cur.signal}
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-md bg-green-50 dark:bg-green-950/20 px-3 py-2">
            <div className="text-green-700 dark:text-green-300 font-semibold mb-1">혜택</div>
            <ul className="space-y-0.5 text-green-700 dark:text-green-300">
              {cur.benefits.map((b) => (
                <li key={b}>+ {b}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-md bg-orange-50 dark:bg-orange-950/20 px-3 py-2">
            <div className="text-orange-700 dark:text-orange-300 font-semibold mb-1">과제</div>
            <ul className="space-y-0.5 text-orange-700 dark:text-orange-300">
              {cur.problems.map((p) => (
                <li key={p}>− {p}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-md bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-600 dark:text-zinc-400">
        🎯 어떤 단계도 "완전한 진보"는 아니에요. 새 기술이 들어올 때마다 새 기회와 새 문제가 함께 만들어져요.
      </div>
    </div>
  );
}
