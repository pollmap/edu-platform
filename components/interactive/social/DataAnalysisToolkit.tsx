'use client';

// H-SP 사회문제 탐구 — 데이터 분석 툴 데모.
// 실생활 가상 데이터로 평균·중앙값·분산·상관 개념을 직관적으로 보여준다.

import { useMemo, useState } from 'react';

const DATASETS = [
  {
    id: 'income',
    label: '월 소득 분포 (가상)',
    data: [180, 200, 230, 250, 270, 300, 330, 380, 450, 600, 1500],
    unit: '만원',
    note: '실제 소득 분포는 일부 고소득층 때문에 평균이 중앙값보다 훨씬 큰 경향이 있어요.',
  },
  {
    id: 'study',
    label: '학습 시간 분포',
    data: [1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 6],
    unit: '시간',
    note: '비교적 대칭적이라 평균과 중앙값이 비슷해요.',
  },
  {
    id: 'commute',
    label: '통근 시간 분포',
    data: [10, 15, 20, 25, 30, 35, 40, 45, 60, 90, 120],
    unit: '분',
    note: '도시 통근 데이터는 보통 오른쪽 꼬리가 긴 분포(우측 편향).',
  },
];

function mean(arr: number[]) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}
function median(arr: number[]) {
  const s = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 === 0 ? (s[mid - 1] + s[mid]) / 2 : s[mid];
}
function stdev(arr: number[]) {
  const m = mean(arr);
  return Math.sqrt(arr.reduce((s, x) => s + (x - m) ** 2, 0) / arr.length);
}

export function DataAnalysisToolkit() {
  const [datasetId, setDatasetId] = useState(DATASETS[0].id);
  const ds = DATASETS.find((d) => d.id === datasetId) ?? DATASETS[0];

  const stats = useMemo(() => {
    const m = mean(ds.data);
    const med = median(ds.data);
    return {
      mean: m,
      median: med,
      stdev: stdev(ds.data),
      max: Math.max(...ds.data),
      min: Math.min(...ds.data),
      gap: m - med,
    };
  }, [ds]);

  const max = stats.max;

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/40">
        <p className="mb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">데이터셋 선택</p>
        <div className="flex flex-wrap gap-2">
          {DATASETS.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDatasetId(d.id)}
              className={`min-h-11 rounded-md px-3 py-2 text-sm font-medium transition ${
                datasetId === d.id
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="mb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">분포 (단위: {ds.unit})</p>
        <div className="flex items-end gap-1" style={{ height: 160 }}>
          {ds.data.map((v, i) => (
            <div key={i} className="flex flex-1 flex-col items-center">
              <div className="w-full rounded-t bg-orange-500" style={{ height: `${(v / max) * 100}%`, minHeight: 4 }} />
              <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-md border border-zinc-200 bg-white p-3 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">평균</div>
          <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{stats.mean.toFixed(1)}</div>
        </div>
        <div className="rounded-md border border-zinc-200 bg-white p-3 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">중앙값</div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{stats.median.toFixed(1)}</div>
        </div>
        <div className="rounded-md border border-zinc-200 bg-white p-3 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">표준편차</div>
          <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{stats.stdev.toFixed(1)}</div>
        </div>
        <div className="rounded-md border border-zinc-200 bg-white p-3 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">최댓값-최솟값</div>
          <div className="text-lg font-bold text-rose-600 dark:text-rose-400">
            {stats.max} / {stats.min}
          </div>
        </div>
      </div>

      <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm dark:border-amber-900 dark:bg-amber-950/30">
        <strong className="text-amber-700 dark:text-amber-300">평균 - 중앙값 차이 </strong>
        {stats.gap.toFixed(1)} ({ds.unit}) — 차이가 클수록 분포가 한쪽으로 쏠려 있어요.
        <br />
        <span className="text-zinc-700 dark:text-zinc-300">{ds.note}</span>
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 사회문제를 다룰 때 「평균만 보면 함정에 빠지기 쉬워요」. 중앙값·분산·이상치까지 같이 보세요.
      </p>
    </div>
  );
}
