'use client';

// M-AM-03 이미지 처리 (행렬) — 픽셀과 컨볼루션 필터.

import { useMemo, useState } from 'react';

type FilterName = 'identity' | 'blur' | 'sharpen' | 'edge' | 'emboss';

const KERNELS: Record<FilterName, number[][]> = {
  identity: [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ],
  blur: [
    [1 / 9, 1 / 9, 1 / 9],
    [1 / 9, 1 / 9, 1 / 9],
    [1 / 9, 1 / 9, 1 / 9],
  ],
  sharpen: [
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0],
  ],
  edge: [
    [-1, -1, -1],
    [-1, 8, -1],
    [-1, -1, -1],
  ],
  emboss: [
    [-2, -1, 0],
    [-1, 1, 1],
    [0, 1, 2],
  ],
};

// 8x8 simple grayscale image - smiley pattern
const SOURCE: number[][] = [
  [200, 200, 50, 50, 50, 50, 200, 200],
  [200, 50, 50, 220, 220, 50, 50, 200],
  [50, 50, 220, 220, 220, 220, 50, 50],
  [50, 220, 220, 30, 220, 30, 220, 50],
  [50, 220, 220, 220, 220, 220, 220, 50],
  [50, 220, 30, 220, 220, 30, 220, 50],
  [200, 50, 220, 30, 30, 220, 50, 200],
  [200, 200, 50, 50, 50, 50, 200, 200],
];

function convolve(src: number[][], k: number[][]): number[][] {
  const h = src.length;
  const w = src[0].length;
  const out: number[][] = Array.from({ length: h }, () => Array.from({ length: w }, () => 0));
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let sum = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const yy = Math.min(h - 1, Math.max(0, y + dy));
          const xx = Math.min(w - 1, Math.max(0, x + dx));
          sum += src[yy][xx] * k[dy + 1][dx + 1];
        }
      }
      out[y][x] = Math.min(255, Math.max(0, sum));
    }
  }
  return out;
}

export function ImageFilterExplorer() {
  const [filter, setFilter] = useState<FilterName>('edge');

  const result = useMemo(() => convolve(SOURCE, KERNELS[filter]), [filter]);

  const cell = 28;
  const W = SOURCE[0].length * cell;
  const H = SOURCE.length * cell;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          이미지 = 숫자 행렬, 필터 = 행렬 곱셈
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          AI가 「보는」 이미지는 픽셀(0~255) 행렬이에요. 작은 3×3 커널을 슬라이딩시키며 곱·합하면(컨볼루션)
          블러·샤픈·엣지 검출 같은 효과가 나와요. CNN(합성곱 신경망)의 출발점이에요.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(Object.keys(KERNELS) as FilterName[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`min-h-[44px] px-3 rounded-md text-sm border-2 ${
              filter === f
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold'
                : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">원본</div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ imageRendering: 'pixelated' }}>
            {SOURCE.map((row, y) =>
              row.map((v, x) => (
                <rect key={`${y}-${x}`} x={x * cell} y={y * cell} width={cell} height={cell} fill={`rgb(${v},${v},${v})`} />
              ))
            )}
          </svg>
        </div>

        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">커널 (3×3)</div>
          <table className="w-full font-mono text-xs">
            <tbody>
              {KERNELS[filter].map((row, i) => (
                <tr key={i}>
                  {row.map((v, j) => (
                    <td key={j} className="text-center p-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900">
                      {v.toFixed(2)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">필터 결과</div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ imageRendering: 'pixelated' }}>
            {result.map((row, y) =>
              row.map((v, x) => {
                const c = Math.round(v);
                return <rect key={`${y}-${x}`} x={x * cell} y={y * cell} width={cell} height={cell} fill={`rgb(${c},${c},${c})`} />;
              })
            )}
          </svg>
        </div>
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        ☝ Edge 커널은 「주변 평균과 다른 픽셀」만 강조 → 윤곽이 살아남아요. Blur는 평균을 내서 흐려지고, Sharpen은 차이를 키워 또렷해져요.
      </div>
    </div>
  );
}
