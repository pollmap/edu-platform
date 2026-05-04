'use client';

// H-IS1-03 자연환경과 인간 — 기후별 생활·환경 비교 시뮬레이터.

import { useState } from 'react';

interface ClimateZone {
  id: string;
  label: string;
  emoji: string;
  tempRange: string;
  rainfall: string;
  housing: string;
  food: string;
  clothing: string;
  challenges: string;
  examples: string;
}

const ZONES: ClimateZone[] = [
  {
    id: 'tropical',
    label: '열대',
    emoji: '🌴',
    tempRange: '연중 18°C 이상, 계절 차이 작음',
    rainfall: '연간 1500~3000mm, 스콜·우기 뚜렷',
    housing: '바닥을 띄운 고상 가옥, 통풍 큰 창, 가벼운 지붕 — 더위·습기·해충 대비.',
    food: '쌀·열대 과일 중심. 향신료를 많이 써서 부패를 늦춤.',
    clothing: '얇고 헐렁한 옷. 면·리넨 등 통기성 좋은 천연 소재.',
    challenges: '말라리아·뎅기열 등 풍토병, 폭우로 인한 홍수.',
    examples: '인도네시아·베트남 등 동남아시아, 아마존 분지.',
  },
  {
    id: 'arid',
    label: '건조',
    emoji: '🏜️',
    tempRange: '낮밤 일교차 매우 큼, 한여름 40°C+',
    rainfall: '연간 500mm 이하, 일부 사막은 거의 없음',
    housing: '두꺼운 흙벽·평평한 지붕·작은 창문 — 일교차 완충, 햇빛 차단.',
    food: '대추야자·양고기 등 건조에 강한 식재료. 수분 보존 중심 조리.',
    clothing: '온몸을 덮는 헐렁한 긴 옷 — 햇빛·모래 차단, 통풍 동시 확보.',
    challenges: '물 부족, 사막화, 갑작스런 모래폭풍.',
    examples: '사하라·아라비아·고비 등 사막 지역.',
  },
  {
    id: 'temperate',
    label: '온대',
    emoji: '🌳',
    tempRange: '사계절 뚜렷, 평균 10~15°C',
    rainfall: '연간 700~1500mm, 비교적 고른 분포',
    housing: '단열재 있는 벽, 큰 유리창, 경사 지붕 — 사계절 적응.',
    food: '곡물·채소·고기 골고루. 발효 식품(김치·치즈) 발달.',
    clothing: '계절별 변화. 여름 얇은 옷, 겨울 두꺼운 외투.',
    challenges: '계절 전이기 환절기 질환, 일부 지역의 미세먼지.',
    examples: '한국·일본·중국 동부, 유럽 중부, 미국 동부.',
  },
  {
    id: 'cold',
    label: '냉대',
    emoji: '🌲',
    tempRange: '겨울 -20°C 이하, 여름 짧고 시원',
    rainfall: '연간 500~700mm, 겨울 폭설',
    housing: '두꺼운 통나무·벽돌 벽, 가파른 지붕(눈 쏠림), 작은 창 — 보온 우선.',
    food: '감자·호밀 등 추위에 강한 작물, 절임·훈제 보존식.',
    clothing: '모피·울 등 두꺼운 보온 의류. 여러 겹 레이어드.',
    challenges: '동상·난방비, 짧은 농사 시즌, 영구 동토 일부.',
    examples: '시베리아·캐나다 북부·스칸디나비아 일부.',
  },
  {
    id: 'polar',
    label: '한대',
    emoji: '🧊',
    tempRange: '연중 0°C 이하, 빙설로 덮임',
    rainfall: '강수량 극히 적음 (사막 수준)',
    housing: '이글루(얼음 벽돌)·반지하 가옥 — 바람 막고 체온 보존.',
    food: '바다표범·물고기 등 동물성 식재료 중심. 식물 거의 없음.',
    clothing: '동물 가죽 + 모피. 두 겹 이상의 방한 구조.',
    challenges: '극도의 추위, 영양 다양성 부족, 백야·극야 적응.',
    examples: '북극권 이누이트 거주지, 남극 연구기지.',
  },
];

export function ClimateLifestyleSimulator() {
  const [active, setActive] = useState('tropical');
  const cur = ZONES.find((z) => z.id === active)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-1">기후별 생활 양식</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          기후가 다르면 <strong>집·옷·음식</strong>이 모두 달라져요. 5대 기후를 비교해 자연환경이 인간 생활에 미치는 영향을 보세요.
        </p>
      </div>

      <div className="grid grid-cols-5 gap-1">
        {ZONES.map((z) => (
          <button
            key={z.id}
            type="button"
            onClick={() => setActive(z.id)}
            className={`px-1 py-2 text-[11px] rounded-md border min-h-[60px] ${
              active === z.id
                ? 'bg-orange-50 dark:bg-orange-950/30 border-orange-500 ring-2 ring-orange-300 font-bold'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
            }`}
          >
            <div className="text-2xl">{z.emoji}</div>
            <div className="mt-0.5 leading-tight">{z.label}</div>
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-500 p-4 space-y-2">
        <div className="text-lg font-bold text-orange-800 dark:text-orange-300">
          {cur.emoji} {cur.label}
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-md bg-white dark:bg-zinc-900 px-3 py-2">
            <div className="text-zinc-500 dark:text-zinc-400">기온</div>
            <div className="font-semibold">{cur.tempRange}</div>
          </div>
          <div className="rounded-md bg-white dark:bg-zinc-900 px-3 py-2">
            <div className="text-zinc-500 dark:text-zinc-400">강수</div>
            <div className="font-semibold">{cur.rainfall}</div>
          </div>
        </div>
        <div className="space-y-1 text-xs text-zinc-700 dark:text-zinc-300">
          <div className="rounded-md bg-white dark:bg-zinc-900 px-3 py-2">
            🏠 <strong>주거</strong> — {cur.housing}
          </div>
          <div className="rounded-md bg-white dark:bg-zinc-900 px-3 py-2">
            🍚 <strong>음식</strong> — {cur.food}
          </div>
          <div className="rounded-md bg-white dark:bg-zinc-900 px-3 py-2">
            👘 <strong>의복</strong> — {cur.clothing}
          </div>
        </div>
        <div className="rounded-md bg-yellow-50 dark:bg-yellow-950/20 px-3 py-2 text-xs text-yellow-800 dark:text-yellow-200">
          ⚠️ <strong>주요 어려움</strong> — {cur.challenges}
        </div>
        <div className="text-[11px] text-zinc-500 dark:text-zinc-400">대표 지역: {cur.examples}</div>
      </div>

      <div className="rounded-md bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-600 dark:text-zinc-400">
        🎯 같은 인간이라도 자연환경에 적응하기 위한 해법은 비슷한 패턴(보온/통풍/식량 보존)을 보여요.
      </div>
    </div>
  );
}
