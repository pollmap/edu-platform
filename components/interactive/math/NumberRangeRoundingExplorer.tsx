'use client';

// M5-NA-07 수의 범위와 어림하기 — 수직선 위 구간 강조 + 올림/버림/반올림 비교.

import { useMemo, useState } from 'react';

type Method = 'ceil' | 'floor' | 'round';
type Place = 10 | 100 | 1000;

const METHOD_LABEL: Record<Method, string> = {
  ceil: '올림',
  floor: '버림',
  round: '반올림',
};

const PLACE_LABEL: Record<Place, string> = {
  10: '십의 자리',
  100: '백의 자리',
  1000: '천의 자리',
};

function applyMethod(n: number, p: Place, m: Method): number {
  switch (m) {
    case 'ceil':
      return Math.ceil(n / p) * p;
    case 'floor':
      return Math.floor(n / p) * p;
    case 'round':
      return Math.round(n / p) * p;
  }
}

export function NumberRangeRoundingExplorer() {
  const [value, setValue] = useState(347);
  const [place, setPlace] = useState<Place>(10);
  const [method, setMethod] = useState<Method>('round');

  const result = useMemo(() => applyMethod(value, place, method), [value, place, method]);

  const lower = Math.floor(value / place) * place;
  const upper = lower + place;

  const W = 600;
  const H = 140;
  const margin = 40;
  const xOf = (n: number) => margin + ((n - lower) / (upper - lower)) * (W - margin * 2);

  const ticks: number[] = [];
  const tickStep = place / 10;
  for (let i = 0; i <= 10; i++) ticks.push(lower + i * tickStep);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          어림하기 — 올림 · 버림 · 반올림
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          수직선에서 <strong>{value}</strong> 가 <strong>{lower}</strong> 와 <strong>{upper}</strong> 사이 어디에 있는지 보고, {METHOD_LABEL[method]} 결과를 비교해 보세요.
        </p>
      </div>

      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[600px] mx-auto">
          <line x1={margin} y1={H / 2} x2={W - margin} y2={H / 2} stroke="#94a3b8" strokeWidth="2" />
          {ticks.map((t) => {
            const isMajor = t === lower || t === upper;
            const mid = lower + place / 2;
            const isMid = Math.abs(t - mid) < 0.5;
            return (
              <g key={t}>
                <line
                  x1={xOf(t)}
                  y1={H / 2 - (isMajor ? 10 : 5)}
                  x2={xOf(t)}
                  y2={H / 2 + (isMajor ? 10 : 5)}
                  stroke={isMid ? '#dc2626' : '#94a3b8'}
                  strokeWidth={isMajor || isMid ? 2 : 1}
                  strokeDasharray={isMid ? '3 2' : undefined}
                />
                {isMajor && (
                  <text x={xOf(t)} y={H / 2 + 28} textAnchor="middle" fontSize="12" fill="#1e293b" fontWeight="bold">
                    {t}
                  </text>
                )}
                {isMid && (
                  <text x={xOf(t)} y={H / 2 - 18} textAnchor="middle" fontSize="10" fill="#dc2626">
                    중간
                  </text>
                )}
              </g>
            );
          })}
          <circle cx={xOf(value)} cy={H / 2} r="7" fill="#2563eb" />
          <line
            x1={xOf(value)}
            y1={H / 2}
            x2={xOf(value)}
            y2={H / 2 - 38}
            stroke="#2563eb"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          <text
            x={xOf(value)}
            y={H / 2 - 44}
            textAnchor="middle"
            fontSize="13"
            fill="#2563eb"
            fontWeight="bold"
          >
            {value}
          </text>
          {result >= lower && result <= upper && (
            <g>
              <circle cx={xOf(result)} cy={H / 2} r="6" fill="#f59e0b" />
              <text
                x={xOf(result)}
                y={H / 2 + 50}
                textAnchor="middle"
                fontSize="13"
                fill="#d97706"
                fontWeight="bold"
              >
                → {result}
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg">
            <div className="flex justify-between mb-2 text-sm">
              <span className="font-bold text-blue-700 dark:text-blue-400">수</span>
              <span className="font-mono text-red-500 dark:text-red-400 font-semibold">{value}</span>
            </div>
            <input
              type="range"
              min={1}
              max={9999}
              step={1}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full h-3 cursor-pointer accent-blue-600"
              aria-label="수"
            />
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">자리</div>
            <div className="flex gap-2">
              {([10, 100, 1000] as Place[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlace(p)}
                  className={`flex-1 min-h-[44px] rounded-md border-2 text-xs font-semibold transition ${
                    place === p
                      ? 'bg-blue-600 text-white border-blue-700'
                      : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  {PLACE_LABEL[p]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">방법</div>
            <div className="flex gap-2">
              {(['ceil', 'floor', 'round'] as Method[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMethod(m)}
                  className={`flex-1 min-h-[44px] rounded-md border-2 text-sm font-semibold transition ${
                    method === m
                      ? 'bg-blue-600 text-white border-blue-700'
                      : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  {METHOD_LABEL[m]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-4">
        <div className="text-sm text-zinc-600 dark:text-zinc-400">결과</div>
        <div className="font-mono text-2xl text-zinc-900 dark:text-zinc-100 mt-0.5">
          {value}을(를) {PLACE_LABEL[place]}에서 {METHOD_LABEL[method]} ={' '}
          <span className="text-amber-700 dark:text-amber-300 font-bold">{result}</span>
        </div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
          이상 {lower} · 미만 {upper}: 이 구간 안의 모든 수가 같은 결과로 어림돼요.
        </div>
      </div>
    </div>
  );
}
