'use client';

// M9-NA-01 제곱근과 실수 — 수직선 위 무리수 작도.

import { useMemo, useState } from 'react';

const PRESETS = [2, 3, 5, 6, 7, 8, 10];

export function SquareRootNumberLine() {
  const [n, setN] = useState(2);

  const sqrtN = Math.sqrt(n);
  const intPart = Math.floor(sqrtN);
  const fracStr = (sqrtN - intPart).toFixed(4).slice(2);

  const isPerfect = Number.isInteger(sqrtN);

  // 수직선 시각화
  const W = 320;
  const H = 130;
  const STEP = 36;
  const startX = 30;
  const baseY = 95;
  const ticks = [0, 1, 2, 3, 4];

  // 직각삼각형: 가로 intPart, 세로 1 → 빗변 sqrt(intPart^2 + 1)
  // 일반화: 가로 a, 세로 b, 빗변 sqrt(a^2 + b^2) = sqrt(n) 이 되도록.
  // 작도용: a, b 정수 쌍 찾기 (n = a^2 + b^2)
  const construction = useMemo(() => {
    for (let a = 1; a <= 10; a++) {
      for (let b = 1; b <= 10; b++) {
        if (a * a + b * b === n) return { a, b };
      }
    }
    return null;
  }, [n]);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          √n 을 수직선 위에 — 작도하기
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          제곱근은 수직선 위에 정확한 점으로 찍을 수 있어요. 피타고라스 정리를 쓰면 돼요.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setN(p)}
            className={`px-3 py-2 text-sm rounded-md border min-h-[44px] font-mono ${
              p === n
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700'
            }`}
          >
            √{p}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-md mx-auto">
          {/* 수직선 */}
          <line x1={startX} y1={baseY} x2={W - 10} y2={baseY} stroke="#94a3b8" strokeWidth="2" />
          {ticks.map((t) => (
            <g key={t}>
              <line x1={startX + t * STEP} y1={baseY - 5} x2={startX + t * STEP} y2={baseY + 5} stroke="#94a3b8" strokeWidth="1.5" />
              <text x={startX + t * STEP} y={baseY + 20} textAnchor="middle" fontSize="11" className="fill-zinc-500">
                {t}
              </text>
            </g>
          ))}

          {/* 작도 삼각형 */}
          {construction && (
            <>
              <polyline
                points={`${startX},${baseY} ${startX + construction.a * STEP},${baseY} ${startX + construction.a * STEP},${baseY - construction.b * STEP}`}
                fill="none"
                stroke="#a855f7"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <line
                x1={startX}
                y1={baseY}
                x2={startX + construction.a * STEP}
                y2={baseY - construction.b * STEP}
                stroke="#3b82f6"
                strokeWidth="2.5"
              />
              <text
                x={startX + (construction.a * STEP) / 2 - 10}
                y={baseY - (construction.b * STEP) / 2 - 5}
                fontSize="11"
                className="fill-blue-700 dark:fill-blue-300 font-mono"
              >
                √{n}
              </text>
            </>
          )}

          {/* 호 (반지름 = √n) */}
          <path
            d={`M ${startX + sqrtN * STEP} ${baseY} A ${sqrtN * STEP} ${sqrtN * STEP} 0 0 1 ${startX} ${baseY - sqrtN * STEP}`}
            fill="none"
            stroke="#10b981"
            strokeWidth="1.5"
            strokeDasharray="2 4"
            opacity="0.7"
          />

          {/* √n 점 */}
          <circle cx={startX + sqrtN * STEP} cy={baseY} r="4" fill="#a855f7" />
          <text x={startX + sqrtN * STEP} y={baseY + 35} textAnchor="middle" fontSize="11" className="fill-purple-700 dark:fill-purple-300 font-mono font-bold">
            √{n}
          </text>
        </svg>
      </div>

      <div className="space-y-1">
        <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300 font-mono">
          n = {n}
        </div>
        <input
          type="range"
          min={2}
          max={20}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          className="w-full h-3 cursor-pointer accent-blue-600"
          aria-label="n"
          style={{ minHeight: 44 }}
        />
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-4 text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
        <div>
          <strong>√{n}</strong> ≈ {isPerfect ? sqrtN : `${intPart}.${fracStr}…`}
        </div>
        {construction && (
          <div className="font-mono text-xs">
            가로 {construction.a}, 세로 {construction.b} 의 직각삼각형 빗변 = √({construction.a}² + {construction.b}²) = √{n}
          </div>
        )}
        {!isPerfect && (
          <div>{n}이 완전제곱수가 아니라 √{n}은 <strong>무리수</strong>예요.</div>
        )}
      </div>
    </div>
  );
}
