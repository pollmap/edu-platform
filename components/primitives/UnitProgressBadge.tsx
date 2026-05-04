'use client';

import { useEffect, useState } from 'react';
import { unitStatus, useProgress } from '@/lib/progress';

interface UnitProgressBadgeProps {
  unitId: string;
}

export function UnitProgressBadge({ unitId }: UnitProgressBadgeProps) {
  const [mounted, setMounted] = useState(false);
  const status = useProgress((s) => unitStatus(s, unitId));
  const fav = useProgress((s) => Boolean(s.favorites[unitId]));

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const label =
    status === 'completed' ? '완료' : status === 'visited' ? '방문' : '미방문';
  const color =
    status === 'completed'
      ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
      : status === 'visited'
        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
        : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400';

  return (
    <span className="inline-flex items-center gap-1 align-middle">
      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${color}`}>
        {label}
      </span>
      {fav && (
        <span aria-label="즐겨찾기" className="text-yellow-500 text-xs">★</span>
      )}
    </span>
  );
}
