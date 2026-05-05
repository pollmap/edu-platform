'use client';

// S-SHC 과학의 역사와 문화 — 과학 패러다임 전환 타임라인.

import { useState } from 'react';

interface Event {
  year: number;
  era: 'ancient' | 'medieval' | 'scientific' | 'modern' | 'contemporary';
  title: string;
  who: string;
  why: string;
}

const EVENTS: Event[] = [
  { year: -300, era: 'ancient', title: '원자론·기하학', who: '데모크리토스·에우클레이데스', why: '물질을 「쪼갤 수 없는 알갱이」로 보고, 공간을 공리에서 추론.' },
  { year: 150, era: 'ancient', title: '천동설 정립', who: '프톨레마이오스 (알마게스트)', why: '주전원 체계로 행성 운동을 설명. 1400년간 표준.' },
  { year: 1543, era: 'scientific', title: '지동설', who: '코페르니쿠스', why: '태양 중심 모형. 종교·철학 충격.' },
  { year: 1687, era: 'scientific', title: '프린키피아', who: '뉴턴', why: '운동 3법칙·중력. 천체와 지구 운동을 하나의 수식으로.' },
  { year: 1859, era: 'modern', title: '종의 기원', who: '다윈', why: '자연선택 → 생물의 다양성을 설계자 없이 설명.' },
  { year: 1905, era: 'modern', title: '특수상대성·광전효과', who: '아인슈타인', why: '시간·공간이 절대가 아니라 관측자에 따라 휘어진다.' },
  { year: 1927, era: 'modern', title: '양자역학 정립', who: '하이젠베르크·슈뢰딩거', why: '관측이 결과를 결정. 결정론의 종말.' },
  { year: 1953, era: 'contemporary', title: 'DNA 이중나선', who: '왓슨·크릭·프랭클린', why: '유전이 화학구조에 「적혀」 있다.' },
  { year: 1964, era: 'contemporary', title: 'CMB 발견', who: '펜지어스·윌슨', why: '빅뱅 우주론의 결정적 증거.' },
  { year: 2012, era: 'contemporary', title: '힉스 보손 검출', who: 'CERN', why: '표준모형 마지막 조각. 질량의 기원.' },
  { year: 2020, era: 'contemporary', title: 'mRNA 백신', who: '카리코·바이스만', why: '유전정보로 직접 예방의학. 코로나 위기 대응.' },
];

const ERA_LABELS: Record<Event['era'], string> = {
  ancient: '고대',
  medieval: '중세',
  scientific: '과학혁명 (16~17세기)',
  modern: '근대 (19~20세기 초)',
  contemporary: '현대',
};

const ERA_COLORS: Record<Event['era'], string> = {
  ancient: '#a16207',
  medieval: '#92400e',
  scientific: '#1d4ed8',
  modern: '#16a34a',
  contemporary: '#dc2626',
};

export function UnitSSHCExplorer() {
  const [filter, setFilter] = useState<Event['era'] | 'all'>('all');
  const [selected, setSelected] = useState<Event | null>(EVENTS[5]);

  const visible = filter === 'all' ? EVENTS : EVENTS.filter((e) => e.era === filter);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          과학사 패러다임 타임라인
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          과학은 직선이 아니라 「큰 도약 + 긴 정체」의 반복. 각 사건이 왜 패러다임을 흔들었는지.
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-xs">
        {(['all', 'ancient', 'scientific', 'modern', 'contemporary'] as const).map((e) => (
          <button
            key={e}
            type="button"
            onClick={() => setFilter(e)}
            className={`min-h-[40px] rounded-lg px-2 ${
              filter === e
                ? 'bg-green-600 text-white font-semibold'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
            }`}
          >
            {e === 'all' ? '전체' : ERA_LABELS[e].split(' ')[0]}
          </button>
        ))}
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
        <svg viewBox="0 0 360 100" className="w-full h-auto" role="img" aria-label="타임라인">
          <line x1={20} y1={50} x2={340} y2={50} stroke="#9ca3af" strokeWidth={1.5} />
          {visible.map((ev) => {
            // -300 → 2026 mapped to 20 → 340
            const x = 20 + ((ev.year + 300) / 2326) * 320;
            const isSel = selected?.year === ev.year;
            return (
              <g key={ev.year} onClick={() => setSelected(ev)} style={{ cursor: 'pointer' }}>
                <circle cx={x} cy={50} r={isSel ? 7 : 4} fill={ERA_COLORS[ev.era]} stroke="#fff" strokeWidth={1.5} />
                {isSel && (
                  <text x={x} y={36} fontSize={9} textAnchor="middle" fill={ERA_COLORS[ev.era]} fontWeight={700}>
                    {ev.year > 0 ? ev.year : `BC ${-ev.year}`}
                  </text>
                )}
              </g>
            );
          })}
          <text x={20} y={75} fontSize={9} fill="#71717a">
            BC 300
          </text>
          <text x={340} y={75} fontSize={9} textAnchor="end" fill="#71717a">
            현재
          </text>
        </svg>
      </div>

      {selected && (
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 text-sm space-y-2">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-bold px-2 py-1 rounded"
              style={{ backgroundColor: ERA_COLORS[selected.era], color: '#fff' }}
            >
              {ERA_LABELS[selected.era]}
            </span>
            <span className="font-mono text-zinc-500 dark:text-zinc-400">
              {selected.year > 0 ? `${selected.year}년` : `BC ${-selected.year}년`}
            </span>
          </div>
          <div className="text-lg font-bold text-green-600 dark:text-green-400">{selected.title}</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">{selected.who}</div>
          <div>{selected.why}</div>
        </div>
      )}

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        쿤(T. Kuhn)은 「정상과학 → 위기 → 혁명 → 새 패러다임」 4단계로 정리. 천동설→지동설, 뉴턴→상대성, 결정론→양자역학.
      </p>
    </div>
  );
}
