'use client';

// H-KH2-02 대한민국 발전 (경제) — 산업화·도시화 데이터.
// 출처: 통계청·한국은행 공개 데이터 기반 자체 정리. 추세 위주, 정확한 수치는 원본 확인 필요.

import { useState } from 'react';

interface DataPoint {
  year: number;
  gdp: number; // 1인당 GDP, USD (대략)
  urban: number; // 도시화율, %
  birth: number; // 합계출산율
  agriShare: number; // 농림어업/GDP, %
}

const POINTS: DataPoint[] = [
  { year: 1960, gdp: 80, urban: 28, birth: 6.0, agriShare: 37 },
  { year: 1970, gdp: 280, urban: 41, birth: 4.5, agriShare: 28 },
  { year: 1980, gdp: 1700, urban: 57, birth: 2.8, agriShare: 16 },
  { year: 1990, gdp: 6500, urban: 74, birth: 1.6, agriShare: 9 },
  { year: 2000, gdp: 12200, urban: 80, birth: 1.5, agriShare: 5 },
  { year: 2010, gdp: 23000, urban: 82, birth: 1.2, agriShare: 3 },
  { year: 2020, gdp: 31700, urban: 81, birth: 0.84, agriShare: 2 },
  { year: 2023, gdp: 33000, urban: 81, birth: 0.72, agriShare: 2 },
];

type Metric = 'gdp' | 'urban' | 'birth' | 'agriShare';

const METRICS: Record<Metric, { label: string; unit: string; color: string; describe: string; format: (v: number) => string }> = {
  gdp: { label: '1인당 GDP', unit: 'USD', color: 'bg-emerald-600', describe: '소득 수준의 대표 지표. 환율·물가 영향이 있어요.', format: (v) => `$${v.toLocaleString()}` },
  urban: { label: '도시화율', unit: '%', color: 'bg-blue-600', describe: '인구 중 도시 거주 비율. 1960년대 28% → 1990년대 70% 후반까지 급상승.', format: (v) => `${v}%` },
  birth: { label: '합계출산율', unit: '명', color: 'bg-rose-600', describe: '여성 1명이 평생 낳는 평균 자녀 수. 인구 대체 수준은 약 2.1명.', format: (v) => `${v}` },
  agriShare: { label: '1차 산업 비중', unit: '%', color: 'bg-amber-600', describe: '농림어업이 GDP에서 차지하는 비중. 산업 구조 변화의 단면.', format: (v) => `${v}%` },
};

export function IndustrializationDataExplorer() {
  const [metric, setMetric] = useState<Metric>('gdp');
  const [yearIdx, setYearIdx] = useState(POINTS.length - 1);

  const point = POINTS[yearIdx];
  const max = Math.max(...POINTS.map((p) => p[metric]));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 text-sm">
        {(Object.keys(METRICS) as Metric[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMetric(m)}
            className={`min-h-11 rounded-full px-4 py-2 font-semibold transition ${
              metric === m
                ? `${METRICS[m].color} text-white`
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            {METRICS[m].label}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="mb-3 text-sm text-zinc-700 dark:text-zinc-300">{METRICS[metric].describe}</p>

        <div className="mb-2 flex items-end gap-1 sm:gap-2" style={{ height: 200 }}>
          {POINTS.map((p, i) => {
            const h = (p[metric] / max) * 100;
            return (
              <button
                key={p.year}
                type="button"
                onClick={() => setYearIdx(i)}
                className="group flex flex-1 flex-col items-center"
                aria-label={`${p.year} ${METRICS[metric].format(p[metric])}`}
              >
                <div
                  className={`w-full rounded-t transition ${i === yearIdx ? METRICS[metric].color : `${METRICS[metric].color} opacity-50`}`}
                  style={{ height: `${h}%`, minHeight: 4 }}
                />
                <div className={`mt-1 text-xs ${i === yearIdx ? 'font-bold' : 'text-zinc-500 dark:text-zinc-400'}`}>
                  {p.year}
                </div>
              </button>
            );
          })}
        </div>

        <div className="rounded-md bg-zinc-50 p-3 text-sm dark:bg-zinc-800/50">
          <p className="mb-1 font-bold">
            {point.year}년 — {METRICS[metric].format(point[metric])}
          </p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            1인당 GDP {METRICS.gdp.format(point.gdp)} · 도시화 {point.urban}% · 출산율 {point.birth} · 1차산업 {point.agriShare}%
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900">
        <p className="mb-2 font-bold">한눈에 — 60년의 변화</p>
        <ul className="list-disc space-y-1 pl-5 text-zinc-700 dark:text-zinc-300">
          <li>1인당 GDP: $80(1960) → $33,000(2023) — 약 400배.</li>
          <li>도시화율: 28% → 81% — 농촌→도시 대이동.</li>
          <li>출산율: 6.0 → 0.7명대 — 세계 최저 수준.</li>
          <li>1차 산업 비중 37% → 2% — 농업 사회에서 서비스·제조 중심으로.</li>
        </ul>
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 수치는 통계청·KOSIS·한국은행 공개 데이터 기반의 대략적 근사예요. 정확한 값은 각 기관 원본을 확인하세요.
      </p>
    </div>
  );
}
