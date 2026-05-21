'use client';

import { useEffect, useState } from 'react';
import { useProgress } from '@/lib/progress';
import type { SelfCheckRating } from '@/lib/learning';

interface SelfCheckBarProps {
  unitId: string;
}

const OPTIONS: Array<{
  rating: SelfCheckRating;
  label: string;
  description: string;
  activeClassName: string;
}> = [
  {
    rating: 'understood',
    label: '이해했어요',
    description: '완료',
    activeClassName: 'border-green-600 bg-green-600 text-white',
  },
  {
    rating: 'confused',
    label: '헷갈려요',
    description: '내일 복습',
    activeClassName: 'border-amber-500 bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200',
  },
  {
    rating: 'review',
    label: '다시 볼래요',
    description: '오늘 큐',
    activeClassName: 'border-blue-600 bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-200',
  },
];

function messageFor(rating: SelfCheckRating): string {
  if (rating === 'understood') return '완료 처리하고 복습 큐에서 뺐어요.';
  if (rating === 'confused') return '내일 다시 볼 개념으로 저장했어요.';
  return '오늘 복습 큐에 저장했어요.';
}

export function SelfCheckBar({ unitId }: SelfCheckBarProps) {
  const [mounted, setMounted] = useState(false);
  const [message, setMessage] = useState('');
  const completed = useProgress((s) => Boolean(s.completed[unitId]));
  const reviewEntry = useProgress((s) => s.reviewQueue?.[unitId]);
  const setSelfCheck = useProgress((s) => s.setSelfCheck);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="mt-3 h-20 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900" />
    );
  }

  const activeRating: SelfCheckRating | undefined = completed
    ? 'understood'
    : reviewEntry?.reason;

  return (
    <div className="mt-3 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">이해도 체크</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">오늘 큐와 복습 큐에 바로 반영됩니다</div>
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {OPTIONS.map((option) => {
          const active = activeRating === option.rating;
          return (
            <button
              key={option.rating}
              type="button"
              onClick={() => {
                setSelfCheck(unitId, option.rating);
                setMessage(messageFor(option.rating));
              }}
              className={`min-h-[52px] rounded-lg border px-3 py-2 text-left text-sm font-semibold transition ${
                active
                  ? option.activeClassName
                  : 'border-zinc-200 bg-zinc-50 text-zinc-800 hover:border-blue-300 hover:bg-blue-50 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-200 dark:hover:border-blue-700 dark:hover:bg-blue-950/30'
              }`}
              aria-pressed={active}
            >
              <span className="block">{option.label}</span>
              <span className={`block text-xs font-medium ${active ? 'opacity-80' : 'text-zinc-500 dark:text-zinc-400'}`}>
                {option.description}
              </span>
            </button>
          );
        })}
      </div>
      {message ? (
        <div className="mt-2 rounded-md bg-zinc-50 px-3 py-2 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          {message}
        </div>
      ) : null}
    </div>
  );
}
