'use client';

// M-EM-05 통계와 경제 — 시계열 경제지표 시각화 (회귀선·증가율).

import { useMemo, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';

interface Series { id: string; label: string; unit: string; data: { x: number; y: number }[]; }

// 자체 작성 모의 데이터 (저작권 안전, 실제 KOSIS 수치 아님)
const SERIES: Series[] = [
  {
    id: 'gdp',
    label: '실질 GDP (가상)',
    unit: '조원',
    data: [
      { x: 2014, y: 1486 }, { x: 2015, y: 1521 }, { x: 2016, y: 1559 },
      { x: 2017, y: 1611 }, { x: 2018, y: 1655 }, { x: 2019, y: 1690 },
      { x: 2020, y: 1681 }, { x: 2021, y: 1746 }, { x: 2022, y: 1791 }, { x: 2023, y: 1816 },
    ],
  },
  {
    id: 'cpi',
    label: '소비자물가지수 (2020=100, 가상)',
    unit: '',
    data: [
      { x: 2014, y: 89.6 }, { x: 2015, y: 90.2 }, { x: 2016, y: 91.1 },
      { x: 2017, y: 93.0 }, { x: 2018, y: 94.4 }, { x: 2019, y: 94.9 },
      { x: 2020, y: 100 }, { x: 2021, y: 102.5 }, { x: 2022, y: 107.7 }, { x: 2023, y: 111.6 },
    ],
  },
  {
    id: 'unemp',
    label: '실업률 (가상)',
    unit: '%',
    data: [
      { x: 2014, y: 3.5 }, { x: 2015, y: 3.6 }, { x: 2016, y: 3.7 },
      { x: 2017, y: 3.7 }, { x: 2018, y: 3.8 }, { x: 2019, y: 3.8 },
      { x: 2020, y: 4.0 }, { x: 2021, y: 3.7 }, { x: 2022, y: 2.9 }, { x: 2023, y: 2.7 },
    ],
  },
];

export function KosisDataExplorer() {
  const [seriesId, setSeriesId] = useState<string>('gdp');
  const series = SERIES.find((s) => s.id === seriesId) ?? SERIES[0];

  const stats = useMemo(() => {
    const xs = series.data.map((d) => d.x);
    const ys = series.data.map((d) => d.y);
    const n = xs.length;
    const meanX = xs.reduce((a, b) => a + b, 0) / n;
    const meanY = ys.reduce((a, b) => a + b, 0) / n;
    let sxx = 0;
    let sxy = 0;
    for (let i = 0; i < n; i++) {
      sxx += (xs[i] - meanX) ** 2;
      sxy += (xs[i] - meanX) * (ys[i] - meanY);
    }
    const slope = sxx !== 0 ? sxy / sxx : 0;
    const intercept = meanY - slope * meanX;
    const yoy = ys.map((y, i) => (i === 0 ? null : ((y - ys[i - 1]) / ys[i - 1]) * 100));
    const cagr = ys[0] !== 0 ? (Math.pow(ys[n - 1] / ys[0], 1 / (n - 1)) - 1) * 100 : 0;
    return { slope, intercept, yoy, cagr, meanX, meanY };
  }, [series]);

  const W = 480;
  const H = 220;
  const padL = 50;
  const padR = 10;
  const padT = 10;
  const padB = 30;
  const xMin = Math.min(...series.data.map((d) => d.x));
  const xMax = Math.max(...series.data.map((d) => d.x));
  const yMin = Math.min(...series.data.map((d) => d.y));
  const yMax = Math.max(...series.data.map((d) => d.y));
  const yPad = (yMax - yMin) * 0.1;
  const xToPix = (x: number): number => padL + ((x - xMin) / Math.max(xMax - xMin, 1)) * (W - padL - padR);
  const yToPix = (y: number): number => padT + (1 - (y - yMin + yPad) / (yMax - yMin + yPad * 2)) * (H - padT - padB);

  const linePath = series.data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xToPix(d.x).toFixed(1)} ${yToPix(d.y).toFixed(1)}`).join(' ');
  const fitStart = stats.slope * xMin + stats.intercept;
  const fitEnd = stats.slope * xMax + stats.intercept;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          시계열 데이터 — 흩어진 점에서 추세를 뽑아내는 「최소제곱법」
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          GDP·물가·실업률 같은 경제지표는 시간 따라 변하는 시계열 데이터예요. 점들 사이를 「오차 제곱의 합」이 가장 작아지도록
          뚫는 직선이 회귀선이고, 그 기울기가 곧 「연 평균 변화량」이에요. 데이터는 자체 작성한 가상치예요.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {SERIES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSeriesId(s.id)}
            className={`min-h-[44px] px-3 rounded-md text-sm border-2 ${
              seriesId === s.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold'
                : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="#94a3b8" />
          <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="#94a3b8" />
          <line x1={xToPix(xMin)} y1={yToPix(fitStart)} x2={xToPix(xMax)} y2={yToPix(fitEnd)} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 3" />
          <path d={linePath} fill="none" stroke="#2563eb" strokeWidth="2" />
          {series.data.map((d) => (
            <circle key={d.x} cx={xToPix(d.x)} cy={yToPix(d.y)} r="3" fill="#2563eb" />
          ))}
          {[xMin, Math.round((xMin + xMax) / 2), xMax].map((x) => (
            <text key={x} x={xToPix(x)} y={H - padB + 14} textAnchor="middle" fontSize="9" fontFamily="monospace" className="fill-zinc-600 dark:fill-zinc-400">{x}</text>
          ))}
          <text x={padL - 4} y={yToPix(yMax)} textAnchor="end" fontSize="9" fontFamily="monospace" className="fill-zinc-600 dark:fill-zinc-400">{yMax.toFixed(1)}</text>
          <text x={padL - 4} y={yToPix(yMin)} textAnchor="end" fontSize="9" fontFamily="monospace" className="fill-zinc-600 dark:fill-zinc-400">{yMin.toFixed(1)}</text>
        </svg>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-4 text-center text-xs">
        <MathFormula tex={`y = ${stats.slope.toFixed(2)}x + ${stats.intercept.toFixed(1)}`} />
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="rounded bg-zinc-50 dark:bg-zinc-950/40 p-3 text-center">
          <div className="text-xs text-zinc-500">평균</div>
          <div className="font-mono">{stats.meanY.toFixed(2)} {series.unit}</div>
        </div>
        <div className="rounded bg-blue-50 dark:bg-blue-950/30 p-3 text-center">
          <div className="text-xs text-blue-700 dark:text-blue-300">연평균 변화</div>
          <div className="font-mono">{stats.slope.toFixed(2)} {series.unit}/년</div>
        </div>
        <div className="rounded bg-green-50 dark:bg-green-950/30 p-3 text-center">
          <div className="text-xs text-green-700 dark:text-green-300">CAGR</div>
          <div className="font-mono">{stats.cagr.toFixed(2)}%</div>
        </div>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3 overflow-x-auto">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="border-b border-zinc-300 dark:border-zinc-700">
              <th className="text-left px-2 py-1 text-zinc-500">연도</th>
              <th className="text-right px-2 py-1 text-zinc-500">값</th>
              <th className="text-right px-2 py-1 text-zinc-500">전년대비</th>
            </tr>
          </thead>
          <tbody>
            {series.data.map((d, i) => (
              <tr key={d.x} className="border-b border-zinc-200 dark:border-zinc-800">
                <td className="px-2 py-1 font-bold">{d.x}</td>
                <td className="text-right px-2 py-1">{d.y.toFixed(2)} {series.unit}</td>
                <td className="text-right px-2 py-1">
                  {stats.yoy[i] === null ? '—' : (
                    <span className={(stats.yoy[i] ?? 0) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                      {((stats.yoy[i] ?? 0) >= 0 ? '+' : '')}{(stats.yoy[i] ?? 0).toFixed(2)}%
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
