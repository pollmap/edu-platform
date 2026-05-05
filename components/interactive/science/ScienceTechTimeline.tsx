'use client';

// S9-EU-02 과학기술과 인류 문명 — 인류사 핵심 기술의 타임라인.
// 시기를 슬라이드하며 그 시점에 가능했던 기술을 시각화.

import { useMemo, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

interface TechMilestone {
  year: number; // 음수=BC, 양수=AD
  name: string;
  category: 'energy' | 'communication' | 'medicine' | 'transport' | 'compute';
  impact: string;
}

const MILESTONES: TechMilestone[] = [
  { year: -500000, name: '불의 사용', category: 'energy', impact: '요리·난방' },
  { year: -10000, name: '농업 시작', category: 'energy', impact: '정착·인구 증가' },
  { year: -3500, name: '바퀴 발명', category: 'transport', impact: '운송 혁명' },
  { year: -3000, name: '문자', category: 'communication', impact: '지식 누적' },
  { year: 105, name: '제지술', category: 'communication', impact: '지식 보급' },
  { year: 1450, name: '인쇄술 (구텐베르크)', category: 'communication', impact: '책 대량 생산' },
  { year: 1769, name: '증기기관', category: 'energy', impact: '산업혁명' },
  { year: 1796, name: '백신 (제너)', category: 'medicine', impact: '천연두 종식' },
  { year: 1879, name: '전구', category: 'energy', impact: '밤의 정복' },
  { year: 1885, name: '자동차 (벤츠)', category: 'transport', impact: '도시 확장' },
  { year: 1903, name: '비행기 (라이트 형제)', category: 'transport', impact: '하늘 길' },
  { year: 1928, name: '페니실린', category: 'medicine', impact: '항생제 시대' },
  { year: 1945, name: '핵에너지', category: 'energy', impact: '에너지·무기' },
  { year: 1947, name: '트랜지스터', category: 'compute', impact: '전자공학 혁명' },
  { year: 1953, name: 'DNA 이중나선', category: 'medicine', impact: '유전공학 시작' },
  { year: 1969, name: '아폴로 달 착륙', category: 'transport', impact: '우주 시대' },
  { year: 1969, name: '인터넷(ARPANET)', category: 'communication', impact: '네트워크' },
  { year: 1989, name: '월드와이드웹', category: 'communication', impact: '정보 폭발' },
  { year: 2007, name: '스마트폰 (아이폰)', category: 'compute', impact: '모바일' },
  { year: 2012, name: 'CRISPR 유전자 가위', category: 'medicine', impact: '유전 편집' },
  { year: 2017, name: 'AlphaGo', category: 'compute', impact: 'AI 임계점' },
  { year: 2022, name: 'ChatGPT', category: 'compute', impact: '범용 AI' },
];

const CAT_COLOR: Record<string, string> = {
  energy: '#f59e0b',
  communication: '#3b82f6',
  medicine: '#10b981',
  transport: '#a855f7',
  compute: '#ef4444',
};
const CAT_LABEL: Record<string, string> = {
  energy: '에너지',
  communication: '통신',
  medicine: '의학',
  transport: '교통',
  compute: '컴퓨팅',
};

function formatYear(y: number) {
  if (y < 0) return `BC ${Math.abs(y).toLocaleString()}`;
  return `AD ${y}`;
}

export function ScienceTechTimeline() {
  const [yearIdx, setYearIdx] = useState(MILESTONES.length - 1);
  const [filter, setFilter] = useState<string | null>(null);

  const visible = useMemo(() => {
    return MILESTONES.filter((m, i) => i <= yearIdx && (filter == null || m.category === filter));
  }, [yearIdx, filter]);

  const current = MILESTONES[yearIdx];

  return (
    <div className="space-y-4">
      <SliderRow
        label="시대"
        value={yearIdx}
        min={0}
        max={MILESTONES.length - 1}
        step={1}
        onChange={(v) => setYearIdx(Math.round(v))}
        format={(v) => formatYear(MILESTONES[Math.round(v)].year)}
      />

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter(null)}
          className={`px-2 py-1 rounded text-xs font-medium min-h-[36px] ${
            filter == null ? 'bg-zinc-700 text-white' : 'bg-zinc-200 dark:bg-zinc-700'
          }`}
        >
          전체
        </button>
        {Object.entries(CAT_LABEL).map(([k, v]) => (
          <button
            key={k}
            type="button"
            onClick={() => setFilter(k)}
            className={`px-2 py-1 rounded text-xs font-medium min-h-[36px] ${
              filter === k ? 'text-white' : 'bg-zinc-200 dark:bg-zinc-700'
            }`}
            style={filter === k ? { background: CAT_COLOR[k] } : undefined}
          >
            {v}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-700">
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">현재 시점: {formatYear(current.year)}</div>
        <div className="space-y-1.5 max-h-[280px] overflow-auto">
          {visible
            .slice()
            .reverse()
            .map((m, i) => (
              <div
                key={`${m.year}-${m.name}-${i}`}
                className="flex items-center gap-2 text-sm rounded p-1.5 bg-white/40 dark:bg-zinc-800/40"
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: CAT_COLOR[m.category] }}
                />
                <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400 w-20 flex-shrink-0">
                  {formatYear(m.year)}
                </span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100 flex-shrink-0">{m.name}</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate">— {m.impact}</span>
              </div>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 text-center">
        {Object.entries(CAT_LABEL).map(([k, v]) => {
          const count = MILESTONES.slice(0, yearIdx + 1).filter((m) => m.category === k).length;
          return (
            <div key={k} className="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-2">
              <div className="text-xs" style={{ color: CAT_COLOR[k] }}>
                {v}
              </div>
              <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{count}</div>
            </div>
          );
        })}
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        💡 인류 기술 진보는 「가속」해요. 불 발견부터 농업까지 49만 년, 농업부터 인쇄까지 1만 년, 인쇄부터 인터넷까지 540년, 인터넷부터 ChatGPT까지 53년.
        과학은 지식의 누적이 새로운 지식의 도구가 되어 기하급수로 자라요.
      </div>
    </div>
  );
}
