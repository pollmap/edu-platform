'use client';

// M3-NA-03 나눗셈 (몫과 나머지) — 묶음 시각화.

import { useMemo, useState } from 'react';

export function DivisionRemainderExplorer() {
  const [total, setTotal] = useState(17);
  const [groupSize, setGroupSize] = useState(5);

  const quotient = Math.floor(total / groupSize);
  const remainder = total % groupSize;

  const items = useMemo(() => Array.from({ length: total }, (_, i) => i), [total]);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          나눗셈 — 몫과 나머지
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          사탕 <strong>{total}개</strong>를 친구 한 명당 <strong>{groupSize}개</strong>씩 나누면 — 몇 명에게 줄 수 있고, 몇 개가 남을까?
        </p>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex flex-wrap gap-1">
          {items.map((i) => {
            const groupIndex = Math.floor(i / groupSize);
            const isRemainder = groupIndex >= quotient;
            const colors = ['#3b82f6', '#10b981', '#f59e0b', '#a855f7', '#ec4899', '#06b6d4'];
            const bg = isRemainder ? '#e5e7eb' : colors[groupIndex % colors.length];
            return (
              <div
                key={i}
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: bg }}
                title={isRemainder ? '나머지' : `${groupIndex + 1}번째 묶음`}
              >
                {isRemainder ? '?' : '🍬'}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300">전체 개수: {total}</div>
          <input
            type="range"
            min={1}
            max={40}
            value={total}
            onChange={(e) => setTotal(Number(e.target.value))}
            className="w-full h-3 cursor-pointer"
            aria-label="전체 개수"
          />
        </div>
        <div className="space-y-1">
          <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300">한 묶음당: {groupSize}</div>
          <input
            type="range"
            min={2}
            max={9}
            value={groupSize}
            onChange={(e) => setGroupSize(Number(e.target.value))}
            className="w-full h-3 cursor-pointer"
            aria-label="묶음 크기"
          />
        </div>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-4">
        <div className="font-mono text-base text-zinc-900 dark:text-zinc-100 mb-1">
          {total} ÷ {groupSize} ={' '}
          <span className="font-bold text-blue-700 dark:text-blue-300">{quotient}</span>
          <span className="text-zinc-500"> ... </span>
          <span className="font-bold text-orange-600 dark:text-orange-400">{remainder}</span>
        </div>
        <div className="text-xs text-zinc-600 dark:text-zinc-400">
          몫 <strong>{quotient}</strong>명에게 나눠 주고, <strong>{remainder}</strong>개가 남아요.
          {' '}검산: {groupSize} × {quotient} + {remainder} = {groupSize * quotient + remainder}.
        </div>
      </div>
    </div>
  );
}
