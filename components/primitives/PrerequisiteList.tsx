interface PrerequisiteListProps {
  ids: string[];
  achievementStandards?: string[];
}

export function PrerequisiteList({ ids, achievementStandards = [] }: PrerequisiteListProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">선수 학습</h2>
      {ids.length === 0 ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">선수 학습 없음</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {ids.map((p) => (
            <li
              key={p}
              className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-mono"
            >
              {p}
            </li>
          ))}
        </ul>
      )}
      {achievementStandards.length > 0 ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          성취기준: {achievementStandards.join(', ')} (NCIC 2022 개정)
        </p>
      ) : null}
    </div>
  );
}
