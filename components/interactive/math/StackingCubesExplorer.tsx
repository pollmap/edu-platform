'use client';

// M6-GM-03 공간과 입체 (쌓기 나무) — 위/앞/옆에서 본 모양과 쌓기 나무 개수.

import { useMemo, useState } from 'react';

const ROWS = 3;
const COLS = 3;

type Grid = number[][]; // [row][col] = stack height

function makeEmpty(): Grid {
  return Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => 0));
}

export function StackingCubesExplorer() {
  const [grid, setGrid] = useState<Grid>(() => {
    const g = makeEmpty();
    g[0][0] = 1;
    g[0][1] = 2;
    g[1][1] = 3;
    g[2][2] = 1;
    return g;
  });

  const total = useMemo(() => grid.flat().reduce((s, v) => s + v, 0), [grid]);

  const top = useMemo<number[][]>(
    () => grid.map((row) => row.map((v) => (v > 0 ? 1 : 0))),
    [grid]
  );
  const front = useMemo<number[]>(
    () => Array.from({ length: COLS }, (_, c) => Math.max(...grid.map((row) => row[c]))),
    [grid]
  );
  const side = useMemo<number[]>(
    () => Array.from({ length: ROWS }, (_, r) => Math.max(...grid[r])),
    [grid]
  );

  const update = (r: number, c: number, delta: number) => {
    setGrid((prev) =>
      prev.map((row, ri) =>
        row.map((v, ci) => {
          if (ri !== r || ci !== c) return v;
          const next = v + delta;
          return Math.max(0, Math.min(4, next));
        })
      )
    );
  };

  const SC = 24;

  return (
    <div className="space-y-4">
      <div className="text-sm text-zinc-700 dark:text-zinc-300">
        칸을 눌러 쌓기 나무 개수를 조절해 (최대 4개). 위·앞·옆에서 본 모양이 어떻게 변하는지 봐.
      </div>

      <div className="grid grid-cols-3 gap-1 max-w-xs mx-auto">
        {grid.map((row, r) =>
          row.map((v, c) => (
            <div
              key={`${r}-${c}`}
              className="flex flex-col items-center bg-zinc-100 dark:bg-zinc-800 rounded p-2"
            >
              <button
                type="button"
                onClick={() => update(r, c, 1)}
                className="w-full min-h-[44px] bg-blue-600 text-white text-xs rounded mb-1 active:bg-blue-800"
                aria-label={`(${r},${c}) +1`}
              >
                ▲ {v}
              </button>
              <button
                type="button"
                onClick={() => update(r, c, -1)}
                className="w-full min-h-[36px] bg-zinc-300 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs rounded"
                aria-label={`(${r},${c}) -1`}
              >
                ▼
              </button>
            </div>
          ))
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 text-center text-xs">
        {[
          { title: '위에서', data: top, type: 'grid' as const },
          { title: '앞에서', data: front, type: 'row' as const },
          { title: '옆에서', data: side, type: 'row' as const },
        ].map((view) => (
          <div key={view.title} className="bg-zinc-50 dark:bg-zinc-800 rounded p-2">
            <div className="font-semibold text-blue-700 dark:text-blue-400 mb-1">{view.title}</div>
            <svg viewBox={`0 0 ${COLS * SC + 4} ${ROWS * SC + 4}`} className="w-full">
              {view.type === 'grid'
                ? (view.data as number[][]).map((row, r) =>
                    row.map((v, c) => (
                      <rect
                        key={`${r}-${c}`}
                        x={c * SC + 2}
                        y={r * SC + 2}
                        width={SC}
                        height={SC}
                        fill={v > 0 ? '#60a5fa' : 'transparent'}
                        stroke="#1e3a8a"
                        strokeWidth="1"
                      />
                    ))
                  )
                : (view.data as number[]).map((h, c) =>
                    Array.from({ length: 4 }, (_, level) => (
                      <rect
                        key={`${c}-${level}`}
                        x={c * SC + 2}
                        y={(3 - level) * SC + 2}
                        width={SC}
                        height={SC}
                        fill={level < h ? '#60a5fa' : 'transparent'}
                        stroke="#1e3a8a"
                        strokeWidth="1"
                      />
                    ))
                  )}
            </svg>
          </div>
        ))}
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg text-sm font-mono text-center">
        쌓기 나무 총 개수: <span className="text-red-500 font-bold">{total}</span>개
      </div>
    </div>
  );
}
