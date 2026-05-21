'use client';

import { useEffect, useState } from 'react';
import { SelfCheckBar } from '@/components/learning/SelfCheckBar';
import { useProgress } from '@/lib/progress';

interface UnitProgressControlsProps {
  unitId: string;
}

export function UnitProgressControls({ unitId }: UnitProgressControlsProps) {
  const [mounted, setMounted] = useState(false);
  const completed = useProgress((s) => Boolean(s.completed[unitId]));
  const fav = useProgress((s) => Boolean(s.favorites[unitId]));
  const markCompleted = useProgress((s) => s.markCompleted);
  const unmarkCompleted = useProgress((s) => s.unmarkCompleted);
  const toggleFavorite = useProgress((s) => s.toggleFavorite);
  const markVisited = useProgress((s) => s.markVisited);

  useEffect(() => {
    setMounted(true);
    markVisited(unitId);
  }, [unitId, markVisited]);

  if (!mounted) {
    return (
      <div className="flex gap-2" aria-hidden="true">
        <div className="h-9 w-28 rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="h-9 w-9 rounded bg-zinc-100 dark:bg-zinc-800" />
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 items-center">
        <button
          type="button"
          onClick={() =>
            completed ? unmarkCompleted(unitId) : markCompleted(unitId)
          }
          className={`min-h-[44px] px-3 py-2 rounded-md text-sm font-medium border transition ${
            completed
              ? 'bg-green-600 text-white border-green-700 hover:bg-green-700'
              : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
          }`}
          aria-pressed={completed}
        >
          {completed ? '✓ 학습 완료' : '학습 완료로 표시'}
        </button>
        <button
          type="button"
          onClick={() => toggleFavorite(unitId)}
          className={`min-h-[44px] min-w-[44px] px-3 py-2 rounded-md text-sm border transition ${
            fav
              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-400'
              : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
          }`}
          aria-pressed={fav}
          aria-label={fav ? '즐겨찾기 해제' : '즐겨찾기 추가'}
        >
          {fav ? '★ 즐겨찾기' : '☆ 즐겨찾기'}
        </button>
      </div>
      <SelfCheckBar unitId={unitId} />
    </div>
  );
}
