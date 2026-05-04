'use client';

// H-IS2-04 미래와 지속가능 — UN SDGs 17목표 5영역 그룹.

import { useState } from 'react';

interface Goal {
  id: number;
  label: string;
  group: string;
  brief: string;
}

const GOALS: Goal[] = [
  { id: 1, label: '빈곤 종식', group: 'people', brief: '모든 형태의 빈곤을 모든 곳에서 종식시킴.' },
  { id: 2, label: '기아 해소', group: 'people', brief: '기아 종식, 식량 안보, 영양 개선, 지속가능한 농업.' },
  { id: 3, label: '건강과 복지', group: 'people', brief: '모든 연령의 건강한 삶 보장, 복지 증진.' },
  { id: 4, label: '양질의 교육', group: 'people', brief: '포용적·공평한 양질의 교육 보장, 평생 학습 기회.' },
  { id: 5, label: '성평등', group: 'people', brief: '성평등 달성, 모든 여성·여아의 역량 강화.' },
  { id: 6, label: '깨끗한 물', group: 'planet', brief: '모두에게 안전한 물과 위생을 지속가능하게.' },
  { id: 13, label: '기후 행동', group: 'planet', brief: '기후 변화와 그 영향을 막기 위한 긴급 조치.' },
  { id: 14, label: '해양 생태', group: 'planet', brief: '해양·해양 자원 보존과 지속 가능한 이용.' },
  { id: 15, label: '육상 생태', group: 'planet', brief: '육상 생태계·산림 보호, 사막화 방지, 생물다양성.' },
  { id: 7, label: '깨끗한 에너지', group: 'prosperity', brief: '모두를 위한 적정 가격의 깨끗한 에너지.' },
  { id: 8, label: '양질의 일자리', group: 'prosperity', brief: '지속가능한 경제 성장, 양질의 일자리.' },
  { id: 9, label: '산업 혁신', group: 'prosperity', brief: '회복력 있는 인프라, 포용적·지속가능한 산업화.' },
  { id: 10, label: '불평등 감소', group: 'prosperity', brief: '국가 내·국가 간 불평등 감소.' },
  { id: 11, label: '지속가능 도시', group: 'prosperity', brief: '포용적·안전·회복력 있는 지속가능한 도시.' },
  { id: 12, label: '책임 있는 소비', group: 'prosperity', brief: '지속가능한 소비·생산 양식 확립.' },
  { id: 16, label: '평화·정의', group: 'peace', brief: '평화롭고 포용적인 사회, 정의에 대한 접근.' },
  { id: 17, label: '파트너십', group: 'partnership', brief: '글로벌 파트너십 활성화, 이행 수단 강화.' },
];

const GROUPS = [
  { id: 'people', label: 'People (사람)', color: 'rose' },
  { id: 'planet', label: 'Planet (지구)', color: 'green' },
  { id: 'prosperity', label: 'Prosperity (번영)', color: 'amber' },
  { id: 'peace', label: 'Peace (평화)', color: 'blue' },
  { id: 'partnership', label: 'Partnership (협력)', color: 'purple' },
];

export function SDGsExplorer() {
  const [activeGroup, setActiveGroup] = useState('people');
  const filtered = GOALS.filter((g) => g.group === activeGroup);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-1">UN 지속가능발전목표(SDGs)</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          2015년 UN이 채택한 17가지 목표는 흔히 <strong>5P (People·Planet·Prosperity·Peace·Partnership)</strong>로 묶여요.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
        {GROUPS.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setActiveGroup(g.id)}
            className={`px-2 py-2 text-xs rounded-md border min-h-[44px] ${
              activeGroup === g.id
                ? 'bg-orange-50 dark:bg-orange-950/30 border-orange-500 ring-2 ring-orange-300 font-bold'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
            }`}
          >
            <div className="leading-tight">{g.label}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-2">
        {filtered.map((g) => (
          <div
            key={g.id}
            className="rounded-md border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950/20 px-3 py-2 text-xs"
          >
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-orange-600 text-white font-bold w-7 h-7 flex items-center justify-center text-xs">
                {g.id}
              </div>
              <div className="font-semibold text-zinc-800 dark:text-zinc-200">{g.label}</div>
            </div>
            <div className="mt-1 text-zinc-700 dark:text-zinc-300">{g.brief}</div>
          </div>
        ))}
      </div>

      <div className="rounded-md bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-600 dark:text-zinc-400">
        🎯 SDGs는 서로 얽혀 있어요. 빈곤 해소(1)는 교육(4)·건강(3)·일자리(8) 없이 어렵고, 기후 행동(13)은 에너지(7)·도시(11)와 직결돼요.
      </div>
    </div>
  );
}
