'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useProgress } from '@/lib/progress';
import { findUnit, unitPath } from '@/lib/curriculum';

interface HomeProgressProps {
  totalUnits: number;
}

export function HomeProgress({ totalUnits }: HomeProgressProps) {
  const [mounted, setMounted] = useState(false);
  const visited = useProgress((s) => s.visited);
  const completed = useProgress((s) => s.completed);
  const favorites = useProgress((s) => s.favorites);

  const counts = useMemo(
    () => ({
      completed: Object.keys(completed).length,
      visited: Object.keys(visited).length,
      favorites: Object.keys(favorites).length,
    }),
    [completed, favorites, visited],
  );
  const favoriteIds = useMemo(() => Object.keys(favorites), [favorites]);
  const recentCompletedIds = useMemo(
    () =>
      Object.entries(completed)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id]) => id),
    [completed],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
        <div className="h-4 w-40 rounded bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
      </div>
    );
  }

  const pct = totalUnits > 0 ? Math.min(100, (counts.completed / totalUnits) * 100) : 0;

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-4">
      <div className="flex items-baseline justify-between">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">내 학습 진도</h3>
        <span className="text-xs text-zinc-500 font-mono">
          완료 {counts.completed} · 방문 {counts.visited} · 즐겨찾기 {counts.favorites}
        </span>
      </div>
      <div className="h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all"
          style={{ width: `${pct}%` }}
          aria-label={`전체 ${totalUnits}단원 중 ${counts.completed}단원 완료 (${pct.toFixed(1)}%)`}
        />
      </div>

      {favoriteIds.length > 0 && (
        <UnitChips title="즐겨찾기" ids={favoriteIds.slice(0, 6)} />
      )}
      {recentCompletedIds.length > 0 && (
        <UnitChips title="최근 완료" ids={recentCompletedIds} />
      )}
    </div>
  );
}

function UnitChips({ title, ids }: { title: string; ids: string[] }) {
  const items = ids
    .map((id) => findUnit(id))
    .filter((u): u is NonNullable<typeof u> => Boolean(u));
  if (items.length === 0) return null;
  return (
    <div className="space-y-1.5">
      <div className="text-xs text-zinc-500 dark:text-zinc-400">{title}</div>
      <div className="flex flex-wrap gap-2">
        {items.map((u) => (
          <Link
            key={u.id}
            href={unitPath(u)}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-xs text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700"
          >
            <span className="font-mono text-[10px] text-zinc-500">{u.id}</span>
            <span className="truncate max-w-[140px]">{u.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
